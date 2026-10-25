import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0529", "title": "Speed up the binding station", "op": "bottleneck", "labels": ["A", "B", "C"], "outputs": ["Capacity"], "a": [10.0, 20.0, 30.0], "b": [25.0, 20.0, 30.0], "question": "Three toy serial stations have capacities 10,20,30 units per time, with unlimited buffers. What is the maximum sustainable line throughput?", "questionTemplate": "Three toy serial stations have capacities {A},{B},{C} units per time, with unlimited buffers. What is the maximum sustainable line throughput?", "explain": "A line cannot sustainably exceed its slowest station. Speeding a nonbinding station does not remove the bottleneck.", "lens": "the movement of a deterministic capacity bottleneck", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
