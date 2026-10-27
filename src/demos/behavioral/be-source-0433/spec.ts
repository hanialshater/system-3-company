import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0433", "title": "The time spent commuting", "op": "flow", "labels": ["Income", "Days", "Spend"], "outputs": ["Remaining"], "a": [168.0, 5.0, 2.0], "b": [168.0, 5.0, 0.5], "question": "A toy budget starts with 168 and spends 2 per day for 5 days. What remains?", "questionTemplate": "A toy budget starts with {Income} and spends {Spend} per day for {Days} days. What remains?", "explain": "The timing of an inflow and the rate of spending determine the remaining buffer. The schedule is an illustration, not observed household data.", "lens": "the weekly time budget behind a commute tradeoff", "kind": "timeline", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
