import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0931", "title": "A behavior waits for enough exposure", "op": "caliper", "labels": ["Gap", "Tolerance"], "outputs": ["Matched"], "a": [3.0, 2.0], "b": [3.0, 4.0], "question": "A toy pair has score gap 3; accept a match when gap is at most Tolerance 2. Is it retained (1) or rejected (0)?", "questionTemplate": "A toy pair has score gap {Gap}; accept a match when gap is at most Tolerance {Tolerance}. Is it retained (1) or rejected (0)?", "explain": "A tighter caliper can improve closeness while excluding units. Retained pairs need not represent the original population.", "lens": "the minimum-exposure threshold in a binary activation ingredient", "kind": "grid", "answerPosition": 1, "binary": true};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
