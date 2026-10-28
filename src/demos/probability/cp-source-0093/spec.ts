import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0093", "title": "Last year's top fund regresses", "op": "regression", "labels": ["Mean", "Observed", "Reliability"], "outputs": ["ExpectedNext"], "a": [5.0, 25.0, 0.2], "b": [5.0, 25.0, 0.8], "question": "A toy repeat-score model predicts Mean 5 plus Reliability 0.2 times the deviation of Observed 25. What is the expected next score?", "questionTemplate": "A toy repeat-score model predicts Mean {Mean} plus Reliability {Reliability} times the deviation of Observed {Observed}. What is the expected next score?", "explain": "Selecting an extreme noisy score can be followed by a less extreme score without any intervention effect. This prediction rule is explicitly assumed.", "lens": "an assumed repeat-return reliability", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
