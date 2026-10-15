*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: children-dying-before-five
lesson version: v2
boundary: adult beginner (the brief's own boundary). Knows that many children died in the past. Does not know how many (about 4 in 10 worldwide in 1900), that the figure barely moved through the 1800s, or that most of the fall came after 1950. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/children-dying-before-five/sheet.png, recorded 2026-10-15T10:05:21.294Z, production build on http://localhost:3590, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** Nowhere seriously. The one stumble is the line "56% of that fall came after 1950". The stage shows 1900→1950 as 411→246 (50 years) and 1950→2020 as 246→37 (70 years). A thinking beginner asks whether "more than half after 1950" just reflects the longer span. Per year the two periods are close: about 3.3 vs 3.0 per 1,000 a year. So the "after 1950" message is weaker than the reveal makes it sound. The picture itself shows the real point well: flat for a century, then a fall from about 1920.
2. **What the prediction felt like.** It felt fair. With my boundary, "About 100" (a big but not huge drop) is the natural pick and "About 250" the cautious one. The locked stage shows 1800-1900 flat, which supports the hook's "four in ten" and does not leak the 2020 value. The options are the same precision.
3. **Did the reveal answer the question I actually had?** Yes for "how much": 411 → 37, about 11 times fewer, and "41 in 100 → 4 in 100" makes it felt. No for "why": vaccines, clean water and the like are never mentioned. The lesson does not promise a cause, so this is a note.
4. **"Out of 100 children" step.** It changes only the readout. The picture stays the same, so the most "feelable" number in the lesson has no picture. An icon row of 100 children (41 shaded vs 4 shaded) would land harder than the text.

Verdict reason: no finding blocks a first-time learner. The 56% framing and the text-only "out of 100" step are notes.

Concrete fixes (notes):
- Either drop "56% of that fall came after 1950" or reframe it so the period lengths do not do the work, for example "from 1950 the figure fell from 246 to 37, faster than ever before" (if the source supports a per-decade comparison).
- Give "Out of 100 children" a picture: a 10×10 grid with 41 vs 4 marked.

## After reading build.md / meta.json

- The objective includes "more than half of that fall after 1950". That is the claim I find weak as a *teaching* point (finding 1), though not as a fact. The misconception ("child deaths fell slowly and steadily over the last few centuries") is well refuted by the flat 1800s line, which the reveal names ("barely moved, from 430").
- meta.json lists all 7 claims verified; the served trust sheet shows 6/7, so the served build may predate the last fact-check pass.
