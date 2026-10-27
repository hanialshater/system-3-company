import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0600", "title": "Thinning removes observations too", "op": "ar1ess", "labels": ["N", "Rho"], "outputs": ["ESS"], "a": [1000.0, 0.9], "b": [500.0, 0.81], "question": "A stationary toy AR(1) sequence has 1000 draws and lag-one correlation 0.9. What finite-sample ESS gives the same variance for its mean?", "questionTemplate": "A stationary toy AR(1) sequence has {N} draws and lag-one correlation {Rho}. What finite-sample ESS gives the same variance for its mean?", "explain": "The calculation sums all lag covariances in this specific AR(1) model. A generic sampler need not have this correlation structure.", "lens": "the exact finite AR(1) mean-variance comparison after every-other sampling", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
