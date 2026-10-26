// Lesson frames pilot gate (C1; company/engineering/reviews/2026-10-25-content-hub-production-review.md, "Publication
// keeps the editorial gates"). In npm run verify, which tools/deploy.mjs runs before every deploy. A learner is served
// frame code only for a source tree that is published now and unchanged since its artifact was built.
// Fix a failure with `node tools/lesson-frames.mjs prune` (the lesson renders in-app) or a rebuild; never by editing here.
// Scope (O1, company/decisions/2026-10-26-lesson-frames-gate-scope.md): freshness blocks flag-on builds, at the build.
import assert from "node:assert/strict";
import test from "node:test";
import { ALLOWED_ORIGIN, FRESHNESS_RULES, HEX64, blocking, clientFrames, clientSlugs, flagOnBuildRefusal, framesOn, pilotSlugs, problems, pruneManifest, readManifest, treeHash } from "../../tools/lib/lesson-frames.mjs";

import fs from "node:fs";

// The committed manifest: what this build ships. It may be empty: after a stale-kit prune every entry is dropped
// (W-2105), and that state must pass this suite with the flag off and on (W2-C1). So no test below takes its entry
// from it; the mutation tests use the fixture instead.
const m = readManifest();
// The fixture: a frozen copy of the manifest as built on 2026-10-26 (tests/lesson-frames/fixture.manifest.json), with
// every hash re-read from today's tree and every entry that is no longer publishable removed, so the tests do not
// depend on how far main has moved since. Regenerate it only from a fresh build (node tools/lesson-frames.mjs build).
const FIXTURE = JSON.parse(fs.readFileSync(new URL("./fixture.manifest.json", import.meta.url), "utf8"));
const fresh = () => {
  const x = structuredClone(FIXTURE);
  x.kit.sourceHash = treeHash(x.kit.sources);
  x.kit.geoSourceHash = treeHash(x.kit.geoSources);
  for (const e of Object.values(x.lessons)) e.sourceHash = treeHash(e.sources);
  for (const s of new Set(problems(x).filter((p) => p.slug).map((p) => p.slug))) delete x.lessons[s];
  return x;
};
const clone = fresh;
const any = Object.keys(fresh().lessons)[0];
const rules = (ps) => ps.map((p) => `${p.slug ?? "-"}:${p.rule}`);

// O1 (company/decisions/2026-10-26-lesson-frames-gate-scope.md): with the flag off, the freshness rules (stale,
// stale-kit, published, fallback) are reported, not failed: a flag-off build serves no frame. The flag-on build itself
// refuses any problem (next.config.mjs). Structural rules fail here always.
const show = (ps) => ps.map((p) => `${p.slug ?? "(manifest)"}: ${p.rule}: ${p.detail}`).join("\n");
test("the committed manifest meets every rule that blocks this build (structural always; freshness with the flag on)", (t) => {
  const ps = problems(m);
  const block = blocking(ps, { on: framesOn() });
  const notice = ps.filter((p) => !block.includes(p));
  if (notice.length) t.diagnostic(`flag off: ${notice.length} freshness problem(s), not blocking; a flag-on build refuses them:\n${show(notice)}`);
  assert.deepEqual(block, [], show(block));
});

test("O1 scoping: freshness blocks only with the flag on; structural rules block either way", () => {
  const x = clone();
  x.lessons[any].sourceHash = "0".repeat(64);
  x.kit.sourceHash = "0".repeat(64);
  x.lessons[any].frameDoc = "../../evil";
  const ps = problems(x);
  const off = blocking(ps, { on: false }).map((p) => p.rule);
  const on = blocking(ps, { on: true }).map((p) => p.rule);
  assert.ok(on.includes("stale") && on.includes("stale-kit") && on.includes("hash"));
  assert.ok(!off.includes("stale") && !off.includes("stale-kit"), "a stale manifest must not fail a flag-off deploy");
  assert.ok(off.includes("hash"), "a malformed manifest fails whatever the flag");
  assert.deepEqual([...FRESHNESS_RULES].sort(), ["fallback", "published", "stale", "stale-kit"]);
});

test("O1 scoping: the flag-on build refusal reads the same rules, and only the exact flag value turns it on", () => {
  assert.equal(framesOn({ NEXT_PUBLIC_LESSON_FRAMES: "pilot-50" }), true);
  for (const v of [undefined, "", "off", "1", "true", "PILOT-50", "pilot-50 "]) assert.equal(framesOn({ NEXT_PUBLIC_LESSON_FRAMES: v }), false, String(v));
  assert.equal(flagOnBuildRefusal({ env: {} }), null, "flag off: the build never refuses on the manifest");
  const r = flagOnBuildRefusal({ env: { NEXT_PUBLIC_LESSON_FRAMES: "pilot-50" } });
  assert.equal(r === null, problems(m).length === 0, r ?? "");
});

test("it names the allow-listed origin and only pilot slugs", () => {
  assert.equal(m.origin, ALLOWED_ORIGIN);
  const pilot = new Set(pilotSlugs());
  for (const s of Object.keys(m.lessons)) assert.ok(pilot.has(s), s);
  assert.ok(Object.keys(m.lessons).length <= 50);
});

test("the toolchain is recorded (a later bundler switch shows up as a toolchain change)", () => {
  for (const k of ["buildMjs", "tooling", "packageLock"]) assert.match(m.toolchain[k], HEX64);
  assert.match(m.toolchain.next, /^\d+\.\d+\.\d+/);
});

// The rules bite: each mutation below must be caught.
test("the fixture still has entries, with and without the geo kit (so the mutation tests below test something)", () => {
  const x = fresh();
  assert.ok(any, "no fixture entry is publishable today: rebuild and refresh tests/lesson-frames/fixture.manifest.json");
  assert.ok(Object.values(x.lessons).some((e) => e.geoKit !== null));
  assert.ok(Object.values(x.lessons).some((e) => e.geoKit === null));
  assert.deepEqual(problems(x).filter((p) => p.rule !== "client"), [], "a fresh fixture meets every rule");
});
test("a stale source is caught", () => {
  const x = clone();
  x.lessons[any].sourceHash = "0".repeat(64);
  assert.ok(rules(problems(x)).includes(`${any}:stale`));
});
test("a stale kit is caught", () => {
  const x = clone();
  x.kit.sourceHash = "0".repeat(64);
  assert.ok(rules(problems(x)).includes("-:stale-kit"));
});
// W-2105: after a kit change, prune used to say "nothing to drop" while a flag-on build still refused the manifest.
// fresh(): the committed manifest with every hash re-read from today's tree and every unpublishable entry removed, so
// these tests do not depend on how far main has moved since the artifacts were built. Outside the two projections
// (which prune rewrites on disk), a pruned manifest must have no problem at all, so a flag-on build accepts it.
const unprojected = (ps) => ps.filter((p) => p.rule !== "client");
test("prune with a stale kit drops every entry, and the pruned manifest passes a flag-on build's rules", () => {
  const x = fresh();
  assert.ok(Object.keys(x.lessons).length > 0);
  x.kit.sourceHash = "0".repeat(64);
  assert.ok(rules(problems(x)).includes("-:stale-kit"));
  const r = pruneManifest(x);
  assert.equal(r.kitStale, true);
  assert.deepEqual(r.dropped.map((d) => d.slug).sort(), Object.keys(x.lessons).sort());
  assert.ok(r.dropped.every((d) => d.rules.includes("stale-kit")));
  assert.deepEqual(Object.keys(r.manifest.lessons), []);
  assert.deepEqual(unprojected(problems(r.manifest)), [], "an empty manifest with a stale kit serves nothing and must not refuse");
  assert.deepEqual(clientSlugs(r.manifest).slugs, []);
  assert.deepEqual(clientFrames(r.manifest).frames, {});
  assert.ok(Object.keys(x.lessons).length > 0, "prune does not mutate its input");
});
test("prune with a stale geo kit drops only the entries that use it", () => {
  const x = fresh();
  x.kit.geoSourceHash = "0".repeat(64);
  const geo = Object.keys(x.lessons).filter((s) => x.lessons[s].geoKit !== null);
  const r = pruneManifest(x);
  assert.equal(r.kitStale, false);
  assert.deepEqual(r.dropped.map((d) => d.slug).sort(), geo.sort());
  assert.deepEqual(unprojected(problems(r.manifest)), []);
});
test("prune of a fresh manifest drops nothing; one stale lesson drops only that lesson", () => {
  const x = fresh();
  assert.deepEqual(pruneManifest(x).dropped, []);
  const one = Object.keys(x.lessons)[0];
  x.lessons[one].sourceHash = "0".repeat(64);
  const r = pruneManifest(x);
  assert.deepEqual(r.dropped, [{ slug: one, rules: ["stale"] }]);
  assert.deepEqual(unprojected(problems(r.manifest)), []);
});
test("a source file that disappears makes the slug stale", () => {
  const x = clone();
  x.lessons[any].sources = [...x.lessons[any].sources, "src/demos/__gone__/nothing.tsx"];
  assert.ok(rules(problems(x)).includes(`${any}:stale`));
});
test("a slug that is not published (or not in the pilot list) is caught", () => {
  const x = clone();
  x.lessons["__not-a-lesson__"] = { ...x.lessons[any] };
  const r = rules(problems(x));
  assert.ok(r.includes("__not-a-lesson__:published"));
  assert.ok(r.includes("__not-a-lesson__:pilot"));
  assert.ok(r.includes("__not-a-lesson__:fallback"));
});
test("a hash that is not 64-hex is caught", () => {
  const x = clone();
  x.lessons[any].frameDoc = "../../evil";
  assert.ok(rules(problems(x)).includes(`${any}:hash`));
});
test("another origin is caught", () => {
  const x = clone();
  x.origin = "https://evil.example";
  assert.ok(rules(problems(x)).includes("-:origin"));
});
test("client projections that disagree with the manifest are caught", () => {
  const x = structuredClone(m); // the committed projections against the committed manifest plus one entry
  x.lessons["__extra__"] = fresh().lessons[any];
  assert.ok(rules(problems(x)).includes("-:client"));
});
test("an empty manifest (after a stale-kit prune) meets every rule, flag off and on, with the kit fresh or stale", () => {
  for (const kitHash of ["fresh", "stale"]) {
    const x = { ...structuredClone(m), lessons: {}, kit: structuredClone(fresh().kit) };
    if (kitHash === "stale") (x.kit.sourceHash = "0".repeat(64)), (x.kit.geoSourceHash = "0".repeat(64));
    const ps = problems(x).filter((p) => p.rule !== "client"); // the projections on disk are the committed manifest's
    assert.deepEqual(ps, [], `${kitHash} kit: ${show(ps)}`);
    for (const on of [false, true]) assert.deepEqual(blocking(ps, { on }), []);
    assert.deepEqual(clientSlugs(x).slugs, []);
    assert.deepEqual(clientFrames(x).frames, {});
    x.lessons["__extra__"] = fresh().lessons[any];
    if (kitHash === "stale") assert.ok(rules(problems(x)).includes("-:stale-kit"), "an entry on a stale kit fires again");
  }
});

test("no app code imports the manifest record; the client reads only its two projections", async () => {
  const { execFileSync } = await import("node:child_process");
  let out = "";
  try {
    out = execFileSync("git", ["grep", "-lE", "(from|import\\()\\s*[\"'][^\"']*lesson-frames\\.manifest\\.json", "--", "src"], { encoding: "utf8" });
  } catch (e) {
    if (e.status !== 1) throw e; // 1: no match
  }
  const hits = out.split("\n").filter(Boolean);
  assert.deepEqual(hits.filter((f) => /\.(tsx?|jsx?|mjs)$/.test(f)), [], "import src/lib/lesson-frames.frames.json or .slugs.json instead");
});
