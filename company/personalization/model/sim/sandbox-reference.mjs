// Reference re-implementation of detect() + the session compose, from the hq-cli `sandbox` document ONLY.
// owner: learner-model-engineer (Ifeoma) · offline · plain JS, imports nothing (not the model, not the simulator).
//
// Purpose: the HQ sandbox (founder decision 2026-10-20 Q2: curves and coefficients dragged in the browser, the
// session recomputed live, nothing saved) must recompute what composer-session.ts computes without importing the
// model. This file is the executable spec of that recomputation. composer-session.test.mjs asserts that, for every
// persona and both variants, recompose(doc) equals the CLI's own `composed` session in the same document. A browser
// port should copy this file's arithmetic in the same order (sums are left to right, so the floats match exactly).
//
// What the document fixes for one session (sandbox --persona --variant --seed): the fingerprint (from the persona's
// seeded pre-history), the eligible pool in default order with addr[lesson][need] (relational, fixed for the
// session), the gated surprise/novelty values (0 while both gates are shut), the anti-bubble streak, and the
// coefficients (from model-v0.4.0 they include addrUse). What the sandbox may change: needShapes (curves), dampener, coefficients. Changing anything else
// (history, pool, gates) needs a new document from the CLI.

const NEEDS = ["repair", "build", "breadth", "stretch"];
const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));

/** pwl() exactly as model.ts (flat outside the breakpoints). */
export function pwl(x, c) {
  if (x <= c.bps[0]) return c.vals[0];
  for (let i = 1; i < c.bps.length; i++) {
    if (x <= c.bps[i]) return c.vals[i - 1] + ((c.vals[i] - c.vals[i - 1]) * (x - c.bps[i - 1])) / (c.bps[i] - c.bps[i - 1]);
  }
  return c.vals[c.vals.length - 1];
}

/** detect() exactly as model.ts: clamp(Σ w·pwl(x)/Σw) × pwl(historySize, dampener), same summation order. */
export function detect(fp, shapes, dampener) {
  const damp = pwl(fp.historySize, dampener);
  const out = {};
  for (const need of NEEDS) {
    const cs = shapes[need];
    const wsum = cs.reduce((s, c) => s + c.w, 0);
    const contributions = cs.map((c) => (c.w * pwl(clamp(fp[c.signal] ?? 0), c)) / Math.max(wsum, 1e-9));
    out[need] = clamp(contributions.reduce((s, x) => s + x, 0)) * damp;
  }
  return out;
}

/**
 * Recompose the session from a sandbox document. `over` replaces needShapes, dampener or coefficients (the drag).
 * Returns { needs, picks: [{slug, moved, reason, score}], remaining, coverage, slots: [{slug, margin, gain, terms}] }
 * (gain: the winner's resolvable need mass, the attention budget's quantity; added at model-v0.4.0).
 */
export function recompose(doc, over = {}) {
  const shapes = over.needShapes ?? doc.needShapes;
  const dampener = over.dampener ?? doc.dampener;
  const c = over.coefficients ?? doc.session.coefficients;
  const off = new Set(doc.session.off ?? []);
  const k = doc.constraints;
  const needs = detect(doc.fingerprint, shapes, dampener);
  const remaining = { ...needs };
  const coverage = { repair: 0, build: 0, breadth: 0, stretch: 0 };
  const totalNeed = NEEDS.reduce((s, n) => s + needs[n], 0);
  const personalised = k.personalisationOn && totalNeed > 0;
  const taken = new Set();
  let streak = k.antiBubbleStreak;
  const picks = [], slots = [];
  for (let s = 0; s < doc.session.size; s++) {
    const eligible = doc.candidates.filter((x) => !taken.has(x.slug)); // already in default order, already filtered
    if (!eligible.length) break;
    const def = eligible[0];
    const n = eligible.length;
    const scored = eligible.map((l, i) => {
      const isDefault = l.slug === def.slug;
      const t = [];
      const add = (name, v) => t.push({ name, value: off.has(name) ? 0 : v });
      add("base", c.base * (n > 1 ? 1 - i / (n - 1) : 1));
      for (const need of NEEDS) add(`need:${need}`, c.onRem[need] * remaining[need] * l.addr[need]);
      for (const need of NEEDS) add(`cov:${need}`, isDefault ? 0 : c.onCov[need] * coverage[need] * l.addr[need]); // model-v0.4.0: no cov on the default card
      add("surprise", l.surprise);
      add("novelty", l.novelty);
      add("slotDecay", isDefault ? 0 : -c.slotDecay * s);
      add("attentionCost", isDefault ? 0 : -c.attentionCost);
      // model-v0.4.0: EDP's gain, the need mass this card would resolve (left to right over NEEDS, as composer-session.ts).
      let gain = 0;
      for (const need of NEEDS) gain += Math.min(remaining[need], c.addrUse * l.addr[need]);
      const ok = isDefault || (!(k.stretchNeedsSomePrereq && l.stretchBlocked) && gain > c.attentionCost);
      return { l, isDefault, terms: t, score: t.reduce((q, x) => q + x.value, 0), gain, ok };
    });
    let winner, moved = false, reason = "default", margin = null;
    if (!personalised) winner = scored[0];
    else {
      const sorted = [...scored].sort((a, b) => b.score - a.score || (a.l.slug < b.l.slug ? -1 : 1));
      const d = scored[0];
      const best = sorted.find((x) => !x.isDefault && x.ok) ?? null;
      margin = best ? best.score - d.score : null;
      const floorHit = streak >= k.antiBubbleFloor.everyN - k.antiBubbleFloor.fromDefaultRoundRobin;
      const wouldMove = !!best && best.score > d.score;
      if (floorHit) { winner = d; reason = wouldMove ? "breadth-floor" : "default"; }
      else if (wouldMove) {
        winner = best; moved = true;
        const named = best.terms.filter((x) => (x.name.startsWith("need:") || x.name.startsWith("cov:") || x.name === "surprise" || x.name === "novelty") && x.value > 0)
          .sort((a, b) => b.value - a.value)[0];
        reason = named ? (named.name.includes(":") ? named.name.split(":")[1] : named.name) : "default";
      } else winner = d;
    }
    if (personalised) for (const need of NEEDS) {
      const d = c.addrUse * winner.l.addr[need]; // model-v0.4.0: a pick consumes addrUse x addr
      remaining[need] = Math.max(0, remaining[need] - d);
      coverage[need] = Math.min(1, coverage[need] + d);
    }
    streak = moved ? streak + 1 : 0;
    taken.add(winner.l.slug);
    picks.push({ slug: winner.l.slug, moved, reason, score: winner.score });
    slots.push({ slug: winner.l.slug, margin, gain: winner.gain, terms: winner.terms });
  }
  return { needs, personalised, picks, remaining, coverage, slots };
}
