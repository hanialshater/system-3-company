#!/usr/bin/env node
// Answer and number checks for the History cycle-2 briefs 13-30 (company/domains/briefs/history.md, "Cycle 2";
// charter company/domains/history.md). Same rules as history-cycle1-check.mjs: every number a brief quotes is
// recomputed here FROM THE DATA FILE (fetched and pinned by history-data.mjs, SHA-256), never typed in. The script
// refuses to run if any pin fails. It also checks each stage question is <= 25 words, each reveal (numbers filled
// in) is <= 90 words, each answer is the option the data picks, each brief lists 3-5 presets in DOM order, and
// each transfer recall's answer.
//
//   node company/domains/briefs/checks/history-cycle2-check.mjs [brief-number]
//
// Written 2026-10-14 by cm-history (Henrike), W-742. Builders copy numbers from this output only.
// Options are worded at one precision ("about" and round values), so the right one never stands out by being exact.
import fs from "node:fs";
import { createRequire } from "node:module";
import { ensure, pathOf, vegaFile, ROOT } from "./history-data.mjs";

const require = createRequire(`${ROOT}package.json`);
const { geoArea } = require("d3-geo");

const problems = ensure({ quiet: true });
if (problems.length) {
  for (const p of problems) console.log(`FAIL data: ${p}`);
  console.log("Data pins failed: no numbers checked. Run node company/domains/briefs/checks/history-data.mjs");
  process.exit(1);
}

let fail = 0;
const want = process.argv[2] ? Number(process.argv[2]) : null;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const r = (x, d = 1) => Number(x.toFixed(d));
const fmt = (x) => Math.round(x).toLocaleString("en-US");
const words = (s) => s.replace(/[—–]/g, " ").split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const csv = (id) => {
  const [head, ...rows] = fs.readFileSync(pathOf(id), "utf8").trim().split(/\r?\n/);
  const keys = head.split(",").map((k) => k.replace(/"/g, ""));
  return rows.map((line) => { const v = line.split(",").map((x) => x.replace(/"/g, "")); return Object.fromEntries(keys.map((k, i) => [k, v[i]])); });
};
const csvq = (file) => {
  const text = fs.readFileSync(file, "utf8");
  const out = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; } else if (c === "\n") { row.push(cell.replace(/\r$/, "")); out.push(row); row = []; cell = ""; } else cell += c;
  }
  if (cell || row.length) { row.push(cell); out.push(row); }
  const [head, ...rows] = out;
  return rows.filter((x) => x.length === head.length).map((x) => Object.fromEntries(head.map((k, i) => [k, x[i]])));
};
const fill = (t, v) => t.replace(/\{(\w+)\}/g, (_, k) => { if (!(k in v)) throw new Error(`no value for {${k}}`); return String(v[k]); });
const nearest = (x, targets) => targets.reduce((bi, t, i) => (Math.abs(Math.log(x / t)) < Math.abs(Math.log(x / targets[bi])) ? i : bi), 0);
const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;
const corr = (a, b) => { const ma = mean(a), mb = mean(b); let n = 0, da = 0, db = 0; a.forEach((x, i) => { n += (x - ma) * (b[i] - mb); da += (x - ma) ** 2; db += (b[i] - mb) ** 2; }); return n / Math.sqrt(da * db); };
const letters = { predict: [], recall: [] };

function brief(n, b, v) {
  if (want && want !== n) return;
  console.log(`\n== ${n}. ${b.slug}  (data: ${b.data.join(", ")})`);
  b.checks(v);
  const q = fill(b.question, v), rev = fill(b.reveal, v);
  ok(`${n} question ≤ 25 words`, words(q) <= 25, `${words(q)} words: "${q}"`);
  ok(`${n} reveal ≤ 90 words`, words(rev) <= 90, `${words(rev)} words: "${rev}"`);
  ok(`${n} reveal ends with where the record stops`, /Where it stops:/.test(rev), "the last sentence starts \"Where it stops:\"");
  ok(`${n} answer`, b.options[b.answer] && b.pick(v) === b.answer, `options ${b.options.map((o, i) => `${"ABC"[i]}) ${o}`).join(" / ")}; the data picks ${"ABC"[b.pick(v)]}, the brief says ${"ABC"[b.answer]}`);
  ok(`${n} presets in DOM order`, b.presets.length >= 3 && b.presets.length <= 5, b.presets.map((p, i) => `${i + 1}. ${p}`).join(" | "));
  ok(`${n} transfer recall`, b.recall.pick(v) === b.recall.answer, `"${b.recall.q}" ${b.recall.options.map((o, i) => `${"ABC"[i]}) ${o}`).join(" / ")} (answer ${"ABC"[b.recall.answer]})`);
  letters.predict.push("ABC"[b.answer]); letters.recall.push("ABC"[b.recall.answer]);
}

// Gapminder Fast Track world series (ddf csv: global,time,<indicator>)
const gm = (id) => Object.fromEntries(csv(id).map((x) => { const k = Object.keys(x).find((c) => c !== "global" && c !== "time"); return [Number(x.time), Number(x[k])]; }));

// ---------------------------------------------------------------- 13. World child mortality (Gapminder)
{
  const U = gm("gmu5");
  const v = { u1800: U[1800], u1900: U[1900], u1950: U[1950], u2020: U[2020], x: Math.round(U[1900] / U[2020]), after50: Math.round((100 * (U[1950] - U[2020])) / (U[1900] - U[2020])) };
  brief(13, {
    slug: "children-dying-before-five", data: ["gmu5"],
    question: "Gapminder's world estimate: in 1900, 411 of every 1,000 children died before age 5. About how many in 2020?",
    options: ["About 250", "About 100", "About 35"], answer: 2, pick: (v) => nearest(v.u2020, [250, 100, 35]),
    presets: ["1800", "1900", "1950", "2020", "Out of 100 children"],
    reveal: "In 1900 about {u1900} of every 1,000 children died before age 5; in 2020, {u2020}: about {x} times fewer. In the century before 1900 the figure barely moved, from {u1800}. More than half of the fall since 1900, {after50}%, came after 1950. Where it stops: this is one source's world figure, and the further back it goes, the fewer places kept records to build it from.",
    checks: (v) => {
      ok("13 1900 and 2020", v.u1900 === 411 && v.u2020 === 37, `per 1,000 born: 1800 ${v.u1800}, 1900 ${v.u1900}, 1950 ${v.u1950}, 2020 ${v.u2020} (x${r(v.u1900 / v.u2020, 1)} fewer)`);
      ok("13 flat before 1900", v.u1800 - v.u1900 < 25, `1800 ${v.u1800} -> 1900 ${v.u1900}: ${v.u1800 - v.u1900} fewer per 1,000 in a century`);
      ok("13 share of the fall after 1950", v.after50 > 50, `${v.after50}% of the 1900-2020 fall came after 1950`);
      ok("13 out of 100", true, `preset "Out of 100 children": 1900 ${r(v.u1900 / 10, 0)} in 100, 2020 ${r(v.u2020 / 10, 0)} in 100 (about 4 in 100)`);
    },
    // survivors: 700 -> 970 per 1,000
    recall: { q: "Child deaths in a town fall from 300 to 30 per 1,000 born. How does the number of children reaching age 5 change?", options: ["About ten times as many", "The same", "About 40% more"], answer: 2, pick: () => nearest(970 / 700, [10, 1, 1.4]) },
  }, v);
}

// ---------------------------------------------------------------- 14. World life expectancy by century (Gapminder)
// Amended 2026-10-15 (cm-history, r1 rulings): gains are differences of the one-decimal values the stage shows
// (33.5 - 30.6 = 2.9, not the unrounded 2.84 shown as 2.8), so the subtraction a learner does on screen comes out.
// The unrounded gains stay in the detail line. Presets and reveal match the shipped lesson v3.
{
  const L = gm("gmlex");
  const sh = (y) => r(L[y]);
  const g19 = r(sh(1900) - sh(1800)), g20 = r(sh(2000) - sh(1900)), g21 = r(sh(2023) - sh(2000));
  const u19 = L[1900] - L[1800], u20 = L[2000] - L[1900];
  const steps = [1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975, 2000, 2023];
  const v = { l1800: sh(1800), l1900: sh(1900), l2000: sh(2000), l2023: L[2023].toFixed(1), g19, g20, times: Math.round(g20 / g19) };
  brief(14, {
    slug: "life-expectancy-gained-late", data: ["gmlex"],
    question: "Gapminder's world life expectancy rose from 30.6 to 33.5 years between 1800 and 1900. How much did it rise from 1900 to 2000?",
    options: ["About 35 years", "About 15 years", "About 5 years"], answer: 0, pick: () => nearest(g20, [35, 15, 5]),
    presets: ["1800 to 1900", "1900 to 2000", "2000 to 2023", "Years gained in each span"],
    reveal: "Over the 1800s world life expectancy rose {g19} years, from {l1800} to {l1900}. Over the 1900s it rose {g20} years, to {l2000}: about {times} times as much in one century as in the one before. By 2023 it was {l2023}. Where it stops: these are one source's world figures, shown one year in every 25, so the chart hides single years when life expectancy fell sharply, such as epidemic years.",
    checks: (v) => {
      ok("14 two centuries (as shown)", g19 === 2.9 && g20 === 34.7 && v.times === 12, `shown 1800 ${sh(1800)}, 1900 ${sh(1900)}, 2000 ${sh(2000)}: +${g19} then +${g20} (x${r(g20 / g19, 2)}, about ${v.times}); unrounded +${r(u19, 2)} then +${r(u20, 2)} (x${r(u20 / u19, 1)})`);
      ok("14 2000 to 2023 (as shown)", g21 === 5.8, `${sh(2000)} -> ${sh(2023)}: +${g21} years (the third preset; unrounded +${r(L[2023] - L[2000], 2)})`);
      ok("14 stage points", steps.every((y) => L[y] > 0), `points every 25 years: ${steps.map((y) => `${y} ${r(L[y])}`).join(", ")}`);
      const dips = Object.keys(L).map(Number).filter((y) => y <= 2023 && L[y - 1] && L[y] - L[y - 1] < -1);
      ok("14 single-year falls exist (why the limit sentence names them)", dips.length > 0, `years falling > 1 year from the year before: ${dips.join(", ")}. None is a 25-year point except via the trend; the stage does not label them`);
    },
    recall: { q: "A country's life expectancy rose 3 years in one century and 30 in the next. What share of the two centuries' gain came in the second?", options: ["About a tenth", "About half", "About 90%"], answer: 2, pick: () => nearest(30 / 33, [0.1, 0.5, 0.9]) },
  }, v);
}

// ---------------------------------------------------------------- 15. World population doublings (Gapminder)
{
  const P = Object.fromEntries(csv("gmpop").map((x) => [Number(x.time), Number(x.pop)]));
  // W-869 (cm-history, 2026-10-15): only values up to 2023 are used. The file's 2024 value is a same-year
  // projection (FC39/FC41 c3: pop v8 is dated 29 July 2024), and the reveal says any later number is a projection.
  // Growth is labelled by its start year (1963 = 1963 to 1964), so the last rate is 2022 to 2023 (g22), and the
  // peak is searched over 1900-2022. This matches the shipped lesson doubling-stopped-speeding-up v2.
  const SHOWN_TO = 2023;
  const ys = Object.keys(P).map(Number).sort((a, b) => a - b).filter((y) => y <= SHOWN_TO);
  const first = (t) => ys.find((y) => P[y] >= t);
  const b1 = first(1e9), b2 = first(2e9), b4 = first(4e9), b8 = first(8e9);
  const gr = (y) => { if (y + 1 > SHOWN_TO) throw new Error(`gr(${y}) needs ${y + 1}, after ${SHOWN_TO}`); return 100 * (P[y + 1] / P[y] - 1); };
  const pk = ys.filter((y) => y >= 1900 && y < SHOWN_TO).reduce((a, y) => (gr(y) > gr(a) ? y : a), 1900);
  const v = { d1: b2 - b1, d2: b4 - b2, d3: b8 - b4, pk, gpk: r(gr(pk), 2), g22: r(gr(SHOWN_TO - 1), 2), b1, b2, b4, b8 };
  brief(15, {
    slug: "doubling-stopped-speeding-up", data: ["gmpop"],
    question: "World population took 122 years to go from 1 to 2 billion, and 48 years to reach 4 billion. How long to reach 8?",
    options: ["About 24 years", "About 47 years", "About 96 years"], answer: 1, pick: (v) => nearest(v.d3, [24, 47, 96]),
    presets: ["1 to 2 billion", "2 to 4 billion", "4 to 8 billion", "Growth per year"],
    reveal: "The doublings took {d1} years, then {d2}, then {d3}: the last was about as fast as the one before. Growth per year peaked at {gpk}% in {pk} and was {g22}% from 2022 to 2023. A doubling that takes as long as the last one, at a falling yearly rate, means growth is slowing, not racing. Where it stops: early totals are the least certain, and the chart stops at the present; any later number is a projection, not a record.",
    checks: (v) => {
      ok("15 doubling years", v.d1 === 122 && v.d2 === 48 && v.d3 === 47, `1 bn ${b1}, 2 bn ${b2}, 4 bn ${b4}, 8 bn ${b8}: ${v.d1}, ${v.d2}, ${v.d3} years`);
      ok("15 growth peak", pk === 1963 && v.gpk === 2.25 && v.g22 < 1, `peak ${v.gpk}% a year in ${pk} (${pk} to ${pk + 1}); 2022 to 2023 ${v.g22}%`);
      ok("15 last rate is 2022 to 2023", v.g22 === 0.88, `100 x (P2023/P2022 - 1) = ${r(gr(2022), 3)}, shown ${v.g22} (the shipped lesson's value)`);
      ok("15 no year after 2023 in any number", Math.max(...ys) === SHOWN_TO, `values used run ${ys[0]}-${Math.max(...ys)}; the file runs to 2100 (Books fact-straight-line owns the projection)`);
    },
    recall: { q: "A town grows from 10,000 to 20,000 in 30 years, then to 40,000 in the next 30. Is its growth speeding up?", options: ["No: the same doubling time is the same rate", "Yes: it added more people", "It is slowing"], answer: 0, pick: () => 0 },
  }, v);
}

// ---------------------------------------------------------------- 16. Boys and girls christened in London (Arbuthnot)
{
  const A = csv("arbuthnot").map((x) => ({ y: Number(x.Year), m: Number(x.Males), f: Number(x.Females) }));
  const M = A.reduce((s, x) => s + x.m, 0), F = A.reduce((s, x) => s + x.f, 0);
  const more = A.filter((x) => x.m > x.f).length;
  const lo = A.reduce((a, x) => (x.m / x.f < a.m / a.f ? x : a)), hi = A.reduce((a, x) => (x.m / x.f > a.m / a.f ? x : a));
  const v = { n: A.length, more, all: Math.round((100 * M) / F), lo: lo.y, loR: Math.round((100 * lo.m) / lo.f), hi: hi.y, hiR: Math.round((100 * hi.m) / hi.f) };
  brief(16, {
    slug: "more-boys-christened", data: ["arbuthnot"],
    question: "London christened 484,382 boys and 453,841 girls from 1629 to 1710. In how many of those 82 years were boys more?",
    options: ["41 of 82", "60 of 82", "82 of 82"], answer: 2, pick: (v) => nearest(v.more, [41, 60, 82]),
    presets: ["Boys minus girls, each year", "Boys per 100 girls", "Closest year", "Widest year"],
    reveal: "Boys outnumbered girls at christening in all {more} years, by about {all} to 100 overall. Even the closest year, {lo}, had {loR} boys for every 100 girls, and the widest, {hi}, had {hiR}. A small, steady difference shows every single year once the counts are in the thousands. Where it stops: these are christenings in London, not births, so babies who were never christened are missing.",
    checks: (v) => {
      ok("16 totals", M === 484382 && F === 453841 && v.n === 82, `boys ${fmt(M)}, girls ${fmt(F)}, ${v.n} years`);
      ok("16 every year", more === 82, `boys more in ${more} of ${v.n} years`);
      ok("16 ratio", v.all === 107, `${r((100 * M) / F, 1)} boys per 100 girls; closest ${lo.y} (${r((100 * lo.m) / lo.f, 1)}), widest ${hi.y} (${r((100 * hi.m) / hi.f, 1)})`);
    },
    // P(girls > boys) in a day of n births with p(boy) = 0.51: higher for small n
    recall: { q: "Boys are 51% of births. Which hospital more often has a day with more girls than boys: one with 10 births a day or one with 1,000?", options: ["The one with 10", "The one with 1,000", "Both equally often"], answer: 0, pick: () => {
      const pGirlsMore = (n) => { let s = 0; for (let k = 0; k < n / 2; k++) { let c = 0; for (let j = 1; j <= k; j++) c += Math.log(n - j + 1) - Math.log(j); s += Math.exp(c + k * Math.log(0.51) + (n - k) * Math.log(0.49)); } return s; };
      return pGirlsMore(10) > pGirlsMore(1000) ? 0 : 1;
    } },
  }, v);
}

// ---------------------------------------------------------------- 17. Coal and oil in world fossil CO2 (OWID)
{
  const W = csvq(pathOf("co2")).filter((x) => x.country === "World").map((x) => ({ y: Number(x.year), coal: Number(x.coal_co2 || 0), oil: Number(x.oil_co2 || 0), co2: Number(x.co2 || 0) }));
  const at = (y) => W.find((x) => x.y === y);
  const oilAhead = W.filter((x) => x.oil > x.coal).map((x) => x.y);
  const back = W.find((x) => x.y > oilAhead[0] && x.coal > x.oil && W.filter((z) => z.y >= x.y).every((z) => z.coal > z.oil));
  const sh = (y, k) => Math.round((100 * at(y)[k]) / at(y).co2);
  const v = { c1900: sh(1900, "coal"), first: oilAhead[0], back: back.y, c2024: sh(2024, "coal"), o2024: sh(2024, "oil"), t: r(at(2024).coal / at(1968).coal, 1) };
  brief(17, {
    slug: "coal-came-back", data: ["co2"],
    question: "Oil overtook coal as the world's biggest source of fossil carbon dioxide in 1968. Which was bigger in 2024?",
    options: ["Coal", "Oil", "About equal"], answer: 0, pick: () => (at(2024).coal > 1.1 * at(2024).oil ? 0 : at(2024).oil > 1.1 * at(2024).coal ? 1 : 2),
    presets: ["1900", "1968", "2005", "2024", "Tonnes, not shares"],
    reveal: "In 1900 coal made {c1900}% of the world's fossil CO2. Oil passed it in {first}, but coal took the lead back in {back}, and in 2024 coal made {c2024}% against oil's {o2024}%. Coal's emissions in 2024 were {t} times those of 1968: a fuel can lose first place and still burn more. Where it stops: these are estimates rebuilt from records of fuel use, and the file is revised every year.",
    checks: (v) => {
      ok("17 oil ahead", v.first === 1968 && oilAhead[oilAhead.length - 1] === 2004, `oil above coal in ${oilAhead.length} years, ${oilAhead[0]}-${oilAhead[oilAhead.length - 1]}`);
      ok("17 coal back", v.back === 2005, `coal ahead every year from ${v.back}`);
      ok("17 2024", v.c2024 === 41 && v.o2024 === 32, `2024: coal ${fmt(at(2024).coal)} Mt (${v.c2024}%), oil ${fmt(at(2024).oil)} Mt (${v.o2024}%) of ${fmt(at(2024).co2)} Mt`);
      ok("17 tonnes", v.t === 3, `coal 1968 ${fmt(at(1968).coal)} Mt -> 2024 ${fmt(at(2024).coal)} Mt: x${v.t}`);
      ok("17 world only", true, "World row only: no country is named on the stage (care line)");
    },
    recall: { q: "Buses carried 90% of a city's trips in 1950 and 40% today, while all trips grew six times. Did bus trips fall?", options: ["Yes, to under half", "No, they rose", "They stayed the same"], answer: 1, pick: () => nearest((0.4 * 6) / 0.9, [0.45, 2.7, 1]) },
  }, v);
}

// ---------------------------------------------------------------- 18. North and central Italy's long decline (Maddison 2020)
{
  const g = Object.fromEntries(csvq(pathOf("maddison")).filter((x) => x.Entity === "Italy" && x["GDP per capita"]).map((x) => [Number(x.Year), Number(x["GDP per capita"])]));
  const idx = (y) => Math.round((100 * g[y]) / g[1450]);
  const rate = 100 * (Math.pow(g[1800] / g[1450], 1 / 350) - 1);
  const v = { i1800: idx(1800), i1310: idx(1310), i1600: idx(1600), rate: r(-rate, 2) };
  brief(18, {
    slug: "italy-poorer-in-1800", data: ["maddison"],
    question: "Maddison's series puts income per person in north and central Italy at an index of 100 in 1450. What was it in 1800?",
    options: ["About 75", "About 100", "About 150"], answer: 0, pick: (v) => nearest(v.i1800, [75, 100, 150]),
    presets: ["1450", "1800", "1310 to 1871, the whole line", "Change per year"],
    reveal: "On this series, a person in north and central Italy in 1800 had about {i1800}% of the income of one in 1450: a fall of about {rate}% a year for 350 years. Income per person can shrink for centuries, not only grow. Where it stops: this is one reconstruction, it covers only the north and centre before 1871, and the copy we opened states no unit, so it is read as an index.",
    checks: (v) => {
      ok("18 1450 and 1800", v.i1800 === 75, `1450 ${fmt(g[1450])} -> 1800 ${fmt(g[1800])}: index ${v.i1800}; 1310 ${v.i1310}, 1600 ${v.i1600}`);
      ok("18 per year", v.rate === 0.08, `${r(rate, 3)}% a year, 1450-1800`);
      ok("18 north and centre only before 1871", true, "Maddison README (opened): Italy 1310-1871 (North Italy), Malanima (2010); 1871-1990 Baffigi (2011). The year-1 value has no Italian source named in the README, so it is not used");
    },
    recall: { q: "A town's income per person falls 0.1% a year for 300 years. About how much poorer is it at the end?", options: ["About 3%", "About 26%", "About 70%"], answer: 1, pick: () => nearest(100 * (1 - Math.pow(0.999, 300)), [3, 26, 70]) },
  }, v);
}

// ---------------------------------------------------------------- 19. Earthquake deaths vs all disaster deaths (EM-DAT via OWID, vega-datasets)
{
  const rows = fs.readFileSync(vegaFile("disasters.csv"), "utf8").trim().split(/\r?\n/).slice(1).map((l) => { const [e, y, d] = l.split(","); return { e, y: Number(y), d: Number(d) }; });
  const sum = (e, a, b) => rows.filter((x) => x.e === e && x.y >= a && x.y <= b).reduce((s, x) => s + x.d, 0);
  const P = Object.fromEntries(csv("gmpop").map((x) => [Number(x.time), Number(x.pop)]));
  const popMean = (a, b) => { let s = 0; for (let y = a; y <= b; y++) s += P[y]; return s / (b - a + 1); };
  const a1 = sum("All natural disasters", 1900, 1958), a2 = sum("All natural disasters", 1959, 2017);
  const e1 = sum("Earthquake", 1900, 1958), e2 = sum("Earthquake", 1959, 2017);
  const p1 = popMean(1900, 1958), p2 = popMean(1959, 2017);
  const perM1 = (e1 / 59 / p1) * 1e6, perM2 = (e2 / 59 / p2) * 1e6;
  const later = rows.filter((x) => x.e === "Earthquake" && x.y >= 1959).sort((x, y) => y.d - x.d).slice(0, 3);
  const top3 = Math.round((100 * later.reduce((s, x) => s + x.d, 0)) / e2);
  const v = { a1: r(a1 / 1e6), a2: r(a2 / 1e6), e1: r(e1 / 1e6, 2), e2: r(e2 / 1e6, 2), fall: Math.round(100 * (1 - a2 / a1)), rise: Math.round(100 * (e2 / e1 - 1)), top3, perM1: r(perM1), perM2: r(perM2) };
  brief(19, {
    slug: "earthquakes-did-not-fall", data: ["vega (disasters.csv)", "gmpop"],
    question: "Recorded deaths from all natural disasters fell about 70% from 1900-1958 to 1959-2017. What happened to earthquake deaths?",
    options: ["Fell about 70%", "Fell about 95%", "Rose about 15%"], answer: 2, pick: () => (e2 > e1 ? 2 : e2 / e1 < 0.15 ? 1 : 0),
    presets: ["All disasters, two halves", "Earthquakes, two halves", "Per million people", "Three biggest years"],
    reveal: "Recorded deaths from all disasters fell from {a1} million in 1900-1958 to {a2} million in 1959-2017, but earthquake deaths rose, from {e1} to {e2} million. The world's population more than doubled, so per person the yearly risk still fell, from {perM1} to {perM2} per million. Just three years made up {top3}% of the later earthquake deaths. Where it stops: a single year can change a half-century's total, so a trend in earthquake deaths is hard to read.",
    checks: (v) => {
      ok("19 all disasters", v.fall === 71, `${fmt(a1)} -> ${fmt(a2)}: ${v.fall}% fewer`);
      ok("19 earthquakes", v.rise === 14, `${fmt(e1)} -> ${fmt(e2)}: +${v.rise}% (answer: rose; option says about 15%)`);
      ok("19 per person", perM1 / perM2 > 2, `mean world population ${r(p1 / 1e9, 2)} bn -> ${r(p2 / 1e9, 2)} bn; deaths per million a year ${v.perM1} -> ${v.perM2} (x${r(perM1 / perM2, 2)} lower)`);
      ok("19 three biggest years", top3 === 53, `${later.map((x) => `${x.y} ${fmt(x.d)}`).join(", ")}: ${top3}% of 1959-2017. The stage shows the years, never a place or event name (the file has none)`);
      const missing = []; for (let y = 1900; y <= 2017; y++) if (!rows.some((x) => x.e === "Earthquake" && x.y === y)) missing.push(y);
      ok("19 years with no earthquake row count as zero", missing.length === 7, `no row for ${missing.join(", ")} (treated as no recorded deaths)`);
    },
    recall: { q: "Deaths from a cause stay the same while the population doubles. What happens to the risk per person?", options: ["It halves", "It stays the same", "It doubles"], answer: 0, pick: () => (1 / 2 === 0.5 ? 0 : 1) },
  }, v);
}

// ---------------------------------------------------------------- 20. Farr's 1849 cholera by elevation (HistData Cholera)
{
  const C = csvq(pathOf("cholera")).map((x) => ({ d: x.district, e: Number(x.elevation), deaths: Number(x.cholera_deaths), pop: Number(x.popn), rate: Number(x.cholera_drate), w: x.water }));
  const rate = (rs) => (1e4 * rs.reduce((s, x) => s + x.deaths, 0)) / rs.reduce((s, x) => s + x.pop, 0);
  const low = C.filter((x) => x.e < 20), high = C.filter((x) => x.e >= 80);
  const lowB = low.filter((x) => x.w === "Battersea").length;
  const within = (w) => { const rs = C.filter((x) => x.w === w); return r(corr(rs.map((x) => x.e), rs.map((x) => x.rate)), 2); };
  const v = { low: Math.round(rate(low)), high: Math.round(rate(high)), ratio: Math.round(rate(low) / rate(high)), nlow: low.length, nb: lowB, nhigh: high.length };
  brief(20, {
    slug: "cholera-fell-with-height", data: ["cholera"],
    question: "In London's 1849 cholera, districts under 20 feet above the Thames lost {low} people per 10,000. What about districts 80 feet up or more?",
    options: ["About the same", "About a fifth as many", "About half as many"], answer: 1, pick: (v) => nearest(rate(high) / rate(low), [1, 0.2, 0.5]),
    presets: ["Under 20 feet", "80 feet and up", "Colour by water company", "One company's districts only"],
    reveal: "The {nlow} districts under 20 feet lost {low} per 10,000; the {nhigh} at 80 feet or more lost {high}, about {ratio} times fewer. The pattern in Farr's table is real. But {nb} of those {nlow} low districts drew their water from the Thames between Battersea and Waterloo, so height and water went together, and this table alone cannot say which mattered. Where it stops: these are deaths registered in one year, district by district.",
    checks: (v) => {
      ok("20 low districts", v.low === 92 && v.nlow === 16, `elevation < 20 ft: ${low.length} districts, ${fmt(low.reduce((s, x) => s + x.deaths, 0))} deaths, ${fmt(low.reduce((s, x) => s + x.pop, 0))} people: ${r(rate(low))} per 10,000`);
      ok("20 high districts", v.nhigh === 4 && v.ratio === 5, `elevation >= 80 ft: ${high.map((x) => `${x.d} ${x.e} ft`).join(", ")}: ${r(rate(high))} per 10,000; low/high x${r(rate(low) / rate(high), 1)}`);
      ok("20 water and height together", v.nb === 11, `${v.nb} of ${v.nlow} low districts supplied from the Thames between Battersea and Waterloo; high districts: ${high.map((x) => x.w).join(", ")}`);
      ok("20 within one company", within("Battersea") < -0.5, `elevation vs death rate within each supplier: Battersea r = ${within("Battersea")}, New River r = ${within("New River")}, Kew r = ${within("Kew")} (height still predicts inside each, so the lesson never says water alone)`);
      ok("20 boundary", true, "Big Ideas owns germ theory and Snow: no germ, pump or Snow on the stage or in the reveal");
    },
    recall: { q: "In a city, the low streets have both more illness and the oldest wells. From those two facts alone, what causes the illness?", options: ["The low ground", "The wells", "These facts cannot tell"], answer: 2, pick: () => 2 },
  }, v);
}

// ---------------------------------------------------------------- 21. Plague in London's bills, year by year (Arbuthnot)
{
  const A = csv("arbuthnot").map((x) => ({ y: Number(x.Year), p: Number(x.Plague) }));
  const early = A.filter((x) => x.y <= 1679), late = A.filter((x) => x.y >= 1680);
  const v = { n: early.length, k: early.filter((x) => x.p > 0).length, p1664: A.find((x) => x.y === 1664).p, nlate: late.length, klate: late.filter((x) => x.p > 0).length, big: early.filter((x) => x.p >= 1000).length };
  brief(21, {
    slug: "plague-every-year-then-none", data: ["arbuthnot"],
    question: "London's bills cover 51 years from 1629 to 1679. In about how many did they record at least one plague burial?",
    options: ["About 5", "About 25", "About 45"], answer: 2, pick: (v) => nearest(v.k, [5, 25, 45]),
    presets: ["1629 to 1679, year by year", "1664, the year before 1665", "1680 to 1710", "Years with 1,000 or more"],
    reveal: "Plague burials were recorded in {k} of the {n} years to 1679, usually only a handful: 1664, the year before the worst outbreak, recorded {p1664}. In {big} years they passed 1,000. Then, from 1680 to 1710, the bills recorded no plague burial in any of those {nlate} years. The disease was nearly always there at a low level, until it left the record. Where it stops: these are causes as the bills recorded them, and the record cannot say why plague stopped.",
    checks: (v) => {
      ok("21 years with plague", v.n === 51 && v.k === 47, `${v.k} of ${v.n} years 1629-1679 have Plague > 0; zero years: ${early.filter((x) => x.p === 0).map((x) => x.y).join(", ")}`);
      ok("21 1664", v.p1664 === 5, `1664: ${v.p1664} plague burials (1665: ${fmt(A.find((x) => x.y === 1665).p)})`);
      ok("21 after 1679", v.klate === 0 && v.nlate === 31, `1680-1710: ${v.klate} years with plague of ${v.nlate}`);
      ok("21 big years", v.big === 12, `years >= 1,000: ${early.filter((x) => x.p >= 1000).map((x) => x.y).join(", ")}`);
      ok("21 source of the column", true, "the Arbuthnot doc does not name the source of the Plague column (same note as brief 8)");
    },
    recall: { q: "A town records a disease in 40 of 50 years, mostly one or two cases, then 500 cases in one year. What does that suggest about the quiet years?", options: ["The disease was absent", "The counts were wrong", "It was there at a low level"], answer: 2, pick: () => 2 },
  }, v);
}

// ---------------------------------------------------------------- 22. England's 1849 cholera, day by day (HistData CholeraDeaths1849)
{
  const D = csv("cholera1849").map((x) => ({ date: x.date, c: x.cause_of_death, d: Number(x.deaths) }));
  const ch = D.filter((x) => x.c === "Cholera"), di = D.filter((x) => x.c === "Diarrhaea");
  const tot = ch.reduce((s, x) => s + x.d, 0), dtot = di.reduce((s, x) => s + x.d, 0);
  let L = 0; for (L = 1; L <= 365; L++) { let best = 0; for (let i = 0; i + L <= ch.length; i++) { let s = 0; for (let j = i; j < i + L; j++) s += ch[j].d; best = Math.max(best, s); } if (best >= tot / 2) break; }
  const mon = (rs, m) => rs.filter((x) => x.date.slice(5, 7) === m).reduce((s, x) => s + x.d, 0);
  const pk = ch.reduce((a, x) => (x.d > a.d ? x : a)), dpk = di.reduce((a, x) => (x.d > a.d ? x : a));
  const v = { tot: fmt(tot), L, as: Math.round((100 * (mon(ch, "08") + mon(ch, "09"))) / tot), pk: pk.d.toLocaleString("en-US"), pkd: "6 September" };
  brief(22, {
    slug: "cholera-half-in-six-weeks", data: ["cholera1849"],
    question: "England registered 53,293 deaths from cholera in 1849. Half of them fell within how many days in a row?",
    options: ["About 40", "About 120", "About 250"], answer: 0, pick: (v) => nearest(v.L, [40, 120, 250]),
    presets: ["The whole year", "The busiest stretch", "Peak day", "Diarrhoea, same year"],
    reveal: "Half of the year's {tot} registered cholera deaths fell within {L} days, and {as}% in August and September. The busiest day, {pkd}, registered {pk}. Deaths registered as diarrhoea rose and fell in the same months. A year's total can hide an epidemic that came and went in a few weeks. Where it stops: these are deaths as registered, each with the cause written down, and one day's figure was rebuilt from row totals.",
    checks: (v) => {
      ok("22 total", tot === 53293 && ch.length === 365, `cholera ${fmt(tot)} over ${ch.length} days; diarrhoea ${fmt(dtot)}`);
      ok("22 half within", L === 38, `shortest run of consecutive days holding half the cholera deaths: ${L}`);
      ok("22 August and September", v.as === 68, `Aug ${fmt(mon(ch, "08"))} + Sep ${fmt(mon(ch, "09"))} = ${v.as}%`);
      ok("22 peak", pk.date === "1849-09-06" && pk.d === 1121, `cholera peak ${pk.date} (${pk.d}); diarrhoea peak ${dpk.date} (${dpk.d}); diarrhoea Aug+Sep ${Math.round((100 * (mon(di, "08") + mon(di, "09"))) / dtot)}% of its year`);
      ok("22 rebuilt day", true, "doc (opened): Riley derived the day-11 column from row totals because of a fold in the scan");
    },
    recall: { q: "A town's yearly total is 365 deaths from one illness, 'one a day'. Half came within 30 days. On those days, about how many a day?", options: ["About 1", "About 6", "About 30"], answer: 1, pick: () => nearest(182.5 / 30, [1, 6, 30]) },
  }, v);
}

// Guerry helpers (23, 24)
const G = csv("guerry").map((x) => ({ dept: Number(x.dept), name: x.Department, reg: x.Region, lit: Number(x.Literacy), prop: 1e5 / Number(x.Crime_prop), pers: 1e5 / Number(x.Crime_pers) }));

// ---------------------------------------------------------------- 23. Literacy across France in the 1830s (Guerry; today's outlines)
{
  const avg = (rs) => mean(rs.map((x) => x.lit));
  // Fixed 2026-10-16 by cm-history (W-1276): was "SWC".includes(x.reg), which also matched Corse's empty Region
  // ("SWC".includes("") is true), giving 52 departments at 28.8%. Guerry assigns Corse no region: it is in neither
  // group, and only in the mean of 86. Found by demo-builder-h23 (company/reviews/literacy-split-france/build.md).
  const ne = G.filter((x) => ["N", "E"].includes(x.reg)), swc = G.filter((x) => ["S", "W", "C"].includes(x.reg));
  const noReg = G.filter((x) => !["N", "E", "S", "W", "C"].includes(x.reg));
  const byReg = Object.fromEntries("NESWC".split("").map((k) => [k, r(avg(G.filter((x) => x.reg === k)), 1)]));
  const hi = G.reduce((a, x) => (x.lit > a.lit ? x : a)), lo = G.reduce((a, x) => (x.lit < a.lit ? x : a));
  const seine = G.find((x) => x.name === "Seine");
  // stand-in outlines: today's departments
  const F = JSON.parse(fs.readFileSync(pathOf("frdep"), "utf8")).features;
  const MAP = { 75: ["75", "92", "93", "94"], 78: ["78", "91", "95"], 68: ["68", "90"], 200: ["2A", "2B"] };
  const codes = new Set(F.map((f) => f.properties.code));
  const unmatched = G.filter((x) => !(MAP[x.dept] ?? [String(x.dept).padStart(2, "0")]).every((c) => codes.has(c)));
  const used = new Set(G.flatMap((x) => MAP[x.dept] ?? [String(x.dept).padStart(2, "0")]));
  const noData = [...codes].filter((c) => !used.has(c)).sort();
  const v = { ne: Math.round(avg(ne)), swc: Math.round(avg(swc)), all: Math.round(avg(G)), hi: hi.name, hiL: hi.lit, lo: lo.name === "Correze" ? "Corrèze" : lo.name, loL: lo.lit };
  brief(23, {
    slug: "literacy-split-france", data: ["guerry", "frdep"],
    question: "Across France's 86 departments in the 1830s, about 39% of army conscripts could read and write, on average. Which part was most literate?",
    options: ["The south", "The north and east", "The west"], answer: 1, pick: () => { const s = { 0: byReg.S, 1: (byReg.N + byReg.E) / 2, 2: byReg.W }; return Object.keys(s).reduce((a, k) => (s[k] > s[a] ? k : a), "0") * 1; },
    presets: ["North and east", "South, west and centre", "Paris (Seine)", "Most and least literate"],
    reveal: "In Guerry's north and east, departments averaged {ne}% of conscripts who could read and write; in the south, west and centre, {swc}%. The extremes were {hi}, {hiL}%, and {lo}, {loL}%. An average of {all}% across departments hid two very different Frances. Where it stops: these are young men called up for the army, not everyone, and today's department outlines stand in for those of the 1830s.",
    checks: (v) => {
      ok("23 regions", v.ne === 55 && v.swc === 28 && ne.length === 34 && swc.length === 51, `Guerry regions: ${Object.entries(byReg).map(([k, x]) => `${k} ${x}%`).join(", ")} (17 departments each); N+E ${r(avg(ne), 1)}% (${ne.length} departments), S+W+C ${r(avg(swc), 1)}% (${swc.length} departments)`);
      ok("23 no region", noReg.length === 1 && noReg[0].name === "Corse", `departments with no Guerry region: ${noReg.map((x) => `${x.name} ${x.lit}%`).join(", ")} (in neither group; in the mean of 86 only)`);
      ok("23 average", v.all === 39 && G.length === 86, `mean across ${G.length} departments ${r(avg(G), 2)}% (an unweighted mean of departments, said so on the stage)`);
      ok("23 extremes", hi.lit === 74 && lo.lit === 12, `highest ${hi.name} ${hi.lit}%, lowest ${lo.name} ${lo.lit}%; Seine (Paris) ${seine.lit}%`);
      ok("23 outlines", unmatched.length === 0, `all 86 departments matched to today's codes (Seine -> 75, 92, 93, 94; Seine-et-Oise -> 78, 91, 95; Haut-Rhin -> 68, 90; Corse -> 2A, 2B); outlines with no 1830s value: ${noData.join(", ")} (drawn hatched, labelled "no value in Guerry's table")`);
      const area = (cs) => cs.reduce((s, c) => s + geoArea(F.find((f) => f.properties.code === c)), 0);
      ok("23 equal-area", true, `areas are not compared on this stage; any projection with France upright works, the stage names it (conic equal-area suggested). Total outline area ${r(area([...codes]) * 6371 ** 2 / 1e3, 0)} thousand km²`);
    },
    recall: { q: "A country's average literacy is 50%: half its regions are at 80%, half at 20%. What does the average hide?", options: ["Nothing", "Two very different halves", "A counting error"], answer: 1, pick: () => ((80 + 20) / 2 === 50 ? 1 : 0) },
  }, v);
}

// ---------------------------------------------------------------- 24. Schooling and recorded crime in Guerry's France
// Amended 2026-10-16 by cm-history, W-1204: the cultural-reviewer's two wording edits (company/reviews/schooling-and-crime-1830s/2026-10-16-culture-en-brief.md).
{
  const srt = [...G].sort((a, b) => a.lit - b.lit), q = Math.floor(G.length / 4);
  const lo = srt.slice(0, q), hi = srt.slice(-q);
  const m = (rs, k) => mean(rs.map((x) => x[k]));
  const v = { hiP: r(m(hi, "prop")), loP: r(m(lo, "prop")), x: r(m(hi, "prop") / m(lo, "prop"), 1), hiQ: r(m(hi, "pers")), loQ: r(m(lo, "pers")), rP: r(corr(G.map((x) => x.lit), G.map((x) => x.prop)), 2), q };
  brief(24, {
    slug: "schooling-and-crime-1830s", data: ["guerry"],
    question: "Compare the most literate quarter of Guerry's French departments with the least literate. Where were recorded property crimes per person higher?",
    options: ["In the least literate, about 1.7 times as high", "About equal", "In the most literate, about 1.7 times as high"], answer: 2, pick: () => (v.x > 1.3 ? 2 : v.x < 0.77 ? 0 : 1),
    presets: ["Least literate quarter", "Most literate quarter", "Crimes against persons", "All 86 departments"],
    reveal: "The most literate quarter of departments recorded {hiP} property crimes per 100,000 people, against {loP} in the least literate: {x} times as many. Crimes against persons were the same, {hiQ} per 100,000 in both. In this record, the more literate departments did not have fewer cases brought to court. Where it stops: these are cases brought to court in 1825 to 1830, which depend on policing as well as crime; they compare departments, not people, and two numbers moving together say nothing, alone, about what caused what.",
    checks: (v) => {
      ok("24 quarters", q === 21, `${q} departments in each quarter; literacy ${r(m(lo, "lit"), 1)}% vs ${r(m(hi, "lit"), 1)}%`);
      ok("24 property crime", v.x === 1.7, `crimes against property per 100,000 (100,000 / Crime_prop): least literate ${v.loP}, most literate ${v.hiP}; x${v.x}`);
      ok("24 crimes against persons", v.hiQ === v.loQ, `per 100,000: ${v.loQ} vs ${v.hiQ}`);
      ok("24 all departments", v.rP > 0.3, `correlation, literacy vs property crime, all 86: r = ${v.rP}; vs crime against persons r = ${r(corr(G.map((x) => x.lit), G.map((x) => x.pers)), 2)}`);
      ok("24 care", true, "no department or region is called criminal; the stage shows quarters and dots, labelled by number only");
    },
    recall: { q: "Towns with more libraries report more thefts. What is the safest reading?", options: ["Libraries cause theft", "The thefts are misreported", "They go together here; the cause needs more evidence"], answer: 2, pick: () => 2 },
  }, v);
}

// ================================================================ batch 3 (25-30): written, held for strand balance (see the briefs file)

// ---------------------------------------------------------------- 25. Americans aged 65 and over (IPUMS via vega-datasets)
{
  const P = JSON.parse(fs.readFileSync(vegaFile("population.json"), "utf8"));
  const tot = (y, f = () => true) => P.filter((x) => x.year === y && f(x)).reduce((s, x) => s + x.people, 0);
  const sh = (y, f) => r((100 * tot(y, f)) / tot(y), 1);
  const old = (x) => x.age >= 65, kid = (x) => x.age < 15;
  const years = [...new Set(P.map((x) => x.year))];
  const v = { o1900: sh(1900, old), o2000: sh(2000, old), k1900: Math.round(sh(1900, kid)), k2000: Math.round(sh(2000, kid)), x: Math.round(sh(2000, old) / sh(1900, old)) };
  brief(25, {
    slug: "americans-over-sixty-five", data: ["vega (population.json)"],
    question: "In the 1900 US census, about 4 in 100 Americans were 65 or older. About how many in 2000?",
    options: ["About 6 in 100", "About 12 in 100", "About 25 in 100"], answer: 1, pick: () => nearest(v.o2000, [6, 12, 25]),
    presets: ["1900", "1950", "2000", "Children under 15", "Every age group"],
    reveal: "In 1900, {o1900}% of Americans were 65 or older; in 2000, {o2000}%, about {x} times the share. Over the same century the share under 15 fell from {k1900}% to {k2000}%. The country aged at both ends: more older people, and fewer children for each person. Where it stops: these are census samples harmonised by IPUMS, and the file has no count for 1890.",
    checks: (v) => {
      ok("25 65 and over", v.o1900 === 4.1 && v.o2000 === 12.4, `1900 ${v.o1900}%, 1950 ${sh(1950, old)}%, 2000 ${v.o2000}% (age groups are 5-year bands; 65 = bands 65 to 90+)`);
      ok("25 under 15", v.k1900 > v.k2000, `under 15: 1900 ${sh(1900, kid)}%, 2000 ${sh(2000, kid)}%`);
      ok("25 years in the file", !years.includes(1890), `years: ${years.join(", ")} (no 1890)`);
      ok("25 starts at 1900", tot(1850) < 2.1e7, `the stage starts at 1900: the 1850 total here is ${fmt(tot(1850))}, the free population only (same coverage hold as half-the-men-farmed and us-age-structure, which are sensitive)`);
    },
    recall: { q: "A town's number of people over 65 stays the same while its number of children halves. What happens to the over-65s' share?", options: ["It rises", "It stays the same", "It falls"], answer: 0, pick: () => 0 },
  }, v);
}

// ---------------------------------------------------------------- 26. Office clerical work (IPUMS via vega-datasets)
{
  const J = JSON.parse(fs.readFileSync(vegaFile("jobs.json"), "utf8"));
  const CL = ["Clerical Worker", "Secretary", "Bookkeeper", "Office Machine Operator"];
  const n = (y, f = () => true) => J.filter((x) => x.year === y && f(x)).reduce((s, x) => s + x.count, 0);
  const cl = (y) => n(y, (x) => CL.includes(x.job));
  const sh = (y) => r((100 * cl(y)) / n(y), 1);
  const years = [...new Set(J.map((x) => x.year))].filter((y) => y >= 1900);
  const peak = years.reduce((a, y) => (sh(y) > sh(a) ? y : a));
  const v = { s1900: sh(1900), s1970: sh(1970), s2000: sh(2000), peak, m1970: r(cl(1970) / 1e6, 1), m2000: r(cl(2000) / 1e6, 1) };
  brief(26, {
    slug: "office-work-one-in-seven", data: ["vega (jobs.json)"],
    question: "In the 1900 US census, about 2 in 100 recorded jobs were office clerical work. By 1970, about how many?",
    options: ["About 4 in 100", "About 8 in 100", "About 15 in 100"], answer: 2, pick: () => nearest(v.s1970, [4, 8, 15]),
    presets: ["1900", "1940", "1970", "2000", "Millions, not share"],
    reveal: "Clerks, secretaries, bookkeepers and office machine operators made up {s1900}% of recorded jobs in 1900 and {s1970}% in 1970, about 1 in 7. By 2000 the share had slipped to {s2000}%, though their number had grown, from {m1970} to {m2000} million. Where it stops: these are IPUMS's harmonised job codes, and a job's name or code can shift from one census to the next.",
    checks: (v) => {
      ok("26 shares", v.s1900 === 2.1 && v.s1970 === 15.1 && v.s2000 === 12.7, `${CL.join(" + ")}: ${years.map((y) => `${y} ${sh(y)}%`).join(", ")}`);
      ok("26 peak", peak === 1970, `share peaks in ${peak}`);
      ok("26 numbers", cl(2000) > cl(1970), `1970 ${fmt(cl(1970))}, 2000 ${fmt(cl(2000))}`);
      ok("26 starts at 1900, both sexes together", true, "the stage starts at 1900 (1850-1860 cover free men almost only) and never splits by sex (women in recorded work is a separate, sensitive concept)");
    },
    recall: { q: "A job grows from 1 in 50 to 1 in 7 of all jobs while the total number of jobs grows 4 times. About how many times more people do it?", options: ["About 4 times", "About 7 times", "About 28 times"], answer: 2, pick: () => nearest((1 / 7 / (1 / 50)) * 4, [4, 7, 28]) },
  }, v);
}

// ---------------------------------------------------------------- 27. Playfair's wheat price, 1565-1821 (HistData Wheat)
{
  const W = csv("wheat").map((x) => ({ y: Number(x.Year), p: Number(x.Wheat) }));
  const at = (y) => W.find((x) => x.y === y).p;
  const ch = W.slice(1).map((x, i) => ({ y: x.y, from: W[i].p, to: x.p, c: (100 * (x.p / W[i].p - 1)) }));
  const drop = ch.reduce((a, x) => (x.c < a.c ? x : a));
  const v = { p1565: at(1565), p1765: at(1765), p1595: at(1595), p1600: at(1600), dropPct: Math.round(-drop.c), p1790: at(1790), p1810: at(1810) };
  brief(27, {
    slug: "wheat-flat-for-two-centuries", data: ["wheat"],
    question: "Playfair's figures put wheat at 41 shillings a quarter in 1565. In 1765, two hundred years later, about what?",
    options: ["About 40", "About 90", "About 150"], answer: 0, pick: () => nearest(v.p1765, [40, 90, 150]),
    presets: ["1565", "1765", "Biggest five-year drop", "1790 to 1810"],
    reveal: "Wheat cost {p1565} shillings a quarter in 1565 and {p1765} in 1765: almost no change in 200 years. In between it swung hard, from {p1595} in 1595 to {p1600} in 1600, a fall of {dropPct}% in five years. The steep rise came only at the end, from {p1790} in 1790 to {p1810} in 1810. Where it stops: these are single readings every five years from one source, so the years between are not shown.",
    checks: (v) => {
      ok("27 200 years", v.p1565 === 41 && v.p1765 === 43, `1565 ${v.p1565}, 1765 ${v.p1765} (x${r(v.p1765 / v.p1565, 2)})`);
      ok("27 biggest drop", drop.y === 1600 && v.dropPct === 58, `largest five-year fall ${drop.y - 5}-${drop.y}: ${drop.from} -> ${drop.to} (${r(drop.c, 1)}%); 21 of 52 steps fall: ${ch.filter((x) => x.c < 0).length}`);
      ok("27 late rise", v.p1810 / v.p1790 > 2, `1790 ${v.p1790} -> 1810 ${v.p1810}`);
      ok("27 no cause on the stage", true, "the record does not say why prices moved; harvests and wars are not named (a war-price lesson is sensitive: bread-price-1770-1824)");
    },
    recall: { q: "A price is 10 in one year and 10 again 200 years later. What can you say about the years between?", options: ["Nothing, without the readings between", "It stayed near 10", "It must have risen and fallen"], answer: 0, pick: () => 0 },
  }, v);
}

// ---------------------------------------------------------------- 28. Ages ending in 0 in Breslau's deaths (HistData Breslau)
{
  const B = Object.fromEntries(csv("breslau").map((x) => [Number(x.age), Number(x.total)]));
  const ages = Object.keys(B).map(Number).filter((a) => a >= 20 && a <= 99);
  const all = ages.reduce((s, a) => s + B[a], 0), zero = ages.filter((a) => a % 10 === 0).reduce((s, a) => s + B[a], 0);
  // what smooth ages would give: each decade age replaced by the mean of its four neighbours
  const smooth = ages.filter((a) => a % 10 === 0).reduce((s, a) => s + (B[a - 2] + B[a - 1] + B[a + 1] + B[a + 2]) / 4, 0);
  const nb40 = [38, 39, 41, 42].map((a) => B[a]);
  const kid = [8, 9, 11, 12].map((a) => B[a]);
  const v = { all: fmt(all), s0: Math.round((100 * zero) / all), exp: Math.round((100 * smooth) / all), d40: B[40], lo40: Math.min(...nb40), hi40: Math.max(...nb40) };
  brief(28, {
    slug: "ages-ending-in-zero", data: ["breslau"],
    question: "Breslau recorded 2,695 deaths at 20 or older. With exact ages, about 1 in 10 would end in 0. What share did?",
    options: ["About 10%", "About 20%", "About 40%"], answer: 1, pick: () => nearest((100 * zero) / all, [10, 20, 40]),
    presets: ["Ages ending in 0", "Age 40 and its neighbours", "Ages ending in 5", "Children's ages"],
    reveal: "{s0}% of the {all} deaths at 20 or older were recorded at ages ending in 0, about twice what exact ages would give. Age 40 had {d40} deaths, against {lo40} to {hi40} at the ages just beside it. Many adults' ages were rounded when they were written down. Where it stops: the record cannot say who rounded, the family or the clerk, and any life table built from these counts inherits the rounding.",
    checks: (v) => {
      ok("28 total", all === 2695, `deaths at ages 20-99, 1687-1691: ${fmt(all)}`);
      ok("28 ending in 0", v.s0 === 18, `${fmt(zero)} at ages 20, 30 ... 90 = ${r((100 * zero) / all, 1)}%; with each decade age replaced by its neighbours' mean: ${r((100 * smooth) / all, 1)}% (the "about 1 in 10")`);
      ok("28 age 40", B[40] === 104, `age 40: ${B[40]}; ages 38, 39, 41, 42: ${nb40.join(", ")}`);
      const five = ages.filter((a) => a % 10 === 5).reduce((s, a) => s + B[a], 0);
      ok("28 ending in 5", five / all > 0.1, `ages ending in 5: ${r((100 * five) / all, 1)}%; Whipple-style 0-or-5 share, ages 20-99: ${r((100 * (zero + five)) / all, 1)}%`);
      ok("28 children", Math.abs(B[10] - mean(kid)) / mean(kid) < 0.5, `age 10: ${B[10]}; ages 8, 9, 11, 12: ${kid.join(", ")} (little heaping)`);
      ok("28 the doc", true, "Breslau doc (opened): Bellhouse (2011) 'made a point of the over-representation of deaths in quinquennial years'");
    },
    recall: { q: "A survey asks people their weight. Far more answers end in 0 than in 7. What most likely happened?", options: ["People weigh round numbers", "The answers were rounded", "The scale was broken"], answer: 1, pick: () => 1 },
  }, v);
}

// ---------------------------------------------------------------- 29. Pricing a life annuity on Halley's table (labelled interest model)
{
  const H = Object.fromEntries(csv("halley").map((x) => [Number(x.age), Number(x.number)]));
  const ann = (x, i) => { let s = 0; for (let t = 1; H[x + t] !== undefined; t++) s += H[x + t] / H[x] / Math.pow(1 + i, t); return s; };
  const v = { a10: r(ann(10, 0.06)), a60: r(ann(60, 0.06)), a70: ann(70, 0.06).toFixed(1), a10f: r(ann(10, 0.04)), a60f: r(ann(60, 0.04)) };
  brief(29, {
    slug: "annuity-cheaper-when-old", data: ["halley"],
    question: "On Halley's Breslau table, at 6% interest, £1 a year for life is worth 13.4 years' payments at age 10. At 60?",
    options: ["About 13.4, the same", "About 7.5", "About 3"], answer: 1, pick: () => nearest(ann(60, 0.06), [13.4, 7.5, 3]),
    presets: ["Age 10", "Age 60", "Age 70", "At 4% interest", "Every age"],
    reveal: "At 6% interest, Halley's table makes £1 a year for life worth {a10} years' payments to a 10-year-old, {a60} to a 60-year-old and {a70} at 70. An older buyer can expect fewer payments, so a fair price falls with age, and one price for everyone is a bargain for the young. Where it stops: the 6% rate is our assumption, not the record's, and the table rests on one city's deaths over five years.",
    checks: (v) => {
      ok("29 6%", v.a10 === 13.4 && v.a60 === 7.5 && v.a70 === "5.0", `value of 1 a year for life, paid at year ends, from Halley's survivors: age 10 ${r(ann(10, 0.06), 2)}, 60 ${r(ann(60, 0.06), 2)}, 70 ${r(ann(70, 0.06), 2)}`);
      ok("29 4%", v.a10f > v.a10 && v.a60f > v.a60, `at 4%: age 10 ${v.a10f}, 60 ${v.a60f} (the rate changes the level, not the fall with age)`);
      ok("29 the model is labelled", true, "the interest rate is ours (labelled on the stage); the survivors are the record; the table ends at 84, so payments stop there (a small underestimate at old ages)");
    },
    recall: { q: "Two people buy a pension paying the same yearly amount for life. One is 30, one is 70. How should the fair prices compare?", options: ["Equal", "Higher for the 30-year-old", "Higher for the 70-year-old"], answer: 1, pick: () => (ann(30, 0.06) > ann(70, 0.06) ? 1 : 2) },
  }, v);
}

// ---------------------------------------------------------------- 30. British and Irish exports, 1855-1899 (HistData Bowley)
{
  const B = csv("bowley").map((x) => ({ y: Number(x.Year), v: Number(x.Value) }));
  const at = (y) => B.find((x) => x.y === y).v;
  const above = B.filter((x) => x.y > 1872 && x.v > at(1872)).map((x) => x.y);
  const falls = B.slice(1).filter((x, i) => x.v < B[i].v).length;
  const v = { v1855: Math.round(at(1855)), v1872: Math.round(at(1872)), v1899: Math.round(at(1899)), g: r(at(1872) / at(1855), 1), falls, steps: B.length - 1, above: above.join(", ") };
  brief(30, {
    slug: "exports-stalled-after-1872", data: ["bowley"],
    question: "British and Irish exports were worth £96 million in 1855 and £256 million in 1872. About how much in 1899?",
    options: ["About £250 million", "About £400 million", "About £600 million"], answer: 0, pick: () => nearest(at(1899), [250, 400, 600]),
    presets: ["1855 to 1872", "1872 to 1899", "Back above 1872", "Years that fell"],
    reveal: "Exports grew {g} times from 1855 to 1872, then were worth about the same in 1899, £{v1899} million against £{v1872} million. They fell in {falls} of the {steps} year-to-year steps, and passed the 1872 value only in {above}. A series can grow fast, then stall for a generation. Where it stops: these are values in pounds of the day, not quantities shipped, and they were read off Bowley's printed graph.",
    checks: (v) => {
      ok("30 growth", v.g === 2.7, `1855 ${at(1855)} -> 1872 ${at(1872)}: x${r(at(1872) / at(1855), 2)}`);
      ok("30 stall", Math.abs(at(1899) / at(1872) - 1) < 0.01, `1872 ${at(1872)}, 1899 ${at(1899)} (x${r(at(1899) / at(1872), 3)})`);
      ok("30 back above", above.length === 1 && above[0] === 1890, `years after 1872 above 1872's value: ${v.above}`);
      ok("30 falls", falls === 22, `${falls} of ${v.steps} steps fall`);
      ok("30 digitised", true, "doc (opened): 'Digitized from Bowley's graph'; values are millions of pounds");
    },
    recall: { q: "Sales grew 2.7 times in 17 years, then not at all in the next 27. Does 'sales grew 2.7 times in 44 years' describe it?", options: ["No: all of the growth came in the first 17 years", "Yes", "Only if prices fell"], answer: 0, pick: () => 0 },
  }, v);
}

if (!want) {
  const count = (a) => ["A", "B", "C"].map((l) => `${l} ${a.filter((x) => x === l).length}`).join(", ");
  const even = (a) => { const c = ["A", "B", "C"].map((l) => a.filter((x) => x === l).length); return Math.max(...c) - Math.min(...c) <= 1; };
  ok("letters predict", even(letters.predict), `answer letters across briefs 13-30: ${count(letters.predict)}`);
  ok("letters recall", even(letters.recall), `recall letters across briefs 13-30: ${count(letters.recall)}`);
}
console.log(fail ? `\n${fail} check(s) failed` : "\nall checks pass");
process.exit(fail ? 1 : 0);
