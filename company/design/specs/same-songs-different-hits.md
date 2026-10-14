# Spec: same-songs-different-hits

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review (design lead approves) · brief: `company/domains/briefs/probability.chance.md`, NCM batch 1 #3 · wireframe: `same-songs-different-hits.svg` · inbox item S2-20

**Format: simulation run, small multiples.** Design-lead ruling 2026-10-14 (`company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §1, boundary test): 8 independent worlds, no agent sees another world, and the learner reads rankings, not a spatial pattern, so this is not ABM. The simulation-run rules apply: seeded (mulberry32, disclosed), a run button with a step button beside it, and the reveal quotes the learner's own run.

**Why small multiples:** the misconception ("the best song always rises") is about *one* world. The idea is that the same songs give different hits *across* worlds. The learner has to see all 8 at once, and then see them become almost identical when copying is off. One picture, 8 small panels, read as one row of finishes.

## The rule (disclosed on the card, identical in code, meta and fact-check)
8 songs with appeal 1.0, 1.1, ..., 1.7 (song 8 is the best). World *k* uses `mulberry32(k)`, k = 1..8. 1,000 listeners arrive one at a time. Each listener draws **one** `u = rng()`, computes weights `w_i = appeal_i × (1 + picks_i so far)` (copying on) or `w_i = appeal_i` (copying off), and picks the first song *i* (scanning 1 to 8) where `u × Σw` falls in its cumulative interval. **Finish** of the best song = 1 + number of songs with strictly more picks. Copying off uses the same seed and the same draws, so "same songs, same listeners, only the rule differs" is literally true.

**Designer's node re-run of exactly this rule (2026-10-14), matches the brief:**
- Copying on, seeds 1–8: best song finishes 3, 1, **7**, 1, 4, 1, 1, 3 (lowest 7th, world 3: picks 33, 40, 7, 38, 214, 158, 482, 28). Top song's share 34.9, 38.7, 48.2, 46.3, 36.9, 44.5, 42.9, 43.9% (35–48%).
- Copying off, same seeds: 2, 1, 2, 1, 2, 1, 2, 1 (lowest 2nd). Top share 14.7–17.6% (15–18%). No ties for the best song's place in any of the 16 worlds.
- Early lock-in (copying on), finishes at 100 / 200 / 300 / 500 listeners: world 3 is 7th at every checkpoint; worlds 5 and 8 drift (5/6/5/4 and 5/6/6/6). Copying off at 100 listeners is noisy (world 8: 4th, world 3 and 5: 3rd) and settles by 1,000. So **the reveal quotes only 1,000-listener states** (see Summary readout).
- Robustness, 500 blocks of 8 worlds with seeds 1000 + 8b + j (my seed rule): copying on, lowest finish 5th or lower in 70.2% of blocks and 7th or 8th in 36.8%; off, 4th or higher in 98.2%. The brief's 73% / 38% / 98% used an unstated block seed rule; same picture. If any of these reach learner text, the claim must state the seed rule.

## Stage at 390×844 (stage ~366 px wide, ~470 px tall in explore)
1. **Rule line** (muted, 11 px), active rule substituted: copying on "Pick chance = appeal × (1 + earlier picks)"; copying off "Pick chance = appeal only". Second line (10 px): "Worlds = seeds 1–8 · appeal 1.0–1.7".
2. **8 mini bar charts, 2 rows × 4**, each 80 × 70 px with 9 px gutters (347 px total, fits 366). Inside each: world number top-left (9 px, muted), 8 bars in **fixed song order** (appeal increasing left to right; never sorted, so the same song is in the same place in every world), bar 6.5 px wide at 8.6 px pitch, baseline 1 px. Bar height = that song's **share of picks so far**, on a fixed 0–50% scale shared by all panels and both modes (48.2% is the highest value reachable). Song 8's bar is `--domain` filled and has a ▲ under its slot; other bars `--muted`. The triangle and the fixed rightmost position carry "best song", hue is the second cue.
3. **Per-panel finish** under each chart, 12 px: "7th" (numbers only, no words), "?" before any listener. The panel(s) with the lowest finish in the current state get a dashed 1.5 px frame and a bold finish.
4. **Legend + count row:** "▲ best song" left; "Listeners 300 / 1,000" right.
5. **Summary readout** (12 px bold): "Best song's lowest finish: on 7th · off 2nd". Each mode's value appears **only after that mode has reached 1,000 listeners** (else "?"). This is the line the question is about and the line the reveal quotes; it keeps the copying-on result visible after the learner switches off.
6. Controls (§ below), two rows.
7. Stage SVG `aria-label` = current state, e.g. "Copying on, 1,000 listeners: best song finishes 3, 1, 7, 1, 4, 1, 1, 3". Each panel `aria-label` "World 3: best song 7th of 8, top song 48%".

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Step | "+100 listeners" | adds 100 listeners in all 8 worlds (current rule). Disabled at 1,000 |
| 2 | Run | "All 1,000" | computes synchronously to 1,000, then replays bar growth in ≤ 400 ms (instant under reduced motion). Milestone fires on press from the computed result. Disabled at 1,000 |
| 3–4 | Chips, group label "Copy others" | "On" · "Off" | start: On active (`className="active"`, disabled). Pressing the other chip recomputes all 8 worlds **at the current listener count** under the other rule (same seeds, same draws), ≤ 300 ms bar transition, rule line changes. Listener count is kept, so at 1,000 the switch shows the other rule's finished worlds directly |

All 4 render at first paint, disabled while `locked`. Each enabled press changes the stage (bars, count, rule line or finishes). The brief's single toggle becomes two chips so each state is a visible, active-disabled button (the herd-immunity pattern) and the QA path presses exactly one of them.

**QA path** (each enabled control once, in DOM order, ~450 ms apart), after predicting:
1. "+100 listeners": copying on, 100 listeners. Leaders already visible; world 3's best song already 7th.
2. "All 1,000": copying on, 1,000 listeners, finishes 3, 1, 7, 1, 4, 1, 1, 3; world 3 dashed; summary "on 7th · off ?". **Milestone `copy-1000`.** Controls 1–2 disable.
3. "On": disabled (active), not pressed.
4. "Off": same 8 worlds at 1,000 without copying: near-flat charts, finishes 2, 1, 2, 1, 2, 1, 2, 1; worlds 1, 3, 5, 7 dashed; summary "on 7th · off 2nd". **Milestone `nocopy-1000`.**

**End state = the brief's key state** (all 8 worlds viewed with copying on, then copying off), and the summary shows both values the reveal quotes. If the learner goes Off first and then On, both milestones are still reached and the summary is the same.

Milestones (`minInteractions=2`): `copy-1000` (all 8 worlds at 1,000 with copying on), `nocopy-1000` (all 8 at 1,000 with copying off). `interact()` on every control press.

## States
- **Predict (locked):** rule line (copying on), 8 empty panels (frames, baselines, world numbers, ▲), finishes "?", "Listeners 0 / 1,000", summary "on ? · off ?". No bar, no finish, no share before the prediction: the answer (7th) cannot be read off the stage. Options A 2nd / B 4th / C 7th of 8 in the kit's predict block.
- **Explore, stepping (on):** bars grow as shares; by 100 listeners each world has a leader and they differ; by 300 most finishes stop changing.
- **Explore, 1,000 (on):** tall leaders of 35–48%, different songs leading in different worlds, best song 7th in world 3.
- **Explore, off:** eight nearly identical slopes rising left to right, no bar above 18%, best song 1st or 2nd everywhere.
- **Reveal:** the stage stays as the learner left it (no reset); the summary line holds both 1,000-listener values. The reveal may quote only: the summary's two finishes (7th, 2nd), the world number of the 7th (world 3), and the top-share ranges it showed (35–48% on, 15–18% off), each only if the corresponding milestone fired (both are required to unlock, so both are reached). Draft for the builder (owner of the final text is the learning designer / builder, not me): "In your copying worlds the best song finished as low as 7th (world 3), and each world's top song took 35–48% of the picks. With copying off, the same songs and the same listeners put it 1st or 2nd everywhere, with no song above 18%. Early luck compounds when people copy." Then the toy-model caveat. The MusicLab sentence (brief claim 4) only after the human source check, and never as "this reproduces the study".

## Stage words (budget 25, numbers and symbols not counted)
Rule line on: Pick, chance, appeal, earlier, picks (5) [off: Pick, chance, appeal, only (4)] · second line: Worlds, seeds, appeal (3) · legend: best, song (2) · count: Listeners (1) · summary: Best, song's, lowest, finish, on, off (6) · controls: listeners, All (2) · chip group: Copy, others, On, Off (4). **Total 23.** Per-panel text is numbers only. Keep it that way: a per-panel word ("Best: 7th") would cost 8 words.

## Shown, not told
The 7th place is read off the learner's own panel 3, and the near-identical off charts are on their stage. The rule line says the only difference is "× (1 + earlier picks)"; the reveal names what that did.

## Colour and access
Best song `--domain` fill + ▲ + fixed rightmost slot; other bars `--muted`; frames `--line`, lowest-finish frame `--fg` dashed (not colour). Finish numbers `--fg`. Chips and buttons ≥ 44 px tall (`.tap`), "+100 listeners" ~110 px, "All 1,000" ~90 px, chips ~60 px. Bars are display only (not tappable), so the 6.5 px bar width does not touch target rules. Reads in dark theme: bars use variables only.

## Notes and routing
- Not ABM, no new format, no kit change. Built by hand in `Demo.tsx` (builder).
- Claims for the builder's meta (from the brief, now with the rule above): seeds 1–8 lowest finish 7th on / 2nd off; top share 35–48% / 15–18%; the rule as stated; "same draws in both modes" is a property of the code (support: the lesson's code).
- Visual designer: check the ▲ and dashed-frame cues at 80 × 70 px, and that "on 7th · off 2nd" fits one line at 390 px.
- No illustration.
