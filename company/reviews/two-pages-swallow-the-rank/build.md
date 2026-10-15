# Build note: two-pages-swallow-the-rank (demo-builder, 2026-10-14, wave J cs)

- Format: single card, preset chips (5 rounds / 50 rounds) and a jump toggle (Add 15% random jumps / No jumps); the active chip is disabled. No animation: each chip redraws at once.
- Stage: six display-only pages (A-F, 14 px labels), directed arrows, E and F inside a dashed outline labelled "E + F" (no arrow leaves it: the cause the brief's doesNotKnow names). A score bar beside each page (70 px per whole score). Readouts Round and E + F; a trace line "At 50: no jumps 100.0%, jumps 69.9%" fills in as each 50-round state is reached.
- Numbers: `model.ts` is the exact rule the stage draws (power iteration, start 1/6; s = 1 or 0.85 with 0.15/6 to every page). Node re-run 2026-10-14 matches the brief's J4: basic 79.17% at 5, 100.00% at 50; scaled 64.84% at 5, 69.85% at 50 and 200.
- Milestones (minInteractions 2): basic-50 (50 rounds, no jumps: the question's case) and jumps-50 (50 rounds with jumps).
- Brief deviation: none in mechanics. categoryManager written as cm-cs (as the sibling PageRank lessons).
- All claims unverified. c4 (the term "rank sink") and c5 (scaled PageRank as the fix) need the fact-checker; E&K section 14.3 is unconfirmed.

## Pre-flight

1. Title and hook: "Where does all the score go?" / "Pages pass their score along links. Does every page keep a share?" They pose the question; neither says the pair takes it all.
2. Options: "About 33%", "About 67%", "About 100%". All numbered, same precision.
3. Locked stage: round 0, every bar at 1/6, readout "E + F 33.3%" (the starting state; it matches a wrong option, not the answer). No target line or limit drawn.
4. Reveal values: 100.0% (milestone basic-50, from model), A to D 0.0% (same milestone), 69.9% (milestone jumps-50). All three are in the stage trace line or readout when the reveal opens.
5. QA path: 5 rounds (79.2%), 50 rounds (basic-50, 100.0%), Add jumps (jumps-50, 69.9%), No jumps (back to 100.0%). Both milestones reached; the trace shows both values.
6. Reset: there is no Reset; the chips are the only state, and the trace keeps both 50-round values. Reveal text from the QA run: "No arrow leaves the E + F outline, so score that reaches E or F never comes back out. Round by round it drains in: your 50 rounds left E and F with 100.0% and A to D with 0.0%. That is a rank sink. / With 15% random jumps, part of every score lands on a random page each round, so E and F kept 69.9% and every page kept some. Scaled PageRank adds these jumps to fix sinks."
7. Phone fit: crop 0 px, reveal 84 words with the verdict, phoneFit true, namedHidden 0 (Measurement v1 below).

## Measurement v1 (2026-10-14, shared dev server :3530)

- Phone fit (390x844, `tools/reveal-fit.mjs` logic, after the QA path including Reset): crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, reveal 84 words including the verdict line. Source: console output of the run (the JSON file was in artifacts/qa-wavej-cs/, which the later QA run cleared); screenshot artifacts/reveal-fit/two-pages-swallow-the-rank.png (looked at). Caveat: the shipped tool timed out on page load on the loaded host (load average 25-45), so I measured with a temporary copy that only raised its goto and render timeouts (deleted afterwards). Stage SVG text 11-16 px in the viewBox, drawn at about 1:1 on a 390 px phone; HTML text at least 0.72rem.
- QA contract (`tests/qa/contract.spec.ts`, QA_ONLY the five wave J cs slugs, --workers=1, with the `--timeout=400000` CLI flag because pages took 45-115 s to load): phone passed, desktop passed. Log: artifacts/qa-wavej-cs-run2.log.

## Fact-check rewording (W-938 (FC41), 2026-10-15, demo-builder)

- Reveal: 'Scaled PageRank adds these jumps to fix sinks' became 'PageRank adds these jumps to fix sinks'. Source now names the Page et al. text the fact-checker opened in pass 38.
- Claims reset to unverified: c5. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 83 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.
