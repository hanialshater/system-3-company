import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0286", "title": "The hidden add-on", "op": "fee", "labels": ["Base", "Discount", "Surcharge"], "outputs": ["Final"], "a": [30.0, 0.0, 20.0], "b": [45.0, 0.0, 0.0], "question": "A toy price starts at 30, subtracts discount 0, and adds surcharge 20. What is the final price?", "questionTemplate": "A toy price starts at {Base}, subtracts discount {Discount}, and adds surcharge {Surcharge}. What is the final price?", "explain": "Compare final prices under the two labels. Fairness or preference judgments are not implied by equal arithmetic.", "lens": "the complete price after add-on fees", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
