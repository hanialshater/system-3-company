*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): ray-counts-crossings
lesson version: v3
boundary: adult-beginner (meta.json learner: knows what a polygon boundary is; does not know that a ray from the point crossing an odd number of edges means inside, even for a notched shape). Same tag as r7.
Screenshots seen: yes (artifacts/walkthroughs/ray-counts-crossings/sheet.png, 7 frames, build 5 walkthrough)
Verdict: revise

## 1. From the artifact (written before reading build.md)

Path walked: chose "Inside"; tapped (1, 4), (3, 4), (5, 4), (3, 1), (7, 4); opened reveal.

- **No answer before the commit: pass on the letter.** Options "Inside" / "Outside" / "Cannot tell without the area". Locked stage: unshaded U outline, point at (7, 4) with a grey dashed ray, "?" readouts. But the stem itself says the point "sits in the gap between the arms", and anyone who knows what a polygon boundary is can see the gap is outside the U. The prediction is answered by looking, so "Count, don't look" has no work to do. Same as r7's should-fix; routed to the learning designer.
- **Show the why: pass.** Numbered crossings, solid "in" and dashed "out" stretches that switch at each number; (1, 4) shows in/1/out/2/in/3/out. Clear.
- **Reveal quotes what you saw: pass for paragraph 1.** "Seen: (3, 4) 2 crossings, outside · (1, 4) 3 crossings, inside" is on stage at the reveal, and Tried lists all five.
- **Paragraph 2 points at a state that is not on the stage (revise).** "Look at the ray: at each numbered crossing it switches between solid (inside) and dashed (outside)". At the reveal the stage shows the last tap, (7, 4): 0 crossings, no numbers, no solid stretch, only a dashed tail. There is no numbered crossing to look at.
- **The reveal fits with its picture: pass at 390x844, through the kit shrink.** In 07-reveal the caption "(7, 4): 0 crossings, even, so outside." and the last reveal line are on screen. The U is drawn as a thumbnail of about 100 px; the axis ticks and the "out" label are about 2-3 px (kit W-287).
- **Text budget: fail.** About 108 words, over 90. The tie-rule sentence ("A ray through a corner exactly needs a tie rule; this stage keeps the point off corner heights", about 17 words) is told context.

## 2. Earlier findings (r7, v2)

1. Tried trace dropped (1, 4), which the reveal quotes: **fixed** (Seen line, Tried keeps five).
2. Looking answers the question (the U's gap is visibly outside): **not fixed**, routed by the builder to the learning designer. Still a should-fix.

## 3. New findings

1. **Revise (top):** paragraph 2 says "Look at the ray: at each numbered crossing it switches ...", but at the reveal the ray is at (7, 4) with 0 crossings. Either point the reveal at a state that is on the stage (for example, when the reveal opens, show the recorded (1, 4) ray with its three numbered crossings), or reword it to the Seen line. Also bring the reveal to 90 words or less (the tie-rule sentence is the obvious candidate; cm-cs decides).
2. Should fix (learning designer): a shape where the eye misleads, so counting beats looking.
3. Kit (W-287): U thumbnail labels about 2-3 px at the reveal.
- No FATAL.

## 4. After reading build.md

Pre-flight v3 item 4 says paragraph 2 "points at the ray on the current stage". On the DOM-order path the current stage is (7, 4), which has no numbered crossing. No item 7. Findings unchanged.
