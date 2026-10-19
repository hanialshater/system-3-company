# Fact-check: unknot-game c6, c7 (v2, W-1603 source swap)

Date: 2026-10-17. Checker: fact-checker (wrote neither claim nor either source field). Lane: unknot-game, claims c6 and c7 only. Base: main e337d74c (lesson commit 53038b06, meta.version 2).

## What changed since the last check

Diff 75237339..53038b06 on the lesson dir: meta.json c6/c7 source fields swapped to PMC5582600 and PMC4354144 (c7 keeps Kronheimer and Mrowka 1993), both reset to unverified, claim text unchanged. Demo.tsx: on entering the reveal the stage returns to the trefoil with the last trefoil switch (lastTre) and its tint; caption no longer hidden by the empty class. The Reveal component text is byte-unchanged: "The fewest switches that can free a knot is its unknotting number: 1 for the trefoil, and for the figure-eight too. Some knots need more than one."

## Sources opened (PMC OAI full text, this run)

- PMC5582600: Fielden, Leigh, Woltering, Molecular Knots, Angew Chem Int Ed 2017, doi 10.1002/anie.201702531 (doi and authors read from the XML front matter).
  - "One characteristic of knots is their unknotting number, which refers to the minimum number of crossings that have to be inverted to give the unknot from a given knot."
  - "the unknotting number of a twist knot is always 1 (Figure 14 a) and for a torus knot T(p,q) is 1/2 (p-1)(q-1) (Figure 14 b).[52]" The xref rid is bib-0052.
  - Ref 52: P. B. Kronheimer, T. S. Mrowka, Topology 1993, 32, 773-826. Crossref 10.1016/0040-9383(93)90051-v returns Gauge theory for embedded surfaces, I; Topology 32(4) 773-826; Kronheimer, Mrowka; 1993-10.
  - Figure 14b caption: the pentafoil 5_1 "So the unknotting number is 2 (=1/2 (2-1)(5-1))."
- PMC4354144: Rawdon, Millett, Stasiak, Subknots in ideal knots, random knots, and knotted proteins, Sci Rep 2015, doi 10.1038/srep08928.
  - "The figure-eight knot, 4_1, is a twist knot having unknotting number one, as does 3_1 (which is both a twist knot and a torus knot)."
  - "The unknotting number of the 5_1 knot is two"
- Not opened: Kronheimer and Mrowka 1993 full text (Elsevier). It is cited as the original proof; neither verdict rests on it.

## Verdicts

- **c6 verified.** Definition: PMC5582600 (minimum over inversions to reach the unknot from a given knot; a knot property, so minimised over all its drawings, as the claim says). Values: PMC4354144 gives 1 for both 3_1 and 4_1. Every quote in the source field matches the opened text. Rendered v2: at the reveal the stage shows the trefoil with one switch, readout Plain loop and the tinted caption, which agrees with "1 for the trefoil". The figure-eight is not on stage at the reveal, so that clause rests on PMC4354144, as the source field says.
- **c7 verified.** "Some knots need more than one": PMC5582600 Fig 14b and PMC4354144 both give 5_1 unknotting number 2. Checker example T(2,7) = 1/2 (2-1)(7-1) = 3 by the PMC5582600 formula. The returned trefoil stage makes no claim about other knots.

## Rendered text

No walkthrough transcript for v2 exists in this worktree and none was built (no node_modules). Learner text was read from Demo.tsx at 53038b06: hook, readout, caption, tally and Reveal. v2 adds no new learner-visible sentence; the aria-label wording is unchanged.

## Non-blocking

- Both source fields still end "Builder-written; unverified." That is the builder provenance text, not the status; the builder may trim "unverified" next time it touches the field. Not edited here.
