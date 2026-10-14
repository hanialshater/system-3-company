// HQ floors, shared by the server page and the client floor plan (no node imports here).
export const FLOORS = [1, 2, 3, 4, 5, 6, 7] as const;
export type Floor = (typeof FLOORS)[number];

export const FLOOR_NAMES: Record<Floor, string> = {
  1: "Floor 1 · Lessons & company",
  2: "Floor 2 · Design, Personalization, International",
  3: "Floor 3 · Categories · subjects",
  4: "Floor 4 · R&D, Research",
  5: "Floor 5 · Engineering",
  6: "Floor 6 · Books, Big Ideas, History, Life Hacks",
  7: "Floor 7 · Marketing",
};

/** A stairs room ("to-floor-<n>", optionally with a suffix such as "-from-6") takes you to floor n; anything else is undefined. */
export function stairsTo(roomId: string): Floor | undefined {
  const m = /^to-floor-(\d)(?:-|$)/.exec(roomId);
  const n = m ? Number(m[1]) : NaN;
  return (FLOORS as readonly number[]).includes(n) ? (n as Floor) : undefined;
}
