import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0108", "title": "Evidence rewards concentrated prediction", "op": "posteriorodds", "labels": ["Prior", "LR"], "outputs": ["Posterior"], "a": [0.5, 4.0], "b": [0.5, 0.25], "question": "A toy hypothesis has prior probability 0.5; evidence has likelihood ratio 4 in its favor. What is its posterior probability?", "questionTemplate": "A toy hypothesis has prior probability {Prior}; evidence has likelihood ratio {LR} in its favor. What is its posterior probability?", "explain": "A likelihood ratio multiplies prior odds, rather than replacing the prior probability. The likelihood model must be specified.", "lens": "the marginal likelihood ratio of two stated models", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
