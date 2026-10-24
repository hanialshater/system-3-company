import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0365", "title": "Planning and turnout points", "op": "rates", "labels": ["HitA", "TotalA", "HitB", "TotalB"], "outputs": ["Gap"], "a": [541.0, 1000.0, 500.0, 1000.0], "b": [541.0, 2000.0, 500.0, 1000.0], "question": "A toy comparison has 541/1000 in A and 500/1000 in B. What is A minus B in percentage points?", "questionTemplate": "A toy comparison has {HitA}/{TotalA} in A and {HitB}/{TotalB} in B. What is A minus B in percentage points?", "explain": "Divide by each group’s own denominator before subtracting. A rate difference alone does not explain the cause of that difference.", "lens": "the denominators behind an absolute turnout gap", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
