# Fact-check: long-cord-knots-itself (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c4 | verified | VERIFIED. Title and hook = meta.json; the new hook is a question with no figure. Question, options, answer 1 = spec. Key 'About half the time' rests on Raymer & Smith 2007 Table 1 (3 m string, 0.30 m box, 1 rev/s, 10 s: 55%), quoted from the PMC full text in company/reviews/lifehacks-200/fact-check-W3-2026-10-16.md (PMC2034230). This pass the PMC full text was not reachable (OAI: cannotDisseminateFormat; www.ncbi and mit.edu proxy 403); the abstract (Crossref, opened) confirms knotting rises with length above a critical length and saturates below 100%, consistent with 'Every time' being wrong. 'Almost never' contradicts 55%. |

## Sources this pass

- Raymer & Smith 2007, doi:10.1073/pnas.0611320104: Crossref record and abstract opened (api.crossref.org). The full text (PMC2034230) could not be reached: PMC OAI returns cannotDisseminateFormat, and www.ncbi.nlm.nih.gov and mit.edu return proxy 403. The 55% figure is traced to the Table 1 quotation in company/reviews/lifehacks-200/fact-check-W3-2026-10-16.md, which an earlier fact-checker took from the opened PMC full text.
- The W-1094 safety re-look belongs to lifehacks-safety-reviewer. This claim is a question about a study, not an instruction.
