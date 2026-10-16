# Retro: 2026-10-16: round 2 at cap 14 (next-build OOM, SEV3)

owner: chief-of-staff · attendees (by report): qa-tester (SO-10-1 run 1), learner-evaluator (SO-10-3 run 1), fact-checker (SO-10-2 run 1, FC 55), demo-builder (behavioral brief 3), principal-engineer-ops, tools-lead · incident: ev "host: next-build OOM" (SEV3, 2026-10-16 ~11:27Z)
recorded by: chief-of-staff

## Numbers for this window (10:40Z–11:45Z, measured from records)
- Agents in flight peaked at 14 (cap 14); builders 3 (cap 3); load average peaked ~30 on 4 CPUs.
- Production builds killed by the memory cgroup: 3 (SO-10-1 ×2, SO-10-2 run 1 ×1, exit 137); 1 more (SO-10-3) needed `--max-old-space-size=3072` to finish.
- Contract timeouts attributed to load: 6 (Wave J flip, first run at 4 workers) + 2 (W3 QA, phone). All passed when re-run at 2 workers or alone.
- Delivered in the window: 15 Wave J flips merged; W3 merged; 3 History QA passes; 8 Wave J and 8 W3 learner records; 17 physics + 2 history claims verified; behavioral brief 3 built.

## What went well (keep doing)
- Agents saw the OOM, waited for other builds to finish, retried, and **reported it instead of hiding it** (qa-tester, learner-evaluator, fact-checker). The fact-checker reused an existing server instead of starting a third (two-server cap in SO-10).
- Standing orders worked: three quality runs started without a manager run and each ended with a clean done check.

## What hurt (with evidence)
1. **The caps count agents, not builds.** The builder cap (3) counted only `build`/`wave` dispatches; QA and walkthrough-building checks ran their own `next build` on top, so up to 6 builds ran at once on 4 CPUs / 15 GB. Five whys: why OOM → 5-6 concurrent next-builds → checks also build → the cap's unit is the dispatch kind, not the resource → the 2026-10-14 caps were set for a host where checks used one shared review server.
2. **Load-induced flakes look like lesson failures.** Two W3 lessons are recorded `fail` for timeouts that pass alone; re-QA costs a run each.
3. **The chief of staff raised the agent cap to 14 without changing the unit the host limit protects** (the founder chose the option; the analysis behind it was mine and missed that checks build).

## What we will change
| Change | Mechanism | Owner | Board id |
|---|---|---|---|
| Production builds share the builder cap | In force now (addendum in company/decisions/2026-10-16-founder-agent-cap-14.md); dispatch-check gains a build-slot count | chief-of-staff (now), tools-lead (code) | W-1262 |
| Checks that need a build reuse one shared review build where possible | A shared production build per main SHA for walkthroughs (port and dist recorded in the run brief); QA keeps its own build | evaluation-steward (SO text), chief-of-staff (server) | new item below |
| QA defaults to 2 workers on this host | Stated in every QA brief; SO-10-1 text | evaluation-steward | new item below |

## What we will stop doing
- Dispatching a check that builds into a slot freed by a light run without counting it as a build.

## Did last retro's changes work?
- Delegation retro C3 (standing orders): yes, three SO runs ran manager-free. C1/C2 (dispatch log, slot ledger): built, merged or awaiting check; not yet live. C6 (guards): merged; install refused by the session permission system → founder (F-31).

## Kudos
- @qa-tester: waited out other builds rather than lowering the bar, and logged both OOM kills in its record.
