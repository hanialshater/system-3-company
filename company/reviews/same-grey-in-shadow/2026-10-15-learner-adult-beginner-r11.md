*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: same-grey-in-shadow
lesson version: v1
boundary: adult beginner (borrowed mind). Knows: we see the colours that are there. Does not know: that the brain estimates surface colour by discounting the lighting; so the same light from the screen can look like two different greys. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/same-grey-in-shadow/sheet.png, recorded 2026-10-15T10:10:09.196Z, build c0cfd14 served on localhost:3590)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break. The drawing works on me: A looks darker than B. "Sample A: 120, Sample B: 120" and the connecting band make the sameness visible, and removing the shadow shows them as one grey.
2. What the prediction felt like: "A is darker" was my honest answer; the illusion makes the question real.
3. Whether the reveal answered my question: yes. "The difference came from you, not the screen", then "in a real scene the guess is usually right", answers the follow-up I had (so is my eye broken?). "That is a guess about the world" comes in a bit abruptly before the Helmholtz line, but it reads.

Verdict reason: nothing blocks.

## After reading build.md / meta.json

- r10 was recorded as `Verdict: pass` (not a valid word). The fact-check rewording (W-844) touched Demo.tsx and meta.json. From the learner's side, the reveal's "Where it stops" sentence (light = lighting x reflectance) reads correctly and the sampler still reads 120 and 120.
