import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0833", "title": "Aliased effects share a contrast", "op": "weightedcontrast", "labels": ["Weight", "EffectA", "EffectB"], "outputs": ["Contrast"], "a": [1.0, 2.0, 3.0], "b": [0.5, 2.0, 3.0], "question": "A toy estimator combines effects 2,3 with weights 1 and 1-Weight, permitting negative weights. What contrast results?", "questionTemplate": "A toy estimator combines effects {EffectA},{EffectB} with weights {Weight} and 1-Weight, permitting negative weights. What contrast results?", "explain": "A nonconvex comparison can fall outside the component-effect range. These are estimator weights, not population shares.", "lens": "the unresolved mixture of two effects in a reduced design", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
