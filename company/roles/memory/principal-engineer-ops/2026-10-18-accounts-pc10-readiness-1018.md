### 2026-10-18 · accounts-pc10-readiness-1018 · principal-engineer-ops
- did: Closed Ruling 1 (W-1714) and approved with conditions (C1' verify incl qa on merged tree, C2) the accounts additions (second)/(third) for flags-off merge on 98aa6092f; test 31 re-run on a built off server: pass; listed preview blockers incl new P1(f) header-on-wire check
- learned: pkill -f 'next start' misses the next-server child; kill it by PID and confirm the port is closed before cleanup (company/engineering/readiness/2026-10-16-accounts.md)
- learned: rm -rf of a 557 MB .next-ops build takes over 2 minutes; run cleanup in the background (company/engineering/readiness/2026-10-16-accounts.md)
- know: A verify summary is tied to a code SHA; when watched paths change after it, the C1 condition has to be renewed (C1') rather than carried (company/engineering/readiness/2026-10-16-accounts.md)
- open: Preview-on: P1 a-f with release-manager, A-15 first run, tests 31-33 on preview SHA are mine; principal PC10 re-read and privacy W-1961/W-1965 pending (company/engineering/readiness/2026-10-16-accounts.md)
- open: R-a still unregistered, needs W-id from chief of staff (company/ops/risks.json)
