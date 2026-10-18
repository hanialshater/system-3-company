# Founder ask: one simple, scalable approval path for a lesson, graded by risk

owner: evaluation-steward (the gate changes) · head-of-product (the launch review and the lesson path)
date: 2026-10-18
status: routed (all five answers in, 2026-10-18; AMD-013 redraft pending; nothing applied)
class: gates
route: evaluation-steward (AMD-013 draft) → head-of-product (path, batch launch review) → accessibility-reviewer, cultural-reviewer, lifehacks-safety-reviewer, analytics-steward (each on its own step) → constitutional review board → founder ratifies
recorded by: chief-of-staff

## What the founder said

> "Thin is too much and not practical?"  (on the per-type approval path laid out in this conversation)
>
> "Yes i want high quality demos but also the process should be simple enough to be scalabel"  (source: conversation, 2026-10-18)

## What the founder decided, and what is left to the owners

- **Decided by the founder (whether):** the lesson approval path is to be simplified so it scales, without lowering quality. A proposal comes back for decision.
- **Left to the owners (how):** the design below is the chief of staff's starting draft. Every rule, rate and threshold in it is for the owners to change, in writing.

## Why change it (the evidence)

- 1,283 lessons: 720 published, 234 in review, 329 draft; 218 held in `company/ops/publish-holds.json`.
- The code gate (`tools/company.mjs` `launchGates`) checks only claims, a QA record and a learner record. Every other step is a doc rule held by the operator's memory and the holds list, and `company publish` skips both.
- The steps that run every time are the ones that work: fact-check, QA, learner walk. The per-lesson ceremonies mostly did not run: launch reviews were chaired "acting" by the operator; 76 lessons were published with 0 accessibility records (2026-10-13 role evaluation); design review samples by intent but has no rate in code.
- A written check that is skipped is worse than no check: the record says it happened.

**Principle:** quality comes from checks that always run. Every check in the path is either **enforced by `company publish`** or **sampled at a stated rate with a stop rule**. Nothing in between.

## The proposed path

### Path A: every lesson (the default)

| # | Step | Who | How it is held |
|---|---|---|---|
| 1 | Brief with the misconception, claims to make, format, and `reviewRoute` (default `standard`) | category lead | `check` fails a brief/lesson without `reviewRoute` (AMD-013 d) |
| 2 | Build + pre-flight + local QA | demo-builder | unchanged |
| 3 | Every claim verified by someone other than the builder | fact-checker | gate (exists) |
| 4 | QA contract record for the current version | qa-tester | gate (exists; version match via AMD-010) |
| 5 | Learner walk, `Verdict: launch` for the current version | learner-evaluator | gate (AMD-013 a, absorbs AMD-001 d) |
| 6 | Automated accessibility scan, 0 `fail` findings, current version | accessibility-reviewer's tool `tools/a11y-scan.mjs` | gate (AMD-013 c) |
| 7 | Batch launch review: one record per publish batch, listing the slugs | head-of-product signs, release-manager executes | `publish --batch=<record>` refuses without a signed record (AMD-013 e) |
| 8 | Predictions committed once per batch (or per experiment) | analytics-steward | in the batch record |
| 9 | Deploy | **founder, every time** | unchanged (deploy workflow) |

**Sampled, not per lesson** (each sample written into the batch record):
- Human accessibility review: 1 in 10 lessons of each batch (screen reader, meaning of colour, the scan's `manual` items).
- Design review: 1 in 10, and **every** lesson in a format's first 3 builds.
- Fact-check audit: a planted false claim in 1 lesson per batch (EXP-001, finally run).
- **Stop rule:** if a sample finds a fatal flaw in more than 1 of 10, that category's next batch is reviewed at 100% until a clean batch.

### Path B: risky lessons add exactly one reviewer

`reviewRoute` is `sensitive`, `safety` or `copyright`. The gate refuses publish until that reviewer's verdict file exists for the current version (AMD-013 b, one mechanism for all three; absorbs AMD-006).

| Route | Reviewer | When |
|---|---|---|
| sensitive | cultural-reviewer | on the brief before build (doc rule, cheapest place to fix), and a publish verdict for the current version. If claims and reveal are unchanged since the brief review, the publish verdict may be a short "unchanged" record. |
| safety (Life Hacks safety classes: food, chemicals, heat, electricity, health, children, pets, money) | lifehacks-safety-reviewer | before publish |
| copyright (Books) | Books copyright check (owner named by the founder's F1/F2 answer) | before publish |

### Once per category, not per lesson
Domain Launch Review (5 lessons pass, then the category opens). Unchanged. Its hold becomes a `domain.status: incubating` check in the gate instead of 200 lines in the holds list (AMD-013 f).

### Off the lesson path
Locale variants and privacy review stay where they are (locale launch review; feature and schema reviews) and are not listed as lesson steps.

## What this costs per lesson

| | Today (on paper) | Proposed |
|---|---|---|
| Standard lesson | ~9 named steps, 5 of them by hand | 3 agent reviews (fact, learner, QA) + 1 automated scan; batch sign-off shared by ~20 lessons; ~0.2 sampled reviews |
| Risky lesson | 1–2 extra reviews, held by the operator | +1 review, held by the gate |
| Operator's job at publish | read holds, check routes by hand | run `publish --batch`; the gate refuses or passes |

## What it gives up (stated, not hidden)

- Per-lesson human accessibility and design review become 10% samples. Mitigated by the automated scan as a gate and the stop rule.
- The second sensitive review becomes short when nothing changed. Mitigated: the reviewer decides "unchanged", not the builder.
- Simulated learners are still not learners. Nothing here shows anyone learned; that is EXP-002's job.

## Route and answers

| Step | Role | Answer (agree / agree with changes / object) | Where |
|---|---|---|---|
| 1 | evaluation-steward (AMD-013, gate design) | agree with changes | company/reviews/_gates/2026-10-18-simple-path-evaluation-steward.md |
| 2 | head-of-product (path, batch launch review) | agree with changes | company/reviews/_gates/2026-10-18-simple-path-head-of-product.md |
| 3 | accessibility-reviewer (scan as gate, 10% sample) | agree with changes; objects to (c) as drafted | company/reviews/_gates/2026-10-18-simple-path-accessibility-reviewer.md |
| 4 | cultural-reviewer (short publish verdict when unchanged) | agree with changes | company/reviews/_gates/2026-10-18-simple-path-cultural-reviewer.md |
| 5 | analytics-steward (predictions per batch; EXP-001 per batch) | agree with changes; O3, O4 must be fixed | company/reviews/_gates/2026-10-18-simple-path-analytics-steward.md |
| 6 | constitutional review board | after 1–5 | AMD-013 |
| 7 | founder | ratifies | this record |

## Objections

Recorded by the chief of staff from the five answers. Each answered the draft without reading the others. An **Answer** on an evaluation-steward objection is the steward's own proposal. On every other objection it is the chief of staff's **proposed** answer, which evaluation-steward (AMD-013 owner) and head-of-product (path owner) confirm or change in the redraft; it is not final until they do.

- **evaluation-steward (blocking):** (a), (c), (f) in `launchGates` fail `check` on day one (720/720 for (c), 26 for (a), 12 for (f)), because `check` runs the gate on every published lesson. **Answer:** accepted. AMD-013 redraft splits a `publishGates` that only `publish` runs; `publish` stamps lessons; `check` enforces it only on stamped lessons and warns on the rest. The 26 become a worklist, nothing is unpublished.
- **evaluation-steward:** step 4's version match for QA does not exist (QA records carry no version; AMD-010 adds none). **Answer:** accepted; new part (g): `qa-record` writes `lesson version: vN`.
- **evaluation-steward:** storing `reviewRoute` in meta.json needs a 1,283-lesson migration. **Answer:** accepted; the route is derived from a domain default in `content/domains.json` (Life Hacks → safety, Books → copyright) plus the concept's `sensitive` mark; meta.json may only raise it, or lower it with a head-of-product ruling.
- **evaluation-steward:** retiring `publish-holds.json` loses 12 non-incubating holds. **Answer:** accepted; `publish` also refuses any slug in the holds file.
- **evaluation-steward (independence, open):** the verdict parser must live in `company.mjs`, not be imported from unprotected `publish-ready.mjs`; and `a11y-scan.mjs` severity rules are unprotected, so the judged could loosen the scanner. **Answer:** parser copied into the gate (accepted). Whether the scanner's severity rules become protected: **open, for the constitutional review board.**
- **accessibility-reviewer:** (c) names a `--record` mode and version binding that `a11y-scan.mjs` does not have, so nobody can satisfy the gate. **Answer:** accepted; (c) is not enforced until platform-engineer adds `--record` (slug, version, build SHA, tool stamp). Gate counts only lesson-origin `fail`; a kit/app `fail` refuses the batch once. The 23 px "Why trust this?" link is re-tested and fixed before the gate is switched on.
- **cultural-reviewer:** gate file pattern `*-<route>.md` matches no existing record (`*-culture-en.md`). **Answer:** accepted; files are named by reviewer (`culture-en`, `safety`, `copyright`) with one template carrying stage, verdict and version; brief files never satisfy it.
- **cultural-reviewer:** "claims and reveal unchanged" is the wrong test for a short publish verdict. **Answer:** accepted; the test is "no learner-visible text, number, image, map or interaction differs from what was reviewed", decided by the reviewer only, shown by a tool-computed content hash, refuse-list lines and the fact-check outcome; never after a "go with changes" brief verdict without an addendum.
- **cultural-reviewer:** AMD-006's audit of 5 records per cycle was dropped. **Answer:** accepted; restored in the redraft.
- **head-of-product O1:** the batch signature can become a rubber stamp. **Answer:** accepted; head-of-product writes seven named checks into each record, and evaluation-steward audits 1 in 5 signed records.
- **head-of-product O2 and analytics-steward O3 (same finding):** "more than 1 fatal flaw in 10" cannot be evaluated on ~2 samples per batch. **Answer:** accepted; sample max(3, 10%) drawn by the tool from a recorded seed before review; any fatal flaw holds that class of flaw across the batch and sends the category's next batch to 100% review until one is clean; "fatal flaw" defined in writing before the first sample.
- **head-of-product:** the path does not catch the two commonest failures, "told, not shown" (~56 of 263 closeout rows) and answer leaks (~44). **Answer:** accepted; both are named items in the brief, the pre-flight and the learner-evaluator rubric; learning-designer required only on new or non-default formats, a category's first 3 briefs in a format, and fix rounds after either finding.
- **head-of-product:** `publish` does not check status; a lesson can carry more than one route; safety also reviewed at brief; copyright never falls back to standard. **Answer:** accepted into the redraft.
- **analytics-steward O1:** a free-text `predictions:` line is not falsifiable. **Answer:** accepted; the batch record links an `EXP-*.md` committed before publish, with per-slug tripwires.
- **analytics-steward O2:** one planted claim per batch is a canary, not EXP-001. **Answer:** accepted; renamed "canary", picked by a non-reviewer, `publish` refuses a slug carrying the plant marker; one miss sends the batch's claims to a full re-check.
- **analytics-steward O4:** AMD-013's own prediction is untestable. **Answer:** accepted; a random 10% of each of the first 3 batches gets a full manual review, with a minimum batch size.

## Board

- W-1672 written answer + AMD-013 ownership (owner evaluation-steward)
- W-1673 written answer (owner head-of-product)
- W-1674 written answer (owner accessibility-reviewer)
- W-1675 written answer (owner cultural-reviewer)
- W-1676 written answer (owner analytics-steward)
- W-1677 redraft AMD-013 from the answers (owner evaluation-steward)
