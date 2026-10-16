# Decision: how the stage word budget counts (numbers, control labels, manipulated stimulus)

owner: head-of-product (Priya)
date: 2026-10-16
class: product craft rule (company-wide; craft guidance in `company/product/demo-standard.md`, not the QA contract section)
route: head-of-product decides craft rules in demo-standard.md (onboarding doc, "In scope"). `company/product/demo-standard.md` is **not** in `company/constitution/protected-paths.txt`, so the rule text is edited directly in this commit; no amendment is needed. Nothing protected changes (`src/kit/Lesson.tsx`, `tests/qa/**`, `tools/company.mjs` untouched).
recorded-by: head-of-product (subagent session, 2026-10-16)
status: decided. Board W-1212, W-1271. Confirms, with one addition, cm-behavioral's pending ruling (`company/domains/briefs/behavioral.md`, "Ruling: how the stage word budget counts here", commit 3b7fe48).
inputs read: `company/product/demo-standard.md` ("Text budget"), `company/domains/briefs/behavioral.md` (the pending ruling), `company/reviews/saved-or-die-same-600/build.md` (brief 4, stopped), `company/reviews/zero-loses-to-this-crowd/build.md` (brief 3, at 25), `src/kit/Lesson.tsx` (what is inside `data-testid="stage"`), `tools/reveal-fit.mjs` (how it counts reveal words), `company/decisions/2026-10-14-w513-demo-crit-pairs.md`, `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`.
not done: I did not walk either lesson or count from a rendered frame. The counts below are the builders' counts from their build.md, re-applied under this rule. Evaluators count from the artifact.

## Context

The craft rule says "Stage text ≤ 25 words at any moment" and never says what a word is. Builders of behavioral briefs 1-4 counted it differently, cm-behavioral wrote a reading for its own category and asked for confirmation, and brief 4 (saved-or-die-same-600) stopped because its four option texts are the framings the lesson manipulates: 33 words at the locked frame and 40 at the busiest frame (44 if the "in" of "1-in-3" counts). Brief 3 (zero-loses-to-this-crowd) sits at exactly 25 under the category's reading and about 40 if numerals count. The question is company-wide, because every lesson with readouts, legends or a text stimulus meets it.

What the budget is for: on a 390×844 phone in a 60-second lesson, told text crowds out the picture and the learner skims it ("A phone reader skims", a reviewer's note on an over-budget stage). The budget stands in for reading load and space. A rule that counts things a reader takes in at a glance (a numeral on a bar) pushes builders to move numbers into sentences; a rule that exempts whatever is convenient lets prose back onto the stage.

## Options considered

1. **Count every token, numerals included** (what `tools/reveal-fit.mjs` does for the reveal). Simple and mechanical. Rejected for the stage: brief 1 goes to about 36 and brief 2 to about 40 with no prose added; the overrun is all numeric legends, which the learner reads as part of the picture. It would punish labelled pictures, the thing the format wants.
2. **cm-behavioral's reading** (words count; numerals do not, in legends or in text labels; control labels count). Accepted as the base rule.
3. **Base rule, plus the manipulated stimulus counts in full.** Brief 4 cannot be built as briefed (non-stimulus text alone is 20, stimulus 24 more). A framing lesson whose stimulus is two short wordings would always need a re-layout, and the re-layout the builder proposes (show one wording at a time) breaks the "both rows read the same" picture the reveal points at. Rejected: it makes the lesson's own subject the thing the budget cuts.
4. **Base rule, plus stimulus exempt with no ceiling.** Rejected: "stimulus" would become the place prose goes. A framing lesson could carry 60 words of stimulus and still pass.
5. **Base rule, plus stimulus exempt from the 25 but declared in the brief, verbatim, and the whole stage under a 50-word ceiling.** Chosen.

## Decision

The stage is everything rendered inside the kit's stage (`data-testid="stage"` in `src/kit/Lesson.tsx`). Count at the busiest moment from the locked frame to the open reveal (the frame with the most visible stage text), and write the count in build.md.

1. **What counts as a word.** A whitespace-separated token that contains a letter. "at", "week", "Guess", "everyone's" are one word each. A hyphenated token counts once ("1-in-3" is one word, "two-thirds" is one word).
2. **Numbers do not count.** A token with no letters counts 0: numerals, amounts, percentages, signs and symbols ("52", "30%", "$100", "−4.2", "0 / 7"). A number fused to a unit or scale abbreviation also counts 0 ("$1M", "10m", "5kg", "3rd"). The words around a number still count: "$100 at week 52" is 2 words. This holds in a picture legend, a readout and a sentence alike. (This is cm-behavioral's points 2 and 3, made one rule.)
3. **Stage control labels count.** Button, toggle, chip and slider labels on the stage count like any other stage text ("Show the crowd" is 3; "Mark the 0 guess" is 3). So do captions, readout labels, axis and tick words, keys, covers ("Answer the first wording") and model glosses.
4. **Kit text outside the stage does not count toward the 25.** The title, hook, the predict question and its options (`predict.options`), the explore hint and the verdict line are rendered by the kit outside the stage. They have their own rules (no answer before the commit; equal precision). The reveal keeps its own 90-word budget, counted as `tools/reveal-fit.mjs` counts it (numerals included); this decision does not change the reveal count.
5. **Not counted because not seen:** screen-reader-only text and `aria-hidden` decoration (which must carry no words, `company/design/system.md`). Text under a cover is not counted; the cover's own words are.
6. **Manipulated stimulus is exempt from the 25, inside a ceiling.** Stimulus text is wording that is itself the variable the lesson manipulates and the reveal names: the two framings in a framing lesson, an anchor phrase, the two wordings of a question-order item. It is exempt from the 25 like a figure legend, on all of these conditions:
   - **The brief declares it, word for word.** The category manager names the stimulus strings in the brief (and the check script, if there is one). A builder cannot declare text to be stimulus. Setting, rules and instructions are not stimulus even when they are claim-bearing (brief 3's rule line "Simulated crowd, seed 2: …" is told context and counts; brief 4's caption "An outbreak is expected to kill 600 people" counts).
   - **The test:** if the lesson used different words here, would the reveal's claim change? If yes, it is stimulus. If the words only describe the case, they are not.
   - **Non-stimulus stage text stays ≤ 25 words.**
   - **All stage text, stimulus included, stays ≤ 50 words at any moment.** Above that the stage is a reading task, whatever its purpose, and the fix is a design one.
   - **The fit and legibility rules still bind in full.** Stimulus at 10 px or above, stage top and reveal end on screen at 390×844.
   - build.md reports both numbers: "stage N words (stimulus M, other N−M)".

### What a builder does when a brief is over budget

1. **Count before building.** Using the brief's own text, count the busiest frame under the rules above and put the table in build.md (`## Stage word budget`).
2. **The builder may shorten only its own words:** text the brief did not fix and that carries no claim (a control label it chose, a cover line, a key word). It may not trim claim-bearing text, declared stimulus, or anything the brief gives word for word. It may not shrink text or tap targets to make room, and may not move stage text into the kit's hint to dodge the count.
3. **If it is still over** (other text > 25, or total > 50): write "Stage over budget: N words" with the table in build.md, do not build or set status to review, and route it: cm-<domain> decides which brief text goes (as with the reveal, which teaching sentence goes is the category manager's call); the learning designer takes a re-layout if cutting is not enough; then a revision build. Ask the chief of staff for the board item; do not hold the claim lease silently.
4. **Evaluators count from the artifact,** not from build.md. A stage over budget is a finding (not fatal by itself if the fit test passes on a published lesson, which is not reopened for word count alone; it binds new lessons and every new version, as before).

### Applied to the lessons that asked

- **Brief 3, zero-loses-to-this-crowd: passes at 25** (rule line 18 + "Guess" 1 + "Show the crowd" 3 + "Mark the 0 guess" 3; numerals 0). Nothing in it is stimulus. Unchanged; at the limit, so any added stage word (for example "target" on the picture) puts it over and goes to cm-behavioral.
- **Brief 4, saved-or-die-same-600: unblocked, provided cm-behavioral declares the four option texts (and, if shown, their toggle restatements) as stimulus in the brief.** Under this rule: other text = caption 10 + toggle 6 + cover 4 = 20 ≤ 25. Total at the busiest frame = 44 counting "1-in-3" as one word each, ≤ 50. If the toggle shows the restatement **beside** the original die wording rather than in place of it, the builder recounts; over 50 is a stop.
- **Briefs 1-2: unchanged.** cm-behavioral's counts (15 and 25) stand; their overrun under "numbers count" was all numerals, which do not count.

## Rests on

- The purpose stated in demo-standard.md (the 60-second phone fit) and the fit rule's ordering (cut told context first), `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`.
- The builders' counts in `company/reviews/saved-or-die-same-600/build.md` and `company/reviews/zero-loses-to-this-crowd/build.md`; cm-behavioral's counts for briefs 1-2.
- **The 50-word ceiling has no local evidence.** It is a judgement number: twice the base budget, enough for brief 4's two framings (44) and not for a paragraph. Treat it as a guess to be tested, not a finding.

## Revisit if

- A demo crit or learner note says a stage within these rules was skimmed or unreadable on a phone because of numerals (for example, a stage of 20 words and 30 numbers). Then numerals need a cap of their own.
- A lesson with declared stimulus between 26 and 50 total words gets learner data: if commit or 7-day recall for stimulus lessons sits below the feed median while other behavioral lessons do not, lower the ceiling or count stimulus.
- A brief declares stimulus that fails the test in point 6 (wording that does not change the claim). Then the declaration needs a second signer (learning designer), not just the category manager.
- `tools/reveal-fit.mjs` gains a stage word count (requested below). Its numbers replace hand counts, and any disagreement with this text is fixed here, not in the tool's favour by default.

## Objections

| Objection | Raised by | Kind (evidence/purpose) | Status |
|---|---|---|---|
| If numbers count, briefs 1-2 go to about 36 and 40 and need a re-layout; numbers written as cell legends are picture labels, not sentences. | cm-behavioral (`company/domains/briefs/behavioral.md`, ruling point 2; the learning designer's brief-1 note) | purpose | **Accepted.** Numerals count 0 everywhere on the stage (point 2). Briefs 1-2 do not change. |
| The option texts are the frames, and the frames are what the lesson manipulates; they cannot be turned into legends or cut by a builder, so the stage cannot reach 25. | demo-builder-beh4 (`company/reviews/saved-or-die-same-600/build.md`) | purpose | **Accepted, with a ceiling.** Declared stimulus is exempt from the 25; non-stimulus ≤ 25 and total ≤ 50. The builder's alternative (one wording at a time) was not needed and is not chosen, because it would change the picture the reveal points at. |
| Exempting stimulus invites prose: any text a brief calls stimulus leaves the budget. | head-of-product (own objection while deciding) | purpose | **Accepted, answered by conditions:** only the brief declares stimulus, word for word; the "does different wording change the claim" test; a 50-word total ceiling; fit and floor still bind. If a declaration fails the test, the revisit trigger adds a second signer. |
| A count where numerals are free could let a stage fill with numbers. | head-of-product (own objection) | evidence | **Open, funded by the revisit trigger** (first crit or learner note naming a numeral-crowded stage). The fit and legibility rules are the guard until then. No numeral cap now, since there is no local case. |
| Brief 3 at exactly 25 leaves no room for picture words ("average", "target"); evaluators may find the numerals unreadable without them. | demo-builder (builder-beh3, `company/reviews/zero-loses-to-this-crowd/build.md`) | evidence | **Not a budget question; routed.** Brief 3 passes. If evaluators find the picture unreadable, which word goes from the rule line to make room is cm-behavioral's call (the rule line is claim-bearing, c3). The budget is not raised for it. |
| Using the stage rule's numeral exemption while the reveal counts numerals is inconsistent. | head-of-product (own objection) | purpose | **Rejected because** the reveal is prose read in order, and its 90 is measured by a tool today; changing its count would move every published reveal-fit number for no learner-facing reason. The two budgets measure different things and say so in demo-standard.md. |

## Ruling 2 (2026-10-16, round 5): units after a space, coordinates, chemical formulas

asked by: cm-physics (r3 A4, r5 A3 and objection 1), cm-math (r5 A5), cm-geography (r5 A4 and objection 2), cm-chemistry (r5 A4 and objection 1). Board: the asks are on the lanes' batches; no W-id of their own. Recorded in head-of-product's round-5 batch (`company/ops/dispatch-requests/2026-10-16-r5-product.md`, item R1).
inputs read: the four lanes' r5 batches (objection and ask lines above), the `Stage word budget:` lines in `company/domains/briefs/physics.md` (#64-70), `geography.maps-projections.md`, `chemistry.matter-reactions.md` and `chemistry.solutions-acids.md`. I did not count any rendered frame.

The test behind all three: a token counts 0 when it belongs to a number and is read with it at a glance; it counts 1 when it names a thing or says something the learner has to read as a word. Point 2's reason (numbers are part of the picture) is the reason here too. It does not extend to names.

**(a) A unit after a space counts 0.** A unit symbol or standard abbreviation directly after a number counts 0 with that number, with a space or without: "60.6 kg", "55 km", "400 km²", "7 h", "30 °C", "0.030 mol/L", "25 mL", "10 ns" all count 0, the same as "10m" and "5kg" under point 2. SI style puts the space in, and a rule that charges for it would push builders to write "60.6kg", which is wrong typography for the same reading load. Three limits:
- A unit standing alone, not after a number, counts 1: an axis or scale title "nm", a thermometer's "°C", "(km)".
- A spelled-out unit counts 1, after a number or not: "36 degrees", "5 hours", "kilograms". The learner reads it as a word.
- A quantity symbol in front of a number is a label and counts 1: "pH 4", "n = 2", "x = 3".
- Count the rendered frame. A readout template "X km" counts 0 for "km" when X renders as a number.

**(b) A coordinate counts 0.** "49°N", "49° N", "66.6°S" and "120°W" are one number with its hemisphere letter. They count 0, like a fused unit. A hemisphere letter after a spelled-out "degrees" also counts 0, and "degrees" counts 1 (so "49 degrees N" = 1). A compass word on its own ("north", "N" as a map arrow label) counts 1.

**(c) Chemical formulas and element symbols count 1 each. The strict reading binds.** "H2O2", "CO2", "H2", "OH−", "H+" are names of substances, not quantities. A novice has to decode each one, and "H2O2" is no lighter to read than "peroxide". An element symbol in a tally row or a chip ("H", "O", "Li (3)") also counts 1, because it names what the number counts. The number in it counts 0. A formula is still the cheap way to write a name: "H2O2" is 1 word, "hydrogen peroxide" is 2. Exempting formulas would let a chemistry stage carry twenty names for free, which is the numeral-crowding case this record already leaves open, made worse. Subscripts and coefficients do not add a word ("2 H2O" is 1).

**What changes.** Nothing needs a rebuild, because every brief named gives both totals over a closed list. In physics, math and geography the lenient total (spaced units and coordinates at 0) now binds. In chemistry the binding total counts formulas and symbols at 1 and spaced units at 0. Where a chemistry line gives only "strict" and "formulas at 0", the builder takes the strict total and subtracts the spaced units. matter-reactions #5 stays at 25, so it has no slack. One exception runs the other way: a spelled-out unit that a brief's lenient total put at 0 counts 1 (geography maps-projections, the wedge label "36 degrees missing" is 2). A brief that said "Stage over budget" only because of spaced units or coordinates is no longer over, and its category manager says so on the brief's line before it is built. Builders and evaluators count the artifact as before.

**Revisit if:** a crit or learner note says a stage was hard to read because of unit symbols the learner did not know (then unfamiliar symbols count, or the brief must gloss them). Or a chemistry brief cannot reach 25 without removing a formula the reveal's claim needs (then a formula-heavy stage goes to the learning designer for re-layout, as with any over-budget stage, and the rule is looked at again with that case in hand).

### Objections to Ruling 2

| Objection | Raised by | Kind | Status |
|---|---|---|---|
| A unit after a space costs physics stages a word per unit that "10m" does not. SI style requires the space. | cm-physics (r3 objection 2, r5 objection 1); joined by cm-math (r5 A5) and cm-geography (r5 objection 1) | purpose | **Accepted.** (a): a unit symbol after a number counts 0 with or without a space. The trims in physics #64-70 stay, because the lists are closed and a trim the builder no longer needs does no harm. |
| "49°N" is a number fused to a hemisphere letter, so it should count 0 like "10m". | cm-geography (r5 objection 2) | purpose | **Accepted.** (b). |
| A formula is closer to a picture label than to prose, so the numeral exemption should cover formulas and tally symbols. | cm-chemistry (r5 objection 1) | purpose | **Rejected because** a formula names a substance that the learner has to decode, and a tally symbol names what is counted. Point 2 exempts quantities, not names. Exempting names would also leave chemistry stages with no budget on exactly the tokens that are hardest for a novice. Cost accepted: matter-reactions #5 sits at 25. If a needed formula cannot fit, the over-budget route applies (category manager, then learning designer), and the revisit trigger above reopens the rule on that case. |
| (Mine.) Making unit symbols free may push builders to abbreviate units a learner does not know ("u", "pm", "atm"). | head-of-product | evidence | **Open, held by the revisit trigger** (first crit or learner note naming an unread unit symbol). Until then, the claim and legibility rules are the guard: a unit the reveal depends on must be one the lesson can stand behind. |
| (Mine.) It is inconsistent that "kg" counts 0 while "H" counts 1. | head-of-product | purpose | **Rejected because** the test is not the letters but the job: a unit tells you about a number, a symbol names a thing. The test is written above so that an evaluator can apply it to a token this ruling does not list. |
