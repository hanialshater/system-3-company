// HQ floors, shared by the server page and the client floor plan (no node imports here).
export const FLOORS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type Floor = (typeof FLOORS)[number];

// F-40 (company/decisions/2026-10-16-founder-floor-reseat.md): one floor per org. Floor 9 is reserved for System 3 Meta (a note only, not drawn).
export const FLOOR_NAMES: Record<Floor, string> = {
  1: "Floor 1 · Lobby, leadership & operations",
  2: "Floor 2 · Product: studio, design, launch, personalization, international",
  3: "Floor 3 · Categories: science & technology",
  4: "Floor 4 · Categories: society, money & ideas",
  5: "Floor 5 · Engineering & R&D",
  6: "Floor 6 · Quality: gates & reviews",
  7: "Floor 7 · Marketing",
  8: "Floor 8 · System 3 Press (sibling company)",
};

/** Room ids in the event log that are drawn under another id. Applied at read time in loadEvents; stored events are never rewritten. */
export const ROOM_ALIASES: Record<string, string> = { "research-room": "research-lab" };

/** A stairs room ("to-floor-<n>", optionally with a suffix such as "-from-6") takes you to floor n; anything else is undefined. */
export function stairsTo(roomId: string): Floor | undefined {
  const m = /^to-floor-(\d)(?:-|$)/.exec(roomId);
  const n = m ? Number(m[1]) : NaN;
  return (FLOORS as readonly number[]).includes(n) ? (n as Floor) : undefined;
}
