# Life Hacks engines v2: show the amounts, keep both results, mark the mode in effect

Owner: interaction-designer (Rafael) · 2026-10-14 · status: spec, not built
Builds on: `company/design/specs/lifehacks-batch-200.md` (rules 3, 4 and 5 still apply; this spec makes the engines meet them).
Answers: W-518 (template review), W-598 (toggle: ruled below), the engine half of W-599.
Hand-off: demo-builder (board W-608), **after W-557 to W-561 (a11y) land**. Another builder is editing these four engines now, and this spec touches the same lines (`StageControl`, the Resource buttons, the Home `.small` text, the Study status regions). Do not start v2 against a moving file.

This spec does not change what any lesson teaches. It changes what the stage keeps on screen and how controls show state. Content fixes (option wording, titles, hooks, recall) belong to cm-lifehacks lesson by lesson. They are listed in section 9 and are not engine work.

## 0. Evidence read

- r9 batch D learner reviews, `company/reviews/<slug>/2026-10-14-learner-adult-beginner-r9.md`, for agenda-needs-an-outcome, apply-not-quote, bag-weight-before-volume, box-handle-clearance, buffer-for-a-late-finish, calendar-needs-travel, check-confidence-with-output, circle-tray-square-corners, coiled-cord-bend-radius, count-setup-in-the-block, cue-needs-a-boundary, deadline-needs-a-reference, deleted-is-a-search-state, desk-supply-near-use. All 14 got revise.
- Demo crit `company/rituals/records/2026-10-14-demo-crit.md`, reusable lessons 1 ("draw the base, not only the result"), 2 (state must survive the QA path) and 6 (fix the shared template once).
- Board W-518, W-598, W-599.
- Code, read on 2026-10-14 while the a11y builder was editing it: `src/components/lifehacks/{HomeLesson,StudyLesson,ResourceLesson,AlphabetSearchLesson,a11y}.tsx`, `src/lib/lifehacks/{home-models,home-lessons,studyModels,studyCatalog,resource-model}.ts`, `resource-specs.json`, `src/kit/Lesson.tsx`, `src/app/globals.css`, `tests/qa/contract.spec.ts`, `tools/walkthrough.mjs`.

Engine to lesson count: Home 69 (`home-lessons.ts`, one model per lesson), Study 69 (`studyCatalog.ts`: schedule 13, files 15, recall 11, order 10, message 10, edit 10, spacing 1), Resource 60 (`resource-specs.json`, with buttons in each lesson's `Demo.tsx`), AlphabetSearch 1 (alphabet-sort-search). Batch D splits into Home 5 and Study 9.

Note on the task's glob: `src/lib/lifehacks/*-lessons.ts` matches only `home-lessons.ts`. The Study specs are in `studyCatalog.ts` and the Resource specs in `resource-specs.json`. Section 8 gives fields for all three.

## 1. Ruling on the mode toggle (W-598): it is a bug, not a hint

**Home (`HomeLesson.tsx` `Stage`, lines 123-124):**

```tsx
<StageControl locked={locked} inactive={!after} ...>{spec.choices[0]}</StageControl>
<StageControl locked={locked} inactive={after}  ...>{spec.choices[1]}</StageControl>
```

The control for the mode in effect gets `inactive`. `StageControl` turns that into `aria-disabled="true"`, and `a11y.module.css` styles `.inactive[aria-disabled="true"] { opacity: 0.5 }`. There is no `active` class and no `aria-pressed`. So the mode in effect is drawn dimmed, as if unavailable, and the mode *not* in effect is the only full-contrast (white, bold) button. The state and the readout are correct, because `after` drives both picture and result. Only the encoding is backwards.

It is not a deliberate hint. No code comment, spec or record calls it one. It breaks `lifehacks-batch-200.md` rule 3 ("An already selected choice is visibly *active* and disabled"). The global stylesheet already has the intended pattern, `.control.active:disabled { opacity: 1 }`, which Home never uses. The dimming predates W-557: before that fix the button was natively `disabled` and dimmed by `.control:disabled`. Screen readers get it wrong too: they announce the mode in effect as "dimmed/unavailable", never as "pressed". It shows up in all 5 Home lessons in batch D (bag, box, circle, coil, desk), and the reviews show learners reading it as the selection, which supports the wrong answer.

The QA path makes it worse. Playwright treats `aria-disabled` controls as disabled, and both `tests/qa/contract.spec.ts` and `tools/walkthrough.mjs` skip disabled controls. So on every Home lesson QA never presses mode A: A is "in effect" from the start, and its control is skipped. That is the mechanism behind finding 3: the losing option's result is on screen only in the moment between commit and the first tap, and no frame records it.

**Resource (`ResourceLesson.tsx` and each lesson's `Demo.tsx`):** not backwards. A tested case gets `disabled`, `aria-pressed` and the `active` class, so it renders tinted at full opacity. But the buttons say "Test A" and "Test B", not the case names, and once pressed they can never be pressed again. The highlight means "seen", not "showing", and the only sign of which case is showing is the result card border.

**Study (`StudyLesson.tsx`):** the same backwards encoding wherever a Study button is a mode rather than a one-shot action. Examples are the spacing view toggles A, B and "Month: both", the work-in-process "Whole jobs / 5-min turns", and files "Active only / Include trash", where after step 2 both are dimmed. One-shot actions (Add field, Test plan) are dimmed when done, which is fine for actions. The agenda review notes the "other button turns white", and it is harmless there.

**AlphabetSearch:** no mode controls; one-shot actions only. Not affected.

Owner of the fix: demo-builder, via this spec (section 2). QA (W-598) can close its question with this ruling. A regression check belongs in QA (section 10).

## 2. Rules for all four engines

R1. **Two kinds of stage button, never mixed.**
- *Mode button* (it puts one of the two compared cases on the stage). Before its first press it is outlined, with `aria-pressed="false"`. While in effect it gets `aria-pressed="true"`, `aria-disabled="true"` (StageControl `inactive`, so focus is kept per W-557) and class `active`: tinted fill, 2 px `--fg` border, full opacity, and a leading check mark `✓` (`aria-hidden`) as the non-colour cue. When the other mode is in effect it is outlined and pressable again. **A mode button is never dimmed.** CSS: `.inactive.active[aria-disabled="true"] { opacity: 1 }`.
- *Action button* (a one-shot step: Scan all, Swap, Finish). When done or not yet available it gets `aria-disabled` and opacity 0.5, as now. No check mark.

R2. **Neutral start.** At the start of explore, no mode is in effect (`mode = null`). Both mode buttons are pressable and both result cells read `?`. The picture shows the shared setup, drawn in A's arrangement with no result overlay. Pressing A is then observable on the QA path, and pressing B is observable after it. This keeps batch-200 rule 3 ("do not add an enabled control that merely reassigns the current state") and lets QA press each mode exactly once.

R3. **Seen table.** A two-column table, A | B, stays on the stage from the start of explore through the reveal. Each column fills the first time its mode is pressed and is never cleared. Rows: up to two *amount* rows (section 3), then one *result* row. The column for the mode in effect has a bold header and a `▸` marker, a second cue besides the button.

R4. **Amounts row.** Every number the reveal uses to explain the result is a cell in the Seen table, labelled in everyday words, with its unit. A legend such as `Body=40cm · handles=2×3cm` is not an amount. The amount is the number the legend makes you compute: `Width tested 46 cm`. The old `inputs` line goes, and its constants move into the amount label or the caption.

R5. **Results carry words.** A signed or unit-heavy result gets a short verdict next to the number: `−4 cm · too wide`, `+2 cm · fits`, `1 kg over`, `0.10 per cm · sharper`. No bare negative numbers, no `cm⁻¹`. Show three significant figures, so 1/22 does not round to the same value as 1/20.

R6. **The reveal quotes the table.** The engine's first reveal sentence names both columns: `{A}: {amount A}, {result A}. {B}: {amount B}, {result B}.` It never says "The current X setting gives Y", and it never repeats the kit's own verdict line (`Lesson.tsx` already prints "Your prediction held." / "Not quite: it was …"; Home currently prints "Not quite." twice). Reveal gate: both mode milestones (`tested-a`, `tested-b`); `minInteractions = 2`.

R7. **Predict options are not the button labels.** Today Home builds its options from `choices` (`[choices[0], choices[1], 'Same outcome']`), so a button named "Check mass" is also the right answer's wording. v2 reads `options` from the lesson spec when present (section 8). Writing them is cm-lifehacks's job (section 9). The engine supplies the field and stops forcing the leak.

R8. **DOM order = QA order.** Mode A, mode B, then the one exploration control (slider or swap). QA presses each button once in DOM order and moves each slider two steps. On that path both columns fill before the slider moves, so the slider visibly updates both columns (Home, Resource) or a third "Yours" column (Study schedule and order).

R9. **Stage text ≤ 25 words at any moment** (demo-standard). Column headers are the letters A and B, and the buttons carry `A · Body only` and `B · Include handles`, so each name appears once. Numbers and symbols are not counted.

## 3. Home engine (69 lessons)

### What the stage shows

| Phase | Picture | Seen table | Controls | Caption |
|---|---|---|---|---|
| Predict (locked) | Shared setup in A's arrangement; no result overlay; nothing that implies the outcome | Headers A, B; every cell `?` | A, B, slider: natively disabled | Safety or model line (unchanged strings) |
| Explore, nothing pressed | Same as predict | `?` | A and B outlined and pressable; slider enabled | Same |
| Explore, A pressed | A's arrangement with its result overlay (e.g. the 40 cm body inside the 42 cm opening, `+2 cm` gap marks) | Column A filled (amounts + result + verdict); B `?` | A active ✓; B outlined | Same |
| Explore, B pressed | B's arrangement (body + handles, overlap marked) | Both filled; B marked ▸ | B active ✓; A outlined (can switch back) | Same |
| Slider moved | Current mode's picture at the new input | **Both seen columns recompute live** at the new input: they are two functions of the same input, so they must not go stale | Unchanged | Same |
| Reveal | Stage unchanged (last mode, last input); table fully visible | Both columns | All remain; not disabled by the reveal | Same |

Special stages (wobble, bow, cord) keep their own presets but follow R1. BowStage's "Second: right-over-left" is a mode button. CordStage's "Test 0.3m / Test 3m" are already "seen" buttons and only need the check mark. None of the three is in batch D.

### Mockup (explore, after A then B, box-handle-clearance at a 42 cm opening)

```
┌──────────────── stage (322 px inner width) ────────────────┐
│  [picture, 170 px tall]                                    │
│   |<────────── 42 cm opening ──────────>|                  │
│      ┌─┬──────────── box 40 ─────────┬─┐                   │
│      │h│                             │h│  ← handles, overlap │
│      └─┴─────────────────────────────┴─┘    hatched in red │
│   "Showing B" (11 px, top-left in the SVG)                 │
├────────────────────────────────────────────────────────────┤
│                     A              ▸ B                     │
│  Width tested       40 cm            46 cm                 │
│  Clearance          +2 cm · fits     −4 cm · too wide      │
├────────────────────────────────────────────────────────────┤
│ [ A · Body only ]          [ ✓ B · Include handles ]       │
│   outlined, pressable        tinted, --fg border, pressed  │
│  Shelf opening  ───────●──────────────  42 cm              │
│  Model; measure the real outermost points (caption, 11 px) │
└────────────────────────────────────────────────────────────┘
```

Reveal first sentence (engine template): "Body only: 40 cm wide, 2 cm spare. Include handles: 46 cm wide, 4 cm too wide." Then `idea`, then `limit` (or `limit` folds into the caption if the fit budget needs it; section 7).

### The five batch D Home lessons: amount rows (data to add, numbers checked against `evaluateHome` with the spec's `initial`)

| Lesson | A / B | Amount rows (A ; B) | Result row (A ; B) | Note |
|---|---|---|---|---|
| bag-weight-before-volume (p = 4, values 2, 5) | Ignore mass / Check mass | Space used: *needs a fill figure* ; same · Total mass: `not checked` ; 2 + 4 = 6 kg | `looks fine` ; `1 kg over (limit 5)` | Volume never appears on the stage today, and the reveal opens with it. cm-lifehacks must add the fill figure (a new claim). Without it the volume half of the idea stays told. |
| box-handle-clearance (p = 42, values 40, 3) | Body only / Include handles | Width tested: 40 cm ; 46 cm | +2 cm · fits ; −4 cm · too wide | Picture: the 46 cm envelope gets a dimension line. |
| circle-tray-square-corners (p = 28, values 10) | First orientation / Rotate circles | Discs per row: 2 ; 2 | 4 discs ; 4 discs | Both columns are live, so at 30 cm both read 9. That turns the blocking "rotation gave 9" frame into "both 9". Picture: each disc gets a one-stroke radius mark that turns with the mode, so a rotation is visible. |
| coiled-cord-bend-radius (p = 10, values 200) | Chosen radius / Double radius | Cord per turn: 62.8 cm ; 126 cm · Turns: 3.18 ; 1.59 | Bend 1 ÷ r: 0.100 per cm · sharper ; 0.050 per cm · gentler | Slider label becomes "Base radius". Column B header gets "(2 × r)". |
| desk-supply-near-use (p = 4, values 6) | Across room / At work point | Trips × round trip: 6 × 8 m ; 6 × 0 m | 48 m walked ; 0 m walked | At 5 m, A reads 60 m and B 0 m, so the slider no longer looks dead. The predict picture's repeated dashed trips stay drawn in A's arrangement. |

## 4. Study engine (69 lessons)

Study fixtures are fixed lists, not functions of one input, so the Seen table holds **snapshots**: column A is option A's fixture state, column B is option B's. Where the family has an exploration control, a third column, **Yours**, is live. The reveal quotes A and B, and quotes Yours only when it differs from both.

| Family (n) | Mode A / mode B (each maps to a predict option via `optionToMode`) | Amount rows | Result row | Exploration control → "Yours" | DOM order |
|---|---|---|---|---|---|
| schedule (13) | A = `rows` (the draft) ; B = `target` | Engine default: "Gap before {movable}" (min). Plus `parts` (setup / work segments) when present, and `event` (a declared overrun) when present | Overlap (min), naming the pair: `5 min (travel × meeting)` | Start slider edits the movable row, starting from the mode in effect | A, B, Start slider |
| order (10) | A = `initial` order ; B = `target` order | "Finish of {first job}" | Wait / Late / Prereq or Switches (existing metric) | Swap first | A, B, Swap first |
| files (15) | A = operation step 1 ; B = step 2 (`button`, `button2`) | "Not in results": count | Matches / count (existing caption) | none | A, B |
| message (10) | A = first field only ; B = all fields | `consequence` row (literal strings, section 8) | Fields n/3 | none | A, B |
| edit (10) | A = step 1 ; B = step 2 | none by default | Existing token/focus/zoom result | none | A, B |
| recall (11) | A = unchecked or vague cue (option A's world) ; B = checked or bounded cue | `candidates` row when present ("Answers this cue fits: 3 ; 1") | Match n/3, live once checked | Swap 1↔2, Swap 2↔3 (after B is pressed, marks recompute on every swap) | A, B, Swap 1↔2, Swap 2↔3 |
| spacing (1) | Unchanged presets | Unchanged | Unchanged | Unchanged | Next morning, One month, Day slider, A, B, Both. Only R1 styling changes: the A, B and Both view buttons become mode buttons |

Family-specific stage changes:

- **schedule.** If the lesson declares `event`, the overrun is drawn from predict on as a hatched extension of that row, labelled "+5 late". Both plans are evaluated with it, so touching blocks show `Overlap 5 min` and the buffered plan shows `0 min` (buffer-for-a-late-finish's blocking finding). If a row declares `parts`, the bar is split and labelled ("setup 5 | work 10", count-setup-in-the-block). The overlap readout always names the clashing pair, so a slider-made clash (meeting × email) is not mistaken for the lesson's clash.
- **order.** "Run queue" becomes mode A. "Try target" becomes mode B. "Swap first" stays as the exploration action.
- **files.** A row excluded in the mode in effect keeps its name but is struck through and its value text reads "not in results" (a non-colour cue). It is no longer only faded to 0.33. Learners can still see the exclusion, and the "absent from the list" experience is now on screen (deleted-is-a-search-state).
- **message.** "Add {field}" ×2 is replaced by two modes, A (topic only, or date only) and B (all fields). The checklist still draws all three rows, with `?` for missing values in A. The `consequence` row is what makes the lesson more than form-filling. Its strings are content that cm-lifehacks writes (agenda: "Meeting ends with: no decision named ; a choice, owned by Bo"; deadline: a second reader's reading). The engine only renders the row.
- **recall.** Pressing the first mode covers the target automatically, so the separate "Cover" button goes (5 controls become 4). Mode A shows the attempt with the label "feels familiar" or the vague cue, and no marks. Mode B checks: the initial attempt `[2,0,1]` scores 0/3, so the mismatch the reveal promises is on screen before the swaps. The swaps then raise the score live. For apply-not-quote there is no cover, A is "any order with all three" and B is "rule: ascending". The two rows get visible labels, "target" and "your attempt" (11 px). "Local reconstruction" goes.

Mockup (buffer-for-a-late-finish, after A then B):

```
┌──────────────── stage ──────────────────────────────────────┐
│ One person · minutes                                        │
│ draft  ███████████████▒▒▒  0–20 +5 late                     │
│ call                 ████████████  20–35  (A)               │
│ notes                            ██████   35–45             │
│ 0 ─────────────────────────────────────────────── 100       │
├─────────────────────────────────────────────────────────────┤
│                    A           ▸ B           Yours          │
│ Gap before call    0 min         5 min         –            │
│ Overlap            5 min         0 min         –            │
│                    (draft×call)                             │
├─────────────────────────────────────────────────────────────┤
│ [ A · Touching ]   [ ✓ B · 5-min gap ]                      │
│ Start (call) ─────●───────── 25 m                           │
└─────────────────────────────────────────────────────────────┘
```

## 5. Resource engine (60 lessons)

The engine renders the two mode buttons itself (`ResourceStage`), so the 60 `Demo.tsx` files drop their hand-written `Control` pair and keep only `Lesson` + `ResourceStage` + `ResourceReveal`. That is the bulk migration, and it is also where W-557's `useKeepFocus` backstop becomes unnecessary. Coordinate with the a11y builder's version.

| Phase | Picture | Seen table (the existing two result cards) | Controls |
|---|---|---|---|
| Predict | Both panels drawn empty at the shared fixed scale; no fill | Card A, card B: label = `aLabel` / `bLabel`; value `?` | Mode A, mode B, slider: disabled |
| Explore, nothing pressed | Same | `?` | Both outlined |
| A pressed | Panel A filled; **receipt family draws labelled lines** (each amount row is a receipt line with its value text, 11 px), not blank strokes | Card A: amount rows + result with `resultLabel` | A active ✓ |
| B pressed | Panel B filled, same treatment | Both cards; B ▸ | B active ✓, A pressable again (shows A's panel outline at `--fg`) |
| Slider | Both seen panels update on the fixed scale | Both live | Unchanged |
| Reveal | Unchanged | Unchanged | Unchanged |

Changes:
- The button text is `A · {aLabel}` / `B · {bLabel}`, not "Test A" / "Test B".
- Card contents: `resultLabel` ("Cost per kg"), value, then 1–2 amount rows ("Price €6 · Mass 0.9 kg"). The `formula` line moves to the claims/trust sheet and leaves the stage. The amount rows carry the same numbers in words.
- `Full scale:€108` goes. The engine no longer rewrites `assumptions` with `replace("Scaled model;", …)`. If a panel's fill is to scale, the picture labels its top tick with the amount ("top = €108", 11 px), and the assumptions line drops "Scaled model;".
- One formatter for every learner-visible amount: currency prefix with no space (`€72`), other units after a thin space (`6 kg`, `0.9 kg`, `12 L`). The engine already does this for computed values (`resourceAmount`). Spec strings (`question`, `assumptions`, `details`) must match. The mixed `100EUR` / `€72` formats noted in W-518 are content strings: a lint in `npm run check` flags `\d+EUR` and `EUR\d+`.
- Reveal: `ResourceReveal`'s "At the prediction's …" sentence stays (it already quotes both cases at the start and at the current input). It gains the amount rows by name.

## 6. AlphabetSearch engine (1 lesson: alphabet-sort-search)

Already keeps both results (Scan n, Sorted m) and has no mode toggle. Changes are small:

- Amounts row: "Left after each check", e.g. `10 → 4 → 2 → 1`, drawn under the comparisons line. It replaces the `Comparisons: 5<7→right·…` code string with the same comparisons in words ("E before G: drop A–E").
- Labels: "disclosed target-last scan" goes from the reveal. The caption "Target: G · Shuffled" stays.
- DOM order stays: Count slider, Scan all, Compare, Finish. The slider must come first because it is disabled after Scan (a11y K4 "slider first" noted). QA path: slider two steps (8 → 10), Scan all (10), Compare (1 step), Finish (the rest).
- Question and options move out of the component into a spec object (or `meta.json`), so cm-lifehacks can rewrite them without code. The current pair "Halve sorted candidates / Scan shuffled labels" answers its own question ("rule out labels without checking every label").

## 7. Phone-fit budget at 390×844

Estimate from CSS (`globals.css`, the engines' modules), not measured. The builder confirms with `node tools/reveal-fit.mjs --width 390 --height 844` on the five Home and nine Study batch D lessons plus three Resource lessons, and quotes crop and hiddenBelow.

Card chrome: slot padding 56 top + 10 bottom → card 778. Card padding 24, head (tags 20 + title 24 + hook 21 + gaps ≈ 75; one-line title and hook), foot 24, gaps 16 → **card body ≈ 639 px**. With a two-line title and a two-line hook, ≈ 594 px. Stage inner width = 390 − 20 − 28 − 20 = **322 px**.

| Block (px) | Home | Study | Resource | AlphabetSearch |
|---|---|---|---|---|
| Stage padding | 20 | 20 | 20 | 20 |
| Caption | 14 | 14 | – | 14 |
| Picture | **170** (`.scene max-height: 170px`; viewBox stays 300×240, drawn 212 px wide) | 143 (320×142 viewBox) | 131 (320×130) | 97 (320×96) |
| Seen table | 68 (header 18 + 1 amount 20 + result 22 + pad 8); 2 amount rows: 88 | 68 (3 columns where Yours exists) | 96 (two cards: label 14, result 24, 2 amount rows 34, pad 14, border 10) | 34 (+ amounts row 18) |
| Mode / action buttons | 44 | 44; recall 2 rows = 94 | 44 | 44 |
| Slider | 46 | 46 (schedule) / 0 | 46 | 46 |
| Assumptions / safety line | in caption | – | 30 (2 lines) | – |
| Gaps (8 px) | 40 | 40 | 40 | 40 |
| **Stage total** | **402** (422 with 2 amount rows) | **375** (recall 377 with no slider) | **407** | **313** |
| Reveal panel left (639 − stage − 10 gap − 11 panel) | 216 → ≈ 9 lines | 243 | 211 | 305 |
| **Reveal word cap** (kit verdict line + why) | **55** | **60** | **55** | **70** |

Text floor: Home SVG text is authored at 300-unit width and drawn at 212 px (scale 0.71), so meaning-carrying SVG text goes to **15 units** (→ 10.6 px rendered) and `.small` to 14 (→ 9.9; decorative only, or `aria-hidden`). This supersedes W-559's 9 → 11 change for Home, which would render at 7.8 px under the new cap. The visual designer checks it (section 10). Study and Resource pictures are drawn at about 1:1, so their 11–12 px text holds. All controls stay ≥ 44 px. Never fix fit by shrinking text or targets. If a lesson's reveal exceeds its cap, its `limit` line moves into the stage caption first (demo-standard fix order).

Predict frame: panel ≈ question 44 + options 44 (52 if three options wrap) + Lock 44 + gaps ≈ 165–175 px, so the stage gets ≈ 455 px and every engine's stage fits. The Home `?` readout clipped in circle and desk at predict is fixed by the 170 px picture cap.

Stage words (R9, ≤ 25): Home example (box): buttons 6, table row labels 3, verdicts 3, slider label 2, caption 6, picture label 2 = 22. Study recall: buttons 6 (A/B) + 4 (swaps), row labels 4, result 1, caption 3 = 18.

## 8. Data fields (bulk migration)

Each engine reads `engine: 2` on a spec. Lessons without it render as today. Builders migrate in batches and the catalogue never breaks. `npm run check` (builder adds) lists v1 specs and v2 specs missing a required field. Every learner-visible amount or consequence string is a claim in that lesson's `meta.json` (support: the lesson's code for derived numbers), recorded `unverified` for the fact-checker.

Expression grammar: the existing `ResourceExpression` tree (`number | var | [op, ...]`), extended so that `evaluateResource(expr, env)` takes named variables. Home vars: `p` (slider), `a`, `b`, `c`, `d` (= `values[0..3]`). Resource vars: `x`.

### `HomeSpec` (`src/lib/lifehacks/home-lessons.ts`, 69 entries)

| Field | Type | Required in v2 | Default | Example (box-handle-clearance) |
|---|---|---|---|---|
| `engine` | `2` | yes | – | `2` |
| `modeLabels` | `[string, string]`, ≤ 16 chars each | no | `choices` | `["Body only", "Include handles"]` |
| `options` | `[string, string, string]`: same meaning order as now (A wins, B wins, same) so `answer` keeps its index | **yes** (content, section 9) | `[choices[0], choices[1], "Same outcome"]` (leaks; check warns) | written by cm-lifehacks |
| `amounts` | `Array<{ label: string; unit: string; a: Expr \| string \| null; b: Expr \| string \| null }>`, 1–2 rows | **yes** | – | `[{label:"Width tested", unit:"cm", a:"a", b:["+","a",["*",2,"b"]]}]` |
| `resultLabel` | `string` | no | `evaluateHome().label` | `"Clearance"` |
| `verdict` | `{ below: string; above: string; zero?: string; at?: number }`: words for result < `at`, > `at`, = `at` (default `at` 0) | yes when the result is signed or a threshold | – | `{below:"too wide", above:"fits", zero:"exact fit"}` |
| `revealLine` | `string` template; tokens `{A} {B} {amountA0} {amountB0} {resultA} {resultB}` | no | R6 template | – |
| `pictureMark` | `"radius-stripe" \| "dimension" \| null` | no | `null` | `"dimension"` (circle: `"radius-stripe"`) |

`inputs` (the computed legend) stops rendering in v2. Keep it in the model for the trust sheet. Unit test (builder): for every v2 Home spec, at `min`, `initial` and `max`, each amount evaluates to a finite number in each mode, and the reveal tokens all resolve.

### Study `Base` (`src/lib/lifehacks/studyCatalog.ts`, 69 entries)

| Field | Type | Required in v2 | Default | Example |
|---|---|---|---|---|
| `engine` | `2` | yes | – | `2` |
| `modeLabels` | `[string, string]` | **yes** | – | buffer: `["Touching", "5-min gap"]` |
| `optionToMode` | `("a" \| "b")[]`, one per predict option | **yes** | – | buffer (options "A five-minute gap", "Touching blocks"): `["b","a"]` |
| `amounts` | `Array<{ label: string; a: string \| number; b: string \| number }>`, literal (fixtures are fixed) | no | family default (section 4) | count-setup: `[{label:"Booked", a:"10 min", b:"15 min"}]` |
| `consequence` | `{ label: string; a: string; b: string }` | **yes for `message`** | – | written by cm-lifehacks |
| `exploreHint` | `string` | no | engine hint | – |

Family additions:
- `ScheduleSpec.event?: { row: number; minutes: number; label: string }`, e.g. buffer `{row:0, minutes:5, label:"+5 late"}`.
- `CalendarRow.parts?: Array<{ label: string; minutes: number }>`, summing to `duration`, e.g. count-setup `[{label:"setup",minutes:5},{label:"work",minutes:10}]`.
- `RecallSpec.candidates?: { a: number; b: number }`, e.g. cue `{a:3, b:1}`.
- `RecallSpec.rowLabels?: [string, string]` (default `["target", "your attempt"]`).

The hard-coded `refinement` map and the slug checks in `StudyLesson.tsx` (`"apply-not-quote"`, `"cue-needs-a-boundary"`, `"work-back-from-a-deadline"`, …) move into spec fields as each lesson migrates. No new slug branches in v2.

### `ResourceSpec` (`src/lib/lifehacks/resource-specs.json`, 60 entries)

| Field | Type | Required in v2 | Default | Example (lh-big-pack-price) |
|---|---|---|---|---|
| `engine` | `2` | yes | – | `2` |
| `resultLabel` | `string` | **yes** | – | `"Cost per kg"` |
| `amounts` | `Array<{ label: string; unit: string; a: Expr; b: Expr }>`, 1–2 rows | **yes** | – | `[{label:"Price",unit:"€",a:3,b:"x"},{label:"Mass",unit:"kg",a:0.5,b:0.9}]` |
| `scaleLabel` | `boolean` | no | `true` when the family draws to a fixed scale | – |
| `aLabel`, `bLabel` | existing; ≤ 12 chars | – | – | – |

`assumptions` must drop "Scaled model;" when `engine: 2` (lint). Remove the per-lesson buttons from each `Demo.tsx` as it migrates.

### AlphabetSearch

`{ question, options, answer, exploreHint }` move to a spec object, the lesson's own data. There are no other fields.

## 9. Not engine work: per-lesson content for cm-lifehacks (W-599)

The engine supplies the fields. cm-lifehacks writes the words. None of this changes what a lesson teaches, but it is the category manager's call, and a learning designer should review the recall items. Common causes:

- **Answer in the wording (finding 4).** The right option repeats the question's word ("includes" / "Include trash"), names the method that obviously detects the thing ("Check mass"), is the only exact one ("14 Oct 15:00 UTC"), or the title or hook states the idea ("A box is wider with handles", "Store it where the route ends", "Ten minutes of work plus five minutes of setup is a fifteen-minute booking"). Fix: ask for the outcome, not the method ("Does this box fit the 42 cm shelf?" Yes / No / Only just). Make titles and hooks neutral questions. Word all options at the same precision (demo-standard "No answer before the commit").
- **Recall answerable without the lesson (finding 5).** Several recalls are plain arithmetic once the numbers are given (bag 2 + 6, count-setup 10 + 20, desk 8 × 10) or common sense (check-confidence, cue, deadline, deleted). Fix: the recall needs the step the stage showed and the misconception skips. Examples: the envelope or round-trip doubling, or "which number would you check first". Do not ask for the sum the question already lays out.
- **The losing option needs a world (finding 3, content half).** The engine now shows column A, but some lessons have no honest A state to show: bag (no volume figure), deadline (no second reader), agenda (no consequence of a topic-only meeting), cue (a vague cue never tested). These need data. Engine v2 renders it once it exists.

| Lesson | Engine field to fill | Content fix (cm-lifehacks) |
|---|---|---|
| agenda-needs-an-outcome | `consequence`, `modeLabels`, `optionToMode` | Options at equal precision; hook states the idea ("A topic alone does not name the decision") → neutral; recall guessable by wording |
| apply-not-quote | `rowLabels`, `modeLabels` | The predict is a definition check ("is every arrangement ascending?"): needs a question that can be wrong for the misconception's reason; "quoting" undefined; locked stage shows 2, 5, 9 in order |
| bag-weight-before-volume | `amounts` (fill figure = new claim), `verdict`, `options` | Options leak ("Check mass"); title states the idea; recall is arithmetic |
| box-handle-clearance | `amounts`, `verdict`, `options` | Title states the idea; outcome question; reviewer judged the recall fair, keep it |
| buffer-for-a-late-finish | `event`, `modeLabels`, `optionToMode` | Hook "Which appointment absorbs it?" does not match the options; "A five-minute gap" echoes "five minutes of delay" |
| calendar-needs-travel | `modeLabels`, `optionToMode` | Option that includes the journey names it; hook leans; recall uses clock times the stage never used |
| check-confidence-with-output | `modeLabels`, `optionToMode`, `rowLabels` | "Observable local check" jargon; only one option says "checked"; recall is common sense |
| circle-tray-square-corners | `amounts`, `pictureMark`, `options` | Yes/no question with method options; title gives the answer; recall's second half (staggered rows) never shown, so drop it or show it |
| coiled-cord-bend-radius | `amounts`, `verdict`, `options` | Question answers itself (bigger loop is gentler): ask for the curvature ratio; title states the idea; "Chosen radius" unclear |
| count-setup-in-the-block | `parts`, `amounts` | Hook gives 15 minutes; locked stage labels "setup+work 0–15"; recall is addition |
| cue-needs-a-boundary | `candidates`, `modeLabels`, `optionToMode` | Hook gives the answer. Learning-designer question: a position-ordering task cannot show cue ambiguity even with `candidates`, so consider the files family (a lookup that returns 3 vs 1 matches) instead |
| deadline-needs-a-reference | `consequence` (second reader's reading = new claim) | Only exact option; "fixture" is builder language; recall is common sense |
| deleted-is-a-search-state | `modeLabels`, `optionToMode` | "includes / Include trash" echo; recall answerable from option names; "deleted-state flag" new term in the reveal; also has an unverified recall claim (status gate) |
| desk-supply-near-use | `amounts`, `options` | Question answers itself; title states the idea; recall needs the round trip, which v2's "6 × 8 m" row now shows |

## 10. Routing and checks

- **demo-builder** (after W-557 to W-561 land): engines v2 per sections 1–8, behind `engine: 2`; migrate the 14 batch D lessons first (Home 5, Study 9), then the rest in bulk. Run `npm run verify`; quote reveal-fit for the 14. Builders do not mark the new amount claims verified.
- **cm-lifehacks** (W-599): section 9 content, per lesson, into the new fields.
- **qa-tester** (W-598): close with section 1. Proposed regression check (needs a QA-contract amendment, since `tests/qa/` is protected, so it is a proposal only): after pressing a control with `aria-pressed`, that control must not have computed opacity < 1.
- **visual-designer**: the active-mode style (tint, `--fg` border, ✓) in light and dark mode, and Home's 15-unit SVG text at a 170 px cap.
- **mockup-artist** (optional): a 390×844 frame of the box and buffer mockups above, if the builder wants pixels before code.

What I am sure of: the toggle mechanism (read in code; it matches all five reviews). What I am less sure of: the phone budget (CSS arithmetic, not a measurement), and whether the neutral start (R2) reads as "nothing happened" to a learner in the first second after commit. The explore hint has to say "Press A, then B".
