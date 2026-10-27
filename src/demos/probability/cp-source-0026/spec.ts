import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0026", "title": "Random points leave empty cells", "op": "emptybins", "labels": ["Balls", "Bins"], "outputs": ["Empty"], "a": [20.0, 20.0], "b": [60.0, 20.0], "question": "Throw 20 independent toy points into 20 equally likely cells. What is the expected number of empty cells?", "questionTemplate": "Throw {Balls} independent toy points into {Bins} equally likely cells. What is the expected number of empty cells?", "explain": "Uniform independent placement still produces gaps and clusters. The expected empty-cell count is not a rule that every sample must meet.", "lens": "gaps under independent uniform placement", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
