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
    mean.adds = rows[0].adds;
    out[name] = mean;
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const res = runArms();
  if (process.argv.includes("--json")) console.log(JSON.stringify(res, null, 2));
  else {
    const cols = [["shipped", 0], ["tokensPerShipped", -3, "k tok/item"], ["leadP50h", 1], ["leadP90h", 1], ["founderPerShipped", 2], ["escapedPerShipped", 3], ["reworkPerShipped", 2], ["measureError", 2, "meas err"], ["dupRuns", 1], ["violations", 1], ["unrecovered", 1], ["recoverMeanMin", 0, "recover min"]];
    if (process.argv.includes("--waits")) cols.splice(0, cols.length, ["leadP50h", 1], ...["build", "check", "uat", "approval", "ship"].map((k) => [`wait_${k}_h`, 2, `wait ${k}`]));
    console.log(["arm".padEnd(26), ...cols.map(([k, , h]) => (h ?? k).slice(0, 11).padStart(12))].join(""));
    for (const [n, m] of Object.entries(res)) console.log([n.padEnd(26), ...cols.map(([k, d]) => (d < 0 ? (m[k] / 1000).toFixed(0) : m[k].toFixed(d)).padStart(12))].join(""));
  }
}
