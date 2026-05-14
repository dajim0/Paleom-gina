/**
 * Mapa interactivo por COLOR DE PÍXEL — únicamente <canvas> + getImageData.
 *
 * 1) Cargamos la imagen en memoria (Image), dibujamos con drawImage en el canvas.
 * 2) El canvas tiene width/height = tamaño NATURAL de la imagen (píxeles reales).
 *    Visualmente se escala con CSS (width:100%; height:auto) → responsive.
 * 3) En cada clic convertimos coordenadas de pantalla a píxeles del bitmap usando:
 *        scaleX = canvas.width / rect.width
 *        scaleY = canvas.height / rect.height
 *    (rect = getBoundingClientRect() del canvas en CSS pixels).
 * 4) Leemos RGB con getImageData(ix, iy, 1, 1).
 * 5) Buscamos la sala en `zones`: primero clave exacta `${r},${g},${b}`; si no hay
 *    coincidencia (normal en PNG/JPEG), usamos la clave de referencia más cercana
 *    en espacio RGB dentro de un umbral.
 * 6) Resaltado: volvemos a dibujar la imagen base y aplicamos un brillo translúcido
 *    solo sobre la región conectada del mismo color que el píxel semilla (flood fill),
 *    sin SVG ni divs encima — todo en píxeles del canvas.
 */

/** Umbral (distancia RGB)² para asociar el clic a una sala de referencia. */
const ZONE_MATCH_MAX_SQ = 85 * 85;

/**
 * Tolerancia para agrupar píxeles “de la misma mancha” en el resaltado (flood fill).
 * Comparación: distancia² del píxel al COLOR SEMILLA del clic ≤ este valor.
 */
const HIGHLIGHT_FILL_MAX_SQ = 38 * 38;

/** Máximo de píxeles a pintar en el resaltado (evita cuelgues en colores muy comunes). */
const HIGHLIGHT_MAX_PIXELS = 90000;

/**
 * Referencias de color → sala. Las claves son "R,G,B" de MUESTRA sobre TU PNG
 * (ajústalas con un pincel de color / consola temporal).
 * Incluye `color` para el panel (hex legible).
 */
const zones = {
  '196,154,108': {
    id: 'recepcion',
    title: 'Recepción',
    description: 'Zona principal de bienvenida y orientación al visitante.',
    color: '#c49a6c'
  },
  '226,139,44': {
    id: 'paleolitico',
    title: 'Paleolítico',
    description: 'Exposición dedicada al Paleolítico y a las primeras sociedades cazadoras-recolectoras.',
    color: '#e68b2c'
  },
  '91,159,149': {
    id: 'evolucion',
    title: 'Evolución humana',
    description: 'Hominización, adaptación y registro fósil de la evolución humana.',
    color: '#5b9f95'
  }
};

const IMG_SRC = '../images/planta-baja-museo.png';

let baseCanvas = null;
let visibleCanvas = null;
let visibleCtx = null;

function parseKey(key) {
  const p = key.split(',').map(Number);
  if (p.length !== 3 || p.some(n => Number.isNaN(n) || n < 0 || n > 255)) return null;
  return p;
}

/** Busca sala: 1) clave exacta 2) referencia RGB más cercana bajo umbral. */
function resolveZone(r, g, b) {
  const exactKey = `${r},${g},${b}`;
  if (zones[exactKey]) {
    return { zone: zones[exactKey], key: exactKey, mode: 'exact' };
  }
  let bestKey = null;
  let bestD = Infinity;
  for (const key of Object.keys(zones)) {
    const ref = parseKey(key);
    if (!ref) continue;
    const d = (r - ref[0]) ** 2 + (g - ref[1]) ** 2 + (b - ref[2]) ** 2;
    if (d < bestD) {
      bestD = d;
      bestKey = key;
    }
  }
  if (bestKey == null || bestD > ZONE_MATCH_MAX_SQ) return null;
  return { zone: zones[bestKey], key: bestKey, mode: 'nearest' };
}

function rgbDist2(a, b) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

/**
 * Flood fill 4-vecinos desde (sx,sy). Un píxel entra si su RGB está cerca del
 * color SEMILLA (el del clic), no del promedio de la región — típico para manchas de color en planos.
 */
function buildHighlightMask(data, w, h, sx, sy, maxSq, maxPixels) {
  const idx = (x, y) => y * w + x;
  const i0 = idx(sx, sy) * 4;
  const seed = [data[i0], data[i0 + 1], data[i0 + 2]];
  const visited = new Uint8Array(w * h);
  const mask = new Uint8Array(w * h);
  const q = [[sx, sy]];
  visited[idx(sx, sy)] = 1;
  let count = 0;

  while (q.length && count < maxPixels) {
    const [x, y] = q.pop();
    const p = idx(x, y);
    const o = p * 4;
    const pr = [data[o], data[o + 1], data[o + 2]];
    if (rgbDist2(pr, seed) > maxSq) continue;
    if (mask[p]) continue;
    mask[p] = 1;
    count++;

    const neigh = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ];
    for (const [nx, ny] of neigh) {
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const np = idx(nx, ny);
      if (visited[np]) continue;
      visited[np] = 1;
      q.push([nx, ny]);
    }
  }
  return mask;
}

/** Copia imagen base al canvas visible y aplica brillo amarillo translúcido en máscara. */
function redrawWithHighlight(ix, iy) {
  if (!baseCanvas || !visibleCtx || !visibleCanvas) return;
  const w = visibleCanvas.width;
  const h = visibleCanvas.height;
  visibleCtx.drawImage(baseCanvas, 0, 0);

  const snap = visibleCtx.getImageData(0, 0, w, h);
  const d = snap.data;
  const mask = buildHighlightMask(d, w, h, ix, iy, HIGHLIGHT_FILL_MAX_SQ, HIGHLIGHT_MAX_PIXELS);

  const alpha = 0.28;
  const lr = 255;
  const lg = 235;
  const lb = 120;

  for (let p = 0, i = 0; p < w * h; p++, i += 4) {
    if (!mask[p]) continue;
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    d[i] = Math.min(255, Math.round(r * (1 - alpha) + lr * alpha));
    d[i + 1] = Math.min(255, Math.round(g * (1 - alpha) + lg * alpha));
    d[i + 2] = Math.min(255, Math.round(b * (1 - alpha) + lb * alpha));
  }
  visibleCtx.putImageData(snap, 0, 0);
}

function updatePanel(hit, pickedRgb) {
  const hint = document.getElementById('mcm-hint');
  const head = document.getElementById('mcm-head');
  const title = document.getElementById('mcm-title');
  const swatch = document.getElementById('mcm-swatch');
  const meta = document.getElementById('mcm-meta');
  const desc = document.getElementById('mcm-desc');

  if (!head || !title || !swatch || !meta || !desc) return;

  if (!hit) {
    if (hint) hint.hidden = false;
    head.hidden = true;
    meta.hidden = true;
    desc.hidden = true;
    title.textContent = '';
    desc.textContent = '';
    meta.textContent = '';
    swatch.style.background = '';
    return;
  }

  if (hint) hint.hidden = true;
  head.hidden = false;
  meta.hidden = false;
  desc.hidden = false;
  title.textContent = hit.zone.title;
  desc.textContent = hit.zone.description;
  swatch.style.background = hit.zone.color;
  const [r, g, b] = pickedRgb;
  meta.textContent = `Píxel: ${r},${g},${b} → clave ${hit.mode === 'exact' ? 'exacta' : 'cercana'}: ${hit.key} · id: ${hit.zone.id}`;
}

function clientToBitmapPixel(canvas, ev) {
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return null;
  /** Escala real entre píxeles del bitmap y píxeles CSS mostrados (responsive). */
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const bx = (ev.clientX - rect.left) * scaleX;
  const by = (ev.clientY - rect.top) * scaleY;
  const ix = Math.floor(Math.max(0, Math.min(canvas.width - 1, bx)));
  const iy = Math.floor(Math.max(0, Math.min(canvas.height - 1, by)));
  return { ix, iy, scaleX, scaleY };
}

function initMuseumCanvasMap() {
  visibleCanvas = document.getElementById('museum-canvas');
  if (!visibleCanvas) return;
  visibleCtx = visibleCanvas.getContext('2d', { willReadFrequently: true });

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.decoding = 'async';

  img.onload = () => {
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (!nw || !nh) return;

    /** Bitmap interno = resolución nativa de la imagen (obligatorio para colores reales). */
    visibleCanvas.width = nw;
    visibleCanvas.height = nh;

    baseCanvas = document.createElement('canvas');
    baseCanvas.width = nw;
    baseCanvas.height = nh;
    const bctx = baseCanvas.getContext('2d', { willReadFrequently: true });
    bctx.drawImage(img, 0, 0, nw, nh);

    try {
      bctx.getImageData(0, 0, 1, 1);
    } catch (e) {
      console.warn('[museum-canvas-map] getImageData bloqueado (CORS / origen).', e);
      const hint = document.getElementById('mcm-hint');
      if (hint) {
        hint.textContent =
          'No se pueden leer píxeles: sirve esta página por http(s) mismo origen y asegura CORS en la imagen.';
      }
      return;
    }

    visibleCtx.drawImage(baseCanvas, 0, 0);
  };

  img.onerror = () => {
    const hint = document.getElementById('mcm-hint');
    if (hint) hint.textContent = 'Error al cargar la imagen del plano.';
  };

  img.src = IMG_SRC;

  visibleCanvas.addEventListener('click', ev => {
    if (!baseCanvas) return;
    const pos = clientToBitmapPixel(visibleCanvas, ev);
    if (!pos) return;

    let data;
    try {
      data = visibleCtx.getImageData(pos.ix, pos.iy, 1, 1).data;
    } catch {
      return;
    }
    const r = data[0];
    const g = data[1];
    const b = data[2];
    const picked = [r, g, b];

    const hit = resolveZone(r, g, b);
    updatePanel(hit, picked);

    if (hit) {
      redrawWithHighlight(pos.ix, pos.iy);
    } else {
      visibleCtx.drawImage(baseCanvas, 0, 0);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMuseumCanvasMap);
} else {
  initMuseumCanvasMap();
}
