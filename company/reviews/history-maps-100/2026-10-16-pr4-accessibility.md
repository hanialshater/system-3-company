# PR #4 History maps (100 draft lessons + /history-maps): accessibility scan

reviewer: accessibility-reviewer · date: 2026-10-16 · head: 57aef500 (branch pr4/a11y) · board W-1560 · not a merge blocker (matrix: required before publish)

## Verdict

**PASS WITH FIXES for merge as drafts. FIX BEFORE PUBLISH: two items fail outright (H1 light-theme contrast, H2 index light-theme contrast). No lockout found, so no launch block.** Every lesson can be finished by keyboard alone, every control has a name, the map has `role="img"` and a label, nothing moves, and no horizontal overflow at 390 or 320. But the History accent `--domain` (#d9b26f) is used as text colour in the stage and the index and is 1.7-1.9:1 in the light theme, and the A-versus-B map regions differ by hue only. The scan's automatic verdict is `fail` for 100/100 lessons; all 100 fail for the same single lesson-origin reason (H1), plus shell findings that exist on published lessons too.

## How this was done

- Built the PR head in my worktree (`next build --webpack`, `NEXT_DIST_DIR=.next-a11y`), served on my own port 3524 (dispatch-check `--kind=build` OK after passing `--worktree`; it must be run from the main checkout root, not from the worktree). Dist dir deleted, `tsconfig.json` reverted, node_modules symlink removed.
- `node tools/a11y-scan.mjs <all 100 map-* slugs> --base=http://localhost:3524` (390x844; keyboard, names, contrast in dark and light at predict/explore/reveal, targets, reduced motion, colour cues). 100 of 100 scanned. Raw JSON was not committed (scratch copy: `/tmp/claude-0/-home-user/b262453e-81f5-572c-a052-31323bc34d63/scratchpad/pr4-all.json`).
- My own Playwright probe (`.../scratchpad/probe.mjs`) over **14 lessons** at 390x844 light and 320x568 dark (28 runs): names locked/earlier/overlay, focus after Lock and after pressing a year button, button sizes, SVG text size, text overflow, horizontal overflow, shape colours. Lessons: rome-athens-100-400, mexico-city-oaxaca-1492-1530 (longest label, 48 chars), warsaw-krakow-1700-1920, vientiane-luang-prabang-1800-1900, new-york-boston-1700-1900, makassar-ternate-1600-1900, lima-potosi-1530-1800, herat-kabul-1400-1700, cusco-quito-1492-1530, oslo-copenhagen-1800-1920, jakarta-surabaya-1600-1800, marrakesh-fez-1200-1500, kathmandu-patna-1700-1900, nouakchott-saint-louis-1900-1960. Chosen for label length, relation type (same, different, unlabelled) and spread across regions (not every one of the 10 regions was checked).
- The `/history-maps` index at 390 light, 390 dark, 1280 light, 1280 dark: structure, 8 Tab stops, sizes, colours. Looked at screenshots of the index (390 light) and two lessons.
- Read `HistoryMapStage.tsx`, its CSS, `src/app/history-maps/page.tsx` and its CSS, one `Demo.tsx` (all 100 use the same shape; spot-checked 3).
- Not done: no real screen reader; no 200% text zoom; the index at 1280 was probed by DOM and a screenshot was not viewed; no colour-blind simulation image (colour findings are from computed values); the other 86 lessons were covered by the scan and the shared code, not by the probe.

## Findings: shared stage (`HistoryMapStage.tsx`, `Demo.tsx`) and index

| id | severity | where | finding |
|---|---|---|---|
| H1 | **fail (publish)** | `history-maps.module.css:3` (`.locations b, .labels b`), `:9` (`.trace b`) | Year, "A"/"B" markers and the year buttons' neighbours use `var(--domain)` as TEXT. For History that is #d9b26f: **1.73:1 on the light stage background (needs 4.5)** in all 100 lessons, at explore and reveal (scan, 800 findings). Dark passes (8.75:1+). Scan flagged the "A", "B" and both year labels. Fix: use `--fg` or a text-safe dark gold in light (e.g. a `color-mix` toward `--fg`, or a `--domain-text` token), keep gold as the accent decoration only. |
| H2 | **fail (publish)** | `src/app/history-maps/history-maps.module.css` `.eyebrow`, `.hero h1 em`, `.years`, `.heading > span`, `.index a:hover` | Hard-coded `#d9b26f` text on the light page (#f6f7fb / white cards): **1.86:1 / 1.99:1**. Affects the hero "Another map.", the card year spans ("100 → 400", 12px) and the group numbers. Eyebrow uses `var(--domain, ...)` which here resolves to #7c9cff: **2.43:1** in light. All pass in dark (8.75-9.63:1). Same fix: text-safe gold in light. Large hero text needs 3:1 and still fails at 1.86. |
| H3 | **fix (high)** | `Demo.tsx` `disabled={locked \|\| state.mode === i}` | Same defect as Books B1: the year button you press is disabled, so focus drops to `<body>`. Probe: focus is BODY after Enter on the first year button in **28/28 runs**. The path needs three presses (earlier, later, overlay), so a keyboard or switch user falls out of the stage three times and must Tab from the brand link again. Fix: no `disabled` for the pressed state; `aria-pressed` already exists; make the handler a no-op when `state.mode === i`. Applies to all 100 `Demo.tsx`. |
| H4 | **fix (high)** | `HistoryMapStage.tsx` colour(), shapes | **A vs B regions are told apart by hue only.** `focus: "a"` and `"both"` stroke green (`--good`), `"b"` stroke `--domain` gold, others muted. In dark, green #4fd1a5 vs gold #d9b26f differ by 1.04:1 luminance, so under red-green or greyscale vision they are one colour. In light the B shape (gold, fill 0.32, stroke 0.9 on white) is 1.84:1 against its background, nearly invisible. There is no pattern, label or marker on the map saying which region belongs to A and which to B; the only link to the label text below is the colour of the "A"/"B" letters, which is gold-on-bg for both (H1). Fix: add a non-colour cue (different dash pattern or fill hatch for A vs B; a text label on the shape; or a legend that does not rely on colour) and give the strokes at least 3:1 against the map background in both themes. Counts across 100 lessons: 104 "both", 89 "a", 89 "b", 1689 "other" shapes. |
| H5 | **fix (medium)** | `HistoryMapStage.tsx:34` (`role="img"` + `aria-label`) | The map's name says only the year ("Rome / Athens: 100") or "earlier outlines over later fills". What the picture teaches (which label covers A and which covers B, same or different, and where coverage is missing) is outside the accessible name; the `<title>` on each `<path>` ("100: Roman Empire · approximate reconstruction") is unreachable because `role="img"` hides its children, and titles are hover-only for sighted mouse users. The text row below the map (`A = B Roman Empire`) is visible DOM and a screen reader can read it by browsing, but it is **not in the live region**, so pressing a year announces nothing about the labels. Locked name "fixed dots, commit a prediction to view historical labels" is fine. Fix: append the relation and labels to the label ("Rome / Athens, 100: A and B both Roman Empire"), and/or put the `.labels` row inside the live region. Overlay mode shows no label row at all; the name should say the labels are hidden in overlay. |
| H6 | **fix (medium)** | `HistoryMapStage.tsx:56-58` | The "Snapshots visited" element is `<div aria-label=... aria-live="polite">` with no role: an `aria-label` on a role-less div is not reliably exposed, so the live region has no name. Its text is "100 Same label400 —" (no spaces between spans; probe textContent `100 Same label400 —`), so it reads as one run and repeats both snapshots on each press without saying which just changed. Fix: add `role="status"`, put a space between spans, and announce "1920: Different labels". |
| H7 | fix (medium) | `Demo.tsx` year/overlay buttons (shared `.control` kit) | Buttons are 59x35, 51x35, 79x35 px at 390 (and 320): above the 24px floor, under the 44px target; same for kit controls in all 100 lessons. Mexico-City-style lessons keep three on one row without overflow. Raise `min-height` to 44px in the stage row. |
| H8 | fix (low) | `history-maps.module.css:2,4,5,6,8` and index CSS | Small text: map A/B and caption text drawn at **10.7px** at 390 (12px user units scaled 0.89), 10px caption, 11px `.labels`, 12px trace and locations. Index: 11px chips, `.open`, `.heading small`, `.footer`, eyebrow; 12px card years and note. Nothing is clipped or overlapping at 390 or 320 (probe: `scrollWidth` vs `clientWidth` 0 overflows, no page scroll); 10-11px is under the company floor (see W-289). |
| H9 | note (check manually) | `title` on `.labels span` | Full label lists ("2 overlapping labels" expand to names) are only in `title` attributes: no touch or keyboard access. When a case has "N overlapping labels" (e.g. mexico-city-oaxaca B), the names are invisible to touch and keyboard users and to most screen readers. Put the names in visible or visually hidden text. |

## Findings: `/history-maps` index

| id | severity | finding |
|---|---|---|
| I1 | fail (publish) | H2 above. |
| I2 | fix (medium) | Target sizes: brand link "S3" 38x29, "All subjects ↗" 84x16 (under the 24px floor on height); regional chips are 133-159 x 32 (24 passes, 44 not); the 100 cards are 354x119 (fine). The scan's `a.brand-link "Map"` 29.9x17 and trust button 221x23 are shell findings, on published lessons too. |
| I3 | note | Structure passes: one `<main>`, one `<h1>`, ten `<h2>` (one per region, 10 cases each), `lang="en"`, title "History map lab — System 3", the chip nav has `aria-label="Regional groups"`, anchors target section ids. The top nav has no label (two navs on a page: unlabelled and labelled; add `aria-label="Site"`). Tab order follows the visual order (S3, All subjects, 10 chips, then cards); focus ring is the browser default `outline: auto 1px` (visible in the screenshot, a dark box on light). Card focus uses only a border colour change (`.card:focus-visible { border-color: #d9b26f }`) in addition to the default outline, so the ring remains. The "↗" arrow is `aria-hidden`; the "All subjects ↗" link text reads "All subjects, up-right arrow" (add `aria-hidden` to that arrow). Cards read as "100 → 400 Rome / Athens Compare the maps": the "→" is read aloud as an arrow; acceptable. |
| I4 | pass | 390 and 1280, light and dark: no horizontal overflow; reading order sound; 100 card links, every one named. Muted text (#5d6578 light, #9aa3b5 dark) passes. Reduced motion: no animation or transition in the page's CSS (no `transition`, `animation` or `scroll-behavior: smooth` found in either file). |

## What passed (shared stage)

- **Keyboard:** all controls are native `<button>`; Tab/Enter/Space work; predict -> explore -> reveal completes by keyboard in 100/100 (scan `revealReached`). SVG is not focusable (0 focusable descendants), correctly, since it is a picture.
- **Names:** every button has visible text as its name (a year or "Overlay"), `aria-pressed` reflects state; the locked, per-year and overlay map names all differ and read in words. (The stage's `aria-disabled` on the kit div does nothing: known kit issue.)
- **Contrast, dark:** all text passes (lowest in scan after exclusions is above 4.5; dark gold 8.75:1). Light: only the H1 `--domain` text fails; `--fg` and `--muted` on `--bg-2` pass.
- **Reduced motion:** the stage has no animation; scan: 0 running animations, 0 idle DOM mutations with reduce set, in 100/100.
- **Responsive:** 14 lessons at 320x568 dark: no horizontal overflow, no truncated label spans, the longest label (Mexico City / Oaxaca, "Mexihcah (Triple Alliance)" and "2 overlapping labels") wraps inside the grid. The stage scrolls internally at 320x568 (stage `scrollHeight` 305 vs 187; kit behaviour, not this PR).

## Kit and shell findings every lesson inherits (not this PR; route to the kit/app owners)

Reported identically for 100/100 and for the Books lessons (B5-B7 in company/reviews/books-100/2026-10-16-pr5-accessibility.md): focus falls to `<body>` after "Lock it in" and after "Show me why"; DOM order puts the stage before the question; locked-stage text is dimmed under AA; `Map` link 29.9x17 and trust button 221x23 under the 24px floor.

## Per-lesson findings

All 100 slugs have the same findings: the 12 scan lines listed above and nothing lesson-specific beyond them. No lesson differs in the scan from another (the 100 lesson-origin contrast failures are one cause, H1, each lesson reporting 8 instances). The probe found no lesson-to-lesson variation in focus, overflow or naming across the 14 sampled.

## Fix list for the platform-engineer (owner: platform-engineer; this PR's code)

1. H1 + H2 + H4 (contrast): replace `var(--domain)` and `#d9b26f` TEXT in the stage and index with a text-safe colour in light (at least 4.5:1; hero text at least 3:1). Add a non-hue cue for A vs B regions and 3:1 strokes. Re-scan.
2. H3: stop disabling the pressed year button (`Demo.tsx`, all 100 files, or fold into a shared wrapper so it is fixed once). Re-probe: focus must stay on the button.
3. H5 + H6 + H9: name the map with the labels and relation; `role="status"` and spaces in the trace; expose overlapping-label names outside `title`.
4. H7 + H8 + I2: 44px stage buttons; lift 10-11px text; index chip and top-nav targets.
5. Kit/shell items go to the kit and app owners.

## Open

- No real screen reader (VoiceOver, TalkBack, NVDA) run; H5 and H6 are inferred from markup and DOM text.
- No 200% zoom and no colour-blind simulation image; H4 rests on computed colour values.
- 86 of 100 lessons were checked by the scan and shared code only, not by the probe.
- Re-scan after fixes: `node tools/a11y-scan.mjs <slugs> --base=<own port>`.
