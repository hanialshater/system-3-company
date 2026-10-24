import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0346", "title": "A few percentage points", "op": "rates", "labels": ["HitA", "TotalA", "HitB", "TotalB"], "outputs": ["Gap"], "a": [530.0, 1000.0, 500.0, 1000.0], "b": [1030.0, 2000.0, 1000.0, 2000.0], "question": "A toy comparison has 530/1000 in A and 500/1000 in B. What is A minus B in percentage points?", "questionTemplate": "A toy comparison has {HitA}/{TotalA} in A and {HitB}/{TotalB} in B. What is A minus B in percentage points?", "explain": "Divide by each group’s own denominator before subtracting. A rate difference alone does not explain the cause of that difference.", "lens": "absolute uptake gaps under different denominators", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
