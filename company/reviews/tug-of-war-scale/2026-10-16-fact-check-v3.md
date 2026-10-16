# Fact-check: tug-of-war-scale v3 (2026-10-16)

## FC pass mail-34bf (2026-10-16)

Checker: fact-checker (Ingrid). Brief: company/ops/mailboxes/dispatcher/20261016T154559740Z-evaluation-steward-49b534bf.md (F-42 mailbox pilot, lane 10, SO-10-2, [project:wave-j]). Checkout: main at bf6fde86961edff82325289e54bb1e93d24c3c60, which contains 169e88d (`git merge-base --is-ancestor 169e88d HEAD` exit 0). No shared server and no walkthrough this pass (the brief allows a code read): I read Demo.tsx (and model.ts), then meta.json, then sources. I did not read build.md or any builder note. Independence: the v3 claim text and lesson text were written by demo-builder (169e88d); this pass wrote no claim or lesson text. Full per-claim notes start 'FC pass mail-34bf' in meta.json.

Scope: c1 (reset), c5 (new) in 169e88d. Result: 2 of 2 verified, 0 disputed, 0 unverifiable.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Reveal: 'But a scale at rest reads the one pull passing through it: the tension its two ends share.' Own derivation: T_right - T_left = m a = 0 at rest, so equal end pulls for any mass; a massless spring in series carries one tension, which the dial reads. Code: both tension arrows, label and dial from one T = PULL[mode]. Source re-opened this pass: OpenStax University Physics vol 1 m58303 'Solving Problems with Newton's Laws' (raw.githubusercontent.com/openstax/osbooks-university-physics-bundle/main/modules/m58303/index.cnxml, CC BY 4.0): 'Since the string and the pulley have negligible mass ... the tension is the same throughout the string.' Halliday not opened, not relied on. |
| c5 | verified | Reveal: '... not 200 or 0. The two pulls do cancel: that is why the scale stays still.' Equal opposite end pulls give zero net force, so no acceleration; the reading is the tension T (100 N), not the net force (0). The clause about what the 0 N answer 'mistakes' is an account of the misconception, not a falsifiable physics claim; the physics in it is correct. |
