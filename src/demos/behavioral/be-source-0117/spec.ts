import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0117", "title": "A monthly food budget", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [300.0, 20.0, 12.0], "b": [300.0, 25.0, 12.0], "question": "A toy budget starts with 300 and spends 12 per day for 20 days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "the shrinking remainder within a fixed payment cycle", "kind": "timeline", "answerPosition": 0, "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
