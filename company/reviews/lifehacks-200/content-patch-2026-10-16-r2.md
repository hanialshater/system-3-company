# Content patch r2: FC52/FC38 disputes, and the hooks and titles that hint answers (W1, W2, W3, W9)

- **Author:** cm-lifehacks (Tess), 2026-10-16. Batch item B1 of company/ops/dispatch-requests/2026-10-16-r2-lifehacks.md. **Status:** patch, not applied. I edited nothing under `src/`.
- **Board:** W-1179 (FC52 disputes), W-1106 (FC38 c8), W-755, W-1118 (Study W1/W9), W-1109 (Home W2), W-1192 (W3 hint list), W-1088 (the brief-2 amendment, done in company/domains/briefs/lifehacks.md).
- **Who applies it:** B4 (demo-builder, branch lhfix-r2) applies the section **"merged (W1, W2, W9 + disputes)"**. The **"lhw3 (W3)"** section is applied by the W3 builder on lhw3 after it merges. B4 does not apply it (B4 stop-if).
- **Inputs read (2026-10-16):** the five FC52 records `company/reviews/<slug>/2026-10-16-fact-check.md`; `lh-fixed-energy-charge/2026-10-14-fact-check.md` pass 51 c8; `check-confidence-with-output/2026-10-14-fact-check.md` (every pass); r11 fix plan §3 and §5; `studyCatalog.ts`, `home-lessons.ts`, `home-models.ts`, `resource-specs.json` and each lesson's `meta.json` on the main checkout; the W3 specs and metas read-only from /home/user/s3c-lhw3 at 5d9de52; the W1/W9 and W2 merge commit messages (d82ea40, b5ee4ca) for the lines that did not fit. To fit the lines to the models, I ran the engine's own `queueObservation`, `scheduleObservation` and `queueResult` on the fixtures (numbers quoted below).
- **Simulated reviews are not learning evidence.** This patch fixes wording that fact-checks and simulated readers flagged. It shows nothing about what anyone learned.

## Rules this patch follows

1. The fix plan's line rules (§3): the hook is a question, and the hook, title and subtitle never state the answer. Ask for a number or an outcome. The meta `misconception` is one of the options. Options are beliefs or numbers, never layout labels. Plain words: no flux, vapour pressure, normalised gap, turning moment or ratio units.
2. **The hook is no longer a copy of the question.** In most of these lessons the builder set the hook to the question, or to the question's first sentence, until I supplied one. Each hook below sets the scene in under 90 characters. Titles stay under 40 characters (tests/lifehacks/study.test.mjs and resources.test.mjs pin both limits).
3. **Claims.** Every changed learner-visible string resets the claim that quotes it to `unverified`. The claim column names that id. In Study lessons, `c1` quotes the hook, question and options. In Home lessons, `c4` quotes the title, hook, question and options. In this Resource lesson, `c7` is the hook and `c8` is the question. A Study title that is quoted by no claim is marked "none". B4 still resets nothing it did not change, and nobody marks a claim verified except a fact-checker.
4. **Field paths.** S = `src/lib/lifehacks/studyCatalog.ts`, the export for that slug. H = `src/lib/lifehacks/home-lessons.ts`, the entry with that slug. R = `src/lib/lifehacks/resource-specs.json`. M = `src/demos/lifehacks/<slug>/meta.json`. Where a field exists in the spec and in M (title, hook, recall), change both to the same text (tests/lifehacks/engines-v2.test.mjs checks `meta.title === spec.title` and `meta.hook === spec.hook`).
5. **[N] numbers.** I computed every number below from the lesson's existing model. A builder who gets a different number from the engine stops and sends the row back to me. They never reword it.
6. **TP-8.** Where I reorder options, the `answer` index changes with them. It is given in each row.

---

## Section 1: merged (W1, W2, W9 + disputes). B4 applies this.

### 1A. The disputes that block publishing (W-1179, W-1106, W-755)

#### unlock-the-following-work (FC52 c1 disputed; W-1118 title)

The dispute: "Swap first" turns polish→input→build into input→polish→build, which is also "input first", and the build is still done at minute 42. My fix names the two orders the stage compares, so the keyed answer is the only true one. No model change: the engine already gives polish→input→build = 42 and input→build→polish = 32 (`queueObservation`, own run, and the verified c4).

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| S, M | `title` | `Start the blocking input` | `What holds up the build?` | none |
| S, M | `hook` | `A 2-minute input unlocks a 30-minute build.` | `A 2-minute input unlocks a 30-minute build. What should you do first?` | c1 |
| S | `question` | `A 2-minute input unlocks a 30-minute build. Polish (10 min) first or input first: when does the build finish?` | `Polish (10 min), then the input, then the build: the build is done at minute 42. Input, then build, then polish: when is the build done?` | c1 |
| S | `options`, `answer` | `["Same either way", "10 minutes later with polish first"]`, 1 | `["Minute 42: same jobs, same finish", "Minute 32"]`, 1 | c1 |

c1's text is rewritten to the new hook, question and options, with "Correct option: Minute 32". The fact-checker should also confirm that the reveal's goal sentence ("build done sooner (minute 32, not 42)") still matches. It is not changed here.

#### keep-the-error-feedback (FC52 c3 disputed)

The dispute: after "Try again", the two chips stay on the stipulated first try while the caption shows the new try, so the stage shows "3 tries" and "4 tries · open" at once. The fact-checker gave two fixes. I choose the words fix: the chips are the comparison the lesson is about (what each kind of feedback told you after the first wrong try), so they should stay on the first try and say so. No model change.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| `src/components/lifehacks/RetrievalLesson.tsx`, FeedbackStage `Chips` items | chip labels | `Count only` / `Marked` | `First try, count only` / `First try, marked` | c3, c4 |
| M | `claims[c4].text` | (c4 says nothing about the chips) | append: `The two chips report the first try: “First try, count only” shows “3 tries” and “First try, marked” shows “1 wrong”; the caption and feedback line show the latest try.` | c4 |
| S, M | `title` | `Keep the correction` | `Which feedback helps?` | none |
| S, M | `hook` | `Two kinds of feedback after a wrong attempt: 'took 3 tries' or the item marked wrong.` | `A wrong try at a bike lock. Which kind of feedback helps you get it right?` | c1 |

The chip labels live in shared code. Only one catalog entry uses `retrieval.kind: "feedback"` (I counted: 1), so the change reaches this lesson only. B4 should confirm that count before editing. "Count only" is also the mode button's label (c4: "“Count only” shows “3 tries · still locked”"). Only the **chips** change; the buttons keep their labels, because they name what the learner picks.

#### breeze-is-not-extra-surface (FC52 c4 disputed; prediction line is mine)

The dispute: the key "Yes, about 2× sooner" gives the learner credit for a number that is the card's own setting (flux 2 against 1). I take the fact-checker's second fix: the key is the outcome, and the 2× stays on the stage and in the reveal, where c2 and `seen` already scope it as illustrative. This is an exception to rule "ask for a number", and the reason is the dispute: the only number here is a setting.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H, M | `title` | `Airflow and surface are different` | `Does a breeze help a towel dry?` | c4 |
| H, M | `hook` | `Same towel, same cool air. Does a breeze make it dry sooner?` | `Cool day, wet towel on the line. Is a breeze any help?` | c4 |
| H | `question` | unchanged: `Same towel, same cool air. Does a breeze make it dry sooner?` | – | c4 |
| H | `options`, `answer` | `["No: only warm air helps", "Yes, about 2× sooner", "Only if the breeze spreads it"]`, 1 | `["No: only warm air helps", "Yes: moving air carries the damp away", "Only if the breeze spreads it out"]`, 1 | c4 |
| M | `recall.question` | `A towel exposes 1.5 m² in still air. A fan doubles the model flux. What happens in the model?` | `A towel has 1.5 m² open to still air. A fan doubles the model's air setting. What happens in the model?` | recall |
| M | `recall.options` | `["Area becomes 3 m² and the rate doubles", "Area stays 1.5 m² and the rate doubles", "Area stays 1.5 m² and the rate is unchanged"]` | `["Area becomes 3 m² and the drying speed doubles", "Area stays 1.5 m² and the drying speed doubles", "Area stays 1.5 m² and the drying speed is unchanged"]` (answer stays 1) | recall |
| M | `recall.why` | `Rate = exposed area × flux. The fan changes flux, not area, so the rate doubles while the area stays 1.5 m². A face folded shut stays hidden however the air moves. The doubling is illustrative, not a fan measurement.` | `Drying speed = open area × air setting. The fan changes the air setting, not the area, so the speed doubles while the area stays 1.5 m². A face folded shut stays hidden however the air moves. The doubling is the card's setting, not a fan measurement.` | recall |

Support for the new key: OpenStax College Physics 2e §14.6, which the fact-checker opened for c1 ("Air flow ... replaces the saturated air by dry air and evaporation continues"). The builder adds §14.6 to the source field, as the FC52 note asks. "Drying speed = … × air setting" is c3's own wording.

#### drying-room-water-load (FC52 c3 disputed)

The dispute: c3 (and spec `formula`) say "30m³ room shown only as context", and the v2 stage shows no room. The fix is words only: drop the clause.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H | `formula` | `Water=250g for one item or count×250g; hypothetical complete drying, 30m³ room shown only as context.` (as c3 quotes it) | `Water=250g for one item or count×250g; hypothetical complete drying.` | c3 |
| M | `claims[c3].text` | same as old | same as new | c3 |
| H | reveal grammar (builder, not cm text) | `Whole load: 1 shirts` at 1 shirt (FC52 seen note) | singular at 1: `1 shirt` | seen (only if its text changes; at p = 12 it does not) |

c6 (the damp-and-mould warning) is **unchanged** and still held unverified for want of a housing or public-health source. It is a health line. Any rewording of it goes to lifehacks-safety-reviewer first, and this patch does not reword it.

#### square-bow-stays-tied (FC52 c1 and c4 held: "across the shoe / toe-to-heel")

No opened source supports the shoe-relative directions. The paper (Daily-Diamond et al. 2017) supports "lies flat" against "twists". Both claims drop the directions.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H | `idea` (c1) | `The twisted bow comes from tying both knot stages the same way round; tying the second the opposite way makes the bow lie flat across the shoe. To read your own: loops across the shoe are flat, loops pointing toe-to-heel are twisted.` | `The twisted bow comes from tying both knot stages the same way round; tying the second the opposite way makes the bow lie flat. To read your own: a flat bow lies flat, a twisted bow twists out of line.` | c1 |
| H | `question` | `Two bows tied in the same laces: one lies across the shoe, one twists toe-to-heel. Which comes undone first?` | `Two bows tied in the same laces: one lies flat, one twists out of line. Which comes undone first?` | c4 |
| H | `source` (builder note from FC52 c3) | works the old 20-step numbers (4 mm, 14 mm) | the 25-step numbers c3 verifies (0 mm and 12.5 mm) | c3 source only |

The title, hook and options are unchanged. If the field that renders c1 is not `idea`, B4 changes the field that does render it and says which one in build.md.

#### lh-fixed-energy-charge (FC38/pass 51 c8 disputed, W-1106)

The dispute: the stage shows two bills, and the question names neither. The no-fee bill halves exactly. I name the bill and turn the line into the launch pattern (TP-7(d): ask for a number, with the misconception's number as an option). Numbers from the declared formula: 20 × 0.20 + 10 = €14; 40 × 0.20 + 10 = €18; half of 18 = €9. 20 kWh and 40 kWh are both slider stops.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| R, M | `title` | `The fixed charge changes the bill` | `Half the energy, half the bill?` | none |
| R, M | `hook` | `Halve your usage. Does the bill halve?` | `Your bill has a €10 fixed charge. Halve your usage: does the bill halve?` | c7 |
| R | `question` | `Halve your usage. Does the bill halve?` | `The bill with the €10 fixed charge is €18 at 40 kWh. Cut usage to 20 kWh: what is that bill now?` | c8 |
| R | `options`, `answer` | `["No: the fixed charge stays", "Yes"]`, 0 | `["€9", "€10", "€14"]`, 2 | c8 |

"€9" is the misconception (the bill halves). "€10" is the other plausible slip (only the charge is left). Money: this is arithmetic on fictional tariffs, not advice, so the charter's refuse list does not apply and I do not route it for a safety re-look. c6 ("Tariffs and appliance ratings vary: check your own") is unchanged and still held.

#### check-confidence-with-output (W-755): keep, because it is already done

`meta.recall.why` already reads "This one check is not a forecast of later recall, but it does show which step to fix." It was verified in the 2026-10-15 pass (W-950) in `company/reviews/check-confidence-with-output/2026-10-14-fact-check.md`. No change to `recall`. W-755 can close against that pass. This lesson's hook is changed in 1B.

### 1B. Study W1 (W-1118: hooks for the recall lessons; titles that point to the answer)

| Slug | Where | Field | Old | New | Claim |
|---|---|---|---|---|---|
| spaced-beats-cram | – | all | – | **keep, because** its r12 walk is launch (company/reviews/spaced-beats-cram/2026-10-15-learner-adult-beginner-r12.md) and the hook already follows rule 1. The brief now matches it (W-1088). | – |
| cover-before-recall | S, M | `hook` | `Cover the answers: how many can you give?` | `You've just read three cards, answers showing. Covered, how many will you get?` | c1 |
| cover-before-recall | – | `title` | `Cover before you test` | **keep, because** it names what the stage does, not what you will score | – |
| note-gap-check | S, M | `title` | `Find the missing note` | `A note that looks complete` | none |
| note-gap-check | S, M | `hook` | `Cover it and rebuild its three fields: how many do you expect to get?` | `Your note has every field filled in. Would you get it all back from memory?` | c1 |
| one-question-one-card | S, M | `title` | `One question per card` | `Three facts, one card` | none |
| one-question-one-card | S, M | `hook` | `You answer two of three and mark it right. What did the card record?` | `One flashcard asks for three facts. What does marking it right tell you?` | c1 |
| reverse-the-flashcard | S, M | `title` | `Test the other direction` | `Perro to dog, dog to perro` | none |
| reverse-the-flashcard | S, M | `hook` | `Shown 'dog', can you give 'perro'?` | `You always get 'perro → dog' right. Does it work the other way round?` | c1 |
| separate-confusable-pairs | S, M | `title` | `Separate similar pairs` | `Two codes, one description` | none |
| separate-confusable-pairs | S, M | `hook` | `Asked for the grey cable's code, how often do you pick the right one?` | `Two part codes, both noted as 'grey cable'. Which one will you remember?` | c1 |
| explain-the-link | S, M | `title` | `Remember the links` | `Cloud, rain, puddle` | none |
| explain-the-link | S, M | `hook` | `Asked 'why is there a puddle?', can you answer?` | `You can list the three words. Can you explain the puddle?` | c1 |
| keep-the-error-feedback | – | – | – | title and hook in 1A | – |
| check-confidence-with-output | S, M | `hook` | `You studied map, key, route and feel sure of the order.` | `You studied three words in order and feel sure of it. How sure should you be?` | c1 |
| check-confidence-with-output | S, M | `title` | `Sure is not the same as right?` | `Feeling sure of the order` | none |
| fragmented-time-does-not-fit | – | all | – | **keep, because** the hook is the plan's own question and states no answer | – |

The check-confidence hook no longer names the studied order ("map, key, route"), which gave away the answer key when the order was covered. W-1118 asked for that. The fix plan's stage fix ("cover the studied order until B is pressed") is unchanged and still the builder's.

### 1C. Study W9 (W-1118: hooks, titles, and the three lines that did not fit)

**Hooks and titles.** In every W9 lesson except meeting-and-preparation, the hook was the first sentence of the question (a statement) or a statement of the answer.

| Slug | Where | Field | Old | New | Claim |
|---|---|---|---|---|---|
| work-back-from-a-deadline | S, M | `hook` | `Three tasks (10, 15 and 20 min) in a row, due at minute 60.` | `Three tasks in a row, one deadline. When must the first one start?` | c1 |
| work-back-from-a-deadline | – | `title` | `Plan backwards` | **keep, because** it names the method; the number still has to be worked out | – |
| one-person-two-jobs | S, M | `hook` | `Two 30-minute jobs on separate rows from minute 0, one person.` | `Two jobs on two calendar rows, both yours. When are you done?` | c1 |
| meeting-and-preparation | S, M | `title` | `Preparation needs its own slot` | `The talk is booked. Is the prep?` | none |
| meeting-and-preparation | S, M | `hook` | `You booked the presentation, but where did preparation go?` | `The presentation is in your calendar. Are you ready for it?` | c1 |
| estimate-a-range | S, M | `title` | `Try the longer estimate` | `15 to 25 minutes, call at 20` | none |
| estimate-a-range | S, M | `hook` | `A 15-25 minute task, then a call at 20.` | `A task takes 15 to 25 minutes. Which number do you plan with?` | c1 |
| fit-before-fixed-slot | S, M | `title` | `Fit around the fixed slot` | `Where do the 25 minutes go?` | none |
| fit-before-fixed-slot | S, M | `hook` | `A 25-minute task and a call at 20 to 30. Free until 60.` | `A 25-minute task, a fixed call at 20, and an hour free. Where does it go?` | c1 |
| include-the-wrap-up | S, M | `title` | `The finish is not the end` | `When is the call job done?` | none |
| include-the-wrap-up | S, M | `hook` | `A call from 0 to 30, then 10 minutes of notes.` | `The call ends at minute 30. Is that when the job is done?` | c1 |
| choose-the-metric-first | S, M | `title` | `Choose the metric first` | `Which queue is better?` | none |
| choose-the-metric-first | S, M | `hook` | `A queue can look better by one score and worse by another.` | `One order waits less, the other is late less. Which one is better?` | c1 |
| choose-the-metric-first | – | question, options | – | **keep, because** the plan keeps the question, and the obvious rewrite is the recall item word for word | – |
| dependency-before-priority | S, M | `title` | `Priority cannot bypass input` | `High priority, missing input` | none |
| dependency-before-priority | S, M | `hook` | `Which runs first?` | `One job is tagged high priority. Does that decide what runs first?` | c1 |
| dependency-before-priority | S | `question` | `Which runs first?` | `The review is tagged high priority, and it works from the draft. Which runs first?` | c1 |
| earliest-deadline-first | S, M | `title` | `Read the due dates` | `Quick job or urgent job?` | none |
| earliest-deadline-first | S, M | `hook` | `Short job (5 min, due 30) or urgent job (10 min, due 10).` | `Do the quickest job first. Does anything end up late?` | c1 |
| unlock-the-following-work | – | – | – | title, hook and question in 1A | – |

**The three W9 lines that did not fit (d82ea40).** Each line below fits the fixture as it is. None needs a fixture or model change, so the pinned numbers in tests/lifehacks/study.test.mjs and study-engine.test.mjs stand.

**batch-by-setup.** The builder's objection was right: six tasks would break the pinned queue numbers. The line uses the existing three-task fixture: A1, B1, A2 at 5 minutes each, 2 minutes per switch. `queueResult`: alternating takes 19 minutes with 2 switches, grouped takes 17 with 1. Grouping saves 2 minutes.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| S, M | `title` | `Batch the shared setup` | `Same tasks, different order` | none |
| S, M | `hook` | `Changing contexts costs two minutes here. Count the changes.` | `Three short tasks, two kinds. Does the order change how long they take?` | c1 |
| S | `question` | `Which order needs fewer setup switches?` | `Tasks A, B, A take 5 minutes each, and every change between A and B costs 2 minutes. Group the two A tasks: how many minutes does that save?` | c1 |
| S | `options`, `answer` | `["Group equal tags", "Alternate tags"]`, 0 | `["2 minutes", "0: same three tasks", "4 minutes"]`, 0 | c1 |

"0: same three tasks" is the misconception (the order does not matter). "4 minutes" is the slip of removing both switches.

**do-not-starve-the-long-job.** The plan had no verbatim line. Fixture: small 5 (due 60), tiny 5 (due 60), long 25 (due 25). `queueObservation`: small → tiny → long waits 15 minutes in total with 1 late job; long first waits 55 with 0 late jobs. The question does not quote the 35-minute finish, because the stage reports "1 late job", not the minute.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| S, M | `title` | `The short-job trade-off` | `Short jobs first?` | none |
| S, M | `hook` | `Clearing tiny tasks first can delay the long task’s own deadline.` | `Short jobs first means the least waiting. Is it always the right order?` | c1 |
| S | `question` | `For this long job due at minute 25, which order meets its deadline?` | `Two 5-minute jobs, and a 25-minute job due at minute 25. Do the short ones first: is the long job on time?` | c1 |
| S | `options`, `answer` | `["Long job first", "Small jobs first"]`, 0 | `["Yes: least waiting, so nothing waits too long", "No: it finishes late"]`, 1 | c1 |

**reserve-an-unassigned-slot.** The builder could not draw "a plan that books less work". The line asks about what the stage already does. Rows: focus 0–30, admin 30–50, call 50–60. The "Reserve ten minutes" button moves to the target starts [0, 40, 60], which leaves 30–40 free. `scheduleObservation`: start "everything is done by minute 60", target "everything is done by minute 70".

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| S, M | `title` | `Slack has a size` | `A full hour, an urgent task` | none |
| S, M | `hook` | `A completely booked hour has no space for an extra ten-minute task.` | `Your hour is fully booked. Where does an urgent 10-minute task go?` | c1 |
| S | `question` | `What can accommodate an unplanned 10-minute task here?` | `Focus, admin and a call fill minutes 0 to 60. An urgent 10-minute task has to go in after focus. When is everything done?` | c1 |
| S | `options`, `answer` | `["A free 10-minute interval", "A fully booked hour"]`, 0 | `["Minute 70", "Minute 60: it's only 10 minutes"]`, 0 | c1 |

Builder note (stage words, not a model change): label the freed 30–40 slot as the urgent task's ("urgent task, 10 min"), so the reveal's "done by minute 70" reads as the cost of fitting it in. If the v1 calendar cannot label a free slot, leave it unlabelled and say so in build.md. The line still holds without the label.

### 1D. Home W2 (W-1109: hooks, hinting titles, the three lines that did not fit, recall jargon)

**Hooks and titles.**

| Slug | Where | Field | Old | New | Claim |
|---|---|---|---|---|---|
| towel-spread-dries-first | H, M | `hook` | `Folded in quarters, the towel takes 12 hours in this model. Spread flat, how long?` | `Fold it or spread it: does that change how long a towel takes to dry?` | c4 |
| towel-over-two-bars | H, M | `title` | `Give both towel faces air` | `One bar or two?` | c4 |
| towel-over-two-bars | H, M | `hook` | `Which arrangement exposes more of the chosen faces?` | `A towel over one bar, or across two. Is more of it open to the air?` | c4 |
| garment-overlap-hides-face | H, M | `title` | `Overlap can hide a drying face` | `Two shirts, one overlap` | c4 |
| garment-overlap-hides-face | H, M | `hook` | `Two shirts overlap by 1,800 cm². How much cloth is hidden from the air?` | `Two wet shirts overlap on the line. Does that hide any cloth from the air?` | c4 |
| half-size-two-towels | H, M | `title` | `Cut size, keep area` | `Cut the towel in half?` | c4 |
| half-size-two-towels | H, M | `hook` | `Does splitting this fully exposed sheet add face area?` | `Two half towels hung flat, or one whole one. Which has more face to dry?` | c4 |
| humidity-evaporation-gap | H, M | `title` | `Humid air narrows the gap` | `Damp room, dry room` | c4 |
| humidity-evaporation-gap | – | `hook` | – | **keep, because** it is a question that sets the scene and states no answer | – |
| breeze-is-not-extra-surface | – | – | – | title and hook in 1A | – |
| folded-shirt-stack-height | H, M | `title` | `Half the footprint, twice the stack` | `Fold the shirts once more` | c4 |
| folded-shirt-stack-height | H, M | `hook` | `What changes when you halve the footprint again?` | `Fold a stack of shirts smaller. What happens to its height?` | c4 |
| wet-knit-hang-stretch | – | title, hook | – | **keep, because** both are the plan's lines. The hook asks for a number, and this is a load drawing on the W-1094 safety re-look list. I do not reword load text ahead of that re-look. | – |
| drying-room-water-load | – | title, hook | – | **keep, because** the title names a mass balance without the amount, and the hook is a question | – |
| square-bow-stays-tied | – | title, hook | – | **keep** (the plan's title; the hook already says "lies flat / twists") | – |

**garment-overlap-hides-face: the slider works in A only (W-1109).** This is a stage fix, not a text change: builder row under TP-2(c). Either make the slider drive both columns, or hide it for this lesson. No claim text changes unless the slider's caption does.

**Recall text still says 'flux' / 'normalised gap' (W-1109).** breeze-is-not-extra-surface is in 1A.

| Slug | Where | Field | Old | New | Claim |
|---|---|---|---|---|---|
| towel-spread-dries-first | M | `recall.question` | `Same water and constant model flux: layout A exposes 1 m² and layout B exposes 2 m². How do their model drying times compare?` | `Same water, same air: layout A has 1 m² of face open to the air and layout B has 2 m². How do their drying times compare in this model?` | recall |
| towel-spread-dries-first | M | `recall.why` | `In this model, time = water mass ÷ (exposed area × flux). With the same water and flux, doubling exposed area halves the model time. This does not promise a real household drying-time ratio.` | `In this model each square metre of open face dries at the same speed, so time = water ÷ (open face × that speed). Doubling the open face halves the time. This does not promise a real household drying-time ratio.` | recall |
| towel-spread-dries-first | M | `recall.options`, `answer` | unchanged (answer 2) | – | – |
| humidity-evaporation-gap | M | `recall.question` | `Two rooms are at the same temperature: one at 40% relative humidity, one at 80%. In the lesson's normalised model, how do their vapour-pressure gaps compare?` | `Two rooms are at the same temperature: one at 40% humidity, one at 80%. In the lesson's model, how does the drying push compare?` | recall |
| humidity-evaporation-gap | M | `recall.options` | `["Equal, since both rooms are at the same temperature", "Twice as large in the 40% room", "Three times as large in the 40% room"]` | `["Equal, since both rooms are at the same temperature", "Twice as strong in the 40% room", "Three times as strong in the 40% room"]` (answer stays 2) | recall |
| humidity-evaporation-gap | M | `recall.why` | `Normalised gap = 1 − RH/100: 0.6 at 40% and 0.2 at 80%, three times larger. A smaller gap means less drive for evaporation. This is not a drying clock.` | `In this model the push is how far the air is from full: 100 − 40 = 60 points in the drier room and 100 − 80 = 20 in the humid one, three times as strong. A weaker push means slower evaporation. This is not a drying clock.` | recall |

The humidity why now uses the stage's own wording ("Drying push=100−humidity, out of 100" in `formula`; "The push is how far the air is from full" in `idea`). The ratio is unchanged, at 3.

**The three W2 lines that did not fit (b5ee4ca).**

**laundry-gap-air-path.** The plan's line ("Ten shirts … or fourteen: which load is dry first?") needs a drying time and a variable count. The model has neither. Today the slider is the rail width, the count is fixed at 5 shirts of 8 cm, and gap = (width − 40) / 4. **Builder row, model change named:** the slider becomes the shirt count *n* (5 to 7, step 1) on a fixed 60 cm rail, with gap = (60 − 8n) / (n − 1). That is the same formula with the variable swapped, and the move to engine 2 is TP-2 as in W2. From that formula: n = 5 gives 5 cm and n = 7 gives 4 / 6 = 0.67 cm (shown as 0.7 cm). If the builder cannot make the count the slider, the row comes back to me. The line is not used on the width model.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H | `model` input | slider = rack width 45–80 cm, 5 items fixed | slider = shirt count 5–7 on a 60 cm rail (above) | c3 (formula) |
| H, M | `title` | `A gap is an air path` | `Room between the shirts` | c4 |
| H, M | `hook` | `Which layout leaves clear paths between these items?` | `More shirts on the same rail. What happens to the space between them?` | c4 |
| H | `question` | `Which layout leaves clear paths between these items?` | `Five shirts on a 60 cm rail have 5 cm between neighbours. Hang two more: how much gap is left?` | c4 |
| H | `options`, `answer` | `["Touching rows", "Spaced rows"]` (default), 1 | `["None: they touch", "0.7 cm", "5 cm: same rail"]`, 1 | c4 |
| H | `formula` (c3) | `Available gap=(rack width−5×8)/4cm; touching method sets spacing=0. Four channels count only when spacing>0.` | `Gap=(60−count×8)/(count−1) cm on a 60 cm rail; shirts 8 cm wide. Channels count only when the gap is above 0.` | c3 |
| M | `recall` | unchanged: the 52 cm rail, 5 garments item still transfers | – | – |

"5 cm: same rail" is the misconception's cousin (more shirts fit, so nothing changes). The reveal's air-path sentence stays the `idea` (c1, unchanged). The limit (c2: "does not calculate airflow or real drying time") stays, so no line claims which load dries first.

**towel-thickness-hidden-volume.** The plan asked for a drying time. The model gives open face per volume. The new line asks for that quantity in words, with no ratio units on screen (rule 1). Model: face 2 × 50 × 100 cm² is fixed and volume doubles with thickness, so face per volume halves at every slider value. Builder: move it to engine 2 with `resultLabel` "Open face per cm³ of cloth", and no "cm⁻¹" on screen.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H, M | `title` | `Thicker cloth, less face per volume` | `A towel twice as thick` | c4 |
| H, M | `hook` | `Which sheet has less face area per material volume?` | `Same size, twice as thick, twice the water. Does it get more face to dry from?` | c4 |
| H | `question` | `Which sheet has less face area per material volume?` | `Same size towel, twice as thick, so twice the cloth and twice the water. How much open face does each cm³ of cloth get now?` | c4 |
| H | `options`, `answer` | `["Thin sheet", "Double thickness"]` (default), 1 | `["The same: same size towel", "Twice as much", "Half as much"]`, 2 | c4 |

"The same: same size towel" is the meta misconception ("A thick towel dries about as fast as a thin one of the same size"). The limit (c2) stays: the ratio alone does not set a drying time.

**care-label-first-choice.** The plan's line quoted drying times, and the model has none. The model counts the items dried the way the label says: 0 if hung, N if laid flat, with N = the count slider (initial 3). The new line asks for that count. It does not say hanging is faster, because nothing on the stage or in the sources supports that.

| Where | Field | Old | New | Claim |
|---|---|---|---|---|
| H, M | `title` | `The label beats the fastest layout` | `What does 'dry flat' allow?` | c4 |
| H, M | `hook` | `Which layout follows the shown flat-dry instruction?` | `The label says 'dry flat', and the line has room. Does it matter?` | c4 |
| H | `question` | `Which layout follows the shown flat-dry instruction?` | `Three jumpers say 'dry flat'. You hang them on the line with the rest. How many are dried the way the label says?` | c4 |
| H | `options`, `answer` | `["Hang every item", "Respect flat-dry text"]` (default), 1 | `["None", "All 3: dry is dry"]`, 0 | c4 |

---

## Section 2: lhw3 (W3). Applied by the W3 builder on lhw3 after it merges, not by B4.

Read from /home/user/s3c-lhw3 at 5d9de52 (read-only). In every W3 lesson, the builder set the hook to the question (22a248d). The hooks below replace those copies. The question and options are the plan's lines and stay as they are, except where a row says otherwise. Claim: `c4` (title, hook, question and options) in every W3 lesson.

**Safety marking (B1 stop-if).** long-cord-knots-itself, group-cables-with-ends and elastic-loop-release are cord lessons. tote-balance-sides is a load lesson. All four are on the W-1094 lifehacks-safety-reviewer re-look list. **My wording for these four is not final until that re-look passes it.** I changed no warning, load or cord-handling text in them: only titles and hooks. The tote title and hook stay as they are.

| Slug | Field | Old | New |
|---|---|---|---|
| long-cord-knots-itself | `title` | `Do long cords knot themselves?` | **keep, because** the plan renamed it to this question and it does not say how often (pending safety re-look) |
| long-cord-knots-itself | `hook` | (= question) | `Can a cord tie itself in a knot, with nobody tying it?` (pending safety re-look) |
| group-cables-with-ends | `title` | `A bundle still has loose ends` | `Tie the middle or tuck the ends?` (pending safety re-look) |
| group-cables-with-ends | `hook` | (= question) | `Three cords in one drawer. Does tying them together stop the tangles?` (pending safety re-look) |
| elastic-loop-release | `title` | `A loop is not a permanent knot` | `Knotted, or just looped?` (pending safety re-look) |
| elastic-loop-release | `hook` | (= question) | `A hair tie caught on a cord looks like a knot. How do you get it off?` (pending safety re-look) |
| sock-pairing-by-pattern | `title` | `Match a pattern before searching` | `One pile or pattern bins?` |
| sock-pairing-by-pattern | `hook` | (≈ question) | `Twelve socks in one pile. How much searching to find one sock's partner?` |
| sock-pairing-by-pattern | `question` | `Twelve socks of three patterns in one pile. To find one sock's partner, how many socks do you check?` | `Twelve socks of three patterns in one pile. In the worst case, how many socks do you check to find one sock's partner?` (answers the builder's open question: "check" is the worst case, which the limit line already states; options and key unchanged, "11" / "3") |
| sock-pairs-not-all-combinations | `title` | `Six socks are not six possible pairs` | `Six socks: how many pairings?` |
| sock-pairs-not-all-combinations | `hook` | (≈ question) | `Six plain socks and no marks. How many tries could pairing them take?` |
| fitted-sheet-corners-nest | `title` | `Put the corner inside the corner` | `Folding a fitted sheet` |
| fitted-sheet-corners-nest | `hook` | `Fold a fitted sheet with its corners tucked into each other. How much flatter is it?` | `Corners tucked into each other, or folded apart. Does it change the fold?` |
| fitted-sheet-corners-nest | `question` | `Fold a fitted sheet with its corners tucked into each other, or not. How much flatter is it?` | `Fold a fitted sheet with its corners tucked into each other, or with them apart. How do the two heights compare?` ("How much flatter" presupposed the answer) |
| fitted-sheet-corners-nest | `options`, `answer` | `["Not at all: elastic always lumps", "18 cm flatter"]`, 1 | `["The same: elastic always lumps", "Nested is 18 cm flatter"]`, 1 (18 cm as the builder filled it from the model; unchanged) |
| shoes-opposite-ends | `title` | `Toe next to heel` | `Packing a pair of shoes` |
| shoes-opposite-ends | `hook` | `Shoes 12 cm wide at the toe, 6 cm at the heel. How wide is the pair packed toe-to-heel?` | **keep, because** it asks for a number and states none of the answer |
| tote-balance-sides | `title`, `hook` | – | **keep, because** this is a load lesson pending its safety re-look. The title names the parts, not the result. |
| jacket-last-first | `title` | `Pack the return order backwards` | `Jacket, sweater, shoes` |
| jacket-last-first | `hook` | (≈ question) | `You'll want the jacket first. Where in the bag should it go?` |
| suitcase-layer-access | `title` | `Pack for the first thing you need` | `Where's the rain jacket?` |
| suitcase-layer-access | `hook` | (= question) | `It starts raining. How quickly can you get the jacket out of your bag?` |
| suitcase-layer-access | `question` | `The rain jacket is under five items. How many do you lift to reach it?` | `You packed the rain jacket first, then five more items on top. How many do you lift out to reach it?` (the old question said "under five items" and so gave away "5") |
| suitcase-layer-access | `options`, `answer` | `["0: it's in the bag", "1", "5"]`, 2 | unchanged |
| socks-use-shoe-space | `title` | `Use an existing hollow` | `Socks beside the shoe or in it?` |
| socks-use-shoe-space | `hook` | (= question) | `Rolled socks next to your shoes, or inside them. Does it change the room they take?` |
| socks-use-shoe-space | `question` | `Socks beside the shoe or inside it. How much packed volume do they add inside?` | `Rolled socks beside a shoe take up their own space in the bag. Stuffed inside the shoe, how much extra space do they take?` |
| socks-use-shoe-space | `options`, `answer` | `["None", "Same as beside"]`, 0 | `["None", "The same as beside it"]`, 0 |
| laundry-sort-before-walk | all | – | **keep, because** it is not on engine 2 yet. Its test pin (tests/lifehacks/home.test.mjs:63) waits on lane 10. When it moves, it takes the plan's §5 line as written ("The machine is 8 m away. Ten items one at a time, there and back. How far do you walk?" 16 m / 80 m / 160 m), with title `Carry once, sort at the start` → `Ten trips to the machine?` and hook `Ten items to the machine, one at a time. How far is that?` |

---

## Not in this patch

- **Route-table row 2 of the fix plan** (W-1118: "TP-3/4/5/8 accepted, objections 1-3, 7"). I found no record on disk of what demo-builder's objections 1-3 and 7 say: not in the readiness record, the build notes or the commit messages. I will not write answers to objections I cannot read. It needs the builder's report text, or the builder writes it into the route table.
- **c6 in drying-room-water-load and in lh-fixed-energy-charge**: held for sources, not wording. Not mine to reword without the safety reviewer (health) or a source.
- **The answer-position spread (TP-8)** across W9 after this patch: keys at index 0 in batch-by-setup and reserve-an-unassigned-slot, at 1 in do-not-starve-the-long-job and unlock-the-following-work, and unchanged elsewhere. I did not re-count the whole wave. The builder checks no wave has the key in one position in more than 9 of 13.
