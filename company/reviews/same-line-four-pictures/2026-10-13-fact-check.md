# Fact-check: same-line-four-pictures (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Anscombe (1973), 'Graphs in Statistical Analysis', The American Statistician 27(1): 17-21. All 44 x,y values in Demo.tsx match the published quartet as I know it (also the R datasets::anscombe table); not re-opened from the paper here. |
| c2 | verified | node: means 9 and 7.50; slopes 0.5001/0.5000/0.4997/0.4999; intercepts 3.000-3.002; r 0.8162-0.8165; also var x 11.0, var y 4.12-4.13 for the stage's 'same spread'. |
| c3 | verified | Reading of the plots, labelled as such on the stage; set IV x = 8 (x10) and 19. |
| c4 | verified | Follows from c2 and c3. |
