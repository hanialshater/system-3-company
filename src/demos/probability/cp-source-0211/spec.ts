import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0211", "title": "Confident and wrong costs more", "op": "logloss", "labels": ["Y", "P"], "outputs": ["Loss"], "a": [1.0, 0.99], "b": [1.0, 0.01], "question": "A toy binary outcome is Y 1; predicted probability of class 1 is 0.99. What is its binary log loss in nats?", "questionTemplate": "A toy binary outcome is Y {Y}; predicted probability of class 1 is {P}. What is its binary log loss in nats?", "explain": "Log loss grows sharply when a confident prediction assigns little probability to the observed class. Calibration requires repeated outcome checks.", "lens": "the probability assigned to the observed class", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
