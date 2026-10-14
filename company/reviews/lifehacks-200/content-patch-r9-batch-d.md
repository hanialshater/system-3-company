# Content patch: r9 batch D, 14 Life Hacks lessons (W-599)

- **Author:** cm-lifehacks (Tess), 2026-10-14. **Status:** patch, not applied. Nothing in `src/` was edited.
- **Applies with:** W-608 (demo-builder), after the engines v2 land behind `engine: 2` (company/design/specs/lifehacks-engines-v2.md, sections 8 and 9). Apply each lesson's block in one go: the predict, title, recall and claims must match.
- **Inputs read:** the 14 reviews `company/reviews/<slug>/2026-10-14-learner-adult-beginner-r9.md`; spec section 9 (plus 3, 4 and 8 for the field shapes); the recall rules in `recall-patch-{home,study,resources}.md`; the current `home-lessons.ts`, `studyCatalog.ts`, `models` and each `meta.json` (read 2026-10-14).
- **Simulated reviews are not learning evidence.** This patch fixes leaks that a simulated reader found. It does not show that anyone learned anything.

## Rules this patch follows

1. **Ask for the outcome, not the method.** Predict options are outcomes at equal precision. When every option has a number, they all have one. No option repeats a content word from the question that the others lack. The new options are never the mode-button labels (spec R7).
2. **Titles and hooks set the scene and do not state the idea.** Titles become neutral questions or plain scene names. Hooks give the tempting setup, the one the misconception is built on.
3. **Recall** (recall-patch rules): transfer to new numbers or objects; three options; **one distractor is the lesson's losing prediction**, one is a plausible slip; the correct option is never the strictly longest one, and never the only option with a number, date or zone; and the item cannot be answered by reading the option names. I recomputed the positions across the 14 (keys at index 0/1/2 = 5/5/4) and the predict keys (0/1/2 = 4/6/4). Today Study is always 0 and Home is almost always 1.
4. **The losing option needs a world.** Where the A column had nothing honest to show, this patch adds the data: a volume figure for bag, the overrun `event` for buffer, `parts` for count-setup, the second reader's reading for deadline, the consequence for agenda, and a lookup that returns 3 matches against 1 for cue.
5. **Claims.** Each new or changed sentence a learner sees is listed as a claim with `status: "unverified"` and a stated support. Builders and I do not mark any of them verified; that is the fact-checker's job. Titles that are questions are not claims. The `recall` string inside `home-lessons.ts` is not rendered (recall-patch-home §"Where it goes"), so it is left unchanged.

**Field paths.** H = `src/lib/lifehacks/home-lessons.ts`, entry with that `slug`. S = `src/lib/lifehacks/studyCatalog.ts`, export for that slug. M = `src/demos/lifehacks/<slug>/meta.json`. Where a title or hook exists in both the spec and M, change both to the same text (M feeds the card head and the spec feeds the stage's aria-label).

**`optionToMode` meaning (Study).** For option *i*, it names the column the reveal quotes first to judge that option. For "which plan" questions, that is the plan the option names. For "what happens under this plan" questions, every option maps to that plan's column. The interaction designer should confirm this reading (see Gaps).

---

## Home engine (5)

### 1. box-handle-clearance (predict key stays 1)

| Where | Field | Old | New |
|---|---|---|---|
| H, M | `title` | `A box is wider with handles` | `Will this box fit the shelf?` |
| M | `hook` | `Which measurement catches this shelf collision?` | `The label says 40 cm wide. The shelf opening is 42 cm.` |
| H | `hook` | `Which measurement catches this shelf collision?` | `The label says 40 cm wide. The shelf opening is 42 cm.` |
| H | `question` | `Which measurement catches this shelf collision?` | `Does this box, as drawn, fit the 42 cm opening?` |
| H | `engine` | – | `2` |
| H | `modeLabels` | – | `["Body only", "Include handles"]` |
| H | `options` | (default `[choices[0], choices[1], "Same outcome"]`) | `["Yes, with room to spare", "No, it is too wide", "Only just: it touches"]` |
| H | `amounts` | – | `[{"label":"Width tested","unit":"cm","a":"a","b":["+","a",["*",2,"b"]]}]` |
| H | `resultLabel` | – | `"Clearance"` |
| H | `verdict` | – | `{"below":"too wide","above":"fits","zero":"exact fit"}` |
| H | `pictureMark` | – | `"dimension"` |
| M | `recall` | unchanged. The reviewer judged it fair (38 / 42 / 46, with the misconception and a one-handle slip). | – |

Predict picture: A's arrangement must still draw both handles, unlabelled (the learner who looks at the outermost points gets it right). The question names no handle size, so the option cannot be computed from the text alone. The learner needs the picture.

Claims (all `unverified`):
- `lifehacks.box-handle-clearance.c4`: text → `Scenario and prediction: The label says 40 cm wide. The shelf opening is 42 cm. Does this box, as drawn, fit the 42 cm opening? Correct option: No, it is too wide (40 + 2 × 3 = 46 cm against a 42 cm opening).` Support `derivation`, source `home-models.ts case 'clearance'; values [40, 3], initial 42`.
- New `lifehacks.box-handle-clearance.c6`: `Width tested: 40 cm with the body only; 46 cm including both 3 cm handles. Clearance at a 42 cm opening: +2 cm (fits) and −4 cm (too wide).` Support `derivation` (same source; the amounts and verdict fields above).

### 2. bag-weight-before-volume (predict key stays 1)

| Where | Field | Old | New |
|---|---|---|---|
| H, M | `title` | `A half-empty bag can be overweight` | `Will this bag pass the limit?` |
| H, M | `hook` | `Which check notices the illustrated weight limit?` | `Half its space is still free.` |
| H | `question` | `Which check notices the illustrated weight limit?` | `This 2 kg bag holds 4 kg of things and is half empty. Does it pass a 5 kg limit?` |
| H | `engine` | – | `2` |
| H | `modeLabels` | – | `["Judge by space", "Weigh it"]` |
| H | `options` | default | `["Yes, half of it is empty", "No, it is over the limit", "Only just, at the limit"]` |
| H | `amounts` | – | `[{"label":"Space used","unit":"L","a":"10 of 20","b":"10 of 20"},{"label":"Total mass","unit":"kg","a":"not weighed","b":["+","p","a"]}]` |
| H | `resultLabel` | – | `"Against 5 kg limit"` |
| H | `verdict` | – | `{"above":"over","zero":"within limit"}` (B only; see Gap 1 for A) |
| H | `formula` | `Total=variable load+2kg; chosen limit=5kg; overload=max(0,total−5). Volume not used in this calculation.` | `Total=variable load+2kg; chosen limit=5kg; overload=max(0,total−5). Space used is a fixed 10 of 20 L at every load; it does not enter the mass.` |
| M | `recall` | see old text in M | `{"question":"Two 30 L bags face an 8 kg limit. One is full of pillows; one is half full of books. Which do you need to weigh?","options":["Only the full one","Only the half-full one","Both of them"],"answer":2,"why":"How full a bag is says nothing about its mass, so fullness rules neither bag in nor out. Only the masses decide. The limit is an example, not a carrier's rule."}` |

The new data is the **volume figure**: a stipulated 20 L bag whose contents fill 10 L at every slider load. It stays fixed while the mass slider moves, which puts the lesson's contrast on the stage (space unchanged, mass changing). The A result reads "looks fine (not weighed)" (Gap 1).

Claims (all `unverified`):
- `c4`: text → `Scenario and prediction: Half its space is still free. This 2 kg bag holds 4 kg of things and is half empty. Does it pass a 5 kg limit? Correct option: No, it is over the limit (2 + 4 = 6 kg, 1 kg over).` `derivation`.
- `c3`: text → the new `formula` above. `derivation`.
- New `c6`: `Example bag: 20 L of space, with the contents filling 10 L at every load shown. The space used does not change the total mass.` Support `convention` (stipulated example), source: this patch.
- New `c7`: `Total mass: 2 kg bag + 4 kg contents = 6 kg, 1 kg over the example 5 kg limit.` `derivation`.
- `lifehacks.bag-weight-before-volume.recall`: text → the new `why`. Support `derivation`. Delete nothing else.

### 3. circle-tray-square-corners (predict key changes 2 → 0)

| Where | Field | Old | New |
|---|---|---|---|
| H, M | `title` | `Rotating a circle changes nothing` | `Turn the discs, fit more?` |
| H, M | `hook` | `Can rotation alone put more equal circles in this grid?` | `Four discs leave empty corners. Will turning each one help?` |
| H | `question` | `Can rotation alone put more equal circles in this grid?` | `At this 28 cm tray, how many 10 cm discs fit once each is turned 45°?` |
| H | `answer` | `2` | `0` |
| H | `engine` | – | `2` |
| H | `modeLabels` | – | `["As placed", "Each turned 45°"]` |
| H | `options` | default | `["4 discs, as before", "5 discs: corners fill", "9 discs: rows close up"]` |
| H | `amounts` | – | `[{"label":"Discs per row","unit":"","a":["floor",["/","p","a"]],"b":["floor",["/","p","a"]]}]` |
| H | `resultLabel` | – | `"Discs that fit"` |
| H | `pictureMark` | – | `"radius-stripe"` |
| H | `limit` | `This is not an optimal circle-packing solver; staggered rows can behave differently.` | `This model keeps a square grid; it is not a best-packing solver.` |
| M | `recall` | see M | `{"question":"A 32 cm square tray holds 10 cm discs in a square grid. Each disc is turned 45°. How many fit now?","options":["9 discs","10 discs","16 discs"],"answer":0,"why":"32 ÷ 10 rounds down to 3 per row, so 3 × 3 = 9 either way: a turned circle takes the same space. 16 would need 8 cm discs."}` |

The recall drops the staggered-rows half, because the stage never shows it (spec section 9). The `limit` stops promising a different arrangement. Both columns are live (spec section 3), so moving the slider to 30 cm reads "9 ; 9". That fixes the blocking "rotation gave 9" frame.

Claims (all `unverified`):
- `c4`: text → `Scenario and prediction: Four discs leave empty corners. Will turning each one help? At this 28 cm tray, how many 10 cm discs fit once each is turned 45°? Correct option: 4 discs, as before.` `derivation` (home-models `circle-fit`: floor(28/10)² = 4 in both modes).
- `c2`: text → the new `limit`. `convention`.
- New `c6`: `Discs per row: 2 in both arrangements at 28 cm (28 ÷ 10 rounded down); 2 × 2 = 4 discs either way.` `derivation`.
- `.recall`: text → new `why`. `derivation`.

### 4. coiled-cord-bend-radius (predict key stays 1)

| Where | Field | Old | New |
|---|---|---|---|
| H, M | `title` | `Tighter coils, more curvature` | `How sharp is the bend?` |
| H, M | `hook` | `Which coil bends the cord more gently?` | `Same 2 m cord, coiled in loops twice as wide.` |
| H | `question` | `Which coil bends the cord more gently?` | `Against the base coil, how sharp is the bend with loops of twice the radius?` |
| H | `inputLabel` | `Radius` | `Base radius` |
| H | `engine` | – | `2` |
| H | `modeLabels` | `choices` = `Chosen radius / Double radius` | `["Base radius r", "Double, 2 × r"]` |
| H | `options` | default | `["Twice as sharp", "Half as sharp", "Just as sharp: same cord"]` |
| H | `amounts` | – | `[{"label":"Cord per turn","unit":"cm","a":["*",2,3.14159,"p"],"b":["*",4,3.14159,"p"]},{"label":"Turns","unit":"","a":["/","a",["*",2,3.14159,"p"]],"b":["/","a",["*",4,3.14159,"p"]]}]` |
| H | `resultLabel` | – | `"Bend (1 ÷ radius)"`, unit shown as `per cm`, 3 significant figures (R5) |
| H | `verdict` | – | per mode: A `sharper`, B `gentler` (A is always r, B always 2r; see Gap 1) |
| M | `recall` | unchanged (15 vs 30 cm; misconception "stays the same", slip "halves"; key 0). | – |

Claims (all `unverified`):
- `c4`: text → `Scenario and prediction: Same 2 m cord, coiled in loops twice as wide. Against the base coil, how sharp is the bend with loops of twice the radius? Correct option: Half as sharp (curvature 1 ÷ 2r is half of 1 ÷ r).` `derivation`.
- New `c6`: `At a 10 cm base radius: cord per turn 62.8 cm and 126 cm; turns of the 200 cm cord 3.18 and 1.59; bend 0.100 per cm (sharper) and 0.050 per cm (gentler).` `derivation` (home-models `coil-radius`, values [200], initial 10).
- `c3` (`formula`) is unchanged, but the stage no longer shows `cm⁻¹`. Builder: keep the unit text in c3 as is.

### 5. desk-supply-near-use (predict key changes 1 → 2)

| Where | Field | Old | New |
|---|---|---|---|
| H, M | `title` | `Store it where the route ends` | `Six trips for the tape` |
| H, M | `hook` | `Which location reduces this repeated retrieval route?` | `You need the tape six times while you work.` |
| H | `question` | `Which location reduces this repeated retrieval route?` | `The tape sits 4 m from your desk and you fetch it 6 times. How far do you walk?` |
| H | `answer` | `1` | `2` |
| H | `engine` | – | `2` |
| H | `modeLabels` | – | `["Across the room", "Copy at desk"]` |
| H | `options` | default | `["4 m", "24 m", "48 m"]` |
| H | `amounts` | – | `[{"label":"Round trip per fetch","unit":"m","a":["*",2,"p"],"b":0}]` |
| H | `resultLabel` | – | `"Walked, 6 fetches"` |
| M | `recall` | unchanged (5 m × 8 fetches; 40 m one-way slip). The v2 amount row now shows the doubling it relies on. | – |

Claims (all `unverified`):
- `c4`: text → `Scenario and prediction: You need the tape six times while you work. The tape sits 4 m from your desk and you fetch it 6 times. How far do you walk? Correct option: 48 m (6 round trips of 8 m).` `derivation`.
- New `c6`: `Round trip per fetch: 8 m across the room, 0 m with a copy at the desk. Walked over 6 fetches: 48 m and 0 m.` `derivation` (home-models `distance-use`).

---

## Study engine (9)

### 6. agenda-needs-an-outcome (message; predict key 0 → 2)

| Where | Field | Old | New |
|---|---|---|---|
| S, M | `title` | `Give the meeting an outcome` | `What will this meeting decide?` |
| S, M | `hook` | `A topic alone does not name the decision needed.` | `The agenda item reads 'Topic: plan'.` |
| S | `question` | `Which agenda states the intended result?` | `With only 'Topic: plan' on the agenda, who decides what?` |
| S | `options` | `["Choose plan plus owner", "Discuss the plan"]` | `["The group agrees a plan", "The topic's owner picks", "The agenda doesn't say"]` |
| S | `answer` | `0` | `2` |
| S | `misconception` | `Discuss the plan` | `A topic on the agenda implies a decision and a decider.` |
| S | `engine` | – | `2` |
| S | `modeLabels` | – | `["Topic only", "All three fields"]` |
| S | `optionToMode` | – | `["a", "a", "a"]` |
| S | `consequence` | – | `{"label":"The room knows","a":"the topic only","b":"the topic, the choice, who decides (Bo)"}` |
| M | `recall` | see M | `{"question":"Which agenda item names a decision and who makes it?","options":["'Budget: Ravi picks A or B'","'Budget: Ravi presents A and B'","'Budget: discuss A and B with Ravi'"],"answer":0,"why":"Only 'picks' names the choice the meeting must end with and who makes it. Presenting or discussing names a topic and a person, not a decision."}` |

Every recall option now names Ravi and the options A and B, so "the one with a person" no longer gives the key. The discuss option is the lesson's losing prediction. The correct option is the shortest.

Claims (all `unverified`):
- `c1`: text → `Scenario and prediction: The agenda item reads 'Topic: plan'. With only 'Topic: plan' on the agenda, who decides what? Correct option: The agenda doesn't say. All fixture labels, example words and names are stipulated exercise data.` `convention`.
- New `c4`: `A topic-only agenda tells the room the topic only; with outcome and owner added, it names the choice and who decides (Bo).` `derivation` (the fixture's fields; this reads what the page says, not how a real meeting goes).
- `.recall`: text → new `why`. `convention`.

### 7. apply-not-quote (recall, kind rule; predict key stays 0, options reworded)

| Where | Field | Old | New |
|---|---|---|---|
| S, M | `title` | `Apply the rule` | `Does this order pass?` |
| S, M | `hook` | `Can you put the values in ascending order without quoting the rule?` | `A checker passes 9, 2, 5 because all three numbers are there.` |
| S | `question` | `If all three numbers appear, is every arrangement ascending?` | `Under the ascending rule, how many of 9, 2, 5 are already in the right place?` |
| S | `options` | `["Only smallest-to-largest", "Any arrangement with all three"]` | `["0 of 3", "1 of 3", "All 3: none missing"]` |
| S | `answer` | `0` | `0` |
| S | `engine` | – | `2` |
| S | `modeLabels` | – | `["Any order", "Rule: ascending"]` |
| S | `optionToMode` | – | `["b", "b", "a"]` |
| S | `rowLabels` | – | `["rule's order", "your attempt"]` |
| M | `recall` | see M | `{"question":"Apply the ascending rule to 0.25, 0.5 and 0.125. Which order is correct?","options":["0.5, 0.25, 0.125","0.125, 0.25, 0.5","0.25, 0.5, 0.125"],"answer":1,"why":"Ascending means smallest to largest: 0.125 < 0.25 < 0.5. The last option only repeats the given order, which passes 'all three are there' but not the rule."}` |

The word "quoting" goes. It was never defined or shown. Stage: the target row must read `? ? ?` at predict and show 2, 5, 9 only when B is pressed (Gap 3). Otherwise the locked stage gives the key.

**CM decision on the lesson itself:** even with this patch, the predict mostly checks the definition: an adult who knows "ascending" answers it. The lesson has no adult misconception to break, and it overlaps check-confidence-with-output and cover-before-recall. I am putting it forward for the **retirement review** (board item below) rather than investing another revision. Apply this patch so the leak is closed in the meantime.

Claims (all `unverified`):
- `c1`: text → `Scenario and prediction: A checker passes 9, 2, 5 because all three numbers are there. Under the ascending rule, how many of 9, 2, 5 are already in the right place? Correct option: 0 of 3 (ascending is 2, 5, 9). Exercise values are conventions, not measured learning data.` `derivation`.
- `.recall`: text → new `why`. `derivation`.

### 8. buffer-for-a-late-finish (schedule; broken premise; predict key 0 → 2)

| Where | Field | Old | New |
|---|---|---|---|
| S, M | `title` | `Leave a finish buffer` | `When the draft runs late` |
| S, M | `hook` | `One task runs five minutes late. Which appointment absorbs it?` | `The draft overruns by five minutes.` |
| S | `question` | `What keeps five minutes of delay from overlapping the next task?` | `The draft runs 5 minutes over. Which plan has no clash with the call?` |
| S | `options` | `["A five-minute gap", "Touching blocks"]` | `["Both clash by 5 min", "Touching, call at 20", "Gap, call at 25"]` |
| S | `answer` | `0` | `2` |
| S | `misconception` | `Touching blocks` | `Back-to-back blocks are fine; a delay will be absorbed somewhere.` |
| S | `engine` | – | `2` |
| S | `modeLabels` | – | `["Touching", "5-min gap"]` |
| S | `optionToMode` | – | `["b", "a", "b"]` |
| S | `event` | – | `{"row":0,"minutes":5,"label":"+5 late"}` |
| S | `button` | `Add buffer` | (removed in v2: modes replace it) |
| M | `recall` | unchanged (9:30 / 9:35 / 9:40, key 2). The overrun is now on the stage, so the gap ≥ overrun rule is shown, not only told. | – |

**Premise fix:** the `event` draws the five-minute overrun from predict on, and both plans are evaluated with it. Touching blocks then read `Overlap 5 min (draft × call)`, and the gapped plan reads `0 min`. The losing option now loses on screen. The options no longer echo "five-minute gap".

Claims (all `unverified`):
- `c1`: text → `Scenario and prediction: The draft overruns by five minutes. The draft runs 5 minutes over. Which plan has no clash with the call? Correct option: Gap, call at 25. All fixture labels and durations are stipulated exercise data.` `convention`.
- New `c4`: `With the draft running 5 minutes over (0–25): touching blocks put the call at 20, a 5-minute overlap (draft × call); a 5-minute gap puts the call at 25, no overlap.` `derivation` (calendarResult with the event applied to row 0).

### 9. calendar-needs-travel (schedule; predict key stays 0, options reworded)

| Where | Field | Old | New |
|---|---|---|---|
| S, M | `title` | `Travel occupies the calendar` | `Booked at 10, leaving at 0` |
| S, M | `hook` | `The meeting fits. Does the journey fit too?` | `The calendar shows the meeting slot free.` |
| S | `question` | `Which layout includes the journey?` | `You leave at 0 and travel 15 minutes. The meeting is booked for 10. How do you arrive?` |
| S | `options` | `["Travel before meeting", "Meeting only"]` | `["Late by 5 min", "On time, 0 min", "Early by 5 min"]` |
| S | `answer` | `0` | `0` |
| S | `misconception` | `Meeting only` | `A free calendar slot means the meeting fits, travel aside.` |
| S | `engine` | – | `2` |
| S | `modeLabels` | – | `["Meeting at 10", "Meeting at 15"]` |
| S | `optionToMode` | – | `["a", "a", "a"]` |
| M | `recall` | unchanged | – |

On the recall: the spec flagged "clock times the stage never used". The reviewer rated this the best recall in the batch, and I agree. Clock times are the transfer (minutes on a 0–90 axis become a real morning), and the item still needs the idea. **Kept, with that reason.** The slider-made second clash (meeting × email) is handled by the v2 overlap readout, which names the pair (spec section 4). No content change is needed for it.

Claims (all `unverified`):
- `c1`: text → `Scenario and prediction: The calendar shows the meeting slot free. You leave at 0 and travel 15 minutes. The meeting is booked for 10. How do you arrive? Correct option: Late by 5 min. All fixture labels and durations are stipulated exercise data.` `derivation`.

### 10. check-confidence-with-output (recall, kind sequence; predict key 0 → 1)

| Where | Field | Old | New |
|---|---|---|---|
| S, M | `title` | `Check confidence with output` | `Sure is not the same as right?` |
| S, M | `hook` | `“I know this” and a checked reconstruction are different evidence.` | `You studied map, key, route and feel sure of the order.` |
| S | `question` | `Which provides an observable local check?` | `Your attempt feels familiar. Before checking it, how many places do you know are right?` |
| S | `options` | `["Checked reconstruction", "Feeling familiar"]` | `["All 3 of 3: you feel sure", "Unknown until checked", "At least 2 of 3"]` |
| S | `answer` | `0` | `1` |
| S | `engine` | – | `2` |
| S | `modeLabels` | – | `["Feels familiar", "Check it"]` |
| S | `optionToMode` | – | `["a", "b", "a"]` |
| S | `rowLabels` | – | `["studied order", "your attempt"]` |
| M | `recall` | see M | `{"question":"You felt sure of a 4-step route. Written from memory, steps 1, 2 and 4 match your notes. What do you now know?","options":["All 4: you felt sure","Step 3 is the one to fix","Nothing: one try proves little"],"answer":1,"why":"The written check found the one step the feeling missed. One attempt does not predict later recall, but it does show which step to fix."}` |

The v2 Check mode scores the initial attempt `[2,0,1]` at 0/3 (spec section 4), so "feeling familiar" now fails on screen. "Observable local check" and "Local reconstruction" go.

Claims (all `unverified`):
- `c1`: text → `Scenario and prediction: You studied map, key, route and feel sure of the order. Your attempt feels familiar. Before checking it, how many places do you know are right? Correct option: Unknown until checked. All fixture words are stipulated exercise data.` `convention`.
- New `c4`: `Checked against the studied order map, key, route, the familiar-feeling attempt route, map, key matches 0 of 3 places.` `derivation` (reconstructionMatches on `[2,0,1]`).
- `.recall`: text → new `why`. `convention`.

### 11. count-setup-in-the-block (schedule; predict key 0 → 1)

| Where | Field | Old | New |
|---|---|---|---|
| S, M | `title` | `Setup takes time too` | `Will the call start on time?` |
| S, M | `hook` | `Ten minutes of work plus five minutes of setup is a fifteen-minute booking.` | `You booked the task's ten minutes of work, then the call.` |
| S | `question` | `How long is this combined setup-and-work block?` | `The call is booked for 10. What is happening at 10?` |
| S | `options` | `["15 minutes", "10 minutes"]` | `["The call starts on time", "The task has 5 min left", "The task has 10 min left"]` |
| S | `answer` | `0` | `1` |
| S | `misconception` | `10 minutes` | `A task's booking only needs its work time.` |
| S | `principle` | `The first block includes the visible five-minute setup and ten-minute execution. The calendar cannot fit fifteen minutes inside a ten-minute allowance.` | `The task is five minutes of setup plus ten of work. Booking only the ten leaves the call starting while five minutes remain.` |
| S | `rows[0].label` | `setup+work` | `task` |
| S | `rows[0].parts` | – | `[{"label":"setup","minutes":5},{"label":"work","minutes":10}]` |
| S | `engine` | – | `2` |
| S | `modeLabels` | – | `["Book 10 min", "Book 15 min"]` |
| S | `optionToMode` | – | `["a", "a", "a"]` |
| S | `amounts` | – | `[{"label":"Booked for the task","a":"10 min","b":"15 min"}]` |
| M | `recall` | see M | `{"question":"A print job prints for 20 min after a 10-min printer warm-up. Your slot is 25 min. Does it fit?","options":["Too short by 5 min","Fits, with 5 min to spare","Fits exactly"],"answer":0,"why":"The booking is warm-up plus printing: 10 + 20 = 30 min, 5 more than the slot. Counting only the printing gives the 5 min 'to spare'."}` |

The question no longer lays out the sum ("plus"), and the misconception now has its own option. The reviewer accepted the old item. The spec asked for a change, and this one keeps the arithmetic but makes the learner supply the step (count the warm-up) instead of reading it.

Claims (all `unverified`):
- `c1`: text → `Scenario and prediction: You booked the task's ten minutes of work, then the call. The call is booked for 10. What is happening at 10? Correct option: The task has 5 min left. All fixture labels and durations are stipulated exercise data.` `derivation`.
- `c2`: text → the new `principle`. `derivation`.
- New `c4`: `Task bar: setup 5 min, work 10 min. Booked for the task: 10 min (call clashes for 5 min) or 15 min (no clash).` `derivation` (calendarResult on rows / target).
- `.recall`: text → new `why`. `derivation`.

### 12. cue-needs-a-boundary (broken premise; family change recall → files; predict key 0 → 1)

**Premise fix.** The recall family is a position-ordering task, so a vague cue can never fail in it, even with `candidates` (the spec's own note in section 9). The files family's existing `filter` operation can show the ambiguity directly: the cue "Capital?" returns 3 matches in the notes, and "Kenya's capital?" returns 1. The engine needs no change, only data. **This is a format change, so it waits for the learning designer's go (board item below).** If they say no, apply the fallback at the end of this block.

| Where | Field | Old | New |
|---|---|---|---|
| S | `family` | `recall` | `files` |
| S | `labels`, `words`, `kind` | `["Japan","Kenya","Peru"]`, `["Tokyo","Nairobi","Lima"]`, `pairs` | removed |
| S | `items` | – | `[{"name":"Tokyo","value":"capital of Japan","kind":"capital","country":"Japan"},{"name":"Nairobi","value":"capital of Kenya","kind":"capital","country":"Kenya"},{"name":"Lima","value":"capital of Peru","kind":"capital","country":"Peru"}]` |
| S | `operation`, `field`, `value`, `field2`, `value2` | – | `"filter"`, `"kind"`, `"capital"`, `"country"`, `"Kenya"` |
| S | `button`, `button2` | – | `"Capital?"`, `"Kenya's capital?"` |
| S, M | `title` | `Give the cue a boundary` | `Which capital?` |
| S, M | `hook` | `“Capital?” is too vague when your notes mention three countries.` | `Your flashcard just says 'Capital?'.` |
| S | `question` | `Which cue uniquely identifies the target in these notes?` | `Your notes cover three countries. How many answers in them fit the card 'Capital?'?` |
| S | `options` | `["Country plus capital", "Capital alone"]` | `["1: the one you meant", "3: one per country", "0: no country named"]` |
| S | `answer` | `0` | `1` |
| S | `misconception` | `Capital alone` | `A short cue points to the fact you had in mind.` |
| S | `principle` | `Each country cue identifies one answer in this fixture. A cue that could refer to several facts is under-specified.` | `'Capital?' fits all three notes, so it cannot tell you which one to recall. 'Kenya's capital?' fits one.` |
| S | `engine` | – | `2` |
| S | `modeLabels` | – | `["Capital?", "Kenya's capital?"]` |
| S | `optionToMode` | – | `["a", "a", "a"]` |
| S | `amounts` | – | `[{"label":"Answers this cue fits","a":3,"b":1}]` |
| M | `format` | `single-card` | `before-after` (learning designer confirms) |
| M | `recall` | see M | `{"question":"Your notes cover the Nile, the Amazon and the Danube. Which flashcard cue has exactly one right answer in them?","options":["'Length of the river?'","'Length of a long river?'","'Length of the Nile?'"],"answer":2,"why":"A cue that names its river fits one fact in these notes. 'The river' and 'a long river' could each be any of the three."}` |

Builder: remove the slug branches for this lesson in `StudyLesson.tsx` (`"cue-needs-a-boundary":"Add country"` in the refinement map and the `actualLabels` override). That is code, so it belongs to W-608, not to me.

Claims (all `unverified`):
- `c1`: text → `Scenario and prediction: Your flashcard just says 'Capital?'. Your notes cover three countries. How many answers in them fit the card 'Capital?'? Correct option: 3: one per country. Fixture notes: Tokyo is the capital of Japan, Nairobi of Kenya, Lima of Peru.` Support `source` (any atlas; fact-checker picks one) for the three capitals, `convention` for the rest.
- `c2`: text → the new `principle`. `derivation` (fileResult `filter`: 3 rows at step 1, 1 at step 2).
- `.recall`: text → new `why`. `convention`.

**Fallback (if the family change is refused):** keep `family: "recall"`, add `candidates: {"a":3,"b":1}`, `modeLabels: ["Capital?","Kenya's capital?"]` and `optionToMode: ["a","a","a"]`, and use the same title, hook, question, options, answer, principle and recall as above. The premise stays only half fixed: the stage states "Answers this cue fits: 3" but cannot show recall failing.

### 13. deadline-needs-a-reference (message; predict key stays 0, options reworded)

**Found while writing this patch, and not in the review:** the fixture date `14Oct` is a **Wednesday** in 2026 (checked with `date -d 2026-10-14 +%A`), while the title asks what "Friday" means and the old wrong option was "Friday afternoon". The two predict options named different days. The recall's 16 Oct is a Friday. This patch moves the fixture to 16 Oct.

| Where | Field | Old | New |
|---|---|---|---|
| S, M | `title` | `What does “Friday” mean?` | `When is it due?` |
| S, M | `hook` | `A deadline needs a date and time reference, especially across locations.` | `You work on UTC. Your colleague works on UTC+9.` |
| S | `question` | `Which deadline is explicit in this fixture?` | `Your colleague reads 'Due 16 Oct, 15:00' as their own time. When is that for you?` |
| S | `options` | `["14 Oct 15:00 UTC", "Friday afternoon"]` | `["06:00 UTC, 9 h early", "15:00 UTC, as you meant", "00:00 UTC, 9 h late"]` |
| S | `answer` | `0` | `0` |
| S | `misconception` | `Friday afternoon` | `A date and clock time mean the same moment for every reader.` |
| S | `words` | `["14Oct", "15:00", "UTC"]` | `["16 Oct", "15:00", "UTC"]` |
| S | `principle` | `The date, clock time and time-zone reference define the fixture deadline. Local conversion and daylight-saving rules remain outside this exercise.` | `A date, a clock time and a zone fix one moment. Without the zone, a reader on UTC+9 who assumes their own time aims 9 hours early. Daylight-saving rules are outside this exercise.` |
| S | `engine` | – | `2` |
| S | `modeLabels` | – | `["No zone", "With zone"]` |
| S | `optionToMode` | – | `["a", "a", "a"]` |
| S | `aFields` | – | `2` (A shows Date and Time, Zone `?`; see Gap 2) |
| S | `consequence` | – | `{"label":"Your colleague aims for","a":"06:00 UTC, 9 h early","b":"15:00 UTC"}` |
| M | `recall` | see M | `{"question":"Your team works in London and Tokyo. Which deadline means the same moment for both?","options":["Fri 16 Oct, 17:00 local","Fri 16 Oct, 17:00 UTC","Fri 16 Oct, close of day"],"answer":1,"why":"UTC is one shared reference, so 17:00 UTC is one moment everywhere. 'Local' and 'close of day' each mean a different moment in each city."}` |

Every recall option now has the same date. The key is the shortest option, and it is not the only one with a time.

Claims (all `unverified`):
- `c1`: text → `Scenario and prediction: You work on UTC. Your colleague works on UTC+9. Your colleague reads 'Due 16 Oct, 15:00' as their own time. When is that for you? Correct option: 06:00 UTC, 9 h early. Fixture zones and times are stipulated.` `derivation` (15:00 at UTC+9 = 06:00 UTC).
- `c2`: text → the new `principle`. `derivation`.
- New `c4` (the second reader's reading, as the spec asks): `A UTC+9 reader who takes 'Due 16 Oct, 15:00' as local time aims for 06:00 UTC, 9 hours before 15:00 UTC.` `derivation`.
- New `c5`: `16 October 2026 is a Friday.` Support `source` (any 2026 calendar). Needed because the recall says "Fri 16 Oct".
- `.recall`: text → new `why`. `convention`.

### 14. deleted-is-a-search-state (files; predict key 0 → 2)

| Where | Field | Old | New |
|---|---|---|---|
| S, M | `title` | `Search the missing-file state` | `Where did the note go?` |
| S, M | `hook` | `A file absent from the active list may be in the exercise’s trash.` | `You search for a note you deleted yesterday.` |
| S | `question` | `Which search includes the trashed note?` | `The search lists active files. Is 'notes' in the list?` |
| S | `options` | `["Include trash", "Active only"]` | `["Yes, search lists every file", "Yes, marked as deleted", "No, it is left out"]` |
| S | `answer` | `0` | `2` |
| S | `principle` | `The note has a deleted-state flag. Including that state reveals it in this fixture; retention and recovery rules differ across real products.` | `The note is marked as deleted. A search of active files leaves it out; including deleted items brings it back here. Real products keep deleted files for different lengths of time.` |
| S | `engine` | – | `2` |
| S | `modeLabels` | – | `["Active only", "Include deleted"]` |
| S | `optionToMode` | – | `["a", "a", "a"]` |
| M | `recall` | see M | `{"question":"A search for 'lease' shows nothing, though you saved it last week. What should you try first?","options":["Repeat it on active files only","Widen it to deleted items","Narrow it with 'pdf'"],"answer":1,"why":"If the file was deleted, a search of active files will keep missing it. Including deleted items can show it, within the product's own retention rules. Narrowing cannot find what the search leaves out."}` |

The option no longer repeats "includes". "Deleted-state flag" goes. The v2 strike-through with "not in results" (spec section 4) puts the absence the hook names on the stage.

Claims (all `unverified`):
- `c1`: text → `Scenario and prediction: You search for a note you deleted yesterday. The search lists active files. Is 'notes' in the list? Correct option: No, it is left out. Fixture files are stipulated.` `convention`.
- `c2`: text → the new `principle`. Support `source` (the existing Google Drive Help 2375114 citation, still unopened from this host, per FC LH-3A).
- `.recall`: text → new `why`. Support `source`, same citation. It stays `unverified`, so this lesson's status gate stays shut until the fact-checker opens the source.

---

## Gaps for the engine (interaction-designer / demo-builder; not content)

1. **Per-mode verdict.** `verdict` is a threshold on one result. Bag needs A to read "looks fine (not weighed)" while B reads "1 kg over". Coil needs "sharper" for A and "gentler" for B at every slider value (no single threshold works, because A at r = 20 equals B at r = 10). Proposed: `verdictByMode?: { a: string; b: string }`. Also, when an amount cell is a string (`"not weighed"`, `"10 of 20"`), the unit should not be appended twice.
2. **`aFields` for message lessons.** The spec's message mode A is "first field only". For deadline, the realistic vague deadline is date + time without a zone. Proposed: `aFields?: number` (default 1).
3. **Hidden target at predict for apply-not-quote.** The locked stage shows the sorted target 2, 5, 9 (review). It needs `rowLabels` plus a predict state that reads `? ? ?`.
4. **`optionToMode` reading.** I used "the column the reveal quotes first to judge option i". If the engine uses it for something else (for example, a ▸ on the learner's chosen column), say so and I will remap.

## Unreviewed Life Hacks lessons: how many leak the same way (186)

Method: (a) a structural scan of all 186 spec entries and meta.json files (script kept in the session scratchpad, not the repo; it is heuristic word-overlap and length checks); (b) a hand reading of a sample of 20, every 9th slug in alphabetical order (offset 4), excluding batch D. I judged them only from the text: no walkthroughs, so missing-data findings are not estimated.

**Structural facts (certain, from the specs):**
- **Home, 64 unreviewed:** all 64 build their options from the button labels plus "Same outcome" (the method-name leak, spec R7). 66 of the 69 Home lessons key option 1, so the answer also sits in a fixed position. v2 makes `options` required, so every Home lesson needs content anyway.
- **Study, 60 unreviewed:** 69 of 70 Study specs have two options keyed at index 0. "The first option is right" is a full leak for anyone who has seen two lessons.
- **Resource, 60:** the options are short case names ("A/B/Equal", "Converted/Same digits") and the keys are spread across 0, 1 and 2. Here the leak comes through the title or hook (60 of 60 titles are statements) or a question that defines the answer ("B deliberately divides by ten instead").
- Titles: 183 of 186 are statements, not questions. The scan cannot tell "names the topic" from "states the idea"; the sample can.

**Sample of 20 (P = the predict leaks the answer through option wording, title, hook or a fixed position; R = the recall can be answered without the lesson: longest or only distinct option, common sense, the rule restated in the question, or no losing-prediction distractor):**

| # | Slug | Engine | P | R | Note |
|---|---|---|---|---|---|
| 1 | breeze-is-not-extra-surface | Home | yes | no | "alters flux" → moving air; jargon |
| 2 | dependency-before-priority | Study/order | yes | yes | hook states the rule; recall is common sense |
| 3 | equal-names-not-equal-files | Study/files | yes | yes | title and hook state it; "compare contents" is common sense |
| 4 | flat-pack-volume-dimensions | Home | yes | no | recall is good arithmetic transfer |
| 5 | heavy-book-close-to-back | Home | yes | no | "less turning moment" = near back |
| 6 | laundry-sort-before-walk | Home | yes | no | – |
| 7 | lh-cents-euros-conversion | Resource | yes | yes | hook says "125 cents is not €12.50"; recall is plain conversion |
| 8 | lh-duty-cycle-energy | Resource | yes | no | hook leads ("Should every hour use full power?") |
| 9 | lh-indivisible-shares | Resource | yes | yes | the question states "remainders are kept aside"; recall is 14 mod 3 |
| 10 | lh-percentage-overage | Resource | no | no | a real misconception (10% = 10), and the crossover recall needs thought |
| 11 | lh-sequential-discounts | Resource | yes | no | title "Two discounts do not add" |
| 12 | lh-visit-fee-crossover | Resource | no | no | the hook leans but does not answer |
| 13 | long-cord-knots-itself | Home | yes | no | title "Long cord, more loops" |
| 14 | mug-handle-packing | Home | yes | no | "handle overlap" → "Handle envelope" |
| 15 | preview-replace-all | Study/edit | yes | yes | the recall key is the longest and the only one with an example |
| 16 | ribbon-around-box-length | Home | yes | partial | "both crossed loops" echo; the one-loop misconception is not among the distractors |
| 17 | separate-confusable-pairs | Study/recall | yes | no | hook states the idea; key option is the longest |
| 18 | small-items-in-mesh | Home | yes | yes | recall key repeats the lesson's "boundary is closed" wording |
| 19 | suitcase-layer-access | Home | yes | partial | no "same either way" distractor |
| 20 | trays-slide-out-reach | Home | yes | no | – |

**Estimate:** predict leak in 18 of 20 (90%; roughly 70–97% at 95% confidence). That is about **165–170 of 186** (range about 130–180), including all 124 Home and Study lessons on structure alone. Recall leak in 6 of 20 for certain, plus 2 partial (30–40%), so about **55–75 of 186**. The Study recalls leak most (common sense), and the arithmetic Home and Resource recalls mostly hold. The two clean lessons are both Resource lessons with a real numeric misconception. That is the pattern to copy.

**For W-608's bulk migration:** migrate the engine fields in bulk with the defaults, but do **not** auto-generate `options`. The check's v1/v2 warning should list the lessons still on default options, and cm-lifehacks writes them in batches of 20 (board item below). Leave the wording alone until content exists: a mechanical rewrite would repeat this batch's leak in new words.

## Objections and what happened to them

| Objection (source) | What happened |
|---|---|
| box recall is fair, keep it (box review §3) | Kept unchanged. |
| calendar recall "uses clock times the stage never used" (spec §9) against "best recall in the batch" (calendar review) | Kept. The clock times are the transfer; reason given in block 9. |
| count-setup recall: "addition, but that is the nature of the idea, acceptable" (review) against "recall is addition" (spec §9) | Rewritten so the learner must supply the warm-up step; arithmetic kept. |
| cue: "a position-ordering task cannot show cue ambiguity even with `candidates`" (spec §9) | Agreed. Family change to files proposed, gated on the learning designer; fallback written. |
| apply-not-quote has no misconception for adults (review §3) | Agreed. Patched to close the leak and put forward for the retirement review instead of a third revision. |
