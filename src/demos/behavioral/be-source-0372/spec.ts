import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0372", "title": "A bag tax and a bag bonus", "op": "fee", "labels": ["Base", "Discount", "Surcharge"], "outputs": ["Final"], "a": [1.0, 0.0, 0.05], "b": [1.0, 0.05, 0.0], "question": "A toy price starts at 1, subtracts discount 0, and adds surcharge 0.05. What is the final price?", "questionTemplate": "A toy price starts at {Base}, subtracts discount {Discount}, and adds surcharge {Surcharge}. What is the final price?", "explain": "Compare final prices under the two labels. Fairness or preference judgments are not implied by equal arithmetic.", "lens": "the final monetary consequence of each label", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
