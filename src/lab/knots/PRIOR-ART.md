# Prior art for src/lab/knots

Searched 2026-10-13/14 (web search; several hosts were blocked by the sandbox egress proxy: knotinfo.org,
knotinfo.math.indiana.edu, katlas.org, math.toronto.edu, arxiv.org). **No code was copied from any source.**
Every algorithm below was written from the mathematical description. Third-party software was used only
offline, as a **test oracle** that produced reference numbers (`test/published.mjs`), never shipped.

## JavaScript / TypeScript

| Project | Licence | What it is | What we reused |
|---|---|---|---|
| [Knottingham](https://github.com/lennart-finke/knottingham) (Lennart Finke) | MIT | Browser knot-diagram editor (paper.js), SVG/TikZ export; invariants via SageCell API calls; minimal orthogonal diagrams via spherogram compiled to WebAssembly | Nothing. Confirms there is no small dependency-free JS invariant library to adopt. |
| [knot-identification-tool](https://github.com/joshuahhh/knot-identification-tool) (Joshua Horowitz) | MIT | Draw a knot shadow, click crossings, identify by Alexander polynomial (BigInteger library; table up to 10 crossings from Stoimenow's data) | Nothing. Its note that the Alexander polynomial alone "produces many collisions" is why `identify()` also uses Jones and returns every match. |

No npm package was found for PD/DT/Gauss codes, braids or the Kauffman bracket.

## Python / Mathematica / C (algorithm references and oracles)

| Project | Licence | Used for |
|---|---|---|
| [SnapPy](https://snappy.computop.org) / [spherogram](https://github.com/3-manifolds/Spherogram) (Culler, Dunfield, Goerner, Weeks) | GPL-2.0-or-later | **Data:** the PD codes of the Rolfsen table (3_1 ... 7_7, 10_8) and of L2a1, L5a1, L6a4 were read from `spherogram.Link(name).PD_code()` (labels shifted to start at 1). A PD code is a factual description of a diagram; the same diagrams are in the Knot Atlas and Rolfsen's table. **Algorithm reading:** spherogram's invariants module computes the Alexander polynomial from a Wirtinger presentation via Fox calculus, as we do (we did not read or port its code). |
| [knot_floer_homology](https://pypi.org/project/knot-floer-homology/) (Zoltán Szabó's program, packaged with SnapPy) | GPL-2.0-or-later | **Oracle only:** Alexander polynomials of the table knots, as the graded Euler characteristic of knot Floer homology. |
| [Regina](https://regina-normal.github.io) 7.4.1 (Burton et al.) | GPL-2.0-or-later | **Oracle only:** Jones polynomials of every table entry from the same PD codes (an independent bracket implementation). **Data:** PD codes of the "monster" unknot (table entry `U10`) and Haken's Gordian unknot (bench only) from `ExampleLink`. |
| [pyknotid](https://github.com/SPOCKnots/pyknotid) (Taylor et al.) | MIT | Read the README only: invariants of space curves, crossing simplification, closure of open curves. Informed `randomWalk` / `closeCurve` / `project`. |
| [KnotTheory`](https://katlas.org/wiki/The_Mathematica_Package_KnotTheory%60) (Bar-Natan et al., Mathematica) | Not checked (page unreachable); no code used | The PD convention (first label = incoming under-strand, counter-clockwise). I first used the bracket pairing `A <a-d, b-c>` as I remembered it from KnotTheory; with this PD convention that gave the mirror image, so `bracket()` uses `A <a-b, c-d>`. The right-handed trefoil test (t + t³ − t⁴) and Regina's values pin it down. |
| [KnotPlot](https://knotplot.com) (Rob Scharein) | Proprietary shareware | Nothing (no licence text found that permits reuse). |
| [KnotInfo / LinkInfo](https://knotinfo.org) (Livingston, Moore) | No licence found; asks for citation | **Not used directly** (host unreachable). We cite it for the conventions we follow (signature of the positive trefoil is -2; DT codes). Our reference values were computed, not copied, so no data licence is needed. |
| [The Knot Atlas](https://katlas.org) (Bar-Natan, Morrison et al.) | GNU FDL (memory; unverified) | Not reached. Our 3_1, 4_1, 5_1, 7_1 Jones values agree with its tables as I remember them; the full set comes from Regina. |

## Algorithms (all written from the mathematics)

| Feature | Method | Source |
|---|---|---|
| Planarity check of a PD code | Faces as orbits of the combinatorial map (dart -> next dart counter-clockwise after crossing the edge); Euler: F = n + 2 per connected piece | Standard combinatorial-map theory (e.g. Mohar & Thomassen, *Graphs on Surfaces*) |
| Writhe, linking number | Sum of crossing signs; half the sum between two components | Gauss; any textbook (Adams, *The Knot Book*; Lickorish, *An Introduction to Knot Theory*) |
| Fox n-colourings | Colouring matrix rows 2·over − in − out; count = Π gcd(dᵢ, n) over a diagonal form, times n per free column | Fox, "A quick trip through knot theory" (1962); Przytycki, "3-colorings and other elementary invariants of knots" (1998) |
| Determinant, Alexander polynomial | Fox-calculus (Wirtinger) Alexander matrix, delete one row and column, fraction-free Bareiss determinant over Z[t]; symmetrise | Alexander (1928); Fox (1953); Bareiss (1968) |
| Jones polynomial | Kauffman bracket state sum (2ⁿ states, union-find loop count), V = (−A³)^−w ⟨D⟩, A = t^−1/4 | Kauffman, "State models and the Jones polynomial", *Topology* 26 (1987) |
| Signature | Gordon–Litherland: σ = sign(G) − μ from a checkerboard Goeritz matrix; inertia by symmetric elimination over BigInt | Gordon & Litherland, *Invent. Math.* 47 (1978). Tested with Traczyk's formula σ = s_A − n₊ − 1 for reduced alternating diagrams (Traczyk 2004) |
| Reidemeister moves | Face-based: monogon (R1), bigon with one strand over at both ends (R2), triangle with a top strand (R3), rewired on the dart model; up-moves R1/R2 by local surgery in a chosen region | Reidemeister (1927); local geometry derived by hand |
| Simplification with up-moves | Greedy R1/R2 removal, then a seeded search mixing R3 slides and R2 additions, keeping the best | Hass & Nowik (arXiv:0711.2350) on why monotone simplification fails (Goeritz 1934); Juhász et al., "The unknotting number, hard unknot diagrams, and reinforcement learning" (arXiv:2409.09032) for hard-unknot datasets |
| Minimality certificate | Reduced alternating diagram ⇒ minimal crossing number | Kauffman, Murasugi, Thistlethwaite (1987) |
| Layout | Circle packing of the crossing/edge/region triangulation (Collins–Stephenson uniform-neighbour radius iteration), fallback Tutte barycentric embedding | Collins & Stephenson, "A circle packing algorithm", *Comput. Geom.* 25 (2003); Tutte, "How to draw a graph" (1963) |
| Braid closure, DT and Gauss codes | Direct constructions; unsigned codes realised by trying sign choices until the code is planar | Dowker & Thistlethwaite (1983) |
| Random curves, closure, projection | Unit-step random walk (optionally confined), direct or radial ("closure through a distant sphere") closure, xy-projection with heights | Millett, Dobay & Stasiak, *Macromolecules* 38 (2005) for closure choices; Raymer & Smith, *PNAS* 104 (2007) as the lesson use |
| PRNG | mulberry32, the same generator as `src/kit/random.ts` | Company code |
