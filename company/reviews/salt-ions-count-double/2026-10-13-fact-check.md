# Fact-check: salt-ions-count-double (2026-10-13)

## Pass 5

Checker: fact-checker (did not write these claims; builder-revised claims checked as rewritten). Claims set to verified: c1, c2, c3, c4, c6. c5 left unverified (see below).

Node: NaCl 58.44 g/mol; 2x1.86x1 = 3.72, 1.86 for sugar; 3.72 x 0.93 = 3.46. c5 NOT verified: ideal x osmotic coefficient gives 3.4-3.46 and measured data for 5.5 wt% NaCl interpolate to about 3.4; I could not open the CRC table. Recommended wording 'about 3.4 C' (stage muted line and c5). c1-c4, c6 verified.

## Pass 6

c5 left unverified: text still reads about 3.5; tabulated 5.5 wt% NaCl depression interpolates to about 3.4 degC. Builder fix requested in pass 5 still pending.

## Pass 7

Checker: fact-checker (did not write these claims; builder-rewritten claims checked as rewritten). Numbers re-derived in node from the lesson's own constants or model.ts.

| Claim | Result | Basis |
|---|---|---|
| c5 | unverified (left) | Text still says 'about 3.5', not 'about 3.4'. A second search for the CRC concentrative-properties table returned only the ideal 3.72; I cannot open the table. Same suggested fix as pass 5/6: change to 'about 3.4 degC'. I will verify once the text changes or a tabulated value is reached. |

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | unverified | Still 'about 3.5' on the stage (Demo.tsx muted line). Independent derivation: recalled tabulated depressions (5 wt% about 3.05, 6 wt% about 3.7 degC) imply an osmotic coefficient near 0.91 at the freezing point (the cited 0.93 is a 25 degC value), giving 3.706 x 0.913 = 3.38 degC at 1 mol/kg (5.52 wt%). CRC table still unreachable (egress 403), so no direct compare. Builder fix that I would verify: 'about 3.4 degC'. |
