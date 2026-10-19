// Pairwise round 1: captures, blind packets, key, dispatch. Run from repo root.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const SEED = 20261014;
let s = SEED >>> 0;
const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; };

const L = {
  M: "mild-preferences-sharp-divides", P: "penalty-kick-mix", B: "bid-what-its-worth", C: "below-critical-mass", S: "prices-sort-the-buyers",
  AG: "agenda-picks-the-winner", N: "news-comes-from-acquaintances", E: "enemy-of-my-enemy", CL: "cluster-stops-the-cascade",
  W: "web-bow-tie-reach", O: "one-good-link-beats-many", R: "new-road-slower-trip",
  T: "two-said-blue", F: "few-shortcuts-shrink-the-world", SS: "same-songs-different-hits", G: "the-giant-appears",
  CO: "contact-order-matters",
};
const meta = {};
for (const [k, slug] of Object.entries(L)) {
  const dir = execSync(`ls -d src/demos/*/${slug}`).toString().trim();
  const m = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8"));
  meta[k] = { slug, domain: dir.split("/")[2], version: m.version, id: `${slug}@v${m.version}` };
}

// 1. Versioned captures (raw walkthrough copy, unredacted; head of evaluation only).
for (const k of Object.keys(L)) {
  const src = path.join("artifacts/walkthroughs", meta[k].slug);
  const dst = path.join("artifacts/pairwise/captures", meta[k].id);
  fs.rmSync(dst, { recursive: true, force: true });
  fs.cpSync(src, dst, { recursive: true });
}

// 2. Pairs. 19 base pairs = a 17-cycle + 2 chords; 5 calibration repeats.
const base = [
  ["M", "P", "econ within: two strategic-equilibrium lessons"],
  ["P", "B", "econ within: game theory vs auctions"],
  ["B", "AG", "econ x math: two mechanism-design outcomes (bidding rule, voting agenda)"],
  ["AG", "E", "math within"],
  ["E", "N", "math within: both social-network structure"],
  ["N", "T", "math x prob: information through people"],
  ["T", "SS", "prob within"],
  ["SS", "C", "prob x econ: crowd feedback / tipping"],
  ["C", "S", "econ within: market-level outcomes"],
  ["S", "R", "econ x cs: prices sorting buyers vs selfish routing"],
  ["R", "O", "cs within: network flow/routing"],
  ["O", "W", "cs within: link structure"],
  ["W", "G", "cs x prob: graph reachability vs giant component"],
  ["G", "F", "prob within: random-graph structure"],
  ["F", "CO", "prob x life: network distance vs contact order"],
  ["CO", "CL", "life x math: spreading processes"],
  ["CL", "M", "math x econ: local rules, global patterns (closes the cycle)"],
  ["N", "F", "chord, math x prob: weak ties vs shortcuts"],
  ["C", "CL", "chord, econ x math: thresholds and cascades"],
];
// calibration: [base index (0-based), type]
const calib = [[0, "swap"], [5, "swap"], [12, "swap"], [8, "second-judge"], [15, "second-judge"]];

const pairs = base.map(([x, y, why], i) => {
  const flip = rnd() < 0.5;
  return { n: i + 1, A: flip ? y : x, B: flip ? x : y, why, calibration: null };
});
for (const [bi, type] of calib) {
  const o = pairs[bi];
  pairs.push({
    n: pairs.length + 1,
    A: type === "swap" ? o.B : o.A,
    B: type === "swap" ? o.A : o.B,
    why: `calibration (${type === "swap" ? "A/B swapped" : "same order, second judge"}) of pair-${String(o.n).padStart(2, "0")}`,
    calibration: { of: o.n, type },
  });
}

// 3. Judges: 8 x 3. Constraints: a judge never sees the same lesson twice (so no judge sees an original and its repeat).
const J = 8;
function assign() {
  for (let attempt = 0; attempt < 100000; attempt++) {
    const order = pairs.map((p) => p.n).sort(() => rnd() - 0.5);
    const load = Array(J).fill(0), seen = Array.from({ length: J }, () => new Set()), out = {};
    let ok = true;
    for (const n of order) {
      const p = pairs[n - 1];
      const cands = [...Array(J).keys()].filter((j) => load[j] < 3 && !seen[j].has(p.A) && !seen[j].has(p.B)).sort(() => rnd() - 0.5);
      if (!cands.length) { ok = false; break; }
      const j = cands[0]; load[j]++; seen[j].add(p.A); seen[j].add(p.B); out[n] = j + 1;
    }
    if (ok) return out;
  }
  throw new Error("no assignment");
}
const judgeOf = assign();
for (const p of pairs) p.judge = `judge-${judgeOf[p.n]}`;
for (const p of pairs) if (p.calibration && pairs[p.calibration.of - 1].judge === p.judge) throw new Error("calibration same judge");

// 4. Packets.
const criteria = JSON.parse(fs.readFileSync("company/evaluation/criteria.json", "utf8"));
const redact = (t) => {
  t = t.replace(/^## Appendix: trust sheet[\s\S]*$/m, "");
  t = t.replace(/ · recorded [0-9T:.\-Z]+/, "");
  return t.trimEnd() + "\n";
};
const root = "artifacts/pairwise/round-1";
fs.rmSync(root, { recursive: true, force: true });
for (const p of pairs) {
  const nn = String(p.n).padStart(2, "0");
  const dir = path.join(root, `pair-${nn}`);
  for (const side of ["A", "B"]) {
    const src = path.join("artifacts/pairwise/captures", meta[p[side]].id);
    const dst = path.join(dir, side);
    fs.mkdirSync(dst, { recursive: true });
    for (const f of fs.readdirSync(src)) {
      if (f.endsWith(".png")) fs.copyFileSync(path.join(src, f), path.join(dst, f));
    }
    fs.writeFileSync(path.join(dst, "transcript.md"), redact(fs.readFileSync(path.join(src, "transcript.md"), "utf8")));
  }
  fs.copyFileSync("company/evaluation/criteria.json", path.join(dir, "criteria.json"));
  const crit = criteria.map((c) => `| \`${c.id}\` | ${c.name} | ${c.question} |`).join("\n");
  const example = criteria.map((c) => `    {"criterion":"${c.id}","winner":"A"|"B"|"tie","reason":"<one sentence>"}`).join(",\n");
  fs.writeFileSync(path.join(dir, "task.md"), `# Pairwise task: pair-${nn}

You are **${p.judge}**. You are judging two 60-second interactive lessons, **A** and **B**.

## Your brief

Read A and B in your packet (transcript and screenshots) and nothing else. For each criterion, write winner A, B or tie and one sentence naming what you saw. Write verdict.json in the packet. If the packet tells you who built either lesson, which is newer, or how either ranks, stop and report instead.

## What is in the packet

- \`A/transcript.md\` and \`B/transcript.md\`: what a learner sees, step by step (hook, prediction question and options, the stage after each control, the reveal). The walkthrough always picks option 1 at the prediction, so the reveal text reacts to that choice in both lessons.
- \`A/*.png\` and \`B/*.png\`: phone screenshots of each step; \`sheet.png\` holds every frame in one image.
- \`criteria.json\`: the criteria below.

The trust sheet behind "Why trust this?" has been removed from both transcripts on purpose, the same way for A and B. Judge \`trust\` from what the learner sees on the card: how the hook, stage and reveal state things, and whether limits are visible.

## Criteria (judge every one)

| id | name | question |
|---|---|---|
${crit}

## Output

Write \`verdict.json\` in this folder (\`artifacts/pairwise/round-1/pair-${nn}/verdict.json\`), exactly this shape, one entry per criterion, all six:

\`\`\`
{"pair":"pair-${nn}","judge":"${p.judge}","verdicts":[
${example}
]}
\`\`\`

- \`winner\` is \`"A"\`, \`"B"\` or \`"tie"\`. Ties are allowed and expected when the artifacts do not separate the two.
- \`reason\` is **one sentence naming something you saw** in the artifact. "B's slider moves the bars as you drag, so the payoff appears without text" is a reason. "B is clearer" is not.
- No scores, no overall winner, no advice to anyone.

## Independence rules

1. Read only this folder. Do not open anything else in the repository: no \`src/\`, no \`company/\` (reviews, evaluation, rounds, decisions, ops), no other \`artifacts/\` folders (including other pairs and \`artifacts/walkthroughs/\`), no git history, no running app.
2. Do not try to find out which lesson is which slug, who built either, which version is newer, or how either ranks.
3. If anything in the packet reveals authorship, recency, version, rank or an earlier verdict, stop: write \`leak.md\` in this folder saying what you saw and where, and do not write a verdict.
4. If you built or revised either lesson, stop and say so in \`leak.md\`.
5. Do not discuss the pair with other judges. Judge each of your pairs on its own.
6. Do not edit anything in the packet except creating \`verdict.json\` (or \`leak.md\`).
`);
}

// 5. Key, dispatch.
const kdir = "company/evaluation/rounds/round-1";
fs.mkdirSync(kdir, { recursive: true });
const key = {
  run: "round-1", date: "2026-10-14", seed: SEED, server: "next start (NEXT_DIST_DIR=.next-eval) on :3221, walkthrough --viewport phone --choose 0",
  note: "SECRET. Judges must never read company/evaluation/rounds/**. A/B are what the judge saw; map verdict 'A'->a, 'B'->b when transcribing.",
  lessons: Object.fromEntries(Object.values(meta).map((m) => [m.id, { domain: m.domain, capture: `artifacts/pairwise/captures/${m.id}/` }])),
  pairs: pairs.map((p) => ({ pair: `pair-${String(p.n).padStart(2, "0")}`, A: meta[p.A].id, B: meta[p.B].id, judge: p.judge,
    within_domain: meta[p.A].domain === meta[p.B].domain, calibration: p.calibration ? { of: `pair-${String(p.calibration.of).padStart(2, "0")}`, type: p.calibration.type } : null, why: p.why })),
};
fs.writeFileSync(path.join(kdir, "key.json"), JSON.stringify(key, null, 2) + "\n");
const dispatch = [...Array(J).keys()].map((j) => ({ judge: `judge-${j + 1}`, pairs: pairs.filter((p) => p.judge === `judge-${j + 1}`).map((p) => `pair-${String(p.n).padStart(2, "0")}`) }));
fs.writeFileSync(path.join(kdir, "dispatch.json"), JSON.stringify(dispatch, null, 2) + "\n");

// Degree / connectivity check.
const deg = {}; const adj = {};
for (const p of pairs) for (const [x, y] of [[p.A, p.B], [p.B, p.A]]) { (adj[x] ??= new Set()).add(y); }
for (const k of Object.keys(L)) deg[k] = adj[k]?.size ?? 0;
const seen = new Set(["M"]); const st = ["M"];
while (st.length) { const x = st.pop(); for (const y of adj[x]) if (!seen.has(y)) { seen.add(y); st.push(y); } }
console.log("connected:", seen.size === 17, "min opponents:", Math.min(...Object.values(deg)));
console.log(JSON.stringify(deg));
console.log(key.pairs.map((p) => `${p.pair} ${p.judge} A=${p.A} B=${p.B} ${p.within_domain ? "within" : "across"} ${p.calibration ? p.calibration.type + " of " + p.calibration.of : ""}`).join("\n"));
console.log(JSON.stringify(dispatch));
