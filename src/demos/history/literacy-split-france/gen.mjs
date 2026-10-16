// Generates departments.json for literacy-split-france (run from the repo root):
//
//   node company/domains/briefs/checks/history-data.mjs        # fetch + pin the data (once)
//   node src/demos/history/literacy-split-france/gen.mjs
//
// Inputs (both pinned by SHA-256 in company/domains/briefs/checks/history-data.mjs):
//   guerry  Guerry.csv (HistData): dept, Region, Department, Literacy for 86 departments around 1830.
//   frdep   france-departements-simplifiee.geojson (gregoiredavid/france-geojson): today's 96 departments.
// Output: departments.json = { rows, features, lines }
//   rows      Guerry's 86 rows, copied verbatim: dept, region ("" for Corse), name, lit (Literacy, %).
//   features  today's 96 outlines, coordinates simplified for a ~340 px drawing (see below), each with
//             properties { code, g }: g = the Guerry dept number the outline stands in for, or null (06, 73, 74).
//             The stand-in map is the brief's (history.md #23) and the check script's (section 23):
//             Seine (75) = 75, 92, 93, 94; Seine-et-Oise (78) = 78, 91, 95; Haut-Rhin (68) = 68, 90; Corse (200) = 2A, 2B.
//   lines     region outlines as MultiLineStrings: "ne" = the edge of Guerry's N + E departments, "swc" = the edge of
//             S + W + C (Corse has no Region in the file, so it is in neither).
// Simplification: the source already shares exact vertices between neighbours. Vertices on 3+ outlines, or where a
// shared edge meets a coast or the frontier, are kept; each chain between them is simplified once (Douglas-Peucker,
// tolerance TOL degrees) and reused by both neighbours, so no gaps open. Coordinates are rounded to 3 decimals.
// Nothing is computed from the drawing: every number on the stage comes from rows.
import fs from "node:fs";
import path from "node:path";
import { pathOf, ensure } from "../../../../company/domains/briefs/checks/history-data.mjs";

const problems = ensure({ quiet: true });
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
const here = path.dirname(new URL(import.meta.url).pathname);
const TOL = 0.025;

// ---- Guerry rows
const [head, ...lines] = fs.readFileSync(pathOf("guerry"), "utf8").trim().split(/\r?\n/);
const keys = head.split(",").map((k) => k.replace(/"/g, ""));
const rows = lines.map((l) => {
  const v = l.split(",").map((x) => x.replace(/"/g, ""));
  const o = Object.fromEntries(keys.map((k, i) => [k, v[i]]));
  return { dept: Number(o.dept), region: o.Region, name: o.Department, lit: Number(o.Literacy) };
});
if (rows.length !== 86) throw new Error(`expected 86 Guerry rows, got ${rows.length}`);

// ---- outlines
const MAP = { 75: ["75", "92", "93", "94"], 78: ["78", "91", "95"], 68: ["68", "90"], 200: ["2A", "2B"] };
const codeToG = {};
for (const r of rows) for (const c of MAP[r.dept] ?? [String(r.dept).padStart(2, "0")]) codeToG[c] = r.dept;
const F = JSON.parse(fs.readFileSync(pathOf("frdep"), "utf8")).features;
const polysOf = (f) => (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates);
const key = (p) => `${p[0]},${p[1]}`;

// vertex -> set of features using it; segment -> count
const users = new Map(), segs = new Map();
const skey = (a, b) => { const ka = key(a), kb = key(b); return ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`; };
F.forEach((f, fi) => {
  for (const poly of polysOf(f)) for (const ring of poly) {
    for (let i = 0; i < ring.length - 1; i++) {
      const k = key(ring[i]);
      if (!users.has(k)) users.set(k, new Set());
      users.get(k).add(fi);
      const s = skey(ring[i], ring[i + 1]);
      segs.set(s, (segs.get(s) ?? 0) + 1);
    }
  }
});
const fixed = (ring, i) => {
  const n = ring.length - 1, p = ring[i], prev = ring[(i - 1 + n) % n], next = ring[(i + 1) % n];
  if (users.get(key(p)).size >= 3) return true;
  return segs.get(skey(prev, p)) !== segs.get(skey(p, next));
};
const distSeg = (p, a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy;
  const t = L ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L)) : 0;
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
};
const dp = (pts) => {
  if (pts.length <= 2) return pts;
  let mi = 0, md = -1;
  for (let i = 1; i < pts.length - 1; i++) { const d = distSeg(pts[i], pts[0], pts[pts.length - 1]); if (d > md) { md = d; mi = i; } }
  if (md <= TOL) return [pts[0], pts[pts.length - 1]];
  return [...dp(pts.slice(0, mi + 1)).slice(0, -1), ...dp(pts.slice(mi))];
};
const chainCache = new Map();
const simplifyChain = (chain) => {
  const fwd = chain.map(key).join(";"), rev = [...chain].reverse().map(key).join(";");
  const canon = fwd < rev ? fwd : rev;
  if (!chainCache.has(canon)) {
    const base = fwd < rev ? chain : [...chain].reverse();
    chainCache.set(canon, dp(base));
  }
  const out = chainCache.get(canon);
  return fwd < rev ? out : [...out].reverse();
};
const round = (p) => [Number(p[0].toFixed(3)), Number(p[1].toFixed(3))];
const simplifyRing = (ring) => {
  const n = ring.length - 1;
  let idx = [];
  for (let i = 0; i < n; i++) if (fixed(ring, i)) idx.push(i);
  if (idx.length < 2) {
    // island or ring with no junctions: keep the first vertex and the one farthest from it
    let far = 0, fd = -1;
    for (let i = 0; i < n; i++) { const d = Math.hypot(ring[i][0] - ring[0][0], ring[i][1] - ring[0][1]); if (d > fd) { fd = d; far = i; } }
    idx = [...new Set([0, ...idx, far])].sort((a, b) => a - b);
  }
  const out = [];
  for (let j = 0; j < idx.length; j++) {
    const a = idx[j], b = idx[(j + 1) % idx.length];
    const chain = [];
    for (let i = a; ; i = (i + 1) % n) { chain.push(ring[i]); if (i === b && chain.length > 1) break; }
    out.push(...simplifyChain(chain).slice(0, -1));
  }
  out.push(out[0]);
  return out.map(round);
};

const features = F.map((f) => {
  const polys = polysOf(f).map((poly) => poly.map(simplifyRing).filter((r) => r.length >= 4)).filter((p) => p.length);
  return {
    type: "Feature",
    properties: { code: f.properties.code, g: codeToG[f.properties.code] ?? null },
    geometry: polys.length === 1 ? { type: "Polygon", coordinates: polys[0] } : { type: "MultiPolygon", coordinates: polys },
  };
});

// ---- region outlines: segments of a group's outlines that no other outline in the same group shares
const regionOf = Object.fromEntries(rows.map((r) => [r.dept, r.region]));
const groupLines = (inGroup) => {
  const count = new Map(), seg = new Map();
  for (const f of features) {
    const g = f.properties.g;
    if (g === null || !inGroup(regionOf[g])) continue;
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) for (const ring of poly) for (let i = 0; i < ring.length - 1; i++) {
      const k = skey(ring[i], ring[i + 1]);
      count.set(k, (count.get(k) ?? 0) + 1);
      seg.set(k, [ring[i], ring[i + 1]]);
    }
  }
  const edge = [...count].filter(([, c]) => c === 1).map(([k]) => seg.get(k));
  // chain the segments into lines
  const at = new Map();
  edge.forEach((s, i) => { for (const p of s) { const k = key(p); if (!at.has(k)) at.set(k, []); at.get(k).push(i); } });
  const used = new Set(), out = [];
  for (let i = 0; i < edge.length; i++) {
    if (used.has(i)) continue;
    used.add(i);
    const line = [...edge[i]];
    for (;;) {
      const end = key(line[line.length - 1]);
      const nxt = (at.get(end) ?? []).find((j) => !used.has(j));
      if (nxt === undefined) break;
      used.add(nxt);
      const [a, b] = edge[nxt];
      line.push(key(a) === end ? b : a);
    }
    out.push(line);
  }
  return { type: "MultiLineString", coordinates: out };
};
const linesOut = { ne: groupLines((r) => r === "N" || r === "E"), swc: groupLines((r) => r === "S" || r === "W" || r === "C") };

const before = F.reduce((s, f) => s + polysOf(f).flat().reduce((t, r) => t + r.length, 0), 0);
const after = features.reduce((s, f) => s + (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates).flat().reduce((t, r) => t + r.length, 0), 0);
fs.writeFileSync(path.join(here, "departments.json"), JSON.stringify({ rows, features, lines: linesOut }) + "\n");
console.error(`wrote departments.json: ${rows.length} rows, ${features.length} outlines, ${before} -> ${after} vertices; no value: ${features.filter((f) => f.properties.g === null).map((f) => f.properties.code).join(", ")}`);
