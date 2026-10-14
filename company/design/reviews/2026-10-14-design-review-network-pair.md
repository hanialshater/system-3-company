# Design review, 2026-10-14: network-stage pair + ABM reference (build time)

chair: visual-designer (Kiri) · session 2, branch `ccr-rnd-ncm` · accessibility checks made against `company/design/system.md` (tokens and contrast) and WCAG 2.x arithmetic; the accessibility reviewer still owns the rulings (see "Handed to the accessibility reviewer").
lessons: `src/demos/math/news-comes-from-acquaintances`, `src/demos/math/enemy-of-my-enemy`, `src/demos/economics/mild-preferences-sharp-divides`.
against: `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2 (network stage) and §3 (rule of two); `2026-10-14-design-review-ncm-specs.md` (legend-swatch rule); `2026-10-13-design-lead-decisions.md` §1 (ABM rules); `company/design/formats.md`.
evidence: `Demo.tsx` and `styles.module.css` of each lesson (read in full); `artifacts/walkthroughs/<slug>/sheet.png` for enemy and mild-preferences (current). Geometry computed from the coordinates in code.

**Evidence caveat (news-comes-from-acquaintances).** The `sheet.png` on disk (08:43) is the v1 build: heart swatches, "any two of your close friends are linked" wording, no red broken state. The code is v2 (the red broken A–B state, ✗ dot, close/acquaintance line swatches). I judged the news lesson from the v2 code, not the picture. The qa-tester's regenerated sheet must be looked at before the final "approved" (change N8 below is the check).

## Verdicts

| Lesson | Verdict |
|---|---|
| news-comes-from-acquaintances | **Approved with changes** (8: N1–N8) |
| enemy-of-my-enemy | **Approved with changes** (5: E1–E5) |
| mild-preferences-sharp-divides (ABM reference) | **Changes required before it is the reference** (6: M1–M6). The two flagged items resolve as: glyph rule already met (no change), Run 2.4 s fails (M1), ring and tint pass at ≥ 6 px (M3, M4 are small) |

The rule of two (§3) needs both network lessons to pass. They pass once the changes below are made. None of the changes is a layout rebuild, so I do not recommend tightening §2.1 (≤ 10 tappable nodes) for the next network lesson. See "Rule-text amendments" for the three rule edits this review asks the design lead to make when she writes `network-stage.md`.

## Check against the network rules

| Rule (§2) | news-comes-from-acquaintances | enemy-of-my-enemy |
|---|---|---|
| Nodes ≤ 12 tappable; ≤ 20 named | 8 named, 0 tappable. Pass | 5 named, 0 tappable (edges are the taps). Pass |
| Tappable edges ≤ 10 | 3 handles (C–E, F–H, A–B). Pass | 10 handles. Pass (at the limit) |
| viewBox 340 wide, height ≤ 300; fixed positions, no layout | 340 × 250. Pass | 340 × 284. Pass |
| Node r ≥ 14 (28 px disc) | r 15 / square 28. Pass at scale 1. **Scale is height-bound**, see N1 | r 16. Pass; board scale ≈ 0.9 at 640 px tall phones (r 14.4), 1.0 at 844 |
| Hit circle 44 px | handles are 44 × 44 `Control`. Pass | `.hit` 44 × 44 buttons. Pass |
| Centres ≥ 48 apart (handle to handle, handle to node) | handle to nearest node 51.5 (C–E, F–H) and 52 (A–B). Pass at scale ≥ 0.94 only (N1). Nodes are not tappable, so node–handle overlap is not a hit conflict | handle to handle min **49.0** (computed, R = 135). Handle to its own nodes 79, to other nodes 93. Pass at scale ≥ 0.98; below that the 44 px circles overlap by up to 3 px (E3) |
| Handle drawn ≥ 20 px | 26 px pill. Pass | 24 px disc. Pass |
| Edge state = line style + glyph | solid 3 / dashed 2 and a line swatch in the A–B pill. Pass. The check handles show `?` / `✓` | solid 3 + "+" / dashed 2 + "−". Pass |
| ≤ 3 node states; fill vs hollow first | hollow / filled "heard". 2 states. Pass | one node state (hollow); the state is on edges and trios. Pass |
| Colour never alone | green ring on checked handle is backed by `✓`; red broken tint is backed by ✗ dot and dotted line; accent news path is backed by filled nodes. Pass, with N4 for the ✗ ink | trio tint is the only per-trio cue; backed by the readout count and the legend triangle. Pass with E4 |
| Sets by dashed outline or soft tint, in the legend | tint strokes (green, red, accent) at 9 px are not in the legend. See N5 | trio tint is in the legend. Pass |
| Node names 1 char inside, ≥ 13 px | 14 px, but scales with the box (N1) | 15 px. Pass |
| Legend one line, ≤ 6 words, SVG swatches | 3 entries, 4 words, SVG swatches. Pass. Circle vs square not named (N3) | 3 entries, 3 words. **Swatches are CSS spans, not drawn from stage code** (E1) |
| Stage SVG has `aria-label` with the counts | Pass (text states tie type and break) | Pass ("3 of 10 trios unbalanced; camps …") |
| Stage words ≤ 25 | 25 at the longest caption ("H's news reached A's group over the acquaintance A–B.", 9) plus rule 10, legend 4, button 2. **No headroom** | about 19 (rule 9, legend 3, readout labels 2, chips 4, "of 10"). Pass |
| Motion ≤ 300 ms; instant on reduced motion | news hops: nodes fade 90 ms with delays up to 270 ms, so the last node finishes at **360 ms**. Reduced motion handled by the global rule in `globals.css:180` (animation none). See N6 | no animation. Pass |
| QA path ends on what the reveal describes | transcript path: checks, A–B to acquaintance, news. Ends on the acquaintance + news state. Pass (v2 DOM order) | ends on 3 camps (3 unbalanced) which the reveal quotes. Pass |

## 1. news-comes-from-acquaintances: approved with changes

Good and not to be touched: the broken state (red A–B plus A–C tint, dotted missing B–C with ✗) shows the misconception's picture before the answer; A–B drawn as a heavy solid vs a dashed line carries the state without colour; legend swatches reuse the stage's own classes (`.bridgeStrong`, `.weak`, `.heardSw`), which is the swatch rule done right and the model for the enemy lesson.

Changes (exact):
- **N1. Make the drawing scale independent of viewport height.** `.box` is `min(100%, calc(28dvh * 340 / 250))`. At 844 px tall that is 321 px (scale 0.944: node r 14.2, label 13.2 px, handle to node 48.6 px: all just over the minimums). At 667 px tall it is 254 px (scale 0.75: r 10.8, label 10.5 px, handle to node 38.6 px). §2.1 says "scaled to the card width". Replace the height term so the box never scales below 0.95: either `min(100%, 340px)` and make room by dropping the second line of the caption space (`min-height: 1.4em` already reserves one line), or fix the stage at 340 wide and let the platform's stage scroll behaviour handle short phones. The platform engineer chooses; the target is scale ≥ 0.95 at 390 × 844 and ≥ 0.9 at 390 × 667.
- **N2. Handle-to-node distance, drawn.** At scale 1 it is 51.5, fine. After N1, add the check to the build note: handle centres ≥ 48 CSS px from every node centre at 390 px.
- **N3. Circle vs square.** The squares (B, F, G, H) carry no state and the legend does not name them (§2.4: every shape difference named). Words are at the limit (25). **Make all eight nodes circles** (also what the enemy lesson uses, so the pair reconciles). The groups are already separated by position and by the single bridge.
- **N4. ✗ ink fails in light mode.** `.xMark { fill: var(--bg) }` on `--bad-fill` (#ff7a7a): light `--bg` is #f6f7fb, 2.4:1 (needs 4.5 for 14 px text). Use `#0d0f14` (as the enemy lesson does for its "+"), which is about 8:1 on #ff7a7a.
- **N5. Name or drop the tint strokes.** Green (checked triangle), red (broken) and accent (news path) 9 px tints are three colours for three meanings and none is in the legend. The ✗ and the caption name the red; the `✓` and caption name the green; the filled nodes name the path. That is enough for the learner; keep them, but treat them as **emphasis only, never carrying meaning alone** (they do not today). Do not add a fourth.
- **N6. News hop timing.** Node delays are `(hop + 1) * 90` ms plus a 90 ms fade, so the last node settles at 360 ms (> 300). Use a 60 ms step (0, 60, 120 delay; 90 ms fade; done by 270 ms). Reduced motion is already instant through the global rule.
- **N7. Screen-reader state on handles.** `aria-label="Check the rule on tie C–E"` with `aria-pressed` does not say whether the check was done (`✓` is only visual). Label: "Check the rule on tie C–E, checked" / ", not checked yet". The A–B handle's label is fine ("Tie A–B, close. Tap to switch.") but `aria-pressed` reads as "pressed" for close, which is a different idea from its label: drop `aria-pressed` on A–B (the label already states state and action).
- **N8. Re-check the regenerated sheet** for: the A–B pill (34 px wide) not touching either node (it sits 52 px from each centre, 22 px of edge), ✗ dot not overlapping the C–E handle, and the caption not wrapping to a third line at 390 px.

Not required: `--muted` for the in-group edges. It measures 5.5:1 or more on both themes; `--line` would fail 3:1 (see amendment A2).

## 2. enemy-of-my-enemy: approved with changes

Good and not to be touched: R = 135 on the pentagon gives handle spacing of 49.0 px as the ruling predicted (I recomputed: 49.04); every handle is the value pill (the sign glyph) as §2.3 asks; friend solid 3 px + "+" on a filled handle, enemy dashed 2 px + "−" on a hollow handle, so no colour-only state; DOM order and QA path are stated in the file header and end on the state the reveal quotes.

Changes (exact):
- **E1. Legend swatches drawn from stage code.** `.keyFriend`, `.keyEnemy`, `.keyTrio` are CSS spans (18 px circles with text glyphs, a clipped triangle) and not the stage's drawn handle (24 px, r 12, 1.5 px stroke, 17 px glyph) or trio polygon. Replace with three 14 px inline SVG swatches that reuse `.handleOn` + `.glyphOn`, `.handleOff` + `.glyphOff` and `.trio` (scaled with a viewBox, as news does with `Swatch`). This is the swatch rule from `2026-10-14-design-review-ncm-specs.md`, and it also fixes the "+" and "−" legend glyph falling back to a different font from the stage.
- **E2. Trio tint opacity.** At 0.16, overlapping trios stack (the all-enemies state shows 10 stacked triangles, a near-solid red field) and on single trios the tint is 1.2:1 against the stage in light mode. Because the count and legend triangle carry the meaning, a low tint is acceptable, but stacking hides which trios are unbalanced. Set `fill-opacity: 0.12` and add a 1 px `--bad-fill` stroke at 0.5 opacity so a single trio's outline survives the stack, **or** accept the smear and say so in the build note. My choice: the outline.
- **E3. Hit overlap at narrow cards.** Handle spacing is 49 px at scale 1; the `.hit` circles are 44, so they overlap below scale 0.9 (card inner width under about 306 px, i.e. 320 px phones, since `.board` is `min(100%, 40dvh*340/284)`). Accept (the overlap is 2 to 3 px and the nearer handle wins) but write it in the build note as a known limit at 320 px. No code change.
- **E4. Accent ring (last flipped) in light mode.** `.ring` is `--accent` (#7c9cff, 2.6:1 on white, below 3:1) and marks "the pair you just changed". It is a recency cue, and the sign glyph changed too, so it is not load-bearing. Either leave it and list it in the build note as non-essential, or make it `--fg` 2 px dashed. My choice: leave.
- **E5. Screen-reader announcements.** The readouts ("Unbalanced 3 of 10", "Camps") are not announced when a pair flips, and the SVG label is `role="img"` (not live). Add a visually hidden `aria-live="polite"` line that repeats "3 of 10 trios unbalanced; camps ABC, D, E" after a flip. The handles' `aria-label` ("Pair A–B, friends") with `aria-pressed` states the state twice; keep the label and the pressed state (the rule asks for both), but state this in the build note so the accessibility reviewer rules on it.

## 3. mild-preferences-sharp-divides: changes required

The three questions routed to this review:

- **Glyphs vs "inline SVG swatches, not Unicode".** **Already met; no change.** The rule line's marks come from `const G` in `Demo.tsx`, an inline SVG (`aria-hidden`) drawn with the same `.a`, `.b`, `.hollow`, `.ring`, `.tint` classes as the grid. The "□○" in `transcript.md` is the walkthrough tool's text rendering of the SVG. No Unicode glyph font is involved. Put that sentence in the build note, because the transcript will be read by later evaluators who see "□○".
- **Run now ~2.4 s vs the 400 ms rule.** **Fail** (M1).
- **Red ring and all-like tint at about 6 px cells.** **Pass with small changes** (M3, M4).

Changes (exact):
- **M1. Run replays within 400 ms (decisions §1.5).** `play()` steps at most 20 frames at 120 ms each = 2.4 s. The rule is "replay within 400 ms (frames may be skipped), instantly under reduced motion", and the 450 ms QA wait depends on it. Use at most 8 frames at 45 ms (`jump = ceil((last − tt) / 8)`, interval 45 ms, ≤ 360 ms). Step is the tick-by-tick view and already shows the red rings per tick, so skipping frames in Run loses no teaching. The reduced-motion branch is correct. If the design lead wants a slow replay as a deliberate exception, she writes it in `2026-10-13-design-lead-decisions.md` §1; the code today is an unwritten exception.
- **M2. Cell floor is 6 px; code goes to 5.85.** `Fit` shrinks the grid to 240 px and the viewBox is 41 units (40 + 1 margin), so a cell is 5.85 px. The comment says "6 px, the format's floor". Floor at 246 px (`Math.max(246, …)`), or drop the margin to 0.25 on each side (40.5 units, 5.93 px) and floor at 243. If the stage then overflows on the shortest phones, the platform's stage scroll takes it; do not go below 6 px.
- **M3. Red ring at 6 px: pass.** Ring r 0.65 cells (diameter 7.6 px at 5.85 px cells, 9.1 px at 7), stroke 0.2 cell (1.2 to 1.4 px) in `--bad` (text-safe: 5.9:1 light, 7.6:1 dark). The ring is a shape distinct from the filled and hollow marks, so it is not colour alone. Only change: stroke 0.2 → 0.24 (1.4 px at 5.85) so the ring survives anti-aliasing at the 6 px floor.
- **M4. All-like tint at 6 px: pass in dark, weak in light for group A.** Tint is a 30% fill of the whole cell under the mark and reads as blocks (see the 30% / 50% / 70% frames in the sheet). Its meaning is also given as a number in the rule line ("35% all neighbours like"), so it is not load-bearing alone. Limit: group A's colour is the lesson domain colour (`--domain`, Money #80cbc4), about 1.7:1 against the light `--bg`, so in light mode group-A marks and tints are pale, while group B (`--warn`, #7d5200) is strong. See M5.
- **M5. Group A fails 3:1 in light mode.** `.a { fill: var(--domain) }` and `.a.hollow` stroke are a graphic object the learner must see (WCAG 1.4.11, 3:1), and `system.md` already says `--domain` is a pastel (1.1 to 2.4:1 on light). Shape (square vs circle) is the identity cue, so group A is distinguishable, but its marks are faint. In light mode use `color-mix(in srgb, var(--domain) 45%, #000)` for `.a` fill and stroke (the mix `system.md` gives for text, 5.8 to 7.9:1 on all ten domains) and keep `--domain` in dark. This is a CSS change, so the platform engineer ships it with the lesson's builder; I do not (my rule: no CSS without the platform engineer). The tint (`.a.tint`) takes the same colour at 30%.
- **M6. Accessibility labels.** The grid SVG label is good ("Tick 13: 77% like neighbours, …"). The chip group has a label ("Moves if like neighbours under"); give each chip `aria-label="Moves if under 30% like neighbours"` and `aria-pressed`, as herd-immunity does. Not blocking if already so in code outside the lines I read.

Group identity at colour-blind: group A teal vs B amber/brown differ in hue **and** lightness (brown darker), and in shape (square vs circle), so deuteranopia, protanopia and tritanopia all keep two separable groups. Pass.

## Reconciled constants: the network-stage pair

For the design lead to write `company/design/concepts/network-stage.md` (approved once the changes above land). The second lesson copies the first's constants; these are the values that survive review. "News" and "Enemy" columns are what each lesson changes to.

| Constant | Value for the concept | news change | enemy change |
|---|---|---|---|
| viewBox | 340 × (≤ 300), scale ≥ 0.95 at 390 × 844 | N1 | none (284) |
| Node | **circle r 16**, 2 px `--fg` stroke, `--bg-2` hollow, `--fg` fill for "on"; no squares in batch 1 | r 15 → 16; squares to circles (N3) | none |
| Node label | 15 px, 800 weight, `--fg` on hollow, `--bg` on filled | 14 → 15 | none |
| Edge | plain 3 px solid; weak 2 px dashed `6 5`; context edges `--muted` 3 px (not `--line`: fails 3:1) | dash `8 5` → `6 5` | none |
| Handle (drawn) | **r 13 (26 px) disc/pill**, 2 px `--fg` border, `--bg-2` fill; filled `--good-fill` with `#0d0f14` glyph when "on"; glyph 15 px 800 weight | pill 26 stays; glyph 15 stays | r 12 → 13; glyph 17 → 15; border 1.5 → 2 |
| Handle hit | 44 × 44 CSS px native `<button data-qa="control">`, centred on the handle | already 44 (a `Control`) | already 44 |
| Spacing | handle to handle, and handle to node centre, ≥ 48 CSS px at the scale it renders | N1 | R = 135 gives 49.0 |
| Legend | one line under the stage, 0.8 rem `--muted`, 14 px SVG swatches built from the stage's own classes, ≤ 6 words | none | E1 (swatches) |
| Set emphasis | tint or dashed outline, never a second colour on every node | N5 | E2 |
| Ink on bright fills | `#0d0f14`, never `var(--bg)` (light `--bg` is near white) | N4 | already so |
| Motion | ≤ 300 ms, no position animation, global reduced-motion rule | N6 | none |
| Live announcement | visually hidden `aria-live="polite"` line for count changes | caption is already live | E5 |

## Rule-text amendments for the design lead (asked, not made: the rulings file is hers)

- **A1.** §2.2 and §2.5: add "node r 16, label 15 px, handle r 13 drawn" as the numbers (the rule says ≥; the pair now agrees on exact values, so the kit has one set).
- **A2.** §2.3: "context edges `--muted` 3 px". `--line` measures about 1.5:1 on light and about 1.4:1 on dark and cannot carry an edge a learner must follow.
- **A3.** §2.5 and `system.md`: add "ink on `--*-fill` is `#0d0f14`, not `--bg`" (the light-mode `--bg` fails on bright fills; N4 found one). I am adding the legend-swatch rule to `system.md` as proposed in her specs record; that edit is mine and is not made in this review.

## Handed to the accessibility reviewer (not ruled here)

- Whether `aria-pressed` on a toggle whose label already states its state (enemy handles) is acceptable, and the N7/E5 live-region wording.
- Light-mode `--accent` (#7c9cff, 2.6:1 on white) as a graphic: used by the news A–B pill border, news path tint and the enemy ring, all redundant today; a token-level fix is the platform engineer's.
- Final sheet check at 390 px for the news broken state (N8) and 320 px for enemy handle overlap (E3).
- Dark-mode screenshots: all three lessons were only seen in the light theme sheets. Token arithmetic says dark passes everywhere I checked (ink `#0d0f14` on `--good-fill`/`--bad-fill`; `--fg`, `--muted` on `--bg-2`); a screenshot check has not been done.

## Objections and what happened to them

- **"Dropping squares loses group identity."** Position and the single bridge separate the groups, and the legend has no room (25 words); a shape that needs a legend entry nobody has room for is decoration. Kept as change N3.
- **"Ring replay at 120 ms is the point of the lesson."** Step is the tick-by-tick view; Run is the fast path. The 400 ms rule protects the QA wait, so M1 stands unless the design lead writes the exception.
- **Possible: "the height-bound box is deliberate, to fit the controls on screen."** Agreed that fit matters; the rule is a floor on node size and spacing, so the fix is to make room elsewhere (N1), not to shrink the graph.
