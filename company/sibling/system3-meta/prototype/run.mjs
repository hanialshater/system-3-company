#!/usr/bin/env node
// node run.mjs [--seeds=20] [--json]: runs every arm on the same seeds and prints the mean of each measure.
import { simulate, summarize } from "./sim.mjs";
import { DEFAULT_CONFIG } from "./lib.mjs";

const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split("=")[1] ?? d;
const SEEDS = Number(arg("seeds", 20));
const OFF = Object.fromEntries(Object.keys(DEFAULT_CONFIG).map((k) => [k, false]));
export const ARMS = {
  current: { config: OFF },
  engine: { config: DEFAULT_CONFIG },
  ...Object.fromEntries(Object.keys(DEFAULT_CONFIG).map((k) => [`engine-no-${k}`, { config: { ...DEFAULT_CONFIG, [k]: false } }])),
  "engine+wbr": { config: DEFAULT_CONFIG, params: { iterate: true } },
};

export function runArms(arms = ARMS, seeds = SEEDS, extra = {}) {
  const out = {};
  for (const [name, a] of Object.entries(arms)) {
    const rows = [];
    for (let s = 1; s <= seeds; s++) rows.push(summarize(simulate({ config: a.config, seed: s, params: { ...extra, ...a.params } })));
    const mean = {};
    for (const k of Object.keys(rows[0])) if (typeof rows[0][k] === "number") mean[k] = rows.reduce((x, r) => x + r[k], 0) / rows.length;
    const addCounts = {};
    for (const r of rows) for (const id of r.adds) addCounts[id.split("-")[0]] = (addCounts[id.split("-")[0]] ?? 0) + 1;
    mean.adds = Object.entries(addCounts).map(([k, n]) => `${k}:${(n / rows.length).toFixed(1)}`);
    out[name] = mean;
  }
  return out;
}

const FIVE = [9 * 60, 11 * 60, 13 * 60, 15 * 60, 18 * 60];
export const ITERATION2 = {
  engine: { config: DEFAULT_CONFIG },
  "2a measure fix": { config: DEFAULT_CONFIG, params: { recordLostUsage: true } },
  "2b 5 sittings": { config: DEFAULT_CONFIG, params: { sittings: FIVE } },
  "2c wbr 30 min": { config: DEFAULT_CONFIG, params: { iterate: true, wbrWaitMin: 30 } },
  "2d all three": { config: DEFAULT_CONFIG, params: { recordLostUsage: true, sittings: FIVE, iterate: true, wbrWaitMin: 30 } },
};

export const ITERATION3 = {
  "2d all three": ITERATION2["2d all three"],
  "3a code-first test1": { config: DEFAULT_CONFIG, params: { ...ITERATION2["2d all three"].params, mechShare: 0.7 } },
};

const I4 = { ...ITERATION2["2d all three"].params, tokenModel: "session", waveSizeRange: [4, 20], leaseWake: true, ritualTokensPerPosition: 55_000 };
export const ITERATION4 = {
  "4a one per run": { config: DEFAULT_CONFIG, params: { ...I4, drainCap: 1 } },
  "4b drain 3": { config: DEFAULT_CONFIG, params: { ...I4, drainCap: 3 } },
  "4c drain 5": { config: DEFAULT_CONFIG, params: { ...I4, drainCap: 5 } },
  "4d drain 3+priority": { config: DEFAULT_CONFIG, params: { ...I4, drainCap: 3, priorityMix: { now: 0.1, later: 0.6, laterDueMin: 480 } } },
  "4e drain 3+progress WBR": { config: DEFAULT_CONFIG, params: { ...I4, drainCap: 3, wbrClock: "progress" } },
};

const I5 = { ...I4, drainCap: 3 };
const V2 = { revisionPriority: "later", revisionDueMin: 30, batchLater: 2 };
export const ITERATION5 = {
  "5a busy v1": { config: DEFAULT_CONFIG, params: { ...I5 } },
  "5b busy v2": { config: DEFAULT_CONFIG, params: { ...I5, policy: V2 } },
  "5c quiet v1": { config: DEFAULT_CONFIG, params: { ...I5, waveSizeRange: [2, 6] } },
  "5d quiet v2": { config: DEFAULT_CONFIG, params: { ...I5, waveSizeRange: [2, 6], policy: V2 } },
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const it = arg("iteration", "1");
  const res = runArms(it === "5" ? ITERATION5 : it === "4" ? ITERATION4 : it === "3" ? ITERATION3 : it === "2" ? ITERATION2 : ARMS);
  if (process.argv.includes("--json")) console.log(JSON.stringify(res, null, 2));
  else {
    const cols = [["shipped", 0], ["tokensPerShipped", -3, "k tok/item"], ["leadP50h", 1], ["leadP90h", 1], ["founderPerShipped", 2], ["escapedPerShipped", 3], ["reworkPerShipped", 2], ["measureError", 2, "meas err"], ["dupRuns", 1], ["violations", 1], ["unrecovered", 1], ["recoverMeanMin", 0, "recover min"], ["adds", null]];
    if (process.argv.includes("--i4")) cols.splice(0, cols.length, ["shipped", 0], ["tokensPerShipped", -3, "k tok/item"], ["leadP50h", 1], ["leadP90h", 1], ["leadP50h_now", 1, "p50 now"], ["leadP50h_next", 1, "p50 next"], ["leadP50h_later", 1, "p50 later"], ["itemsPerSession", 2, "items/sess"], ["maxPromoteLateMin", 1, "promo late"], ["wbrs", 1], ["wbrPerDayBusy", 2, "wbr/d busy"], ["wbrPerDayQuiet", 2, "wbr/d quiet"], ["staffingRefused", 1, "staff refused"], ["escapedPerShipped", 3], ["dupRuns", 1], ["violations", 1], ["unrecovered", 1], ["recoverMeanMin", 0, "recover min"]);
    if (process.argv.includes("--waits")) cols.splice(0, cols.length, ["leadP50h", 1], ...["build", "check", "uat", "approval", "ship"].map((k) => [`wait_${k}_h`, 2, `wait ${k}`]));
    console.log(["arm".padEnd(26), ...cols.map(([k, , h]) => (h ?? k).slice(0, 11).padStart(12))].join(""));
    for (const [n, m] of Object.entries(res)) console.log([n.padEnd(26), ...cols.map(([k, d]) => (d === null ? (m[k] ?? []).join(",") || "-" : d < 0 ? (m[k] / 1000).toFixed(0) : m[k].toFixed(d)).padStart(12))].join(""));
  }
}
