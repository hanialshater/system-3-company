# Build note: last-survivor-is-not-the-most-common (demo-builder, 2026-10-14, wave J cs)

- Format: single card, presets Run stream 1, Count again, Run stream 2, Step, Reset (DOM order = QA path).
- Stage: the stream as seven letter tiles (A filled, B outlined, C dashed: shape before colour); processed tiles dim and show "candidate:counter" after them (12 px), a pointer marks the next tile. Readouts Candidate and Counter; a second-pass line ("C: 2 of 7 · not a majority · A had 3" / "A: 5 of 7 · majority"); trace "stream 1 → C (2 of 7; A had 3) · stream 2 → A (5 of 7)" survives Reset.
- Brief reading: Run stream 2 shows its second-pass count at once (the brief gives its readout with the run); Count again is the step for stream 1. Step processes one tile of the current stream; Reset returns to stream 1, nothing processed.
- Numbers: `model.ts`; node 2026-10-14: stream 1 counters A1 A2 A3 A2 A1 A0 C1 (final C), stream 2 A1 A2 A1 A2 A1 A2 A3 (final A, 5 of 7).
- Milestones (3): survivor-C, checked-none, majority-found.
- The method's name (Boyer-Moore, MJRTY) is not shown to the learner; c5 records it for the fact-checker.
- All claims unverified.

## Pre-flight

1. Title and hook: "Who is left standing?" / "One candidate, one counter, seven items. Which item survives the cancelling?" No letter named.
2. Options: "A", "B", "C". Same form.
3. Locked stage: the seven stream-1 tiles, pointer at the first, Candidate "–", Counter 0. No tile marked.
4. Reveal values: C, "A appeared 3 times and C only 2" (milestone survivor-C, from model), "2 of 7" (milestone checked-none), "5 of 7" (milestone majority-found). All in the trace when the reveal opens.
5. QA path: Run stream 1 (survivor-C), Count again (checked-none), Run stream 2 (majority-found), Step (disabled at the end of a stream, so skipped), Reset.
6. Reset: reveal after Reset: "Stream 1 left C as the candidate, though A appeared 3 times and C only 2. Each −1 cancels two different items. With no item in more than half the stream, whatever survives proves nothing, and the second count showed C in only 2 of 7. / In stream 2, A filled 5 of 7 places, and that many copies cannot all be cancelled, so A survived. One counter finds a majority if there is one; a second pass checks that there is." Every number is in the trace.
7. Phone fit: crop 0 px, reveal 87 words with the verdict, phoneFit true, namedHidden 0 (Measurement v1 below).

## Measurement v1 (2026-10-14, shared dev server :3530)

- Phone fit (390x844, `tools/reveal-fit.mjs` logic, after the QA path including Reset): crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, reveal 87 words including the verdict line. Source: console output of the run (the JSON file was in artifacts/qa-wavej-cs/, which the later QA run cleared); screenshot artifacts/reveal-fit/last-survivor-is-not-the-most-common.png (looked at). Caveat: the shipped tool timed out on page load on the loaded host (load average 25-45), so I measured with a temporary copy that only raised its goto and render timeouts (deleted afterwards). Stage SVG text 11-16 px in the viewBox, drawn at about 1:1 on a 390 px phone; HTML text at least 0.72rem.
- QA contract (`tests/qa/contract.spec.ts`, QA_ONLY the five wave J cs slugs, --workers=1, with the `--timeout=400000` CLI flag because pages took 45-115 s to load): phone passed, desktop passed. The first desktop run failed only on the dev-server console warning "Can't perform a React state update on a component that hasn't mounted yet" (the same page logs it on a plain load with no interaction); the re-run passed phone and desktop (artifacts/qa-wavej-cs-rerun). Log: artifacts/qa-wavej-cs-run2.log.
