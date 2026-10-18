# Engineering Review: 2026-10-16: Books renderer a11y fixes B1–B4 (re-read)

owner: principal-engineer (Kenji) · tier: 2 (`src/components/books`, `src/lib/books`: the shared renderer for 100 lessons) · trigger: my PR #5 review asks for a re-read whenever `src/components/books` changes ([PR #5 review](2026-10-16-pr5-engineering-review.md))
change: `fix/books-a11y-b1-b4`, one commit `b3beca16` (platform-engineer) on `fe7fc958` · defects fixed: B1–B4 in `company/reviews/books-100/2026-10-16-pr5-accessibility.md`
integrated: merge commit `a437361a` on `worktree-agent-a4cfd34bc12839f51` (base `cdee168c`, main with PR #5 merged)

- EDD: none needed. This is the defect fix the EDD-010 renderer's accessibility review asked for, inside the same module. No new data shape, dependency, route, event or kit change.
- [x] The problem is real and measured: the a11y record's probe found focus on `<body>` in 100/100 lessons (B1)
- [x] Blast radius: all 100 `bk-*` lessons (one renderer); nothing outside `src/components/books`, `src/lib/books`, `tests/books`, records
- [~] Readiness: `company/engineering/readiness/2026-10-16-books-a11y-b1-b4.md` exists; approval by principal-engineer-ops is theirs to give (not checked off here)
- [x] Rollback is one revert: `git revert -m 1 <merge>` (or `git revert b3beca16`); no data or registry change
- [~] Verify on the integrated tree: `npm run test:books` 117 tests (417 incl. subtests) pass, `npm run typecheck` pass, `npm run check` pass (1075 lessons, 5818 claims, 3 inherited Life Hacks warnings). Build and computer-use QA **not run by me** (see F5)
- [x] Security, privacy, licences: no dependency, network, storage or event change

## Method

Artifact before account. I read the code diff (`git diff fe7fc958 b3beca16 -- src tests`) and the full renderer and model at `b3beca16`, checked `describeScene` line by line against `CausalPicture`, read `tests/qa/contract.spec.ts` for how the QA contract treats enabled controls, scripted a label-count check over the 100 shipped `idea.json`, merged and ran the checks. Findings F1–F7 were written before I opened the change note `company/engineering/reviews/2026-10-16-books-a11y-b1-b4-change.md`. The section "The change note" was written after.

Merge: one conflict, `company/ops/changelog.md` (main had added the M1/M2 entry at the top). Resolved by keeping both, the B1–B4 entry first. `git diff fe7fc958 cdee168c -- src/components/books src/lib/books` is empty, so main changed nothing the fix touches; main added `tests/books/payloads.test.mjs` and `test:books` in `package.json`, so the new `tests/books/a11y.test.mjs` now runs inside `verify`.

## Findings (problems, not fixes)

**F1. B1 is fixed; Reset still drops focus the same way (low, follow-up).** The case buttons are now `disabled={locked}` only, and `apply` returns early when `observation.active === which` (`BookIdeaLesson.tsx:43`), so the pressed case keeps focus and does nothing. Correct. But Reset disables itself on every press: after a reset, `canResetObservation` is false in both branches (`active` becomes `null`, or `0` with both seen; `model.ts` `canResetObservation`), so the focused Reset becomes `disabled` and focus falls to `<body>`, the B1 pattern. It is pressed at most once or twice per lesson, and the a11y record listed "Reset is disabled until there is something to reset" as a pass, so this is not a regression and not blocking. Owner: platform-engineer, confirmed by accessibility-reviewer (board item).

**F2. The QA contract now presses an enabled no-op button, and passes only because of order (note).** `tests/qa/contract.spec.ts:71-94` clicks every enabled stage control and fails any that changes nothing. The active case button is now enabled and a no-op. In the contract's order (Case A, Case B, Reset) no button is pressed while active, so it passes, and the a11y fix is right. If the order or initial state ever changes (for example a lesson that starts with case A shown), the contract will flag the pressed case as dead. No action now; recorded so the next person reading a red "dead control" on Books knows why.

**F3. `describeScene` restates the picture faithfully (pass, two wording notes).** Checked per family against `CausalPicture`: flow highlights exactly the stations equal to the output, and "Lowest: …" names the same set; payoff, selection, network ("pictured" = `min(12, output)` = `nodes.length` in both branches), feedback (same U+2212 minus) and intervals (overhead then work, the drawing order) use the same inputs and `calculateModel` outputs as the drawn text. Compound lists every trace value where the picture labels only first and last; the other values are the dot heights, so this is the same information in words. Notes: "Stations" (flow) and "Level" (feedback) are model vocabulary the picture does not print; harmless for the 100 shipped payloads, but a future flow lesson whose boxes are not stations would read oddly. Claims: these sentences restate computed toy outputs, exactly like the SVG text, which is not tracked as claims; consistent with how EDD-010 treats picture text, so no new claim obligation.

**F4. Missing labels would produce broken names; covered by main's payload test (pass).** `describeScene` uses `spec.labels[i] ?? ""` like the picture, and the validator enforces label count only for flow. A payoff payload with one label would yield ". : 0.75 × …". All 100 shipped payloads carry the labels each family reads (my script), and `tests/books/payloads.test.mjs` on main now asserts it, so the merged tree is covered. The fix branch alone was not; this is why the merge order matters.

**F5. B4 font changes are not verified for fit by anyone independent (condition for publish, not for merge).** Case buttons 12→13 px with padding cut to 4px 3px and gap 5→4 px, `overflow-wrap: anywhere`; Seen 11→12 px; "Toy model" 12→13 px. With 22–23 character case labels at 320 px, the bigger font on a narrower box may wrap mid-word or grow the button. I did not run a browser. SVG text still scales to about 0.78 at 320 px (about 10 px); the a11y record said "consider", and this change does not address it. Seen at 12 px is still below the 13 px used elsewhere in the stage. The a11y record's own open item is a re-scan after fixes; that re-scan (accessibility-reviewer) and the computer-use QA on the integrated tree are required before these lessons are published. They are not engineering merge conditions.

**F6. Live region (B3) is right (pass).** A separate visually hidden `<p aria-live="polite" aria-atomic="true">` is always rendered (empty while locked), so it exists before its content changes; it names the case and keeps the unit, and is empty for `unit: ""` cases without a trailing space. The visible Seen row is no longer live and has spaces between items. After both cases are seen, Reset restores case A and the region says "Case A: …", which is true. No global visually-hidden utility exists in `src/app/globals.css`, so a local class is not duplication.

**F7. Tests are exact and cheap (pass).** `tests/books/a11y.test.mjs` pins one exact sentence per family, asserts the neutral name never contains a family key, and runs `describeScene` over all shipped payloads for both cases. The `\?` guard would reject a future scenario label containing "?"; none does today. Acceptable.

## The change note (read after the findings)

Read after F1–F7 were written. It agrees with my reading of the diff and adds browser evidence I did not produce: focus stays on the pressed button 200/200 (100 lessons at 390 light and 320 dark), live text names the case 100/100, `tools/a11y-scan.mjs` counts unchanged, stage fit per lesson unchanged at 320x568, 360x640 and 390x844 (set difference empty), and the QA contract 200/200 on the 100 lessons. What it changes in my findings:

- F5: the author measured fit and explains the tighter padding (13 px with the old padding wrapped to four lines and lost the answer line in 5 more lessons at 320x568). That lowers my concern but it is the author's own measurement. The re-scan by accessibility-reviewer stays a condition for publish. B4 is partly met by the author's own account (Seen 12 px; SVG text about 10 px at 320, at the W-289 floor), and that is routed to accessibility-reviewer and design, which I agree with.
- F1 (Reset drops focus) is not in the note. It stands as a follow-up.
- F2: the 200/200 contract run is consistent with my reading; the order dependency is still worth knowing.
- F4: the readiness record says `tests/books/a11y.test.mjs` is "not yet in verify". On the merged tree it is (main's `test:books`), so that line is out of date; not worth a new commit on its own.
- The note says the a11y record is not on its branch; it is on main now, and the merge picks it up.

## Decision

**Approve (engineering).** The merge `a437361a` stays on `worktree-agent-a4cfd34bc12839f51` for integration. The change is small, local to the Books module, adds pure functions with exact tests, and fixes a defect that hit every keyboard user in all 100 lessons.

Conditions (not mine to close; listed so they travel with this decision):
1. Before it merges to main: principal-engineer-ops approves `company/engineering/readiness/2026-10-16-books-a11y-b1-b4.md` (still pending; tier-2 rule in the template).
2. Before the 100 Books lessons are published: accessibility-reviewer re-scans the integrated tree (their record's open item) and, if possible, runs a real screen reader on B2/B3; qa-tester's integrated build and QA run covers this commit.

Follow-ups (not blocking):
- F1: Reset disables itself on press and drops focus to `<body>`. Owner: platform-engineer, confirmed by accessibility-reviewer.
- F3: if a future flow or feedback lesson does not fit "Stations" or "Level", make the connective words per payload or neutral. No owner until it happens.

Objections that travel with it: none raised by others. My own reservation is F5: the 13 px and padding trade-off was measured only by its author, and the re-scan in condition 2 answers it.

## Kudos (optional)

- @platform-engineer: the change note gave before/after numbers for every claim, including the failed first try at 13 px, which made this re-read fast and the trade-off visible.
