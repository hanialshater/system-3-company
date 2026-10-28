import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0139", "title": "A routine purchase reference", "op": "lossbet", "labels": ["Gain", "Loss", "Lambda", "P"], "outputs": ["Value"], "a": [12.0, 10.0, 1.0, 0.5], "b": [12.0, 10.0, 2.0, 0.5], "question": "A toy bet wins 12 with probability 0.5; otherwise it loses 10. Losses count 1 times gains. What is its expected model value?", "explain": "The model weights a loss separately from its probability. A positive cash expectation can coexist with a negative model valuation.", "lens": "the assumed loss weight in a routine exchange", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy bet wins {Gain} with probability {P}; otherwise it loses {Loss}. Losses count {Lambda} times gains. What is its expected model value?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
