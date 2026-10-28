import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0431", "title": "Forecasting a tenure disappointment", "op": "percentile", "labels": ["Actual", "Guessed"], "outputs": ["Error"], "a": [3.0, 8.0], "b": [3.0, 4.0], "question": "A toy result is at percentile 3; the forecast was percentile 8. What signed forecasting error is guessed minus actual?", "questionTemplate": "A toy result is at percentile {Actual}; the forecast was percentile {Guessed}. What signed forecasting error is guessed minus actual?", "explain": "A rank gap describes the two numbers. Measurement noise and mathematical coupling can also affect patterns in such gaps.", "lens": "the gap between predicted and recorded impact", "kind": "scatter", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
