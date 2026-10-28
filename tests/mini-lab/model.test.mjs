import test from "node:test";
import assert from "node:assert/strict";
import { advance, availability, displayedFrame, formatNumber, initialState, presentationSignature, validateSpec, validateVisual, visibleFrameSignature } from "../../src/lib/mini-lab/model.ts";

const frame = (value) => ({ caption: "Expected counts", visual: { kind: "bars", items: [{ label: "Count", value }] }, metrics: [{ label: "n", value }] });
const makeSpec = () => ({
  id: "test-fixture", family: "counts", setup: "Two model cases", hint: "Run the case and compare.",
  predict: { question: "Which count follows?", options: ["2", "4", "8"], answer: 1 },
  scenarios: [
    { id: "a", label: "A", frames: [frame(2), frame(4)], summary: "4 / 10" },
    { id: "b", label: "B", frames: [frame(3), frame(8)], summary: "8 / 10" },
  ],
  reveal: ["The retained rows show 4 of 10 in A and 8 of 10 in B. Changing the stated input doubles this model's count; the two saved observations remain available when the active trace is reset."],
});

test("Run/Compare is the bounded QA path, and Reset retains witnessed evidence", () => {
  const spec = validateSpec(makeSpec());
  let s = initialState();
  assert.deepEqual(s.witnessed, [false, false]);
  assert.equal(displayedFrame(spec, s), null);
  assert.equal(availability(spec, s).compare, false);
  assert.strictEqual(advance(spec, s, "compare"), s);
  s = advance(spec, s, "run");
  assert.deepEqual(s.witnessed, [true, false]);
  assert.equal(s.frameIndex, 1);
  assert.equal(availability(spec, s).run, false);
  assert.strictEqual(advance(spec, s, "run"), s);
  s = advance(spec, s, "compare");
  assert.deepEqual(s.witnessed, [true, true]);
  assert.equal(s.scenarioIndex, 1);
  assert.strictEqual(advance(spec, s, "step"), s);
  s = advance(spec, s, "reset");
  assert.equal(s.frameIndex, -1);
  assert.deepEqual(s.witnessed, [true, true]);
  assert.deepEqual(displayedFrame(spec, s), { frame: spec.scenarios[0].frames[1], saved: true });
  assert.strictEqual(advance(spec, s, "reset"), s);
});

test("Manual steps earn a case only at its final frame and compare cannot skip A", () => {
  const spec = makeSpec();
  let s = advance(spec, initialState(), "step");
  assert.deepEqual(s.witnessed, [false, false]);
  assert.equal(s.frameIndex, 0);
  assert.strictEqual(advance(spec, s, "compare"), s);
  s = advance(spec, s, "step");
  assert.deepEqual(s.witnessed, [true, false]);
  assert.equal(availability(spec, s).step, false);
});

test("Every enabled transition changes the rendered picture/readout or retained result", () => {
  const spec = makeSpec();
  const queue = [initialState()];
  const seen = new Set();
  while (queue.length) {
    const state = queue.shift(), key = JSON.stringify(state);
    if (seen.has(key)) continue;
    seen.add(key);
    for (const [action, enabled] of Object.entries(availability(spec, state))) {
      const next = advance(spec, state, action);
      if (!enabled) { assert.strictEqual(next, state); continue; }
      assert.notEqual(presentationSignature(spec, next), presentationSignature(spec, state), `${action} must change teaching evidence, not just a state index or Saved label`);
      queue.push(next);
    }
  }
  assert.ok(seen.size > 6);
});

test("Three-frame traces reject adjacent duplicate pictures even if a later frame changes", () => {
  const spec = makeSpec();
  spec.scenarios[0].frames = [frame(1), { ...frame(1), caption: "Only this caption differs" }, frame(2)];
  assert.throws(() => validateSpec(spec), /adjacent.*visibly change/);
});

test("Rounding and automatic scale cannot manufacture a visible contrast", () => {
  const a = { caption: "A", visual: { kind: "bars", items: [{ label: "Count", value: 1.0001 }] } };
  const b = { caption: "B", visual: { kind: "bars", items: [{ label: "Count", value: 1.0002 }] } };
  assert.equal(visibleFrameSignature(a), visibleFrameSignature(b));
  const spec = makeSpec();
  spec.scenarios[0].frames = [a, b, frame(2)];
  assert.throws(() => validateSpec(spec), /adjacent.*visibly change/);
});

test("Run after Reset is disabled when saved A already shows the same computed result", () => {
  const spec = makeSpec();
  const a = advance(spec, initialState(), "run");
  // Reset from active A-final is itself a no-op: it would only add a Saved label.
  assert.equal(availability(spec, a).reset, false);
  assert.strictEqual(advance(spec, a, "reset"), a);
  assert.equal(availability(spec, a).run, false);
  assert.strictEqual(advance(spec, advance(spec, a, "reset"), "run"), a);

  const b = advance(spec, a, "compare");
  const saved = advance(spec, b, "reset");
  assert.notEqual(presentationSignature(spec, b), presentationSignature(spec, saved));
  assert.equal(displayedFrame(spec, saved).saved, true);
  assert.equal(availability(spec, saved).run, false);
  assert.strictEqual(advance(spec, saved, "run"), saved);
  assert.deepEqual(saved.witnessed, [true, true]);
  assert.equal(availability(spec, saved).step, true);
  const rewind = advance(spec, saved, "step");
  assert.notEqual(presentationSignature(spec, rewind), presentationSignature(spec, saved));
  assert.deepEqual(rewind.witnessed, [true, true]);
});

test("Step from a saved final skips a nonadjacent identical first frame", () => {
  const spec = makeSpec();
  spec.scenarios[0].frames = [frame(4), frame(2), frame(4)];
  validateSpec(spec);
  const a = advance(spec, initialState(), "run");
  const b = advance(spec, a, "compare");
  const saved = advance(spec, b, "reset");
  const stepped = advance(spec, saved, "step");
  assert.equal(stepped.frameIndex, 1);
  assert.equal(displayedFrame(spec, stepped).frame.visual.items[0].value, 2);
  assert.notEqual(presentationSignature(spec, saved), presentationSignature(spec, stepped));
});

test("Trace validator rejects caption-only animation and unchanged contrast", () => {
  let spec = makeSpec();
  spec.scenarios[0].frames[1] = { ...frame(2), caption: "Different caption" };
  assert.throws(() => validateSpec(spec), /visibly change/);
  spec = makeSpec();
  spec.scenarios[1].frames[1] = frame(4);
  assert.throws(() => validateSpec(spec), /contrast/);
  assert.equal(visibleFrameSignature(frame(4)), visibleFrameSignature({ ...frame(4), caption: "Another sentence" }));
});

test("Known visual families validate exact numeric fixtures", () => {
  const fixtures = [
    { kind: "bars", items: [{ label: "A", value: -2 }, { label: "B", value: 4 }] },
    { kind: "curve", points: [{ x: 0, y: 0 }, { x: 1, y: .5 }], xLabel: "n" },
    { kind: "scatter", points: [{ x: 0, y: -1 }] },
    { kind: "grid", cells: [{ label: "TP", value: 9 }, { label: "FP", value: 89 }] },
    { kind: "graph", nodes: [{ id: "x", label: "X", x: 50, y: 50 }, { id: "y", label: "Y", x: 250, y: 100 }], edges: [{ from: "x", to: "y", active: false }] },
    { kind: "table", columns: ["Case", "Count"], rows: [["A", 4], ["B", 8]] },
    { kind: "timeline", events: [{ label: "0", value: 100 }, { label: "1", value: 105 }] },
    { kind: "intervals", items: [{ label: "A", low: -.2, mid: 0, high: .2 }] },
  ];
  fixtures.forEach((f) => assert.doesNotThrow(() => validateVisual(f)));
});

test("Malformed values never silently become a chart", () => {
  for (const value of [NaN, Infinity, -Infinity, 1e16]) assert.throws(() => validateVisual({ kind: "bars", items: [{ label: "A", value }] }), /finite/);
  assert.throws(() => validateVisual({ kind: "graph", nodes: [{ id: "x", label: "X", x: 400, y: 50 }], edges: [] }), /coordinates/);
  assert.throws(() => validateVisual({ kind: "graph", nodes: [{ id: "x", label: "X", x: 50, y: 50 }], edges: [{ from: "x", to: "absent" }] }), /existing nodes/);
  assert.throws(() => validateVisual({ kind: "intervals", items: [{ label: "A", low: 3, mid: 2, high: 4 }] }), /low/);
  assert.throws(() => validateVisual({ kind: "table", columns: ["A", "B"], rows: [[1]] }), /width/);
  assert.throws(() => validateVisual({ kind: "bars", items: [] }), /items/);
  assert.throws(() => validateVisual({ kind: "unsupported" }), /unknown/);
});

test("Answers, distinct options, IDs and explanation budget are validated", () => {
  const mutate = (f) => { const spec = makeSpec(); f(spec); return spec; };
  assert.throws(() => validateSpec(mutate((s) => { s.predict.answer = 3; })), /index/);
  assert.throws(() => validateSpec(mutate((s) => { s.predict.options = ["4", "4"]; })), /distinct/);
  assert.throws(() => validateSpec(mutate((s) => { s.scenarios[1].id = "a"; })), /IDs/);
  assert.throws(() => validateSpec(mutate((s) => { s.reveal = ["Too short."]; })), /explain/);
  assert.throws(() => validateSpec(mutate((s) => { s.reveal = ["word ".repeat(91)]; })), /90 words/);
});

test("Formatting is deterministic, precise and finite", () => {
  assert.equal(formatNumber(2.44140625), "2.441");
  assert.equal(formatNumber(1000), "1,000");
  assert.equal(formatNumber(.00001), "1.00e-5");
  assert.throws(() => formatNumber(NaN), /finite/);
});
