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
