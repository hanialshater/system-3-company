import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0726", "title": "Compare two stipulated churn rates", "op": "exponential", "labels": ["Rate", "Time"], "outputs": ["Survival", "Mean"], "a": [0.1, 12.0], "b": [0.03, 12.0], "question": "A toy exponential waiting time has rate 0.1. What is the probability the wait exceeds 12?", "questionTemplate": "A toy exponential waiting time has rate {Rate}. What is the probability the wait exceeds {Time}?", "explain": "A constant hazard gives exponential survival and memorylessness. A real waiting process need not have a constant hazard.", "lens": "the constant monthly hazard in a plan comparison", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
