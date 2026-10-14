# Build note: who-pays-same-filter

builder: demo-builder (ncm-coase) · 2026-10-14 · brief: Course NCM #5 · spec: company/design/specs/who-pays-same-filter.md

- Built to the spec: two stacked panels ("Right to pollute", "Right to clean air"), same scene, one $-a-year ruler (0.8 px per $) and Total bars (0.4 px per $) on a shared x-origin. Five controls in DOM order: Offer $50, Offer $200, Offer $350, Pay $300 damages, Fit $100 filter; each pressable once.
- Numbers computed from D = 300, F = 100 (not hard-coded). Deal test strict: offer − F > 0 and −offer > −D. Node re-run: $50 refused (factory −$50), $200 deal (+$100 / −$200, total −$100), $350 refused (laundry −$350); strict range $101–$299. Liable: damages −$300 total, filter −$100 total.
- Fix 1 (spec flag): stem reads "a filter, $100 a year" (25 words), matching "$300 a year".
- Fix 2 (spec leak flag): while locked the three offer chips render in the DOM, disabled, labelled "?" (aria-label "Locked until you predict"); prices appear only after commit. Panel 2 buttons keep their labels.
- Milestones (minInteractions 2): deal-struck (only $200), liable-fits. A side keeps the best outcome seen, so no press order removes a fitted filter.
- Fade labels ("−$50 for me", "−$350: worse than smoke") are decoration (≤ 400 ms); every press also leaves a mark or changes the ledger or arrow.
- Not built: the optional reveal clause "your $50 / $350 fell outside it" (the reveal is the spec's fixed text).
- Claims c1–c5 all unverified; c5 labels the model as a simplification, and the stage line shows it through the reveal.
- Not run here (per dispatch): build, tsc, QA, walkthrough.

## Pre-flight v2 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

c3 was held: the naming "This is the Coase theorem, which holds when bargaining is costless" rests on Coase 1960, which nobody here can open.
- The reveal now says "Economists call this idea the Coase theorem." and "Here bargaining is free; with costly bargaining or many people, it can fail." It no longer states as a general law that the theorem "holds when bargaining is free".
- c3 is reworded and set to unverified. c4 and c5 are unchanged.
- No mechanics changed. Not run: build, QA, walkthrough.

## v3 (2026-10-14): neutral title, bigger panel print

Problems (learner r7): the title "Who pays, same filter" states the lesson's gap and points at "Yes, the laundry pays for it"; the hook "Does the smoke have to stay?" leans to "no"; panel labels too small on a phone.
Changes: title "Legal smoke: will a filter go up?", hook "The factory may legally pollute, and the smoke costs the laundry next door. What happens?" Panel print up: tags ("filter $100 a year", "smoke $300 a year") 10 -> 12 px, ruler ticks 10 -> 11.5 px, "both gain" 9 -> 11 px, offer marks 10 -> 11 px, arrow amounts 11 -> 12 px. No mechanics or reveal text changed, so no claim text changed and claim statuses stay. Version 2 -> 3.
Not run here: next build, QA, walkthrough, tsc (caller's order).

## Pre-flight v3

1. Title and hook: "Legal smoke: will a filter go up?" / "The factory may legally pollute, and the smoke costs the laundry next door. What happens?" Both are open questions; neither mentions paying, so "No, the factory has the right", "Yes, the laundry pays for it" and "Only if a court orders it" all stay live.
2. Options: "No, the factory has the right", "Yes, the laundry pays for it", "Only if a court orders it": none numbered, similar length.
3. Locked stage: model line, two panels with "?" nets and "?" totals, offer chips labelled "?", panel 2 buttons "Pay $300 damages" / "Fit $100 filter" (both are the liable case, not the question's case). No band, no arrow, no filter drawn.
4. Reveal values: "$200 offer … in the shaded band" (b) deal-struck milestone (only $200 strikes a deal), band and $200 mark on panel 1; $100 filter and $300 smoke, panel tags and ruler; "$100 beats $300 of damages" (b) liable-fits milestone, panel 2 ledger; "−$100 both times" (a) the two Total rows, computed from both ledgers.
5. QA path: Offer $50 (refused) -> Offer $200 (deal-struck) -> Offer $350 (refused) -> Pay $300 damages -> Fit $100 filter (liable-fits). Both panels show their Total −$100 when the reveal opens.
6. Reset: there is no Reset, and a side keeps its best outcome, so no press undoes the filter. Reveal: "With the right to pollute, your $200 offer got the filter fitted: it sits in the shaded band, above the $100 filter, so the factory gains, and below the $300 the smoke costs the laundry, so the laundry gains. With the factory liable, it fitted the filter itself: $100 beats $300 of damages. Look at the two Totals: −$100 both times. The right decided only who pays, the laundry or the factory. Economists call this idea the Coase theorem. Here bargaining is free; with costly bargaining or many people, it can fail."

## Revision v4 (phone fit, build 6 measurement, 2026-10-14)

- Build 6 (W-287 10 px label floor) measured crop 229 px at 390×844 with the reveal open, 102 words, "right to pollute" (panel 1 title) off screen. Re-measured on the dev server before editing: same 229 px; stage 512 px (two 190-unit panels drawn at 179 px, never shrunk), reveal 315 px (14 lines) of a 618 px window.
- Why the card never shrank the panels: the screen-reader `.live` ledgers (position absolute) were siblings of the panel svgs, and the W-287 fit skips any svg with an absolutely positioned sibling. They now sit after the panels, in `.wrap`.
- Stage changes:
  - Each panel's viewBox 340×190 → 340×125. The Total (label, bar at 0.28 px per $, value) sits on the panel's title row; one x-origin for both panels, so the two bars still line up.
  - Factory and laundry nets read inside the blocks ("Factory +$100", "Laundry −$200"); blocks widened (100 and 108 units); the money arrow runs between them.
  - Offer marks ($ amount over a ✓/✗) sit above the band; "both gain" is right-aligned in the band; the filter/smoke glyphs under the $100/$300 ticks are gone (the tags "filter $100 a year" / "smoke $300 a year" stay).
  - Panel labels 11-12 → 13 units (titles, values 13.5), so the card's fit can draw each panel at 96 px with labels at 10 px or more. The refusal flash (fades in 400 ms) is aria-hidden decoration.
  - Row margins 2/6 → 0 px. Model chip "Simplified: two sides, free bargaining, costs known." kept at the stage top.
- Reveal 102 → 89 words (tool count, verdict line included; 82 without it), two paragraphs:
  "With the right to pollute, your $200 offer got the filter fitted: it sits in the shaded band, above the $100 filter, so the factory gains, and below the $300 of smoke, so the laundry gains. With the factory liable, it fitted the filter itself: $100 beats $300 of damages. / Look at the two Totals: −$100 both times. The right decided only who pays. Economists call this the Coase theorem; with costly bargaining or many people, it can fail."
  Cut: "Here bargaining is free" (the model chip on the stage says it; r8 note 1 suggested it), ", the laundry or the factory", "idea". Every number the reveal quotes ($200, $100, $300, −$100 twice), the shaded band, both Totals and the Coase payoff stay. Which teaching words go is cm-economics-markets' call (demo-standard); this cut is for them to accept or change (board).
- Claims reopened: c2 (reveal sentence reworded), c3 (claim text changed to match the reveal: "Economists call this the Coase theorem."; "Here bargaining is free" removed), c4 (sentence merged into the Coase sentence). c1 and c5: text and behaviour unchanged (c1's nets now read inside the blocks; same numbers).

## Pre-flight v4

1. Title and hook: unchanged.
2. Options: unchanged.
3. Locked stage: model chip; panel 1 "Right to pollute" with Total −$300 on its title row, "Factory $0" / "Laundry −$300" in the blocks, smoke, empty filter slot, ruler; offer chips "?"; panel 2 "Right to clean air" with Total ?, "Factory ?" / "Laundry ?"; panel 2 buttons. No band, no arrow, no filter drawn.
4. Reveal values: unchanged sources ($200 deal: deal-struck; $100 vs $300: liable-fits; −$100 both times: the two Totals).
5. QA path: unchanged (Offer $50 → $200 → $350 → Pay $300 damages → Fit $100 filter).
6. Reset: unchanged. Reveal text as above.
7. Phone fit (measured, `node tools/reveal-fit.mjs --url http://localhost:3530 who-pays-same-filter`, dev server): crop 0 px (was 229), hiddenBelow 0, phoneFit true. Stage 330 px (both panels fitted 96/118 px), reveal 267 px, 89 words. Named and visible: right to pollute, factory, laundry, 100, 200, 300; both Totals and the band are on screen.
