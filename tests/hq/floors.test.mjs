// HQ floor plan: every room fits its floor without overlap, category offices are full size,
// and every category role's home room exists and is on the right floor (src/lib/hq.ts, src/app/hq/people.ts, tools/events.mjs).
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { ROOMS, FLOORS, stairsTo } from "../../src/lib/hq.ts";
import { SUBAREAS } from "../../tools/org/roles.mjs";

const byId = new Map(ROOMS.map((r) => [r.id, r]));
const floorOf = (r) => r.floor ?? 1;
const domains = JSON.parse(fs.readFileSync(new URL("../../content/domains.json", import.meta.url), "utf8")).domains.map((d) => d.id);

test("room ids are unique", () => {
  assert.equal(byId.size, ROOMS.length);
});

test("every room sits inside the 1000 x 660 plan and no two rooms on a floor overlap", () => {
  for (const r of ROOMS) {
    assert.ok(r.x >= 6 && r.y >= 6 && r.x + r.w <= 994 && r.y + r.h <= 654, `${r.id} is outside the plan`);
    assert.ok(FLOORS.includes(floorOf(r)), `${r.id} has an unknown floor`);
  }
  for (const a of ROOMS)
    for (const b of ROOMS) {
      if (a.id >= b.id || floorOf(a) !== floorOf(b)) continue;
      const apart = a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y;
      assert.ok(apart, `${a.id} overlaps ${b.id} on floor ${floorOf(a)}`);
    }
});

test("every category in content/domains.json has a full office, the same size and kind as the others", () => {
  const offices = domains.map((d) => byId.get(`cm-${d}`));
  offices.forEach((o, i) => assert.ok(o, `no office for ${domains[i]}`));
  for (const o of offices) {
    assert.equal(o.kind, "office", o.id);
    assert.deepEqual([o.w, o.h], [186, 236], `${o.id} is ${o.w}x${o.h}`);
  }
  for (const d of ["books", "big-ideas", "history", "lifehacks"]) assert.equal(floorOf(byId.get(`cm-${d}`)), 6, `cm-${d} is not on floor 6`);
  for (const d of domains.filter((d) => !["books", "big-ideas", "history", "lifehacks"].includes(d))) assert.equal(floorOf(byId.get(`cm-${d}`)), 3, `cm-${d} is not on floor 3`);
});

test("stairs lead to a floor that exists, and floors 3 and 6 link both ways", () => {
  for (const r of ROOMS.filter((r) => r.id.startsWith("to-floor-"))) assert.ok(stairsTo(r.id), `${r.id} leads nowhere`);
  assert.equal(stairsTo("to-floor-6"), 6);
  assert.equal(floorOf(byId.get("to-floor-6")), 3);
  assert.equal(stairsTo("to-floor-3-from-6"), 3);
  assert.equal(floorOf(byId.get("to-floor-3-from-6")), 6);
  assert.equal(stairsTo("cm-history"), undefined);
});

test("every category lead and strand manager has a home room that exists (people.ts and the event log agree)", async () => {
  const src = fs.readFileSync(new URL("../../tools/events.mjs", import.meta.url), "utf8");
  // HOME in people.ts: leads by the domain list, strand managers from SUBAREAS, both into cm-<domain>.
  const people = fs.readFileSync(new URL("../../src/app/hq/people.ts", import.meta.url), "utf8");
  const leadList = JSON.parse(/for \(const d of (\[[^\]]+\])\) HOME/.exec(people)[1]);
  for (const d of domains.filter((d) => d !== "lifehacks")) assert.ok(leadList.includes(d), `people.ts has no home for cm-${d}`);
  for (const [d, subs] of Object.entries(SUBAREAS))
    for (const [sub] of subs) {
      const role = `cm-${d}-${sub}`;
      assert.ok(byId.has(`cm-${d}`), `${role}'s office cm-${d} does not exist`);
      // tools/events.mjs: hyphenated domains must be listed, because roomFor's default keeps only the first two parts.
      const listed = new RegExp(`"${role}": "cm-${d}"`).test(src);
      const byDefault = role.split("-").slice(0, 2).join("-") === `cm-${d}`;
      assert.ok(listed || byDefault, `tools/events.mjs would put ${role} in the wrong room`);
    }
  for (const d of ["history", "books", "big-ideas"]) assert.ok(new RegExp(`"cm-${d}": "cm-${d}"`).test(src), `tools/events.mjs has no room for cm-${d}`);
  assert.ok(/"lifehacks-safety-reviewer": "lifehacks-safety"/.test(src) && byId.has("lifehacks-safety"));
});
