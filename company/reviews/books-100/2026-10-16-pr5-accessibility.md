# PR #5 Books (100 draft lessons): accessibility scan

reviewer: accessibility-reviewer · date: 2026-10-16 · head: fe7fc958 (branch review/pr5-a11y) · not a merge blocker (matrix: required before publish)

## Verdict

**PASS WITH FIXES. No lockout found, so no launch block.** Every lesson can be completed by keyboard alone (predict, explore, reveal), every control has an accessible name, the stage picture has role=img with a label, contrast passes in dark and light, nothing moves under reduced motion, and no meaning rides on colour alone. Two shared-renderer defects should be fixed before publish (B1, B2). All 100 lessons share them, because every lesson uses the one renderer.

## How this was done

- Built the PR head in my worktree (`next build --webpack`, `NEXT_DIST_DIR=.next-a11y`; Turbopack refused the symlinked node_modules outside the checkout root) and served it on my own port 3517.
- `node tools/a11y-scan.mjs <all 100 bk-* slugs> --base=http://localhost:3517` (390x844; keyboard, names, contrast in dark AND light at predict/explore/reveal, targets, reduced motion, colour cues). Raw result is `artifacts/a11y/all.json` in my worktree (not committed).
- My own Playwright probe over all 100 lessons: SVG text bounding boxes vs viewBox and vs each other, case-button size and overflow, focus after pressing a case button, live-region text, SVG name; at 390x844 light and at 320x568 dark, locked / case A / case B.
- Read `src/components/books/BookIdeaLesson.tsx`, `books.module.css`, `src/kit/Lesson.tsx`, `src/kit/controls.tsx`, `src/app/globals.css`. Looked at screenshots of 6 lessons (listed below). The other 94 were checked by the scan and the geometry probe, not by eye.
- Not done: no real screen reader (NVDA/VoiceOver/TalkBack) was run. Names and live-region text were read from the DOM, so the screen-reader findings are inferred from markup. No 200% text zoom run.

## Shared-renderer findings

| id | severity | where | finding |
|---|---|---|---|
| B1 | **fix (high)** | `BookIdeaLesson.tsx:53-55` (`disabled={locked \|\| active === i}`) | The case button you just pressed is disabled, so focus drops to `<body>`. Probe: Tab to Case A, Enter, `document.activeElement` is body in **100/100** lessons. The learner must press two cases to unlock the reveal, so every keyboard and switch user hits this twice, and has to Tab again from the top of the page (brand link, Map, then the stage). Screen-reader users hear nothing about where they are. Fix for the platform-engineer: do not use `disabled` for the pressed state; use `aria-pressed` and make the handler a no-op (the early return at line 45 already is), keeping `.control.active` styling (`books.module.css:7` can then drop its `:disabled` selector). |
| B2 | **fix (medium)** | `BookIdeaLesson.tsx:58-59` | The picture is one `role="img"` whose name is only the case label and the result ("Short batches: 15 work"). Everything the picture teaches (station values and the slowest one, branch probabilities and payoffs, the step-by-step compound trace, stock before and after, counts of pictured nodes, the Work/Overhead split) is hidden from assistive tech, and the visible SVG text is not exposed. A blind learner can toggle cases and hear results, but cannot get the "what changed" the lesson is about. The locked name is "intervals toy, results hidden": `spec.family` is an internal key, not words (also "payoff toy", "selection toy", "network toy"). Fix: build a one-sentence description per family from `values` and `result.trace` (or add visually hidden text), and give the locked state plain wording. |
| B3 | fix (low) | `BookIdeaLesson.tsx:65-70` | Live region is one atomic polite region. Text is "Seen A: 15 work B: 20 work", so each press re-reads both cases and does not say which just changed; unit is omitted when `spec.unit` is empty. Acceptable, but the announcement could be "Case B: 20 work minutes". Spans have no whitespace between them in the DOM (`SeenA: 15 workB: 20 work` as textContent); probably read as separate items, but add `{" "}` to be safe. |
| B4 | fix (low) | `books.module.css:4,23`, `:2` | Small text: case buttons 12px, "Seen" row 11px, "Toy model" 12px. At 390px the SVG is drawn 1:1 (13px text, 16px for results); at 320px width it scales to 0.78 (about 10px text). Nothing is clipped or overlapping at either width, but 10-11px is below the company's usual floor. See W-289 in my memory (minimum SVG text size). |
| B5 | note (kit, not this PR) | `src/kit/Lesson.tsx:81-85` and `:100-106` | Already known kit issues that every Books lesson inherits: DOM puts the stage (with its disabled controls) before the prediction question; focus falls to `<body>` after "Lock it in" and after "Show me why"; `aria-disabled` on the stage div does nothing. The scan reports them for all 100. Route to the kit owner; they are not Books-specific. |
| B6 | note (kit/app, not this PR) | `src/app/globals.css:124` `.control` border `--line` | Control borders are 1.36:1 (light) and 1.34:1 (dark) against their backgrounds, under 3:1 for UI boundaries (WCAG 1.4.11). The text names every control, so it is usable; the pressed state is carried by a 2px `--fg` border plus `aria-pressed`, which is fine. |
| B7 | note (app shell) | scan: `a.brand-link "Map"` 29.9x17, `trust-button "Why trust this?"` 221x23, `a.brand` 38.5x29 | Shell targets under the 24px floor / 44px target. Same on all 100 and on published lessons; not from this PR. |

## What passed (shared renderer)

- **Keyboard:** all controls are native `<button>`; Tab order is Case A, Case B, Reset (DOM order, matches visual); Enter/Space work. Predict options, "Lock it in" and "Show me why" are native buttons (kit). Whole path completes by keyboard in all 100 (`revealReached` true). Reset is disabled until there is something to reset.
- **Focus visible:** `books.module.css:6` gives a 2px `--fg` outline with offset; stage padding (10px) leaves room, so it is not clipped.
- **Names:** case buttons are named "Case A: <label>" and show "A: <label>"; visible text is contained in the name (WCAG 2.5.3). Reset has its text. `aria-pressed` reflects state.
- **Contrast:** tokens used are `--fg`, `--muted`, `--bg-2`, `--bg-3`. Muted on `--bg-3` is 5.07:1 light, 6.12:1 dark; the scan's lowest text contrast across 100 lessons, both themes, three phases, is 5.07, with 0 failures. Graphic strokes use `--fg` or `--muted` (5.07:1), above 3:1.
- **Colour:** no semantic colours are used. The slowest station is a thicker outline plus an underline (`.constraint`, `.highlight`); Work vs Overhead is solid vs dashed-outline with a text legend; the active case is a thicker border plus `aria-pressed`; the tank has numbers. The scan reports no colour-only cues. (Greyscale and colour-blind shots were not needed: nothing depends on hue.)
- **Reduced motion:** the component has no animation or transition of its own; the global rule (`globals.css:180`) also applies. Scan: 0 running animations and 0 idle DOM mutations with reduce set.
- **Targets at 390px:** case buttons are at least 44px tall (up to 57px when a label wraps) and at least 60px wide; Reset is 60x44. At 320px no button text overflows (`scrollWidth` vs `clientWidth` checked), no horizontal page overflow.
- **SVG text fit:** no text is outside the viewBox in any of the 300 states probed at 390 (100 lessons x locked/A/B) or the 300 at 320. The probe flagged bounding-box overlaps in compound, network and some payoff/flow lessons (e.g. "steps 5" over "→ 2.43 units"); I looked at screenshots and they are 1-3px line-box overlaps with no visible collision (see bk-chaos-nearby-trajectories). They are tight, not clipped.

## Per-lesson findings

Result for all 100 draft lessons: scan verdict `pass`; **zero findings with origin "lesson"**; every lesson has exactly the same six shell/kit findings (B5, B7) and the B1/B2 defects above. Lesson-to-lesson variation I looked for and did not find a problem in:

- Longest case labels (22-23 chars): bk-scale-exponent-boundary, bk-accelerate-small-batches, bk-topologies-handoff-edges, bk-ship-distributed-information. Buttons wrap to two lines and stay 44px or more at 390 and 320.
- Longest SVG labels (11-15 chars: bk-organized-offload-buffer, bk-extended-external-state, bk-stick-retrieval-evidence, bk-indistractable-cue-access): no clipping.
- Longest predict question (173 chars, bk-influence-social-sample) and options (13 chars): kit panel, no overflow.
- Four-step compound and flow lessons, 12-node network lessons (bk-grove-leverage-hours, bk-influence-social-sample, bk-notes-links-not-piles): fit and legible; node count is stated in text ("12 pictured / 12 reached").

Seen by eye (screenshots at 390px): business: bk-accelerate-small-batches, bk-topologies-handoff-edges, bk-zero-tail-concentration. Psychology: bk-organized-offload-buffer. Science-history: bk-chaos-nearby-trajectories, bk-scale-exponent-boundary. For the strand split (34 business, 33 psychology, 33 science-history) my machine checks covered all three strands in full; my eyes covered the list above, with only one psychology lesson. A psychology-heavy visual pass was not done.

### Slugs that pass (no lesson-level finding; carry B1/B2/B5)

All 100 `bk-*` slugs in `src/demos/books/` (`ls src/demos/books | grep -c '^bk-'` is 100). The six older non-`bk-` folders there (biased-judge-noisy-judge, born-in-january-picked-first, one-percent-a-day, slowest-station-sets-pace, total-signups-hide-the-slide, wheel-number-pulls-guess) are not part of this PR and were not scanned.

## Fix list for the platform-engineer (owner: platform-engineer)

1. B1: stop disabling the pressed case button (`BookIdeaLesson.tsx:55`, `books.module.css:7`). Re-run the probe: focus must stay on the button.
2. B2: generate a per-family text description for the `role="img"` label and rewrite the locked label without the family key (`BookIdeaLesson.tsx:58-59`).
3. B3: announce "Case B: 20 work minutes" in the live region and put spaces between spans (`:65-70`).
4. B4: raise the 11-12px text (`books.module.css:2,4,23`) and consider a larger floor for SVG text at 320px.
5. B5, B6, B7 go to the kit/app owners (not part of this PR).

## Open

- Real screen-reader pass (VoiceOver and TalkBack) not done; B2 and B3 are inferred from markup.
- Re-scan after fixes: `node tools/a11y-scan.mjs <slugs> --base=<own port>`.
