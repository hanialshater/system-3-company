import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0072", "title": "A tail observation changes the mean", "op": "outlier", "labels": ["Regular", "N", "Extreme"], "outputs": ["Mean", "Median"], "a": [0.0, 99.0, -20.0], "b": [0.0, 99.0, -2.0], "question": "A toy sample has 99 identical values 0 and one extreme -20. What is the sample mean?", "questionTemplate": "A toy sample has {N} identical values {Regular} and one extreme {Extreme}. What is the sample mean?", "explain": "The extreme value can move the mean substantially while the median of this sample stays at the repeated value. Sensitivity does not itself establish which observations are invalid.", "lens": "tail sensitivity rather than proof of a normal law", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
