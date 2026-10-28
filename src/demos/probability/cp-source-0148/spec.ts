import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0148", "title": "Delay grows near service capacity", "op": "queue", "labels": ["Arrival", "Service"], "outputs": ["MeanTime"], "a": [8.0, 10.0], "b": [9.5, 10.0], "question": "A stable toy M/M/1 queue has Poisson arrival rate 8 and exponential service rate 10. What is mean time in the system?", "questionTemplate": "A stable toy M/M/1 queue has Poisson arrival rate {Arrival} and exponential service rate {Service}. What is mean time in the system?", "explain": "The gap between service and arrival rates controls this queue’s mean delay. Variability and the assumed queueing model matter.", "lens": "the load of a stated single-server queue", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
