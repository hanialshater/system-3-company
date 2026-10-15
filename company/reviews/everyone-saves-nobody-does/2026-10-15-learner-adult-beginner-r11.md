*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: everyone-saves-nobody-does
lesson version: v1
boundary: adult beginner (borrowed mind). Knows: saving = income − spending, and one household that spends less saves more; one person's spending is another's income (count-the-bread-once). Does not know: that in a simple model with fixed investment, when every household tries to save more, incomes fall until total saving is back where it was. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/everyone-saves-nobody-does/sheet.png, recorded 2026-10-15T10:10:30.177Z, build c0cfd14 served on localhost:3590)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break, but one step was unexplained. Income falling from $1,000 to $900 (a $100 drop from a $20 cut) is shown, not explained. The reveal's "incomes fell until people could save only what businesses invest" gives the end state but not why the fall is five times the cut.
2. What the prediction felt like: $120 (my $20 plus the old $100) is the natural answer from the one-household view. $80 is a good alternative trap.
3. Whether the reveal answered my question: yes. The round-1 jump to $120 and fall back to $100 is the story, and "If extra saving funded extra investment, the answer would change" is a fair limit. I pressed "Cut $40" last and nothing ran. The reveal stage shows the $40 model at round 0 while the text describes the $20 runs; it did not confuse me but it is a loose end.

Verdict reason: nothing blocks.

## After reading build.md / meta.json

- No earlier learner review was recorded in evidence.simulatedLearner. The W-844 rewording touched Demo.tsx. The model line ("spending = $80 + 80% of last round's income; investment fixed at $100; fixed prices") is learner-visible and matches the numbers I saw (income $980 in round 1, $900 settled).
- The $100-income drop from a $20 cut (a multiplier of 5) is the one step a beginner cannot rebuild; it is a note for the builder.
