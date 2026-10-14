# Learner review: Same songs, different hits (boundary: quality-wins-assumption)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Version reviewed: walkthrough recorded 2026-10-14T08:52Z (phone, option 1 = "2nd of 8", wrong pick, so "Not quite"; path +100, All 1,000, Off), sheet.png seen (all 5 frames), Demo.tsx read for the branches the script does not show (the "All 1,000" first path).

Boundary used (the lesson's own): knows some songs are better liked than others, and percentages and rankings (1st, 2nd ... of 8). Has never seen rich-get-richer or preferential attachment.

## Findings (artifact only)

1. **Where it first asks for something I lack: "appeal" and "Pick chance = appeal × (1 + earlier picks)".** The stage rule line is the whole mechanism and I cannot evaluate it. "Seeds 1-8" is jargon for me; I read "worlds = seeds" as eight random draws only because the title says "same songs, different hits".
2. **Answer partly visible before predicting.** Title and hook ("does the best song still rise to the top?") invite "no". "In the worst of the 8 worlds" plus options 2nd / 4th / 7th make "7th" the dramatic option. I could not reason from 70% appeal and a formula to a rank, so I guessed the mild one. Fine for a prediction card.
3. **"Worst of 8 worlds" hides a selection.** The question is about the minimum over 8 samples. A learner has no way to know that the worst of eight draws is not the typical draw.
4. **The picture undercuts the headline.** At 1,000 listeners with copying on (frame 03) the best song is 1st in four of the eight worlds; with copying off (frame 04) it is also 1st in four of the eight and 2nd in the other four. So the difference I can see at a glance is in the tail (7th versus 2nd) and in concentration (top song 35-48% versus 15-18%), not in how often quality wins. A learner who counts the 1sts concludes copying changes little. The reveal quotes the worst world and the share, which is true, but it never says that half the worlds still crowned the best song.
5. **Early lock-in is told, not reliably shown.** "Early luck compounds" is the mechanism. It is visible only if the learner steps with +100: world 3 is already 7th at 100 listeners and stays 7th at 1,000. If the learner presses "All 1,000" both times (which satisfies the code's milestones), they never see when the ranking was decided. The panel says "add listeners", but nothing requires it.
6. **Bars are tiny.** Eight bars per panel at roughly 6 px each, eight panels, on a phone. I could pick out the yellow best-song bar and its triangle, but not read which bar is the leader without the rank number printed under each panel. The rank numbers carry the lesson, the bars decorate it.
7. **Reveal quotes only states reached,** and quotes them correctly: 7th in world 3, tops 35-48%, off 1st or 2nd, no song above 18%. All match frames 03 and 04. The caveat "A toy model with made-up appeal numbers" is visible.
8. **Controls.** +100, All 1,000, On/Off all worked; Off after On at 1,000 jumps straight to the final off state, so I never saw the off run build.

Confidence: moderate. Finding 4 is the one I would argue hardest for; finding 5 is code-level.

## Verdict for the current version: **revise** (no fatal flaw found)

Top finding: the eight-world picture shows the best song still 1st in half the worlds with copying on, exactly as often as with copying off, so the reveal's contrast rests on the worst world and the top-song share, which the stage does not make easy to see.
