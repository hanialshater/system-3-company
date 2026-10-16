# Chief of staff: the checklist (because the operator forgets)

Run `npm run company -- status`, `npm run company -- rituals` and `npm run metrics` at the start of every session.

## Dispatch through the manager (founder rule, 2026-10-16)
Source: company/decisions/2026-10-16-founder-org-and-dispatch-rule.md · lanes: company/ceo-office/poc-map.md · protocol: company/ceo-office/dispatch-requests.md
1. [ ] **Never create** a role, agent, org, floor or room, and never run a missing role as general-purpose. Board item → chief-of-staff-ceo-office (Leonie) → the founder approves (company/ceo-office/org-change-process.md).
2. [ ] Each round, ask **one manager per lane** that has work, results or a founder ask (`--kind=other`, counts toward the caps). Skip the quiet lanes.
3. [ ] Dispatch only from a batch item (`company/ops/dispatch-requests/<date>-r<N>-<lane>.md`) or a valid standing order. Put `batch=<file>#B<n>` in the dispatch event. Check it, fit it to the caps, refuse in writing, and never rewrite an item.
4. [ ] Results go back to the lane's POC at the next round, not straight into a follow-up dispatch.
5. [ ] Do these alone, with no manager asked: merges, registry, check/verify, servers, the four single-writer files, emergencies (contain, then principal-engineer-ops), the rituals you already own, resumes.

## Every wave
1. [ ] Briefs ready for every builder (`company/domains/briefs/<d>.md` has ≥ 10 unbuilt briefs)
2. [ ] Kit changes landed **before** dispatch (tier-2 changes have an EDD and an engineering review)
3. [ ] Dispatch builders **from the lanes' batches** (worktrees, unique `NEXT_DIST_DIR`, `QA_PORT`, `QA_OUT`). **At most 14 agents at once, of which at most 3 builders** (founder 2026-10-16, company/decisions/2026-10-16-founder-agent-cap-14.md; earlier: 8, at most 5 on Opus) (COE 2026-10-13; restated 2026-10-13 after the operator broke the 4+4 version: total load is what the limit protects). Builders commit after every 2 lessons. Log the wave in `ops/waves.json`. If agents stop, resume them with SendMessage before re-dispatching.
4. [ ] Merge each branch → `npm run registry` → `npm run verify` on the integrated tree → `npm run company -- qa-record`
5. [ ] `npm run walkthrough -- --domain <d>` for every domain with new lessons
6. [ ] Fact-check per domain + **second check** of claims added by the previous checker (a different agent)
7. [ ] Learner review per domain (artifacts first)
8. [ ] Findings → revision briefs on the board; fatal findings stay tied to the lesson
9. [ ] Publish every lesson whose gates pass, and run a wave launch review record
10. [ ] Record tokens and counts in `ops/waves.json`
11. [ ] **WBR** (`company ritual wbr` + `npm run metrics -- --md`) and **Retro** (copy `rituals/templates/retro.md`)
12. [ ] Handoff entry in `ops/progress.md`; commit and push

## Every cycle (≈ 2 waves)
- [ ] Cycle planning · Pattern review · Board grooming (close or re-own items older than 7 days)

## Monthly / quarterly
- [ ] Distillation · Creative distrust · OP · Constitutional review board

## Publish loop (from the 2026-10-13 retro)
1. After each merge batch: QA the lessons that have no QA record (`QA_ONLY=<those slugs>`), then `node tools/company.mjs qa-record`.
2. `node tools/publish-ready.mjs`. It links learner reviews as evidence and lists the lessons whose latest review says launch for the current version. Holds go in `company/ops/publish-holds.json`, each with a reason.
3. `node tools/publish-ready.mjs --publish`. The gates in `company publish` still run.
4. Append the batch to that day's launch-review record.
5. Before QA or a walkthrough, confirm the build is fresh: `ls <distDir>/server/app/d/*.html | wc -l` must equal the lesson count. A stale build makes new lessons 404 and records false failures (2026-10-13).
6. Start and stop servers with `tools/serve.sh start|stop <port>` (pid files, plus a stale-build warning). Never `pkill -f <pattern>`: the pattern matches the shell that runs it.

## Work queue (2026-10-13)
- Builders get briefs from `tools/claim.mjs next <domain> --agent=<label>`. Each brief is handed out once, with an exclusive lock in `company/ops/claims/` (main checkout, not committed). Several builders can share a domain.
- Known-wrong briefs live in `company/ops/brief-skips.json` and are never handed out.
- After merging a builder: `claim.mjs release <slug> --done` is optional, because a built lesson is never handed out again. `claim.mjs list` shows who holds what, and claims over 6 h old are treated as stale.
- After a container restart, run `claim.mjs seed-worktrees` so lessons in progress in agent worktrees count as claimed.

## The founder's inbox (single place, 2026-10-13)
- Anything that needs the founder (a decision, an approval, an action, a brief) goes in `company/ops/founder-inbox.json`, with why it matters, what it blocks, the options, a recommendation and links. Board items owned by `founder` appear too.
- HQ shows the inbox as a banner on every view and as a prioritised list in the Lobby. Don't leave founder asks only in chat, the progress log or a WBR.
- When the founder answers: set `status: "decided"`, add the answer, write the decision record, and close the board item.

## Operational health (2026-10-13)
- An incident (see `company/engineering/operations/incident-response.md`): contain first, declare it as an `incident` event, and dispatch the principal-engineer-ops. A SEV1 goes in the founder inbox at once.
- When `rituals-due` lists `ops-review`, run `/ops-review`. Every tech team reports through its point of contact.

## Revisions to lessons that were published meanwhile (2026-10-14 incident)
A builder can be assigned a lesson that publishes before the revision merges: point-one-is-26-percent was published in wave C2, then builder 7's fix reset claim c3 to unverified, and the gate failed on a live lesson. Before merging a revision branch, list the slugs it touches that are now `published` (`git diff --name-only <base>..<branch> -- src/demos | xargs -n1 dirname | sort -u`). For each one, either get its edited claims re-verified before the merge, or ask the release manager to move it back to review until it is re-verified and re-reviewed. Never leave a published lesson with an unverified claim.
- Launch worktree-isolated agents one per tool call, not several in one message: parallel worktree creation races on .git/worktrees (2026-10-14: 2 of 7 builders failed with 'failed to read commondir').
- Parallel sessions: read company/ops/inbox/ at every merge; fold board items and handoffs in; merge their PRs via the community engineer.
