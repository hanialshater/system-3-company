# Fact-check: mail-minus-noise (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx (thin wrapper) and the shared engine first (src/components/lifehacks/StudyLesson.tsx: Stage / FileStage, both buttons, faded non-matching rows, result count, observation() used by the reveal; src/lib/lifehacks/studyModels.ts fileResult / reconstructionMatches; the fixture in src/lib/lifehacks/studyCatalog.ts), then meta.json claims and the recall card (src/components/Feed.tsx), then source fields. No Reset or animation on this path. Google Help pages (support.google.com) are unreachable from this sandbox, so no claim below is verified on them.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Derivation on the fixture: fileResult operation "exclude" keeps rows containing "train" at step 1 (m1, m2, m4) and rows containing "train" but not "newsletter" at step 2 (m1, m4), i.e. topic matches lacking the excluded word; matching is per record (r.value.includes), so no conversation grouping is modelled. Own node agrees. |
| recall | unverified | HELD. The recall asks "Which Gmail search fits?" and the why states real Gmail operator semantics (minus excludes, OR unions, a space requires both words). That rests on Google Gmail Help 7190, which I could not open (support.google.com unreachable). The logic is consistent with the lesson fixture, and the key (index 0) is the only option that excludes the digest, but the Gmail behaviour itself needs the opened page. |

**Result:** 1 verified (c2, on the fixture), 1 held unverified (recall, states real Gmail operator behaviour; Gmail Help not openable). No disputes.
