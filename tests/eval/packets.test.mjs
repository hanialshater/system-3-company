import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { findForbidden, redactTranscript, copySide, checkPacket, checkPackets, BLIND_CSS, BLIND_MARKER } from "../../tools/eval/packets.mjs";

const TRANSCRIPT = `# Walkthrough: Two Said Blue

viewport: phone · choice: option 1 · recorded 2026-10-14T09:00:00.000Z

**Hook:** Two people say blue. 75s

## 1. Predict

Why trust this? (8/9 claims checked)

## 3. Reveal

> It reviews the evidence.

## Appendix: trust sheet (a learner sees this only if they tap “Why trust this?”)

\`\`\`
claim 1 verified
\`\`\`
`;

function tmp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "packets-"));
}
function capture(dir, { marker = { mode: "blind", hidden: ["status tag", "claim counter"], visibleTextCheck: "pass", viewport: "phone", choice: 1 }, transcript = "# Walkthrough: X\n\nviewport: phone · choice: option 1\n\n**Hook:** fine. 60s\n" } = {}) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "01-predict.png"), "png");
  fs.writeFileSync(path.join(dir, "sheet.png"), "png");
  fs.writeFileSync(path.join(dir, "transcript.md"), transcript);
  if (marker) fs.writeFileSync(path.join(dir, BLIND_MARKER), JSON.stringify(marker));
  return dir;
}

test("E1: finds the claim counter, trust link and status tag; leaves the duration tag and ordinary words", () => {
  const hits = findForbidden("Why trust this? (8/9 claims checked)\nIn review\nretired\n75s\nThe reveal reviews the claim that prices sort buyers.");
  assert.deepEqual([...new Set(hits.map((h) => h.what))].sort(), ["claim counter", "status tag", "trust link"]);
  assert.ok(hits.every((h) => h.line <= 3));
  assert.deepEqual(findForbidden("75s · 60s\nnot in reviewing mode\nfour of five claims hold"), []);
});

test("E1: transcript redaction drops the appendix, the timestamp and any counter line", () => {
  const { text, removed } = redactTranscript(TRANSCRIPT);
  assert.deepEqual(findForbidden(text), []);
  assert.doesNotMatch(text, /recorded/);
  assert.doesNotMatch(text, /Appendix/);
  assert.match(text, /75s/);
  assert.match(text, /It reviews the evidence/);
  assert.equal(removed.length, 1);
});

test("E1: blind CSS hides both elements and nothing else", () => {
  assert.match(BLIND_CSS, /\.tag\.status/);
  assert.match(BLIND_CSS, /trust-button/);
  assert.match(BLIND_CSS, /visibility: hidden/);
  assert.doesNotMatch(BLIND_CSS, /\.tag\s*[,{]/); // the duration tag (.tag without .status) stays
});

test("E1: copySide refuses a non-blind capture and builds a packet that passes the check", () => {
  const root = tmp();
  const good = capture(path.join(root, "cap-good"), { transcript: TRANSCRIPT });
  const raw = capture(path.join(root, "cap-raw"), { marker: null });
  assert.throws(() => copySide(raw, path.join(root, "x/A")), /not from a blind capture/);
  const pair = path.join(root, "run/pair-01");
  copySide(good, path.join(pair, "A"));
  copySide(good, path.join(pair, "B"));
  fs.writeFileSync(path.join(pair, "task.md"), "# Pairwise task\nJudge trust from what the card states.\n");
  const r = checkPacket(pair);
  assert.deepEqual(r.problems, []);
  assert.equal(r.sheets.length, 2);
  assert.equal(checkPackets(path.join(root, "run")).length, 1);
});

test("E1: the packet check fails on a counter or status tag in any text, or on unblanked images", () => {
  const root = tmp();
  const pair = path.join(root, "pair-01");
  capture(path.join(pair, "A"));
  capture(path.join(pair, "B"), { marker: null });
  fs.writeFileSync(path.join(pair, "task.md"), "The footer reads Why trust this? (4/5 claims checked).\n");
  fs.appendFileSync(path.join(pair, "A", "transcript.md"), "In review\n");
  fs.writeFileSync(path.join(pair, "verdict.json"), '{"reason":"its footer shows 4/5 claims checked"}'); // judge output is not packet input
  const r = checkPacket(pair);
  assert.equal(r.ok, false);
  const all = r.problems.join("\n");
  assert.match(all, /B\/no capture\.json/);
  assert.match(all, /task\.md:1: claim counter/);
  assert.match(all, /A\/transcript\.md:\d+: status tag/);
  assert.doesNotMatch(all, /verdict\.json/);
});

test("E1: a capture whose visible-text check failed, or that hid only one element, fails", () => {
  const root = tmp();
  const pair = path.join(root, "pair-01");
  capture(path.join(pair, "A"), { marker: { mode: "blind", hidden: ["status tag", "claim counter"], visibleTextCheck: "fail" } });
  capture(path.join(pair, "B"), { marker: { mode: "blind", hidden: ["status tag"], visibleTextCheck: "pass" } });
  const all = checkPacket(pair).problems.join("\n");
  assert.match(all, /A\/capture\.json: capture-time visible-text check did not pass/);
  assert.match(all, /B\/capture\.json: "claim counter" not hidden/);
});
