/**
 * Clic en canvas → getImageData → asociar RGB a sección (objeto zones con claves "r,g,b").
 * La imagen va invisible encima del canvas (misma caja, object-fit: contain) para
 * mantener alineación; los clics los recibe el canvas.
 */

/** Distancia máxima (RGB)² para aceptar el color más cercano. */
const COLOR_MATCH_MAX_SQ = 72 * 72;

/**
 * Claves "R,G,B" (valores 0–255 del píxel de referencia).
 * Ajusta los números midiendo con un editor de imagen o un log temporal de clics.
 */
const zones = {
  '196,154,108': {
    title: 'Recepción',
    description: 'Espacio de acogida, orientación al visitante e información general del centro.',
    color: '#c49a6c'
  },
  '230,139,44': {
    title: 'Sala Paleolítico',
    description: 'Ámbito dedicado al Paleolítico: tecnología lítica, caza-recolección y paisajes glaciares.',
    color: '#e68b2c'
  },
  '91,159,149': {
    title: 'Evolución humana',
    description: 'Recorrido por la evolución biológica y cultural de los homínidos y Homo sapiens.',
    color: '#5b9f95'
  }
};

function parseZoneKey(key) {
  const p = key.split(',').map(Number);
  if (p.length !== 3 || p.some(n => Number.isNaN(n))) return null;
  return p;
}

function closestZoneEntry(r, g, b) {
  let bestKey = null;
  let bestD = Infinity;
  for (const key of Object.keys(zones)) {
    const ref = parseZoneKey(key);
    if (!ref) continue;
    const [zr, zg, zb] = ref;
    const d = (r - zr) ** 2 + (g - zg) ** 2 + (b - zb) ** 2;
    if (d < bestD) {
      bestD = d;
      bestKey = key;
    }
  }
  if (bestKey == null || bestD > COLOR_MATCH_MAX_SQ) return null;
  return { key: bestKey, data: zones[bestKey], distanceSq: bestD };
}

function samplePixel(ctx, x, y) {
  let data;
  try {
    data = ctx.getImageData(x, y, 1, 1).data;
  } catch {
    return null;
  }
  return [data[0], data[1], data[2]];
}

/** Promedio 3×3 para suavizar bordes y compresión. */
function samplePixelAvg(ctx, cw, ch, ix, iy) {
  let tr = 0;
  let tg = 0;
  let tb = 0;
  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const x = Math.max(0, Math.min(cw - 1, ix + dx));
      const y = Math.max(0, Math.min(ch - 1, iy + dy));
      const rgb = samplePixel(ctx, x, y);
      if (!rgb) return null;
      tr += rgb[0];
      tg += rgb[1];
      tb += rgb[2];
      n++;
    }
  }
  return [Math.round(tr / n), Math.round(tg / n), Math.round(tb / n)];
}

function clientToCanvasPixel(canvas, ev) {
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return null;
  const cw = canvas.width;
  const ch = canvas.height;
  const x = ((ev.clientX - rect.left) / rect.width) * cw;
  const y = ((ev.clientY - rect.top) / rect.height) * ch;
  const ix = Math.floor(Math.max(0, Math.min(cw - 1, x)));
  const iy = Math.floor(Math.max(0, Math.min(ch - 1, y)));
  return { ix, iy, cw, ch };
}

function updatePanel(entry, pickedRgb) {
  const hint = document.getElementById('cp-hint');
  const head = document.getElementById('cp-panel-head');
  const title = document.getElementById('cp-panel-title');
  const swatch = document.getElementById('cp-panel-swatch');
  const rgbLine = document.getElementById('cp-panel-rgb');
  const desc = document.getElementById('cp-panel-desc');

  if (!head || !title || !swatch || !rgbLine || !desc) return;

  if (!entry) {
    if (hint) hint.hidden = false;
    head.hidden = true;
    rgbLine.hidden = true;
    desc.hidden = true;
    title.textContent = '';
    desc.textContent = '';
    swatch.style.background = '';
    rgbLine.textContent = '';
    return;
  }

  if (hint) hint.hidden = true;
  head.hidden = false;
  rgbLine.hidden = false;
  desc.hidden = false;
  title.textContent = entry.data.title;
  desc.textContent = entry.data.description;
  swatch.style.background = entry.data.color;
  const [r, g, b] = pickedRgb;
  rgbLine.textContent = `Píxel: rgb(${r}, ${g}, ${b}) · referencia: ${entry.key}`;
}

function updateHover(entry) {
  const el = document.getElementById('cp-hover');
  if (!el) return;
  if (!entry) {
    el.textContent = '';
    el.classList.remove('is-hot');
    return;
  }
  el.textContent = `Hover: ${entry.data.title}`;
  el.classList.add('is-hot');
}

function drawImageToCanvas(img, canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  if (!nw || !nh) return false;
  canvas.width = nw;
  canvas.height = nh;
  ctx.drawImage(img, 0, 0, nw, nh);
  try {
    ctx.getImageData(0, 0, 1, 1);
  } catch (e) {
    console.warn('[color-pick-map] getImageData bloqueado (CORS u origen).', e);
    return false;
  }
  return true;
}

function alignSourceImg(canvas, img) {
  const rect = canvas.getBoundingClientRect();
  img.style.width = `${rect.width}px`;
  img.style.height = `${rect.height}px`;
}

function initColorPickMap() {
  const canvas = document.getElementById('map-canvas');
  const img = document.getElementById('map-source');
  const stage = document.querySelector('.cp-stage');
  if (!canvas || !img || !stage) return;

  let ready = false;

  function onImageReady() {
    ready = drawImageToCanvas(img, canvas);
    alignSourceImg(canvas, img);
    if (!ready) {
      const hint = document.getElementById('cp-hint');
      if (hint) {
        hint.textContent =
          'No se pueden leer píxeles (CORS o archivo local). Sirve la página por http(s) mismo origen y usa crossOrigin en la imagen.';
      }
    }
  }

  if (img.complete && img.naturalWidth) onImageReady();
  else img.addEventListener('load', onImageReady, { once: true });

  const ro = new ResizeObserver(() => {
    if (ready) alignSourceImg(canvas, img);
  });
  ro.observe(stage);

  canvas.addEventListener('click', ev => {
    if (!ready) return;
    const pos = clientToCanvasPixel(canvas, ev);
    if (!pos) return;
    const rgb = samplePixelAvg(canvas.getContext('2d', { willReadFrequently: true }), pos.cw, pos.ch, pos.ix, pos.iy);
    if (!rgb) return;
    const hit = closestZoneEntry(rgb[0], rgb[1], rgb[2]);
    updatePanel(hit, rgb);
  });

  canvas.addEventListener('mousemove', ev => {
    if (!ready) return;
    const pos = clientToCanvasPixel(canvas, ev);
    if (!pos) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rgb = samplePixelAvg(ctx, pos.cw, pos.ch, pos.ix, pos.iy);
    if (!rgb) return;
    const hit = closestZoneEntry(rgb[0], rgb[1], rgb[2]);
    updateHover(hit);
  });

  canvas.addEventListener('mouseleave', () => updateHover(null));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initColorPickMap);
} else {
  initColorPickMap();
}
