---
description: Take a concept from brief to a lesson in review (usage: /new-lesson <domain> <concept>)
---
Lesson for: $ARGUMENTS

1. Category manager (`cm-<domain>` subagent): write the brief (audience boundary, misconception, why this next) as a board item.
2. Learning designer subagent: write `company/reviews/<slug>/design.md` and the brief fields in meta.json (scaffold with `npm run company -- new-demo <domain> <slug>`).
3. Optionally the mockup artist: two or three different compositions.
4. Demo builder subagent: implement, run QA for this lesson (`QA_ONLY=<slug>`), and look at the screenshots.
5. In parallel, after the build: qa-tester (`npm run qa` + `company qa-record`), fact-checker, and learner-evaluator (walkthrough first).
6. Report the gates still open (`npm run company -- status`).
