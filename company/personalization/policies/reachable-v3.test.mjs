// Unit tests for reachable-v3 on hand-made histories only (no simulator, no harness, no episode).
// Carried over from reachable-v2.test.mjs and adapted for an ungraded history (build note §5), plus the v3 tests
// at the end: cold start equals v2, predictions and recalls never read, and the moving reasons (batch 5 §15.1 (ii)).
// reachable-v2.ts is imported here as the reference only; the candidate itself imports nothing.
// Run: node --test company/personalization/policies/reachable-v3.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { rank, decide, moves, internals, REACHABLE_V3 } from "./reachable-v3.ts";
import { rank as rankV2 } from "./reachable-v2.ts";

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
          // v3 is ungraded: no prediction is counted and the estimate is the prior mean
          assert.equal(reason.rightPredictions, 0);
          assert.equal(reason.wrongPredictions, 0);
          assert.ok(Math.abs(reason.estimate - internals.priorMean()) < 1e-12);
          break;
        }
        case "concept-known": {
          assert.equal(reason.concept, d[slug].concept);
          const items = inp.history.filter((h) => conceptOf(h.slug) === reason.concept);
          assert.deepEqual([...reason.completedSlugs].sort(), items.map((h) => h.slug).sort());
          // v3 reads no recall
          assert.equal(reason.recallsRight, 0);
          assert.equal(reason.recallsWrong, 0);
          break;
        }
        case "refresh": {
          assert.equal(reason.concept, d[slug].concept);
          if (reason.lastEventSlug !== null) {
            const items = inp.history.filter((h) => conceptOf(h.slug) === reason.concept);
            const times = items.map((h) => h.completedAt); // v3: completions only
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
  const src = readFileSync(fileURLToPath(new URL("./reachable-v3.ts", import.meta.url)), "utf8");
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
  // v3: ungraded. The type still declares predictedCorrectly and recalls; no code line reads them, nor the rating fields.
  const body = code.slice(code.indexOf("export type LessonDims"));
  const afterTypes = code.slice(code.indexOf("const P = {"));
  assert.ok(body.length > 0 && afterTypes.length > 0);
  assert.doesNotMatch(afterTypes, /predictedCorrectly/);
  assert.doesNotMatch(afterTypes, /\.recalls\b/);
  assert.doesNotMatch(afterTypes, /\.rating\b|misconceptionStrength/);
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

// ---------------------------------------------------------------------------------------------
// v3: ungraded order (batch 5 §15.1 (ii) 1 and 4)
// ---------------------------------------------------------------------------------------------

const strip = (history) => history.map((h) => ({ slug: h.slug, completedAt: h.completedAt, recalls: [] }));
const PRED_VALUES = [true, false, null, undefined];

/** A larger hand-made catalogue: 4 domains, shared concepts, chains of prerequisites, one outside prerequisite. */
function bigDims() {
  const d = {};
  const add = (slug, domain, concept, pre = [], extra = {}) => { d[slug] = L(slug, domain, concept, pre, extra); };
  for (const dom of ["alg", "bio", "chem", "geo"]) {
    add(`${dom}-1`, dom, `${dom}.a`);
    add(`${dom}-2`, dom, `${dom}.a`, [], { misconceptionStrength: 3 });
    add(`${dom}-3`, dom, `${dom}.b`, [`${dom}.a`]);
    add(`${dom}-4`, dom, `${dom}.c`, [`${dom}.b`, `${dom}.a`], { rating: 1 });
    add(`${dom}-5`, dom, `${dom}.d`, [`${dom}.c`], { status: "review" });
    add(`${dom}-6`, dom, `${dom}.e`, ["outside.x"]);
  }
  add("alg-7", "alg", "bio.a"); // a concept shared across lessons of one domain's name pattern
  return d;
}

function histories(now = NOW) {
  return [
    [],
    historyA(now),
    [{ slug: "alg-1", completedAt: now - 1 * D, predictedCorrectly: true, recalls: [] }],
    [{ slug: "alg-1", completedAt: now - 9 * D, predictedCorrectly: false, recalls: [{ at: now - 2 * D, correct: true }] }],
    [
      { slug: "alg-1", completedAt: now - 20 * D, predictedCorrectly: true, recalls: [{ at: now - 10 * D, correct: false }] },
      { slug: "alg-3", completedAt: now - 12 * D, predictedCorrectly: false, recalls: [] },
      { slug: "bio-2", completedAt: now - 3 * D, predictedCorrectly: null, recalls: [{ at: now - 1 * D, correct: true }] },
      { slug: "geo-6", completedAt: now - 45 * D, recalls: [{ at: now - 44 * D, correct: true }] },
    ],
    [
      { slug: "chem-1", completedAt: now - 2 * D, predictedCorrectly: true, recalls: [] },
      { slug: "chem-2", completedAt: now - 1 * D, predictedCorrectly: true, recalls: [] },
      { slug: "chem-3", completedAt: now - 1 * D, predictedCorrectly: false, recalls: [] },
      { slug: "not-in-dims", completedAt: now - 1 * D, predictedCorrectly: false, recalls: [] },
    ],
  ];
}
const casesAll = (now = NOW) => [
  ...histories(now).map((history) => ({ now, history, dims: bigDims(), slots: 12 })),
  { now, history: historyA(now), dims: dims(), slots: 12 },
  { now, history: [], dims: dims(), slots: 12 },
  { now, history: [], dims: orderDims(), slots: 12 },
];

test("v3 cold start: empty history gives an order byte-identical to v2's", () => {
  for (const d of [dims(), orderDims(), bigDims()]) {
    const inp = { now: NOW, history: [], dims: d, slots: 12 };
    assert.equal(JSON.stringify(rank(inp)), JSON.stringify(rankV2(inp)));
  }
});

test("v3 equals v2 on the same history with every prediction and recall removed (v2's no-prediction branch)", () => {
  for (const inp of casesAll()) {
    assert.equal(JSON.stringify(rank(inp)), JSON.stringify(rankV2({ ...inp, history: strip(inp.history) })));
  }
});

test("v3 ungraded: flipping any predictedCorrectly leaves rank and moves unchanged", () => {
  for (const inp of casesAll()) {
    const r0 = JSON.stringify(rank(inp));
    const m0 = JSON.stringify(moves(inp));
    for (let i = 0; i < inp.history.length; i++) {
      for (const v of PRED_VALUES) {
        const history = inp.history.map((h, j) => {
          if (j !== i) return h;
          const c = { ...h };
          if (v === undefined) delete c.predictedCorrectly;
          else c.predictedCorrectly = v;
          return c;
        });
        assert.equal(JSON.stringify(rank({ ...inp, history })), r0);
        assert.equal(JSON.stringify(moves({ ...inp, history })), m0);
      }
    }
    // all at once, each way
    for (const v of PRED_VALUES) {
      const history = inp.history.map((h) => ({ ...h, predictedCorrectly: v }));
      assert.equal(JSON.stringify(rank({ ...inp, history })), r0);
      assert.equal(JSON.stringify(moves({ ...inp, history })), m0);
    }
  }
});

test("v3 ungraded: adding or removing recalls leaves rank and moves unchanged", () => {
  for (const inp of casesAll()) {
    const r0 = JSON.stringify(rank(inp));
    const m0 = JSON.stringify(moves(inp));
    const variants = [
      inp.history.map((h) => ({ ...h, recalls: [] })),
      inp.history.map((h) => ({ ...h, recalls: [...h.recalls, { at: inp.now - D, correct: true }] })),
      inp.history.map((h) => ({ ...h, recalls: [...h.recalls, { at: inp.now - 2 * D, correct: false }, { at: inp.now, correct: false }] })),
      inp.history.map((h) => ({ ...h, recalls: h.recalls.map((r) => ({ ...r, correct: !r.correct })) })),
      inp.history.map((h) => ({ ...h, recalls: Array.from({ length: 20 }, (_, k) => ({ at: h.completedAt + k * 3_600_000, correct: k % 3 === 0 })) })),
    ];
    for (const history of variants) {
      assert.equal(JSON.stringify(rank({ ...inp, history })), r0);
      assert.equal(JSON.stringify(moves({ ...inp, history })), m0);
    }
  }
});

// ---------------------------------------------------------------------------------------------
// v3: moving reasons (batch 5 §15.1 (ii) 2-3), checked against an independent statement of the
// default order and F6's pair test (evidence/2026-10-17-edd010-reason-rule-truth.md §1, §7).
// ---------------------------------------------------------------------------------------------

/** default-order-rule.md steps 1-4, restated independently of the candidate. */
function ruleOrder(d) {
  const st = (e) => (e.status === undefined || e.status === "published" ? 0 : 1);
  const es = Object.values(d).sort((a, b) => st(a) - st(b) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  const groups = [];
  const byDom = new Map();
  for (const e of es) {
    if (!byDom.has(e.domain)) { byDom.set(e.domain, []); groups.push(byDom.get(e.domain)); }
    byDom.get(e.domain).push(e.slug);
  }
  const out = [];
  for (let k = 0; out.length < es.length; k++) for (const g of groups) if (k < g.length) out.push(g[k]);
  return out;
}

const valueOfT = (t) => (1 - t.q) * t.newGain * t.prereqFactor + t.q * t.refresh;
/** F6 §7's pairCode, with q mapped by the moved card (mapBy) and domain-estimate counted as no code in v3. */
function pairCode(u, l, mapBy) {
  if (!(u.value > l.value)) return { code: null, contrib: new Set() };
  const sw = [
    { c: "prerequisites", v: u.value - valueOfT({ ...u.terms, prereqFactor: l.terms.prereqFactor }) },
    { c: "q", v: u.value - valueOfT({ ...u.terms, q: l.terms.q }) },
    { c: "refresh", v: u.value - valueOfT({ ...u.terms, refresh: l.terms.refresh }) },
  ];
  let b = sw[0]; for (const s of sw) if (s.v > b.v) b = s;
  const m = (c) => (c === "q" ? (mapBy.hasState ? "concept-known" : "domain-estimate") : c);
  return { code: m(b.c), contrib: new Set(sw.filter((s) => s.v > 0).map((s) => m(s.c))) };
}

function expectedMoves(inp) {
  const rows = internals.rows(inp);
  const done = new Set(inp.history.map((h) => h.slug));
  const def = ruleOrder(inp.dims).filter((s) => !done.has(s));
  const rpos = new Map(rows.map((r, i) => [r.slug, i]));
  const dpos = new Map(def.map((s, i) => [s, i]));
  return rows.map((x, rx) => {
    const dx = dpos.get(x.slug);
    if (rx === dx) return { slug: x.slug, moved: false };
    const earlier = rx < dx;
    const pairs = rows.filter((y) => (earlier ? dpos.get(y.slug) < dx && rpos.get(y.slug) > rx : dpos.get(y.slug) > dx && rpos.get(y.slug) < rx))
      .map((y) => (earlier ? [x, y] : [y, x]));
    const results = pairs.map(([u, l]) => pairCode(u, l, x));
    const eligible = ["prerequisites", "concept-known", "refresh"].filter((c) => results.some((p) => p.contrib.has(c)));
    const count = (c) => results.filter((p) => p.code === c).length;
    let code = null;
    for (const c of eligible) if (code === null || count(c) > count(code)) code = c;
    return { slug: x.slug, moved: true, direction: earlier ? "earlier" : "later", code, pairs, results };
  });
}

test("moves: one entry per ranked slug, in rank order; moved iff the position differs from the default order", () => {
  for (const inp of casesAll()) {
    const r = rank(inp);
    const m = moves(inp);
    assert.deepEqual(m.map((x) => x.slug), r.map((x) => x.slug));
    const exp = expectedMoves(inp);
    for (let i = 0; i < m.length; i++) {
      assert.equal(m[i].moved, exp[i].moved, m[i].slug);
      if (!m[i].moved) { assert.equal(m[i].direction, null); assert.equal(m[i].code, null); }
      else assert.equal(m[i].direction, exp[i].direction, m[i].slug);
    }
  }
});

test("moves: the code is F6's T2-some code, decisive against the most passed cards, ties p > c-k > r", () => {
  let checked = 0;
  for (const inp of casesAll()) {
    const m = moves(inp);
    const exp = expectedMoves(inp);
    for (let i = 0; i < m.length; i++) {
      if (!m[i].moved) continue;
      assert.equal(m[i].code, exp[i].code, `${m[i].slug} in a case of ${inp.history.length} items`);
      checked++;
    }
  }
  assert.ok(checked > 10, `moved cards checked: ${checked}`);
});

test("moves: the code is never domain-estimate or default-order, and the output holds no number", () => {
  const noNumber = (v, path) => {
    assert.notEqual(typeof v, "number", path);
    if (v && typeof v === "object") for (const [k, w] of Object.entries(v)) noNumber(w, `${path}.${k}`);
  };
  for (const inp of casesAll()) {
    const m = moves(inp);
    noNumber(m, "moves");
    for (const x of m) {
      assert.ok(x.code === null || ["prerequisites", "concept-known", "refresh"].includes(x.code), String(x.code));
      assert.deepEqual(Object.keys(x).sort(), ["code", "direction", "facts", "moved", "slug"]);
      assert.deepEqual(Object.keys(x.facts).sort(), ["finishedOnConcept", "finishedOnPrerequisites", "prerequisiteLessons"]);
    }
  }
});

test("moves: the facts are the lesson's own (its prerequisite lessons, finished lessons on its concept or prerequisites)", () => {
  for (const inp of casesAll()) {
    const d = inp.dims;
    const order = ruleOrder(d);
    const fin = [...new Set(inp.history.filter((h) => d[h.slug]).map((h) => h.slug))];
    const firstAt = (s) => Math.min(...inp.history.filter((h) => h.slug === s).map((h) => h.completedAt));
    fin.sort((a, b) => firstAt(a) - firstAt(b) || order.indexOf(a) - order.indexOf(b));
    for (const x of moves(inp)) {
      const own = d[x.slug];
      assert.deepEqual(x.facts.prerequisiteLessons, order.filter((s) => own.prerequisites.includes(d[s].concept)));
      assert.deepEqual(x.facts.finishedOnConcept, fin.filter((s) => d[s].concept === own.concept));
      assert.deepEqual(x.facts.finishedOnPrerequisites, fin.filter((s) => own.prerequisites.includes(d[s].concept)));
      for (const s of [...x.facts.prerequisiteLessons, ...x.facts.finishedOnConcept, ...x.facts.finishedOnPrerequisites]) {
        assert.ok(d[s], `${s} is a lesson in dims`);
        assert.notEqual(s, x.slug);
      }
    }
  }
});

test("moves: replay, no state between calls, deep-frozen input, time translation, key order", () => {
  for (const inp of casesAll()) {
    const m0 = JSON.stringify(moves(inp));
    assert.equal(JSON.stringify(moves(inp)), m0);
    moves({ now: NOW + 5 * D, history: [{ slug: "alg-2", completedAt: NOW, recalls: [] }], dims: bigDims(), slots: 3 });
    assert.equal(JSON.stringify(moves(inp)), m0);
    const frozen = deepFreeze(JSON.parse(JSON.stringify(inp)));
    assert.equal(JSON.stringify(moves(frozen)), m0);
    for (const d of permutations(inp.dims)) assert.equal(JSON.stringify(moves({ ...inp, dims: d })), m0);
  }
  for (const shift of [-123_456_789, 5 * D, 1_000 * D + 17]) {
    const a = casesAll();
    const b = casesAll(NOW + shift);
    for (let i = 0; i < a.length; i++) {
      assert.equal(JSON.stringify(moves(b[i])), JSON.stringify(moves(a[i])));
      assert.equal(JSON.stringify(rank(b[i])), JSON.stringify(rank(a[i])));
    }
  }
});

test("moves: forbidden fields and slots are ignored", () => {
  const fields = ["dwell", "swipes", "scroll", "sessionLength", "sessionCount", "shares", "device",
    "locationFinerThanCountry", "ageBand", "ads", "personaLabel", "gapDays", "settings", "persona", "fixedDue"];
  for (const inp of casesAll()) {
    const m0 = JSON.stringify(moves(inp));
    for (const f of fields) for (const v of [0, 7, ["alg-1"], { x: 1 }]) assert.equal(JSON.stringify(moves({ ...inp, [f]: v })), m0, f);
    // and on each history item
    const h2 = inp.history.map((h) => ({ ...h, dwell: 99, gapDays: 3, persona: "x", device: "y" }));
    assert.equal(JSON.stringify(moves({ ...inp, history: h2 })), m0);
    assert.equal(JSON.stringify(moves({ ...inp, slots: 1 })), m0);
  }
});

test("moves: cold start on the order dims moves nothing (every value ties)", () => {
  const m = moves({ now: NOW, history: [], dims: orderDims(), slots: 12 });
  assert.ok(m.every((x) => !x.moved));
});

test("moves: a lesson whose prerequisite was finished moves earlier with code prerequisites", () => {
  const d = {
    "x-a": L("x-a", "probability", "x.a"),
    "x-b": L("x-b", "probability", "x.b", ["x.a"]),
    "y-c": L("y-c", "probability", "y.c", ["y.z"]),
    "y-z": L("y-z", "probability", "y.z"),
  };
  // default order y-c, y-z? no: one domain, slugs sorted: x-a, x-b, y-c, y-z; x-a finished.
  const inp = { now: NOW, history: [{ slug: "x-a", completedAt: NOW - 1 * D, recalls: [] }], dims: d, slots: 12 };
  const m = moves(inp);
  const yz = m.find((x) => x.slug === "y-z");
  const yc = m.find((x) => x.slug === "y-c");
  assert.equal(yz.moved, true);
  assert.equal(yz.direction, "earlier");
  assert.equal(yc.direction, "later");
  assert.equal(yc.code, "prerequisites");
  assert.deepEqual(yc.facts.prerequisiteLessons, ["y-z"]);
  const xb = m.find((x) => x.slug === "x-b");
  assert.deepEqual(xb.facts.finishedOnPrerequisites, ["x-a"]);
});

test("moves: a lesson on a finished concept moves later with code concept-known", () => {
  const d = { "a1": L("a1", "d1", "A"), "a2": L("a2", "d1", "A"), "b1": L("b1", "d2", "B"), "b2": L("b2", "d2", "B2") };
  const inp = { now: NOW, history: [{ slug: "a1", completedAt: NOW - 3 * D, recalls: [] }], dims: d, slots: 12 };
  const a2 = moves(inp).find((x) => x.slug === "a2");
  assert.equal(a2.direction, "later");
  assert.equal(a2.code, "concept-known");
  assert.deepEqual(a2.facts.finishedOnConcept, ["a1"]);
});

// The spec gap (build note §4, G1): a lesson with no concept state that moves earlier only because the lessons it
// passed are on finished concepts has no eligible code in {prerequisites, concept-known, refresh}: its only
// contributing term is q, whose F6 code for a stateless card is domain-estimate, which v3 does not have.
// The brief says a moved lesson with no eligible code is a test failure. It is kept visible as a todo so the
// suite records the failure without hiding it; the candidate is NOT frozen while this stands.
const GAP_DIMS = () => ({
  "a1": L("a1", "d1", "A"), "a2": L("a2", "d1", "A"), "c1": L("c1", "d1", "C", ["A"]),
  "b1": L("b1", "d2", "B"), "b2": L("b2", "d2", "B2"), "e1": L("e1", "d2", "E"),
});

test("every moved slug has a code that passes the pair test against at least one passed card", { todo: "spec gap G1 (build note §4): fails on the gap histories; vp-personalization to decide" }, () => {
  const all = [...casesAll(), ...[1, 3, 7, 14, 30].map((age) => ({ now: NOW, history: [{ slug: "a1", completedAt: NOW - age * D, recalls: [] }], dims: GAP_DIMS(), slots: 12 }))];
  const failures = [];
  for (const inp of all) {
    const exp = expectedMoves(inp);
    for (const x of moves(inp)) {
      if (!x.moved) continue;
      const e = exp.find((y) => y.slug === x.slug);
      if (x.code === null || !e.results.some((p) => p.contrib.has(x.code))) failures.push(`${x.slug} ${x.direction} (history ${inp.history.map((h) => h.slug).join(",") || "empty"})`);
    }
  }
  assert.deepEqual(failures, []);
});

test("gap G1 pinned: b2 moves earlier past a2 only, and only q (domain-estimate in F6's map) favours it", () => {
  for (const age of [1, 3, 7, 14, 30]) {
    const inp = { now: NOW, history: [{ slug: "a1", completedAt: NOW - age * D, recalls: [] }], dims: GAP_DIMS(), slots: 12 };
    const b2 = moves(inp).find((x) => x.slug === "b2");
    assert.equal(b2.moved, true);
    assert.equal(b2.direction, "earlier");
    assert.equal(b2.code, null);
    const e = expectedMoves(inp).find((x) => x.slug === "b2");
    assert.deepEqual(e.pairs.map(([, l]) => l.slug), ["a2"]);
    assert.deepEqual([...e.results[0].contrib], ["domain-estimate"]);
  }
  // at age 0 refresh still favours b2 (a2's refresh is 0), so b2 gets refresh there
  const inp0 = { now: NOW, history: [{ slug: "a1", completedAt: NOW, recalls: [] }], dims: GAP_DIMS(), slots: 12 };
  assert.equal(moves(inp0).find((x) => x.slug === "b2").code, "refresh");
});

test("REACHABLE_V3 names the candidate and its three functions", () => {
  assert.equal(REACHABLE_V3.name, "reachable-v3");
  assert.equal(REACHABLE_V3.version, "3");
  assert.equal(REACHABLE_V3.rank, rank);
  assert.equal(REACHABLE_V3.decide, decide);
  assert.equal(REACHABLE_V3.moves, moves);
});
