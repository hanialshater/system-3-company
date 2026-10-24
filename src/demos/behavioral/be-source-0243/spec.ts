import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0243", "title": "Engineers in two populations", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.3, 0.8, 0.2], "b": [0.7, 0.8, 0.2], "question": "A toy mixture puts fraction 0.3 at rate 0.8 and the remainder at rate 0.2. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "the base-rate mixture behind a description", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
