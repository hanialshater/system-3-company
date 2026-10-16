# Build note: price-tag-or-auction

Builder: demo-builder (demo-builder-ncm-gap4), 2026-10-16. Board W-1523 (NCM 9.2 gap). Brief: `company/domains/briefs/economics.markets.md` #27 (J12). Numbers re-run first: `node company/courses/ncm/checks/rejudged-four.mjs` (J12 line reproduced). Status draft; every claim unverified.

**W-507 (cm-economics-markets re-check) is still open.** I found no objection in `company/courses/ncm/briefs.md` (J12) or the strand file on 2026-10-16, so I built, as the brief allows. If the strand manager objects, this lesson goes back to draft revision under that objection.

Kept from evaluators until they report.

Built as briefed, with one representation: a chart of average revenue against the number of bidders (1-4), two series (best price tag, circles; second-price auction, squares, dashed line). It starts at 1 bidder; each bidder chip adds that count's pair of points with their values, so the crossing between 2 and 3 appears only after the learner visits both (nothing marks it before the commit). The best tag price for each visited count is written under the axis ("tag: $57.74"). A status line gives the current count's two averages. "Simulate 1,000 sales" runs 1,000 seeded sales (kit `mulberry32(7)`, not chosen for its result) at the current count and draws hollow markers plus a line "1,000 sales: tag $X · auction $Y"; it disables itself until the count changes.

Departures:
- **Precision.** The brief writes $38.50, $47.20, $33.30 (one-decimal roundings written with cents). The exact figures at the cent are $38.49, $47.25, $33.33 (tag price rounded to the cent: $57.74, $63.00, $66.87), so the stage, reveal and claims use those. The ordering and the answer (3) are unchanged. Brief's reveal draft otherwise kept word for word.
- Claim 5 (auctions useful when the seller does not know values) is not a sentence on the card; it is the setup. Added c6 for the hook's "Auctions make buyers compete".
- Title "Price tag or auction?", hook "Auctions make buyers compete. Do they always beat a well-chosen price tag?" (not in the brief).
- The simulation numbers for claim 3 are my own run (`model.ts` simulate() with the kit's mulberry32): 100,000 sales land within $0.07 of each exact average.

## Stage word budget

Builder probe at 390×844, strict count (tokens with a letter). Busiest frame (after Simulate, and at the reveal): **20** — legend "best price tag" 3, "auction" 1; "average revenue" 2; "bidders" 1; "tag:" 1; status "bidders: tag earns · auction" 4; sim line "sales: tag · auction" 3; chips "bidders" ×3, "Simulate sales" 2. Brief estimate about 12; my status and sim lines add the rest. Under 25. Smallest SVG text 10 px at 390 wide.

## Pre-flight v1

1. **Title and hook.** "Price tag or auction?" / "Auctions make buyers compete. Do they always beat a well-chosen price tag?" No bidder count.
2. **Options.** "2", "3", "5": all bare integers.
3. **Locked stage.** 1 bidder only: tag $25.00 (at $50.00), auction $0.00, axis ticks 1-4 with no other points; no crossing, no line.
4. **Reveal values.** $57.74, $38.49, $33.33: milestone "two" (2 bidders), points and axis label stay drawn. $50.00, $47.25: milestone "three" (the question's case), points stay drawn. The rest is told rule (c4).
5. **QA path.** 2 bidders (milestone 1), 3 bidders (milestone 2), 4 bidders, Simulate (1,000 sales at 4: $52.69 / $59.33). All visited points stay on the chart at the reveal.
6. **Reset.** No Reset; changing the count never removes a visited pair. Reveal on the QA path: "Not quite: it was “3”. With 2 bidders the best tag ($57.74) earned $38.49 against the auction's $33.33. With 3 the auction won, $50.00 to $47.25. A tag is a guess: too high and nobody buys, too low and money is left on the table. An auction lets the second-highest bidder set the price, and that gets better with every rival."
7. **Phone fit.** reveal-fit (same run as same-picture-two-histories, `artifacts/reveal-fit/ncmgap4-a.json`, tool clean): **fit, crop 0, hiddenBelow 0, phoneFit true**, revealWords 61, every named value (57.74, 38.49, 33.33, 50.00, 47.25) visible.

## Local contract QA (the builder's pass, not the qa-tester's record)

Same build and command as same-picture-two-histories (`QA_OUT=artifacts/qa-ncmgap4-a`): **phone and desktop passed**. Phone predict, explore and reveal screenshots viewed; fixed before this run: legend overlapping the axis caption, the $0.00 label on the tick "1", and pale teal value text (now mixed toward --fg). `npx tsc --noEmit` exit 0; `npm run check` passed. The qa-tester's run is still owed.
