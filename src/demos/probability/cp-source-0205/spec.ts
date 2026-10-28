import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0205", "title": "A uniform password model", "op": "passwordbits", "labels": ["Alphabet", "Length"], "outputs": ["Bits"], "a": [26.0, 8.0], "b": [26.0, 12.0], "question": "A toy password draws 8 characters independently and uniformly from an alphabet of 26. What is its entropy in bits?", "questionTemplate": "A toy password draws {Length} characters independently and uniformly from an alphabet of {Alphabet}. What is its entropy in bits?", "explain": "The calculation assumes uniform independent generation. A human pattern or reused password need not have the same entropy.", "lens": "the independence assumption behind password entropy", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
