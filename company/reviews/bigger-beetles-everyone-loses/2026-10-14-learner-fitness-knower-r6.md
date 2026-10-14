*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): bigger-beetles-everyone-loses
lesson version: v1
boundary: knows that fitness depends on whom you meet (strategy-builder) (meta.json learner field); has never met evolutionarily stable strategies or the idea that selection can make everyone worse off.
Screenshots seen: yes (artifacts/walkthroughs/bigger-beetles-everyone-loses/sheet.png, 6 frames; integrated build 3 at localhost:3470)
Verdict: revise

## 1. From the artifact (written before reading the brief)

- **The title gives the answer.** "Bigger beetles, everyone loses" sits above a question whose answer is "Lower than 6". The hook ("Is the population better off?") is neutral, but the title has already said no. A learner with the misconception (evolution improves the average) reads the title, then picks "Lower than 6" because the card told them, not because they reasoned it. The prediction, which the reveal answers, is spent before it is made. This is the W-154 pattern (answer leaked before commit), through the title.
- Predict otherwise: the payoff table (small/large × vs small/vs large: 6, 2 / 8, 4) is on the locked stage and in the stem. "Score = surviving offspring, no baseline" is a helpful line. The chart is hidden until commit. The question is precise.
- Explore: "+5 generations" gives 4.1% large, average 5.9, and "large 7.8, small 5.8. Large spread." "Run to gen 30" draws an S-curve to 100% large: "Everyone now averages 4.0, not 6." "Turn 5% small" drops to 95% large with "large 4.2, small 2.2" and "Small mutants score less among large ones (2 vs 4)." All three parts of the idea are on stage: large spreads, the average falls, and small cannot re-invade. The S-curve and the 6 → 4 readout carry it well.
- Stability is shown as a score comparison at the moment of the mutation, not as the mutants dying out. On the QA path the next press is "Restart", so I never see the 95% climb back to 100%. A learner who presses "+5 generations" after the mutation would. A one-line "+5 after the mutation" step would make "cannot get back in" seen rather than inferred.
- QA path: "Restart" runs last, so the reveal reads over a gen-0 stage (1.0%, 6.0) while it talks about generation 24 and 4. Minor.
- Reveal: "Large beetles went from 1% to 99% by generation 24". I never saw "99%" or "generation 24" as numbers; I saw 100% at gen 30 and a curve. This is W-150 (values never visited). Minor here, because the curve shows it, but the number should match the stage. The rest points at what I saw: 8 vs 6, 4 vs 2, the mutant 2 vs 4, average 6 → 4. "Evolutionarily stable" is named once with a definition. The toy-model disclaimer is good. About 110 words.
- No FATAL: the table supports "large beats small against either opponent" (8 > 6, 4 > 2), and the all-large average is 4.

## 2. After reading the brief (meta.json learner, objective, misconception only)

No earlier learner review exists (only a fact-check; build.md not read).

- doesNotKnow "a strategy can invade and become stable even though everyone ends up with less": invade (S-curve), stable (mutant score 2.2 vs 4.2), everyone less (6 → 4) are all on stage. Show the why you promised: pass.
- Objective quotes "1% to 99% (by generation 24)". The stage stops at gen 5 and gen 30, so the reveal's number comes from the brief, not from the learner's run.
- Misconception "evolution makes a population better off": the stage refutes it clearly, but the title spends the surprise.

## 3. Findings

1. **Revise (top):** the title "Bigger beetles, everyone loses" states the answer before the prediction. A neutral title (for example "Bigger beetles take over. Then what?") keeps the trap.
2. Minor: "99% by generation 24" is quoted but never shown. Quote gen 30 / 100%, or label the curve where it crosses 99%.
3. Minor: stability is inferred from one score pair. Stepping on after "Turn 5% small" would show the mutants vanish.
4. Minor: on the QA path the reveal reads over a restarted stage.
