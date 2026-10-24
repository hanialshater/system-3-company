import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0427", "title": "Within-group and national averages", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.2, 8.0, 4.0], "b": [0.8, 8.0, 4.0], "question": "A toy mixture puts fraction 0.2 at rate 8 and the remainder at rate 4. What is its aggregate rate?", "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "composition separate from a within-group association", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
