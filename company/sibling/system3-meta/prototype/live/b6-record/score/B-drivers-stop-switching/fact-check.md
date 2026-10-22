# Fact-check: drivers-stop-switching

Checker: outside fact-checker, working only from this pack. Method: node re-simulation of the code's rules (A = 10n, B = 25 + 5n, 6 drivers, switch only if strictly faster, counting yourself on the new road), reading the code path behind each readout, and checking the cited sources against what I know of them.

## 1. What the learner sees

| Visible item | How checked | Result |
|---|---|---|
| Hook "Drivers keep switching to the faster road. Does the switching ever stop?" | Framing question, not a factual claim | OK |
| Predict question and 3 options; answer A | Node: in-turn order from all 64 starts takes at most 3 switches; I also searched every switching order (drivers are identical, so the state is just how many are on A). The longest improvement path is 3. So A is right and C ("only some orders") is wrong | OK |
| Labels "A = 10 × cars", "B = 25 + 5 × cars" | Same as `tA`, `tB` in Demo.tsx (c6) | OK |
| Locked stage: 55 min, meter 255 = 30+35+40+45+50+55 | 25+5·6 = 55; sum of 30..55 in steps of 5 = 255 | OK |
| Explore hint (meter definition, = 255) | Same as above; matches `meter()` (c8) | OK |
| Step 1: A 30 min, B 40 min, meter 165 = 10+20+30 + 30+35+40; log 255 → 210 (−45), 180 (−30), 165 (−15), drivers 1,2,3; "settled: A 30 · B 40" | Node: log [[1,45,210],[2,30,180],[3,15,165]], ends 3 on A / 3 on B. 60 + 105 = 165. Equilibrium check: a B driver moving would get A = 40 (not < 40); an A driver moving would get B = 45 > 30 | OK |
| Step 2: all on A, 60 min, meter 210 = 10+…+60; "from all on B: 55 → 60 → 55 → 60 min"; "meter: 255 → 210 → 255 → 210" | Node replay of `allAtOnce`: trips [55,60,55,60], meters [255,210,255,210]. By hand: 10 < 55 so all go to A, then 30 < 60 so all go back | OK |
| Step 3: Start over → all on B, 55, 255; records stay | Code: `startOver` resets only the roads (as the brief intends) | OK |
| Meter bar scale (max 255) | Largest meter over all 7 car counts is 255 (all on B), so the bar never overflows | OK |
| Reveal: "lowered the meter by exactly the driver's saving: 45, 30, 15. After 3 … 3 on A at 30 min, 3 on B at 40" | Values come from the `oneAtATime` record; matches node | OK |
| Reveal: "All 64 starts stop within 3 switches" | Node enumeration of 2^6 starts with drivers taking turns: max 3 (also max 3 for any order). Meter drop equalled the saving on every switch (0 mismatches). Runs end at 3/3 or 4/2, and both are equilibria | OK |
| Reveal: general statement (delay depends only on count, so one-at-a-time switching stops, because a meter falls) | Rosenthal (1973) potential / Monderer–Shapley (1996) finite improvement property. Algebra: B→A changes Φ by tA(nA+1) − tB(nB) = −saving | OK |
| Reveal: "All at once, the meter rose again: nothing stopped the flips (55, 60, 55, 60 min)" | Meter 210 → 255 rises; the 2-cycle repeats for ever | OK |

## 2. Claims

- c1 to c4, c8, c9: recomputed in node as above; all match the visible text exactly.
- c5: Rosenthal R. W. (1973), IJGT 2:65–67, and Monderer & Shapley (1996), GEB 14:124–143. Both bibliographic details are correct, and both state the cited result: congestion games have a potential, and finite potential games have the finite improvement property. Easley & Kleinberg ch. 8: section 8.3 ("Advanced Material: The Social Cost of Traffic at Equilibrium") gives the potential-energy, best-response-dynamics argument. The "unconfirmed" section is right as far as I recall (medium confidence; I did not fetch the book).
- c6: the stage set-up (a convention); matches the code and labels.
- c7: restates c2, c4 and c5; it is consistent with them.
- Every learner-visible factual sentence maps to a claim.

## 3. Defects

No defects found.

S1: 0
S2: 0
S3: 0
S4: 0
