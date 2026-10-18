#!/usr/bin/env node
// Criterion 3b's readout formatter (eval-owned; written in K5 before any candidate existed in this tree, tested on a
// --plumbing run). It reads verdicts.json and manifest.json and prints markdown. It computes no verdict and no new number:
// every figure is printed as run3b.mjs wrote it (rounded for display).
//   node company/personalization/eval/harness/c3b/readout3b-tables.mjs --dir=<run3b out dir>
// owner: personalization-eval (Uma) · run: eval-k5-1017 · K6 (eval-k6-1017, before the freeze): every cell gets the full per-persona G1-G4 table; K-e and order-rule lines
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const f = (x, d = 4) => (x == null || Number.isNaN(x) ? "–" : (x >= 0 ? "+" : "") + x.toFixed(d));
const yes = (b) => (b ? "yes" : "**no**");
export function tables(v, m) {
  const out = [];
  const P = (s = "") => out.push(s);
  P(`## Run`);
  P(`| field | value |\n|---|---|`);
  P(`| plumbing | ${m.plumbing} |\n| criterion 3b status / sha256 | ${m.criterion3bStatus} / ${m.criterion3bSha256} |\n| V3 record | ${m.v3Record ?? "–"} |`);
  P(`| candidate | ${m.candidate.path} (sha256 ${m.candidate.sha256}; expected ${m.candidate.expectedSha256}) |\n| criterion 3 sha256 | ${m.criterion3Sha256} |`);
  P(`| commit | ${m.commit} |\n| S, seeds | ${m.S}, ${m.seedList} |\n| placements | ${m.placements.join(", ")} |\n| E1 / E3 / catalogue | ${m.e1Sha256.slice(0, 12)}… / ${m.e3Sha256.slice(0, 12)}… / ${m.catalogSha256.slice(0, 12)}… |`);
  P(`| node | ${m.node} |\n| seconds | ${m.seconds} |\n| per-episode ms | ${Object.entries(m.timing).map(([a, t]) => `${a} ${t.perEpisodeMs.toFixed(1)}`).join("; ")} |`);
  P();
  P(`## Judge checks`);
  P(`3b-ID0 ${v.judge.id0.ok} (files ${v.judge.id0.files}, criterion 3 ${v.judge.id0.criterion3}, catalogue ${v.judge.id0.catalog}) · 3b-ID1 ${v.judge.id1.ok} (${v.judge.id1.n} episode pairs) · T5c ${v.judge.t5c.ok} · 3b-ID2 chain ${v.chain.skipped ? "skipped (plumbing)" : `${v.chain.ok} (${Object.values(v.chain.cells).filter(Boolean).length} of ${Object.keys(v.chain.cells).length} rows)`}`);
  P();
  P(`## Candidate validity (criterion 3b §4): ${v.candidateInvalid ? "**INVALID**" : "valid"}`);
  const val = v.validity;
  P(`| check | result | detail |\n|---|---|---|`);
  P(`| V1 static | ${val.V1.ok} | ${val.V1.problems.join("; ") || "–"} |`);
  const calls = val.calls; const callFail = calls.filter((x) => !x.ok);
  P(`| V2, V4–V8 on own inputs | ${callFail.length === 0} | ${calls.reduce((a, x) => a + x.inputs, 0)} inputs in ${calls.length} episodes${callFail.length ? "; fails: " + callFail.map((x) => `${x.cell}/${x.persona}: ${x.fails[0]?.notes?.join(" ")}`).join(" | ") : ""} |`);
  P(`| V3 call level | ${val.V3call.every((x) => x.ok)} | ${val.V3call.map((x) => `${x.cell}/${x.persona} ${x.n ?? "?"} inputs ${x.ok}`).join("; ")} |`);
  P(`| V3 episode level | ${val.V3episode.every((x) => x.ok)} | ${val.V3episode.map((x) => `${x.cell}/${x.persona} ${x.ok}`).join("; ")} |`);
  P(`| V9 hash | ${val.V9.ok} | ${val.V9.sha256} vs ${val.V9.expected} |`);
  P(`| V10 copy | ${val.V10.ok} | M1 ${val.V10.m1.count} (≥ ${val.V10.thresholds.m1}), M2 ${val.V10.m2.length} (≥ ${val.V10.thresholds.m2}), M3 ${val.V10.m3.count} (≥ ${val.V10.thresholds.m3}); shared names: ${val.V10.m3.names.join(", ") || "–"}; shared long numbers: ${val.V10.sharedNumbers.join(", ") || "–"} |`);
  P(`| candidate episode errors | ${v.candidateErrors.length === 0} | ${v.candidateErrors.join("; ") || "–"} |`);
  P();
  const fx = val.inputFacts ?? [], pr = val.probes ?? [];
  if (fx.length) P(`Input facts (§4.3, recorded, never INVALID): K-a dims key order = default order: ${fx.every((x) => x.Ka_keyOrderIsDefaultOrder)} (key order = catalogue lesson order: ${fx.every((x) => x.Ka_keyOrderIsCatalogueLessonOrder)}; default order derivable from dims by the catalogue's rule: ${fx.every((x) => x.Ka_defaultOrderDerivableFromDims)}) · K-b rating field \`${fx[0].Kb_ratingField}\` values ${fx[0].Kb_ratingValues.join("/")} · K-c ρ ${fx[0].Kc_rho} · K-d pilot only: ${fx.every((x) => x.Kd_pilotOnly)} (${fx[0].Kd_lessons} lessons)`);
  if (fx.length && fx[0].Ke_statuses) P(`K-e (recorded on the candidate's own inputs): dims statuses ${fx[0].Ke_statuses.join("/")}; no draft or retired lesson on every first input: ${fx.every((x) => x.Ke_noDraftOrRetired)} · W-1591: order rule v1 (default-order-rule.md) over dims = the reference arm's order: ${fx.every((x) => x.Kf_orderRuleEqualsReferenceOrder)} (vector ${fx[0].Kf_orderRuleSha256.slice(0, 8)}…)`);
  if (v.judge.ke) P(`K-e gate (before the first score, every seed): ${v.judge.ke.ok} · ${v.judge.ke.lessons} lessons, statuses ${JSON.stringify(v.judge.ke.statusCounts)}, ${v.judge.ke.distinctLessonSetsAcrossSeeds} lesson set across seeds ${v.judge.ke.seeds}; pilot lessons on disk not visible: ${v.judge.ke.hiddenPilotLessonsOnDisk.map((h) => `${h.slug} (${h.status}, in dims: ${h.inDims})`).join("; ") || "none"}; problems: ${v.judge.ke.problems.join("; ") || "none"}; order rule = reference order ${v.judge.ke.orderRule.equalsReferenceOrder}, vector ${v.judge.ke.orderRule.sha256.slice(0, 8)}… matches the rule file's ${v.judge.ke.orderRule.matchesRuleFileVector}`);
  if (pr.length) P(`Probes (report only): exact-value tied adjacent pairs in rank ${pr.reduce((a, x) => a + x.tiedPairs, 0)}, of which in default order ${pr.reduce((a, x) => a + x.tiedInDefaultOrder, 0)}${pr[0].tiedInOrderRule != null ? ` and in order rule v1's order ${pr.reduce((a, x) => a + x.tiedInOrderRule, 0)}` : ""}; inputs where a rating permutation changes rank ${pr.reduce((a, x) => a + x.ratingPermutationChangesRank, 0)} of ${pr.reduce((a, x) => a + x.inputs, 0)}`);
  P();
  P(`V10 detail: M1 shingles ${JSON.stringify(val.V10.m1.shingles)}; M2 run: \`${val.V10.m2.run.join(" ")}\``);
  P();
  const o = v.pair.outcome;
  P(`## Outcome: ${v.pair.name}: **${o.verdict ?? "incomplete"}**${o.cells?.length ? ` (cells: ${o.cells.join(", ")})` : ""}${o.why ? ` (${o.why})` : ""}`);
  P();
  P(`Reported cells (no rule) where the candidate does not beat the reference: ${v.pair.reportedCellsNotBeaten.join(", ") || "none"}`);
  P();
  // One full per-persona table (K6: every cell, so no guardrail interval is summarised away; criterion 3b §2.2 "Printed for every cell")
  const iv = (d) => (d ? `${f(d.lo)} to ${f(d.hi)}` : "–");
  const full = (cell, j, head) => {
    P(`${head} ${cell} (${j.role}): wins ${j.wins} of ${j.rows.length}, harmed ${j.harmed.join(", ") || "none"}, guardrail fails ${j.guardrailFails.join(", ") || "none"}, beats: ${yes(j.beats)}`);
    P(`| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |`);
    P(`|---|---|---|---|---|---|---|---|---|---|---|---|---|`);
    for (const r of j.rows) {
      const g = (k) => r.g?.[k]; const h = (k) => (r.holds?.[k] ? "holds" : "**fails**");
      P(`| ${r.persona} | ${f(r.R.mean)} | ${f(r.R.lo)} to ${f(r.R.hi)} | ${r.win ? "win" : ""} | ${r.harm ? "**harm**" : ""} | ${f(g("g1TopDomainShare")?.mean)} (${iv(g("g1TopDomainShare"))}) · ${f(g("g1TopDomainShare")?.hi)} | ${f(g("g2Concepts")?.mean)} (${iv(g("g2Concepts"))}) · ${f(r.rel?.G2)} | ${f(g("g3PrereqFirst")?.mean)} (${iv(g("g3PrereqFirst"))}) · ${f(g("g3PrereqFirst")?.hi)} | ${f(g("g4Gain")?.mean)} (${iv(g("g4Gain"))}) · ${f(r.rel?.G4)} | ${h("G1")} | ${h("G2")} | ${h("G3")} | ${h("G4")} |`);
    }
    P();
  };
  for (const cell of ["interleave:base", "first:base"]) { const j = v.pair.byCell[cell]; if (j) full(cell, j, "###"); }
  P(`### Every cell (summary)`);
  P(`| cell | role | wins | harmed | guardrail fails | beats | Δ by persona (lo, hi) |\n|---|---|---|---|---|---|---|`);
  for (const [cell, j] of Object.entries(v.pair.byCell)) P(`| ${cell} | ${j.role} | ${j.wins} | ${j.harmed.join(", ") || "–"} | ${j.guardrailFails.join(", ") || "–"} | ${yes(j.beats)} | ${j.rows.map((r) => `${r.persona.split("-")[0]} ${f(r.R.mean, 3)} (${f(r.R.lo, 3)}, ${f(r.R.hi, 3)})`).join("; ")} |`);
  P();
  P(`### Every cell, per persona: Δ and G1 to G4 with intervals`);
  P();
  for (const [cell, j] of Object.entries(v.pair.byCell)) if (cell !== "interleave:base" && cell !== "first:base") full(cell, j, "####");
  P(`## Printed beside (no rule reads these)`);
  for (const [cell, j] of Object.entries(v.reported.oracle)) P(`- oracle \`reachable+fixed\` vs reference, ${cell}: wins ${j.wins}, harmed ${j.harmed.join(", ") || "none"}, guardrail fails ${j.guardrailFails.join(", ") || "none"}; Δ ${j.rows.map((r) => `${r.persona} ${f(r.R.mean)} (${f(r.R.lo)}, ${f(r.R.hi)})`).join("; ")}`);
  for (const [cell, j] of Object.entries(v.reported.candidateVsOracle)) P(`- candidate vs oracle, ${cell} (Δ per reference lesson): ${j.rows.map((r) => `${r.persona} ${f(r.R.mean)} (${f(r.R.lo)}, ${f(r.R.hi)})`).join("; ")}`);
  for (const [cell, byH] of Object.entries(v.horizons)) for (const [h, byArm] of Object.entries(byH)) for (const [a, rows] of Object.entries(byArm)) P(`- R${h} ${a} vs reference, ${cell}: ${rows.map((r) => `${r.persona} ${f(r.R.mean)} (${f(r.R.lo)}, ${f(r.R.hi)})`).join("; ")}`);
  P();
  P(`### Descriptive (means per episode; base cells)`);
  for (const [cell, byArm] of Object.entries(v.descriptive)) {
    const keys = Object.keys(Object.values(Object.values(byArm)[0])[0]);
    P(`#### ${cell}\n| arm | persona | ${keys.join(" | ")} |\n|---|---|${keys.map(() => "---").join("|")}|`);
    for (const [a, byP] of Object.entries(byArm)) for (const [p, d] of Object.entries(byP)) P(`| ${a} | ${p} | ${keys.map((k) => (d[k] == null ? "–" : d[k].toFixed(3))).join(" | ")} |`);
  }
  return out.join("\n");
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const a = process.argv.find((x) => x.startsWith("--dir="));
  if (!a) { console.error("usage: readout3b-tables.mjs --dir=<run3b out dir>"); process.exit(2); }
  const dir = a.slice(6);
  console.log(tables(JSON.parse(readFileSync(join(dir, "verdicts.json"), "utf8")), JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8"))));
}
