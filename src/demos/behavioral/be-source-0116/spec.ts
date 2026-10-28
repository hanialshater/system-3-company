import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0116", "title": "The day the check arrives", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [900.0, 10.0, 30.0], "b": [900.0, 20.0, 30.0], "question": "A toy budget starts with 900 and spends 30 per day for 10 days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "the cash remaining across a payment cycle", "kind": "timeline", "answerPosition": 2, "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
