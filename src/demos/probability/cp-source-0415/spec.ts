import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0415", "title": "A tighter caliper drops a pair", "op": "caliper", "labels": ["Gap", "Tolerance"], "outputs": ["Matched"], "a": [0.1, 0.2], "b": [0.1, 0.05], "question": "A toy pair has score gap 0.1; accept a match when gap is at most Tolerance 0.2. Is it retained (1) or rejected (0)?", "questionTemplate": "A toy pair has score gap {Gap}; accept a match when gap is at most Tolerance {Tolerance}. Is it retained (1) or rejected (0)?", "explain": "A tighter caliper can improve closeness while excluding units. Retained pairs need not represent the original population.", "lens": "the distance threshold for retaining a toy match", "kind": "grid", "answerPosition": 1, "binary": true};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
