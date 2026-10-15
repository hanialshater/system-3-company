// Read side of the company event log (company/ops/events.jsonl) for HQ.
// The log is written by tools/events.mjs; its schema is company/ops/events.md.
import fs from "node:fs";
import path from "node:path";
export { teamColor } from "./hq-colors";
import type { Floor } from "./hq-floors";
export { FLOORS, FLOOR_NAMES, stairsTo, type Floor } from "./hq-floors";
import { computeDue, type Due } from "../../tools/lib/rituals.mjs";
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
  /** Building floor: 1 = lessons and company core, 2 = Design, Personalization and International, 3 = Categories (subjects), 4 = R&D and Research, 5 = Engineering (app team), 6 = Categories (Books, Big Ideas, History, Life Hacks), 7 = Marketing. */
  floor?: Floor;
}

const DOMAINS: [string, string, string][] = [
  ["math", "Math", "#7c9cff"],
  ["cs", "CS", "#4fd1a5"],
  ["probability", "Probability", "#f6c453"],
  ["physics", "Physics", "#ff8a65"],
  ["ai", "AI", "#c792ea"],
  ["economics", "Money", "#80cbc4"],
  ["life", "Life", "#a5d66f"],
  ["chemistry", "Chem", "#f48fb1"],
  ["geography", "Geo", "#64b5f6"],
];

// Categories that are not school subjects (floor 6). Colours match src/lib/hq-colors.ts and content/domains.json.
const NEW_CATEGORIES: [string, string, string][] = [
  ["books", "Book Summaries", "#bcaaa4"],
  ["big-ideas", "Big Ideas", "#4dd0e1"],
  ["history", "History", "#d9b26f"],
  ["lifehacks", "Life Hacks", "#ffb74d"],
];

// The floor plan, in SVG units (1000 × 660). Offices around the edge, the work floor in the middle.
export const ROOMS: Room[] = [
  // Floor 1 top row: Product, and the stairs to the Categories floor.
  { id: "product", name: "Product · Head of Product", x: 20, y: 16, w: 470, h: 84, kind: "office" },
  { id: "to-floor-3", name: "↑ Floors 3 & 6 · Categories", x: 500, y: 16, w: 230, h: 84, kind: "lobby" },
  { id: "to-floor-2", name: "↑ Floor 2 · Design, Personalization, International", x: 740, y: 16, w: 240, h: 84, kind: "lobby" },
  // Floor 3 (re-cut 2026-10-14): the nine subject categories, each a full office for its lead and 3 strand managers;
  // stairs up to floor 6; strategy, Courses and portfolio review along the bottom.
  ...DOMAINS.map(([id, name, color], i) => ({
    id: `cm-${id}`, name, x: 20 + (i % 5) * 194, y: 16 + Math.floor(i / 5) * 246, w: 186, h: 236, kind: "office" as const, color, floor: 3 as const,
  })),
  { id: "to-floor-6", name: "↑ Floor 6", x: 796, y: 262, w: 186, h: 236, kind: "lobby", floor: 3 },
  { id: "strategy", name: "Strategy · Verticals", x: 20, y: 508, w: 313, h: 130, kind: "office", floor: 3 },
  { id: "courses", name: "Courses · Books", x: 342, y: 508, w: 313, h: 130, kind: "office", color: "#90a4ae", floor: 3 },
  { id: "portfolio-review", name: "Portfolio review", x: 664, y: 508, w: 316, h: 130, kind: "meeting", floor: 3 },
  // Floor 6 (2026-10-14, founder: "put these into the right floor"): the categories that are not school subjects.
  // Same office size and kind as floor 3, so each lead and their strand managers sit at desks; Life Hacks keeps its safety desk beside it.
  ...NEW_CATEGORIES.map(([id, name, color], i) => ({
    id: `cm-${id}`, name, x: 20 + i * 194, y: 16, w: 186, h: 236, kind: "office" as const, color, floor: 6 as const,
  })),
  { id: "lifehacks-safety", name: "Hacks safety desk", x: 796, y: 16, w: 184, h: 236, kind: "floor", floor: 6 },
  { id: "to-floor-3-from-6", name: "↓ Floor 3 · Categories · subjects", x: 20, y: 262, w: 380, h: 120, kind: "lobby", floor: 6 },
  { id: "meeting-wbr", name: "WBR room", x: 20, y: 116, w: 150, h: 110, kind: "meeting" },
  { id: "meeting-retro", name: "Retro room", x: 20, y: 236, w: 150, h: 110, kind: "meeting" },
  { id: "meeting-crit", name: "Demo Crit", x: 20, y: 356, w: 150, h: 110, kind: "meeting" },
  { id: "meeting-planning", name: "Planning room", x: 20, y: 476, w: 150, h: 76, kind: "meeting" },
  { id: "to-floor-5", name: "↑ Floor 5 · Engineering", x: 830, y: 116, w: 150, h: 230, kind: "lobby" },
  { id: "growth", name: "Growth", x: 830, y: 356, w: 150, h: 110, kind: "office" },
  { id: "tools", name: "Company Tools", x: 830, y: 476, w: 150, h: 76, kind: "office" },
  { id: "build-floor", name: "Build floor", x: 186, y: 116, w: 400, h: 230, kind: "floor" },
  { id: "fact-check", name: "Fact-check desk", x: 598, y: 116, w: 216, h: 110, kind: "floor" },
  { id: "learner-review", name: "Learner review", x: 598, y: 236, w: 216, h: 110, kind: "floor" },
  { id: "qa-lab", name: "QA lab", x: 186, y: 356, w: 196, h: 110, kind: "floor" },
  { id: "launch-room", name: "Launch room", x: 392, y: 356, w: 194, h: 110, kind: "meeting" },
  { id: "constitution", name: "Constitution", x: 598, y: 356, w: 216, h: 110, kind: "meeting" },
  { id: "chief-of-staff", name: "Chief of Staff", x: 186, y: 476, w: 190, h: 76, kind: "office" },
  { id: "studio", name: "Studio", x: 386, y: 476, w: 200, h: 76, kind: "office" },
  { id: "incident", name: "Incident & ops review", x: 598, y: 476, w: 216, h: 76, kind: "meeting" },
  { id: "lobby", name: "Lobby · Founder", x: 300, y: 568, w: 220, h: 76, kind: "lobby" },
  // First Light war room (W-907, company/decisions/2026-10-15-founder-first-light.md): temporary, beside the CEO office. Page: /hq/first-light.
  { id: "first-light", name: "War room: First Light", x: 530, y: 568, w: 170, h: 76, kind: "meeting" },
  { id: "ceo-office", name: "CEO office · company health", x: 710, y: 568, w: 270, h: 76, kind: "office", color: "#ffd54f" },
  // Stairs to floor 7 (Marketing) sit beside the Lobby: the VP of Marketing reports to the founder.
  { id: "to-floor-7", name: "↑ Floor 7 · Marketing", x: 20, y: 568, w: 270, h: 76, kind: "lobby" },
  // Floor 2 (2026-10-13): Life Hacks, Personalization, International.
  { id: "personalization", name: "Personalization", x: 20, y: 16, w: 300, h: 370, kind: "office", color: "#c792ea", floor: 2 },
  { id: "model-lab", name: "Learner model lab", x: 330, y: 16, w: 190, h: 370, kind: "floor", floor: 2 },
  { id: "international", name: "International", x: 540, y: 16, w: 440, h: 150, kind: "office", color: "#4fd1a5", floor: 2 },
  { id: "locale-desks", name: "Locale desks", x: 540, y: 186, w: 440, h: 200, kind: "floor", floor: 2 },
  { id: "culture-review", name: "Culture review", x: 540, y: 406, w: 440, h: 130, kind: "meeting", floor: 2 },
  { id: "design-studio", name: "Design studio", x: 20, y: 406, w: 500, h: 130, kind: "office", color: "#f48fb1", floor: 2 },
  // Floor 4 (2026-10-13): R&D and Research, reporting to the VP of R&D in the CEO office.
  { id: "rnd-lab", name: "R&D lab · libraries & engines", x: 20, y: 16, w: 470, h: 330, kind: "floor", color: "#64b5f6", floor: 4 },
  { id: "research-lab", name: "Research lab · learning & domain science", x: 510, y: 16, w: 470, h: 330, kind: "floor", color: "#81c784", floor: 4 },
  { id: "rnd-office", name: "R&D leads", x: 20, y: 366, w: 470, h: 130, kind: "office", color: "#64b5f6", floor: 4 },
  { id: "research-office", name: "Research leads", x: 510, y: 366, w: 470, h: 130, kind: "office", color: "#81c784", floor: 4 },
  { id: "seminar", name: "Seminar room · R&D review", x: 20, y: 516, w: 960, h: 124, kind: "meeting", floor: 4 },
  // Floor 5 (2026-10-14): Engineering. The app team (app shell, feed, kit, backend) moved up from floor 1.
  { id: "app-team", name: "App team · app shell, feed, kit, backend", x: 20, y: 16, w: 620, h: 330, kind: "floor", color: "#4fc3f7", floor: 5 },
  { id: "backend", name: "Data & privacy", x: 660, y: 16, w: 320, h: 330, kind: "office", color: "#4fc3f7", floor: 5 },
  { id: "engineering", name: "Engineering review room", x: 20, y: 366, w: 620, h: 150, kind: "meeting", floor: 5 },
  { id: "deploy", name: "Release & deploy", x: 660, y: 366, w: 320, h: 150, kind: "office", floor: 5 },
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
  return readAll().map(({ body, ...e }) => ({ ...e, hasBody: Boolean(body) }));
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
      return JSON.parse(fs.readFileSync(path.join(process.cwd(), f), "utf8"));
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

/** Rituals due now, from company/rituals/triggers.json (event-driven cadence). */
export function ritualsDue(): Due[] {
  try {
    const triggers = JSON.parse(fs.readFileSync(path.join(process.cwd(), "company/rituals/triggers.json"), "utf8")).triggers;
    return computeDue(triggers, readAll()).filter((d) => d.due);
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
