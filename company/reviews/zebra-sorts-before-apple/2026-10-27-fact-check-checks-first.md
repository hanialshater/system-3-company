# Independent fact check: zebra-sorts-before-apple

Checker: fact-checker · 2026-10-27 · current lesson v4

Artifact: http://localhost:3001/d/zebra-sorts-before-apple, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/zebra-sorts-before-apple/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## cs.zebra-sorts-before-apple.c6: VERIFIED

Claim: A computer stores each letter as a number, and each Latin capital A–Z (65 to 90) comes before each lowercase letter a–z (97 to 122).

Independently enumerated the Latin A-Z/a-z code units in the current JavaScript encoding: capitals 65..90, lowercase 97..122; max capital 90 < min lowercase 97. Current code uses charCodeAt and UTF-16 relational comparison, and public stage shows the same ranges and Banana/Zebra/apple ordering. Scope: the ASCII-compatible Unicode/UTF-16 encoding used by this lesson, not every historical computer character encoding (EBCDIC differs). This interpretation follows the adjacent c1's explicit ASCII/Unicode scope, not a universal assertion about all encodings.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/zebra-sorts-before-apple/2026-10-27-fact-check-checks-first.md#cs.zebra-sorts-before-apple.c6`.

