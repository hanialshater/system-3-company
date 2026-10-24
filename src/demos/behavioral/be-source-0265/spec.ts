import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0265", "title": "A long shot at what price?", "op": "breakeven", "labels": ["Loss", "Win", "Probability"], "outputs": ["Expected"], "a": [10.0, 190.0, 0.04], "b": [10.0, 190.0, 0.06], "question": "A toy gamble gains 190 with probability 0.04 and loses 10 otherwise. What is its expected cash change?", "questionTemplate": "A toy gamble gains {Win} with probability {Probability} and loses {Loss} otherwise. What is its expected cash change?", "explain": "Reaching an emotionally important balance is different from maximizing expected cash change. Neither guarantees the outcome of one play.", "lens": "the actual win probability behind betting value", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
