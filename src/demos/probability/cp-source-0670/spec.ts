import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0670", "title": "A later reading revises the past", "op": "normalshrink", "labels": ["Prior", "Variance", "Measurement", "Noise"], "outputs": ["Mean", "Variance"], "a": [0.0, 4.0, 2.0, 4.0], "b": [0.0, 4.0, 8.0, 4.0], "question": "A toy normal prior has mean 0, variance 4; one normal measurement is 2 with noise variance 4. What is the posterior mean?", "questionTemplate": "A toy normal prior has mean {Prior}, variance {Variance}; one normal measurement is {Measurement} with noise variance {Noise}. What is the posterior mean?", "explain": "Precisions weight the prior and measurement. The variance calculation assumes the stated independent normal model.", "lens": "the added observation in a smoothing ingredient", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
