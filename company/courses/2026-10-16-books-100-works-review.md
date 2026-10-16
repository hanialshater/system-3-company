# Books 100: bibliography registration review

owner: courses-lead (Amara)
date: 2026-10-16
status: narrow registration accepted and integrated for the three final strand payloads; all source-dependent claims held
inputs: `CLAUDE.md`; `.claude/agents/courses-lead.md`; `company/roles/courses-lead.md`; `company/courses/README.md`; `company/product/lesson-metadata.md`; `content/works.json`; `company/domains/books.md`; `company/product/verticals/2026-10-16-books-100-pr-ruling.md`

## Decision

Accept the Head of Product's route for registering works associated with the founder's exact 100-additional-draft commission. Courses owns the final `content/works.json` edit. CM-books and its existing strand managers select the books and submit metadata with their roster; a builder need not wait for completed bibliography checks to make a held draft prototype.

This is permission to register identifiable works for draft attribution. It does not adopt 100 complete Courses curricula, appoint 100 course managers, claim chapter coverage or approve a production book summary. A proposal requiring more than four ideas for one work returns to Courses for a separate adoption decision and owner.

## Acceptance conditions

1. The CM manifest supplies exactly 100 distinct works for exactly 100 additional demos. Preserve the existing six demos and all existing work entries. Reuse an existing ID when the proposed work is already registered; do not create a second title/author variant for the same work.
2. The three strand payloads are the handoff, not an independent source check. Accept identity fields only to the extent supported in the CM's records. Record unsupported or edition-dependent metadata as unconfirmed in the accompanying manifest/review; do not invent a publisher, year, URL, page or retrieval date. An intended source route is not a source that was opened.
3. New entries may contain only the identifying metadata needed to connect `curriculum.references[].work` to the CM roster, `category: "books"` and an empty `chapters` array. Unconfirmed chapter locations stay in the attribution records as `(unconfirmed)`, not in the registry as a fabricated chapter map.
4. Book attribution, toy-model derivation and evidence about the world remain separate. Registry acceptance does not verify any claim. Every new lesson remains `draft`; all book claims stay unverified until an independent checker has an accessible copy. F1, F2, copyright, cultural review and ordinary launch gates remain in force.
5. Only original toy models and prose are in scope. An attribution should not imply the book supplied the lesson's invented numbers or scenario. Existing field values are left untouched even if they need a later correction, which must have its own evidence and ownership record.
6. Before final integration, check IDs and normalized title/author collisions, roster-to-registry resolution, exact counts and the absence of fabricated chapter maps. Report precisely what was checked. No book, research paper or publisher page has been independently opened by this registration review.

## Objections and disposition

| Objection | Resolution |
|---|---|
| Registration could look like complete Courses adoption or coverage. | Limit registration to draft reference identity; no course maps, chapter claims or coverage targets are created. |
| New fields might turn model recall into verified bibliography. | CM-supplied metadata remains explicitly unconfirmed unless checked against an actual source; chapters stay empty. |
| Waiting for inaccessible books would stall the requested PR. | Draft construction may proceed under the product ruling. Source-dependent claims stay held and cannot support publication. |
| Existing works may be duplicated across strands. | Courses integrates once after all three payloads arrive and reuses existing IDs. |

## Handoff

Authorization written before the roster existed. Next: CM-books supplies `company/domains/briefs/books-100/manager.md` and `business.json`, `psychology.json`, `science-history.json`. Courses then records the accepted IDs and collision/count checks here, and updates only `content/works.json`. CoS integrates shared board/progress/event updates. Confidence is high on this ownership and permission boundary; final bibliography completeness is pending the roster.

## Preliminary roster identity check

The CM roster is now available at `company/domains/briefs/books-100/roster.json`. A local structural check found 100 rows, 100 unique proposed IDs and 100 unique normalized main titles. Seventeen IDs already exist in the 29-entry registry, leaving 83 proposed additions. No exact normalized main-title match is ambiguous. In particular, Newman's *Networks* is distinct from the existing Easley/Kleinberg *Networks, Crowds, and Markets*.

The existing *Getting to Yes* entry lists Bruce Patton in addition to Fisher/Ury, while the candidate roster names Fisher/Ury. The existing entry will be preserved; neither version's edition-specific authorship is independently confirmed here. Candidate rows are not a warrant to rewrite existing bibliography. Final integration still waits for the three strand `works` proposals and any substitutions they record.

`npm run check` passed at this stage: 969 lessons, 5 pre-existing Life Hacks disputed-claim warnings. No code or registry change has been made by this authorization review.

## Final strand acceptance and integration

Accepted the actual three strand `briefs`/`works` payloads, including their recorded substitutions, rather than treating the original candidate roster as an immutable bibliography. No current brief proposes CLRS. Newman's *Networks* remains distinct from the existing Easley/Kleinberg work. There were no work-ID corrections to return to the builders.

| Strand | Final distinct book demos | Existing IDs reused | New registry entries |
|---|---:|---:|---:|
| Business | 34 | 6 | 28 |
| Psychology | 33 | 5 | 28 |
| Science & History | 33 | 6 | 27 |
| Total | 100 | 17 | 83 |

`content/works.json` now has **112 entries**. All 29 original objects are unchanged, checked by parsed-object comparison with `HEAD:content/works.json`. The append preserves their original serialized content. All 83 new objects use explicit CM-proposed titles, author arrays and candidate years; they have `category: "books"`, empty `chapters` and a `bibliographyStatus` explicitly holding edition, title, authorship and year pending an independently opened source. No publisher, URL, chapter, page or source-access assertion has been added.

The structural identity audit found 112 unique registry IDs, no duplicate normalized main-title/author pair, no ambiguous main-title collision, and no mismatch between brief identity fields after punctuation/diacritic normalization. All 100 final `brief.work`, `idea.book.work` and reference IDs resolve to the registry. Six new lesson metadata files existed at this audit and all six resolved; the other 94 had not yet been written. This is a metadata integration check, not a claim that 100 built artifacts were walked or independently fact-checked. CoS must run the same reference-resolution check against the final 100 metadata files.

The final payload hashes fix the reviewed inputs:

| Payload | SHA-256 |
|---|---|
| `company/domains/briefs/books-100/business.json` | `f0491db90af5657b6ff67d8a10db93fa9e52af4761a894e99f81c28915043295` |
| `company/domains/briefs/books-100/psychology.json` | `68bb9f2954547ce74f872900359895da52f4aa650b54f4d69257f7c3274db96f` |
| `company/domains/briefs/books-100/science-history.json` | `1834a50d06f5bba606f03cb82503d214c569f402999379eacdcff4c13b5d1044` |

All bibliography remains candidate identity, and all book attributions and chapter claims remain unconfirmed. No book or bibliographic source was independently opened by Courses in this run. This acceptance creates no production course map, coverage promise or publication/deployment readiness. Next owner: CoS integrates and verifies the final artifacts; fact-checker acquires book/edition sources and checks attribution independently before any promotion.

Post-integration `npm run check` passed: 975 lessons, 5,329 claims and the same 5 pre-existing Life Hacks disputed-claim warnings. Registry-only changes required no build or browser claim; code verification and final 100-artifact reference checks belong to the CoS/build/evaluation runs.
