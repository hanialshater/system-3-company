import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0306", "title": "Reward now, activity later", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [100.0, 10.0, 3.0], "b": [100.0, 10.0, 6.0], "question": "A toy budget starts with 100 and spends 3 per day for 10 days. What remains?", "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "a specified activity path rather than a universal reward effect", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
