import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0003", "title": "The gamble changes sign", "op": "lossbet", "labels": ["Gain", "Loss", "Lambda", "P"], "outputs": ["Value"], "a": [4000.0, 0.0, 1.0, 0.8], "b": [0.0, 4000.0, 1.0, 0.8], "question": "A toy bet wins 4000 with probability 0.8; otherwise it loses 0. Losses count 1 times gains. What is its expected model value?", "explain": "The model weights a loss separately from its probability. A positive cash expectation can coexist with a negative model valuation.", "lens": "the sign of a lottery payoff", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy bet wins {Gain} with probability {P}; otherwise it loses {Loss}. Losses count {Lambda} times gains. What is its expected model value?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
