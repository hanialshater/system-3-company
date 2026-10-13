# Build notes: overfitting

## v2 (revision, 2026-10-13)
Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md. No FATAL was raised.

Key states (milestones, `minInteractions` = 2): `few-bends` (looked at 1, 2 or 3 bends) and `six-bends` (looked at 6 bends, the curve that hits every solid dot).

| Finding | What I did |
|---|---|
| FC1 "the day's smooth warming" vs a hump | Now "a smooth rise and fall over the day", and in the reveal the true curve is drawn dashed. c6 rewritten (unverified). |
| FC2 nothing on stage says the data are invented | The legend says "simulated data", the aria-label says "Simulated temperature readings", and the reveal starts its second paragraph with "These dots are simulated". c9 rewritten (unverified). |
| FC3 "6 bends" vs the turning points you can see | The control is now "Bends allowed (at most)", and the options say "Up to 6 bends". |
| FC4 / known: "worse than a line" depends on the seed | The line comparison now says "On these dots…" and adds that with other random dots 6 bends does not always lose to the line but usually loses to a gentle curve. New claim c10 (simulation over 500 seeds: 38% / 91%, same as the fact-check; unverified). |
| L1 "bends" and "fitted on" unexplained; 1–3 look the same | Legend now reads "learns from" / "held back". "(at most)" explains why 1–3 look alike. I did not change the fit itself: a ceiling is the honest description of least squares. |
| L2 reveal after one notch | Gated on 1–3 and on 6 bends. The slider became seven tap buttons (0–6), so 6 bends is one tap away on a phone and on the QA path. |
| L3 6-bend misses drawn off the chart | The floor is now 0 °C (was 6 °C), so the 5.9 °C and 4.1 °C curve points and their red stalks are visible. The curve still dives off-chart between dots, which is the point. |
| L4 jitter told, not shown | The true smooth curve appears dashed in the reveal, so the gap between each dot and the dashed curve is the jitter. |
| L5 line's 4.1 must be remembered | Under each bend button the hollow-dot miss stays once you have seen it (4.1, 1.5, 1.6 … 5.1), so the U-shape is on screen. |
| L6 empty band and resize on reveal | Partly: the record row fills the band. The resize on reveal is the kit's reveal panel. Routed to platform-engineer (same as gradient-descent). |
| L7 "how many bends should I use?" | Not added: out of scope for 60 seconds. The closing line already says held-back data is how you tell. |

Trade-off for the QA contract: the selected bend button is active and disabled (kit convention). The contract skips 0, then presses 1…6 in order, which reaches both milestones. The reveal quotes the best 1–3 setting the learner actually looked at.
