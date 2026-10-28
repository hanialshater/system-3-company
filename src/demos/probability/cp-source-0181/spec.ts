import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0181", "title": "A toy language feature changes odds", "op": "posteriorodds", "labels": ["Prior", "LR"], "outputs": ["Posterior"], "a": [0.5, 9.0], "b": [0.5, 0.1111111111111111], "question": "A toy hypothesis has prior probability 0.5; evidence has likelihood ratio 9 in its favor. What is its posterior probability?", "questionTemplate": "A toy hypothesis has prior probability {Prior}; evidence has likelihood ratio {LR} in its favor. What is its posterior probability?", "explain": "A likelihood ratio multiplies prior odds, rather than replacing the prior probability. The likelihood model must be specified.", "lens": "the feature likelihood ratio in a two-language model", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
