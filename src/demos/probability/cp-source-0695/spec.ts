import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0695", "title": "Pace a daily advertising budget", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [100.0, 4.0, 10.0], "b": [100.0, 4.0, 20.0], "question": "A toy budget starts with 100 and spends 10 per day for 4 days. What remains?", "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "the spend rate determining the remaining budget", "kind": "timeline", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
