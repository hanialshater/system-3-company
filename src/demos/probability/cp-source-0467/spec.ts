import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0467", "title": "Regularization can shrink a slope", "op": "ridge", "labels": ["XY", "XX", "Penalty"], "outputs": ["Coefficient"], "a": [20.0, 10.0, 0.0], "b": [20.0, 10.0, 10.0], "question": "A centered one-predictor toy regression has sum XY 20, sum X² 10, and ridge Penalty 0. What coefficient results?", "questionTemplate": "A centered one-predictor toy regression has sum XY {XY}, sum X² {XX}, and ridge Penalty {Penalty}. What coefficient results?", "explain": "The penalty enlarges the denominator and shrinks the coefficient. Intercepts and feature scaling require separate specification.", "lens": "the coefficient bias of a stipulated ridge fit", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
