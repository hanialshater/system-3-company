import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0263", "title": "Probability and decision weight", "op": "weightprob", "labels": ["P", "Alpha"], "outputs": ["Weight"], "a": [0.01, 0.65], "b": [0.8, 0.65], "question": "A toy probability-weighting rule is exp(-(-log(P))^Alpha). With P 0.01 and Alpha 0.65, what decision weight results?", "questionTemplate": "A toy probability-weighting rule is exp(-(-log(P))^Alpha). With P {P} and Alpha {Alpha}, what decision weight results?", "explain": "A decision weight differs from an event frequency. The specified curve is a model assumption and cannot establish what every person believes.", "lens": "a nonlinear decision-weight curve", "kind": "curve", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
