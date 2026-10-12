---
description: Launch review and publish a lesson (usage: /launch <slug>)
---
Lesson: $ARGUMENTS

Run `npm run company -- ritual launch-review` and fill it in for this lesson. Have the analytics steward commit predictions before launch. If every gate passes, the release manager runs `npm run company -- publish <slug>`, then `npm run verify`, and adds a changelog line. If a gate fails, do not work around it: route it.
