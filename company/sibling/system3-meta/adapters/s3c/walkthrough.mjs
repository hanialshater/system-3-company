#!/usr/bin/env node
// walkthrough.mjs: the System 3 Meta adapter for stage 4 "walk" (plan 2026-10-21-m4-m7-plan.md §2 row 4, §4 row
// `walkthrough.mjs`). It wraps `npm run walkthrough -- <slug> --url <base>` (tools/walkthrough.mjs), the learner-eye
// artifact the fact-checker and learner-evaluator read FIRST (CLAUDE.md "Evaluators see the artifact before the
// account"; plan §2: walk comes before check for that reason).
//
//   node walkthrough.mjs <slug> --url=<base> [--dist=<distDir>] [--repo=<path>]  use a server already up (qa.mjs
//                                                                     --walk calls walkAt in-process the same way)
//   node walkthrough.mjs <slug> [--dist=<distDir>] [--port=<p>]       start tools/serve.sh on the qa build, stop it
//   node walkthrough.mjs <slug> --verify [--repo=<path>]              is the recorded walkthrough still current?
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], ...}; exit 0 pass, 1 revise, 2 usage,
// 3 stage-error (environment: no build, server or browser failed; not a revise loop).
//
// Why each rule (all read from tools/walkthrough.mjs at 23aaeba66):
// - The tool exits 1 for usage, 2 when the server fails, otherwise 0 EVEN WHEN the run aborted: it catches the
//   error, appends "**Walkthrough aborted:** <msg>" to transcript.md and still writes it. So exit 0 is not a pass;
//   the transcript is parsed. Aborted = block (the evaluators get no usable artifact), route build.
// - "**The reveal never unlocked during this walkthrough.**" and "## Page errors" are what a learner would hit;
//   they are advisory here because the QA contract (stage 3) is the gate for both and the evaluator judges them.
// - It clears old .png frames but overwrites transcript.md in place, so freshness is checked by mtime >= start.
// - It writes no SHA. Plan §2 row 4 needs "transcript.md + sheet.png exist for the current worktree SHA", so this
//   adapter writes a stamp OUTSIDE the evaluator's pack dir (artifacts/walkthroughs/<slug>/ is the learner pack,
//   plan §2 row 6, K6): artifacts/meta-stamps/walkthrough-<slug>.json {head, version, sha256 of both files}.
//   artifacts/ is gitignored, so the stamp never enters a commit (K7).
// - Build freshness (review 2026-10-22 finding 2: the standalone walk served whatever was in the dist and stamped
//   HEAD over it). A walk is only stamped when the build it walked is provably the build of the current tree:
//   the dist's source stamp (lib/build-stamp.mjs, written by qa.mjs after its build) matches the tree now
//   (checkBuild), AND the server answers /d/<slug> with that dist's BUILD_ID (so a --url server is the build we
//   checked; next's app-router HTML carries the build id in its flight data). The walk stamp records
//   build {dist, buildId, key}. Standalone: a stale or unstamped dist is a revise routed to qa (stage 3 rebuilds
//   and re-records), a missing dist is a stage-error. --url without --dist walks but writes no stamp (advisory),
//   so --verify fails until a walk on a checked build exists.
// - --verify passes while what the learner sees is unchanged: the stamp carries a checked build, stamp head is
//   HEAD or an ancestor of it, no build input changed since (committed or not) outside company/ and except the
//   lesson's meta.json, and meta.version is unchanged (a learner-visible meta change bumps the version: the
//   company's current-version rule, tools/lib/readiness.mjs). The fact-check commit (K7, stage 5) edits meta.json
//   claim statuses after the walk, which is why meta.json is exempt and the version is compared. company/ is
//   exempt because later stages write reviews and records there; the build key still covers it (lib/build-stamp).
//   Before the review only the lesson dir was compared, so a src/kit change slipped past --verify.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_REPO, F, verdict, parseArgs, SLUG_RE, findLesson, git, headSha, dirty, baseEnv, companyServerLib, runStep, lastLines, serveStart, serveStop, onExit, installSignalCleanup, isStopping, sha256File } from "./lib/proc.mjs";
import { checkBuild, excluded, workingChanges, sourceState } from "./lib/build-stamp.mjs";

export const TIMEOUT_MS = 5 * 60_000; // one lesson walks in ~15-40 s (measured below); 5 min means something hung

export const stampPath = (repo, slug) => path.join(repo, "artifacts", "meta-stamps", `walkthrough-${slug}.json`);
export const outDir = (repo, slug) => path.join(repo, "artifacts", "walkthroughs", slug);

/** Reads what a finished tools/walkthrough.mjs run left: findings from the transcript text (see header). */
export function parseTranscript(text) {
  const findings = [];
  const abort = text.match(/\*\*Walkthrough aborted:\*\*\s*(.*)/);
  if (abort) findings.push(F.block("walkthrough-aborted", `walkthrough aborted: ${abort[1].trim()}`, "build"));
  if (/\*\*The reveal never unlocked during this walkthrough\.\*\*/.test(text)) findings.push(F.advisory("reveal-locked", "the reveal never unlocked on the QA-contract path (first 16 controls once, sliders two steps)"));
  const pe = text.split(/^## Page errors\s*$/m)[1];
  if (pe) for (const l of pe.split("\n").filter((x) => x.startsWith("- ")).slice(0, 5)) findings.push(F.advisory("page-error", l.slice(2)));
  return { findings, title: text.match(/^# Walkthrough: (.*)$/m)?.[1] ?? null, steps: (text.match(/^### Step \d+/gm) ?? []).length, revealed: /^## 3\. Reveal$/m.test(text) && !/never unlocked/.test(text) };
}

/**
 * Does the server at `url` serve the build `buildId`? Fetches /d/<slug> (the prerendered lesson page) and looks for
 * the id in the HTML. {ok, problem}. next 16 app router: the id rides in the RSC flight data as `"b":"<id>"`.
 */
export async function servesBuild(url, slug, buildId) {
  try {
    const res = await fetch(`${url}/d/${slug}`, { signal: AbortSignal.timeout(15_000) });
    const html = await res.text();
    if (!res.ok) return { ok: false, problem: `${url}/d/${slug} answered ${res.status}` };
    return html.includes(buildId) ? { ok: true } : { ok: false, problem: `${url}/d/${slug} does not carry BUILD_ID ${buildId}: the server is not serving the checked build` };
  } catch (e) {
    return { ok: false, problem: `${url}/d/${slug} unreachable: ${e.message}` };
  }
}

/**
 * Runs the company walkthrough against `url` (a server someone else owns: never stopped here). Returns {exit, out}.
 * cwd must be the repo: the tool writes artifacts/walkthroughs/<slug>/ relative to cwd.
 * build: {dist, buildId, key} of a build checked fresh by the caller (qa.mjs after its build or --no-build check,
 * walkServed, or main for --url --dist). Without it the walk runs but no stamp is written (see header).
 */
export async function walkAt(repo, slug, url, { logDir, build = null } = {}) {
  const L = findLesson(repo, slug);
  if (!L?.meta) return { exit: 1, out: { ok: false, stage: "walk", slug, findings: [F.block("lesson", L ? `meta.json unreadable: ${L.parseError}` : `no lesson ${slug} under src/demos`)] } };
  if (build?.buildId) {
    const sb = await servesBuild(url, slug, build.buildId);
    if (!sb.ok) return { exit: 3, out: { ok: false, stage: "walk", slug, url, findings: [F.env("server-build", sb.problem)] } };
  }
  const t0 = Date.now();
  const startMs = Math.floor(t0 / 1000) * 1000; // mtime resolution guard
  const r = await runStep("walkthrough", "npm", ["run", "--silent", "walkthrough", "--", slug, "--url", url], { cwd: repo, env: baseEnv(), timeoutMs: TIMEOUT_MS, logDir });
  const base = { stage: "walk", slug, version: L.meta.version, head: headSha(repo), url, ms: r.ms };
  if (r.timedOut) return { exit: 3, out: { ok: false, ...base, findings: [F.env("walkthrough", `walkthrough timed out after ${TIMEOUT_MS / 1000} s: ${lastLines(r.tail)}`)] } };
  // tools/walkthrough.mjs: exit 2 = the server at --url never answered (waitFor 10 s) or startNext failed.
  if (r.exit === 2) return { exit: 3, out: { ok: false, ...base, findings: [F.env("server", `walkthrough could not reach ${url}: ${lastLines(r.tail)}`)] } };
  if (r.exit !== 0) return { exit: 3, out: { ok: false, ...base, findings: [F.env("walkthrough", `walkthrough exited ${r.exit ?? r.signal}: ${lastLines(r.tail)}`)] } };
  const dir = outDir(repo, slug);
  const tp = path.join(dir, "transcript.md");
  const sp = path.join(dir, "sheet.png");
  const fresh = (p) => fs.existsSync(p) && fs.statSync(p).mtimeMs >= startMs;
  if (!fresh(tp)) return { exit: 3, out: { ok: false, ...base, findings: [F.env("walkthrough", `exit 0 but no fresh ${path.relative(repo, tp)}`)] } };
  const text = fs.readFileSync(tp, "utf8");
  const parsed = parseTranscript(text);
  const findings = [...parsed.findings];
  // contactSheet() returns without writing sheet.png when there are no frames: an abort before the first snap.
  if (!fresh(sp) && !parsed.findings.some((f) => f.kind === "walkthrough-aborted")) findings.push(F.block("walkthrough-sheet", "no fresh sheet.png: the walkthrough captured no frames", "build"));
  const shots = Number(r.stdout.match(/and (\d+) screenshots/)?.[1] ?? NaN);
  const lessonDirty = dirty(repo, [L.rel]);
  if (lessonDirty.length) findings.push(F.advisory("dirty", `the lesson dir has uncommitted changes (${lessonDirty.map((d) => d.path).join(", ")}); head ${base.head?.slice(0, 9)} does not describe what was walked (K7 commits per stage)`));
  // The tree must still be the checked build's tree after the walk (it ran for ~15 s; an edit meanwhile = unknown).
  if (build?.key && sourceState(repo, L.rel).key !== build.key) findings.push(F.env("stale-build", "sources changed while the walk ran: the transcript is of the checked build, but the tree no longer is; walk again"));
  if (!build?.key) findings.push(F.advisory("build-unknown", `walked ${url} without a checked build (pass --dist with --url, or run it standalone): no stamp written, so --verify will not pass on this walk`));
  const v = verdict(findings);
  let stamp = null;
  if (v.ok && build?.key) {
    stamp = { slug, head: base.head, dirty: lessonDirty.map((d) => d.path), version: L.meta.version, url, build: { dist: build.dist ?? null, buildId: build.buildId, key: build.key, dirty: build.dirty ?? {} }, recordedAt: new Date().toISOString(), transcript: path.relative(repo, tp), transcriptSha256: sha256File(tp), sheet: path.relative(repo, sp), sheetSha256: sha256File(sp), screenshots: shots };
    fs.mkdirSync(path.dirname(stampPath(repo, slug)), { recursive: true });
    fs.writeFileSync(stampPath(repo, slug), JSON.stringify(stamp, null, 2) + "\n");
  }
  return {
    exit: v.exit,
    out: { ok: v.ok, ...base, ms: Date.now() - t0, transcript: path.relative(repo, tp), sheet: fs.existsSync(sp) ? path.relative(repo, sp) : null, screenshots: shots, steps: parsed.steps, revealed: parsed.revealed, stamp: stamp ? path.relative(repo, stampPath(repo, slug)) : null, findings },
  };
}

/** Standalone walk: serve the order's build (the dist qa.mjs left), walk, stop the server in finally. */
export async function walkServed(repo, slug, { dist, port, logDir } = {}) {
  const fresh = freshBuild(repo, slug, dist);
  if (!fresh.ok) return fresh.result;
  const lib = await companyServerLib(repo);
  const p = port ? Number(port) : await lib.freePort();
  if (!(await lib.portIsFree(p))) return { exit: 3, out: { ok: false, stage: "walk", slug, findings: [F.env("port", `port ${p} is in use (W-851): pass a free --port`)] } };
  onExit(() => serveStop(repo, p));
  let served;
  try {
    served = await serveStart(repo, p, dist);
  } catch (e) {
    serveStop(repo, p);
    return { exit: 3, out: { ok: false, stage: "walk", slug, findings: [F.env("server", e.message)] } };
  }
  try {
    const r = await walkAt(repo, slug, served.url, { logDir, build: fresh.build });
    r.out.serve = { port: p, dist, startMs: served.ms };
    if (served.warning) r.out.findings.push(F.advisory("stale-build", `serve.sh: ${served.warning}`));
    return r;
  } finally {
    serveStop(repo, p);
  }
}

/**
 * Is <dist> the stamped build of the current tree (lib/build-stamp.mjs checkBuild)? {ok, build} or {ok:false,
 * result}. No dist = stage-error (nothing to walk; qa.mjs makes it); unstamped or stale = revise routed to qa.
 */
export function freshBuild(repo, slug, dist) {
  const L = findLesson(repo, slug);
  const c = checkBuild(repo, dist, L?.rel);
  if (c.ok) return { ok: true, build: { dist, buildId: c.stamp.buildId, key: c.stamp.key, dirty: c.stamp.dirty ?? {} } };
  const finding = c.missing ? F.env("build", `${c.problem} in ${repo}: run qa.mjs first (it builds into the per-order NEXT_DIST_DIR)`) : F.block("stale-build", `${c.problem}; the walk would show the evaluators older code than HEAD (rerun qa, which rebuilds)`, "qa");
  return { ok: false, result: { exit: c.missing ? 3 : 1, out: { ok: false, stage: "walk", slug, dist, findings: [finding] } } };
}

/** --verify (see header): is the recorded walkthrough still what a learner of the current version sees? */
export function verifyStamp(repo, slug) {
  const L = findLesson(repo, slug);
  const out = { stage: "walk-verify", slug };
  if (!L?.meta) return { exit: 1, out: { ok: false, ...out, findings: [F.block("lesson", `no readable lesson ${slug}`)] } };
  const sp = stampPath(repo, slug);
  if (!fs.existsSync(sp)) return { exit: 1, out: { ok: false, ...out, findings: [F.block("walkthrough-missing", `no walkthrough stamp ${path.relative(repo, sp)}: run walkthrough.mjs ${slug}`, "walk")] } };
  const s = JSON.parse(fs.readFileSync(sp, "utf8"));
  const head = headSha(repo);
  const findings = [];
  if (!s.build?.key) findings.push(F.block("walkthrough-unchecked", "the stamped walk has no checked build (stamp predates build stamps): walk again", "walk"));
  // What --verify compares: build inputs (lib/build-stamp.mjs excluded()) outside company/, minus the lesson's
  // meta.json (its version is compared instead). See header.
  const metaRel = `${L.rel}/meta.json`;
  const watched = (f) => f && !excluded(f) && !f.startsWith("company/") && f !== metaRel;
  for (const [file, want] of [[s.transcript, s.transcriptSha256], [s.sheet, s.sheetSha256]]) {
    const p = path.join(repo, file);
    if (!fs.existsSync(p)) findings.push(F.block("walkthrough-missing", `${file} is gone`, "walk"));
    else if (sha256File(p) !== want) findings.push(F.block("walkthrough-changed", `${file} changed since the stamped walkthrough`, "walk"));
  }
  if (s.version !== L.meta.version) findings.push(F.block("walkthrough-stale", `walked v${s.version}, lesson is v${L.meta.version}`, "walk"));
  if (s.head !== head) {
    let ancestor = false;
    try {
      git(repo, ["merge-base", "--is-ancestor", s.head, head]);
      ancestor = true;
    } catch {}
    if (!ancestor) findings.push(F.block("walkthrough-stale", `stamp head ${s.head?.slice(0, 9)} is not an ancestor of HEAD ${head?.slice(0, 9)}`, "walk"));
    else {
      const changed = git(repo, ["diff", "--name-only", "--no-renames", s.head, head]).split("\n").filter(watched);
      if (changed.length) findings.push(F.block("walkthrough-stale", `build inputs changed since the walk: ${changed.slice(0, 8).join(", ")}${changed.length > 8 ? `, +${changed.length - 8} more` : ""}`, "walk"));
    }
  }
  // Uncommitted: a watched path dirty now must have the content it had in the walked build (build.dirty holds the
  // build stamp's path → content id map, lib/build-stamp.mjs diskId); anything else dirty is a change since.
  const walked = s.build?.dirty ?? {};
  const wt = Object.entries(workingChanges(repo)).filter(([p, id]) => watched(p) && walked[p] !== id).map(([p]) => p);
  if (wt.length) findings.push(F.block("walkthrough-stale", `uncommitted build-input changes since the walk: ${wt.slice(0, 8).join(", ")}`, "walk"));
  const v = verdict(findings);
  return { exit: v.exit, out: { ok: v.ok, ...out, head, stampHead: s.head, sameSha: s.head === head, version: L.meta.version, transcript: s.transcript, findings } };
}

const USAGE = "usage: walkthrough.mjs <slug> [--url=<base> [--dist=<distDir>] | --dist=<distDir> [--port=<p>]] [--verify] [--repo=<path>]";

export async function main(argv) {
  const o = parseArgs(argv);
  const repo = path.resolve(String(o.repo ?? DEFAULT_REPO));
  const usage = (message) => ({ exit: 2, out: { ok: false, findings: [F.env("usage", message)], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["repo", "positional", "url", "dist", "port", "verify", "log-dir"].includes(k)) return usage(`unknown flag --${k}`);
  if (o.dist !== undefined && (typeof o.dist !== "string" || path.isAbsolute(o.dist) || o.dist.split(/[\\/]/).includes(".."))) return usage("--dist must be a repo-relative dist dir");
  const [slug, ...extra] = o.positional;
  if (!slug || extra.length || !SLUG_RE.test(slug)) return usage("one kebab-case <slug> is required");
  if (o.url !== undefined && (typeof o.url !== "string" || !/^https?:\/\/[^/]+/.test(o.url))) return usage("--url must be an absolute http(s) base such as http://127.0.0.1:3101");
  if (o.port !== undefined && !/^\d+$/.test(String(o.port))) return usage("--port must be a number");
  if (!fs.existsSync(path.join(repo, "tools/walkthrough.mjs"))) return { exit: 3, out: { ok: false, findings: [F.env("repo", `${repo} is not a System 3 Company checkout (no tools/walkthrough.mjs)`)] } };
  if (o.verify === true) return verifyStamp(repo, slug);
  const L = findLesson(repo, slug);
  if (!L) return { exit: 1, out: { ok: false, stage: "walk", slug, findings: [F.block("lesson", `no lesson ${slug} under src/demos`)] } };
  const logDir = typeof o["log-dir"] === "string" ? path.resolve(o["log-dir"]) : path.join(repo, "artifacts", "meta-logs", `walk-${slug}`);
  // Same per-order dist qa.mjs uses (plan K5 env NEXT_DIST_DIR), so a separate walk job reuses that build.
  const dist = typeof o.dist === "string" ? o.dist : process.env.NEXT_DIST_DIR || `.next-meta-${slug}`;
  if (typeof o.url === "string") {
    // --url with --dist: check that dist like walkServed does, then walkAt checks the server serves its BUILD_ID.
    if (typeof o.dist !== "string") return walkAt(repo, slug, o.url.replace(/\/+$/, ""), { logDir });
    const fresh = freshBuild(repo, slug, dist);
    return fresh.ok ? walkAt(repo, slug, o.url.replace(/\/+$/, ""), { logDir, build: fresh.build }) : fresh.result;
  }
  return walkServed(repo, slug, { dist, port: o.port, logDir });
}

export function emit(out) {
  for (const f of out.findings ?? []) if (f.severity !== "advisory") console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(out));
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
