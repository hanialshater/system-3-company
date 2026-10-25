import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0705", "title": "A proxy reward favors circling", "op": "stopvalue", "labels": ["Offer", "Continuation", "Gamma"], "outputs": ["Value"], "a": [10.0, 20.0, 0.9], "b": [10.0, 5.0, 0.9], "question": "A toy seller can take Offer 10 or discounted continuation 20×Gamma 0.9. What is the better expected value?", "questionTemplate": "A toy seller can take Offer {Offer} or discounted continuation {Continuation}×Gamma {Gamma}. What is the better expected value?", "explain": "Stopping compares the offer with a supplied continuation value. Computing that continuation is a separate dynamic-programming problem.", "lens": "the supplied loop continuation versus finishing reward", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
