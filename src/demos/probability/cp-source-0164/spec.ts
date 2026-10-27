import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0164", "title": "A hundredfold sample buys tenfold SE", "op": "mcse", "labels": ["Hits", "N", "Scale"], "outputs": ["Estimate", "SE"], "a": [500.0, 1000.0, 1.0], "b": [50000.0, 100000.0, 1.0], "question": "A toy Monte Carlo sample has 500 hits among 1000; multiply the hit fraction by Scale 1. What estimate results?", "questionTemplate": "A toy Monte Carlo sample has {Hits} hits among {N}; multiply the hit fraction by Scale {Scale}. What estimate results?", "explain": "Sampling error remains after a Monte Carlo estimate. The reported plug-in standard error assumes independent indicator draws.", "lens": "the square-root Monte Carlo error scale", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
