// Factual source notation for the knot table, typed in by hand (W-145). See README.md in this folder.
// Each entry: one notation (dt = Dowker-Thistlethwaite code of a knot, braid = braid word, sigma_i = i,
// sigma_i^-1 = -i), the writhe w of the intended diagram (a one-bit chirality choice: the derived diagram is
// mirrored if its writhe is -w), the table metadata (alias, c, u, a) and the citation for the notation.
// rev lists components of the derived diagram whose orientation is reversed so that the orientation equals
// the current table's (a convention; it keeps signs, writhe and drawings unchanged).
// No value here was copied from a file of SnapPy, spherogram, Regina or any other GPL program.

// Citations (short keys used below):
//   DT83  C. H. Dowker, M. B. Thistlethwaite, "Classification of knot projections", Topology Appl. 16 (1983) 19-31
//         (the notation).
//   R76   D. Rolfsen, "Knots and Links", Publish or Perish (1976), Appendix C (the table and its diagrams).
//   KI    C. Livingston, A. H. Moore, "KnotInfo: Table of Knot Invariants", knotinfo.org (column "DT Notation"
//         and "Braid Notation"); the standard DT codes of the Rolfsen diagrams. Cited as a source of facts.
//   LI    C. Livingston, A. H. Moore, "LinkInfo: Table of Link Invariants" (link names L2a1, L5a1, L6a4).
//   BIR   J. S. Birman, "Braids, Links, and Mapping Class Groups", Ann. of Math. Studies 82 (1974); the
//         Borromean rings as the closure of (sigma_1 sigma_2^-1)^3 is a textbook example (also Kassel-Turaev,
//         "Braid Groups", GTM 247 (2008)).
//   AD    C. Adams, "The Knot Book" (1994): Hopf link = closure of sigma_1^2; Whitehead link as a 3-braid.
//   C70   J. H. Conway, "An enumeration of knots and links, and some of their algebraic properties", in
//         Computational Problems in Abstract Algebra (1970) 329-358 (Conway notation; 7_5 = 322, 10_8 = 514).
//   BZ    G. Burde, H. Zieschang, "Knots", de Gruyter (1985/2003), ch. 12: a 2-bridge knot with Conway
//         notation a1 a2 ... an is the plat closure of the 4-braid s2^a1 s1^-a2 s2^a3 ... (derive.mjs, platGauss).
//   WRITHE  the chirality bit follows the Rolfsen / Knot Atlas diagrams the README's convention fixes
//         ("the table's 3_1 is the left-handed trefoil"); for a reduced alternating diagram the writhe is a
//         knot invariant (Kauffman, Murasugi, Thistlethwaite 1987), so it pins the chirality.

export const SOURCES = [
  { name: '0_1', pd: [], alias: 'unknot', u: 0, a: true, cite: 'the empty diagram' },
  { name: '3_1', dt: [4, 6, 2], w: -3, alias: 'trefoil', u: 1, cite: 'DT83, R76, KI' },
  { name: '4_1', dt: [4, 6, 8, 2], w: 0, alias: 'figure-eight', u: 1, a: true, cite: 'DT83, R76, KI' },
  { name: '5_1', dt: [6, 8, 10, 2, 4], w: -5, alias: 'cinquefoil', u: 2, cite: 'R76, KI' },
  { name: '5_2', dt: [4, 8, 10, 2, 6], w: 5, rev: [0], alias: 'three-twist', u: 1, cite: 'R76, KI' },
  { name: '6_1', dt: [4, 8, 12, 10, 2, 6], w: 2, rev: [0], alias: 'stevedore', u: 1, cite: 'R76, KI' },
  { name: '6_2', dt: [4, 8, 10, 12, 2, 6], w: 2, u: 1, cite: 'R76, KI' },
  { name: '6_3', dt: [4, 8, 10, 2, 12, 6], w: 0, rev: [0], u: 1, a: true, cite: 'R76, KI' },
  { name: '7_1', dt: [8, 10, 12, 14, 2, 4, 6], w: -7, u: 3, cite: 'R76, KI' },
  { name: '7_2', dt: [4, 10, 14, 12, 2, 8, 6], w: -7, rev: [0], u: 1, cite: 'R76, KI' },
  { name: '7_3', dt: [6, 10, 12, 14, 2, 4, 8], w: -7, rev: [0], u: 2, cite: 'R76, KI' },
  { name: '7_4', dt: [6, 10, 12, 14, 4, 2, 8], w: 7, rev: [0], u: 2, cite: 'R76, KI' },
  { name: '7_5', conway: [3, 2, 2], w: -7, rev: [0], u: 2, cite: 'C70, R76, BZ, KI' },
  { name: '7_6', dt: [4, 8, 12, 2, 14, 6, 10], w: -3, u: 1, cite: 'R76, KI' },
  { name: '7_7', dt: [4, 8, 10, 12, 2, 14, 6], w: -1, u: 1, cite: 'R76, KI' },
  { name: '10_8', conway: [5, 1, 4], w: -2, rev: [0], c: 10, u: 2, cite: 'C70, R76, BZ, KI' },
  { name: 'L2a1', braid: [-1, -1], w: -2, alias: 'hopf', c: 2, cite: 'AD, LI' },
  { name: 'L5a1', braid: [1, -2, 1, -2, -2], w: -1, rev: [0, 1], alias: 'whitehead', c: 5, cite: 'AD, LI' },
  { name: 'L6a4', braid: [1, -2, 1, -2, 1, -2], w: 0, rev: [2], alias: 'borromean', c: 6, a: true, cite: 'BIR, LI' },
]
