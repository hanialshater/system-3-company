// Four towns on one road (km), start and finish at 0. Distances are |a - b| along the road.
export const TOWNS = [-15, -3, 2, 8] as const;
export type Hop = { from: number; to: number; len: number };

const tour = (order: readonly number[]): Hop[] => {
  const stops = [0, ...order, 0];
  return stops.slice(1).map((to, i) => ({ from: stops[i], to, len: Math.abs(to - stops[i]) }));
};

/** Nearest unvisited town each time (no ties occur on this road), then home. */
export function nearestFirst(): Hop[] {
  let at = 0;
  const left = [...TOWNS] as number[];
  const order: number[] = [];
  while (left.length) {
    left.sort((a, b) => Math.abs(a - at) - Math.abs(b - at));
    at = left.shift()!;
    order.push(at);
  }
  return tour(order);
}

/** Out to the far right end first, then sweep left to the far left end, then home. */
export const outTo8First = (): Hop[] => tour([2, 8, -3, -15]);

const perms = (a: number[]): number[][] =>
  a.length < 2 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p]));
export const ALL_TOTALS = perms([...TOWNS]).map((o) => tour(o).reduce((t, h) => t + h.len, 0));
export const total = (hops: Hop[]) => hops.reduce((t, h) => t + h.len, 0);
