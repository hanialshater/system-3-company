import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0847", "title": "A shared budget can starve controls", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [100.0, 4.0, 10.0], "b": [100.0, 4.0, 20.0], "question": "A toy budget starts with 100 and spends 10 per day for 4 days. What remains?", "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "the shared resource remaining after faster treatment spending", "kind": "timeline", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
