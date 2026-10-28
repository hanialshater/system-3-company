import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0243", "title": "Accuracy and precision contribute", "op": "mse", "labels": ["Bias", "Variance", "Noise"], "outputs": ["MSE"], "a": [2.0, 0.1, 0.0], "b": [0.0, 4.0, 0.0], "question": "A toy squared-error decomposition has Bias 2, estimation Variance 0.1, and irreducible Noise variance 0. What MSE results?", "questionTemplate": "A toy squared-error decomposition has Bias {Bias}, estimation Variance {Variance}, and irreducible Noise variance {Noise}. What MSE results?", "explain": "Bias squared, variance and noise contribute separately. Lower training error does not establish lower new-data error.", "lens": "squared bias versus sampling variance", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
