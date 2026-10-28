import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0141", "title": "More visitors, fewer purchases?", "op": "funnel", "labels": ["Visitors", "Stop", "Buy"], "outputs": ["Purchases"], "a": [1000.0, 0.6, 0.03], "b": [1000.0, 0.4, 0.3], "question": "Of 1000 toy visitors, fraction 0.6 stop and fraction 0.03 of those buy. How many purchases are expected?", "explain": "More attention at the top of a funnel need not mean more final choices. Conditional conversion and reach jointly determine the result.", "lens": "the two denominators in a choice funnel", "kind": "grid", "answerPosition": 0, "questionTemplate": "Of {Visitors} toy visitors, fraction {Stop} stop and fraction {Buy} of those buy. How many purchases are expected?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
