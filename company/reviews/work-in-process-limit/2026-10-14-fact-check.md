# Fact-check: work-in-process-limit (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/work-in-process-limit v3. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Fixture study_work_in_process_limit: hook 'Three started tasks are not three finished tasks.', question and options exactly as in the claim, answer 0 = 'Whole jobs, one at a time' (first completion 10 vs 15). Values are stipulated exercise data. |
| c2 | verified | Own re-implementation (not the engine's code): order A(10), B(15), C(5). Whole jobs end 10, 25, 30 (first 10). 5-minute turns: A 0-5, B 5-10, C 10-15 (C done 15), A 15-20 (A done 20), B 20-30 (done 30); first completion 15. Total 30 both ways. Matches queueResult/roundRobinQueue and the principle text shown in the reveal. |
| c3 | verified | StudyLesson: roundRobin = (wip && step < 2); 'Whole jobs' sets step 2, '5-min turns' sets step 1; order is never changed for this slug (Swap/Try target not rendered). observation() is recomputed from the current state at the reveal ('In order A → B → C, your … schedule first completes a task at minute 15\|10. All jobs together still require 30 minutes…'). switchCost 0, all due 50 (Late 0). No productivity claim in the reveal. |
| recall | verified | Recall (three 10-minute tasks): own round-robin with quantum 5 gives the first task 0-5 then 15-20, done at 20; whole jobs, done at 10. Keyed answer 0 'Minute 10 one by one; minute 20 rotating' is the only correct option. |
