// Read side of the company event log (company/ops/events.jsonl) for HQ.
// The log is written by tools/events.mjs; its schema is company/ops/events.md.
import fs from "node:fs";
import path from "node:path";
export { teamColor } from "./hq-colors";
import { ROOM_ALIASES, type Floor } from "./hq-floors";
export { FLOORS, FLOOR_NAMES, ROOM_ALIASES, stairsTo, type Floor } from "./hq-floors";
import { computeDue, type Due } from "../../tools/lib/rituals.mjs";
import { recordEvents } from "../../tools/lib/ritual-records.mjs";
import { roles } from "../../tools/org/roles.mjs";

export interface HqEvent {
  id: string;
  ts: string;
  type: string;
  room: string;
  actor: string;
  summary: string;
  agent?: string;
  subjects?: string[];
  refs?: string[];
  state?: string;
  corrects?: string;
  hasBody?: boolean;
}

export interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: "office" | "floor" | "meeting" | "lobby";
  color?: string;
  /** Building floor (see FLOOR_NAMES): 1 = lobby, leadership and operations, 2 = Product, 3 = Categories (science and technology), 4 = Categories (society, money and ideas), 5 = Engineering and R&D, 6 = Quality, 7 = Marketing. */
  floor?: Floor;
}

// Category offices, split 7/7 by neighbourhood (F-40, company/ceo-office/2026-10-16-floor-reseat-proposal.md §2.2).
// Floor 3: science and technology. Floor 4: society, money and ideas. Colours match src/lib/hq-colors.ts and content/domains.json.
const FLOOR3_CATEGORIES: [string, string, string][] = [
  ["probability", "Probability", "#f6c453"],
  ["math", "Math", "#7c9cff"],
  ["cs", "CS", "#4fd1a5"],
  ["ai", "AI", "#c792ea"],
  ["physics", "Physics", "#ff8a65"],
];
const FLOOR3_ROW2: [string, string, string][] = [
  ["life", "Life", "#a5d66f"],
  ["chemistry", "Chem", "#f48fb1"],
];
const FLOOR4_CATEGORIES: [string, string, string][] = [
  ["lifehacks", "Life Hacks", "#ffb74d"],
  ["economics", "Money", "#80cbc4"],
  ["behavioral", "Behavioral Econ", "#e48fd6"],
  ["geography", "Geo", "#64b5f6"],
  ["history", "History", "#d9b26f"],
];
const FLOOR4_ROW2: [string, string, string][] = [
  ["books", "Book Summaries", "#bcaaa4"],
  ["big-ideas", "Big Ideas", "#4dd0e1"],
];
const office = (id: string, name: string, color: string, x: number, y: number, floor: Floor): Room => ({ id: `cm-${id}`, name, x, y, w: 186, h: 236, kind: "office", color, floor });

// The floor plan, in SVG units (1000 x 660). F-40 reseat: one floor per org (the founder's other companies are in the city HQ: the lobby's city-hq room, CITY_ROOM in hq-floors.ts).
export const ROOMS: Room[] = [
  // Floor 1 · Lobby, leadership & operations. Stairs row.
  { id: "to-floor-2", name: "↑ Floor 2 · Product", x: 20, y: 16, w: 150, h: 84, kind: "lobby" },
  { id: "to-floor-3", name: "↑ Floors 3–4 · Categories", x: 178, y: 16, w: 150, h: 84, kind: "lobby" },
  { id: "to-floor-5", name: "↑ Floor 5 · Engineering & R&D", x: 336, y: 16, w: 150, h: 84, kind: "lobby" },
  { id: "to-floor-6", name: "↑ Floor 6 · Quality", x: 494, y: 16, w: 150, h: 84, kind: "lobby" },
  { id: "to-floor-7", name: "↑ Floor 7 · Marketing", x: 652, y: 16, w: 150, h: 84, kind: "lobby" },
  // The door to the System 3 city HQ (2026-10-25): the founder's other companies (S3 Press, System 3 Meta, ...) are drawn there, not here.
  { id: "city-hq", name: "↗ System 3 city HQ", x: 810, y: 16, w: 170, h: 84, kind: "lobby", color: "#c8553d" },
  { id: "chief-of-staff", name: "Chief of Staff · dispatched agents", x: 20, y: 116, w: 300, h: 230, kind: "office" },
  { id: "tools", name: "Company tools", x: 330, y: 116, w: 250, h: 110, kind: "office" },
  { id: "boardroom", name: "Boardroom · project review", x: 330, y: 236, w: 250, h: 110, kind: "meeting" },
  { id: "ceo-office", name: "CEO office · company health", x: 590, y: 116, w: 390, h: 110, kind: "office", color: "#ffd54f" },
  // First Light war room (W-907, company/decisions/2026-10-15-founder-first-light.md): temporary, beside the CEO office. Page: /hq/first-light.
  { id: "first-light", name: "War room: First Light", x: 590, y: 236, w: 390, h: 110, kind: "meeting" },
  { id: "meeting-wbr", name: "WBR room", x: 20, y: 356, w: 230, h: 110, kind: "meeting" },
  { id: "meeting-retro", name: "Retro room", x: 260, y: 356, w: 230, h: 110, kind: "meeting" },
  { id: "meeting-crit", name: "Demo Crit", x: 500, y: 356, w: 230, h: 110, kind: "meeting" },
  { id: "meeting-planning", name: "Planning room", x: 740, y: 356, w: 240, h: 110, kind: "meeting" },
  { id: "lobby", name: "Lobby · Founder", x: 20, y: 476, w: 470, h: 168, kind: "lobby" },
  { id: "incident", name: "Incident & ops review", x: 500, y: 476, w: 480, h: 168, kind: "meeting" },

  // Floor 2 · Product: strategy, studio, build, design, launch, personalization, international.
  { id: "product", name: "Product · Head of Product", x: 20, y: 16, w: 230, h: 150, kind: "office", floor: 2 },
  { id: "strategy", name: "Strategy · Verticals", x: 258, y: 16, w: 230, h: 150, kind: "office", floor: 2 },
  { id: "courses", name: "Courses · Books", x: 496, y: 16, w: 230, h: 150, kind: "office", color: "#90a4ae", floor: 2 },
  { id: "growth", name: "Growth & insight", x: 734, y: 16, w: 246, h: 150, kind: "office", floor: 2 },
  { id: "studio", name: "Learning studio", x: 20, y: 176, w: 180, h: 230, kind: "office", floor: 2 },
  // build-floor keeps 400 x 230: Office.tsx's 18 desks fit that size.
  { id: "build-floor", name: "Build floor", x: 208, y: 176, w: 400, h: 230, kind: "floor", floor: 2 },
  { id: "design-studio", name: "Design studio", x: 616, y: 176, w: 364, h: 230, kind: "office", color: "#f48fb1", floor: 2 },
  { id: "launch-room", name: "Launch room", x: 20, y: 416, w: 140, h: 110, kind: "meeting", floor: 2 },
  { id: "personalization", name: "Personalization · VP · Science", x: 168, y: 416, w: 250, h: 110, kind: "office", color: "#c792ea", floor: 2 },
  { id: "model-lab", name: "Learner model · Eval · Customer data", x: 426, y: 416, w: 250, h: 110, kind: "floor", floor: 2 },
  { id: "international", name: "International", x: 684, y: 416, w: 110, h: 110, kind: "office", color: "#4fd1a5", floor: 2 },
  { id: "locale-desks", name: "Locale desks", x: 802, y: 416, w: 178, h: 110, kind: "floor", floor: 2 },
  { id: "to-floor-1-from-2", name: "↓ Floor 1 · Lobby", x: 20, y: 536, w: 470, h: 100, kind: "lobby", floor: 2 },
  { id: "to-floor-6-from-2", name: "↑ Floor 6 · Quality: where your build is checked", x: 500, y: 536, w: 480, h: 100, kind: "lobby", floor: 2 },

  // Floor 3 · Categories: science & technology. Each lead and their strand managers share one full office.
  ...FLOOR3_CATEGORIES.map(([id, name, color], i) => office(id, name, color, 20 + i * 194, 16, 3)),
  { id: "to-floor-4", name: "↑ Floor 4 · Categories: society, money & ideas", x: 20, y: 262, w: 186, h: 236, kind: "lobby", floor: 3 },
  { id: "portfolio-review", name: "Portfolio review", x: 214, y: 262, w: 380, h: 236, kind: "meeting", floor: 3 },
  ...FLOOR3_ROW2.map(([id, name, color], i) => office(id, name, color, 602 + i * 194, 262, 3)),
  { id: "to-floor-1-from-3", name: "↓ Floor 1 · Lobby", x: 20, y: 508, w: 380, h: 130, kind: "lobby", floor: 3 },

  // Floor 4 · Categories: society, money & ideas. Economics beside behavioral, geography beside history. Free space 214 to 594 on row 2.
  ...FLOOR4_CATEGORIES.map(([id, name, color], i) => office(id, name, color, 20 + i * 194, 16, 4)),
  { id: "to-floor-3-from-4", name: "↓ Floor 3 · Categories: science & technology", x: 20, y: 262, w: 186, h: 236, kind: "lobby", floor: 4 },
  ...FLOOR4_ROW2.map(([id, name, color], i) => office(id, name, color, 602 + i * 194, 262, 4)),
  { id: "to-floor-1-from-4", name: "↓ Floor 1 · Lobby", x: 20, y: 508, w: 380, h: 130, kind: "lobby", floor: 4 },

  // Floor 5 · Engineering & R&D.
  { id: "app-team", name: "App team · app shell, feed, kit", x: 20, y: 16, w: 470, h: 230, kind: "floor", color: "#4fc3f7", floor: 5 },
  { id: "backend", name: "Backend · data", x: 498, y: 16, w: 230, h: 230, kind: "office", color: "#4fc3f7", floor: 5 },
  { id: "engineering", name: "Engineering review room", x: 736, y: 16, w: 244, h: 230, kind: "meeting", floor: 5 },
  { id: "ops-room", name: "Ops & readiness", x: 20, y: 256, w: 230, h: 150, kind: "office", floor: 5 },
  { id: "deploy", name: "Release & deploy", x: 258, y: 256, w: 230, h: 150, kind: "office", floor: 5 },
  { id: "rnd-office", name: "R&D leads · VP of R&D", x: 496, y: 256, w: 230, h: 150, kind: "office", color: "#64b5f6", floor: 5 },
  { id: "research-office", name: "Research leads", x: 734, y: 256, w: 246, h: 150, kind: "office", color: "#81c784", floor: 5 },
  { id: "rnd-lab", name: "R&D lab · libraries & engines", x: 20, y: 416, w: 470, h: 110, kind: "floor", color: "#64b5f6", floor: 5 },
  { id: "research-lab", name: "Research lab · learning & domain science", x: 498, y: 416, w: 482, h: 110, kind: "floor", color: "#81c784", floor: 5 },
  { id: "seminar", name: "Seminar room · R&D review", x: 20, y: 536, w: 580, h: 100, kind: "meeting", floor: 5 },
  { id: "to-floor-1-from-5", name: "↓ Floor 1 · Lobby", x: 610, y: 536, w: 370, h: 100, kind: "lobby", floor: 5 },

  // Floor 6 · Quality: gates & reviews (evaluation-steward's org, plus privacy and cultural review by lane; conditional on F-28).
  { id: "fact-check", name: "Fact-check desk", x: 20, y: 16, w: 310, h: 230, kind: "floor", floor: 6 },
  { id: "learner-review", name: "Learner review", x: 338, y: 16, w: 310, h: 230, kind: "floor", floor: 6 },
  { id: "qa-lab", name: "QA lab", x: 656, y: 16, w: 324, h: 230, kind: "floor", floor: 6 },
  { id: "constitution", name: "Constitution", x: 20, y: 256, w: 310, h: 150, kind: "meeting", floor: 6 },
  { id: "review-room", name: "Review room", x: 338, y: 256, w: 310, h: 150, kind: "meeting", floor: 6 },
  { id: "lifehacks-safety", name: "Hacks safety desk", x: 656, y: 256, w: 160, h: 150, kind: "floor", floor: 6 },
  { id: "privacy-review", name: "Privacy review", x: 824, y: 256, w: 156, h: 150, kind: "floor", floor: 6 },
  { id: "culture-review", name: "Culture review", x: 20, y: 416, w: 310, h: 110, kind: "meeting", floor: 6 },
  { id: "to-floor-1-from-6", name: "↓ Floor 1 · Lobby", x: 20, y: 536, w: 470, h: 100, kind: "lobby", floor: 6 },
  { id: "to-floor-2-from-6", name: "↓ Floor 2 · the build floor", x: 500, y: 536, w: 480, h: 100, kind: "lobby", floor: 6 },

  // Floor 7 (2026-10-14, founder: "a new floor for marketing. With VP of marketing reporting to me"; company/decisions/2026-10-14-marketing-org.md).
  // One office for the VP and a meeting room; the open floor stays empty until a first report is justified.
  { id: "marketing", name: "Marketing · VP of Marketing", x: 20, y: 16, w: 470, h: 236, kind: "office", color: "#ff7eb6", floor: 7 },
  { id: "marketing-room", name: "Marketing room · positioning & claims", x: 510, y: 16, w: 470, h: 236, kind: "meeting", floor: 7 },
  { id: "marketing-floor", name: "Open floor (no team yet)", x: 20, y: 272, w: 960, h: 200, kind: "floor", color: "#ff7eb6", floor: 7 },
  { id: "to-floor-1-from-7", name: "↓ Floor 1 · Lobby", x: 20, y: 492, w: 380, h: 120, kind: "lobby", floor: 7 },
];

const LOG = () => path.join(process.cwd(), "company/ops/events.jsonl");

function readAll(): (HqEvent & { body?: string })[] {
  try {
    return fs
      .readFileSync(LOG(), "utf8")
      .split("\n")
      .filter(Boolean)
      .map((l) => JSON.parse(l))
      .sort((a, b) => a.ts.localeCompare(b.ts));
  } catch {
    return [];
  }
}

/** Events without their bodies: bodies are fetched one at a time from /api/hq/event/<id>. */
export function loadEvents(): HqEvent[] {
  return readAll().map(({ body, ...e }) => ({ ...e, room: ROOM_ALIASES[e.room] ?? e.room, hasBody: Boolean(body) }));
}

export function loadEvent(id: string): (HqEvent & { body?: string }) | undefined {
  return readAll().find((e) => e.id === id);
}

export interface FounderItem {
  id: string;
  title: string;
  category?: string;
  priority?: number;
  blocks?: string;
  options?: string;
  recommendation?: string;
  links?: string[];
  status?: string;
  board?: string;
}

/** Everything waiting on the founder, consolidated: company/ops/founder-inbox.json plus any open
 *  founder-owned board item the inbox does not already cover. Sorted by priority. */
export function founderQueue(): FounderItem[] {
  const read = (f: string) => {
    try {
      return JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ path.join(/*turbopackIgnore: true*/ process.cwd(), f), "utf8"));
    } catch {
      return null;
    }
  };
  const inbox: FounderItem[] = (read("company/ops/founder-inbox.json")?.items ?? []).filter((i: FounderItem) => i.status !== "decided");
  const covered = new Set(inbox.flatMap((i) => (i.board ?? "").split(/[ ,]+/)).filter(Boolean));
  const board = ((read("company/ops/board.json")?.items ?? []) as { id: string; title: string; owner: string; state: string }[])
    .filter((i) => i.owner === "founder" && !["done", "dropped"].includes(i.state) && !covered.has(i.id))
    .map((i) => ({ id: i.id, title: i.title, category: "board", priority: 5, status: i.state }));
  return [...inbox, ...board].sort((a, b) => (a.priority ?? 9) - (b.priority ?? 9));
}

/** HQ shows prompts and reports, so it stays off in production until it sits behind a login. */
export const hqEnabled = () => process.env.NODE_ENV !== "production" || process.env.HQ_PUBLIC === "1";

/** Rituals due now, from company/rituals/triggers.json (event-driven cadence). Held = a committed record file
 *  (tools/lib/ritual-records.mjs), the same rule as tools/rituals-due.mjs (external assessment 2026-10-17 §3). */
export function ritualsDue(): Due[] {
  try {
    const triggers = JSON.parse(fs.readFileSync(path.join(process.cwd(), "company/rituals/triggers.json"), "utf8")).triggers;
    const events = [...readAll(), ...recordEvents(triggers, { root: /*turbopackIgnore: true*/ process.cwd() })].sort((a, b) => a.ts.localeCompare(b.ts));
    return computeDue(triggers, events).filter((d) => d.due);
  } catch {
    return [];
  }
}

export interface OrgRole {
  id: string;
  title: string;
  team: string;
  reportsTo: string;
}

/** The org as HQ needs it: who reports to whom (from tools/org/roles.mjs, the single source). */
export function loadOrg(): OrgRole[] {
  return roles.map(({ id, title, team, reportsTo }) => ({ id, title, team, reportsTo }));
}
