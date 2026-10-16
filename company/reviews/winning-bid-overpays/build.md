# Build note: winning-bid-overpays

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #64

- Intent: 20 columns, one per auction: faint grey dots for the losing guesses, the winner's dot filled (red if above $100, green if below), a solid line at the jar's true $100 (drawn locked too, as the brief allows: it is the stated value), and a dashed red line at the current average winning bid. Readouts: Bidders, Avg guess, Avg winning bid. Chip: "Guess = $100 + random error up to ±$20 (seed 1)."
- Randomness: kit mulberry32(1); each preset reruns 20 auctions from the same seed, drawing guesses auction by auction, bidder by bidder. Seed 1 is the brief's seed, not chosen; seeds 7 and 42 checked (claim c1). My run matches the brief's node numbers exactly: 10 bidders 99.17 / 116.53 / 20 of 20; 2 bidders 105.42 (12 of 20); 20 bidders 118.56.
- Controls (DOM order): [Run 20 auctions] (10 bidders), [2 bidders], [20 bidders], then [Step: one auction] (adds one auction at the current bidder count from 0; disabled at 20, so a QA press cannot wipe the run).
- Milestones: "ten" (20 auctions at 10 bidders, by Run or by stepping) and "two" (20 auctions at 2 bidders). Record row: "10 bidders: guesses $99.2, winners $116.5, 20 of 20 over" and "2 bidders: winners $105.4".
- "Winner's curse" and the oil-lease history kept out of learner text; the reveal says "bigger overpayment".

## Pre-flight v1

1. **Title and hook.** "Guesses are right on average. Is the winner?" / "Ten people bid on a jar of coins, each bidding their own guess. What does the winner pay?" Questions; the title raises doubt but does not say over or under.
2. **Options.** "pays about $100" · "pays under $100" · "pays over $100". All name $100 at the same precision.
3. **Locked stage.** Chip "Guess = $100 + random error up to ±$20 (seed 1).", readouts Bidders 10, Avg guess "?", Avg winning bid "?", the $100 line and $80/$100/$120 ticks, no dots, no average line, controls disabled.
4. **Reveal values.** "guesses averaged $99.2", "winning bids averaged $116.5", "20 of 20": (b) milestone ten, record line 1 ("10 bidders: guesses $99.2, winners $116.5 (20/20 over)"); computed from the seeded run. "With 2 bidders ... $105.4": (b) milestone two, record line 2.
5. **QA path.** DOM order: Run 20 auctions (ten), 2 bidders (two), 20 bidders, Step (disabled at 20, skipped; the Step row is not rendered at the reveal). Both milestones in 2 presses; both record lines on the stage at the reveal. Probe confirmed each press changed the stage.
6. **Reset.** No Reset control; presets rerun from seed 1, records persist. Reveal text from the QA path: "With 10 bidders the guesses averaged $99.2, close to $100. The winning bids averaged $116.5, and the winner overpaid in 20 of 20 auctions. Winning picks out the bidder whose guess was highest, so the error that wins is the biggest one. / With 2 bidders the winner paid $105.4 on average: more rivals, bigger overpayment. A made-up jar with random, seeded guesses."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 winning-bid-overpays` (shared dev server, 2026-10-14): verdict fit, **stage-top crop 0 px**, hiddenBelow 0, namedHidden 0 (named: bidders, 20, 99.2, 100, 2 bidders), phoneFit true, **69 words** (reveal incl. the kit's verdict line); picture fitted 139/150. Smallest svg label at the reveal 10.2 px or more (own probe: computed font-size × letterbox scale). Note on the run: the dev server was too loaded for the tool's fixed 30 s / 15 s waits, so it was run with a preload (`node --import <scratch>/patient.mjs`) that only raises Playwright's navigation and waitFor timeouts; the measuring code was not changed. A first run gave crop 1-4 px; the stage wrapper's flex gap was cut from 3 px to 1 px (no text or tap target changed).

QA: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J economics slugs> QA_OUT=artifacts/qa-wavej-economics npx playwright test tests/qa/contract.spec.ts --workers=1` (2026-10-14): phone and desktop pass (10 of 10 for the batch). A first batch run failed winning-bid-overpays on phone only, with React's dev-mode warning "Can't perform a React state update on a component that hasn't mounted yet" (the same warning shows in the shared dev server's log for other lessons while files change); reruns passed. Status left draft; next build and walkthrough not run (shared machine).

## Revision v2 (demo-builder, 2026-10-16, verticals r5 B1: W-835 part)

Kept from evaluators until they report. Worktree s3c-wjd5, branch wj-design-r5b1.

- **Winner dots by colour only (design review finding 5): fixed.** Over $100 stays a filled red dot; $100 or under is now a hollow green ring (bg fill, 2 px green stroke), so the two differ in shape as well as hue. Checked on the 2-bidder picture (8 hollow rings, 12 filled dots).
- **Dead "Step: one auction" (disabled as soon as a run of 20 was pressed): dropped.** It never changed anything on a path that reaches the reveal, and its 3 words put the stage at 27. The `step-run-button` interaction tag is removed from meta.json (no Step left); Run 20 auctions and the presets remain.
- **Seen wrap (same finding):** "(20/20 over)" is now kept on one line (`white-space: nowrap`); at 390 px it moves whole to a second line instead of breaking as "(20/20 / over)".
- **Not touched:** the AVG GUESS $99.2 question is W-836, for the fact-checker (lane 10).
- **Claims:** no learner-visible claim text changed. No reset, no new claim.

### Stage word budget (v2, decision 2026-10-16 with Ruling 2)

| Busiest frame: explore, both runs recorded, controls showing | words |
|---|---|
| Chip "Guess = $100 + random error up to ±$20 (seed 1)." | 6 |
| Readouts "Bidders" / "Avg guess" / "Avg winning bid" (values count 0) | 1 + 2 + 3 |
| Axis "$80 $100 $120" / "auctions 1 to 20" | 0 + 2 |
| Record "10 bidders: guesses $99.2, winners $116.5 (20/20 over)" / "2 bidders: winners $105.4" | 4 + 2 |
| Controls "Run 20 auctions" / "2 bidders" / "20 bidders" | 2 + 1 + 1 |
| **Total** (no stimulus) | **24** |

v1 with "Step: one auction" was 27.

## Pre-flight v2

1-4. Unchanged from v1.
5. **QA path.** DOM order: Run 20 auctions (ten), 2 bidders (two), 20 bidders. Both record lines on the stage at the reveal.
6. **Reset.** No Reset; records persist. Reveal text unchanged from v1 (rendered: "With 10 bidders the guesses averaged $99.2, close to $100. The winning bids averaged $116.5, and the winner overpaid in 20 of 20 auctions. Winning picks out the bidder whose guess was highest, so the error that wins is the biggest one. With 2 bidders the winner paid $105.4 on average: more rivals, bigger overpayment. A made-up jar with random, seeded guesses.").
7. **Phone fit.** reveal-fit (own build :3647, 2026-10-16, unmodified tool, `artifacts/reveal-fit/wjd5-r5b1.json`): `verdict fit, crop 0, phoneFit true, revealWords 69, hiddenBelow 0, namedHidden 0 (named bidders, 20, 99.2, 100, 2 bidders visible), picture fitted 139/150`. Screenshot artifacts/reveal-fit/winning-bid-overpays.png.

### QA (v2)

Contract QA, `--workers=2`, own production build, default timeouts: phone and desktop pass. Status stays draft.
