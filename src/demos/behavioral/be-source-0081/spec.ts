import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0081", "title": "Waiting and family background", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.8, 0.8, 0.4], "b": [0.2, 0.8, 0.4], "question": "A toy mixture puts fraction 0.8 at rate 0.8 and the remainder at rate 0.4. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "a mixture that can create a pooled association", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
