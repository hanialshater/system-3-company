import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0082", "title": "The same link after adjustment", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.9, 0.8, 0.4], "b": [0.5, 0.8, 0.4], "question": "A toy mixture puts fraction 0.9 at rate 0.8 and the remainder at rate 0.4. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "composition changes rather than a causal diagnosis", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
