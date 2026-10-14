# Build note: new-road-slower-trip (demo-builder, 2026-10-14)

Kept from evaluators until they report.

Inputs: brief N1 (`company/domains/briefs/cs.systems.md`, NCM batch 1), spec `company/design/specs/new-road-slower-trip.md`, **binding changes in `company/design/reviews/2026-10-14-design-review-ncm-specs.md` §1 and its legend-swatch rule** (the review wins over the spec), network-stage rules in `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2.

## What was built
- Format: before / after toggle with a Step + Run pair inside After, on a hand-built network stage. 4 display-only nodes S (40,170), A (170,70), B (170,270), E (300,170), r 16; 5 directed roads; no taps on the graph, no randomness, no seed.
- Controls in DOM order: Before (active and disabled at start), After, Switch 1,000, Run. All rendered at first paint, all disabled while locked, all disabled in the reveal (the stage pins to After at the furthest s reached, which is 4,000 because the reveal needs both milestones). No reset.
- Rule (same in code, question, meta): S→A and B→E take cars/100; A→E and S→B take 45; A→B takes 0. With s on the new route and the rest split evenly: new route 40 + s/100, old 65 + s/200. Switch moves 1,000 only while the new route is faster; Run repeats that, computes the end on press (milestone fires on press), then shows the steps at 100 ms each (instant under prefers-reduced-motion).
- Milestones: `link-open` (After at s = 0), `nobody-gains` (s = 4,000). minInteractions = 2.
- Reveal quotes only reached states: 40 vs 65 at s = 0 (always seen, as After is required), the 2,000 line only if the learner stopped at 2,000 with Switch, then 80 / 85 at 4,000 and 65 before. About 80 words.

## Review changes (2026-10-14 design review §1), how each was met
1. **Link dotted in both modes**: `--line` dotted in Before, `--fg` dotted in After, width 2 + 4 × s / 4,000. The rule line names only solid and dashed; the link's "0" pill names its cost.
2. **Arrowheads at every width**: drawn as fixed polygons (12 px long, 14 px base, so 8 px wider than the widest 6 px road), not an SVG `marker`. Same intent as the review's fixed `userSpaceOnUse` marker: one size at every width. The tip sits exactly on the target rim (r 16); the stroke stops at the head's base, so a 6 px road never pokes past the tip. Checked by eye at s = 4,000 in the phone screenshot.
3. **Readout keeps one shape**: three fixed grid slots (equal thirds), so nothing moves when Before and After flip. "?" only while locked (new route), "–" in Before during explore. Deviation: each slot is label above value (two short lines), not one line, because "On new route 4,000 · New route 80 ▲ · Old route 85" does not fit 340 px at a readable size. The ▲ is an inline SVG triangle (aria-label "faster") plus bold, not a Unicode glyph.
- **Legend-swatch rule**: the rule line's "Solid roads" and "Dashed" each have an inline SVG swatch drawn with the same CSS classes as the roads. No words added: 23 stage words.

## Departures from the spec (please check in design review)
- **viewBox `0 44 340 250`** instead of `0 0 340 300`. Node positions are unchanged; only the empty strip y < 44 (reserved for the hero) and y > 294 are cropped, because there is no hero yet and the predict stage on a phone is short. Restore `0 0 340 300` when the hero lands.
- **Hero (bridge, predict only) and reveal before/after pair: not built.** No illustration exists for this slug and I did not run the illustration pipeline. Route to visual-designer.
- The SVG flexes to fit the stage (min 170 px). At predict on a Pixel 7 the graph is about 230 CSS px wide, so the pill numbers render at about 9 px, below the 11 px floor; the same numbers are in the question. From explore on, the graph is full width and pills are about 17 px. The bottom few px of the (disabled) control row is clipped at predict. Both are kit stage-height limits; the accessibility reviewer should judge them.
- Accent ring on the pills that changed in the last step: S→A and B→E only (the link's "0" never changes, so it gets no ring).

## Node check (re-run 2026-10-14, the exact rule in Demo.tsx)
before 65; s = 0/1,000/2,000/3,000/4,000 → 40/65, 50/70, 60/75, 70/80, 80/85; run stops at 4,000 after 4 moves; enumerating every integer split (a, b, c) with one-driver deviations gives the single equilibrium (0, 0, 4,000) at 80; switch back 85; new route faster while s < 5,000; planner best 64.6875 at s = 500 (meta only, claim c9). Script described in claims c3, c4, c9. All claims are `unverified`.

## Flags for the fact-checker
- **Section unconfirmed**: `curriculum.references` has chapter 8, section "8.1"; the brief says §8.1–8.2 (§ unconfirmed). Confirm against the book.
- Claim c7: Braess (1968) citation is from the brief and memory: confirm or drop. "The stage network is the textbook example" is also from the brief.
- Claim c8 (the caveat): my counterexample (a 25-minute link is never used) is an argument that it does not happen in every network, not a source.

## Other
- Lesson code 11.5 KB (Demo.tsx 9.8 KB + CSS 1.6 KB), under the 15 KB budget. No new dependencies.
- Recall question written by the builder (claim c10).
- Game framing check by cm-economics-markets (brief note, review record objection 4) has not happened.
