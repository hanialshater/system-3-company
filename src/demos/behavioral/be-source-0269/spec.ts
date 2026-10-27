import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0269", "title": "A vivid prize and its odds", "op": "weightprob", "labels": ["P", "Alpha"], "outputs": ["Weight"], "a": [0.01, 0.3], "b": [0.5, 0.3], "question": "A toy probability-weighting rule is exp(-(-log(P))^Alpha). With P 0.01 and Alpha 0.3, what decision weight results?", "questionTemplate": "A toy probability-weighting rule is exp(-(-log(P))^Alpha). With P {P} and Alpha {Alpha}, what decision weight results?", "explain": "A decision weight differs from an event frequency. The specified curve is a model assumption and cannot establish what every person believes.", "lens": "a deliberately flattened probability-weight model", "kind": "curve", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
