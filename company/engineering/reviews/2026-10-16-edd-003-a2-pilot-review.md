# Engineering Review: 2026-10-16: EDD-003 "Addendum 2026-10-16: A2 pilot", ADR-010 (esbuild) and the esbuild dependency record

owner: principal-engineer (Kenji) · tier: 2 (`package.json`/lockfile and the `/spike` host are tier 2 in `company/engineering/readiness/paths.json`) · date: 2026-10-16 · run: R1 of the addendum's run plan · board W-1238 (follow-up on W-088; with W-669, W-085) · batch company/ops/dispatch-requests/2026-10-16-r2-engineering.md#B3 (returned, commit acb6654) · project [project:scale-stage-1]
attendees (in writing): platform-engineer (author). No other role is needed at this step: nothing a learner sees changes, and the QA-contract change goes to evaluation-steward as a W-087 amendment draft, not through this record.

- EDD: [EDD-003, addendum 2026-10-16: A2 pilot](../edd/EDD-003-lesson-storage-at-scale.md#addendum-2026-10-16-a2-pilot-stage-1-first-step) · slugs: [EDD-003-a2-pilot-slugs.txt](../edd/EDD-003-a2-pilot-slugs.txt)
- ADR: [ADR-010](../adr/ADR-010-lesson-bundler-esbuild.md) (proposed) · dependency record: [2026-10-16-dep-esbuild.md](../../decisions/2026-10-16-dep-esbuild.md)
- Amendment: none for this design. `tests/qa/**` and `src/kit/Lesson.tsx` are not touched. The frame QA contract is W-087 (evaluation-steward).
- Prior rulings this rests on: [2026-10-13 lesson-storage review](../../rituals/records/2026-10-13-eng-review-lesson-storage.md) (the "no lesson migrates and no gate changes until W-085, W-086, W-087 and Q6" rule; the warm-budget definition) and my Project Review 1 position, item 5 ([2026-10-16-project-review-positions-principal-engineer.md](../../rituals/records/2026-10-16-project-review-positions-principal-engineer.md)).

## Verdict

**EDD-003 A2 pilot addendum: approve with changes** (conditions P-1 to P-7 below). Gate G1 of the run plan is met once the author has written P-1, P-2 and P-5 into the addendum. I re-read only those lines.
**ADR-010: passes my review.** That is one of its three acceptance conditions. It stays `proposed` until the founder decides W-485 and principal-engineer-ops approves the readiness record (R2). I have not edited its status line.
**Dependency record (esbuild, exact pin 0.27.0, devDependency): acknowledged**, with no objection from me. The objection I raised on 2026-10-14 (a native binary enlarges the supply chain) is answered for today, see "Dependency record" below.

## What I checked on disk (2026-10-16)

| Claim | Command | Output |
|---|---|---|
| esbuild 0.27.0 is already in the tree via `vercel`, MIT | `npm ls esbuild`; read `node_modules/esbuild/package.json` | `vercel@63.1.2` → `@vercel/backends > tsx`, `@vercel/node`, `@vercel/static-build > gatsby-plugin-vercel-builder`, all `esbuild@0.27.0 deduped`; version `0.27.0`, licence `MIT`. `package.json` does not name esbuild |
| Audit | `npm audit --omit=dev`; `npm audit` | `found 0 vulnerabilities`; `33 vulnerabilities (8 moderate, 24 high, 1 critical)`, none naming esbuild. Matches the record |
| 50 slugs, 25 checkpoint, no duplicates, all published, 9 domains with the stated quotas | count lines of the slug file; resolve each to `src/demos/*/<slug>/meta.json` and read `status` | 50 slugs, 25 marked `# cp`, 0 duplicates, 0 missing; all `published`; ai 5, chemistry 5, cs 8, economics 5, geography 8, life 5, math 5, physics 4, probability 5 |
| Stop rule is word for word | compare addendum §9 with agenda line 168 | identical |
| Baseline numbers (F1) | read company/engineering/readiness/2026-10-15-amd001-c2-split.md | `/` stylesheets 751 → 1; first-load JS 2,751,699 → 230,185 B gz; build 2m27 / 3m19 wall; QA 1930 passed in 55.1 m |
| F2 import counts | grep of `src/demos/*/*/*.ts*` | 965 lessons; 200 import `@/components/lifehacks` or `@/lib/lifehacks`; 10 import `d3-geo` or `geojson` |
| `/spike` is guarded | read `src/app/spike/page.tsx`; list `tests/spike/` | `notFound()` unless `next dev` or `SPIKE_ENABLED=1`; origin from the server-side `SPIKE_CDN_ORIGINS` allow-list; `tests/spike/spike-guard.test.mjs` exists |

Not checked: I did not run esbuild, a build or QA (records only). The section 1 baseline is principal-engineer-ops' measurement, which I read and did not re-measure.

## Checklist

- [x] **The problem is real and measured, but it has narrowed (F1).** After A1, the build (2m27 to 3m19, trigger 10 min) and full QA (55.1 min, trigger 2 h) do not fire. What is still real: a kit or shell change re-QAs every lesson (55 min, `tools/qa-changed.mjs`), and the 1,000-lesson trigger is 35 lessons away with Wave J's 144 in the pipeline. The pilot has to show the first of these, or it shows nothing (P-1).
- [x] **At least two options, including doing nothing.** ADR-010 compares six, including F (defer stage 1). esbuild at 0.27.0 is the smallest: 0 new lockfile entries.
- [x] **Blast radius.** New `tools/lesson-build/` (tier 1). `/spike` reads a manifest (tier 2, reviewed again at R8). `package.json` and the lockfile (tier 2, R2). No learner-facing change, no gate change, `src/kit/**` and `globals.css` untouched.
- [ ] **Readiness record approved by principal-engineer-ops.** Not yet. That is R2/G4, before R3.
- [ ] **Rollback is one revert.** The addendum has no readiness section. R2's record must state it: drop the pin (the lockfile goes back by one root line and one `dev` flag), delete `tools/lesson-build/`, and revert the `/spike` change.
- [n/a] **`npm run verify` on the integrated tree.** Records only. R8 (code review) carries it.
- [x] **Measurements committed before implementation.** §5 gives one command per line before the tool exists, and it says the run that builds the tool may not redefine a line. R9 re-measures the baseline. It does not inherit it.
- [x] **Security, privacy and licences.** MIT, no runtime dependencies, audit unchanged by the pin (checked above). The privacy review stays a production precondition (W-086), see Q3.

## Findings (problems, not fixes)

1. **Line 2 as written cannot show what A2 is for.** "≤ 30 s of QA per changed lesson" is already met in the app: about 3.4 s wall per lesson in full QA. The return that justifies A2 is that a kit change stops re-QAing every lesson. In the addendum's own design, though, the frame-document hash pins the kit (§7.3). So a kit change re-hashes all 50 frame documents, and a selector that picks "frame-document hash changed" picks them all, which is the app's behaviour again. The kit-minor case is only "reported with the steward's sample size", and at 25 lessons the proposed sample, max(30, 5%), is all 25. **Without P-1, the checkpoint cannot tell whether A2 delivers its main return.**
2. **Line 1's per-lesson cost is in the noise.** Taking the CPU difference over 50 lessons on a shared host (§5, line 1) gives about 0.5 s a lesson against wall spreads of tens of seconds. The author says so (§11). The deterministic half of the line, 0 pilot `Demo` modules in the app's client-reference manifests, is the real evidence. P-2 makes that the pass criterion.
3. **Two of four lines pass whatever happens, and one cannot be read here** (F1, §0). This is the same as my position's item-5 table. The addendum handles it honestly: it holds at the checkpoint and labels the proxy. It does not dress the proxy up as the line.
4. **The "migrated" wording will travel.** The agenda, the forum record and the register say "25 lessons migrated". Read alone, that phrase claims more than the pilot does (Q2, P-5).
5. **The `vercel` CLI tree carries 1 critical and 24 high dev-only advisories** (F4, checked above). They are not caused by this work, and they are not mine to fix: the fix moves `vercel` a major version, which is a deploy-path change, and that belongs to principal-engineer-ops' risk register.

## Conditions

- **P-1 (line 2, the kit-change case).** The pilot manifest records the lesson bundle hash, the lesson CSS hash and the kit/geo-kit hashes **separately** from the frame-document hash. The changed-lesson selector in `measure.mjs` selects by lesson hash for a lesson change, and by the steward's sample rule for a kit minor. The R9 checkpoint record reports three things: (a) the per-bundle QA time, measured; (b) how many lessons a kit-minor change re-QAs under the pilot, at 25, and projected at 965 (max(30, 5% of 965 = 48.25, rounded up) = 49, against 965 today), labelled as a projection; (c) the same for the app (all lessons). Line 2 passes only if (a) is ≤ 30 s **and** (b) is computed by the tool, not by hand.
- **P-2 (line 1).** The pass criterion is: app build ≤ 300 s wall, 0 pilot `Demo` modules in the client-reference manifests, and each lesson bundle ≤ 10 s (report the actual figure; the spike's were well under 1 s). The per-lesson CPU difference is reported with its run-to-run spread. If it falls inside the spread, the record says "not resolved on this host". It is never rounded to a pass.
- **P-3 (Q3).** The lesson-origin server binds to `127.0.0.1` only, never `0.0.0.0`. The frame CSP goes out as an HTTP header (as §3 says). The pilot's negative probes are recorded as pilot evidence. They are **not** W-086 evidence.
- **P-4 (Q4).** No new route. `tests/spike/spike-guard.test.mjs` keeps passing and gains one case: with `SPIKE_ENABLED` unset, a production build neither reads nor serves the pilot manifest. The origin stays chosen from the server-side allow-list.
- **P-5 (Q2).** Every record uses "pilot-migrated (built, hosted and passing the frame QA copy on the pilot path; not served)", never "migrated" on its own. That covers the checkpoint record, the slug file and the register line. The portfolio-manager carries the same wording into the register (board ask below).
- **P-6 (checkpoint figure).** The checkpoint is **1.2M cumulative, R0 to R9**: the addendum's run plan is costed, and my position's 1.0M was not. I withdraw 1.0M (see "F1 and my item-5 position").
- **P-7 (dependency guard).** The lesson-build tool's test asserts that nothing under `src/`, and no `next.config.*`, imports `esbuild`, as the dependency record says. R8 checks it.

## Answers to the addendum's §9 questions

**Q1. May pilot build runs (R3 to R7) start before W-085 can reach a phone?** **Yes**, after G2 to G5, and only up to the checkpoint. Reasons: the stop-rule clause "abandon A2 if build and QA are not on those lines" can be read on this host. Every run before the checkpoint is needed whatever the warm number turns out to be, and A2-a reuses the same bundles. The 1,000-lesson trigger fires soon whatever we do. **The limit:** nothing past the 25 checkpoint lessons, and no spend past 1.2M, until a real-device warm read exists or the forum changes the line. I accept the addendum's "hold at the checkpoint, do not fall back on a proxy" in place of my position's line (d), which read the proxy at the checkpoint and required a device read only before tranche 2. The hold is the same rule applied one step earlier. It costs nothing, because the remaining 25 could not be decided without the device number anyway.

**Q2. May "migrated" mean built and QA'd on the pilot path rather than served?** **Yes, with P-5.** The 2026-10-13 rule ("no lesson migrates and no gate changes until …") exists to protect learners and gate evidence. The pilot serves no learner and files no QA record, so it keeps that rule. For the agenda's "25 lessons migrated", the return lines (build, QA, stylesheets) are measured on the pilot path, with the scratch clone leaving the lessons out of the app build. That is what the agenda's checkpoint needs to read. What a served migration would add, behaviour on real networks and real devices, is W-085 and W-086 in any case.

**Q3. Is the 127.0.0.1 lesson origin enough to stand in for W-086 off production?** **Yes, for the pilot only, with P-3.** Cookies are scoped by host and ignore ports, so `localhost` and `127.0.0.1` keep apart exactly what SPIKE-001 finding 2 showed leaking. It does not reproduce public-suffix or registrable-domain behaviour, CDN header delivery, or HTTPS-only cookie rules. So W-086 and the privacy review stay before production, unchanged.

**Q4. Reuse `/spike` or add a pilot route?** **Reuse `/spike`, with P-4.** It is already guarded, tested and reviewed (W-477). A new `page.tsx` would be new public surface and a second guard to keep correct. R8 reviews the manifest-reading change as tier 2.

**Q5. Life Hacks engines as a versioned shared bundle: before tranche 2, or never?** **Neither: not before tranche 2, and not ruled out.** Life Hacks stays in the app through stage 1. Tranche 2 is sized for the lessons outside Life Hacks: about 715 after the pilot's 50, not "~910". The EDD's "would be wrong if (3)" is read against the population being migrated: 10 of the 765 non-Life-Hacks lessons import `d3-geo` or `geojson` (1.3%, checked), and the 4 runtime imports are covered by the geo kit. So the condition does not fire for stage 1. A versioned engine bundle is reopened, as its own EDD addendum by platform-engineer, when both of these hold: (a) the W1 to W9 waves are reviewed and the engines have stopped changing; (b) at least one Life Hacks lesson is published. Before that, versioning engines that change every week would re-hash 200 lessons per wave, for no learner benefit.

## Dependency record (acknowledgement)

Acknowledged, no objection. The exact pin at the version already installed adds 0 packages and 0 advisories (checked). The "older than latest" objection is answered by the dated-line upgrade rule, and the only newer advisory is the Windows dev-server one, which does not apply. I agree with rejecting "declaring it is ceremony": a phantom transitive bundler would move every bundle hash whenever the Vercel CLI moves.
**My 2026-10-14 objection (native binary, supply chain): answered for today.** The binary is already on every machine through `vercel`, so the pin adds no surface. It becomes live again only if `vercel` drops esbuild. Then the pin is what keeps the binary audited, and the "Revisit if" line covers it. The founder still decides W-485. Landing after `accounts` (G3) is right: it keeps a second lockfile rebase and a second C11 audit off First Light's path.

## F1 and my Project Review 1 item-5 position

F1 does **not** change the direction of my re-size. It is still a reduction, still "go with changes", and still asks for nothing new. It **does** change three things, and I have added a dated revision to my position file to say so:
1. **The case for stage 1** now rests on the kit-change full re-QA (55 min) and the 1,000-lesson trigger, not on build or QA time. Hence P-1: the checkpoint must measure the kit-change case, or it measures nothing A2 did.
2. **Release 1.2M now, not 1.89M.** 1.89M stays the ceiling, but the 0.69M after the checkpoint is held until two things exist: the R9 checkpoint record and a real-device warm read (W-085, which the addendum puts after the First Light go/no-go). It is not released on a date. With no stage-1 trigger firing on time, there is no reason to commit money that the stop rule cannot yet judge.
3. **The checkpoint is 1.2M** (costed, R0 to R9), not my 1.0M (P-6).
My objection on item 5 (feasibility: the return measure and the checkpoint) stays open in the forum record until the forum takes these lines. The record's "approved, rebased, 2.45M" is the forum's to change, not mine.

## Decision

**Approve with changes** (P-1 to P-7). Objections that travel with it:
- Line 2 measures nothing A2 did unless the kit-change case is reported (finding 1, P-1). Owner: platform-engineer, in the addendum before R3 and in `measure.mjs` at R5.
- The warm line cannot be read on this host. The pilot holds at the checkpoint until W-085 (§0, §6). Owner of W-085: the founder ask through the chief of staff, after 11-23, as §6 proposes.
- Release only 1.2M of scale-stage-1 until the checkpoint record and the W-085 read exist (my item-5 position, revised). Owner: the Project Review 1 forum, through the portfolio-manager.

## Kudos

- @platform-engineer: F1 put evidence on the table that weakens the case for their own project, and §0 stopped at the line that cannot be measured instead of reading a proxy as a phone. That made this review short, and it made my item-5 position more accurate.

## G1 re-read (2026-10-16, principal-engineer; batch company/ops/dispatch-requests/2026-10-16-r3-engineering.md#B4 · board W-1245)

Read: the B3 commit bc0edc0 in full (`git show bc0edc0`), that is EDD-003 addendum section 12 and every other hunk in the addendum and the slug file. No later commit touches either file (`git log bc0edc0..HEAD` on both: empty).

**Scope (B4 stop-if).** B3 changed the addendum in two kinds of place besides section 12: (1) the P-5 rewording in sections 1, 3, 8 and 9 (Q2), and (2) the section 5 table, rows 1 and 2. I read both kinds as **inside P-1, P-2 and P-5**, so I re-read the lines and not the whole addendum. Reasons: P-5 says "every record uses" the term, so it cannot be met without rewording sections 1, 3, 8 and 9 and the slug file. Each of those hunks swaps the wording and changes nothing else. The row 1 edit adds one pointer ("P-2, section 12 … governs"). The row 2 edit is more than a pointer: it replaces "changed = frame-document hash changed" with "chosen by the P-1 selector rule", and adds the tool-computed (b) to the pass column. That is P-1's own content (finding 1 is exactly that the frame-document-hash selector picks every lesson). It is not a new design. Section 12 says it governs where it differs from the table, so the table cannot drift away from it. The slug-file edit is three `#` comment lines, so no slug changes (the 50 and the 25 `# cp` are untouched).

| Condition | Line quoted (addendum section 12 unless stated) | Verdict |
|---|---|---|
| P-1, separate hashes | "Each pilot manifest entry records, as separate sha256 fields: `lessonJs` …, `lessonCss` …, `kit` …, `kitCss` …, `geoKit` …, `buildSettings` …, and `frameDoc`" with "Section 7.3's design is unchanged" | **met**. The frame document still pins everything with `integrity`; the components are extra fields from the same build |
| P-1, selector | "**Lesson change:** `lessonJs` or `lessonCss` differs → that lesson is selected. This is the only class that line 2's per-lesson time is measured on." and "**Kit minor:** … the steward's sample rule picks the lessons: max(30, ceil(5% of N)), capped at N, stratified … The order inside a stratum is `sha256("a2-sample:" + <new kit hash> + slug)`" | **met**. Deterministic, with no hand-picked sample. Toolchain → all (rule 3) agrees with ADR-010 decision 4 |
| P-1, figures (a) (b) (c) | "(a) … **measured** … 1 changed lesson and … 5"; "(b) … **computed by the tool** … projected at 965 lessons: max(30, ceil(48.25)) = 49 … labelled **"projection"**"; "(c) … every lesson (965, through `tools/qa-changed.mjs`)" | **met**. I checked the arithmetic: 5% of 25 = 1.25 → 2, so min(25, max(30, 2)) = 25; 5% of 965 = 48.25 → 49 |
| P-1, line 2 pass | "**Line 2 passes only if** (a) is ≤ 30 s for both the 1-lesson and the 5-lesson runs **and** (b) is printed by the tool. A hand-computed (b) fails the line." | **met** |
| P-2 | "Line 1 passes when all three hold: (i) … ≤ 300 s wall (median of 3); (ii) `grep -c` of the 50 pilot `Demo` paths … is **0**; (iii) every lesson bundle is ≤ 10 s, and the record gives the actual largest and median figures. The per-lesson CPU difference … is **reported, not passed or failed** … If the difference is inside the spread, the record says **"not resolved on this host"**." | **met** |
| P-5 | "Every record of this pilot uses **"pilot-migrated (built, hosted and passing the frame QA copy on the pilot path; not served)"** … A later sentence in the same record may shorten it to "pilot-migrated", never further." Slug file line 5: "pilot-migrated (built, hosted and passing the frame QA copy on the pilot path; not served)." | **met**. `grep -n migrated` on the EDD gives 5 hits (lines 329, 407, 454, 497, 536), all "pilot-migrated". On the slug file it gives 1 hit (line 5), also "pilot-migrated". The bare "migrate"/"migrates" hits in the addendum are inside quotes of the 2026-10-13 rule (lines 407 and 497) or in the rule's own sentence about them (536). That is right, because a quotation is not ours to reword. The R2 record uses the full term (line 51). The register line is the portfolio-manager's (board ask from the review), and it is not a G1 condition |

**G1: met.** The tier-2 review of the addendum and ADR-010 is complete with P-1, P-2 and P-5 written in. P-3, P-4 and P-7 stay R8 checks (carried in the R2 record), and P-6 is section 8's figure. G2 to G5 still gate every build run: the founder's F-35 / W-485, `accounts` merged, PE-ops' R2 approval, and a builder slot outside 2026-10-28 to 2026-11-06.

**Notes for R5/R8. These do not hold G1; they are what I will read in the code.**
- The selector does not name a **kit major** (rule 2 covers "kit major the same" only), and it has no default for a diff that fits no rule. At R5, `measure.mjs` should select **every lesson** for a kit major and for any diff that fits no rule, and print which rule fired for each lesson. I will check both at R8. Owner: platform-engineer.
- In rule 2, "at least one lesson per domain" can add lessons on top of max(30, 5%) when the domains outnumber the strata the sample would reach by itself. The (b) figure the tool prints must include those extra lessons. A count from the formula alone would not be enough. R8 check.
