# Decision: one fix plan for the Life Hacks r11 revises (templates first, then ten builder waves)

owner: cm-lifehacks (Tess)
date: 2026-10-15
status: decided (content and order). The template work packages are proposed to their owners, and each owner's answer goes in the route table.
class: category-or-vertical
route: cm-lifehacks → demo-builder (template packages and waves) → qa-tester / fact-checker / learner-evaluator (per wave) → head-of-product (informed: wave order against the domain-launch record)
recorded by: cm-lifehacks (the owner records it: a category-order decision inside the category manager's authority, not a founder ask)
board: W-1064, W-1067, W-1071, W-1074, W-1077 (mine). Builder template items: W-1066, W-1070, W-1075, W-1076, W-1079. QA: W-995, W-1068. Fact-check: W-1073, W-1078.
inputs read: all 188 `company/reviews/<slug>/2026-10-15-learner-adult-beginner-r11.md` records for `src/demos/lifehacks/*` (verdict line and verdict reason for every record), each lesson's `Demo.tsx` import and its spec in `src/lib/lifehacks/{home-lessons.ts,studyCatalog.ts,resource-specs.json}`, `src/components/lifehacks/{HomeLesson,StudyLesson,ResourceLesson}.tsx`, `company/domains/lifehacks.md`, `company/rituals/records/2026-10-15-domain-launch.md`, `src/lib/trust.ts`.

## 1. The tally (from the tree, 2026-10-15 22:00)

- 200 Life Hacks lessons. 188 have an r11 record: **34 launch, 154 revise, 0 fatal**. 12 have no r11 record (all 12 are v2-engine lessons).
- The coordinator's count is 185 reviewed, 34 / 151. The 3 extra revises on disk are records under r11's filename. I plan from the disk count. Any difference is in revise, so it can only make the plan cover more, not less.
- By template (the import in each `Demo.tsx`):

| Template | Shared code | Launch | Revise | No record |
|---|---|---|---|---|
| **Home** ("illustrative model", two layouts A/B) | `src/components/lifehacks/HomeLesson.tsx`, `src/lib/lifehacks/{home-lessons.ts,home-models.ts,engine-v2.ts}` | 10 | 55 | 4 |
| **Study** (queue = `order`, calendar = `schedule`, reconstruction = `recall`, checklist = `message`, `files`, `edit`, `spacing`) | `src/components/lifehacks/StudyLesson.tsx`, `src/lib/lifehacks/{studyCatalog.ts,studyModels.ts}` | 5 | 57 | 8 |
| **Resource** (price comparison "Test A / Test B") | `src/components/lifehacks/ResourceLesson.tsx`, `src/lib/lifehacks/{resource-specs.json,resource-model.ts}` | 19 | 41 | 0 |
| AlphabetSearchLesson (one lesson) | `src/components/lifehacks/AlphabetSearchLesson.tsx` | 0 | 1 | 0 |

- Resource gives 19 of the 34 launches (receipt family 10 of 18). The Home template's launch rate is 10/65, and Study's is 5/62.
- Study sub-templates (revise): order 8, schedule 10, recall 8, message 8, files 12, edit 10, spacing 1. Home views (revise): cloth 13, order 8, grid 7, geometry 4, volume 4, ruler 3, cord 3, fit 3, mechanics 3, route 2, diagonal 2, swing, bow, wobble 1 each.

**What the records say, in one line.** In about four revises out of five the shared shape is the cause, not the lesson's idea. There is a prediction nobody can get wrong (the answer is in the hook, the title or the option labels). The stage then shows only one side of the comparison, and a reveal reports a single number. The Resource lessons that launched avoid all three. They ask for a number, the misconception's number is an option, and both cases appear side by side.

**A defect nobody listed, found in the specs.** In 64 of the 70 Study specs the right answer is option 0. In 65 of the 69 Home specs it is option 1, the "after" layout. A learner who notices the pattern can predict without thinking. Fix TP-8 below.

## 2. Template work packages (build these first; each wave below names the ones it needs)

None of these touches `src/kit/`. All the shared code is under `src/components/lifehacks/` and `src/lib/lifehacks/`, which demo-builder owns. **If a builder finds that a fix needs `src/kit/` (controls, milestones, `Lesson.tsx`), it stops and routes to design-engineer (platform) with principal-engineer review.** `src/kit/Lesson.tsx` is protected and changes only by amendment.

| ID | Template | Change | Owner | Board | Needed by |
|---|---|---|---|---|---|
| **TP-1 (gate)** | Home | Selected-state styling must mark the tapped layout. It is inverted today (`ModeControl` in `a11y.tsx`, as used by `HomeLesson.tsx`). Five of the six domain-launch slate lessons carry it (domain-launch record, objection 6). | demo-builder; qa-tester re-runs W-1068 | W-1066, W-1068 | DLR slate, then waves 2-5 |
| TP-2 | Home | (a) After prediction, show **both** layouts' numbers side by side. Today the predicted layout shows "?" until the switch (`HomeLesson.tsx` result rows and `s.data`). (b) Replace the reveal line "The current X setting gives N" (`HomeLesson.tsx` reveal, the default branch) with a comparison: "A gives N, B gives M", plus the difference in words. (c) A slider must change the shown result in both layouts. If it does not, hide it for that lesson. (d) Take model-internal text off screen: seed numbers, `p=`, `loss=…mm/step`, formula strings, "study-conditioned model draws". (e) Show one "Your prediction held." or "Not quite.", never two. | demo-builder | W-1066, W-1070, W-995 | waves 2-5 |
| TP-3 | Study recall | The attempt row starts **empty**, not pre-filled with scrambled answers. The target is **covered** during the attempt. Choices come from a pool that includes plausible distractors, so a learner can actually miss. This is retrieval, not reordering what is on screen. | demo-builder | W-1070, W-1079 | wave 1 |
| TP-4 | Study schedule | The reveal reads the **final layout**. If it overlaps, the reveal says so with the overlap minutes and never prints "Your prediction held" over it: prediction verdict and layout state are two separate sentences. Readouts in words ("Due at 40 · finishes at 50"), not "Due40 50m". An overlapping plan never reports a normal finish. | demo-builder | W-1070, W-1079 | waves 1 (fragmented-time), 9 |
| TP-5 | Study order (queue) | Define "Wait" on the stage in words ("total waiting: each job's start time, added up"). Remove "Prereq" and "fixture" from learner text. When the right order has a worse Wait, the reveal says why: a deadline or dependency is the goal, not waiting. | demo-builder | W-1070, W-1076 | wave 9 |
| TP-6 | Study message / files / edit | Show the **artifact**: the two messages, links or files and what each produces, not a form that fills itself. Readouts name the item ("latest: report-v10"), never "3 order". | demo-builder | new item, not yet on the board | waves 9, 10 |
| TP-7 | Resource | (a) `resourceFormula` in plain words, without ceil, floor, min, max or sqrt ("rounded up to whole packs", "the smaller of", "corner to corner"). (b) Hide the "Full scale" label. (c) Money always to 2 decimals. (d) Make the prediction the launch pattern: ask for a number, with the misconception's number as an option (per-lesson lines below). | demo-builder | W-1064 (my half is the lines below) | waves 6-8 |
| TP-8 | all three | The correct option's position varies across lessons. Specs set `answer` explicitly, and none is always first or always last. | demo-builder | new item, not yet on the board | every wave |
| TP-9 | trust sheet | Worked examples in `recall` claims use the stage's numbers. Already on the board. Each wave closes its own lessons' rows. | fact-checker (align) or demo-builder (stage) | W-1073, W-1078 | every wave |

## 3. My content, done today and still to do

**Done today (W-1067, W-1071).** I rewrote `misconception` and `learner.doesNotKnow` in **140** `meta.json` files: 69 Home (generic "two pictured methods are interchangeable", with reveal text in doesNotKnow), 70 Study (option label as misconception, objective as doesNotKnow), and `alphabet-sort-search`. Each misconception is now a belief in a beginner's words. Each doesNotKnow is a knowledge gap ("that …"), not the reveal. The 60 Resource metas already state real beliefs (e.g. "The largest pack always has the lowest unit price") and were left alone.

- **Claims are not reset by this.** `misconception` and `learner` are not learner-visible. `src/lib/trust.ts` `PublicMeta` is an allow-list that excludes both. No claim's text changed.
- The spec files keep their own `misconception` strings (`studyCatalog.ts`, `resource-specs.json`). The UI renders neither. Builders may sync them to meta when they touch a spec, but nothing depends on it.

**Still mine, written below:** the prediction line for every kept lesson, with the hook, question and options. Builders implement these lines and do not reword them. A line that will not fit the stage comes back to me, and the builder does not improvise. **Every learner-visible text a builder changes resets that lesson's affected claims to `unverified`** (title, hook, question, options, reveal, recall). The fact-checker re-verifies them. Builders never mark their own.

**Rules every prediction line follows** (W-1064, decided once for all):
1. The hook is a question, and the hook, title and subtitle never state the answer. Titles that give it away are renamed (marked "title →").
2. Ask for a **number or an outcome**. The meta `misconception` is one of the options. So is one other plausible wrong answer where one exists.
3. Options are beliefs or numbers, never layout labels ("Spread flat", "Include handles").
4. Plain words. No flux, envelope, vapour pressure, g-equivalent, turning moment, ceil or floor on screen.
5. Numbers in brackets, like [N], come from the lesson's existing model. The builder fills them, and the option set must keep the misconception's number.

## 4. Retire or park instead of fixing

Recorded in `company/reviews/lifehacks-200/triage-r11-park-2026-10-15.md`. In short: **30 parked.** 5 have a premise problem: transparent-box-visibility, wetter-cloth-more-water, circle-tray-square-corners, lh-cents-euros-conversion (W-1074: below the adult-beginner boundary as written) and arrival-is-not-departure (merges into work-back-from-a-deadline). 25 are out of scope by the charter (office process, UI how-tos, shop stock): 22 revise and 3 unreviewed. All 30 go first at the next retirement review. `undo-then-redo` is parked. `work-back-from-a-deadline` is kept with a new premise (a chain of tasks).

**127 lessons to fix**, in the waves below.

## 5. Waves (10-15 lessons each, in priority order)

Three builder lanes can run in parallel, one per template, because each lane depends only on its own template packages. With one builder, run the waves in this order: **W1, W2, W6, W3, W4, W5, W9, W7, W10, W8**. Gate lessons come first. Then the open wave-1 strands (laundry, fix, storage, travel, study). Then the wave-2 strands (time, energy, shopping, digital). Kitchen comes last (wave 3; it does not publish from the DLR).

**After each wave:** qa-tester runs QA on the wave, the fact-checker re-verifies the reset claims and closes the wave's W-1078 rows, and learner-evaluator does an r12 walk (walkthrough first). Lessons whose stage changes in a load, door or cord drawing (heavy-book, weight-spread, wet-knit, tote-balance, door-swing, the cord lessons) also get a lifehacks-safety-reviewer re-look before r12.

**The DLR slate is not a builder wave.** packing-cube-walls, pillowcase-set-kit, shelf-front-labels, rolled-or-folded-volume, suitcase-rotate-block and rebuild-the-procedure need only TP-1, fresh QA (W-1081) and safety attestation (W-1082). TP-1 is therefore the first thing any builder does.

### W1: Study lane, gate (10). Needs TP-3, TP-4, TP-8.

| Lesson | Prediction line (cm content) | Stage fix from r11 (builder) |
|---|---|---|
| spaced-beats-cram | **Gate (W-1075).** Hook: "Three hours in one block or across three days: what changes a month later?" Ask: "Same three hours. Which plan scores better on a test the next morning, and which a month later?" Options: "Block both times" / "Block next morning, spread a month later" / "Spread both times" / "No difference: same hours". | Show the block ahead at the next-morning test (claim c5). B must differ from A in calendar only, with no extra recall step. |
| cover-before-recall | "You look at 'cue → answer' cards with the answers showing and get 3 of 3. Cover the answers: how many can you give?" Options: "3: I just saw them" / "Can't tell until you try" / "0". | TP-3. Show one covered miss. |
| note-gap-check | "Your note looks complete. Cover it and rebuild its three fields: how many do you expect to get?" Options: "All 3: it's all there" / "Can't tell until you try". | TP-3. The fixture has a field the learner tends to miss. |
| one-question-one-card | "Card: 'Capital, currency and language of Peru?' You answer two of three and mark it right. What did the card record?" Options: "That you know all three" / "A pass that hides a miss". | Show the compound card hiding the miss, beside three single cards that catch it. |
| reverse-the-flashcard | "You get 'perro → dog' right every time. Shown 'dog', can you give 'perro'?" Options: "Yes: same card" / "Not tested yet". | TP-3. Test both directions on stage. One direction fails. |
| separate-confusable-pairs | "Codes K-417 and K-471, both noted as 'grey cable'. Asked for the grey cable's code, how often do you pick the right one?" Options: "Always: I learned it" / "About half the time". | TP-3. Test the confusable case. Fix the miscount in the reveal. |
| explain-the-link | "You can list 'cloud, rain, puddle'. Asked 'why is there a puddle?', can you answer?" Options: "Yes: I know the words" / "Only if you learned the links". | TP-3. The order must not be guessable from common sense. Use an unfamiliar chain. |
| keep-the-error-feedback | "Two kinds of feedback after a wrong attempt: 'took 3 tries' or the item marked wrong. Which lets you fix it next time?" Options: "Either" / "Only the marked item". | Make the default attempt contain an error, so the marked mismatch appears. |
| check-confidence-with-output | Keep the question. | Cover the studied order until B is pressed (r11). |
| fragmented-time-does-not-fit | Hook: "Thirty free minutes in scattered gaps: will a 30-minute job fit?" Ask: "Gaps of 10, 10 and 10 minutes before minute 40. Does the 30-minute job fit?" Options: "Yes: 30 minutes free" / "No: it needs one 30-minute gap". | TP-4. Let the learner try the scattered plan and see it fail. |

### W2: Home lane, laundry drying (13). Needs TP-1, TP-2, TP-8.

| Lesson | Prediction line | Stage fix |
|---|---|---|
| towel-spread-dries-first | Title → "Fold it or spread it?" "Folded in quarters, the towel takes [N] hours in this model. Spread flat, how long?" Options: "[N]: same water" / "[N/2]" / "[N/4]". | TP-2. No "flux" or "doorway". |
| towel-over-two-bars | "Over one bar, the towel's two inner faces touch. Across two bars, how much more face is open to the air?" Options: "None: same towel" / "[x]" / "[2x]". | Draw the arrangements differently, and show the touching area. |
| garment-overlap-hides-face | "Two shirts overlap by [x] cm². How much cloth is hidden from the air?" Options: "None: both are out" / "[x]" / "[2x]". | Show the overlapped area. The slider must work in both layouts. |
| half-size-two-towels | "Cut a towel in half and hang both halves flat. How much face area now?" Options: "Double" / "The same" / "Half". | Show the one-piece and two-halves areas side by side. Draw the halves apart, not as a stack. |
| laundry-gap-air-path | "Ten shirts on a 1 m rail with gaps, or fourteen pressed together. Which load is dry first?" Options: "The fourteen: more drying at once" / "The ten" / "Same". | Garment count must be variable, so the trade-off is explorable. |
| humidity-evaporation-gap | "Same temperature. A room at 40% humidity and one at 80%. How much weaker is the drying push in the humid room?" Options: "No weaker: same warmth" / "[a bit]" / "[a lot]". No vapour-pressure words on screen. | **W-1074:** the slider must show the humidity the stage uses (it reads 72% while the stage uses 42%). Show the humid-side gap. |
| breeze-is-not-extra-surface | "Same towel, same cool air. Does a breeze make it dry sooner?" Options: "No: only warm air helps" / "Yes, about [N]× sooner" / "Only if the breeze spreads it". | The picture changes between still and moving air. No "flux". |
| towel-thickness-hidden-volume | "A double-thickness towel of the same size holds twice the water. How long does it take to dry?" Options: "Same time: same size" / "About twice as long" / "Four times". | Show both values. No ratio units. |
| folded-shirt-stack-height | "Five shirts folded once stack [h] cm high. Fold each once more. How tall now?" Options: "[h/2]: smaller shirts" / "[h]" / "[2h]". | Show the one-fold and two-fold heights side by side. |
| wet-knit-hang-stretch | Title → "Hang the jumper or lay it flat?" "A wet jumper holds about [w] kg. Pegged at two points, how much does each point carry?" Options: "Almost nothing: it's soft" / "[w/2] kg" / "[w/6] kg". | Show the two-point load. No "g-equivalent". The reveal answers the title question (the care label says dry flat). |
| care-label-first-choice | "The label says 'dry flat'. Hanging dries it in [a] h, flat in [b] h. Which do you pick?" Options: "Hanging: it's faster" / "Flat". | Show the speed trade-off and what ignoring the label costs, with the safety-approved wording. |
| drying-room-water-load | "Each wet shirt holds about [x] g of water. Twelve dry indoors. How much water goes into the room's air?" Options: "A few grams" / "[x] g" / "[12x] g". | The quantity in the title is the thing guessed. |
| square-bow-stays-tied | Title → "Flat bow or twisted bow?" "Two bows tied in the same laces: one lies across the shoe, one twists toe-to-heel. Which comes undone first?" Options: "The flat one" / "The twisted one" / "Neither: a bow is a bow". | Remove the debug line `loss=…`. One verdict sentence (TP-2e). The reveal says how to read your own bow. |

### W3: Home lane, laundry cords and socks, travel (12). Needs TP-1, TP-2, TP-8.

| Lesson | Prediction line | Stage fix |
|---|---|---|
| long-cord-knots-itself | Title → "Do long cords knot themselves?" "Strings were tumbled in a box for ten seconds. How often did 3 m strings come out knotted?" Options: "Almost never: nobody tied them" / "About half the time" / "Every time". | Name the experiment in plain words (who, what box, how long). Say the 20 strings are a simulation of its 55%. No "seed" or "p=". |
| group-cables-with-ends | "Three cords tied together in the middle, or with their ends tucked. Which tangles less in a drawer?" Options: "Middle tie: it holds them together" / "Ends tucked" / "Same". | No jargon in the question, and the options are beliefs, not layout names. |
| elastic-loop-release | "A hair tie is looped round a cord's end, and it looks knotted. What frees it?" Options: "Picking the knot apart" / "Sliding it off the end" / "Cutting it". | Draw a recognisable object. The slider must change the outcome, or hide it. |
| sock-pairing-by-pattern | "Twelve socks of three patterns in one pile. To find one sock's partner, how many socks do you check?" Options: "[pile]" / "[bin]". | Show the mixed-pile count. Fix the pictures so they no longer read the wrong way round. |
| sock-pairs-not-all-combinations | "Six plain socks, three pairs, no marks. How many different two-sock pairings could you try?" Options: "3" / "6" / "15". | Show the 15 pairings on stage. |
| laundry-sort-before-walk | "The machine is 8 m away. Ten items one at a time, there and back. How far do you walk?" Options: "16 m" / "80 m" / "160 m". | Show the one-item total. The count slider must change it. |
| fitted-sheet-corners-nest | "Fold a fitted sheet with its corners tucked into each other, or not. How much flatter is it?" Options: "Not at all: elastic always lumps" / "[x] cm flatter". | Draw nested corners, not reused cloth arrows. No "pocket envelope". Show the separate-corners figure. |
| shoes-opposite-ends | "Two shoes, [w] cm wide at the toe and [n] cm at the heel. How wide is the pair packed toe-to-heel?" Options: "[2w]: same shoes" / "[w+n]". | The toe-to-heel drawing must not overlap the shoes. No "envelope". |
| tote-balance-sides | "[a] kg on the left, [b] kg on the right. Move [c] kg across. Does the bag now hang straight?" Options: "No: the total didn't change" / "Yes". | Do not show "Left mass 3.2 kg" beside a 0 cm centre. Show the unequal result too (W-1076). |
| jacket-last-first | "You need the jacket first, the sweater next, the shoes last. Which goes into the bag first?" Options: "The jacket" / "The shoes" / "Order doesn't matter". | Draw a stack, and show the blockers for use-order packing. |
| suitcase-layer-access | "The rain jacket is under five items. How many do you lift to reach it?" Options: "0: it's in the bag" / "1" / "5". | Draw it as a stack, and show the bottom-target count. |
| socks-use-shoe-space | "Socks beside the shoe or inside it. How much packed volume do they add inside?" Options: "Same as beside" / "None". | Show the beside-shoe volume, and explain the slider's "no change", or hide it. |

### W4: Home lane, fix (13). Needs TP-1, TP-2, TP-8.

| Lesson | Prediction line | Stage fix |
|---|---|---|
| measure-diagonal-for-square | Title → "Is this frame square?" "Opposite sides are equal, 60 and 40 cm. One corner leans by [d]. How much do the two diagonals differ?" Options: "0: equal sides mean square" / "[x] cm". | Show the sheared diagonal difference, and say "measure corner to corner both ways". |
| measure-inside-not-outside | "Does a 37 cm insert fit a 40 cm box with 2 cm walls?" Options: "Yes: 37 is under 40" / "No: inside is 36". | Draw the collision. Do not label the outer width "opening" (W-1068). |
| spacer-protects-clearance | "Nominal: 40 cm item, 40 cm gap. Each can be 0.5 cm off. Will it fit?" Options: "Yes: the numbers match" / "Maybe not: up to 1 cm short". | Show the nominal figure, then the margin vanishing. |
| lids-match-by-size | "Same-colour lid, 9 cm. Jar opening 10 cm. Does it fit?" Options: "Yes: it's the matching lid" / "No". | TP-1. Draw an equal-size lid equal in size. The colour case must fail on screen. |
| resize-photo-frame-ratio | "A 4:3 photo in a square frame: stretch it to fill, or keep its shape?" Ask what happens to a circle in the photo: "Stays round" / "Becomes an oval". | Show the distortion, not just the empty area. |
| wrapping-paper-minimum-area | "A 30×20×10 cm box. How much paper covers it, before overlaps?" Options: "600 cm²: the base" / "2200 cm²: all six faces" / "1200 cm²: base and lid". | Show six faces, and show the footprint area. |
| drawer-divider-cost | "A 40 cm drawer, three 1.5 cm dividers, four equal compartments. How wide is each?" Options: "10 cm" / "[≈8.9] cm". | Show the ignore-walls figure beside the real one. |
| heavy-book-close-to-back | Title → "Front of the shelf or back?" "The same 2 kg book at the front edge or near the wall. How much harder does the front pull on the bracket?" Options: "Same: same book" / "[x]×". No "turning moment". | Show the far-from-back value. "Model; no safe load limit" stays. |
| weight-spread-on-table | "A 20 kg box on four small feet, or on a board. Does the board make the table carry less?" Options: "Yes, it spreads the weight off" / "No, same weight, less pressure per patch". | Show the small-footprint pressure, in plain units. |
| cm-to-inches | Title → "Is 2.5 close enough?" "A 200 cm curtain. Divide by 2.5 for inches: how far off is the result?" Options: "Nothing that matters" / "About 1.3 inches, more than 3 cm". | Show the rough result on the learner's path. |
| margin-before-cut | "A 20 cm face with a 2 cm fold on each side. How wide do you cut the blank?" Options: "20 cm" / "22 cm" / "24 cm". | TP-1. Show the finished-width blank coming out short. |
| tape-mark-same-spacing | "Ten marks, each step [e] cm off, measured from the last mark. How far off is the tenth?" Options: "[e]" / "[10e]". | Show the error growing with each mark. |
| wobbly-table-quarter-turn | "This square table rocks on an uneven floor. Without a wedge, what happens as you turn it, up to a quarter turn?" Options: "It rocks the whole way" / "It finds a spot where all four feet touch" / "It steadies only at exactly a quarter turn". | A continuous turn that shows the gap crossing zero, instead of the jump button. |

### W5: Home lane, storage (15). Needs TP-1, TP-2, TP-8.

| Lesson | Prediction line | Stage fix |
|---|---|---|
| alphabet-sort-search | "64 labels in alphabetical order. At most, how many checks find one?" Options: "64" / "32" / "6". | The target must not always be last. Test the halving, not just show it. |
| sofa-diagonal-room | "A 140 cm rod and a [w×h] cm floor space. Can it lie flat?" Options: "No: longer than the long side" / "Yes, corner to corner". | Show the along-edge result. Explain "margin" in words. |
| furniture-through-door | Title → "Will it go through?" "A 90×70×40 cm cabinet and a 75 cm doorway." Options: "No: 90 is wider than 75" / "Yes, narrow face first". | Hide the face answer before the prediction. Drop the volume idea from title and reveal, or show it. |
| trays-slide-out-reach | "A tray slides out [t] cm. How much shorter is your reach to the back item?" Options: "No shorter: it's still at the back" / "[t] cm". | Show the fixed-reach number. |
| mug-handle-packing | "8 cm mugs with 3 cm handles, handles all the same way, on a 36 cm tray. How many fit in a row?" Options: "4" / "3" / "2". | Show both counts. The slider must change the count. No "envelope". |
| shelf-gap-wasted-height | "Boxes [b] cm tall under a [g] cm gap. Lower the shelf, leaving [h] cm for your hand. How much height is freed?" Options: "None" / "[g−b−h] cm". | The Gap control and drawing agree. Do not call the hand allowance "unused". |
| small-items-in-mesh | "Ten small items washed loose vs in a zipped mesh bag. How many are still together, loose?" Options: "All: they went in together" / "[n]". | Show the loose result. Show that the mesh has to be finer than the items. |
| file-fold-see-each-shirt | "Eight shirts stacked flat in a drawer. How many can you see from above without lifting any?" Options: "8" / "about 4" / "1". | The stack drawing must hide the lower shirts. Show the visible count. |
| keys-fixed-drop-zone | "Six boxes and no usual place. At worst, how many do you open to find the keys?" Options: "1" / "3" / "6". | Show the unknown-box worst case and the put-it-back condition. |
| labels-specific-address | "Three boxes labelled 'Cables'. How many might you open to find the HDMI lead?" Options: "1: it says Cables" / "Up to 3". | Show the categories and the broad-category candidate count. |
| nested-box-retrieval | "Four boxes nested inside each other. How many come out to reach the innermost?" Options: "0: it's all one box" / "3". | Draw boxes inside boxes and show both counts. |
| duplicates-two-stations | "One stapler, two desks, you switch eight times. How many extra carries?" Options: "0: it's close by" / "8". | Show the shuttle cost on the path. The slider must change it. |
| door-swing-clearance | "An 80 cm door. How far from the hinge must the basket be for the door to open fully?" Options: "Just past the frame" / "40 cm" / "80 cm". | The slider must move the basket, not the basket with the door. Options are not answers. |
| flat-pack-volume-dimensions | "A 40 cm cube box made of 1 cm panels. Flat-packed, how much of its space does it take?" Options: "About the same" / "About half" / "About a seventh". | Show the assembled volume beside the flat stack. |
| rectangular-bin-nesting | Title → "Nest the bins or stack them?" "Five tapered bins, [h] cm tall, with [r] cm rims. How tall nested?" Options: "[5h]: same bins" / "[h+4r]". | Draw separate bins as separate. The title must match the stage. |

### W6: Resource lane, fix and water (10). Needs TP-7, TP-8.

| Lesson | Prediction line | Stage fix |
|---|---|---|
| lh-coverage-whole-cans | "The wall needs 2.3 tins of paint. How many tins do you buy?" Options: "2.3" / "2" / "3". | Show the jump from 2.3 to 3. Use "rounded up", not "ceil". |
| lh-each-cut-allowance | "Four shelves cut from one board, each cut losing 3 mm. Is one 3 mm allowance enough?" Options: "Yes: one allowance" / "No: one per cut". | Put the hook's question at stake, and answer it in the reveal. |
| lh-around-versus-across | "A 3×4 m room. Corner to corner is how far?" Options: "7 m: along two walls" / "5 m" / "3.5 m". | No sqrt on screen. Say "corner to corner". |
| lh-overlap-material-area | "Two 1 m² sheets overlapping by 0.2 m². How much area do they cover?" Options: "2 m²" / "1.8 m²". | Options are numbers, not labels. |
| lh-subtract-openings-area | "A 10 m² wall with a 2 m² window. How much paint area?" Options: "10 m²" / "8 m²" / "12 m²" (double-count trap). | The hook must not say "subtract". |
| lh-material-reuse-account | "A reusable cloth at €[c] vs paper at €[p] per use. After how many uses is the cloth cheaper?" Options: "Never" / "[n]" / "Straight away". | The reveal names the break-even at 12 uses. |
| lh-offcuts-not-one-piece | "Three 40 cm offcuts. Can you cut one 100 cm piece?" Options: "Yes: 120 cm in total" / "No". | Readouts in pieces, not centimetres. |
| lh-fixed-volume-fill | Title → "Does a slower tap save water?" "Filling a 10 L bucket slowly or fast. Which uses less water?" Options: "Slow" / "Same: 10 L either way". | The hook must not state it. |
| lh-flow-times-minutes | "8 L/min for 5 min or 12 L/min for 3 min. Which uses less?" Options: "The lower flow" / "The shorter one" / "Same". | Unequal durations, so duration can matter. |
| lh-small-leak-large-duration | "A tap drips 5 mL a minute. Per day, about how much?" Options: "0.3 L" / "7 L" / "70 L". | Ask about the size of the daily total, not day vs hour. |

### W7: Resource lane, energy and receipts (13). Needs TP-7, TP-8.

| Lesson | Prediction line | Stage fix |
|---|---|---|
| lh-water-meter-units | "The meter moved 1.5 m³. How many litres is that?" Options: "15" / "150" / "1500". | Remove "incorrectly" from the question. |
| lh-annual-label-cost | "The label says €[a] a year. Over 8 years, the difference between two fridges is?" Options: "[a1−a2]: the label's gap" / "[8×(a1−a2)]". | Show or state the year-on-year difference. |
| lh-duty-cycle-energy | "A 100 W fridge compressor runs a quarter of the time. Energy per day?" Options: "2.4 kWh: 100 W all day" / "0.6 kWh". | Test the rated-power-times-hours error. |
| lh-fixed-energy-charge | "Halve your usage. Does the bill halve?" Options: "Yes" / "No: the fixed charge stays". | The subtitle must not give the answer. |
| lh-same-energy-new-tariff | "Moving to a cheaper tariff: do you use less energy?" Options: "Yes" / "No: same kWh, lower price". | Test the belief in the title, not a price comparison. |
| lh-standby-days-add-up | "A 2 W standby all year. About how much energy?" Options: "Almost nothing" / "[≈17.5] kWh". | Take the unused price out of the caption, and give the slider a range that moves. |
| lh-deposit-checkout-net | Hook: "You pay a deposit at checkout. Does it cost you anything?" Ask: "€[x] deposit, refunded in full. Net cost?" Options: "€[x] more" / "Equal to no deposit". | The hook must not give the answer. |
| lh-free-shipping-gap | Hook: "Free shipping from €40: is adding an item worth it?" Ask about the extra spent. Options: "Saves the €[s] fee" / "Costs €[i−s] more". | Readout in words, not a formula. |
| lh-parcel-fee-repeats | "Three items in three parcels, €5 per parcel. Shipping?" Options: "€5" / "€15". | The per-parcel vs per-item distinction is at stake. |
| lh-pay-for-used-quantity | Hook as a question that does not state the answer. Keep the trap. | Hook rewrite only. |
| lh-split-order-fixed-fee | Keep the question. | Card B shows "24 + (4 × 1)". Fee lines on the receipts. |
| lh-two-for-one-boundary | Title → name the offer by its price: "Pairs for €4". "You buy 3. You pay?" Options: "€6" / "€8" / "€12". | Say "rounded up to whole pairs" and show the one-item case. |
| lh-voucher-minimum | "€28 basket, €5 off from €30. Add a €2 item: does your bill go down?" Options: "Yes, to €25" / "No". | The rule in words, not floor or min. |

### W8: Resource lane, shopping allocation and stock, kitchen (14). Needs TP-7, TP-8.

| Lesson | Prediction line | Stage fix |
|---|---|---|
| lh-capacity-batch-count | "21 items, 5 fit per trip. How many trips?" Options: "4.2" / "4" / "5". | Show a partial last batch costing a full trip. |
| lh-indivisible-shares | "10 cookies shared by 3. How many are left over?" Options: "0" / "1" / "3.33". | No "floor". Options are numbers. |
| lh-percentage-overage | Keep the question. | The reveal gives the full tie range (91 to 100). |
| lh-round-snack-packs | "23 children, packs of 6. How many extra snacks?" Options: "0" / "1" / "5". | The reveal states the extra. |
| lh-weighted-bill-share | Keep the question. | Show all three payments for each method. |
| lh-weighted-volume-allocation | "8 L split 2:1:1 across three trays. How many litres in tray one?" Options: "2.67" / "4" / "2". | Show all three trays and "8 × 2 ÷ 4". |
| lh-buy-only-stock-gap | "You need 6, you have 7. How many do you order?" Options: "6" / "0" / "1". | Show the case where stock covers the need. |
| lh-merge-overlapping-lists | "Two lists of 8 and 6 names, 3 on both. How many people?" Options: "14" / "11". | The hook must not give the answer. Ask for the count. |
| lh-round-replenishment | Ask for the number of packs to reorder, with the wrong method's number as an option. | Show the wrong method the reveal warns against. |
| lh-use-deadline-tickets | The tickets valid later are the ones you'd reach for first. "Which do you use today?" Options: "The nearest ones" / "The ones that expire first". | Draw one slip per ticket. |
| lh-duplex-sheet-rounding | "A 9-page document, printed double-sided. How many sheets?" Options: "4.5" / "5" / "9". | The odd-page rounding is at stake. |
| lh-jug-rounding-extra | "Need 2.2 L, 1 L jugs. How much is left over?" Options: "0" / "0.8 L". | The hook must not state it. |
| lh-area-scales-square | Title → "Twice the side, how much more to cover?" Options: "2×" / "4×". | Title and question must not say "four times". Kitchen: publishes only in wave 3. |
| lh-turn-container-volume | Title → "Does turning a box change what it holds?" Options: "Yes" / "No". | The hook must not state it. Kitchen: wave 3. |

### W9: Study lane, time (13). Needs TP-4, TP-5, TP-8.

| Lesson | Prediction line | Stage fix |
|---|---|---|
| work-back-from-a-deadline | **New premise (W-1077).** Three tasks (10, 15 and 20 min) in a row, due at minute 60. "Latest start for the first?" Options: "Minute 50: its own length" / "Minute 40: the longest" / "Minute 15: all three". | Work all three back. Readouts in words. |
| one-person-two-jobs | "Two 30-minute jobs on separate rows from minute 0, one person. When is everything done?" Options: "Minute 30" / "Minute 60". | TP-4: an overlapping plan never shows a normal finish. |
| reserve-an-unassigned-slot | "A fully booked hour, and an urgent 10-minute task arrives. When does the hour end?" Options: "On time" / "10 minutes late". | TP-4. The reserved slot receives the task. |
| meeting-and-preparation | "The presentation is at 30 and needs 20 minutes' prep. With nothing booked before it, are you ready?" Options: "Yes: prep fits somewhere" / "Only if prep is booked before 30". | TP-4. Show the calendar with prep missing. |
| estimate-a-range | "A 15-25 minute task, then a call at 20. Plan with 15: is the call safe?" Options: "Yes" / "Not if it runs long". | Show the optimistic plan and the long end. |
| fit-before-fixed-slot | "A 25-minute task and a call at 20 to 30. Free until 60. Where does it fit?" Options: "From 0, across the call" / "From 30" / "Anywhere". | TP-4. |
| include-the-wrap-up | "A call from 0 to 30, then 10 minutes of notes. When is the job done?" Options: "30" / "40". | Show how much a call-only plan understates the finish. TP-4. |
| batch-by-setup | "Six tasks, 2 minutes per switch, alternating vs grouped. How many minutes does grouping save?" Options: "0" / "[n]". | One clear switch count per order. Define Wait (TP-5). |
| choose-the-metric-first | Keep the question. | Remove the reveal's mention of prerequisites and animation that never appeared. TP-5. |
| dependency-before-priority | Put a "high priority" tag on the review. "Which runs first?" Options: "The high-priority review" / "The draft it needs". | Show priority on stage. Explain the Wait difference. |
| do-not-starve-the-long-job | Ask whether short-jobs-first meets the long job's deadline (options yes/no), without the numbers forcing it. | Explain the waiting trade-off in the reveal. |
| earliest-deadline-first | "Short job (5 min, due 30) or urgent job (10 min, due 10). Do quickest first: is anything late?" Options: "No" / "Yes, the urgent one". | Explain the Wait increase in plain words. |
| unlock-the-following-work | "A 2-minute input unlocks a 30-minute build. Polish (10 min) first or input first: when does the build finish?" Options: "Same either way" / "[10] minutes later with polish first". | **W-1076:** the Wait numbers contradict the reveal. Show the build's release time. |

### W10: Study lane, digital (14). Needs TP-6, TP-8.

| Lesson | Prediction line | Stage fix |
|---|---|---|
| file-type-then-owner | "Four files: two PDFs, two of Ana's, one both. Filter PDF, then Ana. How many?" Options: "4" / "3" / "1". | The "Ana only" control does what it says. |
| mail-exact-phrase | Show both queries. "blue folder vs \"blue folder\": how many messages does each find?" | Show the typed queries. |
| mail-minus-noise | "train -newsletter: does 'train draft' stay?" Options: "No, minus drops it" / "Yes". | Show the typed query. |
| mail-or-vs-and | "You want mail from Ana and from Ben. Which query?" Options: "Ana AND Ben" / "Ana OR Ben". | Name the two conditions on stage. |
| file-modified-not-created | "An old file edited today and a new file made last week. Sorted by created date, which is first?" (one-line rewording, per r11) | None beyond the question. |
| iso-date-filename-sort | "Sorted by name, which file comes right after 01-02-2026?" Options from the fixture. | The reveal names the out-of-order file. The readout names it too. |
| version-nine-and-ten | "Sorted by name: v9 or v10 first?" Options: "v9" / "v10". | The reveal explains character-by-character sorting. |
| size-is-not-recency | "Sorted by size, is the top file the latest?" Options: "Yes" / "Not necessarily". | The reveal names the latest file. No "3 order". |
| show-the-file-extension | "Two files named 'report', extensions hidden. Which is the PDF?" Options: "The first" / "Can't tell". | The format column hides when extensions hide. |
| tags-are-not-copies | "Edit the file under tag 'Tax'. Does it change under 'House'?" Options: "No, separate copy" / "Yes, one file". | Show the edit propagating. No "2 identities". |
| equal-names-not-equal-files | "Two files named report.pdf. Are they the same?" Options: "Yes, same name" / "Can't tell from the name". | Show the grouping visibly. Show the different contents. |
| shorter-folder-path | "Docs › 2026 › Tax › Tax-2026 › file. Remove the one-subfolder level: how many clicks fewer per visit?" Options: "0" / "1". | Say when removing a level is right. |
| duplicate-before-experiment | "You edit the only copy and it goes wrong. Can you get the original back?" Options: "Yes, always" / "Not unless you duplicated it". | Show the loss that duplicating prevents. |
| link-label-names-the-target | Show three links in a sentence: "click here", "here", "Report v3 sources". "Which opens the sources?" | Show the artifact, not a form (TP-6). |

## 6. What I believe, and how sure

- **High confidence** that TP-2, TP-3, TP-4 and TP-7(d) clear most revises. The same defect appears in the verdict reason of most records in each template, and the Resource template, which avoids it, launches.
- **Medium confidence** that my prediction lines are right in the bracketed numbers. Builders fill them from the model, and some models may give numbers that make an option implausible. If so, the line comes back to me.
- **Low confidence** that the waves fit any particular calendar. I do not know how many builders are available. The order is what I am sure of.
- Simulated reviews are not learning evidence. This plan uses them to find defects, not to show that anyone learned.

## Route and answers

| Step | Role | Answer | Where |
|---|---|---|---|
| 1 | cm-lifehacks | decided: content, park list, wave order | this file; `company/reviews/lifehacks-200/triage-r11-park-2026-10-15.md` |
| 2 | demo-builder | pending: accept TP-1…TP-8, or object | answer here |
| 3 | qa-tester / fact-checker / learner-evaluator | pending, per wave | their records |
| 4 | head-of-product | informed: W1 holds the wave-2 gate lesson; DLR slate needs TP-1 | answer here |

## Objections

| Objection | Raised by | Status |
|---|---|---|
| The founder landed all 200 PR #2 lessons, so parking 25 out-of-scope lessons undoes that. | anticipated (founder's PR #2 decision) | **Declined, with the cost stated.** Parking does not remove a lesson. All 200 stay on disk at `review`. The charter, written after the founder's decision, already puts these lessons first at retirement review. What parking saves is about two waves of builder, QA, fact-check and review time. If the founder or head of product wants them brought to launch quality, they become waves 11-12 (triage record, "This would be wrong if"). |
| 185 vs 188 reviewed: the plan's tally does not match the coordinator's. | coordinator message (batch 5 note) | **Accepted as a discrepancy, not resolved.** I count files on disk under the r11 filename. All 127 fixed lessons have a revise record on disk. The difference cannot add work the plan misses. |
| Builders should reword the hooks themselves while they fix the stage. It is faster than waiting for the category manager. | anticipated, demo-builder | **Declined.** The hook and options carry the misconception, which is my content. A builder who rewrites them grades their own prediction. Every kept lesson's line is written above, so nobody waits. A line that does not fit comes back to me, with no improvising. |
| Rewriting 140 metas without re-review is unchecked content. | anticipated, fact-checker | **Answered.** `misconception` and `learner` are not learner-visible (`src/lib/trust.ts` allow-list) and are not claims. The r12 learner walk reads the new boundary, so the evaluator can say if it is wrong. |
| Kitchen lessons (lh-area-scales-square, lh-turn-container-volume) are fixed although kitchen cannot publish. | anticipated, head-of-product (R2 of the domain-launch record) | **Accepted, so they are last (W8).** Fixing is cheap and they are Resource template. They wait for wave 3 to publish. |
| TP-8 (shuffle answer positions) changes every spec and resets nothing learner-relevant. Is it worth the churn? | anticipated, demo-builder | **Kept.** A fixed answer position is a hint, and 129 of 139 specs have it. Moving an option changes no claim text. It is done lesson by lesson inside each wave, never as one sweep. |

## This would be wrong if

- r12 learner walks of W1 and W2 still find "no believable wrong guess" after these lines. Then the problem is the concept list, not the template, and I go back to the briefs.
- the domain-launch slate fails on something other than TP-1. Then W1-W5 are reprioritised toward whichever wave-1 lessons can replace slate members.
