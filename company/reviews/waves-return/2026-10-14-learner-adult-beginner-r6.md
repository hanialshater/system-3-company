*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): waves-return
lesson version: v4
boundary: an adult with school-level maths and science, new to the topic (lived through epidemic news; has heard "waves" and "R number", cannot say why waves recur). meta.json adds: knows SIR and that an epidemic peaks at 1/R0.
Screenshots seen: yes (artifacts/walkthroughs/waves-return/sheet.png, 7 frames including the reveal, integrated build 3 at :3470)
Verdict: launch

## 1. From the artifact

- Predict: "After the big wave" plus "Where does the town end up?" Almost none / About half / Almost everyone is a real spread. My instinct is "almost none", since most people are immune after a big wave, and I took it. The locked stage shows empty axes and a dot grid, and no dashed line is drawn. The legend, though, already lists "-- half" (see finding 1).
- Explore: "Next wave peak" goes to day 34, "50.7% susceptible, 16.0% sick (peak of wave 1)", and the grey line crosses the dashed half just as red peaks. "Day 900" shows the whole run: a deep dip, a few shrinking bumps, then the grey line flat on the dashed half, "50.00% susceptible ... cases holding steady: half can catch it." The dot grid shows the same thing, with grey dots refilling the top half. Immunity 50 d keeps it at 50.00% with more sick (4.5%). Immunity 200 d gives 49.9%, 1.3% sick, "cases shrinking: under half". Waves returning and settling at half are both on stage.
- Reveal: it opens now. "You saw wave 1 peak with 50.7% susceptible ... day 900 settled at 50.00%" quotes what I saw. "Above half they grow; below half they shrink while fading immunity refills the susceptibles" puts words to the grey line oscillating around the dashed line. 1/R0 rests on a knows item, and that is acceptable.

## 2. Earlier findings (r5, v3)

1. The reveal never unlocked after following the panel: **fixed** ("Show me why" after the immunity switch).
2. Immunity 200 d button clipped: **fixed** (all three fully visible in every explore frame).
3. Odd growing/shrinking readout at day 890: **mostly fixed**. 100 d and 50 d now read "holding steady". 200 d reads "shrinking: under half" at 49.9% (finding 2).
4. (v2) Only wave 1 peak examined: **not fixed**, minor. Day 900 shows the later bumps anyway.
5. (v2) Tiny chart and legend text: **not fixed**, minor.

## 3. New findings

1. Minor (W-154, mild): the locked legend reads "-- half" before anything is drawn. The word "half" next to the option "About half" is a cue. It could be hidden until lock-in, as the line already is.
2. Minor: with 200 d immunity, day 890 has not settled (49.9%, shrinking, under half), while the reveal says the balance "held whatever the immunity length". A careful learner sees a small contradiction. Extending the run, or wording the readout as "close to half, still swinging", would fix it.
3. Minor: dot grid plus line chart is two pictures of one quantity. The line carries the idea, and the grid is small enough to ignore.
4. Minor: the reveal is about 120 words, and on the reveal frame the chart is scrolled to its bottom edge.
- No FATAL.
