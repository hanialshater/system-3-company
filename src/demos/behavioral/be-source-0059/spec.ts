import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0059", "title": "A framing effect in context", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [0.6, 0.4, 0.5], "b": [0.55, 0.5, 0.5], "question": "Two toy means are 0.6 and 0.4, with common standard deviation 0.5. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "a context-dependent standardized contrast", "kind": "bars", "answerPosition": 2, "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
