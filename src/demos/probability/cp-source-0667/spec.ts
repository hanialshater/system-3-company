import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0667", "title": "One particle can dominate the weight", "op": "weights", "labels": ["A", "B", "C"], "outputs": ["First", "ESS"], "a": [0.99, 0.005, 0.005], "b": [1.0, 1.0, 1.0], "question": "Three positive toy importance weights are 0.99,0.005,0.005. What is the first normalized weight?", "questionTemplate": "Three positive toy importance weights are {A},{B},{C}. What is the first normalized weight?", "explain": "Weight concentration reduces the usual importance-weight ESS. This diagnostic differs from autocorrelation-based ESS for an MCMC sequence.", "lens": "the importance-weight ESS before any resampling step", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
