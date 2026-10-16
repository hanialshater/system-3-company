*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: which-sea-gets-the-rain
lesson version: v3
boundary: adult beginner who knows rivers run downhill to the sea; does not know that a drainage divide, not distance, decides which sea gets the rain, or that a divide near one coast sends most of the land to the far one (meta.json `learner` field, read before walking; nothing else in meta.json read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/which-sea-gets-the-rain/sheet.png, recorded 2026-10-16T14:43:18Z)
Verdict: launch

Run: SO-10-3 batch=SO-10-3 `[project:wave-j]`, shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start; R3a check.sh exit 0). Inputs: transcript cut at `## Appendix: trust sheet`, plus sheet.png. Walkthrough choice: option 1 ("The west sea").

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** It did not break in a way that blocks. Before the prediction the island is a blank rectangle with a red dot and "55 km" / "150 km" over it, so the only cue is distance. After "Rain at the dot" the relief appears ("darker = higher"), with a dark band close to the west coast, and a red path runs from the dot east to the east sea. "Rain west of the ridge" drops a second spot just west of the band and a dashed path runs a short way west. "Colour land by its sea" shades the two basins, draws the "divide" line and labels "20%" and "80%". Each step adds one thing, and the third makes the rule visible at a glance. This mind follows it.
   One small hesitation: the button the learner pressed second is labelled "Rain at a second spot" before the prediction and "Rain west of the ridge" after it. The relabel is helpful once the ridge is visible, but a learner glancing at the panel ("then west of the ridge") may look for a button they did not see on the predict card.
2. **What the prediction felt like.** Fair but a little blind. With no relief shown, the learner can only reason from distance, so "The west sea" is the answer the card invites. That is the misconception the lesson targets, so it works. A learner who knows "rivers run downhill" might feel they were not given the map they needed; the reveal answers that ("the slope is set by the ridge, not by the nearest coast").
3. **Whether the reveal answered the question the learner actually had.** Yes. "Your drop ran east, to the sea 150 km away, though the west sea was only 55 km away. Water follows the slope" answers "why not west?", and the second paragraph names the divide and ties it to the 80% the stage showed.

Notes (not blocking):
- "Neither: it soaks in on the way" is never addressed. It is a weak distractor; a sentence is not needed.
- After "Reset" (step 4) the relief and divide stay drawn (dashed), and "Reset" greys out, but the button labels keep "Rain west of the ridge". Fine.
- No dead end under R4: every control changes the stage; "Show me why" unlocked after "Colour land by its sea".

Verdict reason: launch. No finding blocks a first-time learner; the three steps show the divide doing what the reveal says.

## After reading build.md / meta.json

(Written after the findings above were committed in 5246021. build.md not read. meta.json read at HEAD 74a730e, committed content only.)
- **Intent vs experience.** Objective (rain follows the slope to the sea on its side of the divide; a divide near the west coast sends about four fifths east) and misconception ("flows to the nearest sea") match the walk exactly. The blank predict map is how the misconception is drawn out; it works for this boundary.
- c1-c4 match what the stage showed. c5 is a recall item not seen in the walkthrough (the walk ends at the reveal); not judged here.
