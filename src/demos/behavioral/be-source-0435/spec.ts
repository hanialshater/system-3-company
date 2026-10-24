import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0435", "title": "Forty-seven percent of sampled moments", "op": "uptake", "labels": ["Eligible", "Uptake", "Increase"], "outputs": ["Added"], "a": [1000.0, 0.47, 1.0], "b": [2000.0, 0.47, 1.0], "question": "A toy program has 1000 eligible units, uptake fraction 0.47, and added amount 1 per participant. What total is added?", "questionTemplate": "A toy program has {Eligible} eligible units, uptake fraction {Uptake}, and added amount {Increase} per participant. What total is added?", "explain": "Separate the effect among participants from the share who participate. Scaling a program requires both pieces.", "lens": "the sampled-moment denominator in a reported share", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
