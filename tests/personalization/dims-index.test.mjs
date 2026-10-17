// D2 (company/personalization/batches/2026-10-17-batch-5.md §6, W-1572): the client dims index.
//
//   npm run test:dims
//
// 1. src/lib/learner/dims-index.generated.ts is exactly what company/personalization/dims/build-index.mjs builds
//    from today's tree, and two builds are byte-identical (no clock, no randomness, no environment).
// 2. Every lesson the feed lists (src/lib/visibility.ts, default environment) is in it, and nothing else.
// 3. Every status is exactly meta.json's status.
// 4. The written order rule (company/personalization/policies/default-order-rule.md, steps 1-4, from dims fields
//    slug, domain and status only) over the pilot entries equals the product's feedOrder("all")
//    (src/lib/feed-index.ts) with non-pilot lessons removed; and code-unit order equals localeCompare on the slugs.
// 5. Hygiene: the module carries no internal string a client chunk must not carry (W-946/W-947), no placeholder
//    strength, and the pilot entries match the simulator's catalogue (company/personalization/model/sim/catalog.mjs)
//    once successors are restricted to the pilot domains.
// Owner: lesson-dims-owner. If (1) fails after a meta.json or curriculum change: rerun the build script and commit.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { buildDims, render, OUT, PILOT } from "../../company/personalization/dims/build-index.mjs";
import { loadCatalog } from "../../company/personalization/model/sim/catalog.mjs";
import { INTERNAL_STRINGS } from "../platform/internal-strings.mjs";

register("./dims-loader.mjs", import.meta.url);
for (const k of ["SHOW_REVIEW", "SHOW_DRAFTS", "VERCEL", "VERCEL_ENV"]) delete process.env[k];

const repo = path.resolve(new URL("../..", import.meta.url).pathname);
const built = await buildDims(repo);
const committed = fs.readFileSync(path.join(repo, OUT), "utf8");
const { dims, DIMS_HEADER } = await import(path.join(repo, OUT));
const { statusVisible } = await import(path.join(repo, "src/lib/visibility.ts"));

function metas() {
  const out = [];
  const root = path.join(repo, "src/demos");
  for (const d of fs.readdirSync(root)) {
    const dd = path.join(root, d);
    if (!fs.statSync(dd).isDirectory()) continue;
    for (const s of fs.readdirSync(dd)) {
      const f = path.join(dd, s, "meta.json");
      if (fs.existsSync(f)) out.push(JSON.parse(fs.readFileSync(f, "utf8")));
    }
  }
  return out;
}
const all = metas();
const visible = all.filter((m) => statusVisible(m.status, {}, {}));

// default-order-rule.md steps 1-4, transcribed: reads slug, domain, status only; never key order.
function orderRule(d) {
  const rank = (e) => (e.status === undefined || e.status === "published" ? 0 : 1);
  const sorted = Object.values(d).sort((a, b) => rank(a) - rank(b) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  const groups = new Map();
  for (const e of sorted) groups.set(e.domain, [...(groups.get(e.domain) ?? []), e]);
  const qs = [...groups.values()];
  const out = [];
  while (qs.some((x) => x.length)) for (const x of qs) if (x.length) out.push(x.shift().slug);
  return out;
}

test("1. the committed index is what the generator builds, and rebuilds byte-identically", async () => {
  const a = render(built), b = render(await buildDims(repo));
  assert.equal(a, b, "two builds differ");
  assert.ok(a === committed, `${OUT} is stale: run node company/personalization/dims/build-index.mjs and commit`);
  assert.deepEqual(JSON.parse(JSON.stringify(dims)), JSON.parse(JSON.stringify(built.dims)));
  assert.deepEqual(JSON.parse(JSON.stringify(DIMS_HEADER)), JSON.parse(JSON.stringify(built.header)));
});

test("2. every lesson the feed lists is in the index, and nothing else", () => {
  assert.deepEqual(Object.keys(dims).sort(), visible.map((m) => m.slug).sort());
  assert.ok(visible.length > 0 && all.some((m) => !statusVisible(m.status, {}, {})), "fixture: some lessons are not listed");
  assert.equal(DIMS_HEADER.lessons, visible.length);
  for (const [k, e] of Object.entries(dims)) assert.equal(k, e.slug);
});

test("3. statuses are exactly meta.json's, and only statuses the feed serves", () => {
  const bySlug = new Map(all.map((m) => [m.slug, m]));
  for (const e of Object.values(dims)) {
    assert.equal(e.status, bySlug.get(e.slug).status, e.slug);
    assert.equal(e.domain, bySlug.get(e.slug).domain, e.slug);
    assert.ok(statusVisible(e.status, {}, {}), `${e.slug}: ${e.status}`);
  }
});

test("4. the order rule over pilot entries equals feedOrder(\"all\") with non-pilot lessons removed", async () => {
  const { feedOrder } = await import(path.join(repo, "src/lib/feed-index.ts"));
  const pilotDims = Object.fromEntries(Object.entries(dims).filter(([, e]) => e.pilot).reverse()); // key order must not matter
  const expected = feedOrder("all").map((i) => i.slug).filter((s) => dims[s]?.pilot);
  assert.ok(expected.length > 0);
  assert.deepEqual(orderRule(pilotDims), expected);
  const slugs = Object.keys(dims);
  const cu = [...slugs].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  assert.deepEqual([...slugs].sort((a, b) => a.localeCompare(b)), cu, "code-unit order differs from localeCompare on the shipped slugs (head-of-product)");
});

test("5a. no internal strings, no placeholder strength, pilot flag by domain", () => {
  for (const s of INTERNAL_STRINGS) assert.ok(!committed.includes(s), `internal string ${s} in ${OUT}`);
  const rated = Object.values(dims).filter((e) => "misconceptionStrength" in e);
  assert.equal(rated.length, DIMS_HEADER.misconceptionStrength.rated);
  for (const e of Object.values(dims)) {
    assert.equal(e.pilot, PILOT.includes(e.domain), e.slug);
    assert.equal("misconceptionStrength" in e, "strengthSource" in e, e.slug);
    assert.ok(["intro", "core", "stretch"].includes(e.level), e.slug);
  }
  const anchors = JSON.parse(fs.readFileSync(path.join(repo, "company/personalization/dims/2026-10-16-misconception-strength-anchors.json"), "utf8")).records;
  assert.deepEqual(rated.map((e) => e.slug).sort(), anchors.map((r) => r.slug).sort());
  for (const r of anchors) assert.equal(dims[r.slug].misconceptionStrength, r.misconceptionStrength);
});

test("5b. pilot entries equal the simulator's catalogue once successors are restricted to the pilot domains", () => {
  const sim = loadCatalog(repo).dims;
  const pilot = Object.values(dims).filter((e) => e.pilot);
  assert.equal(pilot.length, Object.keys(sim).length);
  const inPilot = (c) => PILOT.some((d) => c.startsWith(d + ":"));
  for (const e of pilot) {
    const s = sim[e.slug];
    assert.ok(s, e.slug);
    assert.deepEqual(
      { domain: e.domain, concept: e.concept, level: e.level, prerequisites: e.prerequisites, successors: e.successors.filter(inPilot), status: e.status },
      { domain: s.domain, concept: s.concept, level: s.level, prerequisites: [...s.prerequisites].sort(), successors: s.successors, status: s.status },
      e.slug,
    );
  }
});
