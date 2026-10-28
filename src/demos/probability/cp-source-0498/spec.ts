import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0498", "title": "A blended predictor under toy risks", "op": "mse", "labels": ["Bias", "Variance", "Noise"], "outputs": ["MSE"], "a": [0.1, 0.8, 0.2], "b": [0.1, 0.2, 0.2], "question": "A toy squared-error decomposition has Bias 0.1, estimation Variance 0.8, and irreducible Noise variance 0.2. What MSE results?", "questionTemplate": "A toy squared-error decomposition has Bias {Bias}, estimation Variance {Variance}, and irreducible Noise variance {Noise}. What MSE results?", "explain": "Bias squared, variance and noise contribute separately. Lower training error does not establish lower new-data error.", "lens": "the stipulated variance reduction in an ensemble risk calculation", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
