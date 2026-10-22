#!/usr/bin/env node
// learner-verdict.mjs: the System 3 Meta post-check for the learner stage (plan 2026-10-21-m4-m7-plan.md §2 stage 6
// "learner", §3 K12 post-checks, §4 row `learner-verdict.mjs`). It reads the newest learner review the
// learner-evaluator wrote and turns its verdict into a Meta verdict. It writes nothing.
//
//   node learner-verdict.mjs <slug> [--repo=<path>]
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], ...}. Exit 0 pass, 1 revise (findings;
// fatal also exits 1 but sets park:true, plan §3 K8), 2 usage, 3 stage-error (the company's readiness lib did not load).
// Only node: built-ins, the company's tools/lib/readiness.mjs (imported by absolute path from --repo, default
// /home/user/s3c-wt/base) and the sibling gates.mjs helpers (findLesson, loadReadinessLib, parseArgs).
//
// Which file is "the newest" (plan §4: "the newest <date>-learner-*.md"):
//   1. candidates are files in company/reviews/<slug>/ named /^\d{4}-\d{2}-\d{2}-learner-.*\.md$/, the template's
//      name `<date>-learner-<boundary>[-rN].md` (company/reviews/_template-learner-review.md, first comment);
//   2. keep only the newest date prefix (the date is the first 10 chars, as readiness.mjs dateOf reads it);
//   3. inside that day, the company's own decide() (tools/lib/readiness.mjs) picks: highest version stamp, then
//      `supersedes:` / `-rN` / `built from <sha>` git ancestry (newer()), then the most severe verdict on a tie. So a
//      same-day launch and revise tie resolves to revise, exactly as company.mjs readinessCanary demands.
// Why not decide() over every file: decide() picks the highest *version* first, so a fresh review that stamps the
// wrong version would be hidden behind an older review of the right version. The post-check must judge what the
// evaluator just wrote (K12: the leave is refused and the evaluator fixes its own record in-session).
//
// Verdict mapping (plan §2 stage 6), applied ONLY to a record stamped `lesson version: v<meta.version>`: launch →
// pass; revise → revise, route build; fatal → exit 1 with park:true, route park (K8). The version is checked first,
// for every verdict: a newest record stamped for another version is not about the lesson as it stands, so neither a
// revise (a builder session plus a version bump) nor a fatal (a park and an ask to the orderer) may be spent on it.
// A record for another version, an unreadable record (readReview().problem: non-canonical word, conflicting verdicts,
// missing or conflicting `lesson version:` stamps) or no record at all → revise, route learner: the defect is the
// record, so the evaluator re-writes it in-session (plan §3 K12: the post-check refuses the room leave).
//
// Consistency with stage 8: on a pass, the company's own decide() over every learner file loadContext() counts
// (any name containing "learner", plus evidence.simulatedLearner links; readiness.mjs loadContext) must also be
// ready. If it is not (say an older-dated file is unreadable but linked, or a non-dated "learner" file is newer by
// version), the pass is withheld with that reason, so the order does not sail through to fail at `gates --stage=ship`.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_REPO, findLesson, loadReadinessLib, parseArgs } from "./gates.mjs";

export const LEARNER_FILE = /^\d{4}-\d{2}-\d{2}-learner-.*\.md$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/; // company.mjs cmdNewDemo slug rule
const USAGE = "usage: learner-verdict.mjs <slug> [--repo=<path>]";

const finding = (route, kind, message, severity = "block") => ({ severity, kind, route, message });

/** Pure: given the review files [{f, t}] (f repo-relative), the meta and the company lib, return {exit, out}. */
export function judge(lib, meta, slug, candidates, allLearner = [], isAncestor = null) {
  const v = meta.version ?? 1; // readiness.mjs readiness(): `meta.version ?? 1`
  const base = { stage: "learner", slug, metaVersion: v };
  if (!candidates.length)
    return { exit: 1, out: { ok: false, ...base, park: false, findings: [finding("learner", "no-review", `no company/reviews/${slug}/<date>-learner-*.md: the learner-evaluator must write one from company/reviews/_template-learner-review.md`)] } };
  const day = candidates.map((r) => path.basename(r.f).slice(0, 10)).sort().at(-1);
  const group = candidates.filter((r) => path.basename(r.f).startsWith(day));
  const d = lib.decide(group, v, { isAncestor });
  const latest = d.latest ?? { ...group[0], ...lib.readReview(group[0].t) };
  const rec = { file: latest.f, verdict: latest.verdict ?? null, version: latest.version ?? 0, builtFrom: lib.builtFrom(latest.t), sameDay: group.map((r) => r.f) };
  const out = (exit, findings, park = false) => ({ exit, out: { ok: exit === 0, ...base, ...rec, park, findings } });

  if (latest.problem) return out(1, [finding("learner", "unreadable", `${latest.f}: ${latest.problem} (template: one "lesson version: vN" line and "Verdict: launch|revise|fatal")`)]);
  // decide() also refuses when a later-dated file is unreadable; inside one day that cannot happen, but keep the rule.
  if (/^newer learner review unreadable/.test(d.reason ?? "")) return out(1, [finding("learner", "unreadable", d.reason)]);
  if (latest.verdict && !lib.VERDICTS.includes(latest.verdict)) return { exit: 3, out: { ok: false, ...base, ...rec, park: false, findings: [finding(undefined, "lib", `readiness.mjs decide() returned verdict ${latest.verdict} outside ${lib.VERDICTS.join("|")}`, "environment")] } };
  if (latest.version !== v) return out(1, [finding("learner", "version", `${latest.f}: Verdict: ${latest.verdict} is stamped for v${latest.version}, meta.json is v${v}; walk and review the current version (a verdict for another version is not acted on)`)]);
  if (latest.verdict === "fatal") return out(1, [finding("park", "fatal", `${latest.f}: Verdict: fatal (the lesson cannot be fixed into teaching this idea); park the order and ask the orderer (plan §3 K8)`)], true);
  if (latest.verdict === "revise") return out(1, [finding("build", "revise", `${latest.f}: Verdict: revise for v${latest.version}; the builder fixes the findings and bumps version (plan §2 "How revise works")`)]);
  if (latest.verdict !== "launch") return { exit: 3, out: { ok: false, ...base, ...rec, park: false, findings: [finding(undefined, "lib", `readiness.mjs decide() returned verdict ${latest.verdict} outside ${lib.VERDICTS.join("|")}`, "environment")] } };

  // Stage-8 parity: the company's own view over every file it will count.
  const all = lib.decide(allLearner.length ? allLearner : group, v, { isAncestor });
  if (!all.ready) return out(1, [finding("learner", "company-readiness", `newest review says launch v${v}, but the company's readiness over every learner file says: ${all.reason} (latest ${all.latest?.f ?? "none"})`)]);
  return out(0, []);
}

/** Every learner file the company counts for this lesson: readiness.mjs loadContext() learner rule. */
function companyLearnerFiles(lib, repo, meta) {
  return lib.loadContext(repo, meta, { holds: {} }).learner;
}

export async function run(repo, slug) {
  const L = findLesson(repo, slug);
  if (!L || !L.meta) return { exit: 1, out: { ok: false, stage: "learner", slug, park: false, findings: [finding("build", "lesson", L ? `meta.json unreadable: ${L.parseError}` : `no lesson ${slug} under src/demos/*/`)] } };
  let lib;
  try {
    lib = await loadReadinessLib(repo);
  } catch (e) {
    return { exit: 3, out: { ok: false, stage: "learner", slug, findings: [finding(undefined, "lib", `tools/lib/readiness.mjs did not load: ${e.message}`, "environment")] } };
  }
  const dir = path.join(repo, "company/reviews", slug);
  const names = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => LEARNER_FILE.test(f) && fs.statSync(path.join(dir, f)).isFile()).sort() : [];
  const candidates = names.map((f) => ({ f: `company/reviews/${slug}/${f}`, t: fs.readFileSync(path.join(dir, f), "utf8") }));
  return judge(lib, L.meta, slug, candidates, companyLearnerFiles(lib, repo, { ...L.meta, slug }), lib.gitAncestry(repo));
}

export async function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, findings: [{ severity: "environment", kind: "usage", message }], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["repo", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  const repo = path.resolve(String(o.repo ?? DEFAULT_REPO));
  const [slug, ...extra] = o.positional;
  if (!slug || extra.length || !SLUG.test(slug)) return usage("one kebab-case <slug> is required");
  if (!fs.existsSync(path.join(repo, "tools/lib/readiness.mjs")))
    return { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "repo", message: `${repo} has no tools/lib/readiness.mjs` }] } };
  return run(repo, slug);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try {
    r = await main(process.argv.slice(2));
  } catch (e) {
    r = { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "crash", message: e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e) }] } };
  }
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
