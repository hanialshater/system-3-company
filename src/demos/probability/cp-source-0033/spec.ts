import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0033", "title": "Exploit a predictable opponent", "op": "breakeven", "labels": ["Loss", "Win", "Probability"], "outputs": ["Expected"], "a": [1.0, 1.0, 0.6], "b": [1.0, 1.0, 0.3333333333333333], "question": "A toy gamble gains 1 with probability 0.6 and loses 1 otherwise. What is its expected cash change?", "questionTemplate": "A toy gamble gains {Win} with probability {Probability} and loses {Loss} otherwise. What is its expected cash change?", "explain": "Reaching an emotionally important balance is different from maximizing expected cash change. Neither guarantees the outcome of one play.", "lens": "the payoff from an assumed response probability", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
