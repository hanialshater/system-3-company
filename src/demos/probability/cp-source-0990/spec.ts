import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0990", "title": "A neuron fires after a threshold", "op": "caliper", "labels": ["Gap", "Tolerance"], "outputs": ["Matched"], "a": [1.0, 0.8], "b": [1.0, 1.2], "question": "A toy pair has score gap 1; accept a match when gap is at most Tolerance 0.8. Is it retained (1) or rejected (0)?", "questionTemplate": "A toy pair has score gap {Gap}; accept a match when gap is at most Tolerance {Tolerance}. Is it retained (1) or rejected (0)?", "explain": "A tighter caliper can improve closeness while excluding units. Retained pairs need not represent the original population.", "lens": "the threshold crossing before integrate-and-fire reset dynamics", "kind": "grid", "answerPosition": 0, "binary": true};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
