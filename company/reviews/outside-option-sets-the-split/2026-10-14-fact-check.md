# Fact-check: outside-option-sets-the-split (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: maximiser of (A-40)(100-A) over whole cents is A=70; formula 0.4+0.3 = 0.70, B 0.30. |
| c2 | verified | Verified on derivation: with linear payoffs, max (A-a)(B-b) s.t. A+B=1 gives A = a + (1-a-b)/2 (own node for a = 0..80 cents). Nash 1950, Econometrica 18(2) 155-162 correct to my knowledge (not opened). E&K ch. 12 'Bargaining and Power in Networks' confirmed via library-catalogue TOC in web search; section (I believe 12.5) unconfirmed. |
| c3 | verified | A = 0.5 + a/2: own node table a = 0..80 gives 50, 55, ..., 90 cents. |
| c4 | verified | For a < 1, A = 0.5 + a/2 > a and B = (1-a)/2 > 0 (own node, all slider values). Model assumption stated. |
| c5 | verified | Matches the reveal's muted model line. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | A = a + (100 - a)/2, so dA = da/2. Own node over every reachable option (0..80 step 10): 70 -> 85, 80 -> 90; all whole cents. Reveal computes from split(prev) and split(a). |

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | A = a + (100 - a)/2 = 50 + a/2 cents, so dA = da/2 for any pair; own node: 40 -> 70, 80 -> 90 (20 cents for 40). Every reachable option (0..80 step 10) gives whole cents. tried starts as [0] and gains each option set (sorted, no duplicates); the reveal needs "moved", so tried has >= 2 entries and hi > lo; it quotes tried[0] and tried[last] with split().A of each, the same entries as the Tried row. Note: lo is always $0.00 (the starting option), so the reveal always says "from $0.00". |

**Result:** 1 verified, 0 disputed, 0 held unverified.

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v4 first (slider 0-80 in 10-cent steps, presets, the 'No deal' and 'Deal' lines, Tried row, the $0.40 trace, chip, reveal; hook and recall), then the claim text and support, then source fields.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Convention, consistent with code: the stage chip reads 'Model: money payoffs; the deal always happens'; split() always returns a deal, and over the whole slider range (a <= 80 cents, B's option 0) the deal gives A a + (100 - a)/2 >= a and B (100 - a)/2 >= 10 cents, so taking the deal is never worse than the outside option for either side and 'always happens' is consistent with the payoffs shown. |

**Result:** the one open claim verified. No disputes.
