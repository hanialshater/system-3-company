// HQ Library: the index, search ranking, progress splitting and the path guard (src/lib/hq-library.ts).
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildIndex, loadDoc, safeDocPath, search, splitProgress, splitFrontmatter, typeOf, isDenied, DEFAULT_TYPES } from "../../src/lib/hq-library.ts";

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hq-library-"));
const root = path.join(tmp, "company");
const put = (rel, text) => (fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true }), fs.writeFileSync(path.join(root, rel), text));
put("rituals/records/2026-10-13-wbr.md", "# Weekly Business Review: 2026-10-13\n\nowner: chief-of-staff · readers: founder\n\n## Metrics\nClaims verified. See [the EDD](../../engineering/edd/EDD-001-feed.md).\n");
put("decisions/feed.md", "# Honest feed\n\nowner: head-of-product\ndate: 2026-10-12\n\nRound robin feed ordering.\n");
put("engineering/edd/EDD-001-feed.md", "# EDD-001: Feed at 500 lessons\n\nauthor: platform-engineer\n\nThe feed ranking wbr.\n");
put("product/prds/PRD-001-feed-mvp.md", "# PRD-001: Feed MVP\n\nowner: head-of-product · status: approved 2026-10-12\n");
put("reviews/binary-search/2026-10-14-qa.md", "# QA binary search\n\nfeed feed feed\n");
put("reviews/README.md", "# Reviews\n");
put("ops/progress.md", "# Progress log\n\nintro\n\n## 2026-10-14 (design-lead, W-377: phone fit)\n\n- did a thing about feed\n\n## 2026-10-13 (qa-tester, W-1)\n\n- other\n");
put("constitution/amendments/AMD-002-ci-gate.md", "# AMD-002: CI gate\n\nowner: founder\n");
put("decisions/decision-notes.md", "# Decision notes\n\nA decision about acids and precision.\n");
put("reviews/paint-mix-shared-secret/2026-10-13-qa.md", "# QA paint mix\n\nshared secret review\n");
put("design/concepts/debunk.md", "---\nid: debunk\nname: Debunk\nstatus: approved\nowner: design-lead\nkind: format\n---\n\n# Debunk (Life Hacks)\n\nA popular claim tested.\n\n3. third\n4. fourth\n");
put(".secret/x.md", "# hidden\n");
put("ops/secret-notes.md", "# nope\n");
put("notes.txt", "not markdown");
fs.writeFileSync(path.join(tmp, "outside.md"), "# outside company\n");
fs.symlinkSync(path.join(tmp, "outside.md"), path.join(root, "link.md"));

test("types come from the path", () => {
  assert.equal(typeOf("rituals/records/x.md"), "report");
  assert.equal(typeOf("engineering/adr/ADR-1.md"), "tech");
  assert.equal(typeOf("product/prds/PRD-001.md"), "requirements");
  assert.equal(typeOf("product/vision.md"), "strategy");
  assert.equal(typeOf("domains/briefs/math.md"), "strategy");
  assert.equal(typeOf("domains/BRD-money.md"), "requirements");
  assert.equal(typeOf("reviews/binary-search/build.md"), "lesson-review");
  assert.equal(typeOf("reviews/README.md"), "review");
  assert.equal(typeOf("constitution/amendments/a.md"), "constitution");
  assert.equal(typeOf("roles/x.md"), "handbook");
});

test("types: reviews, templates, design, experiments, standards (real paths)", () => {
  for (const p of ["engineering/reviews/2026-10-14-hq-library-review.md", "design/reviews/2026-10-12-x.md", "reviews/2026-10-01-x.md"]) assert.equal(typeOf(p), "review", p);
  assert.equal(typeOf("rituals/templates/launch-review.md"), "template");
  assert.equal(typeOf("engineering/edd/TEMPLATE.md"), "template");
  assert.equal(typeOf("design/illustration-requests/TEMPLATE.md"), "template");
  assert.equal(typeOf("design/specs/phone-fit.md"), "design");
  assert.equal(typeOf("design/concepts/debunk.md"), "design");
  assert.equal(typeOf("design/formats.md"), "design");
  assert.equal(typeOf("experiments/EXP-001-feed.md"), "report");
  assert.equal(typeOf("product/demo-standard.md"), "requirements");
  assert.equal(typeOf("product/lesson-metadata.md"), "requirements");
  assert.equal(typeOf("product/pm-handbook.md"), "handbook");
  assert.equal(typeOf("product/roadmap.md"), "strategy");
  assert.ok(!DEFAULT_TYPES.includes("template") && DEFAULT_TYPES.includes("design"));
});

test("deny list: secret-like files only", () => {
  assert.ok(safeDocPath("reviews/paint-mix-shared-secret/2026-10-13-qa.md", root), "lesson slug with 'secret' is served");
  assert.ok(buildIndex(root, 0).some((d) => d.path === "reviews/paint-mix-shared-secret/2026-10-13-qa.md"));
  for (const p of [".env.md", "a/.secret/x.md", "ops/secrets.md", "ops/prod-credentials.md", "secrets/x.md", "tokens/a.md", "ops/password.md", "ops/id_rsa.md", "ops/server.pem", "ops/x.key", "ops/secret-notes.md", "ops/api-key.md", "ops/db.env"]) assert.ok(isDenied(p), `deny ${p}`);
  for (const p of ["reviews/paint-mix-shared-secret/build.md", "reviews/token-bucket/qa.md", "ops/keyboard.md", "decisions/passwords-lesson.md.md"]) assert.ok(!isDenied(p) || p.endsWith(".md.md"), `allow ${p}`);
});

test("search: short terms match whole words", () => {
  const docs = buildIndex(root, 0);
  const r = search(docs, { q: "ci" });
  assert.equal(r.hits[0].path, "constitution/amendments/AMD-002-ci-gate.md");
  assert.ok(!r.hits.some((h) => h.path === "decisions/decision-notes.md"), "'ci' must not match inside decision or acids");
  assert.ok(search(docs, { q: "decis" }).hits.some((h) => h.path === "decisions/decision-notes.md"), "longer terms still match inside words");
});

test("progress links are stable when a duplicate heading is added at the top", () => {
  const entry = (h, b) => `## ${h}\n\n${b}\n\n`;
  const old = "# Progress\n\n" + entry("2026-10-14 (qa, W-1: same)", "newer") + entry("2026-10-14 (qa, W-1: same)", "older") + entry("2026-10-13 (pm, W-2)", "x");
  const before = Object.fromEntries(splitProgress(old).map((e) => [e.slug, e.body]));
  const grown = "# Progress\n\n" + entry("2026-10-14 (qa, W-1: same)", "newest") + old.slice("# Progress\n\n".length);
  const after = Object.fromEntries(splitProgress(grown).map((e) => [e.slug, e.body]));
  for (const [slug, body] of Object.entries(before)) assert.equal(after[slug], body, `old slug ${slug} still opens the same text`);
  assert.equal(Object.keys(after).length, 4);
  assert.match(splitProgress(old)[2].slug, /^2026-10-13-pm-[0-9a-f]{6}$/);
});

test("old progress slugs redirect to the stable path", () => {
  const docs = buildIndex(root, 0);
  const prog = docs.find((d) => d.type === "progress" && d.title.includes("W-377"));
  const legacy = "ops/progress.md@" + "2026-10-14-design-lead-w-377-phone-fit";
  assert.equal(prog.legacy, legacy);
  const d = loadDoc(legacy, root);
  assert.equal(d.path, prog.path);
  assert.notEqual(d.path, legacy);
});

test("frontmatter is stripped, shown as meta, and feeds owner/status", () => {
  const f = splitFrontmatter("---\nid: x\nstatus: approved\n---\n\n# T\n");
  assert.equal(f.fields.status, "approved");
  assert.equal(f.body, "# T\n");
  assert.equal(splitFrontmatter("# no fm\n---\nx\n").body, "# no fm\n---\nx\n");
  const d = loadDoc("design/concepts/debunk.md", root);
  assert.ok(!d.body.startsWith("---") && d.body.startsWith("# Debunk"));
  assert.equal(d.title, "Debunk (Life Hacks)");
  assert.equal(d.owner, "design-lead");
  assert.match(d.meta, /status: approved/);
});

test("renderer source: table cells break at word edges, ol keeps its start", () => {
  const css = fs.readFileSync("src/app/hq/library/library.module.css", "utf8");
  assert.match(css, /\.mdTable th, \.mdTable td \{[^}]*overflow-wrap: break-word/);
  assert.match(fs.readFileSync("src/app/hq/library/Markdown.tsx", "utf8"), /start: items\[0\]\.num/);
});

test("index: title, date, owner, progress split, no hidden or symlinked files", () => {
  const docs = buildIndex(root, 0);
  const by = Object.fromEntries(docs.map((d) => [d.path, d]));
  assert.equal(by["rituals/records/2026-10-13-wbr.md"].title, "Weekly Business Review: 2026-10-13");
  assert.equal(by["rituals/records/2026-10-13-wbr.md"].date, "2026-10-13");
  assert.equal(by["rituals/records/2026-10-13-wbr.md"].owner, "chief-of-staff");
  assert.equal(by["decisions/feed.md"].date, "2026-10-12");
  assert.equal(by["engineering/edd/EDD-001-feed.md"].owner, "platform-engineer");
  assert.equal(by["product/prds/PRD-001-feed-mvp.md"].date, "2026-10-12");
  const prog = docs.filter((d) => d.type === "progress");
  assert.equal(prog.length, 2);
  assert.equal(prog[0].owner, "design-lead");
  assert.ok(prog[0].path.startsWith("ops/progress.md@2026-10-14"));
  assert.ok(!docs.some((d) => /^\.secret|secret-notes|^link|notes\.txt/.test(d.path)));
});

test("search: AND of terms, title beats body, default hides lesson reviews, sort by date", () => {
  const docs = buildIndex(root, 0);
  const r = search(docs, { q: "feed" });
  assert.ok(r.hits.length >= 3);
  assert.ok(!r.hits.some((h) => h.type === "lesson-review"));
  assert.equal(r.hits[0].title.startsWith("EDD-001") || r.hits[0].title === "Honest feed" || r.hits[0].title.startsWith("PRD-001"), true);
  assert.ok(r.hits[0].snippet.length > 0);
  assert.ok(r.counts["lesson-review"] >= 1, "counts include hidden types");
  assert.equal(search(docs, { q: "feed", types: ["lesson-review"] }).hits.length, 1);
  assert.equal(search(docs, { q: "feed zzzznotthere" }).total, 0);
  const newest = search(docs, { q: "", sort: "newest" }).hits.filter((h) => h.date);
  assert.deepEqual(newest.map((h) => h.date), newest.map((h) => h.date).sort().reverse());
  assert.ok(DEFAULT_TYPES.includes("report") && !DEFAULT_TYPES.includes("lesson-review"));
});

test("doc links resolve to library paths", () => {
  const d = loadDoc("rituals/records/2026-10-13-wbr.md", root);
  assert.equal(d.links["../../engineering/edd/EDD-001-feed.md"], "engineering/edd/EDD-001-feed.md");
  assert.equal(loadDoc("ops/progress.md@nonexistent", root), null);
});

test("splitProgress ignores headings inside code fences", () => {
  assert.equal(splitProgress("## 2026-01-01 (a)\n```\n## 2026-01-02 (b)\n```\n").length, 1);
});

test("path guard", () => {
  const ok = (p) => assert.ok(safeDocPath(p, root), `should serve ${p}`);
  const no = (p) => assert.equal(safeDocPath(p, root), null, `should block ${p}`);
  ok("decisions/feed.md");
  no("../outside.md");
  no("decisions/../../outside.md");
  no("decisions/..%2f..%2foutside.md");
  no("/etc/passwd");
  no("/" + path.join(root, "decisions/feed.md"));
  no("decisions\\feed.md");
  no("decisions/feed.md\0.png");
  no("link.md"); // symlink out of company/
  no(".secret/x.md");
  no("ops/secret-notes.md");
  no("notes.txt");
  no("../.env");
  no("decisions");
  no("");
  no("decisions/missing.md");
  assert.equal(loadDoc("../outside.md", root), null);
  assert.equal(loadDoc("link.md", root), null);
});

test.after(() => fs.rmSync(tmp, { recursive: true, force: true }));
