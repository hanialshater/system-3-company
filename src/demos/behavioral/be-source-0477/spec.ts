import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0477", "title": "Screening later in a clinic day", "op": "funnel", "labels": ["Visitors", "Stop", "Buy"], "outputs": ["Purchases"], "a": [100.0, 0.8, 0.5], "b": [100.0, 0.5, 0.5], "question": "Of 100 toy visitors, fraction 0.8 stop and fraction 0.5 of those buy. How many purchases are expected?", "questionTemplate": "Of {Visitors} toy visitors, fraction {Stop} stop and fraction {Buy} of those buy. How many purchases are expected?", "explain": "More attention at the top of a funnel need not mean more final choices. Conditional conversion and reach jointly determine the result.", "lens": "the reach of a stated screening funnel", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
