// Shipped Books payloads (PR #5 review F2/M2, company/engineering/reviews/2026-10-16-pr5-engineering-review.md).
// validateBookIdeaSpec throws during render and nothing on the lesson path catches it, while an
// idea.json edit is tier 0. This test runs every shipped src/demos/books/bk-*/idea.json through the
// real model code, so a bad payload fails `npm run test:books` (and verify) instead of a page.
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { calculateModel, formatBookValue, validateBookIdeaSpec } from "../../src/lib/books/model.ts";

const booksDir = fileURLToPath(new URL("../../src/demos/books/", import.meta.url));
const slugs = readdirSync(booksDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name.startsWith("bk-"))
  .map((entry) => entry.name)
  .sort();

// Diagram labels each family's picture reads (src/components/books/BookIdeaLesson.tsx, CausalPicture:
// label(i) falls back to "" so a missing label renders blank; a surplus label is never shown).
// The validator only enforces the flow count (src/lib/books/model.ts validateBookIdeaSpec).
const LABELS_NEEDED = {
  flow: (spec) => spec.scenarios[0].values.length, // one per station
  payoff: () => 2, // the two outcome branches
  compound: () => 1, // the step-count caption
  selection: () => 2, // the two groups
  network: () => 1, // the rounds caption
  feedback: () => 3, // inflow, outflow, step caption
  intervals: () => 2, // work and overhead legend
};

/** First number in an option, accepting U+2212 minus and thousands commas; dp = decimals shown. */
function optionNumber(option) {
  const match = option.replace(/−/g, "-").replace(/,/g, "").match(/[-+]?\d+(?:\.(\d+))?/);
  return match ? { value: Number(match[0]), dp: match[1]?.length ?? 0 } : null;
}
/** An option names an output if it equals the output rounded to the option's own precision. */
const names = (parsed, output) => Math.abs(output - parsed.value) <= 0.5 * 10 ** -parsed.dp + 1e-9;
/** The number the stage shows for an output (formatBookValue: at most two decimals). */
const shown = (output) => Number(formatBookValue(output).replace(/,/g, ""));
const same = (a, b) => Math.abs(a - b) <= 1e-9;

test("every Books lesson directory ships an idea.json", () => {
  assert.ok(slugs.length > 0, "no src/demos/books/bk-* directories found");
  const missing = slugs.filter((slug) => !existsSync(join(booksDir, slug, "idea.json")));
  assert.deepEqual(missing, [], "bk-* lessons without idea.json");
});

for (const slug of slugs) {
  const file = join(booksDir, slug, "idea.json");
  if (!existsSync(file)) continue;
  test(`${slug}: payload validates, labels match family, answer matches a computed output`, async (t) => {
    const spec = JSON.parse(readFileSync(file, "utf8"));
    let valid;
    await t.test("passes validateBookIdeaSpec", () => {
      valid = validateBookIdeaSpec(spec);
    });
    if (!valid) return;

    await t.test(`label count fits family ${valid.family}`, () => {
      const needed = LABELS_NEEDED[valid.family](valid);
      assert.equal(valid.labels.length, needed, `${valid.family} needs ${needed} labels, has ${valid.labels.length}`);
    });

    await t.test("correct prediction option equals a computed scenario output", () => {
      const outputs = valid.scenarios.map((scenario) => calculateModel(valid.family, scenario.values).output);
      const option = valid.predict.options[valid.predict.answer];
      const parsed = optionNumber(option);
      assert.ok(parsed, `answer option "${option}" has no number`);
      const matched = outputs.filter((output) => names(parsed, output));
      assert.ok(matched.length > 0, `answer option "${option}" matches neither output (A ${outputs[0]}, B ${outputs[1]})`);
      // No distractor may be indistinguishable from the correct value as a learner sees it: the same
      // number as the correct option, or the same number the stage displays for the matched output.
      // Rounding the output to the distractor's own precision is too loose (W-1508): "2 units" would
      // then name a stage readout of "2.44", which a learner reads as a different number.
      const ambiguous = valid.predict.options.filter((other, i) => {
        if (i === valid.predict.answer) return false;
        const p = optionNumber(other);
        return p !== null && (same(p.value, parsed.value) || matched.some((output) => same(p.value, shown(output))));
      });
      assert.deepEqual(ambiguous, [], `distractors equal the answer "${option}" or its stage readout ${formatBookValue(matched[0])}`);
    });
  });
}
