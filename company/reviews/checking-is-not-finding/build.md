# Build note: checking-is-not-finding (demo-builder, 2026-10-14, wave J cs)

- Format: single card, presets Check 4 + 5, Search for 9, Search for 13, Add a 7th number, Reset (DOM order = QA path).
- Stage: six number chips (16 px) and a grid with one square per group (64; 128 with the 7th number, chip 7 dashed). A search fills squares in binary counting order (instant, no animation); the hit square for 9 is highlighted and its chips lit. Status line, readouts Groups tried and Groups, trace "check: 1 · find 9: 21 · prove no 13: 64 · 7 numbers: 128" (survives Reset).
- Added beyond the brief: the squares grid. The brief asks for chips and a counter; the grid makes "how many groups" something the learner sees fill (64, then 128) rather than a number only. Squares are not controls.
- Searches and Check always act on the question's six numbers (they remove the 7th), so "Search for 13" never finds 4 + 2 + 7.
- Numbers: `model.ts`; node 2026-10-14: first sum 9 is the 21st group tried ({4, 5}; the other is {3, 4, 2}); no group sums to 13.
- Milestones (4): check, find9, none13, seven.
- All claims unverified; c4 (NP, P versus NP, subset sum NP-complete) needs the fact-checker. Wording keeps "nobody knows", never "impossible".

## Pre-flight

1. Title and hook: "Quick to check. Quick to find?" / "Checking a sum takes one addition. How much work is finding one?" They state the check cost (given in the question too), not the answer.
2. Options: "6", "12", "64". All numbered, same precision.
3. Locked stage: six chips only; readouts "Groups tried 0" and "Groups –". The squares grid (64) and the Groups count are drawn only after the first press (first build drew 64 empty squares and "Groups 64" before the commit, which matched the right option; fixed).
4. Reveal values: 1 addition (milestone check), 21st (milestone find9), 64 (milestone none13), 128 (milestone seven). All in the trace when the reveal opens.
5. QA path: Check, Search 9, Search 13, Add 7th reach all four; Reset last clears the stage to 64 empty squares (the grid stays once any button was pressed); the trace keeps all four.
6. Reset: reveal after Reset: "Checking 4 + 5 took one addition. Finding a group meant trying them: the 21st group made 9, and proving that nothing makes 13 took all 64. One more number doubled the squares to 128. / For problems like this, called NP problems, a proposed answer is quick to check, yet nobody knows a method that always finds one without a search that grows this fast. Whether such a method exists is the P versus NP question."
7. Phone fit: see the "Measurement" line below.
