import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// K15 (plan 2026-10-21 §M5): AMD-015's scoped pre-approval as data. `approvals.standing:[{action:"flag-off-withdrawal",
// role:"release-manager", trigger:"privacy|child-safety", record:"AMD-015"}]` covers exactly that action, by that
// role, on one of those triggers, and nothing else. Not exercised in any run: a test only, with no deploy anywhere.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k15-"));
process.env.META_LIVE_DIR = LIVE;
const { make } = await import("../state.mjs");
const { standingCovers, standingProblems, STANDING_ACTIONS } = await import("../lib.mjs");
const { builtinSpec, validateSpec } = await import("../generator.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);

const AMD015 = { action: "flag-off-withdrawal", role: "release-manager", trigger: "privacy|child-safety", record: "AMD-015" };
const spec = (standing = [AMD015]) => {
  const s = builtinSpec("toy");
  s.roles.push({ id: "release-manager", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] });
  s.approvals = { standing };
  return s;
};

test("K15: the standing approval covers the flag-off withdrawal by release-manager on privacy or child-safety, nothing else", () => {
  const co = make("k15", spec());
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  assert.deepEqual(co.engine.standing, [AMD015], "from the spec, kept with the state");
  const covers = (q) => co.engine.standingFor(q);
  assert.equal(covers({ action: "flag-off-withdrawal", role: "release-manager", trigger: "privacy" })?.record, "AMD-015");
  assert.equal(covers({ action: "flag-off-withdrawal", role: "release-manager", trigger: "child-safety" })?.record, "AMD-015");
  for (const q of [
    { action: "flag-off-withdrawal", role: "toy-release", trigger: "privacy" }, // another role, even of the same level
    { action: "flag-off-withdrawal", role: "cos", trigger: "privacy" },
    { action: "flag-off-withdrawal", role: "founder", trigger: "child-safety" },
    { action: "deploy", role: "release-manager", trigger: "privacy" }, // a plain deploy
    { action: "release", role: "release-manager", trigger: "privacy" },
    { action: "flag-on", role: "release-manager", trigger: "privacy" }, // another action
    { action: "flag-off-withdrawal", role: "release-manager", trigger: "outage" }, // another trigger
    { action: "flag-off-withdrawal", role: "release-manager", trigger: "privacy|child-safety" }, // the list is not a trigger
    { action: "flag-off-withdrawal", role: "release-manager", trigger: "priv" },
    { action: "flag-off-withdrawal", role: "release-manager", trigger: "" },
    { action: "flag-off-withdrawal", role: "release-manager" },
  ]) assert.equal(covers(q), null, JSON.stringify(q));
  // a spec without standing approvals covers nothing; the founder's words still decide every approval kind
  assert.equal(make("k15b", builtinSpec("toy")).engine.standingFor({ action: "flag-off-withdrawal", role: "release-manager", trigger: "privacy" }), null);
  assert.equal(standingCovers(undefined, { action: "flag-off-withdrawal", role: "release-manager", trigger: "privacy" }), null);
});

test("K15: validateSpec checks the shape: the one pre-approved action, an active agent role, kebab triggers, an AMD record", () => {
  assert.deepEqual(validateSpec(spec()), []);
  assert.deepEqual(STANDING_ACTIONS, ["flag-off-withdrawal"]);
  const bad = (standing, re) => assert.match(validateSpec(spec(standing)).join("\n"), re, JSON.stringify(standing));
  bad([{ ...AMD015, action: "deploy" }], /action deploy is not one the constitution pre-approves/);
  bad([{ ...AMD015, role: "nobody" }], /role nobody is not an active agent role/);
  bad([{ ...AMD015, role: "founder" }], /role founder is not an active agent role/);
  bad([{ ...AMD015, trigger: "Privacy, child safety" }], /trigger is kebab-case/);
  bad([{ ...AMD015, record: "the founder said so" }], /record is the ratified amendment/);
  bad([{ ...AMD015, scope: "all" }], /unknown key scope/);
  bad([{ action: "flag-off-withdrawal" }], /needs role, trigger, record/);
  bad("AMD-015", /approvals.standing is a list/);
  const s = spec(); s.approvals = { standing: [AMD015], other: [] };
  assert.match(validateSpec(s).join("\n"), /approvals has unknown key other/);
  assert.deepEqual(standingProblems(null), []);
  // (that the company's lesson spec, with AMD-015 added, still validates is adapters/s3c/tests/spec.test.mjs's: the
  // company's specs stay in the company tree, out of the exported kernel)
});

test("M5 review: a standing entry wider than AMD-015 fails validation and is never honored (another role, trigger or record)", () => {
  const wide = [
    [{ action: "flag-off-withdrawal", role: "toy-builder-1", trigger: "outage|any-reason", record: "AMD-999" }, /trigger outage, any-reason is not one AMD-015 names[\s\S]*record AMD-999 grants no standing approval[\s\S]*pre-approves the flag-off withdrawal for release-manager only/],
    [{ action: "flag-off-withdrawal", role: "mgr-live", trigger: "anything|budget-overrun|deploy", record: "AMD-999" }, /release-manager only/],
    [{ ...AMD015, trigger: "privacy|outage" }, /trigger outage is not one AMD-015 names/],
    [{ ...AMD015, record: "AMD-016" }, /record AMD-016 grants no standing approval/],
  ];
  for (const [e, re] of wide) {
    assert.match(validateSpec(spec([e])).join("\n"), re, JSON.stringify(e));
    assert.match(standingProblems([e]).join("\n"), re, "without the roles too");
    const t = e.trigger.split("|")[0];
    assert.equal(standingCovers([e], { action: "flag-off-withdrawal", role: e.role, trigger: t }), null, `not honored: ${JSON.stringify(e)}`);
  }
  // the engine, given a wide list in its spec anyway (validateSpec is not run on make), honors nothing outside the grant
  const s = builtinSpec("toy"); s.approvals = { standing: [wide[0][0], { ...AMD015, trigger: "privacy|outage" }] };
  const co = make("k15x", s);
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  assert.equal(co.engine.standingFor({ action: "flag-off-withdrawal", role: "toy-builder-1", trigger: "outage" }), null);
  assert.equal(co.engine.standingFor({ action: "flag-off-withdrawal", role: "release-manager", trigger: "outage" }), null);
  // the narrower grant (one of its two triggers) still validates and covers that trigger only
  const one = { ...AMD015, trigger: "privacy" };
  assert.deepEqual(validateSpec(spec([one])), []);
  assert.equal(standingCovers([one], { action: "flag-off-withdrawal", role: "release-manager", trigger: "privacy" }), one);
  assert.equal(standingCovers([one], { action: "flag-off-withdrawal", role: "release-manager", trigger: "child-safety" }), null);
});
