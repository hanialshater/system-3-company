import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0871", "title": "A threshold can change local outcomes", "op": "rdjump", "labels": ["Left", "Right"], "outputs": ["Jump"], "a": [10.0, 12.0], "b": [10.0, 18.0], "question": "A toy threshold design has limiting outcome 10 just below and 12 just above the cutoff. What is the jump?", "questionTemplate": "A toy threshold design has limiting outcome {Left} just below and {Right} just above the cutoff. What is the jump?", "explain": "The local difference is a causal effect only under the relevant continuity and assignment assumptions. A large selected window can answer a different question.", "lens": "a descriptive threshold jump before structural bunching inference", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
