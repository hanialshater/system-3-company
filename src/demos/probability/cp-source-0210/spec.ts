import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0210", "title": "Reverse the KL arguments", "op": "binarykl", "labels": ["P", "Q"], "outputs": ["KLBits"], "a": [0.8, 0.5], "b": [0.5, 0.8], "question": "Two toy Bernoulli distributions have probabilities P 0.8 and Q 0.5, both strictly between zero and one. What is KL(P||Q) in bits?", "questionTemplate": "Two toy Bernoulli distributions have probabilities P {P} and Q {Q}, both strictly between zero and one. What is KL(P||Q) in bits?", "explain": "KL weights log probability ratios by the first distribution. Reversing its arguments changes those weights, so it need not be symmetric.", "lens": "the weighting distribution in directional divergence", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
