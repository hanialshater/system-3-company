*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): rising-price-stops-at-second
lesson version: v2
boundary: knows-quit-above-value. Knows people stop bidding once the price passes what the item is worth to them; has never seen that the winner of a rising-price auction pays about the runner-up's value, not their own (meta.json learner field, same boundary as r6).
Screenshots seen: yes (artifacts/walkthroughs/rising-price-stops-at-second/sheet.png, build 4 at :3480)
Verdict: launch

## Findings (written from the walkthrough, before the brief or the previous review)

Walked the phone transcript and sheet.png (5 frames). Chose option 1 ("$70").

1. **The prediction is a real bet.** "$70" (the winner pays what it is worth to her) is the natural wrong guess; "$41" is the "first quitter sets it" guess. All three options are bare dollar amounts. The locked stage shows three value bars and a price line at $30; nothing marks $55 or $56. Met: no answer before the commit.
2. **The why is on the stage.** At the end the price line sits just above Ben's $55 bar, Ben's bar is emptied with "quit at $56", Cal's with "quit at $41", Ana's stays full with "wins at $56". The picture says "the price stopped where the runner-up dropped out" before the reveal does. Her full bar sticking up above the line shows the $14 she keeps.
3. **The key moment is inside "Run to the end".** On this path I raised $1 and $5, then ran to the end: Cal quitting and Ben quitting both happened in the jump. The final labels make up for it, but I never saw the moment "3 still bidding" became 2 and then 1. A learner who keeps tapping Raise $5 would see it.
4. **The band argument is told.** "Any price above $55 and up to $70 leaves exactly one willing buyer" is a sentence; the stage could shade that band between Ben's and Ana's bar tops, but the picture already shows the gap. The sealed second-price comparison is one sentence of context.
5. **The reveal quotes what I saw.** $56, Ben $55, $14 of $70 are on the stage when the reveal opens (labels and readout). About 85 words. Ends on a model caveat, after the idea sentence ("her own value decided who won; the runner-up's value set the price"), which is the real end.
6. **Small doubt:** the question says the price rises "$1 at a time", and the stage has a "Raise $5" button. I wondered whether a $5 jump could overshoot $56. Not tested on this path.

Where understanding first broke: it did not break.

## After reading the brief and the r6 review

doesNotKnow ("the winner pays about the runner-up's value") is shown by the price line stopping just above Ben's bar, with the quit labels kept. Show the why: met. No answer before the commit: met (the hook no longer rules out $70). The reveal quotes what you saw: met.

| r6 finding | Status |
|---|---|
| Main: the hook "So why does she pay less?" refutes option 1 | fixed (hook now "Three bidders, one lamp, a price that rises a dollar at a time. Where does it stop?") |
| Minor: the reveal shows a reset stage | fixed on this path: after the end state Reset is greyed out and the reveal frame shows the final $56 picture |
| Claims 0/4 checked | fixed (4/4 checked) |
| "Run to the end" jumps over the quits | not changed; still acceptable (the labels record both quit prices) |

Why launch: a first-time learner with this boundary sees the price stop just above the runner-up's bar and can say who set the price. Remaining items are minor (findings 3, 4, 6).
