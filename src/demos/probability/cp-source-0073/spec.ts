import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0073", "title": "Uniform draws until the sum passes one", "op": "uniformsumcap", "labels": ["Cap"], "outputs": ["Expected"], "a": [3.0], "b": [10.0], "question": "Add independent Uniform(0,1) draws until their sum exceeds 1, but stop after Cap 3. What is the expected number of draws used?", "questionTemplate": "Add independent Uniform(0,1) draws until their sum exceeds 1, but stop after Cap {Cap}. What is the expected number of draws used?", "explain": "The survival-sum expectation uses the simplex probability 1/n factorial. Increasing the cap approaches a limit; individual draw counts remain variable.", "lens": "the capped waiting-time survival sum", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
