import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0736", "title": "A drive cohort loses members", "op": "km", "labels": ["N1", "D1", "N2", "D2"], "outputs": ["Survival"], "a": [1000.0, 10.0, 900.0, 20.0], "b": [1000.0, 10.0, 900.0, 100.0], "question": "Two toy event times have risk sets N1 1000, N2 900 and failures D1 10, D2 20. What Kaplan-Meier survival product results?", "questionTemplate": "Two toy event times have risk sets N1 {N1}, N2 {N2} and failures D1 {D1}, D2 {D2}. What Kaplan-Meier survival product results?", "explain": "Each drop uses the risk set just before that event time. Censoring assumptions matter for interpreting the estimated curve.", "lens": "the illustrative drive-cohort event counts", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
