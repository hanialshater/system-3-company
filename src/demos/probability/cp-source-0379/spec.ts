import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0379", "title": "Compare two modeled event probabilities", "op": "relativeevent", "labels": ["With", "Without"], "outputs": ["Ratio", "Attributable"], "a": [0.2, 0.05], "b": [0.2, 0.1], "question": "A toy event has probability 0.2 in one modeled world and 0.05 in another. What is their probability ratio?", "questionTemplate": "A toy event has probability {With} in one modeled world and {Without} in another. What is their probability ratio?", "explain": "Comparing modeled worlds depends on their design and assumptions. A probability ratio is not the probability that one specific observed event was caused by the changed factor.", "lens": "the probability ratio across stipulated worlds", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
