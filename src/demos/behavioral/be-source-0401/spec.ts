import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0401", "title": "Price swings and cash-flow forecasts", "op": "percentile", "labels": ["Actual", "Guessed"], "outputs": ["Error"], "a": [10.0, 40.0], "b": [10.0, 15.0], "question": "A toy result is at percentile 10; the forecast was percentile 40. What signed forecasting error is guessed minus actual?", "questionTemplate": "A toy result is at percentile {Actual}; the forecast was percentile {Guessed}. What signed forecasting error is guessed minus actual?", "explain": "A rank gap describes the two numbers. Measurement noise and mathematical coupling can also affect patterns in such gaps.", "lens": "the numerical gap between prices and a stated benchmark", "kind": "scatter", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
