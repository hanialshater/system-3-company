import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0088", "title": "An account people may decline", "op": "uptake", "labels": ["Eligible", "Uptake", "Increase"], "outputs": ["Added"], "a": [100.0, 0.28, 81.0], "b": [100.0, 1.0, 81.0], "question": "A toy program has 100 eligible units, uptake fraction 0.28, and added amount 81 per participant. What total is added?", "explain": "Separate the effect among participants from the share who participate. Scaling a program requires both pieces.", "lens": "the share reached by a commitment offer", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy program has {Eligible} eligible units, uptake fraction {Uptake}, and added amount {Increase} per participant. What total is added?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
