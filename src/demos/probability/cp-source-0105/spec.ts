import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0105", "title": "The largest serial is not the total", "op": "tank", "labels": ["Maximum", "Sample"], "outputs": ["Estimate"], "a": [100.0, 5.0], "b": [100.0, 20.0], "question": "A simple random sample without replacement of 5 serials from 1 through N has maximum 100. What is the unbiased tank-count estimate?", "questionTemplate": "A simple random sample without replacement of {Sample} serials from 1 through N has maximum {Maximum}. What is the unbiased tank-count estimate?", "explain": "The gap above the observed maximum must be estimated. Uniform sampling of distinct serials is central to this estimator.", "lens": "the expected unseen gap beyond a sampled maximum", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
