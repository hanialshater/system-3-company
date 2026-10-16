# Content patch r3: W3 revisions (r14, FC54) and the W-1279 text rows

- **Author:** cm-lifehacks (Tess), 2026-10-16. Batch item B1 of company/ops/dispatch-requests/2026-10-16-r3-lifehacks.md (its D1 and D2 are the decisions this patch writes out). **Status:** patch, not applied. I edited nothing under `src/` or `tests/`.
- **Board:** W-1257 (W3 r14 revises), W-1279 (the rows B4 did not apply), W-1234 (FC54 rows).
- **Who applies it:** B3 (demo-builder, branch lhfix-r3). B3 applies this patch together with patch r2 §2 as amended in "§2 re-check" below and the D1/D2 cells that name B3.
- **Read at:** origin/ccr-4c6c7654-ew9ko1 tip b82c5da, which includes the lhfix-r2 merge (2dc43ef, PE-ops approved with conditions). care-label-first-choice and towel-thickness-hidden-volume are on engine 2 there. laundry-gap-air-path is still on engine 1.
- **W-1258 assumption.** I wrote this patch to principal-engineer's ruling (company/ops/dispatch-requests/2026-10-16-r3-engineering.md, "since last round", W-1258; engineering B1, branch lh-engine-locked). While the stage is locked, the picture keeps A's arrangement, but it draws no count, amount or result text for either mode. Givens that the question states may stay. Arrangement giveaways are lesson content and belong to me. They are in "Arrangement giveaways" below.
- **Kill rule.** The founder has not ruled on F-36 (founder-inbox, status open, read 2026-10-16). B1's stop-if did not fire.
- **Simulated reviews are not learning evidence.** This patch fixes wording and premises that a fact-check and simulated readers flagged. It shows nothing about what anyone learned.

## How the numbers were produced

Every number below comes from one script, which also carries the spec fields this patch sets (`PATCH`):

```
node --import ./tests/lifehacks/register.mjs company/reviews/lifehacks-200/content-patch-2026-10-16-r3.run.mjs origin/ccr-4c6c7654-ew9ko1
```

It loads the specs from the given git ref and overlays `PATCH`. Then it runs the working tree's `evaluateHome`, `homeColumn` and `homeRevealLine` (engine-v2.ts and home-models.ts are identical on main and lhfix-r2: `git diff HEAD lhfix-r2 -- src/lib/lifehacks/engine-v2.ts src/lib/lifehacks/home-models.ts` is empty). It also runs the W2 ratchet's checks at every slider step: no raw token, no NaN, no R5 trailing zero under `plainNumbers`, title ≤ 40, hook ≤ 90, answer in range. On 2026-10-16 it exited 0 for all five slugs. The outputs quoted below as "run:" are its lines, verbatim.

**B3:** run the script on your branch after applying. If any number differs from the one quoted here, stop and send the row back to me. Do not reword it.

## Rules (same as patch r2)

Field paths: H = `src/lib/lifehacks/home-lessons.ts` (the entry with that slug). M = `src/demos/lifehacks/<slug>/meta.json`. Where a field exists in both H and M (title, hook), change both (engines-v2.test.mjs checks they match). `M.objective` is a copy of the idea in these lessons, so it changes with the idea. Every changed learner-visible string resets the claim that quotes it to `unverified`. Home `c4` quotes title, hook, question and options. `c1` is the idea, `c2` the limit, `c3` the formula, `c5` the spec `recall` prompt, `recall` the meta recall item, and `seen` the first reveal sentence at `initial`. Nobody marks a claim verified except a fact-checker.

---

## D1 rows (W-1279)

### laundry-gap-air-path: vary the rail, not the count (engine 2 on the existing `gaps` case)

D1 asked me to confirm both numbers against the model. **Confirmed.** run: `p=60 evaluateHome A=0 B=5`, `p=48 evaluateHome A=0 B=2`. So (60 − 40) / 4 = 5 and (48 − 40) / 4 = 2. **No shared-model change.** Every field below is a spec field that engine 2 already reads (`homeV2Problems` = `[]`, `homeSliderMatters` = true). It is the same kind of move B4 made for towel-thickness and care-label.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H, M | `title` | `A gap is an air path` | `Room between the shirts` | c4 |
| H, M | `hook` | `Which layout leaves clear paths between these items?` | `Same five shirts, shorter rail. What happens to the space between them?` | c4 |
| H | `question` | `Which layout leaves clear paths between these items?` | `Five shirts on a 60 cm rail have 5 cm between neighbours. Move them to a 48 cm rail: how much gap is left?` | c4 |
| H | `options`, `answer` | (none: v1 builds them from `choices`), 1 | `["None: they touch", "2 cm", "5 cm: same five shirts"]`, 1 | c4 |
| H | `engine` | (absent) | `2` | – |
| H | `initial` | `60` | `48`. The stage opens on the question's case, so the reveal at the default state states the answer. 60 stays reachable on the slider (45 to 80). | seen |
| H | `inputLabel` | `Rack width` | `Rail width` (the question says rail). No claim quotes it. | – |
| H | `modeLabels` | (absent; the buttons read `Touching rows` / `Spaced rows`) | `["Pushed together", "Spread evenly"]` (15 and 13 characters; no option repeats a label, R7) | – |
| H | `amounts` | (absent) | `[{"label":"Rail width","unit":"cm","a":"p","b":"p"},{"label":"Rail left after the shirts","unit":"cm","a":["-","p",["*","a","b"]],"b":["-","p",["*","a","b"]]}]` | seen |
| H | `resultLabel` | (absent; model label `Clear gap`) | `Gap between neighbours` | seen |
| H | `plainNumbers` | (absent) | `true`. Without it, R5 prints 1.5 as "1.50 cm" at a 46 cm rail. run: ratchet ok at all 36 steps. | – |
| H | `revealLine` | (absent) | `{B}: five 8 cm shirts use 40 cm of the {amountB0} rail. The {amountB1} left is shared by 4 gaps: {resultB} each. {A}: {resultA} between neighbours, so no gap is open.` | seen |
| H, M | `idea` (c1), `M.objective` | `In this rack drawing, positive separation leaves an open channel. Packing more garments onto the same width eventually removes those channels; the count of gaps shows the trade-off.` | `Five shirts always take 40 cm of rail. Only the rail left over is shared out as gaps, so a shorter rail shrinks every gap, even with the same five shirts. At 0 cm, neighbours touch and no open path is left between them.` (The old idea was about adding garments, a line D1 dropped. "Positive separation" is jargon.) | c1 |
| H | `formula` (c3) | `Available gap=(rack width−5×8)/4cm; touching method sets spacing=0. Four channels count only when spacing>0.` | `Gap=(rail width−5×8)/4 cm; shirts 8 cm wide. Channels count only when the gap is above 0.` (D1 text, unchanged) | c3 |
| M | `misconception` | `Packing more clothes onto the rack dries the load sooner, because more items dry at once.` | `The same five shirts keep the same 5 cm gap on a shorter rail.` (the "5 cm: same five shirts" option, as D1 asks) | not a claim |
| M | `seen` claim | (none) | **New claim** `lifehacks.laundry-gap-air-path.seen`, support `derivation`, status `unverified`, text `First reveal sentence at the starting slider value; recomputed from the learner's current state: ` + the run line below | seen (new) |
| M | `version` | `1` | `2` | – |
| M | `limit` (c2), `recall`, c5 | – | **keep, because** c2 still says the diagram computes no airflow or drying time. The recall item (52 cm rail, 3 cm gaps) is a transfer of this exact formula: (52 − 40) / 4 = 3. c5 still asks about touching neighbours, and mode A shows them. | – |

run at `initial` 48: `Spread evenly: five 8 cm shirts use 40 cm of the 48 cm rail. The 8 cm left is shared by 4 gaps: 2 cm each. Pushed together: 0 cm between neighbours, so no gap is open.` Also at 60 (`… 20 cm left … 5 cm each …`), 45 (`… 5 cm left … 1.25 cm each …`) and 80 (`… 40 cm left … 10 cm each …`).

**For B3 (tests, not content):** the lesson joins the engine-2 Home set. Add it to the W2 ratchet list in tests/lifehacks/home-v2.test.mjs, as B4 did for towel-thickness and care-label, and to whichever list feeds `V2_HOME` in tests/lifehacks/engines-v2.test.mjs, so the count test holds. If that needs a change to a pinned value in tests/lifehacks/home.test.mjs, stop and send the row back.

**Flag, not a blocker (engine-owned picture).** The `gaps` picture (HomeLesson.tsx `Scene`, `model==='gaps'`) draws a fixed spacing (26 or 48 units). It does not draw the rail width, so moving the slider from 48 to 60 changes the table but not the picture. The locked and neutral picture is A's arrangement (shirts touching). The question states a 60 cm rail with 5 cm gaps, so the locked picture shows the "None: they touch" option, not the given. I accept this for the r3 walk, because it shows a wrong option and not the answer, and spec R2 says the locked stage draws A. If the walk flags it, the fix is an engine row: draw the spacing to scale, as (p − 40) / 4 in B. I am not asking for it now.

### towel-thickness-hidden-volume: no "ratio" (D1)

The stage's own words are "open face per cm³ of cloth" (the `resultLabel` B4 set). run: `p=2 … A ["10,000 cm²","1,000 cm³"] 10 cm² | B ["10,000 cm²","2,000 cm³"] 5 cm²` and `p=1 … A ["10,000 cm²","500 cm³"] 20 cm² | B ["10,000 cm²","1,000 cm³"] 10 cm²`. The spec's stage fields are unchanged, so `seen` is unchanged.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H, M | `idea` (c1), `M.objective` | `Doubling thickness at the same width and length doubles material volume while keeping the two large face areas fixed. The area-to-volume ratio therefore halves.` | `Twice as thick at the same width and length means twice the cloth, but the open face is still the same two sides. So each cm³ of cloth gets half as much open face.` | c1 |
| H | `recall` (c5, transfer prompt) | `What happens to face-area-to-volume ratio when thickness doubles?` | `Same size cloth, twice as thick: what happens to the open face each cm³ of cloth gets?` | c5 |
| M | `recall.question` | `A 50 × 100 cm cloth goes from 2 mm to 4 mm thick. What happens to its face-area-to-volume ratio?` | `A 50 × 100 cm cloth goes from 1 mm to 2 mm thick. How much open face does each cm³ of cloth get now?` (1 → 2 mm, so the item is not the stage's default 2 → 4) | recall |
| M | `recall.options`, `answer` | `["It doubles", "It is unchanged", "It halves"]`, 2 | `["Twice as much", "The same", "Half as much"]`, 2 | recall |
| M | `recall.why` | `The two large faces stay 50 × 100 cm each while the volume doubles with thickness, so the ratio halves. The ratio alone does not set a drying time.` | `The two faces stay 50 × 100 cm each, 10,000 cm² in all, while the cloth goes from 500 cm³ to 1,000 cm³: 20 cm² of open face per cm³, then 10. Half as much. That alone does not set a drying time.` (run: p=1 gives 20 and 10) | recall |
| H, M | `limit` (c2) | `This geometric ratio alone does not determine a fabric’s drying time.` | `Open face per cm³ of cloth does not, on its own, set a towel’s drying time.` (D1 named idea and recall. I add the limit and formula because they say "ratio" too, and the limit is shown in the reveal.) | c2 |
| H | `formula` (c3) | `Face area=2×50×100cm²; volume=50×100×thickness/10 cm³, doubled for comparison. Ratio=area/volume cm⁻¹.` | `Open face=2×50×100 cm²; cloth=50×100×thickness/10 cm³, doubled when twice as thick. Open face per cm³=open face÷cloth.` | c3 |

---

## D2 rows (W3)

### tote-balance-sides: the idea must not contradict the slider (r14 note 3)

The slider takes the left side to 1, 3 or 5 kg. The old idea always said "Move 1 kg across … 2 kg", which is wrong for 5 kg and 1 kg. run: `p=3 … B ["2 kg","2 kg"] 0 cm`, `p=5 … A ["5 kg","1 kg"] −13.3 cm · left of the handle | B ["3 kg","3 kg"] 0 cm · under the handle`, `p=1 … A ["1 kg","1 kg"] 0 cm`. **Pending the safety re-look (W-1094).** The load wording (c2, the caption) is unchanged.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H, M | `idea` (c1), `M.objective` | `The heavier side pulls the balance point towards it, and the bag tilts until that point is under the handle. Move 1 kg across and both sides hold 2 kg, so the bag hangs straight, though it weighs the same.` | `The heavier side pulls the balance point towards it, and the bag tilts until that point is under the handle. Even the sides out, half the total on each, and the balance point is already under the handle: 3 kg and 1 kg become 2 kg each, 5 kg and 1 kg become 3 kg each. The bag hangs straight, and it weighs the same.` | c1 |
| M | c1 `support`, `source` | `source` (REI) | **B3's row (D2), with this text:** `derivation`. A body hanging freely from one point rests with its centre of mass straight below that point. With m kg at −20 cm and 1 kg at +20 cm, the centre is at (−20m + 20) / (m + 1): −10 cm for m = 3, −13.3 cm for m = 5. With (m + 1) / 2 kg on each side, it is at 0. The REI page may stay as further reading, not as support. | c1 |

The question, options, title and hook stay as they are (D2: accept). The r14 note 1 ("−10 cm" with nothing to anchor it, because the 20 cm never shows) is not a B1 cell. It needs either an amount row or a picture mark, and that is a stage change, so I leave it for the r3 walk.

### elastic-loop-release: name what is counted (FC54 c3/seen)

D2 renames the result row to what it counts. The value stays 1 while the tie is on and 0 once it is off (run: `evaluateHome A=1 B=0`). The slider still changes nothing (run: `sliderMatters=false`), as the plan row allows. **Pending the safety re-look (W-1094).** The limit and warning text (c2) are unchanged.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H | `resultLabel` | `Crossings` | `Hair ties on the cord` | c3, seen |
| H | `revealLine` | `{A}: the hair tie stays {amountA0}, crossings {resultA}. {B}: it comes {amountB0}, crossings {resultB}, and nothing is cut.` | `{A}: there is no knot to undo, so the hair tie stays {amountA0}. Hair ties on the cord: {resultA}. {B}: it slides {amountB0}, and nothing is cut. Hair ties on the cord: {resultB}.` | seen |
| H | `formula` (c3) | `Crossings=1 while the hair tie is on the cord, 0 once it has slid off the free end; nothing is cut and the elastic is not stretched.` | `Hair ties on the cord=1 while the tie is round the cord, 0 once it has slid off the free end; nothing is cut and the elastic is not stretched.` | c3 |
| M | `seen` text | `…: Pick at it: the hair tie stays on the cord, crossings 1 (still looped). Slide it off: it comes off the end, crossings 0 (free), and nothing is cut.` | `First reveal sentence at the starting slider value; recomputed from the learner's current state: Pick at it: there is no knot to undo, so the hair tie stays on the cord. Hair ties on the cord: 1 (still looped). Slide it off: it slides off the end, and nothing is cut. Hair ties on the cord: 0 (free).` (run at p=20, verbatim) | seen |
| H, M | `title`, `hook` | – | patch r2 §2 (pending the safety re-look) | c4 |
| M | `recall` (verified, "A crossing in a drawing does not prove a knot…") | – | **keep, because** it is about crossings in any drawing, not this stage's row, and FC54 verified it as independent of the stage. | – |

### sock-pairs-not-all-combinations: rewrite the premise (D2)

D2 has three parts. (1) The socks look alike but are not interchangeable, and the question says so. (2) "15 pairings" is never "15 tries". (3) The reveal says a matched sock leaves the search, and that the count still grows faster than the socks (10 → 45). I add no tries number.

**This rewrite also removes the arrangement giveaway (r14 finding 2).** The locked stage draws A at `initial` 6, which is all 15 lines. The new question **states** 6 socks and 15 pairings as its given, and asks about ten. So the picture shows only a given, which W-1258 allows. The answer, 45, appears only after the commit, when the learner moves the slider to 10. If the learner does not, the idea states it in the reveal. The prediction is now about growth. The misconception is proportional thinking ("10 socks is 6 socks and two thirds more, so about 25"). 90 = 10 × 9 is the count when every pairing is counted twice, a real slip.

run: `p=6 evaluateHome A=15 B=3`, `p=10 evaluateHome A=45 B=5`, `p=8 … 28 … 4`, `p=4 … 6 … 2`. Check: 25 = 15 × 10 / 6. 90 = 10 × 9. 45 = 10 × 9 / 2.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H, M | `title` | `Six socks are not six possible pairs` (patch r2 §2 had `Six socks: how many pairings?`) | `Ten socks: how many pairings?` (supersedes §2) | c4 |
| H, M | `hook` | `Six plain socks, three pairs, no marks. How many two-sock pairings could you try?` (§2 had `…How many tries could pairing them take?`) | `More socks in the pile. How fast do the possible two-sock pairings grow?` (supersedes §2. The §2 hook said "tries", which is the very equation D2 forbids.) | c4 |
| H | `question` | `Six plain socks, three pairs, no marks. How many different two-sock pairings could you try?` | `Six black socks from three people look alike, but only the true pairs match. They make 15 possible two-sock pairings. Ten socks from five people: how many?` | c4 |
| H | `options`, `answer` | `["3", "6", "15"]`, 2 | `["25: in step with the socks", "45", "90"]`, 1 | c4 |
| H | `resultLabel` | `Pairings to try` | `Possible pairings` | seen |
| H | `revealLine` | `{A}: {amountA0} socks give {resultA} pairings to try. {B}: only {resultB}, one per pair.` | `{A}: {amountA0} socks make {resultA} possible two-sock pairings. {B}: {resultB}, one per pair.` | seen |
| H, M | `idea` (c1), `M.objective` | `Each sock can go with any of the others, so six socks give 15 pairings: 5 + 4 + 3 + 2 + 1. The pairings grow much faster than the socks: ten socks give 45. A mark on each pair leaves one pairing per pair.` | `Each sock can go with any of the others, so six socks make 15 pairings (5 + 4 + 3 + 2 + 1) and ten make 45 (9 + 8 + … + 1). You never test them all, because a sock leaves the pile once it is matched, but each extra sock adds a pairing with every sock already there, so the pairings grow faster than the socks. A mark on each pair leaves one pairing per pair.` | c1 |
| H | `limit` (c2) | `This assumes pairs that look alike but are not interchangeable; identical pairs would need fewer tries.` | `This counts possible pairings, not the tries it takes you: a matched sock leaves the pile. Socks that really are identical pair up any way.` (the not-interchangeable premise is now in the question) | c2 |
| H | `formula` (c3) | `Candidates=N(N−1)/2 versus floor(N/2) marked pairs; N is an even illustrative sock count after rounding down.` | `Possible pairings=N(N−1)/2 unmarked versus N/2 marked pairs; N is an even sock count, 4 to 10.` (the slider is 4 to 10 in steps of 2, so N is always even) | c3 |
| M | `seen` text | `…: No marks: 6 socks give 15 pairings to try. Marked partners: only 3, one per pair.` | `First reveal sentence at the starting slider value; recomputed from the learner's current state: No marks: 6 socks make 15 possible two-sock pairings. Marked partners: 3, one per pair.` (run at p=6, verbatim) | seen |
| M | `recall.question` | `Eight socks with no marks: how many possible pairs could you check? With unique partner marks, how many matches are there to make?` | `Eight socks with no marks: how many possible two-sock pairings are there? With unique partner marks, how many matches are there to make?` ("could you check" was the same pairings-as-tries step). The options (`8 and 4` / `16 and 4` / `28 and 4`, key 2) and the why stay. run: p=8 gives 28 and 4. | recall |
| M | `misconception` | `Six loose socks need only a handful of checks to pair up.` | `The possible pairings grow in step with the socks: ten socks make about 25.` (the first option) | not a claim |
| M | `learner.doesNotKnow[0]` | `that six socks can be put together in 15 different pairs, so the checks grow fast with more socks, and distinct patterns cut this to one look per sock` | `that six socks make 15 possible two-sock pairings and ten make 45, so the pairings grow faster than the socks, and a mark on each pair leaves one pairing per pair` | not a claim |
| H | `initial`, `min`, `max`, `step`, `modeLabels`, `amounts`, c5 | – | **keep, because** the stage already draws the given (6) and reaches the answer (10). c5 ("Why can a unique partner mark change a matching task more than a tidy pile?") does not equate pairings with tries. | – |

### jacket-last-first: the arrangement giveaway (r14 finding 1, now mine under the W-1258 ruling)

Patch r2 §2 fixes the title (`Jacket, sweater, shoes`) and hook. The rest of the r14 finding is the locked picture. `w3Picture` `reverse-order` at `mode` null draws A's stack: the jacket at the bottom under two items, with up-arrows over it. **No text or spec field can remove that.** The arrangement is the model's mode A. Stating it in the question would hand over the misconception ("pack in use order") instead of testing it.

**Builder row, change named (HomeLesson.tsx, so not B3's: B3 stop-if):** in `w3Picture` case `reverse-order`, when `mode` is null, draw the bag empty and the items beside it, unstacked and in use order, with no up-arrows. The A and B pictures after a press are unchanged. No model, number or claim changes. Only the stage's aria label changes, and it already says "shared setup … no result shown". My preferred owner is platform-engineer, on lh-engine-locked or right after it, because it is the same function and the same locked-stage rule. That is principal-engineer's call (lane 7). Until it lands, jacket-last-first's re-walk reads the title fix only, and the walk record should say so.

### Arrangement re-check, all 9 unparked W3 lessons (locked picture = A, after the W-1258 text rule)

| Slug | What the locked picture draws once the text is gone | Decision |
|---|---|---|
| jacket-last-first | jacket buried, with arrows | builder row above |
| sock-pairs-not-all-combinations | 6 socks, 15 lines | now a given, by the rewrite above |
| group-cables-with-ends | the middle-tied bundle, each loose end drawn as a highlighted (target) dot | **an arrangement hint** (the highlight marks the ends as what matters). Builder row, change named: in `Scene` (cord view, `end-paths`), while the stage is locked or `mode` is null, draw the end dots without the `target` class, or leave them out. This is the cord picture, so it goes through the W-1094 safety re-look with the "how to tuck" picture (D2), and nobody changes it first. |
| socks-use-shoe-space | the shoe with its dashed hollow | **keep, because** the question states the hollow ("stuffed inside the shoe"). Only the "600 cm³ empty" text was a giveaway, and the engine rule removes it. |
| shoes-opposite-ends | toes together, with the dimension line | **keep, because** the arrangement is the question's own setup. The "24 cm" text is removed by the engine rule. |
| fitted-sheet-corners-nest | four cups stacked full depth | **keep, because** that is "corners apart", which the question names. The "32 cm" text is removed by the engine rule. |
| tote-balance-sides | the 3 kg / 1 kg bag, tilted | **keep, because** 3 kg and 1 kg are givens. The tilt is A's outcome, but the question asks about B. |
| elastic-loop-release | the tie looped round the cord | **keep, because** the question states it ("looks knotted"). |
| long-cord-knots-itself | CordStage (special stage) | not an arrangement question. W-1241 is engineering B1's. |

---

## §2 re-check (patch r2 §2 against b82c5da)

For all 12 §2 slugs, every spec field is identical at 5d9de52 (where §2 was read) and at origin tip b82c5da. That covers title, hook, question, options, answer and every other field. Command: a field-by-field JSON compare of `home-lessons.ts` at the two refs. Each meta title and hook equals its spec's. **Every "Old" cell in §2 still matches main.** What changes in §2 is set by D2 and by this patch:

| §2 row | Status for B3 |
|---|---|
| long-cord-knots-itself, group-cables-with-ends, elastic-loop-release (title, hook) | apply, pending the safety re-look (W-1094) |
| fitted-sheet-corners-nest (title, hook, question, options) | apply. Also D2's c5 text (B3's cell). |
| shoes-opposite-ends (title) | apply |
| tote-balance-sides | keep (as §2 said) |
| jacket-last-first (title, hook) | apply. The picture is the builder row above. |
| socks-use-shoe-space (title, hook, question, options) | apply |
| sock-pairs-not-all-combinations (title, hook) | **superseded by this patch** (the sock-pairs rows above) |
| sock-pairing-by-pattern, suitcase-layer-access | **withdrawn** (D2: parked for the retirement review; untouched) |
| laundry-sort-before-walk | not B3's (D2 gave it to the r3 lifehacks B2, see "Not in this patch") |

## Not in this patch

- **The garment-overlap `inputLabel`, the drying-room `min` 2, the care-label `misconception`, the tote c1 support retype, the tote caption claim and the fitted-sheet c5:** these are D1/D2 cells for B3, written there in full. reserve-an-unassigned-slot: closed in D1.
- **The safety-owned wording:** group-cables' "how to tuck" picture and its c2 bend-radius limit, and all cord and load warnings. They go to the W-1094 re-look. I wrote no new safety text. The tote idea and the elastic reveal above are pending that re-look.
- **Orphaned engine rows (for the chief of staff, not mine to own).** The r3 lifehacks B2 was refused as a duplicate of engineering B1 (2a71f4b). Engineering B1 covers W-1258, W-1241 and W-1247. It does not cover three other B2 cells: the tote lever arm (150 → 188 in `w3Picture` `balance`, FC54 note), laundry-sort-before-walk's move to engine 2 (R2 a-c, with the §2 last-row title and hook), and the socks-use-shoe-space hollow label after the socks fill it. They need an owner. The two picture rows above (jacket and group-cables) can travel with them.
- **Route-table row 2 of the fix plan** (demo-builder's objections 1-3 and 7): still not on disk, as in r2.
