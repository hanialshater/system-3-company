# Change note: Books renderer accessibility fixes B1–B4 (for principal-engineer re-read)

author: platform-engineer · date: 2026-10-16 · branch: fix/books-a11y-b1-b4 (follow-up, not part of PR #5) · base: fe7fc958 (PR #5 head)
tier: 2 (engine used by 100 lessons, EDD-010) · readiness: company/engineering/readiness/2026-10-16-books-a11y-b1-b4.md (not yet approved)
findings fixed: B1–B4 in the accessibility record `company/reviews/books-100/2026-10-16-pr5-accessibility.md` (in /home/user/s3c-pr5-a11y, branch review/pr5-a11y; not on this branch)
why you are reading it: your PR #5 review (`company/engineering/reviews/2026-10-16-pr5-engineering-review.md`, in /home/user/s3c-pr5-pe) says any change to `src/lib/books/` or `src/components/books/` after fe7fc958 comes back to you for a diff read.

## The diff (four source files, one test file)

| File | Change |
|---|---|
| `src/components/books/BookIdeaLesson.tsx` | **B1** case buttons `disabled={locked}` only (was `locked \|\| active === i`). Pressing the active case again is already a no-op (`apply` early return, unchanged). `aria-pressed` was already there. **B2** svg `aria-label={describeScene(spec, active)}`. **B3** new visually hidden `<p aria-live="polite" aria-atomic>` with `announceCase(...)` (empty while locked); the visible Seen `<div>` loses `aria-live`/`aria-atomic` and gains `{" "}` between items. |
| `src/lib/books/model.ts` | New pure `describeScene(spec, active)` and `announceCase(spec, active, seen)`. No change to `calculateModel`, validation, observation state or any existing export. |
| `src/components/books/books.module.css` | **B1** `.control.active:disabled` → `.control.active` (same 2px `--fg` border), plus `cursor: default` on an enabled active button. **B4** case buttons 12→13 px with padding 6→4px 3px, line-height 1.15→1.1, row gap 5→4 px; "Toy model" 12→13 px; Seen 11→12 px. New `.status` visually-hidden class. SVG text sizes unchanged. |
| `src/lib/books/README.md` | One paragraph on the above. |
| `tests/books/a11y.test.mjs` (new) | Neutral name never contains a family key; one exact description per family; live text names the case and keeps or omits the unit; every shipped `bk-*/idea.json` yields a complete description (no `undefined`/`NaN`/`?`) naming its scenario, for both cases. |

## What the description may say (B2 content boundary)

`describeScene` restates only what the picture already draws: payload `labels`, `unit`, scenario `label` and input `values` (all addressed by each lesson's `.toy` derivation claim: `idea.scenarios`, `idea.labels`, `idea.unit`; checked in all 100 metas), plus outputs and traces from `calculateModel` (the same numbers the picture shows). Connective words are structural only ("Stations in order", "Lowest", "Start", "each", "Together", "From the origin", "Level", "Result"). No new fact is introduced, and no `idea.json` or `meta.json` changed. Example: "Case B, Fifteen-minute batches. From 0 to 60: 3 × (2 Overhead + 15 Work). Result: 45 work minutes." Longest across 200 cases: about 160 characters. The neutral name is "Toy model picture. Values appear when you choose case A or B."

## Evidence (all on this branch's source, own build `.next-b14` on :3561; baseline fe7fc958 built as `.next-b14-base` on :3562; both `next build --webpack`; both servers stopped, build dirs removed)

| Check | Before (fe7fc958) | After |
|---|---|---|
| `node --import ./tests/lifehacks/register.mjs --test tests/books/*.test.mjs` | 12/12 | 16/16 |
| `npm run check` / `tsc --noEmit` | pass / pass | pass (1074 lessons, 5794 claims, 3 inherited warnings) / pass |
| Playwright: focus after Enter on Case A, then Tab + Enter on Case B, then Enter on B again (100 lessons × 390x844 light and 320x568 dark) | `<body>` 200/200 | on the pressed button 200/200 after A, after B and after the repeat; `aria-pressed="true"`; name unchanged by the repeat |
| Neutral picture names containing a family key | 100/100 | 0/100 |
| Live-region text after A / after B | "SeenA: 40 work minutesB: ? work minutes" | "Case A: 40 work minutes" / "Case B: 45 work minutes" (100/100 name the case) |
| Smallest HTML text in the stage | 11 px | 12 px (Seen); buttons and "Toy model" 13 px |
| `tools/a11y-scan.mjs` over all 100 `bk-*` | 100 pass; findings only app target-size (100 fix + 200 fail) and kit focus/reading-order (300 fix); 0 lesson findings; min contrast 5.07; reveal reached 100 | identical counts and categories; 0 lesson findings; min contrast 5.07; reveal reached 100 |
| Stage fit, explore after A and B: answer line / Seen row visible without scrolling the stage (per lesson) | 320x568: 77 / 0; 360x640: 100 / 100; 390x844: 100 / 100 | same lessons in every cell (set difference empty) |
| Reveal fits the viewport at 320x568 (per lesson) | 65 | same 65 lessons |
| `tests/qa/contract.spec.ts`, QA_ONLY = all 100 `bk-*`, phone + desktop | not rerun | 200/200 pass |

A first try at 13 px buttons with the old padding wrapped long labels to four lines at 320 px (button 74 px tall) and hid the answer line in 5 more lessons at 320x568 and the Seen row in 1 lesson at 360x640. The tighter padding and a 12 px (not 13) Seen row remove that loss; that is why B4 is only partly met (see Open).

## What I believe

- B1 and B2 are fixed in all 100 lessons; sure (measured by keyboard in a browser, both widths).
- B3 is fixed as markup; fairly sure it reads well, but no screen reader was run (VoiceOver/TalkBack remain open from the a11y record).
- No regression to the contract, the scan or stage fit; sure for the measures above. Not run: full `npm run verify` and QA on non-Books lessons (no shared file outside `src/components/books` and `src/lib/books` changed).

## Open

- B4 partial: Seen is 12 px, not 13; SVG text still scales to about 10 px at 320 px wide (at the W-289 10 px floor, `company/design/system.md`). A larger SVG floor needs a design decision and an overlap review across 100 pictures. Owner: accessibility-reviewer / design.
- Readiness approval by principal-engineer-ops before this ships, and your diff read. Merge order: after PR #5, or rebase if PR #5 changes these files.
- Real screen-reader pass (accessibility-reviewer).
