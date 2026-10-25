import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0202", "title": "One feedback split in a word game", "op": "binaryentropy", "labels": ["P"], "outputs": ["Bits"], "a": [0.5], "b": [0.9], "question": "A binary toy answer is yes with probability 0.5. What is its entropy in bits?", "questionTemplate": "A binary toy answer is yes with probability {P}. What is its entropy in bits?", "explain": "Balanced binary outcomes maximize the expected information of one answer. A rare answer is individually surprising but contributes little average probability mass.", "lens": "the average information of a binary feedback partition", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
