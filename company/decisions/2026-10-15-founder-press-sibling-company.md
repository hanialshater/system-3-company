# Founder decision: a sibling company for the founder's books, starting with *System 3*

owner: founder (recorded by chief-of-staff)
date: 2026-10-15
status: decided (founder, in the chief of staff's conversation). The design defaults below are the chief of staff's and are open to the founder's correction.

## Context
The founder wrote *System 3: Towards Fluent Autonomy* (repo hanialshater/system3, checked out at /home/user/System3). System 3 Company exists to test the book's ideas. The founder wants an org for the book, and for future books, with its own HQ floor.

## Decided by the founder
- **A sibling company, not part of System 3 Company.** Its work is books, not lessons. It reports to the founder.
- **VP of Books** (the founder's "VP of System 3 book"; named for all books, because future books report to the same VP). Owns strategy, execution and vision across the books, and **owns its portfolio directly**: its budget and project review are the VP's, not System 3 Company's portfolio manager's.
- **A Head of Book for each book**, managed by the VP. The first is the Head of Book for *System 3*.
- **Roles for *System 3*:**
  - writer
  - development editor
  - copy editor and proofreader
  - fact-checker
  - art director (visual concepts)
  - marketing strategist
  - experiment developer
  - two software engineers (the book's demos, and publishing on the founder's blog)
  - release manager (versions and release tracking)
- **Consulting reviewers:**
  - arc
  - easter eggs
  - narrative momentum
  - LLM tells
  - prose quality
  - fun
  - thought-provoking ideas
  - comparison with other books
- **An HQ floor** for it.

## Design defaults (chief of staff; founder may change)
1. **Name:** "System 3 Press" as a working name for the sibling company. The founder names it.
2. **Where the agents live:**
   - In the book's repo (hanialshater/system3), next to the manuscript and the existing editorial tools: the `.claude/skills/ai-tells` skill, resources/editorial (working spine, easter-egg register, check-eggs.sh, check-tells.py) and resources/evaluations. Its org-as-data and generated agents live there too.
   - System 3 Company's HQ shows the floor from a snapshot of that org, so the two repos stay separate.
3. **Shared or per book:**
   - The **consulting review panel**, the **release manager** and the **art director** sit under the VP and serve every book.
   - The writer, development editor, copy editor, fact-checker, marketing strategist, experiment developer and the two engineers sit under each book's head.
4. **Not inherited:** System 3 Company's constitution, lesson gates, dispatch caps and board do not govern the press. The press writes its own short operating rules.
   - The founder's standing rules still apply: the deploy approval rule, applied to blog publishing, and objections travel with decisions.
5. **Author's voice:** the founder is the author. The writer and editors propose, and the founder accepts. Nothing is merged into the manuscript, or published on the blog, without the founder's approval.

## Objections
- **Two orgs share one host and one token pool.** The press's agents compete with System 3 Company's caps on 4 CPUs. Until the press has its own rules, its dispatches count toward the same caps.
- **Some roles overlap with existing System 3 Company roles** (fact-checker, release manager, the LLM-tells skill). Keep them separate: different products and different gates. Reuse tools, not roles.
- **The book repo already has protected material.** Chapter 13 is protected, and some author-review comments have no recorded acceptance. Press agents must respect the repo's README and working spine.
