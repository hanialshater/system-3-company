// Generates placements.json for three-giants-in-africa (run from the repo root):
//   node src/demos/geography/three-giants-in-africa/gen.mjs
//
// Finds a rigid move on the sphere (centroid to a target point, then a spin about it) for each
// piece (US lower 48, Alaska, China, India) so that the pieces sit inside Africa and overlap as
// little as possible. Africa and the pieces are the kit's own Natural Earth 1:110m shapes.
// Method: a 0.5° raster of Africa; each piece is sampled on a 0.5° grid; a greedy search
// (1° targets, 15° spins) in a fixed order, then three rounds of local refinement per piece.
// Deterministic: no randomness. Takes a few minutes. The result is an illustration of the
// area comparison, not an exact tiling: the script prints the share of samples that fall
// outside Africa or on another piece (2.6% when written, 2026-10-13).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { geoArea, geoBounds, geoCentroid, geoContains, geoRotation } from "d3-geo";
import { feature } from "topojson-client";

const here = path.dirname(fileURLToPath(import.meta.url));
const kit = path.join(here, "../../../kit/geo");
const topo = JSON.parse(fs.readFileSync(path.join(kit, "countries-110m.json"), "utf8"));
const countries = feature(topo, topo.objects.countries).features;
const country = (n) => countries.find((c) => c.properties.name === n);
const { AFRICA } = JSON.parse(fs.readFileSync(path.join(here, "africa.json"), "utf8"));

const africa = AFRICA.map(country);
const bounds = africa.map((c) => geoBounds(c));
const STEP = 0.5;
const key = (lo, la) => `${Math.round(lo / STEP)},${Math.round(la / STEP)}`;
const inAfrica = new Set();
for (let la = -36; la <= 38; la += STEP)
  for (let lo = -18; lo <= 52; lo += STEP)
    for (let i = 0; i < africa.length; i++) {
      const [[x0, y0], [x1, y1]] = bounds[i];
      if (lo < x0 || lo > x1 || la < y0 || la > y1) continue;
      if (geoContains(africa[i], [lo, la])) {
        inAfrica.add(key(lo, la));
        break;
      }
    }

// US pieces: its two largest polygons (lower 48, Alaska). Same rule as Demo.tsx.
const us = country("United States of America");
const usPolys = us.geometry.coordinates
  .map((c) => ({ c, a: geoArea({ type: "Polygon", coordinates: c }) }))
  .sort((p, q) => q.a - p.a);
const pieces = {
  lower48: { type: "Feature", geometry: { type: "Polygon", coordinates: usPolys[0].c } },
  china: country("China"),
  india: country("India"),
  alaska: { type: "Feature", geometry: { type: "Polygon", coordinates: usPolys[1].c } },
};

function samples(f) {
  const [[x0, y0], [x1, y1]] = geoBounds(f);
  const out = [];
  for (let la = Math.floor(y0); la <= y1; la += 0.5)
    for (let lo = Math.floor(x0); lo <= x1; lo += 0.5) if (geoContains(f, [lo, la])) out.push([lo, la]);
  return out;
}
// Same composition as Demo.tsx place().
function transform(c, target, spin) {
  const a = geoRotation([-c[0], 0]);
  const b = geoRotation([0, -c[1]]);
  const s = geoRotation([0, 0, spin]);
  const e = geoRotation([0, target[1]]);
  const g = geoRotation([target[0], 0]);
  return (p) => g(e(s(b(a(p)))));
}
const S = {};
const C = {};
for (const [n, f] of Object.entries(pieces)) {
  S[n] = samples(f);
  C[n] = geoCentroid(f);
}
const cellsOf = (n, st) => {
  const T = transform(C[n], st.target, st.spin);
  return S[n].map((p) => {
    const q = T(p);
    return key(q[0], q[1]);
  });
};
function badCount(n, cand, occ, limit) {
  const T = transform(C[n], cand.target, cand.spin);
  let bad = 0;
  for (const p of S[n]) {
    const q = T(p);
    const k = key(q[0], q[1]);
    if (!inAfrica.has(k) || occ.has(k)) {
      bad++;
      if (bad >= limit) break;
    }
  }
  return bad;
}

// 1. Greedy placement in a fixed order.
const state = {};
const occupied = new Set();
for (const n of Object.keys(pieces)) {
  let best = null;
  for (let tla = -32; tla <= 34; tla += 1)
    for (let tlo = -14; tlo <= 50; tlo += 1) {
      if (!inAfrica.has(key(tlo, tla))) continue;
      for (let spin = 0; spin < 360; spin += 15) {
        const cand = { target: [tlo, tla], spin };
        const bad = badCount(n, cand, occupied, best ? best.bad + 1 : Infinity);
        if (!best || bad < best.bad) best = { ...cand, bad };
      }
    }
  state[n] = { target: best.target, spin: best.spin };
  cellsOf(n, state[n]).forEach((k) => occupied.add(k));
  console.error("greedy", n, best);
}

// 2. Local refinement, each piece against the others.
for (let round = 0; round < 3; round++) {
  for (const n of Object.keys(pieces)) {
    const occ = new Set();
    for (const m of Object.keys(pieces)) if (m !== n) cellsOf(m, state[m]).forEach((k) => occ.add(k));
    let best = { ...state[n], bad: badCount(n, state[n], occ, Infinity) };
    const span = round === 0 ? 8 : 3;
    const st = round === 0 ? 1 : 0.5;
    const sp = round === 0 ? 40 : 15;
    const [t0, t1] = state[n].target;
    const s0 = state[n].spin;
    for (let dl = -span; dl <= span; dl += st)
      for (let dp = -span; dp <= span; dp += st)
        for (let ds = -sp; ds <= sp; ds += 5) {
          const cand = { target: [t0 + dl, t1 + dp], spin: s0 + ds };
          const bad = badCount(n, cand, occ, best.bad);
          if (bad < best.bad) best = { ...cand, bad };
        }
    state[n] = { target: best.target, spin: ((best.spin % 360) + 360) % 360 };
    console.error("refine", round, n, best);
  }
}

const all = new Set();
let total = 0;
let bad = 0;
for (const n of Object.keys(pieces)) {
  const cs = cellsOf(n, state[n]);
  total += cs.length;
  bad += cs.filter((k) => !inAfrica.has(k) || all.has(k)).length;
  cs.forEach((k) => all.add(k));
}
const outsidePct = Number(((100 * bad) / total).toFixed(2));
console.error(`samples ${total}, outside Africa or overlapping ${bad} (${outsidePct}%)`);
fs.writeFileSync(path.join(here, "placements.json"), JSON.stringify({ outsidePct, pieces: state }, null, 2) + "\n");
console.error("wrote placements.json");
