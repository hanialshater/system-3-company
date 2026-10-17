// EDD-010 design probe (personalization-engineer, run pe-s1-1017). Measurement only: not product code, not a test.
// Reproduces the numbers in EDD-010 §3: what reachable-v2's rank does on an empty and on small histories over
// pilot-only dims, how many cards move, which reason codes they carry, and the subject-alternation effect.
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
