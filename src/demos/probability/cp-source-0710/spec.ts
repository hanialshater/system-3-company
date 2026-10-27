import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0710", "title": "Sell now or keep the option", "op": "stopvalue", "labels": ["Offer", "Continuation", "Gamma"], "outputs": ["Value"], "a": [10.0, 12.0, 0.9], "b": [10.0, 8.0, 0.9], "question": "A toy seller can take Offer 10 or discounted continuation 12×Gamma 0.9. What is the better expected value?", "questionTemplate": "A toy seller can take Offer {Offer} or discounted continuation {Continuation}×Gamma {Gamma}. What is the better expected value?", "explain": "Stopping compares the offer with a supplied continuation value. Computing that continuation is a separate dynamic-programming problem.", "lens": "the supplied continuation value at an offer", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
