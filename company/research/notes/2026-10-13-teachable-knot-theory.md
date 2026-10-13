# Teachable knot theory: what a curious adult can discover in 60 seconds, and what they get wrong

- date: 2026-10-13
- author: research-scientist (Dario), for research-lead (Wen) and vp-rnd (Vera)
- question: Which knot-theory ideas give an "aha" in a 60-second predict → explore → reveal lesson, what misconception does each answer, and what must the R&D knot library support?
- users: R&D engineer (knot library scope, `src/lab/knots/`), cm-math (briefs), cm-lifehacks (`cord-tangle-length`, `shoelace-square-bow`)
- overlap check: `content/curriculum/math.json` has no knot or topology concept (nearest: `euler-path-parity`). `content/curriculum/lifehacks.json` has `cord-tangle-length` (Raymer & Smith) and `shoelace-square-bow`. Nothing here duplicates them; idea 8 reuses the first and idea 5 links to the second.

## How to read the confidence marks

- **high**: a primary source or a standard reference that I saw stated in search results (abstract, encyclopaedic entry, worksheet), and it agrees with what I know.
- **medium**: seen only in a secondary summary, or the source supports the gist and not the exact wording.
- **low**: my inference, or a single weak source.
- **unverified (memory)**: from my own knowledge, not checked in this session. A verifier must check it before it becomes a learner-facing claim.

**Method and limits.** Web search only. Direct page fetches (arxiv.org, ncbi.nlm.nih.gov) were refused by the session's egress proxy, so every source below was read through search-result abstracts and snippets, not the full text. That limit puts a ceiling on most marks at medium-high. A claim verifier with full-text access should open the URLs before marking a claim `verified`.

**On misconception evidence.** I found **no study that lists adult misconceptions about knot theory itself** (equivalence, invariants). What exists:
- Croom & Firestone (2024), *Tangled Physics: Knots Strain Intuitive Physical Reasoning*, Open Mind. https://pmc.ncbi.nlm.nih.gov/articles/PMC11495958/ . Across 5 experiments, adults failed to tell which of two simple knots was stronger, even with diagrams, and even when they correctly saw the topological difference (E5). An earlier version reports that for tangles, people were **at or near chance at telling knots from non-knots**. (high for the strength result, medium for the knot/non-knot result: seen only in the eScholarship summary https://escholarship.org/uc/item/1zb8t3bt)
- de Freitas & McCarthy (2014), PNA journal: 9 students aged 10–13, knot workshops, gesture and disorientation. https://revistaseug.ugr.es/index.php/pna/article/view/6108 (high that it exists; it is qualitative and not about misconceptions as such)
- Strohecker (1996), MERL TR96-05: 20 fifth-graders, five months of knot work. https://www.merl.com/publications/docs/TR96-05.pdf (high that it exists; content not read)

So the misconceptions below are **inferred** (low to medium) from what teaching worksheets warn about and from the structure of the maths, and Croom & Firestone is the one empirical anchor. Each lesson's misconception must be tested with people (`**` needs human-learner evidence anyway).

---

## 1. The ideas, ranked by "aha in 60 seconds"

Rank = how fast a beginner goes from a confident wrong guess to a felt surprise, using one manipulable picture on a phone.

| Rank | Idea | Why it ranks here |
|---|---|---|
| 1 | **The unknot in disguise** (a messy loop that is not knotted; Reidemeister moves) | Strongest gap between belief and truth (Croom & Firestone: chance-level). The manipulation *is* the reveal. |
| 2 | **Tricolourability proves the trefoil is knotted** | It is a real proof in three taps. The "aha" is that colouring, of all things, settles a 3-D question. |
| 3 | **Linking: linked rings with linking number 0 (Whitehead), Borromean rings** | People assume "linked" is pairwise; the Borromean rings break that in one cut. Very visual. |
| 4 | **Left vs right trefoil (chirality)** | Strong intuition that a mirror image "is the same knot". Pays off in the granny vs square knot (Life Hacks link). |
| 5 | **Crossing number vs crossings in a drawing** | Simple counting, surprising result: the drawing's count says little; the minimum is the invariant. |
| 6 | **Long cords knot themselves (Raymer & Smith)** | Already scheduled in Life Hacks. Strong prediction; the explore step is a slider on length. |
| 7 | **Unknotting number** (fewest crossing switches to untie) | Clear question; a surprise is the 10₈ diagram where the obvious drawing needs 3 switches and the answer is 2. Plus a 2025 news hook. |
| 8 | **The Jones polynomial as a fingerprint** | The idea "a knot has a fingerprint that survives any wiggle" is teachable; the polynomial itself is not (see section 4). |
| 9 | **Knots in DNA and proteins** | Great hook, weak manipulation: the learner can't do much in 60 seconds except read. Better as a reveal for idea 6 or 8. |
| 10 | **A knot is a closed loop** | Essential, but on its own the "aha" is small. It is the first card of idea 1, not a lesson. |

---

## 2. Each idea in detail

Format: misconception · prediction question · what the learner manipulates · what the library needs · claims with sources.

### 2.1 The unknot in disguise (Reidemeister moves)

- **Misconception (medium):** "A drawing with many crossings is knotted." Equivalently, people judge knottedness by how messy it looks. Croom & Firestone report near-chance discrimination of knots from non-knots (medium, see above).
- **Prediction:** "This loop has 6 crossings. Is it really knotted?" Options: knotted / not knotted / can't tell without cutting.
- **Manipulate:** tap a crossing region to apply a legal Reidemeister move (R1 untwist a kink, R2 slide one strand off another, R3 slide a strand past a crossing). Each tap removes or moves crossings; the loop ends as a plain circle. Free dragging is tempting but risky (see section 3).
- **Library:** a diagram data structure (planar diagram / PD code or Gauss code with signs); detection of every available R1/R2/R3 move on the current diagram; applying a move and redrawing smoothly; a seeded, hand-picked "disguised unknot" diagram with a known move sequence; an "is this the trivial diagram?" test.
- **Claims:**
  - Two diagrams show the same knot if and only if a finite sequence of Reidemeister moves (and planar wiggles) connects them (Reidemeister 1927; Alexander & Briggs 1926). unverified (memory). Standard; the verifier can cite Adams, *The Knot Book*, ch. 1.
  - Sometimes you must make the drawing *worse* first: Goeritz (1934) gave an 11-crossing unknot diagram that cannot be simplified to a circle without passing through a diagram with more than 11 crossings. medium. Source: Hass & Nowik, https://arxiv.org/abs/0711.2350 (cites Goeritz). **Library warning:** a greedy "only remove crossings" solver will get stuck on such diagrams.
  - Hass & Nowik: unknot diagrams with 7n−1 crossings that need at least 2n²+3n−2 Reidemeister moves. high. https://arxiv.org/abs/0711.2350
  - Lackenby: any c-crossing unknot diagram can be undone in at most (236c)¹¹ moves, so the problem always ends. medium. https://arxiv.org/abs/1302.0180
  - Use a diagram that unknots by monotone moves for the lesson; disclose that it was chosen (pattern `disclose-chosen-seeds`).

### 2.2 Tricolourability proves the trefoil is knotted

- **Misconception (low, inferred):** "You can only prove a knot can't be undone by trying hard and failing." A second one, flagged by worksheets: "I couldn't colour it, so it can't be coloured" (one failed attempt is not a proof). Source for the second: UCLA and UW math circle worksheets note you must check all colourings. medium. https://www.math.ucla.edu/~mopie/WS1.pdf , https://sites.math.washington.edu/~mathcircle/circle/2023-24/2023-fall-week8.pdf
- **Prediction:** "A plain circle can't be coloured by this rule. Can the trefoil?" Then: "So is the trefoil secretly a circle?"
- **Manipulate:** tap each arc to cycle through 3 colours; each crossing lights green when its three ends are all the same or all different. Milestone: a valid colouring with ≥2 colours. Optional second card: try the figure-eight and fail every time (the library enumerates all 3ⁿ to prove it).
- **Library:** arcs (over-strands between undercrossings) from the diagram; the crossing rule check; enumeration of all Fox 3-colourings (count them); the same for p-colourings (optional); a proof that the count survives each Reidemeister move (tests, not runtime).
- **Claims:**
  - Rule: colour every arc with one of 3 colours, use at least 2, and at each crossing the 3 arc ends are all one colour or all different. high. https://en.wikipedia.org/wiki/Tricolorability ; Adams, *The Knot Book*, §1.5 (TOC seen: https://webarchive.lib.cuhk.edu.hk/20210329125255mp_/https://www.math.cuhk.edu.hk/course_builder/1920/math4900e/Adams--The%20Knot%20Book.pdf)
  - Tricolourability does not change under Reidemeister moves, so it is a knot invariant. high. Wikipedia, above.
  - The trefoil's standard diagram is tricolourable; the unknot's is not; so the trefoil is not the unknot. high. Wikipedia; Waterloo CEMC Grade 9/10 set https://cemc.math.uwaterloo.ca/events/mathcircles/2021-22/Winter/Grade910_20220330_KnotTheory_ProblemSet.pdf
  - The figure-eight knot is not tricolourable, so it differs from the trefoil. high. Wikipedia, above.
  - Tricolourability can't tell every pair of knots apart (it's not a complete invariant); the figure-eight and the unknot both fail it. high. Wikipedia.
  - A knot is tricolourable exactly when 3 divides its determinant |Δ(−1)|. unverified (memory). Useful as a library cross-check.
  - The number of tricolourings (3 for the unknot, 9 for the trefoil, counting the 3 single-colour ones) is also an invariant. unverified (memory).

### 2.3 Linking: linking number, the Whitehead link, Borromean rings

- **Misconception (low, inferred):** "Linked means some pair of rings goes through each other," and "if the over/under count cancels, they come apart."
- **Predictions:** (a) Borromean: "Cut one ring. How many of the other two stay linked?" Options 0/1/2. Answer 0, all fall apart. (b) Whitehead: "The signed crossings between these two loops add up to 0. Can you pull them apart?" Answer: no.
- **Manipulate:** (a) tap a ring to cut/remove it; the others separate. (b) tap crossings to see their +1/−1 signs and the running total; then try R-moves that cannot separate them.
- **Library:** multi-component links; per-component labelling; crossing signs from orientations; linking number = (sum of signs of crossings between two components) / 2; component deletion; split-link detection for small cases (at least: "this diagram is split" when no crossings between components remain after simplification); the Borromean rings, Hopf link, Whitehead link, Solomon link in the table.
- **Claims:**
  - Linking number (Gauss): half the sum of the ±1 signs at crossings between the two components; it doesn't change under Reidemeister moves. medium (Gauss attribution seen at https://thatsmaths.com/2017/01/12/on-knots-and-links/ ; formula from memory: unverified (memory) for the exact half-sum statement, though it is textbook).
  - The Whitehead link has linking number 0 but cannot be separated. high. https://en.wikipedia.org/wiki/Link_group ; https://arxiv.org/abs/1601.05292
  - In the Borromean rings each pair is unlinked, yet the three cannot be separated; removing any one frees the other two (a Brunnian link). high. Search summaries of the sources above and thatsmaths.
  - The Hopf link has linking number ±1. unverified (memory).

### 2.4 Chirality: left and right trefoil

- **Misconception (low, inferred):** "A mirror image is the same knot; just flip it over." In 3-D you can turn a drawing over, so it feels obvious that the mirror is reachable.
- **Prediction:** "Can you wiggle a left trefoil into a right one without cutting?" Options: yes / no / only by turning it over. Pair with the figure-eight: "And this knot vs its mirror?" (yes, it can).
- **Manipulate:** a mirror toggle; turning it over (a 3-D rotation, or a diagram flip that is not a mirror); see a fingerprint readout (Jones polynomial or writhe of a reduced alternating diagram) that changes under the mirror for the trefoil and not for the figure-eight.
- **Library:** mirror (switch every crossing); orientation reversal; "flip the diagram over" as a distinct operation; a chirality fingerprint: Jones V(t) vs V(1/t), or writhe of reduced alternating diagrams (Tait's 2nd conjecture). Table must store which knots up to 7 crossings are amphichiral (4₁ and 6₃ unverified (memory)).
- **Claims:**
  - The trefoil is chiral: the left- and right-handed versions cannot be deformed into each other. Listing suspected it in 1847; Dehn proved it in 1914. high. https://en.wikipedia.org/wiki/Chiral_knot
  - The figure-eight knot is amphichiral (equal to its mirror image). high. Same source.
  - Mirroring a knot replaces t with 1/t in the Jones polynomial; right trefoil t + t³ − t⁴, left trefoil t⁻¹ + t⁻³ − t⁻⁴. high. Knot-diagrammatics notes, https://arxiv.org/abs/math/0410329 (search snippet; the sign/normalisation convention must be fixed by the library and stated, since sources differ on which handedness is which).
  - Any two reduced alternating diagrams of the same knot have the same writhe (Tait's conjecture, proved 1987 by Kauffman, Murasugi, Thistlethwaite). high. Boden & Karimi https://www.math.csi.cuny.edu/abhijit/studentseminar/virtual/Boden_Karimi.pdf . So the trefoil's writhe +3 vs −3 is a 60-second fingerprint.
  - Granny knot = two trefoils of the same hand; square (reef) knot = a trefoil and its mirror. unverified (memory). Links to `shoelace-square-bow`.

### 2.5 Crossing number vs crossings in a drawing

- **Misconception (low, inferred):** "The number of crossings I see is how complicated the knot is."
- **Prediction:** "This drawing has 9 crossings. What is the fewest any drawing of this knot can have?" Options 9 / 5 / 3 / 0.
- **Manipulate:** apply simplifying moves until stuck; the readout shows "crossings now". For an alternating drawing, a "is it reduced and alternating?" checker that turns green, which proves the minimum.
- **Library:** crossing count of a diagram; nugatory-crossing detection; alternating test; reduced test; the knot table with crossing numbers; the Jones span (for alternating knots, span = crossing number).
- **Claims:**
  - A reduced alternating diagram has the minimum number of crossings for its knot (Tait's 1st conjecture, proved 1987 by Kauffman, Murasugi, Thistlethwaite via the Jones polynomial). high. Boden & Karimi (above); https://arxiv.org/abs/1908.06453
  - Number of prime knots by crossing number, mirrors counted once: 3→1, 4→1, 5→2, 6→3, 7→7, 8→21, 9→49, 10→165. high. OEIS A002863 https://oeis.org/A002863 ; https://en.wikipedia.org/wiki/Prime_knot
  - The Perko pair: two 10-crossing knots listed as different in tables for 75+ years were found to be the same knot by Kenneth Perko (1973/74; sources differ on the year). medium. https://ww2.amstat.org/mam/2014/calendar/ropetricks.html ; review of Adams at https://www.timeshighereducation.com/node/88243 . **Too hard to manipulate in 60 s** (see section 4); good as a reveal sentence.
  - Whether crossing number adds under connected sum is open in general. unverified (memory).

### 2.6 Long cords knot themselves (Raymer & Smith, 2007)

Already a Life Hacks concept (`cord-tangle-length`). Notes for the library only.

- **Misconception (medium):** "Knots form slowly, mostly in long, messy jobs; a short shake won't knot a cord." Raymer & Smith's own summary: complex knots formed within seconds.
- **Prediction:** "Tumble a 1-metre and a 3-metre cord for 10 s. Which knots more often?" plus "Does the chance reach 100%?"
- **Manipulate:** a length slider; a "tumble" button (seeded); see a found knot labelled by type.
- **Library:** seeded random 3-D curves (random walk or a "braid move" model of the end, as Raymer & Smith proposed); closure of an open curve; projection to a diagram; simplification; identification by invariant lookup (Jones polynomial as Raymer & Smith did).
- **Claims:** Raymer & Smith, *Spontaneous knotting of an agitated string*, PNAS 104(42):16432–16437 (2007), doi:10.1073/pnas.0611320104, https://www.pnas.org/doi/10.1073/pnas.0611320104 , PMC https://pmc.ncbi.nlm.nih.gov/articles/PMC2034230/ . high:
  - knotting probability rises sharply above a critical length and then saturates below 100%;
  - 3,415 trials; 120 different prime knot types, up to 11 crossings, observed;
  - the relative probability of a knot type falls off exponentially with its crossing number;
  - knots were identified by computing Jones polynomials from photographs.
  - The exact length thresholds and box sizes were **not** visible to me; read the paper before quoting a number. (open)
  - Sumners & Whittington (1988): all but exponentially few long self-avoiding polygons on the cubic lattice are knotted, settling the Frisch–Wasserman–Delbrück conjecture. high. https://secure.math.ubc.ca/Links/ProbSeminar/seminar2011/Chris.pdf ; https://www.sciencenews.org/article/knots-proteins

### 2.7 Unknotting number

- **Misconception (medium, inferred from the 10₈ result):** "To untie a knot in the fewest switches, work from its simplest drawing." Second: "Unknotting numbers add up when you tie two knots in a row." That was a 40-year-old conjecture, and it's false (2025).
- **Prediction:** "Switching one crossing of the trefoil: can that untie it?" (yes, u = 1, for a fast first card). Then, for the stretch card: "This 10-crossing knot's neatest drawing needs 3 switches. Can any drawing do it in fewer?" (yes, 2).
- **Manipulate:** tap a crossing to switch over/under; the readout says whether the result is the unknot (by invariant check plus simplification).
- **Library:** crossing change; an unknot test good enough for small diagrams (simplify by R-moves to 0, or a certificate: Jones = 1 is NOT proof in general, but for ≤ 10-crossing results a table lookup on Jones + Alexander is reliable; the library must say which test it uses); unknotting numbers in the table (known for all knots up to 7 crossings — unverified (memory)).
- **Claims:**
  - The minimal diagram of 10₈ needs 3 crossing changes to unknot, but u(10₈) = 2, reached through a non-minimal diagram (Bleiler 1984; Nakanishi 1983). high. https://ncatlab.org/nlab/show/unknotting+number ; https://www.mi.sanu.ac.rs/vismath/sl/l26.htm
  - Brittenham & Hermiller (2025): the connected sum of the (2,7)-torus knot and its mirror has unknotting number ≤ 5, though each has unknotting number 3; so unknotting number is not additive. high. https://arxiv.org/abs/2506.24088 ; Annals of Mathematics listing https://annals.math.princeton.edu/articles/22746 ; blog https://divisbyzero.com/2025/10/08/the-unknotting-number-is-not-additive/
  - The trefoil has unknotting number 1. unverified (memory), trivial to check in the library.

### 2.8 The Jones polynomial as a fingerprint

- **Misconception (low, inferred):** "If two knots look completely different, they are different"; also the reverse, "a fingerprint must identify everything" (it doesn't, as far as anyone has proven).
- **Prediction:** "These two very different drawings: same knot or not?" The fingerprint readout answers.
- **Manipulate:** apply random legal moves to a diagram; the polynomial readout stays fixed while the picture changes. Then switch one crossing: it changes.
- **Library:** Kauffman bracket → Jones polynomial, exact integer Laurent polynomial arithmetic; a stated normalisation (V(unknot) = 1; which trefoil is t + t³ − t⁴); the table's published values to match; a short display form.
- **Claims:**
  - The Jones polynomial was discovered in 1984, building on Conway's skein relation (1969). medium. https://www.mas.ncl.ac.uk/thorsten.heidersdorf/teaching/students/foulkesrachel.pdf
  - Whether the Jones polynomial detects the unknot (is the unknot the only knot with V = 1?) is open. high. https://arxiv.org/abs/2402.02553 ; https://epoch.ai/frontiermath/open-problems/jones-unknot . Computer checks found no counterexample up to 24 crossings (medium, single secondary source).
  - Nontrivial *links* with the same Jones polynomial as the unlink exist. medium. Same search.
  - Khovanov homology (which refines Jones) does detect the unknot (Kronheimer & Mrowka 2011). medium (search snippet); date unverified (memory).
  - Distinct knots can share a Jones polynomial. unverified (memory) (e.g. 5₁ and 10₁₃₂). Lessons must not say "the fingerprint is unique".

### 2.9 Knots in DNA and proteins

- **Misconception (low, inferred):** "Molecules are too small/too short to be knotted," and "knotting is a mathematician's abstraction."
- **Prediction:** "A virus packs a long DNA loop into a tiny head. What share of those loops come out knotted?" Options ~5% / ~50% / ~95%.
- **Manipulate:** weak. Best as a confinement slider on the random-curve generator from 2.6 (more confinement → more knotting), with the real number in the reveal.
- **Library:** confined random curves (in a sphere); closure of open chains (a protein is an open chain; knottedness of an open chain depends on how you close it: the engineer must pick and document a closure method); identification.
- **Claims:**
  - DNA from a tailless P4 phage mutant was knotted with probability about 0.95, mostly complex knots (Arsuaga et al. 2002, PNAS). medium (number from a search summary). https://pmc.ncbi.nlm.nih.gov/articles/PMC122776/
  - The knots show a chiral bias, revealing chiral organisation of DNA in the capsid (Arsuaga et al. 2005, PNAS 102(26):9165–9169). medium (title and gist only).
  - Type II topoisomerases change DNA knot type by passing one double strand through another, removing knots that would block replication and transcription. medium. https://www.biorxiv.org/content/10.1101/383901.full.pdf ; https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6649788/
  - Taylor (2000, Nature 406:916) found a deep **figure-eight** knot (not a trefoil, as the brief's example list might suggest) in acetohydroxy acid isomeroreductase, needing 70 C-terminal or 245 N-terminal residues removed to untie it. high. https://www.nature.com/articles/35022623 ; https://en.wikipedia.org/wiki/Knotted_protein
  - Nearly 300 knotted protein structures are known in the Protein Data Bank. low (secondary, undated number; check KnotProt before use).

### 2.10 A knot is a closed loop

- **Misconception (medium, inferred from every intro source's first page):** "A knot in a shoelace is a mathematical knot." With free ends, any tangle can be slid off, so maths glues the ends.
- **Prediction:** "A rope with free ends, tied in an overhand knot. Can you undo it without cutting, if you may pull the ends through?" (yes) then "And if the ends are glued?" (no).
- **Manipulate:** a "glue ends" toggle; with ends free, one tap slides the end out.
- **Library:** open vs closed curves; closure; the trefoil as the closure of the overhand knot.
- **Claims:** a mathematical knot is a closed loop in 3-D space, taken up to deformation without cutting or passing through itself. high (every source; Numberphile "What is a knot?" with Carlo Séquin, https://numberphile.com/videos/what-is-a-knot ; Adams ch. 1). Closing an overhand knot gives the trefoil. unverified (memory).

---

## 3. What the library must support

This is the checklist for the R&D engineer. Items marked **(easy to miss)** go beyond the current bet-list exit criterion in `company/rnd/README.md`.

**Representation**
1. Oriented knot *and link* diagrams (multi-component), with PD or signed Gauss code as the canonical form, plus a layout (2-D coordinates) for drawing. Lessons 2.3 needs ≥ 3 components.
2. A knot/link table up to 7 crossings with: name (Rolfsen), crossing number, unknotting number, amphichirality, tricolourability / determinant, Alexander and Jones polynomials, and a drawable diagram. Plus named extras beyond 7 crossings that the lessons need: **10₈ (for unknotting), the Hopf link, Whitehead link, Borromean rings, granny and square knots (composites), and a Goeritz-style hard unknot.** (easy to miss: the exit criterion stops at 7 crossings and says nothing about links or composites)
3. A fixed, documented convention for handedness and Jones normalisation (which trefoil is "right", V(t) or V(1/t)). Sources differ. (easy to miss)

**Operations**
4. Reidemeister moves R1/R2/R3: list the moves available on the current diagram, apply one, and **animate the transition** (the lesson needs the picture to respond in < 450 ms, per QA). Also planar isotopy for redraws.
5. Crossing change (for unknotting), mirror (all crossings), orientation reversal, **turn over** (a non-mirror flip, for chirality), component deletion (Borromean), connected sum (granny/square). (easy to miss: turn over and connected sum)
6. Simplification that is allowed to go *up* in crossings first (Goeritz, 2.1). A greedy reducer is fine for lessons only if the lesson's diagrams are chosen to reduce monotonically; the README must say so.

**Invariants (must match published values)**
7. Crossing count, writhe, crossing signs, linking number per pair of components, alternating and reduced tests, nugatory crossings.
8. Arcs of a diagram; Fox 3-colouring check per crossing; enumeration and count of all 3-colourings; ideally p-colourings and the determinant as a cross-check.
9. Kauffman bracket → Jones polynomial, exact; Alexander polynomial. Exponential in crossings, fine for lesson sizes, but random knots from 2.6 can have 50+ crossings before simplification: **simplify first, then compute**, and budget the time. (easy to miss)
10. Knot identification: given any diagram, return its table name (or "unknown, > 7 crossings") by simplification plus an invariant lookup, and say honestly when the lookup is ambiguous.

**Random and physical (for 2.6 and 2.9)** (easy to miss: not in the exit criterion at all)
11. Seeded random 3-D curves (`mulberry32` from the kit), optionally confined to a sphere/box, with a length parameter.
12. Closure of open curves (needed for ropes and proteins) with a documented method, and projection of a 3-D polyline to a generic diagram (no triple points, no tangencies; perturb if needed).
13. Optional: a self-avoidance check if any lesson lets the learner drag strands, so a drag can't pass a strand through itself (that would silently change the knot).

**Budget and form**
14. Tree-shakeable modules (diagram core; moves; colourings; polynomials; table; random curves) so a tricolouring lesson does not pay for Jones or the random-walk code. Each lesson ≤ 10 KB gzipped from the library.
15. Rendering helpers that output SVG paths with over/under gaps drawn in CSS variables, legible on a phone at 7+ crossings and in both themes.

---

## 4. What is NOT teachable in 60 seconds, and why

| Idea | Why not | What to do instead |
|---|---|---|
| Computing the Jones (or Alexander) polynomial | The skein/bracket computation is many steps of algebra; the payoff is far from the procedure. Breaks "teach the payoff, not the procedure". (medium, judgement) | Teach "an invariant survives every move" (2.8) with the polynomial as a readout only. |
| Proving Reidemeister's theorem | It needs general position arguments about 3-D curves. (high, judgement) | State it as the rule of the game in the hook. |
| Proving that the unknot can't be detected by Jones, or the open problem itself | Unresolved; nothing to discover. (high) | One sentence in a reveal, if at all. |
| Unknotting numbers beyond trefoil / single switches | Lower bounds need signature or gauge theory. The 10₈ story needs a 14-crossing diagram, too dense on a phone. (medium) | Use the trefoil card; the 2025 Brittenham–Hermiller result as a reveal sentence only. |
| The Perko pair | Converting one 10-crossing diagram into the other takes many moves; a learner can't find them in 60 s. (medium) | Reveal sentence in 2.5: "tables listed these as different for decades." |
| Classifying all knots / why crossing number is hard to compute in general | Needs too much background. (high) | — |
| Knot complements, hyperbolic volume, knot groups, Seifert surfaces and genus | Need 3-manifold or algebraic-topology background. Seifert surfaces could be shown, but not understood, in 60 s. (medium) | Out of scope for this strand. |
| Protein and DNA knotting as mechanism (how topoisomerases choose) | Biochemistry, not topology; the open-chain closure problem is subtle. (medium) | A reveal sentence after a random-knotting lesson. |
| Knot strength (which bend holds) | Not topology at all: Croom & Firestone show topology doesn't predict judged strength. It belongs to physics/Life Hacks and needs friction mechanics. (high for the finding) | Flag to cm-lifehacks: a great "you'll get this wrong" lesson, but not with this library. |

---

## Open questions for the research lead

1. No study of adult knot-theory misconceptions was found. Recommend each brief treat its misconception as a hypothesis and test with 3–5 people before Demo Crit. (high that no such study surfaced in these searches; medium that none exists)
2. Raymer & Smith's exact length thresholds were not visible; the Life Hacks claim verifier must read the PNAS paper.
3. The proxy blocked full text. A second pass with full-text access should upgrade marks on 2.6, 2.8 and 2.9.
