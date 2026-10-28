import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0934", "title": "One threshold can change activation", "op": "caliper", "labels": ["Gap", "Tolerance"], "outputs": ["Matched"], "a": [5.0, 4.0], "b": [5.0, 5.0], "question": "A toy pair has score gap 5; accept a match when gap is at most Tolerance 4. Is it retained (1) or rejected (0)?", "questionTemplate": "A toy pair has score gap {Gap}; accept a match when gap is at most Tolerance {Tolerance}. Is it retained (1) or rejected (0)?", "explain": "A tighter caliper can improve closeness while excluding units. Retained pairs need not represent the original population.", "lens": "the threshold crossing before a full crowd cascade", "kind": "grid", "answerPosition": 1, "binary": true};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
