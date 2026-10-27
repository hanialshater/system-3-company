import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0105", "title": "Money labelled for education", "op": "accounts", "labels": ["Total", "Locked", "Need"], "outputs": ["Shortfall"], "a": [100.0, 70.0, 50.0], "b": [100.0, 30.0, 50.0], "question": "A toy household has 100, ring-fences 70, and must pay 50 from the remainder. What is the shortfall?", "explain": "The label changes which funds are treated as available. It does not change the household’s total resources.", "lens": "the restriction imposed by an illustrative budget label", "kind": "grid", "answerPosition": 0, "questionTemplate": "A toy household has {Total}, ring-fences {Locked}, and must pay {Need} from the remainder. What is the shortfall?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
