import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0100", "title": "A forecast of self-control", "op": "update", "labels": ["Prior", "News", "Weight"], "outputs": ["Posterior"], "a": [0.9, 0.5, 0.2], "b": [0.9, 0.5, 0.8], "question": "A toy belief starts at 0.9, receives estimate 0.5, and moves fraction 0.2 toward it. What belief results?", "explain": "Different update weights can create asymmetric learning from equally informative news. The toy rule is an assumption, not a psychological measurement.", "lens": "how much contrary evidence changes a belief", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy belief starts at {Prior}, receives estimate {News}, and moves fraction {Weight} toward it. What belief results?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
