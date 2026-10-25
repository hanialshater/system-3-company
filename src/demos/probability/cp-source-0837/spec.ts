import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0837", "title": "A shared control affects precision", "op": "meancontrast", "labels": ["SDA", "NA", "SDB", "NB"], "outputs": ["SE"], "a": [1.0, 20.0, 1.0, 20.0], "b": [1.0, 20.0, 1.0, 80.0], "question": "Two independent toy means have SD/sample sizes 1/20 and 1/20. What standard error of their difference results?", "questionTemplate": "Two independent toy means have SD/sample sizes {SDA}/{NA} and {SDB}/{NB}. What standard error of their difference results?", "explain": "Independent sampling variances add for a difference. Reusing a control induces covariance among several treatment contrasts.", "lens": "the control sample size in one independent mean contrast", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
