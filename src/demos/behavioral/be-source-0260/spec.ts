import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0260", "title": "Forecast after a market rise", "op": "percentile", "labels": ["Actual", "Guessed"], "outputs": ["Error"], "a": [4.0, 12.0], "b": [4.0, 5.0], "question": "A toy result is at percentile 4; the forecast was percentile 12. What signed forecasting error is guessed minus actual?", "questionTemplate": "A toy result is at percentile {Actual}; the forecast was percentile {Guessed}. What signed forecasting error is guessed minus actual?", "explain": "A rank gap describes the two numbers. Measurement noise and mathematical coupling can also affect patterns in such gaps.", "lens": "the gap between a stated forecast and outcome", "kind": "scatter", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
