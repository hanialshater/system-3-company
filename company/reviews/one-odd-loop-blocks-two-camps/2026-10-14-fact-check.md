# Fact-check: one-odd-loop-blocks-two-camps (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

Easley & Kleinberg (2010) chapter placement checked against my knowledge of the book's table of contents (host blocked): ch. 5 - consistent; section numbers not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own count (scratchpad fc22/sg.mjs): ring has enemies A-B, D-E = 2; loop A-B-C-D has A-B = 1; loop A-D-E-F has D-E = 1. |
| c2 | verified | Own brute force over 64 labellings, 7 links: 0 valid, minimum 1 broken. |
| c3 | verified | Own brute force with enemies A-B, C-D: loops 2, 2, 0; 2 valid labellings, both the split {A,D,E,F} vs {B,C}. |
| c4 | verified | Parity argument re-derived: k switches return to the start camp iff k is even. |
| c5 | verified | Own check on 3,000 random signed graphs (3-6 nodes): two-camp split exists iff every simple cycle has an even number of negative edges, 0 mismatches. Harary, Michigan Math. J. 2(2):143-146 (1953) confirmed as bibliographic data via search snippets; paper NOT opened. E&K ch. 5 (Positive and Negative Relationships; general-network balance in its advanced section) agrees with my knowledge of the book. |

**Result:** every claim in this lesson is now verified.

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own brute force over 64 labellings, 7 links: 0 valid, minimum 1 broken (best camp 0,1,1,1,0,0 breaks A-D); moved enemy: 2 valid. Caption names filled vs dotted camps and the thick link. |
| c4 | verified | Parity re-derived; own node walk(): given layout ring 2 enemies back 0, right loop 1 back 1, left loop 1 back 1; moved: right 2 back 0, left 0 back 0. Non-blocking note: after 'Try all 64 splits' the stage shows the best split, not the walk, so a learner who tries all first and then picks loops never sees a walk drawn, though the reveal says 'On those walks'. Demo-standard question for the builder, not a fact error. |
