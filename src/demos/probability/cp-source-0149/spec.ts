import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0149", "title": "Random service delay near saturation", "op": "queue", "labels": ["Arrival", "Service"], "outputs": ["MeanTime"], "a": [9.0, 10.0], "b": [5.0, 10.0], "question": "A stable toy M/M/1 queue has Poisson arrival rate 9 and exponential service rate 10. What is mean time in the system?", "questionTemplate": "A stable toy M/M/1 queue has Poisson arrival rate {Arrival} and exponential service rate {Service}. What is mean time in the system?", "explain": "The gap between service and arrival rates controls this queue’s mean delay. Variability and the assumed queueing model matter.", "lens": "the queueing analogy under explicit arrival and service assumptions", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
