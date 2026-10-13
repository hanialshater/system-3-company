# Fact-check: spam-threshold-tradeoff (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; counts() re-run in artifacts/scratch/fc-aiecongeo/spam.mjs. Deterministic, no seeds.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | SPAM = 0.9,0.8,0.7,0.5,0.3; REAL = 0.6,0.4,0.3,0.2,0.1; flagged at or above threshold. Invented, labelled toy. |
| c2 | verified | t=0.50: 4 caught, 1 real flagged; t=0.25: 5 and 3; t=0.65: 3 caught (2 get through), 0 real flagged. |
| c3 | verified | Scanning every threshold 0.00..1.00 in hundredths: none catches all 5 spam and flags 0 real (empty set). Catching 0.3 spam needs t<=0.3, which flags real 0.6, 0.4, 0.3. |
| c4 | verified | Manning, Raghavan & Schutze 2008, s8.3 defines precision and recall for unranked sets. 0.50 -> 0.25: recall 4/5 -> 5/5; precision 4/5 -> 5/8 (5 spam out of 8 flagged). |

Stage check: 'Raise the threshold to 0.65 and no real mail is flagged, but 2 spam get through' confirmed. Unrecorded claims: none.
