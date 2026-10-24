import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0046", "title": "Same number, three frames", "op": "fee", "labels": ["Base", "Discount", "Surcharge"], "outputs": ["Final"], "a": [100.0, 20.0, 0.0], "b": [80.0, 0.0, 0.0], "question": "A toy price starts at 100, subtracts discount 20, and adds surcharge 0. What is the final price?", "explain": "Compare final prices under the two labels. Fairness or preference judgments are not implied by equal arithmetic.", "lens": "outcome equivalence across labels", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy price starts at {Base}, subtracts discount {Discount}, and adds surcharge {Surcharge}. What is the final price?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
