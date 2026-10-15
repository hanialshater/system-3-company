# Founder digest: 2026-10-15 morning

owner: chief-of-staff · cadence: at least every 12 h (company/rituals/triggers.json) · 2 h late

## Shipped
- **Release r6 (was 2026.10.15.1), live on https://system-3-company.vercel.app.** It ships the /spike S1 fix and 48 newly published lessons. Published lessons now 635 (27 in the final pass; 48 published since the previous release). QA passed 1930/1930 on the exact tree.
  - Smoke test: the feed, published lessons and in-review lessons (tagged) behave as intended, and /spike returns 404.
  - Found: drafts open by direct URL (W-884, first item of the next release, with W-878).
- **Lessons:**
  - 15 History lessons built (drafts). FC39: 80 of 91 claims verified; the History manager has ruled on them.
  - 66 drafts learner-reviewed (r10): 47 pass, 18 revise, 1 block. All 19 fixed (their claims are reset and await a fact-checker, W-874).
  - 28 lessons re-reviewed (r11): all launch, 27 published.
- **Claims:** FC38 ran on 158 claims: 108 verified, 5 disputed.
- **Rituals:** vertical review, design review, R&D review and launch review.
- **Tools:** release log and /hq/releases. The release manager owns it.
- **Advice:** the principal engineer's scalability note (company/engineering/notes/2026-10-14-scalability-options-for-founder.md).

## Decided by you since the last digest
- Option C deploy (done).
- Release log owned by the release manager.
- Keep "In review" lessons visible (W-479).
- Sequential release numbers (W-885).
- The environment can now reach *.vercel.app.

## Blocked
- **CI.** About 286 stale runs are queued and CI gives no verdict. Agents cannot cancel them (W-781).
- **Sources.** About 45 claims are held because their sources can't be opened (W-583, allow-list).
- **History beyond 39 buildable concepts** waits on W-764. **Books** waits on F1 and F2.

## Waiting on you (most important first)
1. **Allow-list the source domains** (W-583). The list was sent in chat.
2. **Cancel the stale CI runs** once (P1).
3. **W-764** (the sensitive-topics route) and **F-16** (History at 100 in two tranches).
4. **Books:** F1, F2 and F4.
5. **GitHub Pro (~$4/mo)**, the **esbuild / stage 1 start**, and ratifying **AMD-001 (c2)** and **AMD-007** when they come.
6. **Project Review 1**, due 2026-10-16.
7. W-582 (exam-prep slots), W-757 (Marketing scope), W-712 (operating rules) and W-786 (AMD-003 scope).
