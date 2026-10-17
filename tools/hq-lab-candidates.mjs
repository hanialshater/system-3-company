#!/usr/bin/env node
// Adapter: the frozen website candidates (reachable-v2, reachable-v3) on the HQ lab's simulator (W-1648;
// batch 5 §20.2, company/personalization/batches/2026-10-17-batch-5.md). owner: personalization-engineer.
// Run only by tools/hq-lab-precompute.mjs (locally, never in production); prints one JSON document to stdout.
//
//   node tools/hq-lab-candidates.mjs            every simulated persona × candidate, seed 1, 7 days
//
// Rules this file keeps (§20.2):
// - Only the two allowlisted files (src/lib/hq-personalization-candidates.ts CANDIDATES), each imported unchanged
//   from company/personalization/policies/. The bytes are hashed before and after the import; any mismatch refuses
//   (exit 3) and the generator writes nothing. Any other reachable-* name (v1 included) is refused.
// - SIMULATED PERSONAS ONLY: personas.ts, the lab catalogue (sim/catalog.mjs) and lesson titles from meta.json.
//   Nothing from company/personalization/eval/ (no harness import, no run, no copied output).
// - Stored per card: slugs, titles, positions, rank's reason *code* and its `versus` slug, and (v3) `moves`'
//   key, direction and named lesson. rank's numeric fields (value, pKnown, estimate, indexes, days) are dropped.
//
// The lab simulator's policy switch (sim/simulate.mjs choose()) is internal and the simulator is
// learner-model-engineer's, so this adapter runs the same episode loop as runEpisode() with one change: the new
// card comes from the candidate's decide(). tests/hq/personalization-candidates.test.mjs proves the loop is the
// simulator's: driven by default-order it reproduces runEpisode()'s served sequence and score for every persona.
// Mapping (adapter choices, listed so a reviewer can challenge them):
// - ReachableInput = { now: the step's clock, history: the episode's history (slug, completedAt, predictedCorrectly,
//   recalls), dims: the lab catalogue's pilot dims, slots: 1, shown: [] }. The lab has no display, so no pins.
// - dims drop the lab catalogue's misconceptionStrength: it is a placeholder hash, not a rating (catalog.mjs), and the
//   product's dims index omits the field where no rating exists. v2 then reads every rating as absent; v3 reads none.
// - The default card at a step is the first lesson of the lab catalogue's default order not yet in history; the
//   adapter refuses unless that order equals default-order-rule.md's rule computed here from the same dims.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SIM = "company/personalization/model/sim";
const L = await import(pathToFileURL(path.join(ROOT, "src/lib/hq-personalization-candidates.ts")).href);
export const { CANDIDATES, CANDIDATE_LABEL } = L;
export const SEED = 1;
export const DAYS = 7;
export const SIMULATED_ONLY = "simulated personas only; no real learner data is read";

export class CandidateRefused extends Error {}
const sha = (b) => createHash("sha256").update(b).digest("hex");

/** Import one allowlisted candidate, unchanged, only if its bytes hash to the frozen sha256 (before and after). */
export async function loadCandidate(name, root = ROOT) {
  if (!Object.hasOwn(CANDIDATES, name)) throw new CandidateRefused(`${name} is not a candidate the lab may show (batch 5 §20.2 allows reachable-v2 and reachable-v3 only)`);
  const c = CANDIDATES[name];
  const abs = path.join(root, c.file);
  const hash = () => { try { return sha(readFileSync(abs)); } catch { return "missing"; } };
  const before = hash();
  if (before !== c.sha256) throw new CandidateRefused(`${c.file} sha256 ${before} is not the frozen ${c.sha256}; refusing, nothing written`);
  const mod = await import(pathToFileURL(abs).href);
  const after = hash();
  if (after !== c.sha256) throw new CandidateRefused(`${c.file} changed while it was imported (${after}); refusing, nothing written`);
  const api = mod[name === "reachable-v2" ? "REACHABLE_V2" : "REACHABLE_V3"];
  if (!api || api.name !== name || typeof api.rank !== "function" || typeof api.decide !== "function" || (c.hasMoves !== (typeof api.moves === "function")))
    throw new CandidateRefused(`${c.file} does not export the interface the adapter expects (rank, decide${c.hasMoves ? ", moves" : ""}); stop and report`);
  return api;
}

/** default-order-rule.md steps 1-4 (published first, code-unit slug order, domain round-robin). */
export function ruleOrder(dims) {
  const rank = (d) => (d.status === undefined || d.status === "published" ? 0 : 1);
  const sorted = Object.values(dims).sort((a, b) => rank(a) - rank(b) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  const groups = new Map();
  for (const d of sorted) groups.set(d.domain, [...(groups.get(d.domain) ?? []), d.slug]);
  const qs = [...groups.values()], out = [];
  while (qs.some((q) => q.length)) for (const q of qs) if (q.length) out.push(q.shift());
  return out;
}

// Same as simulate.mjs's private fnv (seed derivation); the parity test fails if they ever differ.
const fnv = (s) => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h; };

export async function simulator(root = ROOT) {
  const imp = (f) => import(pathToFileURL(path.join(root, SIM, f)).href);
  const [M, S, Lr, Sc, C, Cat, P] = await Promise.all([imp("../model.ts"), imp("simulate.mjs"), imp("learner.ts"), imp("score.ts"), imp("composer.ts"), imp("catalog.mjs"), imp("../personas.ts")]);
  return { M, S, Lr, Sc, C, cat: Cat.loadCatalog(root), PERSONAS: P.PERSONAS };
}

/**
 * runEpisode() from sim/simulate.mjs with the new-card choice passed in: choose(input, t) → { slug, moved, rec }.
 * onStep receives each step (with `rec`). Returns { score, steps, preHistory }.
 */
export function runWith(sim, { persona, policy, seed, days, choose }) {
  const { M, S, Lr, Sc, cat } = sim;
  const key = `${seed}|${persona.id}`;
  const histRand = S.rng(fnv(key + "|history"));
  const learnRand = S.rng(fnv(key + "|learner"));
  S.rng(fnv(key + "|policy|" + policy)); // drawn by runEpisode too; candidates use no randomness
  const pre = S.seedHistory(persona, cat, histRand);
  const prereqsOf = (c) => (cat.prereqsByConcept[c] || []);
  const learner = Lr.makeLearner(persona, Lr.BASE_PARAMS, { pilotConcepts: cat.pilotConcepts, prereqsOf }, learnRand);
  learner.seedKnowledge(pre.history, cat.dims);
  const history = pre.history.map((h) => ({ ...h, recalls: [...h.recalls] }));
  const simSlugs = new Set();
  const log = Sc.newLog(learner.knownCount());
  const steps = [];
  for (let day = 0; day <= days; day++) {
    let t = S.BASE_T + day * S.DAY + 9 * 3_600_000;
    let cards = 0;
    for (;;) {
      const due = history.filter((h) => simSlugs.has(h.slug) && h.recalls.length === 0 && h.completedAt + S.DAY <= t).map((h) => h.slug);
      if (due.length) {
        const slug = due[0];
        const ok = learner.revisit(cat.dims[slug], t);
        history.find((h) => h.slug === slug).recalls.push({ at: t, correct: ok });
        log.firstRecalls.push(ok);
        steps.push({ step: steps.length, day, kind: "revisit", slug });
        t += 60_000; continue;
      }
      if (day === days || cards >= S.SIM.maxCardsPerDay) break;
      const fingerprint = M.fingerprintFrom(history, cat.dims, t);
      const needs = M.detect(fingerprint);
      const input = { fingerprint, needs, remaining: { ...needs }, pool: cat.lessons, defaultOrder: cat.defaultOrder, queued: [], history, dueRevisits: [], personalisationOn: true };
      const pick = choose(input, t);
      if (!pick) break;
      const lesson = cat.dims[pick.slug];
      const doneConcepts = new Set(history.map((h) => cat.dims[h.slug]?.concept));
      const beforePrereq = prereqsOf(lesson.concept).some((c) => !doneConcepts.has(c));
      const out = learner.study(lesson, t);
      log.started++; cards++;
      if (beforePrereq) log.prereqFirst++;
      if (pick.moved) log.moved++;
      if (out.revealed) {
        log.revealed++;
        history.push({ slug: pick.slug, completedAt: t, predictedCorrectly: out.predictedRight, recalls: [] });
        simSlugs.add(pick.slug); log.domains.add(lesson.domain); log.concepts.add(lesson.concept);
      }
      steps.push({ step: steps.length, day, kind: "new", served: pick.slug, moved: pick.moved, rec: pick.rec });
      t += 120_000;
      if (out.stop) break;
    }
  }
  log.knownEnd = learner.knownCount();
  return { score: Sc.scoreEpisode(log), steps, preHistory: pre.history.length };
}

/** The default-order choice, as simulate.mjs's choose() makes it (parity test only). */
export const defaultChoose = (sim) => (input) => {
  const c = sim.C.defaultOrderPolicy(input);
  const p = c.picks.find((x) => x.reason !== "due-revisit");
  return p ? { slug: p.slug, moved: p.moved } : null;
};

function titles(root, cat) {
  const out = {};
  for (const l of cat.lessons) out[l.slug] = String(JSON.parse(readFileSync(path.join(root, "src/demos", l.domain, l.slug, "meta.json"), "utf8")).title ?? l.slug);
  return out;
}

const firstNotDone = (order, history) => { const done = new Set(history.map((h) => h.slug)); return order.find((s) => !done.has(s)) ?? null; };

function storedMove(m, title, line) {
  if (!m) return undefined;
  const key = m.moved && m.direction && m.code ? `${m.direction}:${m.code}` : null;
  const l = key ? line(key) : undefined;
  const named = !l || l.title === "none" ? null : (m.facts[l.title] ?? [])[0] ?? null; // first slug, the field's own order (RC §2)
  return { moved: m.moved, direction: m.direction, code: m.code, key, line: l ? l.id : null, named, namedTitle: named ? title[named] ?? named : null };
}

/** Every simulated persona × candidate: the start order next to default order, and the episode's served cards. */
export async function candidateDocs(root = ROOT) {
  const apis = {};
  for (const name of Object.keys(CANDIDATES)) apis[name] = await loadCandidate(name, root); // refuses before any run
  const sim = await simulator(root);
  const { cat } = sim;
  const rule = ruleOrder(cat.dims);
  if (rule.length !== cat.defaultOrder.length || rule.some((s, i) => s !== cat.defaultOrder[i]))
    throw new CandidateRefused("the lab catalogue's default order is not default-order-rule.md's order; stop and report");
  const dims = Object.fromEntries(Object.entries(cat.dims).map(([k, d]) => {
    const { misconceptionStrength: _placeholder, ...rest } = d;
    return [k, { ...rest, prerequisites: [...d.prerequisites], successors: [...d.successors] }];
  }));
  const title = titles(root, cat);
  const docs = [];
  for (const persona of sim.PERSONAS) for (const [name, api] of Object.entries(apis)) {
    const c = CANDIDATES[name];
    const rin = (history, now) => ({ now, history: history.map((h) => ({ slug: h.slug, completedAt: h.completedAt, predictedCorrectly: h.predictedCorrectly, recalls: h.recalls.map((r) => ({ ...r })) })), dims, slots: 1, shown: [] });
    let start = null;
    const run = runWith(sim, { persona, policy: name, seed: SEED, days: DAYS, choose: (input, t) => {
      const r = rin(input.history, t);
      const ranked = api.rank(r);
      if (!ranked.length) return null;
      const top = ranked[0];
      const dec = api.decide(r);
      if (!dec || dec.slug !== top.slug) throw new CandidateRefused(`${name}: decide() is not rank()[0]; stop and report`);
      const mv = c.hasMoves ? api.moves(r) : null;
      const moveOf = mv ? new Map(mv.map((m) => [m.slug, m])) : null;
      const def = firstNotDone(cat.defaultOrder, input.history);
      if (!start) {
        const done = new Set(input.history.map((h) => h.slug));
        const defPos = new Map(cat.defaultOrder.filter((s) => !done.has(s)).map((s, i) => [s, i]));
        start = { preHistory: input.history.length, rows: ranked.map((x, i) => ({ slug: x.slug, title: title[x.slug] ?? x.slug, rankPos: i, defaultPos: defPos.get(x.slug) ?? -1,
          rankCode: x.reason.code, versus: x.reason.versus ?? null, ...(moveOf ? { move: storedMove(moveOf.get(x.slug), title, L.lineFor) } : {}) })) };
      }
      return { slug: top.slug, moved: top.slug !== def, rec: { defaultCard: def, rankCode: top.reason.code, versus: top.reason.versus ?? null,
        ...(moveOf ? { move: storedMove(moveOf.get(top.slug), title, L.lineFor) } : {}) } };
    } });
    docs.push({
      schema: "personalization-hq-candidate-v1", label: CANDIDATE_LABEL, simulatedOnly: SIMULATED_ONLY,
      candidate: { name, version: api.version, file: c.file, sha256: c.sha256, hasMoves: c.hasMoves },
      persona: { id: persona.id, name: persona.name },
      run: { seed: SEED, days: DAYS, simulator: `${SIM}/simulate.mjs (episode loop, as runEpisode)`, adapter: "tools/hq-lab-candidates.mjs",
        notes: ["ReachableInput: now = step clock, history = the episode's, dims = lab pilot catalogue, slots 1, shown [] (no display pins in the lab)",
          "dims carry no misconceptionStrength: the lab catalogue's is a placeholder hash, not a rating",
          "default card = first lesson of the default order (default-order-rule.md, checked) not yet finished",
          "stored: slugs, titles, positions, rank reason codes and versus slugs, v3 moves key/direction/named lesson; no rank numbers, no simulated outcomes or scores"] },
      start,
      steps: run.steps.map((s) => s.kind === "revisit" ? s : { step: s.step, day: s.day, kind: "new", served: s.served, servedTitle: title[s.served] ?? s.served, moved: s.moved, ...s.rec }),
    });
  }
  return docs;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.stdout.write(JSON.stringify({ docs: await candidateDocs() }));
  } catch (e) {
    process.stdout.write(JSON.stringify({ error: e instanceof CandidateRefused ? `refused: ${e.message}` : String(e?.stack ?? e) }));
    process.exit(e instanceof CandidateRefused ? 3 : 1);
  }
}
