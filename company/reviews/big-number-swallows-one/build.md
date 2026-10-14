# Build note: big-number-swallows-one (demo-builder, 2026-10-13)

- Design intent: the current value in full (last three digits highlighted) above a number line from 2^53 − 3 to 2^53 + 6. Filled dots mark whole numbers a JavaScript number can hold, dashed rings those it cannot (from a BigInt round trip). A tape lists the last sums, a stuck "+1" in red with its repeat count. Buttons: Back to …990 (first in DOM, disabled at the start), + 1, + 1 five times, + 2. All sums are real double arithmetic.
- Key state: a + 1 at 2^53 that changes nothing, then a + 2 beyond 2^53 that does. Milestones ["stuck", "plus-two"], minInteractions 2. QA path: +1 (…990 → …991), +1 ×5 (→ …992, then stuck ×4), +2 (→ …994).
- Numbers: the question's number is P = 2**53; option B is String(P + 1) computed by the browser; option A is BigInt(P) + 1n. Brief answer (B) re-computed in Node and held.
- Honesty note: past 2^53, + 1 does not always do nothing: from …994 it jumps to …996 (round half to even). The reveal and claim c4 say "either does nothing or jumps by 2".
- Locked: dots hidden; only plain ticks and labels.
- After screenshots: the reveal ran past the card; cut one sentence to keep it near 120 words.

## v2 (claim fix 2026-10-13)

Pass 4 disputed-claim fix: learner-visible wording and claim rewritten per the fact-check; claim set to unverified, awaiting re-check. See claim source for old/new detail.

## Revision v3 (wave C, learner review)

- JavaScript and 2^53 undefined before use: the question says JavaScript is a programming language that stores each number in a fixed amount of space, and that 2^53 is 2 multiplied by itself 53 times; the legend reads 'the program can store it'.
- Jargon-heavy reveal: double, MAX_SAFE_INTEGER, 'even' rounding and '2^54' removed; it now points at the hollow rings the learner saw. Claims c2 to c5 rewritten, unverified.
- Not changed: round-to-even is no longer told, but the stage still does not walk a +1 from 994; the 'either nothing or jumps by 2' line is shown only if the learner tries it.

All changed claims are unverified, awaiting a fact-checker.
