import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0046", "title": "A word changes spam odds", "op": "posteriorodds", "labels": ["Prior", "LR"], "outputs": ["Posterior"], "a": [0.2, 8.0], "b": [0.2, 0.25], "question": "A toy hypothesis has prior probability 0.2; evidence has likelihood ratio 8 in its favor. What is its posterior probability?", "questionTemplate": "A toy hypothesis has prior probability {Prior}; evidence has likelihood ratio {LR} in its favor. What is its posterior probability?", "explain": "A likelihood ratio multiplies prior odds, rather than replacing the prior probability. The likelihood model must be specified.", "lens": "the likelihood ratio of a specified word", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
