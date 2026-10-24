import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0324", "title": "Three questions, a denominator", "op": "accuracy", "labels": ["Correct", "Total"], "outputs": ["Accuracy"], "a": [100.0, 300.0], "b": [200.0, 600.0], "question": "A toy assessment has 100 correct answers among 300. What fraction is correct?", "questionTemplate": "A toy assessment has {Correct} correct answers among {Total}. What fraction is correct?", "explain": "A score needs its denominator. This descriptive fraction does not establish skill, causation or the accuracy of another population.", "lens": "the descriptive share behind a literacy score", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
