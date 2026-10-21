import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-text-"));
process.env.META_LIVE_DIR = LIVE;
const { runTextChecks } = await import("../state.mjs");
const write = (task, text) => { fs.mkdirSync(path.join(LIVE, "work", task), { recursive: true }); fs.writeFileSync(path.join(LIVE, "work", task, "page.md"), text); };
const C = { titleLine: true, minWords: 20, maxWords: 80, mustInclude: ["Pip"], banned: ["scary"], minReadingEase: 70 };

test("text checks: a good page passes; each rule names its failure", () => {
  write("P1", "# Pip and the Moon\n\nPip the fox saw the moon. It was big and round. Pip ran up the hill to see it close. The wind was soft. The grass was cool. Pip sat down and smiled at the moon.\n");
  assert.deepEqual(runTextChecks("P1", C).pass, true);
  write("P2", "Pip saw a scary moon.\n");
  const r = runTextChecks("P2", C);
  assert.equal(r.pass, false);
  assert.match(r.output, /first line is not a '# Title'/);
  assert.match(r.output, /words < 20/);
  assert.match(r.output, /banned word scary/);
  write("P3", "# Title\n\nNotwithstanding considerable meteorological uncertainty, the protagonist contemplated extraordinarily complicated astronomical phenomena, deliberating interminably regarding celestial configurations and their philosophical implications for contemporary civilization.\n");
  assert.match(runTextChecks("P3", { minReadingEase: 70, mustInclude: ["Pip"] }).output, /reading ease .* < 70.*|does not mention Pip/);
  assert.match(runTextChecks("NOPE", C).output, /missing/);
});

test("text checks: mustInclude is literal text (markdown markers and headings work)", async () => {
  const { runTextChecks, LIVE } = await import("../state.mjs");
  const fs = await import("node:fs"); const path = await import("node:path");
  const d = path.join(LIVE, "work", "QZ"); fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, "page.md"), "# Round 1: Planets\n\n## Format\n**Q1.** Which?\n**Answer:** Mars\n**Why:** Red.\n");
  assert.equal(runTextChecks("QZ", { mustInclude: ["**Q1.**", "## Format", "**Answer:**", "Mars"] }).pass, true);
  const r = runTextChecks("QZ", { mustInclude: ["**Q4.**", "Mar"] });
  assert.match(r.output, /does not mention \*\*Q4\.\*\*; does not mention Mar$/);
});

test("text checks: lineMaxWords limits the lines that start with a prefix", async () => {
  const { runTextChecks, LIVE } = await import("../state.mjs");
  const fs = await import("node:fs"); const path = await import("node:path");
  const d = path.join(LIVE, "work", "QW"); fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, "page.md"), "# Round 1: Sun\n**Why:** one two three.\n**Why:** one two three four five six.\n");
  const r = runTextChecks("QW", { lineMaxWords: [{ prefix: "**Why:**", maxWords: 5 }] });
  assert.equal(r.pass, false);
  assert.match(r.output, /^line 3 \(\*\*Why:\*\*\) has 6 words > 5$/);
});

test("text checks: allowedLines rejects a line outside the decided kinds", async () => {
  const { runTextChecks, LIVE, mergeChecks } = await import("../state.mjs");
  const fs = await import("node:fs"); const path = await import("node:path");
  const d = path.join(LIVE, "work", "QL"); fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, "page.md"), "# Round 3: Shells\n\nAll four animals have no backbone. Can you name them?\n**Q1.** What?\n**Answer:** A crab\n**Why:** Shells.\n");
  const r = runTextChecks("QL", { allowedLines: ["# ", "**Q", "**Answer:**", "**Why:**"] });
  assert.equal(r.pass, false); assert.match(r.output, /^line 3 is not an allowed kind of line/);
  assert.deepEqual(mergeChecks({ allowedLines: ["# ", "**Q", "> "] }, { allowedLines: ["# ", "**Q"] }).allowedLines, ["# ", "**Q"]);
});

test("benchmark 3 fixes: bold label tail is not a word; a common answer is no giveaway; a split section ends at a heading", () => {
  write("QB", "# Round 1: Sun\n**Q1.** one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen?\n");
  assert.equal(runTextChecks("QB", { lineMaxWords: [{ prefix: "**Q", maxWords: 16 }] }).pass, true);
  const round = (n, q1, a1, q2, a2) => `# Round ${n}: Topic ${n}\n**Q1.** ${q1}\n**Answer:** ${a1}\n**Why:** It is so.\n**Q2.** ${q2}\n**Answer:** ${a2}\n**Why:** It is so.\n`;
  const pack = (tail) => [
    round(1, "What star lights our sky?", "The Sun", "Which planet is red?", "Mars"),
    round(2, "Which planet is hottest?", "Venus", "What warms Venus, the Sun or Mars?", "Its air"),
    round(3, "Which planet has rings?", "Saturn", "Does the Sun shine on Saturn?", "Yes"),
    round(4, "What do planets circle around?", "Ceres belt", "Which dwarf world is Pluto's friend?", "Eris"),
    round(5, "Which ice world circles the Sun far out?", "Pluto", "Which way does a comet tail point, toward or away from the Sun?", "The Sun"),
  ].join("\n") + tail;
  const checks = { distinctAnswers: { prefix: "**Answer:**", split: "^# Round \\d+:" } };
  write("PK1", pack(""));
  const r1 = runTextChecks("PK1", checks);
  assert.doesNotMatch(r1.output, /gives away.*"sun"|answer "sun" is named/i);
  assert.match(r1.output, /answer "sun" is in both/i); // a repeated answer is still a repeat
  write("PK2", pack("\n## Changes\n- Round 4: kept the dwarf world answer Eris as is.\n"));
  assert.doesNotMatch(runTextChecks("PK2", checks).output, /gives away Round 4's answer "eris"/i);
});
