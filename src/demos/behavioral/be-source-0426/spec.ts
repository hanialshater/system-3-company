import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0426", "title": "A plateau in one subgroup", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.2, 0.0, 1.0], "b": [0.8, 0.0, 1.0], "question": "A toy mixture puts fraction 0.2 at rate 0 and the remainder at rate 1. What is its aggregate rate?", "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "subgroup weights behind an aggregate income slope", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
