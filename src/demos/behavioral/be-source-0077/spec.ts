import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0077", "title": "Three testing invitations", "op": "rates", "labels": ["HitA", "TotalA", "HitB", "TotalB"], "outputs": ["Gap"], "a": [66.0, 100.0, 38.0, 100.0], "b": [51.0, 100.0, 38.0, 100.0], "question": "A toy comparison has 66/100 in A and 38/100 in B. What is A minus B in percentage points?", "explain": "Divide by each group’s own denominator before subtracting. A rate difference alone does not explain the cause of that difference.", "lens": "the invitation arm held against a common baseline", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy comparison has {HitA}/{TotalA} in A and {HitB}/{TotalB} in B. What is A minus B in percentage points?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
