import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0815", "title": "Binning can cancel signed errors", "op": "weightedcontrast", "labels": ["Weight", "EffectA", "EffectB"], "outputs": ["Contrast"], "a": [0.5, 0.2, -0.2], "b": [0.9, 0.2, -0.2], "question": "A toy estimator combines effects 0.2,-0.2 with weights 0.5 and 1-Weight, permitting negative weights. What contrast results?", "questionTemplate": "A toy estimator combines effects {EffectA},{EffectB} with weights {Weight} and 1-Weight, permitting negative weights. What contrast results?", "explain": "A nonconvex comparison can fall outside the component-effect range. These are estimator weights, not population shares.", "lens": "the grouping weights before taking absolute calibration errors", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
