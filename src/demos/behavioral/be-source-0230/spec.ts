import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0230", "title": "The thesis finish date", "op": "overrun", "labels": ["Planned", "Actual"], "outputs": ["Overrun"], "a": [33.9, 55.5], "b": [50.0, 55.5], "question": "A toy task was planned at 33.9 and used 55.5. What percentage over the plan did it run?", "explain": "The plan is the denominator for an overrun. Forecast error and its cause remain separate questions.", "lens": "the planned duration as the overrun denominator", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy task was planned at {Planned} and used {Actual}. What percentage over the plan did it run?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
