import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0212", "title": "Zero correlation can hide a function", "op": "squaredependence", "labels": ["ZeroShare"], "outputs": ["MutualBits", "Correlation"], "a": [0.3333333333333333], "b": [0.5], "question": "Toy X is 0 with probability 0.333333, otherwise equally likely -1 or +1. Y=X². What is the mutual information in bits?", "questionTemplate": "Toy X is 0 with probability {ZeroShare}, otherwise equally likely -1 or +1. Y=X². What is the mutual information in bits?", "explain": "Symmetry makes the linear correlation zero, while Y remains a deterministic function of X. Linear correlation does not capture every dependence.", "lens": "linear correlation versus deterministic dependence", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
