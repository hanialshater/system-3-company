import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0114", "title": "A windfall in a new envelope", "op": "accounts", "labels": ["Total", "Locked", "Need"], "outputs": ["Shortfall"], "a": [100.0, 20.0, 90.0], "b": [100.0, 80.0, 90.0], "question": "A toy household has 100, ring-fences 20, and must pay 90 from the remainder. What is the shortfall?", "explain": "The label changes which funds are treated as available. It does not change the household’s total resources.", "lens": "the allocation rule applied to a windfall", "kind": "grid", "answerPosition": 0, "questionTemplate": "A toy household has {Total}, ring-fences {Locked}, and must pay {Need} from the remainder. What is the shortfall?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
