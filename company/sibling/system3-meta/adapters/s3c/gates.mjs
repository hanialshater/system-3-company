#!/usr/bin/env node
// gates.mjs: the System 3 Meta adapter for System 3 Company's code gates (plan 2026-10-21-m4-m7-plan.md §2 stages
// 2 "test1" and 8 "gates/ship", §4 row `gates.mjs`). It wraps the company's own tools and re-implements nothing
// except the claim floor, which tools/company.mjs does not export (and which is protected, so it cannot be made to).
//
//   node gates.mjs <slug> --stage=build [--base=<sha>] [--baseline-file=<baseline.json> [--baseline-repo=<path>]] [--repo=<path>]
//        --baseline-repo: when the baseline file does not exist yet, write it first from `company check` in that
//        checkout (the run's base, e.g. /home/user/s3c-wt/base): the first test1 of a run makes the run's baseline
//   node gates.mjs <slug> --stage=ship  [--repo=<path>]    the lesson `company publish` picks (meta.slug), judged
//                                                            with publish.mjs's pending learner link applied
//   node gates.mjs --baseline [--out=<file>] [--repo=<path>]    company-wide `company check` error count
//   node gates.mjs --parity [--repo=<path>]                      claimFloor / readiness mirror vs `company check`
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], ...}. Exit 0 pass, 1 revise (findings),
// 2 usage, 3 stage-error (environment: the company tool did not run, or this adapter's mirror of company.mjs is out
// of date; the supervisor must not count it as a revise loop). Only node: built-ins and the company's own modules,
// imported by absolute path from --repo (default /home/user/s3c-wt/base). Read-only: `company check` and
// copy-tells write nothing (tools/company.mjs cmdCheck regenerates the registry in memory only, tools/copy-tells.mjs
// only prints), and company.mjs is never imported (it runs its CLI on load: tools/company.mjs "main" block).
//
// A finding is {severity: "block"|"advisory"|"environment", kind, message, route?}. ok = no block/environment
// finding. `route` is the K11 routed-revise target (plan §3 K11) the supervisor may use: build | check | qa |
// learner | park.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL, fileURLToPath } from "node:url";

export const DEFAULT_REPO = "/home/user/s3c-wt/base";

// ------------------------------------------------------------------ pinned mirror of tools/company.mjs
// sha256 (first 16 hex) of each company.mjs function this adapter mirrors, measured at 23aaeba66 (company.mjs last
// changed in aeb637c0). The text is cut from `function <name>(` to the next "\n}\n". If company.mjs changes any of
// them, the mirror may have drifted: ship refuses with a stage-error and --parity reports it, so a stale adapter
// never passes a lesson the company would refuse (or the reverse) silently. Update the copy below, then the hash.
export const PINNED = {
  claimGates: "b15561968406ff39", // copied as claimFloor() below
  readinessGates: "b906b5088ae27d2d", // mirrored in makeReadinessGates()
  readinessCanary: "52960ecb4ed25d35", // copied in canary()
  qaRecorderRule: "dd7042b900760456", // copied in qaRecorderRule()
  readHolds: "cba790a0255824b3", // copied in readHolds()
  readinessOpts: "8d13f49a84a1b1ea", // the opts object built in makeReadinessGates()
  launchGates: "cd717ecec30a8f42", // ship = claimFloor ++ readinessGates, in that order
};

export function fnHash(src, name) {
  const i = src.indexOf(`function ${name}(`);
  if (i < 0) return null;
  const e = src.indexOf("\n}\n", i);
  return e < 0 ? null : crypto.createHash("sha256").update(src.slice(i, e + 2)).digest("hex").slice(0, 16);
}

/** Constants of tools/company.mjs that are not exported, read from its source text (never imported). */
export function companyConstants(repo) {
  const src = fs.readFileSync(path.join(repo, "tools/company.mjs"), "utf8");
  // tools/company.mjs: `const READINESS_SINCE = "2026-10-17";` (AMD-013 A2)
  const since = src.match(/^const READINESS_SINCE = "(\d{4}-\d{2}-\d{2})";/m);
  // `const QA_INDEPENDENT_SINCE = null;` until AMD-010 part 3 is ratified, then a date string
  const indep = src.match(/^const QA_INDEPENDENT_SINCE = (null|"(\d{4}-\d{2}-\d{2})");/m);
  // `const READINESS_GRANDFATHERED = new Set([ ...268 slugs... ]);` check only warns for these (AMD-013)
  const gf = src.match(/^const READINESS_GRANDFATHERED = new Set\(\[([\s\S]*?)\]\);/m);
  const problems = [];
  if (!since) problems.push("READINESS_SINCE not found in tools/company.mjs");
  if (!indep) problems.push("QA_INDEPENDENT_SINCE not found in tools/company.mjs");
  if (!gf) problems.push("READINESS_GRANDFATHERED not found in tools/company.mjs");
  const drift = Object.entries(PINNED)
    .map(([name, want]) => ({ name, want, got: fnHash(src, name) }))
    .filter((x) => x.got !== x.want);
  return {
    readinessSince: since?.[1] ?? null,
    qaIndependentSince: indep ? indep[2] ?? null : null,
    grandfathered: new Set(gf ? [...gf[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : []),
    problems,
    drift,
  };
}

/**
 * The claim and evidence floor: a copy of claimGates(meta) at tools/company.mjs:303-321 (not exported; the file is
 * protected). The only change is that `exists(rel(r))` takes the repo root explicitly. Messages are verbatim, because
 * --parity compares them string-for-string with `company check` output. Keep in step with PINNED.claimGates.
 */
export function claimFloor(meta, root) {
  const fails = [];
  const open = meta.claims.filter((c) => c.status !== "verified" && c.status !== "withdrawn");
  if (meta.claims.length === 0) fails.push("no claims recorded: every lesson asserts something; write it down");
  if (open.length) fails.push(`claims not verified: ${open.map((c) => c.id).join(", ")}`);
  for (const c of meta.claims) {
    if (c.status === "verified" && (!c.checkedBy || !c.checkedOn)) fails.push(`${c.id} verified without checkedBy/checkedOn`);
    if (c.status === "verified" && c.checkedBy === meta.owner.builder) fails.push(`${c.id} verified by its own builder`);
  }
  if (!meta.evidence.qa?.length) fails.push("no computer-use QA record (company/reviews/...)");
  if (!meta.evidence.simulatedLearner?.length) fails.push("no borrowed-mind learner review");
  for (const k of ["qa", "simulatedLearner", "pairwise", "humanLearners"]) {
    for (const r of meta.evidence[k] ?? []) if (!fs.existsSync(path.join(root, r))) fails.push(`evidence.${k} points at missing file ${r}`);
  }
  if (meta.confidence === "**" && !(meta.evidence.humanLearners?.length > 0))
    fails.push('confidence "**" needs human-learner evidence; simulated learners are not learners');
  return fails;
}

// Copy of qaRecorderRule (company.mjs, AMD-010 part 3 step 10 hook), with QA_INDEPENDENT_SINCE passed in.
function qaRecorderRule(rec, since) {
  if (!since || rec.d < since) return null;
  return /recorded by:[ \t]*qa-tester\b/.test(rec.t) && /kind:[ \t]*independent\b/.test(rec.t) ? null : `evidence.qa ${rec.f} is not an independent QA record`;
}

// Copy of readHolds (company.mjs; AMD-013 (a) 2, principal-engineer condition C1): null = unreadable = all gates closed.
export function readHolds(root) {
  const p = path.join(root, "company/ops/publish-holds.json");
  if (!fs.existsSync(p)) return {};
  try {
    const h = JSON.parse(fs.readFileSync(p, "utf8")).holds ?? {};
    return h && typeof h === "object" && !Array.isArray(h) ? h : null;
  } catch {
    return null;
  }
}

// Copy of readinessCanary's known answers (company.mjs, AMD-013): the lib must give these before any gate trusts it.
function canary(readiness) {
  const learner = (verdict, v) => ({ f: "2026-01-02-learner-canary.md", t: `lesson version: v${v}\nVerdict: ${verdict}\n` });
  const qa = (result, v) => ({ f: "2026-01-02-qa.md", t: `date: 2026-01-02 · lesson version: v${v} · result: **${result}**\n`, linked: true });
  const meta = { slug: "canary", version: 2 };
  const cases = [
    ["launch on the current version, QA pass", { learner: [learner("launch", 2)], qa: [qa("pass", 2)], hold: null }, true],
    ["learner revise", { learner: [learner("revise", 2)], qa: [qa("pass", 2)], hold: null }, false],
    ["learner launch for an older version", { learner: [learner("launch", 1)], qa: [qa("pass", 2)], hold: null }, false],
    ["QA fail", { learner: [learner("launch", 2)], qa: [qa("fail", 2)], hold: null }, false],
    ["QA for an older version", { learner: [learner("launch", 2)], qa: [qa("pass", 1)], hold: null }, false],
    ["active hold", { learner: [learner("launch", 2)], qa: [qa("pass", 2)], hold: "canary hold" }, false],
    ["unstamped QA on or after READINESS_SINCE", { learner: [learner("launch", 2)], qa: [{ f: "2026-01-02-qa.md", t: "date: 2026-01-02 · result: **pass**\n", linked: true }], hold: null, versionSince: "2026-01-01" }, false],
    ["same-day tie of launch and revise", { learner: [learner("launch", 2), { f: "2026-01-02-learner-other.md", t: "lesson version: v2\nVerdict: revise\n" }], qa: [qa("pass", 2)], hold: null }, false],
  ];
  for (const [name, ctx, want] of cases) {
    let got;
    try {
      got = readiness(meta, ctx)?.ready;
    } catch (e) {
      got = `threw ${e.message}`;
    }
    if (got !== want) return `readiness lib failed its known-answer canary (${name}: expected ${want}, got ${got}); every gate is closed until it passes (AMD-013)`;
  }
  return null;
}

/** Imports the company's readiness lib from the repo under test (tools/lib/readiness.mjs, ordinary surface). */
export async function loadReadinessLib(repo) {
  return import(pathToFileURL(path.join(repo, "tools/lib/readiness.mjs")).href);
}

/**
 * Mirror of readinessGates(meta) (company.mjs, AMD-013): canary, hold-file floor, readiness(meta, loadContext(root,
 * meta, opts)) with the same opts readinessOpts() builds (holds, gitAncestry(ROOT), READINESS_SINCE, recorder), and the
 * active-hold floor that does not depend on the lib. Returns (meta) => failures[] in launchGates' words.
 */
export function makeReadinessGates(repo, lib, consts) {
  const canaryMsg = canary(lib.readiness);
  const opts = {
    holds: readHolds(repo),
    isAncestor: lib.gitAncestry(repo),
    versionSince: consts.readinessSince,
    recorder: (rec) => qaRecorderRule(rec, consts.qaIndependentSince),
  };
  return (meta) => {
    if (canaryMsg) return [canaryMsg];
    const fails = [];
    if (!opts.holds) return ["company/ops/publish-holds.json is unreadable; every gate is closed until it parses (AMD-013 hold floor)"];
    let r;
    try {
      r = lib.readiness(meta, lib.loadContext(repo, meta, opts));
    } catch (e) {
      return [`readiness check failed to run: ${e.message}`];
    }
    if (!r || typeof r.ready !== "boolean" || !Array.isArray(r.reasons)) return ["readiness returned a malformed answer"];
    if (!r.ready) fails.push(...(r.reasons.length ? r.reasons : ["not ready (readiness gave no reason)"]));
    if (opts.holds[meta.slug] && !fails.some((f) => f.startsWith("active publish hold"))) fails.push(`active publish hold: ${opts.holds[meta.slug]}`);
    return fails;
  };
}

// ------------------------------------------------------------------ company check, run and parsed

/**
 * Runs `node tools/company.mjs check` in the repo. It exits 1 company-wide today (811 errors at 7a64ab2/23aaeba66,
 * plan §4), so the exit code is ignored and the output parsed. Line shapes (company.mjs cmdCheck): `warn  <where>:
 * <msg>`, `error <where>: <msg>`, then `check failed: N error(s), M warning(s)` or `check passed: ...`. ANSI color
 * appears only on a TTY (company.mjs `color`), and a pipe is not one. Missing summary line = stage-error.
 */
export function runCompanyCheck(repo) {
  const t0 = Date.now();
  const r = spawnSync(process.execPath, [path.join(repo, "tools/company.mjs"), "check"], { cwd: repo, encoding: "utf8", maxBuffer: 64 << 20, timeout: 120_000 });
  const out = parseCheck(r.stdout ?? "");
  out.ms = Date.now() - t0;
  out.exit = r.status;
  if (r.error) out.problem = `company check did not run: ${r.error.message}`;
  else if (!out.summary) out.problem = `company check printed no summary line (exit ${r.status}): ${(r.stderr || "").trim().split("\n").slice(-3).join(" | ")}`;
  return out;
}

export function parseCheck(stdout) {
  const errors = [];
  const warnings = [];
  let summary = null;
  for (const raw of stdout.split("\n")) {
    const line = raw.replace(/\x1b\[[0-9;]*m/g, "");
    let m;
    if ((m = line.match(/^error (.+?): (.*)$/))) errors.push({ where: m[1], msg: m[2], line });
    else if ((m = line.match(/^warn  (.+?): (.*)$/))) warnings.push({ where: m[1], msg: m[2], line });
    else if (/^check (passed|failed)/.test(line)) summary = line;
  }
  // `where` for a lesson is `src/demos/<domainDir>/<slugDir>` and never contains ": "; other wheres (decision files,
  // "readiness (AMD-013)") don't either, so the lazy (.+?): split is exact for every line cmdCheck emits.
  return { errors, warnings, summary };
}

// ------------------------------------------------------------------ lessons on disk

/** Finds src/demos/<domain>/<slug>/meta.json by directory name, as company.mjs loadDemos() does. */
export function findLesson(repo, slug) {
  const demos = path.join(repo, "src/demos");
  if (!fs.existsSync(demos)) return null;
  for (const dom of fs.readdirSync(demos)) {
    const dir = path.join(demos, dom, slug);
    if (!fs.existsSync(path.join(dir, "meta.json")) || !fs.statSync(path.join(demos, dom)).isDirectory()) continue;
    let meta = null;
    let parseError = null;
    try {
      meta = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8"));
    } catch (e) {
      parseError = e.message;
    }
    return { domainDir: dom, slugDir: slug, dir, where: `src/demos/${dom}/${slug}`, meta, parseError };
  }
  return null;
}

function allLessons(repo) {
  const demos = path.join(repo, "src/demos");
  const out = [];
  for (const dom of fs.readdirSync(demos)) {
    const ddir = path.join(demos, dom);
    if (!fs.statSync(ddir).isDirectory()) continue;
    for (const slug of fs.readdirSync(ddir)) {
      const dir = path.join(ddir, slug);
      if (!fs.statSync(dir).isDirectory()) continue;
      let meta = null;
      try {
        meta = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8"));
      } catch {}
      out.push({ domainDir: dom, slugDir: slug, where: `src/demos/${dom}/${slug}`, meta });
    }
  }
  return out;
}

const git = (repo, args) => execFileSync("git", args, { cwd: repo, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
function headSha(repo) {
  try {
    return git(repo, ["rev-parse", "HEAD"]);
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------ copy-tells (advisory only)

/**
 * tools/copy-tells.mjs exits 0 always ("a flagger, not a judge"; company/product/copy-style.md) and has no per-slug
 * mode, so run it for the lesson's domain with --examples and keep the `- <slug>: <text>` lines under each
 * `## <domain> <kind>` heading. copy-tells prints at most 15 examples per kind (copy-tells.mjs last line), so in a
 * busy domain a hit can be cut off: this is best-effort and never blocks (plan §2 stage 2: "advisory findings only").
 */
export function copyTells(repo, domain, slug) {
  const r = spawnSync(process.execPath, [path.join(repo, "tools/copy-tells.mjs"), `--domain=${domain}`, "--examples"], { cwd: repo, encoding: "utf8", timeout: 60_000 });
  if (r.status !== 0) return [{ severity: "advisory", kind: "copy-tells", message: `copy-tells did not run (exit ${r.status})` }];
  const found = [];
  let kind = null;
  for (const line of r.stdout.split("\n")) {
    const h = line.match(/^## (\S+) (\S+)$/);
    if (h) {
      kind = h[1] === domain ? h[2] : null;
      continue;
    }
    if (kind && line.startsWith(`- ${slug}: `)) found.push({ severity: "advisory", kind: `copy-tells:${kind}`, message: line.slice(slug.length + 4) });
  }
  return found;
}

// ------------------------------------------------------------------ stage: build (plan §2 stage 2, test1)

// Pre-flight heading per company/product/demo-standard.md "Pre-flight": `## Pre-flight v<n>` in
// company/reviews/<slug>/build.md, one per version. Trailing annotations are common on disk
// ("## Pre-flight v3 (demo-builder, …)"), so anything after the number is allowed, but not another digit (v1 ≠ v10).
export const preflightRe = (v) => new RegExp(`^##[ \\t]+Pre-flight[ \\t]+v${v}(?!\\d)`, "m");

// Order-independent deep equality of JSON values (meta.json is data: key order and whitespace are not changes).
const canon = (v) => (Array.isArray(v) ? v.map(canon) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
const sameJSON = (a, b) => JSON.stringify(canon(a ?? null)) === JSON.stringify(canon(b ?? null));
// The one per-claim key a builder may change under an inherited verification. It is the same set claims-guard.mjs
// CLAIM_MUTABLE allows the fact-checker minus status/checkedBy/checkedOn: `note` is commentary, never shown to a
// learner. Everything else (text, source, support, address/addresses/location/kind/supportPins) is what the
// verification was about, so a change to any of it voids the inheritance.
const CLAIM_FREE = new Set(["note"]);
/** Keys of claim `c` that differ from base claim `b` (as data), ignoring CLAIM_FREE. */
export function claimChanges(c, b) {
  return [...new Set([...Object.keys(b), ...Object.keys(c)])].filter((k) => !CLAIM_FREE.has(k) && !sameJSON(c[k], b[k])).sort();
}

/**
 * Builder-never-verifies (CLAUDE.md hard rule; company/roles/demo-builder.md "Out of scope: Verifying own claims";
 * plan §2 stage 2 "claims all `unverified`").
 * - Without --base every claim must be `unverified`: a first build has nothing to inherit. That includes
 *   `withdrawn`: withdrawal is the fact-checker's status ("removal is the builder's (a claim leaves with its
 *   sentence), the checker sets withdrawn instead", claims-guard.mjs; claimGates counts withdrawn as closed, so a
 *   builder withdrawal would reach `company publish` unexamined).
 * - With --base=<sha> (the order's base, for a revise loop after the fact-checker ran), a claim is inherited only
 *   when it equals the base claim in every key but `note` (claimChanges). Then any status is accepted, because the
 *   fact-checker set it. A claim that is new, or changed in any other key (text, source, support, address, status,
 *   checkedBy, checkedOn), must be `unverified`: a builder reopening a claim it reworded is the documented
 *   practice ("Reset c3, c5, c7 to unverified for fact-checker", board W-266). Rewording a verified claim and
 *   leaving it verified is the false pass this guards; no company gate sees it (claimGates reads only status).
 * - Self-verification by owner.builder is always a block, inherited or not.
 * - A lesson with no claim left open or verified (every claim withdrawn) asserts nothing a fact-checker passed:
 *   block, in the words of claimGates' "no claims recorded" rule.
 */
export function claimFindings(meta, baseMeta) {
  const f = [];
  const base = new Map((baseMeta?.claims ?? []).map((c) => [c.id, c]));
  for (const c of meta.claims ?? []) {
    if (c.status === "verified" && c.checkedBy && c.checkedBy === meta.owner?.builder) {
      f.push({ severity: "block", kind: "claims", route: "build", message: `${c.id} verified by its own builder (${c.checkedBy})` });
      continue;
    }
    if (c.status === "unverified") continue;
    const b = baseMeta ? base.get(c.id) : undefined;
    const changed = b ? claimChanges(c, b) : null;
    if (changed && changed.length === 0) continue; // inherited exactly from base
    const why = !baseMeta ? "" : !b ? " (absent at base)" : ` (changed since base: ${changed.join(", ")}; base status ${b.status})`;
    const rule = c.status === "withdrawn" ? "withdrawn is the fact-checker's status; a builder removes the claim with its sentence, or leaves it unverified" : "a builder leaves new or changed claims unverified; only the fact-checker changes a claim's status";
    f.push({ severity: "block", kind: "claims", route: "build", message: `${c.id} is ${c.status}${why}: ${rule}` });
  }
  const claims = meta.claims ?? [];
  if (claims.length && claims.every((c) => c.status === "withdrawn"))
    f.push({ severity: "block", kind: "claims", route: "build", message: "every claim is withdrawn: every lesson asserts something; write it down" });
  return f;
}

function readBaseMeta(repo, base, where) {
  try {
    return JSON.parse(git(repo, ["show", `${base}:${where}/meta.json`]));
  } catch {
    return null; // the lesson is new since base
  }
}

export function buildStage(repo, slug, { base = null, baselineFile = null } = {}) {
  const findings = [];
  const L = findLesson(repo, slug);
  if (!L) return { exit: 1, out: { ok: false, stage: "build", slug, findings: [{ severity: "block", kind: "lesson", route: "build", message: `no src/demos/<domain>/${slug}/meta.json` }] } };
  if (L.parseError || !L.meta) return { exit: 1, out: { ok: false, stage: "build", slug, findings: [{ severity: "block", kind: "lesson", route: "build", message: `meta.json unreadable: ${L.parseError}` }] } };
  const meta = L.meta;

  const chk = runCompanyCheck(repo);
  if (chk.problem) return { exit: 3, out: { ok: false, stage: "build", slug, findings: [{ severity: "environment", kind: "check", message: chk.problem }] } };
  // Lesson-scoped errors: exactly `error src/demos/<d>/<slug>: ` (plan §2 stage 2). The colon matters: `a-b` must not
  // match `a-b-c`. Registry errors (`src/demos/*.generated.ts`: stale, missing loader, ...) are company-wide by
  // address but at 23aaeba66 there are none, so any one in a builder's worktree came from that build: block too.
  for (const e of chk.errors) {
    if (e.where === L.where) findings.push({ severity: "block", kind: "check", route: "build", message: e.msg });
    else if (/^src\/demos\/[^/]*\.generated\.ts$|^src\/demos\/\*\.generated\.ts$/.test(e.where)) findings.push({ severity: "block", kind: "registry", route: "build", message: `${e.where}: ${e.msg}` });
  }
  for (const w of chk.warnings) if (w.where === L.where) findings.push({ severity: "advisory", kind: "check-warning", message: w.msg });

  // Slug collision, checked directly because cmdCheck files it under the OTHER lesson's address: its "duplicate
  // slug" error goes to whichever of the two sorts second in loadDemos() order (company.mjs cmdCheck `if
  // (slugs.has(m.slug)) err(where, "duplicate slug")`), and cmdNewDemo refuses only a slug already in the same
  // domain. Two lessons with one slug also share company/reviews/<slug>/ (build.md, QA and learner records:
  // readiness.mjs loadContext reads `company/reviews/${meta.slug}`), and `company publish <slug>` picks the first.
  for (const o of allLessons(repo)) {
    if (o.where === L.where) continue;
    if (o.slugDir === slug || o.meta?.slug === slug || (meta.slug && o.meta?.slug === meta.slug))
      findings.push({ severity: "block", kind: "slug", route: "build", message: `slug "${slug}" is already used by ${o.where}; slugs are company-wide (company check "duplicate slug"; company/reviews/${slug}/ would be shared)` });
  }

  // "No new errors" guard (plan §4 last paragraph; plan §M4 acceptance "a total ≤ the baseline (811)"), against the
  // file `gates --baseline --out=` wrote at run start. Lesson-address filtering alone misses errors filed under
  // another address (the duplicate-slug case above), so the baseline holds the error LINES and any line not in it
  // (multiset difference: a fixed unrelated error does not pay for a new one) blocks, whatever its address. A
  // baseline file from before `errorLines` existed falls back to the count. Without --baseline-file only the
  // lesson-scoped errors above are seen; that is plan §2 stage 2's literal rule, so it is an advisory, not a usage
  // error (the supervisor passes the file; plan §M4 run step "gates.mjs --baseline > baseline.json").
  let baseline = null;
  if (baselineFile) {
    let bl;
    try {
      bl = JSON.parse(fs.readFileSync(baselineFile, "utf8"));
    } catch (e) {
      return { exit: 2, out: { ok: false, stage: "build", slug, findings: [{ severity: "environment", kind: "usage", message: `cannot read --baseline-file: ${e.message}` }] } };
    }
    baseline = bl.errors;
    if (Array.isArray(bl.errorLines)) {
      const left = new Map();
      for (const l of bl.errorLines) left.set(l, (left.get(l) ?? 0) + 1);
      for (const e of chk.errors) {
        const n = left.get(e.line) ?? 0;
        if (n > 0) {
          left.set(e.line, n - 1);
          continue;
        }
        // Already reported above as this lesson's own (or a registry) error: do not repeat it.
        if (findings.some((f) => (f.kind === "check" && e.where === L.where && f.message === e.msg) || (f.kind === "registry" && f.message === `${e.where}: ${e.msg}`))) continue;
        findings.push({ severity: "block", kind: "baseline", route: "build", message: `new company check error not in the baseline: ${e.line}` });
      }
    } else if (typeof baseline !== "number") {
      return { exit: 2, out: { ok: false, stage: "build", slug, findings: [{ severity: "environment", kind: "usage", message: `--baseline-file has neither errorLines[] nor errors (write it with gates.mjs --baseline --out=<file>)` }] } };
    }
    if (typeof baseline === "number" && chk.errors.length > baseline)
      findings.push({ severity: "block", kind: "baseline", route: "build", message: `company check errors rose from ${baseline} (baseline) to ${chk.errors.length}` });
  } else {
    findings.push({ severity: "advisory", kind: "baseline", message: "no --baseline-file: errors this build causes under another address are not compared (pass the file from gates.mjs --baseline --out=<file>)" });
  }

  if (meta.status !== "review") findings.push({ severity: "block", kind: "status", route: "build", message: `status is "${meta.status}"; a build hands over at "review"` });
  // design.md is the learning-designer's output (company/roles/learning-designer.md Outputs); founder decision F-f
  // merges it into the one builder session, so test1 checks the builder wrote it.
  const reviews = path.join(repo, "company/reviews", slug);
  const design = path.join(reviews, "design.md");
  if (!fs.existsSync(design) || !fs.readFileSync(design, "utf8").trim()) findings.push({ severity: "block", kind: "design", route: "build", message: `company/reviews/${slug}/design.md missing or empty` });
  const build = path.join(reviews, "build.md");
  const v = meta.version;
  if (!fs.existsSync(build)) findings.push({ severity: "block", kind: "preflight", route: "build", message: `company/reviews/${slug}/build.md missing (demo-standard "Pre-flight")` });
  else if (!preflightRe(v).test(fs.readFileSync(build, "utf8"))) findings.push({ severity: "block", kind: "preflight", route: "build", message: `build.md has no "## Pre-flight v${v}" for meta.version ${v} (demo-standard "Pre-flight")` });

  const baseMeta = base ? readBaseMeta(repo, base, L.where) : null;
  if (Array.isArray(meta.claims)) findings.push(...claimFindings(meta, baseMeta));
  if (!meta.claims?.length) findings.push({ severity: "block", kind: "claims", route: "build", message: "no claims recorded: every lesson asserts something; write it down" });
  findings.push(...copyTells(repo, L.domainDir, slug));

  const ok = !findings.some((f) => f.severity !== "advisory");
  return {
    exit: ok ? 0 : 1,
    out: { ok, stage: "build", slug, version: v, head: headSha(repo), base, companyErrors: chk.errors.length, baseline, checkMs: chk.ms, findings },
  };
}

// ------------------------------------------------------------------ stage: ship (plan §2 stage 8, before publish)

// K11 route for each launchGates failure, by its wording (company.mjs claimGates; readiness.mjs readiness/decide/decideQa).
export function routeFor(msg) {
  if (/^claims not verified|verified without checkedBy|verified by its own builder/.test(msg)) return "check";
  if (/^no claims recorded/.test(msg)) return "build";
  if (/^no computer-use QA record|^evidence\.qa |^QA: /.test(msg)) return "qa";
  if (/^learner review: verdict revise/.test(msg)) return "build";
  if (/^learner review: verdict fatal|^active publish hold|^confidence "\*\*"/.test(msg)) return "park"; // K8; human learners are not agents
  if (/^no borrowed-mind learner review|^evidence\.simulatedLearner |^learner review: /.test(msg)) return "learner";
  if (/^evidence\.(pairwise|humanLearners) /.test(msg)) return "build";
  return null;
}
// Failures that say the gate itself is broken, not the lesson (company.mjs readinessGates fail-closed branches).
const ENV_GATE = /^readiness lib failed its known-answer canary|^company\/ops\/publish-holds\.json is unreadable|^readiness check failed to run|^readiness returned a malformed answer/;

/**
 * The lesson `company publish <slug>` would act on: company.mjs cmdPublish does
 * `loadDemos().find((x) => x.meta?.slug === slug)`, i.e. the FIRST lesson whose meta.slug matches, in loadDemos()
 * order (sorted by (domainDir + slugDir).localeCompare), with unreadable metas never matching. That can differ from
 * findLesson's directory lookup when a meta.slug disagrees with its directory or two lessons share a slug.
 */
export function findPublishTarget(repo, slug) {
  const all = allLessons(repo).sort((a, b) => (a.domainDir + a.slugDir).localeCompare(b.domainDir + b.slugDir));
  const hit = all.find((x) => x.meta?.slug === slug);
  return hit ? { ...hit, dir: path.join(repo, hit.where), others: all.filter((x) => x !== hit && (x.meta?.slug === slug || x.slugDir === slug)).map((x) => x.where) } : null;
}

/**
 * Plan §2 runs stage 8 (this) before stage 9 (publish.mjs), and publish.mjs step 1 is what links learner records into
 * evidence.simulatedLearner before `company publish`. Judged on the unlinked meta, claimGates' "no borrowed-mind
 * learner review" fails for a lesson stage 9 would publish, routing to `learner`, whose re-run never links either: a
 * loop until K9 parks it. So ship judges the meta as stage 9 will hand it to `company publish`: the same link rule as
 * publish.mjs linkLearner (copied from tools/publish-ready.mjs main(): files in company/reviews/<slug>/ whose name
 * includes "learner", sorted, appended when not already linked), in memory only. No evidence object → no link (publish
 * .mjs refuses that case itself, and claimFloor throws on it below → block).
 */
export function withPendingLink(repo, meta, slug) {
  const rd = path.join(repo, "company/reviews", slug);
  const files = fs.existsSync(rd) ? fs.readdirSync(rd).filter((f) => f.includes("learner")).sort() : [];
  const have = meta.evidence?.simulatedLearner ?? [];
  const add = files.map((f) => `company/reviews/${slug}/${f}`).filter((p) => !have.includes(p));
  if (!add.length || !meta.evidence || typeof meta.evidence !== "object") return { meta, add: [] };
  return { meta: { ...meta, evidence: { ...meta.evidence, simulatedLearner: [...have, ...add] } }, add };
}

export async function shipStage(repo, slug) {
  const consts = companyConstants(repo);
  if (consts.problems.length || consts.drift.length)
    return { exit: 3, out: { ok: false, stage: "ship", slug, findings: [...consts.problems, ...consts.drift.map((d) => `tools/company.mjs ${d.name}() changed (hash ${d.got}, adapter pinned ${d.want}): update gates.mjs's mirror, then PINNED`)].map((message) => ({ severity: "environment", kind: "mirror", message })) } };
  const L = findPublishTarget(repo, slug);
  if (!L) {
    // cmdPublish prints "no lesson <slug>" here; say why when a directory of that name exists.
    const D = findLesson(repo, slug);
    const why = D ? (D.parseError ? `: ${D.where}/meta.json unreadable: ${D.parseError}` : `: ${D.where}/meta.json has slug "${D.meta?.slug}"`) : "";
    return { exit: 1, out: { ok: false, stage: "ship", slug, findings: [{ severity: "block", kind: "lesson", route: "build", message: `no lesson ${slug}${why}` }] } };
  }
  // Same lesson as publish, but flag what company check would (slug/directory mismatch, shared slug). Advisory, so
  // ship's exit stays the publish decision; test1 already blocks these at the lesson's own address.
  const notes = [];
  if (L.slugDir !== slug) notes.push({ severity: "advisory", kind: "lesson", message: `publish acts on ${L.where}, whose directory is not "${slug}" (company check: slug does not match directory)` });
  if (L.others.length) notes.push({ severity: "advisory", kind: "lesson", message: `slug "${slug}" is also used by ${L.others.join(", ")}; publish takes ${L.where} (first in loadDemos order)` });
  const { meta, add } = withPendingLink(repo, L.meta, slug);
  const lib = await loadReadinessLib(repo);
  const gates = makeReadinessGates(repo, lib, consts);
  let claim;
  try {
    claim = claimFloor(meta, repo);
  } catch (e) {
    // company publish would throw here too (launchGates has no try); the meta is malformed, which is the build's defect.
    return { exit: 1, out: { ok: false, stage: "ship", slug, findings: [{ severity: "block", kind: "lesson", route: "build", message: `claim floor could not read meta.json: ${e.message}` }] } };
  }
  const ready = gates(meta);
  const findings = [
    ...claim.map((m) => ({ severity: "block", kind: "claim-floor", route: routeFor(m), message: m })),
    ...ready.map((m) => (ENV_GATE.test(m) ? { severity: "environment", kind: "readiness", message: m } : { severity: "block", kind: "readiness", route: routeFor(m), message: m })),
  ];
  const env = findings.some((f) => f.severity === "environment");
  const ok = findings.length === 0;
  // pendingLink: the records publish.mjs will link before `company publish` (this verdict assumes them).
  return { exit: ok ? 0 : env ? 3 : 1, out: { ok, stage: "ship", slug, where: L.where, version: meta.version, status: meta.status, head: headSha(repo), pendingLink: add, findings: [...findings, ...notes] } };
}

// ------------------------------------------------------------------ --baseline and --parity

/** M4 integrate: the run's baseline file, written once (the first test1 of the run) from `company check` in `from`
 *  (the run's base checkout), atomically (two writers leave one whole file). Returns null when the file is there, or
 *  the stage-error result: no baseline is no "no new errors" guard, and test1 must not pass silently without it. */
export function ensureBaseline(file, from) {
  if (fs.existsSync(file)) return null;
  if (!fs.existsSync(path.join(from, "tools/company.mjs"))) return { exit: 3, out: { ok: false, stage: "build", findings: [{ severity: "environment", kind: "baseline", message: `--baseline-repo ${from} is not a System 3 Company checkout (no tools/company.mjs)` }] } };
  const r = baseline(from);
  if (r.exit !== 0) return { exit: 3, out: { ...r.out, stage: "build", findings: [...(r.out.findings ?? []), { severity: "environment", kind: "baseline", message: `the run's baseline could not be made in ${from}` }] } };
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify({ ...r.out, from }, null, 2) + "\n");
  if (!fs.existsSync(file)) fs.renameSync(tmp, file); else fs.rmSync(tmp, { force: true });
  return null;
}

export function baseline(repo) {
  const chk = runCompanyCheck(repo);
  if (chk.problem) return { exit: 3, out: { ok: false, mode: "baseline", findings: [{ severity: "environment", kind: "check", message: chk.problem }] } };
  const lessonErrors = chk.errors.filter((e) => e.where.startsWith("src/demos/")).length;
  return {
    exit: 0,
    // errorLines: every `error <where>: <msg>` line, ANSI-stripped, so --stage=build can block on any NEW line
    // (buildStage "No new errors" guard). With --out it goes to the file and main() drops it from stdout.
    out: { ok: true, mode: "baseline", head: headSha(repo), errors: chk.errors.length, warnings: chk.warnings.length, lessonErrors, otherErrors: chk.errors.length - lessonErrors, checkMs: chk.ms, findings: [], errorLines: chk.errors.map((e) => e.line) },
  };
}

/**
 * Parity (plan §4 row gates.mjs: "the parity test is the guard against drift"). For every published lesson that
 * `company check` fully evaluates, its `published but fails gate: X` lines must be exactly
 *   claimFloor(meta) ++ (grandfathered ? [] : readinessGates(meta))
 * in that order (cmdCheck emits claimGates first, then readinessGates unless READINESS_GRANDFATHERED). Two counts are
 * reported: claim parity (check's gate lines minus the mirrored readiness lines == claimFloor, as the plan states it)
 * and full parity (the exact sequence, which also guards the readiness mirror that --stage=ship uses).
 * Skipped: lessons check stops early on (`meta.json unreadable`, `meta.<k> should be <type>`): cmdCheck `continue`s
 * before the gates for those. Exit 1 with findings on any mismatch or pinned-hash drift.
 */
export async function parity(repo) {
  const consts = companyConstants(repo);
  if (consts.problems.length) return { exit: 3, out: { ok: false, mode: "parity", findings: consts.problems.map((message) => ({ severity: "environment", kind: "mirror", message })) } };
  const chk = runCompanyCheck(repo);
  if (chk.problem) return { exit: 3, out: { ok: false, mode: "parity", findings: [{ severity: "environment", kind: "check", message: chk.problem }] } };
  const lib = await loadReadinessLib(repo);
  const gates = makeReadinessGates(repo, lib, consts);
  const byWhere = new Map();
  for (const e of chk.errors) (byWhere.get(e.where) ?? byWhere.set(e.where, []).get(e.where)).push(e.msg);
  const GATE = "published but fails gate: ";
  const findings = consts.drift.map((d) => ({ severity: "block", kind: "mirror", message: `tools/company.mjs ${d.name}() changed (hash ${d.got}, adapter pinned ${d.want})` }));
  let published = 0, compared = 0, skipped = 0, claimOk = 0, fullOk = 0, claimLines = 0, readinessLines = 0;
  for (const L of allLessons(repo)) {
    if (L.meta?.status !== "published") continue;
    published++;
    const msgs = byWhere.get(L.where) ?? [];
    if (msgs.some((m) => /^meta\.json unreadable|^meta\.\w+ should be \w+$/.test(m))) {
      skipped++;
      continue;
    }
    compared++;
    const got = msgs.filter((m) => m.startsWith(GATE)).map((m) => m.slice(GATE.length));
    const floor = claimFloor(L.meta, repo);
    const rg = consts.grandfathered.has(L.meta.slug) ? [] : gates(L.meta);
    claimLines += floor.length;
    readinessLines += rg.length;
    // claim parity: remove the mirrored readiness lines (multiset) from check's lines; what remains must be claimFloor.
    const rest = [...got];
    for (const r of rg) {
      const i = rest.indexOf(r);
      if (i >= 0) rest.splice(i, 1);
    }
    const claimSame = JSON.stringify(rest) === JSON.stringify(floor);
    const fullSame = JSON.stringify(got) === JSON.stringify([...floor, ...rg]);
    if (claimSame) claimOk++;
    if (fullSame) fullOk++;
    if (!claimSame || !fullSame)
      findings.push({
        severity: "block",
        kind: claimSame ? "readiness-parity" : "claim-parity",
        message: `${L.meta.slug}: check says ${JSON.stringify(got)}; mirror says claimFloor ${JSON.stringify(floor)} + readiness ${JSON.stringify(rg)}`,
      });
  }
  const ok = findings.length === 0;
  return {
    exit: ok ? 0 : 1,
    out: { ok, mode: "parity", head: headSha(repo), published, compared, skipped, claimParity: claimOk, fullParity: fullOk, claimLines, readinessLines, grandfathered: consts.grandfathered.size, checkMs: chk.ms, findings: findings.slice(0, 50), mismatches: findings.length },
  };
}

// ------------------------------------------------------------------ CLI

export function parseArgs(argv) {
  const opts = { repo: DEFAULT_REPO, positional: [] };
  for (const a of argv) {
    const m = a.match(/^--([a-z-]+)(?:=(.*))?$/);
    if (!m) opts.positional.push(a);
    else opts[m[1]] = m[2] ?? true;
  }
  return opts;
}

const USAGE = "usage: gates.mjs <slug> --stage=build|ship [--base=<sha>] [--baseline-file=<f> [--baseline-repo=<path>]] [--repo=<path>] | --baseline [--out=<f>] | --parity";

export async function main(argv) {
  const o = parseArgs(argv);
  const repo = path.resolve(String(o.repo));
  const usage = (message) => ({ exit: 2, out: { ok: false, findings: [{ severity: "environment", kind: "usage", message }], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["repo", "positional", "stage", "base", "baseline-file", "baseline-repo", "baseline", "out", "parity"].includes(k)) return usage(`unknown flag --${k}`);
  if (!fs.existsSync(path.join(repo, "tools/company.mjs")) || !fs.existsSync(path.join(repo, "tools/lib/readiness.mjs")))
    return { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "repo", message: `${repo} is not a System 3 Company checkout (no tools/company.mjs or tools/lib/readiness.mjs)` }] } };
  if (o.baseline === true) {
    const r = baseline(repo);
    if (typeof o.out === "string" && r.exit === 0) fs.writeFileSync(o.out, JSON.stringify(r.out, null, 2) + "\n");
    // With --out the file holds errorLines and stdout's last line stays short. Without it, stdout keeps them: the
    // plan's form `gates.mjs --baseline > baseline.json` (plan §M4 run) makes stdout the file, and a passing
    // baseline prints exactly one line, so that file is valid JSON with errorLines.
    if (typeof o.out === "string" && r.out.errorLines) r.out = { ...r.out, errorLines: undefined, errorLinesIn: o.out };
    return r;
  }
  if (o.parity === true) return parity(repo);
  const [slug, ...extra] = o.positional;
  if (!slug || extra.length || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return usage("one kebab-case <slug> is required"); // slug rule: company.mjs cmdNewDemo
  if (o.stage === "build") {
    if (o.base !== undefined) {
      if (typeof o.base !== "string") return usage("--base needs a commit");
      try {
        git(repo, ["rev-parse", "--verify", `${o.base}^{commit}`]);
      } catch {
        return usage(`--base=${o.base} is not a commit in ${repo}`);
      }
    }
    const bf = typeof o["baseline-file"] === "string" && o["baseline-file"] ? o["baseline-file"] : null;
    if (o["baseline-repo"] !== undefined) {
      if (!bf) return usage("--baseline-repo needs --baseline-file");
      if (typeof o["baseline-repo"] !== "string" || !o["baseline-repo"]) return usage("--baseline-repo needs a checkout");
      const made = ensureBaseline(bf, path.resolve(o["baseline-repo"]));
      if (made) return made;
    }
    return buildStage(repo, slug, { base: o.base ?? null, baselineFile: bf });
  }
  if (o.stage === "ship") return shipStage(repo, slug);
  return usage("--stage=build or --stage=ship is required");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try {
    r = await main(process.argv.slice(2));
  } catch (e) {
    r = { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "crash", message: e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e) }] } };
  }
  for (const f of r.out.findings ?? []) if (f.severity !== "advisory") console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
