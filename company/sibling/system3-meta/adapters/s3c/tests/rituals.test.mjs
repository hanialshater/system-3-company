// Tests for adapters/s3c/rituals.mjs (plan 2026-10-21-m4-m7-plan.md §M7 K18, exit criteria 1-2). Unit cases cover the
// parsers and the seating rule; the rest run the company's REAL tools (tools/rituals-due.mjs, tools/company.mjs ritual
// and status, copied from the main checkout) in a temp repo with an integration worktree on meta/t7 (tests/m7-fixture.mjs).
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDueText, templateChair, seats, dueOrders, section, filled, LOOP_ORDER } from "../rituals.mjs";
import { companyRepo, git, run, w, MAIN } from "./m7-fixture.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "rituals.mjs");
const ROLES = ["chief-of-staff", "head-of-product", "cm-math", "cm-cs", "demo-builder", "fact-checker", "learner-evaluator", "analytics-steward", "release-manager"];
const tpl = (r) => fs.readFileSync(path.join(MAIN, "company/rituals/templates", `${r}.md`), "utf8");

test("parseDueText reads rituals-due's text rows (the fallback when --json cannot be read)", () => {
  const rows = parseDueText("ok   retro           last 2026-10-20 08:31  \nDUE  wbr             last 2026-10-17 21:45  108 h (limit 24 h)\nDUE  launch-review   last never             1 review event(s) since last (threshold 1); a new x  [held: event e (publish, secondary)]\n");
  assert.deepEqual(rows.map((r) => [r.ritual, r.due, r.last, r.reasons, r.heldBy]), [
    ["retro", false, "2026-10-20 08:31", [], null],
    ["wbr", true, "2026-10-17 21:45", ["108 h (limit 24 h)"], null],
    ["launch-review", true, null, ["1 review event(s) since last (threshold 1)", "a new x"], "event e (publish, secondary)"],
  ]);
  // an ok row keeps its held part (M7 review: it was read as a reason)
  const ok = parseDueText("ok   retro           last 2026-10-16 16:42    [held: record company/rituals/records/2026-10-16-retro-books100.md]\nok   founder-digest  last never             \n");
  assert.deepEqual(ok.map((r) => [r.ritual, r.due, r.reasons, r.heldBy]), [["retro", false, [], "record company/rituals/records/2026-10-16-retro-books100.md"], ["founder-digest", false, [], null]]);
});

test("chairs: the plan's for wbr, digest, retro and crit; the company templates' chair/owner lines for the rest; a chair not in the run is stood in for by the chief of staff, design-lead's design review by the head of product", () => {
  assert.equal(templateChair(tpl("ops-review")), "principal-engineer-ops");
  assert.equal(templateChair(tpl("project-review")), "founder");
  assert.equal(templateChair(tpl("rnd-review")), "vp-rnd");
  assert.equal(templateChair(tpl("vertical-review")), "principal-pm-verticals");
  assert.equal(templateChair(tpl("retro")), "chief-of-staff");
  assert.deepEqual(seats("wbr", { roles: ROLES }), { chair: "chief-of-staff", attendee: "analytics-steward", owner: "chief-of-staff", proxyFor: null });
  assert.deepEqual(seats("demo-crit", { roles: ROLES, template: tpl("demo-crit") }), { chair: "head-of-product", attendee: "chief-of-staff", owner: "head-of-product", proxyFor: null });
  assert.deepEqual(seats("design-review", { roles: ROLES }), { chair: "head-of-product", attendee: "chief-of-staff", owner: "design-lead", proxyFor: "design-lead" }, "a stated proxy for design-lead");
  assert.equal(seats("design-review", { roles: [...ROLES, "design-lead"] }).chair, "design-lead", "the owner chairs when it is in the run");
  assert.equal(seats("design-review", { roles: ROLES.filter((r) => r !== "head-of-product") }).chair, "chief-of-staff");
  assert.deepEqual(seats("retro", { roles: ROLES, template: tpl("retro") }), { chair: "chief-of-staff", attendee: "head-of-product", owner: "chief-of-staff", proxyFor: null });
  assert.deepEqual(seats("ops-review", { roles: ROLES, template: tpl("ops-review") }), { chair: "chief-of-staff", attendee: "head-of-product", owner: "principal-engineer-ops", proxyFor: "principal-engineer-ops" });
  assert.deepEqual(seats("project-review", { roles: ROLES, template: tpl("project-review") }).proxyFor, "founder");
  assert.equal(seats("wbr", { roles: ROLES.filter((r) => r !== "analytics-steward") }).attendee, "head-of-product", "no analytics-steward: the default second voice");
});

test("dueOrders: one order per DUE ritual, in the operating loop's order, skipping the rituals another flow holds", () => {
  const due = ["project-review", "rnd-review", "ops-review", "vertical-review", "wbr", "demo-crit", "design-review", "founder-digest", "launch-review", "retro"].map((r) => ({ ritual: r, due: true, reasons: [`${r} reason`] }));
  due.push({ ritual: "cycle-planning", due: false, reasons: [] });
  const d = dueOrders({ due, roles: ROLES, skip: ["launch-review"], budget: 250000, templates: { "vertical-review": tpl("vertical-review") }, now: new Date("2026-10-22T10:05:00Z") });
  // company/ops/operating-loop.md §B: digest → retro → WBR → launch review → design review, demo crit → vertical review
  // → ops review → R&D review; a ritual it does not name comes after
  assert.deepEqual(d.orders.map((o) => o.slug), ["founder-digest", "retro", "wbr", "design-review", "demo-crit", "vertical-review", "ops-review", "rnd-review", "project-review"]);
  assert.deepEqual(LOOP_ORDER, ["founder-digest", "retro", "wbr", "launch-review", "design-review", "demo-crit", "vertical-review", "ops-review", "rnd-review"]);
  const loop = fs.readFileSync(path.join(MAIN, "company/ops/operating-loop.md"), "utf8");
  assert.match(loop, /founder digest \(12 h\) → retro \(5 merges or incident\) → WBR \(24 h or 10 merges\) → launch review \(after each check batch\) → design review, demo crit → vertical review \(before work on a new founder direction\) → ops review → R&D review/, "the order is the operating loop's, as written");
  const wbr = d.orders.find((o) => o.slug === "wbr");
  assert.deepEqual([wbr.key, wbr.task, wbr.chair, wbr.attendee, wbr.budget], ["ritual:wbr", "RITUAL-wbr-202610221005", "chief-of-staff", "analytics-steward", 250000]);
  assert.match(wbr.accept, /ritual wbr .* is DUE: wbr reason/);
  assert.match(wbr.accept, /`## Decision` section .* `## Objections` section/);
  assert.match(d.orders.find((o) => o.slug === "vertical-review").accept, /standing in for principal-pm-verticals/, "a proxy chair is named in the order");
});

test("section(): the body under a heading, comments taken out", () => {
  const t = "# R\n\n## Decision\n\n<!-- stub -->\n\n## Objections\n- none raised\n\n### sub\nx\n## Next\n";
  assert.equal(section(t, /^#{2,3}\s+Decisions?\s*$/im), "");
  assert.equal(section(t, /^#{2,3}\s+Objections\b.*$/im), "- none raised\n\n### sub\nx");
  // an empty template table is not content; a data row is
  assert.equal(filled("| Decision | Objection | Status | Owner |\n|---|---|---|---|\n"), false);
  assert.equal(filled("| Decision | Objection |\n|---|---|\n| keep | none raised |"), true);
  assert.equal(filled("- \n<slug>\nTBD"), false);
});

test("due on the company's real rituals-due: the DUE rituals as orders; launch-review skipped; exit 3 when the tool is missing", () => {
  const c = companyRepo();
  const r = run(ADAPTER, ["due", `--repo=${c.int}`, `--roles=${ROLES.join(",")}`, "--skip=launch-review"]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  // a repo with no records: every ritual with an hour clock is DUE (never held); counters need events
  const slugs = r.json.orders.map((o) => o.slug);
  for (const s of ["founder-digest", "wbr", "ops-review", "vertical-review", "rnd-review", "project-review"]) assert.ok(slugs.includes(s), `${s} in ${slugs}`);
  assert.ok(!slugs.includes("retro") && !slugs.includes("demo-crit"), "counters with no events are not due");
  assert.equal(slugs[0], "founder-digest");
  assert.ok(r.json.findings.some((f) => f.kind === "proxy" && /project-review: chief-of-staff stands in for founder/.test(f.message)));
  fs.rmSync(path.join(c.int, "tools/rituals-due.mjs"));
  const x = run(ADAPTER, ["due", `--repo=${c.int}`, `--roles=${ROLES.join(",")}`]);
  assert.equal(x.exit, 3);
  assert.equal(run(ADAPTER, ["due", `--repo=${c.int}`]).exit, 2, "--roles is required");
});

test("scaffold → record → ship: company ritual where the company has it, the template elsewhere, a skeleton with no template; the record is checked, shipped alone, and rituals-due reads it as held", () => {
  const c = companyRepo();
  const base = c.sha("meta/t7");
  // wbr: through `node tools/company.mjs ritual wbr` (the RITUALS table, read from its usage line)
  const wt = c.order("RITUAL-wbr-1");
  let r = run(ADAPTER, ["scaffold", "wbr", `--repo=${wt}`, `--base=${base}`, "--order=O-1"]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  assert.deepEqual([r.json.created, r.json.via], [true, "company ritual"]);
  const rec = r.json.record;
  assert.match(rec, /^company\/rituals\/records\/\d{4}-\d{2}-\d{2}-wbr\.md$/);
  const text = fs.readFileSync(path.join(wt, rec), "utf8");
  assert.match(text, /^# Weekly Business Review/);
  assert.match(text, /Held through System 3 Meta \(order O-1\)/);
  assert.match(text, /## Decision\n\n<!--/, "the WBR template has no Decision section: the scaffold adds one");
  assert.match(text, /## 6\. Objections carried into this week/, "it has its own Objections section: no stub");
  assert.ok(!/## Objections\n\n<!--/.test(text));
  // a second scaffold (a revise back to run) reuses it
  r = run(ADAPTER, ["scaffold", "wbr", `--repo=${wt}`, `--base=${base}`]);
  assert.deepEqual([r.exit, r.json.created, r.json.record], [0, false, rec]);
  // record: the stubs are not a decision; another path is refused; a filled record passes
  r = run(ADAPTER, ["record", "wbr", `--repo=${wt}`, `--base=${base}`, `--evidence=${rec}`]);
  assert.equal(r.exit, 1);
  assert.deepEqual(r.json.findings.map((f) => f.kind).sort(), ["decision", "objections"]);
  w(wt, "company/ops/board.json", "{}\n");
  fs.writeFileSync(path.join(wt, rec), text.replace(/## Decision\n\n<!--[^\n]*-->/, "## Decision\n\n- keep: the M7 cycle runs as planned").replace("| Decision | Objection | Status | Owner |\n|---|---|---|---|\n", "| Decision | Objection | Status | Owner |\n|---|---|---|---|\n| keep the cycle | none raised | - | chief-of-staff |\n"));
  r = run(ADAPTER, ["record", "wbr", `--repo=${wt}`, `--base=${base}`, `--evidence=${rec}`]);
  assert.deepEqual([r.exit, r.json.findings.map((f) => f.kind)], [1, ["scope"]]);
  assert.match(r.json.findings[0].message, /company\/ops\/board\.json/);
  git(wt, "checkout", "--", "company/ops/board.json");
  assert.equal(run(ADAPTER, ["record", "wbr", `--repo=${wt}`, `--base=${base}`, "--evidence=elsewhere.md"]).json.findings[0].kind, "evidence");
  r = run(ADAPTER, ["record", "wbr", `--repo=${wt}`, `--base=${base}`, `--evidence=${rec}`]);
  assert.deepEqual([r.exit, r.json.ok, r.json.record], [0, true, rec]);
  // ship: from the order's last commit (K7 commits each stage), into the integration worktree, alone
  git(wt, "add", "-A"); git(wt, "commit", "-qm", "meta: O-1 check wbr");
  const head = c.sha("HEAD", wt);
  w(c.int, "company/ops/founder-inbox.json", "{}\n"); // an unrelated change there is left alone
  const before = run(path.join(c.int, "tools/rituals-due.mjs"), ["--json"]).stdout;
  assert.ok(JSON.parse(before).find((x) => x.ritual === "wbr").due);
  r = run(ADAPTER, ["ship", "wbr", `--repo=${wt}`, `--base=${base}`, `--from-sha=${head}`, `--into=${c.int}`, "--order=O-1"]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  assert.deepEqual([r.json.record, r.json.into, !!r.json.committed], [rec, "meta/t7", true]);
  assert.equal(git(c.int, "show", "--name-only", "--format=%s", "HEAD"), `meta: wbr record (O-1), the ritual flow's ship (chief-of-staff code step)\n\n${rec}`);
  assert.equal(git(c.int, "status", "--porcelain"), "?? company/ops/founder-inbox.json");
  assert.match(r.json.heldBy, /^record company\/rituals\/records\/.*-wbr\.md$/);
  // a re-run is a no-op; a different record of the same name on the integration branch parks
  r = run(ADAPTER, ["ship", "wbr", `--repo=${wt}`, `--base=${base}`, `--from-sha=${head}`, `--into=${c.int}`]);
  assert.deepEqual([r.exit, r.json.unchanged], [0, true]);
  fs.appendFileSync(path.join(wt, rec), "\nlater edit\n"); git(wt, "commit", "-qam", "edit");
  r = run(ADAPTER, ["ship", "wbr", `--repo=${wt}`, `--base=${base}`, `--from-sha=${c.sha("HEAD", wt)}`, `--into=${c.int}`]);
  assert.deepEqual([r.exit, r.json.route], [1, "park"]);
  // never into a primary checkout (the main checkout's shape: a .git directory)
  r = run(ADAPTER, ["ship", "wbr", `--repo=${wt}`, `--base=${base}`, `--from-sha=${head}`, `--into=${c.root}`]);
  assert.equal(r.exit, 2);
  assert.match(r.json.findings[0].message, /not a linked worktree/);
});

test("scaffold: retro from its template ({{snapshot}} from company status), founder-digest from a skeleton", () => {
  const c = companyRepo();
  const base = c.sha("meta/t7");
  const wt = c.order("RITUAL-retro-1");
  let r = run(ADAPTER, ["scaffold", "retro", `--repo=${wt}`, `--base=${base}`]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  assert.equal(r.json.via, "template");
  const t = fs.readFileSync(path.join(wt, r.json.record), "utf8");
  assert.match(t, /^# Retro: \d{4}-\d{2}-\d{2}/);
  // the company's short snapshot (what `company ritual` puts in for {{snapshot}}), not the whole status page
  assert.match(t, /Generated by `company status` on \d{4}-\d{2}-\d{2}[\s\S]*\| Lessons \| draft \| review \| published \| retired \| open claims \|/);
  assert.ok(!/operating picture/.test(t), "not the whole status page");
  assert.ok(!t.includes("{{"), "no template variable left");
  const wt2 = c.order("RITUAL-founder-digest-1");
  r = run(ADAPTER, ["scaffold", "founder-digest", `--repo=${wt2}`, `--base=${base}`]);
  assert.deepEqual([r.exit, r.json.via], [0, "skeleton"]);
  const d = fs.readFileSync(path.join(wt2, r.json.record), "utf8");
  assert.match(d, /# Founder digest ·[\s\S]*## Decisions waiting for you[\s\S]*## Decision\n[\s\S]*## Objections/);
  // the company's own rule names the file founder-digest (not, say, founder)
  assert.match(r.json.record, /-founder-digest\.md$/);
});
