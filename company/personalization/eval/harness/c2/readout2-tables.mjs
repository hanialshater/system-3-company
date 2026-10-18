#!/usr/bin/env node
// Readout 2 tables: prints markdown from run2.mjs outputs. A formatter only: it computes no verdict (the verdicts are
// run2.mjs's, in verdicts.json) and reads the per-seed scores only to print recall LEVELS by horizon at the base cell.
// owner: personalization-eval (Uma) · run: eval-k2-1016 · written before the freeze, blind to any result.
//   node company/personalization/eval/harness/c2/readout2-tables.mjs --main=<dir of base,one-at-a-time run> [--corners=<dir>]
import { readFileSync, createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { join } from "node:path";

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const f = (x, d = 4) => (x === null || x === undefined || Number.isNaN(x) ? "n/a" : (x >= 0 ? "+" : "") + x.toFixed(d));
const g = (x, d = 3) => (x === null || x === undefined || Number.isNaN(x) ? "n/a" : x.toFixed(d));
const iv = (R) => `${f(R.mean)} [${f(R.lo)}, ${f(R.hi)}]`;
const REF = "default-order+fixed";

async function levels(dir) {
  // Base cell: mean over seeds of K[H] / nAll_ref, per arm and persona, at every horizon.
  const rows = {};
  const rl = createInterface({ input: createReadStream(join(dir, "results.ndjson")), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!line.startsWith('{"cell":"base"')) continue;
    const u = JSON.parse(line);
    (rows[u.arm] ??= {})[u.persona] = u.scores;
  }
  const out = {};
  for (const [arm, byP] of Object.entries(rows)) for (const [p, ss] of Object.entries(byP)) {
    const ref = rows[REF][p];
    for (const H of Object.keys(ss[0].K)) {
      const v = ss.map((s, i) => s.K[H] / ref[i].nAll).filter((x) => !Number.isNaN(x));
      ((out[arm] ??= {})[p] ??= {})[H] = v.reduce((a, b) => a + b, 0) / v.length;
    }
  }
  return out;
}

async function main() {
  const dir = arg("main");
  const man = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8"));
  const V = JSON.parse(readFileSync(join(dir, "verdicts.json"), "utf8"));
  const L = [];
  const p = (s = "") => L.push(s);
  p(`## Run`);
  p(`commit ${man.commit} · criterion sha256 ${man.criterionSha256} · status ${man.criterionStatus} · inputs sha256 ${man.inputsSha256} · S ${man.S} · seeds ${man.seedList} · tuning ${man.tuningSeeds} · kinds ${JSON.stringify(man.kinds)} · node ${man.node} · ${man.seconds} s · model ${man.modelVersion} · GAM fingerprint ${man.gamFingerprint}`);
  p(`candidate ${man.candidate ? `${man.candidate.path} sha256 ${man.candidate.sha256}` : "none"} · errors ${Object.keys(man.errors).length}`);
  p();
  p(`## Validity (T1-T4, R1-R4) and judge tests`);
  p(`judge: T5 ${V.judge.t5.ok} · T6 ${V.judge.t6.every((x) => x.ok)} · T7 ${Object.entries(V.judge.t7).map(([k, x]) => `${k}:${x.ok}`).join(" ")} · T8 ${V.judge.t8.ok} · T9 ${V.judge.t9.every((x) => x.ok)}`);
  for (const [arm, v] of Object.entries(V.validity)) p(`- ${arm}: ${JSON.stringify(v.ok)} invalid=${v.invalid}`);
  p();
  p(`## Headroom readings (base cell, wins only)`);
  for (const [name, h] of Object.entries(V.headroom)) {
    p(`### ${name}: **${h.reading}**`);
    p(`| persona | Δ R7 [95% CI] | win |`); p(`|---|---|---|`);
    for (const r of h.byCell.base.rows) p(`| ${r.persona} | ${iv(r.R)} | ${r.win ? "win" : ""} |`);
    p(`wins per cell: ${Object.entries(h.byCell).map(([c, x]) => `${c} ${x.wins}`).join(" · ")}`);
    p();
  }
  p(`## Pairs under the full rule`);
  p(`| pair | outcome | base wins | base harmed | base guardrail fails | cells not beaten |`); p(`|---|---|---|---|---|---|`);
  for (const [name, x] of Object.entries(V.pairs)) p(`| ${name} | **${x.outcome.verdict}** | ${x.byCell.base.wins} | ${x.byCell.base.harmed.join(", ") || "none"} | ${x.byCell.base.guardrailFails.join(", ") || "none"} | ${x.outcome.verdict === "FAIL-SENSITIVE" ? x.outcome.cells.join(", ") : x.outcome.verdict === "FAIL" ? "base" : "none"} |`);
  p();
  for (const [name, x] of Object.entries(V.pairs)) {
    p(`### ${name}: base cell`);
    const rev = x.byCell.base.rows[0].holds && "LOAD" in x.byCell.base.rows[0].holds;
    p(rev ? `| persona | Δ R7 [95% CI] | win | harm | G1 | NEW Δ [CI] | LOAD Δ revisit share [CI] | LOAD holds |` : `| persona | Δ R7 [95% CI] | win | harm | G1 | G2 | G3 | G4 |`);
    p(rev ? `|---|---|---|---|---|---|---|---|` : `|---|---|---|---|---|---|---|---|`);
    for (const r of x.byCell.base.rows) {
      if (rev) p(`| ${r.persona} | ${iv(r.R)} | ${r.win ? "win" : ""} | ${r.harm ? "HARM" : ""} | ${r.holds.G1} | ${f(r.g.nNew.mean, 2)} [${f(r.g.nNew.lo, 2)}, ${f(r.g.nNew.hi, 2)}] ${r.holds.NEW} | ${iv(r.g.revisitShare)} | ${r.holds.LOAD} |`);
      else p(`| ${r.persona} | ${iv(r.R)} | ${r.win ? "win" : ""} | ${r.harm ? "HARM" : ""} | ${r.holds.G1} | ${r.holds.G2} | ${r.holds.G3} | ${r.holds.G4} |`);
    }
    p(`per cell (beats / wins / harmed / guardrail fails): ${Object.entries(x.byCell).map(([c, y]) => `${c} ${y.beats ? "BEATS" : "no"}/${y.wins}/${y.harmed.length}/${y.guardrailFails.length}`).join(" · ")}`);
    p();
  }
  p(`## Recall level by horizon, base cell (mean R_H = K(T_H) / N_ref)`);
  const lv = await levels(dir);
  const personas = Object.keys(lv[REF]);
  for (const H of ["1", "7", "30"]) {
    p(`### H = ${H}`);
    p(`| arm | ${personas.join(" | ")} |`); p(`|---|${personas.map(() => "---").join("|")}|`);
    for (const arm of Object.keys(lv)) p(`| ${arm} | ${personas.map((q) => g(lv[arm][q][H])).join(" | ")} |`);
    p();
  }
  p(`## Δ vs the reference by horizon, base cell (95% CI)`);
  for (const [H, byArm] of Object.entries(V.horizons)) {
    p(`### H = ${H}`);
    p(`| arm | ${personas.join(" | ")} |`); p(`|---|${personas.map(() => "---").join("|")}|`);
    for (const [arm, rows] of Object.entries(byArm)) p(`| ${arm} | ${rows.map((r) => iv(r.R)).join(" | ")} |`);
    p();
  }
  p(`## Reference rows (no rule), base cell, Δ R7 vs the reference`);
  for (const [arm, byP] of Object.entries(V.reference)) p(`- ${arm}: ${Object.entries(byP).map(([q, R]) => `${q} ${iv(R)}`).join(" · ")}`);
  p();
  p(`## Descriptive, base cell (means over seeds; never a pass input)`);
  p(`| arm | persona | new lessons | revisits | revisit share | cards | reveal | moved | R1d | V4 earlier / same / later |`); p(`|---|---|---|---|---|---|---|---|---|---|`);
  for (const [arm, byP] of Object.entries(V.descriptive)) for (const [q, d] of Object.entries(byP)) p(`| ${arm} | ${q} | ${g(d.nNew, 1)} | ${g(d.revisits, 1)} | ${g(d.revisitShare)} | ${g(d.cards, 1)} | ${g(d.reveal)} | ${g(d.movedShare)} | ${g(d.R1d)} | ${g(d.v4.earlier, 1)} / ${g(d.v4.same, 1)} / ${g(d.v4.later, 1)} |`);
  p();
  p(`## Oracle-review θ per (cell, persona), chosen on the tuning seeds`);
  for (const [c, byP] of Object.entries(man.oracleReviewTheta)) p(`- ${c}: ${Object.entries(byP).map(([q, t]) => `${q} ${t}`).join(" · ")}`);
  const cdir = arg("corners");
  if (cdir) {
    const CV = JSON.parse(readFileSync(join(cdir, "verdicts.json"), "utf8"));
    const CM = JSON.parse(readFileSync(join(cdir, "manifest.json"), "utf8"));
    p();
    p(`## Corners (reported only): wins of 6, and the Δ R7 range over personas`);
    p(`corner run: commit ${CM.commit} · criterion sha256 ${CM.criterionSha256} · S ${CM.S} · ${CM.seconds} s · errors ${Object.keys(CM.errors).length}`);
    p(`| corner: arm vs reference | wins | harmed | min Δ | max Δ |`); p(`|---|---|---|---|---|`);
    for (const [k, x] of Object.entries(CV.corners)) { const m = x.rows.map((r) => r.R.mean); p(`| ${k} | ${x.wins} | ${x.harmed.length} | ${f(Math.min(...m))} | ${f(Math.max(...m))} |`); }
  }
  console.log(L.join("\n"));
}
main().catch((e) => { console.error(String(e.message || e)); process.exit(1); });
