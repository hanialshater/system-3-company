import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0753", "title": "Each magnitude step changes the rate", "op": "annual", "labels": ["Start", "Rate", "Years"], "outputs": ["Balance"], "a": [1000.0, -0.9, 1.0], "b": [1000.0, -0.9, 2.0], "question": "A toy balance starts at 1000, compounds at rate -0.9 per period, for 1 periods. What balance results?", "questionTemplate": "A toy balance starts at {Start}, compounds at rate {Rate} per period, for {Years} periods. What balance results?", "explain": "Compounding applies the rate to the changing balance. Compare the same horizon under the altered rate.", "lens": "the stipulated tenfold decline per magnitude step", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
