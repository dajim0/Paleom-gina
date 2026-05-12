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

/* TIMELINE DATA — 3D ANIMATED SCENES WITH SVG */
const TIMELINE_DATA = {
  marine: {
    title: 'Era marina — Mar de Tetis',
    period: 'Hace ~65–5 millones de años',
    text: 'El territorio que hoy conocemos como Sierra Mágina estuvo cubierto por el antiguo mar de Tetis. Los fósiles de ammonites, erizos de mar y corales hallados en la zona son el testimonio de ese océano desaparecido.',
    color: '#1a6fa8',
    object3d: `
      <div class="obj3d ocean-scene">
        <div class="ocean-water"></div>
        <div class="ammonite">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <defs>
              <radialGradient id="ammG" cx="40%" cy="40%">
                <stop offset="0%" stop-color="#f0d080"/>
                <stop offset="100%" stop-color="#8a6020"/>
              </radialGradient>
            </defs>
            <path d="M60,60 m0,-45 a45,45 0 1,1 -0.1,0" fill="none" stroke="url(#ammG)" stroke-width="12" stroke-dasharray="270 10"/>
            <path d="M60,60 m0,-33 a33,33 0 1,1 -0.1,0" fill="none" stroke="#c8902a" stroke-width="9"/>
            <path d="M60,60 m0,-21 a21,21 0 1,1 -0.1,0" fill="none" stroke="#a07020" stroke-width="7"/>
            <path d="M60,60 m0,-11 a11,11 0 1,1 -0.1,0" fill="none" stroke="#7a5015" stroke-width="5"/>
            <circle cx="60" cy="60" r="6" fill="#5a3a0a"/>
          </svg>
        </div>
        <div class="bubble b1"></div><div class="bubble b2"></div><div class="bubble b3"></div>
        <div class="fish">🐠</div>
        <div class="ocean-floor"></div>
        <div class="sea-label">Mar de Tetis · ~65 Ma</div>
      </div>`
  },
  geology: {
    title: 'Formación geológica',
    period: 'Hace ~5 millones de años',
    text: 'Los movimientos tectónicos de la orogenia alpina plegaron y elevaron los sedimentos marinos, formando la Sierra de Mágina. Este proceso dejó expuestas las calizas jurásicas que caracterizan el paisaje actual.',
    color: '#8a6030',
    object3d: `
      <div class="obj3d geology-scene">
        <div class="mountain-3d">
          <div class="peak">
            <svg viewBox="0 0 200 120" width="200" height="120">
              <polygon points="0,120 100,0 200,120" fill="#7a7060"/>
              <polygon points="40,120 100,20 160,120" fill="#9a9080"/>
              <polygon points="70,120 100,45 130,120" fill="#aba99a"/>
              <polygon points="85,80 100,50 115,80" fill="white" opacity="0.6"/>
            </svg>
          </div>
          <div class="strata">
            <div class="stratum s1">Jurásico · Calizas</div>
            <div class="stratum s2">Triásico · Arcillas</div>
            <div class="stratum s3">Permico · Areniscas</div>
          </div>
        </div>
      </div>`
  },
  quaternary: {
    title: 'El Cuaternario y el origen del hombre',
    period: 'Hace ~2,6 Ma – 11.700 años',
    text: 'El Cuaternario define el escenario del origen y evolución humana. En Sierra Mágina, los cambios climáticos del Pleistoceno moldearon el paisaje y condicionaron la presencia de grandes mamíferos y los primeros homínidos.',
    color: '#4a7a40',
    object3d: `
      <div class="obj3d quaternary-scene">
        <div class="mammoth-container">
          <svg viewBox="0 0 200 160" width="200" height="160">
            <ellipse cx="100" cy="100" rx="65" ry="45" fill="#7a6050"/>
            <ellipse cx="155" cy="85" rx="30" ry="28" fill="#7a6050"/>
            <path d="M175,100 Q200,120 190,145 Q185,155 178,145 Q185,120 165,108" fill="#6a5040"/>
            <path d="M168,105 Q195,100 195,115" fill="none" stroke="#f0e0b0" stroke-width="5" stroke-linecap="round"/>
            <circle cx="162" cy="82" r="4" fill="#2a1a0a"/>
            <circle cx="163" cy="81" r="1.5" fill="white"/>
            <rect x="60" y="138" width="18" height="25" rx="5" fill="#6a5040"/>
            <rect x="85" y="138" width="18" height="25" rx="5" fill="#6a5040"/>
            <rect x="110" y="138" width="18" height="25" rx="5" fill="#6a5040"/>
            <rect x="135" y="138" width="18" height="22" rx="5" fill="#6a5040"/>
            <ellipse cx="100" cy="90" rx="63" ry="40" fill="none" stroke="#5a4535" stroke-width="2" opacity="0.4"/>
          </svg>
          <div class="snow-ground"></div>
          <div class="snowflake sf1">❄</div>
          <div class="snowflake sf2">❄</div>
          <div class="snowflake sf3">❄</div>
        </div>
      </div>`
  },
  neanderthal: {
    title: 'El Paleolítico medio. El mundo Neandertal',
    period: 'Hace ~300.000 – 35.000 años',
    text: 'Los neandertales habitaron las cuevas y abrigos de Sierra Mágina. Sus útiles de piedra tallada (industria musteriense) y el uso del fuego revelan una inteligencia adaptativa sofisticada.',
    color: '#7a3010',
    object3d: `
      <div class="obj3d cave-scene">
        <div class="cave-bg"></div>
        <div class="cave-arch"></div>
        <div class="fire-container">
          <div class="fire">
            <div class="flame f1"></div>
            <div class="flame f2"></div>
            <div class="flame f3"></div>
            <div class="ember"></div>
          </div>
          <div class="fire-glow"></div>
        </div>
        <div class="neandertal-silhouette">
          <svg viewBox="0 0 80 130" width="70" height="130">
            <ellipse cx="40" cy="25" rx="18" ry="16" fill="#5a4035"/>
            <path d="M22,22 Q40,14 58,22" fill="#4a3025"/>
            <path d="M28,40 Q20,65 22,90 Q35,95 40,95 Q45,95 58,90 Q60,65 52,40 Z" fill="#6a4a30"/>
            <line x1="58" y1="30" x2="75" y2="120" stroke="#8a6040" stroke-width="3"/>
            <polygon points="72,118 78,120 75,108" fill="#aaa"/>
            <path d="M30,90 Q28,110 30,125" stroke="#5a3020" stroke-width="10" fill="none" stroke-linecap="round"/>
            <path d="M50,90 Q52,110 50,125" stroke="#5a3020" stroke-width="10" fill="none" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stone-tools">
          <div class="tool t1"></div>
          <div class="tool t2"></div>
          <div class="tool t3"></div>
        </div>
        <div class="cave-painting">🦌</div>
      </div>`
  },
  neolithic: {
    title: 'Neolítico',
    period: 'Hace ~7.000 – 4.500 años',
    text: 'La revolución neolítica transforma las sociedades: agricultura, ganadería, cerámica y los primeros asentamientos estables. Sierra Mágina muestra evidencias de esta transformación en yacimientos como la Cueva del Nacimiento.',
    color: '#6a8a20',
    object3d: `
      <div class="obj3d neolithic-scene">
        <div class="sky-neo"></div>
        <div class="field">
          <div class="wheat-row">
            ${Array.from({length:8}, (_,i) => `<div class="wheat" style="animation-delay:${i*0.15}s"></div>`).join('')}
          </div>
        </div>
        <div class="pot-3d">
          <svg viewBox="0 0 100 120" width="90" height="110">
            <defs>
              <linearGradient id="potG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#8a4020"/>
                <stop offset="40%" stop-color="#c05030"/>
                <stop offset="100%" stop-color="#6a3015"/>
              </linearGradient>
            </defs>
            <path d="M25,30 Q10,50 15,85 Q30,105 50,105 Q70,105 85,85 Q90,50 75,30 Z" fill="url(#potG)"/>
            <ellipse cx="50" cy="30" rx="25" ry="8" fill="#a04028"/>
            <ellipse cx="50" cy="30" rx="20" ry="6" fill="#3a1a08"/>
            <path d="M20,55 L80,55" stroke="#f0c080" stroke-width="1.5" opacity="0.6"/>
            <path d="M22,60 Q50,50 78,60" stroke="#f0c080" stroke-width="1.5" fill="none" opacity="0.6"/>
            <path d="M25,65 L35,55 L45,65 L55,55 L65,65 L75,55" stroke="#f0d090" stroke-width="1.5" fill="none" opacity="0.5"/>
          </svg>
        </div>
        <div class="hut">🛖</div>
        <div class="animals">🐐🌾</div>
      </div>`
  },
  chalcolithic: {
    title: 'Calcolítico',
    period: 'Hace ~4.500 – 3.500 años',
    text: 'La Edad del Cobre marca el inicio de la metalurgia. En Sierra Mágina aparecen objetos de cobre, puntas de flecha, puñales y elementos de adorno. Las sociedades se hacen más complejas y jerarquizadas.',
    color: '#4a6a8a',
    object3d: `
      <div class="obj3d chalco-scene-epic">
        <div class="chalco-rotator-epic">
          <svg viewBox="0 0 400 400" width="400" height="400" class="chalco-arrow-3d">
            <defs>
              <linearGradient id="copperMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffd700"/>
                <stop offset="20%" stop-color="#ffb347"/>
                <stop offset="40%" stop-color="#ff9500"/>
                <stop offset="60%" stop-color="#e67e22"/>
                <stop offset="80%" stop-color="#d35400"/>
                <stop offset="100%" stop-color="#a04000"/>
              </linearGradient>
              <linearGradient id="copperShade" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffd700" stop-opacity="0.9"/>
                <stop offset="50%" stop-color="#ff9500" stop-opacity="0.6"/>
                <stop offset="100%" stop-color="#8b3a00" stop-opacity="0.8"/>
              </linearGradient>
              <linearGradient id="copperGloss" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
                <stop offset="50%" stop-color="#ffeb3b" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#ff6f00" stop-opacity="0"/>
              </linearGradient>
              <radialGradient id="copperGlow">
                <stop offset="0%" stop-color="#ffff99" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#ff8c00" stop-opacity="0"/>
              </radialGradient>
              <filter id="shadowDeep">
                <feDropShadow dx="0" dy="15" stdDeviation="8" flood-opacity="0.8" flood-color="#000"/>
              </filter>
              <filter id="glow3d">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect width="400" height="400" fill="#000000"/>
            <circle cx="200" cy="200" r="150" fill="url(#copperGlow)" opacity="0.15"/>
            <g class="arrow-tip" filter="url(#shadowDeep)">
              <polygon points="200,80 240,160 160,160" fill="url(#copperMain)" stroke="#8b3a00" stroke-width="2" filter="url(#glow3d)"/>
              <polygon points="200,80 240,160 220,145" fill="url(#copperShade)" opacity="0.7"/>
              <polygon points="200,85 230,155 190,150" fill="url(#copperGloss)" opacity="0.6"/>
            </g>
            <g class="arrow-shaft" filter="url(#shadowDeep)">
              <line x1="200" y1="160" x2="200" y2="320" stroke="url(#copperGloss)" stroke-width="12" opacity="0.8"/>
              <rect x="192" y="160" width="16" height="160" fill="url(#copperMain)" stroke="#8b3a00" stroke-width="1"/>
              <rect x="192" y="160" width="6" height="160" fill="#a04000" opacity="0.5"/>
              <rect x="197" y="160" width="3" height="160" fill="#ffffff" opacity="0.7"/>
            </g>
            <g class="arrow-fletches" filter="url(#shadowDeep)">
              <polygon points="200,320 160,300 165,340 200,320" fill="url(#copperShade)" stroke="#8b3a00" stroke-width="1.5"/>
              <polygon points="160,300 165,330 162,305" fill="url(#copperGloss)" opacity="0.5"/>
              <polygon points="200,320 240,300 235,340 200,320" fill="url(#copperMain)" stroke="#8b3a00" stroke-width="1.5"/>
              <polygon points="240,300 235,330 238,305" fill="url(#copperGloss)" opacity="0.5"/>
              <polygon points="200,320 200,360 190,350 210,350" fill="url(#copperShade)" stroke="#8b3a00" stroke-width="1.5" opacity="0.9"/>
              <polygon points="200,350 205,355 195,355" fill="url(#copperGloss)" opacity="0.4"/>
            </g>
            <g class="arrow-nock" filter="url(#shadowDeep)">
              <rect x="195" y="310" width="10" height="25" fill="#8b3a00" stroke="#5a1a00" stroke-width="1"/>
              <rect x="197" y="312" width="2" height="21" fill="#ffeb3b" opacity="0.4"/>
            </g>
            <g class="snake-pattern" opacity="0.6">
              <path d="M200,200 Q210,210 200,220 Q190,230 200,240" stroke="#8b3a00" stroke-width="2" fill="none" stroke-linecap="round"/>
              <path d="M200,260 Q210,270 200,280" stroke="#8b3a00" stroke-width="2" fill="none" stroke-linecap="round"/>
            </g>
            <g class="light-rays" opacity="0.3">
              <line x1="200" y1="50" x2="200" y2="20" stroke="#ffff99" stroke-width="2"/>
              <line x1="250" y1="100" x2="280" y2="70" stroke="#ffff99" stroke-width="2"/>
              <line x1="150" y1="100" x2="120" y2="70" stroke="#ffff99" stroke-width="2"/>
              <line x1="260" y1="200" x2="300" y2="200" stroke="#ffff99" stroke-width="1.5"/>
              <line x1="140" y1="200" x2="100" y2="200" stroke="#ffff99" stroke-width="1.5"/>
            </g>
          </svg>
        </div>
      </div>`
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

  const titleEl = document.getElementById('museum-3d-detail-title');
  const textEl = document.getElementById('museum-3d-detail-text');
  if (titleEl) titleEl.textContent = `${zone.id} — ${zone.label}`;
  if (textEl) textEl.textContent = zone.text;

  document.querySelectorAll('.museum-3d-section-item').forEach(el => {
    el.classList.toggle('active', el.dataset.zone === id);
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

/* Render timeline with 3D objects */
function renderTimeline(timeKey) {
  const data = TIMELINE_DATA[timeKey];
  if (!data) return;
  const detail = document.getElementById('timeline-detail');
  if (!detail) return;

  detail.style.borderTop = `4px solid ${data.color}`;
  detail.innerHTML = `
    <div class="timeline-inner">
      <div class="timeline-text-block">
        <h3 style="color:${data.color}">${data.title}</h3>
        <p class="timeline-period">⏱ ${data.period}</p>
        <p>${data.text}</p>
      </div>
      <div class="obj3d-wrap">${data.object3d}</div>
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
      buildFloorPlan(floor);
      buildSectionList(floor);
      activeZone = null;
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
  renderTimeline('marine');
}

/* Run on DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
