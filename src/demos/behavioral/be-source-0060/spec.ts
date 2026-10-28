import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0060", "title": "Withdraw a discount", "op": "fee", "labels": ["Base", "Discount", "Surcharge"], "outputs": ["Final"], "a": [100.0, 10.0, 0.0], "b": [90.0, 0.0, 10.0], "question": "A toy price starts at 100, subtracts discount 10, and adds surcharge 0. What is the final price?", "explain": "Compare final prices under the two labels. Fairness or preference judgments are not implied by equal arithmetic.", "lens": "the comparison price used by a description", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy price starts at {Base}, subtracts discount {Discount}, and adds surcharge {Surcharge}. What is the final price?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
