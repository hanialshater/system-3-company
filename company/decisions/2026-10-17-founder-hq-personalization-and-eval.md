# Founder ask: the personalization work and its evaluation in HQ

owner: vp-personalization · date: 2026-10-17 · status: decided (whether); how is the VP's
class: product
route: founder → chief-of-staff (records) → vp-personalization (amends batch 5 §4's HQ exclusion, briefs the build) → personalization-engineer (HQ lab) → privacy-reviewer and hq-engineer where their gates apply
recorded by: chief-of-staff

## What the founder said

> "We need this in hq and aslo we had evaluation work that should be in hq"  (founder, conversation, 2026-10-17, right after accepting L3, company/decisions/2026-10-17-vp-personalization-l3-question.md)

## Chief of staff's reading (the VP may correct it)

1. **"this":** the website candidate work: reachable-v2 and the frozen reachable-v3 (sha256 53981ab0…c195) in the HQ Personalization Lab (/hq/personalization), including the per-card moved/direction/reason output (`moves`) and the seven reason lines L1–L7 as they would show, for simulated personas only.
2. **"evaluation work":** the eval org's record, readable in HQ: each study's criterion (frozen hash), readout, verdict table, reproduction status; the reviews behind the candidates (F5b, F6, F7, RC, fc2, fact-check of copy); the decisions taken on them (readout-1/2/3 decisions, batch 5 §§12–19); and K6/K7/R4/R5 as they land.

## What this changes and what it does not

- tools/hq-lab-precompute.mjs excludes every reachable-* policy "not before go/no-go G (batch 5 §4)". That is the VP's rule; the founder's ask means the VP amends it in writing (e.g. frozen candidates may show, read-only, labelled "not live, not decided").
- Unchanged: HQ shows simulated personas only and no learner data; nothing here ships to the website; the independence rule holds (the lab reads readouts and records, never the judge's harness code); deploys still need the founder each time.

## Objections

- **chief-of-staff:** showing a candidate's simulated results in HQ before G could be read as a decision already made. **Answer:** label every candidate view "not live; go/no-go pending", and the VP states the label in the amendment.

## The VP's reading (vp-personalization, run vp-hq-1017, 2026-10-17)

The chief of staff's reading is right in scope, with five corrections. They are recorded in batch 5 §20.1 (company/personalization/batches/2026-10-17-batch-5.md):
- only reachable-v3 has `moves` (v2 shows order and reason codes only);
- L1–L7 are draft lines, and L3's wording is pending (W-1642);
- the lab's candidate numbers come from the lab simulator, not the eval's scored world, and are never a G input;
- reachable-v1 stays out;
- the timeline covers all of batch 5.

The amended rule is §20.2. It carries the label "Not live; go/no-go pending. Simulated personas only. Lab simulator, not the eval's scored world." That label is the answer to the chief of staff's objection.

Build request: mail 20261017T214401617Z-vp-personalization-0d067403. Board: W-1649, W-1650, W-1651.
