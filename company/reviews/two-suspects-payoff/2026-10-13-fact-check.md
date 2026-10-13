# Fact-check: two-suspects-payoff (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Table: (D,C)=5 vs (C,C)=3. |
| c2 | verified | Table: (D,D)=1 vs (C,D)=0. |
| c3 | verified | T=5>R=3>P=1>S=0: defect strictly dominant, symmetric table so both defect for 1 each; dominant-strategy equilibrium of one-shot PD (Dixit & Nalebuff ch. 3; Mankiw oligopoly chapter, edition numbering varies). |
| c4 | verified | Axelrod 1984 shows cooperation can emerge in repeated play; claim says 'can last', not guaranteed. Stage chip states the invented payoffs/one round. |
