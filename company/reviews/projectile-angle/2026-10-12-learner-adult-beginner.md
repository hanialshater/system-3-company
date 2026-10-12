*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: projectile-angle

Knowledge boundary used: remembers school arithmetic and what an angle in degrees is; has thrown balls and watched water from a hose; has never studied projectile motion, vectors, or sin/cos. Phone viewport. Method: transcript + screenshots (walkthrough and QA phone), plus my own Playwright run (30 then 60, then 45, 5 and 85 degrees; reveal button state before and after the first launch).

## 1. From the artifact (written before reading the brief)

**Where understanding first broke.** In the reveal: "Time in the air times sideways speed comes out equal for any two angles that add to 90°: 20° and 70°, 40° and 50°." Up to there I follow the story ("The 60° ball climbs to 15.3 m and stays up 3.5 s, but drifts sideways slowly. The 30° ball races sideways but is down in 2.0 s."). That story is a good plain-language account of a trade-off. But "any two angles that add to 90°" appears as a rule I did not see; I tried nothing at 20° and 70° (and the walkthrough did not either), and "sideways speed" has never been defined or shown.

**Did the prediction allow a real guess?** Yes, and a good one. Three plain options, a ball and an angle I can picture. My gut says the higher throw goes farther or the flatter throw goes farther; "the same spot" is the unlikely-looking choice, so a guesser may avoid it. I picked "A, the flatter 30° throw" (as the walkthrough did) with a feeling of "flat is faster, it covers ground". The locked stage shows a dashed arc at 20° with 26.2 m, 2.4 m, 1.4 s, which is a small free hint that angle changes distance, but nothing about the answer.

**Did exploring answer the learner's actual question?** The question is "which lands farther, 30° or 60°?". The panel even says "Launch at 30°, then at 60°. Compare where they land." When I did that (slider to 30, Launch; slider to 60, Launch), the stage showed both arcs on one ground line, both ending at 35.3 m, with a green marker and the caption "30° and 60°: different arcs, same landing spot." That is a strong, directly shown answer; the two arcs ending on the same dot is the best moment in the lesson.

But the walkthrough never saw it. Its moves were to the slider values 35°, 50° and 65° (the slider starts at 20° and moves in 5° steps, so it never lands on 30° or 60° by accident). It launched three arcs at 35°, 50° and 65° and read 38.3 m, 40.2 m, 31.2 m. It then opened the reveal, which says "30° and 60° land at the same spot, 35.3 m away." The learner there never saw 30° or 60°. The numbers they did see (38.3, 40.2, 31.2) suggest "steeper goes farther, then not so much", which is unrelated to the claim in the reveal.

**Was the reveal earned by what was SHOWN or only TOLD?** For a learner who follows the panel text, shown. For anyone who just plays with the slider, only told. "Show me why" is live after a single launch at any angle: in the walkthrough it was visible after one 35° launch (03-step-2.png), and in my run it appeared after one 30° launch with nothing yet compared. The reveal's central claim needs the 30°/60° pair, and the lesson lets me leave without it.

**Other things a beginner hits.**
- "LANDS", "PEAK", "AIR" are readable; "PEAK" and "AIR" help the reveal's "climbs to 15.3 m and stays up 3.5 s" make sense. Good.
- The stage has a lot of empty sky above the arcs on phone (the picture sits in the lower third); the arcs are small at 30°.
- Labels at the landing dots collide at the right ("31.2 m", "38.3 m", "40.2 m" overlap in 07-step-6.png); hard to tell which dot is which angle once three arcs are drawn.
- The slider goes 5° to 85° in 5° steps; the 30/60 marking only fires if you hit exactly those. A learner at 25° and 65° sees no message.
- The reveal ends with "This is without air drag. Real air steals more from the long, steep flight." That is a useful honesty note but is also unseen and unexplained ("drag").
- The "balance point, 45°" is only told; my run launched 45° and the arc reached 40.8 m, so it can be shown, but the lesson does not ask.
- The reveal heading "Not quite: it was 'They land at the same spot'" is fine for A and B guessers.

### Findings (problems)
1. FATAL: The reveal can be reached without seeing the key thing. "Show me why" unlocks after a single launch at any angle (35° in the walkthrough, 30° in mine). The claim "30° and 60° land at the same spot" is shown only if the learner chooses exactly 30° and 60°, and the walkthrough run never did (it used 35°, 50°, 65°), so it read a reveal about something it had not seen.
2. The data a learner sees by playing freely (38.3 m at 35°, 40.2 m at 50°, 31.2 m at 65°) does not display the pairing at all; without 30° and 60° the lesson looks like "angle matters, sort of".
3. The general rule ("any two angles that add to 90°") and "sideways speed" are told, not shown; nothing nudges the learner to try 20° and 70°.
4. Three-arc plots crowd the landing labels on phone.
5. The 30° and 60° pair is special-cased on the slider; nearby angles look unremarkable.
6. The air-drag sentence is told, with no picture.

## 2. After reading the brief

- Intended misconception: each angle has its own distance; steeper or flatter goes farther. The prediction targets it well, and the pair arc display is exactly the right device when 30° and 60° are launched. The lesson's idea is sound; the gap is that nothing guarantees the learner sees it.
- Objective: explain that angles adding to 90° land together (30/60, 20/70), steep stays up longer but drifts slowly, and 45° goes farthest. My experience: the trade-off story (stays up vs sideways speed) is in the reveal text only; 20/70 is never prompted; 45° is never prompted. The objective's three parts all live in the reveal text, with one shown (30/60) and only if the learner picks those angles.
- The brief's boundary (no sin/cos, no velocity components) matches mine, and the reveal avoids formulas, which fits. "Sideways speed" is the one piece of the missing velocity-splitting concept that leaks in undefined.
- Claims have been marked verified by the fact-checker since the artifact was captured (the trust sheet in the transcript showed unverified). A verified claim can still be unearned by what the learner was shown; the fatal finding is about the sequence, not about truth.

Verdict: fatal
