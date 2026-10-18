# Privacy read: personalization model inputs (W-1916)

owner: privacy-reviewer (Elif) · date: 2026-10-16 · run: pr-w1495-perso-inputs-1016 · class: tier-2 privacy read of a learner-data design (EDD-007) · board: W-1916 · I am not approving a proposal of mine: the model is personalization-lead's (W-1914), the simulator learner-model-engineer's (W-1915).

Read: `company/personalization/model/model.ts` (signal list, `INPUT_PRIVACY`, `FORBIDDEN_INPUTS`, `SIGNAL_INPUTS`, `fingerprintFrom`), the model README, the sim folder's file reads (grep), `personas.ts` header, brief-response §2 and §3, founder brief §4 and §7, AMD-008 part P (P1 to P5, as drafted, F-19 open), my gate rows P3.1 to P3.5 and P6.3 (`company/initiatives/first-light/privacy-gate.md`), my EDD-009 §5 read (`company/reviews/_privacy/2026-10-16-edd-009-s5.md`, S1 to S3), `company/engineering/data-inventory.md`. Not read: the decision record `personalization-model-v0.md`, the composer/learner/score code beyond what grep shows. This is a read of a design and an offline module, not of a diff: nothing serves a learner.

Not legal advice. Items marked **lawyer** are for counsel (gate section 9).

## Verdict in one paragraph

Phase A is clear: it touches no real data (checked, below). Phase B inputs are allowed with conditions, except where noted: `predictedCorrectly` for ordering is **allowed with conditions** (the recall-only fallback must remain buildable and tested); `statedSubjects` and `lessOfThis` are **allowed with conditions on a schema I have not seen**; the five on-demand fingerprint signals are **allowed with conditions**; per-learner storage of fingerprints or need scores is **refused**; days-since-last-completion is **refused for now**; `masteryOf()` as an input is **allowed with conditions, outside model v0**; the HQ lab may show **simulated personas only**. Teen mode uses the same model with the same inputs: the age band is never an input.

## 1. Phase A touches no real data: confirmed

Evidence, not the author's account:
- `sim/catalog.mjs` reads `content/curriculum/*.json` and `src/demos/*/*/meta.json` only (`readFileSync`, lines 18, 32, 41). Those are lesson and curriculum data (`not-personal`).
- `grep` of `sim/`, `personas.ts`, `self-check.mjs` for `localStorage`, `s3c:`, `fetch`, `navigator`, `document.`, `process.env`, `http`: no hit. The only writes are `sim/run.mjs` lines 109 and 120, to `sim/out/` (gitignored), holding simulated traces.
- Personas are `source: "invented"` (brief-response §2.3); `personas.ts` line 3 to 4 says no persona is defined by age, sex or demographic.
- `model.ts` imports nothing; `self-check.mjs` fails if `src/` imports the folder or if `model.ts` mentions personas.

Ruling A1: **phase A is allowed as it stands.** Conditions:
- **A2.** Phase A stays seeded from invented personas and lesson data. Calibrating the simulated learner (W-1918, W-1927) against real events, real progress rows, a real learner's `s3c:progress:v1`, or even aggregates from W-706 is a **new read**. Aggregate-only calibration I would pass without a long review (counts, cells under 20 not used, no per-learner row, no session id); anything per-learner I would refuse.
- **A3.** `inspect()` and `curveViews()` print each signal's privacy status. When this ruling lands, `INPUT_PRIVACY` should be updated by personalization-lead (my row, section 2) so the inspection page does not say "read-needed" for a read that has happened.

## 2. Per-signal rulings

Status key: **allowed** (no condition beyond the standing ones in section 3); **conditions** (allowed if every named condition is met and evidenced); **refused**. "Standing" = N1 to N6 in section 3. All "phase B" rulings also need F-19 (AMD-008 part P ratified), a registered experiment, and the founder's deploy approval; none of those is mine to give.

| Signal / input | Phase A (offline) | Phase B (live, experiment-gated) | Conditions |
|---|---|---|---|
| `completions` (`completedAt`, slug) | allowed (simulated) | **conditions**: standing | P2 / gate P3.1 field; already stored locally and in `progress`. No new column |
| `recalls` (`{at, correct}`) | allowed (simulated) | **conditions**: standing | same |
| `predictedCorrectly` for ordering (`missRecent`, `successRecent`) | allowed (simulated). Real learners' values must not be used | **conditions**: P1 to P4 below | Section 2.1 |
| `statedSubjects`, `lessOfThis` | allowed (simulated) | **conditions**: SS1 to SS5 below, and the `settings` schema diff gets its own read (nothing stored today, data-inventory section 3) | Section 2.2 |
| `historySize`, `recallFailRate`, `levelRecent`, `domainConcentration`, `frontierOpen` | allowed (simulated) | **conditions**: standing + F1 to F3 | Section 2.3 |
| `missRecent`, `successRecent` | allowed (simulated) | follow `predictedCorrectly` (P1 to P4) | the recall-only form is allowed on the same terms as `recallFailRate` |
| lesson dims (`domain`, `concept`, `level`, `prerequisites`, `successors`) and curriculum graph | allowed | allowed | not personal data |
| `misconceptionStrength` (CM or classifier source) | allowed | allowed | rating of a lesson, not a learner |
| `revealCompletionRate`, `firstRecallRate`, aggregate "wrong-prediction rate" as lesson dims | **not available** (no data) | **conditions**: AG1 to AG3 | Section 2.4 |
| `masteryOf()` output as an ordering input | not in model v0 | **conditions**: M1 to M3, only after EDD-009 is approved | Section 2.5 |
| days since last completion (`gapDays`) | not in model v0 (correctly absent) | **refused** | Section 2.5 |
| any stored per-learner fingerprint, need score, composer term, mastery or ability state | n/a | **refused** | Section 4 |
| forbidden list: dwell, swipes, scroll, sessionLength, sessionCount, shares, device, locationFinerThanCountry, ageBand, ads, personaLabel | must stay unread | **refused**, permanently while children may be present | `FORBIDDEN_INPUTS` is complete against AMD-008 P2 and my gate §4 (age band is not an input); keep it |

### 2.1 `predictedCorrectly` for ordering (the EDD-009 §7 question)

Answer: **yes, it may order a live feed, on four conditions.** Reasoning from purpose. The value is the learner's own answer to the prediction card, already in AMD-008 P2 and gate P3.1, already stored (D1 locally, `progress.predicted_correctly` after accounts), and used only to order that same learner's own feed. It adds no field and no new party. The risks are not exposure but two uses: (a) a derived label such as "struggling" attached to a person, and (b) a learner or parent reading a wrong answer back as a judgement. The conditions target those.

- **P1 (personalization-lead, learner-model-engineer).** The recall-only fallback (`opts.predictedCorrectly:false`) stays buildable, tested, and switchable without a schema change. Test: two histories identical except for `predictedCorrectly` produce identical `Fingerprint`s with the fallback on (`fingerprintFrom` already reads it only through `usePred`; keep that). Serving code in fallback mode must not load the field into `ComposeInput.history` at all. If the founder, F-19 or the lawyer later restricts the input, the fallback is the shipped behaviour and no learner-facing text changes except reasons that named a prediction (P3 below).
- **P2.** `predictedCorrectly === null` (no prediction made) is absent, never "wrong". Already true in the code (`=== false` test); keep it, and add it to the replay test.
- **P3 (personalization-lead, pedagogy-critic).** Reason copy for repair/build may say what the learner did on a lesson ("you missed X on revisit"), never a trait ("you struggle with", "weak at", "behind"), never a comparison to other learners, never the age band (gate §4 and AMD-008 P3). A "most people guess this wrong" reason is a factual claim and needs aggregate data under AG1 to AG3.
- **P4.** It is read to order, not to measure the learner. No stored count, rate or streak of right predictions (AMD-008 M2, gate P3.2). The value is read at the moment of composing and discarded.

Flag for personalization-lead, not a privacy condition: `missRecent` treats a wrong prediction as a miss, but the surprise term deliberately serves lessons whose misconception pulls (that is the design). A learner who is fooled on purpose may then be sent "repair". Pedagogy, not mine; it also bears on whether the reason shown is true (P3).

### 2.2 `statedSubjects` and `lessOfThis`

These are the learner's stated choices (AMD-008 P2, P4; gate P3.1, and the `settings` table in gate §2.2 and EDD-008 §6.1). The model treats them as filters, not curve inputs (`model.ts` lines 114 to 117, constraint `statedSubjectsAndLessOfThisFilter`). **Allowed with conditions; the schema is not built, so this is a ruling on the use, and the diff gets its own read (E7).**

- **SS1.** Closed vocabulary only: subjects are domain ids from `content/domains`; "less of this" is a domain id, concept id or lesson slug from the catalog. No free text, no custom labels. (Free text is a field I would refuse under gate P1.1.)
- **SS2.** Bounded: at most the number of domains for `subjects[]`, a stated cap for `less_of[]` (propose 50), dropped-unknown-keys validation on write, as in the merge (gate 2.3).
- **SS3.** Stated means stated. The system never writes these from behaviour (no "you seem to like X", no inferred subjects, no suggestion that fills `subjects[]` from `domainConcentration`). An inferred interest is profiling (gate P3.2).
- **SS4.** Stored with the account and deleted and exported with it (gate P1.4, P1.5). Anonymous: local only, never sent (P3.3). Changing or clearing them takes effect at once, and the AMD-008 P4 off switch overrides them (off equals default order).
- **SS5.** The filter and its effect are never shown to or inferable by anyone but the learner: no entry in the beacon, `exp`, or any aggregate keyed by choice below the k=20 cell rule. "Less of this" can reveal what a teen avoids (for example a health or relationship topic in a domain). It is the learner's own control; treat it as personal and local.

### 2.3 The five on-demand signals

`historySize`, `recallFailRate`, `levelRecent`, `domainConcentration`, `frontierOpen` read only completions, recalls, lesson dims and the graph. **Allowed with conditions.** Each is a number computed from D1 on demand and thrown away. Individually they are mild; together, `domainConcentration` + `frontierOpen` + `levelRecent` + `recallFailRate` describe what a person studies, how deep, and how well they remember. That is the profile P3.2 forbids storing, and it is why section 4 refuses storage.

- **F1.** `recallFailRate` uses `recalls[].at` with a 30-day window against `now`. That is allowed as a window over recall results. It must not be generalised into "days since last completion/visit" (`gapDays`, section 2.5) or into per-day activity counts.
- **F2.** `historySize` (completions / 30) is allowed as the cold-start dampener. It must not be shown to the learner as a number or label ("your level"), only through the "not personalised" sentence (AMD-008 F4). Showing it makes it a score.
- **F3.** Window sizes (last 5, last 10, 30 days) are model constants. A change to any window, or a new signal built from the same fields, is a model version bump (change rule) and, if it reads a field not in the table above, a new read.

### 2.4 Per-lesson aggregates as dims (`revealCompletionRate`, `firstRecallRate`, wrong-prediction rate)

Phase B only, W-706 persisted events. **Allowed with conditions.**
- **AG1.** Aggregate per lesson, over learners, with no learner or session id in the result and no way to recover one. Cells under 20 learners are not published or used (my S3 line). A lesson below the cell size uses its CM or classifier prior, not partial data.
- **AG2.** Source is the anonymous beacon (retention: raw 90 days then aggregates, no IP; gate P6.3). Aggregates computed from account `progress` rows (for example `predicted_correctly` across learners) are a **new purpose** and need their own read before they run: purpose, rows, who sees them, retention.
- **AG3.** Used as lesson properties (move-up eligibility, surprise prior), never to rank or describe a learner, and never joined to a learner's fingerprint in a stored table. Engagement stays a floor on `revealCompletionRate` only; dwell stays forbidden.

### 2.5 `masteryOf()` and `gapDays`

- **masteryOf() as an input: conditions, not in v0.** It is derived only from D1 (`completedAt`, `recalls`) and EDD-009 §5 holds with S1 to S3. As an ordering input inside a published rule, on demand, I pass it if: **M1** EDD-009 is approved and its S1 (never written anywhere) is tested; **M2** it enters the composer only through a named, versioned curve with a written reason, so P1 replay covers it; **M3** it is not shown as a number or grade to the learner by the feed (that is the mastery surface's own review, AMD-008 M). Phase C's stored per-category state is not covered (section 4).
- **gapDays: refused for now.** Days since last completion is a function of when the learner was last here, which is close to the session count and length that AMD-008 P2 forbids, and it is the lapsed-returner signal that invites "we missed you" copy. The model correctly leaves it out of `RawInput`. A re-entry need can be served without it: due revisits already come first (F2) and carry the timing. If personalization-lead wants it, bring a new ask with the purpose and the alternative considered.

## 3. Standing conditions (N1 to N6) for any phase B build

- **N1. Computed, not stored.** Fingerprint, need scores, composer terms, and the `explainNeeds` output are computed in the browser (anonymous and signed-in alike where the data is already there) or, for a signed-in learner, per request from the `progress` and `settings` rows. They are never written: not to localStorage, not to the beacon or `exp`, not to the merge or the export, not to a log, not to an error report. Test (same as EDD-009 S1): run compose with network and storage stubbed and assert zero writes and zero fetches.
- **N2. Anonymous stays local.** An anonymous learner's history never leaves the device to be personalised (gate P3.3). `ComposeInput.history` is never serialised to a request. The server learns nothing about the order shown.
- **N3. Forbidden-input invariance.** The AMD-008 P2 test (two histories identical in permitted inputs and different in every forbidden one give the same order) runs against the shipped composer, including age band as one of the forbidden varied inputs. `checkModel()` already checks the signal table; it does not check runtime reads, so the test is needed.
- **N4. No served-order log per learner without a read.** Replay (AMD-008 P1) is proven on seeded histories, as the amendment's test says; it needs no real learner's log. If head-of-feed wants a served-order log for real learners, that is a new field: slug, rule id and reason only (never fingerprint values or need scores), at most **30 days** (gate P3.2), no learner id on anonymous traffic. Its own read first.
- **N5. Counters, not traces, for the experiment.** keep/kill per term (needs, surprise, novelty) is read from aggregate counters: cards moved by reason per day per arm, with cells under 20 suppressed, plus #4 and #5 by arm. No per-learner need or term history in the readout. How the holdout arm is assigned and held (a per-tab in-memory id, which I allowed for one experiment in the beacon ruling, versus a marker that survives reload or sits on an account) is **not covered here**: the registration must state it, and a persistent arm marker needs the experiment-beacon ruling's conditions (C1 to C9) or a new read.
- **N6. Changes route here.** A new raw input, a new signal reading a field outside the table in section 2, a longer retention for anything above, or any stored derived value comes back as a new read. The model's change rule adds one line to its decision record; this ruling adds that the line says "privacy: no new input" or names the read.

## 4. May need scores or fingerprints be stored per learner? No.

**Refused**, for phase B and for the model's life until a further ruling:
- Not on the server (no column, no cache, no "last computed" row), not in localStorage, not in a cookie, not in a session store, not in the export or the merge, not in logs or analytics, not in a database snapshot, not as an embedding.
- Reason: gate P3.2 ("no inferred attribute... interest score, ability score... stored or computed outside a published rule; rule output computed on demand and not stored per learner"), AMD-008 P1/P2, and my gate §4. The cost of recomputing is small (about 30 history items), so the purpose cannot justify a stored copy. A local cache of the fingerprint is also refused: it is a new derived field on a device that may belong to a child, with no deletion path shorter than "clear site data".
- Aggregate over learners (the share of learners with `repair` above .5) is not available either, because it would need per-learner scores to exist outside the learner's browser. Use N5 counters.
- Phase C's "per-category knowledge state" is an ability score under P3.2 and stays refused until its own privacy ruling and, if fitted, an amendment to P1 (brief-response §3, phase C).
- Phase D (badges, points): requires the teen-mode read already promised in brief-response §3; nothing here clears it.

## 5. Teen mode (13 to 15)

- **T1.** Same model, same inputs, same curves for every learner. The age band is not an input and no curve, persona, weight or constraint branches on it (gate §4; EDD-009 §3.1 precedent). A teen sees the order that the same history would produce for an adult.
- **T2.** Personalization is allowed for teen accounts on P2 inputs only (gate §3.1 table). Teen mode removes surfaces, not signals; it does not add a teen-specific personalization.
- **T3.** Reason copy for teens follows P3 in 2.1, plus: no pressure language, no urgency, no comparison, no streak or guilt (AMD-008 M2), no reference to another learner. The off switch is as reachable for a teen as for anyone and works without an account.
- **T4.** No teen-specific analysis of personalization outcomes without a read. Monitoring harm to 13 to 15 year olds is a good reason, and I would pass aggregate-only counts by band with cells under 20 suppressed, but it joins outcomes to `age_band` for a new purpose, so analytics-steward asks first. Until then, outcomes are by arm only.
- **T5.** Anonymous learners may be under 13 and are not identifiable as such. Everything in this ruling for an anonymous learner is therefore local-only, which is already N2.
- **T6.** Stated choices (2.2) are the teen's own and are not shown to anyone else. Social surfaces are out of release 1 (gate §5), so nothing in the model's outputs may feed a social surface.

## 6. What the HQ simulation lab may show

- **Allowed:** simulated personas from `personas.ts` (invented), their fingerprint means (jittered), each need's curve with the persona's point on it, composed slots with their score terms, rejected candidates, policy comparison on simulated recall, traces under `sim/out/` produced by the simulator, lesson and curriculum data, and a hand-typed "custom persona" or "paste a history" editor whose values are typed in by the person looking (synthetic, never loaded from storage).
- **Not allowed, without a new ruling:** any real learner's fingerprint, history, events, progress rows or need scores; a button that loads `s3c:progress:v1` from the viewer's browser into the lab; a feed from W-706 events or the accounts database; real aggregates below the cell rule (AG1). Aggregates at k>=20 (for example a lesson's `firstRecallRate`) may be shown as lesson properties once they exist.
- **Gate.** The page sits behind `hqEnabled()` (`src/app/hq/page.tsx` line 9 returns `notFound()` otherwise). That is access control, not a privacy control: ship the lab with no real-data path in the code, so that a leak of the gate leaks only invented personas.
- **Labelling.** The page says "simulated" wherever it shows a fingerprint, and does not show a persona label as if it were a category a real learner could receive (brief-response C2, O6: personas never exist at serve time).
- **Test (hq-engineer, personalization-engineer).** `grep` of the HQ lab code for `localStorage`, `s3c:`, `/api/`, `fetch`, and any import from accounts code: zero hits. I read that grep before the lab is called done.

## 7. What I could not check, and what I am not deciding

- The `settings` schema and any serving code do not exist, so SS1 to SS5, N1 to N6 are conditions on a build I have not seen. Confidence the first build meets them without a finding: about 70%.
- The decision record `personalization-model-v0.md` and the composer code were not read; I relied on `model.ts` for the contract. A composer that reads `Persona.latent` or a field outside the table would be a finding.
- F-19 is open. Every phase B ruling above rests on AMD-008 part P being ratified with its P2 list as drafted. If the founder loosens P2 (an engagement term), this ruling does not stretch to cover it, and I object as in the amendment's objection 7 (the stricter text wins until amended).
- **lawyer:** whether per-request server-side computation from a minor's progress rows is "profiling" for any statutory purpose (UK AADC, GDPR Art. 22 and recital 71); whether a "less of this" choice can be special-category data by implication; whether the 13 to 15 teen account itself is allowed in 16-countries (gate 3.2). I do not decide these. If the answer to the last is "accounts at 16+", signed-in teen personalization becomes anonymous-only and local, which this design already supports.

## 8. Next, by owner

1. personalization-lead: update `INPUT_PRIVACY` and `signalPrivacy` comments to the rulings; add the P2 null test and the fallback-invariance test to `self-check.mjs`; add the "privacy: no new input" line convention to the decision record (N6).
2. learner-model-engineer: N1 stubbed-IO test and N3 forbidden-input test in the composer's tests; A2 note on W-1918 and W-1927.
3. backend-engineer: SS1 to SS5 into the `settings` schema diff when it is written (E7); I read the diff.
4. analytics-steward: N5 (counters, arm holding), T4 (a read before any age-band outcome cut), AG1 to AG3 in W-706 and W-1917.
5. hq-engineer / personalization org: section 6 into the lab's definition of done.
6. evaluation-steward: AMD-FL-B test list takes N1 to N3; W-1920 (F-19) should know this ruling depends on part P's P2 as drafted.
7. Me: read the `settings` schema diff; read the EDD for any stored-derived-value request; re-read before phase B is proposed to the founder.
