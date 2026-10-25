import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0434", "title": "Compare toy effect-estimator errors", "op": "mse", "labels": ["Bias", "Variance", "Noise"], "outputs": ["MSE"], "a": [0.1, 0.2, 0.0], "b": [0.5, 0.01, 0.0], "question": "A toy squared-error decomposition has Bias 0.1, estimation Variance 0.2, and irreducible Noise variance 0. What MSE results?", "questionTemplate": "A toy squared-error decomposition has Bias {Bias}, estimation Variance {Variance}, and irreducible Noise variance {Noise}. What MSE results?", "explain": "Bias squared, variance and noise contribute separately. Lower training error does not establish lower new-data error.", "lens": "the bias-variance risk rather than an estimator's name", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
