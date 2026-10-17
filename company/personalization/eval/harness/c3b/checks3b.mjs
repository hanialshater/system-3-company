// Criterion 3b's checks (§4, §5): the judge's identity with readout 3, and the candidate's validity checks V1 to V10.
// owner: personalization-eval (Uma) · run: eval-k5-1017 · criterion: company/personalization/eval/2026-10-17-criterion-3b.md
// Every validity check below was written, and every threshold set, BEFORE the candidate file was read (§4.0). In K5 they
// run on fixtures only (tests3b.test.mjs); K6 runs them on the candidate inside run3b.mjs, after the freeze.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { PERSONAS } from "../personas.copy.mjs";
import { runEpisode3, cellByName3, reachableInput } from "../c3/harness3.mjs";
import { makeReachableOracle } from "../c3/reachable-oracle.mjs";
import { slotHarness, setSlot, loadCandidate } from "./slot.mjs";
import { CATALOG_SHA256_C3, catalogSha, ROOT } from "./harness3b.mjs";
import { lex, copyCheck, corpusText, COPY } from "./copy-check.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const C3 = join(HERE, "..", "c3");
const DAY = 86_400_000;
const sha = (s) => createHash("sha256").update(s).digest("hex");
export const READOUT3 = join(HERE, "..", "records", "2026-10-17-readout-3");
export const ORACLE_FILE = join(C3, "reachable-oracle.mjs");

// ---------------- 3b-ID0: criterion 3's files, criterion text and catalogue are readout 3's ----------------
export function identityFiles3b() {
  const man = JSON.parse(readFileSync(join(READOUT3, "interleave", "manifest.json"), "utf8"));
  const man2 = JSON.parse(readFileSync(join(READOUT3, "first", "manifest.json"), "utf8"));
  const bad = Object.entries(man.fileSha256).filter(([f, h]) => sha(readFileSync(join(C3, f))) !== h).map(([f]) => f);
  const crit = sha(readFileSync(join(HERE, "..", "..", "2026-10-17-criterion-3.md")));
  const cat = catalogSha();
  const same = JSON.stringify(man.fileSha256) === JSON.stringify(man2.fileSha256) && man.criterionSha256 === man2.criterionSha256;
  return { ok: bad.length === 0 && crit === man.criterionSha256 && cat === CATALOG_SHA256_C3 && same, files: Object.keys(man.fileSha256).length, bad,
    criterion3: crit === man.criterionSha256, catalog: cat === CATALOG_SHA256_C3, manifestsAgree: same, commit: man.commit };
}

// ---------------- 3b-ID1: the slot is criterion 3's episode ----------------
export const ID1_CELLS = ["interleave:base", "first:base", "interleave:slots-low", "interleave:prereqPenalty-high", "first:revisitSlotCost-high", "interleave:price-corner"];
/** The fixture in the slot gives the reference arm's episode, and the oracle in the slot gives criterion 3's reachable
 *  arm's episode: episode hash and world hash, every persona, readout 3's first two seeds (arms already published). */
export async function identitySlot({ fixturePath, cells = ID1_CELLS, seeds = [1001, 1002] } = {}) {
  const slot = await slotHarness();
  const fx = await loadCandidate(fixturePath);
  let n = 0; const diffs = [];
  for (const cn of cells) {
    const cell = cellByName3(cn);
    for (const p of PERSONAS) for (const seed of seeds) {
      setSlot({ name: fx.name, decide: fx.decide });
      const a = runEpisode3({ persona: p, arm: "default-order+fixed", seed, cell });
      const b = slot.runEpisode3({ persona: p, arm: "reachable+fixed", seed, cell });
      setSlot({ name: "oracle", usesPop: true, withPop: (pop) => makeReachableOracle(pop), decide: () => null });
      const c = runEpisode3({ persona: p, arm: "reachable+fixed", seed, cell });
      const d = slot.runEpisode3({ persona: p, arm: "reachable+fixed", seed, cell });
      n += 2;
      if (a.hash !== b.hash || a.worldHash !== b.worldHash) diffs.push(`fixture|${cn}|${p.id}|${seed}`);
      if (c.hash !== d.hash || c.worldHash !== d.worldHash) diffs.push(`oracle|${cn}|${p.id}|${seed}`);
    }
  }
  return { ok: n > 0 && diffs.length === 0, n, diffs: diffs.slice(0, 10) };
}

// ---------------- 3b-ID2: the reference arm reproduces readout 3's reference rows ----------------
/** refScores[cell][persona] = score objects of the reference arm at readout 3's seeds (run by run3b's workers). Compares the
 *  descriptive means readout 3 printed for the reference arm in its base cells. Reference arm only: no other arm is read. */
export const DESCRIPTIVE_KEYS = ["nNew", "revisits", "revisitShare", "cards", "reveal", "movedShare", "R1d"];
const mean = (xs) => { const v = xs.filter((x) => !Number.isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : NaN; };
export function referenceDescriptive(ss) {
  return Object.fromEntries(DESCRIPTIVE_KEYS.map((k) => [k, mean(ss.map((s) => s[k]))]).concat(Object.keys(ss[0].extra).map((k) => [k, mean(ss.map((s) => s.extra[k]))])));
}
export function chainReadout3(refScores, placements = ["interleave", "first"]) {
  const out = {}; let ok = true;
  for (const [pl, cell] of [["interleave", "interleave:base"], ["first", "first:base"]].filter(([pl]) => placements.includes(pl))) {
    const v = JSON.parse(readFileSync(join(READOUT3, pl, "verdicts.json"), "utf8")).descriptive[cell]["default-order+fixed"];
    for (const p of Object.keys(v)) {
      const mine = JSON.parse(JSON.stringify(referenceDescriptive(refScores[cell][p])));
      const same = JSON.stringify(mine) === JSON.stringify(v[p]);
      out[`${cell}|${p}`] = same; ok &&= same;
    }
  }
  return { ok, cells: out };
}
export const READOUT3_SEEDS = () => { const m = JSON.parse(readFileSync(join(READOUT3, "interleave", "manifest.json"), "utf8")); const [a, b] = m.seedList.split("..").map(Number); return Array.from({ length: b - a + 1 }, (_, i) => a + i); };

// ---------------- V1: static (imports nothing; no clock, randomness, environment or I/O) ----------------
export const V1_NAMES = ["Math.random", "Date", "performance", "process", "globalThis", "require", "fetch", "XMLHttpRequest", "WebSocket",
  "localStorage", "sessionStorage", "indexedDB", "document", "window", "navigator", "setTimeout", "setInterval", "setImmediate",
  "queueMicrotask", "eval", "Function", "crypto", "WebAssembly", "SharedArrayBuffer", "Atomics", "Worker"];
export function v1Static(source) {
  const code = lex(source).code;
  const problems = [];
  if (/(^|[^.\w$])import\b/.test(code)) problems.push("import (any form, type-only included)");
  if (/\bexport\b[^;{}]*\bfrom\b/.test(code) || /\bexport\s*\*/.test(code)) problems.push("re-export from a module");
  for (const w of V1_NAMES) { const re = new RegExp(`(^|[^.\\w$])${w.replace(".", "\\s*\\.\\s*")}(?![\\w$])`); if (re.test(code)) problems.push(`names ${w}`); }
  if (/\bimport\s*\.\s*meta\b/.test(code)) problems.push("names import.meta");
  return { ok: problems.length === 0, problems };
}

// ---------------- V2, V4 to V8: per-call checks on one input ----------------
const deepFreeze = (o) => { if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); for (const v of Object.values(o)) deepFreeze(v); } return o; };
const clone = (o) => structuredClone(o);
const J = (x) => JSON.stringify(x);
const shift = (inp, ms) => reachableInput(inp.history.map((h) => ({ ...h, completedAt: h.completedAt + ms, recalls: h.recalls.map((r) => ({ ...r, at: r.at + ms })) })), inp.now + ms, inp.dims, inp.slots);
/** Every key a candidate must not read (AMD-008 P2, privacy N3, criterion 2 §I.3 "Not given"), plus fields of the review
 *  interface and the episode a candidate never receives. */
export const V5_KEYS = [...M.FORBIDDEN_INPUTS, "gapDays", "daysSinceLastSession", "settings", "persona", "personaId", "fixedDue", "day", "sessionIndex", "seed"];
const V5_VALUES = [[1, 7], ["a", "b"]];
/** N3's form: two inputs equal in every permitted field and different in every forbidden one, at the top level and on
 *  every history item. */
const withForbidden = (inp, val) => deepFreeze({ ...clone(inp), ...Object.fromEntries(V5_KEYS.map((k) => [k, val])),
  history: inp.history.map((h) => ({ ...clone(h), ...Object.fromEntries(V5_KEYS.map((k) => [k, val])) })) });

/**
 * cand: { decide, rank } (loaded). input: a deep-frozen §I.3 object from the candidate's own episode. others: inputs from
 * other learners or later picks (V7). fresh: a second, freshly imported instance of the same file (V7).
 * Returns { ok, V2, V4, V5, V6, V7, V8, notes }.
 */
export function callChecks(cand, input, { others = [], fresh = null } = {}) {
  const res = {}, notes = [];
  const run = (c, x) => J([c.decide(x) ?? null, c.rank(x)]);
  let a;
  try { a = run(cand, input); } catch (e) { return { ok: false, V4: false, notes: [`throws on the frozen input: ${String(e.message || e).slice(0, 160)}`] }; }
  // V2 replay in process
  res.V2 = run(cand, input) === a;
  // V4 frozen input: no mutation of an unfrozen copy, same answer
  try { const u = clone(input); const before = J(u); const b = run(cand, u); res.V4 = J(u) === before && b === a; if (!res.V4) notes.push("V4: mutated an unfrozen copy or answered differently"); }
  catch (e) { res.V4 = false; notes.push(`V4: throws on an unfrozen copy: ${String(e.message || e).slice(0, 120)}`); }
  // V5 forbidden-input invariance: each key alone at two values, then N3's every-key form at two values
  try {
    const one = V5_KEYS.every((k) => V5_VALUES.every((vals) => vals.every((v) => run(cand, deepFreeze({ ...input, [k]: v })) === a)));
    const all = V5_VALUES.every((vals) => vals.every((v) => run(cand, withForbidden(input, v)) === a));
    res.V5 = one && all; if (!res.V5) notes.push(`V5: output changes with a forbidden field (single keys ${one}, N3 form ${all})`);
  } catch (e) { res.V5 = false; notes.push(`V5: throws with a forbidden field: ${String(e.message || e).slice(0, 120)}`); }
  // V6 time translation: `now` only as elapsed time
  try { res.V6 = [37 * DAY + 12_345, -400 * DAY].every((ms) => run(cand, shift(input, ms)) === a); if (!res.V6) notes.push("V6: output changes when every timestamp moves together"); }
  catch (e) { res.V6 = false; notes.push(`V6: throws on a shifted input: ${String(e.message || e).slice(0, 120)}`); }
  // V7 no state between calls: other inputs first, then this one; and a fresh module instance
  try { for (const o of others) run(cand, o); res.V7 = run(cand, input) === a && (!fresh || run(fresh, input) === a); if (!res.V7) notes.push("V7: output depends on earlier calls or on the module instance"); }
  catch (e) { res.V7 = false; notes.push(`V7: ${String(e.message || e).slice(0, 120)}`); }
  // V8 well formed (criterion 3b §I.2)
  const [d, r] = JSON.parse(a);
  const done = new Set(input.history.map((h) => h.slug));
  const eligible = Object.keys(input.dims).filter((s) => !done.has(s));
  const w = [];
  if (!Array.isArray(r)) w.push("rank is not an array");
  else {
    const slugs = r.map((x) => x && x.slug);
    if (slugs.some((s) => typeof s !== "string")) w.push("a rank item has no string slug");
    if (new Set(slugs).size !== slugs.length) w.push("a slug twice in rank");
    if (slugs.length !== eligible.length || !eligible.every((s) => slugs.includes(s))) w.push(`rank does not list every eligible lesson once (${slugs.length} vs ${eligible.length})`);
    if (r.some((x) => x && (typeof x.value !== "number" || !Number.isFinite(x.value)))) w.push("a rank item has no finite numeric value");
    if (r.some((x) => x && x.reason === "due-revisit")) w.push('a reason equals "due-revisit" (the harness reserves it)');
  }
  if (eligible.length === 0 ? d !== null : (d === null || J(d) !== J(r?.[0]))) w.push("decide is not rank[0] (or not null when nothing is eligible)");
  res.V8 = w.length === 0; if (w.length) notes.push(...w.map((x) => `V8: ${x}`));
  return { ok: Object.values(res).every(Boolean), ...res, notes };
}

// ---------------- V3: replay across processes (call level) ----------------
export function v3CrossProcess(cand, path, inputs) {
  const dir = mkdtempSync(join(tmpdir(), "c3b-v3-"));
  try {
    const f = join(dir, "inputs.json");
    writeFileSync(f, J(inputs));
    const parsed = JSON.parse(readFileSync(f, "utf8")).map(deepFreeze);
    const here = parsed.map((x) => J([cand.decide(x) ?? null, cand.rank(x)]));
    const child = spawnSync(process.execPath, [join(HERE, "replay-child.mjs"), path, f], { encoding: "utf8", maxBuffer: 1 << 30, env: { ...process.env, NODE_NO_WARNINGS: "1" } });
    if (child.status !== 0) return { ok: false, why: child.stderr.slice(0, 300) };
    const there = child.stdout.trim().split("\n");
    const diff = here.findIndex((x, i) => x !== there[i]);
    return { ok: there.length === here.length && diff < 0, n: here.length, firstDiff: diff };
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
/** V3, episode level: harness3b.mjs `episode` in two fresh processes gives one hash. */
export function v3Episode({ candidatePath, persona, seed, cell }) {
  const args = [join(HERE, "harness3b.mjs"), "episode", `--candidate=${candidatePath}`, `--persona=${persona}`, `--seed=${seed}`, `--cell=${cell}`];
  const run = () => spawnSync(process.execPath, args, { encoding: "utf8", env: { ...process.env, NODE_NO_WARNINGS: "1" } });
  const a = run(), b = run();
  if (a.status !== 0 || b.status !== 0) return { ok: false, why: (a.stderr || b.stderr).slice(0, 200) };
  return { ok: a.stdout.trim() === b.stdout.trim() && /^[0-9a-f]{64}$/.test(a.stdout.trim()), hash: a.stdout.trim() };
}

// ---------------- V9 hash, V10 copy ----------------
export function v9Hash(cand, expected) { return { ok: !!expected && cand.sha256 === expected, sha256: cand.sha256, expected }; }
/** extraCorpus: [{ commit, path }] added at K6 (A1's sheet at its commit, criterion 3b §4.2). */
export function v10Copy(source, extraCorpus = []) {
  const r = copyCheck(source, readFileSync(ORACLE_FILE, "utf8"), corpusText(ROOT, extraCorpus), COPY);
  return { ok: !r.copy, ...r };
}
export { COPY };

// ---------------- Input facts K-a to K-d and two report-only probes (criterion 3b §4.3; F5 request, 74fdb37 §4) ----------------
// Facts about the input the slot gives a candidate (the judge's side; criterion 3's reachableInput, unchanged). They
// are recorded before any score and make nothing INVALID. The probes look at the candidate's behaviour only, never at its source.
import { CRITERION2 } from "../c2/world2.mjs";
import { catalog } from "../c3/harness3.mjs";
import { defaultOrderFromDims } from "../c3/reachable-oracle.mjs";
export const RATING_FIELD = "misconceptionStrength"; // the dims field the world fills with the simulated rating (harness.mjs poolFor)
export function inputFacts(input, cat = catalog()) {
  const keys = Object.keys(input.dims);
  const firstDiff = keys.findIndex((k, i) => k !== cat.defaultOrder[i]);
  const ratings = Object.values(input.dims).map((d) => d[RATING_FIELD]);
  return {
    Ka_keyOrderIsDefaultOrder: firstDiff < 0 && keys.length === cat.defaultOrder.length, Ka_firstDifferenceAt: firstDiff,
    Ka_keyOrderIsCatalogueLessonOrder: J(keys) === J(cat.lessons.map((l) => l.slug)),
    Ka_defaultOrderDerivableFromDims: J(defaultOrderFromDims(input.dims)) === J(cat.defaultOrder),
    Kb_ratingField: RATING_FIELD, Kb_ratingValues: [...new Set(ratings)].sort(), Kb_everyLessonHasIt: ratings.every((r) => [1, 2, 3].includes(r)),
    Kc_rho: CRITERION2.rho.value,
    Kd_pilotOnly: keys.length === cat.lessons.length && keys.every((k) => cat.dims[k]) && [...new Set(Object.values(input.dims).map((d) => d.domain))].sort().join(",") === "cs,probability",
    Kd_lessons: keys.length,
  };
}
/** Probe (report only): among rank items of exactly equal value, the share of adjacent pairs in default order. */
export function tieOrderProbe(cand, input, cat = catalog()) {
  const pos = new Map(cat.defaultOrder.map((s, i) => [s, i]));
  const r = cand.rank(input); let pairs = 0, agree = 0;
  for (let i = 1; i < r.length; i++) if (r[i].value === r[i - 1].value) { pairs++; if (pos.get(r[i - 1].slug) < pos.get(r[i].slug)) agree++; }
  return { tiedPairs: pairs, inDefaultOrder: agree };
}
/** Probe (report only): permute the rating field across lessons (fixed rotation); does rank change? */
export function ratingProbe(cand, input) {
  const keys = Object.keys(input.dims), vals = keys.map((k) => input.dims[k][RATING_FIELD]);
  const dims = Object.fromEntries(keys.map((k, i) => [k, { ...input.dims[k], [RATING_FIELD]: vals[(i + 1) % vals.length] }]));
  return { changes: J(cand.rank(input)) !== J(cand.rank(deepFreeze({ ...input, dims: deepFreeze(dims) }))) };
}
