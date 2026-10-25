import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0127", "title": "A predictor's observed track record", "op": "accuracy", "labels": ["Correct", "Total"], "outputs": ["Accuracy"], "a": [99.0, 100.0], "b": [50.0, 100.0], "question": "A toy assessment has 99 correct answers among 100. What fraction is correct?", "questionTemplate": "A toy assessment has {Correct} correct answers among {Total}. What fraction is correct?", "explain": "A score needs its denominator. This descriptive fraction does not establish skill, causation or the accuracy of another population.", "lens": "the stated evidence about a predictor without resolving a decision theory", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
