import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0973", "title": "Small areas shrink toward a prior", "op": "normalshrink", "labels": ["Prior", "Variance", "Measurement", "Noise"], "outputs": ["Mean", "Variance"], "a": [5.0, 1.0, 10.0, 0.1], "b": [5.0, 1.0, 10.0, 10.0], "question": "A toy normal prior has mean 5, variance 1; one normal measurement is 10 with noise variance 0.1. What is the posterior mean?", "questionTemplate": "A toy normal prior has mean {Prior}, variance {Variance}; one normal measurement is {Measurement} with noise variance {Noise}. What is the posterior mean?", "explain": "Precisions weight the prior and measurement. The variance calculation assumes the stated independent normal model.", "lens": "the sampling uncertainty in a toy area-rate estimate", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
