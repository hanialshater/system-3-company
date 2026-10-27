import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0709", "title": "A reorder action has continuation", "op": "stopvalue", "labels": ["Offer", "Continuation", "Gamma"], "outputs": ["Value"], "a": [5.0, 8.0, 0.9], "b": [5.0, 3.0, 0.9], "question": "A toy seller can take Offer 5 or discounted continuation 8×Gamma 0.9. What is the better expected value?", "questionTemplate": "A toy seller can take Offer {Offer} or discounted continuation {Continuation}×Gamma {Gamma}. What is the better expected value?", "explain": "Stopping compares the offer with a supplied continuation value. Computing that continuation is a separate dynamic-programming problem.", "lens": "the supplied inventory continuation before solving a stock policy", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
