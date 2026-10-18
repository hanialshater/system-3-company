// EDD-010 design probe (personalization-engineer, run pe-s1-1017). Measurement only: not product code, not a test.
// Reproduces the numbers in EDD-010 §3: what reachable-v2's rank does on an empty and on small histories over
// pilot-only dims, how many cards move, which reason codes they carry, and the subject-alternation effect.
// Draft 2 (run pe-w1615-1017) appends the §5.4 display walk, a `refresh` history and a deep mid-scroll pin (addendum A4).
// Lines before "draft 2" print exactly what draft 1 printed; ownCode in draft 1 lines counts moved cards only.
// Usage (Node >= 22.18, type stripping), from a scratch directory holding copies of the two inputs:
//   git show 4a559d6:src/lib/learner/dims-index.generated.ts > <dir>/dims.ts
//   cp company/personalization/policies/reachable-v2.ts <dir>/rv2.ts
//   cp company/engineering/edd/EDD-010-probe.mts <dir>/ && node <dir>/EDD-010-probe.mts
import { createHash } from "node:crypto";
// @ts-ignore: copies made by the usage lines above
import { dims } from "./dims.ts";
// @ts-ignore
import { rank } from "./rv2.ts";

const PILOT = new Set(["probability", "cs"]);
type E = { slug: string; domain: string; concept: string; level: string; prerequisites: string[]; successors: string[]; status: string; pilot: boolean };
const all = Object.values(dims as Record<string, E>);

/** Pilot-only dims as EDD-010 §5.2 builds them: pilot entries, successors filtered, no rating fields. */
const pd: Record<string, Omit<E, "pilot">> = {};
for (const e of all)
  if (e.pilot)
    pd[e.slug] = { slug: e.slug, domain: e.domain, concept: e.concept, level: e.level, prerequisites: e.prerequisites, successors: e.successors.filter((c) => PILOT.has(c.split(":")[0])), status: e.status };

function ruleOrder(entries: { slug: string; domain: string; status: string }[]): string[] {
  const r = (d: { status: string }) => (d.status === "published" ? 0 : 1);
  const sorted = [...entries].sort((a, b) => r(a) - r(b) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  const q = new Map<string, string[]>();
  for (const d of sorted) q.set(d.domain, [...(q.get(d.domain) ?? []), d.slug]);
  const qs = [...q.values()];
  const out: string[] = [];
  while (qs.some((x) => x.length)) for (const x of qs) if (x.length) out.push(x.shift()!);
  return out;
}

const def = ruleOrder(Object.values(pd));
console.log("pilot default order:", def.length, "sha256", createHash("sha256").update(def.join("\n")).digest("hex"));

const NOW = 1_800_000_000_000;
function analyse(label: string, history: { slug: string; completedAt: number; predictedCorrectly?: boolean; recalls: { at: number; correct: boolean }[] }[]) {
  const t = performance.now();
  const r = rank({ now: NOW, history, dims: pd, slots: 1 }) as { slug: string; value: number; reason: { code: string } }[];
  const ms = performance.now() - t;
  const done = new Set(history.map((h) => h.slug));
  const d = def.filter((s) => !done.has(s));
  const di = new Map(d.map((s, i) => [s, i] as const));
  const runStart: number[] = [];
  const runEnd: number[] = [];
  for (let i = 0; i < r.length; i++) runStart[i] = i > 0 && r[i - 1].value === r[i].value ? runStart[i - 1] : i;
  for (let i = r.length - 1; i >= 0; i--) runEnd[i] = i < r.length - 1 && r[i + 1].value === r[i].value ? runEnd[i + 1] : i;
  const own: Record<string, number> = {};
  const boundary: Record<string, number> = {};
  let moved = 0;
  r.forEach((x, i) => {
    const j = di.get(x.slug)!;
    if (j === i) return;
    moved++;
    own[x.reason.code] = (own[x.reason.code] ?? 0) + 1;
    const key = i < j ? `earlier:${r[runEnd[i]].reason.code}` : `later:${runStart[i] > 0 ? r[runStart[i] - 1].reason.code : "none"}`;
    boundary[key] = (boundary[key] ?? 0) + 1;
  });
  const values = new Set(r.map((x) => x.value)).size;
  console.log(label, JSON.stringify({ eligible: r.length, moved, distinctValues: values, ownCode: own, boundaryCode: boundary, rankMs: +ms.toFixed(1) }));
  return r.map((x) => x.slug);
}

const cold = analyse("cold start (empty history)", []);
console.log("  first 6 by rank:", cold.slice(0, 6).join(", "));
console.log("  first 6 default:", def.slice(0, 6).join(", "));
const firstFew = def.slice(0, 20);
analyse("5 done, predictions mixed", firstFew.slice(0, 5).map((s, i) => ({ slug: s, completedAt: NOW - (5 - i) * 6e5, predictedCorrectly: i % 2 === 0, recalls: [] })));
analyse("20 done, all predictions wrong", firstFew.map((s, i) => ({ slug: s, completedAt: NOW - (20 - i) * 6e5, predictedCorrectly: false, recalls: [] })));
analyse("20 done 3 days ago, one recall each", firstFew.map((s, i) => ({ slug: s, completedAt: NOW - 3 * 864e5 - i * 6e5, predictedCorrectly: true, recalls: [{ at: NOW - 864e5, correct: i % 3 !== 0 }] })));

// Subject alternation in the "all" feed when pilot slots are refilled with the cold-start rank order.
const feed = ruleOrder(all);
const dom = (s: string) => (dims as Record<string, E>)[s].domain;
const slots = feed.flatMap((s, i) => (PILOT.has(dom(s)) ? [i] : []));
const out = feed.slice();
slots.forEach((pos, k) => (out[pos] = cold[k]));
const adj = (xs: string[], n: number) => xs.slice(0, n).reduce((a, s, i) => a + (i > 0 && dom(s) === dom(xs[i - 1]) ? 1 : 0), 0);
console.log("all feed:", feed.length, "pilot slots on page 0 (30 cards):", slots.filter((i) => i < 30).length, "first slots:", slots.slice(0, 6).join(","));
console.log("same-subject neighbours, default vs cold rank: first 60", adj(feed, 60), "vs", adj(out, 60), "; whole feed", adj(feed, feed.length), "vs", adj(out, out.length));
console.log("pilot dims JSON bytes:", JSON.stringify(pd).length);
const cross = new Map<string, Set<string>>();
for (const e of Object.values(pd)) cross.set(e.concept, (cross.get(e.concept) ?? new Set()).add(e.domain));
console.log("pilot concepts in more than one domain:", [...cross.values()].filter((s) => s.size > 1).length, "; concept prefix != domain (all 946):", all.filter((e) => e.concept.split(":")[0] !== e.domain).length);

// ---------------------------------------------------------------------------------------------------------------
// Draft 2 extension (run pe-w1615-1017, W-1794; batch 5 §15.2). Baselines on v2 for F7, not truth tests.
// (a) a history that produces `refresh` (F6 N5); (b) a deep mid-scroll pin past the completed lessons (F6 N3).
// The display is EDD-010 §5.4 step 5 over the 230 pilot slots: slots before h keep the card they last showed,
// a slot whose default lesson was completed before the page load keeps it, every other slot takes the next
// unshown slug of R. A card is moved if its slug differs from the default slug of its slot. §6.3's code is read
// by DISPLAY direction (disp < def: end of its run in R; disp > def: the row before its run). "rank direction" is
// the card's R index against its index in the default order with completed lessons removed, which is the
// direction a v3 that emits moving reasons would state (§15.1 (ii) 2). A mismatch is a card the glue's
// direction assertion (addendum A3) would have to withhold.
// ---------------------------------------------------------------------------------------------------------------
type H = { slug: string; completedAt: number; predictedCorrectly?: boolean; recalls: { at: number; correct: boolean }[] };
type R = { slug: string; value: number; reason: { code: string } };
const rk = (history: H[]) => rank({ now: NOW, history, dims: pd, slots: 1 }) as R[];
function runsOf(r: R[]) {
  const s: number[] = [], e: number[] = [];
  for (let i = 0; i < r.length; i++) s[i] = i > 0 && r[i - 1].value === r[i].value ? s[i - 1] : i;
  for (let i = r.length - 1; i >= 0; i--) e[i] = i < r.length - 1 && r[i + 1].value === r[i].value ? e[i + 1] : i;
  return { s, e };
}
function display(r: R[], doneAtMount: Set<string>, pinned: string[]) {
  const out = pinned.slice();
  const shown = new Set(pinned);
  let ri = 0, fallback = 0;
  for (let k = pinned.length; k < def.length; k++) {
    if (doneAtMount.has(def[k]) && !shown.has(def[k])) { out[k] = def[k]; shown.add(def[k]); continue; }
    while (ri < r.length && shown.has(r[ri].slug)) ri++;
    if (ri < r.length) { out[k] = r[ri].slug; shown.add(r[ri++].slug); continue; }
    const rest = def.find((x) => !shown.has(x))!; // §5.4 "R runs out" path; C4 makes T8 assert permutation
    out[k] = rest; shown.add(rest); fallback++;
  }
  return { out, fallback };
}
/** §6.3's code per display slot (only for moved slots), and the rank direction, from one rank call. */
function codes(r: R[], history: H[], out: string[], from: number) {
  const { s, e } = runsOf(r);
  const ri = new Map(r.map((x, i) => [x.slug, i] as const));
  const done = new Set(history.map((x) => x.slug));
  const dj = new Map(def.filter((x) => !done.has(x)).map((x, j) => [x, j] as const));
  const di = new Map(def.map((x, k) => [x, k] as const));
  const code: Record<string, number> = {};
  const perSlot = new Map<number, string>();
  let moved = 0, rankUnmoved = 0, opposite = 0, notRanked = 0;
  for (let k = from; k < out.length; k++) {
    const x = out[k];
    if (x === def[k]) continue;
    moved++;
    const i = ri.get(x);
    if (i === undefined) { notRanked++; continue; } // a completed lesson shown off its slot: cannot happen in §5.4
    const earlier = k < di.get(x)!;
    const c = earlier ? `earlier:${r[e[i]].reason.code}` : `later:${s[i] > 0 ? r[s[i] - 1].reason.code : "none"}`;
    code[c] = (code[c] ?? 0) + 1;
    perSlot.set(k, c);
    const j = dj.get(x)!;
    if (i === j) rankUnmoved++;
    else if (i < j !== earlier) opposite++;
  }
  return { moved, code, rankUnmoved, opposite, notRanked, perSlot };
}
const isPerm = (xs: string[]) => xs.length === def.length && new Set(xs).size === def.length && xs.every((x) => x in pd);
function mountView(label: string, history: H[]) {
  const r = rk(history);
  const { out, fallback } = display(r, new Set(history.map((x) => x.slug)), [def[0]]); // first-card pin at mount
  const c = codes(r, history, out, 1);
  const own: Record<string, number> = {};
  for (const x of r) own[x.reason.code] = (own[x.reason.code] ?? 0) + 1;
  console.log(label, JSON.stringify({ eligible: r.length, ownCode: own, displayMoved: c.moved, sec63CodeByDisplayDirection: c.code, rankUnmovedButShownMoved: c.rankUnmoved, oppositeDirection: c.opposite, notRanked: c.notRanked, fallback, permutation: isPerm(out) }));
  return { r, out, c };
}

// (a) refresh. Only 7 pilot concepts have two lessons; finish the first (by slug) of each 60 days ago, so the
// unfinished sibling's refresh term (q near its concept's p, refresh = kappa(14) - kappa(a+14)) beats new gain.
const byConcept = new Map<string, string[]>();
for (const e of Object.values(pd)) byConcept.set(e.concept, [...(byConcept.get(e.concept) ?? []), e.slug]);
const firstOfPairs = [...byConcept.values()].filter((v) => v.length > 1).map((v) => [...v].sort()[0]);
console.log("draft 2 · pilot concepts with more than one lesson:", firstOfPairs.length);
const refreshH = (pred: (i: number) => boolean | undefined): H[] =>
  firstOfPairs.map((s, i) => ({ slug: s, completedAt: NOW - 60 * 864e5 - i * 6e5, predictedCorrectly: pred(i), recalls: [] }));
mountView("(a) refresh: 7 concept-pair firsts done 60 d ago, predictions mixed", refreshH((i) => i % 2 === 0));
mountView("(a') same history, no predictions (v2's no-prediction branch; NOT v3)", refreshH(() => undefined));

// (b) deep pin. Mount with S1's third history (20 default-first lessons done 3 days ago, one recall each), scroll to
// pilot slot 80 (60 slots past the completed ones), finishing every 6th unfinished card shown on the way, then
// recompute with slots 0-79 pinned to what they showed.
const h0: H[] = firstFew.map((s, i) => ({ slug: s, completedAt: NOW - 3 * 864e5 - i * 6e5, predictedCorrectly: true, recalls: [{ at: NOW - 864e5, correct: i % 3 !== 0 }] }));
const m = mountView("(b0) deep-pin mount = 20 done 3 days ago, one recall each", h0);
const HPIN = 80;
const mid = m.out.slice(20, HPIN).filter((_, n) => n % 6 === 0);
const h1: H[] = [...h0, ...mid.map((s, n) => ({ slug: s, completedAt: NOW - (mid.length - n) * 6e4, predictedCorrectly: n % 2 === 0, recalls: [] }))];
const same = display(m.r, new Set(h0.map((x) => x.slug)), m.out.slice(0, HPIN));
console.log("(b1) pin at", HPIN, "no new completions: display unchanged =", same.out.every((x, k) => x === m.out[k]));
const r1 = rk(h1);
const d1 = display(r1, new Set(h0.map((x) => x.slug)), m.out.slice(0, HPIN));
const c1 = codes(r1, h1, d1.out, HPIN);
const c1all = codes(r1, h1, d1.out, 1);
let pinnedLineWouldChange = 0, pinnedMoved = 0;
for (let k = 1; k < HPIN; k++) {
  const was = m.c.perSlot.get(k);
  if (!was) continue;
  pinnedMoved++;
  if (c1all.perSlot.get(k) !== was) pinnedLineWouldChange++;
}
console.log("(b2) pin at", HPIN, "after", mid.length, "mid-scroll completions", JSON.stringify({ eligible: r1.length, movedAfterPin: c1.moved, sec63CodeByDisplayDirection: c1.code, rankUnmovedButShownMoved: c1.rankUnmoved, oppositeDirection: c1.opposite, notRanked: c1.notRanked, fallback: d1.fallback, permutation: isPerm(d1.out), pinnedMovedCards: pinnedMoved, pinnedWhoseCodeARecomputeWouldChange: pinnedLineWouldChange }));
