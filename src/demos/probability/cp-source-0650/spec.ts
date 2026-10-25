import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0650", "title": "Expected improvement at one point", "op": "ei", "labels": ["Mean", "SD", "Best"], "outputs": ["Improvement"], "a": [0.8, 0.2, 1.0], "b": [0.8, 1.0, 1.0], "question": "A toy normal objective at one candidate has Mean 0.8, SD 0.2; current Best 1. What is expected positive improvement over the best?", "questionTemplate": "A toy normal objective at one candidate has Mean {Mean}, SD {SD}; current Best {Best}. What is expected positive improvement over the best?", "explain": "Expected improvement combines the chance and size of beating the current best. The normal predictive distribution and current best are explicit assumptions.", "lens": "one acquisition function rather than a full optimizer comparison", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
