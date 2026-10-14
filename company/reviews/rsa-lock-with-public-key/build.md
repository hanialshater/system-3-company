# Build note: rsa-lock-with-public-key (demo-builder, algo-builder session, 2026-10-14)

- Design intent: key card (public n = 55, e = 3; private d = ?) over a message -> locked -> unlocked line.
- Deviation: the factor input is trial-division buttons (/2, /3, /5); /5 reveals 55 = 5 x 11 and d = 27.
- Reveal gate (2 milestones): a failed unlock with e, then a successful unlock with d.
- Brief gap (not wrong): for 15 of the 55 messages (0, 1, 10, 11, ...) unlocking with e again happens to return the message (m^9 = m mod 55). The stage says so when it happens and that try does not count; claim c4 records it.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.

## Revision v2

Fact-check pass 10 c7 (fatal): message 2 never wrapped (2^3 = 8 < 55), so a plain cube root unlocked it. Default message is now 7 (7^3 = 343 -> 13); the question asks who could unlock 13 if n had hundreds of digits, and the marked answer is 'only someone who can find the factors 5 x 11'. Lock note tells the learner when m^3 < 55 (no wrap). c1, c4 ('some', not 'a few'), c7 rewritten, unverified.
