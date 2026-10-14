# Accessibility audit of the published lessons (2026-10-13)

Board W-010 (P1). Reviewer: accessibility-reviewer. Nothing was unpublished, edited or committed. Per-lesson records: `company/reviews/<slug>/2026-10-13-accessibility.md`. Tool: `tools/a11y-scan.mjs` (Playwright, no new dependency). Raw data: `artifacts/a11y/scan-2026-10-13.json` (not committed).

## Result

**76 lessons: 46 pass, 12 pass with fixes, 18 fail.** This verdict is about each lesson's own stage. Every lesson also inherits the kit-level problems below, so none is fully clean in the light theme until the kit is fixed.

What "fail" means here: text a learner needs to read is under 3:1 contrast (AA asks 4.5:1, or 3:1 for large text). All 18 failures are contrast. No lesson failed on keyboard, accessible names, reduced motion or tap-target floor. Most failures appear only in the light theme, which the OS chooses for the learner; the app has no theme switch.

## Scope and a stale-server note

- The audit covers the 76 lessons that were published when the task began. Between my first scan and my last, another session published 49 more (125 now). They are **not audited**; run `node tools/a11y-scan.mjs` (no arguments scans all published) and write records for them.
- The server on :3420 went down at 00:22Z on 2026-10-14 (not by me). The final scan used the server on :3402 (`.next-wt5`, built 21:17Z). I checked that no lesson file in these 76 folders (other than `meta.json`) is newer than that build. Kit differences since the build touch only `Illustration.tsx`. The "In review" tag in screenshots is that build's stale metadata, not a defect in the lessons.

## Kit-level problems (fix once in `src/kit` / `src/app`; owner: platform engineer)

Ordered by what a learner feels. All counts are of the 76 lessons.

| # | Problem | Evidence | Fix to consider |
|---|---|---|---|
| K1 | **Light-theme feedback colours fail contrast as text.** The verdict line "Not quite: it was …" is `--warn` #f6c453 on white, 1.62:1; "Your prediction held." is `--good` 1.91:1; `--bad` text is 2.52:1. `.tag.status` ("In review") is 1.62:1. Seen in 71 lessons (wrong verdict) and 5 (right verdict); every lesson has both lines. | scan, light/reveal | Darken `--good`, `--warn`, `--bad` for text in the light theme (globals.css already does this for `.tag.domain` with `color-mix`); keep the bright values for fills. Also the domain tag in Probability is 4.48:1 (just under 4.5). |
| K2 | **Tap targets under 44 px.** `Control` is 35 px high (most are 34-40 wide); `Slider` input is 320x28; small chips 34x40. App chrome: "Map" 30x17, "S3" 38x29, "Why trust this?" 222x23, which is **under the 24 px floor** (WCAG 2.5.8) and sits on every lesson. The QA contract only measures stage controls, so it did not catch the chrome. | scan, 76/76 | `min-height: 44px` on `.control`, the range input hit area and the topbar/footer links. |
| K3 | **Focus is dropped when the phase changes.** Pressing "Lock it in" removes the predict panel and focus falls to `<body>`; same when "Show me why" is replaced by the reveal. A keyboard or screen-reader user loses their place and the reveal is not announced. | scan, 76/76 | Move focus to the explore heading or first stage control after commit, and to the reveal heading after reveal. |
| K4 | **Reading order: stage before question.** In the DOM the stage and its disabled controls come before the prediction question and options. | scan, 76/76 | Render the panel question first (or order with `aria-flowto`/DOM order), keep the visual layout with CSS. |
| K5 | **No live region for phase changes or the verdict.** 27 lessons have no `aria-live`/`role=status` anywhere on the page; the other 49 only have their own stage caption. The reveal text and verdict are silent to screen readers. | scan | `role="status"` around the verdict and the explore hint in `Lesson.tsx`. |
| K6 | **Locked stage is dimmed below AA** during predict, in both themes (all 76). The learner must read the figure to predict. WCAG exempts inactive controls, not the figure's text. | scan | Dim the controls only; keep stage text at full contrast. |
| K7 | **Reduced motion covers CSS only.** `globals.css` kills CSS animation/transition under `prefers-reduced-motion`, and the scan found no CSS or SMIL animation still running in any of the 76. Timers and `requestAnimationFrame` are not covered: `exponential-growth` and `odd-numbers-make-squares` start JS-driven playback when the learner presses play (each has a step control); `dropped-vs-fired-ball` also uses a timer or `requestAnimationFrame` (not examined further). No lesson reads `matchMedia`. | scan + grep | A `useReducedMotion()` hook in `src/kit` so playback starts paused or steps instead. Low priority. |
| K8 | **`role="img"` hides the SVG's own text** from assistive tech (this is by design). Where numbers or results appear only as SVG text, a screen-reader user has them only if the label or a visible readout repeats them. I confirmed this by hand for `tournament-second-best`; the other lessons whose label did not change between predict and reveal are listed in their records as "open for a human". | scan + hand | A kit helper or lint: `Lesson` could require a non-SVG text readout of the current state. |

What is already good (do not break): every interactive control in all 76 lessons has an accessible name; all enabled controls are reached by Tab with a visible focus indicator; the whole predict → explore → reveal path completes with the keyboard alone in all 76; no stage `<svg>` lacks `role="img"` and a label; no horizontal overflow or control under 24 px in the stage.

## Lessons that fail (per-lesson fixes, owner: each lesson's builder)

| Lesson | Domain | What fails (contrast < 3:1) | Themes |
|---|---|---|---|
| china-one-clock | geography | white city labels on the mid-blue map pins, 2.33:1 | dark |
| clicks-not-value | ai | "hype" and "substance" labels in warn/good on light panel, 1.41:1 | light |
| collect-all-six-faces | probability | unseen-face numbers 2.38:1; also an SVG label stuck at "0 rolls" (hand-verified) | light |
| doubling-speed-braking | physics | white block numbers on orange, 1.58:1 | light |
| duplicates-in-the-test | ai | "copy" tags, ✓ and ✗ glyphs, 1.13:1 at worst | both |
| five-heads-then-what | probability | white "H" on yellow, 1.43:1 | dark |
| greedy-word-trap | ai | "36%" and "dog" labels, 1.66:1 | light |
| lopsided-tree | cs | one node label, 1.69:1 | dark |
| lru-eviction-order | cs | step numbers 1-5, 2.26:1 | both |
| odd-numbers-make-squares | math | the "= n × n" square label in good green, 1.66:1 | light |
| overfitting | ai | "bad" misses in red, 2.19:1 | light |
| sketch-the-counts | cs | the C/D/E stream tokens, 1.09:1 at worst (faded processed tokens) | both |
| small-hospital-big-swings | probability | "60%" limit label, 2.19:1 | light |
| summit-kettle | chemistry | curve label in pink, 1.94:1 | light |
| supply-demand | economics | "40 sold", "price cap $4", "shortage: 40", 1.66:1 | light |
| tournament-second-best | cs | winner letters and numbers, 1.33:1; label "Knockout bracket" never changes (hand-verified) | both |
| water-follows-the-crowd | chemistry | one flow arrow label, 1.94:1 | light |
| why-seven-wins | probability | white digits on gold tiles, 2.25:1 | both |

By domain (pass / fix / fail): life 19/1/0, chemistry 11/1/2, probability 9/2/4, cs 4/0/4, ai 0/3/4, physics 1/3/1, math 1/2/1, geography 1/0/1, economics 0/0/1.

A common cause is the same pattern in many lessons: a pale `--good`, `--warn` or `--bad` used as text colour in the light theme. The kit fix in K1 does not fix this in stage SVG, which uses the variables directly. A **pattern-review item** is worth filing: "stage text uses `--fg` or `--muted`; the semantic colours are for fills and shapes only." That is for the pattern reviewer, not me.

## Pass with fixes (12)

base-rates and five-weak-voters (colour-only legend wording, hand-checked with a deuteranopia filter); steel-wool-gains-weight and friends-have-more-friends (contrast 3.8-4.45:1); border-follows-point, build-a-balanced-mobile, count-the-thunder, dropped-vs-fired-ball, flagged-means-what, minus-times-minus, scoops-in-three-cups, slow-across-a-room (text that renders under 9 px at phone width; `slow-across-a-room` and `dropped-vs-fired-ball` have 40+ items each, probably tick labels).

## Calibration: what the hand sample changed

I sampled 10 lessons by hand (keyboard-only Tab order, DOM reading order, screenshots in light and dark; deuteranopia/protanopia filters on 5): sketch-the-counts, duplicates-in-the-test, runs-that-grow, china-one-clock, why-seven-wins, three-day-doubling, call-stack-depth, border-follows-point, steel-wool-gains-weight, at-least-one-boy. The colour-blind view also covered five-weak-voters, most-cases-vaccinated and base-rates. This caught five script bugs, all fixed before the final run:

1. HTML text's own background was ignored (runs-that-grow looked like a 1.08:1 failure; it passes).
2. Sliders at their maximum were pressed in the wrong direction (14 false "keyboard lock-out" failures). The script now mirrors the QA harness.
3. Controls that become enabled only after earlier presses, and auto-play buttons that toggle, produced more false lock-outs.
4. A shared selector across sibling chips triggered a false "keyboard trap" on overfitting.
5. Mid-run server loss produced 24 scan crashes; those were re-run.

Known limits: contrast of text over gradients or images is skipped; dimmed states (opacity) are counted as real; the colour-alone check is a prompt for a human, not a verdict (15 lessons are flagged; 5 were looked at by hand). No real screen reader was used. Zoom and landscape were not checked.

## What I believe and how sure

- The 18 contrast failures and K1-K6: high confidence (computed from painted colours; 6 of them eyeballed on screenshots).
- "No keyboard lock-out in any of the 76": medium-high. It rests on the scan and 10 hand traces, not on a screen reader.
- The 46 passes are "no automated finding", not "accessible". I did not read each stage SVG's label against its state at every step; 22 lessons are flagged "open for a human" and only 2 of those were settled by hand (K8).

## Next moves

1. Platform engineer: K1-K6 in `src/kit` and `src/app` (K1 and K2 first; they touch all 76 lessons). Then re-run `node tools/a11y-scan.mjs`.
2. Founder: unpublish or waive the 18 failing lessons. I did not touch status. I did not find a lock-out, so I am not using my launch-blocking authority.
3. Each failing lesson's builder: fix the stage colours, then ask me to re-scan the slug.
4. Accessibility reviewer (next cycle): audit the 49 lessons published after the scan began; a recurring `node tools/a11y-scan.mjs` in the launch review; confirm the open SVG-label items.
5. Evaluation steward: consider adding a contrast check and a 44 px target check to the QA contract (amendment needed; I did not propose wording).

---

## Second batch (2026-10-14)

Board W-149. Reviewer: accessibility-reviewer. Nothing was unpublished, edited or committed; unpublish or waive stays with the founder (F-14). The 49 lessons published after the first scan began (no `2026-10-13-accessibility.md`) were scanned with `tools/a11y-scan.mjs` against the built server on :3421. Per-lesson records: `company/reviews/<slug>/2026-10-14-accessibility.md`. Raw data: `artifacts/a11y/scan-2026-10-14.json` (not committed). Domains: economics 15, chemistry 13, probability 6, cs 5, ai 4, math 3, life 2, geography 1. Running total with the first batch: 125 lessons.

### Result

**49 lessons: 26 pass, 15 pass with fixes, 8 fail.** As before, the verdict is about each lesson's own stage; every lesson also inherits K1-K8. All 8 failures are contrast (text under 3:1 in one theme); none failed on keyboard, names, reduced motion or tap-target floor. I found no lock-out, so I am not using launch-blocking authority.

### Kit-level (one fix in `src/kit` / `src/app`; owner: platform engineer)

No new kit-level problem. Everything below is the same defect as in K1-K8, now seen in 49 more lessons.

| # | Seen in this batch |
|---|---|
| K1 | 49/49: verdict line fails in light (37 wrong-verdict `--warn` 1.62:1, 12 right-verdict `--good` 1.91:1). Domain tag "Probability" at 4.48:1 in 6/6 probability lessons. |
| K2 | 49/49: "Map" 30x17 and "Why trust this?" 220x23 are under the 24 px floor; `Control` is 35 px high. |
| K3 | 49/49: focus falls to `<body>` after "Lock it in" and after the reveal. Reconfirmed by hand in 5. |
| K4 | 49/49: stage before the question in the DOM (hand: 5/5). |
| K5 | 37/49 have no `aria-live`/`role=status` at all; the other 12 only have their own caption. |
| K6 | 49/49: locked stage dimmed below AA during predict. |
| K7 | No CSS or SMIL animation under reduced motion in any of the 49. JS timers not examined. |
| K8 | 17 lessons flagged "manual": the SVG label did not change between predict and reveal. Hand check: it is a weak prompt where the label updates during explore (`line-stops-at-the-edge`, `up-then-down-trap`, `jackpot-once-a-week`); the open ones are `two-suspects-payoff`, `start-early-race` (state also in a visible readout) and the 12 others listed in their records as "open for a human". |

### Per-lesson (owner: each lesson's builder)

Fail (8):

| Lesson | What fails | Themes |
|---|---|---|
| jackpot-once-a-week | "win!" label in pale green, 1.66:1 | light |
| line-stops-at-the-edge | "fitted line" label in purple, 2.09:1; 6 px labels | light |
| monopolist-holds-back | white "$1,200" on green, 2.9:1; 40 labels under 9 px | dark |
| net-hourly-after-costs | white "$15.50" on green, 2.9:1 | dark |
| raise-into-new-bracket | white "keep 90%" on green, 2.9:1 | dark |
| say-seventy-mean-it | "✓" in pale green, 1.66:1 | light |
| start-early-race | "Ana" label in pale teal, 1.62:1; 26 labels under 9 px | light |
| two-suspects-payoff | grey "them" / "they" axis labels, 1.91:1 to 2.39:1; 6 px | both |

Pass with fixes (15): bloom-maybe-yes, bus-wait-longer-than-half, eight-percent-showing, growth-gap-seventy-years, heat-wave-demand, momentum-sweet-spot, personal-inflation-basket, same-dollars-more-shares, step-too-long, tax-who-pays, tire-after-the-drive, unit-price-aisle, up-then-down-trap, which-particle-names-it, zinc-hands-over-two (contrast between 3:1 and 4.5:1, or text under 9 px at phone width).

A repeated cause in economics: white text on the mid-green `--good` fill is 2.9:1 in dark (three of the eight failures); pale semantic colours as light-theme text again (four more). The pattern-review item in the first audit ("semantic colours are for fills and shapes only") applies; it is for the pattern reviewer.

### Hand check (5 of 49)

Keyboard trace (Tab order, keyboard predict -> explore, focus after commit, DOM order, SVG label per phase) and screenshots on `start-early-race`, `two-suspects-payoff`, `jackpot-once-a-week`, `line-stops-at-the-edge`, `up-then-down-trap`. It confirmed K3 and K4 in all five, confirmed the contrast failures on `two-suspects-payoff` and `jackpot-once-a-week` by eye, and showed the SVG-label prompt is a false alarm on two lessons. My own trace did not reach the reveal by keyboard (a single stage press does not satisfy the reveal gate); the scan did, so reveal-phase findings rest on the scan.

### What I believe and how sure

- The 8 contrast failures and the kit-level counts: high confidence (computed from painted colours; 2 eyeballed).
- No keyboard lock-out in the 49: medium-high (scan plus 5 partial hand traces, no screen reader).
- The 26 passes mean "no automated finding", not "accessible"; 12 lessons carry the SVG-label prompt unresolved.

### Next moves

1. Platform engineer: K1-K6 now cover 125 lessons; fix once, then re-run `node tools/a11y-scan.mjs`.
2. Founder: unpublish or waive the 8 new failures (F-14); the first batch's 18 are still open.
3. Builders of the 8: fix stage colours, then ask for a re-scan of the slug.
