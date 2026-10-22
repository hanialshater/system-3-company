#!/usr/bin/env node
// holds.mjs: the System 3 Meta plan pre-check for publish holds (plan 2026-10-21-m4-m7-plan.md §4 row `holds.mjs`:
// "If a hold exists, the order is parked with an ask before any session is spent"; §2 ship routing table: "active
// publish hold → park + ask to head-of-product"; §3 K8 park). Read-only.
//
//   node holds.mjs <slug> [--repo=<path>]
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], ...}. Exit 0 = no hold, 1 = held
// (park:true, route park, plus the ask the supervisor raises), 2 usage, 3 stage-error (hold file unreadable).
//
// What a hold is, read from the company code, not guessed:
//   - the file is company/ops/publish-holds.json, `{ "note": …, "holds": { "<slug>": "<reason>" } }`, keyed by
//     meta.slug (company.mjs readinessGates: `opts.holds[meta.slug]`; readiness.mjs loadContext: `holds[meta.slug]`);
//   - the lookup is plain property access, NOT an own-property test, because that is what the company does: a JSON
//     object inherits Object.prototype, so slug "constructor" (valid kebab-case, and the only Object.prototype key
//     that is) reads Object.prototype.constructor, which is truthy, and company publish refuses with "active publish
//     hold: function Object() { [native code] }". Mirroring that keeps this pre-check from passing an order that
//     ship would park; the finding says the hold is inherited (`inherited: true`) so the ask can name the real cause;
//   - a hold is active when its value is truthy (readiness.mjs readiness(): `if (ctx.hold)`; company.mjs
//     readinessGates: `if (opts.holds[meta.slug] …)`), so "" or null is no hold;
//   - a missing file is no holds; an unparseable file, or `holds` that is not a plain object, closes every gate
//     (company.mjs readHolds returns null → "publish-holds.json is unreadable; every gate is closed", AMD-013 hold
//     floor). That is the company's environment failing, not this lesson's defect, so it is exit 3, not a park.
// readHolds is the sibling gates.mjs copy of company.mjs readHolds (company.mjs is protected and runs its CLI on
// import, so it cannot be imported). The lesson need not exist yet: this runs before the build stage.
//
// Who the ask goes to: head-of-product owns publish holds' rulings (the hold reasons name head-of-product rulings
// and the chief of staff; plan §2 table names head-of-product). The supervisor decides how to raise it (K8/K9 ask
// `kind:decision`); this adapter only names it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_REPO, readHolds, parseArgs } from "./gates.mjs";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/; // company.mjs cmdNewDemo slug rule
const USAGE = "usage: holds.mjs <slug> [--repo=<path>]";
export const HOLDS_FILE = "company/ops/publish-holds.json";

export function check(repo, slug) {
  const holds = readHolds(repo);
  if (holds === null)
    return { exit: 3, out: { ok: false, stage: "holds", slug, park: false, findings: [{ severity: "environment", kind: "hold-file", message: `${HOLDS_FILE} is unreadable; company.mjs closes every gate until it parses (AMD-013 hold floor)` }] } };
  const hold = holds[slug] ?? null; // company.mjs readinessGates `opts.holds[meta.slug]`; readiness.mjs `holds[meta.slug] ?? null`
  if (!hold) return { exit: 0, out: { ok: true, stage: "holds", slug, park: false, hold: null, findings: [] } };
  const reason = String(hold); // readinessGates / readiness() interpolate the value: `active publish hold: ${…}`
  const inherited = !Object.hasOwn(holds, slug);
  const lift = inherited
    ? `The company reads ${HOLDS_FILE} holds["${slug}"] by plain property access, which finds the inherited Object.prototype.${slug}; no hold file edit can lift it (company.mjs and tools/lib/readiness.mjs would have to use an own-property lookup), so rename the slug or keep the order parked.`
    : "Lift it, or keep the order parked.";
  return {
    exit: 1,
    out: {
      ok: false,
      stage: "holds",
      slug,
      park: true,
      hold: reason,
      inherited,
      ask: { kind: "decision", to: "head-of-product", text: `${slug} has an active publish hold (${HOLDS_FILE}): ${reason}. ${lift}` },
      findings: [{ severity: "block", kind: "hold", route: "park", message: `active publish hold: ${reason}` }], // launchGates' wording
    },
  };
}

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, findings: [{ severity: "environment", kind: "usage", message }], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["repo", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  const repo = path.resolve(String(o.repo ?? DEFAULT_REPO));
  const [slug, ...extra] = o.positional;
  if (!slug || extra.length || !SLUG.test(slug)) return usage("one kebab-case <slug> is required");
  if (!fs.existsSync(path.join(repo, "tools/company.mjs")))
    return { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "repo", message: `${repo} is not a System 3 Company checkout (no tools/company.mjs)` }] } };
  return check(repo, slug);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try {
    r = main(process.argv.slice(2));
  } catch (e) {
    r = { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "crash", message: e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e) }] } };
  }
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
