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
