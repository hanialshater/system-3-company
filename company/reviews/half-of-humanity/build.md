# Build notes: half-of-humanity

## v1 (2026-10-12, wave 1)
- Population figures (UN WPP 2024, 1 July 2024) are NOT in the kit and could not be fetched (network policy 403). Values were entered from recall; they match the brief to the million. Top 6 = 48.80%, top 7 = 51.40%: brief answer (7) holds if the figures do. Claim c1 flags this for the fact-checker.
- 15 country chips (largest first), so the locked stage does not rule out the "15" option. Reveal unlocks when the share first crosses 50%.
- Added a computed "share of land" readout on the Equal Earth shapes (top 7 = 25.3% of non-Antarctic land) so the "area is not people" payoff is shown, not only told.
- Iteration: chips made compact (28 px) so four rows fit under the map on a phone.

## v2 (2026-10-14, answering 2026-10-14-learner-big-country-knower-r6.md)
- The crossing is recorded when it happens (count, share before and after, land share) and kept on a stage line: "Seen: half crossed at 7 countries, 48.8% → 51.4% of people, 25% of land". Adding all 15 chips no longer hides it (finding 1).
- The land readout is now labelled "Land (outside Antarctica)" (finding 2).
- The first time Russia is added, its before/after readouts are recorded too ("Russia: land 25% → 38%, people 53.5% → 55.3%" on the QA path), and the reveal quotes them (finding 3). New claim c6, unverified.
- The reveal's land figure is the recorded one, at the readout's whole-percent rounding.

## Pre-flight v2
1. Title and hook: "Half of humanity" / "There are about two hundred countries. How few hold half of all people?" "How few" leans small but does not separate 3 from 7 (the r6 reviewer called it tone, not a pointer). Kept.
2. Options: "7" / "3" / "15". All bare numbers.
3. Locked stage: 15 chips (disabled), an empty bar with a "half of humanity" tick at 50%, Countries 0, 0.0%, land 0%, Seen "nothing yet". Nothing marks 7.
4. Reveal values: 51.4% and 48.8% for the top seven and six (claim c2; on the QA path they equal the recorded crossing, (b)); "the seventh took the bar from 48.8% to 51.4%" (b) the crossing record; "your 7 cover 25%" (b) the crossing record; Russia before/after (b) recorded when Russia is added, shown only if it was. 8.2 billion is told (claim c1).
5. QA path: the 15 chips in order. The bar crosses at Brazil (7th, records), Russia is 9th (records). Both records are on the Seen line when the reveal opens.
6. Reset: no Reset control; untapping chips does not clear the records. Reveal after the QA path: "Seven. India, China, the USA, Indonesia, Pakistan, Nigeria and Brazil hold 51.4% of the world's 8.2 billion people (UN estimate for 2024); the first six only 48.8%. Your Seen line: the seventh took the bar from 48.8% to 51.4%. / People are not spread evenly over the land. On this equal-area map, where drawn size is real size, your 7 cover 25% of the land outside Antarctica, yet hold half of everyone. Russia alone took land from 25% to 38%, people only from 53.5% to 55.3%. A map that shows area shows land, not people." (Russia figures from the r6 walkthrough; composed from the code, not from a run.)
