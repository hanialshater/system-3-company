# Build note: kmp-never-steps-back (algo-pair-09, 2026-10-14)

Built from brief #36 and the wireframe company/design/specs/kmp-never-steps-back.svg (no spec .md existed). Two stacked strips driven by Compare and Compare x4. Reveal unlocks at the first miss (comparison 4), not at the match; the reveal text quotes only the comparison count reached (14 and 24 appear only if reached). No jump buttons. Traces (24 naive, 14 KMP, back moves 1/3/5 and 0, table 0 1 2 0) re-run in node. All claims unverified.
The brief said "never re-reads text"; that is false (14 comparisons over 9 letters), so the lesson says the arrow only moves right.
Skipped (machine out of memory): next build, tsc, QA, walkthrough. Only `npm run check`. I fixed likely null-narrowing type errors by eye.

## Revision v5 (wave E, r6 learner review)

- r6 main (the miss and the number it uses were never marked): the reuse lane now marks each miss ✗ (it did before, but "Compare ×4" jumped over it), boxes the table cell the miss uses (the 2 under the third A), and on the next comparison draws the kept A's ticks in the domain colour. A caption under the lanes says it in words, computed from the step: "Reuse: ✗ B ≠ A. The 2 under the last match says keep 2 A's: slide 1." then "the kept A's are not read again; the same text letter is next."
- "Compare ×4" replaced by "To next miss", which stops on the next reuse-lane miss. Milestones: saw-miss (k on a miss while not running) and both-done. "Run to end" alone cannot open the reveal.
- r6 #2 (Run to end took about 2 s, past the QA wait): now 14 ms a step, about 300 ms. The step buttons are there for watching.
- r6 #3: lane label type 10 → 12 px; label shortened to "number under each letter: A's kept".
- Changed claims c3, c7 and new c8 are unverified.

## Pre-flight v5

1. Title and hook: "A miss tells you where to look" / "Must a search ever step back?" They say the reuse search is cleverer, which rules out nothing among 24 / 14 / 4 by itself. 24 is in the stem as the restart count.
2. Options: "24" / "14" / "4". All bare numbers.
3. Locked stage: two lanes, text AAAAAAAAB, pattern AAAB, the table 0 1 2 0, counters "Comparisons 0 · arrow moved back 0". No 14 anywhere; no caption while locked.
4. Reveal values: 24, 5 (restart back moves), 14 and 0 (reuse back moves): shown in the lane tallies at milestone both-done (b), and nothing resets them. "The boxed 2 under the third A": seen at milestone saw-miss (b), and the end caption repeats "5 misses, each kept 2 A's". "3 + 2 × 5 + 1 = 14": 5 is KMP_MISSES.length, the same number the end caption shows.
5. QA path: Compare (k 1) → To next miss (k 4, ✗ and boxed 2 on stage: saw-miss) → Run to end (k 24 in about 300 ms: both-done). Stage at reveal: both tallies "Found at comparison 24 · moved back 5" and "Found at comparison 14 · moved back 0", end caption "Reuse: 5 misses, each kept 2 A's. Arrow moved back 0."
6. Reset: there is no reset control; the stage cannot go back after both-done. Reveal: "Restarting one on needed 24 comparisons and moved its arrow back 5 times, re-reading A's it had already matched. Reusing the match found AAAB at comparison 14 and moved back 0 times. / Why 14: every miss (✗) came after AAA had matched, and those A's are known text. The boxed 2 under the third A said keep two of them, so the pattern slid one place and the next comparison was the same text letter, never one to its left: 3 + 2 × 5 + 1 = 14. / That table (0 1 2 0) is the fallback table of the KMP search."


## 2026-10-16 v6: Start over (W-1352, demo-builder, batch 2026-10-16-r5b-cs.md#B1)

- Defect: pressing "Run to end" first animated k to 24 without stopping on a miss, so `saw-miss` was unreachable, and at k = 24 every control was disabled. The only way out was a reload.
- Fix (cm-cs ruling W-1352): while `over` (k = 24) the third button shows **Start over** in place of "Run to end". It sets k back to 0. Milestones already reached stay reached (useMilestones keeps them; repeats are ignored). After Start over, "To next miss" stops on k = 4 and `saw-miss` is reached. While `over` and `saw-miss` is not yet reached, the caption is the instruction "Start over, then stop on a miss to see what the reuse lane keeps." That is an instruction, not a factual claim, so no claim was added.
- Placement choice: relabel in place, so the row stays at three buttons on a phone. The screenshot at k = 24 shows Compare and To next miss dimmed, Start over active, and the instruction above. I kept it because the walk below reads cleanly. The tradeoff: Start over exists only at k = 24, not "whenever k > 0". Before k = 24 a learner can still reach a miss with Compare or To next miss (any stop on a miss counts), so no state before 24 needs it. Lane 6 owns the look; a fourth control is the alternative cm-cs allowed.
- Unchanged: predict, reveal text, claims c1 to c8 (text and status), the explore hint. meta.json version 5 → 6.

### Reverse-order walk (phone), press → state
Measured on the worktree build (/home/user/s3c-cs5b, branch cs-r5b-softlocks, `next build` into .next-cs5b, `next start` on :3547), Playwright Pixel 7 viewport. The walk script follows AMD-011 part 2's orderCheck (fresh page, commit the last predict option, press stage controls last first for up to 2 sweeps, skipping disabled ones, stop when the reveal enables; 450 ms settle; 8 s wait if still locked) and logs each press with the state after it. The script lives outside the repo; nothing from tests/qa or the amendment was copied into the lesson.

- start: svg="After 0 comparisons" · text: Find AAAB. Both count every letter comparison. · controls: [Compare, To next miss, Run to end] · reveal locked
- sweep 1 press "Run to end" → svg="After 24 comparisons" · text: Find AAAB. Both count every letter comparison. | Start over, then stop on a miss to see what the reuse lane keeps. · controls: [Compare(off), To next miss(off), Start over] · reveal locked
- sweep 1 skip #1 (disabled)
- sweep 1 skip #0 (disabled)
- sweep 2 press "Start over" → svg="After 0 comparisons" · text: Find AAAB. Both count every letter comparison. · controls: [Compare, To next miss, Run to end] · reveal locked
- sweep 2 press "To next miss" → svg="After 4 comparisons" · text: Find AAAB. Both count every letter comparison. | Reuse: ✗ B ≠ A. The 2 under the last match says keep 2 A's: slide 1. · controls: [Compare, To next miss, Run to end] · reveal UNLOCKED
- RESULT reverse kmp-never-steps-back: reveal unlocked, no reload

### Forward (DOM-order) walk (phone), press → state
- start: svg="After 0 comparisons" · text: Find AAAB. Both count every letter comparison. · controls: [Compare, To next miss, Run to end] · reveal locked
- sweep 1 press "Compare" → svg="After 1 comparisons" · text: Find AAAB. Both count every letter comparison. | Reuse: the arrow only moves right. · controls: [Compare, To next miss, Run to end] · reveal locked
- sweep 1 press "To next miss" → svg="After 4 comparisons" · text: Find AAAB. Both count every letter comparison. | Reuse: ✗ B ≠ A. The 2 under the last match says keep 2 A's: slide 1. · controls: [Compare, To next miss, Run to end] · reveal locked
- sweep 1 press "Run to end" → svg="After 24 comparisons" · text: Find AAAB. Both count every letter comparison. | Reuse: 5 misses, each kept 2 A's. Arrow moved back 0. · controls: [Compare(off), To next miss(off), Start over] · reveal UNLOCKED
- RESULT forward kmp-never-steps-back: reveal unlocked

### Other checks
- AMD-011 probe v3.1 run unchanged (company/constitution/amendments/AMD-011-qa-contract-r1/run.sh, PROBE=1, against :3547). At its default 250 ms settle: `"unlocked":false,"deadEnd":false,"wayOut":2`. Run to end (about 340 ms) is still animating when the 250 ms sweep moves on, so the sweep skips Start over; the step-3 press finds it as the way out. Not a dead end, so the probe passes. At the 450 ms settle the proposed contract test uses: `"unlocked":true,"deadEnd":false,"presses":3`. On main the probe (probe-v31.jsonl) had `"deadEnd":true`.
- QA contract (tests/qa, QA_ONLY=kmp-never-steps-back,rolling-hash-window, phone and desktop) passes for this lesson.
