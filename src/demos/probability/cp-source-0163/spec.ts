import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0163", "title": "Scatter points over a bounded lake", "op": "mcse", "labels": ["Hits", "N", "Scale"], "outputs": ["Estimate", "SE"], "a": [250.0, 1000.0, 100.0], "b": [2500.0, 10000.0, 100.0], "question": "A toy Monte Carlo sample has 250 hits among 1000; multiply the hit fraction by Scale 100. What estimate results?", "questionTemplate": "A toy Monte Carlo sample has {Hits} hits among {N}; multiply the hit fraction by Scale {Scale}. What estimate results?", "explain": "Sampling error remains after a Monte Carlo estimate. The reported plug-in standard error assumes independent indicator draws.", "lens": "the bounding-area scale in an area estimate", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
