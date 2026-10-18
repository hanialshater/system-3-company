# Books +100: independent prototype validation plan

owner: evaluation-steward (Hilde)  
date: 2026-10-16  
status: manager dispatch source; no artifacts judged in this record  
scope: 100 additional draft Books demos on a PR; no publish or deploy

## Decision

The authorized deliverable is a reviewable draft PR, with all 100 additions functionally exercised on phone and desktop. It is not a launch submission. Use the existing `qa-tester`, `fact-checker` and `learner-evaluator` roles below; no new role or general-purpose checker is needed. One checker can finish several bounded batches sequentially. A batch means at most 15 lessons, not a new agent for each batch. Preserve source holds and report incomplete review explicitly.

This plan supplies the quality manager's answer before specialist dispatch, as required by `company/ops/operating-loop.md` §3. It does not amend protected paths or make a Books launch, format, WIP or copyright exception. Head of Product and cm-books own the prototype scope and any production-WIP interpretation. The existing Books standing-order exclusion is not silently lifted: these are explicit PR prototype batch items, not SO-10-1/2/3 queue additions.

## Inputs and build identity

The integrator freezes a machine-readable manifest of exactly 100 new slugs before checks. It records slug, path, version, work/book identifier, engine/interaction family and claim count. Compare it with the PR base: an existing demo is not an addition. Root fills the concrete manifest path, review URL and build identity into each brief below.

The integrator owns the build/server. Every run records its URL, build commit, dirty state if applicable, dist directory and the file hashes of the 100 lesson artifacts plus shared rendering code. A build made with uncommitted additions is labelled dirty and accompanied by those hashes; it is never represented as a clean committed build. A record that cannot name what was served is exploratory only. Do not restart or swap the server during a checker run; a changed identity stops the run. Never use a taken port to attach accidentally to another worker's server.

An independent checker may not be an author of the artifacts it reviews. Dispatch role identity does not erase prior authorship. The chief of staff/integrator alone maintains board, progress and events; specialists supply their handoff in their own review records. No specialist mutates git or protected paths for this task.

## Required breadth for this draft PR

| Work | Breadth now | Bounded runs | What remains held |
|---|---|---|---|
| Browser contract | Every addition, phone and desktop: 200 lesson/viewport results | 7 runs of 15/15/15/15/15/15/10 lessons, using the same qa-tester if convenient | Any failed, skipped or unexecuted case is named; no blanket pass |
| Exploratory browser QA | Every addition: reach the promised state and reveal, adverse control order/reset where present; phone reveal fit | Same 7 runs; existing exploratory checklist also covers each shared interaction family on small phone, keyboard and both themes | Shared-engine coverage does not substitute for per-lesson contract checks |
| Claim inventory and derivations | Every addition: visible claims mapped; toy results independently recalculated; book attribution and external evidence audited separately | Sequential fact-checker chunks of at most 15 lessons **and** 40 claims, whichever limit is reached first | All inaccessible/unconfirmed book or research source claims remain unverified; absence of a source is not verification |
| Borrowed-mind review | A representative pilot of at most 8 additions, selected from the frozen manifest to cover distinct families, strands and longer cases | One learner-evaluator run now; at most 8 lessons per later run | The other 92 or more have no learner review yet; all remain drafts |
| Design follow-through | Existing design lead receives the pilot findings, every new format/layout failure and the operating-loop 10% batch sample | Routed by the integrator through the design lead | No unseen-artifact layout or pedagogy approval in this plan |

If distinct interaction families exceed 8, pilot findings must say which families are not represented. Do not describe the pilot as full-manifest pedagogy coverage. The learner pilot can be smaller if artifacts fail to render; record exactly what was seen.

## Independence procedure

1. Start by running `npm run walkthrough -- <slugs> --url <review-url>`, then read the learner-visible transcript and screenshots/contact sheet. Cut the transcript **before** `## Appendix: trust sheet`: that appendix is an account, not the artifact. Do not read meta.json, build.md, design notes, CM rulings or another evaluator's verdict first.
2. Write first findings from the artifact to the role's review record, including the time and screenshots actually seen. An empty template is not findings. For learner review, state a chosen boundary such as an adult who can compare quantities and has not read the book; after findings, compare with the lesson's declared boundary.
3. Only then read meta.json and relevant support. Label later discussion `After reading the brief`. Builder notes may be opened only after initial findings, if needed.
4. Record specific problems and where they occurred. No 1–10 scores, no invented evidence, no claims that a simulated learner proves learning. A fatal falsehood/dead control/misconception travels with the draft until fixed or answered with a reason.
5. A changed claim/rendering path invalidates the affected finding or pass until rechecked against the new artifact. Do not overwrite a historical review into agreement with a revision.

## Dispatch Q — existing qa-tester (Rosa)

**Source:** this plan, approved by evaluation-steward.  
**Read first:** `CLAUDE.md`, `.claude/agents/qa-tester.md`, `company/roles/qa-tester.md`, `company/qa/computer-use-testing.md`, `company/reviews/README.md`.  
**Task:** independently test all 100 manifest additions on the named frozen production build. You did not build them. Generate/use walkthrough artifacts before reading their accounts. Work in consecutive manifest batches of at most 15. Use the current unmodified contract on phone and desktop with two workers:

```sh
QA_BASE_URL=<review-url> QA_ONLY=<comma-separated-batch> QA_OUT=<own-batch-report-dir> npx playwright test tests/qa/contract.spec.ts --workers=2
```

Use `npm run company -- qa-record` with the matching `QA_OUT` only after inspecting the actual report. Add `target: <review-url> · mode: external (PR review server) · built from: <identity>` under every record header; state a dirty build accurately with the recorded manifest hashes. The metadata changes permitted here are evidence links produced by qa-record, never status or claims. Do not change lesson code, tests, gates or git. Run the existing feed suite once on the complete served build without a draft-only `QA_ONLY` filter; preserve its result separately. A known filtered-feed issue is not a reason to edit the protected suite.

For every addition also reach the question's own case, check the reveal matches the values still shown, and try adverse control order/reset where controls exist. Inspect open-reveal fit at 390×844 and label legibility; record word/fit failures rather than shrinking text. Check small-phone 360×640, keyboard, reduced motion and both themes for every distinct shared interaction family and every per-lesson layout exception. State the exact scope of these exploratory passes.

**Outputs:** one real `company/reviews/<slug>/<date>-qa.md` per addition; per-phase screenshots and machine report in artifacts; `company/reviews/books-100/<date>-qa-summary.md` with an exact 100-slug coverage table and both viewport results, batch report paths, served identity, exploratory coverage, failures and next owner. No record for an unexecuted test is called pass. A failing run is filed; do not rerun until green without a diagnosed fix.

**Stop/route:** unknown/stale build, taken port, server identity changed or server down → integrator; repeated identical failures across more than 3 lessons → evaluation-steward and engineering owner, with affected counts. If the engine is fixed, repeat affected checks on the new build, preserving the failed evidence. Done means 200 actual contract results plus clearly described exploration, not 200 assumed successes.

## Dispatch F — existing fact-checker (Ingrid)

**Source:** this plan, approved by evaluation-steward.  
**Read first:** `CLAUDE.md`, `.claude/agents/fact-checker.md`, `company/roles/fact-checker.md`, `company/knowledge/README.md`, `company/reviews/README.md`.  
**Task:** artifact-first audit of the complete 100-addition manifest. Work sequentially in chunks of at most 15 lessons and 40 claims; split a high-claim lesson's audit if necessary and say which claim IDs were checked. Start from the walkthrough transcript without its trust-sheet appendix and screenshots, write visible-claim findings, then open metadata/support. Do not read the product or builder account in advance.

For each lesson distinguish (a) what a particular book argues and its bibliographic/chapter attribution, (b) later evidence about the world, and (c) the explicitly illustrative toy. Recalculate every toy scenario and correct-option/reveal/recall result independently; verify formulas at range boundaries as well as the default scenario. Confirm toy assumptions are visible and that an arithmetic result is not presented as empirical support for the book's real-world advice. Check visible factual sentences have claim addresses, including title/author/date and recall text. A proposed missing claim or correction goes to cm-books/builder; do not silently rewrite content.

Preserve **all unverified book/source claims** in this PR. Do not replace `unverified` with `verified` from familiarity, snippets, a citation string or a publisher page that was not actually read. Record the exact inaccessible source or missing chapter/evidence instead. Independently checked arithmetic can be described in the review, but that does not verify a book attribution. For this draft-prototype dispatch, leave existing claim statuses unchanged; list any proposed disputes in the review with their addresses so the integrator can route them. No code, git, protected-path, publication or deployment edits.

Check copyright against the binding Books rules: original wording/toys, no copied story/figure/exercise, no chapter sequence, no unsupported recommendation. If the manifest actually implements decks, inventory every learner-visible deck sentence and its gate-visible claim home, and run the quantitative copyright test per deck; a reviewer named by Head of Product must separately perform the synopsis reading. Do not call a single-idea demo a verified full-book summary or an approved deck.

**Outputs:** `company/reviews/<slug>/<date>-fact-check-prototype.md` for every addition, with artifact-first findings, claim-ID table, independently rerun calculations and exact source holds; `company/reviews/books-100/<date>-fact-check-summary.md` with full-manifest coverage and unreviewed/held/disputed counts. Claim verification is not required for creating this draft PR, but source gaps must remain visible and block launch.

**Stop/route:** own-authored claim → replacement checker via evaluation-steward; inaccessible source → record hold and continue independent checkable claims; material unsafe/false content → named fatal finding to cm-books and Head of Product. Do not invent the missing evidence to clear a batch.

## Dispatch L — existing learner-evaluator (Sam)

**Source:** this plan, approved by evaluation-steward.  
**Read first:** `CLAUDE.md`, `.claude/agents/learner-evaluator.md`, `company/roles/learner-evaluator.md`, `company/reviews/README.md`, `company/reviews/_template-learner-review.md`.  
**Task:** independently walk the integrator's representative set of at most 8 manifest slugs on the named build. The brief supplies only slugs, artifacts, version numbers and a knowledge boundary, not expected answers, book/engine rationales, CM rulings or builder notes. Run/read walkthroughs and see the actual contact sheets before reading meta.json. Strip the trust-sheet appendix first. Write first findings before consulting any account.

Use a stated boundary, initially an adult comfortable with basic quantities who has not read these books. Report the first point that asks for unknown knowledge, answer leakage, whether manipulation explains the promised cause, whether the reveal answers the learner's actual question, misleading book-versus-toy wording and any distinction between an unsupported source assertion and an observable toy result. Be explicit that this is simulated, not human learning evidence. No scores and no fixes.

**Outputs:** one `company/reviews/<slug>/<date>-learner-adult-book-beginner-r1.md` per actually seen lesson in the existing template, with `lesson version: vN`, `Screenshots seen: yes (<path>, <timestamp>)` and exactly one `Verdict: launch|revise|fatal`. `launch` describes that review's specific finding; it does not clear unverified claims, publication holds or this draft PR's remaining reviews. If screenshots cannot be seen, say `screenshots not seen` and give at most `revise`. `company/reviews/books-100/<date>-learner-pilot-summary.md` lists the exact reviewed set and the remaining manifest slugs as **not learner-reviewed**. No invented learner records for the rest.

**Stop/route:** no rendered artifact → integrator; contaminated brief/account read first → evaluation-steward for a fresh independent evaluator; changed build → stop and report. Do not turn a partial run into full-manifest pedagogy approval.

## Open conditions and handoff

- **To integrator:** freeze the 100-addition manifest, substitute concrete build/URL/paths and dispatch Q/F/L. Manager permission is supplied here for this bounded review task; no new founder approval is needed for the authorized draft PR.
- **To Head of Product/cm-books:** record whether these are idea prototypes or actual book decks, and how the 100 draft additions relate to the existing WIP/format rules. This plan makes no product exception itself.
- **To fact-checker/research owners:** inaccessible book chapters and empirical sources remain unverified. A toy derivation cannot clear either kind of source claim.
- **To design lead:** assess actual contact sheets after the learner pilot, with the existing new-format and sample requirements. No anticipated pass is issued.
- **To integrator:** run required repository check/verification on the final artifacts and include precise evidence and remaining holds in the draft PR. Publishing/deployment, source verification, full learner review and any unapproved deck/gate changes remain outside this deliverable.

Confidence: high in the validation route and boundaries because they follow the existing role and independence rules; no opinion on the unseen 100 artifacts. This is the steward's handoff to the integrator; board/progress/events remain the integrator's work.

Documentation check: `npm run check` passed after writing this plan (969 existing lessons, 5,299 claims, 99 roles; five existing disputed Life Hacks warnings). No code was changed by the steward.
