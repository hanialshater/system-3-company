# Books: 100 additional draft demos for the founder's PR

owner: head-of-product (Priya)
date: 2026-10-16
status: decided for this PR's product scope; format and evaluation owners answer their own surfaces
authority: founder's current explicit request, recorded in `company/decisions/2026-10-16-founder-books-100-pr.md`; Head of Product owns ordinary product scope and lesson-slot allocation
inputs: `CLAUDE.md`; `company/roles/head-of-product.md`; `company/domains/books.md`; `company/domains/books-strategy.md`; `company/decisions/2026-10-14-books-big-ideas-strategy-review.md`; `company/decisions/2026-10-14-book-deck-format.md`; `company/decisions/2026-10-14-w556-wave-gate.md`; `company/product/demo-standard.md`; `company/product/surface-value.md`; `company/constitution/constitution.md`; operating status on 2026-10-16

## Decision and counting unit

Deliver **100 additional runnable Books idea demos in one reviewable PR**. Prefer **100 distinct non-fiction books, one original interactive idea prototype per book**, chosen by cm-books and its strand managers. These are drafts that test ideas associated with books, not complete summaries, published lessons or approved book decks. The existing six Books drafts are outside the additional 100 and remain untouched.

Each new demo has its own slug, ordinary `Demo.tsx` and `meta.json`, a real predict → explore → reveal interaction and recall. A list of titles, 100 briefs, inert cards or 100 copies with only names changed does not satisfy this scope. The manifest must make every demo independently openable and identify its book, strand, concept, mechanism, source state and blockers.

The scope unit is a demo, not a production deck. One hundred complete multi-idea book summaries would multiply the requested artifact count and exceed what the founder asked. Conversely, calling a single idea a complete summary would misrepresent what was built. Learner-facing framing and the PR description must say which experience exists.

## The ordinary product amendments for this PR

This is the new written decision record required by W-556's “no further exemption without a new decision record.” It changes ordinary product allocation, not the constitutional publishing gate. The founder has already requested the concrete 100-demo PR; completing that scope does not require another permission question.

| Earlier rule | Limited amendment for this PR | What remains binding |
|---|---|---|
| W-556 holds ordinary new Wave K builds pending the drain measurements | The exact 100 additions in cm-books' dated PR manifest may be built as **draft prototypes on this PR branch**. They are a named one-time batch, not a declaration that the ordinary gate opened. | All other builds retain their gate/skip state. The exception adds no Wave L or later production slots. |
| At most 12 Books lessons in draft + review in total | Temporarily allow the existing 6 plus this manifest's 100, **106 cumulative draft/review artifacts** if all six remain drafts. This is an explicit accumulated-WIP exception, not an argument that branch files do not count. | Report all 100 as drafts. Do not put them into `review` en masse. General builder/host caps still apply; CoS schedules bounded work. No unrelated Books additions use the exception. |
| At most 2 decks in flight | These one-idea prototypes do not start 100 production decks. No production deck shells are built or activated by this scope. | The existing cap still applies to actual production-deck development and promotion. Review capacity is not expanded by this record. |
| A production book experience has 3–4 ideas, default 4 | A book may have one prototype in this draft PR without pretending its production deck is complete. cm-books records the future grouping, if any. | Never more than 4 ideas per book under the existing charter; count pre-existing ideas too. A future production deck must meet the original completeness, verdict and review requirements. |
| Strategy K1 stops expansion beyond the pilot when book access is absent | Missing book access does not prevent this bounded **draft prototype** commission. Source-dependent attribution stays explicitly unconfirmed and blocks publication. | K1 continues to hold ordinary production expansion. F1 is not answered, and no prototype acquires a verified book claim through this exception. |

This amendment is confined to the manifest and ends when the PR is completed or withdrawn. The files do not disappear then: remaining drafts are a parked prototype bank, fully counted on disk, with no automatic promotion. Before any of them enters the normal review lane, cm-books and CoS name the picks and reconcile the ordinary caps in writing. No sequence of cosmetic commits or fabricated batch completions is needed to make 100 files look like 12.

This does not release the old conditional 60-slot tranche, change Surface Value, update the roadmap outside Cycle Planning, or exempt any protected path. It pays for this requested draft deliverable rather than claiming 100 additions toward the published-lesson target.

## Conditions on the actual demos

1. **Selection is the CM's.** Respect the non-fiction/refuse list, publication age, all three strands and subject ownership. No health, investment or legal advice. Sensitive society or mind topics still need the existing cultural route before build; select other books where that route cannot be completed. Existing overlapping engines need a distinct question and learning payoff, not merely a book attribution. `content/works.json` acceptance remains courses-lead's surface; route proposed works to that role.
2. **Use an approved format.** Design-lead rules on the format available now. This product ruling does not approve `CardSequence`, a deck shell, kit changes or a new format. A one-card prototype is a draft exploration of its idea, not a waiver for production multi-card requirements. Shared implementation may remove boilerplate, but each toy needs a meaningful mechanism and its own misconception.
3. **Distinguish three claim families.** Record toy arithmetic/observations, book attribution, and real-world evidence separately in each `meta.json`. Every factual sentence displayed to a learner has an address, support and source; builder-authored claims remain `unverified`. A general toy's derivation never verifies that a particular book makes the claim or that the toy predicts the world.
4. **No fabricated access.** Book claims cite the edition/chapter only to the extent actually known; the chapter stays `(unconfirmed)` until independently checked against a copy. Do not invent a page, chapter number, quotation, retrieval date or verification. A publisher blurb may establish bibliographic metadata; summary apps, memory and model recall never verify what the book argues. Put the missing chapter check and expected source route in the manifest/chapter sheet.
5. **Evidence verdicts must mean what they say.** Keep “Does it hold up?” separate from book attribution. A derivation supports only the stated toy assumptions. Do not invent a research verdict, label an inaccessible literature “untested”, or turn a guessed replication result into a number. If the real-world verdict is unavailable, state that it remains unverified and preserve the publication blocker. The shared six verdict labels and quotas remain requirements for completed production decks; do not manufacture favorable or negative verdicts to fill a quota.
6. **Copyright limits apply while drafting.** Our language and our toy models only: no book paragraphs, close sequential paraphrase, copied exercises, stories, figures, cover art or author photos. At most 20 words per idea describe what the book argues; no quotes are needed. Future deck limits (120 words, at most four ideas, concatenation test by an independent reader) continue to bind. F2's legal read is not resolved by producing a PR.
7. **Keep the kit and phone contract.** Commit before exploration, meaningful controls, earned reveal, disclosed assumptions, state-derived reveal numbers, ≤25 stage words and ≤90 reveal words, legible phone fit. No new dependencies. Write pre-flight/build evidence honestly; never create a review or QA record for a run that did not happen.

## Completion and promotion are different decisions

The PR is complete when it contains the 100 working additions, CM manifest/briefs and attribution records, relevant registration, design/evaluation rulings and reproducible validation evidence. Run `npm run check`, code verification and the applicable computer-use QA through the existing roles. Independent reviewers see walkthroughs before builder accounts. Report which of the 100 were actually walked, QA'd and fact-checked, and which remain held; do not generalize a spot check into a 100-demo pass.

Opening the PR does not assert publication readiness. Every new `meta.json` stays `draft`. No `publish-ready`, deployment trigger, `[deploy]` commit or production exposure is authorized. F1 and F2, independent fact-checking, current-version QA, borrowed-mind review, deck-level claim gates, reference-deck design review and Domain Launch Review still govern promotion. Nothing here approves a deployment.

## Objections answered

| Objection | Resolution |
|---|---|
| The old caps prohibit 100 drafts | **Accepted as a real conflict; explicitly amended above for the exact founder-requested PR.** Total draft artifacts are reported honestly. Review and production capacity are unchanged. |
| These are one idea each, while the book format calls for decks | **Accepted as a draft-stage limitation.** Label and deliver idea prototypes; do not present incomplete decks as full book summaries. Deck production remains a later, separately gated step. |
| Unopened books cannot support verified attributions | **Accepted.** Preserve unconfirmed claims and source work; no publication or fabricated chapter checks. The prototype's prediction must depend on its own observable/derived model rather than an unverifiable assertion about a book. |
| One reusable toy repeated 100 times meets the count | **Rejected.** A CM-selected distinct misconception and mechanism/question are required for each addition. Shared code alone is not a duplicate, and different titles alone are not distinct lessons. |
| Adding drafts will worsen the review queue | **Accepted as a cost of the bounded commission.** Keep them draft and parked after PR integration; admit selected artifacts through named, bounded review batches, with every held item visible. |

## Next moves and proposed board items

| Proposed item | Owner | Done when |
|---|---|---|
| Select and brief the exact 100 additional demos | cm-books, with its existing strand managers | One dated manifest has 100 unique slugs/books, original mechanisms, overlap disposition, source states, chapter-check work and no forbidden topics. |
| Accept bibliography additions for the prototype manifest | courses-lead | `content/works.json` proposal checked for ownership, duplicates and the Courses boundary; unsupported metadata remains held. |
| Rule on draft prototype presentation | design-lead | Approved available format and phone layout route are written; no unapproved deck/kit promise. |
| Define independent review and evidence scope | evaluation-steward | Current-version QA/fact-check/learner routes and honest scope of any sampling are recorded, with no publication waiver. |
| Build and integrate the exact 100-draft PR | chief-of-staff → demo-builder and platform owner as needed | New demos and registration land on the task branch; ordinary host/builder limits hold; existing six remain unchanged; verification evidence and remaining blockers are linked. |
| Drain selected prototypes through ordinary gates | cm-books → CoS and independent checkers | Future work only: named picks fit the normal review/deck caps and meet source, legal and launch gates before promotion. |

Confidence: high on the authorized artifact scope and preserved gates; medium on the final 100-book selection until cm-books checks distinctness and source routes. Next owner: cm-books for the manifest, then design-lead/evaluation-steward for their rulings and CoS for dispatch/integration. Shared board, progress and event updates are left to the integrating chief of staff in this session to avoid competing writes.
