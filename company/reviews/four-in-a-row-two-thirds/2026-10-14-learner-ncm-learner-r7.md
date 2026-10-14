*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): four-in-a-row-two-thirds
lesson version: v3
boundary: ncm-learner. NCM course learner; knows the centre of a 3-path takes nearly all, and the Nash split (each side gets its fallback plus half of what is left); has never worked out a 4-path (meta.json learner field, same boundary as r6).
Screenshots seen: yes (artifacts/walkthroughs/four-in-a-row-two-thirds/sheet.png, build 4 at :3480)
Verdict: revise

## Findings (written from the walkthrough, before the brief or the previous review)

Walked the phone transcript and sheet.png (5 frames). Chose option 1 ("About $0.50").

1. **The prediction is a real bet.** Options are "About $0.50 / $0.67 / $0.90", all at the same precision. The hook sets up the line of three ("the centre of three takes nearly all"), so $0.90 is a tempting carry-over, and $0.50 is the "two equal pairs" guess. The locked chart's axis marks 0.50, 0.75, 1.00; nothing marks 0.67. Met: no answer before the commit.
2. **The cause is on the stage.** The dashed "fallback" link between B and C, the hatched part of each bar ("hatched = fallback") and the header "B's fallback = $1 − C's last share $0.500 = $0.500" show the mechanism: B's outside option is whatever C does not get from D. Stepping one round shows B jump to $0.750; the chart then zig-zags and settles. I could see "each inner person's fallback feeds the other's" before reading it.
3. **The settling point is shown, the reason for exactly 2/3 is told.** "The swings shrink to the split where B's share = 1 − half of C's: two thirds" is a sentence; the stage shows the value converging but not that equation. For me the zig-zag is persuasive enough; the algebra is a bonus.
4. **The reveal is long.** Four paragraphs, about 140 words, over the 120-word budget. The third paragraph (C's share is always B's, C's fallback is B, swings shrink) is dense on a phone and repeats what the trace already shows.
5. **The reveal quotes what I saw.** $0.750, $0.625, $0.688, $0.667, round 9, A $0.333 and the round-2 fallback $0.250 are all in the trace rows, which survive Reset. After Reset the bars read $0.500 each while the reveal says B settled at $0.667; the trace rows and the chart line carry it, so it holds, but the top numbers contradict the reveal at a glance.
6. **Chart labels clipped.** At phone width the right axis labels read "1.0(" and "0.7!". Minor.
7. **Ending.** "Power depends on the whole network, not on counting partners" ends on the idea; the model caveat line after it is fine.

Where understanding first broke: it did not break. The hardest moment was the reveal's third paragraph, not the stage.

## After reading the brief and the r6 review

doesNotKnow is "in a 4-path the inner people get 2/3, not all and not half". The stage shows the 2/3 arriving (trace rows, chart, bars) and the mechanism (fallback link, hatched blocks, the header formula each round). Show the why: met. No answer before the commit: met (the ⅔ target line is gone). The reveal quotes what you saw: met; every value is in the trace rows, which survive Reset.

**Top finding (revise, text budget):** the reveal is about 134 words (counted from the transcript), over the standard's 120-word limit, and the overflow is the dense third paragraph that restates what the trace already shows. This is the only thing between this lesson and launch for this boundary. It is a cheap fix; the builder chooses what to cut.

| r6 finding | Status |
|---|---|
| Top: locked stage leaks the answer with a "⅔" target line | fixed (locked chart shows only 0.50 / 0.75 / 1.00 marks) |
| Reveal quotes 0.625 and 0.688, which were never on stage as numbers | fixed (trace rows "B gets: .500 .750 .625 .688 …" stay on the stage, also after Reset) |
| Reveal 0.667 / 0.333 vs stage 0.666 / 0.334 | fixed (stage now settles at $0.667 / $0.333 in round 9) |
| Dependency told; the reveal does not point at the stage marks | partly fixed: the reveal now points at the trace rows and quotes the round-2 fallback drop to $0.250; it still does not name the hatched blocks or the B–C link, but the header formula shows the dependency each round |
| "1 − half of C's" fixed point told | not fixed (acceptable; my finding 3) |
| "hatched = fallback" caption drawn over axis labels | fixed (now readable between B and C) |
| Claims unchecked | partly: 4/7 checked (fact-checker) |

New minor items: right-hand chart labels clipped at phone width ("1.0(", "0.7!"); after Reset the bars read $0.500 while the reveal says $0.667 (the trace carries it).
