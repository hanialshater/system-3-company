import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0260", "title": "Independent measurement errors combine", "op": "quadrature", "labels": ["VarA", "VarB"], "outputs": ["SD"], "a": [4.0, 9.0], "b": [16.0, 9.0], "question": "Two independent zero-mean toy errors have variances 4,9. What is the standard deviation of their sum?", "questionTemplate": "Two independent zero-mean toy errors have variances {VarA},{VarB}. What is the standard deviation of their sum?", "explain": "Independent variances add before taking a square root. Adding standard deviations would answer a different question; covariance would add another term.", "lens": "the addition of independent variances", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
