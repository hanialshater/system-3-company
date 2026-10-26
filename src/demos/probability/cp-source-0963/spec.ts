import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0963", "title": "The Hurst exponent changes scaling", "op": "roughness", "labels": ["Scale", "H"], "outputs": ["IncrementSD"], "a": [0.1, 0.2], "b": [0.1, 0.8], "question": "A unit-scale toy fractional Brownian increment over distance Scale 0.1 has Hurst exponent H 0.2. What increment SD results?", "questionTemplate": "A unit-scale toy fractional Brownian increment over distance Scale {Scale} has Hurst exponent H {H}. What increment SD results?", "explain": "The power law specifies increment scaling. It describes a Gaussian process law rather than one rendered terrain.", "lens": "the Gaussian increment scale at a fixed distance", "kind": "curve", "answerPosition": 0, "plot": [0, 0.01, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
