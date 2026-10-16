# Fact-check: worth-something-alone

Date: 2026-10-16. Checker: fact-checker (did not write these claims). Board W-1562, lane = the 4 NCM gap slugs named in the dispatch. Base: main ccr-4c6c7654-ew9ko1 at f1568498.

Method: read meta.json and every learner-visible string in Demo.tsx (hook, predict, axis captions, price label, "N¢: empty app", ghost labels, readouts, Seen row, reveal, recall) and every reachable branch (chips 0¢, 10¢, 20¢ and "Launch from 0") before reading company/reviews/worth-something-alone/build.md. Re-derived the roots and the iteration in my own Python; traced launch() and crossings() by hand for the three reachable values; compared with rejudged-four.mjs J11 (agrees). Checked the prerequisite model in src/demos/economics/below-critical-mass/meta.json (value (1 - x) s, price 16¢), which this lesson extends. No walkthrough transcript exists and I did not start a server.

Result: 7 claims, 7 verified, 0 disputed, 0 withdrawn. No unrecorded claim.

## Claims

| id | status | basis |
|---|---|---|
| c1 | verified | Convention, consistent with the code: value() = (1 - z)(a + z) for the person at x = z; next() = max(0, 1 - 0.16/(a + share)) is exactly the share of x with (1 - x)(a + share) > 0.16. Matches below-critical-mass at a = 0. |
| c2 | verified | Resting shares solve z^2 - (1 - a) z + (0.16 - a) = 0. a = 0: 0.2, 0.8. a = 0.1: (0.9 -+ sqrt(0.57))/2 = 0.072508, 0.827492, shown as 7.3% and 82.7%. Launch from 0 at a = 0.1: next = max(0, 1 - 1.6) = 0, then a round moves 0 and launch() stops: readout 0%. At a = 0 next(0, 0) = max(0, -Infinity) = 0 (no NaN). Map is increasing in z, so below 7.25% the share falls to 0 and above it rises: the lower root is the tipping point. |
| c3 | verified | Own iteration at a = 0.2: 0, 0.2, 0.6, 0.8, 0.84, 0.84615, 0.84706 (launch() stops here: step 0.0009 < 0.001), fixed point (0.8 + sqrt(0.8))/2 = 0.847214. The other root is negative, so 0 is not a resting point (next(0.2, 0) = 0.2). Stage shows 85% (Math.round of 84.706). |
| c4 | verified | At share 0 the keenest person (x = 0) values the app at a and everyone else at less, so the first round is positive only if a > 0.16. 10¢ < 16¢: nobody starts. 20¢ > 16¢: first round 20%. The "empty app" dot is drawn at (0, a), below the price line at 10¢ and above it at 20¢. Holds inside the lesson's model, which c6 declares. |
| c5 | verified | The lower root falls as a rises (implicit derivative -(1 - z)/(1 - a - 2z) < 0 at the lower root), 0.2 to 0.0725 at a = 0.1. Zero stays a resting point while a <= 0.16 (next(a, 0) = 0), so an empty app stays empty unless a > 0.16: "removes the trap only when it beats the price" is correct, including the strict "beats". |
| c6 | verified | Convention: no real product is named on the card; the model is declared invented. The chapter pointer: search results place section 17.6, "Mixing Individual Effects with Population-Level Effects", in ch. 17 Network Effects; the section body was NOT opened (book host blocked), so section_unconfirmed stays as it is. The learner never sees the book reference. |
| c7 | verified | At share z the users are x < z, so the keenest non-user is x = z with value (1 - z)(a + z), which is what curvePts() plots. next > z exactly when (1 - z)(a + z) > 0.16 (a + z > 0), so above the line grows, below shrinks, and crossings are fixed points. The claim does not say the crossings are the only resting points (0 also rests for a <= 0.16), so it is not overstated. |

## Rendered text checked with no separate claim

- Readout "tipping point: none" at 20¢, "20.0%" at 0¢, "7.3%" at 10¢; ghost labels; Seen row "10¢ → 0% · 20¢ → 85% · 0¢ → 0%": c2, c3, c5.
- Recall "Nobody joins, though it needs fewer users than before to take off" and its why: c4 and c5 in the lesson's model.

## Non-blocking notes (for demo-builder; no status depends on them)

- c5's source says the tipping point "is gone once a >= 0.16, when share 0 stops being a resting point". At a = 0.16 exactly, next(0.16, 0) = 0, so share 0 is still a resting point (an unstable one). The source should read "a > 0.16". The claim text is right. Same edge in Demo.tsx: tipping() returns null ("none") at a = 0.16 although 0 still rests; unreachable, since the chips are 0, 10¢ and 20¢.

## After reading build.md

Nothing in it changes a status. Its QA-path reveal text matches the reveal I read from Demo.tsx.

## 2026-10-16 W-1570..W-1573 re-check (W-1573 fix round): c7, c8

Checker: fact-checker (did not write these claims). Base: main ccr-4c6c7654-ew9ko1 at 975a4851. Lane as written in the dispatch: this slug c7 and c8 only (with same-picture-two-histories c2 to c5, price-tag-or-auction c1, the-swap-that-goes-in-circles c3 c7).

Method: git diff of the lesson directory since f1568498: the model functions (next, value, crossings, tipping, launch) are unchanged; Demo.tsx adds CurveName() for the current and ghost curves and moves the ghost tipping labels below the price line. Read the current Stage() and styles.module.css before build.md. Own Python: for a = 0, 10, 20 cents and every share z = 0.001 to 0.999, the sign of next(z) - z equals the sign of (1 - z)(a + z) - 0.16; crossings 20.0 / 80.0, 7.25 / 82.75, 84.72 percent; iterating from 0 rests at 0 for a = 0 and 10 cents and climbs to 84.72 percent for 20 cents.

| id | status | basis |
|---|---|---|
| c7 | verified | Users at share z are the people x < z, so the keenest non-user is x = z with value (1 - z)(a + z), which is what curvePts plots under the axis title "keenest non-user's value". Next share = 1 - 0.16/(a + z) exceeds z exactly when (1 - z)(a + z) > 0.16 (a + z > 0): above the dashed price line the share grows, below it shrinks, and at a crossing next = z. The claim does not say the crossings are the only resting shares (0 also rests when a is below the price), so the 10 cent case does not contradict it. The new curve names and moved labels change no plotted value. |
| c8 | verified | CurveName writes cents(a) + " alone" ("0¢ alone", "10¢ alone", "20¢ alone") at the curve's own peak, share (1 - a)/2, height ((1 + a)/2)^2: y = 69.3, 50.6, 30.2 in the viewBox, so each name sits on its own curve about 19 px from the next. The current a is drawn with .curve / .curveName (var(--domain), coloured); ghosts are the launched values minus the current a, i.e. values launched earlier, drawn with .ghost / .ghostName (var(--muted), grey). Before the first launch the coloured curve is the default 10¢, which is "the value now chosen". |

After reading build.md (W-1573 section): matches the diff; nothing changes a status.
