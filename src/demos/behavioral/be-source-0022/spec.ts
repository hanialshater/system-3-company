import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0022", "title": "Which end of the product?", "op": "factorial", "labels": ["N", "Estimate"], "outputs": ["Fold"], "a": [8.0, 512.0], "b": [8.0, 2250.0], "question": "An estimate for 8 factorial is 512. How many times larger is the exact product?", "explain": "The complete product is invariant to order; a rushed estimate can depend on which factors are encountered first.", "lens": "the invariant product behind order-dependent guesses", "kind": "bars", "answerPosition": 1, "questionTemplate": "An estimate for {N} factorial is {Estimate}. How many times larger is the exact product?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
