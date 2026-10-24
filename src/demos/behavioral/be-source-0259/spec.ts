import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0259", "title": "Money follows the fund", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [1000.0, 5.0, -20.0], "b": [1000.0, 5.0, 10.0], "question": "A toy budget starts with 1000 and spends -20 per day for 5 days. What remains?", "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "the asymmetry of assumed inflows and outflows", "kind": "timeline", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
