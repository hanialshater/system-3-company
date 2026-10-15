*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: lakes-misplaced-east-west
lesson version: v1
boundary: adult beginner (the brief's own boundary). Knows that old maps were less accurate. Does not know that the error was mostly east-west, or that it shrank within a century. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/lakes-misplaced-east-west/sheet.png, recorded 2026-10-15T10:05:09.270Z, production build on http://localhost:3590, phone viewport; 07-reveal.png cropped to check the bar labels)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: step 5 and the reveal, on Coronelli's numbers.** The bar chart's top row label is clipped at the right edge: it reads "59 / 3(" instead of "59 / 363". The reveal opens by quoting exactly that row ("59 km off north-south but 363 km off east-west"), so the number the reveal points at is not legible on the stage when it opens. The readout from step 1 had it, but by then that readout has been replaced by "9 of 11".
2. **What the prediction felt like.** It felt fair. With my boundary "About equal" is the natural pick. The locked stage shows true positions only, and the options are the same precision. The hook "Which way were they off?" asks the question without leaning.
3. **Did the reveal answer the question I actually had?** Mostly. Coronelli's map at step 1 is vivid: nearly every error line is horizontal. Pressing the maps oldest-first shows the lines shrinking, so "it shrank by 1818" is seen, not told. The cause ("longitude needs a time difference") is one told sentence. Here that is enough, because the shape of the error (sideways lines) already matches it. Two smaller breaks:
   - Step 3 (Mitchell 1755) reads "48 km N-S · 46 km E-W". That is the first moment east-west is *not* worse, and nothing comments on it; "9 of 11" arrives later. Fine, but a beginner pauses here.
   - The base map is a grey blob with faint lines. I could not make out the lakes, so "lakeshore points" floated free of any shoreline. Faint lake outlines would anchor it.
4. **Small artefact.** A white notch appears at the top centre of the map frame in every map frame. It looks like a rendering leftover.

Verdict reason: the reveal quotes Coronelli's 59 / 363 km, and on the stage at the reveal that label is clipped to "59 / 3(", so an element the reveal points at is not legible (demo standard, "the reveal fits with its picture").

Concrete fixes:
- Put the Coronelli "59 / 363" label inside or left of the bar end, shorten the longest bar's scale so the label fits, or wrap the label under the bar. Do not shrink the text.
- Optional: draw faint lake outlines on the base map; remove the white notch.

## After reading build.md / meta.json

- The objective (mostly east-west, Coronelli about 6 times the north-south error, shrank by 1818, because longitude needs a time difference) is met apart from the clipped label. The 59/363 ratio is the "about 6 times", and it is the very label that is clipped.
- This lesson and rome-placed-too-far-east share the "longitude needs time" cause. Here it fits what the learner sees (sideways error); in the Rome lesson it does not explain the one-way bias. A learner who meets both may connect them, which is a plus for this one.
- meta.json lists all 5 claims verified; the served trust sheet shows 5/5.
