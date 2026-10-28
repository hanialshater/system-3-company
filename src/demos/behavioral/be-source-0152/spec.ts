import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0152", "title": "Pay to wait for a decision", "op": "fee", "labels": ["Base", "Discount", "Surcharge"], "outputs": ["Final"], "a": [100.0, 0.0, 5.0], "b": [100.0, 0.0, 0.0], "question": "A toy price starts at 100, subtracts discount 0, and adds surcharge 5. What is the final price?", "explain": "Compare final prices under the two labels. Fairness or preference judgments are not implied by equal arithmetic.", "lens": "the cost of delay when final outcomes are unchanged", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy price starts at {Base}, subtracts discount {Discount}, and adds surcharge {Surcharge}. What is the final price?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
