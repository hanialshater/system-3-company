# Build notes: compound-interest

## v2 (revision, 2026-10-13)
Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md. No FATAL was raised.

Key state (milestone, `minInteractions` = 1): `forty-years` (the learner has reached year 40).

| Finding | What I did |
|---|---|
| FC1 "$3,800" can be read as interest | The reveal now says "Plain 7% of $1,000 a year is $2,800 of interest: a balance of $3,800." The question asks "how big is the balance". c3 text changed (unverified). |
| FC2 / L: model label only after the answer | A "Model: steady 7%, no fees or tax" label is on the stage from the predict step on. The full caveat stays in the reveal. |
| L1 readouts mix a sliding window and a running total | One meaning: both readouts are running totals at the chosen year ("Balance, N yrs" and "Interest on interest"). Each decade's gain moved to its own row ("yrs 1–10 +$967 … yrs 31–40 +$7,362"), filled in as you reach each decade. |
| L2 reveal after a one-year nudge | Gated on reaching 40 years. "+10 yrs" was replaced by "Jump to 10 / 20 / 30 / 40" buttons, so 40 is one tap away. |
| L3 straight line and doubling only told | A dashed "first decade's pace" line is drawn up to the chosen year. The decade row shows the doubling (967, 1,903, 3,743, 7,362), and the reveal says "each decade added about twice the one before". New claims c9 and c10 (unverified). |
| L4 the two lower layers look alike on a phone | Deposit grey is darker and the 7% layer has an outline. |
| L5 why $967 and not $700 | Not added to the text: at 10 years the "Interest on interest" readout already shows $267, and the reveal is at its word budget. |
| L6 chart rescales on reveal | Kit reveal panel, not lesson code. Routed to platform-engineer (same as gradient-descent). |

Trade-off for the QA contract: the contract presses the years slider (10 → 12), then the jump buttons 10, 20, 30, 40, so it reaches 40 and the gate opens. The selected jump button is active and disabled.

## Revision v3

Wave C, builder 11, 2026-10-14, from the latest learner review and fact-check. Title no longer leaks ("Ten years in, $1,967. And at forty?"); legend says "interest on past interest"; "Plain 7% only" readout puts $3,800 on stage; reveal shortened. c3 edited, unverified.
QA contract: pass (phone and desktop). Claims edited are unverified and need a fact-check pass.
