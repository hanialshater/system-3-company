import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0273", "title": "Chasing the break-even point", "op": "breakeven", "labels": ["Loss", "Win", "Probability"], "outputs": ["Expected"], "a": [30.0, 60.0, 0.4], "b": [30.0, 60.0, 0.6], "question": "A toy gamble gains 60 with probability 0.4 and loses 30 otherwise. What is its expected cash change?", "questionTemplate": "A toy gamble gains {Win} with probability {Probability} and loses {Loss} otherwise. What is its expected cash change?", "explain": "Reaching an emotionally important balance is different from maximizing expected cash change. Neither guarantees the outcome of one play.", "lens": "the expected payoff separate from a desired target", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
