import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0466", "title": "Deactivation and a measured outcome", "op": "effect", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["D"], "a": [5.1, 5.0, 1.0], "b": [5.1, 5.0, 2.0], "question": "Two toy means are 5.1 and 5, with common standard deviation 1. What is their standardized difference?", "questionTemplate": "Two toy means are {MeanA} and {MeanB}, with common standard deviation {SD}. What is their standardized difference?", "explain": "A standardized effect divides the raw difference by spread. It does not by itself describe practical importance or replication success.", "lens": "the unit and spread behind a mean difference", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
