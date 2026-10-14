# ADR-003: Lesson code never runs on the server

status: proposed
date: 2026-10-14
deciders: principal-engineer (proposer), founder (direction given 2026-10-13: "browser, in a sandbox")
source: [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md) option A1 · [review](../../rituals/records/2026-10-13-eng-review-lesson-storage.md)

## Context
Lessons are written by agents. The founder asked whether lesson code could be hot-loaded on the
server. Lessons already render only in the browser (`DemoHost` uses `ssr: false`), and the
server will soon hold database credentials, session secrets and the event intake.

## Decision
Lesson modules execute only in the learner's browser. Servers and the static build serve the
shell, the kit, the manifest, lesson metadata and static previews, and never import, evaluate or
render a lesson module. This holds for every stage of EDD-003.

## Consequences (good and bad)
- Good: a bad or poisoned lesson cannot become remote code execution in the credentialed process. Server cost does not grow with lesson views.
- Good: the server bundle stops carrying lesson code (today 1.2 GB of build output at 879 lessons).
- Bad: no server-rendered lesson markup. Lesson pages get SEO only from metadata and a poster (EDD-003 A3).

## Alternatives rejected and why
- A1 server hot loading: one invocation per view, cold starts, and agent code inside the process that holds secrets. Isolating it (isolates, no-network workers) is infrastructure we do not have and would have to audit.
- A0 everything in one app build: breaks between 1k and 2k lessons on the build trigger (about 7.1 min at 879, about 16 min projected at 2,000).

Would be wrong if: we need server-rendered interactive lesson markup for a reason that the
metadata and poster cannot serve. No such need is known.
