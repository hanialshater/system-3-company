import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0763", "title": "Two callers update an alarm belief", "op": "messages", "labels": ["Prior", "LR1", "LR2"], "outputs": ["Posterior"], "a": [0.01, 10.0, 5.0], "b": [0.01, 10.0, 1.0], "question": "Toy prior 0.01 receives two conditionally independent evidence likelihood ratios LR1 10, LR2 5. What posterior results?", "questionTemplate": "Toy prior {Prior} receives two conditionally independent evidence likelihood ratios LR1 {LR1}, LR2 {LR2}. What posterior results?", "explain": "Likelihood messages multiply odds under the stated conditional independence. Dependent evidence must not be counted as independent.", "lens": "a second likelihood message under conditional independence", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
