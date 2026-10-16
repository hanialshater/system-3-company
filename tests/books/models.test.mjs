import assert from "node:assert/strict";
import { test } from "node:test";
import {
  calculateModel, canResetObservation, fillSeen, formatBookValue, formatCompoundOperation, initialObservation, observeScenario,
  resetObservation, validateBookIdeaSpec,
} from "../../src/lib/books/model.ts";

test("serial bottleneck and upstream queues use minimum, including a stopped station", () => {
  assert.deepEqual(calculateModel("flow", [12, 9, 5, 10]), { output: 5, trace: [12, 9, 5, 5] });
  assert.equal(calculateModel("flow", [24, 9, 5, 10]).output, 5);
  assert.equal(calculateModel("flow", [12, 9, 11, 10]).output, 9);
  assert.equal(calculateModel("flow", [10, 0]).output, 0);
});
test("expected value uses signed net outcomes at the probability boundaries", () => {
  assert.equal(calculateModel("payoff", [25, 12, -4]).output, 0);
  assert.equal(calculateModel("payoff", [0, 12, -4]).output, -4);
  assert.equal(calculateModel("payoff", [100, 12, -4]).output, 12);
  assert.equal(calculateModel("payoff", [50, -4, -8]).output, -6);
});
test("compound additions happen after each fixed-rate step", () => {
  const result = calculateModel("compound", [100, 10, 2, 10]);
  assert.ok(Math.abs(result.output - 142) < 1e-10);
  assert.equal(result.trace.map(formatBookValue).join(","), "100,120,142");
  assert.equal(calculateModel("compound", [100, 10, 0, 10]).output, 100);
  assert.equal(calculateModel("compound", [100, -100, 2, 10]).output, 10);
});
test("selection weights denominators and preserves expected fractional successes", () => {
  assert.deepEqual(calculateModel("selection", [3, 50, 1, 100]), { output: 62.5, trace: [1.5, 1] });
  assert.equal(calculateModel("selection", [0, 99, 10, 30]).output, 30);
  assert.equal(calculateModel("selection", [90, 10, 10, 90]).output, 18);
});
test("fractional compound input remains inspectable while results round to two decimals", () => {
  const result = calculateModel("compound", [1, 12.5, 8, 0]);
  assert.ok(Math.abs(result.output - (9 / 8) ** 8) < 1e-12);
  assert.equal(formatBookValue(result.output), "2.57");
  assert.notEqual(formatBookValue(1.13 ** 8), "2.57");
  assert.equal(formatCompoundOperation(12.5, 0), "× (1 + 12.5/100) + 0");
  assert.equal(formatCompoundOperation(-12.5, 0), "× (1 − 12.5/100) + 0");
  assert.equal(formatCompoundOperation(68.1792830507429, 0), "× (1 + 68.1792830507429/100) + 0");
  assert.throws(() => formatCompoundOperation(NaN, 0), /Book model:/);
});
test("branching counts include the seed and stop at total capacity", () => {
  assert.deepEqual(calculateModel("network", [100, 2, 3]), { output: 15, trace: [1, 3, 7, 15] });
  assert.equal(calculateModel("network", [5, 2, 3]).output, 5);
  assert.equal(calculateModel("network", [100, 1, 3]).output, 4);
  assert.equal(calculateModel("network", [1e6, 6, 12]).output, 1e6);
  assert.equal(calculateModel("network", [10, 2, 0]).output, 1);
});
test("feedback floors each step at zero rather than allowing negative stock", () => {
  assert.deepEqual(calculateModel("feedback", [3, 1, 3, 3]), { output: 0, trace: [3, 1, 0, 0] });
  assert.equal(calculateModel("feedback", [10, 5, 2, 4]).output, 22);
  assert.equal(calculateModel("feedback", [10, 5, 2, 0]).output, 10);
});
test("intervals include overhead in every chunk, including the final chunk", () => {
  assert.deepEqual(calculateModel("intervals", [60, 20, 5]), { output: 40, trace: [25, 50] });
  assert.equal(calculateModel("intervals", [24, 20, 5]).output, 0);
  assert.equal(calculateModel("intervals", [25, 20, 5]).output, 20);
  assert.equal(calculateModel("intervals", [60, 20, 0]).output, 60);
  assert.equal(calculateModel("intervals", [0, 20, 5]).output, 0);
});
test("bad arities, nonfinite numbers, fractional horizons and over-budget visuals fail explicitly", () => {
  const invalid = [
    ["flow", [1]], ["flow", [1, 2, 3, 4, 5]], ["flow", [-1, 2]],
    ["payoff", [101, 1, -1]], ["payoff", [50, Infinity, -1]], ["payoff", [50, 1]],
    ["compound", [1, 1, 1.5, 0]], ["compound", [1e9, 1000, 12, 0]],
    ["selection", [0, 50, 0, 50]], ["selection", [1.5, 50, 2, 50]],
    ["network", [1e6 + 1, 2, 3]], ["network", [10, 0, 3]], ["network", [10, 2, 13]],
    ["feedback", [1, 2, -1, 3]], ["feedback", [1, 2, 3, NaN]],
    ["intervals", [60, 0, 5]], ["intervals", [100, 1, 0]],
  ];
  for (const [family, values] of invalid) assert.throws(() => calculateModel(family, values), /Book model:/);
});
test("observations survive Reset and literal reveal substitution uses their rounding", () => {
  const a = observeScenario(initialObservation(), 0, 1 / 3);
  const b = observeScenario(a, 1, -0);
  const reset = resetObservation(b);
  assert.equal(reset.active, 0);
  assert.equal(canResetObservation(reset), false);
  assert.deepEqual(reset.seen, [1 / 3, -0]);
  assert.deepEqual(a.seen, [1 / 3, null]);
  assert.equal(fillSeen("{A} then {B}; ${danger} <script>", reset.seen), "0.33 then 0; ${danger} <script>");
  assert.equal(fillSeen("{A}/{B}", initialObservation().seen), "?/?");
  assert.equal(formatBookValue(12345.678), "12,345.68");
  assert.throws(() => formatBookValue(NaN), /Book model:/);
});
test("B-first Reset cannot earn or disable unseen A; completed Reset retains A's causal picture", () => {
  const bFirst = observeScenario(initialObservation(), 1, 20);
  assert.equal(canResetObservation(bFirst), true);
  const earlyReset = resetObservation(bFirst);
  assert.equal(earlyReset.active, null);
  assert.deepEqual(earlyReset.seen, [null, 20]);
  assert.equal(canResetObservation(earlyReset), false);
  const aLater = observeScenario(earlyReset, 0, 10);
  assert.deepEqual(aLater.seen, [10, 20]);
  assert.equal(canResetObservation(aLater), false);
  const bAgain = observeScenario(aLater, 1, 20);
  assert.equal(canResetObservation(bAgain), true);
  const completedReset = resetObservation(bAgain);
  assert.equal(completedReset.active, 0);
  assert.deepEqual(completedReset.seen, [10, 20]);
  assert.equal(canResetObservation(completedReset), false);
});
test("independent JSON data is guarded before rendering", () => {
  const idea = {
    book: { title: "Sample", author: "Author", year: 2000, work: "Sample" },
    family: "flow", predict: { question: "Which?", options: ["A", "B"], answer: 0 }, exploreHint: "Try both.",
    scenarios: [{ label: "Original", values: [10, 5] }, { label: "Faster", values: [10, 8] }],
    labels: ["One", "Two"], unit: "units", bookIdea: "Attributed idea.", modelBoundary: "Toy.", doesItHoldUp: "Unverified.",
  };
  assert.equal(validateBookIdeaSpec(idea).family, "flow");
  assert.throws(() => validateBookIdeaSpec({ ...idea, family: "eval" }), /unknown family/);
  assert.throws(() => validateBookIdeaSpec({ ...idea, scenarios: [idea.scenarios[0]] }), /exactly two/);
  assert.throws(() => validateBookIdeaSpec({ ...idea, scenarios: [idea.scenarios[0], idea.scenarios[0]] }), /labels must be distinct/);
  assert.throws(() => validateBookIdeaSpec({ ...idea, predict: { ...idea.predict, answer: 2 } }), /answer index/);
});
