import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0211", "title": "A small effect at large scale", "op": "uptake", "labels": ["Eligible", "Uptake", "Increase"], "outputs": ["Added"], "a": [68000000.0, 0.005, 1.0], "b": [6800000.0, 0.005, 1.0], "question": "A toy program has 6.8e+07 eligible units, uptake fraction 0.005, and added amount 1 per participant. What total is added?", "explain": "Separate the effect among participants from the share who participate. Scaling a program requires both pieces.", "lens": "the population needed to turn a small rate into a count", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy program has {Eligible} eligible units, uptake fraction {Uptake}, and added amount {Increase} per participant. What total is added?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
