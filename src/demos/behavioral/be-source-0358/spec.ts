import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0358", "title": "Open-label placebo arithmetic", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [5.0, 4.0, 2.0], "b": [5.0, 4.0, 4.0], "question": "Two toy means are 5 and 4, with common standard deviation 2. What is their standardized difference?", "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "the spread needed to interpret a mean difference", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
