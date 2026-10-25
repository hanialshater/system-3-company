import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0764", "title": "Multiply evidence messages on odds", "op": "messages", "labels": ["Prior", "LR1", "LR2"], "outputs": ["Posterior"], "a": [0.2, 3.0, 4.0], "b": [0.2, 3.0, 1.0], "question": "Toy prior 0.2 receives two conditionally independent evidence likelihood ratios LR1 3, LR2 4. What posterior results?", "questionTemplate": "Toy prior {Prior} receives two conditionally independent evidence likelihood ratios LR1 {LR1}, LR2 {LR2}. What posterior results?", "explain": "Likelihood messages multiply odds under the stated conditional independence. Dependent evidence must not be counted as independent.", "lens": "two independent evidence factors in a tree ingredient", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
