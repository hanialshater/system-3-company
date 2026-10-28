import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0406", "title": "A method versus a trial benchmark", "op": "percentile", "labels": ["Actual", "Guessed"], "outputs": ["Error"], "a": [2.0, 5.0], "b": [2.0, 2.0], "question": "A toy result is at percentile 2; the forecast was percentile 5. What signed forecasting error is guessed minus actual?", "questionTemplate": "A toy result is at percentile {Actual}; the forecast was percentile {Guessed}. What signed forecasting error is guessed minus actual?", "explain": "A rank gap describes the two numbers. Measurement noise and mathematical coupling can also affect patterns in such gaps.", "lens": "the numerical estimation error against a stipulated benchmark", "kind": "scatter", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
