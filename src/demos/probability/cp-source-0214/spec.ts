import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0214", "title": "Code distance sets an error bound", "op": "correctable", "labels": ["Distance"], "outputs": ["Errors"], "a": [15.0], "b": [25.0], "question": "A toy block code has minimum Hamming Distance 15. How many arbitrary symbol errors can nearest-codeword decoding guarantee to correct?", "questionTemplate": "A toy block code has minimum Hamming Distance {Distance}. How many arbitrary symbol errors can nearest-codeword decoding guarantee to correct?", "explain": "Minimum distance supplies a worst-case correction bound. A percentage of covered image area is not automatically the same as this code-symbol error count.", "lens": "symbol errors rather than covered image area", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
