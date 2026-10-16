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

Re-run on the final build with all four lessons: `QA_OUT=artifacts/qa-ncmgap4-c`, 8 passed; reveal-fit `artifacts/reveal-fit/ncmgap4-c.json`: fit, crop 0, phoneFit true.

## 2026-10-16 fix round: W-507 ruling (demo-builder, ncm-w507-fix)

Input: cm-economics-markets' W-507 ruling under #27 in company/domains/briefs/economics.markets.md (ACCEPT WITH CHANGES).

- **Question** reworded to exactly: "Values are random, $0 to $100. What is the fewest bidders for which a second-price auction beats the best price tag on average?" Options 2 / 3 / 5 and answer 3 (index 1) unchanged.
- **Reveal, second paragraph**: "A tag set knowing only the $0–$100 range is a guess: too high and nobody buys, too low and money is left on the table. An auction with no reserve lets the second-highest bidder set the price, and that gets better with every rival." The two qualifiers follow the ruling's own wording ("with no reserve"; "best tag for a seller who knows only the range"). The first paragraph and the status line are unchanged. reveal-fit revealWords 70 (was 61), under the 90 limit.
- **Claims**: c4's text is this paragraph, so it now carries the new wording and is reset to `unverified` (checkedBy/checkedOn/note removed). New c7 (no reserve price) and c8 (tag set knowing only the range), both `unverified`, support `convention`, sourced to model.ts (auctionRevenue/simulate take the second-highest value with no floor; tagPrice depends only on n and the range). The question is a prompt, not a claim; its answer stays covered by c2. c1, c2, c3, c5 and c6 are untouched and keep their status. The fact-checker still owes c4, c7 and c8.
- **Local QA** (the builder's pass, not the qa-tester's record): own build `NEXT_DIST_DIR=.next-w507fix npx next build` exit 0, served on port 3747 with the worktree's tools/serve.sh, `QA_BASE_URL=http://localhost:3747 QA_ONLY=price-tag-or-auction,worth-something-alone QA_OUT=artifacts/qa-w507fix npx playwright test tests/qa/contract.spec.ts --workers=2`: **4 passed** (phone and desktop). reveal-fit `--width 390 --height 844 --out artifacts/reveal-fit/w507fix.json --shots` (tool clean): **fit, crop 0, hiddenBelow 0, phoneFit true**. I viewed the phone predict screenshot (the new question wraps to 3 lines, options and Lock-in still on screen), the phone reveal and the reveal-fit image (both paragraphs, the picture and the status line all on screen). `npx tsc --noEmit` exit 0; `npm run check` passed. The dist dir and tsconfig.json were cleaned up afterwards.

## Fix round W-1572 (demo-builder-ncm-fix3, 2026-10-16), v2

Source: board W-1572 (cm-course-ncm, optional polish) and company/reviews/price-tag-or-auction/2026-10-16-learner-knows-second-price.md. Question, options, answer and model unchanged.

- The x-axis price row is labelled "tag price:" (was "tag:"), and the row is drawn in the text colour instead of the tag line's green, so it does not read as a second revenue series.
- Where the two points nearly meet (|tag - auction| < $5, which is 3 bidders: $47.25 and $50.00), the labels are pulled apart sideways: the auction's up and to the left, the tag's down and to the right. Other counts are placed as before. Viewed at 3 and 4 bidders on Pixel 7: no overlap.

Claims: c1 reset to unverified (the label of the tag prices it lists changed). No claim added. version 1 to 2. Stage words at 3 bidders after a 2-3-4-3 walk (Pixel 7 probe, same counting rule): 18, including the added "price".

Build and QA (the builder's pass, not the qa-tester's record): own production build `NEXT_DIST_DIR=.next-ncmfix3 npx next build` (exit 0), served by `tools/serve.sh start 3793 .next-ncmfix3`. `QA_BASE_URL=http://localhost:3793 QA_ONLY=same-picture-two-histories,price-tag-or-auction,worth-something-alone QA_OUT=artifacts/qa-ncmfix3 npx playwright test tests/qa/contract.spec.ts --workers=3`, unmodified spec: **6 passed** (phone and desktop, all three lessons). `node tools/reveal-fit.mjs --url http://localhost:3793 <3 slugs> --jobs 3 --width 390 --height 844 --out artifacts/reveal-fit/ncmfix3.json --shots` (tool clean true, head 834a404c plus these uncommitted edits): 3 fit, crop 0, hiddenBelow 0, phoneFit 3. Phone predict and reveal screenshots viewed, plus a Pixel 7 probe of the changed frames. `npx tsc --noEmit` exit 0; `npm run check` passed. Status stays draft; qa-tester run, fact-check of the reset/added claims and a learner re-walk are owed.
