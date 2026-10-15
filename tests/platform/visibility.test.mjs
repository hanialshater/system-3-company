// W-480 / W-884: drafts 404 in production; "In review" stays visible (founder decision 2026-10-15-founder-show-review).
// Tests the pure rule in src/lib/visibility.ts that src/lib/catalog.ts (visibleDemos, findDemo) applies.
// Run: npm run test:platform
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { draftsVisible, reviewVisible, statusVisible } from "../../src/lib/visibility.ts";

const vercelProd = { VERCEL: "1", VERCEL_ENV: "production", NODE_ENV: "production" };
const vercelPreview = { VERCEL: "1", VERCEL_ENV: "preview", NODE_ENV: "production" };
const dev = { NODE_ENV: "development" };
const localBuild = { NODE_ENV: "production" }; // `next build && next start`, what the QA contract runs against

test("a draft opened by URL is not found on Vercel production, whatever SHOW_REVIEW or SHOW_DRAFTS say", () => {
  for (const extra of [{}, { SHOW_REVIEW: "on" }, { SHOW_DRAFTS: "on" }, { SHOW_REVIEW: "on", SHOW_DRAFTS: "on" }]) {
    const env = { ...vercelProd, ...extra };
    assert.equal(draftsVisible(env), false, JSON.stringify(extra));
    assert.equal(statusVisible("draft", { includeDrafts: true }, env), false, JSON.stringify(extra));
  }
  // VERCEL_ENV alone is enough (runtime renders see it even if VERCEL were missing)
  assert.equal(statusVisible("draft", { includeDrafts: true }, { VERCEL_ENV: "production" }), false);
});

test("in review stays visible on production and published always is", () => {
  assert.equal(reviewVisible(vercelProd), true);
  assert.equal(statusVisible("review", {}, vercelProd), true);
  assert.equal(statusVisible("review", { includeDrafts: true }, vercelProd), true);
  assert.equal(statusVisible("published", {}, vercelProd), true);
  assert.equal(statusVisible("published", {}, { ...vercelProd, SHOW_REVIEW: "off" }), true);
  assert.equal(statusVisible("review", {}, { ...vercelProd, SHOW_REVIEW: "off" }), false);
});

test("builders still open drafts on the dev server and local builds", () => {
  assert.equal(statusVisible("draft", { includeDrafts: true }, dev), true);
  assert.equal(statusVisible("draft", { includeDrafts: true }, localBuild), true);
  assert.equal(statusVisible("draft", { includeDrafts: true }, { ...localBuild, SHOW_DRAFTS: "off" }), false);
});

test("Vercel previews hide drafts unless SHOW_DRAFTS=on", () => {
  assert.equal(statusVisible("draft", { includeDrafts: true }, vercelPreview), false);
  assert.equal(statusVisible("draft", { includeDrafts: true }, { ...vercelPreview, SHOW_DRAFTS: "on" }), true);
});

test("drafts never list in the feed or map, and retired lessons are never visible", () => {
  for (const env of [dev, localBuild, vercelPreview, vercelProd]) {
    assert.equal(statusVisible("draft", {}, env), false);
    assert.equal(statusVisible("retired", { includeDrafts: true }, env), false);
  }
});

test("catalog.ts applies the rule (findDemo and generateStaticParams go through statusVisible)", () => {
  const src = fs.readFileSync(new URL("../../src/lib/catalog.ts", import.meta.url), "utf8");
  assert.match(src, /statusVisible\(d\.status, opts\)/);
  assert.doesNotMatch(src, /opts\.includeDrafts && d\.status === "draft"/);
});
