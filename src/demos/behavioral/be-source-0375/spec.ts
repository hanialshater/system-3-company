import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0375", "title": "Which borrower receives the text?", "op": "funnel", "labels": ["Visitors", "Stop", "Buy"], "outputs": ["Purchases"], "a": [1000.0, 0.7, 0.8], "b": [1000.0, 0.3, 0.8], "question": "Of 1000 toy visitors, fraction 0.7 stop and fraction 0.8 of those buy. How many purchases are expected?", "questionTemplate": "Of {Visitors} toy visitors, fraction {Stop} stop and fraction {Buy} of those buy. How many purchases are expected?", "explain": "More attention at the top of a funnel need not mean more final choices. Conditional conversion and reach jointly determine the result.", "lens": "reach separate from conditional repayment", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
