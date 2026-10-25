import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0652", "title": "A tasting-score acquisition value", "op": "ei", "labels": ["Mean", "SD", "Best"], "outputs": ["Improvement"], "a": [7.0, 2.0, 8.0], "b": [8.0, 0.1, 8.0], "question": "A toy normal objective at one candidate has Mean 7, SD 2; current Best 8. What is expected positive improvement over the best?", "questionTemplate": "A toy normal objective at one candidate has Mean {Mean}, SD {SD}; current Best {Best}. What is expected positive improvement over the best?", "explain": "Expected improvement combines the chance and size of beating the current best. The normal predictive distribution and current best are explicit assumptions.", "lens": "the expected-improvement ingredient of a recipe-search analogy", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
