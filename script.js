// ═══════════════════════════════════════════════════════════════════
// script.js — Paleomagina · Lógica compartida en todas las páginas
// ═══════════════════════════════════════════════════════════════════

// ── Estado global ────────────────────────────────────────────────────
const defaultLang      = "es";
let   currentLang      = defaultLang;
const themeStorageKey  = "paleomagina-theme";
let   currentTheme     = "light";

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

const pageTransitionDuration = 280;

// ── Render grid de ámbitos (página ambitos.html) ─────────────────────
function renderScopes(lang) {
  const container = document.getElementById("ambitos-grid");
  if (!container) return;
  container.innerHTML = scopes
    .map((scope) => {
      const title       = lang === "es" ? scope.title_es : scope.title_en;
      const description = scopeDescriptions[lang][scope.key];
      const meta        = translations[lang].scope_meta;
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
  const lang     = currentLang === "en" ? "en" : "es";
  const order    = ["AAN","A0","A1","A2","A3","A4","A5","A6","A7","A8","A9","ATZ"];
  const accDomId = "exhibit-route-bs-accordion";
  root.innerHTML = "";

  const acc = document.createElement("div");
  acc.className = "accordion accordion-flush pm-exhibit-route-accordion";
  acc.id = accDomId;

  order.forEach((code, idx) => {
    const sc = scopeContents[code]?.[lang];
    if (!sc) return;

    const collapseId = `exhibit-collapse-${code}`;
    const headingId  = `exhibit-heading-${code}`;
    const item       = document.createElement("div");
    item.className   = "accordion-item";

    const hEl = document.createElement("h2");
    hEl.className = "accordion-header";
    hEl.id = headingId;

    const btn = document.createElement("button");
    btn.type      = "button";
    btn.className = `accordion-button${idx === 0 ? "" : " collapsed"}`;
    btn.setAttribute("data-bs-toggle",  "collapse");
    btn.setAttribute("data-bs-target",  `#${collapseId}`);
    btn.setAttribute("aria-expanded",   idx === 0 ? "true" : "false");
    btn.setAttribute("aria-controls",   collapseId);
    btn.textContent = sc.title;

    const region = document.createElement("div");
    region.id        = collapseId;
    region.className = `accordion-collapse collapse${idx === 0 ? " show" : ""}`;
    region.setAttribute("aria-labelledby", headingId);
    region.setAttribute("data-bs-parent",  `#${accDomId}`);

    const body = document.createElement("div");
    body.className = "accordion-body";

    const p1 = document.createElement("p");
    p1.className   = "small text-muted mb-2";
    p1.textContent = sc.description;

    const p2 = document.createElement("p");
    p2.className   = "mb-2";
    p2.textContent = sc.content;

    body.appendChild(p1);
    body.appendChild(p2);

    if (sc.timeline) {
      const p3 = document.createElement("p");
      p3.className   = "small fw-semibold mb-1";
      p3.textContent = sc.timeline;
      body.appendChild(p3);
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
}

// ── Botón de tema ────────────────────────────────────────────────────
function updateThemeButtonLabel() {
  const labelKey = currentTheme === "dark" ? "theme_mode_light" : "theme_mode_dark";
  const label    = translations[currentLang]?.[labelKey] || "Theme";
  const icon     = currentTheme === "dark" ? THEME_ICON_SUN : THEME_ICON_MOON;
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.innerHTML = `<span class="theme-toggle-icon">${icon}</span><span class="visually-hidden">${label}</span>`;
    btn.setAttribute("aria-label", label);
    btn.title = label;
  });
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem(themeStorageKey, theme); } catch (_) {}
  updateThemeButtonLabel();
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
    window.setTimeout(() => { window.location.href = link.href; }, pageTransitionDuration);
  });
}

// ── Nav activa según página actual ───────────────────────────────────
function initMainNavActiveState() {
  const nav = document.querySelector(".pm-topnav");
  if (!nav) return;
  const path    = window.location.pathname.replace(/\\/g, "/");
  const segs    = path.split("/").filter(Boolean);
  let   curFile = segs.length ? segs[segs.length - 1] : "";
  if (!curFile.includes(".")) curFile = "index.html";

  nav.querySelectorAll("ul.navbar-nav a.nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    try {
      const resolved = new URL(href, window.location.href);
      let   lf       = resolved.pathname.split("/").filter(Boolean).pop() || "";
      if (!lf.includes(".")) lf = "index.html";
      const match = lf === curFile;
      link.classList.toggle("active", match);
      if (match) link.setAttribute("aria-current", "page");
      else       link.removeAttribute("aria-current");
    } catch {}
  });
}

// ── Subnavegación de la página Sobre ────────────────────────────────
function initSobreSectionNav() {
  const nav = document.querySelector(".sobre-section-nav");
  if (!nav) return;
  const links    = [...nav.querySelectorAll("a.sobre-section-nav-link")];
  const sections = links
    .map((l) => { const id = l.getAttribute("href")?.replace("#", ""); return id ? document.getElementById(id) : null; })
    .filter(Boolean);
  if (!sections.length) return;

  function setActiveNavById(id) {
    links.forEach((l) => {
      const on = l.getAttribute("href") === `#${id}`;
      l.classList.toggle("active", on);
      if (on) l.setAttribute("aria-current", "true");
      else    l.removeAttribute("aria-current");
    });
  }

  function updateActive() {
    const y = window.scrollY + 168;
    let cur = sections[0].id;
    for (const sec of sections) { if (sec.offsetTop <= y) cur = sec.id; }
    setActiveNavById(cur);
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(() => { updateActive(); ticking = false; }); ticking = true; }
  }, { passive: true });

  links.forEach((l) => {
    l.addEventListener("click", () => {
      links.forEach((x) => { x.classList.remove("is-tapped"); window.clearTimeout(x._pmTapTimer); });
      l.classList.add("is-tapped");
      l._pmTapTimer = window.setTimeout(() => l.classList.remove("is-tapped"), 600);
      const id = l.getAttribute("href")?.replace("#", "");
      if (id) setActiveNavById(id);
      window.requestAnimationFrame(() => window.requestAnimationFrame(updateActive));
    });
  });

  updateActive();
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSobreSectionNav);
} else {
  initSobreSectionNav();
}
/* ============================================
   MAPA INTERACTIVO - LÓGICA CON PLANTAS (VERSIÓN ESTABLE)
   ============================================ */

// Solo ejecutar si existe el contenedor del mapa (index.html)
if (document.getElementById('museumMapSVG')) {

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

let currentFloor = 'P1';
let renderTaskId = 0;

function renderMuseumMap(floorKey) {
  const taskId = ++renderTaskId;
  currentFloor = floorKey;

  const svgContainer = document.getElementById('museumMapSVG');
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

      polygon.addEventListener('mouseenter', (e) => {
        if (taskId !== renderTaskId || !tooltip) return;
        const lang = currentLang || 'es';
        if (tooltipTitle) tooltipTitle.textContent = zone.name[lang] || zone.name.es;
        if (tooltipDesc) tooltipDesc.textContent = scopeDescriptions?.[lang]?.[zone.scopeKey] || '';
        const rect = svgContainer.getBoundingClientRect();
        tooltip.style.left = `${e.clientX - rect.left}px`;
        tooltip.style.top = `${e.clientY - rect.top}px`;
        tooltip.classList.remove('d-none');
      });
      
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

// Botones de planta
document.querySelectorAll('[data-floor]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-floor]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMuseumMap(btn.dataset.floor);
  });
});

// Click en leyenda
const legendContainer = document.getElementById('museumMapLegend');
if (legendContainer) {
  legendContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.museum-legend-item');
    if (!btn) return;
    const svgContainer = document.getElementById('museumMapSVG');
    if (!svgContainer) return;
    const polygon = svgContainer.querySelector(`[data-zone-id="${btn.dataset.zoneId}"]`);
    if (polygon) {
      polygon.click();
      document.querySelectorAll('.museum-legend-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  });
}

// Cerrar panel
const panelCloseBtn = document.getElementById('panelCloseBtn');
if (panelCloseBtn) {
  panelCloseBtn.onclick = () => {
    const infoPanel = document.getElementById('museumMapInfoPanel');
    if (infoPanel) infoPanel.classList.add('d-none');
    document.querySelectorAll('.museum-zone').forEach(z => z.classList.remove('active'));
    document.querySelectorAll('.museum-legend-item').forEach(b => b.classList.remove('active'));
  };
}

// Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => renderMuseumMap(currentFloor));
} else {
  renderMuseumMap(currentFloor);
}

// Hook idioma seguro
if (typeof window.applyLanguage === 'function') {
  const originalApplyLanguage = window.applyLanguage;
  window.applyLanguage = function(lang) {
    originalApplyLanguage(lang);
    if (document.getElementById('museumMapSVG')) {
      renderMuseumMap(currentFloor);
      const activeZone = document.querySelector('.museum-zone.active');
      if (activeZone) activeZone.click();
    }
  };
}

} // Fin del bloque de verificación del mapa