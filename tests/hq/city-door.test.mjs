// HQ without floor 8 (2026-10-25): S3 Press and System 3 Meta are their own companies in the System 3 city.
// The lobby has a door room to the city HQ instead, and nothing reads the removed company/sibling/ folder.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOMS, FLOORS } from "../../src/lib/hq.ts";
import { CITY_HQ_URL, CITY_ROOM, stairsTo } from "../../src/lib/hq-floors.ts";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

test("no floor 8 and no press rooms; the lobby's city-hq room is a door, not stairs", () => {
  assert.ok(!FLOORS.includes(8), "floor 8 (System 3 Press) is gone");
  assert.ok(!ROOMS.some((r) => r.id.startsWith("press-") || r.id === "to-floor-8"));
  const door = ROOMS.find((r) => r.id === CITY_ROOM);
  assert.ok(door, "the lobby has the city-hq room");
  assert.equal(door.floor ?? 1, 1);
  assert.equal(stairsTo(CITY_ROOM), undefined);
  assert.equal(CITY_HQ_URL, "https://system3-city-hq.vercel.app");
});

test("the HQ page links to the city HQ and nothing in the app reads company/sibling/", () => {
  const hq = read("src/app/hq/HQ.tsx");
  assert.match(hq, /href=\{CITY_HQ_URL\}/);
  assert.match(hq, /room === CITY_ROOM/);
  for (const f of ["src/lib/hq.ts", "src/app/hq/HQ.tsx", "src/app/hq/Office.tsx", "src/app/hq/page.tsx"]) assert.doesNotMatch(read(f), /company\/sibling\//, f);
  assert.ok(!fs.existsSync(path.join(ROOT, "company/sibling")), "company/sibling/ is removed");
});

test("the city adapters live in tools/hq/ and their commands resolve from there", () => {
  const city = JSON.parse(read("tools/hq/hq-city.json"));
  const c = city.companies.find((x) => x.id === "system-3-company");
  for (const k of ["eventsCmd", "orgCmd", "buildingCmd", "dashboardCmd", "knowledgeCmd"]) {
    const [, script, ...args] = c[k].split(" ");
    assert.ok(fs.existsSync(path.join(ROOT, "tools/hq", script)), `${k}: ${script}`);
    const target = args.filter((a) => !a.startsWith("--")).at(-1);
    assert.ok(fs.existsSync(path.resolve(ROOT, "tools/hq", target)), `${k}: ${target} resolves from tools/hq`);
  }
  assert.match(c.docsCmd, /--config=hq-docs\.json/);
  assert.ok(fs.existsSync(path.join(ROOT, "tools/hq/hq-docs.json")));
});
