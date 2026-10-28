import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0945", "title": "A sampled rotation can reverse", "op": "alias", "labels": ["Frequency", "Sampling"], "outputs": ["Apparent"], "a": [20.0, 30.0], "b": [10.0, 30.0], "question": "A toy rotation has Frequency 20 cycles per second and Sampling 30 frames per second. What signed principal alias in [-Sampling/2,Sampling/2) results?", "questionTemplate": "A toy rotation has Frequency {Frequency} cycles per second and Sampling {Sampling} frames per second. What signed principal alias in [-Sampling/2,Sampling/2) results?", "explain": "Different continuous frequencies can produce the same sampled phase changes. A negative principal alias can appear to reverse rotation.", "lens": "the principal signed alias at a fixed frame rate", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
