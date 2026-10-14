# Fact-check: below-the-threshold-crash (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | disputed | DISPUTED. The model choices are true of Demo.tsx (THRESH 50, rate 0.1, CAP 1000, log10 axis, extinct when N < 1), but the claim's account of where they are stated does not match the stage: 'Log scale' appears only in the LOCKED message ('Toy: room for 1,000. Log scale.') and disappears once unlocked; the reveal says only 'the threshold and rate are invented', never that the room for 1,000 is; 'under 1 animal' appears in the outcome text. Fix (builder): either keep a 'Log scale' label on the unlocked stage and add the room for 1,000 to the reveal's toy-model sentence, or reword the claim to say what is actually shown. |

**Result:** disputed: c3 (blocks publishing until the builder fixes and a fact-checker re-checks).
