import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0390", "title": "A job-search belief barely moves", "op": "update", "labels": ["Prior", "News", "Weight"], "outputs": ["Posterior"], "a": [0.8, 0.3, 0.1], "b": [0.8, 0.3, 0.8], "question": "A toy belief starts at 0.8, receives estimate 0.3, and moves fraction 0.1 toward it. What belief results?", "questionTemplate": "A toy belief starts at {Prior}, receives estimate {News}, and moves fraction {Weight} toward it. What belief results?", "explain": "Different update weights can create asymmetric learning from equally informative news. The toy rule is an assumption, not a psychological measurement.", "lens": "the weight given to repeated unfavorable news", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
