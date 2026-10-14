# Learner review: Better at shooting left. Shoot left more? (boundary: no-mixed-strategy)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Version reviewed: walkthrough recorded 2026-10-14T08:41Z (phone, option 1 = "More than 50%"), sheet.png seen (all 4 frames), Demo.tsx read for the branches the script does not show.

Boundary used (mine, chosen before reading the brief): reads a 2x2 payoff table; knows expected value; has never heard of mixed strategies, equilibrium, or "indifference". Thinks "best mix" means "the mix that scores most".

## Findings (artifact only)

1. **First required idea I lack: why 50% left is "the best mix" at all.** The question says "Both now play their best mix: 50% left." I can see the table is symmetric (0.5 on the diagonal, 0.9 off it), so 50/50 looks right by symmetry, but I have no idea why a mix beats always choosing a side. The lesson states the starting mix as a given.
2. **Orientation is easy to flip.** "0.9 if he dives the wrong way" and "left shot improves 0.9 to 1.0 when the keeper dives right" make me map "dives right" to a cell. The table helps (highlighted cell in the Kick left / Dives right corner), but the first read of the question is hard. Locked stage text is tiny and the table headers are small.
3. **Answer not visible before predicting.** The locked stage shows 50.0% / 50.0% and scoring 0.700 only. Good. "More than 50%" is the natural answer to "should he use it more often" and the hook is phrased exactly so ("Shoot left more?").
4. **The slider moves bars with no mechanism.** Dragging to 0.94 then pressing "Perfect left shot" gives 47.6% then 44.4% (kicker) and 52.4% then 55.6% (keeper), scoring 0.710 to 0.722. I see that the kicker bar goes down and the keeper bar up, and I can verify the reveal's numbers, but nothing on the stage shows why. A learner who guessed "more than 50%" sees the contradiction clearly; nothing shows what would make it feel necessary.
5. **Reveal's causal sentence is told.** "A better left shot makes the keeper cover the left more, so the kicker leans right" is a chain: better shot -> keeper guards left -> kicker leans away. It matches the bars, but the reason the keeper guards more is not on the stage. The next sentence, "Each side's mix is set so the other side gains nothing from either choice", is jargon-free but abstract; I could not check it against anything on screen (no number shows what the keeper gets from diving left vs right).
6. **The surprise I would actually have is unanswered:** the kicker shoots left less, yet his score goes up (0.700 to 0.722). The reveal states both numbers without remarking that the improvement is being partly cancelled; I did not know whether 0.722 is a lot, or why the kicker does not simply keep 50/50 (which would be exploited). The question I came away with is "why can't he just keep shooting left 50% and take the extra 0.1".
7. **Reveal quotes only states I reached.** 0.90 (start, shown locked) and 1.00 (Perfect left shot, required to unlock) with 50/50, 0.700, 44.4%, 55.6%, 0.722. All match frames.
8. **Last line of the reveal** ("Your own strength decides how much your opponent must guard it") is the moral and is told, in a sentence that reads like a slogan. I could repeat it but not explain it.
9. **Layout:** frames 02-03 leave a large empty gap under the table; frame 04 (reveal) has the table clipped at the top so the first row is cut off. The stage text in the locked state is much smaller than after unlocking.
10. **Controls:** slider (0.90 to 1.00 in 0.02 steps) and the button both work; the button disables at 1.00. No dead control. Only a single move is required (reaching 1.00), so a learner can finish in two taps.

Confidence: moderate. Strongest: findings 4-6.

## Verdict for the current version: **revise** (no fatal flaw found)

Top finding: the stage shows the equilibrium bars move but not why the opponent's guarding forces the kicker's change; the explanation sits in two abstract reveal sentences (told, not shown), and the lesson never addresses "why not just keep 50/50".

## After reading the brief

(see below)
