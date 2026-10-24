import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0095", "title": "The start of a new period", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [100.0, 7.0, 8.0], "b": [100.0, 7.0, 10.0], "question": "A toy budget starts with 100 and spends 8 per day for 7 days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "a planning boundary and a stated daily rate", "kind": "timeline", "answerPosition": 2, "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
