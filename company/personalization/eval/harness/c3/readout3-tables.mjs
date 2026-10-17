#!/usr/bin/env node
// Readout 3 tables: prints markdown from run3.mjs outputs. A FORMATTER ONLY: it computes no verdict and no reading (those
// are run3.mjs's, in verdicts.json). From results.ndjson it reads only per-seed descriptive counts (refresh picks taken and
// skipped, new picks, revisits) and R levels, which verdicts.json does not keep for every cell.
// owner: personalization-eval (Uma) · run: eval-k4-1017 · written before the freeze and before any scored number
// (criterion 3 §10 item 3); tested on a --plumbing run only (every arm = the reference arm; readings meaningless).
//   node company/personalization/eval/harness/c3/readout3-tables.mjs --parts=<dir of part 1>[,<dir of part 2>...]
import { readFileSync, createReadStream, existsSync } from "node:fs";
import { createInterface } from "node:readline";
import { join } from "node:path";

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const f = (x, d = 4) => (x === null || x === undefined || Number.isNaN(x) ? "n/a" : (x >= 0 ? "+" : "") + x.toFixed(d));
const g = (x, d = 2) => (x === null || x === undefined || Number.isNaN(x) ? "n/a" : x.toFixed(d));
const iv = (R) => `${f(R.mean)} [${f(R.lo)}, ${f(R.hi)}]`;
const REF = "default-order+fixed";
const ORDERING = ["oracle-order+fixed", "oracle-new+fixed", "oracle-refresh+fixed", "reachable+fixed"];
const N7_CELLS = ["base", "priorRateMult-low", "priorRateMult-high", "priorRateMult-outer"];
// Criterion 3 §6 = criterion 2 §6 = phase A §6, carried unchanged (two-proportion approximation, base h .2, m 3, ICC .1).
const MDE = [[200, 15.3], [1000, 6.9], [5000, 3.1], [10000, 2.2]];
const mean = (a) => { const v = a.filter((x) => !Number.isNaN(x)); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : NaN; };

/** Per (cell, arm, persona): means of the descriptive counts; R level at H 7 over the reference's nAll. */
async function descriptives(dir) {
  const want = new Set();
  const rows = {};
  const rl = createInterface({ input: createReadStream(join(dir, "results.ndjson")), crlfDelay: Infinity });
  for await (const line of rl) {
    const u = JSON.parse(line);
    const short = u.cell.split(":")[1];
    if (!N7_CELLS.includes(short) && !short.endsWith("base")) continue;
    want.add(u.cell);
    const ss = u.scores;
    ((rows[u.cell] ??= {})[u.arm] ??= {})[u.persona] = {
      refreshPicks: mean(ss.map((s) => s.extra.refreshPicks)), refreshSkipped: mean(ss.map((s) => s.extra.refreshSkipped)),
      refreshPrior: mean(ss.map((s) => s.extra.refreshPrior)), refreshBefore: mean(ss.map((s) => s.extra.refreshEpisode)),
      newPicks: mean(ss.map((s) => s.extra.newPicks)), revisits: mean(ss.map((s) => s.revisits)), unserved: mean(ss.map((s) => s.extra.revisitsUnserved)),
      K7: ss.map((s) => s.K[7]), nAll: ss.map((s) => s.nAll),
    };
  }
  for (const c of Object.keys(rows)) for (const [arm, byP] of Object.entries(rows[c])) for (const [p, x] of Object.entries(byP)) {
    const ref = rows[c][REF]?.[p];
    x.R7 = ref ? mean(x.K7.map((k, i) => k / ref.nAll[i])) : NaN;
    delete x.K7; if (arm !== REF) delete x.nAll;
  }
  for (const c of Object.keys(rows)) for (const p of Object.keys(rows[c][REF] ?? {})) delete rows[c][REF][p].nAll;
  return rows;
}

async function main() {
  const dirs = (arg("parts") || "").split(",").filter(Boolean);
  if (!dirs.length) throw new Error("--parts=<dir>[,<dir>] required");
  const parts = dirs.map((d) => ({ dir: d, man: JSON.parse(readFileSync(join(d, "manifest.json"), "utf8")), V: JSON.parse(readFileSync(join(d, "verdicts.json"), "utf8")) }));
  const L = []; const p = (s = "") => L.push(s);
  const V = { rule3: null, ordering: {}, o1: {}, review: {}, horizons: {}, descriptive: {}, validity: [], judge: [] };
  for (const x of parts) {
    if (x.V.rule3) V.rule3 = x.V.rule3;
    for (const k of ["o1", "review", "horizons", "descriptive"]) Object.assign(V[k], x.V[k]);
    for (const [a, byCell] of Object.entries(x.V.ordering)) Object.assign((V.ordering[a] ??= {}), byCell);
    V.validity.push({ placements: x.man.placements, reachableInvalid: x.V.reachableInvalid, ...x.V.validity });
    V.judge.push({ placements: x.man.placements, ...x.V.judge });
  }
  const cells = Object.keys(V.o1);
  const D = {}; for (const x of parts) if (existsSync(join(x.dir, "results.ndjson"))) Object.assign(D, await descriptives(x.dir));

  p(`## Run`);
  for (const { man } of parts) {
    p(`- placements ${man.placements.join(",")} · commit ${man.commit} · criterion sha256 ${man.criterionSha256} · status ${man.criterionStatus} · plumbing ${man.plumbing} · E1 sha256 ${man.e1Sha256} · E3 sha256 ${man.e3Sha256} · S ${man.S} · seeds ${man.seedList} · tuning ${man.tuningSeeds} · node ${man.node} · model ${man.modelVersion} · ${man.seconds} s · errors ${Object.keys(man.errors).length}`);
  }
  p();
  p(`## Validity: judge tests and the reachable arm`);
  for (const j of V.judge) p(`- ${j.placements.join(",")}: C3-ID1 ${j.id1.ok} (${j.id1.n} episode pairs) · C3-ID2 ${j.id2.ok} (${j.id2.files} files, ${j.id2.commit}) · T5c ${j.t5c.ok}`);
  for (const v of V.validity) {
    p(`- ${v.placements.join(",")}: reachable INVALID flag **${v.reachableInvalid}** · T1 ${v.T1.map((t) => `${t.cell}/${t.persona} ${t.ok}`).join(", ") || "not run"} · RS1-RS6 ${v.RS.map((t) => `${t.cell}/${t.persona} ${t.ok}`).join(", ") || "not run"}`);
  }
  p();
  p(`## Rule 3 field (pre-commitment 3 reads this): reachable vs default-order in ${V.rule3?.cell ?? "n/a"}`);
  p(V.rule3 ? `**${V.rule3.reading}** · wins ${V.rule3.wins} of 6 · ${V.rule3.note}` : "not in these parts");
  p();
  for (const base of ["interleave:base", "first:base"]) {
    if (!V.ordering["reachable+fixed"]?.[base]) continue;
    p(`### ${base}: ordering arms vs default-order (+ fixed), Δ R7 per persona [95% t CI], wins only; harms and G1-G4 beside, not read`);
    p(`| persona | ${ORDERING.map((a) => a.replace("+fixed", "")).join(" | ")} |`); p(`|---|${ORDERING.map(() => "---").join("|")}|`);
    const personas = V.ordering["reachable+fixed"][base].rows.map((r) => r.persona);
    for (const per of personas) p(`| ${per} | ${ORDERING.map((a) => { const r = V.ordering[a][base].rows.find((x) => x.persona === per); return `${iv(r.R)}${r.win ? " win" : ""}${r.harm ? " HARM" : ""}`; }).join(" | ")} |`);
    p(`| wins | ${ORDERING.map((a) => V.ordering[a][base].wins).join(" | ")} |`);
    p(`| guardrail fails (reported) | ${ORDERING.map((a) => V.ordering[a][base].guardrailFails.join(", ") || "none").join(" | ")} |`);
    p();
  }
  p(`### Wins per cell (of 6), every cell`);
  p(`| cell | ${ORDERING.map((a) => a.replace("+fixed", "")).join(" | ")} |`); p(`|---|${ORDERING.map(() => "---").join("|")}|`);
  for (const c of cells) p(`| ${c} | ${ORDERING.map((a) => V.ordering[a][c]?.wins ?? "n/a").join(" | ")} |`);
  p();
  p(`### Reachable vs default-order, mean Δ R7 per persona, every cell`);
  const per6 = V.ordering["reachable+fixed"][cells[0]].rows.map((r) => r.persona);
  p(`| cell | ${per6.join(" | ")} |`); p(`|---|${per6.map(() => "---").join("|")}|`);
  for (const c of cells) p(`| ${c} | ${per6.map((per) => { const r = V.ordering["reachable+fixed"][c].rows.find((x) => x.persona === per); return `${f(r.R.mean)}${r.win ? "*" : ""}`; }).join(" | ")} |`);
  p(`(* = win: lower 95% bound > 0 and Δ ≥ δ_min 0.01)`);
  p();
  p(`## O1 split (hidden-state references, review fixed): Δ_full, Δ_new, Δ_refresh and the interaction vs default-order`);
  for (const c of cells.filter((x) => N7_CELLS.includes(x.split(":")[1]))) {
    p(`### ${c}`);
    p(`| persona | Δ_full | Δ_new | Δ_refresh | interaction (full − new − refresh) |`); p(`|---|---|---|---|---|`);
    for (const [per, x] of Object.entries(V.o1[c])) p(`| ${per} | ${iv(x.full)} | ${iv(x.newOnly)} | ${iv(x.refreshOnly)} | ${iv(x.interaction)} |`);
    p();
  }
  p(`### O1 mean Δ, every other cell (full / new / refresh / interaction)`);
  p(`| cell | ${per6.join(" | ")} |`); p(`|---|${per6.map(() => "---").join("|")}|`);
  for (const c of cells.filter((x) => !N7_CELLS.includes(x.split(":")[1]))) p(`| ${c} | ${per6.map((per) => { const x = V.o1[c][per]; return `${f(x.full.mean, 3)} / ${f(x.newOnly.mean, 3)} / ${f(x.refreshOnly.mean, 3)} / ${f(x.interaction.mean, 3)}`; }).join(" | ")} |`);
  p();
  p(`## Refreshes taken vs skipped (F3 N11), per N7 cell, mean per episode`);
  p(`taken = picks whose concept was known (hidden) when picked; skipped = known-concept lessons passed over as the default order's next eligible lesson and never served later; "before" = taken refreshes whose concept a completed lesson shares (learned before this pick, in the episode or the pre-history; F3 N12); prior = the rest.`);
  for (const c of Object.keys(D).filter((x) => N7_CELLS.includes(x.split(":")[1]))) {
    p(`### ${c}`);
    p(`| arm | persona | taken | skipped | taken: prior | taken: before | new picks | revisits served | revisits unserved | R7 level |`); p(`|---|---|---|---|---|---|---|---|---|---|`);
    for (const arm of [REF, ...ORDERING]) for (const [per, x] of Object.entries(D[c][arm] ?? {})) p(`| ${arm} | ${per} | ${g(x.refreshPicks)} | ${g(x.refreshSkipped)} | ${g(x.refreshPrior)} | ${g(x.refreshBefore)} | ${g(x.newPicks)} | ${g(x.revisits)} | ${g(x.unserved)} | ${g(x.R7, 4)} |`);
    p();
  }
  p(`## Interleave rows and the revisits-first review rows (input for head-of-product and evaluation-steward; no rule reads them)`);
  p(`Δ R7 vs default-order + fixed per persona; review guardrails G1, NEW, LOAD reported.`);
  for (const c of Object.keys(V.review)) {
    const x = V.review[c];
    p(`### ${c}`);
    p(`| persona | default-order + none vs fixed | oracle-review vs fixed |`); p(`|---|---|---|`);
    for (const r of x.none.rows) { const o = x.oracleReview.rows.find((y) => y.persona === r.persona); p(`| ${r.persona} | ${iv(r.R)}${r.win ? " win" : ""}${r.harm ? " HARM" : ""} | ${iv(o.R)}${o.win ? " win" : ""}${o.harm ? " HARM" : ""} |`); }
    p(`| wins · guardrail fails | ${x.none.wins} · ${x.none.guardrailFails.join(", ") || "none"} | ${x.oracleReview.wins} · ${x.oracleReview.guardrailFails.join(", ") || "none"} |`);
    p();
  }
  for (const { man } of parts) if (man.oracleReviewTheta && Object.keys(man.oracleReviewTheta).length) p(`θ (oracle-review, tuning seeds): ${Object.entries(man.oracleReviewTheta).map(([c, byP]) => `${c} ${[...new Set(Object.values(byP))].join("/")}`).join(" · ")}`);
  p();
  p(`## Horizons at the base cells (R level per persona: arm at H over the reference's nAll)`);
  for (const [c, byH] of Object.entries(V.horizons)) {
    p(`### ${c}`);
    const arms = Object.keys(byH[Object.keys(byH)[0]]);
    p(`| arm | H | ${per6.join(" | ")} |`); p(`|---|---|${per6.map(() => "---").join("|")}|`);
    for (const a of arms) for (const H of Object.keys(byH)) p(`| ${a} | ${H} | ${per6.map((per) => g(byH[H][a].find((r) => r.persona === per)?.R.mean, 4)).join(" | ")} |`);
    p();
  }
  p(`## Descriptive at the base cells (means per episode)`);
  for (const [c, byA] of Object.entries(V.descriptive)) {
    p(`### ${c}`);
    const keys = Object.keys(Object.values(Object.values(byA)[0])[0]);
    p(`| arm | persona | ${keys.join(" | ")} |`); p(`|---|---|${keys.map(() => "---").join("|")}|`);
    for (const [a, byP] of Object.entries(byA)) for (const [per, x] of Object.entries(byP)) p(`| ${a} | ${per} | ${keys.map((k) => g(x[k])).join(" | ")} |`);
    p();
  }
  p(`## Δ beside the MDE (criterion 3 §6, carried unchanged; R7 is a final-test read the product cannot observe)`);
  p(`MDE (live first-revisit recall, points): ${MDE.map(([n, m]) => `${n} learners ${m}`).join(" · ")}`);
  for (const base of ["interleave:base", "first:base"]) if (V.ordering["reachable+fixed"]?.[base]) {
    const rs = V.ordering["reachable+fixed"][base].rows;
    p(`- ${base}, reachable vs default-order, Δ R7 in points: ${rs.map((r) => `${r.persona} ${(100 * r.R.mean).toFixed(1)}`).join(" · ")}; fewest learners in the MDE table whose MDE is at or below the largest |Δ|: ${(() => { const m = Math.max(...rs.map((r) => Math.abs(100 * r.R.mean))); const hit = MDE.filter(([, x]) => x <= m); return hit.length ? `${hit[0][0]} learners (${hit[0][1]})` : "none in the table (every |Δ| below 2.2 points)"; })()}`);
  }
  console.log(L.join("\n"));
}
main().catch((e) => { console.error(String(e.stack || e)); process.exit(1); });
