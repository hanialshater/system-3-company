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
