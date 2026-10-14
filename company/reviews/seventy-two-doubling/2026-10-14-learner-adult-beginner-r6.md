*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): seventy-two-doubling
lesson version: v3
boundary: adult-beginner. Knows what doubling means and percentages of an amount; does not know how a compound growth rate links to doubling time, or the rule of 72 (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/seventy-two-doubling/sheet.png, all 3 frames)
Verdict: launch

## 1. From the artifact

- Hook and predict: "When does 100 become 200?" and "Money grows 8% a year. How long until it doubles?" are clear. The stem glosses compounding. The options are 12.5 (the simple-interest trap), 9 and 6. The locked chart shows only the 200 line with "SHORTCUT ?" and the other readouts hidden, so nothing leaks. The slider starts at 7%.
- **Where I wobble (moderate): 8% can go by in transit.** The walkthrough's one slider move went 7% → 9%, two arrow presses, and "Show me why" lit at once (frame 02). From the transcript, every frame I saw was at 9%: doubles in 8.0 yrs, shortcut 8.0, simple 11.1. The reveal then answers the 8% question ("About 9 years: 1.08 multiplied by itself 9 times is 1.999") and says "At 9%, which you tried next". From the artifact alone that reads as if the reveal quotes a state I never saw.
- What does work: at 9% the compounded bars against the dashed simple-interest line show compounding pulling away and reaching 200 sooner (8.0 vs 11.1). That is the why behind "12.5 is the simple answer", and it is on stage. The SHORTCUT readout matching DOUBLES IN at a second rate shows the rule working beyond 8%.
- Minor: the "doubled: 8.0 yrs" flag and the "simple: 11.1" label collide near the 200 line, and the simple label is hard to read.
- Minor: why 72 is accurate is not given. "72 divides evenly by many rates" says why it is convenient.

## 2. Earlier findings (r5 review, v2)

1. Title "The rule of 72" and a locked "SHORTCUT 72 ÷ RATE" readout let the learner compute the answer (top): **fixed**. The title is "When does 100 become 200?" and the locked readout is "SHORTCUT ?".
2. Only one rate was required before the reveal: **fixed**. The gate now needs 8% and then another rate. The reveal names the other rate the learner tried.
3. The "ln 2" aside was beyond the boundary: **fixed** (removed).
4. The doubled tag overlapped the simple label: **not fixed** (minor).
5. The x-axis changed scale between locked and explore: now 0–10 in both shown frames, **fixed** for this path.

## 3. After reading the brief

- I checked the gate in Demo.tsx to settle the moderate finding. The milestones are "at-ask" (rate = 8) and then "other-rate". The QA slider's two arrow presses passed through 8% before landing on 9%, so 8% was reached, but only for one press. A phone learner dragging from 7% upward will likewise pass 8% for an instant and unlock both milestones in a single drag. "Which you tried next" is true, but the 8% chart (bars crossing 200 at 9 years) may only flash. This is moderate: worth making 8% sticky or a tap stop. It does not block, because the compound-vs-simple why is shown at whatever rate the learner lands on.
- The doesNotKnow items (compound rate to doubling time, rule of 72) are on stage as DOUBLES IN vs SHORTCUT at two rates. The cause the objective asks to explain ("compounding makes growth earn growth, so doubling comes sooner than 100 / rate") is the bars against the dashed simple line, and the reveal points at them. That meets "Show the why you promised".
- Minors: label collision, no reason given for 72's accuracy. No FATAL.
