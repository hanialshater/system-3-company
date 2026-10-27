import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0246", "title": "Which risks were recalled?", "op": "accuracy", "labels": ["Correct", "Total"], "outputs": ["Accuracy"], "a": [3.0, 10.0], "b": [8.0, 10.0], "question": "A toy assessment has 3 correct answers among 10. What fraction is correct?", "explain": "A score needs its denominator. This descriptive fraction does not establish skill, causation or the accuracy of another population.", "lens": "the denominator in a stated recall task", "kind": "grid", "answerPosition": 0, "questionTemplate": "A toy assessment has {Correct} correct answers among {Total}. What fraction is correct?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
