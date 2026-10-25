import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0435", "title": "Convert an absolute risk reduction", "op": "riskchange", "labels": ["Baseline", "Treated"], "outputs": ["Reduction", "NNT", "Ratio"], "a": [0.1, 0.05], "b": [0.01, 0.005], "question": "A toy untreated risk is 0.1, treated risk 0.05, with a nonzero difference. What is absolute risk reduction?", "questionTemplate": "A toy untreated risk is {Baseline}, treated risk {Treated}, with a nonzero difference. What is absolute risk reduction?", "explain": "Absolute and relative changes use different scales. The reciprocal reduction is an average number-needed-to-treat under this specified causal-risk model.", "lens": "the reciprocal risk difference under a stipulated causal model", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
