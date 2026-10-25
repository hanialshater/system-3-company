import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0114", "title": "A zero prior stays zero", "op": "posteriorodds", "labels": ["Prior", "LR"], "outputs": ["Posterior"], "a": [0.0, 100.0], "b": [0.01, 100.0], "question": "A toy hypothesis has prior probability 0; evidence has likelihood ratio 100 in its favor. What is its posterior probability?", "questionTemplate": "A toy hypothesis has prior probability {Prior}; evidence has likelihood ratio {LR} in its favor. What is its posterior probability?", "explain": "A likelihood ratio multiplies prior odds, rather than replacing the prior probability. The likelihood model must be specified.", "lens": "the difference between impossible and merely unlikely", "kind": "grid", "answerPosition": 0, "recall": [0.02, 20.0]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
