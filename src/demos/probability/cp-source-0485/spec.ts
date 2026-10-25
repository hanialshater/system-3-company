import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0485", "title": "A treatment can increase toy risk", "op": "riskchange", "labels": ["Baseline", "Treated"], "outputs": ["Reduction", "NNT", "Ratio"], "a": [0.1, 0.12], "b": [0.1, 0.08], "question": "A toy untreated risk is 0.1, treated risk 0.12, with a nonzero difference. What is absolute risk reduction?", "questionTemplate": "A toy untreated risk is {Baseline}, treated risk {Treated}, with a nonzero difference. What is absolute risk reduction?", "explain": "Absolute and relative changes use different scales. The reciprocal reduction is an average number-needed-to-treat under this specified causal-risk model.", "lens": "the sign of an explicit absolute risk change", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
