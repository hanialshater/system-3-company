import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0217", "title": "Which peer share was shown?", "op": "rates", "labels": ["HitA", "TotalA", "HitB", "TotalB"], "outputs": ["Gap"], "a": [64.0, 100.0, 46.0, 100.0], "b": [64.0, 100.0, 64.0, 100.0], "question": "A toy comparison has 64/100 in A and 46/100 in B. What is A minus B in percentage points?", "explain": "Divide by each group’s own denominator before subtracting. A rate difference alone does not explain the cause of that difference.", "lens": "the numerical content of a descriptive social norm", "kind": "grid", "answerPosition": 1, "questionTemplate": "A toy comparison has {HitA}/{TotalA} in A and {HitB}/{TotalB} in B. What is A minus B in percentage points?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
