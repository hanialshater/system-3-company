import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0578", "title": "Visit every node of a complete graph", "op": "covercomplete", "labels": ["Nodes"], "outputs": ["Steps"], "a": [10.0], "b": [50.0], "question": "A toy walk on the complete graph of 10 nodes starts at one node and always moves to a different uniform node. What is expected time to visit all nodes?", "questionTemplate": "A toy walk on the complete graph of {Nodes} nodes starts at one node and always moves to a different uniform node. What is expected time to visit all nodes?", "explain": "Collection becomes slower as fewer unseen nodes remain. This complete-graph formula does not apply to arbitrary network topologies.", "lens": "the collection stages of a uniform complete-graph walk", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
