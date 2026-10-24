import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0257", "title": "One story, two donation averages", "op": "rates", "labels": ["HitA", "TotalA", "HitB", "TotalB"], "outputs": ["Gap"], "a": [238.0, 100.0, 114.0, 100.0], "b": [476.0, 200.0, 114.0, 100.0], "question": "A toy comparison has 238/100 in A and 114/100 in B. What is A minus B in percentage points?", "questionTemplate": "A toy comparison has {HitA}/{TotalA} in A and {HitB}/{TotalB} in B. What is A minus B in percentage points?", "explain": "Divide by each group’s own denominator before subtracting. A rate difference alone does not explain the cause of that difference.", "lens": "the denominator behind mean donations", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
