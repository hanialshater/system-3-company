import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0543", "title": "Integrate a changing hourly arrival rate", "op": "ratearea", "labels": ["Start", "End", "Time"], "outputs": ["Expected"], "a": [10.0, 30.0, 2.0], "b": [10.0, 50.0, 2.0], "question": "A toy nonhomogeneous Poisson rate changes linearly from 10 to 30 over Time 2. What expected event count results?", "questionTemplate": "A toy nonhomogeneous Poisson rate changes linearly from {Start} to {End} over Time {Time}. What expected event count results?", "explain": "The integral of the rate gives the expected count. It does not specify the exact count that will occur in a realized interval.", "lens": "the area under a stated linear intensity", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
