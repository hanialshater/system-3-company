# Blocked-host list: evaluation-steward check (lane 10, checked-by)

Date: 2026-10-16. Checker: evaluation-steward. Subject: tools r5 B6, W-1335 (for W-556), branch
`tools-r5-b6` at e6ea58f (11e1143, 6e914fc, e6ea58f). I read it in a scratch detached worktree that I
have since removed. I did not run `probe`. I ran the 4 tests (4/4 pass, no network), `list`, and a read-only
gap script that uses the module's own `blockedMention` and `BLOCK_WORDS` over every unverified claim.
No protected path is touched (only `tools/company.mjs` is listed from tools/).

## Verdict

**(a) Probe safety: PASS.** **(b) Held-claims heuristic: PASS as code, but the number it gives is too
low.** **(c) Fit for W-556: CONDITIONAL.** It is fit as a host ledger and re-probe tool. It is not fit as
the claim count the decision quotes until the host list is widened (condition C1).

## (a) Probe

- It sends one HEAD per host per run. The `targets` array has hosts plus knownOpen, with 0 duplicate hosts
  (checked). The shared `i++` index is safe in single-threaded JS. curl runs with `--head --max-time 10
  --retry 0` and no `-L`. Headers and bodies are dropped and only the status class is kept. The test
  asserts exactly 4 HEADs for 4 targets.
- It refuses to run when HTTPS_PROXY is unset, the status endpoint fails or returns non-JSON,
  `enabled === false`, or any status key or state matches /degrad/. In each case it exits 2 and writes
  nothing.
- It writes only `lastProbe`. The 6e914fc and e6ea58f diffs of blocked-hosts.json change only
  `lastProbe` blocks, plus the trailing commas they need. The test strips `lastProbe` and gets
  byte-identical data.
- Notes (none blocking):
  1. The degraded check is pattern-matched, not keyed to a documented field, so it lets the probe run
     if the status schema is unfamiliar. The harm is low because the policy is enforced upstream.
  2. Health is checked once, before the run, not again between HEADs. That is acceptable for 33 HEADs.
  3. If curl is killed by the 15 s execFile timeout, the result is recorded as `error--1`. This is
     cosmetic.
  4. /root/.ccr/README.md says "do not retry policy denials". A probe is a periodic re-check, not a
     retry. Keep it to once per wave or per W-556 decision, never once per fact-check session. The
     README note already forbids routing around a listed host.

## (b) Held-claims heuristic

- It works as described. A claim counts only when its status is `unverified`, it has a note, and one
  sentence of the note names the host and contains a block word. The data gives 3 distinct held claims:
  history.literacy-split-france.c4, history.schooling-and-crime-1830s.c1 and
  lifehacks.wet-knit-hang-stretch.c1. The two known gaps are as stated.
- **Gap 1 (material): the host list is curated, and it misses hosts that notes name as blocked.**
  Of 88 unverified claims, 49 have notes. At least 8 more are held on a blocked host the list does not
  contain, so scan cannot see them:
  - cs.hailstone-27-climbs.c4: Springer, fit.vut.cz
  - lifehacks.lh-duty-cycle-energy.c6: ofgem.gov.uk, eia.gov, energy.gov (403)
  - lifehacks.lh-same-energy-new-tariff.c6 and lifehacks.lh-standby-days-add-up.c6: "same gap",
    energy regulators
  - lifehacks.lh-scale-recipe-portions.c5: fsis.usda.gov, food.gov.uk, foodsafety.gov, cdc.gov,
    who.int, arxiv.org, pubs.aip.org, doaj.org, semanticscholar, openalex
  - lifehacks.mail-exact-phrase.recall and lifehacks.mail-minus-noise.recall: support.google.com (403)
  - lifehacks.tote-balance-sides.c1: www.rei.com (proxy 403)

  The defensible figure is therefore **at least 11 held claims, not 3**, and roughly 45 or more hosts,
  not 31. Some of these (the tote and hailstone claims) also have a non-web fix on offer, such as a
  derivation or a reword. That should be weighed in W-556, not left out of the count.
- Gap 2 (ranking): two French history notes each name about 20 hosts. So 20 of the 31 hosts show
  "claims 2", and the "by claims held" order cannot tell those hosts apart. Count held claims once,
  across hosts, and show them that way. Per-host counts are not additive.
- Gap 3 (records): en.wikipedia.org has 151 records because bare "Wikipedia" maps to it. Treat its
  record count as an upper bound.

## (c) Fit for W-556

Fit, on conditions:
- **C1 (before W-556 cites a number):** tools-lead adds the hosts above to blocked-hosts.json, plus
  `match` regexes, and re-runs `scan` (no probe needed). The board item quotes the result as distinct
  held claims.
- **C2:** W-556 quotes held claims as a distinct-id count, not per-host sums or the per-host ranking.
- **C3:** probe cadence is once per wave at most, recorded in the knowledge README.
- The inform-not-judge boundary holds. Nothing reads or writes a claim status, and the README forbids
  holding a claim, or routing around a host, because of the list. I endorse that boundary as written.

Objections raised here travel to W-556. The owner of that decision should answer C1 and C2 there.
