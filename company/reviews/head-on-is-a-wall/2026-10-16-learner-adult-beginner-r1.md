*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: head-on-is-a-wall
lesson version: v1
boundary: adult beginner from the lesson's own learner field. Knows crashes are worse at higher speed, crumple zones and momentum; does not know that a symmetric head-on crash stops each car as a wall would, or that crash damage scales with speed squared.
Screenshots seen: yes (artifacts/walkthroughs/head-on-is-a-wall/sheet.png, recorded 2026-10-16T12:42:28Z, phone viewport, option 1 chosen)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Walkthrough on the shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (BUILT_FROM and `git -C /home/user/s3c-qa rev-parse HEAD`, read at start and end). Ancestry test: the newest commit touching src/demos/<d>/head-on-is-a-wall/ is cce79e5, and `git merge-base --is-ancestor cce79e5 bc0edc0` passes; since the newest commit of any kind passes, the newest non-evidence commit (W-1313 reading) passes too. No diff between bc0edc0 and main on the lesson directory. Transcript read cut at the trust-sheet appendix (R1); no build notes in the brief.

1. **Where understanding first broke.** In the reveal's last paragraph. Everything up to it worked: the crush bar read 145 kJ for the car crash and 145 kJ for the 50 km/h wall, and 579 kJ for the 100 km/h wall, and "4 times higher" was the surprise I needed. Then: "Doubling the closing speed doubles the total energy, but two cars share it. Crush energy grows with speed squared." For a mind that has just learned "double the speed, four times the energy" from the 50 vs 100 wall bars, "doubling ... doubles" reads as a contradiction two sentences before "speed squared". I could not tell what was being doubled relative to what (closing speed 100 vs which 50? total energy of what?). I stopped trusting my new rule at exactly the moment the lesson stated it.

2. **What the prediction felt like.** A real choice. "100 km/h" (speeds add) and "25 km/h" (the other car absorbs half) both pulled; 50 felt like the dull answer. I chose 25. One thing on the locked stage did catch my eye: under the picture, "Into a car" and "50 km/h" are already highlighted, directly above three answer buttons with the same three labels (25, 50, 100 km/h). I read it as the scenario setting, but a learner hunting for cues could read "50 km/h" as the answer marked in advance.

3. **Whether the reveal answered the question I actually had.** The first half yes: "is it like 25, 50 or 100?" is answered by bars I filled myself. My follow-up question, "why isn't it like 100 if we close at 100?", is the one the lesson needs to answer, and the sentence meant to answer it is the "doubling ... doubles" line from finding 1, which confused me more. "The meeting point never moved" helped; it is the best sentence in the reveal. The stills cannot show whether the meeting-point line visibly stays put during the animation; in the frames it is a fixed dashed line, which is consistent with that.

Notes:
- The 25 km/h wall (36 kJ) is shown during explore but the reveal never uses it; it was the option I picked, and nothing tells me why 25 is wrong beyond "it was 50".

Verdict reason: revise for one specific line: "Doubling the closing speed doubles the total energy, but two cars share it" sits beside "grows with speed squared" and, for this learner, reads as a contradiction of the 4x result just shown; the reveal needs to say what is compared with what (two cars at 50 carry twice one car's energy, not four times, and each car takes its own half).

## After reading meta.json (misconception, objective, claims; build.md not read)

- The sentence I flag in finding 1 is claim c4, "Doubling the closing speed doubles the total energy, but two cars share it", recorded as verified. I do not dispute that it is true (two cars at 50 carry 2 x 145 kJ, closing at 100, against one car at 50 into a wall, closing at 50). My finding is that, for this learner and next to c3's "grows with speed squared", it reads as a contradiction because it does not say what is compared with what. That is a pedagogy finding, not a fact dispute.
- The objective's last clause ("a 100 km/h wall puts four times the energy into one car") is shown well. The middle clause ("each crumple zone absorbs its own car's energy") is the one c4 is meant to carry, and it is the one that did not land.
- The predict-stage pre-selection of "Into a car" + "50 km/h" (finding 2) is not a claim; it is a layout question for the CM/designer.
- Verdict unchanged: revise.
