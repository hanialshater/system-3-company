# Fact-check: someone-has-to-swerve (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Curriculum reference easley-kleinberg-2010 ch. 6 (games; hawk-dove as a multiple-equilibrium example): matches, medium-high confidence (I am sure of ch. 6; less sure the section names it hawk-dove rather than chicken). The book was not opened (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node of yourGain/theirGain: only (swerve, straight) and (straight, swerve) have no profitable switch. 'Outcomes' are cells; a mixed equilibrium (straight with chance 1/6) also exists but is not an outcome cell. Easley-Kleinberg ch. 6 (games; hawk-dove) placement matches my knowledge. |
| c2 | verified | Gains: both swerve +2 each (1 -> 3); both straight +10 each (-10 -> 0). Reveal quotes PAY entries. |
| c3 | verified | Gains -2 and -10 from the 'one of each' cells: 3 -> 1, 0 -> -10. |
| c4 | verified | Chip 'Invented payoffs · one round · same moment' and reveal muted line. |
