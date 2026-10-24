import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0277", "title": "Risk after a recent disaster", "op": "lossbet", "labels": ["Gain", "Loss", "Lambda", "P"], "outputs": ["Value"], "a": [100.0, 80.0, 1.0, 0.5], "b": [100.0, 80.0, 2.0, 0.5], "question": "A toy bet wins 100 with probability 0.5; otherwise it loses 80. Losses count 1 times gains. What is its expected model value?", "questionTemplate": "A toy bet wins {Gain} with probability {P}; otherwise it loses {Loss}. Losses count {Lambda} times gains. What is its expected model value?", "explain": "The model weights a loss separately from its probability. A positive cash expectation can coexist with a negative model valuation.", "lens": "an assumed change in sensitivity after a shock", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
