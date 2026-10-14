# Build note: Life Hacks engines v2 (W-608)

- **Builder:** demo-builder, 2026-10-14. Builds on the a11y fixes W-557..W-561 (commit c059581); none of them were undone (StageControl, StageStatus, useKeepFocus, the 11-12 px floors, the colour fixes and the Study non-colour cues are all still in place).
- **Spec:** company/design/specs/lifehacks-engines-v2.md. **Content:** company/reviews/lifehacks-200/content-patch-r9-batch-d.md (cm-lifehacks), applied as written, with the cue-needs-a-boundary **fallback** (the family move waits for W-610).
- Kept from evaluators until they report (role rule). Nothing built, nothing committed.

## What changed in code

| File | Change |
|---|---|
| `src/lib/lifehacks/engine-v2.ts` (new) | Pure helpers: named-variable expressions (`evaluateExpr`; same operators as `evaluateResource`, which is untouched), the R5 number format (`sig3`), Seen-table columns for Home and the four Study families, the R6 reveal sentence, and `homeV2Problems` / `studyV2Problems` (section 8 required fields). |
| `src/components/lifehacks/SeenTable.tsx` + `.module.css` (new) | The Seen table: A, B (and Yours), `?` until a column is seen, bold header plus `▸` and a visually hidden "(showing)" on the column in effect. |
| `src/components/lifehacks/a11y.tsx`, `a11y.module.css` | Added `ModeControl` (R1): `aria-pressed`, `aria-disabled` via `StageControl inactive` (focus kept, W-557), class `active`, 2 px `--fg` border, leading `✓` (aria-hidden), and `.inactive.mode.active[aria-disabled] { opacity: 1 }`. Existing exports unchanged. |
| `src/components/lifehacks/HomeLesson.tsx`, `.module.css` | `StageV2` behind `engine: 2` (not wobble, bow or cord): neutral start, DOM order A, B, slider, both columns live with the slider, v2 options, `minInteractions 2` with milestones `tested-a`/`tested-b`, reveal = R6 sentence + idea + limit (+ warning), no duplicated kit verdict. Picture marks: `dimension` (box: opening, body and both handles drawn to one 4 px/cm scale, handles always drawn, dimension line of the tested width, overlap hatched in `--bad` in mode B) and `radius-stripe` (circle). The v1 `Scene` gained one optional `v2` prop; v1 passes nothing, so v1 output is unchanged. |
| `src/components/lifehacks/StudyLessonV2.tsx` (new), `StudyLesson.tsx` | `StudyLesson` now routes `engine: 2` specs to the v2 stage and everything else to the old component (renamed `StudyLessonV1`, body unchanged). v2 families: schedule (event overrun drawn hatched from predict on, `parts` split bars, named clash pairs, Start slider → Yours), files (excluded rows struck through, dashed, "not in results"), message (`aFields`, consequence row), recall (A covers automatically, B checks the initial attempt, swaps → Yours; Cover and Check buttons gone). The two `cue-needs-a-boundary` slug branches in the v1 recall code were removed (patch block 12); no new slug branch was added. |
| `src/lib/lifehacks/home-models.ts`, `studyModels.ts` | Types only: optional v2 fields; `ScheduleSpec.button` became optional (buffer dropped it per the patch). |
| `src/lib/lifehacks/home-lessons.ts`, `studyCatalog.ts` | The 14 batch D specs (patch blocks 1-14), written in one pass by a script that refused to run unless the JSON round-tripped byte for byte. |
| `tests/lifehacks/engines-v2.test.mjs` (new), `study.test.mjs`, `typescript-loader.mjs` | 11 v2 tests (numbers typed from the patch tables, not recomputed); the apply-not-quote recall assertion follows patch block 7; the loader now resolves extensionless `./x` imports to `./x.ts` (engine-v2.ts imports models by value). |

## W-611 open shapes: what I chose (simplest that works; interaction-designer may change)

1. **Per-mode verdict:** `verdictByMode: { a?, b? }` (a word after that mode's number; coil "sharper" / "gentler") plus `resultText: { a?, b? }` (a literal that replaces the cell; bag A "looks fine (not weighed)"). `verdict.below` is optional; a `+` sign is shown only when `below` exists. A string amount gets its unit only after a trailing digit ("10 of 20 L", "not weighed").
2. **aFields:** `aFields?: number`, default 1 (deadline uses 2).
3. **Hidden target at predict:** `hideTarget?: boolean` on RecallSpec (apply-not-quote): the target row reads `? ? ?` until B. Without it the target shows at predict and is covered in A.
4. **optionToMode:** read as the patch reads it. The reveal's first sentence quotes the column `optionToMode[prediction]` first, then the other, then Yours only when it differs from both.
5. Smaller choices: `resultUnit` (coil "per cm" instead of the model's cm⁻¹); Home string cells are literal unless the string names a variable (`p a b c d`); R6 quotes the first amount row and the result row of each column (the second amount stays in the table).

## Departures from the spec, and why

- **Picture cap 200 px, SVG text 20 units** (spec: 170 px, 15 units). At 170 px reveal-fit flags the picture as a thumbnail (drawn at 66% of the stage width). 20-unit text lets the card's reveal fit shrink the picture to about 0.6 of its height while text stays at or above 10 px. Text is larger, never smaller. For the visual designer.
- **Caption inside the picture** for Home scenes that already carry labels (box, coil, desk): demo-standard fit order, step 2. Text-free pictures (bag, circle) keep the HTML caption, so the card may still shrink them to 40%.
- **Not built:** Resource v2 (section 5) and AlphabetSearch v2 (section 6). No batch D lesson uses them and Resource needs per-lesson `Demo.tsx` changes; a test asserts no Resource spec has `engine: 2`. Study order, edit and spacing families have no v2 stage yet (`studyV2Problems` reports it if one is switched on). Board W-738.
- **Not built (needs other owners):** the `npm run check` v1/v2 lint and the `\d+EUR` lint (tools/company.mjs is protected). For now `test:lifehacks` prints the 64 Home lessons still on default options (W-613) as a diagnostic. Board W-739 (platform-engineer).
- The predict frame: with the 200 px cap the Home stage is taller than the spec's 170 px estimate, so the locked buttons sit partly under the predict panel on a phone (the picture and the `?` table stay visible). Seen on box-handle-clearance.

## Measurements

- `npm run test:lifehacks` 64/64. `npx tsc --noEmit -p .`: clean in every file I touched. The only errors are in `src/app/hq/HQ.tsx` (another agent's open edit, `SetStateAction<1|2|3|4|5>` given a 6), not mine. `npm run check` passed (945 lessons).
- Browser probe on box, check-confidence, deleted and buffer: the mode in effect is `aria-pressed=true`, `aria-disabled=true`, computed opacity 1; the other is pressable at opacity 1; focus stays on the pressed button; the reveal unlocks after A then B; 0 console errors.
- Reveal fit at 390×844 (`REVEAL_FIT_TIMEOUT_MS=600000`, artifacts/reveal-fit/w608-v2.json, Home rerun in w608-v2-home.json): 14/14 pass the W-135 bar, namedHidden 0, thumb 0; **phoneFit 13/14**. coiled-cord-bend-radius crops 38 px: its reveal is 81 words against the Home cap of 55 (spec section 7), picture already at its text floor (133/200). Which sentence goes, or whether the limit moves to the caption, is cm-lifehacks's call (demo-standard). Board W-737.
- QA contract on dev :3530 (`--timeout=900000 --workers=1`, `QA_ONLY` = the 14): 28/28 lesson runs passed, phone and desktop (artifacts/qa-w608). The run's two feed-chip failures come from `QA_ONLY`: the chip test builds its allowed set from the filtered list while the feed shows all 200 Life Hacks lessons. v1 regression: towel-spread-dries-first, mug-handle-packing (Home), batch-by-setup, separate-confusable-pairs (Study) passed 8/8 (artifacts/qa-w608-v1).

## Claims

Every changed learner-visible sentence from the patch is recorded `unverified` with its support and source; checkedBy and checkedOn were removed from the reset claims. Each of the 14 also gets `lifehacks.<slug>.seen` (unverified): the engine's first reveal sentence, which is new learner-visible text (for Home, at the starting slider value; it recomputes live). Versions bumped by one. I marked nothing verified. Board W-740 (fact-checker). Visual check: W-741 (visual-designer).
