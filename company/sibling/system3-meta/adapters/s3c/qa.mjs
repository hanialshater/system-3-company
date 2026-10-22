#!/usr/bin/env node
// qa.mjs: the System 3 Meta adapter for stage 3 "qa" (plan 2026-10-21-m4-m7-plan.md §2 row 3, §4 row `qa.mjs`).
// It runs the company's own browser gates for ONE lesson, in this order, and re-implements none of them:
//
//   1 build    `npm run build` (editorial:account && registry && next build) with a per-order NEXT_DIST_DIR (K5)
//   2 qa       `playwright test tests/qa/contract.spec.ts` with QA_ONLY=<slug> QA_OUT=<dir> QA_PORT=<p>
//   3 record   `node tools/company.mjs qa-record` (writes company/reviews/<slug>/<date>-qa.md, links evidence.qa)
//   4 serve    `tools/serve.sh start <port> <dist>`
//   5 fit      `node tools/reveal-fit.mjs --url <base> <slug>` (W-135; demo-standard Pre-flight 7)
//   6 a11y     `node tools/a11y-scan.mjs <slug> --base=<base>` (advisory: the publish gate does not require it)
//   7 walk     only with --walk: walkthrough.mjs on the same server (plan §4: "reuses qa's server")
//   finally    `tools/serve.sh stop <port>`
//
//   node qa.mjs <slug> [--repo=<path>] [--dist=<dir>] [--qa-out=<rel dir>] [--port=<p>] [--serve-port=<p>]
//                      [--no-build] [--walk] [--no-a11y] [--keep-build-changes]
//
// --no-build reuses the dist only when it is provably the build of the current tree: qa.mjs writes a source stamp
// into the dist after each build (lib/build-stamp.mjs) and --no-build recomputes and compares it, else stage-error
// (review 2026-10-22 finding 1: a lesson that throws on render passed on the previous run's dist).
//
// Pass (plan §2 row 3) = the new QA record reads `result: **pass**` AND `lesson version: v<meta.version>` AND
// reveal-fit exits 0 for exactly this lesson AND the company's own QA decision (tools/lib/readiness.mjs decideQa,
// via readiness() + loadContext(), the code launchGates runs) agrees that the lesson's QA is ready. Contract: the LAST stdout line is one JSON object {ok, findings[],
// ...}; exit 0 pass, 1 revise (lesson defects, route build), 2 usage, 3 stage-error (environment; plan §2: "exit 3 =
// no evidence, stage errors, not revise"). It writes: the build dir, QA_OUT, the QA record + meta.json evidence.qa
// (company qa-record's own writes), artifacts/ (gitignored). Run it in an order worktree, never the main checkout.
//
// Company behaviour this relies on, read at 23aaeba66:
// - playwright.config.ts: webServer `npx next start -p ${QA_PORT}` (NEXT_DIST_DIR honoured by next.config.mjs
//   distDir), never reused unless QA_REUSE_SERVER=1 (W-851), skipped when QA_BASE_URL is set; JSON report at
//   `${QA_OUT}/qa-report.json`; config.metadata.qaStamp = gitStamp(tests/qa, playwright.config.ts) and the stamp is
//   INHERITED from env S3_QA_STAMP when set. So QA_BASE_URL, QA_REUSE_SERVER and S3_QA_STAMP are removed from the
//   child env: an inherited stamp would vouch for a harness this run did not check.
// - tests/qa/lessons.ts filters by QA_ONLY and drops retired lessons; feed.spec.ts must run WITHOUT QA_ONLY, so only
//   contract.spec.ts is named.
// - company.mjs cmdQaRecord: reads rel(QA_OUT, "qa-report.json") = path.join(ROOT, QA_OUT), so QA_OUT must be
//   repo-relative (an absolute path would be joined under ROOT). It records every slug in the report, prints
//   `pass|fail <slug> → <file>`, writes `<UTC date>-qa.md` (overwriting a same-day record), and links it into
//   evidence.qa only on pass with 0 retries. It does NOT read qaStamp (playwright.config.ts says reading it is only
//   proposed), so this adapter refuses to record a report whose qaStamp.clean is not true. A stale report from an
//   earlier run would be recorded as new, so qa-report.json is deleted before playwright runs.
// - reveal-fit: exit 0 iff pass === lessons, 1 otherwise, 2 usage, 3 when its own file differs from HEAD (tool
//   stamp). An unknown slug gives lessons 0 and exit 0, so `lessons === 1` is checked too. It reads src/demos
//   relative to cwd, so cwd = repo.
// - a11y-scan: exits 0 even when lessons fail (1 only on a crash); verdictAuto is read from its --out JSON.
// - npm run build modifies two tracked files as a side effect (measured 2026-10-21): tsconfig.json (next adds
//   `<dist>/types/**/*.ts` for a custom distDir) and src/data/editorial-profiles.account.json (regenerated). Both are
//   restored when they were clean before the build, so K7's per-stage commit carries only the QA record and meta.json
//   (--keep-build-changes keeps them).
// - company.mjs:152 `const QA_INDEPENDENT_SINCE = null;` (AMD-010 part 3 step 10, not ratified): when set,
//   qaRecorderRule refuses records without `recorded by: qa-tester` + `kind: independent`, and qa-record writes
//   neither. Plan §6 risk 4: qa.mjs reads the constant from the source at run start (it is not exported) and returns
//   stage-error unless it is still null (and when the line cannot be found: fail closed). READINESS_SINCE
//   (company.mjs:146) is read the same way and passed to loadContext as versionSince, as readinessOpts() does.
// - readiness decideQa takes the newest-dated group of QA_FILE records (linked or not) and prefers a fail within one
//   day; qa-record overwrites only its own `<date>-qa.md`, so a same-day `<date>-qa-rerun.md` fail or a later-dated
//   record can outvote the new pass (review 2026-10-22 finding 5). The adapter runs that decision and blocks
//   (route qa) when it is not ready, so stage 3 never passes on a record the ship gate (stage 8) would refuse.
// - playwright's webServer is detached (its own group); the step gets SIGINT on a signal or timeout (lib/proc.mjs
//   runStep stopSignal) and qa.mjs sweeps QA_PORT afterwards (killPortListeners, repo-cwd processes only).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
import { DEFAULT_REPO, F, verdict, parseArgs, SLUG_RE, findLesson, git, headSha, dirty, turbopackProblem, baseEnv, companyServerLib, runStep, lastLines, serveStart, serveStop, onExit, installSignalCleanup, isStopping, killPortListeners, duBytes } from "./lib/proc.mjs";
import { BUILD_SIDE_EFFECTS, sourceState, clearBuildStamp, writeBuildStamp, checkBuild, changedSince } from "./lib/build-stamp.mjs";
import { walkAt, emit } from "./walkthrough.mjs";

export const TIMEOUTS = { build: 20 * 60_000, qa: 10 * 60_000, record: 60_000, fit: 5 * 60_000, a11y: 5 * 60_000 };
// Paths whose dirtiness makes the evidence worthless: qaStamp covers tests/qa + playwright.config.ts (clean:false =
// "not evidence for a QA record"), reveal-fit's tool stamp covers its own file (exit 3).
export const STAMPED = ["tests/qa", "playwright.config.ts", "tools/reveal-fit.mjs"];
export { BUILD_SIDE_EFFECTS };

/**
 * The two company.mjs constants qa.mjs depends on, read from its source (neither is exported). Returns
 * {independentSince, readinessSince, problem}; problem when a line is missing or malformed (fail closed).
 */
export function companyQaConstants(src) {
  const ind = src.match(/^const QA_INDEPENDENT_SINCE = (null|"(\d{4}-\d{2}-\d{2})");/m);
  const rs = src.match(/^const READINESS_SINCE = (null|"(\d{4}-\d{2}-\d{2})");/m);
  if (!ind || !rs) return { problem: `tools/company.mjs has no readable ${!ind ? "QA_INDEPENDENT_SINCE" : "READINESS_SINCE"} line; the QA recorder rule cannot be checked (plan §6 risk 4)` };
  return { independentSince: ind[2] ?? null, readinessSince: rs[2] ?? null, problem: null };
}

/** The company's QA decision for this lesson (tools/lib/readiness.mjs, the code launchGates runs). {ready, reason, latest} */
export async function companyQaDecision(repo, slug, meta, readinessSince) {
  const R = await import(pathToFileURL(path.join(repo, "tools/lib/readiness.mjs")).href);
  const m = { ...meta, slug: meta.slug ?? slug };
  // holds: {} (a hold is the publish gate's business, not stage 3's); recorder: null is exactly qaRecorderRule's
  // answer while QA_INDEPENDENT_SINCE is null, which companyQaConstants has asserted before this runs.
  const ctx = R.loadContext(repo, m, { holds: {}, isAncestor: R.gitAncestry(repo), versionSince: readinessSince, recorder: null });
  return R.readiness(m, ctx).qa;
}

/** Per-slug results from a Playwright JSON report, walked the way cmdQaRecord walks it (suite trail, contract.spec.ts). */
export function reportRuns(report, slug) {
  const runs = [];
  const walk = (suite, trail) => {
    for (const s of suite.suites ?? []) walk(s, [...trail, s.title]);
    for (const spec of suite.specs ?? []) {
      if (!trail.some((t) => t.endsWith("contract.spec.ts")) || trail.at(-1) !== slug) continue;
      for (const t of spec.tests ?? []) {
        const last = t.results?.at(-1);
        runs.push({ project: t.projectName, status: last?.status ?? "unknown", retries: Math.max(0, (t.results?.length ?? 1) - 1), error: (last?.error?.message ?? "").replace(/\x1b\[[0-9;]*m/g, "").split("\n").slice(0, 3).join(" ") });
      }
    }
  };
  walk(report, []);
  return runs;
}

/** The record line cmdQaRecord writes: `... · lesson version: vN · result: **pass|fail**`. */
export function parseRecord(text) {
  return { version: Number(text.match(/lesson version: v(\d+)/)?.[1] ?? NaN), result: text.match(/result: \*\*(pass|fail)\*\*/)?.[1] ?? null, recorder: /recorded by: qa-tester \(company qa-record\)/.test(text) };
}

/** Findings from a reveal-fit result row (tools/reveal-fit.mjs: pass bar = no error, verdict !== clip, no thumb). */
export function fitFindings(r) {
  const f = [];
  if (r.error) f.push(F.block("reveal-fit", `reveal-fit could not reach the reveal: ${r.error}`));
  else {
    if (r.verdict === "clip") f.push(F.block("reveal-fit", `reveal is clipped on a 390x844 phone (hidden ${r.hiddenBelow}px, nothing scrolls to it; W-135)`));
    if (r.thumb) f.push(F.block("reveal-fit", `stage is a thumbnail at the reveal (stage ${r.stageH}px, picture ${r.picH}px at scale ${r.picScale})`));
    if (!r.phoneFit) f.push(F.advisory("phone-fit", `phoneFit false: crop ${r.crop}px, hiddenBelow ${r.hiddenBelow}px, namedHidden ${r.namedHidden} (demo-standard Pre-flight 7; exit bar only with --strict)`));
  }
  return f;
}

/** a11y verdictAuto → advisory findings (plan §2 row 3: "a11y verdictAuto passed as advisory findings"). */
export function a11yFindings(res) {
  if (!res) return [F.advisory("a11y", "a11y-scan produced no result for this lesson")];
  const lesson = (res.findings ?? []).filter((x) => x.origin === "lesson" && x.severity !== "manual");
  return [F.advisory("a11y", `a11y verdictAuto: ${res.verdictAuto} (lesson fail ${res.counts?.lessonFail ?? "?"}, fix ${res.counts?.lessonFix ?? "?"})`), ...lesson.slice(0, 8).map((x) => F.advisory("a11y", `${x.severity} ${x.check}: ${x.message}`))];
}

export async function qa(repo, slug, opt) {
  const t0 = Date.now();
  const timings = {};
  const findings = [];
  const out = { stage: "qa", slug };
  const done = (extra = {}) => {
    const v = verdict(findings);
    timings.total = Date.now() - t0;
    return { exit: v.exit, out: { ok: v.ok, ...out, ...extra, timings, findings } };
  };

  // ---- preflight: everything that would make the run "no evidence" is checked before 3 minutes of build.
  const L = findLesson(repo, slug);
  if (!L) return findings.push(F.block("lesson", `no lesson ${slug} under src/demos`)), done();
  if (!L.meta) return findings.push(F.block("lesson", `meta.json unreadable: ${L.parseError}`)), done();
  if (L.meta.status === "retired") return findings.push(F.block("lesson", "lesson is retired: tests/qa/lessons.ts skips it, so there is nothing to QA", "park")), done();
  Object.assign(out, { domain: L.domain, version: L.meta.version, head: headSha(repo), dist: opt.dist, qaOut: opt.qaOut });
  // Plan §6 risk 4: the recorder rule must still be off, or qa-record's records would not count (stage-error).
  const consts = companyQaConstants(fs.readFileSync(path.join(repo, "tools/company.mjs"), "utf8"));
  if (consts.problem) return findings.push(F.env("qa-recorder-rule", consts.problem)), done();
  if (consts.independentSince) return findings.push(F.env("qa-recorder-rule", `company.mjs QA_INDEPENDENT_SINCE is ${consts.independentSince}: records from qa-record (no \`kind: independent\`) no longer count for readiness; qa.mjs needs updating before it can record (plan §6 risk 4)`)), done();
  const tp = turbopackProblem(repo);
  if (tp) return findings.push(F.env("node-modules", tp)), done();
  for (const m of ["@playwright/test", "next"]) if (!fs.existsSync(path.join(repo, "node_modules", m, "package.json"))) return findings.push(F.env("node-modules", `node_modules/${m} missing in ${repo}`)), done();
  const stampedDirty = dirty(repo, STAMPED);
  if (stampedDirty.length) return findings.push(F.env("harness-dirty", `harness files differ from HEAD (${stampedDirty.map((d) => d.path).join(", ")}): the QA stamp would be clean:false and reveal-fit exits 3; commit or restore them`)), done();
  const lessonDirty = dirty(repo, [L.rel]);
  if (lessonDirty.length) findings.push(F.advisory("dirty", `the lesson dir has uncommitted changes (${lessonDirty.map((d) => d.path).join(", ")}); the record will not match head ${out.head?.slice(0, 9)} (K7 commits per stage)`));
  const lib = await companyServerLib(repo);
  const qaPort = opt.port ? Number(opt.port) : await lib.freePort();
  let servePort = opt.servePort ? Number(opt.servePort) : await lib.freePort();
  if (servePort === qaPort) servePort = await lib.freePort();
  for (const p of [qaPort, servePort]) if (!(await lib.portIsFree(p))) return findings.push(F.env("port", `port ${p} is in use (W-851): pass free ports`)), done();
  out.ports = { qa: qaPort, serve: servePort };
  const logDir = path.join(repo, opt.qaOut, "logs");
  const env = baseEnv({ NEXT_DIST_DIR: opt.dist });
  for (const k of ["QA_BASE_URL", "QA_REUSE_SERVER", "S3_QA_STAMP", "QA_ONLY"]) delete env[k];

  // ---- 1 build
  if (opt.build) {
    const before = new Set(dirty(repo, BUILD_SIDE_EFFECTS).map((d) => d.path));
    clearBuildStamp(repo, opt.dist); // a failed build must not leave the previous build's stamp vouching for it
    const srcBefore = sourceState(repo, L.rel);
    const b = await runStep("build", "npm", ["run", "build"], { cwd: repo, env, timeoutMs: TIMEOUTS.build, logDir });
    timings.build = b.ms;
    const changed = dirty(repo, BUILD_SIDE_EFFECTS).map((d) => d.path).filter((p) => !before.has(p));
    if (changed.length && !opt.keepBuildChanges) {
      git(repo, ["checkout", "--", ...changed]);
      out.restored = changed;
    }
    if (b.timedOut) return findings.push(F.env("build", `npm run build timed out after ${TIMEOUTS.build / 60000} min`)), done();
    if (b.exit !== 0) {
      // A build error that names this lesson's files is the builder's defect; anything else is the environment
      // (another lesson, a panic, disk). The log has the full text.
      const full = b.log ? fs.readFileSync(b.log, "utf8") : b.tail;
      const mine = full.includes(L.rel + "/") || full.includes(`/d/${slug}`);
      findings.push(mine ? F.block("build", `npm run build failed in this lesson: ${lastLines(b.tail, 4)}`) : F.env("build", `npm run build exited ${b.exit ?? b.signal}: ${lastLines(b.tail, 4)} (log ${path.relative(repo, b.log ?? "")})`));
      return done();
    }
    // Stamp the dist with the source state it was built from, only if nothing changed while next ran (side effects
    // are restored above and excluded from the key anyway). A change mid-build = unknown sources = no evidence.
    const srcAfter = sourceState(repo, L.rel);
    if (srcAfter.key !== srcBefore.key) return findings.push(F.env("build", `sources changed while npm run build ran (${changedSince(repo, srcBefore, srcAfter).slice(0, 8).join(", ")}): the build is of an unknown tree; rerun`)), done();
    out.build = { buildId: writeBuildStamp(repo, opt.dist, srcAfter).buildId, key: srcAfter.key, dirty: srcAfter.dirty, fresh: "built" };
  } else {
    // --no-build: the dist must be the stamped build of this exact tree (review 2026-10-22 finding 1).
    const c = checkBuild(repo, opt.dist, L.rel);
    if (!c.ok) return findings.push(F.env("stale-build", `--no-build refused: ${c.problem}; run without --no-build`)), done();
    out.build = { buildId: c.stamp.buildId, key: c.stamp.key, dirty: c.stamp.dirty ?? {}, fresh: "stamp matches the tree" };
  }
  const distAbs = path.join(repo, opt.dist);
  out.distBytes = duBytes(distAbs);
  // The lesson page is prerendered (generateStaticParams, route /d/[slug]): no page = the registry left it out.
  if (!fs.existsSync(path.join(distAbs, "server/app/d", `${slug}.html`))) findings.push(F.block("build", `the build has no page for /d/${slug} (${opt.dist}/server/app/d/${slug}.html); is the lesson in the registry?`));
  out.buildId = fs.readFileSync(path.join(distAbs, "BUILD_ID"), "utf8").trim();

  // ---- 2 playwright contract QA
  const qaOutAbs = path.join(repo, opt.qaOut);
  fs.mkdirSync(qaOutAbs, { recursive: true });
  fs.rmSync(path.join(qaOutAbs, "qa-report.json"), { force: true });
  onExit(() => killPortListeners(qaPort, repo)); // on a signal: whatever playwright's webServer left on QA_PORT
  const pw = await runStep("qa", path.join(repo, "node_modules/.bin/playwright"), ["test", "tests/qa/contract.spec.ts"], { cwd: repo, env: { ...env, QA_ONLY: slug, QA_OUT: opt.qaOut, QA_PORT: String(qaPort) }, timeoutMs: TIMEOUTS.qa, logDir, stopSignal: "SIGINT" });
  timings.qa = pw.ms;
  // Playwright normally stops its webServer itself; a crash or kill can orphan it (detached group). The port was
  // free at preflight, so a repo-cwd listener on it now is that server.
  const swept = killPortListeners(qaPort, repo);
  if (swept.killed.length) {
    out.qaPortSwept = swept.killed;
    findings.push(F.advisory("qa-port", `playwright left a listener on QA_PORT ${qaPort} (pid ${swept.killed.join(", ")}); killed it`));
  }
  if (isStopping()) return findings.push(F.env("signal", "stopping on a signal")), done();
  out.playwrightExit = pw.exit;
  const reportPath = path.join(qaOutAbs, "qa-report.json");
  if (pw.timedOut) return findings.push(F.env("qa", `playwright timed out after ${TIMEOUTS.qa / 60000} min`)), done();
  if (!fs.existsSync(reportPath)) return findings.push(F.env("qa", `playwright wrote no ${opt.qaOut}/qa-report.json (exit ${pw.exit}): ${lastLines(pw.tail, 4)}`)), done();
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const stamp = report.config?.metadata?.qaStamp ?? null;
  out.qaStamp = stamp && { commit: stamp.commit, clean: stamp.clean };
  if (!stamp || stamp.clean !== true) return findings.push(F.env("qa-stamp", `qa-report qaStamp is ${stamp ? `clean:${stamp.clean} (${stamp.error ?? stamp.modified?.join(", ") ?? ""})` : "missing"}: not evidence for a QA record, so qa-record was not run`)), done();
  const runs = reportRuns(report, slug);
  out.runs = runs.map(({ project, status, retries }) => ({ project, status, retries }));
  if (!runs.length) {
    // An empty report with a real error (webServer failed to start, browser missing) is the environment.
    const err = (report.errors ?? []).map((e) => e.message ?? "").join(" ").replace(/\x1b\[[0-9;]*m/g, "");
    return findings.push(F.env("qa", `the report has no contract test for ${slug} (exit ${pw.exit}): ${(err || lastLines(pw.tail, 4)).slice(0, 400)}`)), done();
  }

  // ---- 3 company qa-record
  const rec = await runStep("qa-record", process.execPath, [path.join(repo, "tools/company.mjs"), "qa-record"], { cwd: repo, env: { ...env, QA_OUT: opt.qaOut }, timeoutMs: TIMEOUTS.record, logDir });
  timings.record = rec.ms;
  const line = rec.stdout.split("\n").find((l) => /^(pass|fail) /.test(l) && l.includes(` ${slug} → `)); // "pass <slug> → <file>"
  const recFile = line?.split(" → ")[1]?.trim();
  if (rec.exit !== 0 || !recFile || !fs.existsSync(path.join(repo, recFile))) return findings.push(F.env("qa-record", `company qa-record did not record ${slug} (exit ${rec.exit}): ${lastLines(rec.tail)}`)), done();
  const parsed = parseRecord(fs.readFileSync(path.join(repo, recFile), "utf8"));
  const metaNow = JSON.parse(fs.readFileSync(L.metaPath, "utf8"));
  out.record = { file: recFile, result: parsed.result, version: parsed.version, linked: (metaNow.evidence?.qa ?? []).includes(recFile) };
  if (parsed.result !== "pass") for (const r of runs.filter((r) => r.status !== "passed" || r.retries)) findings.push(F.block("qa", `${r.project}: ${r.status}${r.retries ? ` after ${r.retries} retr${r.retries === 1 ? "y" : "ies"}` : ""}: ${r.error || "(no error text)"}`.slice(0, 400)));
  if (parsed.result === "pass" && !out.record.linked) findings.push(F.env("qa-record", `${recFile} says pass but is not in evidence.qa`));
  if (parsed.version !== metaNow.version) findings.push(F.block("qa-version", `record says lesson version v${parsed.version}, meta.json is v${metaNow.version}`, "qa"));
  if (parsed.result === "pass") {
    // The stage verdict must be the company's verdict (review 2026-10-22 finding 5): decideQa over every QA record.
    let dq = null;
    try {
      dq = await companyQaDecision(repo, slug, metaNow, consts.readinessSince);
    } catch (e) {
      findings.push(F.env("qa-readiness", `tools/lib/readiness.mjs could not decide QA: ${e.message}`));
    }
    if (dq) {
      out.companyQa = { ready: dq.ready, reason: dq.reason, latest: dq.latest?.f ?? null };
      if (!dq.ready) findings.push(F.block("qa-readiness", `the new record passes, but the company's QA decision is not ready: ${dq.reason}${dq.latest?.f && dq.latest.f !== recFile ? ` (decided by ${dq.latest.f})` : ""}`, "qa"));
    }
  }

  // ---- 4..7 against one served build; the server is stopped in finally whatever happens
  onExit(() => serveStop(repo, servePort));
  try {
    let served;
    try {
      served = await serveStart(repo, servePort, opt.dist, { env });
    } catch (e) {
      findings.push(F.env("server", e.message));
      return done();
    }
    timings.serve = served.ms;
    out.url = served.url;
    if (served.warning) findings.push(F.advisory("stale-build", `serve.sh: ${served.warning}`));

    const fitOut = path.join(opt.qaOut, `reveal-fit-${slug}.json`);
    const fit = await runStep("reveal-fit", process.execPath, [path.join(repo, "tools/reveal-fit.mjs"), "--url", served.url, slug, "--jobs", "1", "--out", fitOut], { cwd: repo, env, timeoutMs: TIMEOUTS.fit, logDir });
    timings.revealFit = fit.ms;
    let summary = null;
    try {
      summary = JSON.parse(fit.stdout.trim().split("\n").at(-1));
    } catch {}
    out.revealFit = { exit: fit.exit, summary, file: fitOut };
    if (fit.timedOut) findings.push(F.env("reveal-fit", "reveal-fit timed out"));
    else if (fit.exit === 3 || fit.exit === 2) findings.push(F.env("reveal-fit", `reveal-fit exit ${fit.exit} (${fit.exit === 3 ? "tool stamp: its file differs from HEAD or the run is outside a git checkout" : "usage"}): ${lastLines(fit.tail)}`));
    else if (!summary || summary.lessons !== 1) findings.push(F.env("reveal-fit", `reveal-fit measured ${summary?.lessons ?? "no"} lessons, expected 1 (exit ${fit.exit}): ${lastLines(fit.tail)}`));
    else if (summary.tool?.clean !== true) findings.push(F.env("reveal-fit", "reveal-fit ran unstamped (tool.clean false): not evidence"));
    else {
      let rows = [];
      try {
        rows = JSON.parse(fs.readFileSync(path.join(repo, fitOut), "utf8")).results ?? [];
      } catch {}
      const row = rows.find((r) => r.slug === slug);
      // Exit code is the bar (plan §2 row 3: "reveal-fit exit 0"); the row only explains a failure and adds advisories.
      const ff = row ? fitFindings(row) : [];
      findings.push(...(fit.exit === 0 ? ff.filter((f) => f.severity === "advisory") : ff));
      if (fit.exit !== 0 && !ff.some((f) => f.severity === "block")) findings.push(F.block("reveal-fit", `reveal-fit exit ${fit.exit ?? fit.signal}: ${lastLines(fit.tail)}`));
    }

    if (opt.a11y) {
      const a11yOut = path.join(opt.qaOut, `a11y-${slug}.json`);
      const a = await runStep("a11y-scan", process.execPath, [path.join(repo, "tools/a11y-scan.mjs"), slug, `--base=${served.url}`, `--out=${a11yOut}`, "--workers=1"], { cwd: repo, env, timeoutMs: TIMEOUTS.a11y, logDir });
      timings.a11y = a.ms;
      let res = null;
      try {
        res = JSON.parse(fs.readFileSync(path.join(repo, a11yOut), "utf8")).results?.find((r) => r.slug === slug) ?? null;
      } catch {}
      out.a11y = { exit: a.exit, verdictAuto: res?.verdictAuto ?? null, counts: res?.counts ?? null, file: a11yOut };
      findings.push(...(a.exit === 0 ? a11yFindings(res) : [F.advisory("a11y", `a11y-scan exit ${a.exit ?? a.signal}${a.timedOut ? " (timeout)" : ""}: ${lastLines(a.tail)}`)]));
    }

    if (opt.walk) {
      const w = await walkAt(repo, slug, served.url, { logDir, build: { dist: opt.dist, ...out.build } });
      timings.walk = w.out.ms;
      out.walk = { ok: w.out.ok, exit: w.exit, transcript: w.out.transcript, sheet: w.out.sheet, screenshots: w.out.screenshots, stamp: w.out.stamp, findings: w.out.findings };
      // The walk is its own stage (4): its result rides along but does not decide qa's verdict.
    }
    out.serveStop = serveStop(repo, servePort);
    return done();
  } finally {
    serveStop(repo, servePort); // a no-op once stopped (no pid file); the real stop on any throw above
  }
}

const USAGE = "usage: qa.mjs <slug> [--repo=<path>] [--dist=<dir>] [--qa-out=<repo-relative dir>] [--port=<p>] [--serve-port=<p>] [--no-build] [--walk] [--no-a11y] [--keep-build-changes]";
const FLAGS = ["repo", "positional", "dist", "qa-out", "port", "serve-port", "no-build", "walk", "no-a11y", "keep-build-changes"];

export async function main(argv) {
  const o = parseArgs(argv);
  const repo = path.resolve(String(o.repo ?? DEFAULT_REPO));
  const usage = (message) => ({ exit: 2, out: { ok: false, findings: [F.env("usage", message)], usage: USAGE } });
  for (const k of Object.keys(o)) if (!FLAGS.includes(k)) return usage(`unknown flag --${k}`);
  const [slug, ...extra] = o.positional;
  if (!slug || extra.length || !SLUG_RE.test(slug)) return usage("one kebab-case <slug> is required");
  for (const k of ["port", "serve-port"]) if (o[k] !== undefined && !/^\d+$/.test(String(o[k]))) return usage(`--${k} must be a number`);
  // Plan K5 env first (NEXT_DIST_DIR, QA_OUT, QA_PORT are what the order workspace sets), then flags, then defaults.
  const dist = typeof o.dist === "string" ? o.dist : process.env.NEXT_DIST_DIR || `.next-meta-${slug}`;
  const qaOut = typeof o["qa-out"] === "string" ? o["qa-out"] : process.env.QA_OUT || `test-results/meta-${slug}`;
  if (path.isAbsolute(qaOut) || qaOut.split(/[\\/]/).includes("..")) return usage("--qa-out / QA_OUT must be repo-relative (company qa-record joins it under the repo root)");
  if (path.isAbsolute(dist) || dist.split(/[\\/]/).includes("..") || !/^\.next/.test(dist)) return usage("--dist must be a repo-relative .next* dir (gitignored: .next/ and .next-*/)");
  if (!fs.existsSync(path.join(repo, "tools/company.mjs")) || !fs.existsSync(path.join(repo, "playwright.config.ts"))) return { exit: 3, out: { ok: false, findings: [F.env("repo", `${repo} is not a System 3 Company checkout`)] } };
  return qa(repo, slug, { dist, qaOut, port: o.port ?? process.env.QA_PORT, servePort: o["serve-port"], build: o["no-build"] !== true, walk: o.walk === true, a11y: o["no-a11y"] !== true, keepBuildChanges: o["keep-build-changes"] === true });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  installSignalCleanup(emit);
  let r;
  try {
    r = await main(process.argv.slice(2));
  } catch (e) {
    r = { exit: 3, out: { ok: false, findings: [F.env("crash", e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e))] } };
  }
  if (!isStopping()) {
    emit(r.out);
    process.exitCode = r.exit;
  } // else the signal handler emits the last line and exits 3
}
