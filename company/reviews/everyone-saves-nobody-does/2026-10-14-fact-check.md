# Fact-check: everyone-saves-nobody-does (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v1 first (chip, chart, record row, both cut buttons, Next round, Run, Reset, reveal, predict; hook and recall), then claim text and support, then source fields. Re-ran the model in my own node script (fc35/thrift.js). No source host could be opened (scholarly and reference hosts fail DNS or 403), so a claim resting only on a source is held.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node of series(20): round 0 income $1,000 saving $100; round 1 spending 880, saving $120, income $980; income first rounds to $900 at round 24 (SETTLE) and saving reads $100 at every round 24-40. Reveal uses rec.peak = sav[1] and rec.settled/income from the first round >= 24 reached at the $20 cut, so Next-by-Next and Run give the same $120 / $100 / $900. The $40 path sets no record (go returns early) and reaches no milestone, so it cannot change the reveal. Chip states the timing ('80% of last round's income'). |
| c2 | verified | Derivation in the model: income = spending + investment, so a $20 cut in spending is $20 less income for someone. Steady state Y = 80 + 0.8Y + 100 gives Y = 900 and S = Y - C = 900 - 800 = 100 = I. Own node agrees. |
| c3 | verified | Reveal: Y0 - rec.income = 1000 - 900 = '$100' less; settled saving $100 equals the pre-cut round-0 saving $100 (own node). |
| c4 | unverified | HELD. The naming rests on a source (paradox of thrift; Keynes / macro texts) that I could not open: reference and scholarly hosts are unreachable from this sandbox. The model's behaviour matches what the name is used for (c1-c3), but a name needs a source, and I did not accept memory or 'textbook'. Needs a checker with access to an opened text. |
| c5 | verified | Derivation: if investment rose by the $20 extra saving (I = 120), Y = (80 + 120)/0.2 = $1,000 and S = 1000 - (80 + 800) = $120, so the answer changes from $100. Own node. |
| c6 | verified | Convention, consistent with code: chip reads 'Model: spending = $80 + 80% of last round's income; investment fixed at $100; fixed prices'; series() has no government or trade term; reveal says 'in a toy model'. |

**Result:** 5 verified, 1 held unverified (c4, source not openable). No disputes.
