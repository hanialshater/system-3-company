*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: earthquakes-did-not-fall
lesson version: v1
boundary: adult beginner (the brief's own boundary). Knows that disasters kill fewer people than they used to, and that a rate per person can fall while a count rises. Does not know that recorded earthquake deaths did not fall. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/earthquakes-did-not-fall/sheet.png, recorded 2026-10-15T10:04:56.923Z, production build on http://localhost:3590, phone viewport; frame 03-step-2.png cropped to check the bar labels)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** Nowhere seriously. The one visual defect is at step 2: the "1.37M" bar label collides with the "1959-2017" panel header and prints on top of it. The number survives in the readout ("1.21M → 1.37M"), so meaning is not lost, but the key bar's own label is the hardest thing on the stage to read.
2. **What the prediction felt like.** It felt fair, with one cue. With my boundary ("disasters kill fewer now") "Fell about 70%" is the natural pick, so the prediction can really go wrong. But the hook "Disaster deaths fell. And earthquakes?" sets earthquakes apart as a contrast, and "Rose about 15%" is the only option going the other way, on its own full-width row. A learner used to feed lessons will smell the twist. That is not fatal: the options are equally precise and the locked stage is empty.
3. **Did the reveal answer the question I actually had?** Yes, in order:
   - "all disasters fell, quakes rose" is shown by steps 1-2;
   - "but per person the risk fell" by step 3 (9.7 → 4.5, with world 2.11 bn vs 5.19 bn under the bars);
   - "and a few years dominate" by step 4 (three black bars, 53%).
   The "Where it stops" line ("a single year can change a half-century's total") follows from the step-4 picture I just saw. My leftover question, "why did quakes not fall like the others?", is not answered. But the lesson honestly says the trend is hard to read, and that is a fair place to stop.
4. **Small reading notes.** At step 1 the "Quakes" bar is a sliver next to "All", which is fine; it sets up step 2's rescale. The step-4 year chart has no year labels on its x-axis apart from the three named years. That is acceptable.

Verdict reason: no finding blocks a first-time learner. The label collision and the contrast-cue hook are notes.

Concrete fixes (notes):
- Step 2: move the "1.37M" label inside the bar top, or lower the panel header, so it does not overprint "1959-2017".
- Consider a hook that does not set earthquakes apart: "Recorded disaster deaths fell about 70% across the 1900s. What about earthquakes?" still contrasts. A neutral alternative: "Two halves of the 20th century's disaster record: what did each kind do?"

## After reading build.md / meta.json

- The objective (all disasters 25.2 → 7.4 million, earthquakes 1.21 → 1.37 million, per-person risk 9.7 → 4.5, three years = 53%) is met, step by step, by what I saw.
- build.md's pre-flight answers question 1 with "no direction for earthquakes". I read "And earthquakes?" as implying a contrast. That is a judgement call, recorded here as a note, not a block.
- meta.json lists all 5 claims verified; the served trust sheet shows 5/5.
