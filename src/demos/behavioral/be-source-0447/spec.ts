import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0447", "title": "Signing first: a null comparison", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [0.5, 0.5, 0.2], "b": [0.51, 0.5, 0.2], "question": "Two toy means are 0.5 and 0.5, with common standard deviation 0.2. What is their standardized difference?", "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "zero versus a small descriptive standardized difference", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
