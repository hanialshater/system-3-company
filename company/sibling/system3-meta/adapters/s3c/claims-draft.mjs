#!/usr/bin/env node
// claims-draft.mjs: the System 3 Meta post-check for the lesson flow's first stage, "draft" (B6: specs/s3c-lessons-b6.json,
// kernel K25). M6-RUN.md "What this says" 2: all 7 of M6's revises were the fact-checker's, each a real defect, each
// found after a whole build (a builder session of Demo.tsx, QA and a walkthrough). B6 checks the claims first: the
// builder's draft is the lesson's meta.json, status "draft", with the claims the lesson will make, before any Demo.tsx
// exists; the fact-checker's plan-check verifies or disputes them (claims-guard.mjs, unchanged), and only then is the
// lesson built. This adapter judges the draft at the builder's `room leave` (K12): a failure refuses the leave, the
// run stays open, and the builder fixes it in the same session.
//
//   node claims-draft.mjs <slug> --base=<sha> [--brief=<company/domains/briefs/<f>.md>] [--repo=<path>]
//        --base: the commit the draft started from, as the kernel recorded it (the spec passes ${head_sha}: the commit
//        K7 made when the previous stage left, or the worktree's first commit before any). A full 40-hex sha, never HEAD
//        or a branch (K24/K25 review: K7 never refuses an agent's own commit, so a builder that ran `git commit` before
//        its leave made its self-verified draft the base, and rules 3 and 5 read "exactly as at base"). --brief: the
//        order's brief (${brief_file}); a value that is still a ${…} template, or a missing file, is advisory.
//
// What a draft is (CLAUDE.md "Every factual sentence a learner sees is a claim in that lesson's meta.json, with an
// address, support and source. Builders never mark their own claims verified."; company/roles/demo-builder.md working
// agreement 2 "Claims have addresses"):
//   1. src/demos/<d>/<slug>/meta.json exists and parses, slug and domain match its folder, status is "draft"
//      (tools/company.mjs cmdCheck accepts draft|review|published|retired; build sets review).
//   2. Every claim (the planned learner-visible factual sentences) has an id `<domain>.<slug>.<x>` (unique), its text,
//      an `address` (where the learner sees it: "meta.json hook", "Demo.tsx reveal card", "recall why": the
//      field 80 lessons on disk already carry), support (derivation|simulation|source|convention, claims-guard SUPPORTS)
//      and a source (company check: "a claim without a trail is a feather"). There is at least one.
//   3. No claim is marked by its builder: a claim not exactly as it was at --base (every key but `note`, as gates.mjs
//      claimFindings inherits) is `unverified` with no checkedBy/checkedOn. One exactly as at base keeps its status (a
//      plan revise, or a re-plan after the check routed `--to=draft`, keeps what the fact-checker already verified).
//   4. Brief claims covered: each planned claim of the order's brief section (brief.mjs parseSection, "Not claimed …"
//      items excluded) is named by some claim's `brief` (its number, or a list of numbers), and no claim names a planned
//      claim the brief does not have. A planned claim the lesson will not make is the brief's to change: raise it with
//      the manager, do not drop it here.
//   5. Nothing is built yet: no file of the lesson folder other than meta.json differs from --base (Demo.tsx is the
//      build stage's, after the plan check). A loop back to draft keeps the built Demo.tsx as it was, untouched.
//   6. The draft passes the company's own check for its lesson (B6 dry run: a draft without `evidence` and `confidence`
//      passed rules 1 to 5, and its K7 commit put a lesson on the branch that `company check` fails, "meta.evidence
//      should be object", found only at test1 after a whole build; a 102-character hook the same). `node
//      tools/company.mjs check` runs (runCompanyCheck, as gates.mjs test1), and every error filed under this lesson's
//      address blocks, except the rules about Demo.tsx (DRAFT_EXEMPT: the build's, after the plan check). The other
//      lessons' errors are not the draft's (the company check exits 1 company-wide).
// Advisory only: the recall's `why` is a learner-visible sentence and no claim's address names the recall; claims
// whose support is "source" with a source that names no reference (a bare word).
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], ...}; a "<severity> <kind>: <message>"
// line per non-advisory finding before it. Exit 0 pass, 1 revise (the leave is refused: findings), 2 usage, 3
// stage-error (git failed, not a company checkout). Read-only: it writes nothing.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { DEFAULT_REPO, findLesson, parseArgs, runCompanyCheck } from "./gates.mjs";
import { SUPPORTS, STATUSES, same } from "./claims-guard.mjs";
import { locate, parseSection } from "./brief.mjs";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const USAGE = "usage: claims-draft.mjs <slug> --base=<sha> [--brief=<brief file>] [--repo=<path>]";
const F = (severity, kind, message) => ({ severity, kind, message });
const gitOut = (repo, args) => execFileSync("git", args, { cwd: repo, encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "pipe"] });
/** A claim's keys but `note`, for "exactly as at base" (gates.mjs claimChanges' rule). */
const core = (c) => { const { note, ...rest } = c ?? {}; return rest; };
// Rule 6: company check's lesson errors that are the build's (company.mjs cmdCheck "Demos": missing Demo.tsx, <Lesson>,
// stage controls, storage), not a draft's: a draft has no Demo.tsx, and a loop back to draft keeps the built one as it is
export const DRAFT_EXEMPT = /^missing Demo\.tsx$|Demo\.tsx|no stage controls|must not touch storage/;
/** Pure: rule 6's findings from a parsed company check (gates.mjs parseCheck) for the lesson at `where`. */
export function draftCheckFindings(chk, where) {
  return chk.errors.filter((e) => e.where === where && !DRAFT_EXEMPT.test(e.msg)).map((e) => F("block", "check", `company check: ${e.msg} (the draft's meta.json must pass the company's check; only its Demo.tsx rules wait for the build)`));
}
const nums = (b) => (Array.isArray(b) ? b : b == null ? [] : [b]);

/** Pure: the findings for draft `meta` of lesson `slug` in domain folder `domain`, against `baseMeta` (null: none at
 *  base) and the brief's planned claims (null: no brief). */
export function judgeDraft(meta, { slug, domain, baseMeta = null, planned = null }) {
  const out = [];
  const block = (kind, message) => out.push(F("block", kind, message));
  if (meta.slug !== slug) block("meta", `meta.slug "${meta.slug}" is not the folder's ${slug}`);
  if (meta.domain !== domain) block("meta", `meta.domain "${meta.domain}" is not the folder's ${domain}`);
  if (meta.status !== "draft") block("status", `status is "${meta.status}"; a draft hands over at "draft" (build sets "review" once the plan is checked)`);
  if (!Array.isArray(meta.claims) || !meta.claims.length) { block("claims", "no claims: the draft is the lesson's factual sentences, each a claim (CLAUDE.md)"); return out; }
  const base = new Map((baseMeta?.claims ?? []).map((c) => [c.id, c]));
  const ids = new Set();
  for (const [i, c] of meta.claims.entries()) {
    const at = typeof c?.id === "string" ? c.id : `claims[${i}]`;
    if (!c || typeof c !== "object") { block("claim", `${at} is not an object`); continue; }
    if (typeof c.id !== "string" || !c.id.startsWith(`${domain}.${slug}.`)) block("claim", `${at}: the id must start with ${domain}.${slug}. (company check)`);
    if (ids.has(c.id)) block("claim", `duplicate claim id ${c.id}`);
    ids.add(c.id);
    if (typeof c.text !== "string" || !c.text.trim()) block("claim", `${at} has no text (the sentence the learner will see)`);
    if (typeof c.address !== "string" || !c.address.trim()) block("address", `${at} has no address: where the learner sees it (e.g. "meta.json hook", "Demo.tsx reveal card", "recall why")`);
    if (!SUPPORTS.includes(c.support)) block("claim", `${at} support "${c.support}" is not one of ${SUPPORTS.join("|")}`);
    if (typeof c.source !== "string" || !c.source.trim()) block("claim", `${at} has no source: a claim without a trail is a feather (company check)`);
    if (!STATUSES.includes(c.status)) block("claim", `${at} status "${c.status}" is not one of ${STATUSES.join("|")}`);
    const inherited = base.has(c.id) && same(core(base.get(c.id)), core(c));
    if (!inherited && (c.status !== "unverified" || "checkedBy" in c || "checkedOn" in c)) block("verified-by-builder", `${at} is ${c.status}${c.checkedBy || c.checkedOn ? ` with checkedBy/checkedOn` : ""}: a claim the builder writes or changes is "unverified" with no checkedBy/checkedOn (only the fact-checker's check, stamped by code, verifies it)`);
    if (c.support === "source" && typeof c.source === "string" && c.source.trim() && !/[\s:/.(]/.test(c.source.trim())) out.push(F("advisory", "source", `${at}: support is source, but the source "${c.source}" names no reference a checker can open`));
    if (c.brief != null && !nums(c.brief).every((n) => Number.isInteger(n) && n > 0)) block("brief", `${at}: "brief" is the number of the brief's planned claim it makes (or a list of numbers)`);
  }
  if (planned) {
    const real = planned.filter((p) => !p.notClaimed), want = new Set(real.map((p) => p.n));
    const named = new Set(meta.claims.flatMap((c) => nums(c?.brief)));
    for (const p of real) if (!named.has(p.n)) block("brief-claim", `the brief's planned claim ${p.n} ("${String(p.text).slice(0, 80)}") is made by no claim: give the claim that makes it "brief": ${p.n} (if the lesson will not make it, raise that with the manager: the brief is theirs)`);
    for (const n of named) if (Number.isInteger(n) && !want.has(n)) block("brief-claim", `a claim names the brief's planned claim ${n}, which the brief does not have (its planned claims: ${[...want].join(", ") || "none"})`);
  }
  if (meta.recall?.why && !meta.claims.some((c) => /recall/i.test(String(c?.address ?? "")))) out.push(F("advisory", "recall", "the recall's why is a sentence the learner sees, and no claim's address names the recall"));
  return out;
}

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, findings: [F("environment", "usage", message)], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["repo", "positional", "brief", "base"].includes(k)) return usage(`unknown flag --${k}`);
  const repo = path.resolve(String(o.repo ?? DEFAULT_REPO));
  const [slug, ...extra] = o.positional;
  if (!slug || extra.length || !SLUG.test(slug)) return usage("one kebab-case <slug> is required");
  const env = (message) => ({ exit: 3, out: { ok: false, slug, findings: [F("environment", "repo", message)] } });
  if (!fs.existsSync(path.join(repo, "tools/company.mjs"))) return env(`${repo} is not a System 3 Company checkout (no tools/company.mjs)`);
  if (typeof o.base !== "string" || !/^[0-9a-f]{40}$/.test(o.base)) return usage(`--base=${o.base ?? ""} is not a commit sha: the base is the commit the kernel recorded (\${head_sha}), never HEAD, which an agent's own commit moves`);
  let base;
  try { base = gitOut(repo, ["rev-parse", "--verify", `${o.base}^{commit}`]).trim(); } catch { return usage(`--base=${o.base} is not a commit in ${repo}`); }
  const L = findLesson(repo, slug);
  const findings = [];
  if (!L) findings.push(F("block", "lesson", `no src/demos/<domain>/${slug}/meta.json: the draft is the lesson's meta.json, its claims planned before anything is built`));
  else if (L.parseError || !L.meta) findings.push(F("block", "lesson", `${L.where}/meta.json unreadable: ${L.parseError}`));
  let baseMeta = null, planned = null;
  if (L?.meta) {
    const domain = L.where.split("/")[2];
    try { baseMeta = JSON.parse(gitOut(repo, ["show", `${base}:${L.where}/meta.json`])); } catch { baseMeta = null; } // new since base
    // the brief: the order's own section (brief.mjs), read-only
    const bf = typeof o.brief === "string" ? o.brief : null;
    if (!bf || /\$\{/.test(bf)) findings.push(F("advisory", "brief", "no brief file for this order (its accept text names none): planned claims are not compared"));
    else {
      const abs = path.isAbsolute(bf) ? bf : path.join(repo, bf);
      const text = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
      const loc = text && locate(text, slug);
      if (!loc) findings.push(F("advisory", "brief", `${bf} has no section for ${slug}: planned claims are not compared`));
      else {
        const b = parseSection(loc, bf);
        planned = b.plannedClaims.length ? b.plannedClaims : null;
        if (!planned) findings.push(F("advisory", "brief", `${bf}:${b.line} has no itemised planned claims (${b.plannedClaimsLabel ?? "no claims bullet"}): coverage is the fact-checker's to judge`));
      }
    }
    findings.push(...judgeDraft(L.meta, { slug, domain, baseMeta, planned }));
    // 5. nothing built yet: the lesson folder's other files are as at base (committed, staged, unstaged or untracked)
    let touched;
    try {
      touched = [...gitOut(repo, ["diff", "--name-only", "--no-renames", base, "--", L.where]).split("\n"), ...gitOut(repo, ["ls-files", "--others", "--exclude-per-directory=.gitignore", "--", L.where]).split("\n")].filter(Boolean);
    } catch (e) { return env(`git diff against ${base.slice(0, 7)} failed: ${String(e.message).split("\n")[0]}`); }
    for (const p of [...new Set(touched)].filter((p) => p !== `${L.where}/meta.json`)) findings.push(F("block", "built", `${p} changed since the draft started: the lesson is built after the plan check (build stage), not in the draft`));
    // 6. the company's own check, for this lesson's address (Demo.tsx rules excepted)
    const chk = runCompanyCheck(repo);
    if (chk.problem) return env(chk.problem);
    findings.push(...draftCheckFindings(chk, L.where));
  }
  const ok = !findings.some((f) => f.severity !== "advisory");
  return { exit: ok ? 0 : 1, out: { ok, slug, base, where: L?.where ?? null, version: L?.meta?.version ?? null, claims: Array.isArray(L?.meta?.claims) ? L.meta.claims.length : 0, planned: planned ? planned.filter((p) => !p.notClaimed).map((p) => p.n) : null, findings } };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try { r = main(process.argv.slice(2)); } catch (e) { r = { exit: 3, out: { ok: false, findings: [F("environment", "crash", e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e))] } }; }
  for (const f of r.out.findings ?? []) if (f.severity !== "advisory") console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
