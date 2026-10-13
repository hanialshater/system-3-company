# Fact-check: protein-search-space (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo.tsx shapes() = 3^n; stage label 'Toy chain: each link bends one of 3 ways.' Levinthal-style simplification is stated as such. |
| c2 | verified | node BigInt 3n**100n = 515377520732011331036461129765621272702107522001, 48 digits; option 'About 5 with 47 more digits after it'. |
| c3 | verified | node: 5.1538e47 / 1e13 / 3.15576e7 = 1.633e27 years. |
| c4 | verified | Planck 2018 VI (A&A 641, A6): 13.787 +/- 0.020 Gyr; node 1.633e27 / 13.8e9 = 1.18e17. |
| c5 | verified | node: 1e13 x 13.8e9 x 3.15576e7 = 4.355e30, log10 = 30.64. |
| c6 | verified | Most proteins fold in about a millisecond (median about 5 ms for two-state folders, Protein Folding Kinetics Database analyses); slow ones take seconds. The fastest small domains fold in microseconds (villin headpiece about 4 us; Kubelka, Hofrichter, Eaton 2004, Curr Opin Struct Biol 14: 76-88), which only strengthens the conclusion. Optional builder wording: 'microseconds to seconds'. |
