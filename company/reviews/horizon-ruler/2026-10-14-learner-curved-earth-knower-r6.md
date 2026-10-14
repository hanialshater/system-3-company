*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: horizon-ruler (r6)
lesson version: v1
boundary: the lesson's own. Knows that ships disappear hull first and that the Earth is curved; has never seen how far the horizon is from a beach, or that it grows with the square root of height.
Screenshots seen: yes (artifacts/walkthroughs/horizon-ruler/sheet.png, 6 frames, recorded 2026-10-14 against build 3 on localhost:3470; walk chose option 1 "1.5 km", ended on the slider at 933 m)

## 1. From the artifact (written before reading any earlier review)

- **No answer before the commit: pass.** Title "How far away is the horizon?" and hook "Ships vanish over the horizon long before your eyes give up. So where is that edge?" do not point to an option. Options "1.5 km / 4.7 km / 15 km" are all numbered; 4.7 is the least round, but 1.5 has the same one-decimal precision, so I do not count it as "worded more precisely". The locked stage is set to 30 m, not 1.7 m, HORIZON shows "?", and the green grazing dot at 30 m is not labelled with a distance. The 50 km scale bar would let a very careful learner estimate the 30 m case, not the question's case.
- **Prediction felt like:** a real guess; with a curved Earth in mind I had no sense of scale. The hook does help: "long before your eyes give up" tells me the edge is the curve, which is the mechanism, not the number.
- **Explore:** "Your eyes, 1.7 m" gives 4.7 km and a sight line so short it is barely visible; "100× higher, 170 m" gives 47 km; Burj Khalifa 828 m gives 103 km; slider to 933 m gives 109 km. 100× higher giving 10× farther is the surprise, and two taps show it.
- **Where understanding first broke:** "Pythagoras on the tangent ... square root of 2 × Earth's radius × your height" in the reveal. The stage never draws the radius or the right angle, so for me this is a told formula. "Square root means slow growth" is carried by 4.7 → 47, which I did see.
- **The reveal quotes what you saw: fails on visibility.** The reveal names 4.7 km, 170 m / 47 km and 828 m / 103 km. When the reveal opens (frame 06) the stage shows 933 m and 109 km; none of the three quoted states is on the stage (no trace or row of earlier heights). The quoted values did not drift to my current 109 km, so they look milestone-recorded, but I am asked to compare against numbers I can no longer see. Reset was not pressed in the walk.
- **Phone legibility:** at 933 m the "109 km" label is crossed by the sight line; the "horizon" label touches the caption at the bottom edge.
- **Did the reveal answer my question?** Yes: "the horizon is that grazing point, not the limit of your eyes" is exactly the question I had, and the green grazing dot stands for it.

## 2. After reading the earlier review (2026-10-13-learner-adult-beginner.md)

- Different boundary (adult map user); its launch verdict was written without the launch reviewer seeing the screenshots.
- It said 4.7, 47 and 103 km "all appeared on the stage"; true during explore, not at reveal time. Under the new visibility rule that is a finding.
- Agreement: formula and "tangent" told; label overlap at tall heights; slider max 933 m after an 828 m button is odd.

## Findings (problems, not fixes)

1. The quoted heights and distances (1.7 m / 4.7 km, 170 m / 47 km, 828 m / 103 km) are not visible on the stage when the reveal opens; the stage shows 933 m / 109 km.
2. The square-root formula via "Pythagoras on the tangent" has nothing on the stage that stands for the radius or the right angle. The square-root growth is in the brief's doesNotKnow, but the 4.7 → 47 pair does show it, so this is minor.
3. The "109 km" label is struck through by the sight line at the top heights.

Verdict: revise (finding 1 breaks "The reveal quotes what you saw"; no fatal flaw seen)
