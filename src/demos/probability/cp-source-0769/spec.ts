import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0769", "title": "A code has a bounded correction radius", "op": "correctable", "labels": ["Distance"], "outputs": ["Errors"], "a": [3.0], "b": [5.0], "question": "A toy block code has minimum Hamming Distance 3. How many arbitrary symbol errors can nearest-codeword decoding guarantee to correct?", "questionTemplate": "A toy block code has minimum Hamming Distance {Distance}. How many arbitrary symbol errors can nearest-codeword decoding guarantee to correct?", "explain": "Minimum distance supplies a worst-case correction bound. A percentage of covered image area is not automatically the same as this code-symbol error count.", "lens": "the minimum-distance ingredient of error correction", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
