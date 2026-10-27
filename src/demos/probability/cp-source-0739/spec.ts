import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0739", "title": "A second purchase arrives sooner", "op": "exponential", "labels": ["Rate", "Time"], "outputs": ["Survival", "Mean"], "a": [0.1, 5.0], "b": [0.3, 5.0], "question": "A toy exponential waiting time has rate 0.1. What is the probability the wait exceeds 5?", "questionTemplate": "A toy exponential waiting time has rate {Rate}. What is the probability the wait exceeds {Time}?", "explain": "A constant hazard gives exponential survival and memorylessness. A real waiting process need not have a constant hazard.", "lens": "the assumed repeat-purchase hazard", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
