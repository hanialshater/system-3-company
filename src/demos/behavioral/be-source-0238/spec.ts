import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0238", "title": "The same size of news", "op": "update", "labels": ["Prior", "News", "Weight"], "outputs": ["Posterior"], "a": [0.5, 0.8, 0.8], "b": [0.5, 0.2, 0.2], "question": "A toy belief starts at 0.5, receives estimate 0.8, and moves fraction 0.8 toward it. What belief results?", "explain": "Different update weights can create asymmetric learning from equally informative news. The toy rule is an assumption, not a psychological measurement.", "lens": "different weights on equally sized news", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy belief starts at {Prior}, receives estimate {News}, and moves fraction {Weight} toward it. What belief results?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
