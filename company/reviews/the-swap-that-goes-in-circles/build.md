# Build note: the-swap-that-goes-in-circles

Builder: demo-builder (demo-builder-ncm-gap4), 2026-10-16. Board W-1525 (NCM 23.2 gap). Brief: `company/domains/briefs/math.discrete.md` #13 (J16; r5 strand re-check pass, W-1393 support types applied). Numbers re-run first: `node company/courses/ncm/checks/rejudged-four.mjs` (J16 line) and my own node run of the lesson's rules plus the N13 voters (six cherry 60, three cherry 30, ranked apple 20 after 2; A over B, B over C, C over A each 2 to 1). Status draft; every claim unverified.

Kept from evaluators until they report.

Built as briefed: three fruit cards on a triangle (drawn glyphs plus names), arrows along the offer route cherry → banana → apple → cherry, each labelled 10¢ and drawn solid when Max takes the swap; in ranked mode the apple → cherry offer is dashed with "✕ refused". The held card is outlined. Each preset replays from the cherry at once; a log of glyphs under the triangle shows every holding of the last replay. A line "holding: X · paid: N¢" and a Seen row ("6: cherry-glyph 60¢ · 3: cherry-glyph 30¢ · ranked: apple-glyph 20¢") that keeps each preset's result after "Back to the circle".

Departures:
- Third milestone "three" so the reveal's "after 3 ... 30¢" is milestone-gated (minInteractions 3).
- Offer order made explicit in claim c2: with ranked preferences the trader still offers one fruit at a time round the circle, which is what gives the brief's "stops at the apple after 2". A direct cherry-for-apple offer would stop after 1; the stage shows the route as the arrows.
- Readouts are a single text line, not Readout boxes, and the log sits inside the picture: the first version cropped the stage top by 13 px at the reveal (reveal-fit run ncmgap4-b); I also tightened the triangle by 14 units. No type or tap target was shrunk. The Seen row uses glyphs instead of fruit names to stay under 25 words.
- Claim c6 (invented example, convention) added. Title from the slug; hook "Max likes every swap he makes, and he pays for each one. Where does that leave him?"

## Stage word budget

Builder probe at 390×844, strict count. Busiest frame **21** (after "Rank them: apple first"): fruit names 3; legend "swap he wants:" 3; "refused" 1; "holding: apple · paid:" 3; Seen "ranked" 1; chips 10. Brief's list 16; legend, "refused" and "ranked" add 5. Under 25. Smallest SVG text 10 px at 390 wide.

## Pre-flight v1

1. **Title and hook.** "The swap that goes in circles" / "Max likes every swap he makes, and he pays for each one. Where does that leave him?" The title says the swaps circle (the question already states the circular preferences); it does not say where Max ends or what he pays, which is what the options differ on.
2. **Options.** "Apple, 60¢ poorer" / "Cherry, 60¢ poorer" / "Banana, 30¢ poorer": same form, all numbered.
3. **Locked stage.** Triangle with the three 10¢ arrows, the cherry outlined, "holding: cherry · paid: 0¢", one cherry glyph in the log. No count of swaps, no end fruit.
4. **Reveal values.** "3", "cherry", "30¢": milestone three, Seen row. "6", "60¢": milestone six, Seen row. "after 2" (favourite = apple): milestone ranked, Seen row. The last paragraph is told (c3, c5).
5. **QA path.** 6 swaps (six), 3 swaps (three), Rank them (ranked), Back to the circle. All three results stay in the Seen row at the reveal.
6. **Reset.** "Back to the circle" resets the holding to the cherry and 0¢ but never clears the Seen row. Reveal after it (QA path): "Every swap was one Max wanted, yet after 3 he held the cherry again, 30¢ poorer, and after your 6 he had paid 60¢ for nothing. Once his preferences were ranked, the swaps stopped at his favourite after 2. That is why choice models assume preferences are transitive. A group's majority can still go round in a circle even when every voter's preferences are ranked."
7. **Phone fit.** reveal-fit run `artifacts/reveal-fit/ncmgap4-c.json` (tool clean): **fit, crop 0, hiddenBelow 0, phoneFit true**, revealWords 72, namedHidden 0.

## Local contract QA (the builder's pass, not the qa-tester's record)

Same build and command as worth-something-alone (`QA_OUT=artifacts/qa-ncmgap4-c`): **phone and desktop passed**. Phone predict and reveal screenshots viewed, and the probe frame after "Rank them" (refused arrow, log cherry › banana › apple). `npx tsc --noEmit` exit 0; `npm run check` passed. The qa-tester's run is still owed.
