// HQ release log: the file is valid, versions follow YYYY.MM.DD.n, the next version is computed, the draft tool runs.
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { validateReleases, nextVersion, newestFirst, commitUrl, VERSION_RE } from "../../src/lib/hq-releases.ts";
import { loadReleases, loadUnreleased } from "../../src/lib/hq-releases-server.ts";

const file = JSON.parse(fs.readFileSync("company/ops/releases.json", "utf8"));
const grp = { count: 0, slugs: [] };
const mk = (version, date) => ({ version, date, commit: "a".repeat(40), target: "production", approved_by: { who: "founder", record: "x" }, summary: "s", added: { features: [], lessons: { published: grp, in_review: grp }, fixes: [], known_issues: [] } });

test("company/ops/releases.json is valid and has the five backfilled releases", () => {
  assert.equal(validateReleases(file), null);
  assert.equal(file.owner, "release-manager");
  assert.deepEqual(file.releases.map((r) => r.version), ["2026.10.14.1", "2026.10.14.2", "2026.10.14.3", "2026.10.14.4", "2026.10.14.5"]);
  assert.deepEqual(file.releases.map((r) => r.commit.slice(0, 7)), ["f868127", "6b45ea0", "91274b8", "f4537d7", "5e8608d"]);
});

test("every backfilled commit is a [deploy] commit in git history", { skip: !fs.existsSync(".git") }, () => {
  for (const r of file.releases) {
    const msg = execFileSync("git", ["show", "-s", "--format=%B", r.commit], { encoding: "utf8" });
    // f868127 introduced the [deploy] filter and quotes it in its own subject; all five carry the marker.
    assert.match(msg, /\[deploy\]/, r.commit);
  }
});

test("validator rejects bad entries", () => {
  const ok = [mk("2026.10.14.1", "2026-10-14T10:00:00Z")];
  assert.equal(validateReleases({ releases: ok }), null);
  const bad = (r, re) => assert.match(validateReleases({ releases: r }), re);
  bad([mk("2026-10-14.1", "2026-10-14T10:00:00Z")], /not YYYY\.MM\.DD\.n/);
  bad([mk("2026.10.14.0", "2026-10-14T10:00:00Z")], /not YYYY/);
  bad([mk("2026.10.15.1", "2026-10-14T10:00:00Z")], /does not match date/);
  bad([mk("2026.10.14.1", "2026-10-14T10:00:00+02:00")], /UTC/);
  bad([...ok, mk("2026.10.14.1", "2026-10-14T11:00:00Z")], /duplicate/);
  bad([mk("2026.10.14.2", "2026-10-14T11:00:00Z"), mk("2026.10.14.1", "2026-10-14T10:00:00Z")], /date order/);
  bad([{ ...ok[0], commit: "f868127" }], /40-character/);
  bad([{ ...ok[0], target: "preview" }], /production/);
  bad([{ ...ok[0], approved_by: { who: "founder" } }], /approved_by/);
  bad([{ ...ok[0], added: { ...ok[0].added, lessons: { published: { count: 2, slugs: ["a"] }, in_review: grp } } }], /count must equal/);
  assert.match(validateReleases({}), /array/);
});

test("nextVersion counts releases within the UTC day", () => {
  const rs = [{ version: "2026.10.14.1" }, { version: "2026.10.14.2" }];
  assert.equal(nextVersion(rs, new Date("2026-10-14T23:59:00Z")), "2026.10.14.3");
  assert.equal(nextVersion(rs, new Date("2026-10-15T00:00:01Z")), "2026.10.15.1");
  assert.equal(nextVersion(rs, new Date("2026-10-15T01:30:00+02:00")), "2026.10.14.3"); // UTC day is still the 14th
  assert.equal(nextVersion([], new Date("2026-01-02T00:00:00Z")), "2026.01.02.1");
  assert.ok(VERSION_RE.test("2026.10.14.12"));
});

test("newest first does not mutate; commit links point at the commit", () => {
  const a = [mk("2026.10.14.1", "2026-10-14T10:00:00Z"), mk("2026.10.14.2", "2026-10-14T11:00:00Z")];
  assert.deepEqual(newestFirst(a).map((r) => r.version), ["2026.10.14.2", "2026.10.14.1"]);
  assert.equal(a[0].version, "2026.10.14.1");
  assert.ok(commitUrl("abc").endsWith("/commit/abc"));
});

test("loadReleases reads the real file and reports a broken one instead of throwing", () => {
  assert.equal(loadReleases().error, null);
  const r = loadReleases("/nonexistent-root");
  assert.deepEqual(r.releases, []);
  assert.match(r.error, /could not be read/);
});

test("unreleased commits are computed from the last release commit", { skip: !fs.existsSync(".git") }, () => {
  const u = loadUnreleased(loadReleases().releases);
  assert.equal(u.error, undefined);
  assert.equal(u.base, file.releases.at(-1).commit);
  assert.ok(u.commits.every((c) => c.hash.length === 40 && c.subject));
  assert.ok(!u.commits.some((c) => c.hash === u.base));
  const bad = loadUnreleased(loadReleases().releases, "/nonexistent-root");
  assert.deepEqual(bad.commits, []);
  assert.ok(bad.error);
});

test("release-draft tool prints a draft with TODO approval and writes nothing", { skip: !fs.existsSync(".git") }, () => {
  const before = fs.readFileSync("company/ops/releases.json", "utf8");
  const out = JSON.parse(execFileSync("node", ["tools/release-draft.mjs", "--commit=f4537d7", "--since=91274b8"], { encoding: "utf8" }));
  assert.equal(out.version, "2026.10.14.6");
  assert.match(out.approved_by.who, /TODO/);
  assert.equal(out.added.lessons.in_review.count, 54);
  assert.equal(fs.readFileSync("company/ops/releases.json", "utf8"), before);
});
