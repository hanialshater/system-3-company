// Read side of the company event log (company/ops/events.jsonl) for HQ.
// The log is written by tools/events.mjs; its schema is company/ops/events.md.
import fs from "node:fs";
import path from "node:path";
export { teamColor } from "./hq-colors";
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
  /** Building floor: 1 = lessons and company core, 2 = Life Hacks, Personalization, International. */
  floor?: 1 | 2;
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

// The floor plan, in SVG units (1000 × 660). Offices around the edge, the work floor in the middle.
export const ROOMS: Room[] = [
  ...DOMAINS.map(([id, name, color], i) => ({ id: `cm-${id}`, name: name, x: 20 + i * 107, y: 16, w: 101, h: 84, kind: "office" as const, color })),
  { id: "meeting-wbr", name: "WBR room", x: 20, y: 116, w: 150, h: 110, kind: "meeting" },
  { id: "meeting-retro", name: "Retro room", x: 20, y: 236, w: 150, h: 110, kind: "meeting" },
  { id: "meeting-crit", name: "Demo Crit", x: 20, y: 356, w: 150, h: 110, kind: "meeting" },
  { id: "meeting-planning", name: "Planning room", x: 20, y: 476, w: 150, h: 76, kind: "meeting" },
  { id: "engineering", name: "Engineering", x: 830, y: 116, w: 150, h: 110, kind: "office" },
  { id: "backend", name: "Backend", x: 830, y: 236, w: 150, h: 110, kind: "office" },
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
  { id: "incident", name: "Incident room", x: 598, y: 476, w: 216, h: 76, kind: "meeting" },
  { id: "lobby", name: "Lobby · Founder", x: 300, y: 568, w: 400, h: 76, kind: "lobby" },
  // Floor 2 (2026-10-13): Life Hacks, Personalization, International.
  { id: "cm-lifehacks", name: "Life Hacks", x: 20, y: 16, w: 300, h: 150, kind: "office", color: "#ffb74d", floor: 2 },
  { id: "lifehacks-safety", name: "Safety desk", x: 330, y: 16, w: 190, h: 150, kind: "floor", floor: 2 },
  { id: "personalization", name: "Personalization", x: 20, y: 186, w: 300, h: 200, kind: "office", color: "#c792ea", floor: 2 },
  { id: "model-lab", name: "Learner model lab", x: 330, y: 186, w: 190, h: 200, kind: "floor", floor: 2 },
  { id: "international", name: "International", x: 540, y: 16, w: 440, h: 150, kind: "office", color: "#4fd1a5", floor: 2 },
  { id: "locale-desks", name: "Locale desks", x: 540, y: 186, w: 440, h: 200, kind: "floor", floor: 2 },
  { id: "culture-review", name: "Culture review", x: 540, y: 406, w: 440, h: 130, kind: "meeting", floor: 2 },
  { id: "lounge-2", name: "Floor 2 lounge", x: 20, y: 406, w: 500, h: 130, kind: "lobby", floor: 2 },
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

/** Founder-owned open board items: the Lobby's "waiting on you" list. */
export function founderQueue(): { id: string; title: string }[] {
  try {
    const items = JSON.parse(fs.readFileSync(path.join(process.cwd(), "company/ops/board.json"), "utf8")).items as { id: string; title: string; owner: string; state: string }[];
    return items.filter((i) => i.owner === "founder" && !["done", "dropped"].includes(i.state)).map(({ id, title }) => ({ id, title }));
  } catch {
    return [];
  }
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
