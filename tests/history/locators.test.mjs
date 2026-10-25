import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const catalog = JSON.parse(fs.readFileSync("content/history-locators.json", "utf8"));
const lessons = fs.readdirSync("src/demos/history").filter((slug) => fs.existsSync(`src/demos/history/${slug}/Demo.tsx`));

test("every history lesson has a figure, including a sourced map for every city-pair lesson", () => {
  assert.equal(Object.keys(catalog.lessons).length, 100);
  for (const slug of lessons) {
    const demo = fs.readFileSync(`src/demos/history/${slug}/Demo.tsx`, "utf8");
    if (slug.startsWith("history-")) {
      assert.ok(catalog.lessons[slug], `missing location data: ${slug}`);
      assert.match(demo, new RegExp(`<HistoryLocator slug="${slug}"`), `map absent from stage: ${slug}`);
    } else if (slug.startsWith("story-")) {
      assert.match(demo, /<StoryStage/, `shared story map absent: ${slug}`);
      const engine = fs.readFileSync("src/components/history-story/StoryLesson.tsx", "utf8");
      assert.match(engine, /<svg/);
      const geometry = JSON.parse(fs.readFileSync(`src/demos/history/${slug}/map.json`, "utf8"));
      assert.ok(geometry.land.length > 0, `missing story coastline: ${slug}`);
      assert.ok(geometry.nodes.length > 0, `missing story markers: ${slug}`);
    } else {
      assert.match(demo, /<svg|<WorldMap/, `missing data figure: ${slug}`);
    }
  }
});

for (const [slug, keys] of Object.entries(catalog.lessons)) {
  test(`${slug}: two bounded, labeled, sourced markers and a local map asset`, () => {
    assert.equal(keys.length, 2);
    const svg = fs.readFileSync(path.join("public/history-maps", `${slug}.svg`), "utf8");
    assert.ok(Buffer.byteLength(svg) < 90_000, "map exceeds static asset budget");
    assert.match(svg, /No historical borders, territorial extents or travel routes/);
    assert.doesNotMatch(svg, /<script|<foreignObject|<image|href=/);
    for (const key of keys) {
      const place = catalog.places[key];
      assert.ok(place, `missing place: ${key}`);
      assert.ok(place.coordinates[0] >= -180 && place.coordinates[0] <= 180);
      assert.ok(place.coordinates[1] >= -90 && place.coordinates[1] <= 90);
      assert.ok(catalog.sources[place.source] || place.source.startsWith("https://"));
      assert.ok(svg.includes(`data-place="${key}"`));
      const group = svg.split(`data-place="${key}"`)[1].split("</g>")[0];
      const [, x, y] = group.match(/<circle cx="([\d.]+)" cy="([\d.]+)"/);
      assert.ok(+x >= 6 && +x <= 354 && +y >= 6 && +y <= 158, `offscreen marker: ${key}`);
      const [, bx, by, bw] = group.match(/<rect data-label="[^"]+" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)"/);
      assert.ok(+bx >= 0 && +bx + +bw <= 360.1 && +by >= 0 && +by + 23 <= 164, `clipped label: ${key}`);
    }
    const meta = JSON.parse(fs.readFileSync(`src/demos/history/${slug}/meta.json`, "utf8"));
    const claim = meta.claims.find((c) => c.id === `history.${slug}.locator`);
    assert.ok(claim, "map provenance is missing from lesson claims");
    assert.equal(claim.status, "unverified", "builders must not verify their own source claims");
    assert.ok(claim.addresses.includes(`public/history-maps/${slug}.svg`));
  });
}

test("homonymous and renamed places use the intended locations", () => {
  assert.ok(catalog.places.cordoba.coordinates[0] > -5 && catalog.places.cordoba.coordinates[0] < -4);
  assert.ok(catalog.places.toledo.coordinates[0] > -5 && catalog.places.toledo.coordinates[0] < -3);
  assert.ok(catalog.places.dali.coordinates[0] < 105);
  assert.deepEqual(catalog.lessons["history-darwin-java-cable-service-evidence"], ["darwin", "banyuwangi"]);
  assert.equal(catalog.places.carthage.source, "https://whc.unesco.org/en/list/37/maps/");
});
