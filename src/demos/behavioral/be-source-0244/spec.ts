import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0244", "title": "The witness and the cab fleet", "op": "percentile", "labels": ["Actual", "Guessed"], "outputs": ["Error"], "a": [41.37931, 80.0], "b": [80.0, 80.0], "question": "A toy result is at percentile 41.3793; the forecast was percentile 80. What signed forecasting error is guessed minus actual?", "explain": "A rank gap describes the two numbers. Measurement noise and mathematical coupling can also affect patterns in such gaps.", "lens": "the gap between an estimate and a stated benchmark", "kind": "scatter", "answerPosition": 1, "questionTemplate": "A toy result is at percentile {Actual}; the forecast was percentile {Guessed}. What signed forecasting error is guessed minus actual?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
