# Build note: worth-something-alone

Builder: demo-builder (demo-builder-ncm-gap4), 2026-10-16. Board W-1524 (NCM 17.6 gap). Brief: `company/domains/briefs/economics.markets.md` #26 (J11). Numbers re-run first: `node company/courses/ncm/checks/rejudged-four.mjs` (both J11 lines reproduced). Status draft; every claim unverified.

**W-507 (cm-economics-markets re-check) is still open.** No objection was recorded in `company/courses/ncm/briefs.md` (J11) or the strand file on 2026-10-16, so I built, as the brief allows. If the strand manager objects, this lesson goes back under that objection.

Kept from evaluators until they report.

Built as briefed: the value curve against the 16¢ price line. The curve is the keenest non-user's value at each share, (1 − z)(a + z); above the price line the share grows, below it shrinks, crossings are resting points (low crossing = tipping point, open dot). Its left end (marked "a¢: empty app" with a dotted leader) is the keenest fan's value with nobody else on it, the cause the reveal points at. A launch from 0 draws dots on the curve, one per round. Each stand-alone chip relaunches from 0; earlier stand-alone values stay as grey ghost curves labelled "N¢ alone" with their tipping point and end share. Readouts "share" and "tipping point" (one decimal; "none" when a ≥ price). Seen row "launches from 0: 10¢ → 0% · 20¢ → 85% · 0¢ → 0%". The locked stage shows axes and the price line only ("The chart appears after you answer").

Departures:
- Third milestone "no-alone" (0¢ alone), so the reveal's 20.0% is milestone-gated and on screen (ghost tipping label). minInteractions 3; still one press per control.
- Tipping points shown to one decimal (20.0%, 7.3%), shares to whole percent (85% for 84.7%); the reveal uses the stage's rounding.
- Added claims c1 (model rules, convention) and c7 (how to read the chart). Title "Worth something alone", hook "A network app gets some value even with nobody else on it. Is that enough to start?" (not in the brief).

## Stage word budget

Builder probe at 390×844, strict count. Busiest frames **21** (locked: axis captions 6, "price" 1, locked note 6, readout labels 3, chips 5; explore with two ghosts: axis 6, "price" 1, ghost "alone" ×2, "empty app" 2, readouts 3, "launches from" 2, chips 5). Brief estimate about 14. Under 25. Smallest SVG text 10 px at 390 wide.

## Pre-flight v1

1. **Title and hook.** "Worth something alone" / "A network app gets some value even with nobody else on it. Is that enough to start?" No share named.
2. **Options.** "About 0%", "About 10%", "About 80%": same form.
3. **Locked stage.** Axes, the dashed price line "price 16¢" and the note; no curve, no crossing, no fan dot.
4. **Reveal values.** "0%" (10¢ launch): milestone stuck, readout and Seen row. "16¢": price line. "20.0%": milestone no-alone, ghost tipping label. "7.3%": computed from current state (a = 10¢), tipping readout. "85%": milestone climbs, Seen row and ghost end label.
5. **QA path.** Launch from 0 (stuck), 20¢ alone (climbs), 0¢ alone (no-alone), 10¢ alone (back to the question's case). All quoted values on screen at the reveal.
6. **Reset.** No Reset; relaunching replaces a value's entry with the same result. Reveal on the QA path: "At 10¢ alone, even the keenest fan values an empty app below the 16¢ price, so nobody starts: your launch stayed at 0%. The stand-alone value did lower the critical mass, from 20.0% to 7.3%. At 20¢ alone the first buyers come with nobody else on it, and the app climbed to 85%. Stand-alone value removes the trap only when it beats the price."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3731 <4 slugs> --jobs 2 --width 390 --height 844 --out artifacts/reveal-fit/ncmgap4-c.json --shots` (tool clean, head 471aabce + this lesson uncommitted): **fit, crop 0, hiddenBelow 0, phoneFit true**, revealWords 67, namedHidden 0.

## Local contract QA (the builder's pass, not the qa-tester's record)

Own build (`NEXT_DIST_DIR=.next-ncmgap4 npx next build`, Turbopack, exit 0), `tools/serve.sh start 3731 .next-ncmgap4`, `QA_BASE_URL=http://localhost:3731 QA_ONLY=<4 slugs> QA_OUT=artifacts/qa-ncmgap4-c npx playwright test tests/qa/contract.spec.ts --workers=2`: **8 passed** (all four lessons, phone and desktop). Phone predict and reveal screenshots viewed, plus probe frames after each press; fixed before this run: ghost labels on the y-axis ticks, the price label on the high crossing, the "empty app" label on the y-axis, a trail polyline that cut under the curve. `npx tsc --noEmit` exit 0; `npm run check` passed. The qa-tester's run is still owed.
