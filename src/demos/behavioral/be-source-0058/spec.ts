import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0058", "title": "How many estimates were right?", "op": "accuracy", "labels": ["Correct", "Total"], "outputs": ["Accuracy"], "a": [21.0, 100.0], "b": [42.0, 200.0], "question": "A toy assessment has 21 correct answers among 100. What fraction is correct?", "explain": "A score needs its denominator. This descriptive fraction does not establish skill, causation or the accuracy of another population.", "lens": "the denominator in a reported accuracy share", "kind": "grid", "answerPosition": 1, "questionTemplate": "A toy assessment has {Correct} correct answers among {Total}. What fraction is correct?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
