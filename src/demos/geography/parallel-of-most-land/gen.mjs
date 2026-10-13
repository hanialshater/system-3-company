// Generates parallels.json for parallel-of-most-land (run from the repo root):
//   node src/demos/geography/parallel-of-most-land/gen.mjs
//
// For every whole-degree parallel from 80°S to 80°N, samples the kit's Natural Earth 1:110m land
// polygon (src/kit/geo/land-110m.json) every 0.1° of longitude (3,600 points, at the centre of each
// 0.1° cell) with d3 geoContains, and writes the share of samples on land and the land runs as
// [startLon, endLon] intervals. Deterministic; takes under a minute. geoContains on the full land
// polygon is slow in the page, which is why this is precomputed.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { geoBounds, geoContains } from "d3-geo";
import { feature } from "topojson-client";

const here = path.dirname(fileURLToPath(import.meta.url));
const topo = JSON.parse(fs.readFileSync(path.join(here, "../../../kit/geo/land-110m.json"), "utf8"));
const land = feature(topo, topo.objects.land).features[0];
const polys = land.geometry.coordinates.map((c) => {
  const f = { type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: c } };
  return { f, b: geoBounds(f) };
});

const STEP = 0.1;
const N = Math.round(360 / STEP);
const rows = [];
for (let lat = -80; lat <= 80; lat++) {
  // Polygons whose latitude range covers this parallel (Antarctica's bounds reach the pole).
  const cand = polys.filter(({ b }) => b[0][1] <= lat && b[1][1] >= lat);
  const on = [];
  for (let i = 0; i < N; i++) {
    const lon = -180 + (i + 0.5) * STEP;
    on.push(cand.some(({ f }) => geoContains(f, [lon, lat])));
  }
  const runs = [];
  let start = null;
  for (let i = 0; i <= N; i++) {
    if (i < N && on[i] && start === null) start = i;
    if ((i === N || !on[i]) && start !== null) {
      runs.push([+(-180 + start * STEP).toFixed(1), +(-180 + i * STEP).toFixed(1)]);
      start = null;
    }
  }
  const share = on.filter(Boolean).length / N;
  rows.push({ lat, share: +share.toFixed(4), runs });
}

fs.writeFileSync(path.join(here, "parallels.json"), JSON.stringify({ step: STEP, source: "Natural Earth 1:110m land, kit data", rows }) + "\n");
const at = (l) => rows.find((r) => r.lat === l).share;
console.log("equator", at(0), "40N", at(40), "65N", at(65), "60S", at(-60), "40S", at(-40));
const best = rows.reduce((a, r) => (r.share > a.share ? r : a));
console.log("max", best.lat, best.share);
