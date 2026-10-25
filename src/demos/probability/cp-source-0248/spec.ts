import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0248", "title": "The billionaire changes the average", "op": "outlier", "labels": ["Regular", "N", "Extreme"], "outputs": ["Mean", "Median"], "a": [100.0, 99.0, 1000000.0], "b": [100.0, 99.0, 100.0], "question": "A toy sample has 99 identical values 100 and one extreme 1e+06. What is the sample mean?", "questionTemplate": "A toy sample has {N} identical values {Regular} and one extreme {Extreme}. What is the sample mean?", "explain": "The extreme value can move the mean substantially while the median of this sample stays at the repeated value. Sensitivity does not itself establish which observations are invalid.", "lens": "the mean and median of a fixed toy sample", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
