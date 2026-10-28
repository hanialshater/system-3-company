import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0512", "title": "The reserve scales with a square root", "op": "staff", "labels": ["Offered", "Z"], "outputs": ["Servers"], "a": [100.0, 2.0], "b": [10000.0, 2.0], "question": "A toy square-root staffing rule uses offered load 100 plus Z 2 times its square root, rounded up. What staffing count results?", "questionTemplate": "A toy square-root staffing rule uses offered load {Offered} plus Z {Z} times its square root, rounded up. What staffing count results?", "explain": "This explicit rule scales a safety margin with square-root load. It does not guarantee a particular service level without a queueing model.", "lens": "the stated staffing-rule safety margin", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
