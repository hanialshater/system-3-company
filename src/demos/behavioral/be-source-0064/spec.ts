import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0064", "title": "Automatically in the plan", "op": "rates", "labels": ["HitA", "TotalA", "HitB", "TotalB"], "outputs": ["Gap"], "a": [86.0, 100.0, 37.0, 100.0], "b": [60.0, 100.0, 37.0, 100.0], "question": "A toy comparison has 86/100 in A and 37/100 in B. What is A minus B in percentage points?", "explain": "Divide by each group’s own denominator before subtracting. A rate difference alone does not explain the cause of that difference.", "lens": "the participation-rate difference", "kind": "grid", "answerPosition": 1, "questionTemplate": "A toy comparison has {HitA}/{TotalA} in A and {HitB}/{TotalB} in B. What is A minus B in percentage points?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
