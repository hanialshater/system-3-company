// System 3 Press on HQ floor 8: a sibling company, not part of System 3 Company (no node imports here).
// Data: company/sibling/press/hq-snapshot.json (a generated copy). There is no press event log, so this is a roster only.
// Nothing here may use tools/org/people.mjs: the press names come from the snapshot (tests/hq/press.test.mjs checks).

export const PRESS_ACCENT = "#c8553d";
export const PRESS_LABEL = "System 3 Press";
export const PRESS_FLOOR = 8 as const;

export interface PressRole {
  id: string;
  title: string;
  name: string;
  reportsTo: string;
  team: string;
  scope: string;
  book: string | null;
  room: string;
  row: number;
  human: boolean;
  consultant: boolean;
  mission: string;
}
export interface PressSnapshot {
  company: string;
  reportsTo: string;
  floor: { name: string; rows: { row: number; rooms: { id: string; name: string; kind: "office" | "floor" | "meeting"; roles: string[] }[] }[] };
  roles: PressRole[];
}
export interface PressRoom {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: "office" | "floor" | "meeting" | "lobby";
  color: string;
  floor: 8;
}

// Row geometry inside the 1000 x 660 plan (row 1 is four rooms across, row 2 is the Book room, row 3 the panel).
const ROW_Y = [32, 196, 456];
const ROW_H = [152, 250, 110];
const GAP = 8;

export function pressRooms(snap: PressSnapshot): PressRoom[] {
  const out: PressRoom[] = [];
  for (const row of snap.floor.rows) {
    const i = Math.min(Math.max(row.row - 1, 0), 2);
    const n = row.rooms.length;
    const w = (960 - GAP * (n - 1)) / n;
    row.rooms.forEach((r, k) => out.push({ id: r.id, name: r.name, x: 20 + k * (w + GAP), y: ROW_Y[i], w, h: ROW_H[i], kind: r.kind, color: PRESS_ACCENT, floor: 8 }));
  }
  return out;
}

/** Seats for residents in a room: the Book room is a desk grid with a visitors corner; other rooms stand people in a row. */
export const BOOK_SEATS = { cols: 5, rows: 2, gx: 84, gy: 84, x0: 60, y0: 66 };
export const BOOK_VISITOR_SEATS = 4;
export function bookCapacity() {
  return { residents: BOOK_SEATS.cols * BOOK_SEATS.rows, visitors: BOOK_VISITOR_SEATS };
}
export function seatAt(r: { id: string; x: number; y: number; w: number; kind: string }, i: number, n: number) {
  if (r.kind === "floor") return { cx: r.x + BOOK_SEATS.x0 + (i % BOOK_SEATS.cols) * BOOK_SEATS.gx, cy: r.y + BOOK_SEATS.y0 + Math.floor(i / BOOK_SEATS.cols) * BOOK_SEATS.gy };
  const gx = Math.min(110, (r.w - 40) / Math.max(n, 1));
  const x0 = r.x + r.w / 2 - ((n - 1) * gx) / 2;
  return { cx: x0 + i * gx, cy: r.y + 58 };
}

/** A small stable number for an avatar, from the role id (not from the System 3 Company people list). */
export function pressSeed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return (h ^ (h >>> 15)) >>> 0;
}

export interface OrgNode {
  role: PressRole;
  reports: OrgNode[];
}
/** Who reports to whom. Roles whose boss is "nobody" (or not in the snapshot) are roots. */
export function pressOrg(roles: PressRole[]): OrgNode[] {
  const ids = new Set(roles.map((r) => r.id));
  const build = (r: PressRole): OrgNode => ({ role: r, reports: roles.filter((x) => x.reportsTo === r.id).map(build) });
  return roles.filter((r) => !ids.has(r.reportsTo)).map(build);
}
