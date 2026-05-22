/**
 * Estimate circle centers on mapa interpretativo.png (brown ring pixels).
 * Run: node scripts/tune-territory-map.cjs
 */
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

const MAP = path.join(__dirname, "../images/site/mapa interpretativo.png");

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function decodePng(filePath) {
  const buf = fs.readFileSync(filePath);
  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  const idat = [];
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const chunk = buf.subarray(offset + 8, offset + 8 + len);
    offset += 12 + len;
    if (type === "IHDR") {
      width = chunk.readUInt32BE(0);
      height = chunk.readUInt32BE(4);
      colorType = chunk[9];
    } else if (type === "IDAT") idat.push(chunk);
    else if (type === "IEND") break;
  }
  if (colorType !== 6 && colorType !== 2) throw new Error(`Unsupported color type ${colorType}`);
  const bpp = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * bpp;
  const out = Buffer.alloc(width * height * 4);
  let src = 0;
  let prior = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[src++];
    const row = Buffer.alloc(stride);
    for (let i = 0; i < stride; i++) row[i] = raw[src++];
    const cur = Buffer.alloc(stride);
    for (let i = 0; i < stride; i++) {
      const left = i >= bpp ? cur[i - bpp] : 0;
      const up = prior[i];
      const upLeft = i >= bpp ? prior[i - bpp] : 0;
      let v = row[i];
      if (filter === 1) v = (v + left) & 0xff;
      else if (filter === 2) v = (v + up) & 0xff;
      else if (filter === 3) v = (v + ((left + up) >> 1)) & 0xff;
      else if (filter === 4) v = (v + paeth(left, up, upLeft)) & 0xff;
      cur[i] = v;
    }
    for (let x = 0; x < width; x++) {
      const si = x * bpp;
      const di = (y * width + x) * 4;
      out[di] = cur[si];
      out[di + 1] = cur[si + 1];
      out[di + 2] = cur[si + 2];
      out[di + 3] = bpp === 4 ? cur[si + 3] : 255;
    }
    prior = cur;
  }
  return { width, height, rgba: out };
}

function isRing(r, g, b) {
  return r >= 95 && r <= 195 && g >= 45 && g <= 135 && b >= 18 && b <= 95 && r - g >= 25 && g - b >= 12;
}

function cluster(mask, W, H, minPixels) {
  const seen = new Uint8Array(W * H);
  const clusters = [];
  const idx = (x, y) => y * W + x;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = idx(x, y);
      if (!mask[i] || seen[i]) continue;
      const stack = [[x, y]];
      seen[i] = 1;
      let sumX = 0;
      let sumY = 0;
      let count = 0;
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      while (stack.length) {
        const [cx, cy] = stack.pop();
        sumX += cx;
        sumY += cy;
        count++;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
        for (const [nx, ny] of [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1],
        ]) {
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const ni = idx(nx, ny);
          if (!mask[ni] || seen[ni]) continue;
          seen[ni] = 1;
          stack.push([nx, ny]);
        }
      }
      if (count >= minPixels) {
        const diam = Math.max(maxX - minX + 1, maxY - minY + 1);
        clusters.push({
          cx: sumX / count,
          cy: sumY / count,
          xPct: (100 * sumX) / count / W,
          yPct: (100 * sumY) / count / H,
          sizePct: (100 * diam) / W,
          pixels: count,
          diam,
        });
      }
    }
  }
  return clusters.sort((a, b) => b.pixels - a.pixels);
}

const { width: W, height: H, rgba } = decodePng(MAP);
const mask = new Uint8Array(W * H);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    if (isRing(rgba[i], rgba[i + 1], rgba[i + 2])) mask[y * W + x] = 1;
  }
}

function sampleAt(xPct, yPct) {
  const x = Math.round((xPct / 100) * (W - 1));
  const y = Math.round((yPct / 100) * (H - 1));
  const i = (y * W + x) * 4;
  return { r: rgba[i], g: rgba[i + 1], b: rgba[i + 2] };
}

/** Find ring center in ROI by scoring brown pixels weighted toward compact blobs. */
function findInRoi(cxPct, cyPct, radiusPct, minPx = 120) {
  const cx = (cxPct / 100) * W;
  const cy = (cyPct / 100) * H;
  const r = (radiusPct / 100) * W;
  const sub = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist <= r && mask[y * W + x]) sub[y * W + x] = 1;
    }
  }
  const hits = cluster(sub, W, H, minPx);
  return hits[0] || null;
}

const points = [
  { id: "relieve", x: 49.4, y: 14.1, roi: 12 },
  { id: "tetis", x: 60.4, y: 38.2, roi: 11 },
  { id: "cuaternario", x: 31.8, y: 48.2, roi: 8 },
  { id: "neandertal", x: 33.6, y: 66.4, roi: 8 },
  { id: "centro", x: 50.2, y: 84.8, roi: 11 },
  { id: "terraza", x: 83.6, y: 81.4, roi: 11 },
];

console.log(`Image ${W}x${H}\n`);
console.log("ROI ring fit (from current coords):");
for (const p of points) {
  const hit = findInRoi(p.x, p.y, p.roi, p.id.includes("cuatern") || p.id === "neandertal" ? 40 : 100);
  const rgb = sampleAt(p.x, p.y);
  if (hit) {
    console.log(
      `  ${p.id}: x=${hit.xPct.toFixed(2)} y=${hit.yPct.toFixed(2)} size=${hit.sizePct.toFixed(2)} (was ${p.x}, ${p.y})`
    );
  } else {
    console.log(`  ${p.id}: no cluster — center rgb ${rgb.r},${rgb.g},${rgb.b}`);
  }
}

/** Radial scan: first brown pixel from center outward ≈ inner ring radius. */
console.log("\nRGB along horizontal scan through center:");
for (const p of points) {
  const cy = Math.round((p.y / 100) * (H - 1));
  const cx = Math.round((p.x / 100) * (W - 1));
  const row = [];
  for (let dx = -55; dx <= 55; dx += 5) {
    const x = cx + dx;
    if (x < 0 || x >= W) continue;
    const i = (cy * W + x) * 4;
    const r = rgba[i];
    const g = rgba[i + 1];
    const b = rgba[i + 2];
    if (isRing(r, g, b)) row.push(`@${dx}`);
  }
  console.log(`  ${p.id}: brown at dx [${row.join(", ")}]`);
}

/** Score best center: maximize brown pixels on a ring of radius R. */
function optimizeCenter(id, guessX, guessY, sizePct) {
  const R = Math.round(((sizePct / 100) * W) / 2);
  let best = { score: -1, x: guessX, y: guessY };
  for (let yp = guessY - 3; yp <= guessY + 3; yp += 0.35) {
    for (let xp = guessX - 3; xp <= guessX + 3; xp += 0.35) {
      const cx = Math.round((xp / 100) * (W - 1));
      const cy = Math.round((yp / 100) * (H - 1));
      let score = 0;
      for (let k = 0; k < 36; k++) {
        const a = (2 * Math.PI * k) / 36;
        const x = Math.round(cx + R * Math.cos(a));
        const y = Math.round(cy + R * Math.sin(a));
        if (x < 0 || y < 0 || x >= W || y >= H) continue;
        const i = (y * W + x) * 4;
        if (isRing(rgba[i], rgba[i + 1], rgba[i + 2])) score++;
      }
      if (score > best.score) best = { score, x: xp, y: yp };
    }
  }
  return best;
}

console.log("\nRing-fit optimize (±3% search, fixed size from data.js):");
const sizes = {
  relieve: 17.7,
  tetis: 15.4,
  cuaternario: 8.8,
  neandertal: 8.6,
  centro: 14.6,
  terraza: 15.2,
};
function optimizeSize(xPct, yPct, sizePct) {
  let best = { score: -1, size: sizePct };
  for (let s = sizePct - 1.8; s <= sizePct + 0.6; s += 0.25) {
    const R = Math.round(((s / 100) * W) / 2);
    const cx = Math.round((xPct / 100) * (W - 1));
    const cy = Math.round((yPct / 100) * (H - 1));
    let score = 0;
    for (let k = 0; k < 36; k++) {
      const a = (2 * Math.PI * k) / 36;
      const x = Math.round(cx + R * Math.cos(a));
      const y = Math.round(cy + R * Math.sin(a));
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const i = (y * W + x) * 4;
      if (isRing(rgba[i], rgba[i + 1], rgba[i + 2])) score++;
    }
    if (score > best.score) best = { score, size: s };
  }
  return best;
}

console.log("\nFull tune (center ±3%, size −1.8..+0.6):");
for (const p of points) {
  const opt = optimizeCenter(p.id, p.x, p.y, sizes[p.id]);
  const sz = optimizeSize(opt.x, opt.y, sizes[p.id]);
  console.log(
    `  ${p.id}: x=${opt.x.toFixed(1)} y=${opt.y.toFixed(1)} size=${sz.size.toFixed(1)} (score ${opt.score}/${sz.score})`
  );
}
