import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0557", "title": "Uniform placement still leaves gaps", "op": "emptybins", "labels": ["Balls", "Bins"], "outputs": ["Empty"], "a": [100.0, 100.0], "b": [500.0, 100.0], "question": "Throw 100 independent toy points into 100 equally likely cells. What is the expected number of empty cells?", "questionTemplate": "Throw {Balls} independent toy points into {Bins} equally likely cells. What is the expected number of empty cells?", "explain": "Uniform independent placement still produces gaps and clusters. The expected empty-cell count is not a rule that every sample must meet.", "lens": "the empty-cell baseline of an independent spatial toy model", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
