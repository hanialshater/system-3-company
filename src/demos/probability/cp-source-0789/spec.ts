import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0789", "title": "An energy slope pulls toward a center", "op": "score", "labels": ["X", "Mean", "Variance"], "outputs": ["Score"], "a": [3.0, 0.0, 1.0], "b": [3.0, 0.0, 4.0], "question": "For a toy Normal(Mean 0, Variance 1), what is the derivative of log density at X 3?", "questionTemplate": "For a toy Normal(Mean {Mean}, Variance {Variance}), what is the derivative of log density at X {X}?", "explain": "The score points toward increasing log density. Density-gradient drift alone does not draw correctly distributed samples.", "lens": "the inverse scale of one quadratic energy gradient", "kind": "curve", "answerPosition": 0, "plot": [0, -4, 4]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
