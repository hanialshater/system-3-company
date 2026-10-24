import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0376", "title": "Opposite responses across groups", "op": "mixture", "labels": ["Weight", "RateA", "RateB"], "outputs": ["Rate"], "a": [0.8, 10.0, -20.0], "b": [0.2, 10.0, -20.0], "question": "A toy mixture puts fraction 0.8 at rate 10 and the remainder at rate -20. What is its aggregate rate?", "questionTemplate": "A toy mixture puts fraction {Weight} at rate {RateA} and the remainder at rate {RateB}. What is its aggregate rate?", "explain": "An aggregate mixes groups with their weights. Changes in composition can move it while component rates stay fixed.", "lens": "heterogeneous group responses hidden in an aggregate", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
