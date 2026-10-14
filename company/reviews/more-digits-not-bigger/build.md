# Build note: more-digits-not-bigger

- Builder: wave-i-math (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/math.md #58 (cm-math). Kept from evaluators until they report.
- Stage: three bars on one shared 0-to-1 scale with tenth ticks (one panel, one representation, as the brief says). "Build 0.3 / 0.25 / 0.125" each add the next digit of one number: first digit = d tenth-blocks, second = d hundredth-slivers, third = d thousandth-hairlines, all true to scale (the five hairlines of 0.125 are about 1 px together). Each number's built digits light up in its label and a "so far" value prints at the bar's end. Values are integer thousandths, so no float noise.
- Departure from the brief: six digit presses are needed and QA presses each control once, so a fourth control "Build the rest" finishes all three. Build buttons are disabled once their number is complete.
- Milestone: `built` (all three numbers fully built). The reveal names the largest number from a sort of the built values.
- No Reset control. Not run (per dispatch): next build, QA, walkthrough. overlap.mjs not run.

## Pre-flight v1

1. Title and hook: "Which decimal is the biggest?" / "One has one digit after the point, one has two, one has three. Which counts for most?" States digit counts (true for all options) without ranking them; no.
2. Options: "0.125" / "0.25" / "0.3". Every option is an exact number from the question.
3. Locked stage: three empty bars with tick marks, axis 0 / 0.5 / 1, labels "0.3", "0.25", "0.125" with digits muted, caption "Three numbers on one 0-to-1 scale.", disabled build buttons. No bar is filled and none is highlighted.
4. Reveal values: "0.3 got 3 tenth-blocks and is the longest", "0.25 got only 2", "5 hundredth-slivers added 0.05", "0.125 got 1 block" = (b) milestone `built` (all bars complete; values from NUMS digits and thousandths()). The bars cannot be unbuilt, so they are all on stage at the reveal.
5. QA path: "Build 0.3" (complete), "Build 0.25" (2 blocks), "Build 0.125" (1 block), "Build the rest" (built). Milestone reached; all three bars fully built at the reveal.
6. Reset: no Reset control and no way to unbuild. Reveal text from the QA run: "You built the bars digit by digit. 0.3 got 3 tenth-blocks and is the longest. 0.25 got only 2, and its 5 hundredth-slivers added 0.05, less than the one more block it needed. 0.125 got 1 block. / Each place is worth a tenth of the one before, so compare from the first digit: extra digits only add smaller and smaller pieces."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 more-digits-not-bigger`, dev server, 2026-10-14): crop 0 px, hiddenBelow 0, namedHidden 0, 66 words with the verdict. Stage 316 px (picture 188, controls 76, text 20), reveal 184 px, window 618 px. All three bars with their blocks, slivers and labels are on screen with the reveal's last line.
