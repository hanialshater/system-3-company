// HQ session lab (founder decision 2026-10-20 Q2, W-1998): the browser-side port of the session composer's
// recomputation. Pure: no node APIs, no storage, no network; safe in client components and tests.
//
// This is a PORT of company/personalization/model/sim/sandbox-reference.mjs (plain JS, imports nothing), which is
// the executable spec of composer-session.ts for one session. src/ never imports the model (decision W-1498), so the
// arithmetic is copied here in the same order (sums left to right, so the floats match exactly), and
// tests/hq/personalization-sandbox.test.mjs holds the output equal to the CLI's own `composed` session for every
// persona x variant, and to the reference after a drag. If the model's arithmetic changes, that test fails here first.
//
// What the sandbox may change: needShapes (curve values), dampener, session coefficients. Everything else in the
// document (history, fingerprint, pool, addr, floor streak) is fixed for the session. NOTHING IS SAVED: the edit lives
// in component state and in the "copy as code diff" text; the curves change only by the change rule
// (company/personalization/model/README.md). SIMULATED PERSONAS ONLY.
// Offline inspection only (the session variants are scored and closed for serving, 2026-10-21; a sandbox edit is unscored): this is not serving and not evidence of learning.

export const NEEDS = ["repair", "build", "breadth", "stretch"] as const;
export type SNeed = (typeof NEEDS)[number];
export const SANDBOX_SCHEMA = "personalization-hq-sandbox-v0";
export const SANDBOX_BADGE = "sandbox: not saved, not the model";
export const CIRCULAR_LABEL = "circular: diagnostic only";
export const SESSION_LAB_TITLE = "EDP-faithful session composer — offline inspection only; the variants are closed for serving";

export type SandboxVariant = "v1" | "v3" | "edpbase";
export type SCurve = { bps: number[]; vals: number[] };
export type SShape = SCurve & { signal: string; w: number; why: string };
export type SDamp = SCurve & { signal: string; why: string };
export type SCoefficients = { base: number; onRem: Record<SNeed, number>; onCov: Record<SNeed, number>; slotDecay: number; attentionCost: number; addrUse: number };
export type SCandidate = {
  slug: string; concept: string; domain: string; level: string; defaultRank: number;
  addr: Record<SNeed, number>; stretchBlocked: boolean; surprise: number; novelty: number;
};
export type SandboxDoc = {
  schema: typeof SANDBOX_SCHEMA; unscored: string; criterion: string; provisional: string; simulatedOnly: string; personasVersion: string;
  circularLabel: string; note: string; modelVersion: string; composerVersion: string;
  persona: { id: string; name: string }; seed: number; variant: SandboxVariant; policy: string; at: number; historyCount: number;
  fingerprint: Record<string, number | string | string[]>;
  needShapes: Record<SNeed, SShape[]>; dampener: SDamp; needs: Record<SNeed, number>;
  session: {
    size: number; coefficients: SCoefficients; off: string[]; v1: SCoefficients; v3: SCoefficients;
    edits: { target: string; path: string; from: number; to: number; reason: string }[]; why: Record<string, string>;
    /** model-v0.4.2: only in the edpbase document (v3 with base = beta); its one-row table sits beside the edits table. */
    "v3-edpbase"?: SCoefficients; edpBaseEdits?: { target: string; path: string; from: number; to: number; reason: string }[];
  };
  candidates: SCandidate[];
  constraints: {
    personalisationOn: boolean; dueRevisits: unknown[]; antiBubbleStreak: number; antiBubbleFloor: { everyN: number; fromDefaultRoundRobin: number };
    stretchNeedsSomePrereq: boolean; surpriseGateActive: boolean; noveltyGateActive: boolean; fixedForSession: string;
  };
  composed: { picks: { slug: string; moved: boolean; reason: string; score: number; reasonCarriesMove?: boolean | null; terms: { name: string; value: number }[] }[];
    remaining: Record<SNeed, number>; coverage: Record<SNeed, number>; personalised: boolean; diagnostics?: { label: string; needMass: number; resolved: number; coverageRate: number | null };
    slots: unknown[] };
};

/** An edit (the drag). Absent members mean "as in the document". */
export type SandboxEdit = { needShapes?: Record<SNeed, SShape[]>; dampener?: SDamp; coefficients?: SCoefficients };

export type Term = { name: string; value: number };
export type SlotCandidate = {
  slug: string; concept: string; domain: string; level: string; isDefault: boolean; score: number; gain: number; eligible: boolean;
  why: string | null; addr: Record<SNeed, number>; terms: Term[];
};
export type ComposedSlot = {
  slot: number; defaultCard: string; constraint: string | null; winner: string; reason: string; moved: boolean; margin: number | null;
  remainingBefore: Record<SNeed, number>; remainingAfter: Record<SNeed, number>;
  coverageBefore: Record<SNeed, number>; coverageAfter: Record<SNeed, number>;
  winnerTerms: Term[]; winnerScore: number; /** model-v0.4.4: null when the card was not moved. */ reasonCarriesMove: boolean | null; gain: number; top: SlotCandidate[]; eligibleCount: number;
};
export type Composed = {
  needs: Record<SNeed, number>; personalised: boolean; remaining: Record<SNeed, number>; coverage: Record<SNeed, number>;
  picks: { slug: string; moved: boolean; reason: string; score: number; reasonCarriesMove: boolean | null }[]; slots: ComposedSlot[];
  /** EDP's coverageRate for this session: (Σ needs − Σ remaining) / Σ needs, as composer-session.ts. Circular: the model's own beliefs. */
  circular: { label: string; needMass: number; resolved: number; coverageRate: number | null };
};

const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));

/** pwl() exactly as model.ts (flat outside the breakpoints). */
export function pwl(x: number, c: SCurve): number {
  if (x <= c.bps[0]) return c.vals[0];
  for (let i = 1; i < c.bps.length; i++) {
    if (x <= c.bps[i]) return c.vals[i - 1] + ((c.vals[i] - c.vals[i - 1]) * (x - c.bps[i - 1])) / (c.bps[i] - c.bps[i - 1]);
  }
  return c.vals[c.vals.length - 1];
}

type Fp = Record<string, number | string | string[]>;
const fpNum = (fp: Fp, k: string): number => (typeof fp[k] === "number" ? (fp[k] as number) : 0);

/** detect() exactly as model.ts: clamp(Σ w·pwl(x)/Σw) × pwl(historySize, dampener), same summation order. */
export function detect(fp: Fp, shapes: Record<SNeed, SShape[]>, dampener: SDamp): Record<SNeed, number> {
  const damp = pwl(fpNum(fp, "historySize"), dampener);
  const out = {} as Record<SNeed, number>;
  for (const need of NEEDS) {
    const cs = shapes[need];
    const wsum = cs.reduce((s, c) => s + c.w, 0);
    const contributions = cs.map((c) => (c.w * pwl(clamp(fpNum(fp, c.signal)), c)) / Math.max(wsum, 1e-9));
    out[need] = clamp(contributions.reduce((s, x) => s + x, 0)) * damp;
  }
  return out;
}

// ---- the session rules, each a small function so a change to the composer (W-1999) lands in one place ----
// Keep these equal to company/personalization/model/sim/composer-session.ts; tests/hq/personalization-sandbox.test.mjs
// holds the whole recomposition equal to the CLI's own composed session.

/** applyAddr: how a picked lesson consumes need (model-v0.4.0): d = use x addr; remaining falls and coverage rises by d (floor 0, cap 1). */
export function applyAddr(remaining: Record<SNeed, number>, coverage: Record<SNeed, number>, addr: Record<SNeed, number>, use = 1): void {
  for (const need of NEEDS) {
    const d = use * addr[need];
    remaining[need] = Math.max(0, remaining[need] - d);
    coverage[need] = Math.min(1, coverage[need] + d);
  }
}
/** EDP's attention-budget gain: the need mass a pick would resolve, Σn min(remaining[n], use x addr[n]) (the slot's remaining BEFORE the pick). */
export function resolvableGain(addr: Record<SNeed, number>, remaining: Record<SNeed, number>, use: number): number {
  let g = 0;
  for (const n of NEEDS) g += Math.min(remaining[n], use * addr[n]);
  return g;
}
/** A departure is eligible iff it passes stretch readiness and its resolvable gain beats the attention cost; the default card always is. */
export function eligibility(isDefault: boolean, blocked: boolean, gain: number, c: SCoefficients): { ok: boolean; why: string | null } {
  if (isDefault) return { ok: true, why: null };
  if (blocked) return { ok: false, why: "stretch readiness: a prerequisite is not met" };
  return gain > c.attentionCost ? { ok: true, why: null } : { ok: false, why: `attention budget: resolvable need ${gain.toFixed(3)} ≤ attention cost ${c.attentionCost}` };
}

/**
 * reasonCarriesMove (model-v0.4.4, W-2008, VP record §7): the named reason's terms (need:n + cov:n, or surprise / novelty), summed left to
 * right in term order, are >= the winner's margin over the default card. At equality removing the reason only TIES the default card, and a
 * tie keeps the default (wouldMove is strict), so the reason did carry the move. Keep this operator tied to wouldMove: flip one, flip both.
 */
export function reasonCarries(reason: string, terms: Term[], margin: number): boolean {
  const names = reason === "surprise" || reason === "novelty" ? [reason] : (NEEDS as readonly string[]).includes(reason) ? [`need:${reason}`, `cov:${reason}`] : [];
  let v = 0;
  for (const t of terms) if (names.includes(t.name)) v += t.value;
  return v >= margin;
}

const isNeedTerm = (n: string) => n.startsWith("need:") || n.startsWith("cov:");
const zero = (): Record<SNeed, number> => ({ repair: 0, build: 0, breadth: 0, stretch: 0 });
const TOP = 10;

/** The refusal reason, or null when the sandbox may recompute. The precomputed pool assumes both gates are shut. */
export function sandboxRefusal(doc: SandboxDoc): string | null {
  if (doc.schema !== SANDBOX_SCHEMA) return `unknown sandbox schema ${String(doc.schema)}`;
  const k = doc.constraints;
  if (k.surpriseGateActive || k.noveltyGateActive)
    return `The ${[k.surpriseGateActive && "surprise", k.noveltyGateActive && "novelty"].filter(Boolean).join(" and ")} gate is active in this document. The sandbox holds surprise and novelty fixed at 0 and cannot recompute with a gate open; use the simulator locally.`;
  if (doc.candidates.some((c) => c.surprise !== 0 || c.novelty !== 0)) return "A candidate carries a nonzero surprise or novelty value; the sandbox refuses (both gates must be shut).";
  return null;
}

/** Recompose the session from a sandbox document. `over` replaces needShapes, dampener or coefficients (the drag). */
export function recompose(doc: SandboxDoc, over: SandboxEdit = {}): Composed {
  const shapes = over.needShapes ?? doc.needShapes;
  const dampener = over.dampener ?? doc.dampener;
  const c = over.coefficients ?? doc.session.coefficients;
  const off = new Set(doc.session.off ?? []);
  const k = doc.constraints;
  const needs = detect(doc.fingerprint, shapes, dampener);
  const remaining = { ...needs };
  const coverage = zero();
  const totalNeed = NEEDS.reduce((s, n) => s + needs[n], 0);
  const personalised = k.personalisationOn && totalNeed > 0;
  const taken = new Set<string>();
  let streak = k.antiBubbleStreak;
  const picks: Composed["picks"] = [];
  const slots: ComposedSlot[] = [];
  for (let s = 0; s < doc.session.size; s++) {
    const eligible = doc.candidates.filter((x) => !taken.has(x.slug)); // already in default order, already filtered
    if (!eligible.length) break;
    const def = eligible[0];
    const n = eligible.length;
    const remainingBefore = { ...remaining }, coverageBefore = { ...coverage };
    const scored = eligible.map((l, i) => {
      const isDefault = l.slug === def.slug;
      const t: Term[] = [];
      const add = (name: string, v: number) => t.push({ name, value: off.has(name) ? 0 : v });
      add("base", c.base * (n > 1 ? 1 - i / (n - 1) : 1));
      for (const need of NEEDS) add(`need:${need}`, c.onRem[need] * remaining[need] * l.addr[need]);
      for (const need of NEEDS) add(`cov:${need}`, isDefault ? 0 : c.onCov[need] * coverage[need] * l.addr[need]); // model-v0.4.0: no cov on the default card
      add("surprise", l.surprise);
      add("novelty", l.novelty);
      add("slotDecay", isDefault ? 0 : -c.slotDecay * s);
      add("attentionCost", isDefault ? 0 : -c.attentionCost);
      const gain = resolvableGain(l.addr, remaining, c.addrUse);
      const { ok, why } = eligibility(isDefault, k.stretchNeedsSomePrereq && l.stretchBlocked, gain, c);
      return { l, isDefault, terms: t, gain, score: t.reduce((q, x) => q + x.value, 0), ok, why };
    });
    let winner = scored[0], moved = false, reason = "default", margin: number | null = null, constraint: string | null = null, carries: boolean | null = null;
    const sorted = [...scored].sort((a, b) => b.score - a.score || (a.l.slug < b.l.slug ? -1 : 1));
    if (personalised) {
      const d = scored[0];
      const best = sorted.find((x) => !x.isDefault && x.ok) ?? null;
      margin = best ? best.score - d.score : null;
      const floorHit = streak >= k.antiBubbleFloor.everyN - k.antiBubbleFloor.fromDefaultRoundRobin;
      const wouldMove = !!best && best.score > d.score;
      if (floorHit) {
        constraint = `antiBubbleFloor: ${streak} moved in a row, 1 in ${k.antiBubbleFloor.everyN} stays default`;
        winner = d; reason = wouldMove ? "breadth-floor" : "default";
      } else if (wouldMove && best) {
        winner = best; moved = true;
        const named = best.terms.filter((x) => (isNeedTerm(x.name) || x.name === "surprise" || x.name === "novelty") && x.value > 0)
          .sort((a, b) => b.value - a.value)[0];
        reason = named ? (named.name.includes(":") ? named.name.split(":")[1] : named.name) : "default";
        carries = reasonCarries(reason, best.terms, best.score - d.score);
      }
    } else constraint = "not personalised: the default order";
    if (personalised) applyAddr(remaining, coverage, winner.l.addr, c.addrUse);
    streak = moved ? streak + 1 : 0;
    taken.add(winner.l.slug);
    picks.push({ slug: winner.l.slug, moved, reason, score: winner.score, reasonCarriesMove: carries });
    const topRows = sorted.slice(0, TOP);
    if (!topRows.some((x) => x.l.slug === winner.l.slug)) topRows.push(winner); // model-v0.4.2: the winner is always listed
    const top = topRows.map((x) => ({
      slug: x.l.slug, concept: x.l.concept, domain: x.l.domain, level: x.l.level, isDefault: x.isDefault, score: x.score, gain: x.gain,
      eligible: x.ok, why: x.why, addr: x.l.addr, terms: x.terms,
    }));
    slots.push({
      slot: s, defaultCard: def.slug, constraint, winner: winner.l.slug, reason, moved, margin,
      remainingBefore, remainingAfter: { ...remaining }, coverageBefore, coverageAfter: { ...coverage },
      winnerTerms: winner.terms, winnerScore: winner.score, reasonCarriesMove: carries, gain: winner.gain, top, eligibleCount: n,
    });
  }
  const needMass = totalNeed;
  const resolved = needMass - NEEDS.reduce((q, k) => q + remaining[k], 0);
  return {
    needs, personalised, picks, remaining, coverage, slots,
    circular: { label: CIRCULAR_LABEL, needMass, resolved, coverageRate: needMass > 0 ? resolved / needMass : null },
  };
}

// ---- edits: the drag, the coefficient fields, reset, and the code diff ----

export const VAL_STEP = 0.01;
const r2 = (x: number) => Math.round(x * 100) / 100;
const cloneShapes = (s: Record<SNeed, SShape[]>) => JSON.parse(JSON.stringify(s)) as Record<SNeed, SShape[]>;

export function emptyEdit(doc: SandboxDoc): Required<SandboxEdit> {
  return { needShapes: cloneShapes(doc.needShapes), dampener: JSON.parse(JSON.stringify(doc.dampener)), coefficients: JSON.parse(JSON.stringify(doc.session.coefficients)) };
}

/** Move one knot's value (the y of breakpoint `i`); breakpoints stay where the model has them (as EDP's handles). */
export function withKnot(edit: Required<SandboxEdit>, target: { need: SNeed | "dampener"; term: number }, i: number, value: number): Required<SandboxEdit> {
  const v = clamp(r2(value));
  if (target.need === "dampener") {
    const d = JSON.parse(JSON.stringify(edit.dampener)) as SDamp;
    d.vals[i] = v;
    return { ...edit, dampener: d };
  }
  const shapes = cloneShapes(edit.needShapes);
  shapes[target.need][target.term].vals[i] = v;
  return { ...edit, needShapes: shapes };
}

export type CoefKey = "base" | "slotDecay" | "attentionCost" | "addrUse" | `onRem.${SNeed}` | `onCov.${SNeed}`;
export const COEF_KEYS: CoefKey[] = ["base", ...NEEDS.map((n) => `onRem.${n}` as CoefKey), ...NEEDS.map((n) => `onCov.${n}` as CoefKey), "slotDecay", "attentionCost", "addrUse"];
export function getCoef(c: SCoefficients, key: CoefKey): number {
  if (key.includes(".")) { const [g, n] = key.split(".") as ["onRem" | "onCov", SNeed]; return c[g][n]; }
  return c[key as "base" | "slotDecay" | "attentionCost" | "addrUse"];
}
export function withCoef(edit: Required<SandboxEdit>, key: CoefKey, value: number): Required<SandboxEdit> {
  const c = JSON.parse(JSON.stringify(edit.coefficients)) as SCoefficients;
  const v = Number.isFinite(value) ? Math.round(value * 1000) / 1000 : 0;
  if (key.includes(".")) { const [g, n] = key.split(".") as ["onRem" | "onCov", SNeed]; c[g][n] = v; }
  else (c as unknown as Record<string, number>)[key] = v;
  return { ...edit, coefficients: c };
}

const num = (x: number) => String(Math.round(x * 10000) / 10000);
const arr = (a: number[]) => `[${a.map(num).join(", ")}]`;
const obj = (o: Record<SNeed, number>) => `{ ${NEEDS.map((n) => `${n}: ${num(o[n])}`).join(", ")} }`;

/** True when the edit differs from the document anywhere. */
export function isEdited(doc: SandboxDoc, edit: Required<SandboxEdit>): boolean {
  return codeDiff(doc, edit).changes > 0;
}

/** Text diff of the edit against the values in model.ts, plus the change rule. Nothing is applied or saved. */
export function codeDiff(doc: SandboxDoc, edit: Required<SandboxEdit>): { text: string; changes: number } {
  const L: string[] = [];
  let changes = 0;
  const hunk = (where: string, before: string[], after: string[]) => {
    changes++;
    L.push(`@@ ${where} @@`);
    for (const b of before) L.push(`-${b}`);
    for (const a of after) L.push(`+${a}`);
  };
  for (const need of NEEDS) doc.needShapes[need].forEach((t, i) => {
    const e = edit.needShapes[need][i];
    if (JSON.stringify(e.vals) !== JSON.stringify(t.vals))
      hunk(`NEED_SHAPES.${need} (${t.signal}), model.ts`,
        [`    { signal: "${t.signal}", bps: ${arr(t.bps)}, vals: ${arr(t.vals)}, w: ${num(t.w)},`], [`    { signal: "${t.signal}", bps: ${arr(e.bps)}, vals: ${arr(e.vals)}, w: ${num(e.w)},`]);
  });
  if (JSON.stringify(edit.dampener.vals) !== JSON.stringify(doc.dampener.vals))
    hunk("DAMPENER, model.ts", [`  signal: "historySize", bps: ${arr(doc.dampener.bps)}, vals: ${arr(doc.dampener.vals)},`], [`  signal: "historySize", bps: ${arr(edit.dampener.bps)}, vals: ${arr(edit.dampener.vals)},`]);
  const base = doc.session.coefficients, cur = edit.coefficients;
  if (doc.variant === "edpbase") {
    // edpbase is v3 + COMPOSER_SESSION.edpBaseEdits (one row, session.base from 1.0, VP record §2.4). Only base is an edpbase edit; another
    // dragged coefficient belongs to the v3 edit table, so it is said so and not written as an edpBaseEdits row.
    const v3 = doc.session.v3, row0 = doc.session.edpBaseEdits?.[0];
    const reason = row0?.reason ?? "guess: (write the reason for this edit)";
    const row = (to: number) => `    ["session", "base", ${num(v3.base)}, ${num(to)}, "${reason}"],`;
    if (cur.base !== base.base) hunk("COMPOSER_SESSION.edpBaseEdits (edpbase = v3 + edpBaseEdits), model.ts", [row(base.base)], [row(cur.base)]);
    const others = [...COEF_KEYS.filter((k) => k !== "base" && getCoef(cur, k) !== getCoef(base, k))];
    if (others.length) changes++, L.push(`# Not an edpbase edit (VP record §2.4): ${others.join(", ")} changed. Those belong in COMPOSER_SESSION.edits (v3), where the v3 value is ${others.map((k) => `${k} ${num(getCoef(v3, k))}`).join(", ")}.`);
  } else if (doc.variant === "v1") {
    const lines = (c: SCoefficients) => [`    base: ${num(c.base)},`, `    onRem: ${obj(c.onRem)},`, `    onCov: ${obj(c.onCov)},`, `    slotDecay: ${num(c.slotDecay)},`, `    attentionCost: ${num(c.attentionCost)},`, `    addrUse: ${num(c.addrUse)},`];
    const b = lines(base), a = lines(cur);
    const keep = b.map((x, i) => (x === a[i] ? -1 : i)).filter((i) => i >= 0);
    if (keep.length) hunk("COMPOSER_SESSION.v1, model.ts", keep.map((i) => b[i]), keep.map((i) => a[i]));
  } else {
    // v3 is v1 + COMPOSER_SESSION.edits (never hand-copied): express each change as a row of the edit table, "from" = the v1 value.
    const v1 = doc.session.v1;
    const row = (target: string, path: string, from: number, to: number, reason: string) => `    ["${target}", "${path}", ${num(from)}, ${num(to)}, "${reason}"],`;
    const reasonOf = (target: string, path: string) => doc.session.edits.find((e) => e.target === target && e.path === path)?.reason ?? "guess: (write the reason for this edit)";
    const before: string[] = [], after: string[] = [];
    const consider = (target: string, path: string, v1v: number, baseV: number, curV: number) => {
      if (curV === baseV) return;
      const had = doc.session.edits.some((e) => e.target === target && e.path === path);
      if (had) before.push(row(target, path, v1v, baseV, reasonOf(target, path)));
      if (curV !== v1v) after.push(row(target, path, v1v, curV, reasonOf(target, path)));
    };
    for (const n of NEEDS) { consider(n, "onRem", v1.onRem[n], base.onRem[n], cur.onRem[n]); consider(n, "onCov", v1.onCov[n], base.onCov[n], cur.onCov[n]); }
    for (const p of ["base", "slotDecay", "attentionCost", "addrUse"] as const) consider("session", p, v1[p], base[p], cur[p]);
    if (before.length || after.length) { changes++; L.push("@@ COMPOSER_SESSION.edits (v3 = v1 + edits), model.ts @@"); before.forEach((b) => L.push(`-${b}`)); after.forEach((a) => L.push(`+${a}`)); }
  }
  const head = [
    `# SANDBOX EDIT — not saved, not the model. Persona ${doc.persona.id}, variant ${doc.variant}, ${doc.modelVersion}.`,
    "# Simulated persona only. Offline and UNSCORED: a recomposed session here is not evidence that anything helps a learner.",
    "--- a/company/personalization/model/model.ts",
    "+++ b/company/personalization/model/model.ts",
  ];
  const rule = [
    "",
    "# Change rule (company/personalization/model/README.md):",
    "#  1. Edit the number AND its why/comment; keep the word \"guess\" until data supports the value.",
    "#  2. Bump MODEL_VERSION (model.ts).",
    "#  3. Add one line to the change table in the decision record: version, date, what, reason, by.",
    "#  4. Commit with the reason in the message. If the edit follows a simulator run, say so.",
    "#  5. Run the self-check (npm run test:personalization). It fails if the new version has no decision line.",
    "# There is no curve-editing tool; this text is the whole export. A stale \"from\" makes applyEdits throw.",
  ];
  return { text: changes ? [...head, ...L, ...rule].join("\n") : [...head, "# (no changes: the sandbox matches model.ts)", ...rule].join("\n"), changes };
}

/** Fit a doc's term name to a short column label. */
export const shortTerm = (n: string) => (n === "slotDecay" ? "slotDecay" : n === "attentionCost" ? "attnCost" : n);

export type NeedWhy = { score: number; raw: number; damp: number; terms: { signal: string; x: number; y: number; w: number; contribution: number }[] };
/** Per-need terms for display (same arithmetic as detect(); `score` equals detect()'s). */
export function explainNeeds(fp: Fp, shapes: Record<SNeed, SShape[]>, dampener: SDamp): Record<SNeed, NeedWhy> {
  const damp = pwl(fpNum(fp, "historySize"), dampener);
  const out = {} as Record<SNeed, NeedWhy>;
  for (const need of NEEDS) {
    const cs = shapes[need];
    const wsum = cs.reduce((s, c) => s + c.w, 0);
    const terms = cs.map((c) => {
      const x = clamp(fpNum(fp, c.signal));
      const y = pwl(x, c);
      return { signal: c.signal, x, y, w: c.w, contribution: (c.w * y) / Math.max(wsum, 1e-9) };
    });
    const raw = clamp(terms.reduce((s, t) => s + t.contribution, 0));
    out[need] = { score: raw * damp, raw, damp, terms };
  }
  return out;
}
