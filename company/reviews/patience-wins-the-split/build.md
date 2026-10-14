# Build note: patience-wins-the-split

- Builder: ncm-e03 (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/economics.markets.md, Course NCM #24 (accepted version; prerequisites ultimatum-game + present-value).
- Intent: bars for games with a deadline after 1, 2, 3 … rounds (up to 20 drawn), each the first proposer's share by backward induction; a dashed line at the no-deadline share 1/(1 + δ). "+1 round", "+10 rounds", "400 rounds", "1 round" change the game length; "Shrink 10% / 30% / 50%" presets (instead of a free slider, so QA reaches 50%). The message line shows the backward-induction step: "First round: offer 0.9 × 10.0% = 9.0%; keep 91.0%."
- Numbers re-run: δ 0.9 gives 1, 0.1, 0.91, 0.181 …; 50 rounds 0.5236, 51 rounds 0.5288, 400 rounds 0.5263 = 1/1.9. δ 0.5 → 0.6667, δ 0.7 → 0.5882.
- One-round convention: the proposer keeps 100% (responder accepts when indifferent), as in lowball-offer-should-pass.
- Rubinstein (1982) is named only in claim c5's source; the learner sees "a simplified model".
- Milestones: long-game (50+ rounds) and half-shrink (50% preset). QA order (30%, 50%, +1, +10, 400, 1 round) reaches both.
- Not run (per dispatch): next build, QA, walkthrough, tsc.
