#!/usr/bin/env node
// publish.mjs: the System 3 Meta ship stage (plan 2026-10-21-m4-m7-plan.md §2 stage 9 "ship", §2 ship routing table,
// §3 K11 routed revise, §4 row `publish.mjs`). It WRITES: meta.json (evidence link, then status), as the company does.
//
//   node publish.mjs <slug> --repo=<order-worktree>
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], ...}. Exit 0 = published (company
// publish exit 0 AND meta.status re-read as "published"; a lesson that was already "published" before the run is
// refused, exit 1, route park, kind already-published: plan §5 M4 gate), 1 = revise (findings with K11 routes; park:true when a
// hold or a fatal verdict blocks), 2 usage (including "not an order worktree"), 3 stage-error (company publish
// crashed, its gate machinery is closed for environment reasons, or its output could not be parsed).
//
// Steps, each checked against the company code:
//   1. Link learner reviews into meta.evidence.simulatedLearner for THIS slug only. tools/publish-ready.mjs --link
//      cannot be limited to one slug: its parseArgs knows only --link/--publish/--help and rejects positionals with
//      exit 2, and main() walks every src/demos/*/*/meta.json and rewrites each one that has unlinked files. So this
//      is the per-slug body of that loop, copied exactly (publish-ready.mjs main(), "const files = …" to writeFileSync):
//        files = readdirSync(company/reviews/<slug>).filter(f => f.includes("learner")).sort()
//        add   = files.map(f => `company/reviews/${slug}/${f}`).filter(p => !have.includes(p))
//        meta.evidence.simulatedLearner = [...have, ...add]; writeFileSync(mp, JSON.stringify(meta, null, 2) + "\n")
//      It writes only when add is non-empty, and runs whatever the status (publish-ready links before its status
//      filter). Note it links every "learner" file, not just the verdict-bearing newest one: the company's
//      readiness reads all of them anyway (readiness.mjs loadContext unions disk and links), so linking changes
//      only claimGates' "no borrowed-mind learner review" floor and the evidence-file-exists check.
//   2. `node tools/company.mjs publish <slug>` with cwd = repo (company.mjs cmdPublish). Its stdout is not a TTY
//      here, so company.mjs's color() is the identity (company.mjs `const color = process.stdout.isTTY ? …`). Output:
//        success  "<slug> published. Record the launch review in company/rituals/records/."  exit 0, meta written
//        refusal  "<slug> cannot publish:" then one "  - <reason>" line per launchGates failure, exit 1, no write
//        unknown  "no lesson <slug>" exit 1 (loadDemos() matches meta.slug, not the directory name)
//   3. Route each "  - <reason>" line (plan §2 table; the sibling gates.mjs routeFor, which refines it):
//        claims not verified / verified without checkedBy / verified by its own builder → check
//        learner review: …  → learner, except "verdict revise" → build and "verdict fatal" → park (plan §2 stage 6),
//                             and those two only when the verdict is for the CURRENT version (see 3a)
//        QA: … / no computer-use QA record / evidence.qa … → qa
//        active publish hold: … → park (+ ask to head-of-product)
//        no claims recorded / evidence.pairwise|humanLearners missing file → build; confidence "**" → park
//      The readinessGates fail-closed lines (canary, unreadable hold file, readiness threw or was malformed) are the
//      gate machinery, not the lesson: stage-error, exit 3, never a revise loop.
//   3a. "learner review: verdict revise|fatal" carries no version. readiness.mjs decide() picks the highest-VERSION
//      review first and reports its verdict before it checks `latest.version !== metaVersion`, so a revise for v2 on a
//      v4 lesson prints "verdict revise", not "verdict is for an older version". That is the common case: the
//      builder already acted on that revise and bumped the version (plan §2 "How revise works"), and no review of
//      the current version exists yet. Routing it to build would spend a builder session and bump the version again
//      for nothing; the missing piece is a learner review of the current version. So when either line appears, this
//      adapter re-runs the company's own decide(loadContext(repo, meta).learner, meta.version, {isAncestor:
//      gitAncestry(repo)}) (the inputs company.mjs readinessGates builds; holds do not touch learner) and keeps build /
//      park only when decide().latest.version === meta.version; otherwise the line routes to learner (the finding
//      gets `stale: {file, version, metaVersion}`). If the recompute does not reproduce the company's line, or the
//      lib does not load, that is a stage-error (exit 3): the route would be a guess.
//      `route` is the single K11 target: park if any finding parks, else the EARLIEST stage in plan §2 order
//      (build < qa < check < learner), because K11 re-runs every stage after the one it routes to.
// Never: `npm run verify`, deploy, vercel, git push, changelog writes (plan §4 row; the changelog line goes in the
// integration handoff). It never commits either (that is K7, the integrator).
//
// Safety: ship writes, so it runs only in a linked order worktree (plan §3 K5). --repo is required (no default), and
// it refuses (exit 2) a primary working tree (git-dir === git-common-dir, e.g. the main checkout
// /home/user/system-3-company) and the shared read-only sandbox DEFAULT_REPO (/home/user/s3c-wt/base) that every
// other adapter defaults to.

import fs from "node:fs";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { DEFAULT_REPO, findLesson, findPublishTarget, routeFor, parseArgs, loadReadinessLib } from "./gates.mjs";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/; // company.mjs cmdNewDemo slug rule
const USAGE = "usage: publish.mjs <slug> --repo=<order-worktree>   (a linked git worktree; never the main checkout or the shared base)";
// Same list as gates.mjs ENV_GATE (not exported there): company.mjs readinessGates' fail-closed branches.
export const ENV_GATE = /^readiness lib failed its known-answer canary|^company\/ops\/publish-holds\.json is unreadable|^readiness check failed to run|^readiness returned a malformed answer/;
const ORDER = ["build", "qa", "check", "learner"]; // plan §2 stage order of the K11 targets ship can route to

// ------------------------------------------------------------------ step 1: link (publish-ready.mjs main, one slug)

/** Returns { linked: string[] } or { error }. Writes meta.json only when something new is linked. */
export function linkLearner(repo, L, slug) {
  const rd = path.join(repo, "company/reviews", slug);
  const files = fs.existsSync(rd) ? fs.readdirSync(rd).filter((f) => f.includes("learner")).sort() : [];
  const meta = L.meta;
  const have = meta.evidence?.simulatedLearner ?? [];
  const add = files.map((f) => `company/reviews/${slug}/${f}`).filter((p) => !have.includes(p));
  if (!add.length) return { linked: [] };
  // publish-ready would throw on `meta.evidence.simulatedLearner = …` with no evidence object; say so instead.
  if (!meta.evidence || typeof meta.evidence !== "object") return { error: "meta.json has no evidence object (template: evidence {qa[], simulatedLearner[], pairwise[], humanLearners[]})" };
  meta.evidence.simulatedLearner = [...have, ...add];
  fs.writeFileSync(path.join(L.dir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  return { linked: add };
}

// ------------------------------------------------------------------ step 3: parse company publish output

/** Pure: parse cmdPublish's stdout. Returns { published, refused, noLesson, reasons[] }. */
export function parsePublish(stdout, slug) {
  const lines = stdout.replace(/\x1b\[[0-9;]*m/g, "").split("\n");
  return {
    published: lines.some((l) => l.startsWith(`${slug} published.`)),
    refused: lines.some((l) => l === `${slug} cannot publish:`),
    noLesson: lines.some((l) => l === `no lesson ${slug}`),
    reasons: lines.filter((l) => l.startsWith("  - ")).map((l) => l.slice(4)),
  };
}

// readiness.mjs readiness(): `learner review: ${decide().reason}`, with reason `verdict ${latest.verdict}` (decide()).
export const LEARNER_VERDICT = /^learner review: verdict (revise|fatal)$/;

/**
 * Pure: reasons → findings, the single K11 route and park. `learner` is { file, version, metaVersion } from the
 * company's decide().latest (step 3a). A revise/fatal line keeps routeFor's build/park only when learner.version ===
 * learner.metaVersion; a stale one, or one with no learner context, goes to learner (a fresh review of the current
 * version re-judges it; plan §2 stage 6 and K11).
 */
export function routeReasons(reasons, learner = null) {
  const current = !!learner && learner.version === learner.metaVersion;
  const findings = reasons.map((m) => {
    if (ENV_GATE.test(m)) return { severity: "environment", kind: "gate-machinery", message: m };
    if (LEARNER_VERDICT.test(m) && !current) {
      const why = learner ? `${learner.file} is for v${learner.version}, meta.json is v${learner.metaVersion}: no learner review of the current version yet` : "the verdict's version was not established";
      return { severity: "block", kind: "launch-gate", route: "learner", message: m, stale: learner ?? null, note: why };
    }
    return { severity: "block", kind: "launch-gate", route: routeFor(m) ?? "build", message: m };
  });
  const routes = [...new Set(findings.map((f) => f.route).filter(Boolean))];
  const park = routes.includes("park");
  const route = park ? "park" : ORDER.find((s) => routes.includes(s)) ?? null;
  return { findings, routes, route, park, env: findings.some((f) => f.severity === "environment") };
}

// ------------------------------------------------------------------ run

function isLinkedWorktree(repo) {
  try {
    const g = (a) => path.resolve(repo, execFileSync("git", ["rev-parse", a], { cwd: repo, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim());
    return g("--git-dir") !== g("--git-common-dir");
  } catch {
    return false;
  }
}

/** Step 3a: the company's own decide() for this lesson. Returns { learner } or { error }. */
async function learnerLatest(repo, meta) {
  let lib;
  try {
    lib = await loadReadinessLib(repo);
  } catch (e) {
    return { error: `tools/lib/readiness.mjs did not load: ${e.message}` };
  }
  const v = meta.version ?? 1; // readiness.mjs readiness(): `meta.version ?? 1`
  const d = lib.decide(lib.loadContext(repo, meta, { holds: {} }).learner, v, { isAncestor: lib.gitAncestry(repo) });
  if (!d.latest) return { error: `decide() found no learner review (${d.reason}) though company publish printed a verdict line` };
  return { learner: { file: d.latest.f, version: d.latest.version, metaVersion: v }, line: `learner review: ${d.reason}` };
}

export async function run(repo, slug) {
  const base = { stage: "ship", slug };
  const L = findLesson(repo, slug);
  if (!L || !L.meta) return { exit: 1, out: { ok: false, ...base, park: false, route: "build", findings: [{ severity: "block", kind: "lesson", route: "build", message: L ? `meta.json unreadable: ${L.parseError}` : `no lesson ${slug} under src/demos/*/` }] } };
  // M4 integrate (plan §5 M4 gate: stage 9 "must refuse already published"): company.mjs cmdPublish runs only
  // launchGates and writes status published whatever the status was, so a lesson that is already published passed
  // here again (ok, exit 0) with nothing shipped by this order. The lesson company publish would act on (meta.slug,
  // loadDemos order) is checked before anything is linked or run, and the refusal parks the order with an ask: there
  // is nothing for build, qa, check or learner to redo (a routed revise would loop), and passing would be a false ship.
  const T = findPublishTarget(repo, slug) ?? L;
  if (T.meta?.status === "published")
    return { exit: 1, out: { ok: false, ...base, version: T.meta.version ?? null, status: "published", park: true, route: "park", routes: ["park"], reasons: [], findings: [{ severity: "block", kind: "already-published", route: "park", message: `already published: ${T.where} is status "published" (v${T.meta.version ?? 1}) before this ship ran; company publish would re-stamp it and exit 0, which is no ship (a change to a published lesson goes back to "review" in build, with a version bump)` }], ask: { kind: "decision", to: "head-of-product", text: `${slug} is already published (v${T.meta.version ?? 1}): nothing for this order to ship. Cancel the order, or reopen it to build for a new version.` } } };
  const lk = linkLearner(repo, L, slug);
  if (lk.error) return { exit: 1, out: { ok: false, ...base, park: false, route: "build", findings: [{ severity: "block", kind: "evidence", route: "build", message: lk.error }] } };

  const t0 = Date.now();
  const p = spawnSync(process.execPath, [path.join(repo, "tools/company.mjs"), "publish", slug], { cwd: repo, encoding: "utf8", timeout: 120_000, stdio: ["ignore", "pipe", "pipe"] });
  const publishMs = Date.now() - t0;
  const stdout = p.stdout ?? "";
  const parsed = parsePublish(stdout, slug);
  const after = findLesson(repo, slug)?.meta ?? null;
  const common = { ...base, linked: lk.linked, version: after?.version ?? L.meta.version, status: after?.status ?? null, publishExit: p.status, publishMs };
  const envFail = (message) => ({ exit: 3, out: { ok: false, ...common, park: false, route: null, findings: [{ severity: "environment", kind: "company-publish", message }] } });

  if (p.error || p.status === null) return envFail(`company publish did not finish: ${p.error?.message ?? `signal ${p.signal}`}`);
  if (p.status === 0 && parsed.published) {
    if (after?.status !== "published") return envFail(`company publish said published but meta.status reads ${after?.status}`);
    return { exit: 0, out: { ok: true, ...common, park: false, route: null, reasons: [], findings: [] } };
  }
  if (parsed.noLesson)
    return { exit: 1, out: { ok: false, ...common, park: false, route: "build", findings: [{ severity: "block", kind: "lesson", route: "build", message: `company publish found no lesson with meta.slug ${slug} (directory src/demos/${L.domainDir}/${slug} has meta.slug ${L.meta.slug})` }] } };
  if (!parsed.refused || !parsed.reasons.length) {
    const tail = (stdout + (p.stderr ?? "")).trim().split("\n").slice(-3).join(" | ");
    return envFail(`company publish exit ${p.status} without a parseable refusal: ${tail}`);
  }
  let learner = null;
  if (parsed.reasons.some((m) => LEARNER_VERDICT.test(m))) {
    // `after` is the meta company publish read (linkLearner already wrote the links); loadContext keys on meta.slug.
    const lt = await learnerLatest(repo, after ?? L.meta);
    if (lt.error) return envFail(lt.error);
    if (!parsed.reasons.includes(lt.line)) return envFail(`step 3a recompute says "${lt.line}", company publish said "${parsed.reasons.find((m) => LEARNER_VERDICT.test(m))}"; the route would be a guess`);
    learner = lt.learner;
  }
  const r = routeReasons(parsed.reasons, learner);
  if (r.env) return { exit: 3, out: { ok: false, ...common, park: false, route: null, reasons: parsed.reasons, routes: r.routes, findings: r.findings } };
  const out = { ok: false, ...common, park: r.park, route: r.route, routes: r.routes, reasons: parsed.reasons, learnerLatest: learner, findings: r.findings };
  const hold = parsed.reasons.find((m) => m.startsWith("active publish hold: "));
  if (hold) out.ask = { kind: "decision", to: "head-of-product", text: `${slug} cannot ship: ${hold}. Lift the hold in company/ops/publish-holds.json, or keep the order parked.` };
  return { exit: 1, out };
}

export async function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, findings: [{ severity: "environment", kind: "usage", message }], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["repo", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  const [slug, ...extra] = o.positional;
  if (!slug || extra.length || !SLUG.test(slug)) return usage("one kebab-case <slug> is required");
  // gates.mjs parseArgs pre-fills repo with DEFAULT_REPO, so "was it given" is read from argv itself.
  if (!argv.some((a) => /^--repo=./.test(a)) || typeof o.repo !== "string") return usage("--repo=<order-worktree> is required: publish writes meta.json");
  const repo = path.resolve(o.repo);
  const real = (p) => { try { return fs.realpathSync(p); } catch { return p; } };
  if (real(repo) === real(DEFAULT_REPO)) return usage(`${repo} is the shared read-only sandbox; make an order worktree (git worktree add) and pass that`);
  if (!fs.existsSync(path.join(repo, "tools/company.mjs")))
    return { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "repo", message: `${repo} is not a System 3 Company checkout (no tools/company.mjs)` }] } };
  if (!isLinkedWorktree(repo)) return usage(`${repo} is not a linked git worktree; publish writes meta.json, so it runs only in an order worktree (plan §3 K5), never in a main checkout`);
  return run(repo, slug);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try {
    r = await main(process.argv.slice(2));
  } catch (e) {
    r = { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "crash", message: e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e) }] } };
  }
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}${f.route ? ` → ${f.route}` : ""}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
