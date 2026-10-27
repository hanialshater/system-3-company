import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0291", "title": "Installments still add up", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [300.0, 4.0, 50.0], "b": [300.0, 4.0, 80.0], "question": "A toy budget starts with 300 and spends 50 per day for 4 days. What remains?", "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "the total cash commitment behind small installments", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
