import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0419", "title": "Market drops and account logins", "op": "funnel", "labels": ["Visitors", "Stop", "Buy"], "outputs": ["Purchases"], "a": [1000.0, 0.8, 0.5], "b": [1000.0, 0.4, 0.5], "question": "Of 1000 toy visitors, fraction 0.8 stop and fraction 0.5 of those buy. How many purchases are expected?", "questionTemplate": "Of {Visitors} toy visitors, fraction {Stop} stop and fraction {Buy} of those buy. How many purchases are expected?", "explain": "More attention at the top of a funnel need not mean more final choices. Conditional conversion and reach jointly determine the result.", "lens": "the denominator behind an attention count", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
