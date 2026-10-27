import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0756", "title": "The top product and the long tail", "op": "zipf", "labels": ["Ranks", "Exponent"], "outputs": ["FirstShare"], "a": [100.0, 1.0], "b": [1000.0, 1.0], "question": "A toy vocabulary has 100 ranks with weights proportional to rank raised to -1. What share belongs to rank 1?", "questionTemplate": "A toy vocabulary has {Ranks} ranks with weights proportional to rank raised to -{Exponent}. What share belongs to rank 1?", "explain": "Normalize the power-law weights over the stated finite vocabulary. A Zipf curve does not mean each successive rank is exactly half as frequent.", "lens": "the catalog size beneath a stipulated rank-frequency rule", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
