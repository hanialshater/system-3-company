import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0192", "title": "The committee can agree and err", "op": "dispersion", "labels": ["A", "B", "C"], "outputs": ["Mean", "SD"], "a": [0.9, 0.91, 0.89], "b": [0.2, 0.5, 0.8], "question": "Three toy model predictions are 0.9, 0.91, 0.89. What is their mean?", "questionTemplate": "Three toy model predictions are {A}, {B}, {C}. What is their mean?", "explain": "Disagreement can be summarized by spread, but ensemble agreement does not establish accuracy or calibration. The models can share errors.", "lens": "prediction disagreement without an accuracy guarantee", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
