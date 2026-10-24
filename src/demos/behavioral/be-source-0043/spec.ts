import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0043", "title": "A difference in standardized units", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [0.7, 0.5, 0.4], "b": [0.7, 0.5, 0.8], "question": "Two toy means are 0.7 and 0.5, with common standard deviation 0.4. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "the spread behind a standardized effect", "kind": "bars", "answerPosition": 1, "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
