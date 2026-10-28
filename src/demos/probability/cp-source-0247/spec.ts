import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0247", "title": "One point pulls the mean", "op": "outlier", "labels": ["Regular", "N", "Extreme"], "outputs": ["Mean", "Median"], "a": [10.0, 9.0, 100.0], "b": [10.0, 9.0, 10.0], "question": "A toy sample has 9 identical values 10 and one extreme 100. What is the sample mean?", "questionTemplate": "A toy sample has {N} identical values {Regular} and one extreme {Extreme}. What is the sample mean?", "explain": "The extreme value can move the mean substantially while the median of this sample stays at the repeated value. Sensitivity does not itself establish which observations are invalid.", "lens": "the influence of an extreme observation", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
