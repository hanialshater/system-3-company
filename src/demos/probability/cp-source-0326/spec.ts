import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0326", "title": "Compare a toy placebo outcome", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [6.0, 5.0, 2.0], "b": [6.0, 5.0, 4.0], "question": "Two toy means are 6 and 5, with common standard deviation 2. What is their standardized difference?", "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "the spread behind a standardized mean contrast", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
