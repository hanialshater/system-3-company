import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0540", "title": "Turn team WIP into a cycle-time estimate", "op": "little", "labels": ["WIP", "Throughput"], "outputs": ["Cycle"], "a": [20.0, 5.0], "b": [40.0, 5.0], "question": "A stable toy system averages WIP 20 units and throughput 5 units per time. What mean cycle time follows?", "questionTemplate": "A stable toy system averages WIP {WIP} units and throughput {Throughput} units per time. What mean cycle time follows?", "explain": "Little’s law relates compatible long-run averages. A transient backlog or mismatched system boundary need not satisfy a one-snapshot estimate.", "lens": "the long-run system boundary required by Little's law", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
