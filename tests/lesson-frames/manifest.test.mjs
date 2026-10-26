// Lesson frames pilot gate (C1; company/engineering/reviews/2026-10-25-content-hub-production-review.md, "Publication
// keeps the editorial gates"). In npm run verify, which tools/deploy.mjs runs before every deploy. A learner is served
// frame code only for a source tree that is published now and unchanged since its artifact was built.
// Fix a failure with `node tools/lesson-frames.mjs prune` (the lesson renders in-app) or a rebuild; never by editing here.
import assert from "node:assert/strict";
import test from "node:test";
import { ALLOWED_ORIGIN, HEX64, pilotSlugs, problems, readManifest } from "../../tools/lib/lesson-frames.mjs";

const m = readManifest();
const clone = () => structuredClone(m);
const rules = (ps) => ps.map((p) => `${p.slug ?? "-"}:${p.rule}`);

test("the committed manifest meets every rule (published, fresh, 64-hex, allow-listed origin, projections)", () => {
  const ps = problems(m);
  assert.deepEqual(ps, [], ps.map((p) => `${p.slug ?? "(manifest)"}: ${p.rule}: ${p.detail}`).join("\n"));
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
  const hits = execFileSync("git", ["grep", "-l", "lesson-frames.manifest.json", "--", "src"], { encoding: "utf8" }).split("\n").filter(Boolean);
  assert.deepEqual(hits.filter((f) => /\.(tsx?|jsx?|mjs)$/.test(f)), [], "import src/lib/lesson-frames.frames.json or .slugs.json instead");
});
