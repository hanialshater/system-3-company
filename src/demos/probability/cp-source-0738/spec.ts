import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0738", "title": "Stretch a lifetime's clock", "op": "aft", "labels": ["Rate", "Stretch", "Time"], "outputs": ["Survival"], "a": [0.2, 1.0, 5.0], "b": [0.2, 2.0, 5.0], "question": "A toy exponential Rate 0.2 has its lifetime multiplied by Stretch 1. What survival remains at Time 5?", "questionTemplate": "A toy exponential Rate {Rate} has its lifetime multiplied by Stretch {Stretch}. What survival remains at Time {Time}?", "explain": "Stretching time changes when a survival probability is reached. This one exponential model does not establish a general hazard-ratio interpretation.", "lens": "the accelerated-time factor in one survival model", "kind": "curve", "answerPosition": 0, "plot": [2, 0, 10]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
