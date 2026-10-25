import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0615", "title": "Measure one toy approximation error", "op": "gaussiankl", "labels": ["Mean", "SD"], "outputs": ["KL"], "a": [0.0, 0.5], "b": [0.0, 1.0], "question": "Q is toy Normal(0,0.5²), P standard normal. What is KL(Q||P) in nats?", "questionTemplate": "Q is toy Normal({Mean},{SD}²), P standard normal. What is KL(Q||P) in nats?", "explain": "A Gaussian approximation can differ in location and scale. This exact family comparison does not evaluate approximation error for a non-Gaussian target.", "lens": "the Gaussian-family comparison rather than a measured inference race", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
