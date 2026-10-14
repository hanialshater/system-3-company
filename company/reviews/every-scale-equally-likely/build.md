# Build note: every-scale-equally-likely

builder: ncm-p1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. Bar chart of the share of long links landing in each doubling band of ring distance (1, 2–3, 4–7, …, 128–255, 256–512) on a ring of 1,024. Rule buttons Uniform / Chance ∝ 1/d / Chance ∝ 1/d² redraw the bars; a Band slider highlights one band and the readouts show how many distances it holds, how likely each is relative to d = 1, and the band's share. That pair of readouts is the "why" (twice the distances, each half as likely). Bars and shares are hidden ("?") until the prediction. The stage starts on 1/d² so the first press of each rule changes the picture. Milestones: q0, q1, band.

## Answers re-run in node
- Exact sums, 2 people per distance below 512 and 1 at 512. 1/d: 14.7, 12.2, 11.1, 10.6, 10.4, 10.3, 10.2, 10.2, 10.2 %. Uniform: last band 50.1%. 1/d²: distance 1 gets 60.9%. Same as the brief.

## Choices
- The brief's "2–4 vs 256–512" became "2–3 vs 256–512" so the question names a stage band exactly (bands are [2^k, 2^(k+1)), the last includes 512). Answer unchanged: about equal (12.2% vs 10.2%).
- Tick labels show each band's lower bound only (labels like 256–512 would collide at 390 px); the slider and readouts give the full band.

## Known gaps
- No sampling; this is an exact calculation. That fits the single-card format the brief names.
- c5 (why it gives fast search) cites E&K ch. 20 and Kleinberg 2000 from the brief; it is unopened.

## v2 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-knows-1-over-d-routing-r6.md)
- Main finding (the cancellation reached the learner as told text; the band slider was used only under 1/d²): under 1/d a compare line shows the cancellation for the question's two bands, "Distances × chance each (d = 1 is 1): 2–3: 2 × 0.42 ≈ 0.83 → 12.2% · 256–512: 257 × 0.0027 ≈ 0.70 → 10.2%". The reveal points at it. The band milestone counts only under 1/d. Rule buttons now run Uniform, 1/d², 1/d, so the one-press-each path ends on the question's rule. New claim c7.
- Minor (a rule looked selected while locked): no rule is selected until the learner picks one; bars show "?" until then.
- The reveal's 50.1% (Uniform, far band) and 60.9% (1/d², distance 1) stay on stage as dashed outlines of those rules' tallest bars with their shares, once each rule has been seen. Milestones q0, q2, q1, band (minInteractions 4).
- Hook "...most links should be short. Are they?" leaned toward no; now "If nearer links are likelier, where do most links land?".
- Not done: the phone crop of the readouts in the locked frame (layout; not reproduced here).

## Pre-flight v2
1. Title and hook: "Near or far: where do 1/d links land?" / "If nearer links are likelier, where do most links land?" Neither says the bands come out equal.
2. Options: "2–3 away" · "256–512 away" · "About equal". None carries a share.
3. Locked stage: "Share of links landing in each band of distances.", nine "?" bars over ticks 1, 2, 4, … 256, no rule button marked active, readouts Distances in band 2 / ? / ?. No compare line, no outlines.
4. Reveal values: "12.2%", "10.2%", "2 ... 0.42", "257 ... 0.0027" (milestone q1; the compare line, shown while 1/d is selected, and the bars 12 and 10); "10–12%" (the 1/d bars); "50.1%" (milestone q0; dashed outline "Uniform 50.1%" on the last band); "60.9%" (milestone q2; dashed outline "1/d² 60.9%" on the first band).
5. QA path: Uniform (q0), Chance ∝ 1/d² (q2), Chance ∝ 1/d (q1), slider two right presses (bands 4–7, 8–15; band). All four milestones; the question's case (1/d) is q1 and is the rule on stage when the reveal opens, with the compare line and both outlines.
6. Reset: no Reset control; seen rules only accumulate. Reveal after that path: "With 1/d links, the band 2–3 got 12.2% of links and 256–512 got 10.2%: 2 distances at about 0.42 each against 257 at about 0.0027 each (the compare line). Every band from 2–3 out gets 10–12%. / Each band holds twice as many distances as the one before, and each of those distances is half as likely, so the two cancel. Uniform links put 50.1% in the farthest band; 1/d² links put 60.9% at distance 1 (the dashed outlines). / So wherever a message is, a link that halves its remaining distance is about equally likely. That is why 1/d links route fast."
