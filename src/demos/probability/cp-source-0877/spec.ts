import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0877", "title": "A distribution has unequal group shifts", "op": "weightedcontrast", "labels": ["Weight", "EffectA", "EffectB"], "outputs": ["Contrast"], "a": [0.5, 1.0, 5.0], "b": [0.9, 1.0, 5.0], "question": "A toy estimator combines effects 1,5 with weights 0.5 and 1-Weight, permitting negative weights. What contrast results?", "questionTemplate": "A toy estimator combines effects {EffectA},{EffectB} with weights {Weight} and 1-Weight, permitting negative weights. What contrast results?", "explain": "A nonconvex comparison can fall outside the component-effect range. These are estimator weights, not population shares.", "lens": "the quantile-group composition in a distributional contrast", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
