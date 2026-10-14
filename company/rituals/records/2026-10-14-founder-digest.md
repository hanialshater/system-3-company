# Founder digest: 2026-10-14 evening

owner: chief-of-staff · cadence: at least every 12 h (company/rituals/triggers.json) · this one is 19 h late (see the retro)

## Shipped today (in git; not live until you approve a deploy)
- **Lessons:** 887 → 945 on disk. Published 587 → 608. 57 new drafts: wave J in all 9 subjects (45), Book Summaries (6) and Big Ideas (6; another 2 revised).
- **Claims:** fact-check pass 35 (334 claims), pass 36 (all 9 fixes verified), and wave J: 91 of 101 verified, 3 disputed, 7 held because their sources can't be opened here.
- **Engineering:**
  - Multi-card kit (CardSequence).
  - Slim paginated feed: / HTML down from 5.8 MB to 304 KB.
  - /spike security fix, approved by the principal engineer.
  - Life Hacks accessibility fixes.
  - HQ Library.
  - `qa-changed` and the reveal-fit timeout flag.
- **Strategy:** a plan to 2,000; content strategies for Books and Big Ideas; the Book deck format; History through data and maps (being set up); the next-category ranking (astronomy first).
- **Rituals:** constitutional review, ops review, demo crit, pattern review, retro, launch-review record. The WBR is being finished now.

## Blocked
- **Review, not build.** 337 lessons are in draft or review against a gate of 160. Life Hacks is 0 of 200 published: all 14 reviewed came back revise because of an engine bug. Engine v2 is being built.
- **The host.** 4 CPUs. Today's over-cap concurrency made pages take 1 to 12 minutes. Official QA is running now that the load is down.
- **Sources.** Most of the web is blocked, so held claims accumulate: Books can't publish at all without a book source.

## Waiting on you (most important first)
1. **Approve a deploy.** It ships the /spike S1 fix (exploitable on production now) and today's 21 publishes. Reply "deploy".
2. **In-review lessons on the live site:** keep them, with a written override, or set `SHOW_REVIEW=off`.
3. **Books:** a book source (F1), the legal read (F2), the 120 counted as idea-lessons (F4), and whether a 3–4 idea deck matches what you meant.
4. **Exam-prep pilot** (W-582) and **one fact-check session with web access per wave** (W-583).
5. **A second machine or CI runner** (W-531), the spend.
6. **Ratify:** the board-ID allocator (W-528), AMD-001, and the CEO office's operating rules (coming today).
7. **Next category after History** (W-685).

## Numbers
| Metric | Value |
|---|---|
| Lessons | 945 (draft 66, review 271, published 608) |
| Open claims | 294 |
| Categories | 12 (+ History in setup) |
| Agents running now | 8 (cap restored) |
