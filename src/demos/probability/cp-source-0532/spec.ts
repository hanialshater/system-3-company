import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0532", "title": "Backpressure caps the incoming rate", "op": "fluid", "labels": ["Initial", "Arrival", "Capacity", "Time"], "outputs": ["Backlog"], "a": [0.0, 100.0, 80.0, 5.0], "b": [0.0, 80.0, 80.0, 5.0], "question": "A toy fluid queue starts at 0; constant arrival rate 100 and capacity 80 run for Time 5. What backlog remains, reflected at zero?", "questionTemplate": "A toy fluid queue starts at {Initial}; constant arrival rate {Arrival} and capacity {Capacity} run for Time {Time}. What backlog remains, reflected at zero?", "explain": "A persistent input-capacity gap accumulates work. This deterministic fluid approximation omits stochastic waiting-time variability.", "lens": "the fluid input-capacity gap", "kind": "timeline", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
