# Build note: earth-history-in-a-day

Builder: demo-builder (demo-builder-bigideas-1) · 2026-10-14 · from brief big-ideas.md #2 (storyboard / scrub: time slider with zoom).

- Numbers re-run in node: age 4.54 Ga; Homo sapiens 300 ka = 5.71 s before midnight (23:59:54.3); end-Cretaceous 66 Ma = 1,256 s (23:39:03.96, shown 23:39:03 because the stage floors seconds); writing 5,200 years = 0.099 s; earliest life 3.7 Ga = 04:26:25. Scale: 1 h ≈ 189 Myr, 1 min ≈ 3.15 Myr, 1 s ≈ 52,546 yr.
- Picture: a clock dial whose full turn is the current view (whole day / last hour / last minute), with a hand, a filled arc for elapsed time, and event dots that fill once the hand passes them. Beside it: the hand's clock time, "years ago", and a found list (Earth forms, then each passed event with its clock time). Caption: the view and its scale.
- Controls, DOM order: Clock slider (scrubs inside the view), Whole day / Last hour / Last minute (active one disabled), Next event ▸ (step button: moves the hand to the next event and zooms in if the event is too close to midnight to see). Zooming in moves the hand to the view's start if it was earlier; it never moves the hand back.
- Milestones: dinos (hand has passed the end-Cretaceous; it is then in the found list), humans (hand has passed Homo sapiens while in the last-minute view; time recorded).
- **Brief changes, flag for cm-big-ideas-science:** (1) the brief's reveal says 18th/19th-century geologists realised slow processes "move continents"; continental drift came in the 20th century (Wegener 1912, plate tectonics 1960s), so the sentence now says "carve valleys and raise mountains" and credits Hutton (c6). (2) "Humans" became "our species, Homo sapiens" to match the 300,000-year source. (3) "ended the dinosaurs" became "ended the non-bird dinosaurs". (4) Options are written to the second ("About 6:00:00 pm") so the right one is not the only exact one.
- Reveal 63 words. Claims c1-c8, all unverified. c5 (earliest life) is labelled "(debated)" on the stage; the drafter left its source open.

## Pre-flight v1

This pre-flight describes the v1 build. Board items W-633 to W-636 (from cm-big-ideas' W-537 re-check) revise these drafts; the builder of each v2 adds `## Pre-flight v2`.

1. **Title and hook.** "Earth's whole history in one day" / "Squeeze 4.5 billion years into 24 hours. How late in the day do we turn up?" "How late" suggests late, but all three options are late in the day; it doesn't say how late.
2. **Options.** "About 6:00:00 pm" / "About 11:30:00 pm" / "About 11:59:54 pm": all to the second.
3. **Locked stage.** Dial at whole-day view, hand at midnight, no arc; no event dots (they are drawn only after the commit); found list shows only "00:00:00 Earth forms"; clock "--:--:--".
4. **Reveal values.** "23:59:54": (b) milestone humans, recorded, and on stage in the found list. "about six seconds before midnight": derived from the same value. "a tenth of a second": told, claim c4 (writing's dot is on the minute dial; it is in the found list only if the learner scrubs to midnight). Hutton sentence and the limit: told, claims c6 and c8/c3.
5. **QA path.** Slider ×2 (00:10:00), Whole day (disabled, skipped), Last hour (23:00:00), Last minute (23:59:00: dinos), Next event (23:59:54.3: humans). Every press changed the stage (own Playwright walk on :3530). At the reveal the minute dial, the 23:59:54 hand and the found list are on screen.
6. **Reset.** No Reset control; the recorded time never changes. Reveal on the QA path: "Our species appeared at 23:59:54, about six seconds before midnight. Writing came about a tenth of a second before the end. From James Hutton in the 1780s, geologists argued that slow processes, given this much time, carve valleys and raise mountains. Where it stops: the clock shows scale, not speed. Some changes were sudden, like the asteroid impact that ended the non-bird dinosaurs."
7. **Phone fit.** verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 70 words with the verdict; stage 341 px (picture 149, controls 144, text 16). **But thumb = true**: the dial is drawn at 0.53 of the scale the stage width allows (149 px tall), because it shares a two-column row with the found list. This fails the W-135 pass bar; fix by drawing the clock readout and found list inside one full-width SVG. Not fixed by me: another builder is editing this Demo.tsx for W-635 right now (board). Measured 2026-10-14 ~17:35 UTC on the shared dev server :3530 with tools/reveal-fit.mjs logic, but run from a scratch copy whose only changes raise the page.goto timeout (30 s → 600 s) and the lesson-render wait (15 s → 900 s): the unmodified tool failed 20+ times on page.goto/render timeouts (the server took 73 s to DOMContentLoaded and 217 s to hydrate). Screenshot artifacts/reveal-fit/earth-history-in-a-day.png. The run measured the files as they stood then, which already included another builder's in-flight v2 edits (W-635).

(v1 item 7 was left as a placeholder, "FIT_EARTH", and never measured. v2 below has the measurement.)

## v2 (2026-10-14, demo-builder-bigideas-pilot): W-635, the W-537 re-check row 2

- **Transfer recall** (the board's case, answer in the cycle-1 check script): "A river cuts 1 mm deeper each year. On the one-day clock of Earth's history, how deep does it cut in the last minute?" About 3 cm / About 3 m / **About 3 km** (1 clock minute = 3.15 million years).
- **Held claims cut back:**
  - The reveal keeps one dated event, Homo sapiens at 23:59:54 (c2, class H).
  - Writing is gone from the stage, the found list and the reveal (c4 withdrawn). The old recall was the only other place it was used.
  - Hutton (c6) stays in the reveal as class P (1788, public domain), marked "cut if not checkable". Fallback: "Given this much time, even a process too slow to see can do large things." (derivation from the scale, c7).
  - Earliest life (c5) is marked "cut if not checkable". Fallback: remove that event from the dial and the found list.
  - The limit no longer uses the asteroid. It now reads "the clock shows how long things took, not how fast they happened. An even spread of time can hide sudden events." (c8, derivation). c3 is now only the dinosaur date on the stage.
  - The reveal adds "On this clock, one second is about 52,500 years." (c7, derivation; the same figure as the last-minute caption on the stage).
- **Still held on the learner path:** the age of Earth c1 (hook and question), Homo sapiens c2, the dinosaur date c3 and earliest life c5. That is 4 of 7 open claims, against the strategy's ≤ 15% target. Deep time is held by nature (strategy section 5: "dates of events"), and the board item asked only for the reveal to drop to one dated event. Whether to cut further, for example the earliest-life dot, is cm-big-ideas' call.
- **Label floor:** a 390 px measurement found the dial labels (midnight, 06:00, noon, 18:00, :15 s and the others) at 7.7 px. `.tick` went from 11 to 15 user units (now 10.6 px). reveal-fit still calls the dial a "thumb" (drawn at 0.53 of the width scale, because of the two-column layout from v1). That is not a phoneFit failure and the labels pass the floor, but a reviewer may want the dial wider.
- Version 2. c2, c3, c5, c6, c7 and c8 are unverified; c4 is withdrawn.

## Pre-flight v2
1. **Title and hook.** Unchanged: "Earth's whole history in one day" / "Squeeze 4.5 billion years into 24 hours. How late in the day do we turn up?"
2. **Options.** Unchanged: "About 6:00:00 pm" / "About 11:30:00 pm" / "About 11:59:54 pm".
3. **Locked stage.** Unchanged (whole-day dial, no event dots, "--:--:--").
4. **Reveal values.** "23:59:54": (b) milestone humans, recorded, in the found list. "about six seconds": derived from it. "one second is about 52,500 years": a constant of the clock (c7), on the caption in the last-minute view.
5. **QA path.** Slider ×2, Last hour, Last minute (dinos), Next event (humans, 23:59:54.3). After that, Next event is disabled because writing is gone. The QA contract passed, phone and desktop (artifacts/qa-bigideas-pilot).
6. **Reset.** No Reset control. Reveal on the QA path: "Our species appeared at 23:59:54, about six seconds before midnight. On this clock, one second is about 52,500 years. From James Hutton in the 1780s, geologists argued that slow processes, given this much time, carve valleys and raise mountains. Where it stops: the clock shows how long things took, not how fast they happened. An even spread of time can hide sudden events."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530` (next dev): fit, crop 0 px, namedHidden 0, phoneFit true, 70 words (tool count), thumb (see above). Smallest stage text 10.6 px at predict and at the reveal.

## v3: learner r10 fixes (W-839, demo-builder, 2026-10-14)

Review: company/reviews/earth-history-in-a-day/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- One slow-process event on the clock: 'Grand Canyon carved, 1.8 km' at 23:58:05 (about 6 million years ago). The Hutton sentence now quotes it: 'From Hutton in the 1780s, geologists argued that slow processes, given this much time, do big things: a river cutting about 0.3 mm a year carved the Grand Canyon's 1.8 km in the last two minutes.' New claim c9 (unverified; the canyon's age is debated, flagged for the fact-checker).
- Hook and question now say 4.54 billion (as the readout does).
- Buttons shortened ('Day', 'Last hour', 'Last min', 'Next ▸') so the four share one row. Not done: naming the dinosaur end as a sudden event (v2 cut the asteroid claim on purpose); an afternoon event at the learner's 6 pm; the pre-existing 'thumb' dial (0.53 scale, two-column layout; also thumb on HEAD).

## Pre-flight v3

1. Hook now 'Squeeze 4.54 billion years into 24 hours. How late in the day do we turn up?'
2. Options unchanged (all clock times).
3. Locked stage unchanged.
4. Reveal values: 23:59:54 (b, humans milestone); 52,500 years (scale, stage header); 0.3 mm, 1.8 km, last two minutes (canyon in the found list once passed).
5. QA path: slider, Last hour, Last min (passes 23:58:05 and the dinosaurs), Next (humans).
6. Reset: no Reset (84 tool words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 84 tool words, thumb true (pre-existing, see above).

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).

## Fact-check rewording (W-938 (FC41), 2026-10-15, demo-builder)

- Reveal paragraph 2 uses the brief's unnamed fallback: 'Given this much time, even a process too slow to see can do large things: a river cutting about 0.3 mm a year carved the Grand Canyon's 1.8 km in the last two minutes.' (Hutton and the 1780s removed; support derivation). c9 (the Grand Canyon depth and rate, still held) is unchanged. The 'thumb' flag is the pre-existing dial at 0.53 scale (see above), not new.
- Claims reset to unverified: c6. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb true, 82 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.

## Fact-check rewording (W-956 (FC42), 2026-10-15, demo-builder)

- c9 cut to what Pass 42 found sourced. Stage event 'Grand Canyon carved, 1.8 km' is now 'Colorado River through Grand Canyon' (dot still at 6 million years ago, 23:58:05). Reveal paragraph 2: 'Given this much time, even a process too slow to see can do large things: at 23:58, 6–5 million years ago, the Colorado River cut through the Grand Canyon, about 1.8 km deep. The age of its deepest parts is debated.' The 0.3 mm a year rate, 'carved the Grand Canyon's 1.8 km' and 'most of' are gone. Clock: 6 Ma = 23:58:05.8, 5 Ma = 23:58:24.8, both '23:58'. Sources in c9 are the ones the fact-checker opened in Pass 42 (PMC13498593, PMC12130896, PMC9343645); the builder did not open them. c6's quoted clause is unchanged, so c6 keeps its verdict.
- Thumb fixed: the dial's viewBox is cropped to the circle ('30 0 180 212', was '0 0 240 212'), so the same grid column draws it larger (labels larger too); side labels moved from R-20 to R-27 so ':45 s' and ':15 s' no longer touch the rim. No layout change; the found list wraps as before.
- Claims reset to unverified: c9. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3661 --strict, next dev, 390x844, tool stamp clean): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, **thumb false** (the card fits the dial to 177/199 px at the reveal), 89 tool words (includes the verdict line and trust link). JSON artifacts/reveal-fit/fc42-fix.json, screenshot artifacts/reveal-fit/earth-history-in-a-day.png.
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3661, QA_ONLY = this lesson and screening-survival-clock): phone and desktop passed (4/4, artifacts/qa-fc42-fix). npm run check passed.

## CM ruling option (c) (W-984, applies W-979, 2026-10-15, demo-builder)

- Applied company/reviews/earth-history-in-a-day/2026-10-15-cm-ruling.md as written. The `canyon` event is removed from EVENTS (no canyon stage label; the found list loses its 23:58:05 line). EVENTS is now life, dinos, humans: `EVENTS[1]` is still `dinos` (`Non-bird dinosaurs end`, at(66e6)), which `check()` uses for the milestone, and `EVENTS[EVENTS.length - 1]` is still humans. v5 history comment added at the top of Demo.tsx.
- Reveal paragraph 2 is now the ruling's text: 'Given this much time, even a process too slow to see can do large things: since the non-bird dinosaurs ended at 23:39, about 66 million years ago, something creeping just 1 cm a year would have moved about 660 km.' Paragraphs 1 and 3 unchanged. Word count 17 + 40 + 24 = 81 (brief limit 90).
- Claims: c6 reset to unverified (text unchanged; source note prepended; checkedBy/checkedOn removed). c9 set to `withdrawn`, ruling note appended, text and source kept as they were. c10 added (derivation, unverified): 66e6 years x 1 cm a year = 6.6e7 cm = 660 km (builder node re-run); date and clock time from c3. Nothing marked verified; a fact-checker who is not the builder re-checks c6 and c10.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3663 --strict, next dev, 390x844, tool stamp clean): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false (dial fitted 177/199 px), 88 tool words (includes the verdict line and trust link). JSON artifacts/reveal-fit/w984.json, screenshot artifacts/reveal-fit/earth-history-in-a-day.png.
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3663, QA_ONLY=earth-history-in-a-day): phone and desktop passed (2/2). A full `playwright test` run with QA_ONLY set first failed 4 feed.spec tests (chips, spaced revisit); tests/qa/feed.spec.ts re-run without QA_ONLY passed 5/5 on phone, so I read that as the filter or a cold dev compile, not this change. npm run check passed; tsc --noEmit clean.
- Not done here (ruling): r10 finding 4 is only partly met (told sentence, not shown on the stage); a distance readout is the interaction designer's call. The walkthrough is still from before v4.
