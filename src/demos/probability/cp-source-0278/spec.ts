import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0278", "title": "Different point clouds can share means", "op": "dispersion", "labels": ["A", "B", "C"], "outputs": ["Mean", "SD"], "a": [0.0, 1.0, 2.0], "b": [1.0, 1.0, 1.0], "question": "Three toy model predictions are 0, 1, 2. What is their mean?", "questionTemplate": "Three toy model predictions are {A}, {B}, {C}. What is their mean?", "explain": "Disagreement can be summarized by spread, but ensemble agreement does not establish accuracy or calibration. The models can share errors.", "lens": "the insufficiency of a mean to determine a data shape", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
