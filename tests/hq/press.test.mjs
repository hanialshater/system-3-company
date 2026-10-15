// HQ floor 8: System 3 Press, the founder's sibling company (W-940). Data: company/sibling/press/hq-snapshot.json.
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { ROOMS, FLOORS, FLOOR_NAMES, stairsTo } from "../../src/lib/hq.ts";
import { pressOrg, bookCapacity, seatAt } from "../../src/lib/hq-press.ts";
import { PERSONA, POOL, STRAND, nameFor } from "../../tools/org/people.mjs";
import { roles as s3cRoles } from "../../tools/org/roles.mjs";

const read = (p) => fs.readFileSync(new URL(p, import.meta.url), "utf8");
const snap = JSON.parse(read("../../company/sibling/press/hq-snapshot.json"));
const rooms = snap.floor.rows.flatMap((r) => r.rooms.map((x) => ({ ...x, row: r.row })));
const byRole = new Map(snap.roles.map((r) => [r.id, r]));
const floor8 = ROOMS.filter((r) => r.floor === 8);

test("the snapshot is valid: shape, unique ids, every boss exists, one root (the founder), no cycles", () => {
  assert.equal(snap.company, "System 3 Press");
  assert.equal(snap.floor.rows.length, 3);
  assert.deepEqual(snap.floor.rows.map((r) => r.rooms.length), [4, 1, 1]);
  assert.equal(byRole.size, snap.roles.length, "duplicate role ids");
  for (const r of snap.roles) {
    for (const k of ["id", "title", "name", "reportsTo", "team", "scope", "room", "mission"]) assert.ok(typeof r[k] === "string" && r[k], `${r.id}.${k}`);
    assert.equal(typeof r.human, "boolean", r.id);
    assert.equal(typeof r.consultant, "boolean", r.id);
    assert.ok(r.reportsTo === "nobody" || byRole.has(r.reportsTo), `${r.id} reports to unknown ${r.reportsTo}`);
    const seen = new Set();
    for (let x = r; x && x.reportsTo !== "nobody"; x = byRole.get(x.reportsTo)) {
      assert.ok(!seen.has(x.id), `reporting cycle at ${x.id}`);
      seen.add(x.id);
    }
  }
  const tree = pressOrg(snap.roles);
  assert.deepEqual(tree.map((n) => n.role.id), ["founder"]);
  const count = (n) => 1 + n.reports.reduce((a, c) => a + count(c), 0);
  assert.equal(count(tree[0]), snap.roles.length, "the org tree misses someone");
  assert.equal(snap.roles.filter((r) => r.human).length, 1);
  assert.equal(byRole.get("founder").human, true);
  const panel = snap.roles.filter((r) => r.consultant);
  assert.equal(panel.length, 8);
  assert.ok(panel.every((r) => r.room === "press-review-panel"));
});

test("every role is placed: in a room that exists, listed by that room, in the right row, and drawn on floor 8", () => {
  const room = new Map(rooms.map((r) => [r.id, r]));
  for (const r of snap.roles) {
    const home = room.get(r.room);
    assert.ok(home, `${r.id} has no room ${r.room}`);
    assert.ok(home.roles.includes(r.id), `${home.id} does not list ${r.id}`);
    assert.equal(home.row, r.row, `${r.id} is in the wrong row`);
    assert.ok(floor8.some((x) => x.id === r.room), `${r.room} is not on HQ floor 8`);
  }
  const listed = rooms.flatMap((r) => r.roles);
  assert.equal(new Set(listed).size, listed.length, "a role is in two rooms");
  assert.equal(listed.length, snap.roles.length, "a room lists a role that does not exist");
});

test("every press room id is prefixed press-, and floor 8 holds only those plus its stairs", () => {
  for (const r of rooms) assert.ok(r.id.startsWith("press-"), r.id);
  const own = floor8.filter((r) => r.id.startsWith("press-"));
  assert.deepEqual(own.map((r) => r.id).sort(), rooms.map((r) => r.id).sort());
  for (const r of floor8.filter((r) => !r.id.startsWith("press-"))) assert.equal(r.id, "to-floor-1-from-8");
  assert.ok(!ROOMS.some((r) => r.floor !== 8 && r.id.startsWith("press-")), "a press room is on another floor");
});

test("floor 8 exists with stairs both ways and is labelled a sibling company", () => {
  assert.ok(FLOORS.includes(8));
  assert.match(FLOOR_NAMES[8], /System 3 Press/);
  assert.match(FLOOR_NAMES[8], /sibling company/);
  assert.equal(stairsTo("to-floor-8"), 8);
  assert.equal(ROOMS.find((r) => r.id === "to-floor-8")?.floor ?? 1, 1);
  assert.equal(stairsTo("to-floor-1-from-8"), 1);
});

test("the Book room holds 9 residents at their own seats plus visitors, inside its walls", () => {
  const book = floor8.find((r) => r.id === "press-book-system-3");
  const cap = bookCapacity();
  assert.ok(cap.residents >= 9 && cap.visitors >= 3, JSON.stringify(cap));
  assert.equal(byRole.size && snap.roles.filter((r) => r.room === book.id).length, 9);
  const seats = Array.from({ length: 9 }, (_, i) => seatAt(book, i, 9));
  assert.equal(new Set(seats.map((s) => `${s.cx},${s.cy}`)).size, 9, "two residents share a seat");
  for (const s of seats) assert.ok(s.cx - 30 >= book.x && s.cy + 45 <= book.y + book.h, "a seat is outside the room");
  const lastSeatX = Math.max(...seats.map((s) => s.cx)) + 30;
  assert.ok(book.x + book.w - lastSeatX >= 150, "no room left for the visitors corner");
});

test("the floor shows roster only: no press events, no presence code on floor 8", () => {
  assert.ok(!ROOMS.some((r) => r.floor === 8 && /live/i.test(r.name)));
  const press = read("../../src/app/hq/Press.tsx");
  assert.match(press, /no press event log/);
  assert.match(press, /sibling company/);
});

test("nothing from System 3 Company's people.mjs is used for press names", () => {
  // 1. The press code never imports it.
  for (const f of ["../../src/lib/hq-press.ts", "../../src/app/hq/Press.tsx"]) assert.ok(!/^\s*(import|export)[^\n]*people/m.test(read(f)), `${f} touches people`);
  // 2. The press snapshot names are not what people.mjs would hand out for the same role ids, and are unique.
  const names = snap.roles.map((r) => r.name);
  assert.equal(new Set(names).size, names.length, "duplicate press names");
  for (const r of snap.roles) assert.notEqual(nameFor(r.id), r.name, `${r.id} got its name from people.mjs`);
  // 3. And they are not System 3 Company's names for its own roles.
  const s3 = new Set([...POOL, ...STRAND, ...Object.values(PERSONA).map((p) => (typeof p === "string" ? p : p?.name))].filter(Boolean));
  for (const n of names) assert.ok(!s3.has(n), `${n} is a System 3 Company name`);
  // 4. Press role ids do not collide with System 3 Company's.
  const ids = new Set(s3cRoles.map((r) => r.id));
  for (const r of snap.roles) assert.ok(!ids.has(r.id) || r.id === "founder", `${r.id} collides with a System 3 Company role`);
});
