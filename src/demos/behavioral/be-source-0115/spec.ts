import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0115", "title": "A predictable refund arrives", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [1000.0, 5.0, 100.0], "b": [1000.0, 5.0, 150.0], "question": "A toy budget starts with 1000 and spends 100 per day for 5 days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "a buffer after a stated spending path", "kind": "timeline", "answerPosition": 1, "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
