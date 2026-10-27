import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0432", "title": "A climate-based happiness forecast", "op": "percentile", "labels": ["Actual", "Guessed"], "outputs": ["Error"], "a": [5.0, 8.0], "b": [5.0, 5.0], "question": "A toy result is at percentile 5; the forecast was percentile 8. What signed forecasting error is guessed minus actual?", "questionTemplate": "A toy result is at percentile {Actual}; the forecast was percentile {Guessed}. What signed forecasting error is guessed minus actual?", "explain": "A rank gap describes the two numbers. Measurement noise and mathematical coupling can also affect patterns in such gaps.", "lens": "the forecast error separate from a regional label", "kind": "scatter", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
