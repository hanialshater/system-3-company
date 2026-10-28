import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0436", "title": "Doubling a tiny baseline risk", "op": "riskchange", "labels": ["Baseline", "Treated"], "outputs": ["Reduction", "NNT", "Ratio"], "a": [0.0001, 0.0002], "b": [0.1, 0.2], "question": "A toy untreated risk is 0.0001, treated risk 0.0002, with a nonzero difference. What is absolute risk reduction?", "questionTemplate": "A toy untreated risk is {Baseline}, treated risk {Treated}, with a nonzero difference. What is absolute risk reduction?", "explain": "Absolute and relative changes use different scales. The reciprocal reduction is an average number-needed-to-treat under this specified causal-risk model.", "lens": "absolute versus relative risk change", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
