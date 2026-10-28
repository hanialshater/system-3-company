import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0620", "title": "A supplied simulation likelihood ratio", "op": "posteriorodds", "labels": ["Prior", "LR"], "outputs": ["Posterior"], "a": [0.3, 5.0], "b": [0.3, 0.2], "question": "A toy hypothesis has prior probability 0.3; evidence has likelihood ratio 5 in its favor. What is its posterior probability?", "questionTemplate": "A toy hypothesis has prior probability {Prior}; evidence has likelihood ratio {LR} in its favor. What is its posterior probability?", "explain": "A likelihood ratio multiplies prior odds, rather than replacing the prior probability. The likelihood model must be specified.", "lens": "the numerical posterior update rather than a trained neural estimator", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
