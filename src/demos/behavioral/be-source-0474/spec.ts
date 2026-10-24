import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0474", "title": "Pollution and an exam-score contrast", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [70.0, 72.0, 10.0], "b": [70.0, 72.0, 20.0], "question": "Two toy means are 70 and 72, with common standard deviation 10. What is their standardized difference?", "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "the score scale behind a standardized contrast", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
