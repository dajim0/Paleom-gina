/**
 * Zonas = flood por color (ROI) + envolvente convexa del borde + simplificación.
 * node scripts/trace-museum-zones.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const FLOOR_PLAN_INSET = {
  ground: { x0: 0.6625, y0: 0.0735, x1: 0.9994, y1: 0.7567 },
  first: { x0: 0.0133, y0: 0.0195, x1: 0.9867, y1: 0.987 }
};

function decodePng(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) throw new Error('No es PNG');
  let o = 8;
  let width;
  let height;
  let bitDepth;
  let colorType;
  const idats = [];
  while (o + 8 <= buf.length) {
    const len = buf.readUInt32BE(o);
    const type = buf.toString('ascii', o + 4, o + 8);
    const data = buf.subarray(o + 8, o + 8 + len);
    o += 12 + len;
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') idats.push(data);
    else if (type === 'IEND') break;
  }
  if (bitDepth !== 8) throw new Error('Solo bitDepth 8');
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
  if (!bpp) throw new Error('colorType no soportado: ' + colorType);
  const raw = zlib.inflateSync(Buffer.concat(idats));
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let p = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    const row = raw.subarray(p, p + stride);
    p += stride;
    const rowOut = out.subarray(y * stride, y * stride + stride);
    for (let x = 0; x < width; x++) {
      const i = x * bpp;
      let r = row[i];
      let g = row[i + 1];
      let b = row[i + 2];
      const a = bpp === 4 ? row[i + 3] : 255;
      let R = r;
      let G = g;
      let B = b;
      if (filter === 1) {
        if (x > 0) {
          R = (R + rowOut[i - bpp]) & 255;
          G = (G + rowOut[i - bpp + 1]) & 255;
          B = (B + rowOut[i - bpp + 2]) & 255;
        }
      } else if (filter === 2) {
        if (y > 0) {
          R = (R + out[(y - 1) * stride + i]) & 255;
          G = (G + out[(y - 1) * stride + i + 1]) & 255;
          B = (B + out[(y - 1) * stride + i + 2]) & 255;
        }
      } else if (filter === 3) {
        let lr = 0;
        let lg = 0;
        let lb = 0;
        if (x > 0) {
          lr = rowOut[i - bpp];
          lg = rowOut[i - bpp + 1];
          lb = rowOut[i - bpp + 2];
        }
        let ur = 0;
        let ug = 0;
        let ub = 0;
        if (y > 0) {
          ur = out[(y - 1) * stride + i];
          ug = out[(y - 1) * stride + i + 1];
          ub = out[(y - 1) * stride + i + 2];
        }
        R = (R + ((lr + ur) >> 1)) & 255;
        G = (G + ((lg + ug) >> 1)) & 255;
        B = (B + ((lb + ub) >> 1)) & 255;
      } else if (filter === 4) {
        const paeth = (a, b, c) => {
          const pp = a + b - c;
          const pa = Math.abs(pp - a);
          const pb = Math.abs(pp - b);
          const pc = Math.abs(pp - c);
          if (pa <= pb && pa <= pc) return a;
          if (pb <= pc) return b;
          return c;
        };
        let ar = 0;
        let ag = 0;
        let ab = 0;
        if (x > 0) {
          ar = rowOut[i - bpp];
          ag = rowOut[i - bpp + 1];
          ab = rowOut[i - bpp + 2];
        }
        let br = 0;
        let bg = 0;
        let bb = 0;
        if (y > 0) {
          br = out[(y - 1) * stride + i];
          bg = out[(y - 1) * stride + i + 1];
          bb = out[(y - 1) * stride + i + 2];
        }
        let cr = 0;
        let cg = 0;
        let cb = 0;
        if (x > 0 && y > 0) {
          cr = out[(y - 1) * stride + i - bpp];
          cg = out[(y - 1) * stride + i - bpp + 1];
          cb = out[(y - 1) * stride + i - bpp + 2];
        }
        R = (R + paeth(ar, br, cr)) & 255;
        G = (G + paeth(ag, bg, cg)) & 255;
        B = (B + paeth(ab, bb, cb)) & 255;
      }
      rowOut[i] = R;
      rowOut[i + 1] = G;
      rowOut[i + 2] = B;
      if (bpp === 4) rowOut[i + 3] = a;
    }
  }
  return { width, height, bpp, data: out };
}

function rgbAt(img, x, y) {
  const { width: W, bpp, data } = img;
  const i = y * W * bpp + x * bpp;
  return [data[i], data[i + 1], data[i + 2]];
}

function dist2(a, b) {
  const d0 = a[0] - b[0];
  const d1 = a[1] - b[1];
  const d2 = a[2] - b[2];
  return d0 * d0 + d1 * d1 + d2 * d2;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** Primer píxel en ROI cuya distancia al color objetivo sea baja (relleno, no borde). */
function findSeedNearHex(img, roi, hex, maxD2) {
  const t = hexToRgb(hex);
  const { width: W, bpp, data } = img;
  const stride = W * bpp;
  let best = null;
  let bestD = 1e12;
  for (let y = roi.y0; y <= roi.y1; y++) {
    for (let x = roi.x0; x <= roi.x1; x++) {
      const i = y * stride + x * bpp;
      const c = [data[i], data[i + 1], data[i + 2]];
      const d = dist2(c, t);
      if (d < bestD) {
        bestD = d;
        best = { x, y };
      }
    }
  }
  return best;
}

/** Semilla en el centro del ROI + color mediano (evita acertar en el círculo-número marrón). */
function centerRoiSeed(img, roi) {
  const cx = ((roi.x0 + roi.x1) / 2) | 0;
  const cy = ((roi.y0 + roi.y1) / 2) | 0;
  return { x: cx, y: cy };
}

function medianRgb(img, cx, cy, rad) {
  const { width: W, height: H } = img;
  const rs = [];
  for (let dy = -rad; dy <= rad; dy++) {
    for (let dx = -rad; dx <= rad; dx++) {
      const x = cx + dx;
      const y = cy + dy;
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      rs.push(rgbAt(img, x, y));
    }
  }
  const comp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  rs.sort(comp);
  return rs[(rs.length / 2) | 0];
}

function floodRoi(img, sx, sy, seedRgb, tol2, roi) {
  const { width: W, height: H, bpp, data } = img;
  const stride = W * bpp;
  const mask = new Uint8Array(W * H);
  const stack = [[sx, sy]];
  mask[sy * W + sx] = 1;
  while (stack.length) {
    const [x, y] = stack.pop();
    const nbs = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ];
    for (const [nx, ny] of nbs) {
      if (nx < roi.x0 || nx > roi.x1 || ny < roi.y0 || ny > roi.y1) continue;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const k = ny * W + nx;
      if (mask[k]) continue;
      const i = ny * stride + nx * bpp;
      const c = [data[i], data[i + 1], data[i + 2]];
      if (dist2(c, seedRgb) <= tol2) {
        mask[k] = 1;
        stack.push([nx, ny]);
      }
    }
  }
  return mask;
}

function maskArea(mask, W, H) {
  let n = 0;
  for (let i = 0; i < W * H; i++) if (mask[i]) n++;
  return n;
}

function dilateMask(mask, W, H, iterations) {
  let cur = mask;
  for (let it = 0; it < iterations; it++) {
    const n = new Uint8Array(W * H);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (cur[y * W + x]) {
          n[y * W + x] = 1;
          continue;
        }
        let hit = 0;
        for (const [dx, dy] of [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0]
        ]) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < W && ny < H && cur[ny * W + nx]) {
            hit = 1;
            break;
          }
        }
        n[y * W + x] = hit;
      }
    }
    cur = n;
  }
  return cur;
}

function maskBBoxPx(mask, W, H, pad) {
  let minX = W;
  let minY = H;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!mask[y * W + x]) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  if (minX > maxX) return null;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(W - 1, maxX + pad);
  maxY = Math.min(H - 1, maxY + pad);
  return { minX, minY, maxX, maxY };
}

function clipPolyToMaskBBox(polyPx, bbox) {
  if (!bbox) return polyPx;
  const { minX, minY, maxX, maxY } = bbox;
  return polyPx.map(([x, y]) => [Math.min(maxX, Math.max(minX, x)), Math.min(maxY, Math.max(minY, y))]);
}

function boundaryPoints(mask, W, H) {
  const inside = (x, y) => x >= 0 && y >= 0 && x < W && y < H && mask[y * W + x];
  const pts = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!inside(x, y)) continue;
      if (!inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1) || !inside(x, y + 1)) pts.push([x, y]);
    }
  }
  if (pts.length > 8000) {
    const step = Math.ceil(pts.length / 8000);
    return pts.filter((_, i) => i % step === 0);
  }
  return pts;
}

function cross(o, a, b) {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function convexHull(points) {
  if (points.length < 3) return points.slice();
  const P = points.slice().sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  const lower = [];
  for (const p of P) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = P.length - 1; i >= 0; i--) {
    const p = P[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

function perpDist(p, a, b) {
  const [px, py] = p;
  const [ax, ay] = a;
  const [bx, by] = b;
  const dx = bx - ax;
  const dy = by - ay;
  if (dx === 0 && dy === 0) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function douglasPeucker(pts, eps) {
  if (pts.length <= 3) return pts.slice();
  let idx = 0;
  let dmax = 0;
  const a = pts[0];
  const b = pts[pts.length - 1];
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perpDist(pts[i], a, b);
    if (d > dmax) {
      dmax = d;
      idx = i;
    }
  }
  if (dmax > eps) {
    const l = douglasPeucker(pts.slice(0, idx + 1), eps);
    const r = douglasPeucker(pts.slice(idx), eps);
    return l.slice(0, -1).concat(r);
  }
  return [a, b];
}

function fullToInsetNorm(x, y, W, H, inset) {
  const rw = inset.x1 - inset.x0;
  const rh = inset.y1 - inset.y0;
  return [(x / W - inset.x0) / rw, (y / H - inset.y0) / rh];
}

function insetRoiToPx(inset, W, H, nx0, ny0, nx1, ny1, pad) {
  const x0 = Math.max(0, Math.floor((inset.x0 + nx0 * (inset.x1 - inset.x0)) * W) - pad);
  const y0 = Math.max(0, Math.floor((inset.y0 + ny0 * (inset.y1 - inset.y0)) * H) - pad);
  const x1 = Math.min(W - 1, Math.ceil((inset.x0 + nx1 * (inset.x1 - inset.x0)) * W) + pad);
  const y1 = Math.min(H - 1, Math.ceil((inset.y0 + ny1 * (inset.y1 - inset.y0)) * H) + pad);
  return { x0, y0, x1, y1 };
}

function traceOne(img, inset, spec) {
  const { width: W, height: H } = img;
  const roi = insetRoiToPx(inset, W, H, spec.roiN[0], spec.roiN[1], spec.roiN[2], spec.roiN[3], spec.pad | 8);
  let sx;
  let sy;
  if (spec.seedPx && spec.seedPx.length === 2) {
    sx = Math.min(W - 1, Math.max(0, Math.floor(spec.seedPx[0] * W)));
    sy = Math.min(H - 1, Math.max(0, Math.floor(spec.seedPx[1] * H)));
  } else if (spec.hex && spec.useHexSeed) {
    const hit = findSeedNearHex(img, roi, spec.hex, (spec.hexMaxD || 45) ** 2);
    if (!hit) return null;
    sx = hit.x;
    sy = hit.y;
  } else {
    const seed = centerRoiSeed(img, roi);
    sx = seed.x;
    sy = seed.y;
  }
  const rad = spec.medianRad != null ? spec.medianRad : 10;
  const seedRgb = medianRgb(img, sx, sy, rad);
  const maxA = W * H * (spec.maxFrac || 0.28);
  const minA = spec.minA || 80;
  let tol2 = (spec.tolStart || 20) ** 2;
  let mask = null;
  let a = 0;
  for (let attempt = 0; attempt < 22; attempt++) {
    mask = floodRoi(img, sx, sy, seedRgb, tol2, roi);
    a = maskArea(mask, W, H);
    if (a > maxA) tol2 = Math.max(25, tol2 * 0.78);
    else if (a < minA) tol2 = Math.min(70 ** 2, tol2 * 1.08);
    else break;
  }
  if (a < minA * 0.5 || a > maxA * 1.05) return null;
  const dil = spec.dilate | 0;
  if (dil > 0) mask = dilateMask(mask, W, H, dil);
  const bbox = maskBBoxPx(mask, W, H, spec.bboxPad | 0);
  const bpts = boundaryPoints(mask, W, H);
  if (bpts.length < 6) return null;
  const hull = convexHull(bpts);
  if (hull.length < 3) return null;
  const simp = douglasPeucker(hull, spec.eps || 2.5);
  const clipped = clipPolyToMaskBBox(simp, bbox);
  return clipped
    .map(([x, y]) => {
      const nx = fullToInsetNorm(x, y, W, H, inset);
      return [+Math.min(0.998, Math.max(0.002, nx[0])).toFixed(4), +Math.min(0.998, Math.max(0.002, nx[1])).toFixed(4)];
    })
    .filter((p, i, a) => i === 0 || p[0] !== a[i - 1][0] || p[1] !== a[i - 1][1]);
}

function main() {
  const root = path.join(__dirname, '..');
  const gImg = decodePng(fs.readFileSync(path.join(root, 'images', 'planta-baja-museo.png')));
  const fImg = decodePng(fs.readFileSync(path.join(root, 'images', 'planta-primera-museo.png')));
  const gi = FLOOR_PLAN_INSET.ground;
  const fi = FLOOR_PLAN_INSET.first;

  const groundSpecs = [
    { id: '1', hex: '#c79a5f', roiN: [0.08, 0, 1, 0.58], seedPx: [0.805, 0.2], tolStart: 28, maxFrac: 0.35, eps: 2.0, medianRad: 14, dilate: 2, bboxPad: 0 },
    { id: '2', hex: '#d6a66f', roiN: [0.02, 0.42, 1, 1], seedPx: [0.77, 0.71], tolStart: 30, maxFrac: 0.45, eps: 2.0, medianRad: 14, dilate: 2, bboxPad: 0 },
    { id: '3', hex: '#9da881', roiN: [0, 0.12, 0.62, 0.95], seedPx: [0.72, 0.5], tolStart: 24, maxFrac: 0.32, eps: 1.8, medianRad: 12, dilate: 1, bboxPad: 0 }
  ];

  const firstSpecs = [
    { id: 'AS', hex: '#d0b183', roiN: [0.4, 0.32, 0.54, 0.48], seedPx: [0.47, 0.405], tolStart: 22, maxFrac: 0.045, eps: 1.6, medianRad: 6, dilate: 1, bboxPad: 0 },
    { id: '0', hex: '#c79a5f', roiN: [0.48, 0.42, 0.66, 0.58], tolStart: 22, maxFrac: 0.06, eps: 1.6, medianRad: 6, dilate: 1, bboxPad: 0 },
    { id: '1', hex: '#cda36d', roiN: [0.62, 0.52, 0.98, 0.98], seedPx: [0.82, 0.78], tolStart: 24, maxFrac: 0.32, eps: 2.0, medianRad: 10, dilate: 2, bboxPad: 0 },
    { id: '2', hex: '#d8ad76', roiN: [0.58, 0.32, 0.98, 0.58], seedPx: [0.78, 0.44], tolStart: 24, maxFrac: 0.14, eps: 1.8, medianRad: 8, dilate: 2, bboxPad: 0 },
    { id: '3', hex: '#dfb57d', roiN: [0.52, 0.08, 0.98, 0.42], seedPx: [0.75, 0.26], tolStart: 24, maxFrac: 0.2, eps: 1.8, medianRad: 10, dilate: 2, bboxPad: 0 },
    { id: '4', hex: '#cb7f49', roiN: [0.78, 0.02, 0.98, 0.16], seedPx: [0.88, 0.09], tolStart: 22, maxFrac: 0.07, eps: 1.5, medianRad: 5, dilate: 1, bboxPad: 0 },
    { id: '5', hex: '#bb703f', roiN: [0.28, 0.04, 0.64, 0.36], seedPx: [0.46, 0.2], tolStart: 24, maxFrac: 0.22, eps: 1.9, medianRad: 10, dilate: 2, bboxPad: 0 },
    { id: '6', hex: '#6f9663', roiN: [0.06, 0.04, 0.36, 0.28], seedPx: [0.22, 0.16], tolStart: 22, maxFrac: 0.14, eps: 1.8, medianRad: 8, dilate: 2, bboxPad: 0 },
    { id: '7', hex: '#879e5d', roiN: [0.1, 0.24, 0.34, 0.48], seedPx: [0.22, 0.36], tolStart: 24, maxFrac: 0.1, eps: 1.35, medianRad: 8, dilate: 2, bboxPad: 1 },
    { id: '8', hex: '#a99e4a', roiN: [0.08, 0.4, 0.38, 0.68], useHexSeed: true, hexMaxD: 55, tolStart: 28, maxFrac: 0.12, minA: 40, eps: 1.7, medianRad: 6, dilate: 2, bboxPad: 0 },
    { id: 'TZ', hex: '#9f8564', roiN: [0.02, 0.58, 0.34, 0.98], seedPx: [0.16, 0.82], tolStart: 24, maxFrac: 0.16, eps: 2.2, medianRad: 10, dilate: 2, bboxPad: 0 }
  ];

  const out = { ground: {}, first: {} };
  for (const s of groundSpecs) out.ground[s.id] = traceOne(gImg, gi, s);
  for (const s of firstSpecs) out.first[s.id] = traceOne(fImg, fi, s);
  console.log(JSON.stringify(out, null, 2));
}

main();
