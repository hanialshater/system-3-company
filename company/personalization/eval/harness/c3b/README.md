# Criterion 3b harness (eval-owned)

owner: personalization-eval (Uma) · built in run eval-k5-1017 (lane 14 batch 5 K5, board W-1572)
criterion: `company/personalization/eval/2026-10-17-criterion-3b.md` (draft until K6 freezes it). Offline only, Node 22.15 or later (`module.registerHooks`), no dependencies.
**Imports criterion 3's world, learner, placements and episode unchanged; edits no file in `../c3/`, `../c2/` or `..`.** 3b-ID0 checks readout 3's 16 file hashes, criterion 3's sha256 and the catalogue's hash at every run start.

## Files

| File | Role |
|---|---|
| `slot.mjs`, `slot-shim.mjs` | the candidate slot: a second instance of `../c3/harness3.mjs` whose `./reachable-oracle.mjs` import resolves to the shim, so criterion 3's own `runEpisode3` serves the candidate in its `reachable` branch (criterion 3b §1.2); `loadCandidate` (§I.2) |
| `harness3b.mjs` | constants (base cell, seed block, catalogue hash), `cells3b` (roles), the lock, episode helpers, CLI (`seeds`, `episode`, `cells`) |
| `checks3b.mjs` | 3b-ID0/ID1/ID2, validity V1–V10, input facts K-a to K-d and probes (§4.3) |
| `copy-check.mjs` | V10: M1/M2/M3, thresholds, corpus (§4.2) |
| `replay-child.mjs` | V3 call-level replay in a fresh process |
| `run3b.mjs`, `run3b-worker.mjs` | the run (K6) and `--plumbing` |
| `readout3b-tables.mjs` | the readout formatter (computes nothing) |
| `fixtures/fixture-default-order.ts` | the default order behind the candidate interface; the only candidate run in K5 |
| `tests3b.test.mjs` | tests (about 1 min) |

## How to run (from the repository root, `NODE_NO_WARNINGS=1`)

```sh
node --test company/personalization/eval/harness/c3b/tests3b.test.mjs
node company/personalization/eval/harness/c3b/harness3b.mjs cells
node company/personalization/eval/harness/c3b/harness3b.mjs seeds --pilot=500 --out=company/personalization/eval/harness/records/2026-10-17-seeds-c3b-k5.json
node company/personalization/eval/harness/c3b/run3b.mjs --plumbing --seeds=3 --jobs=4 [--chain] --out=/tmp/c3b-plumbing   # fixture; readings meaningless
# K6 only, after `status: frozen`, the candidate hash and the V3 record are in the criterion (the lock refuses otherwise):
NODE_OPTIONS=--max-old-space-size=8192 node company/personalization/eval/harness/c3b/run3b.mjs \
  --candidate=company/personalization/policies/reachable-v1.ts --seeds=2000 --jobs=4 \
  --corpus-extra=<A1 commit>:company/personalization/policies/reachable-v1-params.md --out=<dir>
node company/personalization/eval/harness/c3b/readout3b-tables.mjs --dir=<dir>
```

## Reproduction (R4, learner-model-engineer; determinism only)

1. Fresh worktree at the manifest's `commit`; `npm ci`. Check `sha256sum` of the criterion file against `criterion3bSha256`, the candidate against `candidate.sha256`, and every `fileSha256` entry (paths relative to this directory).
2. Run `run3b.mjs` with the manifest's `S`, the same `--candidate` path and `--corpus-extra`, any `--jobs`, in a separate process.
3. Compare `results.ndjson` and `verdicts.json` byte for byte. `manifest.json` may differ only in `seconds`, `timing` and paths.
4. Spot check: `harness3b.mjs episode --candidate=<path> --persona=<id> --seed=<n> --cell=<cell>` prints a hash that must match across processes and worktrees.

Every random draw is a hash of a string key (learner2's scheme, unchanged). No clock, `Math.random` or environment is read by the judge or the reference arm; the candidate is checked for the same (V1).
