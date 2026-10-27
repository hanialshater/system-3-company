import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0774", "title": "Independent features multiply odds", "op": "messages", "labels": ["Prior", "LR1", "LR2"], "outputs": ["Posterior"], "a": [0.2, 4.0, 4.0], "b": [0.2, 4.0, 1.0], "question": "Toy prior 0.2 receives two conditionally independent evidence likelihood ratios LR1 4, LR2 4. What posterior results?", "questionTemplate": "Toy prior {Prior} receives two conditionally independent evidence likelihood ratios LR1 {LR1}, LR2 {LR2}. What posterior results?", "explain": "Likelihood messages multiply odds under the stated conditional independence. Dependent evidence must not be counted as independent.", "lens": "the conditional independence assumption in naive Bayes", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
