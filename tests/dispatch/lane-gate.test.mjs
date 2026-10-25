// Content-type lanes stop at 100% of their cycle budget (2026-10-25 restructuring,
// company/decisions/2026-10-25-founder-restructuring.md; tools/lib/ledger.mjs gate). Run: npm run test:dispatch
import { test } from "node:test";
import assert from "node:assert/strict";
import { gate } from "../../tools/lib/ledger.mjs";

const lane = (over = {}) => ({ id: "lane-x", kind: "lane", major: false, status: "active", budget: { tokens: 1000, countFrom: "2026-10-25", topUps: [] }, ...over });
const reg = (p) => ({ thresholds: { warnAt: 0.8 }, projects: [p] });
const spend = (n, ts = "2026-10-26T00:00:00Z") => [{ id: `L-${n}-${ts}`, project: "lane-x", tokens: n, ts, outcome: "done" }];

test("a lane under 80% passes; at 80% it warns; at 100% it fails", () => {
  assert.equal(gate(reg(lane()), "lane-x", { ledger: spend(100) }).level, "ok");
  assert.equal(gate(reg(lane()), "lane-x", { ledger: spend(850) }).level, "warn");
  const g = gate(reg(lane()), "lane-x", { ledger: spend(1000) });
  assert.equal(g.pass, false);
  assert.match(g.reasons[0], /lane stops/);
});

test("spend before countFrom is history; a top-up reopens the lane; no budget or a closed lane fails", () => {
  assert.equal(gate(reg(lane()), "lane-x", { ledger: spend(5000, "2026-10-20T00:00:00Z") }).pass, true);
  assert.equal(gate(reg(lane({ budget: { tokens: 1000, countFrom: "2026-10-25", topUps: [{ tokens: 1000 }] } })), "lane-x", { ledger: spend(1500) }).pass, true);
  assert.equal(gate(reg(lane({ budget: { tokens: null } })), "lane-x", { ledger: [] }).pass, false);
  assert.equal(gate(reg(lane({ status: "paused" })), "lane-x", { ledger: [] }).pass, false);
});
