# Fact-check: middle-of-three-takes-all (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

Easley & Kleinberg (2010) chapter placement checked against my knowledge of the book's table of contents (host blocked): ch. 12 - consistent; section numbers not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: rounds 0..5 matched ask 50,40,30,20,10,0 cents, Bo 50..100; LAST = 50/10 = 5 rounds; stage message "No one can ask less than $0. Stable." at round 5. |
| c2 | verified | Own derivation (E&K stability: no unmatched pair with x_u + x_v < 1): the unmatched end gets 0, so the centre must have x_B >= 1, hence B = 1 and the matched end 0; the empty matching is unstable. Unique up to which end is matched. E&K ch. 12 (Bargaining and Power in Networks) placement agrees with my knowledge; book not opened. |
| c3 | verified | Convention, on stage: 2-person message "No one else to turn to: they split evenly."; Bo 50. |
| c4 | verified | Convention, on stage: chip "Model: each person makes one deal"; reveal muted line lists the three rules. |

**Result:** every claim in this lesson is now verified.
