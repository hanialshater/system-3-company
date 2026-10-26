import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0932", "title": "Public guesses can update private odds", "op": "messages", "labels": ["Prior", "LR1", "LR2"], "outputs": ["Posterior"], "a": [0.5, 2.0, 1.0], "b": [0.5, 2.0, 10.0], "question": "Toy prior 0.5 receives two conditionally independent evidence likelihood ratios LR1 2, LR2 1. What posterior results?", "questionTemplate": "Toy prior {Prior} receives two conditionally independent evidence likelihood ratios LR1 {LR1}, LR2 {LR2}. What posterior results?", "explain": "Likelihood messages multiply odds under the stated conditional independence. Dependent evidence must not be counted as independent.", "lens": "the supplied social likelihood message under an independence assumption", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
