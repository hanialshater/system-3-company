import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0070", "title": "How large is the default gap?", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [0.68, 0.0, 1.0], "b": [0.68, 0.0, 2.0], "question": "Two toy means are 0.68 and 0, with common standard deviation 1. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "the unit used for an effect-size comparison", "kind": "bars", "answerPosition": 1, "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
