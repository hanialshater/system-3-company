// First Light war room: pure logic (no fs). status.json is validated here, workstream statuses are derived from
// the board, and a manual override with a note wins. Disk side: hq-firstlight-server.ts. Owner: hq-engineer.

export const STATUSES = ["not started", "in progress", "blocked", "done"] as const;
export type WsStatus = (typeof STATUSES)[number];
export type Rag = "red" | "amber" | "green";

export interface Workstream {
  id: string;
  name: string;
  owner: string;
  board: string[];
  next: string;
  override?: { status: WsStatus; note: string };
}
export interface FlDecisionRef { id: string; why: string; title?: string; status?: string }
export interface FlRiskRef { id: string; why: string; status?: "proposed"; title?: string; likelihood?: number; impact?: number; owner?: string }
export interface JourFixe { id: string; name: string; days: string[]; minutes: number; kind: string; record: string }
export interface FirstLightStatus {
  code_name: string;
  owner: string;
  owner_interim?: string;
  tech_lead: string;
  updated: string;
  dates: { go_no_go: string; launch: string; note?: string };
  whiteboard: string;
  workstreams: Workstream[];
  founder_decisions: FlDecisionRef[];
  risks: FlRiskRef[];
  jour_fixe: JourFixe[];
}
export interface BoardItem { id: string; title: string; owner: string; state: string }

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const isStr = (x: unknown): x is string => typeof x === "string" && x.trim() !== "";

/** Null when valid, else the first problem. Checks shape only; ids are checked against the board by validateRefs. */
export function validateStatus(j: unknown): string | null {
  const s = j as FirstLightStatus;
  if (!s || typeof s !== "object") return "not an object";
  for (const k of ["code_name", "owner", "tech_lead", "whiteboard"] as const) if (!isStr(s[k])) return `${k} is missing`;
  if (!DATE.test(s.updated ?? "")) return "updated must be yyyy-mm-dd";
  if (!DATE.test(s.dates?.go_no_go ?? "") || !DATE.test(s.dates?.launch ?? "")) return "dates.go_no_go and dates.launch must be yyyy-mm-dd";
  if (s.dates.go_no_go > s.dates.launch) return "go/no-go must not be after launch";
  if (!Array.isArray(s.workstreams) || !s.workstreams.length) return "workstreams must be a non-empty array";
  const seen = new Set<string>();
  for (const w of s.workstreams) {
    if (!isStr(w?.id) || !isStr(w.name) || !isStr(w.owner) || !isStr(w.next)) return `workstream ${w?.id ?? "?"} needs id, name, owner and next`;
    if (seen.has(w.id)) return `duplicate workstream ${w.id}`;
    seen.add(w.id);
    if (!Array.isArray(w.board) || w.board.some((b) => !/^W-\d+$/.test(b))) return `${w.id}: board must list W-ids`;
    if (w.override) {
      if (!STATUSES.includes(w.override.status)) return `${w.id}: override status must be one of ${STATUSES.join(", ")}`;
      if (!isStr(w.override.note)) return `${w.id}: an override needs a note`;
    }
  }
  if (!Array.isArray(s.founder_decisions)) return "founder_decisions must be an array";
  for (const d of s.founder_decisions) if (!isStr(d?.id) || !isStr(d.why)) return "each founder decision needs id and why";
  if (!Array.isArray(s.risks)) return "risks must be an array";
  for (const r of s.risks) {
    if (!isStr(r?.id) || !isStr(r.why)) return "each risk needs id and why";
    if (r.status === "proposed") {
      if (!isStr(r.title) || !isStr(r.owner)) return `${r.id}: a proposed risk needs title and owner`;
      for (const n of [r.likelihood, r.impact]) if (!Number.isInteger(n) || n! < 1 || n! > 5) return `${r.id}: likelihood and impact are 1..5`;
    }
  }
  if (!Array.isArray(s.jour_fixe) || !s.jour_fixe.length) return "jour_fixe must be a non-empty array";
  for (const f of s.jour_fixe) if (!isStr(f?.id) || !f.days?.length || f.days.some((d) => !DAYS.includes(d))) return `jour fixe ${f?.id ?? "?"} needs id and days (Mon..Sun)`;
  return null;
}

/** Every board id a workstream tracks exists on the board; every decision/risk id exists unless it is local. */
export function validateRefs(s: FirstLightStatus, boardIds: Set<string>, inboxIds: Set<string>, riskIds: Set<string>): string | null {
  for (const w of s.workstreams) for (const b of w.board) if (!boardIds.has(b)) return `${w.id}: ${b} is not on the board`;
  for (const d of s.founder_decisions) if (!inboxIds.has(d.id) && !isStr(d.title)) return `${d.id} is not in founder-inbox.json and has no title`;
  for (const r of s.risks) if (r.status !== "proposed" && !riskIds.has(r.id)) return `${r.id} is not in risks.json`;
  return null;
}

/** Status from the board alone. Dropped items are ignored; no live items means nothing has started. */
export function deriveStatus(states: string[]): WsStatus {
  const live = states.filter((x) => x !== "dropped");
  if (!live.length) return "not started";
  if (live.every((x) => x === "done")) return "done";
  if (live.some((x) => x === "doing" || x === "review" || x === "done")) return "in progress";
  return "not started";
}

export interface WsView extends Workstream {
  derived: WsStatus;
  status: WsStatus;
  overridden: boolean;
  items: { id: string; state: string; title: string; owner: string; missing?: boolean }[];
}

export function workstreamViews(s: FirstLightStatus, board: BoardItem[]): WsView[] {
  const by = new Map(board.map((b) => [b.id, b]));
  return s.workstreams.map((w) => {
    const items = w.board.map((id) => {
      const b = by.get(id);
      return b ? { id, state: b.state, title: b.title, owner: b.owner } : { id, state: "missing", title: "not on the board", owner: "", missing: true };
    });
    const derived = deriveStatus(items.filter((i) => !i.missing).map((i) => i.state));
    return { ...w, items, derived, status: w.override?.status ?? derived, overridden: Boolean(w.override) };
  });
}

const DAY_MS = 86400000;
const utc = (d: string) => Date.parse(`${d}T00:00:00Z`);
/** Whole days from today (UTC date) to the target; negative when past. */
export function daysUntil(target: string, now: Date): number {
  return Math.round((utc(target) - utc(now.toISOString().slice(0, 10))) / DAY_MS);
}

export function overallRag(views: WsView[], openDecisions: number, goNoGo: string, now: Date): { rag: Rag; why: string } {
  const days = daysUntil(goNoGo, now);
  const blocked = views.filter((v) => v.status === "blocked").length;
  const notDone = views.filter((v) => v.status !== "done").length;
  const notStarted = views.filter((v) => v.status === "not started").length;
  if (days < 0 && notDone) return { rag: "red", why: `go/no-go has passed with ${notDone} workstreams not done` };
  if (blocked && days <= 14) return { rag: "red", why: `${blocked} blocked with ${days} days to go/no-go` };
  if (blocked) return { rag: "amber", why: `${blocked} blocked` };
  if (openDecisions) return { rag: "amber", why: `${openDecisions} founder decisions open` };
  if (notStarted * 2 >= views.length) return { rag: "amber", why: `${notStarted} of ${views.length} not started` };
  return { rag: "green", why: "nothing blocked, nothing waiting on the founder" };
}

const JS_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
/** The next date (UTC, today included) a jour fixe falls on. */
export function nextOccurrence(days: string[], now: Date): string {
  for (let i = 0; i < 7; i++) {
    const d = new Date(utc(now.toISOString().slice(0, 10)) + i * DAY_MS);
    if (days.includes(JS_DAY[d.getUTCDay()])) return d.toISOString().slice(0, 10);
  }
  return "";
}

export const riskScore = (r: { likelihood: number; impact: number }) => r.likelihood * r.impact;
