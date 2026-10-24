import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0109", "title": "What counts as house money?", "op": "breakeven", "labels": ["Loss", "Win", "Probability"], "outputs": ["Expected"], "a": [10.0, 20.0, 0.5], "b": [10.0, 20.0, 0.25], "question": "A toy gamble gains 20 with probability 0.5 and loses 10 otherwise. What is its expected cash change?", "explain": "Reaching an emotionally important balance is different from maximizing expected cash change. Neither guarantees the outcome of one play.", "lens": "the future gamble rather than the source of earlier money", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy gamble gains {Win} with probability {Probability} and loses {Loss} otherwise. What is its expected cash change?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
