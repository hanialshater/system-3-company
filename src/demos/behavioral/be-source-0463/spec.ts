import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0463", "title": "A payday comparison with no gap", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [10.0, 10.0, 2.0], "b": [10.2, 10.0, 2.0], "question": "Two toy means are 10 and 10, with common standard deviation 2. What is their standardized difference?", "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "zero versus a small standardized descriptive gap", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
