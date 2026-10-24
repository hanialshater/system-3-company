import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0198", "title": "How many choose to split?", "op": "rates", "labels": ["HitA", "TotalA", "HitB", "TotalB"], "outputs": ["Gap"], "a": [53.0, 100.0, 50.0, 100.0], "b": [53.0, 100.0, 53.0, 100.0], "question": "A toy comparison has 53/100 in A and 50/100 in B. What is A minus B in percentage points?", "explain": "Divide by each group’s own denominator before subtracting. A rate difference alone does not explain the cause of that difference.", "lens": "the descriptive share rather than a theory of motives", "kind": "grid", "answerPosition": 0, "questionTemplate": "A toy comparison has {HitA}/{TotalA} in A and {HitB}/{TotalB} in B. What is A minus B in percentage points?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
