import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0593", "title": "Many draws, little effective data", "op": "ar1ess", "labels": ["N", "Rho"], "outputs": ["ESS"], "a": [10000.0, 0.94], "b": [10000.0, 0.0], "question": "A stationary toy AR(1) sequence has 10000 draws and lag-one correlation 0.94. What finite-sample ESS gives the same variance for its mean?", "questionTemplate": "A stationary toy AR(1) sequence has {N} draws and lag-one correlation {Rho}. What finite-sample ESS gives the same variance for its mean?", "explain": "The calculation sums all lag covariances in this specific AR(1) model. A generic sampler need not have this correlation structure.", "lens": "the mean-variance ESS of an explicit correlation model", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
