import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0974", "title": "Local tile order changes entropy", "op": "binaryentropy", "labels": ["P"], "outputs": ["Bits"], "a": [0.5], "b": [0.99], "question": "A binary toy answer is yes with probability 0.5. What is its entropy in bits?", "questionTemplate": "A binary toy answer is yes with probability {P}. What is its entropy in bits?", "explain": "Balanced binary outcomes maximize the expected information of one answer. A rare answer is individually surprising but contributes little average probability mass.", "lens": "a binary orientation uncertainty rather than an Aztec-diamond sampler", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
