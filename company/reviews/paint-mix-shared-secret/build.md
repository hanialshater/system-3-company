# Build note: paint-mix-shared-secret (demo-builder, 2026-10-13)

- Design intent: one 23-position clock. Bob's hand (B, domain colour) and Alice's hand (A, foreground colour) start at 1. "Bob: ×8" steps one multiply-and-wrap, "Bob: finish" completes his 15; same for Alice (×19, 6 times). Every stop stays on the clock as a trail dot, so a finish button does not hide the steps. After both finish, "Check: ×5, 90 times" rings where 5 multiplied 90 times lands (2), which is the reveal's "why".
- "mod" is never used on the stage: the message line says "Multiply, then wrap past 22 back to 0" (claim c4 equates it to the remainder).
- Key state: both hands stopped (Bob 15/15, Alice 6/6). Milestones ["bob-done", "alice-done"], minInteractions 2. QA path: Bob ×8, Bob finish, Alice ×19, Alice finish, Check.
- Numbers: 8, 19, 2 and 90 come from walk() in Demo.tsx (A_PUBLIC, B_PUBLIC, SHARED, DIRECT), not typed. Re-computed in Node with BigInt: 5^6 = 8, 5^15 = 19, 8^15 = 19^6 = 2, 5^90 = 2 (mod 23).
- Deviation from brief: the public numbers 8 and 19 are given in the question, not built on stage (the check button shows the 5-based reading instead). The "paint" metaphor of the slug is not used; title retitled to "Where do Alice and Bob land?" so it does not say they share a secret.
- After screenshots: first pass had both hands green (--good equals the cs domain colour); Alice switched to the foreground colour.

## Revision v2 (wave C)

Start number 5 and how 8 and 19 arise are now in the question and on the locked stage before the prediction. Reveal's repeated first sentence cut so the 5 x 90 explanation is first. Check button labelled 'start number x5'. Claim c8 added (unverified).
