import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0327", "title": "The growth that compounds", "op": "annual", "labels": ["Start", "Rate", "Years"], "outputs": ["Balance"], "a": [100.0, 0.1, 10.0], "b": [100.0, 0.1, 20.0], "question": "A toy balance starts at 100, compounds at rate 0.1 per period, for 10 periods. What balance results?", "questionTemplate": "A toy balance starts at {Start}, compounds at rate {Rate} per period, for {Years} periods. What balance results?", "explain": "Compounding applies the rate to the changing balance. Compare the same horizon under the altered rate.", "lens": "the horizon of compound growth", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
