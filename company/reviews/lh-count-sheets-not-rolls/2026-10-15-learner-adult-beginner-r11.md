*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-count-sheets-not-rolls
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Calculate the usable unit count inside multipacks before comparing prices.)
Screenshots seen: yes (artifacts/walkthroughs/lh-count-sheets-not-rolls/sheet.png, recorded 2026-10-15T21:37:31.020Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "A"; tapped Test A; Test B; slid Sheets/roll 240 -> 260; opened reveal.

1. **The trap is real.** Six rolls for €6 vs four rolls for €5: "more rolls for one more euro" feels like the deal, and I fell for it.
2. **The stage shows why.** A: 0.008 €/sheet (6 ÷ (6×120)); B: 0.005 €/sheet (5 ÷ (4×240)). The working puts "rolls × sheets per roll" in front of me, which is the lesson.
3. **The reveal answers my question:** "The denominator is total sheets: rolls multiplied by sheets per roll. Comparing only roll counts hides the usable quantity." Clear, and the equal-sheet-size caveat is honest.
4. Notes (not blocking): prices per sheet in thousandths of a euro are hard to feel; showing total sheets (720 vs 960) beside the price would land faster. Rounding to three decimals makes the slider look dead: B stays "0.005€/sheet" at 240 and 260 sheets (it is 0.0052 vs 0.0048). The receipt drawings add nothing.

Verdict reason: the roll-count trap is tested with real numbers, both per-sheet prices are shown with rolls × sheets in the working, and the reveal states the rule.

## After reading the brief (meta.json)

- Objective "calculate the usable unit count inside multipacks before comparing prices" is what the stage does. Intent and experience agree.
- Notes for demo-builder (non-blocking): show total sheets; more decimals or cents per 100 sheets so the slider visibly moves B.
