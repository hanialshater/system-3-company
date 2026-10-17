// Unit tests for reachable-v2 on hand-made histories only (no simulator, no harness).
// Carried over from reachable-v1.test.mjs (v1's tie test rewritten for the rule), plus the order-rule tests at the end.
// Run: node --test company/personalization/policies/reachable-v2.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { rank, decide, internals } from "./reachable-v2.ts";

const D = 86_400_000;
const NOW = 1_790_000_000_000;
const L = (slug, domain, concept, prerequisites = [], extra = {}) => ({
  slug, domain, concept, level: "core", prerequisites, successors: [], ...extra,
});

function dims() {
  return {
    "p-intro": L("p-intro", "probability", "p.base"),
    "p-cond": L("p-cond", "probability", "p.cond", ["p.base"], { misconceptionStrength: 2 }),
    "p-bayes": L("p-bayes", "probability", "p.bayes", ["p.cond", "p.base"], { misconceptionStrength: 3 }),
    "p-base-again": L("p-base-again", "probability", "p.base"),
    "c-loops": L("c-loops", "cs", "c.loops"),
    "c-recursion": L("c-recursion", "cs", "c.rec", ["c.loops"], { misconceptionStrength: 1 }),
    "c-sort": L("c-sort", "cs", "c.sort"),
    "h-rome": L("h-rome", "history", "h.rome", ["outside.catalogue"]),
  };
}

function historyA(now = NOW) {
  return [
    { slug: "p-intro", completedAt: now - 9 * D, predictedCorrectly: true, recalls: [{ at: now - 8 * D, correct: true }, { at: now - 5 * D, correct: false }] },
    { slug: "c-loops", completedAt: now - 6 * D, predictedCorrectly: false, recalls: [{ at: now - 5 * D, correct: true }] },
    { slug: "c-sort", completedAt: now - 2 * D, predictedCorrectly: null, recalls: [] },
    { slug: "p-cond", completedAt: now - 40 * D, recalls: [{ at: now - 39 * D, correct: false }] },
  ];
}

const input = (over = {}) => ({ now: NOW, history: historyA(), dims: dims(), slots: 12, ...over });

function deepFreeze(o) {
  if (o && typeof o === "object") {
    Object.freeze(o);
    for (const v of Object.values(o)) deepFreeze(v);
  }
  return o;
}

test("A1 pins: kappa and the clamped prior mean (reachable-v1-params.md P12, P15)", () => {
  const k = internals.kappa;
  assert.ok(Math.abs(k(14, 1) - 0.484) <= 0.001);
  assert.ok(Math.abs(k(7, 1) - 0.561) <= 0.001);
  assert.ok(Math.abs(k(30, 1) - 0.35) <= 0.001);
  assert.ok(Math.abs(k(6.5, 0.0574) - 0.968) <= 0.001);
  assert.ok(Math.abs(k(20.5, 0.0574) - 0.949) <= 0.001);
  assert.ok(Math.abs(internals.priorMean() - 0.2064) <= 0.0001);
});

test("rank: every eligible new lesson once, completed ones excluded, best first", () => {
  const r = rank(input());
  const done = new Set(historyA().map((h) => h.slug));
  const expected = Object.keys(dims()).filter((s) => !done.has(s));
  assert.deepEqual([...r.map((x) => x.slug)].sort(), expected.sort());
  for (let i = 1; i < r.length; i++) assert.ok(r[i - 1].value >= r[i].value);
  assert.deepEqual(decide(input()), r[0]);
});

test("replay: the same input gives the same output", () => {
  assert.deepEqual(rank(input()), rank(input()));
  assert.equal(JSON.stringify(rank(input())), JSON.stringify(rank(input())));
});

test("no state between calls: another learner's call first changes nothing", () => {
  const before = rank(input());
  rank({ now: NOW + 3 * D, history: [{ slug: "p-bayes", completedAt: NOW, predictedCorrectly: false, recalls: [] }], dims: dims(), slots: 4 });
  rank({ now: NOW, history: [], dims: dims(), slots: 12 });
  assert.deepEqual(rank(input()), before);
});

test("input not mutated: a deep-frozen input works and is unchanged", () => {
  const inp = input();
  const copy = JSON.parse(JSON.stringify(inp));
  deepFreeze(inp);
  assert.doesNotThrow(() => rank(inp));
  assert.deepEqual(inp, copy);
});

test("forbidden fields ignored: each at two values leaves the output unchanged", () => {
  const base = rank(input());
  const fields = ["dwell", "swipes", "scroll", "sessionLength", "sessionCount", "shares", "device",
    "locationFinerThanCountry", "ageBand", "ads", "personaLabel", "gapDays", "settings", "persona", "fixedDue"];
  for (const f of fields) {
    for (const v of [0, 7, ["p-intro"], { x: 1 }]) {
      assert.deepEqual(rank({ ...input(), [f]: v }), base, `field ${f}`);
    }
  }
  // slots is accepted and does not change a per-pick value
  assert.deepEqual(rank(input({ slots: 4 })), base);
});

test("time translation: shifting every timestamp by a constant changes nothing", () => {
  const base = rank(input());
  for (const shift of [-123_456_789, 5 * D, 1_000 * D + 17]) {
    const now = NOW + shift;
    assert.deepEqual(rank({ now, history: historyA(now), dims: dims(), slots: 12 }), base);
  }
});

test("recalls older than 30 days are not read", () => {
  const h = historyA();
  const h2 = historyA();
  h2[3].recalls = [{ at: NOW - 39 * D, correct: true }];
  assert.deepEqual(rank(input({ history: h })), rank(input({ history: h2 })));
});

// The default order of dims() by default-order-rule.md, worked by hand: no entry has a status, so all rank 0;
// sorted by slug: c-loops, c-recursion, c-sort, h-rome, p-base-again, p-bayes, p-cond, p-intro;
// domains in order of first appearance: cs, history, probability; round-robin:
const DIMS_ORDER = ["c-loops", "h-rome", "p-base-again", "c-recursion", "p-bayes", "c-sort", "p-cond", "p-intro"];

test("ties go to the default order (order rule), and say so", () => {
  const r = rank({ now: NOW, history: [], dims: dims(), slots: 12 });
  const order = DIMS_ORDER;
  for (let i = 1; i < r.length; i++) {
    if (r[i - 1].value === r[i].value) assert.ok(order.indexOf(r[i - 1].slug) < order.indexOf(r[i].slug));
  }
  const tied = r.filter((x) => x.reason.code === "default-order");
  assert.ok(tied.length > 0);
  for (const t of tied) {
    const next = r[r.indexOf(t) + 1];
    assert.equal(t.reason.versus, next.slug);
    assert.equal(t.value, next.value);
    assert.equal(t.reason.defaultIndex, order.indexOf(t.slug));
    assert.equal(t.reason.versusDefaultIndex, order.indexOf(next.slug));
  }
  // reversing the key order changes nothing at all (v1: it reversed the tie order)
  const rev = Object.fromEntries(Object.entries(dims()).reverse());
  assert.deepEqual(rank({ now: NOW, history: [], dims: rev, slots: 12 }), r);
});

test("a completed prerequisite raises a lesson and the reason names its slug", () => {
  const d = {
    "x-a": L("x-a", "probability", "x.a"),
    "x-b": L("x-b", "probability", "x.b", ["x.a"]),
    "y-c": L("y-c", "probability", "y.c", ["y.z"]),
    "y-z": L("y-z", "probability", "y.z"),
  };
  const history = [{ slug: "x-a", completedAt: NOW - 1 * D, predictedCorrectly: true, recalls: [] }];
  const r = rank({ now: NOW, history, dims: d, slots: 12 });
  const ib = r.findIndex((x) => x.slug === "x-b");
  const ic = r.findIndex((x) => x.slug === "y-c");
  assert.ok(ib < ic, "x-b (prerequisite done) ranks above y-c (prerequisite not done)");
  const b = r[ib];
  if (b.reason.code === "prerequisites") {
    assert.deepEqual(b.reason.prerequisites.map((p) => p.completedSlugs), [["x-a"]]);
  }
  const reasons = r.filter((x) => x.reason.code === "prerequisites");
  assert.ok(reasons.length > 0);
});

test("reason facts are true against the input", () => {
  for (const inp of [input(), { now: NOW, history: [], dims: dims(), slots: 12 }]) {
    const r = rank(inp);
    const d = inp.dims;
    const conceptOf = (s) => d[s]?.concept;
    for (let i = 0; i < r.length; i++) {
      const { reason, slug } = r[i];
      if (i === r.length - 1) { assert.equal(reason.code, "last"); continue; }
      assert.equal(reason.versus, r[i + 1].slug);
      switch (reason.code) {
        case "prerequisites": {
          assert.deepEqual(reason.prerequisites.map((p) => p.concept), d[slug].prerequisites);
          assert.deepEqual(reason.versusPrerequisites.map((p) => p.concept), d[reason.versus].prerequisites);
          for (const p of [...reason.prerequisites, ...reason.versusPrerequisites]) {
            const want = inp.history.filter((h) => conceptOf(h.slug) === p.concept).map((h) => h.slug).sort();
            assert.deepEqual([...p.completedSlugs].sort(), want);
            assert.ok(p.pKnown >= 0 && p.pKnown <= 1);
          }
          break;
        }
        case "domain-estimate": {
          assert.equal(reason.domain, d[slug].domain);
          const firsts = new Map();
          for (const h of [...inp.history].sort((a, b) => a.completedAt - b.completedAt)) {
            if (d[h.slug] && !firsts.has(conceptOf(h.slug))) firsts.set(conceptOf(h.slug), h);
          }
          const inDomain = [...firsts.values()].filter((h) => d[h.slug].domain === reason.domain);
          assert.equal(reason.rightPredictions, inDomain.filter((h) => h.predictedCorrectly === true).length);
          assert.equal(reason.wrongPredictions, inDomain.filter((h) => h.predictedCorrectly === false).length);
          break;
        }
        case "concept-known": {
          assert.equal(reason.concept, d[slug].concept);
          const items = inp.history.filter((h) => conceptOf(h.slug) === reason.concept);
          assert.deepEqual([...reason.completedSlugs].sort(), items.map((h) => h.slug).sort());
          const recent = items.flatMap((h) => h.recalls).filter((x) => x.at >= inp.now - 30 * D);
          assert.equal(reason.recallsRight, recent.filter((x) => x.correct).length);
          assert.equal(reason.recallsWrong, recent.filter((x) => !x.correct).length);
          break;
        }
        case "refresh": {
          assert.equal(reason.concept, d[slug].concept);
          if (reason.lastEventSlug !== null) {
            const items = inp.history.filter((h) => conceptOf(h.slug) === reason.concept);
            const times = items.flatMap((h) => [h.completedAt, ...h.recalls.filter((x) => x.at >= inp.now - 30 * D).map((x) => x.at)]);
            assert.ok(Math.abs(reason.daysSinceLastEvent - (inp.now - Math.max(...times)) / D) < 1e-9);
          }
          break;
        }
        case "default-order":
          assert.equal(r[i].value, r[i + 1].value);
          break;
        default:
          assert.fail(`unknown code ${reason.code}`);
      }
    }
  }
});

test("a lesson on an already-completed concept is valued by refresh and ranks low at base", () => {
  const r = rank(input());
  const again = r.find((x) => x.slug === "p-base-again");
  assert.ok(again.value < r[0].value);
});

test("source: no imports, no clock, no randomness, no I/O", () => {
  const src = readFileSync(fileURLToPath(new URL("./reachable-v2.ts", import.meta.url)), "utf8");
  const code = src.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
  assert.doesNotMatch(code, /^\s*import\s/m);
  assert.doesNotMatch(code, /\brequire\s*\(/);
  assert.doesNotMatch(code, /\bimport\s*\(/);
  assert.doesNotMatch(code, /\bDate\b/);
  assert.doesNotMatch(code, /Math\.random/);
  assert.doesNotMatch(code, /\b(process|globalThis|window|fetch|localStorage)\b/);
  // only now, history, dims and slots are read from the input
  const reads = [...code.matchAll(/input\.(\w+)/g)].map((m) => m[1]);
  for (const f of reads) assert.ok(["now", "history", "dims", "slots"].includes(f), f);
});

test("P14 pin: one wrong first prediction at rating 2 moves the domain estimate to 0.187 (sheet 48218b3)", () => {
  const d = {
    "x-done": L("x-done", "x", "x.done", [], { misconceptionStrength: 2 }),
    "x-new": L("x-new", "x", "x.new"),
    "y-new": L("y-new", "y", "y.new"),
  };
  const history = [{ slug: "x-done", completedAt: NOW - D, predictedCorrectly: false, recalls: [] }];
  const r = rank({ now: NOW, history, dims: d, slots: 12 });
  assert.equal(r[0].slug, "x-new");
  assert.equal(r[0].reason.code, "domain-estimate");
  assert.equal(r[0].reason.wrongPredictions, 1);
  assert.ok(Math.abs(r[0].reason.estimate - 0.187) <= 0.001, String(r[0].reason.estimate));
  // a right prediction at rating 3 is stronger evidence than at rating 1 (E[pull] 0.662 vs 0.499)
  const est = (rating) => {
    const dd = { ...d, "x-done": L("x-done", "x", "x.done", [], { misconceptionStrength: rating }) };
    const h = [{ slug: "x-done", completedAt: NOW - D, predictedCorrectly: true, recalls: [] }];
    const rr = rank({ now: NOW, history: h, dims: dd, slots: 12 });
    return rr.find((x) => x.slug === "y-new").reason.code === "domain-estimate"
      ? rr.find((x) => x.slug === "x-new").value : NaN;
  };
  assert.ok(est(3) < est(1));
});

// ---------------------------------------------------------------------------------------------
// Order rule (default-order-rule.md steps 1-5), on hand-made dims. Every lesson below has no
// prerequisite and its own concept, so with no prediction in the history all values tie exactly
// and rank() returns the tie order itself.
// ---------------------------------------------------------------------------------------------

const S = (slug, domain, status) => L(slug, domain, `k.${slug}`, [], status === undefined ? {} : { status });

function orderDims() {
  return {
    "p-zeta": S("p-zeta", "probability", "published"),
    "p-alpha": S("p-alpha", "probability", "review"),
    "c-gamma": S("c-gamma", "cs", "published"),
    "h-one": S("h-one", "history", "published"),
    "p-beta": S("p-beta", "probability"), // no status: ranks as published (step 1)
    "c-delta": S("c-delta", "cs", "review"),
    "h-two": S("h-two", "history", "draft"),
    "c-Zed": S("c-Zed", "cs", "published"), // "Z" (0x5A) sorts before "g" in code-unit order
    "p-eta": S("p-eta", "probability", "published"),
    "a-hist": S("a-hist", "history"), // no status
  };
}

// Worked by hand from steps 1-4:
// rank 0 sorted: a-hist, c-Zed, c-gamma, h-one, p-beta, p-eta, p-zeta; rank 1 sorted: c-delta, h-two, p-alpha.
// Domains by first appearance: history, cs, probability.
// Groups: history [a-hist, h-one, h-two]; cs [c-Zed, c-gamma, c-delta]; probability [p-beta, p-eta, p-zeta, p-alpha].
const ORDER = ["a-hist", "c-Zed", "p-beta", "h-one", "c-gamma", "p-eta", "h-two", "c-delta", "p-zeta", "p-alpha"];

function permutations(obj) {
  const e = Object.entries(obj);
  const rot = (k) => [...e.slice(k), ...e.slice(0, k)];
  // a fixed scramble (deterministic, no randomness)
  const scramble = e.map((x, i) => [((i * 7) + 3) % e.length, x]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  return [e, [...e].reverse(), rot(1), rot(4), scramble, [...e].sort((a, b) => (a[0] < b[0] ? 1 : -1))].map((x) => Object.fromEntries(x));
}

test("order rule: steps 1-4 on three domains, a review and a draft lesson, entries without status", () => {
  const r = rank({ now: NOW, history: [], dims: orderDims(), slots: 12 });
  assert.deepEqual(r.map((x) => x.slug), ORDER);
  for (let i = 1; i < r.length; i++) assert.equal(r[i].value, r[0].value, "all values tie exactly");
  for (let i = 0; i < r.length - 1; i++) {
    assert.equal(r[i].reason.code, "default-order");
    assert.equal(r[i].reason.defaultIndex, i);
    assert.equal(r[i].reason.versusDefaultIndex, i + 1);
  }
});

test("order rule: shuffling the key order of dims changes nothing", () => {
  const base = rank({ now: NOW, history: [], dims: orderDims(), slots: 12 });
  for (const d of permutations(orderDims())) assert.deepEqual(rank({ now: NOW, history: [], dims: d, slots: 12 }), base);
  const baseA = rank(input());
  for (const d of permutations(dims())) assert.deepEqual(rank(input({ dims: d })), baseA);
});

test("order rule step 5: derive the full order first, then remove completed lessons", () => {
  // c-Zed and h-one completed with no prediction and no recall: no other lesson's value moves.
  const history = [
    { slug: "c-Zed", completedAt: NOW - 3 * D, predictedCorrectly: null, recalls: [] },
    { slug: "h-one", completedAt: NOW - 2 * D, recalls: [] },
  ];
  const r = rank({ now: NOW, history, dims: orderDims(), slots: 12 });
  const derivedThenRemoved = ORDER.filter((s) => s !== "c-Zed" && s !== "h-one");
  assert.deepEqual(r.map((x) => x.slug), derivedThenRemoved);
  // removing first would give a different order (worked by hand), so this test tells the two apart
  const removedThenDerived = ["a-hist", "c-gamma", "p-beta", "h-two", "c-delta", "p-eta", "p-zeta", "p-alpha"];
  assert.notDeepEqual(derivedThenRemoved, removedThenDerived);
  // indices in the reason are positions in the full order, not in the filtered list
  const first = r[0];
  assert.equal(first.reason.code, "default-order");
  assert.equal(first.reason.defaultIndex, ORDER.indexOf(first.slug));
  assert.equal(first.reason.versusDefaultIndex, ORDER.indexOf(r[1].slug));
});

test("order rule: an explicit undefined status ranks as no status; any non-published status ranks 1", () => {
  const d = orderDims();
  d["a-hist"] = { ...d["a-hist"], status: undefined };
  assert.deepEqual(rank({ now: NOW, history: [], dims: d, slots: 12 }).map((x) => x.slug), ORDER);
  // "retired" and "" rank like review; "Published" (case differs) is not "published"
  const d2 = orderDims();
  d2["p-alpha"] = { ...d2["p-alpha"], status: "retired" };
  d2["h-two"] = { ...d2["h-two"], status: "" };
  assert.deepEqual(rank({ now: NOW, history: [], dims: d2, slots: 12 }).map((x) => x.slug), ORDER);
  const d3 = orderDims();
  d3["p-zeta"] = { ...d3["p-zeta"], status: "Published" };
  // p-zeta drops to rank 1: rank 1 sorted c-delta, h-two, p-alpha, p-zeta; probability [p-beta, p-eta, p-alpha, p-zeta]
  assert.deepEqual(rank({ now: NOW, history: [], dims: d3, slots: 12 }).map((x) => x.slug),
    ["a-hist", "c-Zed", "p-beta", "h-one", "c-gamma", "p-eta", "h-two", "c-delta", "p-alpha", "p-zeta"]);
});

test("order rule: a domain first seen among non-published lessons comes after the others", () => {
  const d = { ...orderDims(), "b-late": S("b-late", "zoo", "review") };
  // rank 1 sorted: b-late, c-delta, h-two, p-alpha, so zoo is the fourth domain; its group has one lesson
  assert.deepEqual(rank({ now: NOW, history: [], dims: d, slots: 12 }).map((x) => x.slug),
    ["a-hist", "c-Zed", "p-beta", "b-late", "h-one", "c-gamma", "p-eta", "h-two", "c-delta", "p-zeta", "p-alpha"]);
});

test("order rule: slugs sort by code unit, not locale", () => {
  const d = {
    "x-b": S("x-b", "x"), "x-B": S("x-B", "x"), "x-a10": S("x-a10", "x"), "x-a9": S("x-a9", "x"), "x-\u00e9": S("x-\u00e9", "x"),
  };
  // code units: "B" 0x42 < "a" 0x61 < "b" 0x62 < "\u00e9"; "a10" < "a9" because "1" < "9"
  assert.deepEqual(rank({ now: NOW, history: [], dims: d, slots: 12 }).map((x) => x.slug), ["x-B", "x-a10", "x-a9", "x-b", "x-\u00e9"]);
});

test("order rule: the candidate reads no field of an entry beyond slug, domain and status for order", () => {
  // changing fields that do not enter the value (level, successors) leaves the order unchanged
  const d = orderDims();
  for (const k of Object.keys(d)) d[k] = { ...d[k], level: k.length % 2 ? "intro" : "stretch", successors: ["zz"] };
  assert.deepEqual(rank({ now: NOW, history: [], dims: d, slots: 12 }).map((x) => x.slug), ORDER);
});
