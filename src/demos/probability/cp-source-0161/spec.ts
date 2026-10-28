import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0161", "title": "Darts estimate a circle's area", "op": "mcse", "labels": ["Hits", "N", "Scale"], "outputs": ["Estimate", "SE"], "a": [785.0, 1000.0, 4.0], "b": [7850.0, 10000.0, 4.0], "question": "A toy Monte Carlo sample has 785 hits among 1000; multiply the hit fraction by Scale 4. What estimate results?", "questionTemplate": "A toy Monte Carlo sample has {Hits} hits among {N}; multiply the hit fraction by Scale {Scale}. What estimate results?", "explain": "Sampling error remains after a Monte Carlo estimate. The reported plug-in standard error assumes independent indicator draws.", "lens": "the hit fraction and Monte Carlo sampling error", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
