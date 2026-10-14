# Spec: every-second-seat-out

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #72 · wireframe: `every-second-seat-out.svg`

**Format: Storyboard / scrub** (as briefed). The game is a process of 40 removals, so the stage is the circle plus a scrubber over removals, with **two marked key frames**. The first is "32 left", after 9 removals: the count restarts at 19 with a power of two left in the circle, so 19 will survive. The second is "end of lap 1", after 20 removals. The brief's formula (41 = 32 + 9, survivor 2·9 + 1) is something the learner can stand on in the scrubber, not just read in the reveal.

## Brief check (re-run in node, 2026-10-14)
- 41 people, every second removed, starting by skipping 1: removal order 2, 4, …, 40, then 1, 5, 9, …; **survivor 19.** Recurrence and 2L + 1 (41 = 32 + 9) agree. **The brief is right.** Answer B holds.
- After exactly 9 removals (2…18), **32 remain and the next to be skipped is 19**. From then on every lap halves the circle and 19 always stands at its start.
- Chips (every second person): 7 → **7**, 10 → **5**, 41 → **19**. (The brief's n = 7, k = 3 → 4 uses a different skip and is not on this stage.)

## Stage at 390×844 (~400 px at predict, ~540 px in explore)
1. Rule line (muted, 11 words): "Skip one, remove the next, round and round until one is left."
2. **Circle**: n dots of 14 px on a 270 px ring, with seat numbers in 12 px outside the ring (radius 158). Standing = filled `--fg`; removed = small hollow ring with a slash; next to be skipped = `--domain` ring with a pointer arrow. The survivor is drawn larger with a star glyph.
3. **Centre readout**: "Left: 32" (large), and under it "next skip: 19".
4. **Scrubber track** under the circle with tick marks at the key frames, labelled "32 left" and "lap 1 done". This is the slider itself, not a separate drawing.
5. **Table** (readouts): "7 people → ?", "10 → ?", "41 → ?". Filled when that circle finishes.
6. Controls (two rows), see below.

Stage words at the busiest moment: rule line 11 + centre readout 4 + key-frame labels 5 + table (numbers) 3 = 23.

## Controls, in DOM order (6)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Remove next" | one removal: the pointer skips one person and removes the next (200 ms). The scrubber advances one step |
| 2 | Control | "Run to the end" | replays **every** remaining removal in order (9 ms each, ≤ 360 ms for 40), then marks the survivor and fills the table row |
| 3 | Slider | "Removals" (0 … removals made so far) | scrubs back and forth over the removals already made. The circle, centre readout and pointer show that moment. Key-frame ticks at 9 (32 left) and 20 (lap 1 done) for n = 41. Disabled until there is one removal |
| 4–6 | Control chips | "7 people" · "10 people" · "41 people" (group "People") | start: **41 people** active and disabled (the question's circle). Switching restarts with the new n. **If the current circle had finished**, the new one is replayed to the end as #2 (the replay pattern from `a-star-heads-for-goal`) and its table row fills |

All 6 render at first paint, disabled while `locked`, class `.tap` (slider thumb ≥ 44 px).

**Not a jump to the answer.** #2 plays every removal, and scrubbing back shows any moment of it. Learners who want to can press "Remove next" 40 times.

QA path (each control once, DOM order): Remove next (2 removed, left 40) · Run to the end (19 survives; milestone `survivor-41`) · Removals (two ArrowLeft from 40 → 38: 3 left, 19 among them) · 7 people (replay: 7) · 10 people (replay: 5) · 41 people (re-enabled; replay to the end: 19, slider at 40). The QA path ends on 41 with the survivor shown and all three table rows filled.

## States
- **Predict:** 41 standing dots, pointer at 1, "Left: 41", scrubber at 0 with its key-frame ticks **unlabelled** (the labels would cue the answer), table "?".
- **On unlock:** exploration hint: "Run it, then scrub back to where 32 are left."
- **At removal 9 (key frame "32 left"):** 32 dots standing, pointer at 19, readout "Left: 32 · next skip: 19". The tick label appears once the learner has passed it.
- **At removal 20 (key frame "lap 1 done"):** only the 21 odd seats stand; next skip is 41, so 1 goes next.
- **End:** one large dot at 19.
- **Reveal:** stage as left. Reveal quotes the stage: "19 survived. Scrub to removal 9: 32 were left and the count started at 19. With a power of two left, the person the count starts on always survives." Then the brief's payoff, in binary: 41 is 101001; move the leading 1 to the end: 010011 = 19 (claim 2). If the chips were used: "10 gave 5, 7 gave 7: the same rule."

Milestones (`minInteractions=1`): `survivor-41`.

## Shown, not told
The learner watches the circle empty and then finds the moment that decides it: 32 left, the count on 19. The reveal's 32 + 9 is a frame they can scrub to. The binary trick is the reveal's naming of it.

## Colour and access
Standing filled, removed hollow with a slash, the pointer as an arrow glyph, the survivor with a star: shape carries every state. Seat numbers 12 px. Circle `aria-label`: "41 people, 32 left, next skip 19" (tracks the scrubber).

## Notes for others
- **Builder:** the slider max is the number of removals made so far (it grows), so dragging never computes ahead. The "32 left" key frame for 7 and 10 people is at 4 left (removal 3) and 8 left (removal 2) respectively: it is the first time the count left is a power of two.
- **Brief owner (cm-cs-algorithms):** "remove next / run / people chip" kept as briefed; a scrubber with key frames is added (format requirement). The teaching is unchanged.
- No illustration (CS).
