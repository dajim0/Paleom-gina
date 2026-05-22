// ═══════════════════════════════════════════════════════════════════
// script.js — Paleomagina · Lógica compartida en todas las páginas
// ═══════════════════════════════════════════════════════════════════

// ── Estado global ────────────────────────────────────────────────────
const defaultLang = "es";
let currentLang = defaultLang;
const themeStorageKey = "paleomagina-theme";
let currentTheme = "light";

// ── Exponer helper de traducción (timeline.js y otros módulos) ───────
function paleomaginaT(key) {
  return translations[currentLang]?.[key] ?? translations.es[key] ?? "";
}
window.paleomaginaT = paleomaginaT;

// ── Iconos del botón de tema ─────────────────────────────────────────
const THEME_ICON_MOON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
const THEME_ICON_SUN =
  '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';

const pageTransitionDuration = 520;

// ── Render grid de ámbitos (página ambitos.html) ─────────────────────
function renderScopes(lang) {
  const container = document.getElementById("ambitos-grid");
  if (!container) return;
  container.innerHTML = scopes
    .map((scope) => {
      const title = lang === "es" ? scope.title_es : scope.title_en;
      const description = scopeDescriptions[lang][scope.key];
      const meta = translations[lang].scope_meta;
      return `
        <article class="card">
          <h3 class="scope-title"><span class="scope-code">${scope.code}</span> - ${title}</h3>
          <p>${description}</p>
          <p class="scope-meta">${meta}</p>
        </article>`;
    })
    .join("");
}

// ── Acordeón de recorrido AAN–ATZ (ambitos.html) ─────────────────────
function initAmbitosExhibitRoute() {
  const root = document.getElementById("exhibit-route-accordion");
  if (!root || typeof scopeContents === "undefined") return;
  const lang = currentLang === "en" ? "en" : "es";
  const order = ["AAN", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "ATZ"];
  const accDomId = "exhibit-route-bs-accordion";
  root.innerHTML = "";

  const acc = document.createElement("div");
  acc.className = "accordion accordion-flush pm-exhibit-route-accordion";
  acc.id = accDomId;

  order.forEach((code, idx) => {
    const sc = scopeContents[code]?.[lang];
    if (!sc) return;

    const collapseId = `exhibit-collapse-${code}`;
    const headingId = `exhibit-heading-${code}`;
    const item = document.createElement("div");
    item.className = "accordion-item";

    const hEl = document.createElement("h2");
    hEl.className = "accordion-header";
    hEl.id = headingId;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "accordion-button collapsed";
    btn.setAttribute("data-bs-toggle", "collapse");
    btn.setAttribute("data-bs-target", `#${collapseId}`);
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", collapseId);
    btn.textContent = sc.title;

    const region = document.createElement("div");
    region.id = collapseId;
    region.className = "accordion-collapse collapse";
    region.setAttribute("aria-labelledby", headingId);
    region.setAttribute("data-bs-parent", `#${accDomId}`);

    const body = document.createElement("div");
    body.className = "accordion-body";

    const p1 = document.createElement("p");
    p1.className = "small text-muted mb-2";
    p1.textContent = sc.description;

    const p2 = document.createElement("p");
    p2.className = "mb-2";
    p2.textContent = sc.content;

    body.appendChild(p1);
    body.appendChild(p2);

    if (sc.timeline) {
      const p3 = document.createElement("p");
      p3.className = "small fw-semibold mb-1";
      p3.textContent = sc.timeline;
      body.appendChild(p3);
    }

    if (sc.related) {
      const pRelated = document.createElement("p");
      pRelated.className = "small route-related-note mb-2";
      pRelated.textContent = sc.related;
      body.appendChild(pRelated);
    }

    if (Array.isArray(sc.facts) && sc.facts.length) {
      const ul = document.createElement("ul");
      ul.className = "small mb-0";
      sc.facts.forEach((fact) => {
        const li = document.createElement("li");
        li.textContent = fact;
        ul.appendChild(li);
      });
      body.appendChild(ul);
    }

    region.appendChild(body);
    hEl.appendChild(btn);
    item.appendChild(hEl);
    item.appendChild(region);
    acc.appendChild(item);
  });

  root.appendChild(acc);
  const aria = paleomaginaT("expo_route_accordion_aria");
  if (aria) acc.setAttribute("aria-label", aria);
}

// ── Carrito de entradas (recursos.html) ───────────────────────────────
const ticketCartStorageKey = "paleomagina-ticket-cart";
let ticketCart = {};

function loadTicketCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(ticketCartStorageKey) || "{}");
    ticketCart = saved && typeof saved === "object" ? saved : {};
  } catch {
    ticketCart = {};
  }
}

function saveTicketCart() {
  try { localStorage.setItem(ticketCartStorageKey, JSON.stringify(ticketCart)); } catch (_) { }
}

function getTicketProducts() {
  return [...document.querySelectorAll("[data-ticket-product]")].reduce((acc, node) => {
    const id = node.dataset.ticketId;
    if (!id) return acc;
    acc[id] = {
      id,
      price: Number(node.dataset.ticketPrice || 0),
      titleKey: node.dataset.ticketTitleKey || "",
    };
    return acc;
  }, {});
}

function formatTicketPrice(value) {
  return `${Number(value || 0).toFixed(0)}€`;
}

function ticketProductTitle(product) {
  return paleomaginaT(product.titleKey) || product.id;
}

function updateTicketCart(id, delta) {
  const next = Math.max(0, Number(ticketCart[id] || 0) + delta);
  if (next === 0) delete ticketCart[id];
  else ticketCart[id] = next;
  saveTicketCart();
  renderTicketCart();
}

function clearTicketCart() {
  ticketCart = {};
  saveTicketCart();
  renderTicketCart();
}

function ticketCartEntries() {
  const products = getTicketProducts();
  return Object.entries(ticketCart)
    .map(([id, qty]) => ({ product: products[id], qty: Number(qty) || 0 }))
    .filter((entry) => entry.product && entry.qty > 0);
}

function ticketCartTotal(entries = ticketCartEntries()) {
  return entries.reduce((sum, entry) => sum + entry.product.price * entry.qty, 0);
}

function renderTicketCart() {
  const itemsRoot = document.querySelector("[data-cart-items]");
  const totalNode = document.querySelector("[data-cart-total]");
  const checkoutBtn = document.querySelector("[data-cart-checkout]");
  if (!itemsRoot || !totalNode || !checkoutBtn) return;

  const entries = ticketCartEntries();
  itemsRoot.innerHTML = "";

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "ticket-cart__empty";
    empty.textContent = paleomaginaT("cart_empty");
    itemsRoot.appendChild(empty);
  } else {
    entries.forEach(({ product, qty }) => {
      const row = document.createElement("div");
      row.className = "ticket-cart__row";

      const info = document.createElement("div");
      const title = document.createElement("span");
      title.className = "ticket-cart__item-title";
      title.textContent = ticketProductTitle(product);
      const meta = document.createElement("span");
      meta.className = "ticket-cart__item-meta";
      meta.textContent = `${formatTicketPrice(product.price)} x ${qty}`;
      info.appendChild(title);
      info.appendChild(meta);

      const qtyControl = document.createElement("div");
      qtyControl.className = "ticket-cart__qty";
      qtyControl.innerHTML = `
        <button type="button" data-cart-dec="${product.id}" aria-label="${paleomaginaT("cart_decrease")}">-</button>
        <span>${qty}</span>
        <button type="button" data-cart-inc="${product.id}" aria-label="${paleomaginaT("cart_increase")}">+</button>
      `;

      row.appendChild(info);
      row.appendChild(qtyControl);
      itemsRoot.appendChild(row);
    });
  }

  totalNode.textContent = formatTicketPrice(ticketCartTotal(entries));
  checkoutBtn.disabled = entries.length === 0;
}

function checkoutTicketCart() {
  const entries = ticketCartEntries();
  if (!entries.length) return;

  const lines = entries.map(({ product, qty }) => {
    const lineTotal = product.price * qty;
    return `- ${ticketProductTitle(product)} x ${qty}: ${formatTicketPrice(lineTotal)}`;
  });
  const total = formatTicketPrice(ticketCartTotal(entries));
  const subject = encodeURIComponent(paleomaginaT("cart_email_subject"));
  const body = encodeURIComponent([
    paleomaginaT("cart_email_intro"),
    "",
    ...lines,
    "",
    `${paleomaginaT("cart_total")}: ${total}`,
    "",
    paleomaginaT("cart_email_footer"),
  ].join("\n"));
  window.location.href = `mailto:info@paleomagina.org?subject=${subject}&body=${body}`;
}

function initTicketCart() {
  if (!document.querySelector(".ticket-cart")) return;
  loadTicketCart();
  renderTicketCart();

  if (window._pmTicketCartBound) return;
  window._pmTicketCartBound = true;
  document.addEventListener("click", (event) => {
    const add = event.target.closest("[data-cart-add]");
    if (add) {
      event.preventDefault();
      updateTicketCart(add.dataset.cartAdd, 1);
      return;
    }

    const inc = event.target.closest("[data-cart-inc]");
    if (inc) {
      event.preventDefault();
      updateTicketCart(inc.dataset.cartInc, 1);
      return;
    }

    const dec = event.target.closest("[data-cart-dec]");
    if (dec) {
      event.preventDefault();
      updateTicketCart(dec.dataset.cartDec, -1);
      return;
    }

    if (event.target.closest("[data-cart-clear]")) {
      event.preventDefault();
      clearTicketCart();
      return;
    }

    if (event.target.closest("[data-cart-checkout]")) {
      event.preventDefault();
      checkoutTicketCart();
    }
  });
}

// ── Aplica idioma ────────────────────────────────────────────────────
function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const val = translations[lang][node.dataset.i18n];
    if (val !== undefined) node.textContent = val;
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
    const val = translations[lang][node.dataset.i18nAlt];
    if (val !== undefined) node.setAttribute("alt", val);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const val = translations[lang][node.dataset.i18nAriaLabel];
    if (val !== undefined) node.setAttribute("aria-label", val);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const val = translations[lang][node.dataset.i18nPlaceholder];
    if (val !== undefined) node.setAttribute("placeholder", val);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  renderScopes(lang);
  updateThemeButtonLabel();
  initAmbitosExhibitRoute();
  initTicketCart();
}

// ── Botón de tema ────────────────────────────────────────────────────
function updateThemeButtonLabel() {
  const labelKey = currentTheme === "dark" ? "theme_mode_light" : "theme_mode_dark";
  const label = translations[currentLang]?.[labelKey] || "Theme";
  const icon = currentTheme === "dark" ? THEME_ICON_SUN : THEME_ICON_MOON;
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.innerHTML = `<span class="theme-toggle-icon">${icon}</span><span class="visually-hidden">${label}</span>`;
    btn.setAttribute("aria-label", label);
    btn.title = label;
  });
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem(themeStorageKey, theme); } catch (_) { }
  updateThemeButtonLabel();
}

// ── Navegación suave (mantiene audio sin cortes) ─────────────────────
const AUDIO_STORAGE_KEY = "paleomagina-audio-enabled";
let softNavInFlight = false;

function isAudioPersistenceActive() {
  try {
    return localStorage.getItem(AUDIO_STORAGE_KEY) === "1";
  } catch (_) {
    return false;
  }
}

function shouldUseSoftNavigation() {
  return (
    isAudioPersistenceActive() ||
    window.PaleomaginaAudio?.isPlaying?.() === true
  );
}

function getBodySwapNodes(root = document.body) {
  return [...root.children].filter(
    (el) =>
      !(el.tagName === "NAV" && el.classList.contains("pm-topnav")) &&
      el.tagName !== "SCRIPT" &&
      !el.classList?.contains("pm-atmosphere")
  );
}

function replaceBodyContentFrom(doc) {
  const anchor = document.body.querySelector(":scope > script");
  getBodySwapNodes().forEach((node) => node.remove());
  getBodySwapNodes(doc.body).forEach((node) => {
    document.body.insertBefore(document.importNode(node, true), anchor);
  });
}

function syncPageMeta(doc) {
  const title = doc.querySelector("title");
  if (title) document.title = title.textContent;
  const lang = doc.documentElement.getAttribute("lang");
  if (lang) document.documentElement.lang = lang;
}

function loadScriptOnce(src) {
  const file = src.split("/").pop();
  if ([...document.scripts].some((s) => (s.src || "").includes(file))) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = new URL(src, window.location.href).href;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`script ${src}`));
    document.body.appendChild(el);
  });
}

async function loadExtraScriptsFrom(doc) {
  const tags = [...doc.body.querySelectorAll(":scope > script[src]")];
  for (const tag of tags) {
    const src = tag.getAttribute("src") || "";
    if (
      !src ||
      src.includes("bootstrap") ||
      src.includes("data.js") ||
      src.includes("script.js")
    ) {
      continue;
    }
    await loadScriptOnce(src);
  }
}

function syncTopNavFromDocument(doc) {
  const liveNav = document.querySelector(".pm-topnav");
  const newNav = doc.querySelector(".pm-topnav");
  if (!liveNav || !newNav) return;

  const liveList = liveNav.querySelector(".navbar-nav.pm-nav-scroll");
  const newList = newNav.querySelector(".navbar-nav.pm-nav-scroll");
  if (liveList && newList) {
    liveList.replaceWith(document.importNode(newList, true));
  }
}

function reinitializeAfterSoftNav(url, doc) {
  if (doc) syncTopNavFromDocument(doc);
  applyLanguage(currentLang);
  initMainNavActiveState();
  initScrollReveal();
  window.PaleomaginaScroll?.scrollTo?.(0, { immediate: true });
  window.PaleomaginaScroll?.sync?.();

  if (window.PaleomaginaCinema?.refreshAfterNav) {
    window.PaleomaginaCinema.refreshAfterNav();
  } else {
    window.PaleomaginaText?.refresh?.();
    window.PaleomaginaSections?.refresh?.();
    window.PaleomaginaParallax?.refresh?.();
  }

  document.dispatchEvent(
    new CustomEvent("pm:navigation", { detail: { url, soft: true } })
  );
}

async function navigateSoft(url, { historyMode = "push" } = {}) {
  if (softNavInFlight) return;
  softNavInFlight = true;

  try {
    const res = await fetch(url, {
      credentials: "same-origin",
      headers: { Accept: "text/html" },
    });
    if (!res.ok) throw new Error(String(res.status));

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    replaceBodyContentFrom(doc);
    syncPageMeta(doc);

    if (historyMode === "replace") {
      history.replaceState({ pmSoft: true }, "", url);
    } else {
      history.pushState({ pmSoft: true }, "", url);
    }

    await loadExtraScriptsFrom(doc);
    reinitializeAfterSoftNav(url, doc);

    document.body.classList.remove("page-leaving");
    document.body.classList.add("page-ready");
    window.scrollTo(0, 0);
  } catch (_) {
    window.location.href = url;
  } finally {
    softNavInFlight = false;
  }
}

// ── Transiciones de página ───────────────────────────────────────────
function isNavigableInternalLink(link) {
  if (!link?.href) return false;
  if (link.target?.toLowerCase() === "_blank") return false;
  if (link.hasAttribute("download")) return false;
  if (link.dataset.noTransition === "true") return false;
  if (link.href.startsWith("mailto:") || link.href.startsWith("tel:")) return false;
  let dest;
  try { dest = new URL(link.href, window.location.href); } catch { return false; }
  if (dest.origin !== window.location.origin) return false;
  const samePath = dest.pathname === window.location.pathname;
  if (samePath && dest.search === window.location.search && dest.hash) return false;
  return true;
}

function enablePageTransitions() {
  document.body.classList.add("page-transition");
  requestAnimationFrame(() => document.body.classList.add("page-ready"));
  window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-leaving");
    document.body.classList.add("page-ready");
  });
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest("a[href]");
    if (!isNavigableInternalLink(link)) return;
    e.preventDefault();
    document.body.classList.add("page-leaving");

    if (shouldUseSoftNavigation()) {
      window.setTimeout(() => {
        navigateSoft(link.href);
      }, Math.round(pageTransitionDuration * 0.55));
      return;
    }

    window.setTimeout(() => {
      window.location.href = link.href;
    }, pageTransitionDuration);
  });

  window.addEventListener("popstate", () => {
    if (!shouldUseSoftNavigation()) return;
    document.body.classList.add("page-leaving");
    navigateSoft(window.location.href, { historyMode: "replace" });
  });
}

// ── Nav activa según página actual ───────────────────────────────────
function initMainNavActiveState() {
  const nav = document.querySelector(".pm-topnav");
  if (!nav) return;
  const path = window.location.pathname.replace(/\\/g, "/");
  const segs = path.split("/").filter(Boolean);
  let curFile = segs.length ? segs[segs.length - 1] : "";
  if (!curFile.includes(".")) curFile = "index.html";

  nav.querySelectorAll("ul.navbar-nav a.nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    try {
      const resolved = new URL(href, window.location.href);
      let lf = resolved.pathname.split("/").filter(Boolean).pop() || "";
      if (!lf.includes(".")) lf = "index.html";
      const match = lf === curFile;
      link.classList.toggle("active", match);
      if (match) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    } catch { }
  });
}

function keepTopNavFixed() {
  const nav = document.querySelector(".pm-topnav");
  if (!nav) return;

  nav.classList.add("fixed-top");
  nav.style.setProperty("position", "fixed", "important");
  nav.style.setProperty("top", "0", "important");
  nav.style.setProperty("right", "0", "important");
  nav.style.setProperty("left", "0", "important");
  nav.style.setProperty("width", "100%", "important");
  nav.style.setProperty("z-index", "12000", "important");
  nav.style.setProperty("transform", "none", "important");
  nav.style.setProperty("background-color", "#212529", "important");

  nav.querySelectorAll(".navbar-brand, .nav-link, .theme-toggle, .lang-btn").forEach((el) => {
    el.style.setProperty("color", "rgba(255, 255, 255, 0.92)", "important");
  });
}

function getTimeOfDayTheme(hour) {
  if (hour >= 5 && hour < 11) return { className: "time-morning", label: "Amanecer" };
  if (hour >= 11 && hour < 17) return { className: "time-afternoon", label: "Mediodía" };
  if (hour >= 17 && hour < 21) return { className: "time-evening", label: "Tarde" };
  return { className: "time-night", label: "Noche" };
}

function initTimeOfDayEffects() {
  const now = new Date();
  const theme = getTimeOfDayTheme(now.getHours());
  document.body.classList.remove("time-morning", "time-afternoon", "time-evening", "time-night");
  document.body.classList.add(theme.className);
  const chip = document.getElementById("timeOfDayChip");
  if (chip) {
    chip.textContent = `${theme.label} · ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
}

function initScrollReveal() {
  const items = [...document.querySelectorAll(".animate-on-scroll")];
  if (!items.length) return;
  if (document.documentElement.classList.contains("pm-cinema")) return;

  if (!window.IntersectionObserver) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: "0px 0px 18% 0px" });

  items.forEach((item) => observer.observe(item));
}

function openVideoOverlay(videoId, videoTitle) {
  const overlay = document.getElementById("videoOverlay");
  const frame = document.getElementById("videoOverlayFrame");
  if (!overlay || !frame || !videoId) return;
  overlay.classList.remove("d-none");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("pm-scroll-locked");
  document.body.style.overflow = "hidden";
  window.PaleomaginaScroll?.pause?.();
  frame.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&cc_load_policy=1&cc_lang_pref=en&hl=en`;
  frame.title = videoTitle || "Video en pantalla grande";
}

function closeVideoOverlay() {
  const overlay = document.getElementById("videoOverlay");
  const frame = document.getElementById("videoOverlayFrame");
  if (!overlay || !frame) return;
  frame.src = "";
  overlay.classList.add("d-none");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("pm-scroll-locked");
  document.body.style.overflow = "";
  window.PaleomaginaScroll?.resume?.();
}

function initVideoOverlay() {
  if (window._pmVideoOverlayBound) return;
  window._pmVideoOverlayBound = true;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".video-launch-button");
    if (btn) {
      const videoId = btn.dataset.videoId;
      const title =
        btn.dataset.videoTitle || btn.getAttribute("aria-label") || "Video";
      openVideoOverlay(videoId, title);
      return;
    }
    if (
      e.target.closest("#videoOverlayClose") ||
      e.target.closest("#videoOverlayBackdrop")
    ) {
      closeVideoOverlay();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const overlay = document.getElementById("videoOverlay");
      if (overlay && !overlay.classList.contains("d-none")) {
        closeVideoOverlay();
      }
    }
  });
}

function initIndexIntroVideo() {
  const overlay = document.getElementById("indexVideoIntroOverlay");
  const video = document.getElementById("indexIntroVideo");
  const skipButton = document.getElementById("indexIntroSkip");
  const soundButton = document.getElementById("indexIntroSound");
  const progressFill = document.getElementById("indexIntroProgress");
  const introShell = overlay.querySelector(".index-video-intro-shell");
  if (!overlay || !video) return;

  const INTRO_LEAVE_MS = 760;

  let hidden = false;
  let fallbackTimer = null;
  let stepsAudio = null;
  let roarAudio = null;
  let introAudioTimers = [];
  let introSoundEnabled = false;
  document.body.classList.add("index-video-intro-visible");
  overlay.setAttribute("aria-hidden", "false");

  const getIntroAudioUrl = (fileName) => new URL(`../audio/${fileName}`, window.location.href).href;

  const cleanupIntroAudio = (audio) => {
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  };

  const stopIntroAudio = () => {
    introAudioTimers.forEach((timer) => window.clearTimeout(timer));
    introAudioTimers = [];
    cleanupIntroAudio(stepsAudio);
    cleanupIntroAudio(roarAudio);
    stepsAudio = null;
    roarAudio = null;
  };

  const playIntroAudio = (kind) => {
    if (hidden) return;
    const isSteps = kind === "steps";
    if (isSteps && stepsAudio) return;
    if (!isSteps && roarAudio) return;

    const audio = new Audio(getIntroAudioUrl(isSteps ? "PASOS.mp3" : "RUGIDO.mp3"));
    audio.volume = isSteps ? 0.16 : 0.18;
    audio.preload = "auto";
    audio.loop = isSteps;
    if (isSteps) stepsAudio = audio;
    else roarAudio = audio;
    audio.play().catch(() => {
      cleanupIntroAudio(audio);
      if (isSteps && stepsAudio === audio) stepsAudio = null;
      if (!isSteps && roarAudio === audio) roarAudio = null;
    });
  };

  const stopSteps = () => {
    cleanupIntroAudio(stepsAudio);
    stepsAudio = null;
  };

  const getIntroAudioCues = () => {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const stepsEndMs = duration
      ? Math.min(Math.max(duration * 0.48 * 1000, 3200), 6200)
      : 4800;
    const roarMs = duration
      ? Math.min(Math.max(duration * 0.56 * 1000, stepsEndMs + 350), 8200)
      : 5600;
    return {
      stepsStartMs: 350,
      stepsEndMs,
      roarMs,
    };
  };

  const scheduleIntroAudio = () => {
    if (hidden || !introSoundEnabled || introAudioTimers.length) return;
    const cues = getIntroAudioCues();
    const currentMs = (video.currentTime || 0) * 1000;
    const addCue = (callback, targetMs) => {
      if (targetMs <= currentMs) return;
      introAudioTimers.push(window.setTimeout(callback, targetMs - currentMs));
    };

    if (currentMs < cues.stepsEndMs) {
      if (currentMs >= cues.stepsStartMs) playIntroAudio("steps");
      else addCue(() => playIntroAudio("steps"), cues.stepsStartMs);
      addCue(stopSteps, cues.stepsEndMs);
    }

    if (currentMs >= cues.roarMs - 800 && currentMs <= cues.roarMs + 2200) {
      playIntroAudio("roar");
    } else {
      addCue(() => playIntroAudio("roar"), cues.roarMs);
    }
  };

  const bindIntroAudioAfterGesture = () => {
    const resumeIntroAudio = () => {
      if (!hidden && introSoundEnabled) scheduleIntroAudio();
    };
    overlay.addEventListener("pointerdown", resumeIntroAudio, { once: true });
    document.addEventListener("keydown", resumeIntroAudio, { once: true });
  };

  const updateIntroProgress = () => {
    if (!progressFill) return;
    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      progressFill.style.width = "0%";
      return;
    }
    const pct = Math.min(100, Math.max(0, (video.currentTime / duration) * 100));
    progressFill.style.width = `${pct}%`;
  };

  const enableIntroSound = () => {
    if (hidden || introSoundEnabled) return;
    introSoundEnabled = true;
    soundButton?.classList.add("index-video-intro-sound--active");
    soundButton?.setAttribute("aria-pressed", "true");
    if (soundButton) soundButton.textContent = "Sonido activado";
    scheduleIntroAudio();
  };

  const hideIntro = () => {
    if (hidden) return;
    hidden = true;
    window.clearTimeout(fallbackTimer);
    overlay.classList.add("index-video-intro-overlay--leaving");
    introShell?.classList.add("index-video-intro-shell--leaving");
    document.body.classList.remove("index-video-intro-visible");
    document.body.classList.add("index-video-page-entering");
    window.setTimeout(() => {
      overlay.classList.add("d-none");
      overlay.setAttribute("aria-hidden", "true");
      video.pause();
      stopIntroAudio();
      if (progressFill) progressFill.style.width = "0%";
    }, INTRO_LEAVE_MS);
    window.setTimeout(() => {
      document.body.classList.remove("index-video-page-entering");
    }, 1200);
  };

  video.addEventListener("canplay", () => overlay.classList.add("index-video-intro-overlay--ready"), { once: true });
  video.addEventListener("loadedmetadata", () => {
    scheduleIntroAudio();
    updateIntroProgress();
  }, { once: true });
  video.addEventListener("timeupdate", updateIntroProgress);
  video.addEventListener("ended", hideIntro, { once: true });
  video.addEventListener("error", hideIntro, { once: true });
  soundButton?.setAttribute("aria-pressed", "false");
  soundButton?.addEventListener("click", enableIntroSound);
  skipButton?.addEventListener("click", hideIntro);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !hidden) hideIntro();
  });

  fallbackTimer = window.setTimeout(hideIntro, 14000);
  scheduleIntroAudio();
  bindIntroAudioAfterGesture();
  video.play().catch(() => {
    overlay.classList.add("index-video-intro-overlay--paused");
  });
}

// ── Listeners globales ───────────────────────────────────────────────
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

document.querySelectorAll(".theme-toggle").forEach((btn) => {
  btn.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark"));
});

// ── Init tema ────────────────────────────────────────────────────────
let initialTheme = "light";
try {
  const saved = localStorage.getItem(themeStorageKey);
  if (saved === "light" || saved === "dark") { initialTheme = saved; }
  else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) { initialTheme = "dark"; }
} catch {
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) initialTheme = "dark";
}

applyTheme(initialTheme);
applyLanguage(defaultLang);
enablePageTransitions();
initMainNavActiveState();
keepTopNavFixed();
initTimeOfDayEffects();
initScrollReveal();
initVideoOverlay();
initIndexIntroVideo();
loadCinematicAtmosphere();
window.addEventListener("scroll", keepTopNavFixed, { passive: true });
window.addEventListener("resize", keepTopNavFixed);
document.addEventListener("pm:navigation", keepTopNavFixed);

function paleomaginaScriptBase() {
  const ref = document.querySelector('script[src*="script.js"]');
  if (!ref) return "";
  const src = ref.getAttribute("src") || "script.js";
  return src.replace(/[^/]*script\.js.*$/, "") || "./";
}

function loadPaleomaginaModule(fileName, onLoad) {
  const base = paleomaginaScriptBase();
  if (!base && !fileName) return;
  const path = base + fileName;
  if ([...document.scripts].some((s) => (s.src || "").includes(fileName))) {
    onLoad?.();
    return;
  }
  const s = document.createElement("script");
  s.src = path;
  s.defer = true;
  if (onLoad) s.onload = onLoad;
  document.head.appendChild(s);
}

function loadCinematicAtmosphere() {
  loadPaleomaginaModule("cinematic.js?v=15");
}

/* ============================================
   MAPA INTERACTIVO - LÓGICA CON PLANTAS (VERSIÓN ESTABLE)
   ============================================ */

function initPaleomaginaMuseumMap() {
  if (!document.getElementById("museumMapSVG")) return;

  const floorsData = {
    'P1': {
      image: '../images/site/Captura_de_pantalla_2026-05-13_132447.png',
      zones: [
        { zoneId: 'A0', name: { es: 'Bienvenida', en: 'Welcome' }, color: '#d4a373', points: '228,152 245,138 276,183 259,193 230,152', scopeKey: 'scope_a0' },
        { zoneId: 'A1', name: { es: 'El mar de Tetis', en: 'The Tethys Sea' }, color: '#e07a5f', points: '214,226 276,184 289,198 355,155 372,227 231,253', scopeKey: 'scope_a1' },
        { zoneId: 'A2', name: { es: 'Geología', en: 'Geology' }, color: '#f2cc8f', points: '279,132 348,117 354,151 311,179', scopeKey: 'scope_a2' },
        { zoneId: 'A3', name: { es: 'Cuaternario', en: 'Quaternary' }, color: '#81b29a', points: '235,46 235,68 279,129 346,114 335,6 276,13 274,40', scopeKey: 'scope_a3' },
        { zoneId: 'A4', name: { es: 'Neandertal', en: 'Neanderthal' }, color: '#3d5a80', points: '233,18 235,44 274,36 273,13', scopeKey: 'scope_a4' },
        { zoneId: 'A5', name: { es: 'Paleolítico superior', en: 'Upper Paleolithic' }, color: '#98c1d9', points: '116,64 160,25 230,17 233,67 164,115', scopeKey: 'scope_a5' },
        { zoneId: 'A6', name: { es: 'Neolítico', en: 'Neolithic' }, color: '#f4a261', points: '71,102 116,63 163,112 112,150', scopeKey: 'scope_a6' },
        { zoneId: 'A7', name: { es: 'Calcolítico', en: 'Chalcolithic' }, color: '#ee6c4d', points: '20,148 56,188 111,150 71,105', scopeKey: 'scope_a7' },
        { zoneId: 'A8', name: { es: 'Ciencia', en: 'Science' }, color: '#a8dadc', points: '57,188 38,212 31,203 14,225 1,160 16,150', scopeKey: 'scope_a8' },
        { zoneId: 'ATZ', name: { es: 'Terraza', en: 'Terrace' }, color: '#1d3557', points: '14,228 52,203 59,215 68,292 29,303', scopeKey: 'scope_atz' },
        { zoneId: 'AAN', name: { es: 'Antesala', en: 'Ante-room' }, color: '#457b9d', points: '210,119 225,111 230,118 251,97 268,121 229,148', scopeKey: 'scope_aan' }
      ]
    },
    'PB': {
      image: '../images/site/Captura_de_pantalla_2026-05-13_132657.png',
      zones: [
        { zoneId: 'PB_1', name: { es: 'Zona 1', en: 'Zone 1' }, color: '#d4a373', points: '560,175 738,52 795,287 722,341 736,359 702,383', scopeKey: 'scope_a0' },
        { zoneId: 'PB_2', name: { es: 'Zona 2', en: 'Zone 2' }, color: '#e07a5f', points: '702,388 735,362 781,426 788,424 841,503 694,532 673,501 745,453', scopeKey: 'scope_aan' },
        { zoneId: 'PB_3', name: { es: 'Zona 3', en: 'Zone 3' }, color: '#81b29a', points: '570,307 626,272 743,451 693,484', scopeKey: 'scope_a2' }
      ]
    }
  };

  let currentFloor = 'PB';
  let renderTaskId = 0;

  function positionMuseumMapTooltip(event, tooltip, container) {
    if (!tooltip || !container) return;

    const pad = 10;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tooltip.classList.remove('d-none');

    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;
    const half = tw / 2;

    let left = x;
    let top = y - th - 14;

    if (left - half < pad) left = pad + half;
    if (left + half > rect.width - pad) left = rect.width - pad - half;

    if (top < pad) top = Math.min(y + 16, rect.height - th - pad);
    if (top + th > rect.height - pad) top = rect.height - th - pad;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.transform = "translate(-50%, 0)";
  }

  function renderMuseumMap(floorKey) {
    const taskId = ++renderTaskId;
    currentFloor = floorKey;

    const svgContainer = document.getElementById('museumMapSVG');
    const mapWrapper = document.querySelector('.museum-map-wrapper');
    const tooltip = document.getElementById('museumMapTooltip');
    const tooltipTitle = document.getElementById('tooltipTitle');
    const tooltipDesc = document.getElementById('tooltipDesc');
    const infoPanel = document.getElementById('museumMapInfoPanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelContent = document.getElementById('panelContent');
    const panelTimeline = document.getElementById('panelTimeline');
    const panelFacts = document.getElementById('panelFacts');
    const legendContainer = document.getElementById('museumMapLegend');
    const mapImg = document.getElementById('museumMapBase');

    if (!svgContainer || !mapImg) return;

    const floorData = floorsData[floorKey];

    // Limpieza del SVG
    while (svgContainer.firstChild) {
      svgContainer.removeChild(svgContainer.firstChild);
    }
    if (legendContainer) legendContainer.innerHTML = '';
    if (infoPanel) infoPanel.classList.add('d-none');
    if (tooltip) tooltip.classList.add('d-none');

    if (!floorData || floorData.zones.length === 0) {
      if (legendContainer) legendContainer.innerHTML = '<p class="text-muted small">Zonas no configuradas aún.</p>';
      return;
    }

    mapImg.src = floorData.image;

    function initMap() {
      if (taskId !== renderTaskId) return;

      const w = mapImg.naturalWidth;
      const h = mapImg.naturalHeight;
      svgContainer.setAttribute('viewBox', `0 0 ${w} ${h}`);
      svgContainer.setAttribute('preserveAspectRatio', 'xMidYMid meet');

      floorData.zones.forEach(zone => {
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', zone.points);
        polygon.setAttribute('class', 'museum-zone');
        polygon.setAttribute('data-zone-id', zone.zoneId);
        polygon.setAttribute('data-zone-color', zone.color);
        polygon.setAttribute('data-scope-key', zone.scopeKey);
        polygon.style.fill = zone.color;

        const showTooltip = (e) => {
          if (taskId !== renderTaskId || !tooltip || !mapWrapper) return;
          const lang = currentLang || 'es';
          if (tooltipTitle) tooltipTitle.textContent = zone.name[lang] || zone.name.es;
          if (tooltipDesc) tooltipDesc.textContent = scopeDescriptions?.[lang]?.[zone.scopeKey] || '';
          positionMuseumMapTooltip(e, tooltip, mapWrapper);
        };

        polygon.addEventListener('mouseenter', showTooltip);
        polygon.addEventListener('mousemove', showTooltip);

        polygon.addEventListener('mouseleave', () => {
          if (tooltip) tooltip.classList.add('d-none');
        });

        polygon.addEventListener('click', () => {
          if (taskId !== renderTaskId) return;
          document.querySelectorAll('.museum-zone').forEach(z => z.classList.remove('active'));
          polygon.classList.add('active');

          const lang = currentLang || 'es';
          const cleanId = zone.zoneId.replace('PB_', '');
          const scopeData = scopeContents?.[cleanId]?.[lang] || scopeContents?.[zone.zoneId]?.[lang];

          if (scopeData && panelTitle && panelContent && infoPanel) {
            panelTitle.textContent = scopeData.title;
            panelContent.textContent = scopeData.content;
            if (panelTimeline) panelTimeline.textContent = scopeData.timeline || '';
            if (panelFacts) {
              panelFacts.innerHTML = '';
              if (Array.isArray(scopeData.facts)) {
                scopeData.facts.forEach(fact => {
                  const li = document.createElement('li');
                  li.textContent = fact;
                  panelFacts.appendChild(li);
                });
              }
            }
            infoPanel.classList.remove('d-none');

            if (window.innerWidth < 768 && infoPanel.scrollIntoView) {
              infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        });

        svgContainer.appendChild(polygon);
      });

      if (legendContainer) {
        legendContainer.innerHTML = floorData.zones.map(zone => {
          const lang = currentLang || 'es';
          return `<button class="museum-legend-item" data-zone-id="${zone.zoneId}">
          <span class="museum-legend-swatch" style="background: ${zone.color}"></span>
          ${zone.name[lang] || zone.name.es}
        </button>`;
        }).join('');
      }
    }

    if (mapImg.complete && mapImg.naturalWidth > 0) {
      initMap();
    } else {
      mapImg.onload = initMap;
    }
  }

  function bindMuseumMapControls() {
    document.querySelectorAll("[data-floor]").forEach((btn) => {
      btn.onclick = () => {
        document.querySelectorAll("[data-floor]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderMuseumMap(btn.dataset.floor);
      };
    });

    const legendContainer = document.getElementById("museumMapLegend");
    if (legendContainer && !legendContainer.dataset.pmBound) {
      legendContainer.dataset.pmBound = "1";
      legendContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".museum-legend-item");
        if (!btn) return;
        const svgContainer = document.getElementById("museumMapSVG");
        if (!svgContainer) return;
        const polygon = svgContainer.querySelector(`[data-zone-id="${btn.dataset.zoneId}"]`);
        if (polygon) {
          polygon.click();
          document.querySelectorAll(".museum-legend-item").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
        }
      });
    }

    const panelCloseBtn = document.getElementById("panelCloseBtn");
    if (panelCloseBtn && !panelCloseBtn.dataset.pmBound) {
      panelCloseBtn.dataset.pmBound = "1";
      panelCloseBtn.onclick = () => {
        const infoPanel = document.getElementById("museumMapInfoPanel");
        if (infoPanel) infoPanel.classList.add("d-none");
        document.querySelectorAll(".museum-zone").forEach((z) => z.classList.remove("active"));
        document.querySelectorAll(".museum-legend-item").forEach((b) => b.classList.remove("active"));
      };
    }
  }

  if (!initPaleomaginaMuseumMap._langHooked && typeof window.applyLanguage === "function") {
    initPaleomaginaMuseumMap._langHooked = true;
    const originalApplyLanguage = window.applyLanguage;
    window.applyLanguage = function (lang) {
      originalApplyLanguage(lang);
      if (document.getElementById("museumMapSVG")) {
        renderMuseumMap(currentFloor);
        const activeZone = document.querySelector(".museum-zone.active");
        if (activeZone) activeZone.click();
      }
    };
  }

  bindMuseumMapControls();
  renderMuseumMap(currentFloor);
}

initPaleomaginaMuseumMap();
document.addEventListener("pm:navigation", initPaleomaginaMuseumMap);
