*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: doubling-stopped-speeding-up
lesson version: v3
boundary: adult beginner (meta.json learner field, read before the walk as the role's input). Knows that world population grew fast and passed 8 billion. Does not know that the last doubling (4 to 8 billion) took no less time than the one before, or that the yearly growth rate peaked in 1963. Counts people, not rates.
Screenshots seen: yes (artifacts/walkthroughs/doubling-stopped-speeding-up/sheet.png, recorded 2026-10-16T09:28:24.510Z, production build of HEAD c2923c9 on http://localhost:3591, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: nowhere that blocks.** Both r1 breaks are fixed:
   - The options are now "About 24 / 48 / 96 years" (half, same, double), all built the same way. The answer is not the odd number out. With my boundary, after 122 then 48, "about 24" (it keeps halving) is the natural pick, and I took it.
   - The hook is now "...How long did the next doubling take?", an open question.
   - The reveal now answers the people-counting objection directly: "It added 4 billion people, not 2, only because it started from twice as many; as a share of those alive, growth is slowing." That was exactly my question after step 3 (the span strip shows "+4 bn" under "47 yrs").
2. **What the prediction felt like.** Fair, and the wrong pick felt reasonable. The locked stage shows empty axes.
3. **Did the reveal answer the question I actually had?** Yes. Step 3 gives "47 yrs, +4 bn", step 4 switches to the rate chart (peak 2.25% in 1963, 0.88% for 2022 to 2023), and the reveal ties the two together. The span strip under the axis stays visible in the rate view, so both pictures are on screen at the reveal.
4. **Notes, not blocking:**
   - The full population line appears on the first tap after lock-in, so the 4-to-8 crossing can be read off the curve before "4 to 8 billion" is pressed. The prediction is already locked, so this costs no honesty.
   - The answer is "About 48 years" while the stage says 47. "About" covers it, and the reveal says 47 plainly.
   - A sharper beginner may ask how a rate falling from 2.25% to 0.88% still gave a doubling as fast as the last one. The lesson does not need to answer this to make its point.
5. **Trust sheet** reads 7/7 checked on the served build.
6. **Framing.** World totals only. No group or place framing.

Verdict reason: the r1 findings (options that telegraphed 47, a yes/no hook, the unanswered "but it added twice as many people") are fixed on the served build, so no finding blocks a first-time learner.

## After reading meta.json (build.md not read)

- The walk delivers the misconception's refutation and the objective (122 / 48 / 47; peak 2.25% in 1963).
- **Still open from r1, a note for the brief owner (cm-history), not a learner-facing problem:** the objective in meta.json still says "0.87% in 2023", while the stage and reveal say "0.88%, 2022 to 2023", per cm-history's r1 ruling 18. The learner sees the ruled number. The brief text lags behind it.
