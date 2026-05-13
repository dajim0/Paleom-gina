/* ═════════════════════════════════════════════════════════════════════════════ */
/* MUSEUM 3D — Complete Interactive Viewer & Timeline                           */
/* ═════════════════════════════════════════════════════════════════════════════ */

/* FLOOR PLANS IMAGE DATA (Base64 encoded or path) */
const FLOOR_IMAGES = {
  ground: 'data:image/png;base64,...', // If needed, actual image data
  first: 'data:image/png;base64,...'
};

/* MUSEUM FLOOR PLAN DATA — ZONES AND SECTIONS */
const ZONES = {
  ground: [
    {
      id: 'R1',
      label: 'Recepción y acogida',
      text: 'Primer punto de contacto y bienvenida del visitante.',
      color: '#c79a5f',
      opacity: 0.6,
      poly: [[88, 226], [172, 200], [214, 244], [134, 290], [82, 274]]
    },
    {
      id: 'R2',
      label: 'Distribución y transición',
      text: 'Área de paso interpretativo y preparación del recorrido.',
      color: '#d6a66f',
      opacity: 0.6,
      poly: [[198, 194], [330, 158], [380, 208], [244, 242]]
    },
    {
      id: 'R3',
      label: 'Escaleras y eras geológicas',
      text: 'Conexión vertical con introducción a las eras geológicas.',
      color: '#9da881',
      opacity: 0.6,
      poly: [[364, 152], [520, 114], [578, 174], [418, 214]]
    }
  ],
  first: [
    {
      id: 'AN',
      label: 'Antesala',
      text: 'Antesala de acceso a la exposición permanente.',
      color: '#d0b183',
      opacity: 0.6,
      poly: [[70, 272], [142, 238], [182, 274], [116, 316], [68, 302]]
    },
    {
      id: 'A0',
      label: 'Bienvenida',
      text: 'Punto inicial del recorrido expositivo en sala.',
      color: '#c79a5f',
      opacity: 0.6,
      poly: [[160, 236], [250, 206], [292, 254], [206, 286]]
    },
    {
      id: 'A1',
      label: 'Mar de Tetis',
      text: 'Lectura del origen marino del territorio y registro fósil.',
      color: '#cda36d',
      opacity: 0.6,
      poly: [[260, 204], [352, 176], [396, 226], [302, 256]]
    },
    {
      id: 'A2',
      label: 'Geología y orografía',
      text: 'Procesos geológicos que modelan Sierra Mágina.',
      color: '#d8ad76',
      opacity: 0.6,
      poly: [[366, 172], [466, 146], [508, 198], [404, 226]]
    },
    {
      id: 'A3',
      label: 'Cuaternario',
      text: 'Cambios climáticos y ambientales durante el Cuaternario.',
      color: '#dfb57d',
      opacity: 0.6,
      poly: [[474, 140], [574, 116], [616, 166], [514, 192]]
    },
    {
      id: 'A4',
      label: 'Mundo neandertal',
      text: 'Evidencias de vida neandertal y tecnología asociada.',
      color: '#cb7f49',
      opacity: 0.6,
      poly: [[246, 272], [342, 242], [388, 292], [286, 326]]
    },
    {
      id: 'A5',
      label: 'Paleolítico superior',
      text: 'Innovaciones culturales y técnicas de sociedades cazadoras.',
      color: '#bb703f',
      opacity: 0.6,
      poly: [[352, 238], [454, 210], [500, 260], [392, 292]]
    },
    {
      id: 'A6',
      label: 'Neolítico',
      text: 'Primeras comunidades productoras y transformación del territorio.',
      color: '#6f9663',
      opacity: 0.6,
      poly: [[460, 204], [562, 176], [612, 226], [500, 258]]
    },
    {
      id: 'A7',
      label: 'Calcolítico',
      text: 'Metalurgia inicial y nuevos modelos sociales.',
      color: '#879e5d',
      opacity: 0.6,
      poly: [[514, 266], [610, 240], [650, 282], [552, 308]]
    },
    {
      id: 'A8',
      label: 'Ciencia y ciudadanía',
      text: 'Investigación arqueológica y divulgación abierta al público.',
      color: '#a99e4a',
      opacity: 0.6,
      poly: [[364, 82], [486, 56], [526, 100], [404, 126]]
    },
    {
      id: 'TZ',
      label: 'Terraza y paisaje',
      text: 'Cierre del recorrido con lectura directa del paisaje real.',
      color: '#9f8564',
      opacity: 0.6,
      poly: [[538, 44], [668, 24], [704, 66], [576, 92]]
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
  const titleEl = document.getElementById('museum-3d-detail-title');
  const textEl = document.getElementById('museum-3d-detail-text');
  if (typeof window.paleomaginaT === 'function') {
    if (titleEl) titleEl.textContent = window.paleomaginaT('museum_3d_detail_title');
    if (textEl) textEl.textContent = window.paleomaginaT('museum_3d_detail_hint');
  }
  document.querySelectorAll('.museum-3d-section-item').forEach(el => el.classList.remove('active'));
}

function refreshMuseumSelection() {
  if (activeZone && currentFloor) selectZone(activeZone, currentFloor);
}

window.resetMuseumDetail = resetMuseumDetail;
window.refreshMuseumSelection = refreshMuseumSelection;

/* Build floor plan visualization */
function buildFloorPlan(floor) {
  const canvas = document.getElementById('museum-3d-canvas');
  if (!canvas) return;
  canvas.innerHTML = '';

  const img = document.createElement('img');
  img.className = 'floor-plan-img';
  img.src = FLOOR_IMAGES[floor] || `../images/planta-${floor === 'ground' ? 'baja' : 'primera'}-plano.png`;
  img.alt = floor === 'ground' ? 'Planta baja' : 'Planta primera';
  canvas.appendChild(img);

  img.onload = () => buildOverlay(canvas, floor, img);
  if (img.complete) buildOverlay(canvas, floor, img);
}

function buildOverlay(canvas, floor, img) {
  const old = canvas.querySelector('svg.overlay');
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
    const pointsStr = zone.poly.map(p => p.join(',')).join(' ');
    poly.setAttribute('points', pointsStr);
    poly.setAttribute('fill', zone.color);
    poly.setAttribute('fill-opacity', zone.opacity);
    poly.setAttribute('stroke', 'rgba(255,255,255,0.5)');
    poly.setAttribute('stroke-width', '1');
    poly.classList.add('zone-area');
    poly.dataset.zoneId = zone.id;

    poly.addEventListener('click', () => selectZone(zone.id, floor));
    poly.addEventListener('mouseenter', () => {
      poly.setAttribute('fill-opacity', 0.75);
    });
    poly.addEventListener('mouseleave', () => {
      poly.setAttribute('fill-opacity', activeZone === zone.id ? 0.85 : zone.opacity);
    });

    svg.appendChild(poly);
  });

  canvas.appendChild(svg);
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
      const hi = Math.min(0.92, z.opacity + 0.22);
      poly.setAttribute('fill-opacity', zid === id ? hi : z.opacity);
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

/** Imagen TIMELINE + pie (una línea por escena) */
const TIMELINE_IMAGE_META = {
  stage1: {
    src: '../images/timeline/timeline-01.png',
    caption:
      'Precámbrico y Paleozoico temprano: rocas volcánicas y mar antiguo con trilobites y vida marina recreada.'
  },
  stage2: {
    src: '../images/timeline/timeline-02.png',
    caption:
      'Carbonífero y Mesozoico: pantanos, helechos gigantes y primeros mamíferos como Eomaia.'
  },
  stage3: {
    src: '../images/timeline/timeline-03.png',
    caption:
      'Sabana africana: Australopithecus bípedo y Homo habilis con herramientas de piedra.'
  },
  stage4: {
    src: '../images/timeline/timeline-04.png',
    caption:
      'Homo erectus alrededor del fuego; paisaje euroasiático y presagio del neandertal.'
  },
  stage5: {
    src: '../images/timeline/timeline-05.png',
    caption:
      'Cueva iluminada por antorchas: arte rupestre compartido y valle holocénico al fondo.'
  },
  stage6: {
    src: '../images/timeline/timeline-06.png',
    caption:
      'Holoceno temprano: cultivos, ganado y aldea neolítica hacia la escritura cuneiforme.'
  },
  stage7: {
    src: '../images/timeline/timeline-07.png',
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
