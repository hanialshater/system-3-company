import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0617", "title": "Ensemble spread is an approximation", "op": "dispersion", "labels": ["A", "B", "C"], "outputs": ["Mean", "SD"], "a": [0.1, 0.5, 0.9], "b": [0.45, 0.5, 0.55], "question": "Three toy model predictions are 0.1, 0.5, 0.9. What is their mean?", "questionTemplate": "Three toy model predictions are {A}, {B}, {C}. What is their mean?", "explain": "Disagreement can be summarized by spread, but ensemble agreement does not establish accuracy or calibration. The models can share errors.", "lens": "the supplied ensemble distribution rather than an exact posterior", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
