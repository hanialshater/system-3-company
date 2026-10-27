import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0201", "title": "How many judgments changed?", "op": "accuracy", "labels": ["Correct", "Total"], "outputs": ["Accuracy"], "a": [75.0, 100.0], "b": [25.0, 100.0], "question": "A toy assessment has 75 correct answers among 100. What fraction is correct?", "explain": "A score needs its denominator. This descriptive fraction does not establish skill, causation or the accuracy of another population.", "lens": "a person-level versus a trial-level denominator", "kind": "grid", "answerPosition": 0, "questionTemplate": "A toy assessment has {Correct} correct answers among {Total}. What fraction is correct?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
