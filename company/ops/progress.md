# Progress log (session handoffs)

Newest entry at the top. Every session adds one before it ends. This is testimony from a worker
who no longer exists: check what you rely on.

Template:

```markdown
## YYYY-MM-DD · <role> · <one-line summary>
- Changed:
- Believe now (and how sure):
- Next (owner):
- Blocked:
```

## 2026-10-13 · fact-checker · second independent pass: Part A (9 prior fact-checker claims + 4 more) and Part B (economics, math, physics, life, geography, probability)
- Changed: statuses and checkedBy/checkedOn on about 270 claims across 57 lessons (11 disputed, 1 left unverified); fact-check sections appended to company/reviews/<slug>/2026-10-13-fact-check.md. No Demo.tsx edits, no claims added.
- Disputed (reasons in each review file): ai/border-follows-point c5, ai/clicks-not-value c5, ai/draw-the-xor-lines c5, ai/gradient-descent c11, ai/meaning-without-the-word c5, ai/penalty-on-wiggle c5, ai/temperature-reshapes c8, economics/two-bets-split c7, geography/fingernail-ocean c2, life/vaccinate-at-the-peak c3, math/rabbit-ratio c4.
- Left unverified: geography/half-of-humanity c1 (UN WPP 2024 table unreachable: population.un.org, data.un.org, Wikipedia and OWID were blocked from this session; only partial corroboration).
- Believe now: numbers re-derived in node from the Demo.tsx model code (kit/geo shapes, SIR/SIRS, throw-it-fast-enough model.ts); high confidence. Source checks by web search for Peeperkorn 2024, Lewis 2020, AP style, Bishop Museum (Lahaina Noon), Ledyard 1995 (secondary only), UL 489 trip times (secondary only).
- Next: demo-builder fixes the 11 disputed wordings (board W-058); fact-checker with network access compares half-of-humanity c1 (W-059). Advisory wording notes (not blocking) are in the review files: horizon-ruler refraction 'a few per cent' (about 8%), sieve 'clear a hundred numbers', friends-have-more-friends c3 'wherever friend counts differ' is false for disconnected networks, throw-it-fast-enough ISS 7.7 vs NASA 7.8 km/s.
- Blocked: none.

## 2026-10-13 (late) · chief-of-staff · 248 lessons; wave 4 under way
- Changed: merged wave 3 (ai, chemistry, life) and CS wave 2, for 248 lessons and 1,300 claims; check passes (6 disputed-claim warnings). The walkthrough driver now follows the QA path (each control once, in DOM order, 1.2 s settle). Running: builders for geography w2, physics w4, math w4, economics w4 and cs w3 (5 Opus, the cap), plus a fact-checker on ai/chemistry/cs.
- Believe now: about 20k build tokens per lesson holds (cs w2: 196k for 10). The learner launch rate of about 11% is the real constraint, not build throughput (medium-high confidence). Only 2 lessons are published.
- Next (chief-of-staff): merge builders as they report; once the integrated QA finishes, qa-record and publish the launch-verdict lessons; regenerate walkthroughs and dispatch learner reviewers per domain; revision builders for "revise" findings; WBR and retro for waves 2–4.
- Blocked: AMD-001 (a–d), the OP and the usage budget wait on the founder, as do the human source checks (UN WPP, Bullard 1965).

## 2026-10-13 · chief-of-staff · 178 lessons merged; usage-limit COE; checks resuming
- Changed: waves 1 and 2 (7 domains) merged, plus revisions of all 18 founding lessons (every fatal fixed). Kit: <Milestones>, mulberry32, reveal layout fix, turbopack worktree root. Integrated QA last run 226/226 (before wave 2's 70 merged).
- Believe now: builders cost about 20k tokens per lesson, and checking is the bottleneck. 150+ lessons have no learner review. Wave 3 builders (econ, chem, physics, math) resumed via SendMessage; life, ai, cs-w2 and geo-w2 are still stopped with partial work in their worktrees.
- Next (chief-of-staff): when the resumed builders report, resume life, ai, cs-w2 and geo-w2 (max 4 Opus at once). After the fact-checkers: learner reviews per domain, then publish what passes. Then a full verify on the integrated tree, a WBR and the wave 2 retro.
- Blocked: AMD-001 and the OP need the founder's ratification. A usage budget is unknown (COE action).

## 2026-10-12 · chief-of-staff · Founding session: company, app and first 17 lessons
- Changed: built the feed app and lesson kit, the company handbook (26 roles/25 agents, constitution, 13 rituals, PM system, patterns, experiments), the CLI and computer-use QA. Four parallel builders made 16 lessons across 8 domains; merge-sort-payoff is the exemplar. Fact-check and a simulated-learner review were run on merge-sort-payoff.
- Believe now: all 17 lessons pass the QA contract on phone and desktop (44/44). That means they work, not that they teach (high confidence that they work, no evidence that they teach). The merge-sort learner review found the stage never shows why splitting helps (W-014). Expect similar "told, not shown" findings elsewhere.
- Next: fact-check the remaining 16 lessons (W-001, fact-checker). Run learner reviews from walkthroughs (W-002). First Demo Crit, then launch reviews; nothing is published yet. Run the first WBR and OP.
- Blocked: real-learner evidence needs the founder (EXP-002, W-007). The kit's `next build` with NEXT_DIST_DIR rewrites tsconfig.json; revert it, don't commit it.

