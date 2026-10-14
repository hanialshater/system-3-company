# Build note: twenty-flips-run-of-five (demo-builder, wave-i-probability, 2026-10-14)

Brief: `company/domains/briefs/probability.chance.md` Round 3 item 1. Status draft, version 1. Claims c1-c6 unverified (c6 is a citation kept out of learner text, needs a human source check).

- Stage: real sequence row (latest real sequence, longest run bracketed, red when 5+), the learner's own 20-slot tap row (bracketed), histogram of longest runs (<=2, 3, ..., 8+; 5+ bars gold) with counts; readouts "Real sequences" and "Run of 5 or more".
- Controls in DOM order: Run 1,000 real, Step one real, H, T, Clear taps. Real sequence k = mulberry32(k), k = 1, 2, 3, ... (seeds not chosen; c2). Step adds one sequence to the same tally, so the histogram is one stream.
- Milestones: "thousand" (tally >= 1,000) and "stepped" (Step one real pressed once).
- Departures from the brief: (1) the reveal's last sentence (Bar-Hillel and Wagenaar) is not used; per the brief's fallback the reveal compares the learner's own 20 taps with their real tally instead (only when all 20 are tapped). (2) "Reset" is "Clear taps": it clears only the learner's taps, never the real tally. (3) Bins stop at 8+ (brief said 10+) to keep bars wide on a phone.
- Node checks (2026-10-14): exact P(run >= 5) = 0.4584; seeds 1..1,000: 475 (47.5%); 1..1,001: 476 (47.6%), bins 14/219/292/218/143/61/54; 1..100,000: 45.85%.

## Pre-flight v1
1. **Title and hook.** "A run of five in twenty flips" / "Write 20 coin flips that look random. How streaky is a real coin?" A question with no figure; nothing says whether a run of 5 is common or rare.
2. **Options.** "About 5%" / "About 20%" / "About 45%": all numbered, same precision.
3. **Locked stage.** Two empty 20-slot rows labelled "Real sequence: none yet" and "Your taps: none yet", an empty histogram axis with bin labels <=2..8+, readouts "0" and "-". No bars, no percentages, no bracket. The 5+ bins are coloured only once bars exist.
4. **Reveal values.** "your 1,001 real sequences" and "47.6%": (a) the current tally (Run/Step reach the milestones; Clear taps never touches it). "45.8%": told exact value (claim c1), not a learner state. "The tallest bar is a longest run of 4": (a) computed from the tally. "real #1,001 has a run of 5": (a) the sequence drawn in the real row. "Your 20 taps ran at most k ... x% of real sequences stayed that short": (a) taps and tally, shown only when all 20 slots are filled.
5. **QA path.** Run 1,000 real (milestone thousand), Step one real (milestone stepped, tally 1,001), H, T, Clear taps: both milestones in the first 2 presses. At the reveal the histogram, the "Run of 5 or more 476 (47.6%)" readout and real row #1,001 with its red bracket are on stage.
6. **Reset.** Clear taps is the last press on the QA path. Reveal on that run: "In your 1,001 real sequences, 47.6% had a run of 5 or more of the same face; the exact chance is 45.8%. The tallest bar is a longest run of 4, and real #1,001 has a run of 5. Each flip repeats the last face half the time, because the coin has no memory, so long runs pile up." Every sentence matches the stage (taps sentence omitted because fewer than 20 taps).
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 twenty-flips-run-of-five` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, 65 words with the verdict (59 reveal; worst case with the 20-taps sentence 76). Stage 359 px (picture 181, controls 70, text 60), reveal 184 px, window 618 px. Screenshot `artifacts/reveal-fit/twenty-flips-run-of-five.png`.

Not run: next build, QA, walkthrough (per task). tsc and check pass.

## v2 (2026-10-14, demo-builder, FC pass 35 fix W-498)

- model.ts: Tally gains `runs` (an exact count per longest run, 0..20), and atMost sums it, so a learner run of 8 or more no longer reads 100%. Display bins are unchanged. A node re-run over seeds 1..1,001 gives k = 8 97.5%, 9 99.0%, 12 99.9%. c5 text is unchanged.
- The affected claims were reset to unverified, for a fresh fact-checker. QA and reveal-fit were NOT run to completion: the :3530 dev server took 90 to 160 s to render a lesson (load 30 to 44), against the contract's 45 s. `tsc --noEmit` passes.

## QA and fit re-run (2026-10-14, demo-builder, W-638)

- The pass 35 wording fix (above) is unchanged; pass 36 has already re-checked it. This entry only re-runs the checks that timed out before. Dev server :3631 (worktree fixes-1, HEAD 57cea14), warmed before the runs.
- reveal-fit (tool clean, 390x844): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, undefined words measured (verdict line included; reveal at most 90).
- QA contract (tests/qa/contract.spec.ts, QA_ONLY on the 7 FC35-fix lessons): phone and desktop both pass (14/14 across the 7). This was a dev-server run, not a production build.
