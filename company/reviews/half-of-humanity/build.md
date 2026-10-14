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

## Pre-flight v3 (demo-builder, 2026-10-14, wave H, r8 big-country-knower, W-304)

Fixes: (top) the map is on screen at the reveal. The three Readout tiles (about 92 px) became one status line, "<n> countries · <x>% of people · land outside Antarctica <y>%". The source footnote ("Equal-area map. Largest first. People: UN, 2024.") hides when the reveal opens, since the reveal names the equal-area map and the UN source. The 15 chips stay as they are (four rows, 28 px chips; I did not shrink the tap targets). With these changes the card's fit draws the map at 103/156 px (66%) instead of 62/156, and the stage top is on screen. (Labels) the bar's "half of humanity" label is 10 px (was 8). (Text budget) the reveal went from 97 to 79 words, as the tool counts them. For the in-order path, paragraph 1 now quotes the Seen line once ("the seventh took the bar from 48.8% to 51.4%") instead of giving the same two numbers twice. Cut: "People are not spread evenly over the land." (told, no claim of its own). Shortened: "A map of area shows land, not people." **cm-geography should confirm the cut** (board).
1. Title and hook: unchanged.
2. Options: unchanged ("7" / "3" / "15").
3. Locked stage: the grey map, an empty bar with the half tick, the locked chips, "? countries · ? of people · land outside Antarctica ?", "Seen: nothing yet" and the footnote. No count is shown.
4. Reveal values: 48.8% → 51.4% and 25% land: (b) recorded when the bar crosses half (`crossed`), and shown in the Seen line. Russia's land 25% → 38% and people 53.5% → 55.3%: (b) recorded the first time Russia is added (`russia`), and shown in the Seen line. 51.4% / 48.8% in the out-of-order branch: computed from POP (c2).
5. QA path: all 15 chips in DOM order; the crossing happens at Brazil (7th). At the reveal the map (15 lit), the bar, the chips, the status line and the Seen line are on screen.
6. Reset: no Reset control (untapping a chip does not clear Seen). Reveal at the end of the reveal-fit path: "Seven. India, China, the USA, Indonesia, Pakistan, Nigeria and Brazil: your Seen line shows the seventh took the bar from 48.8% to 51.4% of the world's 8.2 billion people (UN, 2024). / On this equal-area map, drawn size is real size: your 7 cover 25% of the land outside Antarctica, yet hold half of everyone. Russia alone took land from 25% to 38%, people only from 53.5% to 55.3%. A map of area shows land, not people."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 half-of-humanity`, dev server): before, crop 104 px, 97 words, map fitted 62/156. After, **crop 0 px**, hiddenBelow 0, **79 words**, namedHidden 0 (all seven names, Russia and "land outside Antarctica" visible), map fitted 103/156, phoneFit true. Parts: picture 103, controls 124 (chips), text 104. Screenshot: artifacts/reveal-fit/half-of-humanity.png. Known limit (r8 finding 4): at the reveal the map shows all 15 countries lit, while "your 7 ... 25%" is quoted from the Seen line.
- meta.json 2 -> 3. Reopened (unverified): c2, c4, c5. c1 still waits on the human UN source check (W-048, founder). Not run: build, QA, walkthrough.
