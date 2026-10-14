# Build note: only-the-needed-trader-profits

- Builder: ncm-e03 (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/economics.markets.md, Course NCM #20 (accepted version, with its Edited notes: values on the stage, "can earn only if").
- Intent: one network (2 sellers, 3 traders, 2 buyers). "Take out T1/T2/T3" removes one trader at a time; the highlighted route shows which trader carries each trade (T2 picks up seller 1's trade when T1 is out). Each trader, once tested, is tagged "−0 trades" or "−1 trade"; readouts give trades made and value created.
- Milestones: spare-out (T1 or T2 taken out) and needed-out (T3). QA's DOM order (T1, T2, T3, All back) reaches both.
- Numbers re-run in my own code: trades() brute-forces seller–buyer pairs; FULL 2, LOST [0, 0, 1], matching the brief.
- Profit itself is not simulated: the competition (c3) and the one-directional theorem (c5) are told in claimed sentences; the stage shows the cause (a rival on the same route vs none). The reveal footnote says being needed allows a profit, not guarantees it.
- Misconception (most connections) is answered by noting every trader has two links (c2).
- Not run (per dispatch): next build, QA, walkthrough, tsc. Needs local QA before status review.

## Pre-flight v2 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

c5 was held: the general theorem rests on BEKT 2009, which nobody here can open.
- The reveal now says "On this network, the only trader that can earn a profit is the one whose removal lost value: T3." The general "Being needed allows a profit; it does not guarantee one." is gone, so the muted line reads "A simplified model with invented values."
- c5 is reworded to match and set to unverified. It now rests on c1, c3 and c4 together with the stage's trade counts.
- No mechanics changed, so every control pressed once in DOM order behaves as before. Not run: build, QA, walkthrough.

## v3 (demo-builder, 2026-10-14, answering 2026-10-14-learner-knows-competing-traders-r8.md, board W-342)
- Text budget (main finding): reveal ~97 -> 79 words (tool 102 -> 83 with the verdict). Cut "Every trader had two links; what mattered was whether a trade needed it." (it restated the hook, which still says it, so c2 stays) and the muted line "A simplified model with invented values." (the stage chip states the model; c6 text now matches the chip and is reopened). cm-economics may still choose a different cut.
- Fit without the kit shrink: with the W-287 floor the network is no longer shrunk, and the v2 reveal cropped the stage top by 135 px (tool). Stage 413 -> 337 px: the four take-out buttons share one row ("Take out:" T1 T2 T3, All back; aria-labels keep "Take out T1"); the "All three traders in." / "T3 is out." line is now screen-reader only (the ghosted trader and the pressed button show the state); the picture is 320x186 instead of 320x214 (rows closer, same layout). Network drawn at scale 1, so names and the "−0 trades" / "−1 trade" labels are 11-13 px.
- Not changed: the r8 minor (the reveal's "lost value" is not tied to the VALUE CREATED readout by name); after "All back" the readout says $2, so quoting "$1" would quote a state that is gone.

## Pre-flight v3
1-3. Unchanged from v2.
4. Reveal values: "Without T1, 2 of 2", "Without T3, only 1" (the −0 / −1 labels kept on the traders after All back); "T3".
5. QA path: Take out T1 (spare-out), T2, T3 (needed-out), All back.
6. Reveal: "Without T1, 2 of 2 trades still happened: T2 linked seller 1 to buyer 1. Without T3, only 1 did: nobody else links seller 2 to buyer 2. / T1 and T2 compete for the same trade, so each undercuts the other until neither earns anything. T3 has no rival, so it can charge for the trade only it makes. On this network, the only trader that can earn a profit is the one whose removal lost value: T3."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 only-the-needed-trader-profits`, dev server, 2026-10-14): before crop 135 px (network fitted 195/214), 102 words; after crop 0 px, hiddenBelow 0, namedHidden 0, no picture shrink, 83 words (79 without the verdict). Stage 337 px (picture 186, controls 35, text 63), reveal 226 px, window 594 px (about 10 px spare). Chip, the whole network with all three −N labels, both readouts and the reveal's last line are on screen.
