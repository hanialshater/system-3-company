import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0391", "title": "Who negotiates the first offer?", "op": "rates", "labels": ["HitA", "TotalA", "HitB", "TotalB"], "outputs": ["Gap"], "a": [57.0, 100.0, 7.0, 100.0], "b": [114.0, 200.0, 14.0, 200.0], "question": "A toy comparison has 57/100 in A and 7/100 in B. What is A minus B in percentage points?", "questionTemplate": "A toy comparison has {HitA}/{TotalA} in A and {HitB}/{TotalB} in B. What is A minus B in percentage points?", "explain": "Divide by each group’s own denominator before subtracting. A rate difference alone does not explain the cause of that difference.", "lens": "the denominator behind a reported negotiation gap", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
