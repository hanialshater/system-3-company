import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0453", "title": "Repairs added to the estimate", "op": "fee", "labels": ["Base", "Discount", "Surcharge"], "outputs": ["Final"], "a": [100.0, 0.0, 80.0], "b": [100.0, 0.0, 0.0], "question": "A toy price starts at 100, subtracts discount 0, and adds surcharge 80. What is the final price?", "questionTemplate": "A toy price starts at {Base}, subtracts discount {Discount}, and adds surcharge {Surcharge}. What is the final price?", "explain": "Compare final prices under the two labels. Fairness or preference judgments are not implied by equal arithmetic.", "lens": "the complete bill with specified extra repairs", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
