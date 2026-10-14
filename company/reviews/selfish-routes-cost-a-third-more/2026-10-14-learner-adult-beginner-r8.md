*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8, build 5 walkthrough): selfish-routes-cost-a-third-more
lesson version: v4 (meta.json version 4; the walkthrough shows "Try every split" and the Lowest seen readout)
boundary: adult-beginner (knows drivers pick the faster road and a road gets slower as more drivers use it; does not know the selfish equilibrium can be worse on average than a planner's split, by up to 4/3 with linear delays). Same tag as r6/r7.
Screenshots seen: yes (artifacts/walkthroughs/selfish-routes-cost-a-third-more/sheet.png, 5 frames)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- No answer before the commit: pass, and the r7 blocking finding is fixed. The "Half on each" button is gone. The locked stage shows one dot at 100% / 60 min, buttons "All on B (selfish)" and "Try every split", Lowest seen "—". Options "No, 60 is best" / "Yes, to 45" / "Yes, to 30", one number each.
- The minimum is now shown: "Try every split" sweeps 100% → 0% and leaves a U-shaped trace with its bottom at 50%; LOWEST SEEN reads "45 min at 50%". I can see that 45 is the lowest and that it rises on both sides (r7 follow-on fixed).
- The hidden cost is on stage: "Of 100 drivers, at your lowest split, 50% on B: 5 more join, saving 135 min; the 50 on B lose 150." Still dense; I read it twice.
- **Main finding (text budget, The reveal fits with its picture): the reveal is ~129 words on a new version (budget 90).** Three paragraphs; the third (4/3, "fixed time plus a part proportional to traffic, the worst it can ever be") is told context.
- Related: in the reveal frame the chart is shrunk to a thin strip at the top of the stage. Its labels ("60 min", axis ticks, "share of drivers on road B") are about 3–4 px, unreadable, and the reveal's "your trace rises on both sides" points at that strip. Label size is a kit finding (W-287), not this lesson's. But the reveal fits today only because of the shrink; once W-287 floors the labels, the chart grows and the 129-word reveal will crop the stage top.
- Minor: after the sweep the slider sits at 0% with caption "Everyone on A: B would take 0 min…" and AVERAGE 60 min, so the live readouts at the reveal describe 0%, not the 50% the reveal talks about. LOWEST SEEN and the cost line carry the right values.

## 2. Earlier findings (r7), read after section 1

1. Blocking, "Half on each" button names the planner's split: FIXED.
2. Nothing showed 45 is the lowest: FIXED (sweep trace + Lowest seen).
3. Cost line dense: NOT FIXED (minor).
4. Reveal frame crops the chart: now the chart is shrunk, not cropped (kit W-287); still unreadable.

## 3. After reading build.md (Pre-flight v4)

- The builder says "Reveal trimmed to stay near 120 words": the 90-word budget for new versions was not applied. No Pre-flight item 7; the crop is deferred to "kit fix in progress", but the fit rule puts it on the lesson.
- Verdict: revise (word budget on a new version; fit depends on the kit shrink). No FATAL.
