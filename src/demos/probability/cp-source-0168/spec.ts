import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0168", "title": "The favorite must survive each round", "op": "allindep", "labels": ["P", "Count"], "outputs": ["Probability"], "a": [0.7, 4.0], "b": [0.9, 4.0], "question": "Each of 4 independent required stages succeeds with probability 0.7. What is the probability all stages succeed?", "questionTemplate": "Each of {Count} independent required stages succeeds with probability {P}. What is the probability all stages succeed?", "explain": "Multiplication requires the stated independence. More required stages can lower the final success chance despite favorable individual odds.", "lens": "multiplication across independent tournament rounds", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
