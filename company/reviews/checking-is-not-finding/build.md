# Build note: checking-is-not-finding (demo-builder, 2026-10-14, wave J cs)

- Format: single card, presets Check 4 + 5, Search for 9, Search for 13, Add a 7th number, Reset (DOM order = QA path).
- Stage: six number chips (16 px) and a grid with one square per group (64; 128 with the 7th number, chip 7 dashed). A search fills squares in binary counting order (instant, no animation); the hit square for 9 is highlighted and its chips lit. Status line, readouts Groups tried and Groups, trace "check: 1 · find 9: 21 · prove no 13: 64 · 7 numbers: 128" (survives Reset).
- Added beyond the brief: the squares grid. The brief asks for chips and a counter; the grid makes "how many groups" something the learner sees fill (64, then 128) rather than a number only. Squares are not controls.
- Searches and Check always act on the question's six numbers (they remove the 7th), so "Search for 13" never finds 4 + 2 + 7.
- Numbers: `model.ts`; node 2026-10-14: first sum 9 is the 21st group tried ({4, 5}; the other is {3, 4, 2}); no group sums to 13.
- Milestones (4): check, find9, none13, seven.
- All claims unverified; c4 (NP, P versus NP, subset sum NP-complete) needs the fact-checker. Wording keeps "nobody knows", never "impossible".

## Pre-flight

1. Title and hook: "Quick to check. Quick to find?" / "Checking a sum takes one addition. How much work is finding one?" They state the check cost (given in the question too), not the answer.
2. Options: "6", "12", "64". All numbered, same precision.
3. Locked stage: six chips only; readouts "Groups tried 0" and "Groups –". The squares grid (64) and the Groups count are drawn only after the first press (first build drew 64 empty squares and "Groups 64" before the commit, which matched the right option; fixed).
4. Reveal values: 1 addition (milestone check), 21st (milestone find9), 64 (milestone none13), 128 (milestone seven). All in the trace when the reveal opens.
5. QA path: Check, Search 9, Search 13, Add 7th reach all four; Reset last clears the stage to 64 empty squares (the grid stays once any button was pressed); the trace keeps all four.
6. Reset: reveal after Reset: "Checking 4 + 5 took one addition. Finding a group meant trying them: the 21st group made 9, and proving that nothing makes 13 took all 64. One more number doubled the squares to 128. / For problems like this, called NP problems, a proposed answer is quick to check, yet nobody knows a method that always finds one without a search that grows this fast. Whether such a method exists is the P versus NP question."
7. Phone fit: crop 0 px, reveal 80 words with the verdict, phoneFit true, namedHidden 0 (Measurement v1 below).

## Measurement v1 (2026-10-14, shared dev server :3530)

- Phone fit (390x844, `tools/reveal-fit.mjs` logic, after the QA path including Reset): crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, reveal 80 words including the verdict line. Source: console output of the run (the JSON file was in artifacts/qa-wavej-cs/, which the later QA run cleared); screenshot artifacts/reveal-fit/checking-is-not-finding.png (looked at). Caveat: the shipped tool timed out on page load on the loaded host (load average 25-45), so I measured with a temporary copy that only raised its goto and render timeouts (deleted afterwards). Stage SVG text 11-16 px in the viewBox, drawn at about 1:1 on a 390 px phone; HTML text at least 0.72rem.
- QA contract (`tests/qa/contract.spec.ts`, QA_ONLY the five wave J cs slugs, --workers=1, with the `--timeout=400000` CLI flag because pages took 45-115 s to load): phone passed, desktop passed. Log: artifacts/qa-wavej-cs-run2.log.

## Revision v2 (demo-builder, 2026-10-14, wave-J fact-check disputes)

Fact-check 2026-10-14 disputed c4 (W-686): 'nobody knows a method that always finds one without a search that grows this fast' is false, since meet-in-the-middle grows about 1.41x per number, not 2x. The reveal now reads '...yet nobody knows a method that finds one quickly in every case.' c4 rewritten and reset to unverified. Still open: c4 needs an openable source for subset-sum NP-completeness (CLRS 34.5.5 and Karp 1972 were not opened).

Local checks, 2026-10-14, own dev server :3600 (worktree, NEXT_DIST_DIR=.next-fix): computer-use QA (unmodified tests/qa/contract.spec.ts, QA_OUT=artifacts/qa-wj-disputes) phone and desktop pass for all 8 wave-J dispute lessons; npm run check passed; tsc --noEmit clean. reveal-fit at 390x844 (REVEAL_FIT_TIMEOUT_MS=300000, --shots, artifacts/reveal-fit/wj-disputes.json): verdict fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true.

## v3: learner r10 fixes (W-839, demo-builder, 2026-10-14)

Review: company/reviews/checking-is-not-finding/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- The Groups readout says why: 'Groups: each number in or out' = '2⁶ = 64' (2⁷ = 128 with a 7th number). The 'Groups tried' readout was removed (the status line carries it) so the stage fits.
- The search is framed as one by one: question 'Trying groups one by one, how many to prove none sums to 13?', status 'Nothing makes 13 · all 64 tried, one by one'; reveal p2 opens 'A shortcut can help on one list, but for problems like this, …' (this list has a shortcut: 34 and 12 cannot be in a 13; disclosed in c2).
- When the reveal opens after Reset, the stage returns to the all-64 grid (none13). c1, c2, c4 rewritten (unverified); c3 unchanged.

## Pre-flight v3

1. Title/hook unchanged.
2. Options '6', '12', '64': all numbered.
3. Locked stage: six chips only, no grid.
4. Reveal values: 21 and 64 (b, milestones; trace line and restored grid), 128 (b, trace).
5. QA path unchanged; Reset last, the reveal restores the 64 grid.
6. Reset: reveal text unchanged apart from p2's first clause (74 words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 84 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).
