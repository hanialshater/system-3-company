// Tests for adapters/s3c/qa.mjs (plan 2026-10-21-m4-m7-plan.md §2 row 3, §4 row qa.mjs).
//
// Three layers, fast by default (about 3 s):
// 1. unit: report walking, record parsing, reveal-fit / a11y findings, the Turbopack symlink rule, dirty().
// 2. orchestration: qa.mjs run as a CLI against a temp git repo whose company tools are STUBS (npm, playwright,
//    company qa-record, serve.sh, reveal-fit, a11y-scan), so each exit rule is exercised in about 1 s: stale-report
//    deletion, qaStamp refusal, version mismatch, reveal-fit exit 3 and "0 lessons", build side-effect restore, and
//    the server stopped in finally (also on a revise). tools/lib/server.mjs and tools/lib/readiness.mjs are the
//    real company files, copied. Review 2026-10-22 regressions: --no-build on a stale or unstamped dist (finding 1),
//    a leftover webServer on QA_PORT after playwright exits or after SIGTERM mid-playwright (finding 3),
//    QA_INDEPENDENT_SINCE set (finding 4), a same-day fail record outvoting the new pass (finding 5).
// 3. real (opt-in, about 1 min without a build, 4 min with): S3C_QA_REAL=<worktree> runs the real adapter on a
//    published lesson there (S3C_QA_SLUG, default scoops-in-three-cups), then restores the tree. The worktree must be
//    a throwaway one at <base>/.claude/worktrees/<name> (see lib/proc.mjs turbopackProblem). S3C_QA_REAL_BUILD=1
//    includes `npm run build`; otherwise the dist in S3C_QA_DIST (default .next-meta-<slug>) must already exist.
//
// REPO (env S3C_REPO, default /home/user/s3c-wt/base) is only read (the unknown-slug CLI case exits before writing).

import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { reportRuns, parseRecord, fitFindings, a11yFindings, STAMPED, companyQaConstants } from "../qa.mjs";
import { turbopackProblem, dirty, verdict, parseArgs, portListeners } from "../lib/proc.mjs";
import { sourceState, checkBuild, STAMP_FILE } from "../lib/build-stamp.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const QA = path.join(HERE, "..", "qa.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";
const temps = [];
const tmp = (p) => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), `qa-${p}-`));
  temps.push(d);
  return d;
};
after(() => temps.forEach((d) => fs.rmSync(d, { recursive: true, force: true })));

function run(args, env = {}) {
  const r = spawnSync(process.execPath, [QA, ...args], { encoding: "utf8", timeout: 600_000, env: { ...process.env, ...env } });
  const last = r.stdout.trim().split("\n").at(-1);
  let json = null;
  try {
    json = JSON.parse(last);
  } catch {}
  return { exit: r.status, json, stdout: r.stdout, stderr: r.stderr };
}

// ------------------------------------------------------------------ 1 unit

test("reportRuns walks the suite trail the way cmdQaRecord does, and only for the slug", () => {
  const report = {
    suites: [
      {
        title: "contract.spec.ts",
        suites: [
          { title: "a", specs: [{ tests: [{ projectName: "phone", results: [{ status: "passed" }] }, { projectName: "desktop", results: [{ status: "failed", error: { message: "\x1b[31mboom\x1b[0m\nline2\nl3\nl4" } }, { status: "passed" }] }] }] },
          { title: "b", specs: [{ tests: [{ projectName: "phone", results: [{ status: "passed" }] }] }] },
        ],
      },
      { title: "feed.spec.ts", suites: [{ title: "a", specs: [{ tests: [{ projectName: "phone", results: [{ status: "failed" }] }] }] }] },
    ],
  };
  const runs = reportRuns(report, "a");
  assert.equal(runs.length, 2);
  assert.deepEqual(runs[1], { project: "desktop", status: "passed", retries: 1, error: "" });
  assert.equal(reportRuns(report, "zzz").length, 0);
});

test("parseRecord reads cmdQaRecord's line", () => {
  const t = "date: 2026-10-21 · harness: tests/qa/contract.spec.ts · recorded by: qa-tester (company qa-record) · lesson version: v4 · result: **pass**";
  assert.deepEqual(parseRecord(t), { version: 4, result: "pass", recorder: true });
  assert.equal(parseRecord("result: **fail**").result, "fail");
  assert.ok(Number.isNaN(parseRecord("result: **pass**").version));
});

test("fitFindings: clip and thumb block, phoneFit is advisory, errors block", () => {
  assert.deepEqual(fitFindings({ verdict: "fit", thumb: false, phoneFit: true }), []);
  assert.equal(fitFindings({ verdict: "clip", thumb: false, phoneFit: false, hiddenBelow: 40 }).filter((f) => f.severity === "block").length, 1);
  assert.equal(fitFindings({ verdict: "scroll", thumb: true, phoneFit: true })[0].severity, "block");
  assert.equal(fitFindings({ verdict: "scroll", thumb: false, phoneFit: false })[0].severity, "advisory");
  assert.equal(fitFindings({ error: "no reveal" })[0].severity, "block");
});

test("a11yFindings are advisory only", () => {
  const f = a11yFindings({ verdictAuto: "fail", counts: { lessonFail: 1, lessonFix: 0 }, findings: [{ origin: "lesson", severity: "fail", check: "contrast", message: "x" }, { origin: "kit", severity: "fail", check: "k", message: "y" }] });
  assert.ok(f.every((x) => x.severity === "advisory"));
  assert.equal(f.length, 2); // verdict + the one lesson finding (kit findings are not the lesson's)
  assert.equal(verdict(f).exit, 0);
});

test("turbopackProblem: symlink outside the root fails, inside <base>/.claude/worktrees passes, real dir passes", () => {
  const base = fs.realpathSync(tmp("tp"));
  fs.mkdirSync(path.join(base, "node_modules"));
  const outside = path.join(base, "wt");
  fs.mkdirSync(outside);
  fs.symlinkSync(path.join(base, "node_modules"), path.join(outside, "node_modules"));
  assert.match(turbopackProblem(outside), /outside Turbopack's root/);
  const inside = path.join(base, ".claude", "worktrees", "t1");
  fs.mkdirSync(inside, { recursive: true });
  fs.symlinkSync(path.join(base, "node_modules"), path.join(inside, "node_modules"));
  assert.equal(turbopackProblem(inside), null);
  assert.equal(turbopackProblem(base), null);
  assert.match(turbopackProblem(path.join(base, ".claude")), /no node_modules/);
});

test("dirty keeps the leading space of ' M' (regression: trim ate the first path's first letter)", () => {
  const d = tmp("dirty");
  execFileSync("git", ["init", "-q", d]);
  fs.writeFileSync(path.join(d, "a.txt"), "1");
  execFileSync("git", ["-C", d, "add", "."]);
  execFileSync("git", ["-C", d, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "x"]);
  fs.writeFileSync(path.join(d, "a.txt"), "2");
  assert.deepEqual(dirty(d, ["a.txt"]), [{ code: " M", path: "a.txt" }]);
});

test("parseArgs and STAMPED", () => {
  assert.deepEqual(parseArgs(["s", "--no-build", "--port=3"]), { positional: ["s"], "no-build": true, port: "3" });
  assert.deepEqual(STAMPED, ["tests/qa", "playwright.config.ts", "tools/reveal-fit.mjs"]);
});

test("companyQaConstants reads company.mjs's two lines and fails closed", () => {
  assert.deepEqual(companyQaConstants('const READINESS_SINCE = "2026-10-17";\nconst QA_INDEPENDENT_SINCE = null;\n'), { independentSince: null, readinessSince: "2026-10-17", problem: null });
  assert.equal(companyQaConstants('const READINESS_SINCE = "2026-10-17";\nconst QA_INDEPENDENT_SINCE = "2026-11-01";\n').independentSince, "2026-11-01");
  assert.match(companyQaConstants('const READINESS_SINCE = "2026-10-17";\nlet QA_INDEPENDENT_SINCE = null;\n').problem, /QA_INDEPENDENT_SINCE/);
  const real = path.join(REPO, "tools/company.mjs");
  if (fs.existsSync(real)) assert.equal(companyQaConstants(fs.readFileSync(real, "utf8")).problem, null, "the real company.mjs lines moved: re-read company.mjs:146-152");
});

test("build stamp: the source key ignores qa-record's evidence link and pipeline paths, and sees source edits", () => {
  const r = fakeRepo();
  const rel = `src/demos/math/${SLUG}`;
  const k0 = sourceState(r, rel).key;
  const mp = path.join(r, rel, "meta.json");
  const m = JSON.parse(fs.readFileSync(mp, "utf8"));
  fs.writeFileSync(mp, JSON.stringify({ ...m, evidence: { qa: ["company/reviews/x/2026-01-01-qa.md"] } }, null, 2) + "\n");
  fs.mkdirSync(path.join(r, "company/reviews", SLUG), { recursive: true });
  fs.writeFileSync(path.join(r, "company/reviews", SLUG, "2026-01-01-qa.md"), "x");
  fs.writeFileSync(path.join(r, "tsconfig.json"), '{"changed":1}\n');
  assert.equal(sourceState(r, rel).key, k0);
  assert.deepEqual(sourceState(r, rel).dirty, {});
  fs.writeFileSync(mp, JSON.stringify({ ...m, title: "new" }, null, 2) + "\n");
  assert.notEqual(sourceState(r, rel).key, k0);
  fs.writeFileSync(mp, JSON.stringify(m, null, 2) + "\n");
  fs.writeFileSync(path.join(r, "src/new.ts"), "x\n"); // an untracked source file is a build input
  assert.notEqual(sourceState(r, rel).key, k0);
  assert.equal(checkBuild(r, ".next-none", rel).missing, true);
});

test("CLI usage errors exit 2", () => {
  assert.equal(run([]).exit, 2);
  assert.equal(run(["Bad_Slug"]).exit, 2);
  assert.equal(run(["a", "--bogus"]).exit, 2);
  assert.equal(run(["a", "--qa-out=/abs"]).exit, 2);
  assert.equal(run(["a", "--dist=../x"]).exit, 2);
});

test("CLI: unknown slug in the real repo is a revise (exit 1) before any write", { skip: !fs.existsSync(path.join(REPO, "tools/company.mjs")) && "no company repo" }, () => {
  const r = run(["no-such-lesson-xyz", `--repo=${REPO}`]);
  assert.equal(r.exit, 1);
  assert.equal(r.json.findings[0].kind, "lesson");
});

// ------------------------------------------------------------------ 2 orchestration against stubs

const SLUG = "tiny-lesson";

/** A temp git repo shaped like the company: lesson, harness files, stub tools. Behaviour is set by STUB_* env. */
function fakeRepo() {
  const r = fs.realpathSync(tmp("repo"));
  const w = (p, s, mode) => {
    fs.mkdirSync(path.dirname(path.join(r, p)), { recursive: true });
    fs.writeFileSync(path.join(r, p), s);
    if (mode) fs.chmodSync(path.join(r, p), mode);
  };
  w(`src/demos/math/${SLUG}/meta.json`, JSON.stringify({ slug: SLUG, domain: "math", status: "published", version: 3, claims: [], evidence: { qa: [] } }, null, 2) + "\n");
  w(`src/demos/math/${SLUG}/Demo.tsx`, "export default 1;\n");
  w("tests/qa/contract.spec.ts", "// stub\n");
  w("playwright.config.ts", "// stub\n");
  w("tools/reveal-fit.mjs", REVEAL_FIT);
  w("tools/a11y-scan.mjs", A11Y);
  w("tools/company.mjs", COMPANY);
  w("tools/serve.sh", SERVE, 0o755);
  w("tools/lib/server.mjs", fs.readFileSync(path.join(REPO, "tools/lib/server.mjs"), "utf8"));
  w("tools/lib/readiness.mjs", fs.readFileSync(path.join(REPO, "tools/lib/readiness.mjs"), "utf8"));
  w("tsconfig.json", "{}\n");
  w("src/data/editorial-profiles.account.json", "{}\n");
  w(".gitignore", "node_modules/\n.next*/\ntest-results/\nartifacts/\n.serve/\nbin/\n");
  w("node_modules/next/package.json", "{}");
  w("node_modules/@playwright/test/package.json", "{}");
  w("node_modules/.bin/playwright", PLAYWRIGHT, 0o755);
  w("bin/npm", NPM, 0o755);
  execFileSync("git", ["init", "-q", r]);
  execFileSync("git", ["-C", r, "add", "."]);
  execFileSync("git", ["-C", r, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "base"]);
  return r;
}
const stubEnv = (r, extra = {}) => ({ PATH: `${path.join(r, "bin")}:${process.env.PATH}`, STUB_SLUG: SLUG, ...extra });
const servers = (r) => (fs.existsSync(path.join(r, ".serve")) ? fs.readdirSync(path.join(r, ".serve")).filter((f) => f.endsWith(".pid")) : []);

// npm: `run build` makes a dist (and the two tracked side effects); `run --silent walkthrough -- <slug> --url <u>`.
const NPM = `#!/usr/bin/env bash
if [ "$2" = "build" ]; then
  [ -n "$STUB_BUILD_EXIT" ] && { echo "stub build error in \${STUB_BUILD_FILE:-src/other/x.tsx}"; exit $STUB_BUILD_EXIT; }
  mkdir -p "$NEXT_DIST_DIR/server/app/d"; echo stubid > "$NEXT_DIST_DIR/BUILD_ID"
  [ -z "$STUB_NO_PAGE" ] && touch "$NEXT_DIST_DIR/server/app/d/$STUB_SLUG.html"
  echo '{"x":1}' > tsconfig.json; echo '{"y":1}' > src/data/editorial-profiles.account.json; exit 0
fi
echo "stub npm: $*"; exit 1
`;
// STUB_PW_LEAK=1 starts a detached HTTP server on QA_PORT (as playwright's webServer is: its own group, cwd = repo)
// and leaves it running; STUB_PW_SLEEP=<ms> then sleeps with no signal handler (the runner dies, the server stays).
const PLAYWRIGHT = `#!/usr/bin/env node
const fs = require("fs"), path = require("path"), cp = require("child_process");
if (process.env.STUB_PW_DEAF) for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => {}); // outlives the grace
if (process.env.STUB_PW_LEAK) {
  const s = cp.spawn(process.execPath, ["-e", 'require("http").createServer((q,s)=>s.end("ok")).listen(+process.argv[1],"127.0.0.1")', process.env.QA_PORT], { detached: true, stdio: "ignore", cwd: process.cwd() });
  fs.mkdirSync(process.env.QA_OUT, { recursive: true }); fs.writeFileSync(path.join(process.env.QA_OUT, "webserver.pid"), String(s.pid)); s.unref();
  const t0 = Date.now(); while (Date.now() - t0 < 400) {} // let it bind
}
if (process.env.STUB_PW_SLEEP) { setTimeout(() => {}, Number(process.env.STUB_PW_SLEEP)); return; }
if (process.env.STUB_PW_NOREPORT) process.exit(1);
fs.mkdirSync(process.env.QA_OUT, { recursive: true });
const st = process.env.STUB_QA_STATUS || "passed";
const t = (p) => ({ projectName: p, results: [{ status: st, error: st === "passed" ? undefined : { message: "contract broke" } }] });
fs.writeFileSync(path.join(process.env.QA_OUT, "qa-report.json"), JSON.stringify({ config: { metadata: { qaStamp: { commit: "c", clean: !process.env.STUB_STAMP_DIRTY, modified: ["tests/qa/x"] } } },
  suites: [{ title: "contract.spec.ts", suites: [{ title: process.env.QA_ONLY, specs: [{ tests: [t("phone"), t("desktop")] }] }] }] }));
process.exit(st === "passed" ? 0 : 1);
`;
// company.mjs qa-record, reduced to the behaviour qa.mjs depends on (record line, link on pass, the stdout line).
const COMPANY = `import fs from "node:fs"; import path from "node:path";
const READINESS_SINCE = "2026-10-17";
const QA_INDEPENDENT_SINCE = null;
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
if (process.argv[2] !== "qa-record") process.exit(2);
const rep = JSON.parse(fs.readFileSync(path.join(ROOT, process.env.QA_OUT, "qa-report.json"), "utf8"));
const slug = rep.suites[0].suites[0].title, mp = path.join(ROOT, "src/demos/math", slug, "meta.json"), m = JSON.parse(fs.readFileSync(mp, "utf8"));
const ok = rep.suites[0].suites[0].specs[0].tests.every((t) => t.results.at(-1).status === "passed");
const f = "company/reviews/" + slug + "/2026-01-01-qa.md"; fs.mkdirSync(path.join(ROOT, "company/reviews", slug), { recursive: true });
fs.writeFileSync(path.join(ROOT, f), "lesson version: v" + (process.env.STUB_REC_VERSION || m.version) + " · result: **" + (ok ? "pass" : "fail") + "**\\n");
if (ok) { m.evidence.qa.push(f); fs.writeFileSync(mp, JSON.stringify(m, null, 2) + "\\n"); }
console.log((ok ? "pass" : "fail") + " " + slug + " → " + f);
`;
// serve.sh: a real detached HTTP server per port with a pid file, like tools/serve.sh (setsid, .serve/<port>.pid).
const SERVE = `#!/usr/bin/env bash
cd "$(dirname "$0")/.." || exit 1; mkdir -p .serve
case "$1" in
  start) setsid node -e 'require("http").createServer((q,s)=>s.end("ok")).listen(+process.argv[1],"127.0.0.1")' "$2" >/dev/null 2>&1 &
         echo $! > .serve/$2.pid; sleep 0.3; echo "port $2: HTTP 200" ;;
  stop)  kill "$(cat .serve/$2.pid)" 2>/dev/null; rm -f .serve/$2.pid; echo "stopped port $2" ;;
esac
`;
const REVEAL_FIT = `import fs from "node:fs";
if (process.env.STUB_FIT_SLEEP) await new Promise((r) => setTimeout(r, Number(process.env.STUB_FIT_SLEEP)));
const a = process.argv.slice(2), out = a[a.indexOf("--out") + 1], ex = Number(process.env.STUB_FIT_EXIT || 0);
if (ex === 3) { console.error("reveal-fit: refusing to run: this copy of the tool differs from HEAD"); process.exit(3); }
const n = process.env.STUB_FIT_ZERO ? 0 : 1, row = { slug: "${SLUG}", verdict: ex ? "clip" : "fit", thumb: false, phoneFit: !ex, hiddenBelow: 30, crop: 0, namedHidden: 0 };
fs.mkdirSync(out.split("/").slice(0, -1).join("/"), { recursive: true }); fs.writeFileSync(out, JSON.stringify({ results: n ? [row] : [] }));
console.log(JSON.stringify({ lessons: n, pass: ex ? 0 : n, tool: { clean: true } })); process.exit(ex);
`;
const A11Y = `import fs from "node:fs";
const out = process.argv.find((a) => a.startsWith("--out=")).slice(6);
fs.writeFileSync(out, JSON.stringify({ results: [{ slug: "${SLUG}", verdictAuto: "pass with fixes", counts: { lessonFail: 0, lessonFix: 1 }, findings: [{ origin: "lesson", severity: "fix", check: "targets", message: "small" }] }] }));
`;

test("orchestration: pass path records, links, restores build side effects, stops the server", () => {
  const r = fakeRepo();
  fs.mkdirSync(path.join(r, "test-results/meta-" + SLUG), { recursive: true });
  const t0 = Date.now();
  const res = run([SLUG, `--repo=${r}`], stubEnv(r));
  assert.equal(res.exit, 0, res.stdout + res.stderr);
  const j = res.json;
  assert.equal(j.ok, true);
  assert.deepEqual(j.record, { file: `company/reviews/${SLUG}/2026-01-01-qa.md`, result: "pass", version: 3, linked: true });
  assert.deepEqual(j.restored.sort(), ["src/data/editorial-profiles.account.json", "tsconfig.json"]);
  assert.equal(fs.readFileSync(path.join(r, "tsconfig.json"), "utf8"), "{}\n");
  assert.equal(j.revealFit.summary.lessons, 1);
  assert.equal(j.a11y.verdictAuto, "pass with fixes");
  assert.ok(j.findings.every((f) => f.severity === "advisory"));
  assert.equal(j.serveStop.stopped, true);
  assert.deepEqual(servers(r), []);
  assert.deepEqual(j.companyQa, { ready: true, reason: null, latest: `company/reviews/${SLUG}/2026-01-01-qa.md` });
  assert.equal(j.build.fresh, "built");
  assert.equal(JSON.parse(fs.readFileSync(path.join(r, `.next-meta-${SLUG}`, STAMP_FILE), "utf8")).key, j.build.key);
  assert.ok(Date.now() - t0 < 20_000);
  // the same dist again with --no-build: qa-record's evidence link and record do not make it stale
  const again = run([SLUG, `--repo=${r}`, "--no-build"], stubEnv(r));
  assert.equal(again.exit, 0, again.stdout);
  assert.equal(again.json.build.fresh, "stamp matches the tree");
});

test("orchestration: --no-build refuses a dist that is not the build of the tree (review finding 1)", () => {
  const r = fakeRepo();
  assert.equal(run([SLUG, `--repo=${r}`], stubEnv(r)).exit, 0);
  const demo = path.join(r, `src/demos/math/${SLUG}/Demo.tsx`);
  fs.writeFileSync(demo, 'throw new Error("BROKEN-BY-REVIEW");\n');
  const a = run([SLUG, `--repo=${r}`, "--no-build"], stubEnv(r));
  assert.equal(a.exit, 3);
  const stale = (j) => j.findings.find((x) => x.kind === "stale-build");
  assert.equal(stale(a.json).severity, "environment");
  assert.match(stale(a.json).message, /Demo\.tsx/);
  assert.equal(a.json.record, undefined, "no QA record may be written for a stale build");
  // committed revise (the case where HEAD moves with the change): still stale
  execFileSync("git", ["-C", r, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qam", "revise"]);
  assert.equal(stale(run([SLUG, `--repo=${r}`, "--no-build"], stubEnv(r)).json).severity, "environment");
  // a kit change outside the lesson dir is stale too
  fs.writeFileSync(demo, "export default 1;\n");
  execFileSync("git", ["-C", r, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qam", "undo"]);
  assert.equal(run([SLUG, `--repo=${r}`], stubEnv(r)).exit, 0);
  fs.mkdirSync(path.join(r, "src/kit"), { recursive: true });
  fs.writeFileSync(path.join(r, "src/kit/Lesson.tsx"), "x\n");
  assert.match(stale(run([SLUG, `--repo=${r}`, "--no-build"], stubEnv(r)).json).message, /src\/kit\/Lesson\.tsx/);
  fs.rmSync(path.join(r, "src/kit"), { recursive: true });
  // an unstamped dist (a plain `npm run build`) and a dist rebuilt after its stamp
  assert.equal(run([SLUG, `--repo=${r}`, "--no-build"], stubEnv(r)).exit, 0);
  fs.writeFileSync(path.join(r, `.next-meta-${SLUG}`, "BUILD_ID"), "other\n");
  assert.match(stale(run([SLUG, `--repo=${r}`, "--no-build"], stubEnv(r)).json).message, /rebuilt after its source stamp/);
  fs.rmSync(path.join(r, `.next-meta-${SLUG}`, STAMP_FILE));
  assert.match(stale(run([SLUG, `--repo=${r}`, "--no-build"], stubEnv(r)).json).message, /no source stamp/);
});

test("orchestration: QA_INDEPENDENT_SINCE set → stage-error before the build (plan §6 risk 4, review finding 4)", () => {
  const r = fakeRepo();
  const cp = path.join(r, "tools/company.mjs");
  fs.writeFileSync(cp, fs.readFileSync(cp, "utf8").replace("const QA_INDEPENDENT_SINCE = null;", 'const QA_INDEPENDENT_SINCE = "2026-11-01";'));
  execFileSync("git", ["-C", r, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qam", "ratify"]);
  const res = run([SLUG, `--repo=${r}`], stubEnv(r));
  assert.equal(res.exit, 3);
  assert.equal(res.json.findings[0].kind, "qa-recorder-rule");
  assert.equal(res.json.timings.build, undefined);
});

test("orchestration: a same-day fail record outvotes the new pass in the company's decision → revise (review finding 5)", () => {
  const r = fakeRepo();
  fs.mkdirSync(path.join(r, "company/reviews", SLUG), { recursive: true });
  fs.writeFileSync(path.join(r, "company/reviews", SLUG, "2026-01-01-qa-rerun.md"), "date: 2026-01-01 · lesson version: v3 · result: **fail**\n");
  const res = run([SLUG, `--repo=${r}`], stubEnv(r));
  assert.equal(res.exit, 1, res.stdout);
  assert.equal(res.json.record.result, "pass");
  const f = res.json.findings.find((x) => x.kind === "qa-readiness");
  assert.equal(f.route, "qa");
  assert.match(f.message, /newest QA record is a fail.*2026-01-01-qa-rerun\.md/);
  // a later-dated fail does the same
  fs.rmSync(path.join(r, "company/reviews", SLUG, "2026-01-01-qa-rerun.md"));
  fs.writeFileSync(path.join(r, "company/reviews", SLUG, "2026-01-02-qa.md"), "lesson version: v3 · result: **fail**\n");
  assert.equal(run([SLUG, `--repo=${r}`, "--no-build"], stubEnv(r)).json.findings.find((x) => x.kind === "qa-readiness").severity, "block");
});

const freePortNow = async () => (await import(path.join(REPO, "tools/lib/server.mjs"))).freePort();
const alive = (pid) => {
  const st = fs.existsSync(`/proc/${pid}/stat`) ? fs.readFileSync(`/proc/${pid}/stat`, "utf8").split(") ")[1]?.[0] : "gone";
  return !(st === "gone" || st === "Z");
};

test("orchestration: a webServer playwright leaves on QA_PORT is swept after the step (review finding 3)", async () => {
  const r = fakeRepo();
  const port = await freePortNow();
  const res = run([SLUG, `--repo=${r}`, `--port=${port}`], stubEnv(r, { STUB_PW_LEAK: "1" }));
  assert.equal(res.exit, 0, res.stdout);
  assert.equal(res.json.qaPortSwept.length, 1);
  assert.ok(res.json.findings.some((f) => f.kind === "qa-port" && f.severity === "advisory"));
  assert.deepEqual(portListeners(port), []);
});

test("orchestration: QA fail → exit 1 with per-project findings; server still stopped", () => {
  const r = fakeRepo();
  const res = run([SLUG, `--repo=${r}`], stubEnv(r, { STUB_QA_STATUS: "failed" }));
  assert.equal(res.exit, 1);
  assert.equal(res.json.record.result, "fail");
  assert.equal(res.json.findings.filter((f) => f.kind === "qa").length, 2);
  assert.ok(res.json.findings.every((f) => f.severity !== "environment"));
  assert.deepEqual(servers(r), []);
});

test("orchestration: a stale qa-report.json is deleted, so a crashed playwright is a stage-error, not a record", () => {
  const r = fakeRepo();
  const dir = path.join(r, "test-results/meta-" + SLUG);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "qa-report.json"), JSON.stringify({ config: { metadata: { qaStamp: { clean: true } } }, suites: [] }));
  const res = run([SLUG, `--repo=${r}`], stubEnv(r, { STUB_PW_NOREPORT: "1" }));
  assert.equal(res.exit, 3);
  assert.match(res.json.findings[0].message, /wrote no .*qa-report\.json/);
  assert.equal(fs.existsSync(path.join(r, "company/reviews", SLUG)), false);
});

test("orchestration: qaStamp clean:false → exit 3 and qa-record is never run", () => {
  const r = fakeRepo();
  const res = run([SLUG, `--repo=${r}`], stubEnv(r, { STUB_STAMP_DIRTY: "1" }));
  assert.equal(res.exit, 3);
  assert.equal(res.json.findings[0].kind, "qa-stamp");
  assert.equal(fs.existsSync(path.join(r, "company/reviews", SLUG)), false);
});

test("orchestration: record version ≠ meta.version → revise routed to qa", () => {
  const r = fakeRepo();
  const res = run([SLUG, `--repo=${r}`], stubEnv(r, { STUB_REC_VERSION: "2" }));
  assert.equal(res.exit, 1);
  assert.equal(res.json.findings.find((f) => f.kind === "qa-version").route, "qa");
});

test("orchestration: reveal-fit exit 1 → revise; exit 3 → stage-error; 0 lessons with exit 0 → stage-error", () => {
  const r = fakeRepo();
  const a = run([SLUG, `--repo=${r}`], stubEnv(r, { STUB_FIT_EXIT: "1" }));
  assert.equal(a.exit, 1);
  assert.ok(a.json.findings.some((f) => f.kind === "reveal-fit" && f.severity === "block"));
  const b = run([SLUG, `--repo=${r}`, "--no-build", "--dist=.next-meta-" + SLUG], stubEnv(r, { STUB_FIT_EXIT: "3" }));
  assert.equal(b.exit, 3);
  assert.match(b.json.findings.find((f) => f.kind === "reveal-fit").message, /tool stamp/);
  const c = run([SLUG, `--repo=${r}`, "--no-build", "--dist=.next-meta-" + SLUG], stubEnv(r, { STUB_FIT_ZERO: "1" }));
  assert.equal(c.exit, 3);
  assert.match(c.json.findings.find((f) => f.kind === "reveal-fit").message, /measured 0 lessons/);
  assert.deepEqual(servers(r), []);
});

test("orchestration: preflight refuses dirty harness files before building (exit 3)", () => {
  const r = fakeRepo();
  fs.appendFileSync(path.join(r, "tools/reveal-fit.mjs"), "// edit\n");
  const res = run([SLUG, `--repo=${r}`], stubEnv(r));
  assert.equal(res.exit, 3);
  assert.equal(res.json.findings[0].kind, "harness-dirty");
  assert.equal(res.json.timings.build, undefined);
});

test("orchestration: build errors naming the lesson are revise, others are stage-error; a missing page is revise", () => {
  const r = fakeRepo();
  const a = run([SLUG, `--repo=${r}`], stubEnv(r, { STUB_BUILD_EXIT: "1", STUB_BUILD_FILE: `src/demos/math/${SLUG}/Demo.tsx` }));
  assert.equal(a.exit, 1);
  assert.equal(a.json.findings[0].route, "build");
  const b = run([SLUG, `--repo=${r}`], stubEnv(r, { STUB_BUILD_EXIT: "1" }));
  assert.equal(b.exit, 3);
  const c = run([SLUG, `--repo=${r}`], stubEnv(r, { STUB_NO_PAGE: "1" }));
  assert.equal(c.exit, 1);
  assert.match(c.json.findings.find((f) => f.kind === "build").message, /no page/);
});

test("orchestration: SIGTERM mid-run (K2 job timeout) kills the step, stops the server, exits 3", async () => {
  const r = fakeRepo();
  const { spawn } = await import("node:child_process");
  const child = spawn(process.execPath, [QA, SLUG, `--repo=${r}`], { env: { ...process.env, ...stubEnv(r, { STUB_FIT_SLEEP: "20000" }) }, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "";
  child.stdout.on("data", (d) => (stdout += d));
  const t0 = Date.now();
  let pid = null;
  while (Date.now() - t0 < 15_000 && !pid) {
    await new Promise((res) => setTimeout(res, 100));
    const f = servers(r)[0];
    // wait until reveal-fit (the sleeping step) is running: its --out dir does not exist before it starts
    if (f && fs.existsSync(path.join(r, `test-results/meta-${SLUG}/logs/reveal-fit.log`))) pid = Number(fs.readFileSync(path.join(r, ".serve", f), "utf8"));
  }
  assert.ok(pid, "server never started");
  child.kill("SIGTERM");
  const code = await new Promise((res) => child.on("close", res));
  assert.equal(code, 3);
  assert.equal(JSON.parse(stdout.trim().split("\n").at(-1)).findings[0].kind, "signal");
  assert.deepEqual(servers(r), []);
  await new Promise((res) => setTimeout(res, 200));
  // Dead or a zombie (PID 1 in this container does not always reap reparented children; kill(pid, 0) succeeds on those).
  const state = fs.existsSync(`/proc/${pid}/stat`) ? fs.readFileSync(`/proc/${pid}/stat`, "utf8").split(") ")[1]?.[0] : "gone";
  assert.ok(state === "gone" || state === "Z", `the server process is still running (state ${state})`);
  assert.ok(Date.now() - t0 < 15_000);
});

test("orchestration: SIGTERM mid-playwright stops the webServer it left on QA_PORT (review finding 3)", async () => {
  const r = fakeRepo();
  const port = await freePortNow();
  const { spawn } = await import("node:child_process");
  const child = spawn(process.execPath, [QA, SLUG, `--repo=${r}`, `--port=${port}`], { env: { ...process.env, ...stubEnv(r, { STUB_PW_LEAK: "1", STUB_PW_SLEEP: "30000" }) }, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "";
  child.stdout.on("data", (d) => (stdout += d));
  const pidFile = path.join(r, `test-results/meta-${SLUG}/webserver.pid`);
  const t0 = Date.now();
  while (Date.now() - t0 < 15_000 && !(fs.existsSync(pidFile) && portListeners(port).length)) await new Promise((res) => setTimeout(res, 100));
  const ws = Number(fs.readFileSync(pidFile, "utf8"));
  assert.ok(alive(ws), "stub webServer never started");
  child.kill("SIGTERM");
  const code = await new Promise((res) => child.on("close", res));
  assert.equal(code, 3);
  const last = JSON.parse(stdout.trim().split("\n").at(-1));
  assert.equal(last.findings[0].kind, "signal");
  // The stub runner dies on SIGINT at once (worst case: no teardown), so the sweep right after the step kills the
  // server; when a runner outlives the grace, the onExit sweep does it and the signal message names it.
  assert.deepEqual(portListeners(port), [], "QA_PORT still has a listener after SIGTERM");
  await new Promise((res) => setTimeout(res, 200));
  assert.ok(!alive(ws), "the webServer process is still running");
  assert.equal(fs.existsSync(path.join(r, "company/reviews", SLUG)), false, "qa-record must not run while stopping");
});

test("orchestration: SIGTERM with a runner that ignores signals: SIGKILL after the grace, then the onExit port sweep", async () => {
  const r = fakeRepo();
  const port = await freePortNow();
  const { spawn } = await import("node:child_process");
  const child = spawn(process.execPath, [QA, SLUG, `--repo=${r}`, `--port=${port}`], { env: { ...process.env, ...stubEnv(r, { STUB_PW_LEAK: "1", STUB_PW_SLEEP: "30000", STUB_PW_DEAF: "1" }) }, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "";
  child.stdout.on("data", (d) => (stdout += d));
  const pidFile = path.join(r, `test-results/meta-${SLUG}/webserver.pid`);
  const t0 = Date.now();
  while (Date.now() - t0 < 15_000 && !(fs.existsSync(pidFile) && portListeners(port).length)) await new Promise((res) => setTimeout(res, 100));
  const ws = Number(fs.readFileSync(pidFile, "utf8"));
  const t1 = Date.now();
  child.kill("SIGTERM");
  const code = await new Promise((res) => child.on("close", res));
  assert.equal(code, 3);
  assert.ok(Date.now() - t1 >= 4500, `the grace period was skipped (${Date.now() - t1} ms): ${stdout.slice(-800)}`);
  assert.match(JSON.parse(stdout.trim().split("\n").at(-1)).findings[0].message, new RegExp(`killed 1 leftover listener\\(s\\) on port ${port}`));
  assert.deepEqual(portListeners(port), []);
  await new Promise((res) => setTimeout(res, 200));
  assert.ok(!alive(ws));
});

// ------------------------------------------------------------------ 3 real (opt-in)

const REAL = process.env.S3C_QA_REAL;
test("real: qa.mjs on a published lesson in a throwaway worktree", { skip: !REAL && "set S3C_QA_REAL=<throwaway worktree>", timeout: 1_500_000 }, () => {
  const slug = process.env.S3C_QA_SLUG ?? "scoops-in-three-cups";
  const dist = process.env.S3C_QA_DIST ?? `.next-meta-${slug}`;
  const args = [slug, `--repo=${REAL}`, `--dist=${dist}`, "--walk", ...(process.env.S3C_QA_REAL_BUILD ? [] : ["--no-build"])];
  try {
    const res = run(args);
    assert.equal(res.exit, 0, res.stdout.slice(-3000));
    assert.equal(res.json.record.result, "pass");
    assert.equal(res.json.revealFit.exit, 0);
    assert.equal(res.json.walk.ok, true);
    assert.equal(res.json.serveStop.stopped, true);
    console.log(`# real timings ${JSON.stringify(res.json.timings)} distBytes ${res.json.distBytes}`);
  } finally {
    // Undo qa-record's writes: the evidence link in meta.json and the new record.
    execFileSync("git", ["-C", REAL, "checkout", "--", "src/demos"]);
    execFileSync("git", ["-C", REAL, "clean", "-fdq", "--", `company/reviews/${slug}`]);
  }
});
