// HQ release log: the file is valid, versions are sequential r1, r2, ..., the next version is computed, the draft tool runs.
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { validateReleases, nextVersion, newestFirst, commitUrl, shortDate, VERSION_RE } from "../../src/lib/hq-releases.ts";
import { loadReleases, loadUnreleased } from "../../src/lib/hq-releases-server.ts";

const file = JSON.parse(fs.readFileSync("company/ops/releases.json", "utf8"));
const grp = { count: 0, slugs: [] };
const mk = (version, date) => ({ version, date, commit: "a".repeat(40), target: "production", approved_by: { who: "founder", record: "x" }, summary: "s", added: { features: [], lessons: { published: grp, in_review: grp }, fixes: [], known_issues: [] } });

test("company/ops/releases.json is valid and runs r1..r10 with the five backfilled releases first", () => {
  assert.equal(validateReleases(file), null);
  assert.equal(file.owner, "release-manager");
  assert.deepEqual(file.releases.slice(0, 5).map((r) => r.version), ["r1", "r2", "r3", "r4", "r5"]);
  assert.deepEqual(file.releases.map((r) => r.version), ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10"]);
  assert.equal(file.releases[5].date.slice(0, 10), "2026-10-15");
  assert.deepEqual(file.releases.slice(0, 5).map((r) => r.commit.slice(0, 7)), ["f868127", "6b45ea0", "91274b8", "f4537d7", "5e8608d"]);
});

test("every release through r8 is a [deploy] commit in git history; later ones exist in history (F-48: the marker no longer deploys)", { skip: !fs.existsSync(".git") }, () => {
  for (const r of file.releases) {
    if (Number(r.version.slice(1)) > 8) {
      execFileSync("git", ["cat-file", "-e", `${r.commit}^{commit}`]);
      continue;
    }
    const msg = execFileSync("git", ["show", "-s", "--format=%B", r.commit], { encoding: "utf8" });
    // f868127 introduced the [deploy] filter and quotes it in its own subject; all five carry the marker.
    assert.match(msg, /\[deploy\]/, r.commit);
  }
});

test("validator rejects bad entries", () => {
  const ok = [mk("r1", "2026-10-14T10:00:00Z")];
  assert.equal(validateReleases({ releases: ok }), null);
  assert.equal(validateReleases({ releases: [...ok, mk("r2", "2026-10-14T10:00:00Z")] }), null);
  const bad = (r, re) => assert.match(validateReleases({ releases: r }), re);
  for (const v of ["2026.10.14.1", "r0", "r01", "R1", "r", "r1.2", "r-1", "v1", "1"]) bad([mk(v, "2026-10-14T10:00:00Z")], /not r<positive integer>/);
  bad([mk("r2", "2026-10-14T10:00:00Z")], /gap/);
  bad([...ok, mk("r3", "2026-10-14T11:00:00Z")], /gap/);
  bad([...ok, mk("r1", "2026-10-14T11:00:00Z")], /duplicate/);
  bad([...ok, mk("r3", "2026-10-14T11:00:00Z"), mk("r2", "2026-10-14T12:00:00Z")], /gap/); // out of order
  bad([...ok, mk("r2", "2026-10-13T10:00:00Z")], /date order/);
  bad([{ ...ok[0], date: "2026-10-14T10:00:00+02:00" }], /UTC/);
  bad([{ ...ok[0], commit: "f868127" }], /40-character/);
  bad([{ ...ok[0], target: "preview" }], /production/);
  bad([{ ...ok[0], approved_by: { who: "founder" } }], /approved_by/);
  bad([{ ...ok[0], added: { ...ok[0].added, lessons: { published: { count: 2, slugs: ["a"] }, in_review: grp } } }], /count must equal/);
  assert.match(validateReleases({}), /array/);
});

test("nextVersion is r(max+1), whatever the date", () => {
  assert.equal(nextVersion([{ version: "r1" }, { version: "r2" }]), "r3");
  assert.equal(nextVersion([{ version: "r9" }]), "r10");
  assert.equal(nextVersion([{ version: "r2" }, { version: "r11" }, { version: "r3" }]), "r12");
  assert.equal(nextVersion([]), "r1");
  assert.equal(nextVersion(file.releases), "r11");
  assert.ok(VERSION_RE.test("r12"));
  assert.ok(!VERSION_RE.test("2026.10.14.12"));
});

test("shortDate shows the UTC day", () => {
  assert.equal(shortDate("2026-10-15T23:30:00Z"), "15 Oct 2026");
  assert.equal(shortDate("2026-01-02T00:00:00Z"), "2 Jan 2026");
});

test("newest first does not mutate; commit links point at the commit", () => {
  const a = [mk("r1", "2026-10-14T10:00:00Z"), mk("r2", "2026-10-14T11:00:00Z")];
  assert.deepEqual(newestFirst(a).map((r) => r.version), ["r2", "r1"]);
  assert.equal(a[0].version, "r1");
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
  assert.equal(out.version, "r11");
  assert.match(out.approved_by.who, /TODO/);
  assert.equal(out.added.lessons.in_review.count, 54);
  assert.equal(fs.readFileSync("company/ops/releases.json", "utf8"), before);
});
