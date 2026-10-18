// Rasterise NYC borough boundaries to the Schelling lesson's grid mask.
// Source: NYC Department of City Planning, "Borough Boundaries" (BYTES of the BIG APPLE, release 16A, 2016),
// shapefile nybb.shp in EPSG:2263 (NY Long Island state plane, US feet), as bundled in the PyPI wheel
// geopandas-0.14.4-py3-none-any.whl at geopandas/datasets/nybb_16a.zip
// (sha256 of nybb_16a.zip: b4a98fc3b77be5af58676de9560c2782b902b83d1d8c7914dea8d0e75177e2a1).
// The NYC Open Data host was unreachable from the build container; this is the same DCP product.
// Usage: node nyc-mask-rasterise.mjs <dir with nybb.shp + nybb.dbf> [N] > mask.json
// No dependencies. Plain even-odd point-in-polygon on cell centres, all rings of a borough.
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
const N = Number(process.argv[3] || 32);
const shp = fs.readFileSync(path.join(dir, 'nybb.shp'));
const dbf = fs.readFileSync(path.join(dir, 'nybb.dbf'));

// dbf: record names (BoroName is the second field)
function dbfNames(b) {
  const nRec = b.readUInt32LE(4), hdr = b.readUInt16LE(8), recLen = b.readUInt16LE(10);
  const fields = []; let off = 32, pos = 1;
  while (b[off] !== 0x0d) { const name = b.toString('latin1', off, off + 11).replace(/\0.*$/, ''); const len = b[off + 16]; fields.push({ name, pos, len }); pos += len; off += 32; }
  const f = fields.find((x) => x.name === 'BoroName');
  const out = [];
  for (let i = 0; i < nRec; i++) { const r = hdr + i * recLen; out.push(b.toString('latin1', r + f.pos, r + f.pos + f.len).trim()); }
  return out;
}

// shp: polygon records (type 5) -> rings of [x, y]
function shpPolys(b) {
  const polys = []; let off = 100;
  while (off < b.length) {
    const len = b.readInt32BE(off + 4) * 2, rec = off + 8;
    if (b.readInt32LE(rec) !== 5) throw new Error('not a polygon shapefile');
    const nParts = b.readInt32LE(rec + 36), nPts = b.readInt32LE(rec + 40);
    const parts = []; for (let i = 0; i < nParts; i++) parts.push(b.readInt32LE(rec + 44 + 4 * i));
    const p0 = rec + 44 + 4 * nParts, rings = [];
    for (let i = 0; i < nParts; i++) {
      const a = parts[i], z = i + 1 < nParts ? parts[i + 1] : nPts, ring = [];
      for (let k = a; k < z; k++) ring.push([b.readDoubleLE(p0 + 16 * k), b.readDoubleLE(p0 + 16 * k + 8)]);
      rings.push(ring);
    }
    polys.push(rings); off = rec + len;
  }
  return polys;
}

function inside(p, rings) {
  let c = false;
  for (const poly of rings) for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const names = dbfNames(dbf), polys = shpPolys(shp);
const X0 = shp.readDoubleLE(36), Y0 = shp.readDoubleLE(44), X1 = shp.readDoubleLE(52), Y1 = shp.readDoubleLE(60);
const S = Math.max(X1 - X0, Y1 - Y0), cell = S / N; // square cells, square grid over the bounding box
const cx = (X0 + X1) / 2 - S / 2, cy = (Y0 + Y1) / 2 + S / 2;
const code = { 'Staten Island': 'SI', Brooklyn: 'BK', Queens: 'QN', Manhattan: 'MN', Bronx: 'BX' };
const lab = new Array(N * N).fill(null);
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  const p = [cx + (x + 0.5) * cell, cy - (y + 0.5) * cell];
  polys.forEach((rings, i) => { if (inside(p, rings)) lab[y * N + x] = code[names[i]]; });
}
const bits = lab.map((l) => (l ? 1 : 0));
const counts = {}; lab.forEach((l) => { if (l) counts[l] = (counts[l] || 0) + 1; });
// minimum width per region in cells: shortest horizontal run, for the R2 "no one-cell strip" rule
const minRun = {};
for (let y = 0; y < N; y++) { let x = 0; while (x < N) { const l = lab[y * N + x]; if (!l) { x++; continue; } let e = x; while (e < N && lab[y * N + e] === l) e++; minRun[l] = Math.min(minRun[l] ?? 99, e - x); x = e; } }
// pack mask as hex, 1 bit per cell, row-major
let hex = ''; for (let i = 0; i < bits.length; i += 4) hex += ((bits[i] << 3) | (bits[i + 1] << 2) | (bits[i + 2] << 1) | (bits[i + 3] | 0)).toString(16);
const out = { source: 'NYC DCP Borough Boundaries 16A (nybb), EPSG:2263, via geopandas-0.14.4 wheel datasets/nybb_16a.zip sha256 b4a98fc3...e2a1', N, cellFeet: Math.round(cell), land: bits.reduce((a, b) => a + b, 0), counts, minHorizontalRun: minRun, hex, labels: lab };
process.stdout.write(JSON.stringify(out) + '\n');
