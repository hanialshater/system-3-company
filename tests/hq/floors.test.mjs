// HQ floor plan: every room fits its floor without overlap, category offices are full size,
// and every category role's home room exists and is on the right floor (src/lib/hq.ts, src/app/hq/people.ts, tools/events.mjs).
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { ROOMS, FLOORS, ROOM_ALIASES, stairsTo } from "../../src/lib/hq.ts";
import { HOME } from "../../src/app/hq/people.ts";
import { ROOM_BY_ROLE, roomFor } from "../../tools/events.mjs";
import { MANY } from "../../tools/org/people.mjs";
import { SUBAREAS, roles } from "../../tools/org/roles.mjs";

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
  // F-40: seven categories on each of floors 3 and 4, split by neighbourhood.
  const FLOOR4 = ["lifehacks", "economics", "behavioral", "geography", "history", "books", "big-ideas"];
  for (const d of FLOOR4) assert.equal(floorOf(byId.get(`cm-${d}`)), 4, `cm-${d} is not on floor 4`);
  for (const d of domains.filter((d) => !FLOOR4.includes(d))) assert.equal(floorOf(byId.get(`cm-${d}`)), 3, `cm-${d} is not on floor 3`);
});

test("stairs lead to a floor that exists, floors 3 and 4 link both ways, and every floor 2 to 7 has stairs down to floor 1", () => {
  for (const r of ROOMS.filter((r) => r.id.startsWith("to-floor-"))) assert.ok(stairsTo(r.id), `${r.id} leads nowhere`);
  assert.equal(stairsTo("to-floor-4"), 4);
  assert.equal(floorOf(byId.get("to-floor-4")), 3);
  assert.equal(stairsTo("to-floor-3-from-4"), 3);
  assert.equal(floorOf(byId.get("to-floor-3-from-4")), 4);
  assert.equal(stairsTo("to-floor-6"), 6);
  assert.equal(floorOf(byId.get("to-floor-6")), 1);
  assert.equal(stairsTo("to-floor-6-from-2"), 6);
  assert.equal(stairsTo("to-floor-2-from-6"), 2);
  assert.ok(!byId.has("to-floor-3-from-6"), "to-floor-3-from-6 is retired");
  for (const n of [2, 3, 4, 5, 6, 7]) {
    const down = ROOMS.find((r) => floorOf(r) === n && stairsTo(r.id) === 1);
    assert.ok(down, `floor ${n} has no stairs to floor 1`);
  }
  assert.equal(stairsTo("cm-history"), undefined);
  assert.ok(!FLOORS.includes(9), "floor 9 (System 3 Meta) is a note only, not drawn");
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

test("Marketing has floor 7: the VP's office is there, floors 1 and 7 link both ways, and the event log and people.ts agree", () => {
  assert.ok(FLOORS.includes(7));
  assert.equal(floorOf(byId.get("marketing")), 7);
  assert.equal(stairsTo("to-floor-7"), 7);
  assert.equal(floorOf(byId.get("to-floor-7")), 1);
  assert.equal(stairsTo("to-floor-1-from-7"), 1);
  assert.equal(floorOf(byId.get("to-floor-1-from-7")), 7);
  const src = fs.readFileSync(new URL("../../tools/events.mjs", import.meta.url), "utf8");
  const people = fs.readFileSync(new URL("../../src/app/hq/people.ts", import.meta.url), "utf8");
  assert.ok(/"vp-marketing": "marketing"/.test(src), "tools/events.mjs has no room for vp-marketing");
  assert.ok(/"vp-marketing": "marketing"/.test(people), "people.ts has no home for vp-marketing");
});

// Seats, as Office.tsx draws them: 9 desks in a category office, 18 on the build floor, otherwise the standing grid.
const seatsOf = (r) => (r.kind === "office" && r.id.startsWith("cm-") && r.h >= 200 ? 9 : r.id === "build-floor" ? 18 : Math.max(1, Math.floor((r.w - 10) / 52)) * Math.max(1, Math.floor((r.h - 28) / 46)));
// The founder is not a dispatched role: the lobby is theirs.
const seated = roles.filter((r) => r.id !== "founder");

test("HOME (people.ts) and ROOM_BY_ROLE (tools/events.mjs) agree for every role in roles.mjs, and the room is drawn", () => {
  for (const { id } of seated) {
    const room = roomFor(id);
    assert.ok(byId.has(room), `${id}: room ${room} is not drawn`);
    if (HOME[id]) assert.equal(HOME[id], room, `${id}: HOME says ${HOME[id]}, ROOM_BY_ROLE says ${room}`);
    else assert.ok(MANY.has(id), `${id} is a resident role with no HOME seat`);
    assert.ok(ROOM_BY_ROLE[id] || id.startsWith("cm-"), `${id} falls to the chief-of-staff default`);
  }
  for (const id of Object.keys(HOME)) assert.ok(roles.some((r) => r.id === id), `HOME has unknown role ${id}`);
});

test("no room has more resident roles than drawn seats, and no floor holds more than 30 roles", () => {
  const here = new Map();
  const perFloor = new Map();
  for (const { id } of seated) {
    const room = HOME[id] ?? roomFor(id);
    here.set(room, (here.get(room) ?? 0) + 1);
    const f = floorOf(byId.get(room));
    perFloor.set(f, (perFloor.get(f) ?? 0) + 1);
  }
  for (const [room, n] of here) assert.ok(n <= seatsOf(byId.get(room)), `${room} has ${n} residents for ${seatsOf(byId.get(room))} seats`);
  for (const [f, n] of perFloor) assert.ok(n <= 30, `floor ${f} holds ${n} roles`);
});

test("every room id in the event log is drawn or aliased, and no alias points at a missing room", () => {
  const log = fs.readFileSync(new URL("../../company/ops/events.jsonl", import.meta.url), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l).room);
  for (const room of new Set(log)) assert.ok(byId.has(room) || byId.has(ROOM_ALIASES[room]), `events.jsonl room ${room} is on no floor`);
  for (const target of Object.values(ROOM_ALIASES)) assert.ok(byId.has(target), `alias target ${target} is not drawn`);
});
