// Lesson frames pilot gate (C1; company/engineering/reviews/2026-10-25-content-hub-production-review.md, "Publication
// keeps the editorial gates"). In npm run verify, which tools/deploy.mjs runs before every deploy. A learner is served
// frame code only for a source tree that is published now and unchanged since its artifact was built.
// Fix a failure with `node tools/lesson-frames.mjs prune` (the lesson renders in-app) or a rebuild; never by editing here.
// Scope (O1, company/decisions/2026-10-26-lesson-frames-gate-scope.md): freshness blocks flag-on builds, at the build.
import assert from "node:assert/strict";
import test from "node:test";
import { ALLOWED_ORIGIN, FRESHNESS_RULES, HEX64, blocking, flagOnBuildRefusal, framesOn, pilotSlugs, problems, readManifest } from "../../tools/lib/lesson-frames.mjs";

const m = readManifest();
const clone = () => structuredClone(m);
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
const any = Object.keys(m.lessons)[0];
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
  const x = clone();
  delete x.lessons[any];
  assert.ok(rules(problems(x)).includes("-:client"));
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
