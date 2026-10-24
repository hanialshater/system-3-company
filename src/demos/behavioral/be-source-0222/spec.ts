import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0222", "title": "A rank and its self-estimate", "op": "percentile", "labels": ["Actual", "Guessed"], "outputs": ["Error"], "a": [12.0, 62.0], "b": [50.0, 62.0], "question": "A toy result is at percentile 12; the forecast was percentile 62. What signed forecasting error is guessed minus actual?", "explain": "A rank gap describes the two numbers. Measurement noise and mathematical coupling can also affect patterns in such gaps.", "lens": "the signed rank gap without diagnosing its cause", "kind": "scatter", "answerPosition": 0, "questionTemplate": "A toy result is at percentile {Actual}; the forecast was percentile {Guessed}. What signed forecasting error is guessed minus actual?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
