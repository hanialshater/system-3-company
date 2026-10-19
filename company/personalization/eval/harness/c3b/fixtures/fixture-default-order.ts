// Fixture candidate for criterion 3b's plumbing (eval-owned, written in run eval-k5-1017; never scored as a candidate).
// It is the product's default order behind the candidate interface (criterion 3b §I): rank() lists every lesson not yet
// completed in the catalogue's default order, decide() is its first item. One dependency-free file, types declared
// locally, erasable TypeScript only, as the candidate is required to be. It reads only `history` and `dims`.
//
// Default order (the catalogue's rule, company/personalization/model/sim/catalog.mjs header): published lessons before
// the rest, then by slug, then taken one at a time from each domain in turn, domains in order of first appearance.

type Dims = { slug: string; domain: string; status?: string };
type Item = { slug: string };
type Input = { now: number; history: Item[]; dims: Record<string, Dims>; slots: number };
type Ranked = { slug: string; value: number; reason: string };

export const NAME = "fixture-default-order";

function catalogueOrder(dims: Record<string, Dims>): string[] {
  const all = Object.keys(dims).map((k) => dims[k]);
  all.sort((a, b) => {
    const pa = a.status === "published" ? 0 : 1;
    const pb = b.status === "published" ? 0 : 1;
    if (pa !== pb) return pa - pb;
    return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
  });
  const lanes: string[][] = [];
  const laneOf: Record<string, number> = {};
  for (const l of all) {
    if (!(l.domain in laneOf)) { laneOf[l.domain] = lanes.length; lanes.push([]); }
    lanes[laneOf[l.domain]].push(l.slug);
  }
  const out: string[] = [];
  let left = all.length;
  for (let round = 0; left > 0; round++) for (const lane of lanes) if (round < lane.length) { out.push(lane[round]); left--; }
  return out;
}

export function rank(input: Input): Ranked[] {
  const done: Record<string, true> = {};
  for (const h of input.history) done[h.slug] = true;
  return catalogueOrder(input.dims).filter((s) => !done[s]).map((slug) => ({ slug, value: 0, reason: "default-order" }));
}

export function decide(input: Input): Ranked | null {
  const r = rank(input);
  return r.length ? r[0] : null;
}
