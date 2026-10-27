import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0160", "title": "One path through a toy forest", "op": "allindep", "labels": ["P", "Count"], "outputs": ["Probability"], "a": [0.6, 10.0], "b": [0.9, 10.0], "question": "Each of 10 independent required stages succeeds with probability 0.6. What is the probability all stages succeed?", "questionTemplate": "Each of {Count} independent required stages succeeds with probability {P}. What is the probability all stages succeed?", "explain": "Multiplication requires the stated independence. More required stages can lower the final success chance despite favorable individual odds.", "lens": "a single independent tree corridor rather than a grid threshold", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
