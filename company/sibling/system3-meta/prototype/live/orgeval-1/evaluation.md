# Org evaluation 1

by org-evaluator, 2026-10-21. Source: `live/orgeval-1/pack.md` / `pack.json` (generated 2026-10-21T17:03:08.960Z), runs bench1-meta, bench2-meta, live4, oldest first. Every number below is from the pack. Run write-ups (BENCH1.md, BENCH2.md, LIVE4.md) were read for context only.

## Summary for the vp

Across three runs on three different tasks, Meta's companies correct themselves partly, improve their process partly, show only weak evidence of agent learning, and have not shown that collaboration is what helps. The strongest signal is process: kickoff rules applied to orders went 0, 0, 7. The length class that cost bench2-meta 3 revises did not come back in live4. Caught-before-ship rose from 0.5 (bench2-meta) to 0.75 (live4), and escapes fell from 4 to 1. Against that, tokens per shipped item rose every run (105106, 167822, 193177). Code made none of the recorded catches (codeShareOfCatches 0 in both runs that had catches), yet humans made 3 of 4 catches in bench2-meta and 1 of 1 in live4 that were of a class code can check. Every meeting in all three runs recorded 0 objections, and few meeting actions got done (0/4, 3/12, 0/1). Because each run is a different task with n = 1, none of these trends can yet be separated from the change of task. My confidence is low to medium throughout. My top recommendation is to rerun one fixed task on the current tools so the next pack compares like with like.

## 1. Do the companies learn?

**Verdict: partly.**

**Evidence:**
- "Repeats after being told" is none in all three runs (bench1-meta, bench2-meta, live4).
- Within a run, agent memory records learning: writer-1 4/4, 7/7, 2/2; reader 6/6, 11/11, 5/5; writer-2 2/2, 4/4, 3/3 learned.
- The release role learned nothing in any run: 0/6, 0/7, 0/4.
- In bench2-meta, writer-1 made the same class (length) on two orders, O-2 and O-4, before anyone told it. That points to slow learning from the checker's verdicts, or to the verdicts arriving too late to help.
- Pack note: memory does not travel between runs, so learning across runs can only show up as process (see question 2).

**Confidence: low.** "No repeats after being told" is an absence. The pack does not count how many chances each role had to repeat a class after being told, so "none" could mean the agents learned, or that they never had the chance. "Learned" entries are written by the agents themselves; the pack does not show whether any entry changed later behaviour.

**What would change it:** a count of told-then-tested chances per role, with the repeat rate. Some repeats among many chances would move this to "no". Many chances with no repeats would move it to "yes".

## 2. Do the companies improve their process?

**Verdict: partly.**

**Evidence:**
- Rules applied to orders: 0 (bench1-meta), 0 (bench2-meta), 7 (live4). Live4's kickoff MTG-1 produced 5 rules, and every earlier meeting produced 0.
- The bench2-meta revise class that recurred (length, 3 revises: O-2, O-4, O-6) does not appear in live4. Live4's revises by class are format 1 and numbers 1.
- Caught before ship: null, 0.5, 0.75. Escaped: 0, 4, 1. First-pass yield: 1, 0.43, 0.75.
- Against: tokens per shipped item rose in every run: 105106, 167822, 193177.

**Confidence: low to medium.** The process changes are real and visible in the record: rules went from 0 to 7, and a class that was caught by hand stopped recurring. Whether outcomes improved because of them cannot be told apart from the task changing: a story book, then a quiz pack, then a short quiz. bench1-meta's first-pass yield of 1 and 0 escapes came on the easiest-to-check task, with no blind fact-check escapes recorded. Rising cost per shipped item is the opposite of improvement unless the tasks explain it, and the pack cannot say whether they do.

**What would change it:** the same task run on the old and the current tools. Lower or equal tokens per shipped item together with higher caught-before-ship would make this "yes". Higher cost with no gain in escapes would make it "no".

## 3. Do the companies auto-correct (fallible agents, good work)?

**Verdict: partly.**

**Evidence:**
- Defects found: 0, 4, 3. Caught before ship: null, 0.5, 0.75. Escaped: 0, 4, 1.
- bench2-meta: the checker caught 4 revises. 4 escaped: 3 fact (found by blind fact-check) and 1 duplicate (found by a judge).
- live4: the checker caught 1 and integration (PACK) fixed 2 facts the reader had passed (hermit crab "soft body"; sea star "no gills"). 1 escaped: consistency, found by the reader (a Round 2 clue that also fits Q3's whale shark).
- Code's share of catches was 0 in both bench2-meta and live4. Humans made catches that code could have made: 3 of 4 (bench2-meta) and 1 of 1 (live4).
- Every item shipped in every run: 6/6, 7/7, 4/4.

**Confidence: medium.** The layered checks visibly catch agents' mistakes: the checker caught all 4 bench2-meta revises, and integration caught 2 fact errors in live4. The trend from 0.5 to 0.75 rests on two runs with small counts (4 and 3 defects found). The code gate is not doing the work: codeShareOfCatches is 0 even in live4, where 7 rule applications were made. Facts are still the class that slips most (3 of bench2-meta's 4 escapes).

**What would change it:** caught before ship at or above 0.75 on a repeat of the same task, with codeShareOfCatches above 0, would make this "yes". Escapes back at bench2-meta's level (4) on the same task would make it "no". A severity grade on each escape would tell me whether the escapes that remain matter.

## 4. Do the companies benefit from agents collaborating?

**Verdict: not measurable yet** (for the "because of collaboration" part). The meetings produce outputs, but the pack cannot attribute any outcome to them.

**Evidence:**
- Meetings: bench1-meta MTG-1 had 6 positions and 2 decisions, MTG-2 (wbr) 4 decisions. bench2-meta MTG-1 had 6 positions and 2 decisions, MTG-2 (wbr) 8 positions and 4 decisions. live4 MTG-1 had 6 positions, 2 decisions and 5 rules.
- Objections: 0 in every meeting across all three runs.
- Meeting actions done: 0/4, 3/12 (1 cancelled), 0/1.
- Compared with the current method: bench1 current method used 25 sessions and 1481983 tokens against Meta's 10 sessions and 630638 tokens. bench2 current method used 24 sessions and 1449456 tokens against Meta's 17 sessions and 1174756 tokens. Judges preferring the current method: 0/2 in both.
- live4's 5 meeting rules were applied to orders 7 times, the clearest case of a joint decision flowing into the work.

**Confidence: low.** The comparison with the current method changes many things at once: meetings, orders, checks, briefs and supervisor. So Meta's lower token count and the judges' preference cannot be credited to collaboration. 0 objections across 5 meetings is a warning sign. Either the agents agree, or the format does not draw out disagreement, and the pack cannot tell which. Most meeting actions were never closed.

**What would change it:** an ablation on one task, the same Meta company with and without the kickoff meeting, compared on escapes, first-pass yield and tokens per shipped item. A better result with the meeting would make this "yes". No difference would make it "no". Meetings that record objections, and show where an objection changed a decision, would raise my confidence either way.

## Measurement gaps

- **No like-for-like trend.** Each run is a different task, n = 1, so every trend in the pack is mixed with the change of task.
- **No chance count for learning.** "Repeats after being told: none" has no denominator.
- **Whether "learned" memory changed behaviour.** Memory entries are self-reported, and nothing links an entry to a later action.
- **Escape severity.** The pack counts escapes by class (fact, duplicate, consistency) but does not grade them as wrong, misleading or nitpick.
- **Whether bench1-meta was checked the same way.** Its escapes list is empty. The pack cannot tell "no defects" from "fewer checks run".
- **Who the checker is.** "checker" catches count as non-code (codeShareOfCatches 0), even in a run where code rules were applied 7 times. The pack does not show whether code rules ran and found nothing, or ran inside agent sessions and got credited to agents.
- **No ablation for collaboration**, and no record of an objection changing a decision.
- **Release role learning** is 0 in every run. The pack cannot say whether the role has nothing to learn or does not record it.

## Recommendations (ranked)

1. **Rerun Benchmark 2's task on the current tools, and use a fixed task as the evaluation baseline from now on.** Tokens per shipped item rose 105106, 167822, 193177 while caught before ship rose 0.5 to 0.75, all on different tasks. No trend in the pack can be read until one task is repeated.
2. **Make code the first gate for checkable classes, and credit its catches as code.** codeShareOfCatches is 0 in bench2-meta and live4, while humans made 3 of 4 and 1 of 1 catches that code could have made. The target for the next pack: codeShareOfCatches above 0 and humanCatchesCodeCouldHaveMade at 0.
3. **Run a collaboration ablation, the same task with and without the kickoff meeting, and record objections.** Every meeting had 0 objections, meeting actions done were 0/4, 3/12 and 0/1, and the comparison with the current method changes too many things to credit the meeting.
