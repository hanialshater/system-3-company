import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0968", "title": "Slow change reduces independent samples", "op": "ar1ess", "labels": ["N", "Rho"], "outputs": ["ESS"], "a": [100.0, 0.2], "b": [100.0, 0.95], "question": "A stationary toy AR(1) sequence has 100 draws and lag-one correlation 0.2. What finite-sample ESS gives the same variance for its mean?", "questionTemplate": "A stationary toy AR(1) sequence has {N} draws and lag-one correlation {Rho}. What finite-sample ESS gives the same variance for its mean?", "explain": "The calculation sums all lag covariances in this specific AR(1) model. A generic sampler need not have this correlation structure.", "lens": "the autocorrelation cost in a critical-slowing illustration", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
