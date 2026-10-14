# Accessibility review: 200 Life Hacks engines (2026-10-14)

Reviewer: accessibility reviewer. Scope: the four shared engines in `src/components/lifehacks/` (Home, Study, Resource, AlphabetSearch) against K1-K8, then 3 lessons per engine on the release server (localhost:3561) with headless Chromium at 390x844 (dark), 1280x800 (light) and 390x844 with `prefers-reduced-motion: reduce`. Nothing was edited or built. One alphabet lesson exists, so AlphabetSearch got 1 spot-check, not 3.

K1 live regions, K2 SVG labels/roles, K3 contrast light and dark, K4 keyboard order and focus, K5 reduced motion, K6 colour-blind safety, K7 tap targets >= 24 px, K8 picture text >= 10 px (`company/design/system.md`, W-289).

## Verdicts

| Engine | Lessons | Verdict | Blocks launch? |
|---|---|---|---|
| Home (`HomeLesson.tsx`) | bag-weight-before-volume, wobbly-table-quarter-turn, square-bow-stays-tied | **Pass with fixes** | No |
| Study (`StudyLesson.tsx`) | spaced-beats-cram, work-back-from-a-deadline, apply-not-quote | **Pass with fixes** | No |
| Resource (`ResourceLesson.tsx`) | lh-area-scales-square, lh-align-price-units, lh-annual-label-cost | **Pass with fixes** | No |
| AlphabetSearch | alphabet-sort-search | **Pass with fixes** | No |

No engine locks a learner out: every lesson was completable by keyboard through predict and lock-in, there was no horizontal scroll at 390 px, and all controls are real buttons or range inputs. The findings below are degraded experiences, not lock-outs. The authority to block launch is not used.

## Findings (shared across engines unless stated)

**F1. Focus is lost when a control disables itself (K4, all four engines, medium).** Observed in 10 of 10 lessons: pressing a stage control by keyboard (Test A, Check mass, Test plan, Next morning, Try values, Find balance, Second: right-over-left) makes that button `disabled`, and `document.activeElement` becomes `<body>`. A keyboard or switch user must re-Tab from the top of the page (S3, Map, the card body...) after every step. Cause: the engines use `disabled={... state.step>0 ...}` as the "done" state. Fix: use `aria-disabled` and keep the button focusable, or move focus to the next enabled control or to the result. Where it lives: Study `Control disabled={locked||state.step>0}` throughout `Stage`; Home `Controls`/`Stage`; Resource `choose()` buttons; the kit `.control.active:disabled` rule hints it is a known pattern.

**F2. Result changes are not announced (K1, Home, Study, AlphabetSearch, medium).** Only Resource has an `aria-live="polite"` region (`ResourceStage` `.results`). In Home, Study and AlphabetSearch the result chips (`Result`, `.data strong`, "Scan ?", "Sorted ?") and the caption are plain spans. The SVG `aria-label` is updated, but a changing `role="img"` label is not reliably announced. Two lessons (square-bow-stays-tied, apply-not-quote) have no `<output>` or live element at all, so a screen-reader learner gets no feedback after pressing a control. Fix: one `role="status"` (polite) region per stage that carries the same sentence as the SVG label, or wrap `Result` rows in it. Careful about the "?" placeholder while locked, which should not be announced.

**F3. Resource live region is noisy (K1, Resource, low).** `aria-live="polite"` wraps two `<output>` elements, which are implicitly live as well, and the formula text. The page showed 4 live regions. A slider drag may announce the same values twice or three times. Fix: keep one live region and give the `<output>`s `role="none"` or drop the explicit live attribute.

**F4. Picture text under 10 px (K8, Home and Resource, medium).**
- Home: `.scene .small` is 9 px (`HomeLesson.module.css`). Measured minimum rendered label in square-bow-stays-tied: 9.8 px at 390 px. `.caption` is also 10 px, at the floor with no headroom, and the kit shrink would take it lower on the reveal.
- Resource: energy graphs use `fontSize="9"` for the axis maximum and end labels (meaning-carrying, not `aria-hidden`). Measured in lh-annual-label-cost: 8.7 px phone, 9.0 px desktop. `.formula` and `.assumptions` are 10 px HTML text at the floor.
- Study and AlphabetSearch pass: measured minimum 11.0 px (work-back-from-a-deadline), 12.0 px elsewhere. `.fileValue` is 10 px, exactly at the floor.
Fix: raise to 11 px (the authoring target) or mark as `aria-hidden` only if the value is also in the live text.

**F5. Hard-coded amber and pastel domain graphics in light mode (K3, Home and Resource, medium).**
- Home `.target` uses `#f59e0b` for fill and stroke. Against light `--bg-2` #ffffff it is 2.15:1 (2.01 on `--bg`, 1.87 on `--bg-3`); graphics need 3:1. In dark it is 8.1:1. The `.target` marks the thing the learner is meant to look at (target item, crossings, the arrow).
- Home `.object` and Resource `.ink`, `.active` and `.solid` use `--domain`. `system.md` records the pastels at 1.1 to 2.4:1 on light. In Resource the selected A/B state is shown by an `.active` stroke in `--domain`, a 3 px pastel outline on white that fails 3:1 for ten of twelve domain colours. The result cards (`data-active`) add a domain border as well, so the selection is again colour-only.
- Study uses `--domain` for curves, selected bars and the focus bar in the editor; the 4px `focus` line is the sole indication of which side has focus.
Fix: for strokes that carry meaning use `--fg` or a `color-mix(in srgb, var(--domain) 45%, #000)` ink; replace `#f59e0b` with `var(--warn-fill)` plus a `--fg` outline. I computed the amber ratios; the domain ratios are from `system.md`, not re-measured. I did not run an automated contrast pass on rendered pixels.

**F6. Colour-only pairs (K6, Study and Resource, medium).**
- Study spacing: the two curves differ by solid vs dashed (good), but the plotted points for A and B are same-shape circles that differ only by `--domain` vs `--good`, and the legend rects at the top of the SVG (`x=236` and the `days` markers) have no text key linking colour to A or B. Label them with "A"/"B" text or use a different marker shape.
- Study schedule/order: the highlighted (movable or first) bar is `--domain` vs `--line`; both have an `--fg` outline, so the difference is a pale fill only. Add a text or pattern cue.
- Study recall: check result is the box stroke `--good` vs `--bad` only (red/green). Match counts are in the readout ("Match 2/3"), so the information survives, but each box has no per-position mark. Add a check or cross glyph.
- Resource: A and B are distinguished by position and text label, which is fine; the "tested" state is `.solid` vs `.ghost` fill, which is a shape-fill change and acceptable.
- Home: `.air` green (`--good`) arrows and `.target` amber are both used as "the key thing"; they are distinguished by shape (arrows vs filled patches) so this passes, but combined with F5 the amber one is weak in light.

**F7. Tap targets (K7, pass for engine controls, low for chrome).** Every engine button measured 42 px high (44 px min-height with border box rounding) and sliders use the kit. Pass. Outside the engines, but seen on every lesson: the "Why trust this?" disclosure is 221x23 px (below 24 px), and the "S3" link (38x29) and "Map" link (30x17) fail the 24 px check. These belong to the kit or app (platform-engineer), noted here so the founder sees them.

**F8. Scrollable card body is a tab stop with no name (K4, low).** On phone, the first tab stop after the header is a scrollable `div` (the 340x398 card body, in Home bag-weight-before-volume and Study spaced-beats-cram). It gets focus (correct per WCAG 2.1.1 for scrollable regions) but has no `role="region"` or label, so a screen reader reads its entire text content as the name. Fix: give it `role="region"` and an `aria-label`, or `tabindex` with a label. Kit-level (platform-engineer).

**F9. Locked controls are skipped by Tab (K4, informational).** Before the prediction, stage buttons are disabled, so Tab goes straight from the Predict group to "Why trust this?" and then out of the page (`BODY`). This is correct and expected, and the predict, then Lock it in, then stage order is logical. After lock-in, focus stayed on the Predict option; a keyboard user is not told the stage is now live. Fix with F2's status region ("Stage unlocked").

**F10. Reduced motion (K5, pass).** With `reduce`, no element had a transition or animation duration (0 elements, against 1 per page without it), in all 10 lessons. The lifehacks CSS has no motion of its own, and `Resource`/`Study` modules add a belt-and-braces `reduce` rule; `globals.css` covers the rest. Nothing to fix.

**F11. SVG labels and roles (K2, pass with one note).** All stage pictures are `role="img"` with an `aria-label` built from the same state that draws them (Study, Alphabet and Resource are especially good: the label states which values are covered or not yet tested). Note: Home `Scene` and `Stage` labels use `spec.title: choice; result` and are accurate, but long path-only scenes have no per-part description; acceptable since the label carries the numbers. The label on the Study spacing picture is long (about 45 words) and is read again on every slider tick; keep, but F2's status region would let it be shortened.

## K1-K8 per engine

| Check | Home | Study | Resource | AlphabetSearch |
|---|---|---|---|---|
| K1 live regions | Fail (F2) | Fail (F2) | Pass, noisy (F3) | Fail (F2) |
| K2 SVG label and role | Pass | Pass | Pass | Pass |
| K3 contrast, light and dark | Dark pass; light weak (F5) | Dark pass; light weak (F5) | Dark pass; light weak (F5) | Pass (fg and good-fill with `#0d0f14` ink) |
| K4 keyboard order and focus | Order pass; focus lost (F1) | Order pass; focus lost (F1) | Order pass; focus lost (F1) | Order pass; slider first, focus lost on Scan (F1) |
| K5 reduced motion | Pass | Pass | Pass | Pass |
| K6 colour-blind | Mostly pass (F6) | Partial (F6) | Pass | Pass (struck-through and faded, not colour) |
| K7 tap targets | Pass | Pass | Pass | Pass |
| K8 text >= 10 px | Fail (9 px, F4) | Pass | Fail (8.7 to 9 px, F4) | Pass |

## What I checked and what I did not

Checked in a browser: tab order before prediction, predict by keyboard, lock-in by keyboard, one stage control by keyboard, focus after it, rendered SVG text size (font size times the screen matrix), control sizes, live-region count, horizontal overflow, reduced-motion durations, 12 page loads per group (3 viewports, 3 lessons). Loads were fast (under 60 s) despite the load warning. Screenshots were taken but are in scratch space, not kept.

Not checked: a real screen reader (no NVDA, VoiceOver or TalkBack), so F2 and F3 rest on the DOM and ARIA semantics, not on what is heard. The reveal-phase shrink (W-289) was not measured in the browser; F4 numbers are pre-shrink. Contrast figures other than the amber ratios come from `system.md`. Only 10 of the 200 lessons were opened; the other 190 share the engines, but any lesson-specific `Demo.tsx` overrides are unchecked, and Home models other than the three sampled have different scenes (F4 and F5 may be worse or better there). The keyboard sweep ran on Chromium only.

## Board

Demo-builder: W-557 (F1), W-558 (F2, F3), W-559 (F4), W-560 (F5), W-561 (F6). Platform-engineer: W-562 (F7, F8).
