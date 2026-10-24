import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0052", "title": "A fee with a different label", "op": "fee", "labels": ["Base", "Discount", "Surcharge"], "outputs": ["Final"], "a": [100.0, 0.0, 10.0], "b": [110.0, 0.0, 0.0], "question": "A toy price starts at 100, subtracts discount 0, and adds surcharge 10. What is the final price?", "explain": "Compare final prices under the two labels. Fairness or preference judgments are not implied by equal arithmetic.", "lens": "the final bill rather than a label", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy price starts at {Base}, subtracts discount {Discount}, and adds surcharge {Surcharge}. What is the final price?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
