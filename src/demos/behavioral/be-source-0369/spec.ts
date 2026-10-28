import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0369", "title": "A large reach with zero lift", "op": "uptake", "labels": ["Eligible", "Uptake", "Increase"], "outputs": ["Added"], "a": [800000.0, 0.5, 0.0], "b": [800000.0, 0.5, 0.03], "question": "A toy program has 800000 eligible units, uptake fraction 0.5, and added amount 0 per participant. What total is added?", "questionTemplate": "A toy program has {Eligible} eligible units, uptake fraction {Uptake}, and added amount {Increase} per participant. What total is added?", "explain": "Separate the effect among participants from the share who participate. Scaling a program requires both pieces.", "lens": "the difference between program reach and assumed incremental impact", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
