*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): humidity-evaporation-gap
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: At equal temperature, higher relative humidity means a smaller difference between a wet surface’s saturation vapour pressure and surrounding water vapour. This model shows the gap, not a drying clock.)
Screenshots seen: yes (artifacts/walkthroughs/humidity-evaporation-gap/sheet.png, recorded 2026-10-15T21:33:34.596Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Humid setting"; tapped Drier setting; slid Humidity 70 -> 72%; opened reveal.

1. **Where understanding first broke: the question.** "Which equal-temperature setting has the larger vapour-pressure gap?" uses two terms I do not know. I guessed by vibes. A beginner's real question is "why does washing dry slower on a humid day?", and that is only in the trust sheet.
2. **The slider says one number and the stage shows another.** On "Drier setting", the slider reads Humidity 72%, while the label under it reads RH=42% and the gap is computed from 42%. I could not tell what humidity the air actually had.
3. **The humid-setting gap is never shown.** I saw 0.6 and 0.58 for the drier setting only. The humid value (0.3 at 70%) would make the point; it never appears.
4. **The picture does not change with humidity.** A flat board with four arrows looks the same in every frame. Nothing visual gets smaller when the air gets wetter.
5. "Normalised gap" has no units and no meaning for me. The reveal sentence ("higher relative humidity means a smaller difference between a wet surface's saturation vapour pressure and surrounding water vapour") is correct-sounding but beyond my boundary; "the air is already nearly full of water, so less can leave the cloth" is what I needed.
6. Reveal typo: "The current drier setting setting gives 0.58". Hedges are honest.

Verdict reason: the slider shows a humidity the stage does not use, the humid-side gap is never shown, and the question and reveal are in vapour-pressure terms the learner does not have.

## After reading the brief (meta.json)

- Claim c3 reveals the slider behaviour: "comparison RH = max(0, input − 30)". So on "Drier setting" the slider's 72% is not the air's humidity; that is the source of finding 2 and it will mislead every learner who reads the slider.
- doesNotKnow uses "saturation vapour pressure", which is beyond the stated boundary; the stage gives no plain-language bridge.
- Fix route: demo-builder (one humidity slider whose value is the air's RH; show both gaps; reveal in plain words; fix "setting setting").
