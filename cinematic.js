/* Paleomagina — experiencia cinematográfica (unificado) */
(function () {
  "use strict";

  const REDUCED =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  function mountBreathLayer() {
    const atmosphereEl = document.querySelector(".pm-atmosphere");
    if (!atmosphereEl || atmosphereEl.querySelector(".pm-atmosphere__breath")) return;
    const breath = document.createElement("div");
    breath.className = "pm-atmosphere__breath";
    breath.setAttribute("aria-hidden", "true");
    const vignette = atmosphereEl.querySelector(".pm-atmosphere__vignette");
    if (vignette) atmosphereEl.insertBefore(breath, vignette);
    else atmosphereEl.appendChild(breath);
  }

  function initBreathing() {
    if (REDUCED) return;
    mountBreathLayer();
    document.addEventListener("visibilitychange", () => {
      document.documentElement.classList.toggle(
        "pm-breath-paused",
        document.hidden
      );
    });
  }

  function mountLayers() {
    if (document.querySelector(".pm-atmosphere")) {
      document.documentElement.classList.add("pm-cinema");
      return;
    }

    const wrap = document.createElement("div");
    wrap.className = "pm-atmosphere";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = [
      '<div class="pm-atmosphere__grade"></div>',
      '<div class="pm-atmosphere__light"></div>',
      '<div class="pm-atmosphere__ambient"></div>',
      '<div class="pm-atmosphere__mist"></div>',
      '<div class="pm-atmosphere__fog pm-atmosphere__fog--top"></div>',
      '<div class="pm-atmosphere__fog pm-atmosphere__fog--bottom"></div>',
      '<div class="pm-atmosphere__vignette"></div>',
    ].join("");

    document.body.prepend(wrap);
    document.documentElement.classList.add("pm-cinema");
    if (REDUCED) document.documentElement.classList.add("pm-cinema-reduced");
  }

  function initSectionReveal() {
    /* Transiciones de sección: cinematic-sections.js */
  }

  function getScrollY() {
    return window.PaleomaginaScroll?.getY?.() ?? window.scrollY ?? 0;
  }

  function initScrollDepth() {
    if (REDUCED || window.PaleomaginaScroll) return;

    let scheduled = false;
    const root = document.documentElement;
    const update = () => {
      scheduled = false;
      root.style.setProperty("--pm-scroll", `${window.scrollY || 0}px`);
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!scheduled) {
          scheduled = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  function initNavScroll() {
    const nav = document.querySelector(".navbar.pm-topnav");
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle("pm-nav--scrolled", getScrollY() > 28);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pm-scroll", onScroll);
    onScroll();
  }

  function initAtmosphere() {
    mountLayers();
    initBreathing();
    initSectionReveal();
    initScrollDepth();
    initNavScroll();
  }


  /* Scroll nativo: el hijack con wheel bloqueaba la página tras unificar módulos. */
  const USE_NATIVE = true;

  const state = {
    enabled: !USE_NATIVE,
    current: 0,
    target: 0,
    ease: 0.078,
    max: 0,
    raf: 0,
    paused: false,
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getMaxScroll() {
    return Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
  }

  function isScrollLocked() {
    return (
      document.body.classList.contains("pm-scroll-locked") ||
      document.body.style.overflow === "hidden"
    );
  }

  function isInsideScrollable(target) {
    const root = document.scrollingElement || document.documentElement;
    let node = target;
    while (node && node !== document.documentElement) {
      if (node === document.body || node === root) break;
      const style = window.getComputedStyle(node);
      const scrollableY = /(auto|scroll|overlay)/.test(style.overflowY);
      if (scrollableY && node.scrollHeight > node.clientHeight + 2) {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  function normalizeWheelDelta(event) {
    let delta = event.deltaY;
    if (event.deltaMode === 1) delta *= 16;
    else if (event.deltaMode === 2) delta *= window.innerHeight;
    return delta * 1.02;
  }

  function publishScroll() {
    const root = document.documentElement;
    root.style.setProperty("--pm-scroll", `${state.current}px`);
    const max = state.max > 0 ? state.max : getMaxScroll();
    const progress = max > 0 ? state.current / max : 0;
    root.style.setProperty("--pm-scroll-progress", String(progress));
    root.style.setProperty("--pm-cinema-light-y", `${18 + progress * 38}%`);
    root.style.setProperty("--pm-cinema-scroll-glow", String(progress));
    window.dispatchEvent(
      new CustomEvent("pm-scroll", {
        detail: {
          y: state.current,
          target: state.target,
          progress,
        },
      })
    );
  }

  function syncFromNative() {
    state.current = window.scrollY;
    state.target = window.scrollY;
    state.max = getMaxScroll();
    publishScroll();
  }

  function tick() {
    state.raf = window.requestAnimationFrame(tick);
    if (!state.enabled || state.paused) return;

    state.max = getMaxScroll();
    state.target = clamp(state.target, 0, state.max);

    const delta = state.target - state.current;
    if (Math.abs(delta) < 0.35) {
      state.current = state.target;
    } else {
      state.current += delta * state.ease;
    }

    if (Math.abs(window.scrollY - state.current) > 0.35) {
      window.scrollTo(0, state.current);
    }
    publishScroll();
  }

  function onWheel(event) {
    if (!state.enabled || state.paused || isScrollLocked()) return;
    if (isInsideScrollable(event.target)) return;
    const max = getMaxScroll();
    if (max < 1) return;
    event.preventDefault();
    state.target = clamp(
      state.target + normalizeWheelDelta(event),
      0,
      max
    );
  }

  function scrollTo(y, options = {}) {
    const { immediate = false } = options;
    state.target = clamp(y, 0, getMaxScroll());
    if (immediate) {
      state.current = state.target;
      window.scrollTo(0, state.current);
      publishScroll();
    } else if (!state.enabled) {
      window.scrollTo({ top: state.target, behavior: "smooth" });
      window.setTimeout(syncFromNative, 450);
    }
  }

  function scrollToElement(element, offset = 0) {
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY - offset;
    scrollTo(y);
  }

  function getNavOffset() {
    const nav = document.querySelector(".navbar.pm-topnav");
    return nav ? nav.offsetHeight + 14 : 88;
  }

  function initAnchorLinks() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || link.dataset.noScroll === "true") return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      scrollToElement(target, getNavOffset());
      if (window.history.replaceState) {
        window.history.replaceState(null, "", hash);
      }
    });
  }

  function initKeyboard() {
    window.addEventListener("keydown", (event) => {
      if (!state.enabled || state.paused || isScrollLocked()) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      let step = 0;
      if (event.key === "ArrowDown") step = 72;
      else if (event.key === "ArrowUp") step = -72;
      else if (event.key === "PageDown") step = window.innerHeight * 0.82;
      else if (event.key === "PageUp") step = -window.innerHeight * 0.82;
      else if (event.key === " " && !event.ctrlKey && !event.metaKey) {
        step = event.shiftKey ? -window.innerHeight * 0.82 : window.innerHeight * 0.82;
      } else return;

      event.preventDefault();
      state.target = clamp(state.target + step, 0, getMaxScroll());
    });
  }

  function initNativeEnhanced() {
    document.documentElement.classList.add("pm-scroll-enhanced");
    let scheduled = false;

    const update = () => {
      scheduled = false;
      state.current = window.scrollY;
      state.target = window.scrollY;
      state.max = getMaxScroll();
      publishScroll();
    };

    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("load", update, { once: true });
    update();
    window.requestAnimationFrame(() => window.requestAnimationFrame(update));
  }

  function initSmooth() {
    document.documentElement.classList.add("pm-smooth-scroll");
    state.current = window.scrollY;
    state.target = window.scrollY;
    state.max = getMaxScroll();

    const syncLayout = () => syncFromNative();
    window.addEventListener("load", syncLayout, { once: true });
    window.requestAnimationFrame(() => window.requestAnimationFrame(syncLayout));

    const onWheelCapture = (event) => onWheel(event);
    window.addEventListener("wheel", onWheelCapture, { passive: false });
    document.addEventListener("wheel", onWheelCapture, {
      passive: false,
      capture: true,
    });
    window.addEventListener(
      "resize",
      () => {
        state.max = getMaxScroll();
        state.target = clamp(state.target, 0, state.max);
      },
      { passive: true }
    );

    window.addEventListener(
      "scroll",
      () => {
        if (state.paused) return;
        if (Math.abs(window.scrollY - state.current) > 3) {
          state.current = window.scrollY;
          state.target = window.scrollY;
        }
      },
      { passive: true }
    );

    initAnchorLinks();
    initKeyboard();
    tick();

    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        window.setTimeout(() => scrollToElement(el, getNavOffset()), 160);
      }
    }
  }

  function initScroll() {
    if (USE_NATIVE) {
      initNativeEnhanced();
    } else {
      initSmooth();
    }

    window.PaleomaginaScroll = {
      scrollTo,
      scrollToElement,
      getY: () => (state.enabled ? state.current : window.scrollY),
      getTarget: () => (state.enabled ? state.target : window.scrollY),
      pause() {
        state.paused = true;
      },
      resume() {
        state.paused = false;
        if (state.enabled) {
          state.target = window.scrollY;
          state.current = window.scrollY;
        }
      },
      sync: syncFromNative,
      isSmooth: state.enabled,
    };
  }


  function getScrollY() {
    return window.PaleomaginaScroll?.getY?.() ?? window.scrollY ?? 0;
  }
  function tagBlocks() {
    document
      .querySelectorAll("main section:not(.hero):not(.hero-simple):not(.page-hero)")
      .forEach((section) => {
        if (section.querySelector(":scope > .container")) {
          section.classList.add("pm-parallax-block");
        }
      });

    document
      .querySelectorAll(
        "main .pm-inline-icon, main .content-split img, main .two-col img, .hero-content img"
      )
      .forEach((el, index) => {
        if (el.closest(".pm-section-layer")) return;
        el.setAttribute("data-pm-float", String(0.06 + (index % 4) * 0.03));
      });
  }

  function update() {
    const scrollY = getScrollY();
    const vh = window.innerHeight;
    const root = document.documentElement;

    root.style.setProperty("--pm-scroll", `${scrollY}px`);

    document.querySelectorAll(".pm-parallax-block").forEach((block) => {
      const rect = block.getBoundingClientRect();
      if (rect.bottom < -40 || rect.top > vh + 40) {
        block.style.setProperty("--pm-block-shift", "0px");
        return;
      }
      const center = rect.top + rect.height * 0.5;
      const progress = (vh * 0.5 - center) / vh;
      const shift = progress * 22;
      block.style.setProperty("--pm-block-shift", `${shift}px`);
    });

    document.querySelectorAll("[data-pm-float]").forEach((el) => {
      const depth = parseFloat(el.getAttribute("data-pm-float")) || 0.08;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) {
        el.style.setProperty("--pm-float-shift", "0px");
        return;
      }
      const center = rect.top + rect.height * 0.5;
      const progress = (vh * 0.5 - center) / vh;
      const scrollPart = scrollY * depth * 0.018;
      const viewPart = progress * depth * 14;
      el.style.setProperty(
        "--pm-float-shift",
        `${scrollPart + viewPart}px`
      );
    });
  }

  function initParallax() {
    if (REDUCED) return;

    document.documentElement.classList.add("pm-parallax");
    tagBlocks();
    update();

    let scheduled = false;
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        update();
      });
    };

    window.addEventListener("pm-scroll", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => window.setTimeout(schedule, 50));
    });
  }
window.PaleomaginaParallax = { refresh: update };


  const TITLE_SEL =
    "h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .museum-section-heading";
  const BODY_SEL =
    ".section-intro, .section-lead, .lead, .hero-text, .museum-section-lead";

  function mark(el, type, delay) {
    if (!el || el.classList.contains("pm-text-reveal")) return;
    if (el.tagName === "IMG" && type !== "icon") return;
    el.classList.add("pm-text-reveal", `pm-text-reveal--${type}`);
    if (delay != null) {
      el.style.setProperty("--pm-text-delay", `${delay}s`);
    }
  }

  function revealVisible(el) {
    el.classList.add("pm-text-reveal--visible");
    el.style.removeProperty("filter");
  }

  function tagHeadingBlock(wrapper, delayBase) {
    const icon = wrapper.querySelector(".pm-inline-icon");
    const heading = wrapper.querySelector(TITLE_SEL);
    if (icon) mark(icon, "icon", delayBase);
    if (heading) mark(heading, "title", delayBase + 0.03);
  }

  function tagSection(section, sectionIndex) {
    const base = Math.min(sectionIndex * 0.015, 0.05);

    section.querySelectorAll(":scope .pm-heading-with-icon").forEach((wrapper) => {
      tagHeadingBlock(wrapper, base);
    });

    section.querySelectorAll(TITLE_SEL).forEach((el) => {
      if (el.closest(".pm-heading-with-icon")) return;
      if (el.closest(".hero, .hero-simple, .page-hero")) return;
      if (el.closest(".av-library-card")) return;
      if (el.closest(".card, .pm-read-panel")) return;
      mark(el, "title", base);
    });

    section.querySelectorAll(BODY_SEL).forEach((el, i) => {
      if (el.closest(".hero, .hero-simple, .page-hero")) return;
      if (el.closest(".av-library-card")) return;
      mark(el, "body", base + 0.04 + i * 0.025);
    });

    section.querySelectorAll(".card, .pm-read-panel").forEach((block) => {
      if (
        block.classList.contains("av-item-card") ||
        block.classList.contains("av-library-card") ||
        block.closest("#av-grid")
      ) return;
      const t = block.querySelector(TITLE_SEL);
      if (t) mark(t, "title", 0.04);
      const intro = block.querySelector("p");
      if (intro) mark(intro, "body", 0.07);
    });
  }

  function tagHero() {
    const heroes = document.querySelectorAll(".hero, .hero-simple, .page-hero");
    heroes.forEach((hero) => {
      hero.querySelectorAll(".kicker").forEach((el, i) => mark(el, "kicker", 0.05 + i * 0.06));
      hero.querySelectorAll("h1").forEach((el, i) => mark(el, "title", 0.14 + i * 0.1));
      hero.querySelectorAll(".hero-text, .section-intro").forEach((el, i) =>
        mark(el, "body", 0.28 + i * 0.08)
      );
      /* CTA del hero: siempre visibles (sin blur/opacity de reveal) */
      hero.querySelectorAll(".btn-primary, .btn").forEach((el) => {
        el.classList.add("pm-hero-cta", "is-visible");
        el.classList.remove("pm-cinema-reveal", "pm-text-reveal");
        el.style.removeProperty("filter");
        el.style.removeProperty("opacity");
      });
    });
  }

  function revealHero() {
    window.setTimeout(() => {
      document
        .querySelectorAll(".hero .pm-text-reveal, .hero-simple .pm-text-reveal, .page-hero .pm-text-reveal")
        .forEach(revealVisible);

    }, 80);
  }

  function observeText() {
    const nodes = [...document.querySelectorAll(".pm-text-reveal:not(.pm-text-reveal--visible)")];
    if (!nodes.length) return;

    if (REDUCED || !window.IntersectionObserver) {
      nodes.forEach(revealVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealVisible(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 22% 0px" }
    );

    nodes.forEach((el) => {
      if (!el.closest(".hero, .hero-simple, .page-hero")) {
        observer.observe(el);
      }
    });
  }

  function initText() {
    if (REDUCED) {
      document.querySelectorAll(".pm-text-reveal").forEach(revealVisible);
      return;
    }

    document
      .querySelectorAll("main section:not(.hero):not(.hero-simple)")
      .forEach((section, i) => tagSection(section, i));

    document.querySelectorAll("main#main-content > .container").forEach((container) => {
      tagSection(container, 0);
    });

    tagHero();
    observeText();
    revealHero();

    window.setTimeout(() => {
      document
        .querySelectorAll(".pm-text-reveal:not(.pm-text-reveal--visible)")
        .forEach(revealVisible);
    }, 900);
  }

  window.PaleomaginaText = { refresh: initText };


  const SKIP_LAYER =
    "h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .museum-section-heading, .pm-heading-with-icon";

  const REVEAL_SELECTOR = [
    "main .card:not(.av-item-card):not(.av-library-card):not(.pm-section-layer)",
    "main .content-prose:not(.pm-section-layer)",
    "main .pm-read-panel:not(.pm-section-layer)",
    "main .museum-section-panel:not(.pm-section-layer)",
    "main .timeline-section-panel:not(.pm-section-layer)",
    "main .time-stage-card:not(.pm-section-layer)",
  ].join(", ");

  function revealElement(el) {
    el.classList.add("pm-section-visible", "pm-cinema-reveal--visible", "is-visible");
    el.style.removeProperty("filter");
  }

  function tagSectionLayers(section) {
    const container = section.querySelector(":scope > .container");
    if (!container) return;

    let index = 0;
    [...container.children].forEach((child) => {
      if (child.classList.contains("animate-on-scroll")) return;
      if (child.matches(SKIP_LAYER)) return;
      if (child.classList.contains("pm-section-layer")) return;

      child.classList.add("pm-section-layer");
      child.style.setProperty(
        "--pm-layer-delay",
        `${Math.min(index * 0.035, 0.14)}s`
      );
      index += 1;
    });
  }

  function revealSection(section) {
    if (section.classList.contains("pm-section-visible")) return;

    section.classList.add("pm-section-visible");

    const layers = [...section.querySelectorAll(".pm-section-layer")];
    layers.forEach((layer, i) => {
      window.setTimeout(() => revealElement(layer), 35 + i * 30);
    });

    section
      .querySelectorAll(".pm-text-reveal:not(.pm-text-reveal--visible)")
      .forEach((el, i) => {
        window.setTimeout(() => {
          el.classList.add("pm-text-reveal--visible");
          el.style.removeProperty("filter");
        }, 45 + i * 25);
      });
  }

  function initSections() {
    const sections = document.querySelectorAll(
      "main section:not(.hero):not(.hero-simple):not(.page-hero)"
    );

    sections.forEach((section) => {
      section.classList.add("pm-section-cinema");
      tagSectionLayers(section);
    });

    if (REDUCED || !window.IntersectionObserver) {
      sections.forEach((s) => {
        s.classList.add("pm-section-visible");
        s.querySelectorAll(".pm-section-layer").forEach(revealElement);
        s.querySelectorAll(".pm-text-reveal").forEach((el) => {
          el.classList.add("pm-text-reveal--visible");
          el.style.removeProperty("filter");
        });
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealSection(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 22% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initStandaloneReveals() {
    const nodes = [...document.querySelectorAll(REVEAL_SELECTOR)].filter(
      (el) =>
        !el.classList.contains("animate-on-scroll") &&
        !el.classList.contains("pm-section-layer")
    );

    nodes.forEach((el, index) => {
      el.classList.add("pm-cinema-reveal");
      el.style.setProperty("--pm-reveal-delay", `${Math.min(index * 0.02, 0.08)}s`);
    });

    const all = [...nodes, ...document.querySelectorAll(".animate-on-scroll")];

    if (!all.length) return;

    if (REDUCED || !window.IntersectionObserver) {
      all.forEach(revealElement);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealElement(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 22% 0px" }
    );

    all.forEach((el) => observer.observe(el));
  }

  function initSectionsEntry() {
    if (!document.documentElement.classList.contains("pm-cinema")) {
      window.setTimeout(initSectionsEntry, 60);
      return;
    }

    initSections();
    initStandaloneReveals();
  }
window.PaleomaginaSections = { refresh: initSectionsEntry };


  const STORAGE_KEY = "paleomagina-audio-enabled";
  const FADE_IN_SEC = 6;
  const FADE_RESUME_SEC = 2;
  const FADE_OUT_SEC = 3;
  const TARGET_VOLUME = 0.038;
const ICON_SOUND_OFF =
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  const ICON_SOUND_ON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.2a4 4 0 0 1 0 7.6"/><path d="M18.2 5.8a7.5 7.5 0 0 1 0 12.4"/></svg>';

  let ctx = null;
  let master = null;
  let nodes = [];
  let playing = false;
  let fab = null;

  function t(key, fallback) {
    return window.paleomaginaT?.(key) ?? fallback;
  }

  function getBasePath() {
    const ref = document.querySelector('script[src*="script.js"]');
    if (!ref) return "";
    const src = ref.getAttribute("src") || "script.js";
    return src.replace(/[^/]*script\.js.*$/, "") || "./";
  }

  function createPinkNoiseBuffer(audioCtx, seconds) {
    const len = audioCtx.sampleRate * seconds;
    const buffer = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      data[i] = (b0 + b1 + b2) * 0.12;
    }
    return buffer;
  }

  function connectNoiseLayer(opts) {
    const {
      centerFreq,
      q,
      gainLevel,
      lfoRate,
      lfoDepthHz,
      amRate,
      amDepth,
    } = opts;

    const src = ctx.createBufferSource();
    src.buffer = createPinkNoiseBuffer(ctx, 5);
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = centerFreq;
    filter.Q.value = q;

    const gain = ctx.createGain();
    gain.gain.value = amRate ? 0 : gainLevel;

    if (lfoRate) {
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = lfoRate;
      const lfoG = ctx.createGain();
      lfoG.gain.value = lfoDepthHz;
      lfo.connect(lfoG);
      lfoG.connect(filter.frequency);
      lfo.start();
      nodes.push(lfo, lfoG);
    }

    if (amRate) {
      const offset = ctx.createConstantSource();
      offset.offset.value = gainLevel;
      offset.connect(gain.gain);
      offset.start();
      nodes.push(offset);

      const am = ctx.createOscillator();
      am.type = "sine";
      am.frequency.value = amRate;
      const amG = ctx.createGain();
      amG.gain.value = amDepth;
      am.connect(amG);
      amG.connect(gain.gain);
      am.start();
      nodes.push(am, amG);
    }

    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start();
    nodes.push(src);
  }

  function buildTreeWind() {
    connectNoiseLayer({
      centerFreq: 280,
      q: 0.55,
      gainLevel: 0.14,
      lfoRate: 0.04,
      lfoDepthHz: 60,
    });

    connectNoiseLayer({
      centerFreq: 1400,
      q: 1.1,
      gainLevel: 0.07,
      lfoRate: 0.09,
      lfoDepthHz: 350,
      amRate: 0.25,
      amDepth: 0.045,
    });

    connectNoiseLayer({
      centerFreq: 3200,
      q: 1.4,
      gainLevel: 0.028,
      lfoRate: 0.14,
      lfoDepthHz: 500,
      amRate: 0.38,
      amDepth: 0.018,
    });
  }

  function tryLoadWindFile() {
    const url = getBasePath() + "audio/ambient/wind-trees.mp3";
    const audio = new Audio(url);
    audio.loop = true;
    audio.preload = "auto";

    audio.addEventListener("canplaythrough", () => {
      if (!playing || !ctx) return;
      try {
        const track = ctx.createMediaElementSource(audio);
        const g = ctx.createGain();
        g.gain.value = 0.22;
        track.connect(g);
        g.connect(master);
        audio.play().catch(() => {});
      } catch (_) {}
    });

    audio.addEventListener("error", () => {});
    if (playing) audio.load();
  }

  function initEngine() {
    if (ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;

    ctx = new Ctx();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    buildTreeWind();
    tryLoadWindFile();
  }

  async function fadeTo(value, duration) {
    if (!ctx || !master) return;
    if (ctx.state === "suspended") await ctx.resume();
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(value, now + duration);
  }

  function isAudioEnabledInStorage() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch (_) {
      return false;
    }
  }

  async function startAmbient(options = {}) {
    if (REDUCED) return;
    initEngine();
    if (!ctx) return;
    playing = true;
    const fadeSec = options.resume ? FADE_RESUME_SEC : FADE_IN_SEC;
    try {
      if (ctx.state === "suspended") await ctx.resume();
    } catch (_) {}
    await fadeTo(TARGET_VOLUME, fadeSec);
    document.documentElement.classList.add("pm-audio-on");
    updateFab();
    fab?.classList.add("pm-audio-fab--remembered");
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (_) {}
  }

  function stopAmbient() {
    playing = false;
    if (ctx && master) fadeTo(0, FADE_OUT_SEC);
    document.documentElement.classList.remove("pm-audio-on");
    updateFab();
    fab?.classList.remove("pm-audio-fab--remembered");
    try {
      localStorage.setItem(STORAGE_KEY, "0");
    } catch (_) {}
  }

  function updateFab() {
    if (!fab) return;
    const ariaLabel = playing
      ? t("audio_toggle_off", "Desactivar viento ambiente")
      : t("audio_toggle_on", "Activar viento entre árboles");
    const shortLabel = t("audio_fab_label", "Sonido");
    fab.innerHTML = `
      <span class="pm-audio-fab__inner">
        <span class="pm-audio-fab__icon">${playing ? ICON_SOUND_ON : ICON_SOUND_OFF}</span>
        <span class="pm-audio-fab__label">${shortLabel}</span>
      </span>
      <span class="visually-hidden">${ariaLabel}</span>
    `;
    fab.setAttribute("aria-label", ariaLabel);
    fab.title = ariaLabel;
    fab.setAttribute("aria-pressed", playing ? "true" : "false");
    fab.classList.toggle("pm-audio-fab--active", playing);
  }

  function findPageHero() {
    return document.querySelector(".hero, .page-hero, .hero-simple");
  }

  function relocateFab() {
    if (!fab) return;

    document.querySelectorAll(".pm-audio-fab-host").forEach((host) => {
      host.classList.remove("pm-audio-fab-host");
    });
    fab.classList.remove("pm-audio-fab--in-hero", "pm-audio-fab--fallback");

    const hero = findPageHero();
    if (hero) {
      hero.classList.add("pm-audio-fab-host");
      fab.classList.add("pm-audio-fab--in-hero");
      hero.appendChild(fab);
    } else {
      fab.classList.add("pm-audio-fab--fallback");
      document.body.appendChild(fab);
    }

    fab.classList.add("pm-audio-fab--mounted");
    updateFab();
  }

  function mountFab() {
    if (document.querySelector(".pm-audio-fab")) {
      fab = document.querySelector(".pm-audio-fab");
      relocateFab();
      return;
    }

    fab = document.createElement("button");
    fab.type = "button";
    fab.className = "pm-audio-fab";
    fab.addEventListener("click", () => {
      if (playing) stopAmbient();
      else startAmbient();
    });

    const hero = findPageHero();
    if (hero) {
      hero.classList.add("pm-audio-fab-host");
      fab.classList.add("pm-audio-fab--in-hero");
      hero.appendChild(fab);
    } else {
      fab.classList.add("pm-audio-fab--fallback");
      document.body.appendChild(fab);
    }

    updateFab();
    window.requestAnimationFrame(() => {
      fab?.classList.add("pm-audio-fab--mounted");
    });
  }

  let gestureResumeBound = false;

  function bindGestureResume() {
    if (gestureResumeBound || playing) return;
    gestureResumeBound = true;

    const resumeOnGesture = () => {
      gestureResumeBound = false;
      if (!isAudioEnabledInStorage() || playing) return;
      startAmbient({ resume: true });
    };

    document.addEventListener("pointerdown", resumeOnGesture, {
      once: true,
      capture: true,
      passive: true,
    });
    document.addEventListener("keydown", resumeOnGesture, {
      once: true,
      capture: true,
    });
  }

  async function restoreAmbientFromStorage() {
    if (!isAudioEnabledInStorage()) return;
    fab?.classList.add("pm-audio-fab--remembered");
    if (playing) {
      relocateFab();
      return;
    }
    await startAmbient({ resume: true });
    if (ctx?.state === "suspended") bindGestureResume();
  }

  function onVisibility() {
    if (!ctx || !master || !playing) return;
    if (document.hidden) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(0, ctx.currentTime);
    } else {
      fadeTo(TARGET_VOLUME, FADE_IN_SEC);
    }
  }

  function initAudio() {
    if (REDUCED) return;
    mountFab();
    restoreAmbientFromStorage();
    window.addEventListener("pageshow", (event) => {
      if (event.persisted && isAudioEnabledInStorage() && !playing) {
        restoreAmbientFromStorage();
      }
    });
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("pm:navigation", relocateFab);
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => window.setTimeout(updateFab, 50));
    });
  }
window.PaleomaginaAudio = {
    start: startAmbient,
    stop: stopAmbient,
    isPlaying: () => playing,
    isEnabled: isAudioEnabledInStorage,
    relocateFab,
  };


  function refreshAfterNav() {
    window.PaleomaginaText?.refresh?.();
    window.PaleomaginaSections?.refresh?.();
    window.PaleomaginaParallax?.refresh?.();
  }

  function initCinema() {
    initScroll();
    initAtmosphere();
    initParallax();
    initText();
    initSectionsEntry();
    initAudio();
    window.PaleomaginaCinema = {
      refreshAfterNav,
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCinema);
  } else {
    initCinema();
  }
})();
