*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: acid-diluted-a-thousandfold
lesson version: v2
boundary: adult beginner (borrowed mind). Knows: that each pH unit is a factor of 10 in hydrogen ions (ph-log-scale); that dilution lowers concentration (same-sugar-more-water). Does not know: that water makes its own H+ and OH- (about 10^-7 mol/L each at 25 °C); that diluting an acid therefore stalls near pH 7 instead of passing it. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/acid-diluted-a-thousandfold/sheet.png, recorded 2026-10-15T10:07:18.662Z, build c0cfd14 served on localhost:3590)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break. The hook gives the rule (tenfold raises pH by about one), so I expected 8 and watched it stall at 6.79 and 6.98. The blue "from water" bar growing past the pink one is the picture of the idea.
2. What the prediction felt like: I picked "about 5" (dilution does not change a strong acid). Others will take 8 from the hook's own rule; both are real wrong answers.
3. Whether the reveal answered my question: yes. "Dilution does move pH" speaks to my choice first, and the second paragraph says why water's bar started tiny (acid squeezes OH- down, and water's H+ comes paired with it). That was my question: "why was water only 10^-9 at the start if pure water is 10^-7?" One reading cost: 9.9x10^-9 at x10 versus 1.0x10^-8 is a rounding detail a beginner will not notice.

Verdict reason: nothing blocks.

## After reading build.md / meta.json

- r10 said revise: water's bar contradicted "10^-7 each". The reveal now says acid squeezes OH- down and water's H+ comes paired with it, so water's bar started tiny. That answers the question I had independently. Addressed from the learner's side.
- Boundary matches meta.json (pH log scale; dilution lowers concentration).
