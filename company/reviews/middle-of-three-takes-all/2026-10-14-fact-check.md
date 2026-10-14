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

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own run of round(k): Bo 50, 60, 70, 80, 90, 100 cents; partner ask 50, 40, 30, 20, 10, 0, each 10 below the previous partner's; reveal trace and 'asks fell from $0.50 to $0.00' match. Trace kept through '2 people'. |

**Result:** all open claims verified; no disputes.
