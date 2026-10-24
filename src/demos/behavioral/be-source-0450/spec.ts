import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0450", "title": "Countries differ in composition", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.8, 0.6, 0.2], "b": [0.2, 0.6, 0.2], "question": "A toy mixture puts fraction 0.8 at rate 0.6 and the remainder at rate 0.2. What is its aggregate rate?", "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "an aggregate association without individual causal inference", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
