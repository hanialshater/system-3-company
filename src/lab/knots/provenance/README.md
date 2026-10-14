# Knot table provenance (board item W-145, for promotion W-162)

Status: 2026-10-14, R&D engineer (session 2). **Recommendation: re-derive. Do not cite.** Promote
`table.derived.mjs` as the kit's `table.mjs`. Drop `U10` from the kit table and keep it in the lab bench only.

## The problem

`../table.mjs` holds PD codes that were read from SnapPy/spherogram (`spherogram.Link(name).PD_code()`, GPL-2.0-or-later)
for 3_1 … 7_7, 10_8, L2a1, L5a1 and L6a4, and from Regina's `ExampleLink.monster()` (GPL-2.0-or-later) for U10
(see `../PRIOR-ART.md`). A PD code of one diagram is a mathematical fact. But "read from a GPL program" is not a
provenance the kit should carry. This folder replaces each code with one that **our own code derives** from
short, standard notation, **typed in by hand** with a citation.

## Licences checked (2026-10-14)

Egress from this sandbox is limited. knotinfo.org, knotinfo.math.indiana.edu, katlas.org, web.archive.org,
wikipedia.org, doc.sagemath.org, regina-normal.github.io and search engines all returned **HTTP 403 from the egress
proxy** (an organisation policy, not retried). raw.githubusercontent.com and pypi.org were reachable.

| Source | Licence (verified text, URL) | Usable as a kit data source? |
|---|---|---|
| Spherogram (SnapPy) | "This code is released under the GNU General Public License, version 2 or (at your option) any later version as published by the Free Software Foundation." (https://raw.githubusercontent.com/3-manifolds/Spherogram/master/README.rst; `setup.py`: `license='GPLv2+'`) | No (copyleft) |
| snappy_manifolds (SnapPy's table data) | PyPI classifier "License :: OSI Approved :: GNU General Public License v2 or later (GPLv2+)" (https://pypi.org/pypi/snappy-manifolds/json) | No |
| Regina | "This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version." (https://raw.githubusercontent.com/regina-normal/regina/master/LICENSE.txt) | No |
| database_knotinfo 2026.10.5 (S. Oehms; "a snapshot of the complete content of the KnotInfo and LinkInfo databases") | `LICENSE` is the GNU GPL version 3 text; source headers say "GNU General Public License ... either version 2 of the License, or (at your option) any later version"; `setup.py` `license='GPL'` (https://pypi.org/project/database-knotinfo/, sdist `database_knotinfo-2026.10.5.tar.gz`) | No: the packaged copy of KnotInfo is GPL-labelled |
| KnotInfo / LinkInfo (Livingston, Moore) | **Not verified**: host blocked (403). From memory: no open licence, a request to cite "C. Livingston and A. H. Moore, KnotInfo: Table of Knot Invariants, knotinfo.org". | Only as a citation for individual facts |
| The Knot Atlas (Bar-Natan, Morrison et al.) | **Not verified**: host blocked (403). From memory: GNU Free Documentation License (copyleft). | Only as a citation for individual facts |

No permissively licensed (MIT/BSD/CC-BY/CC0) knot table was found. So "cite a permissive source" is not available,
and **re-deriving is the clean route.** What we use instead are individual standard codes (a DT code of at most 10 numbers,
one Conway notation, three short braid words). Each is a fact printed in many places (Rolfsen's table, Dowker–Thistlethwaite,
KnotInfo, textbooks). We cite them; we do not copy any file. *Not legal advice: the principal engineer may want a decision record
that says "short notations of individual knots are facts; we cite, we don't copy".*

## Method

- `sources.mjs`: one entry per table knot. Exactly one notation (`dt`, `conway`, `braid`, or `pd: []` for the unknot), a
  citation key, the table metadata, and two conventions:
  - `w`, the writhe of the intended diagram. A DT code fixes the knot only up to mirror image, so `w` is the chirality bit.
    For reduced alternating diagrams the writhe is an invariant (Kauffman, Murasugi, Thistlethwaite 1987). The values keep
    the table's documented convention ("chiral entries have the chirality of the Rolfsen / Knot Atlas diagrams"; 3_1 is
    the left-handed trefoil).
  - `rev`, the components whose orientation is reversed so the orientation matches the current table. This keeps signs,
    writhe, linking numbers and the drawings unchanged.
  Both are one-bit conventions, set by comparing with the current table. They are not data.
- `derive.mjs` (plain ESM, no dependencies) turns each entry into a PD code with this library's own `fromDT` and `fromBraid`, and
  a new `platGauss` + `conwayBraid`. These give the 4-plat (plat closure of s2^a1 s1^-a2 s2^a3 …) of a 2-bridge knot from its
  Conway notation, following Burde–Zieschang ch. 12. It then applies `w` and `rev` and writes `table.derived.mjs` in
  `table.mjs`'s exact format (one base-36 character per label). It also has `iso(A, B)`, a diagram isomorphism test on the
  sphere. It walks the dart model and reports whether B is A relabelled, or reflected, crossing-switched, or has components
  reversed. `drawingDelta` compares `layout()` crossing positions after the best similarity fit.
- Regenerate: `node src/lab/knots/provenance/derive.mjs --write`. Tests: `node --test src/lab/knots/provenance/*.test.mjs`
  (7 tests, about 1 s). The tests include "the file on disk is exactly what the generator produces".

## Sources per entry

| Entry | Notation (typed in) | Citation |
|---|---|---|
| 0_1 | empty diagram | — |
| 3_1 | DT 4 6 2, w −3 | Dowker–Thistlethwaite 1983; Rolfsen 1976 App. C; KnotInfo "DT Notation" |
| 4_1 | DT 4 6 8 2, w 0 | same |
| 5_1 | DT 6 8 10 2 4, w −5 | Rolfsen; KnotInfo |
| 5_2 | DT 4 8 10 2 6, w +5, rev 0 | Rolfsen; KnotInfo |
| 6_1 | DT 4 8 12 10 2 6, w +2, rev 0 | Rolfsen; KnotInfo |
| 6_2 | DT 4 8 10 12 2 6, w +2 | Rolfsen; KnotInfo |
| 6_3 | DT 4 8 10 2 12 6, w 0, rev 0 | Rolfsen; KnotInfo |
| 7_1 | DT 8 10 12 14 2 4 6, w −7 | Rolfsen; KnotInfo |
| 7_2 | DT 4 10 14 12 2 8 6, w −7, rev 0 | Rolfsen; KnotInfo |
| 7_3 | DT 6 10 12 14 2 4 8, w −7, rev 0 | Rolfsen; KnotInfo |
| 7_4 | DT 6 10 12 14 4 2 8, w +7, rev 0 | Rolfsen; KnotInfo |
| 7_5 | **Conway 322** (4-plat), w −7, rev 0 | Conway 1970; Rolfsen; Burde–Zieschang ch. 12; KnotInfo "Conway Notation" |
| 7_6 | DT 4 8 12 2 14 6 10, w −3 | Rolfsen; KnotInfo |
| 7_7 | DT 4 8 10 12 2 14 6, w −1 | Rolfsen; KnotInfo |
| 10_8 | DT 6 14 12 16 18 20 4 2 8 10, w −2, rev 0 | Rolfsen; KnotInfo |
| L2a1 Hopf | braid σ1⁻² , w −2 | Adams, *The Knot Book*; LinkInfo braid {2,{-1,-1}} |
| L5a1 Whitehead | braid σ1 σ2⁻¹ σ1 σ2⁻², w −1, rev 0,1 | Adams; LinkInfo (whose word is {-1,2,-1,2,-1}; ours differs and is verified below) |
| L6a4 Borromean | braid (σ1 σ2⁻¹)³, w 0, rev 2 | Birman 1974; Kassel–Turaev 2008; LinkInfo {3,{1,-2,1,-2,1,-2}} |
| granny, square | connected sums of 3_1, as before (computed, not data) | — |

**How the codes were obtained.** This is a disclosure, so the next reviewer can judge it. The DT codes up to 7 crossings, the
Conway notation 322 and the braid words were typed from memory of the standard tables. They were then cross-checked against
the KnotInfo columns in the `database_knotinfo` CSV snapshot. That file was used only as an oracle: it was read, never copied
into the repo, and is not committed. All the ≤ 7-crossing DT codes matched KnotInfo. **My remembered 10_8 code was wrong**
(`fromDT` found it non-planar). The 10_8 code in `sources.mjs` is KnotInfo's "DT Notation" value, read from that snapshot.
It is a single 10-number fact, cited to KnotInfo. For **7_5**, KnotInfo's DT code (4 10 12 14 2 8 6) gives a **different
diagram** of 7_5 from the table's, by a flype. So 7_5 uses its Conway notation 322 through the 4-plat, which reproduces the
table's (Rolfsen-style) diagram exactly.

## Verification (output of `node src/lab/knots/provenance/derive.mjs`, 2026-10-14)

```
entry | source | c (derived/current) | Alexander | Jones | diagram vs current | drawing
0_1 | empty | 0/0 | same | same | same diagram (relabelled) | same up to similarity (0.000)
3_1 | DT 4 6 2 | 3/3 | same | same | same diagram (relabelled) | same up to similarity (0.000)
4_1 | DT 4 6 8 2 | 4/4 | same | same | same diagram (relabelled) | same up to similarity (0.000)
5_1 | DT 6 8 10 2 4 | 5/5 | same | same | same diagram (relabelled) | same up to similarity (0.000)
5_2 | DT 4 8 10 2 6 | 5/5 | same | same | same diagram (relabelled) | same up to similarity (0.000)
6_1 | DT 4 8 12 10 2 6 | 6/6 | same | same | same diagram (relabelled) | same up to similarity (0.000)
6_2 | DT 4 8 10 12 2 6 | 6/6 | same | same | same diagram (relabelled) | same up to similarity (0.000)
6_3 | DT 4 8 10 2 12 6 | 6/6 | same | same | same diagram (relabelled) | same up to similarity (0.000)
7_1 | DT 8 10 12 14 2 4 6 | 7/7 | same | same | same diagram (relabelled) | same up to similarity (0.000)
7_2 | DT 4 10 14 12 2 8 6 | 7/7 | same | same | same diagram (relabelled) | same up to similarity (0.000)
7_3 | DT 6 10 12 14 2 4 8 | 7/7 | same | same | same diagram (relabelled) | same up to similarity (0.000)
7_4 | DT 6 10 12 14 4 2 8 | 7/7 | same | same | same diagram (relabelled) | same up to similarity (0.000)
7_5 | Conway 3 2 2 (4-plat) | 7/7 | same | same | same diagram (relabelled) | same up to similarity (0.000)
7_6 | DT 4 8 12 2 14 6 10 | 7/7 | same | same | same diagram (relabelled) | same up to similarity (0.000)
7_7 | DT 4 8 10 12 2 14 6 | 7/7 | same | same | same diagram (relabelled) | same up to similarity (0.000)
10_8 | DT 6 14 12 16 18 20 4 2 8 10 | 10/10 | same | same | same diagram (relabelled) | same up to similarity (0.000)
L2a1 | braid -1 -1 | 2/2 | same | same | same diagram (relabelled) | same up to similarity (0.000)
L5a1 | braid 1 -2 1 -2 -2 | 5/5 | same | same | same diagram (relabelled) | same up to similarity (0.000)
L6a4 | braid 1 -2 1 -2 1 -2 | 6/6 | same | same | same diagram (relabelled) | same up to similarity (0.000)
```

- **Every entry is the same oriented diagram on the sphere, up to relabelling.** It is not a mirror, not reflected and not
  reversed: `iso` gives plane +1, crossings +1, and no reversed components. Crossing number, writhe, Alexander and Jones are
  equal, and `layout()` puts the crossings in the same places up to similarity (error < 0.001 of the radius). **Drawings do
  not change.**
- **Edge labels and crossing order do change** (only 0_1 is literally identical). That is why we relabel: matching
  spherogram's labels would use the GPL output as a template. No lesson can depend on this yet, because lessons may not
  import `src/lab`. Promote the derived table from day one, and kit labels will be stable from then on.
- **Swap test.** In a scratch copy of the library (not in the repo), I replaced `table.mjs` with the derived table (import path
  `./core.mjs`) and re-added the old U10 line. The fixed evaluator then passes **102 of 102** tests, and `bench.mjs` gives the
  same metrics (jonesSpeed is timing noise: 79.08 vs 77.69). Without U10, 4 tests fail. All 4 are about U10 / `monster-unknot`:
  `invariants.test.mjs` U10 rows (2), `codes.test.mjs` identify, and `moves.test.mjs` simplify statuses.

## U10 (the monster unknot)

Its PD code came from Regina's `ExampleLink.monster()` (GPL). I could not reach a published figure to transcribe instead:
arXiv, the Knot Atlas and Regina's docs are all blocked. The likely published sources are Henrich & Kauffman, "Unknotting
unknots", *Amer. Math. Monthly* 121 (2014) 379–390 (arXiv:1006.4176), and Kauffman & Lambropoulou, "Hard unknots and collapsing
tangles" (2006). Both are **unverified** as the origin of this exact diagram.

I tried to replace it with a hard unknot found by **our own code**. The search kept a diagram only if no diagram in its
R3-orbit admits an R1 or R2 removal, and `simplify` then proves it is the unknot. It covered about 95,000 seeded `scramble`s
(raw and after `reduce`, 7 to 14 crossings) and 3,000 random signed 10-crossing DT codes (1,038 of them planar), filtered by
Jones = 1. **It found
none.** Such diagrams are rare, and a proper generator is a project of its own. It fits the evolution's weak area 2,
"simplifying hard unknots".

**Proposal:** drop `U10` from the kit table (`table.derived.mjs` already omits it). Keep the monster in the lab bench only:
`test/benchdata.mjs` already holds it as `MONSTER`, and the R&D lead owns that file. If a lesson later needs a hard unknot,
either transcribe the Gauss code from a verified published figure (with the citation), or commission an own-generator project.

## Recommendation for the principal engineer (W-162)

1. **Re-derive, don't cite.** No permissive licence was found for any knot table. The derived table reproduces every diagram
   and drawing exactly. Its provenance is: standard notations, cited, typed in by hand, and converted by our own code.
2. On promotion, copy `provenance/table.derived.mjs` to `src/kit/knots/table.mjs`, changing `'../core.mjs'` to `'./core.mjs'`.
   `sources.mjs`, `derive.mjs` and its test can stay in the lab as the record, or move to `src/kit/knots/provenance/` if the kit
   should be able to regenerate itself. `platGauss` and `conwayBraid` (about 25 lines) are only needed for regeneration, not by lessons.
3. The kit's tests need U10 removed or replaced (the 4 tests above). That is the R&D lead's evaluator, so it is a board item for them.
4. Update `test/benchdata.mjs`'s comment on `KNOTS` ("Rolfsen diagrams, as in the table") if those two codes are also to be clean.
   They are 3_1 and 4_1 PD codes copied from the table (R&D lead's file).
5. Optional: a decision record that short notations of individual knots are cited facts, so the next table extension
   (for example the Solomon link L4a1) follows the same route: type the notation, cite it, derive it, and prove it is the same diagram with `iso`.
