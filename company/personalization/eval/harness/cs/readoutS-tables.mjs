#!/usr/bin/env node
// The session criterion's readout formatter (eval-owned, W-2013). Written after the freeze commit and before the first chunk
// ran; its sha256 is in the criterion's §11. It first runs the parts check (partsCheckS.mjs) and refuses to print if the
// check refuses. It then reads the merged verdicts.json and manifest.json and prints markdown. It computes no verdict and no
// new number: every figure is printed as runS.mjs wrote it (rounded for display). Lists are only split by the cell name they
// already carry (e.g. the base-cell entries of K2's unadjusted clear losses, VP record §9 O12).
//   node company/personalization/eval/harness/cs/readoutS-tables.mjs --root=<out root> --merged=<merged dir> [--plumbing-test]
// owner: personalization-eval (Uma) · run: eval-s1-1020 · criterion: company/personalization/eval/2026-10-20-session-criterion.md §3, §4, §8, §11
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { checkRun } from "./partsCheckS.mjs";

const f = (x, d = 4) => (x == null || Number.isNaN(x) ? "–" : (x >= 0 ? "+" : "") + Number(x).toFixed(d));
const n3 = (x) => (x == null || Number.isNaN(x) ? "–" : Number(x).toFixed(3));
const yes = (b) => (b ? "yes" : "**no**");
const BASE = "interleave:base";
const GK = ["g1TopDomainShare", "g2Concepts", "g3PrereqFirst", "g4Gain"];

export function tables(v, m, chk) {
  const out = []; const P = (s = "") => out.push(s);
  if (m.plumbing) P(`> **PLUMBING RUN: session arms served by fixture-session-default, every other arm by the reference arm. Every Δ is 0 by construction; nothing below is a readout.**\n`);
  P(`## Run and manifest`);
  P(`| field | value |\n|---|---|`);
  P(`| criterion status | ${m.criterionStatus} |`);
  P(`| freeze commit / frozen criterion sha256 | ${chk.freezeCommit} / ${chk.frozenCriterionSha256} |`);
  P(`| run commit / criterion sha256 at the run commit | ${m.commit} / ${m.criterionSha256} |`);
  P(`| paths changed after the freeze | ${chk.commitCheck?.changedAfterFreeze?.join(", ") || "none"} |`);
  P(`| §11 formatter / parts check | ${chk.commitCheck?.recorded?.formatter?.sha256 ?? "–"} / ${chk.commitCheck?.recorded?.partsCheck?.sha256 ?? "–"} |`);
  P(`| parts check | ${chk.ok ? "OK" : "**REFUSED**"}${chk.problems.length ? ` (${chk.problems.join("; ")})` : ""} |`);
  P(`| S, seeds | ${m.S}, ${m.seedList} |`);
  P(`| candidate pin check | ${m.pinCheck.ok}${m.pinCheck.bad?.length ? ` (${m.pinCheck.bad.join(", ")})` : ""} |`);
  P(`| catalogue sha256, lessons | ${m.candidatePin.catalogSha256}, ${m.candidatePin.lessons} |`);
  P(`| model / composer / serving mode / session size | ${m.candidatePin.modelVersion} / ${m.candidatePin.composer} / ${m.candidatePin.servingMode} / ${m.candidatePin.sessionSize} |`);
  P(`| E1 / E3 | ${m.e1Sha256} / ${m.e3Sha256} |`);
  P(`| node | ${m.node} |`);
  P(`| unit errors | ${Object.keys(m.errors || {}).length ? Object.entries(m.errors).map(([k, e]) => `${k}: ${e}`).join("; ") : "none"} |`);
  P(`| merged verdicts.json sha256 | ${chk.merged?.verdictsSha256 ?? "–"} |`);
  P();
  P(`| chunk | §8 part | seconds | results lines (expected) | results.ndjson sha256 | manifest.json sha256 |\n|---|---|---|---|---|---|`);
  for (const c of chk.chunks) P(`| ${c.id} | ${c.part} | ${c.seconds ?? "–"} | ${c.results ? `${c.results.lines} (${c.results.expected})` : "–"} | ${c.results?.sha256 ?? "–"} | ${c.manifestSha256 ?? "–"} |`);
  P();
  P(`Harness file sha256 (runS.mjs RUN_FILES): ${Object.entries(m.fileSha256).map(([k, h]) => `\`${k}\` ${h.slice(0, 12)}…`).join(" · ")}`);
  P();
  P(`## Judge checks (criterion §5; a failure stops the run)`);
  const j = v.judge;
  P(`S-ID0 ${j.id0.ok} (${j.id0.files} files vs readout 3 at ${j.id0.commit}${j.id0.bad?.length ? `; differ: ${j.id0.bad.join(", ")}` : ""}) · T5c ${j.t5c.ok} · K-e ${j.ke.ok} (${j.ke.lessons} lessons, ${j.ke.seeds}) · GAM pin ${j.gam.ok} · S-ID1 ${j.id1.ok} (${j.id1.n} episode pairs) · S-ID2 ${j.id2.ok} (${j.id2.n} episodes)`);
  P();
  P(`## Validity of each session arm (criterion §5; any failure makes the arm INVALID)`);
  P(`| arm | INVALID | T1 replay | compositions checked (T2S/T3S/NM/T4S) | T2S | T3S | NM | T4S (picks checked) | unit errors | first fails |\n|---|---|---|---|---|---|---|---|---|---|`);
  for (const [a, x] of Object.entries(v.validity)) {
    const c = x.compose;
    P(`| ${a} | ${v.invalid[a] ? "**INVALID**" : "no"} | ${x.t1.map((t) => `${t.persona} ${t.ok}`).join("; ")} | ${c.reduce((s, y) => s + y.composes, 0)} | ${c.every((y) => y.t2)} | ${c.every((y) => y.t3)} | ${c.every((y) => y.nm)} | ${c.every((y) => y.t4)} (${c.reduce((s, y) => s + y.t4Checked, 0)}) | ${x.errors.length ? x.errors.join("; ") : "none"} | ${c.flatMap((y) => y.fails.map((q) => `${y.persona}: ${JSON.stringify(q)}`)).slice(0, 3).join(" · ") || "–"} |`);
  }
  P();
  if (v.incomplete) { P(`**verdicts.json is incomplete: no reading printed.**`); return out.join("\n"); }
  P(`## Readings K1 to K5 (criterion §3; keep or kill is vp-personalization's, VP record §4)`);
  P(`| arm | K1 gate | K1 cells named | K2 veto (simultaneous) | K2 losses | unadjusted clear losses: base cell (VP §9 O12 disclosure) | unadjusted clear losses: one-at-a-time cells | K4 subject mix | K4 cells named | K5 copy gate | K5 false / moved served |\n|---|---|---|---|---|---|---|---|---|---|---|`);
  for (const a of Object.keys(v.K1)) {
    const k2 = v.K2[a], k4 = v.K4[a], k5 = v.K5[a];
    const ub = k2.unadjustedClearLosses.filter((s) => s.startsWith(`${BASE}|`)), uo = k2.unadjustedClearLosses.filter((s) => !s.startsWith(`${BASE}|`));
    P(`| ${a} | **${v.K1[a].verdict}** | ${v.K1[a].cells.join(", ") || "–"} | ${k2.veto === null ? "null (INVALID)" : k2.veto ? "**VETO**" : "no veto"} | ${k2.losses.join(", ") || "none"} | ${ub.join(", ") || "none"} | ${uo.join(", ") || "none"} | **${k4.reading}** | ${k4.narrower.join(", ") || "–"} | **${k5.gate}** | ${k5.carriesFalse} / ${k5.movedServed} (${k5.falseShare == null ? "–" : n3(k5.falseShare)}) |`);
  }
  P();
  P(`### K3 attribution (base cell; tie to the simpler)`);
  P(`| contrast | complex | simpler | wins | clear losses (simultaneous, 6) | preferred | Δ by persona (lo, hi) | one-at-a-time wins (context) |\n|---|---|---|---|---|---|---|---|`);
  for (const [k, x] of Object.entries(v.K3)) P(`| ${k} | ${x.complex} | ${x.simpler} | ${x.wins} | ${x.clearLosses.join(", ") || "none"} | **${x.prefer}** | ${x.rows.map((r) => `${r.persona} ${f(r.R.mean)} (${f(r.R.lo)}, ${f(r.R.hi)})${r.win ? " win" : ""}`).join("; ")} | ${Object.entries(x.oat).map(([c, w]) => `${c.replace("interleave:", "")} ${w}`).join("; ")} |`);
  P();
  P(`### K2 base-cell simultaneous intervals (Bonferroni, 6 personas)`);
  P(`| arm | ${Object.values(v.K2)[0].base.map((r) => r.persona).join(" | ")} |\n|---|${Object.values(v.K2)[0].base.map(() => "---").join("|")}|`);
  for (const [a, x] of Object.entries(v.K2)) P(`| ${a} | ${x.base.map((r) => `${f(r.mean)} (${f(r.lo)}, ${f(r.hi)})`).join(" | ")} |`);
  P();
  P(`### K4 outside-home share of served new cards: variant − default-order, every pass cell (lower end ≥ −0.05 holds)`);
  for (const [a, x] of Object.entries(v.K4)) {
    P(`#### ${a}: ${x.reading}; dropped episodes ${x.droppedEpisodes}`);
    const ps = Object.keys(x.base);
    P(`| cell | ${ps.map((p) => `${p} Δ (lo, hi) · ref level`).join(" | ")} |\n|---|${ps.map(() => "---").join("|")}|`);
    for (const [cn, byP] of Object.entries(x.cells)) P(`| ${cn} | ${ps.map((p) => `${f(byP[p].mean)} (${f(byP[p].lo)}, ${f(byP[p].hi)})${byP[p].holds ? "" : " **narrower**"} · ${n3(byP[p].refLevel)}`).join(" | ")} |`);
    P();
  }
  P(`### K5 served moved cards by cell`);
  for (const [a, x] of Object.entries(v.K5)) {
    P(`#### ${a}: ${x.gate}; pooled: moved served ${x.movedServed}, carries true ${x.carriesTrue}, false ${x.carriesFalse}, missing ${x.carriesNull}, near-ties ${x.nearTie} (context), served new ${x.servedNew}`);
    P(`| cell | moved served | false | true | missing | near-ties | false share |\n|---|---|---|---|---|---|---|`);
    for (const [cn, z] of Object.entries(x.byCell)) P(`| ${cn} | ${z.movedServed} | ${z.carriesFalse} | ${z.carriesTrue} | ${z.carriesNull} | ${z.nearTie} | ${z.falseShare == null ? "–" : n3(z.falseShare)} |`);
    P();
  }
  // K1 detail: every cell, full per-persona table (criterion 3b readout lesson: no guardrail interval summarised away)
  const iv = (d) => (d ? `${f(d.lo)} to ${f(d.hi)}` : "–");
  const full = (cell, jp, head) => {
    P(`${head} ${cell}: wins ${jp.wins} of ${jp.rows.length}, harmed ${jp.harmed.join(", ") || "none"}, guardrail fails ${jp.guardrailFails.join(", ") || "none"}, beats: ${yes(jp.beats)}`);
    if (jp.rows[0]?.g) {
      P(`| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|`);
      for (const r of jp.rows) P(`| ${r.persona} | ${f(r.R.mean)} | ${f(r.R.lo)} to ${f(r.R.hi)} | ${r.win ? "win" : ""} | ${r.harm ? "**harm**" : ""} | ${GK.map((k) => `${f(r.g[k].mean)} (${iv(r.g[k])})`).join(" | ")} | ${["G1", "G2", "G3", "G4"].map((k) => (r.holds[k] ? "holds" : "**fails**")).join(" | ")} |`);
    } else {
      P(`| persona | Δ | 95% interval | win | harm |\n|---|---|---|---|---|`);
      for (const r of jp.rows) P(`| ${r.persona} | ${f(r.R.mean)} | ${f(r.R.lo)} to ${f(r.R.hi)} | ${r.win ? "win" : ""} | ${r.harm ? "**harm**" : ""} |`);
    }
    P();
  };
  P(`## K1 detail: each variant vs default-order + fixed`);
  for (const [a, byCell] of Object.entries(v.cells)) {
    P(`### ${a}: ${v.K1[a].verdict}`);
    P(`| cell | wins | harmed | guardrail fails | beats | Δ by persona (lo, hi) |\n|---|---|---|---|---|---|`);
    for (const [cn, jp] of Object.entries(byCell)) P(`| ${cn} | ${jp.wins} | ${jp.harmed.join(", ") || "–"} | ${jp.guardrailFails.join(", ") || "–"} | ${yes(jp.beats)} | ${jp.rows.map((r) => `${r.persona.split("-")[0]} ${f(r.R.mean, 3)} (${f(r.R.lo, 3)}, ${f(r.R.hi, 3)})`).join("; ")} |`);
    P();
    for (const [cn, jp] of Object.entries(byCell)) full(cn, jp, "####");
  }
  P(`## Context (no rule reads these; criterion §4)`);
  for (const [k, x] of Object.entries(v.context)) { if (k === "headroom") continue; full(`${k} (${BASE})`, x, "###"); }
  if (v.context.headroom) P(`Ordering headroom in this world (oracle-order vs default-order, criterion 2 §2.3): **${v.context.headroom}**\n`);
  P(`## Descriptive, base cell (means per episode; engagement and descriptive, never a pass input)`);
  P(`EDP-style need coverage and domain diversity are labelled **"${Object.values(Object.values(v.descriptive)[0] ?? {})[0]?.circular?.label ?? "circular: diagnostic only"}"** (founder decision Q3): printed beside R₇, never a pass score.`);
  P();
  const keys = ["nNew", "nAll", "cards", "reveal", "revisitShare", "movedShare", "R1d", "g1TopDomainShare", "g2Concepts", "g3PrereqFirst", "g4Gain", "servedNew", "servedOutHome", "movedServed", "carriesFalse", "carriesTrue", "nearTie", "composes"];
  P(`| arm | persona | R₁ | R₇ | R₃₀ | circular: need coverage | circular: domain diversity | ${keys.join(" | ")} | served by session slot | moved by session slot |\n|---|---|---|---|---|---|---|${keys.map(() => "---").join("|")}|---|---|`);
  for (const [a, byP] of Object.entries(v.descriptive)) for (const [p, d] of Object.entries(byP)) {
    P(`| ${a} | ${p} | ${n3(d.Rlevels["1"])} | ${n3(d.Rlevels["7"])} | ${n3(d.Rlevels["30"])} | ${n3(d.circular?.needCoverageRate)} | ${n3(d.circular?.domainDiversity)} | ${keys.map((k) => n3(d[k])).join(" | ")} | ${d.servedBySlot.map(n3).join(" ")} | ${d.movedBySlot.map(n3).join(" ")} |`);
  }
  return out.join("\n");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const arg = (k) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : null; };
  const root = arg("root"), merged = arg("merged");
  if (!root || !merged) { console.error("usage: readoutS-tables.mjs --root=<out root> --merged=<merged dir> [--plumbing-test]"); process.exit(2); }
  checkRun({ root, merged, plumbingTest: process.argv.includes("--plumbing-test") }).then((chk) => {
    if (!chk.ok) { console.error(`parts check REFUSED; no tables printed:\n- ${chk.problems.join("\n- ")}`); process.exit(1); }
    console.log(tables(JSON.parse(readFileSync(join(merged, "verdicts.json"), "utf8")), JSON.parse(readFileSync(join(merged, "manifest.json"), "utf8")), chk));
  }).catch((e) => { console.error(String(e.stack || e)); process.exit(1); });
}
