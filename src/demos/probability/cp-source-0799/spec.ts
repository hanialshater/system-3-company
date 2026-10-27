import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0799", "title": "A repeated generator loses a tail", "op": "weights", "labels": ["A", "B", "C"], "outputs": ["First", "ESS"], "a": [8.0, 1.0, 1.0], "b": [8.0, 0.1, 0.1], "question": "Three positive toy importance weights are 8,1,1. What is the first normalized weight?", "questionTemplate": "Three positive toy importance weights are {A},{B},{C}. What is the first normalized weight?", "explain": "Weight concentration reduces the usual importance-weight ESS. This diagnostic differs from autocorrelation-based ESS for an MCMC sequence.", "lens": "the renormalized weight after tail mass is removed", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
