import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0496", "title": "A few extreme storms move the mean", "op": "outlier", "labels": ["Regular", "N", "Extreme"], "outputs": ["Mean", "Median"], "a": [10.0, 20.0, 500.0], "b": [10.0, 20.0, 10.0], "question": "A toy sample has 20 identical values 10 and one extreme 500. What is the sample mean?", "questionTemplate": "A toy sample has {N} identical values {Regular} and one extreme {Extreme}. What is the sample mean?", "explain": "The extreme value can move the mean substantially while the median of this sample stays at the repeated value. Sensitivity does not itself establish which observations are invalid.", "lens": "the sensitivity of a mean to a specified extreme observation", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
