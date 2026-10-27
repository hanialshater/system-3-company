import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0882", "title": "Event-study weights change the target", "op": "weightedcontrast", "labels": ["Weight", "EffectA", "EffectB"], "outputs": ["Contrast"], "a": [0.5, 2.0, 8.0], "b": [1.2, 2.0, 8.0], "question": "A toy estimator combines effects 2,8 with weights 0.5 and 1-Weight, permitting negative weights. What contrast results?", "questionTemplate": "A toy estimator combines effects {EffectA},{EffectB} with weights {Weight} and 1-Weight, permitting negative weights. What contrast results?", "explain": "A nonconvex comparison can fall outside the component-effect range. These are estimator weights, not population shares.", "lens": "the supplied positive or negative cohort weights", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
