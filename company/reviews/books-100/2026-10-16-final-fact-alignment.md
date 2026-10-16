# Books +100 final fact alignment

Reviewer: fact-checker (Ingrid). Dispatch: `books100-fact-final`, from the integrator under Dispatch F in `2026-10-16-quality-plan.md`. Date: 2026-10-16. Static artifact alignment only; no browser, build, publication or deployment action.

**Result: 100/100 final idea/metadata pairs aligned, 200/200 scenario calculations matched, no unexpected semantic drift and no arithmetic/key blocker.** All 467 claims remain unverified. Book attribution, bibliography and real-world evidence remain held for all 100.

The earlier independent artifact-first/model audit is `2026-10-16-fact-audit.md`. This follow-up compares final files rather than substituting the original brief check for generated-artifact verification. No books or research sources were reopened: book sources opened 0; empirical sources opened 0.

| Check | Independently observed result |
|---|---|
| Manifest / actual artifacts | Exactly 100 unique slugs, with `idea.json`, `meta.json`, `Demo.tsx` present |
| Scenario arithmetic | 200 outputs recomputed from actual `idea.json` inputs by the separate Python Fraction implementation; 200 agree with current production engine |
| Prediction / recall | 100 actual prediction keys and 100 actual recall keys agree with independently extracted visible-question expectations; question/options/recall text match audited candidates except E-Myth clarification |
| Claim inventory | 467 distinct qualified claim IDs, all `unverified`; every claim has a resolvable address, expected support and nonempty string source |
| Verification fields | Zero `checked*` or `verified*` fields on the 467 claims; no independent verification status fabricated |
| Works | Exactly 100 distinct referenced work IDs; each resolves once in `content/works.json` and matches manifest and idea payload |
| Original six Books lessons | All six directory trees match original base `e3594f79`; every current file byte-compared with base, with no added/changed/missing file |
| Source payload identity | All three payload SHA-256 values match both the frozen manifest and the earlier independent audit |
| Content scope / limits | Original labels, units, book idea, book title/author/year and scope boundaries preserved; all book-idea snippets remain ≤20 words |

The complete per-file hashes, scenario numbers, answer keys, claim counts and versions are in `checks/final-artifact-alignment.json`. The compact machine handoff is `2026-10-16-final-fact-alignment.json`. Production comparison results are in `checks/final-artifact-engine-comparison.json`; production is the comparison target, never the independent oracle. The source holds are preserved in the final metadata and enumerated in `checks/source-holds.json`.

## Authorized E-Myth v4 exception

Only `bk-emyth-owner-bottleneck` differs in learner-visible idea content. Its question now explicitly says every job passes all three stations and asks for completed jobs per hour; the explore hint points to the limiting station; the reveal explains that the six-per-hour owner feeds a five-per-hour handoff. The toy claim text/source records that clarification after independent learner feedback.

All numerical inputs, options, correct index, units, labels, book attribution, recall and scope hold are unchanged. Independent recalculation still gives `min(3,10,10)=3` and `min(6,5,10)=5 jobs/hour`. “More than five cannot finish” is correct under the disclosed serial steady-flow assumption. The revised text makes no empirical claim about delegation outcomes. No other semantic exception was permitted or observed.

## Lossless metadata normalization

The science/history strand needs schema conversion: 33 learner string pairs become one-element arrays; 33 numeric level `1` values become `intro`; 132 local claim IDs become qualified IDs; 132 source objects become JSON strings; 132 support values are supplied from the original claim kind (`source`, `derivation`, `convention`). Object source values were parsed back and compared to the original objects.

Three claims in `bk-systems-delay-control` lacked `text` in the candidate: bibliography, toy and world. Their final text is exactly the serialized value of every original addressed field, in original address order. This was checked against the current idea/metadata values. It adds a claim-ledger rendering of the already audited fields, with no new learner statement, support or source assertion. It does not confer verification.

## Bounded chunks

The original claim-bounded partition was reused against final artifacts; no chunk exceeds 15 lessons or 40 claims.

| Chunk | Lessons | Claims |
|---:|---:|---:|
| 1 | 8 | 40 |
| 2 | 8 | 40 |
| 3 | 8 | 40 |
| 4 | 8 | 40 |
| 5 | 8 | 40 |
| 6 | 8 | 40 |
| 7 | 8 | 40 |
| 8 | 8 | 40 |
| 9 | 9 | 39 |
| 10 | 10 | 40 |
| 11 | 10 | 40 |
| 12 | 7 | 28 |

## Identity and limits

Observed HEAD: `51c8a4edaf8ee3cd7108b1b195dd43221eac9fcc`; this is source inspection, not an attested served build. Manifest SHA-256: `8cd1e5c0fac1fd7f58ccd3c89a034cb3526314ec2398efe4c5f7249b7d49f539`. Model SHA-256: `d626f6531479daea66bb059e5a1d81b6b29af8c9edf6c1dab796db8f0359b564`; renderer SHA-256: `6254bc999fcd61f1427d52f6952ffe0677ba5e802025d58741c8a5097c39e795`. All 100 idea/meta/demo hashes are recorded individually. The runtime freeze is `51c8a4edaf8ee3cd7108b1b195dd43221eac9fcc`. Current idea bytes equal that commit, and metadata equals it after excluding only `evidence.qa`.

Separate `claimContentSha256` and `ideaSha256` values for every slug are in the compact JSON; `metaContentWithoutQaSha256` covers every metadata field except `evidence.qa`. Claim and metadata-content hashes use sorted-key, UTF-8 canonical JSON with compact separators. QA may add actual `evidence.qa` links to metadata after this freeze. Those evidence-only additions change the full-file metadata hash but do not invalidate this source/claim alignment; this checker does not treat the presence of a QA link as evidence of a passed test. Changed idea, claim, version or other metadata content requires affected alignment checks to be repeated.

Original six: `slowest-station-sets-pace`, `one-percent-a-day`, `born-in-january-picked-first`, `wheel-number-pulls-guess`, `total-signups-hide-the-slide`, `biased-judge-noisy-judge`. This original-six check used explicitly authorized read-only git commands; no git mutation was performed.

No rendered or learner finding is newly issued in this run. The independent seven-lesson visual/learner pilot belongs to the separate QA/learner records, not to this checker’s own visual scope and not to 100-book source verification. Historical artifact-first scope remains six old walkthrough transcripts and three screenshots, as recorded in the earlier audit. This does not attest that all 100 render correctly, demonstrate learning, summarize whole books, or have cleared source/copyright/launch gates.

Reproduce from repository root:

```sh
python company/reviews/books-100/checks/final_alignment.py
node --import ./tests/lifehacks/register.mjs company/reviews/books-100/checks/final_compare_engine.mjs
```

No lesson, claim status, protected path, board, progress or events file was edited by this checker. No source verification, build or browser run was performed. Integrator owns the frozen build/PR handoff and rendered checks; fact-checker/research owners need independently opened editions/chapters and appropriate evidence before source holds can clear.

Repository validation: `npm run check` passed at 1,074 lessons, 5,794 claims, 99 roles; three existing disputed Life Hacks warnings. The memory check also passed for all 99 role files within 50 KB.
