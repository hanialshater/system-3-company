// Tests for adapters/s3c/walkthrough.mjs (plan 2026-10-21-m4-m7-plan.md §2 row 4, §4 row walkthrough.mjs).
//
// Fast by default (about 4 s): transcript parsing, the stamp / --verify rules in a temp git repo, and the CLI run
// against a temp repo whose `npm run walkthrough` and tools/serve.sh are stubs (aborted transcript → revise, tool
// exit 2 → stage-error, a server it started is stopped). The stub server answers with its dist's BUILD_ID in the
// `"b":"<id>"` form next's HTML carries. Review 2026-10-22 finding 2 regressions: an unstamped or stale dist is not
// walked (also after the revise is committed), --url without a checked build writes no stamp, --verify sees a
// src/kit change. Real (opt-in): S3C_WALK_REAL=<throwaway worktree> walks a
// published lesson there from an existing build (S3C_WALK_DIST, default .next-meta-<slug>; qa.mjs leaves one).

import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseTranscript, verifyStamp, stampPath } from "../walkthrough.mjs";
import { sha256File } from "../lib/proc.mjs";
import { sourceState, writeBuildStamp } from "../lib/build-stamp.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WALK = path.join(HERE, "..", "walkthrough.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";
const SLUG = "tiny-lesson";
const temps = [];
after(() => temps.forEach((d) => fs.rmSync(d, { recursive: true, force: true })));

function run(args, env = {}) {
  const r = spawnSync(process.execPath, [WALK, ...args], { encoding: "utf8", timeout: 600_000, env: { ...process.env, ...env } });
  let json = null;
  try {
    json = JSON.parse(r.stdout.trim().split("\n").at(-1));
  } catch {}
  return { exit: r.status, json, stdout: r.stdout, stderr: r.stderr };
}
const g = (r, ...a) => execFileSync("git", ["-C", r, "-c", "user.email=t@t", "-c", "user.name=t", ...a], { encoding: "utf8" }).trim();

// npm stub: `npm run --silent walkthrough -- <slug> --url <u>` → writes what tools/walkthrough.mjs writes.
// STUB_WALK=abort|exit2|noframes changes the outcome.
const NPM = `#!/usr/bin/env bash
[ "$3" = "walkthrough" ] || { echo "stub npm: $*"; exit 1; }
slug=$5; d=artifacts/walkthroughs/$slug; mkdir -p "$d"
case "$STUB_WALK" in
  exit2) echo "walkthrough: server did not start" >&2; exit 2 ;;
  abort) printf '# Walkthrough: T\\n\\n**Walkthrough aborted:** locator.innerText: Timeout 30000ms exceeded.\\n' > "$d/transcript.md"; echo "wrote $d/transcript.md and 0 screenshots"; exit 0 ;;
  noframes) printf '# Walkthrough: T\\n## 1. Predict\\n' > "$d/transcript.md"; echo "wrote $d/transcript.md and 0 screenshots"; exit 0 ;;
esac
printf '# Walkthrough: T\\n## 1. Predict\\n### Step 1: tapped "a"\\n## 3. Reveal\\n> why\\n' > "$d/transcript.md"; echo png > "$d/sheet.png"; echo png > "$d/01-predict.png"
echo "wrote $d/transcript.md and 1 screenshots"
`;
const SERVE = `#!/usr/bin/env bash
cd "$(dirname "$0")/.." || exit 1; mkdir -p .serve
case "$1" in
  start) id=$(cat "$3/BUILD_ID" 2>/dev/null); [ -n "$STUB_WRONG_BUILD" ] && id=other
         setsid node -e 'require("http").createServer((q,s)=>s.end("<script>\\"b\\":\\""+process.argv[2]+"\\"</script>")).listen(+process.argv[1],"127.0.0.1")' "$2" "$id" >/dev/null 2>&1 &
         echo $! > .serve/$2.pid; sleep 0.3 ;;
  stop)  kill "$(cat .serve/$2.pid)" 2>/dev/null; rm -f .serve/$2.pid ;;
esac
`;

function fakeRepo() {
  const r = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "walk-repo-")));
  temps.push(r);
  const w = (p, s, mode) => {
    fs.mkdirSync(path.dirname(path.join(r, p)), { recursive: true });
    fs.writeFileSync(path.join(r, p), s);
    if (mode) fs.chmodSync(path.join(r, p), mode);
  };
  w(`src/demos/math/${SLUG}/meta.json`, JSON.stringify({ slug: SLUG, status: "published", version: 2, claims: [] }, null, 2) + "\n");
  w(`src/demos/math/${SLUG}/Demo.tsx`, "export default 1;\n");
  w("tools/walkthrough.mjs", "// stub (npm stub stands in for it)\n");
  w("tools/serve.sh", SERVE, 0o755);
  w("tools/lib/server.mjs", fs.readFileSync(path.join(REPO, "tools/lib/server.mjs"), "utf8"));
  w("bin/npm", NPM, 0o755);
  w(".gitignore", "artifacts/\n.serve/\n.next*/\nbin/\n");
  execFileSync("git", ["init", "-q", r]);
  g(r, "add", ".");
  g(r, "commit", "-qm", "base");
  return r;
}
const env = (r, extra = {}) => ({ PATH: `${path.join(r, "bin")}:${process.env.PATH}`, ...extra });
const DIST = `.next-meta-${SLUG}`;
/** What qa.mjs leaves after its build: a dist with BUILD_ID and the source stamp of the tree as it is now. */
function stampedBuild(r, id = "build-" + Date.now()) {
  fs.mkdirSync(path.join(r, DIST), { recursive: true });
  fs.writeFileSync(path.join(r, DIST, "BUILD_ID"), id);
  return writeBuildStamp(r, DIST, sourceState(r, `src/demos/math/${SLUG}`));
}
const walk = (r, extra = {}) => run([SLUG, `--repo=${r}`], env(r, extra));

// ------------------------------------------------------------------ unit

test("parseTranscript: abort blocks, locked reveal and page errors are advisory", () => {
  const ok = parseTranscript("# Walkthrough: X\n### Step 1: tapped\n### Step 2: moved\n## 3. Reveal\n> y\n");
  assert.deepEqual([ok.findings, ok.title, ok.steps, ok.revealed], [[], "X", 2, true]);
  const ab = parseTranscript("# Walkthrough: X\n\n**Walkthrough aborted:** boom here\n");
  assert.equal(ab.findings[0].severity, "block");
  assert.match(ab.findings[0].message, /boom here/);
  const lk = parseTranscript("## 3. Reveal\n\n**The reveal never unlocked during this walkthrough.**\n\n## Page errors\n\n- TypeError: x\n");
  assert.deepEqual(lk.findings.map((f) => [f.severity, f.kind]), [["advisory", "reveal-locked"], ["advisory", "page-error"]]);
  assert.equal(lk.revealed, false);
});

test("usage errors exit 2", () => {
  assert.equal(run([]).exit, 2);
  assert.equal(run(["a", "--url=ftp://x"]).exit, 2);
  assert.equal(run(["a", "--port=abc"]).exit, 2);
  assert.equal(run(["a", "--nope"]).exit, 2);
});

// ------------------------------------------------------------------ CLI against stubs

test("standalone: pass writes the stamp (with the checked build) outside the learner pack dir; --verify then passes", () => {
  const r = fakeRepo();
  const b = stampedBuild(r);
  const res = walk(r);
  assert.equal(res.exit, 0, res.stdout + res.stderr);
  assert.equal(res.json.screenshots, 1);
  assert.equal(res.json.stamp, `artifacts/meta-stamps/walkthrough-${SLUG}.json`);
  assert.deepEqual(JSON.parse(fs.readFileSync(stampPath(r, SLUG), "utf8")).build, { dist: DIST, buildId: b.buildId, key: b.key, dirty: {} });
  assert.ok(!fs.readdirSync(path.join(r, "artifacts/walkthroughs", SLUG)).some((f) => f.includes("stamp")));
  assert.deepEqual(fs.readdirSync(path.join(r, ".serve")).filter((f) => f.endsWith(".pid")), []);
  const v = run([SLUG, `--repo=${r}`, "--verify"]);
  assert.equal(v.exit, 0, JSON.stringify(v.json));
  assert.equal(v.json.sameSha, true);
});

test("standalone: no dist → stage-error; unstamped or stale dist → revise routed to qa, also once the revise is committed (review finding 2)", () => {
  const r = fakeRepo();
  const a = walk(r);
  assert.equal(a.exit, 3);
  assert.match(a.json.findings[0].message, /no build at/);
  fs.mkdirSync(path.join(r, DIST));
  fs.writeFileSync(path.join(r, DIST, "BUILD_ID"), "x");
  const u = walk(r);
  assert.equal(u.exit, 1);
  assert.deepEqual([u.json.findings[0].kind, u.json.findings[0].route], ["stale-build", "qa"]);
  assert.match(u.json.findings[0].message, /no source stamp/);
  stampedBuild(r);
  assert.equal(walk(r).exit, 0);
  // the builder's revise lands after the build: uncommitted, then committed (HEAD moves with it)
  fs.writeFileSync(path.join(r, `src/demos/math/${SLUG}/Demo.tsx`), 'throw new Error("BROKEN-BY-REVIEW");\n');
  const d = walk(r);
  assert.equal(d.exit, 1);
  assert.match(d.json.findings[0].message, /stale: .*Demo\.tsx/);
  g(r, "commit", "-qam", "revise");
  const c = walk(r);
  assert.equal(c.exit, 1);
  assert.equal(c.json.findings[0].kind, "stale-build");
  // and --verify no longer passes on the earlier walk either
  assert.equal(verifyStamp(r, SLUG).exit, 1);
});

test("standalone: a server that does not serve the checked BUILD_ID is a stage-error, not a walk", () => {
  const r = fakeRepo();
  stampedBuild(r);
  const res = walk(r, { STUB_WRONG_BUILD: "1" });
  assert.equal(res.exit, 3);
  assert.equal(res.json.findings[0].kind, "server-build");
  assert.equal(fs.existsSync(stampPath(r, SLUG)), false);
});

test("--url without --dist walks but writes no stamp (advisory), so --verify fails; --url --dist checks the build", async () => {
  const r = fakeRepo();
  const res = run([SLUG, `--repo=${r}`, "--url=http://127.0.0.1:9"], env(r));
  assert.equal(res.exit, 0, res.stdout + res.stderr);
  assert.equal(res.json.stamp, null);
  assert.ok(res.json.findings.some((f) => f.kind === "build-unknown" && f.severity === "advisory"));
  assert.equal(run([SLUG, `--repo=${r}`, "--verify"]).json.findings[0].kind, "walkthrough-missing");
  // --url --dist: the dist is checked, then the server must carry its BUILD_ID
  const b = stampedBuild(r);
  const http = await import("node:http");
  const srv = http.createServer((q, s) => s.end(`"b":"${b.buildId}"`));
  await new Promise((ok) => srv.listen(0, "127.0.0.1", ok));
  try {
    const url = `http://127.0.0.1:${srv.address().port}`;
    const { spawn } = await import("node:child_process");
    const ok = await new Promise((done) => {
      const c = spawn(process.execPath, [WALK, SLUG, `--repo=${r}`, `--url=${url}`, `--dist=${DIST}`], { env: { ...process.env, ...env(r) }, stdio: ["ignore", "pipe", "pipe"] });
      let out = "";
      c.stdout.on("data", (d) => (out += d));
      c.on("close", (code) => done({ code, json: JSON.parse(out.trim().split("\n").at(-1)) }));
    });
    assert.equal(ok.code, 0, JSON.stringify(ok.json));
    assert.equal(ok.json.stamp, `artifacts/meta-stamps/walkthrough-${SLUG}.json`);
  } finally {
    srv.close();
  }
  const wrong = run([SLUG, `--repo=${r}`, "--url=http://127.0.0.1:9", `--dist=${DIST}`], env(r));
  assert.equal(wrong.exit, 3);
  assert.equal(wrong.json.findings[0].kind, "server-build");
});

test("aborted walkthrough (tool exit 0) is a revise; no frames is a revise; tool exit 2 is a stage-error", () => {
  const r = fakeRepo();
  stampedBuild(r);
  const a = walk(r, { STUB_WALK: "abort" });
  assert.equal(a.exit, 1);
  assert.equal(a.json.findings[0].kind, "walkthrough-aborted");
  assert.equal(fs.existsSync(stampPath(r, SLUG)), false);
  const n = walk(r, { STUB_WALK: "noframes" });
  assert.equal(n.exit, 1);
  assert.equal(n.json.findings[0].kind, "walkthrough-sheet");
  const e = walk(r, { STUB_WALK: "exit2" });
  assert.equal(e.exit, 3);
});

test("--verify: meta.json-only commits keep it current; Demo.tsx or src/kit changes, a version bump or an edited transcript make it stale", () => {
  const r = fakeRepo();
  stampedBuild(r);
  assert.equal(walk(r).exit, 0);
  const mp = path.join(r, `src/demos/math/${SLUG}/meta.json`);
  const meta = JSON.parse(fs.readFileSync(mp, "utf8"));
  // a fact-check commit: claim statuses change in meta.json, version does not (stage 5 → K7 commit), plus a review
  fs.writeFileSync(mp, JSON.stringify({ ...meta, claims: [{ id: "x", status: "verified" }] }, null, 2) + "\n");
  fs.mkdirSync(path.join(r, "company/reviews", SLUG), { recursive: true });
  fs.writeFileSync(path.join(r, "company/reviews", SLUG, "2026-01-01-fact-check.md"), "x\n");
  g(r, "add", ".");
  g(r, "commit", "-qm", "fact-check");
  let v = verifyStamp(r, SLUG);
  assert.equal(v.exit, 0, JSON.stringify(v.out.findings));
  assert.equal(v.out.sameSha, false);
  // learner-visible code change, uncommitted then committed
  fs.appendFileSync(path.join(r, `src/demos/math/${SLUG}/Demo.tsx`), "// v\n");
  assert.equal(verifyStamp(r, SLUG).exit, 1);
  g(r, "commit", "-qam", "edit");
  v = verifyStamp(r, SLUG);
  assert.equal(v.exit, 1);
  assert.match(v.out.findings[0].message, /Demo\.tsx/);
  assert.equal(v.out.findings[0].route, "walk");
  // fresh build + walk, then a kit change outside the lesson dir (missed before the review)
  stampedBuild(r);
  assert.equal(walk(r).exit, 0);
  fs.mkdirSync(path.join(r, "src/kit"), { recursive: true });
  fs.writeFileSync(path.join(r, "src/kit/Lesson.tsx"), "x\n");
  assert.match(verifyStamp(r, SLUG).out.findings.map((f) => f.message).join(), /src\/kit\/Lesson\.tsx/);
  g(r, "add", ".");
  g(r, "commit", "-qm", "kit");
  assert.match(verifyStamp(r, SLUG).out.findings.map((f) => f.message).join(), /build inputs changed since the walk: src\/kit\/Lesson\.tsx/);
  // fresh build + walk, then a version bump
  stampedBuild(r);
  assert.equal(walk(r).exit, 0);
  fs.writeFileSync(mp, JSON.stringify({ ...meta, version: 3 }, null, 2) + "\n");
  assert.match(verifyStamp(r, SLUG).out.findings.map((f) => f.message).join(), /walked v2, lesson is v3/);
  fs.writeFileSync(mp, JSON.stringify(meta, null, 2) + "\n");
  fs.appendFileSync(path.join(r, `artifacts/walkthroughs/${SLUG}/transcript.md`), "edited\n");
  assert.ok(verifyStamp(r, SLUG).out.findings.some((f) => f.kind === "walkthrough-changed"));
  // a stamp from before build stamps (no build) is not current
  const st = JSON.parse(fs.readFileSync(stampPath(r, SLUG), "utf8"));
  delete st.build;
  fs.writeFileSync(stampPath(r, SLUG), JSON.stringify(st));
  assert.ok(verifyStamp(r, SLUG).out.findings.some((f) => f.kind === "walkthrough-unchecked"));
  fs.rmSync(stampPath(r, SLUG));
  assert.equal(verifyStamp(r, SLUG).out.findings[0].kind, "walkthrough-missing");
  assert.equal(typeof sha256File(mp), "string");
});

// ------------------------------------------------------------------ real (opt-in)

const REAL = process.env.S3C_WALK_REAL;
test("real: walkthrough.mjs serves the qa build, walks, verifies", { skip: !REAL && "set S3C_WALK_REAL=<throwaway worktree with a build>", timeout: 600_000 }, () => {
  const slug = process.env.S3C_WALK_SLUG ?? "scoops-in-three-cups";
  const dist = process.env.S3C_WALK_DIST ?? `.next-meta-${slug}`;
  const t0 = Date.now();
  const res = run([slug, `--repo=${REAL}`, `--dist=${dist}`]);
  assert.equal(res.exit, 0, res.stdout.slice(-3000));
  assert.ok(res.json.screenshots > 0);
  assert.equal(run([slug, `--repo=${REAL}`, "--verify"]).exit, 0);
  console.log(`# real walk ${Date.now() - t0} ms (walk ${res.json.ms} ms, serve ${res.json.serve.startMs} ms)`);
});
