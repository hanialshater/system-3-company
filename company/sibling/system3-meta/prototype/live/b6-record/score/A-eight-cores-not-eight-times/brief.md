LESSON eight-cores-not-eight-times · domain cs (strand systems) · brief company/domains/briefs/cs.systems.md:115-132 (#4)
Concept: amdahls-law · level intro · demand 3 · format: Single card · Needs interaction-designer spec: not stated
Planned claims: 4 (1: derivation, 2: derivation, 3: source, 4: definition) · orderer cm-cs (strand manager cm-cs-systems)
Lessons follow company/product/demo-standard.md; every learner-visible factual sentence is a claim in meta.json (CLAUDE.md).

Shared rules from the group "Wave J (cm-cs, 2026-10-14): five new concepts, demand 3 first" (company/domains/briefs/cs.systems.md:95):
Written by cm-cs for Wave J. Every concept below is new to `content/curriculum/cs.json` (`subarea: systems`) and has no lesson. Same rules as the Wave J section of `cs.algorithms.md`: stage text <= 25 words, reveal <= 90 words (count given), labels >= 10 px, preset buttons in DOM order reaching every milestone with Reset last, every answer re-run in node on 2026-10-14 and checkable by derivation or simulation. Each lesson's numbers come from a stated toy model; the stage caption names the model so no claim pretends to be a hardware measurement. No simulated review counts as learning evidence.

Brief (verbatim):
### 4. eight-cores-not-eight-times · concept: amdahls-law · intro · demand 3
- Format: Single card
- Audience and knowledge boundary: learner knows: splitting work among helpers saves time / does not know: that the part that cannot be split sets a hard limit, so 8 cores give far less than 8 times the speed.
- Misconception: With 8 cores a job runs 8 times faster.
- Prediction (stage text, 21 words): "A 60-minute job: 45 minutes can be split across cores, 15 minutes cannot. With 8 cores, how long does it take?" options: A) 7.5 min / B) About 21 min / C) 30 min (answer: B, 20.6). The locked stage shows the job bar at 1 core, unlabelled.
- Check (derivation, node, 2026-10-14): time = 15 + 45 / cores: 1 core 60 (1x), 2 cores 37.5 (1.6x), 4 cores 26.25 (2.29x), 8 cores 20.6 (2.91x), unlimited 15 (4x). Model: the splittable part divides perfectly, no overhead (caption).
- What the stage shows: one job bar: a grey 15-minute block that cannot split, and the 45-minute part drawn as stacked lanes, one per core; readouts "time" and "speed-up". Controls in DOM order: 2 cores, 4 cores, 8 cores, Unlimited cores, Reset (5). A trace keeps each visited setting's time.
- Key state (milestones): question-case (8 cores: 20.6 min, 2.91x), limit (unlimited: 15 min, 4x). Reveal unlocks after both (the QA path visits 2 and 4 on the way).
- Reveal payoff (draft, 68 words): "With 8 cores the 45 splittable minutes shrank to under 6, but the 15 that cannot be split stayed 15: 20.6 minutes, 2.9 times faster, not 8. Unlimited cores still left the 15 minutes, so this job can never run more than 4 times faster. The part that must run on one core sets the limit. This is Amdahl's law: more cores help only the part that splits."
- Phone fit (390x844): the reveal points at the grey block and the trace. One bar, two readouts, one trace; stage-top crop 0 px.
- Planned claims:
  1. 15 + 45/8 = 20.6 minutes, a speed-up of 2.91. support: derivation.
  2. With unlimited cores the time approaches 15 minutes, a speed-up of at most 4. support: derivation.
  3. The limit is Amdahl's law: speed-up = 1 / (serial share + parallel share / cores). support: citation + derivation; source: Amdahl (1967), "Validity of the single processor approach to achieving large scale computing capabilities", AFIPS Conference Proceedings 30; Hennessy and Patterson (any edition, quantitative principles chapter). Attribution: fact-checker confirms.
  4. The model ignores the cost of splitting and coordinating work (caption). support: definition.
- Curriculum (new concept): `{"id":"amdahls-law","name":"Amdahl's law: the serial part limits parallel speed-up","level":"intro","demand":3,"prerequisites":[],"subarea":"systems"}`; also none; references none; tags parallelism, cores, speed-up.
- Differs from nearest: no lesson in any category covers parallel speed-up. lifehacks/work-in-process-limit is about queues of tasks, not splitting one task.
