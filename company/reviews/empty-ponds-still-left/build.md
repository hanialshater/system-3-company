# Build note: empty-ponds-still-left

builder: demo-builder (demo-builder-wavej-life) · 2026-10-14 · v1 draft · brief: company/domains/briefs/life.ecology-body.md #3 (check E3) · no spec

- Model as briefed: 100 ponds, ponds 0 to 59 start with frogs; drained = (i × 37) mod 100 < drain; each year, with n = frog ponds at the start of the year, in pond order: drained ponds draw nothing, an occupied pond keeps frogs if rand > 0.2, an empty good pond gains frogs if rand < 1 − 0.995ⁿ. One kit mulberry32 stream per run. runPonds() re-run in node for seeds 1 to 12 matches the check script exactly (seed 1: drain 30 → 33 ponds, 50 → gone year 67, 70 → gone year 23).
- Agent-based flag (brief): 100 cells with no interaction rule beyond the colonisation chance. I built it as a simulation run; the design lead may reclass it.
- Stage: model line (hidden at the reveal), head "year y: k ponds with frogs, g good ponds" (hidden at the reveal), a 10 × 10 grid (frogs: filled circle; empty: outline circle; drained: grey square with a cross; shape and fill, not hue alone), key "● frogs ○ empty ⊠ drained" and "seed s" under the grid, the run log ("30 drained: 33 ponds · 50: gone, year 67 · 70: gone, year 23"), and after a run "Start: 19 frog ponds, refill chance 9% a year" (the cause; hidden at the reveal for phone fit).
- Controls in DOM order (one row of four): Drain 30, Drain 50, Drain 70, New seed. Each drain runs 100 years on the current seed and replays the grid in 350 ms (instant under reduced motion). New seed steps 1 → 2 → … → 12 → 1 and re-runs every drain already in the log, so the log always shows one seed (disabled until a drain has run).
- Deviation from the brief: grid cells are 23 px, not ≥ 28 px, for phone fit (the brief's own fit estimate did not include the reveal); the reveal year is read from the learner's current run (seed 2 gives 21), not fixed at 23.
- Seeds 1 to 12 (claim c2): drain 70 always dies out by year 100 and drain 30 never does, so the reveal's sentences hold on every reachable seed.
- Bug found and fixed while measuring: the replay's first animation frame can carry a timestamp earlier than the press, which gave year −1 and a page error after Drain 50; the frame fraction is now clamped to 0..1 and the year index to 0..100.
- Milestones (minInteractions 2): smaller (drain 30 or 50), d70.
- Claims c1 to c6, all unverified. Levins / Nee and May context not on the card.

## Pre-flight v1

1. **Title and hook.** "Drain the ponds, keep the good ones" / "Frogs live in 60 of 100 ponds. Drain 70 ponds and 30 good ones remain. Enough?" No answer is implied.
2. **Options.** "19 or more" / "About 10" / "None": two numbered, one word; "None" is not more precise than the others.
3. **Locked stage.** The brief's setup text, "60 of 100 ponds have frogs", the full grid with ponds 0 to 59 filled, no drained ponds, "seed 1". No run, no log.
4. **Reveal values.** "gone by year 23" (seed 1; 21 on seed 2): (a) the current log entry for drain 70, on the stage as "70: gone, year 23". "30 good ponds": the 30 circles (drained ponds are crossed squares). "Draining 30 left frogs in 33 ponds": (a) the log entry for drain 30 (or 50, whichever was tried). "60%": model constant (Levins, claim c4), told in one sentence.
5. **QA path.** Drain 30 (smaller), Drain 50, Drain 70 (d70), New seed (seed 2, all three re-run): both milestones in 3 controls; the drain-70 grid (empty) and the log stay on the stage at the reveal.
6. **Reset.** No Reset control. Reveal after the QA path (seed 2): "With 70 ponds drained, the frogs were gone by year 21, though 30 good ponds were still there. Draining 30 left frogs in 8 ponds. / Each pond's frogs die out now and then, and only frogs from other ponds refill it. With few occupied ponds, refills come too slowly to keep up. / In the simplest version of this model, the species is lost once the drained share reaches the share that had frogs before: 60% here. Habitat can outlast its species. Toy model."
7. **Phone fit.** Measured with the `tools/reveal-fit.mjs` logic on the :3530 dev server (a copy with longer page-load timeouts only, artifacts/wavej-life-tools/reveal-fit-slow.mjs, because the shared dev server took 30 s or more a page): crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; revealWords 88 (tool count, verdict line included). Stage parts: picture 208 (the card fitted the grid 208/265), controls 44, text 32. Smallest rendered SVG label over the QA path and at the reveal: 10.2 px (the key under the grid, at the reveal). On screen with the reveal's last line: the grid, the run log "70: gone, year 21" and "30 drained: 8 ponds". Screenshot artifacts/reveal-fit/empty-ponds-still-left.png.

QA: `tests/qa/contract.spec.ts` on :3530 (QA_ONLY, QA_OUT=artifacts/qa-wavej-life, `--timeout=300000` because page loads took 20 to 60 s): phone and desktop pass. An earlier run with the default 45 s timeout failed on page.goto only; one longer-timeout run logged the React "state update on a component that hasn't mounted yet" console error once (same-dose-levels-off, desktop), not reproduced in the next run; other builders attribute it to Fast Refresh rebuilds on the shared server.

## v2: learner r10 fixes (W-839, demo-builder, 2026-10-14)

Review: company/reviews/empty-ponds-still-left/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- The refill formula left the stage: 'an empty pond refills more often when more ponds have frogs' (formula kept in c5).
- Reveal's 60% line is now the average-model line and drain 50's extinctions are said: 'Averaged out, frogs vanish once 60% are drained, the share that had them. Short of that, bad luck can still end them: drained 50, half the runs die out.' Node re-run: mean-field settles at 27.3 / 9.2 / 0.1 / 0.0 frog ponds for drain 30/50/60/70; seeds 1-1,000 die out by year 100 in 0 / 496 / 921 / 996.
- Mechanism and threshold paragraphs merged (fit). c3, c4, c5 rewritten (unverified).

## Pre-flight v2

1. Unchanged.
2. Unchanged.
3. Unchanged.
4. Reveal values: year 21 and 8 ponds (current run, log line); 60% and 'half the runs' told (c4).
5. QA path unchanged.
6. Reset: no Reset (about 77 reveal words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 88 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).

status draft → review (W-996): launch r11, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
