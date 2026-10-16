import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { announceCase, describeScene, validateBookIdeaSpec } from "../../src/lib/books/model.ts";

const base = {
  book: { title: "Sample", author: "Author", year: 2000, work: "Sample" },
  predict: { question: "Which?", options: ["A", "B"], answer: 0 }, exploreHint: "Try both.",
  unit: "units", bookIdea: "Attributed idea.", modelBoundary: "Toy.", doesItHoldUp: "Unverified.",
};
const spec = (family, a, b, labels) => validateBookIdeaSpec({ ...base, family, labels,
  scenarios: [{ label: "First", values: a }, { label: "Second", values: b }] });

test("B2: neutral picture name is plain words, never the internal family key", () => {
  for (const family of ["flow", "payoff", "compound", "selection", "network", "feedback", "intervals"]) {
    const s = { ...spec("flow", [1, 2], [2, 2], ["P", "Q"]), family };
    assert.doesNotMatch(describeScene(s, null), new RegExp(`\\b${family}\\b`));
  }
  assert.equal(describeScene(spec("flow", [1, 2], [2, 2], ["P", "Q"]), null), "Toy model picture. Values appear when you choose case A or B.");
});
test("B2: each family restates the picture's own labels, inputs and computed outputs", () => {
  assert.equal(describeScene(spec("flow", [12, 9, 5], [12, 9, 11], ["Cut", "Sew", "Pack"]), 0),
    "Case A, First. Stations in order: Cut 12, Sew 9, Pack 5. Lowest: Pack at 5. Result: 5 units.");
  assert.equal(describeScene(spec("payoff", [25, 12, -4], [50, 12, -4], ["Win", "Lose"]), 0),
    "Case A, First. Win at 25%: 0.25 × 12 = 3. Lose at 75%: 0.75 × -4 = -3. Sum 3 + (-3). Result: 0 units.");
  assert.equal(describeScene(spec("compound", [100, 10, 2, 10], [100, 10, 3, 10], ["years"]), 0),
    "Case A, First. Start 100; years 2, each × (1 + 10/100) + 10: 100, 120, 142. Result: 142 units.");
  assert.equal(describeScene(spec("selection", [3, 50, 1, 100], [3, 50, 1, 50], ["Old", "New"]), 0),
    "Case A, First. Old: 1.5 of 3 at 50%. New: 1 of 1 at 100%. Together 2.5 of 4. Result: 62.5 units.");
  assert.equal(describeScene(spec("network", [100, 2, 3], [100, 2, 2], ["rounds"]), 1),
    "Case B, Second. From the origin, × 2 for 2 rounds: 7 pictured, 7 reached. Result: 7 units.");
  assert.equal(describeScene(spec("feedback", [10, 3, 1, 2], [10, 1, 3, 2], ["In", "Out", "days"]), 1),
    "Case B, Second. Level 10 to 6: In +1, Out −3, 2 days. Result: 6 units.");
  assert.equal(describeScene(spec("intervals", [60, 5, 2], [60, 15, 2], ["Work", "Overhead"]), 1),
    "Case B, Second. From 0 to 60: 3 × (2 Overhead + 15 Work). Result: 45 units.");
});
test("B3: the live text names the case that changed and keeps the unit", () => {
  const s = spec("flow", [1, 2], [2, 2], ["P", "Q"]);
  assert.equal(announceCase(s, null, [null, null]), "");
  assert.equal(announceCase(s, 1, [null, 20]), "Case B: 20 units");
  assert.equal(announceCase({ ...s, unit: "" }, 0, [1.234, null]), "Case A: 1.23");
});
test("B2: every shipped Books payload yields a complete description for both cases", () => {
  const root = path.resolve(import.meta.dirname, "../../src/demos/books");
  const slugs = fs.readdirSync(root).filter((d) => d.startsWith("bk-"));
  assert.ok(slugs.length >= 100);
  for (const slug of slugs) {
    const s = validateBookIdeaSpec(JSON.parse(fs.readFileSync(path.join(root, slug, "idea.json"), "utf8")));
    for (const i of [0, 1]) {
      const text = describeScene(s, i);
      assert.doesNotMatch(text, /undefined|NaN|\?|  /, `${slug} case ${i}: ${text}`);
      assert.ok(text.includes(s.scenarios[i].label), `${slug} case ${i} names its scenario`);
    }
  }
});
