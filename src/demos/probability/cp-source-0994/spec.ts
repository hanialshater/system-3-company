import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0994", "title": "Orders change a displayed imbalance", "op": "net", "labels": ["Endowment", "Bonus", "Penalty"], "outputs": ["Net"], "a": [0.0, 10.0, 8.0], "b": [0.0, 10.0, 15.0], "question": "A toy account starts at 0, receives 10, and pays back 8. What final balance remains?", "questionTemplate": "A toy account starts at {Endowment}, receives {Bonus}, and pays back {Penalty}. What final balance remains?", "explain": "Track the final balance as well as the wording. Equivalent cash paths can carry different descriptions without changing the arithmetic.", "lens": "the submitted buy-minus-sell count before order-book matching", "kind": "timeline", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
