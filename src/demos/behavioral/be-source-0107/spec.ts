import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0107", "title": "Draft position and performance", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.8, 30.0, 10.0], "b": [0.2, 30.0, 10.0], "question": "A toy mixture puts fraction 0.8 at rate 30 and the remainder at rate 10. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "a composition explanation for a playing-time association", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
