import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0363", "title": "Feedback and price response", "op": "slope", "labels": ["GainSlope", "LossSlope", "Size"], "outputs": ["Difference"], "a": [1.0, 3.0, 10.0], "b": [1.0, 1.0, 10.0], "question": "A toy response has slope 1 for gains and 3 for losses. For size 10, how much larger is the loss-side response?", "questionTemplate": "A toy response has slope {GainSlope} for gains and {LossSlope} for losses. For size {Size}, how much larger is the loss-side response?", "explain": "Two different slopes encode asymmetric sensitivity. The chosen slopes illustrate a model and do not validate a psychological or brain finding.", "lens": "the assumed sensitivity to the same price signal", "kind": "curve", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
