#!/usr/bin/env node
// Checks for the Wave J geography briefs (cm-geography, 2026-10-14). Every prediction answer and every
// number in the briefs is printed by one section here. Builders and fact-checkers re-run the section,
// they do not trust the prose.   node company/domains/briefs/checks/geography-wave-j.mjs [section]
// Sections: insol-annual, watershed, scale, ekman, june, lat49, circle, lived, coast, sunset, maup,
// choropleth, foehn, isochrone, centre.   No network. Data: world-atlas 2.0.2 (Natural Earth) in node_modules.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ROOT = new URL("../../../../", import.meta.url).pathname;
const R = 6371.0088; // km, mean sphere (EARTH_RADIUS_KM in @/kit/geo)
const S0 = 1361; // W/m2, solar constant (Kopp & Lean 2011 value; sensitivity: answers are ratios)
const EPS = 23.44; // obliquity, degrees
const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
const want = process.argv[2];
const sec = (name, fn) => { if (!want || want === name) { console.log(`\n== ${name}`); fn(); } };
function mulberry32(a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// Daily mean top-of-atmosphere insolation (W/m2), latitude phi, declination dec (degrees), distance factor (a/r)^2.
function dailyQ(phi, dec, dist2 = 1) {
  const p = rad(phi), d = rad(dec);
  let c = -Math.tan(p) * Math.tan(d);
  const h0 = c >= 1 ? 0 : c <= -1 ? Math.PI : Math.acos(c);
  return (S0 / Math.PI) * dist2 * (h0 * Math.sin(p) * Math.sin(d) + Math.cos(p) * Math.cos(d) * Math.sin(h0));
}
// Declination from true longitude of the Sun (circular orbit for annual means).
const decOf = (lam) => deg(Math.asin(Math.sin(rad(EPS)) * Math.sin(rad(lam))));

sec("insol-annual", () => {
  const annual = (phi) => { let s = 0; const n = 3600; for (let i = 0; i < n; i++) s += dailyQ(phi, decOf((360 * (i + 0.5)) / n)); return s / n; };
  for (const phi of [0, 23.44, 30, 45, 51.5, 60, 66.56, 75, 90]) console.log(`lat ${phi}: annual mean ${annual(phi).toFixed(1)} W/m2, ratio to equator ${(annual(phi) / annual(0)).toFixed(3)}`);
  const AU = 149597870.7;
  const extra = R; // the pole is at most about one Earth radius farther from the Sun than the sub-solar point
  console.log(`pole extra distance at most ${R.toFixed(0)} km = ${((100 * extra) / AU).toFixed(4)}% of 1 AU; flux change ${(100 * (1 - (AU / (AU + extra)) ** 2)).toFixed(4)}%`);
  console.log(`perihelion/aphelion flux ratio with e=0.0167: ${(((1 + 0.0167) / (1 - 0.0167)) ** 2).toFixed(3)}`);
  for (const phi of [0, 30, 51.5, 60, 90]) console.log(`beam spread at equinox noon, lat ${phi}: 1 m2 of beam covers ${(1 / Math.cos(rad(phi))).toFixed(2)} m2 of ground`);
});

sec("june", () => {
  // 21 June: declination 23.44; Earth-Sun distance about 1.0163 AU (aphelion is early July), so (a/r)^2 = 0.968.
  const d2 = 1 / 1.0163 ** 2;
  let best = [-1, 0];
  for (let phi = -90; phi <= 90; phi += 0.5) { const q = dailyQ(phi, EPS, d2); if (q > best[1]) best = [phi, q]; }
  for (const phi of [0, 23.44, 30, 45, 51.5, 60, 66.56, 75, 80, 90]) console.log(`21 Jun lat ${phi}: ${dailyQ(phi, EPS, d2).toFixed(1)} W/m2 (daily mean), day length ${(dayLen(phi, EPS)).toFixed(1)} h, noon elevation ${(90 - Math.abs(phi - EPS)).toFixed(1)} deg`);
  let mn = [0, 1e9]; for (let phi = 30; phi <= 90; phi += 0.5) { const q = dailyQ(phi, EPS, d2); if (q < mn[1]) mn = [phi, q]; }
  console.log(`max at lat ${best[0]} (${best[1].toFixed(1)}); minimum north of 30 N at lat ${mn[0]} (${mn[1].toFixed(1)})`);
  console.log(`pole/equator ratio ${(dailyQ(90, EPS, d2) / dailyQ(0, EPS, d2)).toFixed(3)}`);
});
function dayLen(phi, dec) { const c = -Math.tan(rad(phi)) * Math.tan(rad(dec)); return c >= 1 ? 0 : c <= -1 ? 24 : (24 * Math.acos(c)) / Math.PI; }

sec("watershed", () => {
  // Made-up island, 40 x 24 cells, 1 cell = 5 km. Ridge (divide) runs north-south at x = 7, near the WEST coast.
  const W = 40, H = 24, rnd = mulberry32(7);
  const noise = Array.from({ length: H }, () => Array.from({ length: W }, () => rnd()));
  const ridge = (y) => 7 + Math.round(1.5 * Math.sin(y / 3.5));
  const h = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_, x) => {
    const r = ridge(y);
    const base = x <= r ? 100 * (x + 1) / (r + 1) : 100 * (W - x) / (W - r);
    return base + 6 * noise[y][x];
  }));
  // Sea: column -1 (west) and column W (east); north/south edges are cliffs (no outflow), so every drop ends W or E.
  // D8 steepest descent with priority-flood pit filling (so every cell drains).
  const filled = h.map((r) => r.slice());
  const done = h.map((r) => r.map(() => false));
  const pq = [];
  for (let y = 0; y < H; y++) { pq.push([filled[y][0], 0, y]); pq.push([filled[y][W - 1], W - 1, y]); done[y][0] = done[y][W - 1] = true; }
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [z, x, y] = pq.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H || done[ny][nx]) continue;
      done[ny][nx] = true;
      filled[ny][nx] = Math.max(filled[ny][nx], z + 1e-3);
      pq.push([filled[ny][nx], nx, ny]);
    }
  }
  const outlet = (x0, y0) => {
    let x = x0, y = y0, steps = 0;
    for (;;) {
      if (x === 0 && filled[y][x] <= Math.min(...[[1,0],[0,1],[0,-1],[1,1],[1,-1]].map(([dx,dy])=>filled[y+dy]?.[x+dx] ?? Infinity))) return ["west", steps + 1];
      if (x === W - 1 && filled[y][x] <= Math.min(...[[-1,0],[0,1],[0,-1],[-1,1],[-1,-1]].map(([dx,dy])=>filled[y+dy]?.[x+dx] ?? Infinity))) return ["east", steps + 1];
      let best = null;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const s = (filled[y][x] - filled[ny][nx]) / Math.hypot(dx, dy);
        if (s > 0 && (!best || s > best[0])) best = [s, nx, ny];
      }
      if (!best) return [x < W / 2 ? "west" : "east", steps + 1]; // edge cell lower than all neighbours: drains to its own coast
      x = best[1]; y = best[2]; steps++;
    }
  };
  let east = 0, west = 0, nearerWestButEast = 0, cells = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const [o] = outlet(x, y); cells++;
    if (o === "east") east++; else west++;
    if (x + 1 < W - x && o === "east") nearerWestButEast++;
  }
  console.log(`divide at x = 7 +/- 1.5 (west coast at x=-1, east coast at x=${W}); cells ${cells}; drain east ${east} (${((100 * east) / cells).toFixed(1)}%), west ${west} (${((100 * west) / cells).toFixed(1)}%)`);
  console.log(`cells nearer the west coast that still drain east: ${nearerWestButEast} of ${cells}`);
  const spot = [10, 12];
  const [o, n] = outlet(...spot);
  console.log(`marked drop at x=${spot[0]}, y=${spot[1]}: ridge there at x=${ridge(12)}; ${spot[0] + 1} cells (${(spot[0] + 1) * 5} km) from the west sea, ${W - spot[0]} cells (${(W - spot[0]) * 5} km) from the east sea; ends ${o} after ${n} steps`);
  const spot2 = [5, 12];
  console.log(`drop at x=5, y=12 (west of the ridge): ends ${outlet(...spot2)[0]}`);
});

sec("scale", () => {
  const side = 40; // cm, a 40 x 40 cm printed sheet
  for (const N of [25000, 50000, 100000, 250000]) { const km = (side * N) / 100000; console.log(`1:${N}: sheet covers ${km} km x ${km} km = ${km * km} km2; 1 cm = ${N / 100000} km`); }
});

sec("ekman", () => {
  const Omega = 7.2921e-5, rho = 1025, tau = 0.1; // N/m2, a moderate steady wind stress (about 7 m/s wind; textbook order)
  for (const phi of [-30, 15, 30, 45]) {
    const f = 2 * Omega * Math.sin(rad(phi));
    // Ekman transport per metre of width: M = (tau_y/(rho f), -tau_x/(rho f)).
    for (const [name, tx, ty] of [["toward N", 0, tau], ["toward E", tau, 0], ["toward W", -tau, 0]]) {
      const Mx = ty / (rho * f), My = -tx / (rho * f);
      const dir = Math.abs(Mx) > Math.abs(My) ? (Mx > 0 ? "E" : "W") : My > 0 ? "N" : "S";
      console.log(`lat ${phi}, wind ${name}: transport ${dir}, ${Math.hypot(Mx, My).toFixed(2)} m2/s per metre`);
    }
  }
  console.log("trade winds (blowing toward W, ~15 N) -> transport N; westerlies (toward E, ~45 N) -> transport S; water converges near 30 N (subtropical gyre, clockwise in the north)");
});

sec("lat49", () => {
  const t = require("topojson-client"), d3 = require("d3-geo");
  for (const res of ["110m", "50m"]) {
    const w = require(`${ROOT}node_modules/world-atlas/countries-${res}.json`);
    const fc = t.feature(w, w.objects.countries);
    const polys = (name) => { const f = fc.features.find((f) => f.properties.name === name); const g = f.geometry; return g.type === "Polygon" ? [g.coordinates] : g.coordinates; };
    const bounds = (p) => { const b = d3.geoBounds({ type: "Polygon", coordinates: p }); return { s: b[0][1], n: b[1][1], w: b[0][0], e: b[1][0], area: d3.geoArea({ type: "Polygon", coordinates: p }) * R * R }; };
    const us = polys("United States of America").map(bounds).sort((a, b) => b.area - a.area);
    const lower48 = us[0];
    const uk = polys("United Kingdom").map(bounds);
    const usMain = polys("United States of America").sort((a, b) => d3.geoArea({ type: "Polygon", coordinates: b }) - d3.geoArea({ type: "Polygon", coordinates: a }))[0][0];
    const on49 = usMain.filter(([lo, la]) => Math.abs(la - 49) < 0.01).map(([lo]) => lo);
    console.log(`${res}: contiguous-US outline vertices at 49.00 N: ${on49.length}, from ${Math.min(...on49).toFixed(1)} to ${Math.max(...on49).toFixed(1)} E`);
    console.log(`${res}: contiguous-US polygon (largest US polygon, ${lower48.area.toFixed(0)} km2) north edge ${lower48.n.toFixed(2)} N, south edge ${lower48.s.toFixed(2)} N`);
    console.log(`${res}: UK polygons south edges: ${uk.map((b) => b.s.toFixed(2)).join(", ")} (min ${Math.min(...uk.map((b) => b.s)).toFixed(2)} N)`);
    const out = [];
    for (const f of fc.features) {
      const ps = (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates).map(bounds).sort((a, b) => b.area - a.area);
      const main = ps[0];
      if (main.w > -30 && main.e < 45 && main.s > 30) out.push(`${f.properties.name} ${main.s.toFixed(1)}`);
    }
    const fr = polys("France").map(bounds).sort((a, b) => b.area - a.area)[0];
    console.log(`${res}: mainland France ${fr.s.toFixed(2)} to ${fr.n.toFixed(2)} N`);
    if (res === "110m") console.log(`European mainland/main-island south edges (largest polygon): ${out.join("; ")}`);
  }
});

sec("circle", () => {
  for (const r of [1000, 2500, 5000, 7500, 10007.5, 15000, 20015]) {
    const onSphere = 2 * Math.PI * R * Math.sin(r / R), flat = 2 * Math.PI * r;
    console.log(`radius ${r} km along the surface: circle on Earth ${onSphere.toFixed(0)} km, flat-paper circle ${flat.toFixed(0)} km, Earth's is ${(100 * (1 - onSphere / flat)).toFixed(1)}% shorter`);
  }
});

sec("lived", () => {
  // Made-up country: 100 x 100 squares of 1 km2, 1,000,000 people.
  // Three cities: 300,000 on 30 km2, 250,000 on 25 km2, 150,000 on 15 km2 (10,000 per km2);
  // 100 towns: 200,000 on 200 km2 (1,000 per km2); countryside: 100,000 on the remaining 9,730 km2.
  const groups = [[300000, 30], [250000, 25], [150000, 15], [200000, 200]];
  const usedKm2 = groups.reduce((s, g) => s + g[1], 0);
  groups.push([100000, 10000 - usedKm2]);
  const P = groups.reduce((s, g) => s + g[0], 0), A = groups.reduce((s, g) => s + g[1], 0);
  const lived = groups.reduce((s, [p, a]) => s + p * (p / a), 0) / P;
  console.log(`people ${P}, area ${A} km2, average density ${(P / A).toFixed(1)} per km2`);
  for (const [p, a] of groups) console.log(`  ${p} people on ${a} km2: ${(p / a).toFixed(1)} per km2`);
  console.log(`population-weighted ("lived") density ${lived.toFixed(0)} per km2; ratio ${(lived / (P / A)).toFixed(1)}x`);
  console.log(`share of land holding 70% of people: ${((100 * 70) / A).toFixed(1)}%; share of people at <=20 per km2: ${((100 * 100000) / P).toFixed(0)}%`);
  // Toggle: move the countryside people into the towns (countryside empty): average unchanged, lived density rises.
});

sec("coast", () => {
  const t = require("topojson-client");
  const hav = (a, b) => { const [l1, p1] = a.map(rad), [l2, p2] = b.map(rad); const h = Math.sin((p2 - p1) / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin((l2 - l1) / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
  const rows = {};
  for (const res of ["110m", "50m", "10m"]) {
    const w = require(`${ROOT}node_modules/world-atlas/countries-${res}.json`);
    const fc = t.feature(w, w.objects.countries);
    for (const name of ["United Kingdom", "Norway", "Australia", "Chile", "Italy", "Japan", "New Zealand", "Iceland", "Philippines", "Madagascar", "Cuba", "Sri Lanka"]) {
      const f = fc.features.find((f) => f.properties.name === name);
      const ps = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
      let L = 0, verts = 0;
      for (const p of ps) for (const ring of p) { verts += ring.length; for (let i = 1; i < ring.length; i++) L += hav(ring[i - 1], ring[i]); }
      (rows[name] ??= []).push(`${res}: ${Math.round(L).toLocaleString("en")} km (${ps.length} polygons, ${verts} vertices)`);
    }
  }
  for (const [n, r] of Object.entries(rows)) console.log(`${n}: ${r.join(" | ")}`);
  console.log("note: outline length = sum of great-circle segments over every ring, land borders included (UK-Ireland, Norway-Sweden/Finland/Russia, Chile-Argentina/Peru/Bolivia, Italy-France/Switzerland/Austria/Slovenia).");
});

sec("sunset", () => {
  // NOAA solar calculator equations (Meeus-based), London 51.5074 N, 0.1278 W, clock = GMT (no DST in Dec/Jan).
  const lat = 51.5074, lon = -0.1278;
  const jd = (y, m, d) => { if (m <= 2) { y--; m += 12; } const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4); return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5; };
  function sun(JD) {
    const T = (JD - 2451545) / 36525;
    const L0 = (280.46646 + T * (36000.76983 + T * 0.0003032)) % 360;
    const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
    const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
    const C = Math.sin(rad(M)) * (1.914602 - T * (0.004817 + 0.000014 * T)) + Math.sin(rad(2 * M)) * (0.019993 - 0.000101 * T) + Math.sin(rad(3 * M)) * 0.000289;
    const lam = L0 + C - 0.00569 - 0.00478 * Math.sin(rad(125.04 - 1934.136 * T));
    const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
    const epsl = eps0 + 0.00256 * Math.cos(rad(125.04 - 1934.136 * T));
    const dec = deg(Math.asin(Math.sin(rad(epsl)) * Math.sin(rad(lam))));
    const y = Math.tan(rad(epsl / 2)) ** 2;
    const eot = 4 * deg(y * Math.sin(2 * rad(L0)) - 2 * e * Math.sin(rad(M)) + 4 * e * y * Math.sin(rad(M)) * Math.cos(2 * rad(L0)) - 0.5 * y * y * Math.sin(4 * rad(L0)) - 1.25 * e * e * Math.sin(2 * rad(M)));
    return { dec, eot };
  }
  const fmt = (min) => { const s = Math.round(min * 60); return `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
  const rows = [];
  for (let k = 0; k < 60; k++) {
    const J = jd(2026, 12, 1) + k + 0.5; // noon UT
    const { dec, eot } = sun(J);
    const ha = deg(Math.acos(Math.cos(rad(90.833)) / (Math.cos(rad(lat)) * Math.cos(rad(dec))) - Math.tan(rad(lat)) * Math.tan(rad(dec))));
    const noon = 720 - 4 * lon - eot;
    const date = new Date(Date.UTC(2026, 11, 1 + k)).toISOString().slice(0, 10);
    rows.push({ date, rise: noon - 4 * ha, set: noon + 4 * ha, noon, len: 8 * ha, eot });
  }
  const minBy = (k) => rows.reduce((a, b) => (b[k] < a[k] ? b : a));
  const maxBy = (k) => rows.reduce((a, b) => (b[k] > a[k] ? b : a));
  const es = minBy("set"), lr = maxBy("rise"), sd = minBy("len");
  console.log(`earliest sunset ${es.date} ${fmt(es.set)}; latest sunrise ${lr.date} ${fmt(lr.rise)}; shortest day ${sd.date} (${fmt(sd.len)})`);
  for (const r of rows.filter((r) => ["2026-12-01", "2026-12-12", "2026-12-13", "2026-12-21", "2026-12-31", "2027-01-01", "2027-01-15"].includes(r.date))) console.log(`  ${r.date}: rise ${fmt(r.rise)} noon ${fmt(r.noon)} set ${fmt(r.set)} length ${fmt(r.len)} eot ${r.eot.toFixed(2)} min`);
  // Same for the sunset date range within 30 s of the minimum (it is a flat minimum).
  const flat = rows.filter((r) => r.set - es.set < 0.5).map((r) => r.date);
  console.log(`sunset within 30 s of earliest: ${flat[0]} to ${flat[flat.length - 1]}`);
});

sec("maup", () => {
  // Made-up town of 8 x 8 blocks. Value per block: average walk to the nearest bus stop, in minutes.
  // Stops run along the west edge, so walks grow eastward: value = 3 + 2 x + small seeded noise (0..1), x = 0..7.
  const rnd = mulberry32(64);
  const v = Array.from({ length: 8 }, () => Array.from({ length: 8 }, (_, x) => 3 + 2 * x + Math.round(10 * rnd()) / 10));
  const zones = (key) => { const z = [0, 0, 0, 0].map(() => []); for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) z[key(x, y)].push(v[y][x]); return z.map((a) => a.reduce((s, q) => s + q, 0) / a.length); };
  const show = (name, z) => console.log(`${name}: zone averages ${z.map((q) => q.toFixed(1)).join(", ")} min; highest minus lowest ${(Math.max(...z) - Math.min(...z)).toFixed(1)} min`);
  show("4 zones as columns (2 wide)", zones((x) => Math.floor(x / 2)));
  show("4 zones as rows (2 tall)", zones((x, y) => Math.floor(y / 2)));
  show("4 zones as quadrants", zones((x, y) => 2 * Math.floor(y / 4) + Math.floor(x / 4)));
  const all = v.flat(); console.log(`all 64 blocks: mean ${(all.reduce((s, q) => s + q, 0) / 64).toFixed(2)}, min ${Math.min(...all)}, max ${Math.max(...all)}`);
});

sec("choropleth", () => {
  // Made-up country of 12 regions: [area km2, people, answer]. Big sparse regions answered Yes; small dense ones No.
  const regions = [[90000, 400000, "Yes"], [80000, 300000, "Yes"], [70000, 350000, "Yes"], [60000, 250000, "Yes"], [50000, 500000, "Yes"], [40000, 200000, "Yes"],
    [30000, 1500000, "No"], [25000, 1200000, "No"], [20000, 2000000, "No"], [15000, 900000, "No"], [12000, 1800000, "No"], [8000, 600000, "No"]];
  const A = regions.reduce((s, r) => s + r[0], 0), P = regions.reduce((s, r) => s + r[1], 0);
  const yA = regions.filter((r) => r[2] === "Yes").reduce((s, r) => s + r[0], 0), yP = regions.filter((r) => r[2] === "Yes").reduce((s, r) => s + r[1], 0);
  console.log(`area ${A} km2, people ${P}; Yes regions cover ${((100 * yA) / A).toFixed(1)}% of the land and hold ${((100 * yP) / P).toFixed(1)}% of the people`);
  console.log(`equal-population tiles of 100,000 people: Yes ${yP / 100000} tiles, No ${(P - yP) / 100000} tiles`);
});

sec("foehn", () => {
  // Parcel model: start 20.0 C, dew point 12.0 C, 1000 hPa at sea level; ridge 3,000 m; all condensed water rains out on the way up.
  const g = 9.81, cp = 1005, Rd = 287.05, Rv = 461.5, Lv = 2.501e6, eps = Rd / Rv;
  const es = (T) => 6.112 * Math.exp((17.67 * (T - 273.15)) / (T - 29.65)); // hPa, Bolton 1980
  const rs = (T, p) => (eps * es(T)) / (p - es(T));
  let T = 293.15, p = 1000, z = 0, dz = 1;
  const r0 = (eps * es(285.15)) / (1000 - es(285.15));
  let lcl = null;
  const pAt = (T, p, dz) => p * Math.exp((-g * dz) / (Rd * T));
  while (z < 3000) {
    const sat = rs(T, p) <= r0 || lcl !== null;
    if (!sat) { T -= (g / cp) * dz; }
    else {
      if (lcl === null) lcl = { z, T: T - 273.15 };
      const r = rs(T, p);
      const gm = (g * (1 + (Lv * r) / (Rd * T))) / (cp + (Lv * Lv * r * eps) / (Rd * T * T));
      T -= gm * dz;
    }
    p = pAt(T, p, dz); z += dz;
  }
  const top = T - 273.15;
  console.log(`cloud base (lifting condensation level) about ${lcl.z} m at ${lcl.T.toFixed(1)} C; ridge top 3,000 m: ${top.toFixed(1)} C; water left ${(1000 * rs(T, p)).toFixed(2)} g/kg of ${(1000 * r0).toFixed(2)}`);
  const down = top + (g / cp) * 3000;
  console.log(`descending dry 3,000 m to sea level on the lee side: ${down.toFixed(1)} C (dry rate ${((1000 * g) / cp).toFixed(2)} C/km); warming vs start ${(down - 20).toFixed(1)} C`);
  const rh = (Tc, r) => (100 * r) / rs(Tc + 273.15, 1000);
  console.log(`relative humidity at sea level: start ${rh(20, r0).toFixed(0)}%, far side ${rh(down, rs(T, p)).toFixed(0)}%`);
  console.log(`if no rain falls (cloud re-evaporates on the way down): back to 20.0 C (reversible)`);
});

sec("isochrone", () => {
  // Made-up 60 x 60 km grid, 1 km cells. Home at (30, 30). Local roads everywhere at 30 km/h (2 min per km);
  // a motorway runs east-west along y = 34 at 100 km/h with junctions every 10 km (x = 0, 10, ..., 60). Diagonal moves allowed (sqrt 2 km).
  const N = 61, home = [30, 30];
  const solve = (motorway) => {
    const t = Array.from({ length: N }, () => Array(N).fill(Infinity));
    t[home[1]][home[0]] = 0;
    const q = [[0, home[0], home[1]]];
    while (q.length) {
      q.sort((a, b) => a[0] - b[0]);
      const [d, x, y] = q.shift();
      if (d > t[y][x]) continue;
      const nb = [];
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) nb.push([x + dx, y + dy, 2 * Math.hypot(dx, dy)]);
      if (motorway && y === 34 && x % 10 === 0) for (const nx of [x - 10, x + 10]) nb.push([nx, y, 10 * 0.6]); // 10 km at 100 km/h = 6 min
      for (const [nx, ny, c] of nb) { if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue; if (d + c < t[ny][nx]) { t[ny][nx] = d + c; q.push([d + c, nx, ny]); } }
    }
    return t;
  };
  const a = solve(false), b = solve(true);
  const count = (t, m) => t.flat().filter((v) => v <= m).length;
  for (const m of [30, 45]) console.log(`within ${m} min: ${count(a, m)} km2 without motorway, ${count(b, m)} km2 with (${(count(b, m) / count(a, m)).toFixed(2)}x)`);
  const A = [30, 14], B = [60, 34]; // town A 16 km north (no motorway), town B 28 km east and 4 km south
  for (const [nm, [x, y]] of [["A", A], ["B", B]]) console.log(`town ${nm} at (${x},${y}), straight line ${Math.hypot(x - 30, y - 30).toFixed(1)} km: ${a[y][x].toFixed(1)} min without motorway, ${b[y][x].toFixed(1)} min with`);
});

sec("centre", () => {
  // Made-up coast around a bay. Coordinates in km. Two cities on opposite shores, towns elsewhere.
  const places = [["West City", 10, 50, 600000], ["East City", 90, 50, 400000], ["North Town", 50, 95, 50000], ["Hill Town", 20, 85, 30000], ["Cape Town (made-up name not used)", 0, 0, 0]].filter((p) => p[3] > 0);
  // Bay: water is the disc of radius 25 km around (50, 45).
  const P = places.reduce((s, p) => s + p[3], 0);
  const mx = places.reduce((s, p) => s + p[1] * p[3], 0) / P, my = places.reduce((s, p) => s + p[2] * p[3], 0) / P;
  const inBay = Math.hypot(mx - 50, my - 45) < 25;
  console.log(`mean centre (${mx.toFixed(1)}, ${my.toFixed(1)}) km; in the bay: ${inBay}; nearest person ${Math.min(...places.map((p) => Math.hypot(p[1] - mx, p[2] - my))).toFixed(1)} km away`);
  // Toggle: 50,000 people move into North Town from East City.
  const p2 = places.map((p) => [...p]); p2[1][3] -= 50000; p2[2][3] += 50000;
  const mx2 = p2.reduce((s, p) => s + p[1] * p[3], 0) / P, my2 = p2.reduce((s, p) => s + p[2] * p[3], 0) / P;
  console.log(`after 50,000 move East City -> North Town: centre (${mx2.toFixed(1)}, ${my2.toFixed(1)}), moved ${Math.hypot(mx2 - mx, my2 - my).toFixed(1)} km`);
  // Median centre (point minimising total distance), Weiszfeld.
  let x = mx, y = my;
  for (let i = 0; i < 500; i++) { let nx = 0, ny = 0, w = 0; for (const p of places) { const d = Math.max(1e-9, Math.hypot(p[1] - x, p[2] - y)); nx += (p[1] * p[3]) / d; ny += (p[2] * p[3]) / d; w += p[3] / d; } x = nx / w; y = ny / w; }
  console.log(`point of least total travel (geometric median): (${x.toFixed(1)}, ${y.toFixed(1)}) km`);
});
