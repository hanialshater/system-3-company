import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0294", "title": "Equal changes, different slopes", "op": "slope", "labels": ["GainSlope", "LossSlope", "Size"], "outputs": ["Difference"], "a": [1.0, 2.0, 5.0], "b": [1.0, 1.0, 5.0], "question": "A toy response has slope 1 for gains and 2 for losses. For size 5, how much larger is the loss-side response?", "questionTemplate": "A toy response has slope {GainSlope} for gains and {LossSlope} for losses. For size {Size}, how much larger is the loss-side response?", "explain": "Two different slopes encode asymmetric sensitivity. The chosen slopes illustrate a model and do not validate a psychological or brain finding.", "lens": "an explicitly asymmetric response rule", "kind": "curve", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
