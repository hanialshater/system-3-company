# Fact-check: drivers-stop-switching

## Method
Re-implemented the stage model in node (A = 10n, B = 25 + 5n, six drivers, strict improvement), read the code path for every readout in code/Demo.tsx, and checked the screenshots (01 to 05) against transcript.md.

## Learner-visible items
| Item | Check | Result |
|---|---|---|
| Road rules "10 min × cars", "25 + 5 min × cars" | timeA/timeB in code | match |
| Locked stage: B 55 min, meter 255 | 25+5·6 = 55; 30+35+40+45+50+55 = 255 | OK |
| Log: d1 45 (255→210), d2 30 (210→180), d3 15 (180→165), d4 0 · stays | 55−10, 50−20, 45−30; d4: 40 on A vs 40 on B; meters recomputed in node | OK |
| Settled: A 30 min (1,2,3), B 40 min (4,5,6), meter 165 | 10·3; 25+15; 60+105 | OK |
| Trace "✓ 255 → 165" | as above | OK |
| rounds 55→60→55→60→55; meter 255→210→255→210→255; trace "✓ 60 / 55" | node allAtOnce: [6 on A, 210], [0, 255], [6, 210], [0, 255]; 10<55 then 30<60 | OK |
| Predict answer "Stops within a few switches" | node: longest improving-switch sequence over all 64 starts and every order = 3 | OK |
| Reveal para 1 (meter = sum of times; drop = saving; 45, 30, 15; after 3; 3 on A at 30, 3 on B at 40) | potential change = timeA(nA+1) − timeB(nB) = −saving, checked at every improving move from all 64 states in node | OK |
| Reveal para 2 ("each saving assumed the others stayed put", "meter rose, 210 to 255", "flipped between 60 and 55") | values correct; see D1 | see D1 |

## Claims
- c1: node reproduces 3 switches, savings 45/30/15, end 3/3 at 30/40, no strict gain left. Matches reveal. OK.
- c2: 255, 210, 180, 165 and drops equal savings. Matches log and reveal. OK.
- c3: equilibria are nA = 3 and 4; longest improving path by nA 0..6 is 3,2,1,0,0,1,2; max over 64 starts in any order = 3 (node, brute force). OK. Shown only in the trust sheet.
- c4: all-at-once alternates 55 (meter 255) / 60 (meter 210) for ever. Matches stage and reveal. OK.
- c5: Rosenthal (1973), Int. J. Game Theory 2, 65–67 and Monderer and Shapley (1996), Games Econ. Behav. 14, 124–143 are correct references; finite congestion games are exact potential games with the finite improvement property, so the statement is true. Checked from known bibliographic record (no fetch made). Not stated in the visible lesson, only in the trust sheet.

## Defects
| id | quote | what is wrong | recomputation / source | severity | confidence |
|---|---|---|---|---|---|
| D1 | "The meter rose, 210 to 255, and the crowd flipped between 60 and 55 minutes." | Quotes only the rising half. The meter row on the same screen reads 255 → 210 → 255 → 210 → 255, so the first all-at-once round lowered it. Not false (round 2 does rise), but it leaves out that the meter goes up and down instead of falling every time. | node allAtOnce(4): meters 210, 255, 210, 255 from 255 | S4 | medium |
| D2 | Step 2 stage: roads all on B, "55 min", meter "255", with the one-at-a-time log ("165 · stays") still shown above | After "All at once" the roads and meter show the all-at-once end state, but the one-at-a-time table that ends at 165 stays on screen, so the meter readout (255) does not match the last log row next to it. No label says which run the roads show. | Demo.tsx runAll sets cars to ALL.cars while logs.one is kept | S4 | high |

Count: S1 0 · S2 0 · S3 0 · S4 2
