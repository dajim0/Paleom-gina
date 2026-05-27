/* Paleomagina — experiencia cinematográfica (unificado) */
(function () {
  "use strict";

  const REDUCED =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const MOBILE =
    window.matchMedia?.("(max-width: 767px), (pointer: coarse)")?.matches ?? false;
  const ENABLE_SCROLL_EFFECTS = false;

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
    if (REDUCED || MOBILE) return;
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
      document.documentElement.classList.toggle("pm-cinema-mobile", MOBILE);
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
    document.documentElement.classList.toggle("pm-cinema-mobile", MOBILE);
    if (REDUCED) document.documentElement.classList.add("pm-cinema-reduced");
  }

  function initSectionReveal() {
    /* Transiciones de sección: cinematic-sections.js */
  }

  function getScrollY() {
    return window.PaleomaginaScroll?.getY?.() ?? window.scrollY ?? 0;
  }

  function initScrollDepth() {
    if (!ENABLE_SCROLL_EFFECTS || REDUCED || MOBILE || window.PaleomaginaScroll) return;

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
    if (MOBILE) {
      document.documentElement.classList.add("pm-cinema", "pm-cinema-mobile");
      return;
    }

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
    if (!ENABLE_SCROLL_EFFECTS) {
      window.PaleomaginaScroll = {
        scrollTo,
        scrollToElement,
        getY: () => window.scrollY,
        getTarget: () => window.scrollY,
        pause() {
          state.paused = true;
        },
        resume() {
          state.paused = false;
        },
        sync() { },
        isSmooth: false,
      };
      return;
    }

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

  let parallaxBlocks = [];
  let floatingEls = [];

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

    parallaxBlocks = [...document.querySelectorAll(".pm-parallax-block")];
    floatingEls = [...document.querySelectorAll("[data-pm-float]")];
  }

  function update() {
    const scrollY = getScrollY();
    const vh = window.innerHeight;
    const root = document.documentElement;

    root.style.setProperty("--pm-scroll", `${scrollY}px`);

    parallaxBlocks.forEach((block) => {
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

    floatingEls.forEach((el) => {
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
    if (!ENABLE_SCROLL_EFFECTS || REDUCED || MOBILE) return;

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
  window.PaleomaginaParallax = { refresh: ENABLE_SCROLL_EFFECTS ? update : () => { } };


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
    if (MOBILE) return;

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
    if (MOBILE) return;

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
  const TARGET_VOLUME = 0.14;
  const NARRATION_DUCKED_AMBIENT_VOLUME = 0.05;
  const ICON_SOUND_OFF =
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  const ICON_SOUND_ON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.2a4 4 0 0 1 0 7.6"/><path d="M18.2 5.8a7.5 7.5 0 0 1 0 12.4"/></svg>';
  const ICON_NARRATION_OFF =
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 7h8"/><path d="M8 11h6"/></svg>';
  const ICON_NARRATION_ON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 7h5"/><path d="M16 8.5a3 3 0 0 1 0 5"/><path d="M18.4 6.2a6.5 6.5 0 0 1 0 9.6"/></svg>';

  let ctx = null;
  let master = null;
  let nodes = [];
  let playing = false;
  let fab = null;
  let narrationFab = null;
  let narrationActive = false;
  let narrationQueue = [];
  let narrationIndex = 0;
  let narrationAudio = null;
  let ambientDuckedForNarration = false;
  let preferredNarrationVoice = null;
  const NARRATION_VOLUME = 0.24;
  const PAGE_NARRATIONS = {
    es: {
      index:
        "Bienvenido a Paleomágina. Esta página abre el viaje por Sierra Mágina como archivo del tiempo: mares antiguos, montañas, fósiles, evolución humana y patrimonio. Antes de entrar en detalle puedes orientarte con el viaje visual por eras y preparar la visita con recursos para antes, durante y después del recorrido.",
      paleomagina:
        "Paleomágina es un centro de interpretación para leer Sierra Mágina a través de evidencias. La visita conecta paisaje, ciencia y patrimonio, explica los objetivos del museo y muestra cómo el edificio organiza el relato desde la bienvenida hasta la terraza final.",
      sobre:
        "Paleomágina es un centro de interpretación para leer Sierra Mágina a través de evidencias. La visita conecta paisaje, ciencia y patrimonio, explica los objetivos del museo y muestra cómo el edificio organiza el relato desde la bienvenida hasta la terraza final.",
      "recorrido-expositivo":
        "El recorrido expositivo avanza por ámbitos. Cada sección enlaza tiempo geológico, fósiles, sociedades prehistóricas, método científico y paisaje. Puedes abrir un ámbito con su QR, consultar vídeos relacionados, saltar al glosario y localizarlo en el plano del museo.",
      ambitos:
        "El recorrido expositivo avanza por ámbitos. Cada sección enlaza tiempo geológico, fósiles, sociedades prehistóricas, método científico y paisaje. Puedes abrir un ámbito con su QR, consultar vídeos relacionados, saltar al glosario y localizarlo en el plano del museo.",
      visita:
        "La página de visita reúne la información práctica: horarios, accesibilidad, reservas, entradas, recursos digitales y ficha docente. Está pensada para preparar la llegada al centro y organizar grupos escolares o visitas guiadas.",
      recursos:
        "La página de visita reúne la información práctica: horarios, accesibilidad, reservas, entradas, recursos digitales y ficha docente. Está pensada para preparar la llegada al centro y organizar grupos escolares o visitas guiadas.",
      glosario:
        "El glosario reúne términos clave para comprender Paleomágina: geología, paleontología, arqueología, evolución humana, museografía y patrimonio. Puedes buscar un concepto y relacionarlo con vídeos y ámbitos del recorrido.",
      videos:
        "La biblioteca audiovisual completa la visita con vídeos antes, durante y después del recorrido. Cada pieza se vincula a un ámbito del museo y a términos del glosario para seguir aprendiendo desde casa o desde el aula.",
      audiovisuales:
        "La biblioteca audiovisual completa la visita con vídeos antes, durante y después del recorrido. Cada pieza se vincula a un ámbito del museo y a términos del glosario para seguir aprendiendo desde casa o desde el aula.",
      "ficha-docente":
        "Esta ficha docente resume objetivos, tiempos y recursos para una visita escolar a Paleomágina. Propone una preparación previa, un itinerario en sala y actividades de continuidad mediante vídeos, glosario y mapa.",
      "aviso-legal":
        "Aviso legal de Paleomágina. Esta página recoge la información básica de titularidad, condiciones de uso y responsabilidades del sitio web.",
      privacidad:
        "Política de privacidad de Paleomágina. Aquí se explica el tratamiento de datos personales, los canales de contacto y los derechos de las personas usuarias.",
      cookies:
        "Política de cookies de Paleomágina. Esta página resume qué cookies puede utilizar el sitio, con qué finalidad y cómo gestionarlas desde el navegador.",
      accesibilidad:
        "Declaración de accesibilidad de Paleomágina. El sitio busca facilitar la navegación, la lectura y el acceso a los contenidos digitales para todas las personas.",
    },
    en: {
      index:
        "Welcome to Paleomágina. This page opens the journey through Sierra Mágina as an archive of time: ancient seas, mountains, fossils, human evolution, and heritage. You can begin with the visual journey through eras and prepare your visit with resources for before, during, and after the route.",
      paleomagina:
        "Paleomágina is an interpretation centre for reading Sierra Mágina through evidence. The visit connects landscape, science, and heritage, explains the museum goals, and shows how the building organises the story from welcome to final terrace.",
      sobre:
        "Paleomágina is an interpretation centre for reading Sierra Mágina through evidence. The visit connects landscape, science, and heritage, explains the museum goals, and shows how the building organises the story from welcome to final terrace.",
      "recorrido-expositivo":
        "The exhibition route moves through scopes. Each section links geological time, fossils, prehistoric societies, scientific method, and landscape. You can open a scope by QR, consult related videos, jump to glossary terms, and locate it on the museum plan.",
      ambitos:
        "The exhibition route moves through scopes. Each section links geological time, fossils, prehistoric societies, scientific method, and landscape. You can open a scope by QR, consult related videos, jump to glossary terms, and locate it on the museum plan.",
      visita:
        "The visit page gathers practical information: schedules, accessibility, bookings, tickets, digital resources, and the teacher sheet. It helps prepare arrival at the centre and organise school groups or guided visits.",
      recursos:
        "The visit page gathers practical information: schedules, accessibility, bookings, tickets, digital resources, and the teacher sheet. It helps prepare arrival at the centre and organise school groups or guided visits.",
      glosario:
        "The glossary gathers key terms for understanding Paleomágina: geology, palaeontology, archaeology, human evolution, museography, and heritage. You can search a concept and connect it with videos and exhibition scopes.",
      videos:
        "The audiovisual library extends the visit with videos for before, during, and after the route. Each item links to a museum scope and glossary terms for continued learning at home or in class.",
      audiovisuales:
        "The audiovisual library extends the visit with videos for before, during, and after the route. Each item links to a museum scope and glossary terms for continued learning at home or in class.",
      "ficha-docente":
        "This teacher sheet summarises objectives, timings, and resources for a school visit to Paleomágina. It suggests advance preparation, an in-gallery itinerary, and follow-up activities through videos, glossary, and map.",
      "aviso-legal":
        "Legal notice for Paleomágina. This page includes basic ownership information, website terms of use, and responsibilities.",
      privacidad:
        "Privacy policy for Paleomágina. This page explains personal data processing, contact channels, and user rights.",
      cookies:
        "Cookie policy for Paleomágina. This page summarises which cookies the website may use, their purpose, and how to manage them in the browser.",
      accesibilidad:
        "Accessibility statement for Paleomágina. The website aims to support navigation, reading, and access to digital content for all users.",
    },
  };

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
        audio.play().catch(() => { });
      } catch (_) { }
    });

    audio.addEventListener("error", () => { });
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
    if (ctx.state === "suspended") {
      try { await ctx.resume(); } catch (_) { }
    }
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(value, now + duration);
  }

  function isAudioEnabledInStorage() {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "0";
    } catch (_) {
      return true;
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
    } catch (_) { }
    await fadeTo(TARGET_VOLUME, fadeSec);
    document.documentElement.classList.add("pm-audio-on");
    updateFab();
    fab?.classList.add("pm-audio-fab--remembered");
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (_) { }
  }

  function stopAmbient() {
    playing = false;
    if (ctx && master) fadeTo(0, FADE_OUT_SEC);
    document.documentElement.classList.remove("pm-audio-on");
    updateFab();
    fab?.classList.remove("pm-audio-fab--remembered");
    try {
      localStorage.setItem(STORAGE_KEY, "0");
    } catch (_) { }
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

  function supportsNarration() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  function supportsRecordedNarration() {
    return typeof Audio !== "undefined";
  }

  function hasNarrationPlayback() {
    return supportsRecordedNarration() || supportsNarration();
  }

  function getNarrationLanguage() {
    const lang = document.documentElement.lang || "es";
    return lang.toLowerCase().startsWith("en") ? "en-GB" : "es-ES";
  }

  function getNarrationLangSlug() {
    return getNarrationLanguage().toLowerCase().startsWith("en") ? "en" : "es";
  }

  function getPageNarrationSlug() {
    const file = window.location.pathname.split("/").pop() || "index.html";
    return file.replace(/\.html?$/i, "") || "index";
  }

  function getPageNarrationText() {
    const lang = getNarrationLangSlug();
    const slug = getPageNarrationSlug();
    return PAGE_NARRATIONS[lang]?.[slug] || PAGE_NARRATIONS.es?.[slug] || "";
  }

  function getRecordedNarrationFileName() {
    const pageAudio = {
      index: "INICIO.mp3",
      paleomagina: "PALEOMAGINA.mp3",
      sobre: "PALEOMAGINA.mp3",
      "recorrido-expositivo": "RECORRIDO EXPOSITIVO.mp3",
      ambitos: "RECORRIDO EXPOSITIVO.mp3",
      visita: "VISITA.mp3",
      recursos: "VISITA.mp3",
      glosario: "GLOSARIO.mp3",
      videos: "VIDEOS.mp3",
      audiovisuales: "VIDEOS.mp3",
    };
    const pageSlug = getPageNarrationSlug();
    if (getNarrationLangSlug() === "es" && pageAudio[pageSlug]) return pageAudio[pageSlug];
    return `${pageSlug}-${getNarrationLangSlug()}.mp3`;
  }

  function getCinematicBaseUrl() {
    const script = document.currentScript || document.querySelector('script[src*="cinematic.js"]');
    if (!script?.src) return new URL("../", window.location.href);
    return new URL("./", script.src);
  }

  function getRecordedNarrationUrl() {
    const fileName = getRecordedNarrationFileName();
    return new URL(`audio/relatos/${fileName}`, getCinematicBaseUrl()).href;
  }

  function voiceMatchesLanguage(voice, lang) {
    const voiceLang = (voice?.lang || "").toLowerCase();
    const wanted = lang.toLowerCase();
    const wantedBase = wanted.split("-")[0];
    return voiceLang === wanted || voiceLang.startsWith(`${wantedBase}-`);
  }

  function scoreNarrationVoice(voice, lang) {
    const name = (voice?.name || "").toLowerCase();
    const voiceLang = (voice?.lang || "").toLowerCase();
    let score = 0;

    if (voiceLang === lang.toLowerCase()) score += 80;
    else if (voiceMatchesLanguage(voice, lang)) score += 55;
    if (voice?.localService) score += 4;

    [
      ["natural", 45],
      ["neural", 45],
      ["online", 28],
      ["premium", 24],
      ["google", 22],
      ["microsoft", 18],
      ["helena", 16],
      ["elvira", 16],
      ["alvaro", 14],
      ["pablo", 12],
      ["sonia", 16],
      ["libby", 14],
      ["jenny", 14],
      ["aria", 14],
      ["guy", 10],
      ["desktop", -8],
      ["compact", -10],
    ].forEach(([needle, value]) => {
      if (name.includes(needle)) score += value;
    });

    return score;
  }

  function choosePreferredNarrationVoice() {
    if (!supportsNarration()) return null;
    const lang = getNarrationLanguage();
    const voices = window.speechSynthesis.getVoices?.() || [];
    const candidates = voices.filter((voice) => voiceMatchesLanguage(voice, lang));
    const pool = candidates.length ? candidates : voices;
    preferredNarrationVoice = pool
      .slice()
      .sort((a, b) => scoreNarrationVoice(b, lang) - scoreNarrationVoice(a, lang))[0] || null;
    return preferredNarrationVoice;
  }

  function getPreferredNarrationVoice() {
    if (!preferredNarrationVoice || !voiceMatchesLanguage(preferredNarrationVoice, getNarrationLanguage())) {
      return choosePreferredNarrationVoice();
    }
    return preferredNarrationVoice;
  }

  function isVisibleTextNode(el) {
    if (!el || el.closest("[aria-hidden='true'], [hidden], nav, footer, script, style, noscript")) return false;
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity || 1) !== 0;
  }

  function normalizeNarrationText(text) {
    return (text || "")
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .trim();
  }

  function collectNarrationText() {
    const main = document.getElementById("main-content") || document.querySelector("main");
    if (!main) return "";

    const selector = [
      "h1",
      "h2",
      "h3",
      "p",
      "li",
      "summary",
      ".section-lead",
      ".hero-text",
      ".kicker",
      ".card-title",
      ".av-video-title"
    ].join(",");

    const seen = new Set();
    const parts = [];
    main.querySelectorAll(selector).forEach((el) => {
      if (!isVisibleTextNode(el)) return;
      if (el.closest("button, .btn, .video-overlay, .av-active-filters")) return;
      const text = normalizeNarrationText(el.textContent);
      if (!text || text.length < 3 || seen.has(text)) return;
      seen.add(text);
      parts.push(text);
    });

    return parts.join(". ");
  }

  function splitNarrationText(text) {
    const clean = normalizeNarrationText(text);
    if (!clean) return [];

    const sentences = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [clean];
    const chunks = [];
    let current = "";
    sentences.forEach((sentence) => {
      const next = normalizeNarrationText(sentence);
      if (!next) return;
      if ((current + " " + next).trim().length > 220 && current) {
        chunks.push(current);
        current = next;
      } else {
        current = `${current} ${next}`.trim();
      }
    });
    if (current) chunks.push(current);
    return chunks;
  }

  function duckAmbientForNarration() {
    if (!playing || !ctx || !master) return;
    ambientDuckedForNarration = true;
    fadeTo(NARRATION_DUCKED_AMBIENT_VOLUME, 0.8);
  }

  function restoreAmbientAfterNarration() {
    if (!ambientDuckedForNarration) return;
    ambientDuckedForNarration = false;
    if (playing && ctx && master && !document.hidden) {
      fadeTo(TARGET_VOLUME, 1.2);
    }
  }

  function updateNarrationFab() {
    if (!narrationFab) return;
    const available = hasNarrationPlayback();
    const ariaLabel = !available
      ? t("narration_unavailable", "La narración no está disponible en este navegador")
      : narrationActive
        ? t("narration_toggle_off", "Detener relato de esta página")
        : t("narration_toggle_on", "Escuchar relato de esta página");
    const shortLabel = t("narration_fab_label", "Relato");
    narrationFab.innerHTML = `
      <span class="pm-audio-fab__inner">
        <span class="pm-audio-fab__icon">${narrationActive ? ICON_NARRATION_ON : ICON_NARRATION_OFF}</span>
        <span class="pm-audio-fab__label">${shortLabel}</span>
      </span>
      <span class="visually-hidden">${ariaLabel}</span>
    `;
    narrationFab.disabled = !available;
    narrationFab.setAttribute("aria-label", ariaLabel);
    narrationFab.title = ariaLabel;
    narrationFab.setAttribute("aria-pressed", narrationActive ? "true" : "false");
    narrationFab.classList.toggle("pm-audio-fab--active", narrationActive);
  }

  function finishNarration() {
    narrationActive = false;
    narrationQueue = [];
    narrationIndex = 0;
    cleanupRecordedNarration();
    restoreAmbientAfterNarration();
    updateNarrationFab();
  }

  function cleanupRecordedNarration() {
    if (!narrationAudio) return;
    narrationAudio.pause();
    narrationAudio.removeAttribute("src");
    narrationAudio.load();
    narrationAudio = null;
  }

  function speakNarrationChunk() {
    if (!narrationActive || narrationIndex >= narrationQueue.length) {
      finishNarration();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(narrationQueue[narrationIndex]);
    utterance.lang = getNarrationLanguage();
    utterance.voice = getPreferredNarrationVoice();
    utterance.rate = 0.9;
    utterance.pitch = 0.96;
    utterance.volume = NARRATION_VOLUME;
    utterance.onend = () => {
      narrationIndex += 1;
      speakNarrationChunk();
    };
    utterance.onerror = finishNarration;
    window.speechSynthesis.speak(utterance);
  }

  function startSpeechNarration() {
    if (!supportsNarration()) {
      finishNarration();
      return;
    }
    window.speechSynthesis.cancel();
    narrationQueue = splitNarrationText(getPageNarrationText() || collectNarrationText());
    if (!narrationQueue.length) {
      finishNarration();
      return;
    }
    choosePreferredNarrationVoice();
    narrationIndex = 0;
    speakNarrationChunk();
  }

  function playRecordedNarration() {
    if (!supportsRecordedNarration()) {
      startSpeechNarration();
      return;
    }

    const audio = new Audio(getRecordedNarrationUrl());
    narrationAudio = audio;
    audio.volume = NARRATION_VOLUME;
    audio.preload = "auto";
    audio.addEventListener("ended", finishNarration, { once: true });
    audio.addEventListener("error", () => {
      if (narrationAudio !== audio || !narrationActive) return;
      cleanupRecordedNarration();
      startSpeechNarration();
    }, { once: true });

    const playPromise = audio.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        if (narrationAudio !== audio || !narrationActive) return;
        cleanupRecordedNarration();
        startSpeechNarration();
      });
    }
  }

  function startNarration() {
    if (!hasNarrationPlayback()) return;
    if (supportsNarration()) window.speechSynthesis.cancel();
    cleanupRecordedNarration();
    narrationActive = true;
    duckAmbientForNarration();
    updateNarrationFab();
    playRecordedNarration();
  }

  function stopNarration() {
    if (supportsNarration()) window.speechSynthesis.cancel();
    finishNarration();
  }

  function findPageHero() {
    return document.querySelector(".hero, .page-hero, .hero-simple");
  }

  function shouldShowPageAudioControls() {
    return getPageNarrationSlug() !== "ficha-docente";
  }

  function shouldShowNarrationControl() {
    const pagesWithoutNarration = ["lectura-facil", "inventario-qr", "qr-recursos"];
    return shouldShowPageAudioControls() && !pagesWithoutNarration.includes(getPageNarrationSlug());
  }

  function getHeroAudioTarget(hero) {
    if (!hero) return null;
    let target = hero.querySelector(".pm-hero-audio-controls");
    if (target) {
      if (target.parentElement !== hero) hero.appendChild(target);
      target.querySelector(".pm-hero-audio-controls__label")?.remove();
      return target;
    }

    target = document.createElement("div");
    target.className = "pm-hero-audio-controls";
    hero.appendChild(target);
    return target;
  }

  function relocateFab() {
    if (!fab && !narrationFab) return;

    if (!shouldShowPageAudioControls()) {
      stopNarration();
      if (playing) stopAmbient();
      document.querySelectorAll(".pm-hero-audio-controls").forEach((node) => node.remove());
      [fab, narrationFab].forEach((button) => {
        if (!button) return;
        button.hidden = true;
        button.classList.remove("pm-audio-fab--in-hero", "pm-audio-fab--fallback");
        document.body.appendChild(button);
      });
      return;
    }

    document.querySelectorAll(".pm-audio-fab-host").forEach((host) => {
      host.classList.remove("pm-audio-fab-host");
    });
    const showNarration = shouldShowNarrationControl();
    if (!showNarration) stopNarration();

    if (fab) {
      fab.hidden = false;
      fab.classList.remove("pm-audio-fab--in-hero", "pm-audio-fab--fallback");
    }
    if (narrationFab) {
      narrationFab.hidden = !showNarration;
      narrationFab.classList.remove("pm-audio-fab--in-hero", "pm-audio-fab--fallback");
    }

    const hero = findPageHero();
    const target = getHeroAudioTarget(hero) || document.body;
    if (hero) hero.classList.add("pm-audio-fab-host");

    [fab, showNarration ? narrationFab : null].forEach((button) => {
      if (!button) return;
      button.classList.add(hero ? "pm-audio-fab--in-hero" : "pm-audio-fab--fallback");
      target.appendChild(button);
    });
    if (narrationFab && !showNarration) document.body.appendChild(narrationFab);

    fab?.classList.add("pm-audio-fab--mounted");
    if (showNarration) narrationFab?.classList.add("pm-audio-fab--mounted");
    updateFab();
    if (showNarration) updateNarrationFab();
  }

  function mountFab() {
    if (document.querySelector(".pm-audio-fab:not(.pm-narration-fab)")) {
      fab = document.querySelector(".pm-audio-fab:not(.pm-narration-fab)");
      narrationFab = document.querySelector(".pm-narration-fab");
      if (!narrationFab) {
        narrationFab = document.createElement("button");
        narrationFab.type = "button";
        narrationFab.className = "pm-audio-fab pm-narration-fab";
        narrationFab.addEventListener("click", () => {
          if (narrationActive) stopNarration();
          else startNarration();
        });
      }
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

    narrationFab = document.createElement("button");
    narrationFab.type = "button";
    narrationFab.className = "pm-audio-fab pm-narration-fab";
    narrationFab.addEventListener("click", () => {
      if (narrationActive) stopNarration();
      else startNarration();
    });

    relocateFab();

    updateFab();
    updateNarrationFab();
    window.requestAnimationFrame(() => {
      fab?.classList.add("pm-audio-fab--mounted");
      narrationFab?.classList.add("pm-audio-fab--mounted");
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
    if (!shouldShowPageAudioControls()) return;
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
    mountFab();
    if (!REDUCED) restoreAmbientFromStorage();
    document.addEventListener("pm:ambient-requested", () => startAmbient({ resume: true }));
    window.addEventListener("pageshow", (event) => {
      if (event.persisted && isAudioEnabledInStorage() && !playing) {
        restoreAmbientFromStorage();
      }
    });
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("pm:navigation", relocateFab);
    document.addEventListener("pm:navigation", stopNarration);
    window.addEventListener("beforeunload", stopNarration);
    if (supportsNarration()) {
      choosePreferredNarrationVoice();
      window.speechSynthesis.onvoiceschanged = () => {
        choosePreferredNarrationVoice();
        updateNarrationFab();
      };
    }
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => window.setTimeout(() => {
        stopNarration();
        choosePreferredNarrationVoice();
        updateFab();
        updateNarrationFab();
      }, 50));
    });
  }
  window.PaleomaginaAudio = {
    start: startAmbient,
    stop: stopAmbient,
    isPlaying: () => playing,
    isEnabled: isAudioEnabledInStorage,
    relocateFab,
  };
  window.PaleomaginaNarration = {
    start: startNarration,
    stop: stopNarration,
    isPlaying: () => narrationActive,
    relocateFab,
  };


  function refreshAfterNav() {
    window.PaleomaginaText?.refresh?.();
    window.PaleomaginaSections?.refresh?.();
    window.PaleomaginaParallax?.refresh?.();
    relocateFab();
    updateFab();
    updateNarrationFab();
    if (!REDUCED) restoreAmbientFromStorage();
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
