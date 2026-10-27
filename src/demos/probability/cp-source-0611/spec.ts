import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0611", "title": "A looser tolerance admits a candidate", "op": "caliper", "labels": ["Gap", "Tolerance"], "outputs": ["Matched"], "a": [0.3, 0.2], "b": [0.3, 0.5], "question": "A toy pair has score gap 0.3; accept a match when gap is at most Tolerance 0.2. Is it retained (1) or rejected (0)?", "questionTemplate": "A toy pair has score gap {Gap}; accept a match when gap is at most Tolerance {Tolerance}. Is it retained (1) or rejected (0)?", "explain": "A tighter caliper can improve closeness while excluding units. Retained pairs need not represent the original population.", "lens": "the retained-summary predicate rather than a fitted ABC posterior", "kind": "grid", "answerPosition": 2, "binary": true};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
