import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0254", "title": "A crowd estimate against a benchmark", "op": "percentile", "labels": ["Actual", "Guessed"], "outputs": ["Error"], "a": [1000.0, 1010.0], "b": [1000.0, 1100.0], "question": "A toy result is at percentile 1000; the forecast was percentile 1010. What signed forecasting error is guessed minus actual?", "questionTemplate": "A toy result is at percentile {Actual}; the forecast was percentile {Guessed}. What signed forecasting error is guessed minus actual?", "explain": "A rank gap describes the two numbers. Measurement noise and mathematical coupling can also affect patterns in such gaps.", "lens": "the signed error of a stated aggregate guess", "kind": "scatter", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
