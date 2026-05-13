/* ═════════════════════════════════════════════════════════════════════════════ */
/* MUSEUM 3D — Complete Interactive Viewer & Timeline                           */
/* ═════════════════════════════════════════════════════════════════════════════ */

/** Planos subidos (planta baja / primera); rutas relativas a `html/*.html`. */
const FLOOR_IMAGES = {
  ground: '../images/planta-baja-museo.png',
  first: '../images/planta-primera-museo.png'
};

/** Convierte polígonos en coords 0–1 al tamaño real de la imagen. */
function zonePolyPoints(zone, W, H) {
  if (zone.polyNorm && Array.isArray(zone.polyNorm)) {
    return zone.polyNorm.map(([nx, ny]) => [nx * W, ny * H]);
  }
  if (zone.poly && Array.isArray(zone.poly)) return zone.poly;
  return [];
}

/* MUSEUM FLOOR PLAN DATA — ZONES AND SECTIONS */
const ZONES = {
  ground: [
    {
      id: '1',
      label: 'Recepción y orientación',
      text:
        'Zona de acogida y orientación: bienvenida al visitante, información general del centro y arranque del relato museístico con apoyos gráficos y mapas del territorio.',
      color: '#c79a5f',
      opacity: 0.52,
      polyNorm: [
        [0.54, 0.05],
        [0.93, 0.05],
        [0.93, 0.39],
        [0.54, 0.36]
      ]
    },
    {
      id: '2',
      label: 'Distribución y sala auxiliar',
      text:
        'Espacio de paso y estancia complementaria junto a servicios; prepara el recorrido hacia la zona vertical de ascensor y escaleras.',
      color: '#d6a66f',
      opacity: 0.52,
      polyNorm: [
        [0.64, 0.46],
        [0.93, 0.45],
        [0.93, 0.92],
        [0.64, 0.88]
      ]
    },
    {
      id: '3',
      label: 'Escaleras y ascensor',
      text:
        'Núcleo de circulación vertical que conecta planta baja y primera planta, con transición interpretativa hacia el cuerpo expositivo principal.',
      color: '#9da881',
      opacity: 0.52,
      polyNorm: [
        [0.46, 0.21],
        [0.57, 0.21],
        [0.57, 0.69],
        [0.46, 0.66]
      ]
    }
  ],
  first: [
    {
      id: 'AS',
      label: 'Antesala (AS)',
      text: 'Antesala de acceso a la exposición permanente, junto al ascensor y la conexión con la planta baja.',
      color: '#d0b183',
      opacity: 0.5,
      polyNorm: [
        [0.43, 0.36],
        [0.51, 0.36],
        [0.51, 0.45],
        [0.43, 0.45]
      ]
    },
    {
      id: '0',
      label: 'Bienvenida (0)',
      text: 'Punto inicial del recorrido expositivo en sala, entre el núcleo de escaleras y los primeros ámbitos temáticos.',
      color: '#c79a5f',
      opacity: 0.5,
      polyNorm: [
        [0.51, 0.46],
        [0.61, 0.46],
        [0.61, 0.56],
        [0.51, 0.56]
      ]
    },
    {
      id: '1',
      label: 'Mar de Tetis (1)',
      text: 'Lectura del origen marino del territorio y del registro fósil asociado a los fondos antiguos de la cuenca.',
      color: '#cda36d',
      opacity: 0.5,
      polyNorm: [
        [0.66, 0.56],
        [0.97, 0.56],
        [0.97, 0.96],
        [0.66, 0.94]
      ]
    },
    {
      id: '2',
      label: 'Geología y orografía (2)',
      text: 'Procesos geológicos y relieve que configuran Sierra Mágina y su entorno natural actual.',
      color: '#d8ad76',
      opacity: 0.5,
      polyNorm: [
        [0.63, 0.38],
        [0.95, 0.38],
        [0.95, 0.56],
        [0.63, 0.56]
      ]
    },
    {
      id: '3',
      label: 'Cuaternario (3)',
      text: 'Cambios climáticos y ambientales durante el Cuaternario y su reflejo en paisajes y yacimientos.',
      color: '#dfb57d',
      opacity: 0.5,
      polyNorm: [
        [0.58, 0.17],
        [0.8, 0.15],
        [0.8, 0.39],
        [0.58, 0.39]
      ]
    },
    {
      id: '4',
      label: 'Mundo neandertal (4)',
      text: 'Evidencias de vida neandertal en el entorno y la tecnología asociada a estas poblaciones.',
      color: '#cb7f49',
      opacity: 0.5,
      polyNorm: [
        [0.805, 0.04],
        [0.97, 0.04],
        [0.97, 0.145],
        [0.805, 0.145]
      ]
    },
    {
      id: '5',
      label: 'Paleolítico superior (5)',
      text: 'Innovaciones culturales y técnicas de sociedades cazadoras-recolectoras del Paleolítico superior.',
      color: '#bb703f',
      opacity: 0.5,
      polyNorm: [
        [0.36, 0.08],
        [0.78, 0.06],
        [0.78, 0.34],
        [0.36, 0.34]
      ]
    },
    {
      id: '6',
      label: 'Neolítico (6)',
      text: 'Primeras comunidades productoras y la transformación del territorio con la aparición de la agricultura y la ganadería.',
      color: '#6f9663',
      opacity: 0.5,
      polyNorm: [
        [0.14, 0.08],
        [0.36, 0.08],
        [0.36, 0.26],
        [0.14, 0.26]
      ]
    },
    {
      id: '7',
      label: 'Calcolítico (7)',
      text: 'Metalurgia inicial y nuevos modelos sociales vinculados al cobre y a la intensificación del poblamiento.',
      color: '#879e5d',
      opacity: 0.5,
      polyNorm: [
        [0.12, 0.26],
        [0.36, 0.26],
        [0.36, 0.48],
        [0.12, 0.48]
      ]
    },
    {
      id: '8',
      label: 'Ciencia y ciudadanía (8)',
      text: 'Investigación arqueológica contemporánea, divulgación y participación ciudadana en el patrimonio.',
      color: '#a99e4a',
      opacity: 0.5,
      polyNorm: [
        [0.18, 0.48],
        [0.34, 0.48],
        [0.34, 0.62],
        [0.18, 0.62]
      ]
    },
    {
      id: 'TZ',
      label: 'Terraza y paisaje (TZ)',
      text: 'Cierre del recorrido con lectura directa del paisaje real de Sierra Mágina desde la terraza del edificio.',
      color: '#9f8564',
      opacity: 0.5,
      polyNorm: [
        [0.03, 0.65],
        [0.3, 0.62],
        [0.27, 0.97],
        [0.04, 0.98]
      ]
    }
  ]
};

/* TIMELINE DATA — seven-stage Deep Time narrative */
const TIMELINE_DATA = {
  stage1: {
    title: 'La Fundación: La Tierra Primitiva y el Amanecer de la Vida Compleja',
    period: 'Precámbrico — Paleozoico temprano',
    text:
      'La línea temporal comienza en las profundidades del tiempo geológico, mostrando la Tierra primitiva en una espectacular sala de museo cinematográfica y ultra realista en 4K. La escena inicial presenta una formación rocosa del Precámbrico profundamente texturizada, iluminada tenuemente bajo un cielo volcánico y caótico. A través de una transición sutil y perfectamente integrada, el paisaje evoluciona hacia el Paleozoico temprano. A la derecha, el entorno se convierte en un cálido mar poco profundo repleto de vida antigua meticulosamente recreada: trilobites, escorpiones marinos y peces primitivos fosilizados aparecen con un nivel extremo de detalle. Todo mantiene una estética hiperrealista, científica y cinematográfica.',
    color: '#1e5a8c'
  },
  stage2: {
    title: 'Los Mamíferos Mesozoicos y la Cuna Carbonífera',
    period: 'Carbonífero — Mesozoico temprano',
    text:
      'Continuando desde el borde derecho de la imagen anterior, el mar paleozoico se transforma gradualmente en el Carbonífero mediante cambios ambientales dramáticos y capas geológicas que se mezclan entre sí. El fondo marino da paso a un enorme pantano cubierto de niebla, dominado por gigantescos licopodios y helechos colosales. Conforme el ambiente se seca, el pantano se convierte de forma fluida en una llanura árida del Mesozoico iluminada por un atardecer volcánico. Entre la vegetación aparecen pequeños mamíferos primitivos, como Eomaia, representados con gran precisión anatómica y detalle cinematográfico, insinuando los futuros pasos evolutivos de la humanidad. El borde derecho prepara la transición hacia el Cenozoico.',
    color: '#2d6b4f'
  },
  stage3: {
    title: 'El Amanecer de los Homínidos: Australopithecus y el Bipedismo',
    period: 'Cenozoico — Plioceno / Pleistoceno temprano',
    text:
      'Siguiendo la transición establecida en la escena anterior, la exhibición introduce dramáticamente a los primeros homínidos bípedos durante el Cenozoico. El paisaje cambia desde una llanura seca hacia la inmensa sabana del África oriental bajo un cielo cambiante y espectacular. El foco principal es una reconstrucción hiperrealista de un Australopithecus afarensis, similar a Lucy, caminando erguido sobre el lecho seco de un río. A la derecha, el entorno se mezcla a través de un desenfoque temporal mostrando a los primeros Homo habilis cerca de una cueva, manipulando herramientas de piedra primitivas, marcando el siguiente gran salto evolutivo.',
    color: '#c65d1a'
  },
  stage4: {
    title: 'Homo Erectus: Migración y el Dominio del Fuego',
    period: 'Pleistoceno medio',
    text:
      'Partiendo de la transición de Homo habilis mostrada anteriormente, la escena avanza hacia el Pleistoceno. La sabana africana se transforma en un ambiente euroasiático más frío, seco y variable, inspirado en lugares como Dmanisi. En el centro de la composición aparece un grupo de Homo erectus representados con increíble realismo y detalle anatómico. Están reunidos alrededor de un fuego controlado y pulsante, simbolizando el dominio del fuego y el desarrollo cognitivo. A la derecha, otro individuo contempla el horizonte, insinuando las futuras migraciones humanas. El extremo derecho se difumina temporalmente mostrando la figura robusta de un neandertal, preparando la siguiente etapa de la evolución.',
    color: '#8b3a1f'
  },
  stage5: {
    title: 'La Explosión del Simbolismo: Neandertales y la Cueva del Arte',
    period: 'Paleolítico superior — transición al Holoceno',
    text:
      'La línea temporal avanza hacia el Paleolítico Superior manteniendo la misma estética ultra detallada y cinematográfica. El frío entorno glacial de la escena anterior se transforma en una enorme cueva profunda iluminada por antorchas. En primer plano, Homo sapiens de tipo Cro-Magnon y un robusto neandertal colaboran creando complejas pinturas rupestres sobre paredes de piedra caliza texturizada. Utilizan pigmentos de ocre y carbón, simbolizando el nacimiento del pensamiento abstracto y artístico. Al fondo, la entrada de la cueva revela mediante una distorsión temporal un fértil valle holocénico con los primeros asentamientos humanos permanentes, preparando la llegada de la agricultura.',
    color: '#5c3d7a'
  },
  stage6: {
    title: 'Vida Sedentaria: Agricultura y la Aldea Neolítica',
    period: 'Holoceno temprano — Neolítico',
    text:
      'Desde el borde derecho de la escena anterior, el paisaje evoluciona completamente hacia el Holoceno temprano y la Revolución Neolítica. El pequeño asentamiento natufiense se convierte en un exuberante valle fluvial del Creciente Fértil. En primer plano, grupos de Homo sapiens cultivan trigo y cebada domesticados utilizando hoces de piedra. Cerca de ellos pastan ovejas y cabras domesticadas. En la zona media se alza una auténtica aldea neolítica de casas permanentes de adobe, inspirada en lugares como Jericó o Çatalhöyük. Todo el conjunto se mezcla gradualmente hacia monumentales construcciones de piedra y tablillas con escritura cuneiforme, anunciando el surgimiento de las primeras civilizaciones complejas.',
    color: '#6b8e23'
  },
  stage7: {
    title: 'Civilización Compleja y la Reflexión del Antropoceno',
    period: 'Edades del Bronce e Hierro — Antropoceno',
    text:
      'La última escena completa la línea temporal manteniendo la estética hiperrealista de museo cinematográfico. A partir de las pistas de civilización compleja vistas anteriormente, el entorno avanza hacia las Edades del Bronce y del Hierro. La aldea neolítica y el paisaje fluvial son reemplazados por una ciudad organizada e intensamente urbanizada. En primer plano, trabajadores funden bronce y construyen un gigantesco zigurat de adobe inspirado en Uruk. A la derecha, tablillas cuneiformes se integran visualmente en una antigua biblioteca repleta de escritura compleja. Finalmente, esta escena proto-urbana se acelera mediante una intensa distorsión temporal hasta transformarse en una moderna megalópolis de acero y cristal con enormes centros de datos. Bajo la ciudad moderna, las capas industriales y nucleares aparecen fusionadas con antiguos estratos geológicos, simbolizando el inicio del Antropoceno y concluyendo la secuencia con una poderosa reflexión sobre la complejidad humana y la escala del tiempo geológico.',
    color: '#4a5568'
  }
};

/* ═════════════════════════════════════════════════════════════════════════════ */
/* INITIALIZATION AND RENDERING FUNCTIONS                                       */
/* ═════════════════════════════════════════════════════════════════════════════ */

/* ═════════════════════════════════════════════════════════════════════════════ */
/* INITIALIZATION AND RENDERING FUNCTIONS                                       */
/* ═════════════════════════════════════════════════════════════════════════════ */

let currentFloor = 'ground';
let activeZone = null;

function resetMuseumDetail() {
  activeZone = null;
  if (document.body) delete document.body.dataset.museumZone;
  const detailPanel = document.querySelector('.museum-3d-detail');
  if (detailPanel) detailPanel.style.removeProperty('--detail-accent');
  const swatchEl = document.getElementById('museum-3d-detail-swatch');
  if (swatchEl) {
    swatchEl.hidden = true;
    swatchEl.style.background = '';
  }
  const titleEl = document.getElementById('museum-3d-detail-title');
  const textEl = document.getElementById('museum-3d-detail-text');
  if (typeof window.paleomaginaT === 'function') {
    if (titleEl) titleEl.textContent = window.paleomaginaT('museum_3d_detail_title');
    if (textEl) textEl.textContent = window.paleomaginaT('museum_3d_detail_hint');
  }
  document.querySelectorAll('.museum-3d-section-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.museum-3d-canvas svg.overlay .zone-area').forEach(poly => {
    if (poly.dataset.floor !== currentFloor) return;
    const zid = poly.dataset.zoneId;
    const z = ZONES[currentFloor]?.find(zz => zz.id === zid);
    poly.classList.remove('active-zone');
    if (z) poly.setAttribute('fill-opacity', z.opacity);
  });
}

function refreshMuseumSelection() {
  if (activeZone && currentFloor) selectZone(activeZone, currentFloor);
}

window.resetMuseumDetail = resetMuseumDetail;
window.refreshMuseumSelection = refreshMuseumSelection;

/** Escala imagen + SVG al mismo rectángulo (contain) dentro del escenario fijo. */
function alignPlanOverlay(stage, img, svg) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!stage || !svg || !iw || !ih) return;
  const sw = stage.clientWidth;
  const sh = stage.clientHeight;
  if (!sw || !sh) return;
  const scale = Math.min(sw / iw, sh / ih);
  const dw = Math.round(iw * scale * 1000) / 1000;
  const dh = Math.round(ih * scale * 1000) / 1000;
  const left = Math.round((sw - dw) / 2);
  const top = Math.round((sh - dh) / 2);
  Object.assign(img.style, {
    left: `${left}px`,
    top: `${top}px`,
    width: `${dw}px`,
    height: `${dh}px`
  });
  Object.assign(svg.style, {
    left: `${left}px`,
    top: `${top}px`,
    width: `${dw}px`,
    height: `${dh}px`
  });
  svg.setAttribute('viewBox', `0 0 ${iw} ${ih}`);
  svg.setAttribute('preserveAspectRatio', 'none');
}

function wireMuseumPlanResize(stage, img) {
  const svg = stage.querySelector('svg.overlay');
  if (!svg) return;
  if (stage._museumPlanRO) {
    stage._museumPlanRO.disconnect();
    stage._museumPlanRO = null;
  }
  const run = () => alignPlanOverlay(stage, img, svg);
  const ro = new ResizeObserver(run);
  ro.observe(stage);
  stage._museumPlanRO = ro;
  requestAnimationFrame(run);
}

/* Build floor plan visualization */
function buildFloorPlan(floor) {
  const canvas = document.getElementById('museum-3d-canvas');
  if (!canvas) return;
  canvas.innerHTML = '';

  const stage = document.createElement('div');
  stage.className = 'museum-3d-plan-stage';

  const img = document.createElement('img');
  img.className = 'floor-plan-img';
  img.decoding = 'async';
  img.src = FLOOR_IMAGES[floor];
  img.alt = floor === 'ground' ? 'Planta baja' : 'Planta primera';

  stage.appendChild(img);
  canvas.appendChild(stage);

  let mounted = false;
  function mount() {
    if (mounted || !img.naturalWidth) return;
    mounted = true;
    buildOverlay(stage, floor, img);
    wireMuseumPlanResize(stage, img);
  }
  img.onload = mount;
  if (img.complete) mount();
}

function buildOverlay(stage, floor, img) {
  const old = stage.querySelector('svg.overlay');
  if (old) old.remove();

  const W = img.naturalWidth || img.clientWidth;
  const H = img.naturalHeight || img.clientHeight;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('overlay');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'none');

  const zones = ZONES[floor];
  zones.forEach(zone => {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const pts = zonePolyPoints(zone, W, H);
    const pointsStr = pts.map(p => p.join(',')).join(' ');
    poly.setAttribute('points', pointsStr);
    poly.setAttribute('fill', zone.color);
    poly.setAttribute('fill-opacity', zone.opacity);
    poly.setAttribute('stroke', 'rgba(255,255,255,0.45)');
    poly.setAttribute('stroke-width', '1');
    poly.classList.add('zone-area');
    poly.dataset.zoneId = zone.id;
    poly.dataset.floor = floor;

    poly.addEventListener('click', () => selectZone(zone.id, floor));
    poly.addEventListener('mouseenter', () => {
      poly.setAttribute('fill-opacity', 0.75);
    });
    poly.addEventListener('mouseleave', () => {
      const hi = Math.min(0.9, zone.opacity + 0.28);
      poly.setAttribute('fill-opacity', activeZone === zone.id ? hi : zone.opacity);
    });

    svg.appendChild(poly);
  });

  stage.appendChild(svg);
  alignPlanOverlay(stage, img, svg);
}

function selectZone(id, floor) {
  activeZone = id;
  const zone = ZONES[floor].find(z => z.id === id);
  if (!zone) return;

  if (document.body) document.body.dataset.museumZone = id;

  const detailPanel = document.querySelector('.museum-3d-detail');
  if (detailPanel) detailPanel.style.setProperty('--detail-accent', zone.color);

  const titleEl = document.getElementById('museum-3d-detail-title');
  const textEl = document.getElementById('museum-3d-detail-text');
  const swatchEl = document.getElementById('museum-3d-detail-swatch');
  if (swatchEl) {
    swatchEl.hidden = false;
    swatchEl.style.background = zone.color;
  }
  if (titleEl) titleEl.textContent = `${zone.id} — ${zone.label}`;
  if (textEl) textEl.textContent = zone.text;

  document.querySelectorAll('.museum-3d-section-item').forEach(el => {
    el.classList.toggle('active', el.dataset.zone === id);
  });

  document.querySelectorAll('.museum-3d-canvas svg.overlay .zone-area').forEach(poly => {
    const zid = poly.dataset.zoneId;
    const z = ZONES[floor].find(zz => zz.id === zid);
    poly.classList.toggle('active-zone', zid === id);
    if (z) {
      const hi = Math.min(0.9, z.opacity + 0.32);
      poly.setAttribute('fill-opacity', zid === id ? hi : z.opacity * 0.88);
    }
  });
}

function buildSectionList(floor) {
  const container = document.getElementById('museum-3d-sections');
  if (!container) return;
  container.innerHTML = '';

  ZONES[floor].forEach(zone => {
    const btn = document.createElement('button');
    btn.className = 'museum-3d-section-item';
    btn.dataset.zone = zone.id;
    btn.style.setProperty('--zone-color', zone.color);
    btn.innerHTML = `<span class="zone-dot" style="background:${zone.color}"></span> <strong>${zone.id}</strong> <small>${zone.label}</small>`;
    btn.addEventListener('click', () => selectZone(zone.id, floor));
    container.appendChild(btn);
  });
}

/** Ilustraciones del timeline sin marca de agua (`images/IMG2/*_peeled.png`). */
const TIMELINE_IMAGE_META = {
  stage1: {
    src: '../images/IMG2/1_peeled.png',
    caption:
      'Precámbrico y Paleozoico temprano: rocas volcánicas y mar antiguo con trilobites y vida marina recreada.'
  },
  stage2: {
    src: '../images/IMG2/2_peeled.png',
    caption:
      'Carbonífero y Mesozoico: pantanos, helechos gigantes y primeros mamíferos como Eomaia.'
  },
  stage3: {
    src: '../images/IMG2/3_peeled.png',
    caption:
      'Sabana africana: Australopithecus bípedo y Homo habilis con herramientas de piedra.'
  },
  stage4: {
    src: '../images/IMG2/4_peeled.png',
    caption:
      'Homo erectus alrededor del fuego; paisaje euroasiático y presagio del neandertal.'
  },
  stage5: {
    src: '../images/IMG2/5_peeled.png',
    caption:
      'Cueva iluminada por antorchas: arte rupestre compartido y valle holocénico al fondo.'
  },
  stage6: {
    src: '../images/IMG2/6_peeled.png',
    caption:
      'Holoceno temprano: cultivos, ganado y aldea neolítica hacia la escritura cuneiforme.'
  },
  stage7: {
    src: '../images/IMG2/7_peeled.png',
    caption:
      'Bronce, zigurat y ciudad histórica hasta la megalópolis moderna y el Antropoceno.'
  }
};

function escapeTimelineHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

/* Render timeline: imagen oficial TIMELINE + texto */
function renderTimeline(timeKey) {
  const data = TIMELINE_DATA[timeKey];
  if (!data) return;
  const detail = document.getElementById('timeline-detail');
  if (!detail) return;

  const meta = TIMELINE_IMAGE_META[timeKey];
  const safeTitle = escapeTimelineHtml(data.title);
  const safePeriod = escapeTimelineHtml(data.period);
  const safeText = escapeTimelineHtml(data.text);
  const safeCaption = meta ? escapeTimelineHtml(meta.caption) : '';
  const photoBlock = meta
    ? `<div class="timeline-photo"><img src="${meta.src}" alt="${safeTitle}" loading="lazy" width="1200" height="675" decoding="async" /><p class="timeline-photo-caption">${safeCaption}</p></div>`
    : '';

  detail.style.borderTop = `4px solid ${data.color}`;
  detail.innerHTML = `
    ${photoBlock}
    <div class="timeline-inner px-3 pb-3 pt-3">
      <div class="timeline-text-block">
        <h3 style="color:${data.color}">${safeTitle}</h3>
        <p class="timeline-period">⏱ ${safePeriod}</p>
        <div class="timeline-prose"><p>${safeText}</p></div>
      </div>
    </div>`;
}

/* Initialize everything */
function init() {
  // Floor plan viewer
  buildFloorPlan('ground');
  buildSectionList('ground');

  // Floor switch buttons
  document.querySelectorAll('.museum-3d-floor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const floor = btn.dataset.floor;
      currentFloor = floor;
      document.querySelectorAll('.museum-3d-floor-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      resetMuseumDetail();
      buildFloorPlan(floor);
      buildSectionList(floor);
    });
  });

  // Timeline buttons
  document.querySelectorAll('.timeline-era').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timeline-era').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTimeline(btn.dataset.time);
    });
  });

  // Render default timeline item
  renderTimeline('stage1');

  resetMuseumDetail();
}

/* Run on DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
