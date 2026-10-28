import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0462", "title": "An immediate need meets borrowing", "op": "debt", "labels": ["Balance", "Interest", "Payment"], "outputs": ["Next"], "a": [100.0, 0.1, 5.0], "b": [100.0, 0.1, 20.0], "question": "A toy balance of 100 accrues interest 0.1, then payment 5. What balance remains?", "questionTemplate": "A toy balance of {Balance} accrues interest {Interest}, then payment {Payment}. What balance remains?", "explain": "A salient payment can be smaller than the new interest. The calculation separates the displayed payment from the balance path.", "lens": "the next-period debt from a stated short-term payment", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
