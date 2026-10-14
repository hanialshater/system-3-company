#!/usr/bin/env node
// Answer and number checks for the History cycle-1 briefs 1-12 (company/domains/briefs/history.md;
// charter company/domains/history.md). Every number a brief quotes is recomputed here FROM THE DATA FILE,
// never typed in: the files are fetched and pinned by history-data.mjs (SHA-256), and this script refuses
// to run if any pin fails. It also checks each stage question is <= 25 words, each reveal (numbers filled
// in) is <= 90 words, each answer is the option the data picks, and each brief lists its presets in DOM order.
//
//   node company/domains/briefs/checks/history-cycle1-check.mjs [brief-number]
//
// Drafted 2026-10-14 by chief-of-staff-ceo-office (Leonie) at the founder's request; cm-history and the
// strand managers own it from here and re-check it (board). Builders copy numbers from this output only.
import fs from "node:fs";
import { createRequire } from "node:module";
import { ensure, pathOf, vegaFile, ROOT } from "./history-data.mjs";

const require = createRequire(`${ROOT}package.json`);
const { geoArea } = require("d3-geo");
const topo = require("topojson-client");

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
// Quoted-CSV reader for OWID files (fields may contain commas inside quotes).
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

/** Common checks for every brief: answer, word limits, presets present. */
function brief(n, b, v) {
  if (want && want !== n) return;
  console.log(`\n== ${n}. ${b.slug}  (data: ${b.data.join(", ")})`);
  b.checks(v);
  const q = fill(b.question, v), rev = fill(b.reveal, v);
  ok(`${n} question ≤ 25 words`, words(q) <= 25, `${words(q)} words: "${q}"`);
  ok(`${n} reveal ≤ 90 words`, words(rev) <= 90, `${words(rev)} words: "${rev}"`);
  ok(`${n} answer`, b.options[b.answer] && b.pick(v) === b.answer, `options ${b.options.map((o, i) => `${"ABC"[i]}) ${o}`).join(" / ")}; the data picks ${"ABC"[b.pick(v)]}, the brief says ${"ABC"[b.answer]}`);
  ok(`${n} presets in DOM order`, b.presets.length >= 3 && b.presets.length <= 5, b.presets.map((p, i) => `${i + 1}. ${p}`).join(" | "));
  if (b.recall) ok(`${n} transfer recall`, b.recall.pick(v) === b.recall.answer, `"${b.recall.q}" ${b.recall.options.map((o, i) => `${"ABC"[i]}) ${o}`).join(" / ")} (answer ${"ABC"[b.recall.answer]})`);
}
const nearest = (x, targets) => targets.reduce((bi, t, i) => (Math.abs(Math.log(x / t)) < Math.abs(Math.log(x / targets[bi])) ? i : bi), 0);

// ---------------------------------------------------------------- 1. Halley's Breslau table
{
  const H = csv("halley");
  const P = { 0: 1238 }; for (const x of H) P[Number(x.age)] = Number(x.number);
  const ages = Object.keys(P).map(Number).sort((a, b) => a - b);
  const e = (x) => ages.filter((k) => k >= x && P[k + 1] !== undefined).reduce((s, k) => s + (P[k] + P[k + 1]) / 2, 0) / P[x];
  const top = Math.max(...ages);
  // Halley noted 107 people over 84 but they are not in his cohort table; bound their effect: at most P[top] people living <= 16 more years.
  const tailBound = (x) => (P[top] * 16) / P[x];
  const B = csv("breslau");
  const D = B.map((x) => [Number(x.age), Number(x.total)]);
  const over30 = D.filter(([a]) => a > 30), mean30 = over30.reduce((s, [a, d]) => s + (a - 0.5) * d, 0) / over30.reduce((s, [, d]) => s + d, 0);
  const v = { e0: Math.round(e(0)), a30: Math.round(30 + e(30)), u5: Math.round((100 * (P[0] - P[5])) / P[0]), a60: Math.round(60 + e(60)), born: fmt(P[0]) };
  brief(1, {
    slug: "survive-childhood-live-to-sixty", data: ["halley", "breslau"],
    question: "Halley's 1693 Breslau table gives a newborn a life expectancy of about {e0} years. Someone who reached 30 died, on average, at about what age?",
    options: ["About 31", "About 45", "About 58"], answer: 2, pick: (v) => nearest(v.a30, [31, 45, 58]),
    presets: ["Average from birth", "Deaths before age 5", "Average from age 30", "Average from age 60"],
    reveal: "Of {born} babies born in a year, about {u5}% died before age 5, and that pulled the average from birth down to {e0}. People who got through childhood usually lived much longer: from 30, the average death came at about {a30}, and from 60 at about {a60}. Life expectancy at birth averages over everyone, infants included, so a low number does not mean adults died young. Where it stops: this is one city's records over five years.",
    checks: (v) => {
      ok("1 life expectancy at birth", r(e(0)) === 27.9, `e0 = ${r(e(0), 2)} years (trapezoid between whole ages; table from 1,238 births, 1,000 alive at age 1); tail over ${top} adds at most ${r(tailBound(0), 2)}`);
      ok("1 average age at death, from 30", Math.round(30 + e(30)) === 58 && 30 + e(30) + tailBound(30) < 59, `30 + e30 = ${r(30 + e(30), 1)} (at most ${r(30 + e(30) + tailBound(30), 1)} with the tail)`);
      ok("1 deaths before age 5", v.u5 === 41, `${P[0]} born, ${P[5]} alive at 5: ${r((100 * (P[0] - P[5])) / P[0], 1)}% died before 5; before 1: ${r((100 * (P[0] - P[1])) / P[0], 1)}%`);
      ok("1 from 60", v.a60 >= 70 && v.a60 <= 76, `60 + e60 = ${r(60 + e(60), 1)}`);
      ok("1 cross-check on independent records (Breslau deaths 1687-91)", Math.abs(mean30 - (30 + e(30))) < 2, `mean age at death of those dying over 30 = ${r(mean30, 1)} (Bellhouse's reconstruction of the same city's deaths)`);
      ok("1 survivors readout", P[30] === 531 && P[50] === 346 && P[70] === 142, `alive of 1,238 born: age 30 ${P[30]}, 50 ${P[50]}, 70 ${P[70]}, 80 ${P[80]}`);
    },
    recall: { q: "A country's life expectancy at birth rises from 50 to 70, mostly because fewer babies die. Must adults now live 20 years longer?", options: ["Yes", "No: most of the rise can come from infants surviving", "Only if births rise"], answer: 1, pick: () => 1 },
  }, v);
}

// ---------------------------------------------------------------- 2. England/UK income per person (Maddison 2020)
{
  const M = csvq(pathOf("maddison")).filter((x) => x.Entity === "United Kingdom" && x["GDP per capita"]);
  const g = Object.fromEntries(M.map((x) => [Number(x.Year), Number(x["GDP per capita"])]));
  const g1 = g[1700] / g[1270], g2 = g[2018] / g[1700];
  const rate = (a, b) => (100 * (Math.pow(g[b] / g[a], 1 / (b - a)) - 1));
  const v = { g1: r(g1, 1), g2: Math.round(g2), r1: r(rate(1270, 1700), 2), r2: r(rate(1700, 2018), 1), dt: Math.round(Math.log(2) / Math.log(1 + rate(1700, 2018) / 100)) };
  brief(2, {
    slug: "income-flat-then-sixteenfold", data: ["maddison"],
    question: "Income per person in England about doubled from 1270 to 1700, over 430 years. From 1700 to 2018, how many times over did it grow?",
    options: ["About 2 times", "About 4 times", "About 16 times"], answer: 2, pick: (v) => nearest(g2, [2, 4, 16]),
    presets: ["1270 to 1700", "1700 to 2018", "Growth per year", "Log scale"],
    reveal: "In the 430 years to 1700, income per person grew {g1}-fold; in the 318 years after, {g2}-fold. Growth of {r1}% a year is invisible in a lifetime, while {r2}% a year doubles income about every {dt} years. That is why most of history looks flat on this chart. Where it stops: these are reconstructions from wages, prices and output records, and the series covers England only before 1700, so early values are estimates.",
    checks: (v) => {
      ok("2 1270 to 1700", r(g1, 2) === 2.02, `${fmt(g[1270])} -> ${fmt(g[1700])}: x${r(g1, 2)} (${v.r1}% a year)`);
      ok("2 1700 to 2018", r(g2, 1) === 15.8, `${fmt(g[1700])} -> ${fmt(g[2018])}: x${r(g2, 2)} (${r(rate(1700, 2018), 2)}% a year)`);
      ok("2 doubling time after 1700", v.dt === 80, `${v.dt} years at ${r(rate(1700, 2018), 3)}% a year`);
      ok("2 not smooth before 1700", g[1650] < g[1400], `1348 ${fmt(g[1348])}, 1400 ${fmt(g[1400])}, 1500 ${fmt(g[1500])}, 1600 ${fmt(g[1600])}, 1650 ${fmt(g[1650])}: it fell as well as rose`);
      ok("2 ratios only", true, "the copy we opened states no currency unit, so the stage shows ratios and an index (1700 = 100), not dollars");
    },
    // Drafted with answer C; the script found 1.002^300 = 1.82 and 1.02^30 = 1.81, so the answer is B. Kept: the surprise is the point.
    recall: { q: "One economy grows 0.2% a year for 300 years, another 2% a year for 30 years. Which grows more in total?", options: ["The 300-year one", "About the same", "The 30-year one"], answer: 1, pick: () => { const a = Math.pow(1.002, 300), b = Math.pow(1.02, 30); return Math.abs(a / b - 1) < 0.05 ? 1 : a > b ? 0 : 2; } },
  }, v);
}

// ---------------------------------------------------------------- 3. US farm share of men's jobs (IPUMS via vega-datasets)
{
  const J = JSON.parse(fs.readFileSync(vegaFile("jobs.json"), "utf8"));
  const FARM = new Set(["Farmer", "Farm Laborer", "Farm Manager", "Farm Foreman"]);
  const share = (y, sex = "men") => { const rs = J.filter((x) => x.year === y && x.sex === sex); const t = rs.reduce((s, x) => s + x.count, 0), f = rs.filter((x) => FARM.has(x.job)).reduce((s, x) => s + x.count, 0); return { t, f, s: (100 * f) / t }; };
  const years = [...new Set(J.map((x) => x.year))].sort();
  const counts = years.map((y) => [y, share(y).f]);
  const peak = counts.reduce((b, c) => (c[1] > b[1] ? c : b));
  const v = { s1850: Math.round(share(1850).s), s2000: r(share(2000).s, 0), peak: peak[0], women1850: fmt(share(1850, "women").t) };
  brief(3, {
    slug: "half-the-men-farmed", data: ["vega (jobs.json)"],
    question: "In the 1850 US census, about half of men with a recorded job farmed. In 2000, what share of men's recorded jobs were farm jobs?",
    options: ["About a quarter", "About a tenth", "About 1 in 50"], answer: 2, pick: (v) => nearest(share(2000).s, [25, 10, 2]),
    presets: ["1850", "1900", "1950", "2000", "Count farmers, not the share"],
    reveal: "In 1850 about {s1850}% of men with a recorded job farmed; by 2000 it was {s2000}%. The number of farming men kept rising until {peak} and only then fell: the share dropped because other jobs grew far faster. Where it stops: the 1850 census recorded jobs almost only for free men ({women1850} women). Enslaved people, most of whom worked on farms, were not recorded with occupations, so the true 1850 farm share was higher.",
    checks: (v) => {
      ok("3 shares (men)", v.s1850 === 51 && v.s2000 === 2, years.filter((y) => [1850, 1900, 1950, 2000].includes(y)).map((y) => `${y}: ${r(share(y).s, 1)}% (${fmt(share(y).f)} of ${fmt(share(y).t)})`).join("; "));
      ok("3 count peaks before it falls", peak[0] > 1850 && peak[0] < 1950, `farming men peak in ${peak[0]} at ${fmt(peak[1])}; 2000: ${fmt(share(2000).f)}`);
      ok("3 women barely recorded in 1850", share(1850, "women").t < 100000, `women with a recorded job: 1850 ${fmt(share(1850, "women").t)}, 1900 ${fmt(share(1900, "women").t)}`);
      ok("3 all recorded workers agree", Math.abs(((share(1850).f + share(1850, "women").f) / (share(1850).t + share(1850, "women").t)) * 100 - 50.8) < 0.1, "both sexes 1850: 50.8%");
    },
    recall: { q: "A town's factory jobs fall from 40% to 10% of all jobs while the number of factory workers stays the same. What happened?", options: ["Factories closed", "Other jobs grew about four times as fast", "The share must be wrong"], answer: 1, pick: () => 1 },
  }, v);
}

// ---------------------------------------------------------------- 4. Nightingale, Crimean War deaths by cause
{
  const N = csv("nightingale").map((x) => ({ date: x.Date, army: Number(x.Army), dis: Number(x.Disease), wou: Number(x.Wounds), oth: Number(x.Other), rate: Number(x["Disease.rate"]) }));
  const sum = (rs, k) => rs.reduce((s, x) => s + x[k], 0);
  const d = sum(N, "dis"), w = sum(N, "wou"), o = sum(N, "oth");
  const first = N.filter((x) => x.date < "1855-04"), second = N.filter((x) => x.date >= "1855-04");
  const peak = N.reduce((b, x) => (x.rate > b.rate ? x : b));
  const C = JSON.parse(fs.readFileSync(vegaFile("crimea.json"), "utf8"));
  const v = { d: fmt(d), w: fmt(w), ratio: Math.round(d / w), peak: fmt(peak.rate), before: fmt(sum(first, "dis") / 12), after: fmt(sum(second, "dis") / 12) };
  brief(4, {
    slug: "disease-killed-eight-to-one", data: ["nightingale", "vega (crimea.json)"],
    question: "British soldiers in the Crimean War, April 1854 to March 1856. For every man who died of wounds, how many died of disease?",
    options: ["About 1", "About 3", "About 8"], answer: 2, pick: () => nearest(d / w, [1, 3, 8]),
    presets: ["Wounds only", "Add disease", "Rate per 1,000 a year", "Before and after March 1855"],
    reveal: "Disease killed {d} men and wounds {w}: about {ratio} to one. In January 1855 disease deaths ran at an annual rate of {peak} per 1,000, more than the whole army in a year. From April 1855, after a sanitary commission arrived, they averaged {after} a month, against {before} in the first year. Where it stops: weather and army size changed too, so this chart alone cannot prove what caused the fall.",
    checks: (v) => {
      ok("4 totals", d === 14476 && w === 1758 && o === 1748, `disease ${fmt(d)}, wounds ${fmt(w)}, other ${fmt(o)}; disease ${r((100 * d) / (d + w + o), 1)}% of ${fmt(d + w + o)}`);
      ok("4 ratio", r(d / w, 2) === 8.23, `${r(d / w, 2)} disease deaths per wound death`);
      ok("4 second copy agrees (vega crimea.json)", sum(C, "disease") === d && sum(C, "wounds") === w && sum(C, "other") === o, "identical totals");
      ok("4 peak rate", peak.date === "1855-01-01" && peak.rate > 1000, `${peak.date}: ${peak.rate} per 1,000 a year (12 x 1000 x ${peak.dis} / ${fmt(peak.army)})`);
      ok("4 first and second year", sum(first, "dis") === 11157 && sum(second, "dis") === 3319, `disease deaths a month: ${v.before} (Apr 1854-Mar 1855) vs ${v.after} (Apr 1855-Mar 1856); disease share ${r((100 * sum(first, "dis")) / (sum(first, "dis") + sum(first, "wou") + sum(first, "oth")), 1)}% -> ${r((100 * sum(second, "dis")) / (sum(second, "dis") + sum(second, "wou") + sum(second, "oth")), 1)}%`);
    },
    recall: { q: "A hospital's deaths fall after a new rule, while winter ends and fewer patients arrive. What can the chart alone tell you?", options: ["The rule caused the fall", "Deaths fell; the cause needs a comparison", "Nothing at all"], answer: 1, pick: () => 1 },
  }, v);
}

// ---------------------------------------------------------------- 5. Minard, the 1812 campaign
{
  const T = csv("minard").map((x) => ({ lon: Number(x.long), n: Number(x.survivors), dir: x.direction, g: Number(x.group) }));
  const g1 = T.filter((x) => x.g === 1), adv = g1.filter((x) => x.dir === "A"), ret = g1.filter((x) => x.dir === "R");
  const start = adv[0].n, moscow = adv.at(-1).n, back = ret.at(-1).n;
  const groupsStart = [1, 2, 3].reduce((s, g) => s + T.find((x) => x.g === g).n, 0);
  const g3end = T.filter((x) => x.g === 3).at(-1).n;
  const temp = csv("minardtemp").map((x) => ({ lon: Number(x.long), t: Number(x.temp), date: x.date }));
  const firstFrost = temp.find((x) => x.t < 0);
  const atFrost = ret.reduce((b, x) => (Math.abs(x.lon - firstFrost.lon) < Math.abs(b.lon - firstFrost.lon) ? x : b));
  const v = { adv: fmt(start - moscow), ret: fmt(moscow - back), start: fmt(groupsStart), end: fmt(back + g3end), k: Math.round(groupsStart / (back + g3end)), frost: fmt(atFrost.n), fdate: `${Number(firstFrost.date.slice(3))} ${{ Oct: "October", Nov: "November", Dec: "December" }[firstFrost.date.slice(0, 3)]}` };
  brief(5, {
    slug: "most-lost-before-moscow", data: ["minard", "minardtemp"],
    question: "Napoleon's main column crossed into Russia with 340,000 men and reached Moscow with 100,000. Did it lose more men advancing or retreating?",
    options: ["Retreating, in winter", "Advancing, before winter", "About the same"], answer: 1, pick: () => (start - moscow > (moscow - back) * 1.2 ? 1 : moscow - back > (start - moscow) * 1.2 ? 0 : 2),
    presets: ["Advance to Moscow", "Retreat", "Minard's temperatures", "All three columns"],
    reveal: "The main column lost {adv} men on the way to Moscow and {ret} on the way back. By the first frost on Minard's chart, {fdate}, only {frost} were left: winter finished an army that was already mostly gone. Of {start} men in all three columns, {end} came back, about 1 in {k}. Where it stops: these are Minard's figures, and \"lost\" counts deaths, desertion, capture and men left behind in garrisons alike.",
    checks: (v) => {
      ok("5 main column", start === 340000 && moscow === 100000 && back === 4000, `${fmt(start)} -> ${fmt(moscow)} at Moscow -> ${fmt(back)} back`);
      ok("5 advance vs retreat", start - moscow === 240000 && moscow - back === 96000, `advance ${v.adv}, retreat ${v.ret} (answer: advancing)`);
      ok("5 first frost", firstFrost.date === "Nov09" && atFrost.n === 37000, `first reading below zero: ${firstFrost.t} on ${firstFrost.date} at ${firstFrost.lon} E; main column at ${atFrost.lon} E: ${fmt(atFrost.n)} (${r((100 * (start - atFrost.n)) / start, 0)}% of the start already lost)`);
      ok("5 all columns", groupsStart === 422000 && back + g3end === 10000, `start ${v.start} (groups 1-3), back ${v.end} (group 1 ${fmt(back)} + group 3 ${fmt(g3end)}): 1 in ${r(groupsStart / (back + g3end), 1)}`);
    },
    recall: { q: "A hiking group loses 6 of 10 members before the storm and 3 more during it. What does 'the storm wrecked the trip' miss?", options: ["Nothing", "Most losses came before the storm", "The storm was mild"], answer: 1, pick: () => (6 > 3 ? 1 : 0) },
  }, v);
}

// ---------------------------------------------------------------- 6. van Langren's longitude estimates
{
  const L = csv("langren").map((x) => ({ name: x.Name, year: Number(x.Year), lon: Number(x.Longitude) }));
  const TRUE = 12.5 - -4.03; // the doc's coordinates for Rome and Toledo
  const sorted = L.map((x) => x.lon).sort((a, b) => a - b);
  const med = (sorted[5] + sorted[6]) / 2;
  const kmPerDeg = 111.32 * Math.cos(((39.86 + 41.89) / 2) * (Math.PI / 180));
  const within2 = L.filter((x) => Math.abs(x.lon - TRUE) <= 2);
  const v = { n: within2.length, med: r(med, 1), km: Math.round(((med - TRUE) * kmPerDeg) / 10) * 10, lo: r(sorted[0], 1), hi: r(sorted[11], 1) };
  brief(6, {
    slug: "rome-placed-too-far-east", data: ["langren"],
    question: "Toledo to Rome is 16.5 degrees of longitude. Twelve astronomers and mapmakers before 1644 estimated it. How many came within 2 degrees?",
    options: ["1 of 12", "About half", "10 of 12"], answer: 0, pick: (v) => (v.n <= 2 ? 0 : v.n <= 8 ? 1 : 2),
    presets: ["Show the true distance", "Closest estimate", "Middle estimate in km", "Sort by year"],
    reveal: "Only {n} of 12 came within 2 degrees, and every one put Rome too far east: the estimates ran from {lo} to {hi} degrees. The middle one was {med}, about {km} km too far. Latitude can be read from the Sun or a star, but longitude needs the difference in local time between two places, which nobody could then measure well. Where it stops: some estimates may copy others, so these are not 12 independent measurements.",
    checks: (v) => {
      ok("6 true distance", r(TRUE, 1) === 16.5, `${r(TRUE, 2)} degrees from the doc's coordinates (Toledo -4.03, Rome 12.5)`);
      ok("6 within 2 degrees", v.n === 1, within2.map((x) => `${x.name} ${x.year}: ${x.lon}`).join("; "));
      ok("6 all too far east", L.every((x) => x.lon > TRUE), `range ${v.lo} to ${v.hi}; mean ${r(L.reduce((s, x) => s + x.lon, 0) / 12, 1)}`);
      ok("6 middle estimate in km", v.med === 25.8 && v.km === 780, `median ${r(med, 2)}: ${r(med - TRUE, 2)} degrees x ${r(kmPerDeg, 1)} km/degree at 40.9 N = ${r((med - TRUE) * kmPerDeg, 0)} km (rounded to 780)`);
      const byYear = [...L].sort((a, b) => a.year - b.year);
      ok("6 no steady improvement by year", byYear.at(-1).lon > byYear[0].lon - 5, `earliest ${byYear[0].name} ${byYear[0].year}: ${byYear[0].lon}; latest ${byYear.at(-1).name} ${byYear.at(-1).year}: ${byYear.at(-1).lon}`);
    },
    recall: { q: "Two clocks: one set to noon where you are, one to noon at your home port. They differ by 2 hours. How far east or west are you?", options: ["2 degrees", "15 degrees", "30 degrees"], answer: 2, pick: () => (2 * 15 === 30 ? 2 : 0) },
  }, v);
}

// ---------------------------------------------------------------- 7. Playfair's wheat and wages
{
  const W = csv("wheat").filter((x) => x.Wages && x.Wages !== "NA").map((x) => ({ y: Number(x.Year), p: Number(x.Wheat), w: Number(x.Wages) }));
  const a = W[0], b = W.find((x) => x.y === 1810);
  const ratio = W.map((x) => ({ ...x, q: x.w / x.p }));
  const best = ratio.reduce((m, x) => (x.q > m.q ? x : m)), worst = ratio.reduce((m, x) => (x.q < m.q ? x : m));
  const v = { p: r(b.p / a.p, 1), w: r(b.w / a.w, 0), r: r(b.w / b.p / (a.w / a.p), 1), best: best.y };
  brief(7, {
    slug: "wages-bought-more-wheat", data: ["wheat"],
    question: "From 1565 to 1810 the price of wheat rose about 2.4 times. Did a mechanic's weekly wage buy more or less wheat in 1810?",
    options: ["Less: about 40% as much", "About the same", "More: about 2.5 times as much"], answer: 2, pick: () => nearest(b.w / b.p / (a.w / a.p), [0.41, 1, 2.5]),
    presets: ["Playfair's chart", "Wages divided by price", "Best year", "Worst year"],
    reveal: "Wheat cost {p} times as much in 1810, but wages rose {w} times, so a week's pay bought {r} times as much wheat. Playfair drew price and wages on two different scales, which hides this ratio; dividing one by the other shows it as one line. On his own figures the best year for wages in wheat was {best}, not the last one. Where it stops: this is one trade's wage and one food, not a cost of living.",
    checks: (v) => {
      ok("7 price and wage", r(b.p / a.p, 2) === 2.41 && b.w / a.w === 6, `wheat ${a.p} -> ${b.p} (x${r(b.p / a.p, 2)}); wages ${a.w} -> ${b.w} (x${b.w / a.w})`);
      ok("7 wheat per week's wage", r(b.w / b.p / (a.w / a.p), 2) === 2.48, `${r(a.w / a.p, 3)} -> ${r(b.w / b.p, 3)} quarters a week: x${r(b.w / b.p / (a.w / a.p), 2)}`);
      ok("7 best and worst", best.y === 1785 && worst.y === 1595, `best ${best.y} (${r(best.q, 3)}), worst ${worst.y} (${r(worst.q, 3)}); wages stop at ${W.at(-1).y}`);
    },
    recall: { q: "Your pay doubles while rent triples. Can you afford more rent or less?", options: ["More", "The same", "Less: about two-thirds as much"], answer: 2, pick: () => (2 / 3 < 1 ? 2 : 0) },
  }, v);
}

// ---------------------------------------------------------------- 8. London 1665
{
  const A = Object.fromEntries(csv("arbuthnot").map((x) => [Number(x.Year), { pl: Number(x.Plague), m: Number(x.Mortality), c: Number(x.Males) + Number(x.Females) }]));
  const x = A[1665].m / A[1664].m;
  const v = { b1665: fmt(A[1665].m), x: r(x, 1), pp: Math.round((100 * A[1665].pl) / A[1665].m), c: fmt(A[1665].c), k: Math.round(A[1665].m / A[1665].c), b1666: fmt(A[1666].m) };
  brief(8, {
    slug: "london-buried-six-times-more", data: ["arbuthnot"],
    question: "London's Bills of Mortality recorded 15,453 burials in 1664. In 1665, the year of the Great Plague, about how many?",
    options: ["About 30,000", "About 100,000", "About 300,000"], answer: 1, pick: () => nearest(A[1665].m, [30000, 100000, 300000]),
    presets: ["1664", "1665", "Plague's share", "1636, an earlier outbreak", "Christenings that year"],
    reveal: "London recorded {b1665} burials in 1665, {x} times the year before, and {pp}% were put down to plague. Christenings that year were {c}, so the city buried about {k} people for every child christened. A year later, burials were back to {b1666}. Where it stops: these are recorded burials and recorded causes, not a count of every death or a doctor's diagnosis.",
    checks: (v) => {
      ok("8 1664 and 1665", A[1664].m === 15453 && A[1665].m === 97306, `burials ${fmt(A[1664].m)} -> ${fmt(A[1665].m)}: x${r(x, 2)}`);
      ok("8 plague share 1665", v.pp === 70, `${fmt(A[1665].pl)} plague of ${fmt(A[1665].m)} = ${r((100 * A[1665].pl) / A[1665].m, 1)}%`);
      ok("8 burials per christening", v.k === 10, `${fmt(A[1665].m)} / ${fmt(A[1665].c)} = ${r(A[1665].m / A[1665].c, 1)} (1664: ${r(A[1664].m / A[1664].c, 1)})`);
      ok("8 1636 outbreak", A[1636].pl === 10400, `1636: ${fmt(A[1636].pl)} plague of ${fmt(A[1636].m)} (${r((100 * A[1636].pl) / A[1636].m, 1)}%); 1666: ${fmt(A[1666].m)}`);
    },
    recall: { q: "A town normally records 100 deaths a year. One year it records 600, and 450 of those from one cause. What share is that cause?", options: ["About 45%", "75%", "About 90%"], answer: 1, pick: () => (450 / 600 === 0.75 ? 1 : 0) },
  }, v);
}

// ---------------------------------------------------------------- 9. Britain's share of fossil CO2 (OWID)
{
  const C = csvq(pathOf("co2")).filter((x) => x.co2 !== "");
  const at = (c, y) => Number(C.find((x) => x.country === c && x.year === String(y))?.co2 ?? NaN);
  const sh = (c, y) => (100 * at(c, y)) / at("World", y);
  const rank = (y) => C.filter((x) => x.year === String(y) && /^[A-Z]{3}$/.test(x.iso_code)).map((x) => [x.country, Number(x.co2)]).sort((a, b) => b[1] - a[1]);
  const v = { uk: Math.round(sh("United Kingdom", 1850)), uk1900: Math.round(sh("United Kingdom", 1900)), g: Math.round(at("World", 1900) / at("World", 1850)) };
  brief(9, {
    slug: "britain-made-most-co2-in-1850", data: ["co2"],
    question: "In 1850, what share of the world's carbon dioxide from burning fossil fuels came from Britain?",
    options: ["About 5%", "About 25%", "About 60%"], answer: 2, pick: () => nearest(sh("United Kingdom", 1850), [5, 25, 60]),
    presets: ["1800", "1850", "1900", "1950", "Tonnes, not shares"],
    reveal: "In 1850 Britain produced {uk}% of the world's fossil-fuel CO2. By 1900 its share had fallen to {uk1900}% as the United States, Germany and others burned more coal, and world emissions had grown {g} times. A falling share can hide a rising total. Where it stops: these figures are rebuilt from records of coal and other fuels, and early years are the roughest.",
    checks: (v) => {
      ok("9 1850 share", v.uk === 62, `UK ${r(at("United Kingdom", 1850), 1)} of world ${r(at("World", 1850), 1)} Mt = ${r(sh("United Kingdom", 1850), 1)}%; top five ${rank(1850).slice(0, 5).map(([c, x]) => `${c} ${r((100 * x) / at("World", 1850), 1)}%`).join(", ")}`);
      ok("9 1800 and 1900", Math.round(sh("United Kingdom", 1800)) === 96 && v.uk1900 === 21 && rank(1900)[0][0] === "United States", `1800 ${r(sh("United Kingdom", 1800), 1)}%; 1900 ${r(sh("United Kingdom", 1900), 1)}% (largest: ${rank(1900)[0][0]} ${r((100 * rank(1900)[0][1]) / at("World", 1900), 1)}%)`);
      ok("9 1950", Number.isFinite(sh("United Kingdom", 1950)), `UK ${r(sh("United Kingdom", 1950), 1)}%; world 1850 -> 1900 x${r(at("World", 1900) / at("World", 1850), 1)}`);
      ok("9 tonnes rise while share falls", at("United Kingdom", 1900) > at("United Kingdom", 1850), `UK ${r(at("United Kingdom", 1850), 0)} -> ${r(at("United Kingdom", 1900), 0)} Mt`);
    },
    recall: { q: "One town makes 9 of 10 bicycles in a region. Fifty years later it makes twice as many, but the region makes ten times as many. Its share?", options: ["Still about 90%", "About 18%", "About 45%"], answer: 1, pick: () => nearest((9 * 2) / (10 * 10) * 100, [90, 18, 45]) },
  }, v);
}

// ---------------------------------------------------------------- 10. Old maps of the Great Lakes, 1688-1818
{
  const O = csv("oldmaps").filter((x) => x.lat !== "NA" && x.long !== "NA");
  const act = Object.fromEntries(O.filter((x) => x.name === "Actual").map((x) => [x.point, [Math.abs(Number(x.lat)), Math.abs(Number(x.long))]]));
  const maps = {};
  for (const x of O.filter((x) => x.name !== "Actual")) {
    const [la, lo] = act[x.point];
    const k = `${x.name} ${x.year}`;
    (maps[k] ??= []).push({ ns: Math.abs(Math.abs(Number(x.lat)) - la) * 111.32, ew: Math.abs(Math.abs(Number(x.long)) - lo) * 111.32 * Math.cos((la * Math.PI) / 180) });
  }
  const mean = (a, k) => a.reduce((s, x) => s + x[k], 0) / a.length;
  const c = maps["Coronelli 1688"], m = maps["Melish 1818"];
  const ewWorse = Object.entries(maps).filter(([, e]) => mean(e, "ew") > mean(e, "ns")).length;
  const v = { lat: Math.round(mean(c, "ns") / 10) * 10, lon: Math.round(mean(c, "ew") / 10) * 10, lon1818: Math.round(mean(m, "ew") / 10) * 10, n: ewWorse };
  brief(10, {
    slug: "lakes-misplaced-east-west", data: ["oldmaps"],
    question: "Coronelli's 1688 map of the Great Lakes misplaced 39 known points. Which error was bigger, in kilometres: north-south or east-west?",
    options: ["North-south", "East-west", "About equal"], answer: 1, pick: () => (mean(c, "ew") > 1.5 * mean(c, "ns") ? 1 : mean(c, "ns") > 1.5 * mean(c, "ew") ? 0 : 2),
    presets: ["Coronelli 1688", "Popple 1733", "Mitchell 1755", "Melish 1818", "Errors in km"],
    reveal: "On Coronelli's map the points were on average about {lat} km off north-south but {lon} km off east-west. By Melish's map of 1818 the east-west error was down to about {lon1818} km. East-west was the worse error on {n} of the 11 maps. Latitude can be taken from the height of the Sun or a star, while longitude needs a time difference. Where it stops: each map's 39 points were read off by hand.",
    checks: (v) => {
      ok("10 Coronelli 1688", r(mean(c, "ew") / mean(c, "ns"), 1) > 5, `north-south ${r(mean(c, "ns"), 0)} km, east-west ${r(mean(c, "ew"), 0)} km (x${r(mean(c, "ew") / mean(c, "ns"), 1)})`);
      ok("10 Melish 1818", mean(m, "ew") < mean(c, "ew") / 5, `north-south ${r(mean(m, "ns"), 0)} km, east-west ${r(mean(m, "ew"), 0)} km`);
      console.log(Object.entries(maps).map(([k, e]) => `     ${k}: N-S ${r(mean(e, "ns"), 0)} km, E-W ${r(mean(e, "ew"), 0)} km`).join("\n"));
      ok("10 maps where east-west is worse", v.n >= 7, `${v.n} of ${Object.keys(maps).length}`);
    },
    recall: { q: "A sailor in 1700 knows her latitude exactly but her clock is 20 minutes wrong. Which way is her position uncertain?", options: ["North-south", "East-west, by 5 degrees", "Neither"], answer: 1, pick: () => ((20 / 60) * 15 === 5 ? 1 : 0) },
  }, v);
}

// ---------------------------------------------------------------- 11. Disaster deaths, 1900-2017 (EM-DAT via OWID, vega-datasets)
{
  const R = fs.readFileSync(vegaFile("disasters.csv"), "utf8").trim().split("\n").slice(1).map((l) => { const [e, y, d] = l.split(","); return { e, y: Number(y), d: Number(d) }; });
  const all = Object.fromEntries(R.filter((x) => x.e === "All natural disasters").map((x) => [x.y, x.d]));
  const avg = (a, b) => { const ys = Object.keys(all).map(Number).filter((y) => y >= a && y <= b); return { n: ys.length, m: ys.reduce((s, y) => s + all[y], 0) / ys.length }; };
  const s20 = avg(1920, 1929), s10 = avg(2010, 2017);
  const P = Object.fromEntries(fs.readFileSync(pathOf("gmpop"), "utf8").trim().split("\n").slice(1).map((l) => { const [, t, p] = l.split(","); return [Number(t), Number(p)]; }));
  const pop20 = P[1925], pop10 = P[2014];
  const perM20 = s20.m / (pop20 / 1e6), perM10 = s10.m / (pop10 / 1e6);
  const types = [...new Set(R.map((x) => x.e))].filter((e) => e !== "All natural disasters");
  const t20 = types.map((t) => [t, R.filter((x) => x.e === t && x.y >= 1920 && x.y <= 1929).reduce((s, x) => s + x.d, 0)]).sort((a, b) => b[1] - a[1]);
  const maxYear = Object.entries(all).reduce((b, e) => (e[1] > b[1] ? e : b));
  const v = { a: fmt(Math.round(s20.m / 10000) * 10000), b: fmt(Math.round(s10.m / 1000) * 1000), x: Math.round(s20.m / s10.m), pop: r(pop10 / pop20, 1), pm: Math.round(perM20 / perM10), maxyear: maxYear[0], maxdeaths: `${r(maxYear[1] / 1e6, 1)} million` };
  brief(11, {
    slug: "disaster-deaths-fell", data: ["vega (disasters.csv)", "gmpop"],
    question: "Natural disasters killed about 870,000 people a year worldwide in the 1920s. About how many a year in 2010 to 2017?",
    options: ["About 1.5 million", "About 500,000", "About 60,000"], answer: 2, pick: () => nearest(s10.m, [1.5e6, 5e5, 6e4]),
    presets: ["1920s", "2010 to 2017", "Per million people", "By type", "Biggest single year"],
    reveal: "In the 1920s disasters killed about {a} people a year; in 2010 to 2017 about {b}, {x} times fewer, while the world's population grew {pop} times. Per person, that is about {pm} times fewer. Most of the 1920s deaths were recorded under drought and epidemics. Where it stops: early records are less complete, and one year can swing a decade: {maxyear} alone recorded {maxdeaths}. This counts deaths, not how many disasters happened.",
    checks: (v) => {
      ok("11 1920s", s20.n === 10 && Math.round(s20.m) === 872629, `${s20.n} years, mean ${fmt(s20.m)} a year`);
      ok("11 2010-2017", s10.n === 8 && Math.round(s10.m) === 56869, `${s10.n} years, mean ${fmt(s10.m)} a year (answer: about 60,000)`);
      ok("11 ratio and per person", v.x === 15 && v.pm >= 50 && v.pm <= 65, `x${r(s20.m / s10.m, 1)} in deaths; population ${r(pop20 / 1e9, 2)} bn (1925) -> ${r(pop10 / 1e9, 2)} bn (2014), x${r(pop10 / pop20, 2)}; per million people ${r(perM20, 0)} -> ${r(perM10, 1)}: x${r(perM20 / perM10, 0)}`);
      // Drafted as "droughts and floods"; the data say drought and epidemics (EM-DAT counts epidemics as natural disasters).
      ok("11 1920s by type", t20[0][0] === "Drought" && t20[1][0] === "Epidemic", t20.slice(0, 4).map(([t, d]) => `${t} ${fmt(d)}`).join("; ") + ` (drought + epidemic = ${r((100 * (t20[0][1] + t20[1][1])) / (s20.m * 10), 0)}% of the decade)`);
      const t31 = types.map((t) => [t, R.find((x) => x.e === t && x.y === 1931)?.d ?? 0]).sort((a, b) => b[1] - a[1])[0];
      ok("11 1931 by type", t31[0] === "Flood", `1931: ${t31[0]} ${fmt(t31[1])}`);
      ok("11 biggest year", maxYear[0] === "1931", `${maxYear[0]}: ${fmt(maxYear[1])}`);
      ok("11 world totals only", !R.some((x) => /China|India|Russia/.test(x.e)), "the file has world totals by type, no country: the lesson names none");
    },
    recall: { q: "Deaths from a cause fell from 100 to 50 a year while the population doubled. Per person, the risk fell to about what?", options: ["Half", "A quarter", "The same"], answer: 1, pick: () => (50 / 2 / 100 === 0.25 ? 1 : 0) },
  }, v);
}

// ---------------------------------------------------------------- 12. The Mongol Empire in 1279 (historical-basemaps) vs Russia today (Natural Earth)
{
  const R = 6371.0088;
  const area = (f) => { const g = f.geometry; if (!g) return 0; const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates; let a = 0; for (const p of polys) { let x = geoArea({ type: "Polygon", coordinates: p }); if (x > 2 * Math.PI) x = 4 * Math.PI - x; a += x; } return a * R * R; };
  const B = JSON.parse(fs.readFileSync(pathOf("basemap1279"), "utf8")).features;
  const mong = B.filter((f) => f.properties.SUBJECTO === "Mongol Empire");
  const CORE = ["Great Khanate", "Khanate of the Golden Horde", "Ilkhanate", "Chagatai Khanate"];
  const core = mong.filter((f) => CORE.includes(f.properties.NAME));
  const vassals = mong.filter((f) => !CORE.includes(f.properties.NAME));
  const aCore = core.reduce((s, f) => s + area(f), 0), aAll = mong.reduce((s, f) => s + area(f), 0);
  const ne = JSON.parse(fs.readFileSync(pathOf("necountries"), "utf8"));
  const countries = topo.feature(ne, ne.objects.countries).features;
  const ru = countries.find((f) => f.properties.name === "Russia"), ant = countries.find((f) => f.properties.name === "Antarctica");
  const land = JSON.parse(fs.readFileSync(pathOf("neland"), "utf8"));
  const lf = topo.feature(land, land.objects.land);
  const aLand = (lf.features ?? [lf]).reduce((s, f) => s + area(f), 0) - area(ant);
  const aRu = area(ru);
  const v = { core: r(aCore / 1e6, 1), r: r(aCore / aRu, 1), rv: r(aAll / aRu, 1), ru8: Math.round(aLand / aRu) };
  brief(12, {
    slug: "khanates-outsize-russia", data: ["basemap1279", "necountries", "neland"],
    question: "Russia, today's largest country, covers about 1 in {ru8} of Earth's land outside Antarctica. How did the Mongol khanates of 1279 compare?",
    options: ["Smaller than Russia", "About the same", "About 1.4 times as big"], answer: 2, pick: () => (aCore / aRu > 1.2 ? 2 : aCore / aRu > 0.85 ? 1 : 0),
    presets: ["The four khanates, 1279", "Add states that paid tribute", "Russia today", "How precise are these borders?"],
    reveal: "On this 1279 map the four Mongol khanates cover about {core} million km², {r} times today's Russia, or {rv} times if you count the states that paid them tribute. Which lands count as the empire is a choice the mapmaker made, and every border on this 1279 map is marked approximate. Where it stops: the map's own makers call it work in progress, so treat these areas as rough.",
    checks: (v) => {
      ok("12 khanates", core.length === 4 && r(aCore / 1e6, 1) === 22.9, core.map((f) => `${f.properties.NAME} ${r(area(f) / 1e6, 2)}`).join("; ") + ` = ${r(aCore / 1e6, 2)} million km2`);
      ok("12 tributaries", vassals.length === 4, vassals.map((f) => `${f.properties.NAME} ${r(area(f) / 1e6, 2)}`).join("; ") + ` (all ${r(aAll / 1e6, 2)})`);
      ok("12 Russia today", r(aRu / 1e6, 1) >= 16.5 && r(aRu / 1e6, 1) <= 17.2, `Natural Earth 1:50m Russia ${r(aRu / 1e6, 2)} million km2 = ${r((100 * aRu) / aLand, 1)}% of land outside Antarctica (${r(aLand / 1e6, 1)} million): 1 in ${r(aLand / aRu, 1)}`);
      ok("12 ratios", v.r === 1.4 && v.rv === 1.6, `khanates / Russia ${r(aCore / aRu, 2)}; with tributaries ${r(aAll / aRu, 2)}; khanates ${r((100 * aCore) / aLand, 1)}% of land outside Antarctica`);
      ok("12 precision", mong.every((f) => f.properties.BORDERPRECISION === 1), "every Mongol polygon has BORDERPRECISION 1 (approximate)");
      ok("12 equal-area", true, "areas on the sphere (d3-geo geoArea, R = 6,371 km); the stage must use an equal-area projection (geography:equal-area-vs-conformal)");
    },
    recall: { q: "Two maps of the same empire differ by a third in area. Both are carefully drawn. What most likely differs?", options: ["One is wrong", "Which lands each counts as part of the empire", "The size of the Earth"], answer: 1, pick: () => 1 },
  }, v);
}

// ---------------------------------------------------------------- notes (supports the cholera-1849-elevation boundary in the curriculum; not a brief)
if (!want) {
  console.log("\n== notes: Farr's 1849 London districts (cholera-1849-elevation, not briefed)");
  const F = csvq(pathOf("cholera")).map((x) => ({ e: Number(x.elevation), d: Number(x.cholera_drate), w: x.water }));
  const corr = (rs) => { const n = rs.length, mx = rs.reduce((s, x) => s + x.e, 0) / n, my = rs.reduce((s, x) => s + x.d, 0) / n; const c = rs.reduce((s, x) => s + (x.e - mx) * (x.d - my), 0); return c / Math.sqrt(rs.reduce((s, x) => s + (x.e - mx) ** 2, 0) * rs.reduce((s, x) => s + (x.d - my) ** 2, 0)); };
  const sup = [...new Set(F.map((x) => x.w))];
  const within = sup.map((w) => [w, F.filter((x) => x.w === w)]);
  ok("notes elevation still predicts within each supplier", within.every(([, rs]) => corr(rs) < -0.4), `all ${F.length} districts r = ${r(corr(F), 2)}; ` + within.map(([w, rs]) => `${w} (${rs.length}) r = ${r(corr(rs), 2)}, mean ${r(rs.reduce((s, x) => s + x.d, 0) / rs.length, 1)} per 10,000`).join("; "));
}

console.log(fail ? `\n${fail} check(s) FAILED` : "\nall checks pass");
process.exit(fail ? 1 : 0);
