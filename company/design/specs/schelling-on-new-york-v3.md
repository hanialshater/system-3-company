# Spec v3: schelling-on-new-york

owner: interaction-designer (Rafael) · 2026-10-14 · session 2 · status: **draft, for design review** · replaces the v2 build's stage and reveal (there was no earlier spec file) · brief: `src/demos/geography/schelling-on-new-york/meta.json` (objective unchanged) · rulings kept: `company/reviews/schelling-on-new-york/2026-10-14-cultural-review.md` (R1–R10), `2026-10-14-cultural-review-2.md` (passes 1–3, amended R3)

Spec and mockup notes only. No code, no lesson edit. The builder implements; the claims move with the text (fact-checker); wording rulings stay with the cultural reviewer.

**Why v3.** The learner probe failed, and that blocks publish (`2026-10-14-learner-review.md`): 3 of 6 plausible readers would say the lesson shows, at least partly, why New York looks as it does. v2's text passes the cultural wording checks. The failure is in the *picture*.

---

## 1. What the artifact shows (read before anything else)

From `artifacts/walkthroughs/schelling-on-new-york/` (sheet, `03-step-2.png`, `11-reveal.png`, transcript):

1. **The last big image is the New York outline sorted into clumps.** In `11-reveal.png` the reveal pins seed 1 at tick 7. The "not a cause" idea exists only as text: grey stage lines, plus one clause after the result.
2. **The stage scrolls on a phone, so the only on-stage stand-in for "what is left out" is below the fold.** In `03-step-2.png` to `09-step-8.png` the slider and the "Not modelled" line are cut off at the bottom of the stage. The transcript lists the line, but the frame does not show it. P2 and P5 never saw it, and this explains why. This is a layout failure, separate from the wording.
3. **The 2 × 2 lattice is effectively invisible.** At stroke 0.07 and opacity 0.55 no box lines can be seen in any frame. "Blocks of 2 × 2 cells" is never drawn for the learner. In a New York lesson "block" reads as a city block.
4. **1 × 1 = 1.00 on a well-mixed map** (`06-step-5.png`). The stage gives no reason for it, which pushes learners toward "broken" or "already sorted".
5. **The reveal swaps seeds silently.** The learner measured 8 × 8 only on seed 2 (0.14). The reveal says "0.12 on 8×8", which is seed 1's value and one the learner never saw.
6. **Nothing on the stage answers "why isn't a random mix 0?"** The mechanism ("chance alone makes small blocks uneven") appears only in the recall card's explanation.

## 2. The design decision for problem 1 (defeat the "this explains NYC" reading)

### Options weighed

| Option | What it does to the picture | Verdict |
|---|---|---|
| A. Made-up / not-a-cause framing on the stage before the run, in the grid's visual unit | It is still text. The readers who fail (P2 skimmer, P3 believer, P5 low reading stamina) are exactly the ones who do not read text or who discount it. It does help screenshots, because a caption *inside* the picture travels with it. | **Adopted as support, not as the fix.** S1 and S4 move inside the map's empty corner (section 4). |
| B. Reveal shows the random start and the sorted grid side by side | This is a before/after pair. Before/after is the classic "this is how it happened" image: "random city → sorted city" is the very reading that fails. It places the chance point in the left frame, but the eye reads the pair as a process. | **Rejected** as the main reveal image. Chance is shown on the stage during explore instead (section 5). |
| C. Make the New York outline visibly secondary | It reduces New York-ness but leaves the sort intact on a recognisable shape. The title ("Schelling on New York") and the shape are in the brief, and changing what the lesson is about is not my call. | **Cheap part adopted:** the hook says "outline", not "shape". The title goes to the category manager as an optional question (section 14). |
| **D. Two mixes, two maps (chosen)** | The learner runs the same rule on two random mixes, and the clumps land in **different places**. The reveal pins both settled grids side by side, at the same size and under the same rule. | **Chosen.** |

### Why D

- **It shows the counter-evidence instead of stating a disclaimer.** If the model explained New York, the same places would sort the same way every time. They do not. On the cells that both settled grids fill, two mixes agree on the group about half the time, as a coin would: 0.49 for mixes 1 and 2, and 0.41 to 0.59 (mean 0.51) over consecutive lesson seeds (my run of `engine.ts`; it becomes claim c16 in section 11). A skimmer who sees two New Yorks clumped differently cannot read either map as "New York".
- **It fixes the order problem the probe found.** In v2 the result ("a moving rule sorted the grid") came first and the disclaimer followed it, and the skimmer kept the result. In v3 the result *is* the disclaimer: "The rule sorted your mixes into clumps in different places: this model does not show why real cities look as they do."
- **It reuses the existing stage.** No new panel during explore. The pair appears only at the reveal, when nothing is live. That is the catalogue's sanctioned comparison pair: two static frames of at most 160 px side by side (`company/design/formats.md`, "Illustrations"). Placement differs from that rule (see the objection below).
- **It costs one changed button behaviour and one milestone,** and it stays on the QA path (section 8).
- What D does **not** do: it does not stop P3 from believing "people sort themselves". The probe question is whether the lesson shows why *New York* looks as it does, and D answers that question. The structural sentence stays verbatim for the rest.

**Objection I am carrying, for the design lead:** the catalogue puts comparison pairs "in the reveal, below the text". Here the pair **replaces the stage picture** at reveal time, so it sits above the text. Reason: the probe failed on the image seen first, and a pair placed below 120 words of text is the part skimmers never reach. The live grid is gone at that point, so there is never "two pictures beside a live diagram". The design lead rules on this.

## 3. Problems 2–4: chance, boxes, households, units

- **Rename "blocks" to "boxes".** "Group" is taken (Group A / Group B, R4), and "square" is taken (Group A is drawn as a square and Group B as a circle). So: a mark = **one household**, a measuring unit = a **box** of cells. "Box" is literal, because the overlay draws boxes. It does not collide with city blocks.
- **Say once that each mark is one household in a made-up model** (S1 below).
- **Draw the boxes.** The k × k overlay must be legible: visual designer, stroke at least 1 px at the 246 px floor. It is drawn from the predict state on, at 2 × 2 (lines only, no highlight), so the learner can see what is being measured before committing. Lines alone do not point to an answer.
- **Show "why isn't random 0?" on the stage.** In explore, every box that holds households of only one group gets a **one-colour outline**, a neutral `--fg` stroke and never a group colour. A readout counts them: "one-colour boxes 40%" (share of boxes holding at least one household). At the random start (my engine run, 48 lesson seeds, mean 39%; c17):
  - 2 × 2: 34–47% one colour (mix 1: 72 of 181; mix 2: 65 of 184);
  - 4 × 4: 3–16%;
  - 8 × 8: 0–11%.

  The learner sees many small boxes go one colour by chance and almost no large ones. Then the D chips (0.47 / 0.27 / 0.12) read as a consequence rather than a mystery. A box with one household counts as one colour. That is true, and it is the extreme case of the point.
- **Drop 1 × 1.** It is the limit of the argument, but explaining "a box of one household is always 'fully apart'" costs words the stage does not have. The probe shows that without those words it teaches the wrong thing. The 2 × 2 overlay already contains single-household boxes (34 of mix 1's 181), so the extreme is still visible, just not as a separate button. One fewer control also helps the 60-second budget. 1.00 stays in claim c7's source note, not on the card.
- **Unit contrast (problem 4).** The overlay shows that a 2 × 2 box holds at most 4 households, and the learner can count it. The reveal names the census tract once ("thousands of people"). That is context outside the gap, told in one claimed sentence (c15), and it points at a box the learner has seen. I do not try to draw a tract. On this grid a tract is smaller than one cell by *area* (about 4 tracts per 1.2 km cell), so any tract drawing would bring back the head-count-versus-area contradiction the reviewer hit. The comparison is in people, never in area.

## 4. Stage, exact strings and word counts

**Counting rule (stated, so reviewers can re-count).** "Prose" = whitespace tokens that contain a letter, excluding control labels (buttons, box chips, the slider label) and readout labels. This is the count cultural review 2 used ("24 before a run and 34 after, without the slider label"). The other columns give the stricter counts.

| Id | Where | Exact string | Prose words | Tokens incl. numerals |
|---|---|---|---|---|
| S1 | **Inside the map**, top-left empty corner (the mask's top-left 17 × 25 cells are all water: 124 × 183 px at a 300 px grid, 102 × 150 px at the 246 px floor). Swatches inline. | `Made-up model: each [■] A or [●] B is one household. Not New York's people.` | 13 | 13 |
| R-row | Readout row under the map (labels, not prose) | `Round 0 · would move 20% · mix 1 · one-colour boxes 40%` | (labels: 6) | 10 |
| S2 | Above the box chips | `Spread in boxes (0 even, 1 apart):` | 5 | 7 |
| S3 | Directly above the slider (R6) | `A setting, not a measure of anyone.` | 7 | 7 |
| slider | Control label, **unchanged** (R6) | `Move if fewer than 30% of neighbours are like them` | (label: 9) | 10 |
| S4 | **Inside the map**, same corner, under S1; appears after the first finished run (R3 item 7) | `Not modelled: money, prices, history, who was allowed to live where.` | 11 | 11 |

**Totals**

| Moment | Prose (rule above) | + readout labels | + slider label |
|---|---|---|---|
| Predict (locked; R-row shows `Round 0 · would move 20% · mix 1`, no one-colour item) | 25 | 29 | 38 |
| Explore, before the first finished run | **25** | 31 | 40 |
| Explore, after a finished run (S4 shown) | **36** (25 + 11, the overrun is S4 only) | 42 | 51 |
| Reveal (section 7: S1 + captions + S4, no S2/S3/slider) | **17** + S4 11 = 28 | 28 (no separate readout row) | — |

- The after-run overrun is **only S4**, as cultural review 2 requires. It still needs the recorded decision from the learning-designer with the design lead, which is open. If the exception is refused, the fallback is S4 = `Not modelled: money, history, who was allowed to live where.` (9) with S3 folded into the slider label line. That still overruns, so the fallback needs the decision too, only at a smaller size.
- **S4 wording changes from v2:**
  - "jobs" is dropped. Cultural review 2 (b) lists money, prices, history and who could live where as the binding items; jobs is not one of them.
  - "who could live where" becomes "who was allowed to live where". The learner review found "could" reads as affordability; "was allowed" is the objective's own wording.
  - Net +1 word against v2's line. The cultural reviewer confirms both changes.
- **S1 changes from v2:** "Made-up equal groups, A and B. Not New York's population." becomes the S1 string above. "Equal" moves to the question and the alt text, to pay for "one household". The R1 binding meaning ("made-up, not the city's population") is kept. The cultural reviewer confirms.
- **Readout renames:**
  - "Tick" becomes "Round".
  - "would stay N%" becomes "would move N%". It ties to the slider's "Move if…". Value = ceil(100 × movers / agents), so it reads 0% only when nobody would move. This is the mirror of the c6 floor fix: seed 1's last pre-settle frame has 4 movers and reads 1%; seed 2's has 1 mover and reads 1%.
  - "seed N" becomes "mix N", where N is the seed. It is still the disclosure; c5 says so, and says seeds 3 and 36 are skipped.
- **Why S1 and S4 sit inside the map.** They become part of the picture: any screenshot of a sorted New York carries "Made-up model … Not New York's people" and "Not modelled: …". This is R2's screenshot risk handled by placement instead of words. It also frees about 34 px of height, which pays for the phone fit below. Text at least 12 px (11 px at the 246 px floor if the visual designer agrees), left-aligned, `--fg` for S4 and `--muted` for S1. It is HTML over the SVG, not SVG text, so it stays selectable and readable by screen readers.
- **Fit fallback.** If S1 + S4 do not fit the corner at the 246 px floor, S1 stays in the corner and S4 goes full width **directly under the map, above the readout row**, never below the controls. It must never be below the fold again.

### Phone fit (390 × 844): no scroll, 44 px targets

v2 scrolls (section 1, item 2). v3 must not. Rough budget for the explore stage:

| Item | Height |
|---|---|
| map | 246–300 |
| readout row | 18–36 |
| controls | 44 |
| S2 | 16 |
| chips | 44 |
| S3 | 16 |
| slider label | 18 |
| slider | 44 |
| gaps | ~24 |
| **Total** | **≈ 470–540 px** |

That is against about 480 px of stage on this card. The v2 `Fit` shrink (down to 6 px cells) still applies. If it is still over at the floor, put the R-row on one line by dropping the middle dots (`Round 0  would move 20%  mix 1  one-colour boxes 40%` is 52 characters, about 330 px at 12 px). **Acceptance:** with S4 shown and the slider visible, `stage.scrollHeight <= stage.clientHeight` at 390 × 844 in both themes.

## 5. Controls, in DOM order (7, was 8)

| # | Control | Label | Behaviour |
|---|---|---|---|
| 1 | Control | `Step` | One round. Disabled at the run's end. |
| 2 | Control | `Run` | Computes to the end, replays in ≤ 400 ms (≤ 8 jumps × 45 ms); instant under reduced motion. Records the run on press. Disabled at the end. |
| 3 | Control | `New mix` | **Keeps the moment.** At round 0: next mix at round 0 (see a new random start). At any later round: the next mix **runs to its end** at the current setting, animated like Run and recorded on press. This mirrors the slider's existing "after a finished run, show the same mix's end" rule (ABM format default). **Moved before Reset** so the QA path reaches a second settled mix. |
| 4 | Control | `Reset` | Round 0 of the current mix. Disabled at round 0. |
| 5–7 | Box chips | `2×2` · `4×4` · `8×8`, each with its value below (`0.47`, or `0.47→0.76` after round 0) | Selects box size k. Redraws the overlay, the one-colour outlines and the one-colour readout. Records the measurement as (mix, k). Active chip disabled + `active`. Group `aria-label="Measure in boxes of"`, chip `aria-label="Boxes of 4 by 4 cells"`. |
| 8 | Slider | `Move if fewer than 30% of neighbours are like them` | 0–30, step 5, starts at 30 (R6, cultural review 2 (a); unchanged). |

**States**

- **Predict (locked):**
  - mix 1, round 0, 2 × 2 box lines drawn with no outlines;
  - S1 in the corner;
  - R-row without the one-colour item;
  - chip 2×2 shows `?` and the others are blank;
  - all controls rendered and disabled.
- **Explore, round 0:** one-colour outlines and the readout appear at k = 2 (mix 1: 40%).
- **Step / Run:** the outlines follow the frame. After settling at 30%: mix 1 shows 75% one-colour (135/180), D 0.76.
- **New mix after a run:** the map visibly re-sorts into *different* clumps. This is the key moment for problem 1.

## 6. Milestones (`minInteractions = 3`)

| Name | Reached when |
|---|---|
| `settled-30` | A run at 30% has finished with nobody moving. |
| `second-mix` | Settled 30% runs exist on **two different mixes**. |
| `other-box` | The learner has looked at a box size other than 2 × 2 on a mix that has (or later gets) a settled 30% run. |

"Looked at" = that (mix, k) was on stage. All three are monotone, since records only grow.

Explore hint (panel, outside the stage budget, 15 words): `Run the rule at 30%, press New mix, then measure the same grid in bigger boxes.`

## 7. Reveal: pinning, quoting rule, stage, exact text

**Pinning (fixes problem 5: quote only what this learner reached).**

- **P** = the most recent mix that has a settled 30% run **and** an other-box measurement. The milestones guarantee it exists.
- **k\*** = the largest box size other than 2 × 2 that the learner looked at **on P**.
- **Q** = the most recent settled 30% mix with a different seed from P. It exists by `second-mix`.
- Every number in the reveal comes from P or Q, computed from their seeds, so it survives Reset. Each one is visible on the reveal stage when the reveal opens, with the stage's rounding.
- Never quote a (mix, k) pair the learner did not have on stage. v2's "0.12 on 8×8" is the bug this rule closes.

**Reveal stage (static; replaces the live map).**

```
 Made-up model: each ■ A or ● B is one household. Not New York's people.      <- S1, full width
 ┌───────────────┐   ┌───────────────┐
 │  P settled    │   │  Q settled    │     two frames, each ≤ 160 px, same size,
 │  (framed in   │   │               │     no overlay or outlines (too small),
 │   --domain)   │   │               │     shapes + hues as on stage
 └───────────────┘   └───────────────┘
  mix 2                mix 1                  <- captions (labels)
  2×2: 0.44 → 0.76     2×2: 0.47 → 0.76
  one colour: 35% → 70%
  8×8: 0.14 → 0.31                          <- k* line, only for k* measured on P
 Not modelled: money, prices, history, who was allowed to live where.        <- S4
```

- No S2, S3, slider, chips or R-row at the reveal. The reveal names no threshold, so no setting line is needed (R6 travels with the threshold).
- Reveal-stage prose: S1 13 + "mix" ×2 + "one colour" 2 = 17 (the caption labels are counted as prose here, to be strict), + S4 11 = 28. Section 4's table uses the same count.
- `aria-label` on the pair: `Two settled grids shaped like New York City, mix 2 and mix 1, same rule at 30%: the clumps are in different places. Mix 2 on 2 by 2 boxes: 0.44 at the start, 0.76 settled. Mix 1: 0.47 to 0.76.` It never says which group is where (R2).

**Reveal text: template.** `{…}` are computed values; `{k*}` renders as `8×8` or `4×4`.

> {verdict}
>
> Mix {P} began at {D2 start of P} in 2×2 boxes. Each holds at most 4 households; chance alone left {one-colour 2×2 share at P's start}% one colour. {k*} boxes: {D_k* start of P}. A segregation number needs its unit; a census tract holds thousands of people.
>
> The rule sorted your mixes into clumps in different places: this model does not show why real cities look as they do. In US cities, households did not all have the same choices: the documented history includes housing and lending discrimination, widening wealth gaps, and late-1930s government maps grading neighbourhoods for lending risk. The grades are associated with later home values and ownership; research is mixed on whether the maps caused this or recorded earlier practice.

**As rendered on the QA path (section 8):**

> Not quite: it was "About 0.4 to 0.5".
>
> Mix 2 began at 0.44 in 2×2 boxes. Each holds at most 4 households; chance alone left 35% one colour. 8×8 boxes: 0.14. A segregation number needs its unit; a census tract holds thousands of people.
>
> The rule sorted your mixes into clumps in different places: this model does not show why real cities look as they do. In US cities, households did not all have the same choices: the documented history includes housing and lending discrimination, widening wealth gaps, and late-1930s government maps grading neighbourhoods for lending risk. The grades are associated with later home values and ownership; research is mixed on whether the maps caused this or recorded earlier practice.

**Word count (whitespace tokens, numerals counted).**

| Part | Tokens |
|---|---|
| Paragraph 1 | 36 |
| Paragraph 2 | 76 |
| Body | 112 |
| Longest verdict line ("Not quite: …", 8) | 8 |
| **Total** | **120, at the cap** |

The token count is the same for every learner path: all the templated values are single tokens. `2×2` and `8×8` are written without spaces; with spaces, add 2 tokens per occurrence and cut elsewhere.

**What changed from v2, and why it stays inside the rulings.**

- **R3 order kept:**
  - (1) the unit finding leads, now with its mechanism ("chance alone…");
  - (2) the model's result, with the rule as subject ("The rule sorted…"; R4 allows "sorted" with the rule or grid as subject, never people);
  - (3) immediately, in the same paragraph, the limit and the structural history.
- **The structural sentence and the grades sentence are verbatim v2** (passed in cultural pass 3). Amended R3 order: discrimination first, then the wealth gap that followed.
- **Model detail was cut first, per R3 item 6:**
  - the settled values (they are on the captions);
  - "Without money or history…", which P3 read as "apart from"; the list now lives on the stage in S4, inside the map.
- "any real city looks as it does" became "real cities look as they do", to buy one word. The meaning is c9's; the cultural reviewer confirms.
- "A segregation number" keeps the bridge word. The question now introduces "segregation index" (section 9), so the reveal no longer springs it on the learner (learner review, break 5).

## 8. QA path (each control once, DOM order, about 450 ms apart; slider two left presses)

| # | Press | Stage after | Milestone |
|---|---|---|---|
| 0 | (explore opens) | mix 1, round 0; would move 20% (103/518); 2×2 `0.47`; one-colour boxes 40% | — |
| 1 | Step | round 1; would move 12%; 2×2 `0.47→0.58` | — |
| 2 | Run | round 7, settled; would move 0%; 2×2 `0.47→0.76`; one-colour boxes 40% → 75%; S4 appears in the map corner | `settled-30` |
| 3 | New mix | mix 2 runs from round 0 to round 12 (≤ 400 ms); clumps land elsewhere; 2×2 `0.44→0.76` | `second-mix` |
| 4 | Reset | mix 2, round 0; would move 21%; one-colour boxes 35% | — |
| 5 | 2×2 | disabled (active), skipped | — |
| 6 | 4×4 | overlay 4×4; chip `0.24`; one-colour boxes 12% (7/58) | `other-box` (mix 2 has a settled 30% run) |
| 7 | 8×8 | chip `0.14`; one-colour boxes 0% (0/18) | — |
| 8 | Slider ←← | 25%, then 20%; round 0; would move 11%, then 7% | — |
| 9 | Show me why | pins P = mix 2 (settled 30%, other boxes 4 and 8 seen on it, k\* = 8), Q = mix 1. Reveal text as above | — |

Values are from my run of `engine.ts`. The builder re-runs them in `check.mjs`, and the fact-checker verifies the claims. Pre-flight item 6 ("Reset last") still holds: P and Q are computed from seeds, not from the live frame.

## 9. Hook, question, recall

**Hook** (fixes "what can't it?"): `Measure a random mix on New York's outline. What can the number tell you, and what not?`

- 87 characters (≤ 90).
- It points to no option.

**Question:** `Two made-up groups of households, equal in number, are placed at random on a grid shaped like New York City. Before anything moves, how unevenly are they spread over the 2 × 2 boxes drawn on it (a segregation index: 0 even, 1 fully apart)?`

- 40 words. The question has no budget, but it is 7 words longer than v2's; the learning designer may trim.
- Options unchanged: `About 0 to 0.1` · `About 0.4 to 0.5` · `About 0.9 to 1`.
- "The 2 × 2 boxes drawn on it" gives the learner something to reason with: they can look and count before committing (learner review: "no way to reason toward 0.4 to 0.5"). Nothing in it points to an answer.

**Recall (proposal, owned by the learning designer):**

- Change "on 2 × 2 blocks" to "in 2 × 2 boxes of the grid (at most 4 households each)", so the stem has an anchor cue and no city-block collision.
- "why": "A 2 × 2 box holds at most 4 households, so chance alone leaves many boxes one colour. The same mix scores lower in larger boxes. A number without its unit says little."
- The cultural advisory on distractor length still stands.

## 10. Mockup notes (request to the mockup artist; route via the board, I did not touch board.json)

Please mock at 390 × 844, light and dark:

1. **Explore after a finished run (mix 1, round 7, k = 2).**
   - S1 and S4 inside the top-left water area of the map.
   - Visible 2 × 2 box lines, and one-colour outlines distinct from the lines.
   - The R-row on one line, controls, chips, S3 and the slider all visible **without scrolling**, with 44 px targets.
   - Report the map size you reached.
2. **The same at the 246 px floor.** Does the corner hold S1 + S4 at 11–12 px? If not, show the fallback (S4 under the map, above the R-row).
3. **Reveal, QA-path state.**
   - The pair at ≤ 160 px each, P framed, captions as in section 7, and the 120-word text.
   - Report the reveal-fit scale. Target ≥ 0.7, so that each frame is about 110 px or more and the clumps read as clumps.
   - At about 3 px per cell the square/circle shape cue is lost, so hue and lightness alone separate the groups. **The accessibility reviewer must rule on that**, and if it fails, a larger cell or a pattern cue at reveal size.
4. **One-colour outline style.** A neutral stroke that never takes `--ga`, `--gb`, `--warn`, `--bad` or `--good` (R5). On a settled map the outlines trace the clumps. Check that this does not read as "highlighted territories" (question for the cultural reviewer, section 13).

## 11. Claim changes (fact-checker verifies; the builder writes the meta.json edits)

| Claim | Change | Status after |
|---|---|---|
| c4 (D definition) | Note only. The question now says "a segregation index: 0 even, 1 fully apart" and the stage gloss is unchanged. Within c4. | stays verified (fact-checker confirms the note) |
| c5 (random start 0.4–0.5) | Note: the question says "2 × 2 boxes drawn on it"; the readout `mix N` is the seed; seeds 3 and 36 are skipped. The reveal quotes P's start value. | reset → unverified (wording) |
| c6 (settles at 30%) | Readout becomes "would move N%" = ceil(100 × movers / agents), 0% only when movers = 0; "Round" for "Tick". Builder adds a check.mjs assertion: 0 frames read 0% with movers > 0. | reset → unverified |
| c7 (D by unit) | Card text drops 1×1: "D depends on the box size: the same model grid scores less in larger boxes; at the random start about 0.46 on 2 × 2, 0.26 on 4 × 4, 0.14 on 8 × 8; settled at 30% about 0.75, 0.53, 0.33." Keep 1.00 for single cells in the source note only. The reveal quotes k\* only for (P, k\*) looked at. | reset → unverified (text) |
| c8 (moving rule sorts) | Reveal: "The rule sorted your mixes into clumps". Within c8; note only. | verified (fact-checker confirms) |
| c9 (does not show why) | Card: "this model does not show why real cities look as they do". Same scope. | verified (fact-checker confirms) |
| c10a, c10d, c10e | Card text unchanged. | unchanged |
| **c10b** | **Split** (section 12). Narrowed to the housing-discrimination and wealth-gap words. | unverified (Rothstein page still needed) |
| **c10f (new)** | Lending grades counted residents' race (section 12). | unverified → fact-checker, primary source |
| c11 (mask) | Unchanged. | unchanged |
| c12 (toy model) | Text: "A toy model on a grid shaped like New York City: each A or B mark stands for one household in a made-up model; two made-up equal groups; not New York's people and not a cause. The 30% setting is a setting in this model, not a measure of anyone." Stage: S1, S3. Density note unchanged. | reset → unverified |
| c13 (recall) | If the learning designer adopts section 9: "boxes", "at most 4 households each". | reset → unverified if changed |
| c14 (not modelled) | Text = S4: "Not modelled: money, prices, history, who was allowed to live where." Shown inside the map after the first finished run. "Allowed" is accurate: engine.ts lets any household move to any empty cell, and no rule bars anyone (it is the *absence* of such rules that is not modelled). | reset → unverified |
| c15 (unit contrast) | "A census tract holds thousands of people. A 2 × 2 box in this grid holds at most 4 households." Card: "Each holds at most 4 households; … a census tract holds thousands of people." | reset → unverified (text) |
| **c16 (new)** | See the c16 text below. | new, unverified |
| **c17 (new)** | See the c17 text below. | new, unverified |

**c16 claim text.** "In this model, random mixes run under the same rule settle into clumps in different places: on the cells both settled grids fill, two mixes hold the same group about half the time."

- Support: simulation. My run: consecutive lesson seeds at 30%, 0.41–0.59, mean 0.51; mix 1 vs mix 2, 229 of 463 cells = 0.49; mix 2 vs mix 4, 0.50.
- On the card: "The rule sorted your mixes into clumps in different places", plus the reveal pair.

**c17 claim text.** "In this model, chance alone leaves many small boxes one colour: at the random start, 34–47% (mean 39%) of the 2 × 2 boxes that hold a household hold only one group, against 3–16% of 4 × 4 and 0–11% of 8 × 8 boxes; settled at 30%, 64–81% of 2 × 2 boxes."

- Detail: mix 1 start 72/181 (40%), settled 135/180 (75%); mix 2 start 65/184 (35%), settled 127/181 (70%).
- Support: simulation over the 48 lesson seeds, my run.
- On the card: the one-colour readout and outlines, and "Each holds at most 4 households; chance alone left 35% one colour".

My numbers come from a scratch script over `engine.ts` (not committed). The builder adds both computations to `check.mjs`, and the fact-checker re-implements them independently, as before.

## 12. c10b split (proposal for the fact-checker and the cultural reviewer)

The card sentence stays **unchanged**: "In US cities, households did not all have the same choices: the documented history includes housing and lending discrimination, widening wealth gaps, and late-1930s government maps …". The amended R3 order is untouched, and no cultural re-review of wording is needed. Only the claims are split:

**(i) c10f, new: discrimination in lending grades. Primary source.**

- **Text:** "In US cities, households did not all have the same choices: the late-1930s government lending-risk grades counted residents' race against a neighbourhood."
- **Carries these card words:** "households did not all have the same choices", "lending discrimination".
- **Source:** Mapping Inequality area descriptions, `github.com/americanpanorama/HOLC_Area_Description_Data` (`ad_data.json`, 7,930 forms). The forms record residents' race in their own fields and name it among the reasons for a grade, in the `detrimental_influences`, `infiltration_of` and `clarifying_remarks` fields. This includes New York City forms.
- **My scope check, not a verification:** the file was reachable from this session, and a keyword search finds race named in those reason fields on many D-graded forms, including NYC ones.
- **Rules for the fact-checker:**
  - Verify from the forms yourself.
  - Cite field names and counts, not neighbourhood names (R7: no neighbourhood beside a grade, not even on the trust sheet).
- **Question for the cultural reviewer:** the trust sheet is learner-visible, and the forms use period racial terms. Should the source note quote them, or describe them ("the forms' own racial terms")? I recommend describing them.

**(ii) c10b, narrowed: the wealth-gap clause. Secondary source.**

- **Text:** "In US cities, housing and lending discrimination widened wealth gaps between groups, largely through home equity."
- **Carries these card words:** "housing … discrimination, widening wealth gaps".
- **Source:** Rothstein 2017, *The Color of Law*. **Still needs a page**, so this claim still blocks publish.
- **Fallback, as cultural pass 3 ruled:** replace the source, not the order.
- Fact-checker's earlier wording note: the card's "widening" claims slightly less than "widened", which is acceptable.

Not adopted: making race explicit on the card ("maps that graded neighbourhoods partly by residents' race"). It costs about 4 words the reveal does not have, and it is a cultural ruling and a content change, not an interaction one. It is recorded here so the cultural reviewer can raise it if they want it.

## 13. Acceptance test (re-run the learner probe against this)

Run a fresh `npm run walkthrough -- schelling-on-new-york` at phone size, option 1. Same boundary as the failed probe: a general adult who has not seen lesson one. Same six personas, P1–P6. The evaluator reads the artifact before this spec.

**Blocking (all must hold):**

1. **Cultural probe (a): "Does this show why New York looks as it does?"**
   - At most 1 of the 6 personas answers "yes", "mostly" or "kind of".
   - The boundary learner answers "no".
   - **P2 and P5 must answer "no" from the image alone.** The evaluator states which image each keeps. Pass if it is "two different maps" or "random clumps"; fail if it is "the city sorting".
2. **Probe (b): "What was left out?"** At least 4 of 6, including P2 and P5, name at least two of money, prices, history, who was allowed to live where. The test is that S4 is now visible inside the map, not below the fold.
3. **"Why isn't a random mix 0?"** The boundary learner answers in their own words with small boxes and chance ("a box holds only a few households, so by luck many are one colour"), citing something on the stage: the outlines or the one-colour readout. At least 4 of 6 personas manage this.
4. **No unit confusion.** No persona reads a "box" as a city block. The boundary learner can say what a mark is (one household in a made-up model) and how many a 2 × 2 box holds (at most 4).
5. **The reveal quotes what was seen.** Every number in the reveal appears in an earlier frame of the transcript for the same mix, or on the reveal stage. Specifically the walkthrough's P is mix 2, and 0.44, 35% and 0.14 appear in frames 4 to 7 of section 8. Zero numbers from an unvisited (mix, k).
6. **Budgets.**
   - Stage prose ≤ 25 before a run, at every frame.
   - After a run, ≤ 25 + the S4 line, pending the recorded decision.
   - Reveal ≤ 120 tokens including "Not quite: …".
   - Phone: no frame of the stage scrolls (`scrollHeight <= clientHeight`), all controls ≥ 44 px, QA contract passes.

**Recorded, not blocking:**

- Whether "wealth gaps" reads as an alternative to discrimination (cultural pass 3, condition 3).
- Whether 1 × 1's removal is noticed.
- Whether P3 still says "people sort themselves". That is an expected residual; the probe is about New York.

**If (a) still fails:** the next lever is not more text. It is the cultural reviewer's and category manager's call on the outline itself, for example a neutral grid with "New York's outline" only in the hook. That would be a change to the brief, owned by the category manager.

## 14. Open risks and routing

| # | Risk | Owner |
|---|---|---|
| 1 | The reveal-stage pair is above the text, against the catalogue's "below the text". | design-lead |
| 2 | At reveal scale the frames are about 110 px (about 3 px cells), so the shape cue is lost and hue/lightness carry the groups alone. | accessibility reviewer, visual designer |
| 3 | One-colour outlines on a settled map trace the clumps and may read as highlighted territories on a real city outline. | cultural-reviewer (rule before build) |
| 4 | The S1, S4 and reveal wording changes ("one household", "Not New York's people", "was allowed to", "real cities look as they do") need confirmation against R1, R3 and c9. | cultural-reviewer |
| 5 | The stage after-run overrun (S4, 11 words) still has no recorded decision. | learning-designer + design-lead |
| 6 | The reveal is at exactly 120, with no slack. `formats.md` says the reveal is ≤ 90 words, while `demo-standard.md` says ≤ 120; this spec follows demo-standard, as briefed. The two documents conflict. | head-of-product / design-lead |
| 7 | c10b (Rothstein page) still blocks publish. c10f, c16 and c17 are new claims. | fact-checker; someone with the book |
| 8 | "New mix" changes behaviour by state (new start at round 0, run to end otherwise), which may surprise a learner who wanted a new start after a run. Reset, then New mix, still gives it. | builder: report in pre-flight; learner probe: watch for it |
| 9 | The title "Schelling on New York" primes the reading the probe found (P2). Optional question; I do not change it. | category manager |
| 10 | "neighbours" (8 around) is still undefined on the card. The slider label is fixed by R6, and the budget is full. | advisory, unchanged |

Next move: design-lead review of this spec (items 1, 6). Cultural reviewer rules on items 3, 4 and the c10f note before build. Then demo-builder builds v3, the fact-checker re-checks the claims, and the learner probe is re-run against section 13.
