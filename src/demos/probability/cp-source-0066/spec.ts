import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0066", "title": "Short waits and a long tail", "op": "exponential", "labels": ["Rate", "Time"], "outputs": ["Survival", "Mean"], "a": [0.2, 5.0], "b": [0.2, 15.0], "question": "A toy exponential waiting time has rate 0.2. What is the probability the wait exceeds 5?", "questionTemplate": "A toy exponential waiting time has rate {Rate}. What is the probability the wait exceeds {Time}?", "explain": "A constant hazard gives exponential survival and memorylessness. A real waiting process need not have a constant hazard.", "lens": "a constant-rate waiting-time model", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
