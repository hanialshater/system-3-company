import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0093", "title": "Present spending, later balance", "op": "debt", "labels": ["Balance", "Interest", "Payment"], "outputs": ["Next"], "a": [1000.0, 0.02, 10.0], "b": [1000.0, 0.02, 50.0], "question": "A toy balance of 1000 accrues interest 0.02, then payment 10. What balance remains?", "explain": "A salient payment can be smaller than the new interest. The calculation separates the displayed payment from the balance path.", "lens": "the cash consequence of a smaller current payment", "kind": "timeline", "answerPosition": 0, "questionTemplate": "A toy balance of {Balance} accrues interest {Interest}, then payment {Payment}. What balance remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
