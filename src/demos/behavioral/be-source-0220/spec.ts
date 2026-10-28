import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0220", "title": "Roommates in a toy sample", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.5, 80.0, 60.0], "b": [0.8, 80.0, 60.0], "question": "A toy mixture puts fraction 0.5 at rate 80 and the remainder at rate 60. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "composition and assignment before a peer-effect conclusion", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
