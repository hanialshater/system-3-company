import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0539", "title": "A fixed polling loop pays switch time", "op": "polling", "labels": ["Queues", "Service", "Switch"], "outputs": ["Cycle"], "a": [5.0, 2.0, 1.0], "b": [5.0, 2.0, 3.0], "question": "A toy polling cycle visits 5 queues, serves one job taking 2 at each, and spends 1 switching after each. What cycle time results?", "questionTemplate": "A toy polling cycle visits {Queues} queues, serves one job taking {Service} at each, and spends {Switch} switching after each. What cycle time results?", "explain": "Switching overhead adds to service time. This fixed-cycle calculation does not simulate bus bunching or general polling-system stability.", "lens": "the one-job-per-visit timing facet of a polling cycle", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
