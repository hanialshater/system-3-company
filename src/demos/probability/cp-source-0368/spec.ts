import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0368", "title": "Two sufficient causes can overlap", "op": "sufficient", "labels": ["A", "B"], "outputs": ["Outcome"], "a": [1.0, 1.0], "b": [0.0, 0.0], "question": "Two toy binary causes A=1,B=1 each suffice for an outcome: Y=A OR B. What outcome is generated?", "questionTemplate": "Two toy binary causes A={A},B={B} each suffice for an outcome: Y=A OR B. What outcome is generated?", "explain": "When both causes suffice, removing either alone may leave the outcome unchanged. A but-for test and the full structural causal account can differ.", "lens": "the difference between necessity and sufficiency", "kind": "grid", "answerPosition": 2, "binary": true, "recall": [1.0, 0.0]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
