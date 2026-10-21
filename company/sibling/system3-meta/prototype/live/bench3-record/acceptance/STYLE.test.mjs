import { test } from "node:test"; import assert from "node:assert/strict"; import { style } from "./rubric.mjs";
test("STYLE meets the rubric", () => { const s = style(); assert.ok(!s.missing, "missing"); assert.ok(s.format, "## Format"); assert.equal(s.rounds, 5, "5 round lines under ## Rounds"); });
