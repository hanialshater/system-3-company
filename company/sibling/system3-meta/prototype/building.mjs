// The building: floors, rooms and bookings, as data with rules (founder, 2026-10-21: "the building dont have API to add
// new rooms or floors"). The org's room list (org.rooms) is kept in step, so role validation keeps working.
//
// Who may:
//   floor add / floor retire          an org change: queued for the founder (an approval request); applied on approval
//   room add --kind=meeting           a lane manager, on its own floor (or the chief of staff, anywhere)
//   room add --kind=lane|quality|…    the chief of staff (an org change in all but name; the founder sees it in the digest)
//   room rename                       the room's floor owner (manager of a lane on that floor) or the chief of staff
//   room retire                       the chief of staff; refused while anyone is seated or running there, or it is booked
//   room book                         any role, for a meeting room, within its capacity, without overlap
// Every change is an event, so a view of the building can be drawn from the log alone.
import { Refused } from "./lib.mjs";

const refuse = (m) => { throw new Refused(`HARD: ${m}`); };
export const ROOM_KINDS = ["lane", "meeting", "quality", "lobby", "launch", "office"];

export function building(co) {
  const b = (co.data.building ??= { floors: new Map(), bookings: new Map(), n: 0 });
  // floors are implied by the starting rooms
  for (const r of co.org.rooms.values()) if (!b.floors.has(r.floor)) b.floors.set(r.floor, { floor: r.floor, name: `Floor ${r.floor}`, active: true });
  return b;
}

const levelOf = (co, id) => co.org.role(id)?.level;
const isCos = (co, by) => levelOf(co, by) === "chief-of-staff";
const managesFloor = (co, by, floor) => { const r = co.org.role(by); return r?.level === "manager" && r.floor === floor; };

/** A new floor is an org change: it is queued for the founder and applied by the approval's callback. */
export function proposeFloor(co, { by, floor, name }) {
  const b = building(co);
  if (!isCos(co, by) && levelOf(co, by) !== "founder") refuse(`${by} may not propose floors (chief of staff or founder)`);
  if (!Number.isInteger(floor) || floor < 0) refuse("floor is a whole number");
  if (b.floors.get(floor)?.active) refuse(`floor ${floor} exists`);
  const ref = `FLOOR-${floor}`;
  b.pending = { ...(b.pending ?? {}), [ref]: { floor, name: name ?? `Floor ${floor}`, by } };
  const a = co.engine.request({ approver: "founder", kind: "org-change", ref, dueMin: 24 * 60, key: `${ref}:approve` });
  co.log.add({ type: "building-propose", what: "floor", floor, by, approval: a.id });
  return a;
}

/** Applies an approved floor (the approval callback for refs FLOOR-n). */
export function applyFloor(co, ref) {
  const b = building(co);
  const p = b.pending?.[ref];
  if (!p) return null;
  b.floors.set(p.floor, { floor: p.floor, name: p.name, active: true });
  delete b.pending[ref];
  co.log.add({ type: "floor-add", floor: p.floor, name: p.name });
  return b.floors.get(p.floor);
}

export function addRoom(co, { by, id, floor, kind, capacity = 6, lane = null }) {
  const b = building(co);
  if (!ROOM_KINDS.includes(kind)) refuse(`room kind is ${ROOM_KINDS.join(", ")}`);
  if (!b.floors.get(floor)?.active) refuse(`floor ${floor} does not exist`);
  if (co.org.rooms.has(id)) refuse(`room ${id} exists`);
  if (!(Number.isInteger(capacity) && capacity >= 1 && capacity <= 50)) refuse("capacity is 1-50");
  if (kind === "lane" && !lane) refuse("a lane room names its lane");
  if (kind === "meeting") { if (!isCos(co, by) && !managesFloor(co, by, floor)) refuse(`${by} may add meeting rooms only on its own floor`); }
  else if (!isCos(co, by)) refuse(`only the chief of staff adds ${kind} rooms`);
  const room = { id, floor, kind, capacity, lane, active: true };
  co.org.rooms.set(id, room);
  co.log.add({ type: "room-add", room: id, floor, kind, capacity, lane, by });
  return room;
}

export function renameRoom(co, { by, id, to }) {
  const r = co.org.rooms.get(id);
  if (!r || r.active === false) refuse(`no active room ${id}`);
  if (!isCos(co, by) && !managesFloor(co, by, r.floor)) refuse(`${by} may not rename ${id}`);
  if (co.org.rooms.has(to)) refuse(`room ${to} exists`);
  co.org.rooms.delete(id);
  co.org.rooms.set(to, { ...r, id: to, renamedFrom: id });
  for (const role of co.org.roles.values()) if (role.room === id) role.room = to;
  for (const bk of building(co).bookings.values()) if (bk.room === id) bk.room = to;
  co.log.add({ type: "room-rename", room: id, to, by });
  return co.org.rooms.get(to);
}

export function retireRoom(co, { by, id }) {
  const r = co.org.rooms.get(id);
  if (!r || r.active === false) refuse(`no active room ${id}`);
  if (!isCos(co, by)) refuse("only the chief of staff retires rooms");
  const seated = co.org.active().filter((x) => x.room === id).map((x) => x.id);
  if (seated.length) refuse(`${id} still seats ${seated.join(", ")}`);
  const running = [...co.rooms.runs.values()].filter((x) => x.state === "running" && co.org.role(x.role)?.room === id);
  if (running.length) refuse(`${id} has runs in progress`);
  const future = [...building(co).bookings.values()].filter((bk) => bk.room === id && bk.state === "booked" && bk.end > co.engine.clock.now());
  if (future.length) refuse(`${id} has bookings: ${future.map((x) => x.id).join(", ")}`);
  r.active = false;
  co.log.add({ type: "room-retire", room: id, by });
  return r;
}

/** Book a meeting room for [start, end) minutes, for the named attendees. */
export function book(co, { by, room, start, end, attendees = [], purpose = "" }) {
  const b = building(co);
  const r = co.org.rooms.get(room);
  if (!r || r.active === false) refuse(`no active room ${room}`);
  if (r.kind !== "meeting") refuse(`${room} is a ${r.kind} room, not a meeting room`);
  if (!(end > start)) refuse("a booking ends after it starts");
  if (!co.org.role(by)) refuse(`no role ${by}`);
  const people = [...new Set([by, ...attendees])];
  if (people.length > r.capacity) refuse(`${people.length} people over ${room}'s capacity ${r.capacity}`);
  const clash = [...b.bookings.values()].find((x) => x.room === room && x.state === "booked" && x.start < end && start < x.end);
  if (clash) refuse(`${room} is booked ${clash.id} for that time`);
  const id = `BK-${++b.n}`;
  b.bookings.set(id, { id, room, start, end, by, attendees: people, purpose, state: "booked" });
  co.log.add({ type: "room-book", booking: id, room, start, end, by, attendees: people.length });
  return b.bookings.get(id);
}

export function cancelBooking(co, { by, id }) {
  const bk = building(co).bookings.get(id);
  if (!bk || bk.state !== "booked") refuse(`no booking ${id}`);
  if (bk.by !== by && !isCos(co, by)) refuse(`${by} did not book ${id}`);
  bk.state = "cancelled";
  co.log.add({ type: "room-cancel", booking: id, by });
  return bk;
}

/** A meeting that ends early frees its room (benchmark 1: a closed kickoff kept the story room booked for the WBR). */
export function releaseBooking(co, id) {
  const bk = building(co).bookings.get(id);
  if (!bk || bk.state !== "booked") return null;
  const t = co.engine.clock.now();
  if (bk.end > t) bk.end = Math.max(bk.start, t);
  bk.state = "used";
  co.log.add({ type: "room-release", booking: id, room: bk.room });
  return bk;
}

/** The building as a plan: floors, their rooms, who sits where, what is booked. */
export function plan(co) {
  const b = building(co);
  return [...b.floors.values()].sort((x, y) => x.floor - y.floor).map((f) => ({
    floor: f.floor, name: f.name, active: f.active,
    rooms: [...co.org.rooms.values()].filter((r) => r.floor === f.floor && r.active !== false).map((r) => ({
      id: r.id, kind: r.kind ?? "lane", capacity: r.capacity ?? null,
      seated: co.org.active().filter((x) => x.room === r.id).map((x) => x.id),
      booked: [...b.bookings.values()].filter((bk) => bk.room === r.id && bk.state === "booked").map((bk) => ({ id: bk.id, start: bk.start, end: bk.end, purpose: bk.purpose })),
    })),
  }));
}
