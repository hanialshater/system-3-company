*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): elastic-loop-release
lesson version: v3
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: A crossing in a two-dimensional drawing is not enough to prove a knot. This open loop can be slid over an accessible end, removing the shown crossing without cutting the cord.)
Screenshots seen: yes (artifacts/walkthroughs/elastic-loop-release/sheet.png, recorded 2026-10-15T21:35)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "End through loop" (wrong); tapped Slide loop off; slid Free end to 22; opened reveal.

1. **Where it first broke: I did not know what object this is.** The stage is a line with a loop and a crossing dot, a white tab at one end and "free end 20cm". The slug says elastic loop; the footnote says "Plain cord; storage only". Is it a cable tie, a bungee, a cord wrapped round a cable? I could not picture the real thing, so I could not use what I already know about it.
2. **The question is in drawing language.** "Which manipulation removes the drawn crossing?" A beginner thinks "how do I get this undone?", not "remove the drawn crossing". "End through loop" versus "Slide loop off" were both plausible to me, so the prediction was a genuine guess, but a guess about the drawing, not about cords.
3. **The after-picture does not show sliding.** After "Slide loop off" the cord is a straight line with a grey oval at the end and an arrow. I did not see the loop travel along and come off the end; I saw a before and an after.
4. **The slider did nothing.** Free end 20 to 22cm; Drawn crossing stayed 0. "Loop travel=10cm" suggests the end must be long enough for the loop to travel, but I never saw a case where it was not.
5. **Reveal versus my question.** "A crossing in a two-dimensional drawing is not enough to prove a knot" is a mathematician's sentence. My question is "when is this a knot that needs picking apart, and when does it just slide off?" The reveal answers it for this one drawing only. The electrical-safety caveat is responsible but makes me wonder if this is about power cords, which the lesson never says.

Fixes (for the builder):
- Name and draw the object (for example a cord coiled with an elastic loop round it) and animate the loop sliding off the end.
- Make the slider matter: if the free end is shorter than the loop travel, the loop cannot slide off.
- Phrase the question as a person would: "Is this a knot, or will it slide off?"

Verdict reason: the learner cannot tell what real object is drawn, the question is posed in drawing terms, and the slider never changes the outcome, so the everyday idea does not land.

## After reading the brief (meta.json)

- Version v3. The objective is the reveal sentence ('a crossing in a two-dimensional drawing is not enough to prove a knot'), which is about drawings, not about an everyday object; that matches finding 1 (no real object is named).
- Misconception field is the generic template sentence and is not what the prediction tests.
- Fix route: demo-builder (name and draw the object, make the slider matter).
