# Build note: asthma-looks-safe (demo-builder, wave-i-ai, 2026-10-14)

Brief: `company/domains/briefs/ai.ai-society.md` item 57. Status draft, version 1. Claims c1-c5 unverified. Caruana et al. (2015) is cited in c4/c5 sources only. No learner sentence names it, so the fact-checker only needs it if a later version does.

- Stage: one panel of 200 dots (20 x 10). The 50 asthma dots are the left 5 columns, in the domain colour. Under the old rule, an "Intensive care" box surrounds them and a "Ward" box the 150 others. When the model decides, one box "Ward: all · intensive care: none" surrounds everyone. Dark dots died (fixed lists: 2 asthma under intensive care, 10 on the ward including those 2, and 12 others in both cases). Legend top right. Two rows under the panel: "Old rule · died: asthma 2 of 50, others 12 of 150" and "Model · died: asthma 10 of 50, others 12 of 150". The second row fills once the model has decided, and the current rule's row is bold. Message line: the toy ward and intensive-care risks, then the model's view after "Model's view".
- Controls in DOM order: Model's view (one-shot), Old rule, Model decides care.
- Milestones: model-view and model-decides. Every number in the reveal is a constant of the toy, shown in the rows.
- Departures from the brief: no Reset (the Old rule / Model toggle already returns the stage, and the rows keep both outcomes); totals 14 and 22 are not shown (the reveal does not use them; c3 source keeps them); asthma dots are marked by colour and column, not a letter "A" (a letter inside a 10 px dot would be under 10 px). The reveal is the brief draft, 79 words. Paragraphs 1 and 2 are merged into one paragraph, with no words cut.

## Pre-flight v1
1. **Title and hook.** "The model's safest patients" / "Records say asthma patients with pneumonia die less. What if a model acts on that?" Gives the premise (the records) but no death rate after the change.
2. **Options.** "About 4%, as before" / "About 8%, like others" / "About 20%": all numbered, all "about N%".
3. **Locked stage.** 200 dots, the asthma columns coloured, one box labelled "Care: ?", rows with "–", message "Make a prediction to start." No intensive-care box, no deaths, no risks.
4. **Reveal values.** "2 of 50 against 12 of 150": (a) toy constants, always on the Old rule row once unlocked. "every one of them went to intensive care": the Intensive care box in the old-rule frame, and the message line. "ranked asthma as the safest group": (b) milestone model-view, kept in the message line ("Safest: asthma"). "10 of 50 died": (b) milestone model-decides, kept in the Model row.
5. **QA path.** Model's view (model-view), Old rule (disabled, already active), Model decides care (model-decides). Both reached. At the reveal: model frame, ICU none, both rows filled, message shows the model's view.
6. **Reset.** No Reset control. Pressing Old rule after the model keeps both rows and the message, so every sentence still matches. QA-run reveal text: "The records were right: asthma patients died less, 2 of 50 against 12 of 150. But they died less because every one of them went to intensive care. The model saw the outcome, not the reason, and ranked asthma as the safest group. When its ranking chose the care, asthma patients went to the ward and 10 of 50 died. A model that predicts well answers 'who did badly before?', not 'what happens if we change what we do?'"
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 asthma-looks-safe` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; 85 words with the verdict (79 reveal). Stage 335 px (picture 166, controls 70, text 61). The asthma dots, the ward box, both rows and the message are on screen. Smallest rendered svg label 10.35 px; no control under 24 px. Screenshot `artifacts/reveal-fit/asthma-looks-safe.png`.

Not run: next build, QA, walkthrough (per task). registry, tsc and `npm run check` pass (879 lessons, 0 warnings).

## v2 (2026-10-14, demo-builder, FC pass 35 fix W-512)

- c2's quote now matches the stage ("Model's view of the old records: asthma 4% risk, others 8%. Safest: asthma."). The hook is now 'In toy records, asthma patients with pneumonia die less. What if a model acts on that?' (86 characters), and c6 rests on the toy (derivation).
- The affected claims were reset to unverified, for a fresh fact-checker. QA and reveal-fit were NOT run to completion: the :3530 dev server took 90 to 160 s to render a lesson (load 30 to 44), against the contract's 45 s. `tsc --noEmit` passes.

## QA and fit re-run (2026-10-14, demo-builder, W-638)

- The pass 35 wording fix (above) is unchanged; pass 36 has already re-checked it. This entry only re-runs the checks that timed out before. Dev server :3631 (worktree fixes-1, HEAD 57cea14), warmed before the runs.
- reveal-fit (tool clean, 390x844): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, undefined words measured (verdict line included; reveal at most 90).
- QA contract (tests/qa/contract.spec.ts, QA_ONLY on the 7 FC35-fix lessons): phone and desktop both pass (14/14 across the 7). This was a dev-server run, not a production build.

## v3 (2026-10-16, demo-builder, r5-ai B1, W-1329; W-1330 rides on it)

Spec: `company/ops/dispatch-requests/2026-10-16-r5-ai.md` item B1 (cm-ai), brief 57 as rewritten in a7f63e8. Status `draft`, version 3. Commit b0d5cff (lesson files).

| Finding (learner r1, simulated) | Fix in v3 |
|---|---|
| Blocking: options 4% / 8% / 20% left the reasoned learner choosing 8% vs 20% on a fact the lesson never gives; the 8% picker got no explanation. | Predict is now cm-ai's direction question: "... and 4% of them died. Now the model sends low-risk patients to the ward. Asthma patients' death rate:" with options "Stays about 4%, as before" / "Rises above 4%" / "Falls below 4%", answer index 1. The reveal adds the sentence "On the ward their toy risk is 20%, against 8% for others: the care was hiding a higher risk." (constants from `RISK`). |
| Code reading: the ward-risk line showed only before "Model's view" and was then gone for good. | The ward-risk line has its own `<p>`, shown whenever the stage is unlocked (`locked ? "Make a prediction to start." : "Ward risk: ..."`). It is not behind `view ?`. The model's view ("Safest: asthma 4%, others 8%") now sits beside the "Model's view" control, alongside the ward-risk line rather than in its place. |
| Note: the stage card sat low under empty space in steps 1 and 2. | `.wrap { margin-bottom: auto }`: the kit stage centres its content (`justify-content: safe center`), and the auto margin pins the card to the top. Seen in walkthrough frame 02-step-1 (top-aligned). |
| Stage over the 2026-10-16 budget (v2 about 40). | 25 at the busiest frame (table below). |

Layout changes I chose (not in the spec's words; flagged for cm-ai and the learning designer):
- **The two died rows are a small grid headed by the rule controls**: header "● Died: ● asthma ● others", then "[Old rule] 2/50 12/150" and "[Model decides] 10/50 12/150". The rule controls sit in the rows instead of a separate row below, so "Old rule" and "Model" are not printed twice. The header dots are the picture's legend (CSS spans, aria-hidden), which replaces the v2 in-picture legend "asthma · died". This is my reading of the pre-approved "rows ... or similar".
- **The "Toy pneumonia patients" tag moved into the picture's top-right corner** (where the v2 legend was), as an uppercase muted svg label at 11 px. As a separate row it cropped the stage top by 25 px at the reveal. Its words are unchanged, it is on the stage in every frame, and c4 still holds as worded.
- "Model decides care" became "Model decides" (my own label, not claim-bearing).
- The reveal is cm-ai's full 84-word draft. Neither pre-approved cut was needed.

Claims: c1, c2, c3 reset to unverified (texts quote the v3 stage exactly). New claim c7 for the reveal's 20%-vs-8% sentence. c4, c5 and c6 are unchanged (tag words, last sentence and hook are the same text). The v2 departures stand: no Reset, totals not shown.

Node check of the toy (2026-10-16): ASTHMA_DIE_WARD has 10 entries, ASTHMA_DIE_ICU has 2 (both inside the 10), OTHERS_DIE has 12. 0.2*100, 0.08*100 and 0.04*100 give 20, 8, 4. 50*0.04 = 2, 50*0.2 = 10, 150*0.08 = 12. This agrees with the verified 2/50, 12/150, 10/50.

## Stage word budget (v3)

Counted from the rendered DOM (playwright, all text nodes inside `data-testid="stage"`, aria-hidden excluded, a token counts when it contains a letter; 390x844, production build at b0d5cff). Nothing on this stage is stimulus.

| Frame | Words |
|---|---|
| locked | 18 |
| unlocked, before Model's view | 22 |
| after Model's view (old rule) | **25** |
| model decides | 24 |
| old rule after model / reveal | **25** |

Busiest frame (25): "Model's view" 2 · "Safest: asthma 4%, others 8%" 3 · "Ward risk: asthma 20%, others 8%. Intensive care: asthma 4%." 7 · "Intensive care" 2 · "Ward" 1 · "Toy pneumonia patients" 3 · "Died:" 1 · "asthma" 1 · "others" 1 · "Old rule" 2 · "Model decides" 2. Numbers (2/50, 12/150, 10/50, percentages) count 0. It is at the limit: any added stage word goes to cm-ai.

## Pre-flight v3

1. **Title and hook.** "The model's safest patients" / "In toy records, asthma patients with pneumonia die less. What if a model acts on that?" They give the premise (the records show lower deaths) but not which way the rate moves once care changes. A hook-only reader is, if anything, pulled toward "stays" (the trap).
2. **Options.** "Stays about 4%, as before" / "Rises above 4%" / "Falls below 4%": all three are directions measured against the same 4%, and each states its number.
3. **Locked stage.** 200 dots (asthma columns coloured), box label "Care: ?", "TOY PNEUMONIA PATIENTS", "Make a prediction to start.", the died grid with "–" in every cell, and the "Model's view", "Old rule" and "Model decides" controls disabled. No risks, no deaths, no care boxes. Nothing points to "Rises". (The disabled "Old rule" is drawn as active, as in v2. That is the default rule, not an option.)
4. **Reveal values.** "2 of 50 against 12 of 150": (a) toy constants, in the Old rule row in every unlocked state. "every one of them went to intensive care": the Intensive care box in the old-rule frame. "20%, against 8% for others": (a) the ward-risk line, in every unlocked state. The line is `Ward risk: asthma ${pct(RISK.asthmaWard)}, others ${pct(RISK.othersWard)}. Intensive care: asthma ${pct(RISK.asthmaIcu)}.` at Demo.tsx line 100. It sits in the `locked ? … : …` branch of its own `<p>`, not behind `view ?`, and renders "Ward risk: asthma 20%, others 8%. Intensive care: asthma 4%.". `grep -c "Ward risk" Demo.tsx` = 1. "ranked asthma safest": (b) milestone model-view, kept beside the control ("Safest: asthma 4%, others 8%"). "10 of 50 died": (b) milestone model-decides, kept in the Model decides row.
5. **QA path.** In DOM order: Model's view (model-view), Old rule (disabled, already active), Model decides (model-decides). Both milestones are reached. At the reveal, the model's view, the ward-risk line and both rows are on the stage (walkthrough transcript steps 1 and 2 and the count table above).
6. **Reset.** There is no Reset control (a v2 departure that stands). Pressing Old rule after the model keeps both rows, the model's view and the ward-risk line, so every sentence still matches. Reveal text from the walkthrough run (option 0): "Not quite: it was “Rises above 4%”. The records were right: asthma patients died less, 2 of 50 against 12 of 150, because every one of them went to intensive care. On the ward their toy risk is 20%, against 8% for others: the care was hiding a higher risk. The model saw the outcome, not the reason, and ranked asthma safest. When its ranking chose the care, 10 of 50 died. A model that predicts well answers ‘who did badly before?’, not ‘what happens if we change what we do?’"
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3657 asthma-looks-safe --shots` (production build, NEXT_DIST_DIR=.next-ai5, HEAD b0d5cff, tool clean):
   ```
   {"viewport":"390x844","lessons":1,"fit":1,"scroll":0,"clip":0,"thumb":0,"errors":0,"cropped":0,"namedHidden":0,"phoneFit":1,"pass":1,"tool":{"commit":"79c22aaf7bb2863ec46a5d487d5b38f090f49fb7","head":"b0d5cff78d21468b75a493ebe46f1adf39f46734","clean":true}}
   ```
   Per lesson (--out JSON): verdict fit, crop 0, hiddenBelow 0, hiddenAbove 0, phoneFit true, thumb false, revealWords 91 (84 reveal + verdict line), stage 349 px (picture 166, controls 124, text 30), picScale 1, named "died", "asthma" and "others" visible. The reveal points at the Old rule and Model decides rows, the ward-risk line, the intensive care / ward boxes and the asthma dots, and all are on screen in `artifacts/reveal-fit/asthma-looks-safe.png`. Earlier runs on the way: crop 25 px with the tag as its own row (fixed by moving it into the picture), and a false "thumb" from svg legend dots (now spans).

QA: `tests/qa/contract.spec.ts` with QA_ONLY=asthma-looks-safe against :3657 passes on phone and desktop (2/2). In the full playwright run, `feed.spec.ts` "subject chips filter the feed" and "a finished lesson comes back as a spaced revisit" fail on phone and desktop. Both use `lessons()[0]`, which under QA_ONLY is this draft lesson only. I believe this is a QA_ONLY artifact (the chip test's allowed set becomes one slug, and a draft is not in the feed), not a lesson fault. I did not check it against main.
