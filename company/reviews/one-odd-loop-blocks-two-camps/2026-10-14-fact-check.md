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


## Pass 30 (2026-10-14, W-276)

Checker: fact-checker. I did not write or build these claims. Scope: claims reopened by the W-265/W-267 phone-fit trims (meta.json v3). Method: read Demo.tsx on every reachable path (predict, explore controls, steps back, Reset where one exists, prefers-reduced-motion branch, reveal gates) and checked that each value the reveal names is on the stage when it opens; re-ran the numbers in my own node scripts (session scratchpad fact-checker-w276/). No source was opened (web fetch: DNS failure; proxy 403), so no verdict below rests on a cited text.

Paths read: loops before Try (walk drawn), Try before loops (no walk drawn: c4 dispute), enemy moved before/after Try, back to D-E after Try (records given 0/64). No Reset control; no animation. Reveal on the full path: 81 words. Non-blocking: the ring "2" fallback and "each odd" for an unpicked small loop are not from the learner row but are visible as red dashes on the always-drawn ring.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own brute force (scratchpad fact-checker-w276/ol.mjs): ring 2, right loop A-B-C-D 1, left loop A-D-E-F 1. Reveal counts come from the layout row when picked; the ring 2 is a fallback when the ring is never picked and "each odd" covers an unpicked loop, both readable off the always-drawn picture (red dashes). Non-blocking. |
| c2 | verified | Own brute force over 64 labellings, 7 links: 0 valid, min 1 broken (best 0,1,1,1,0,0 breaks A-D). Reveal "0 of 64 splits worked" = given.working, recorded on every route to milestone tried-all (Try in given, or back to D-E after Try). Caption names filled vs dotted camps and the thick link. |
| c3 | verified | Own brute force, enemies A-B and C-D: loops 2, 2, 0; 2 valid labellings, {B,C} vs {A,D,E,F} and swap. Reveal past tense only if tried on that layout (row shows 2/64), else present tense. 128 signings of this frame: balanced iff all 3 cycles even, 0 mismatches. |
| c4 | disputed | Parity holds (own walk). DISPUTED on a stage path: once "Try all 64 splits" is pressed, tried never resets and w = null whenever result exists, so a learner who tries first and then picks Right or Left loop reaches odd-loop without any walk or clash ring drawn (caption still "0 of 64..."). The reveal then says "so those walks came back to A in the other camp", a state the stage never showed (demo-standard: the reveal quotes what you saw). Fix (builder): draw the walk when a loop is picked after Try (e.g. picking a loop shows its walk instead of the best split), or gate odd-loop on a drawn walk. Pass 24 noted this as non-blocking; W-276 asked for every path. |

**Result:** 3 verified, 1 disputed, 0 held (unverified), 0 withdrawn.


## Pass 33 (2026-10-14, W-283)

Checker: fact-checker. I did not write or build this claim. Scope: c4, reopened by the W-281 fix (meta.json v4). Method: I read Demo.tsx v4 on every reachable path before the builder's notes. The paths: loops before Try, Try before loops (the pass 30 failure), re-picking the same loop while the split shows, enemy moved before and after Try, and back to D-E with a walk drawn and with the split drawn. There is no Reset and no animation. I re-ran the numbers in my own node script, not imported from Demo.tsx (session scratchpad fact-checker-w283/check.mjs). No source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own walk: in the given layout the ring has 2 enemies and comes back in the same camp. The right and left loops have 1 each and come back in the other camp. Moved: 2, 2 and 0, all back in the same camp. Own brute force: 0 of 64 work given (best breaks 1), 2 of 64 moved. Pass 30 path closed: after Try, picking Right or Left sets view = walk, so split = null and w is drawn (camp tints and the clash ring at A) in the same click that reaches odd-loop. The second route to odd-loop (Enemy on D-E) needs view === walk and a picked loop, and with both, split = null, so the walk is drawn. odd-loop can no longer be reached while the split is drawn. Every route records a right or left loop in the given row, so the reveal's "(right loop: 1...), each odd ... those walks came back to A in the other camp" always follows a clash walk the learner saw. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn. All five claims are now verified.
