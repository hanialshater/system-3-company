import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0993", "title": "A gas rarely returns to one side", "op": "allindep", "labels": ["P", "Count"], "outputs": ["Probability"], "a": [0.5, 10.0], "b": [0.5, 30.0], "question": "Each of 10 independent required stages succeeds with probability 0.5. What is the probability all stages succeed?", "questionTemplate": "Each of {Count} independent required stages succeeds with probability {P}. What is the probability all stages succeed?", "explain": "Multiplication requires the stated independence. More required stages can lower the final success chance despite favorable individual odds.", "lens": "the independent equilibrium occupancy of every particle", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
