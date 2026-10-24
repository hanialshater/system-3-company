import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0280", "title": "Sunshine and group composition", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.8, 0.02, -0.01], "b": [0.2, 0.02, -0.01], "question": "A toy mixture puts fraction 0.8 at rate 0.02 and the remainder at rate -0.01. What is its aggregate rate?", "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "a descriptive association sensitive to composition", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
