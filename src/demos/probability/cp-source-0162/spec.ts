import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0162", "title": "Needle crossings need a denominator", "op": "mcse", "labels": ["Hits", "N", "Scale"], "outputs": ["Estimate", "SE"], "a": [637.0, 1000.0, 1.0], "b": [6370.0, 10000.0, 1.0], "question": "A toy Monte Carlo sample has 637 hits among 1000; multiply the hit fraction by Scale 1. What estimate results?", "questionTemplate": "A toy Monte Carlo sample has {Hits} hits among {N}; multiply the hit fraction by Scale {Scale}. What estimate results?", "explain": "Sampling error remains after a Monte Carlo estimate. The reported plug-in standard error assumes independent indicator draws.", "lens": "the crossing fraction before any nonlinear pi transformation", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
