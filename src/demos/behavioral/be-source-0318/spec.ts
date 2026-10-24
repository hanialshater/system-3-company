import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0318", "title": "Math and language in SD units", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [0.27, 0.0, 1.0], "b": [0.17, 0.0, 1.0], "question": "Two toy means are 0.27 and 0, with common standard deviation 1. What is their standardized difference?", "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "two outcomes expressed on a specified common scale", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
