// Types and documentation for src/lab/knots (the source keeps comments short to stay inside the
// 10 KB gzip budget; this file is the reference). Lessons may not import src/lab until promotion.

/**
 * A PD (planar diagram) code: one 4-tuple of edge labels per crossing, listed counter-clockwise
 * starting with the incoming under-strand (the KnotTheory / Knot Atlas / SnapPy convention).
 * A 1-tuple [k] is a crossingless loop. [] is the unknot. Functions return canonical codes:
 * labels 1..2n run along each component in its direction.
 */
export type Crossing = [number, number, number, number]
export type PD = (Crossing | [number])[]
/** Laurent polynomial {exponent: integer coefficient}. Exponents may be half-integers (Jones of even links). */
export type Poly = Record<string, number>
/** Internal dart model (advanced): dart d = 4 * crossing + slot. */
export interface Model { n: number; o: number[]; h: number[]; u: number[]; lab: number[]; dead: number[]; loops: number }

// ---------- polynomials ----------
export function poly(o?: Record<string | number, number>): Poly
export function padd(p: Poly, q: Poly, sign?: number): Poly
export function pmul(p: Poly, q: Poly): Poly
/** p(1/t): the mirror image's Jones polynomial. */
export function pinv(p: Poly): Poly
export function peq(p: Poly, q: Poly): boolean
/** "t + t^3 - t^4", "-t^(1/2) - t^(5/2)", "0". */
export function pstr(p: Poly, variable?: string): string
export function pparse(s: string, variable?: string): Poly
/** Value at an integer t (integer exponents). */
export function peval(p: Poly, t: number): number

// ---------- diagram core ----------
/** Parse and validate (each label twice, consistent orientation, planar). Throws on a bad code. */
export function load(pd: PD): Model
export function toPD(m: Model): PD
export function crossingCount(pd: PD): number
export function components(pd: PD): number
/** +1 / -1 per crossing: +1 when the over-strand passes right to left seen along the under-strand (right-handed). */
export function signs(pd: PD): number[]
export function writhe(pd: PD): number
/** Half the sum of signs of crossings between each pair of components. */
export function linkingMatrix(pd: PD): number[][]
export function linkingNumber(pd: PD, a?: number, b?: number): number
/** Switch over/under at crossings (indices into the PD code). Edge labels and crossing order are kept. */
export function crossingChange(pd: PD, ...crossings: number[]): PD
/** Mirror image (every crossing switched). */
export function mirror(pd: PD): PD
/** Reverse the orientation of component k (all if omitted). */
export function reverse(pd: PD, k?: number): PD
/** Turn the diagram over in 3-D: a planar reflection plus every crossing switched. Same knot, unlike mirror(). */
export function turnOver(pd: PD): PD
/** Remove component k and its crossings (cut a ring of the Borromean rings). */
export function deleteComponent(pd: PD, k: number): PD
/** Connected sum of two oriented diagrams, joined at the first edge of each. */
export function connectedSum(a: PD, b: PD): PD
export function isAlternating(pd: PD): boolean
/** Indices of nugatory crossings (two corners in one region). */
export function nugatory(pd: PD): number[]

// ---------- moves ----------
export interface Move { type: 'R1' | 'R2' | 'R3'; dart: number; crossings: number[]; edges: number[] }
/** Regions as lists of edge labels in boundary order (a region shared by edges a and b allows addBigon(pd, a, b)). */
export function regions(pd: PD): number[][]
/** Every R1 (kink removal), R2 (bigon removal) and R3 (triangle slide) move available now. */
export function moves(pd: PD): Move[]
/** Apply a move from moves(pd) to the same pd. */
export function apply(pd: PD, m: Move): PD
/** R1 up: a kink on edge e; side 0/1 = region right/left of the edge's direction; under 0/1 = which pass goes under. */
export function addKink(pd: PD, edge?: number, side?: 0 | 1, under?: 0 | 1): PD
/** R2 up: push edge a over (or under) edge b across a region they share. */
export function addBigon(pd: PD, a: number, b: number, aOver?: boolean): PD
/** R1/R2 removals until none are left (never adds crossings). */
export function reduce(pd: PD): PD
export function randomMove(pd: PD, rng: () => number, up?: number, kink?: number): PD
/** Seeded random Reidemeister moves; the knot type never changes. */
export function scramble(pd: PD, seed?: number, steps?: number, up?: number): PD
/**
 * Simplify, allowed to go up in crossings first (hard unknots need it). status:
 * 'unknot' | 'unlink' = no crossings left; 'minimal' = reduced alternating, so provably minimal (and knotted, for a knot);
 * 'unknown' = could not simplify further. 'unknown' is NOT a proof of knottedness.
 */
export function simplify(pd: PD, opts?: { seed?: number; effort?: number }): { pd: PD; crossings: number; status: 'unknot' | 'unlink' | 'minimal' | 'unknown' }

// ---------- codes ----------
/** Gauss code per component (+k over, -k under crossing k, 1-based) and crossing signs. */
export function toGauss(pd: PD): { code: number[][]; signs: number[] }
/** With signs: exact. Without: the first planar realisation (the knot up to mirror image; composites may differ). */
export function fromGauss(code: number[][], signs?: number[]): PD
/** Dowker-Thistlethwaite code of a knot, starting at an over-pass; even label negative when that pass is over. */
export function toDT(pd: PD): number[]
/** Up to mirror image. */
export function fromDT(dt: number[]): PD
/** Closure of a braid word: i = sigma_i (positive crossing), -i = its inverse. */
export function fromBraid(word: number[], strands?: number): PD

// ---------- invariants (exact integers) ----------
/** Arcs: over-strands between under-passes. crossings: [overArc, inArc, outArc] per crossing; edges: edge labels per arc. */
export function arcs(pd: PD): { count: number; crossings: [number, number, number][]; edges: number[][] }
/** Per crossing: does a colour-per-arc assignment obey 2*over = in + out (mod p)? For p = 3: all same or all different. */
export function colouringOk(pd: PD, colours: number[], p?: number): boolean[]
/** Number of Fox p-colourings, counting the p one-colour ones (3 for the unknot, 9 for the trefoil). */
export function colourings(pd: PD, p?: number): number
export function tricolourable(pd: PD): boolean
/** |Δ(-1)| = |V(-1)|; 0 for split links. */
export function determinant(pd: PD): number
/** Symmetric: Δ(t) = Δ(1/t); Δ(1) = 1 for knots; for links the top coefficient is positive (sign is a convention). 0 ({}) if split. */
export function alexander(pd: PD): Poly
/** Kauffman bracket in A: X[a,b,c,d] = A<a-b,c-d> + A^-1<a-d,b-c>, loop value -A^2 - A^-2, <unknot> = 1. */
export function bracket(pd: PD): Poly
/** V(t) = (-A^3)^-w <D> at A = t^(-1/4). V(unknot) = 1; right-handed trefoil = t + t^3 - t^4. Reduces R1/R2 first. 2^n states. */
export function jones(pd: PD): Poly
/** Gordon-Litherland signature; positive (right-handed) trefoil = -2. Connected diagrams. */
export function signature(pd: PD): number

// ---------- random and 3-D ----------
export function mulberry32(seed: number): () => number
/** Closure of a random braid with one component (length raised by 1 if parity requires). */
export function randomKnot(seed?: number, opts?: { strands?: number; length?: number }): { braid: number[]; pd: PD }
export type P3 = [number, number, number]
/** Unit-step random walk, optionally confined to a ball. */
export function randomWalk(seed?: number, steps?: number, radius?: number): P3[]
/** 'direct': straight segment between the ends. 'radial': ends carried far out from the centre of mass, joined there. */
export function closeCurve(pts: P3[], method?: 'direct' | 'radial'): P3[]
/** Project a closed polygon to the xy-plane (heights give over/under) and return its PD code. */
export function project(pts: P3[]): PD

// ---------- drawing ----------
/**
 * crossings[c] = centre of crossing c. points[label] = the points of the edge with that PD label, in travel order
 * (tail to head; every edge has at least one). Keyed by label, so a stored layout survives crossingChange.
 * loops = free circles [x, y, r].
 */
export interface Layout { crossings: [number, number][]; points: Record<number, [number, number][]>; loops: [number, number, number][] }
/**
 * Orthogonal grid drawing as the start (Tamassia 1987, topology-shape-metrics: crossings on grid points with strands
 * leaving E, N, W, S, fewest bends by a min-cost flow, rectangular faces, longest-path compaction; each piece's
 * largest face outside). Each grid run is cut into pieces of at most 4 grid units, then a crossing-preserving
 * force relaxation (PrEd, Bertault 2000; forces after Fruchterman-Reingold) rounds it: no vertex may cross a segment,
 * so the picture stays planar with the same faces and cyclic order at each crossing. Finally the short side is stretched to fill a
 * square. `relax` = relaxation steps (default 60). Deterministic. Plain data in math axes; store it to keep a picture fixed.
 */
export function layout(pd: PD, opts?: { relax?: number }): Layout
export interface Drawing {
  size: number
  viewBox: string
  /** One SVG path per edge (Catmull-Rom cubics through its points), cut short where it passes under. from/to are crossing indices. */
  edges: { label: number; component: number; from: number; to: number; d: string }[]
  /** Crossing centres (tap targets) and signs. */
  crossings: { i: number; x: number; y: number; sign: number }[]
  loops: { cx: number; cy: number; r: number }[]
}
export function draw(pd: PD, opts?: { size?: number; margin?: number; gap?: number; layout?: Layout }): Drawing

// ---------- table and identification ----------
export interface TableEntry { name: string; pd: PD; c: number; u?: number; a?: boolean; alias?: string }
/** 0_1, 3_1 ... 7_7, 10_8, L2a1 (hopf), L5a1 (whitehead), L6a4 (borromean), U10 (monster-unknot), granny, square. */
export const KNOTS: Record<string, TableEntry>
export function knot(nameOrAlias: string): TableEntry | undefined
/** Table entries matching after simplify (components, Alexander, Jones). [] = not in the table; several = ambiguous. */
export function identify(pd: PD): { name: string; mirror: boolean }[]
