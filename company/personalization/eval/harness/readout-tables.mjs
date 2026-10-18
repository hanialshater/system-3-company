#!/usr/bin/env node
// Readout tables from run.mjs outputs, mechanically (no judgement, no rounding choices beyond 4 decimals).
//   node company/personalization/eval/harness/readout-tables.mjs <outDir> [<outDir> ...]   prints markdown to stdout
// Several out dirs (e.g. a --kinds=base,one-at-a-time run and a --kinds=corner,novelty,rho run) are merged by section.
// owner: personalization-eval (Uma) · run: eval-c4-1016 · written after the freeze; reads verdicts.json and manifest.json only.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const dirs = process.argv.slice(2);
if (!dirs.length) { console.error("usage: readout-tables.mjs <outDir> [...]"); process.exit(2); }
const V = { validity: {}, pairs: {}, perTerm: {}, reference: {}, corners: {}, descriptive: {}, judge: [] };
const manifests = [];
for (const d of dirs) {
  const v = JSON.parse(readFileSync(join(d, "verdicts.json"), "utf8"));
  const m = JSON.parse(readFileSync(join(d, "manifest.json"), "utf8"));
  const sha = (f) => createHash("sha256").update(readFileSync(join(d, f))).digest("hex");
  manifests.push({ dir: d, kinds: m.kinds, commit: m.commit, criterionSha256: m.criterionSha256, criterionStatus: m.criterionStatus, inputsSha256: m.inputsSha256,
    S: m.S, seedList: m.seedList, node: m.node, seconds: m.seconds, plumbing: m.plumbing, results: sha("results.json"), verdicts: sha("verdicts.json") });
  for (const k of ["pairs", "perTerm", "reference", "corners", "descriptive"]) Object.assign(V[k], v[k]);
  for (const [p, x] of Object.entries(v.validity)) (V.validity[p] ??= []).push(x);
  V.judge.push(v.judge);
}
const f = (x, n = 4) => (x === undefined || x === null || Number.isNaN(x) ? "n/a" : (x >= 0 ? "+" : "") + x.toFixed(n));
const ci = (r) => `${f(r.mean)} [${f(r.lo)}, ${f(r.hi)}]`;
const out = [];
const P = (s = "") => out.push(s);

P("### Run manifests"); P();
P("| out dir | kinds | commit | criterion sha256 (as run) | status | inputs sha256 | S | seeds | node | seconds | results.json sha256 | verdicts.json sha256 |");
P("|---|---|---|---|---|---|---|---|---|---|---|---|");
for (const m of manifests) P(`| ${m.dir.split("/").slice(-2).join("/")} | ${Array.isArray(m.kinds) ? m.kinds.join(",") : m.kinds} | ${m.commit} | ${m.criterionSha256} | ${m.criterionStatus} | ${m.inputsSha256} | ${m.S} | ${m.seedList} | ${m.node} | ${m.seconds} | ${m.results} | ${m.verdicts} |`);
P();

P("### Judge tests (T5 to T7) and validity (T1 to T4)"); P();
const jOk = V.judge.every((j) => j.t5.ok && j.t6.every((x) => x.ok) && j.t7.a.ok && j.t7.b.ok && j.t7.c.ok);
P(`Judge tests T5, T6 (6 personas), T7a/b/c: **${jOk ? "pass" : "FAIL"}** in every run.`); P();
P("| policy | T1 | T2 | T3 | T4 | invalid |"); P("|---|---|---|---|---|---|");
for (const [p, xs] of Object.entries(V.validity)) {
  const ok = (t) => xs.every((x) => x.ok[t]) ? "pass" : "FAIL";
  P(`| ${p} | ${ok("T1")} | ${ok("T2")} | ${ok("T3")} | ${ok("T4")} | ${xs.some((x) => x.invalid) ? "**INVALID**" : "no"} |`);
}
P();

P("### Verdict per pair (criterion §2)"); P();
P("| pair | verdict | cells not beaten (if any) |"); P("|---|---|---|");
for (const [k, x] of Object.entries(V.pairs)) P(`| ${k} | **${x.outcome.verdict}** | ${x.outcome.cells.join(", ") || "none"} |`);
P();
P("Per cell (beats = ≥ 4 wins of 6, no persona harmed, every guardrail holds):"); P();
P("| pair | cell | wins | harmed | guardrail failures | beats |"); P("|---|---|---|---|---|---|");
for (const [k, x] of Object.entries(V.pairs)) for (const [c, j] of Object.entries(x.byCell))
  P(`| ${k} | ${c} | ${j.wins} | ${j.harmed.join(", ") || "none"} | ${j.guardrailFails.join(", ") || "none"} | ${j.beats ? "yes" : "**no**"} |`);
P();
P("Per persona, every pass-relevant cell: ΔR = R(GAM) − R(baseline), mean over seeds [95% interval]; win/harm per §2:"); P();
for (const [k, x] of Object.entries(V.pairs)) {
  P(`**${k}**`); P();
  P("| cell | persona | ΔR [95% CI] | win | harm | ΔG1 hi (≤ +0.05) | ΔG2 lo (count; rule: ≥ −5% of default mean) | ΔG3 hi (≤ +0.02) | ΔG4 lo (count; rule: ≥ −5% of default mean) | guardrails |"); P("|---|---|---|---|---|---|---|---|---|---|");
  for (const [c, j] of Object.entries(x.byCell)) for (const r of j.rows)
    P(`| ${c} | ${r.persona} | ${ci(r.R)} | ${r.win ? "win" : "-"} | ${r.harm ? "**harm**" : "-"} | ${f(r.g1.hi)} | ${f(r.g2.lo)} | ${f(r.g3.hi)} | ${f(r.g4.lo)} | ${Object.entries(r.holds).filter(([, ok]) => !ok).map(([g]) => g).join(", ") || "hold"} |`);
  P();
}

P("### Per-term results (criterion §2: items 1 and 2 only; reported, not part of the GAM pass)"); P();
P("| term pair (cell) | wins | harmed | meets the per-term rule |"); P("|---|---|---|---|");
for (const [k, j] of Object.entries(V.perTerm)) P(`| ${k} | ${j.wins} | ${j.harmed.join(", ") || "none"} | ${j.beats ? "yes" : "no"} |`);
P();
P("| term pair (cell) | persona | ΔR [95% CI] | win | harm |"); P("|---|---|---|---|---|");
for (const [k, j] of Object.entries(V.perTerm)) for (const r of j.rows) P(`| ${k} | ${r.persona} | ${ci(r.R)} | ${r.win ? "win" : "-"} | ${r.harm ? "**harm**" : "-"} |`);
P();

if (Object.keys(V.reference).length) {
  P("### Reference rows (ΔR vs default-order, base cell; no rule)"); P();
  P("| policy | persona | ΔR [95% CI] |"); P("|---|---|---|");
  for (const [pol, byP] of Object.entries(V.reference)) for (const [p, r] of Object.entries(byP)) P(`| ${pol} | ${p} | ${ci(r)} |`);
  P();
}
if (Object.keys(V.corners).length) {
  P("### Corners (reported, not part of pass; axes in order forgetScale, pullScale, prereqPenalty, hypercorrection; L = low, H = high)"); P();
  P("| corner: pair | wins | harmed | guardrail failures | beats | mean ΔR over personas |"); P("|---|---|---|---|---|---|");
  for (const [k, j] of Object.entries(V.corners)) P(`| ${k} | ${j.wins} | ${j.harmed.join(", ") || "none"} | ${j.guardrailFails.join(", ") || "none"} | ${j.beats ? "yes" : "no"} | ${f(j.rows.reduce((a, r) => a + r.R.mean, 0) / j.rows.length)} |`);
  P();
}
if (Object.keys(V.descriptive).length) {
  P("### Descriptive, base cell (engagement and dilution; never pass inputs)"); P();
  P("| policy | persona | moved share | reveal share | cards started | R_realised − R |"); P("|---|---|---|---|---|---|");
  for (const [pol, byP] of Object.entries(V.descriptive)) for (const [p, d] of Object.entries(byP)) P(`| ${pol} | ${p} | ${d.movedShare.toFixed(3)} | ${d.reveal.toFixed(3)} | ${d.cards.toFixed(1)} | ${f(d.R_realised_minus_R)} |`);
  P();
}
console.log(out.join("\n"));
