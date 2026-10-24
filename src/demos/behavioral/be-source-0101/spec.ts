import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0101", "title": "Separate envelopes", "op": "accounts", "labels": ["Total", "Locked", "Need"], "outputs": ["Shortfall"], "a": [100.0, 80.0, 40.0], "b": [100.0, 40.0, 40.0], "question": "A toy household has 100, ring-fences 80, and must pay 40 from the remainder. What is the shortfall?", "explain": "The label changes which funds are treated as available. It does not change the household’s total resources.", "lens": "the cash made unavailable by a mental account", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy household has {Total}, ring-fences {Locked}, and must pay {Need} from the remainder. What is the shortfall?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
