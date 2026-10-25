import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0083", "title": "A cover follows a lucky peak", "op": "regression", "labels": ["Mean", "Observed", "Reliability"], "outputs": ["ExpectedNext"], "a": [50.0, 90.0, 0.4], "b": [50.0, 90.0, 1.0], "question": "A toy repeat-score model predicts Mean 50 plus Reliability 0.4 times the deviation of Observed 90. What is the expected next score?", "questionTemplate": "A toy repeat-score model predicts Mean {Mean} plus Reliability {Reliability} times the deviation of Observed {Observed}. What is the expected next score?", "explain": "Selecting an extreme noisy score can be followed by a less extreme score without any intervention effect. This prediction rule is explicitly assumed.", "lens": "selection on an extreme noisy score", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
