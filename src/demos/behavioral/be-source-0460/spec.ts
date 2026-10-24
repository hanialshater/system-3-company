import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0460", "title": "An estimated classroom share", "op": "uptake", "labels": ["Eligible", "Uptake", "Increase"], "outputs": ["Added"], "a": [1000.0, 0.04, 1.0], "b": [1000.0, 0.05, 1.0], "question": "A toy program has 1000 eligible units, uptake fraction 0.04, and added amount 1 per participant. What total is added?", "questionTemplate": "A toy program has {Eligible} eligible units, uptake fraction {Uptake}, and added amount {Increase} per participant. What total is added?", "explain": "Separate the effect among participants from the share who participate. Scaling a program requires both pieces.", "lens": "the count implied by the endpoints of a stated range", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
