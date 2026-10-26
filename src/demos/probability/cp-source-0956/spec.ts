import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0956", "title": "One Fourier feature contributes a wave", "op": "coskernel", "labels": ["Distance", "Omega"], "outputs": ["Kernel"], "a": [1.0, 1.0], "b": [1.0, 3.0], "question": "One toy Fourier feature uses angular frequency Omega 1. What cosine kernel contribution occurs at Distance 1?", "questionTemplate": "One toy Fourier feature uses angular frequency Omega {Omega}. What cosine kernel contribution occurs at Distance {Distance}?", "explain": "Averaging random-frequency contributions can approximate a stationary kernel. One chosen contribution is not a converged approximation.", "lens": "the sampled angular frequency before kernel averaging", "kind": "curve", "answerPosition": 2, "plot": [0, 0, 5]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
