import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0658", "title": "Scale variances while adding units", "op": "widthvariance", "labels": ["Width", "UnitVariance"], "outputs": ["Variance"], "a": [100.0, 0.01], "b": [1000.0, 0.001], "question": "Sum Width 100 independent zero-mean toy units, each with variance 0.01. What is total variance?", "questionTemplate": "Sum Width {Width} independent zero-mean toy units, each with variance {UnitVariance}. What is total variance?", "explain": "Variance scaling can keep a growing sum finite. This calculation alone does not prove a network’s infinite-width process limit.", "lens": "the finite variance-scaling ingredient of a wide-network limit", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
