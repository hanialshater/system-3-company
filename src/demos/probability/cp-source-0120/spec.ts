import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0120", "title": "A toy hidden skill update", "op": "update", "labels": ["Prior", "News", "Weight"], "outputs": ["Posterior"], "a": [1500.0, 1700.0, 0.1], "b": [1500.0, 1700.0, 0.5], "question": "A toy belief starts at 1500, receives estimate 1700, and moves fraction 0.1 toward it. What belief results?", "questionTemplate": "A toy belief starts at {Prior}, receives estimate {News}, and moves fraction {Weight} toward it. What belief results?", "explain": "Different update weights can create asymmetric learning from equally informative news. The toy rule is an assumption, not a psychological measurement.", "lens": "the update weight after new skill evidence", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
