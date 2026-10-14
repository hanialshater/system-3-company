// Kudos, read side for HQ (client-safe: no fs). Kudos are `kudos` events in company/ops/events.jsonl,
// written by tools/kudos.mjs or by POST /api/hq/kudos. Not a metric: HQ never ranks anyone lowest.
import type { HqEvent } from "./hq";

export interface Kudos {
  id: string;
  ts: string;
  from: string;
  to: string;
  /** The recipient's role id (the part of `to` before any " · " or "("). */
  toRole: string;
  emoji: string;
  why: string;
  ref?: string;
}

export const KUDOS_EMOJI = ["🎉", "🙌", "💡", "🔍", "🛠️", "💛", "🚀", "🌟"] as const;
export const KUDOS_MAX = 280;
export const kudosRole = (to: string) => to.split(/\s*[·(]/)[0].trim();

export function toKudos(e: HqEvent): Kudos | null {
  if (e.type !== "kudos" || !e.subjects?.[0]) return null;
  const m = e.summary.match(/^(\p{Extended_Pictographic}[️‍\p{Extended_Pictographic}]*)\s/u);
  const arrow = e.summary.indexOf(" → ");
  const colon = arrow >= 0 ? e.summary.indexOf(": ", arrow) : -1;
  return { id: e.id, ts: e.ts, from: e.actor, to: e.subjects[0], toRole: kudosRole(e.subjects[0]), emoji: m?.[1] ?? "🎉", why: colon >= 0 ? e.summary.slice(colon + 2) : e.summary, ref: e.refs?.[0] };
}

export const kudosOf = (events: HqEvent[]): Kudos[] => events.map(toKudos).filter((k): k is Kudos => k !== null);
