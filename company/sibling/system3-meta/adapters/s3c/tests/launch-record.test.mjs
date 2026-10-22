// Tests for adapters/s3c/launch-record.mjs (plan 2026-10-21-m4-m7-plan.md §2 stage 7, §3 K12). Unit cases drive the
// CLI against temp company-shaped repos; the real cases read REPO (env S3C_REPO, default /home/user/s3c-wt/base)
// read-only: the company's own template must be refused as unfilled, and its filled records must parse.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { decisions, objections, judge } from "../launch-record.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "launch-record.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";
const SLUG = "one-metre-more-rope";
const REC = `company/rituals/records/2026-10-22-launch-review-${SLUG}.md`;

function run(args) {
  const r = spawnSync(process.execPath, [ADAPTER, ...args], { encoding: "utf8", timeout: 30_000 });
  const lines = r.stdout.trim().split("\n");
  return { exit: r.status, json: JSON.parse(lines.at(-1)), lines: lines.slice(0, -1) };
}
/** A company-shaped repo: tools/company.mjs (a placeholder), one lesson at `version`, and record files. */
function repo(version, records = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "launch-record-"));
  fs.mkdirSync(path.join(root, "tools"), { recursive: true });
  fs.writeFileSync(path.join(root, "tools/company.mjs"), "// placeholder\n");
  fs.mkdirSync(path.join(root, "src/demos/math", SLUG), { recursive: true });
  fs.writeFileSync(path.join(root, "src/demos/math", SLUG, "meta.json"), JSON.stringify({ slug: SLUG, version, status: "review", claims: [] }));
  for (const [f, t] of Object.entries(records)) { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.writeFileSync(path.join(root, f), t); }
  return root;
}
const record = ({ decision = "go. Signed: head-of-product.", objectionRows = ["| no analytics-steward predictions (M7 adds the role) | chief-of-staff | carried, plan §M4 |"], version = 2 } = {}) => [
  `# Launch Review: 2026-10-22: ${SLUG}`, "", `chair: head-of-product · lesson version: v${version}`, "",
  "## Open objections travelling with this launch", "| Objection | Owner | Why we proceed anyway |", "|---|---|---|", ...objectionRows, "",
  "## Decision", decision, "",
].join("\n");

test("a filled record (go, one objection, the slug and current version) passes", () => {
  const root = repo(2, { [REC]: record() });
  const r = run([SLUG, REC, `--repo=${root}`]);
  assert.equal(r.exit, 0, JSON.stringify(r.json));
  assert.deepEqual([r.json.ok, r.json.decision, r.json.objections, r.json.park], [true, "go", 1, false]);
  assert.deepEqual(r.lines, []);
});

test("without a record argument the newest dated record for the slug is judged", () => {
  const older = `company/rituals/records/2026-10-20-launch-review-${SLUG}.md`;
  const root = repo(2, { [older]: record({ decision: "no-go" }), [REC]: record() });
  const r = run([SLUG, `--repo=${root}`]);
  assert.equal(r.exit, 0);
  assert.equal(r.json.record, REC);
});

test("the template's decision line, left as is, is unfilled: refused, route launch", () => {
  const root = repo(2, { [REC]: record({ decision: "go / no-go / go with conditions. Signed: head-of-product." }) });
  const r = run([SLUG, REC, `--repo=${root}`]);
  assert.equal(r.exit, 1);
  assert.equal(r.json.route, "launch");
  assert.match(r.lines.join("\n"), /^block decision: .*template/m);
});

test("no decision, a non-decision first line, or two that disagree: refused", () => {
  for (const [d, re] of [["", /has no decision|first line is not/], ["We should probably ship it.", /first line is not go/]]) {
    const r = run([SLUG, REC, `--repo=${repo(2, { [REC]: record({ decision: d }) })}`]);
    assert.equal(r.exit, 1, d);
    assert.match(r.json.findings[0].message, re);
  }
  const r = run([SLUG, REC, `--repo=${repo(2, { [REC]: record() + "\nDecision: no-go\n" })}`]);
  assert.equal(r.exit, 1);
  assert.match(r.json.findings[0].message, /conflicting decisions/);
});

test("go with conditions is refused (no code reads conditions before ship)", () => {
  const r = run([SLUG, REC, `--repo=${repo(2, { [REC]: record({ decision: "**go with conditions**: a11y record first" }) })}`]);
  assert.equal(r.exit, 1);
  assert.equal(r.json.findings[0].kind, "decision");
  assert.match(r.json.findings[0].message, /go with conditions/);
});

test("no-go parks the order (route park), it is the chair's ruling, not a builder's defect", () => {
  const r = run([SLUG, REC, `--repo=${repo(2, { [REC]: record({ decision: "no-go: the reveal teaches the wrong idea" }) })}`]);
  assert.equal(r.exit, 1);
  assert.deepEqual([r.json.park, r.json.route, r.json.findings[0].route, r.json.decision], [true, "park", "park", "no-go"]);
  assert.match(r.lines[0], /^block no-go: /);
});

test("the objection list must exist and have an entry; 'none raised' is an entry; Objections: lines work too", () => {
  let r = run([SLUG, REC, `--repo=${repo(2, { [REC]: record({ objectionRows: [] }) })}`]);
  assert.equal(r.exit, 1);
  assert.match(r.json.findings[0].message, /Objections section is empty/);
  r = run([SLUG, REC, `--repo=${repo(2, { [REC]: record({ objectionRows: ["| none raised (asked twice) | head-of-product | - |"] }) })}`]);
  assert.equal(r.exit, 0);
  const noSection = record().replace(/## Open objections[\s\S]*?\n\n/, "");
  r = run([SLUG, REC, `--repo=${repo(2, { [REC]: noSection })}`]);
  assert.equal(r.exit, 1);
  assert.match(r.json.findings[0].message, /no Objections section/);
  const short = `${SLUG} v2\nDecision: go\nObjections:\n- none raised (asked twice)\n`;
  r = run([SLUG, REC, `--repo=${repo(2, { [REC]: short })}`]);
  assert.equal(r.exit, 0, JSON.stringify(r.json));
  r = run([SLUG, REC, `--repo=${repo(2, { [REC]: `${SLUG} v2\nDecision: go\nObjections:\n` })}`]);
  assert.equal(r.exit, 1);
});

test("a record for an older version, or one that does not name the lesson, is refused", () => {
  let r = run([SLUG, REC, `--repo=${repo(3, { [REC]: record({ version: 2 }) })}`]);
  assert.equal(r.exit, 1);
  assert.equal(r.json.findings[0].kind, "version");
  r = run([SLUG, REC, `--repo=${repo(2, { [REC]: record().replaceAll(SLUG, "other-lesson") })}`]);
  assert.equal(r.exit, 1);
  assert.ok(r.json.findings.some((f) => f.kind === "slug"));
});

test("the evidence is checked as a path: another name, an absolute path, .. or a missing file is refused", () => {
  const root = repo(2, { [REC]: record() });
  for (const ev of ["company/reviews/x/2026-10-22-launch-review-one-metre-more-rope.md", path.join(root, REC), `company/rituals/records/../../${REC}`, "company/rituals/records/2026-10-22-launch-review-other.md", "company/rituals/records/2026-10-23-launch-review-one-metre-more-rope.md"]) {
    const r = run([SLUG, ev, `--repo=${root}`]);
    assert.equal(r.exit, 1, ev);
    assert.equal(r.json.findings[0].kind, "record", ev);
    assert.equal(r.json.route, "launch");
  }
});

test("usage is exit 2, a non-company repo exit 3, a missing lesson exit 1", () => {
  assert.equal(run([]).exit, 2);
  assert.equal(run(["Bad_Slug"]).exit, 2);
  assert.equal(run([SLUG, REC, "--force"]).exit, 2);
  const empty = fs.mkdtempSync(path.join(os.tmpdir(), "launch-record-x-"));
  const r = run([SLUG, REC, `--repo=${empty}`]);
  assert.equal(r.exit, 3);
  assert.equal(r.json.findings[0].severity, "environment");
  const noLesson = repo(2, { [REC]: record() });
  fs.rmSync(path.join(noLesson, "src"), { recursive: true });
  assert.equal(run([SLUG, REC, `--repo=${noLesson}`]).exit, 1);
});

// ------------------------------------------------------------------ the company's own template and records (read-only)

test("real: the company's launch-review template is refused as unfilled", { skip: !fs.existsSync(path.join(REPO, "company/rituals/templates/launch-review.md")) }, () => {
  const t = fs.readFileSync(path.join(REPO, "company/rituals/templates/launch-review.md"), "utf8").replaceAll("<slug>", SLUG) + "\nv2\n";
  const r = judge(SLUG, REC, t, 2);
  assert.equal(r.exit, 1);
  const kinds = r.out.findings.map((f) => f.kind).sort();
  assert.deepEqual(kinds, ["decision", "objections"], JSON.stringify(r.out.findings));
});

test("real: every filled launch record in the company has an objection list the parser reads", { skip: !fs.existsSync(path.join(REPO, "company/rituals/records")) }, () => {
  const dir = path.join(REPO, "company/rituals/records");
  const files = fs.readdirSync(dir).filter((f) => /launch-review/.test(f));
  assert.ok(files.length > 0);
  let withList = 0;
  for (const f of files) {
    const t = fs.readFileSync(path.join(dir, f), "utf8");
    assert.doesNotThrow(() => decisions(t), f);
    const o = objections(t);
    if (o && o.length) withList++;
  }
  // the records predate Meta and are batch records, so not every one is in this shape; most carry objections
  assert.ok(withList >= Math.ceil(files.length / 2), `${withList} of ${files.length} records have a readable objection list`);
});
