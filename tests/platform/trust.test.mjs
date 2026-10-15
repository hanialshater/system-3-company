// W-878: the trust sheet shows only learner-facing support. W-879: withdrawn claims are out of the trust line.
// W-947: publicMeta is an allow-list (internal strings in ./internal-strings.mjs).
// Tests src/lib/trust.ts against fixtures and against every lesson's meta.json.
// Run: npm run test:platform
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { learnerClaims, publicMeta, sourceLinks, trustCounts } from "../../src/lib/trust.ts";
import { INTERNAL_STRINGS } from "./internal-strings.mjs";

const root = new URL("../../src/demos/", import.meta.url);
function allMetas() {
  const out = [];
  for (const domain of fs.readdirSync(root)) {
    const ddir = path.join(root.pathname, domain);
    if (!fs.statSync(ddir).isDirectory()) continue;
    for (const slug of fs.readdirSync(ddir)) {
      const f = path.join(ddir, slug, "meta.json");
      if (fs.existsSync(f)) out.push(JSON.parse(fs.readFileSync(f, "utf8")));
    }
  }
  return out;
}
const metas = allMetas();
const bySlug = (s) => metas.find((m) => m.slug === s);

const claim = (status, source = "Atkins, Physical Chemistry.", extra = {}) => ({
  id: `x.y.c${Math.random().toString(36).slice(2, 6)}`, text: "A claim.", support: "source", source, status, ...extra,
});

test("W-879: withdrawn claims are excluded from numerator and denominator", () => {
  assert.deepEqual(trustCounts([claim("verified"), claim("verified"), claim("withdrawn")]), { total: 2, verified: 2 });
  assert.deepEqual(trustCounts([claim("verified"), claim("unverified"), claim("disputed"), claim("withdrawn")]), { total: 3, verified: 1 });
  assert.deepEqual(trustCounts([claim("withdrawn")]), { total: 0, verified: 0 });
});

test("W-879: news-comes-from-acquaintances reads 4/4, not 4/5 (c5 withdrawn)", () => {
  const m = bySlug("news-comes-from-acquaintances");
  assert.ok(m, "lesson exists");
  assert.equal(m.claims.find((c) => c.id.endsWith(".c5")).status, "withdrawn");
  assert.deepEqual(trustCounts(m.claims), { total: 4, verified: 4 });
});

test("W-879: no lesson's trust line counts a withdrawn claim", () => {
  for (const m of metas) {
    const live = m.claims.filter((c) => c.status !== "withdrawn");
    assert.equal(trustCounts(m.claims).total, live.length, m.slug);
  }
});

test("W-878: a learner claim has text, support, status, address and links only, never the source record", () => {
  const [c] = learnerClaims([
    claim("verified", "Easley & Kleinberg ch. 3 | FACT-CHECK 2026-10-14 (pass NCM-3): VERIFIED. Fact-checker to confirm the citation.", {
      checkedBy: "fact-checker", checkedOn: "2026-10-14",
    }),
  ]);
  assert.deepEqual(Object.keys(c).sort(), ["id", "links", "status", "support", "text"]);
  const shown = JSON.stringify(c);
  for (const leak of ["FACT-CHECK", "NCM-3", "Fact-checker to confirm", "fact-checker"]) assert.ok(!shown.includes(leak), leak);
});

test("W-878: withdrawn claims are not shown on the sheet", () => {
  const m = publicMeta(bySlug("news-comes-from-acquaintances"));
  assert.equal(m.claims.length, 4);
  assert.ok(!m.claims.some((c) => c.id.endsWith(".c5")));
  assert.ok(!JSON.stringify(m.claims).includes("NOT IN LEARNER TEXT"));
});

test("W-878: no lesson's public claims carry a source record or a fact-check note", () => {
  for (const m of metas) {
    const pub = publicMeta(m);
    for (const c of pub.claims) {
      assert.equal("source" in c, false, c.id);
      assert.equal("checkedBy" in c, false, c.id);
      for (const l of c.links) assert.ok(!/FACT-CHECK|NCM-|Fact-checker/i.test(l.href + l.label), c.id);
    }
    assert.ok(!/FACT-CHECK|pass NCM-\d|Fact-checker to confirm/.test(JSON.stringify(pub.claims)), m.slug);
  }
});

test("W-878: openable sources are http(s) links found in the record, trimmed and deduplicated", () => {
  assert.deepEqual(sourceLinks("See https://git-scm.com/docs/git-bisect). And https://git-scm.com/docs/git-bisect."), [
    { href: "https://git-scm.com/docs/git-bisect", label: "git-scm.com" },
  ]);
  assert.deepEqual(sourceLinks("https://www.mit.edu/~kardar/x.pdf; then"), [{ href: "https://www.mit.edu/~kardar/x.pdf", label: "mit.edu" }]);
  assert.deepEqual(sourceLinks("javascript:alert(1) ftp://x.org/a http://localhost:3644/d/x node re-run"), []);
  assert.equal(sourceLinks("a https://a.org/1 b https://b.org/2 c https://c.org/3 d https://d.org/4").length, 3);
});

test("W-947: publicMeta passes exactly the allow-listed fields, evidence as counts", () => {
  const m = bySlug("earliest-finish-wins");
  const pub = publicMeta(m);
  assert.deepEqual(Object.keys(pub).sort(), ["claims", "domain", "evidence", "recall", "slug", "status", "title"]);
  assert.deepEqual(Object.keys(pub.recall).sort(), ["answer", "options", "question", "why"]);
  assert.deepEqual(pub.evidence, {
    qa: m.evidence.qa.length, simulatedLearner: m.evidence.simulatedLearner.length, humanLearners: m.evidence.humanLearners.length,
  });
});

test("W-947: a field added to meta.json later does not reach publicMeta", () => {
  const m = { ...bySlug("earliest-finish-wins"), secretNote: "BUILDER NOTE: do not ship", recall: { ...bySlug("earliest-finish-wins").recall, note: "x" } };
  const shown = JSON.stringify(publicMeta(m));
  assert.ok(!shown.includes("secretNote") && !shown.includes("BUILDER NOTE"));
  assert.ok(!shown.includes('"note"'));
});

test("W-947: no lesson's publicMeta carries an internal string (reference notes, owner, evidence paths, keyState)", () => {
  for (const m of metas) {
    const shown = JSON.stringify(publicMeta(m));
    for (const s of INTERNAL_STRINGS) assert.ok(!shown.includes(s), `${m.slug}: ${s}`);
  }
});
