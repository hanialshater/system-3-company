# Fact-check: math/flatten-the-cube-to-a-dot

fact-checker · 2026-10-25 · board W-2037 (lane M) · base commit 283a3ed50 (version 1, draft)

I did not write any of these claims. I ran the walkthrough and wrote findings 1 to 4 before I opened meta.json, the builder's notes, the brief or the curator's and designer's scripts.

**Verdicts:** c1 to c7 are verified. **c8 (the hook, which was not recorded before) is disputed**, and that blocks publishing until the category-curator rewords one word and a fact-checker re-checks it.

## 1. Artifact first (walkthrough, before the account)

`npm run walkthrough -- math/flatten-the-cube-to-a-dot` aborted (locator timeout). The bare slug worked: `npm run walkthrough -- flatten-the-cube-to-a-dot` gave artifacts/walkthroughs/flatten-the-cube-to-a-dot/transcript.md and 8 screenshots.

Findings written from the transcript and screenshots alone:

1. **Every number on the stage recounts.**
   - Cube: 8 − 12 + 6 = 2.
   - Sliced cube: 10 − 15 + 7 = 2, with change line +2, +3, +1. The drawing shows 3 new dots on a shaded triangle.
   - Flat drawing: 8 dots, 12 lines, 5 shaded regions, so 8 − 12 + 5 = 1. The outside is not counted.
   - Shrink: the strip at the reveal (08-reveal.png) has 12 cells. Read left to right, the shapes are square, square, circle, square, circle, square, circle, circle, square, circle, circle, circle (squares are regions, circles are corners). That is 5 regions and 7 corners, every cell shows 1, and it ends at 1 − 0 + 0 = 1 and "+ the top face = 2".
2. **The frame at step 6 (07-step-6.png, 5 − 5 + 1) is mid-playback, not the end.** "Remove the rest" plays the removals out over time, and the transcript caught it at removal 7. The reveal frame shows the finished state. This is not a claim error.
3. **The hook is a learner-visible claim that is not in the ledger, and it overclaims:** "Three moves show why it is always 2." "Always" has no qualifier. The reveal limits it correctly ("Any convex solid … so … always 2"), but the hook, which is the first sentence a learner reads, does not. A solid with a hole through it gives 0. Recorded as **c8, disputed**.
4. **Learner sentences compared with the claims.**
   - Hook, sentence 1: c1.
   - Question: c1.
   - Reveal paragraph 1: c2, c3, c4, c5.
   - Reveal paragraph 2: c6 and c7.
   - The picture captions repeat c1 and c3.
   - Demo.tsx has no other factual strings (grep of the strings at lines 148, 152, 379–462). The panel and button labels are interface text.
   - The wording differs slightly in two places. c6's text says "Every convex solid … 2 for every convex solid", and the reveal says "Any convex solid … always 2". c7's text says "Euler's formula for solids", and the reveal says "Euler's formula". Both are on the trust sheet and both are true, so neither blocks.

## 2. Own derivations (c1–c5)

My scripts and outputs are in company/reviews/flatten-the-cube-to-a-dot/fc-2026-10-25/. I wrote them from my own coordinates and face model, not from the curator's or the designer's code.

- `own.py` → `own.out`:
  - cube 8/12/6, total 2;
  - corner (1,1,1) cut on its 3 edges: 10/15/7, total 2, with deltas +2/+3/+1;
  - flat drawing 8/12/5, total 1;
  - a greedy shrink of 12 steps (5 region moves, 7 corner moves) that ends at 1/0/0, with the total asserted to be 1 at every step.
- `own2.py` → `own2.out`, in two parts:
  - (a) It replays Demo.tsx `ORDER` (line 58: 0-1, 3-0, 0-4, 1-2, 1-5, 2-3, 2-6, 3-7, 4-5, 5-6, 6-7, 7-4) on my face model. The result is `RRCRCRCCRCCC` ending at 1/0/0. This matches the strip in finding 1 and the order in c5's source.
  - (b) It runs the lesson's two moves only:
    - an edge between the outside and one region (−1 edge, −1 region);
    - an edge with a loose end (−1 edge, −1 corner).

    It does this on the tetrahedron, octahedron, square pyramid, triangular prism and cube, for every choice of removed face, with 300 random orders each. The run never gets stuck, the total stays 1 after every removal, and every run ends at one dot.

Cross-check, run after my own counts: company/domains/briefs/checks/math-lane-m-euler-check.mjs and company/design/specs/flatten-the-cube-to-a-dot-mockup.mjs both print the same 13 states and the same 5/7 split. The mockup rewrote its .svg byte-identical, so nothing changed in git.

| Claim | Verdict | Support |
|---|---|---|
| c1 | **verified** | own.py: 8 − 12 + 6 = 2; 10 − 15 + 7 = 2 |
| c2 | **verified** | own.py deltas: −1 + 3 corners, +3 edges, +1 face; +2 − 3 + 1 = 0 |
| c3 | **verified** | own count of the stage's flat drawing (5 bounded regions, the outside stands for the removed top) |
| c4 | **verified** | algebra: (0) − (−1) + (−1) = 0 and (−1) − (−1) + 0 = 0; asserted at every step in own2.py |
| c5 | **verified** | own2.py (a): 12 removals, 5 R and 7 C, total 1 after each, ends 1 − 0 + 0 |

## 3. Sources (c6, c7)

**Access.** WebFetch failed to resolve every host. The proxy refused arxiv.org, wikipedia, cornell.edu, uci.edu, cambridge.org, degruyter, muse.jhu.edu and archive.org, and JSTOR returned a JavaScript challenge. These hosts were reachable: pmc.ncbi.nlm.nih.gov (OAI full text) and api.crossref.org. Everything below was opened there. Web-search summaries were used only to find articles, never as support.

- **PMC10239678.** Bundy et al., *Representational change is integral to reasoning*, Phil. Trans. R. Soc. A, doi 10.1098/rsta.2022.0052; ref. 1 is Lakatos, *Proofs and refutations*, CUP 1976. Quoted:
  - "Lakatos' book starts with a 'proof', due to Cauchy … In Step 1, a face is removed from the polyhedron and it is stretched onto the plane. In Step 2, each face is triangulated. In Step 3, these triangles are successively removed until only one remains … V − E + F = 1. It is argued that this invariant is preserved by each step, except the first, which removes one face. So, working backwards … V − E + F = 2."
  - On the hollow cube and the star polyhedron: "in neither counterexample, is it possible to remove one of their faces and stretch the remaining polyhedron flat on the plane."
- **PMC9640434.** *Two Types of Refutation in Philosophical Argumentation*. Quoted:
  - "The dialogue starts with the teacher presenting a proof (due to the nineteenth century mathematician Cauchy)".
  - "For Euler's conjecture, we now know that it applies to all polyhedra except for those with holes running through them (Kirk 2020)."
- **PMC7459769.** Dauter & Jaskolski, Acta Cryst. A, doi 10.1107/S2053273320007093. Quoted:
  - "The famous Euler's formula (Euler, 1758) states that for any three-dimensional polyhedron the sum of the numbers of its faces (F) and vertices (V) is by two larger than the number of its edges (E)".
  - The reference: "Euler, L. (1758). Novi Commun. Acad. Sci. Imp. Petropol. 4 (1752–3), 109–140".
- **Crossref metadata.**
  - Richeson, *Euler's Gem*: 10.1515/9781400838561 (PUP 2008). Chapter "Cauchy's Flattened Polyhedra" is pp. 112–118 (10.2307/j.ctvbj7gs1.17).
  - Lakatos, *Proofs and Refutations*: CUP, 10.1017/cbo9781316286425.
  - Cauchy, "Recherches sur les polyèdres (Premier Mémoire)", Œuvres complètes, pp. 7–25 (10.1017/cbo9780511702501.002).

**c6, verified.** The learner sentence is "Any convex solid can be flattened and shrunk the same way, so corners − edges + faces is always 2."

- The conclusion is the theorem for polyhedra without holes (PMC9640434), and convex solids have none.
- The flatten-then-shrink method is the one Lakatos opens with, credited to Cauchy (PMC10239678). Its known failures are exactly the solids that cannot be flattened, and those are not convex.
- Every convex solid can be flattened: project from a point just outside one face, near its centre. Convexity means each ray from that point meets the rest of the surface once (my argument, standard; not separately sourced).
- "The same way" for the shrink is my own derivation: any connected flat drawing can be emptied by the two moves. own2.py checks it on 5 convex solids.

Caveats, none of which is learner text:

- (i) Cauchy, as Lakatos presents him, triangulates and removes triangles. The lesson removes edges, which is a variant. The source field's "the flatten-and-remove-edges proof is Cauchy's" should read "a variant of Cauchy's flatten-and-remove argument".
- (ii) I confirmed Richeson's chapter only from its title and pages in Crossref. I did not open the text.
- (iii) I did not open the Lakatos book itself. Two independent secondary accounts describe its chapter 1.
- (iv) No source I opened gives the year 1813. A search summary said the memoir was read in 1811 and published in 1813, but that is unconfirmed. The learner text carries no date, and the brief bars one.

For a future source swap: put PMC10239678 and PMC9640434 in the source field. This is non-blocking.

**c7, verified.** The learner sentence is "This is Euler's formula." PMC7459769 calls V − E + F = 2 "Euler's formula" and cites the same Novi Commentarii volume 4 that c7's source names. PMC10239678 and PMC9640434 also name it after Euler. I accept the attribution as the standard name, which is all the sentence asserts. It makes no claim that Euler was first.

## 4. c8: the hook (disputed, blocks publishing)

The hook is "Corners minus edges plus faces is 2 for a cube. Three moves show why it is always 2." c1 covers the first sentence. The second is false as written: a solid with a hole through it, such as a picture frame, has 16 − 32 + 16 = 0. The curator's own check prints this, and PMC9640434 says the formula fails for polyhedra "with holes running through them". The brief's knowledgeBoundary also names the holed solid as out of scope.

The fix is for category-curator, who owns the hook: qualify "always". For example, "Three moves show why it is 2 for every convex solid", or "… for solids like it". After that a fact-checker re-checks c8. The builder's pre-flight (build.md, item 1) also flagged this hook "always", from a different angle: that it hints at the answer.

## 5. Read after my findings (the account)

- meta.json, build.md, the brief and the two scripts change nothing above.
- build.md says c5's source "still cites the brief's old order". That is now stale: the source field cites the spec order, and the spec order matches Demo.tsx `ORDER`.
- build.md says the sliced corner is vertex 2 (front-top-right). My model cut a different corner. Every corner of a cube has 3 edges, so the counts are the same.

## Board

- category-curator: reword the hook's "always" (c8). Then route it to a fact-checker.
- category-curator: the c6 source field should say "variant of Cauchy's" and add PMC10239678 and PMC9640434 (non-blocking).
