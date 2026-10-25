# Run plan s1: the session criterion's scored run, in 11 resumable chunks

owner: personalization-eval (Uma) · run: eval-s1-1020 · board: W-2013 · written 2026-10-20, before any chunk ran
criterion: company/personalization/eval/2026-10-20-session-criterion.md (frozen at bdebacc27be85077074a43397bfce4876420d1a2, sha256 40a82a40fb2b4005083c259ee63681d61674fbd33d8e299cedd5fa4ba9d64ef9; §11 records the formatter and the parts check, and the partition)
chunk list and checks: `partsCheckS.mjs` (`CHUNKS`); formatter: `readoutS-tables.mjs`. Both sha256 are in criterion §11.

This plan is not hashed. If it and `partsCheckS.mjs` ever disagree, the check file is the record.

## 0. Why 11 chunks, and what did not change

- **Host limits.** 4 CPUs, 15 GB RAM, no swap. One background command may run about 2 h, and the container can restart. Criterion §8's three parts measure about 4.0 h (A), 2.6 h (B) and 2.4 h (C) at --jobs=4 (§2). Each is too long for one command.
- **Partition only.** Each chunk is a subset of exactly one §8 part, and each part is the union of its chunks (`chunkListCheck`). runS.mjs needed no change: `--cells` takes any list, and `--merge` takes any number of parts and refuses on a missing or duplicated cell. **No file that runS.mjs hashes (`RUN_FILES`) and no file in the candidate pin (§6) changed.** The criterion changed only in §11, which it asks for.
- **Shown before the run (plumbing, fixtures only, in a throwaway clone, at a commit with the same criterion, formatter and check as the one below; the README and this plan were added after):** the 11 chunks at `--seeds=3 --plumbing` merged into a `verdicts.json` byte-identical to one unchunked `--plumbing` run (the sorted results lines are identical too, sha256 57cd164d…). `partsCheckS.mjs check` passed on the clean set and refused each of these: a missing chunk, another chunk's directory under a chunk's name, a duplicated results line, a chunk whose manifest names another commit, plumbing chunks without `--plumbing-test`, and a run commit that changed the criterion outside §11 or changed runS.mjs. `runS.mjs --merge` refused a chunk listed twice.
- **A gap in runS.mjs, caught by the check and not fixed (it is a hashed file):** `--merge` writes `plumbing` from its own command line, not from the parts. A merge of plumbing parts without `--plumbing` would say `plumbing: false`. `partsCheckS.mjs` refuses when the merged manifest and the chunks disagree, and refuses plumbing chunks unless `--plumbing-test` is given. A later criterion's harness should take the flag from the parts.

## 1. Setup (once, before chunk A1)

The run happens at the commit that adds §11, the formatter, the parts check and this plan (call it `RUN_COMMIT`). It runs in its own worktree, so later commits on the branch cannot move its `HEAD`. Every manifest records `git rev-parse HEAD`, and the merge refuses if that differs between chunks.

```sh
# 1. In the main tree, after committing the files listed in the hand-off (nothing else uncommitted under company/personalization/ or src/):
cd /home/user/system-3-company && git status --short && RUN_COMMIT=$(git rev-parse HEAD) && echo $RUN_COMMIT
git -C /home/user/system-3-company worktree add --detach /home/user/s1-run/tree $RUN_COMMIT
mkdir -p /home/user/s1-run/out

# 2. Preflight in the worktree (about 1 min; reference arm and fixtures only):
cd /home/user/s1-run/tree && NODE_NO_WARNINGS=1 node --test company/personalization/eval/harness/cs/testsS.test.mjs
cd /home/user/s1-run/tree && NODE_NO_WARNINGS=1 node company/personalization/eval/harness/cs/partsCheckS.mjs plan | head -4      # "ok": true
cd /home/user/s1-run/tree && for c in $(NODE_NO_WARNINGS=1 node -e 'import("./company/personalization/eval/harness/cs/partsCheckS.mjs").then(m=>console.log(m.CHUNKS.map(c=>c.id+"="+c.cells.join(",")).join(" ")))'); do NODE_NO_WARNINGS=1 node company/personalization/eval/harness/cs/runS.mjs --seeds=3 --plumbing --jobs=4 --cells=${c#*=} --out=/home/user/s1-run/smoke/${c%%=*} >/dev/null || echo "FAIL ${c%%=*}"; done
cd /home/user/s1-run/tree && NODE_NO_WARNINGS=1 node company/personalization/eval/harness/cs/runS.mjs --merge=$(printf '/home/user/s1-run/smoke/%s,' A1 A2 A3 A4 A5 B1 B2 B3 C1 C2 C3 | sed 's/,$//') --plumbing --out=/home/user/s1-run/smoke/merged >/dev/null
cd /home/user/s1-run/tree && NODE_NO_WARNINGS=1 node company/personalization/eval/harness/cs/partsCheckS.mjs check --root=/home/user/s1-run/smoke --merged=/home/user/s1-run/smoke/merged --plumbing-test >/dev/null   # must print "parts check: OK (PLUMBING TEST, not a readout)"
```

The preflight's `check` also confirms that `RUN_COMMIT` passes `commitCheck`: the freeze ancestry, §11-only criterion diff, allowed paths, and the §11 hashes of the formatter and the check. If it refuses, do not start A1. Fix the commit, not the check.

## 2. Timing sample (how the estimates were made)

- **What was run:** `runEpisodeS` for every arm of every cell (`armsFor`), 6 personas × seeds **70001 to 70003** (the plumbing seeds; 70001 is also the validity seed), circular diagnostics on in the base cell as in the run. That makes 1,788 episodes in 4 concurrent processes, so contention for the 4 CPUs is included. **Read:** the wall-clock ms per episode and the byte length of each serialized score line. **Not read:** any score value. Nothing was written to disk except the timings (scratch).
- The per-part start checks, timed alone and non-plumbing: K-e over 2000 seeds 1.3 s, S-ID1 (five non-session arms) 23.9 s, S-ID2 2.9 s. So about 0.5 min per chunk.
- The merge's validity: one `composeChecksS` 3.0 s (× 24) and one T1 pair 0.9 s (× 8). With reading about 1.2 GB of results, the merge takes about 5 min.
- **Estimate per cell** = Σ over arms and personas of (ms per episode × 2000) / 4 jobs. Mean ms per episode: reference 40; the session variants 78 to 82; gam 84, draft-rules 63, random 56, oracle-order 51 (base only). Total **about 9.0 h**, against §8's 10 to 13 h. Each process's first cell includes JIT warm-up, which leans the sample high. Three seeds per persona is a small sample, so **treat each estimate as ±50%**. The largest chunk estimate is 58 min, so even 1.5× is about 87 min, inside the 2 h limit with room for the queue's tail (one unit is about 3 to 5 min).
- **Results size:** about 38 MB per cell (base 91 MB), 1.17 GB in total. The largest chunk file is about 130 MB, well under V8's 512 MB string limit that `--merge` reads each file into. The merge heap is 12 GB on a 15 GB host, so run nothing else beside the merge.

## 3. The chunks (run one at a time, in any order; each in its own directory)

| chunk | §8 part | cells | est. min at --jobs=4 |
|---|---|---|---|
| A1 | A | interleave:base, interleave:price-corner | 57 |
| A2 | A | interleave:forgetScale-low, interleave:forgetScale-high | 50 |
| A3 | A | interleave:forgetShape-low, interleave:forgetShape-high | 46 |
| A4 | A | interleave:priorRateMult-outer, interleave:kSpread-low, interleave:kSpread-high | 55 |
| A5 | A | interleave:revisitStrengthen-low, interleave:revisitStrengthen-high | 35 |
| B1 | B | interleave:relearn-low, interleave:relearn-high, interleave:priorKnowledgeMean-low | 58 |
| B2 | B | interleave:priorKnowledgeMean-high, interleave:learnRate-low, interleave:learnRate-high | 49 |
| B3 | B | interleave:prereqPenalty-low, interleave:prereqPenalty-high, interleave:pullScale-low | 49 |
| C1 | C | interleave:pullScale-high, interleave:revisitSlotCost-low, interleave:revisitSlotCost-high | 47 |
| C2 | C | interleave:revisitStopScale-low, interleave:revisitStopScale-high, interleave:slots-low | 45 |
| C3 | C | interleave:slots-high, interleave:priorRateMult-low, interleave:priorRateMult-high | 52 |
| | | **total** | **about 543 (9.0 h)** |

**Stop rule:** run A1 first. It has the base cell, the context arms and the diagnostics. If A1 takes more than 85 min (1.5× its estimate), stop and re-plan before B1, the largest chunk. Do not start two chunks at once, because both use --jobs=4 on 4 CPUs.

Each command deletes and rewrites only its own directory. Rerunning a chunk after a restart or kill gives the same bytes, because every draw is a hash of a string key. `manifest.json` is written last, so a chunk is done when its log ends `done in …` and `manifest.json` exists. Each command runs in under 2 h in the foreground of one background shell.

```sh
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/A1 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:base,interleave:price-corner --out=/home/user/s1-run/out/A1 > /home/user/s1-run/out/A1.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/A1.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/A2 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:forgetScale-low,interleave:forgetScale-high --out=/home/user/s1-run/out/A2 > /home/user/s1-run/out/A2.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/A2.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/A3 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:forgetShape-low,interleave:forgetShape-high --out=/home/user/s1-run/out/A3 > /home/user/s1-run/out/A3.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/A3.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/A4 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:priorRateMult-outer,interleave:kSpread-low,interleave:kSpread-high --out=/home/user/s1-run/out/A4 > /home/user/s1-run/out/A4.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/A4.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/A5 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:revisitStrengthen-low,interleave:revisitStrengthen-high --out=/home/user/s1-run/out/A5 > /home/user/s1-run/out/A5.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/A5.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/B1 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:relearn-low,interleave:relearn-high,interleave:priorKnowledgeMean-low --out=/home/user/s1-run/out/B1 > /home/user/s1-run/out/B1.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/B1.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/B2 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:priorKnowledgeMean-high,interleave:learnRate-low,interleave:learnRate-high --out=/home/user/s1-run/out/B2 > /home/user/s1-run/out/B2.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/B2.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/B3 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:prereqPenalty-low,interleave:prereqPenalty-high,interleave:pullScale-low --out=/home/user/s1-run/out/B3 > /home/user/s1-run/out/B3.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/B3.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/C1 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:pullScale-high,interleave:revisitSlotCost-low,interleave:revisitSlotCost-high --out=/home/user/s1-run/out/C1 > /home/user/s1-run/out/C1.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/C1.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/C2 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:revisitStopScale-low,interleave:revisitStopScale-high,interleave:slots-low --out=/home/user/s1-run/out/C2 > /home/user/s1-run/out/C2.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/C2.log
cd /home/user/s1-run/tree && rm -rf /home/user/s1-run/out/C3 && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=interleave:slots-high,interleave:priorRateMult-low,interleave:priorRateMult-high --out=/home/user/s1-run/out/C3 > /home/user/s1-run/out/C3.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/C3.log
```

Progress (prints no result):

```sh
for i in A1 A2 A3 A4 A5 B1 B2 B3 C1 C2 C3; do if [ -f /home/user/s1-run/out/$i/manifest.json ]; then echo "$i done: $(tail -2 /home/user/s1-run/out/$i.log | tr '\n' ' ')"; elif [ -f /home/user/s1-run/out/$i.log ]; then echo "$i started, not finished (rerun its command if no node process is running)"; else echo "$i not started"; fi; done; pgrep -c -x node
```

**Do not open results.ndjson, judge-tests.json or any chunk output before the merge and the tables. The readout is written from verdicts.json.** Do not edit or commit anything in `/home/user/s1-run/tree` while chunks are pending.

## 4. Merge and tables (after all 11 chunks)

```sh
# a. Parts check (about 1 min; refuses a missing, duplicated or foreign chunk, plumbing, wrong S, wrong commit or hashes):
cd /home/user/s1-run/tree && NODE_NO_WARNINGS=1 node company/personalization/eval/harness/cs/partsCheckS.mjs check --root=/home/user/s1-run/out > /home/user/s1-run/out/parts-check.json
# b. Merge (about 5 min; validity T1/T2S/T3S/NM/T4S and every reading; only after a. printed "parts check: OK"):
cd /home/user/s1-run/tree && NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --merge=/home/user/s1-run/out/A1,/home/user/s1-run/out/A2,/home/user/s1-run/out/A3,/home/user/s1-run/out/A4,/home/user/s1-run/out/A5,/home/user/s1-run/out/B1,/home/user/s1-run/out/B2,/home/user/s1-run/out/B3,/home/user/s1-run/out/C1,/home/user/s1-run/out/C2,/home/user/s1-run/out/C3 --out=/home/user/s1-run/out/merged > /home/user/s1-run/out/merge.log 2>&1; echo "exit $?" >> /home/user/s1-run/out/merge.log
# c. Readout tables (re-runs the parts check with the merged dir; prints nothing if it refuses):
cd /home/user/s1-run/tree && NODE_NO_WARNINGS=1 node company/personalization/eval/harness/cs/readoutS-tables.mjs --root=/home/user/s1-run/out --merged=/home/user/s1-run/out/merged > /home/user/s1-run/out/tables.md
# d. Hashes for the readout's reproduction section:
sha256sum /home/user/s1-run/out/*/results.ndjson /home/user/s1-run/out/*/manifest.json /home/user/s1-run/out/merged/verdicts.json
```

Then personalization-eval writes the readout from verdicts.json and tables.md, unedited, to vp-personalization (W-2013). The readout states the partition (criterion §11) and gives every output's sha256. results.ndjson files (about 1.2 GB) are not committed. Copy verdicts.json and the manifests into `company/personalization/eval/harness/records/2026-10-20-session-readout/` as earlier readouts did.
