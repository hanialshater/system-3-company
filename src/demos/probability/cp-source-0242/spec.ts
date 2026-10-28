import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0242", "title": "Training fit is not prediction error", "op": "mse", "labels": ["Bias", "Variance", "Noise"], "outputs": ["MSE"], "a": [0.0, 4.0, 1.0], "b": [1.0, 0.5, 1.0], "question": "A toy squared-error decomposition has Bias 0, estimation Variance 4, and irreducible Noise variance 1. What MSE results?", "questionTemplate": "A toy squared-error decomposition has Bias {Bias}, estimation Variance {Variance}, and irreducible Noise variance {Noise}. What MSE results?", "explain": "Bias squared, variance and noise contribute separately. Lower training error does not establish lower new-data error.", "lens": "bias and variance in an explicit error decomposition", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
