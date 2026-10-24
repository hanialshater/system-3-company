import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0231", "title": "A rail budget changes", "op": "overrun", "labels": ["Planned", "Actual"], "outputs": ["Overrun"], "a": [100.0, 145.0], "b": [100.0, 110.0], "question": "A toy task was planned at 100 and used 145. What percentage over the plan did it run?", "explain": "The plan is the denominator for an overrun. Forecast error and its cause remain separate questions.", "lens": "the absolute budget behind a percentage overrun", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy task was planned at {Planned} and used {Actual}. What percentage over the plan did it run?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
