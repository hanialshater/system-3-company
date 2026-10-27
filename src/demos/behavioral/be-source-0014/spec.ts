import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0014", "title": "A winner and a loser", "op": "breakeven", "labels": ["Loss", "Win", "Probability"], "outputs": ["Expected"], "a": [20.0, 30.0, 0.5], "b": [20.0, 30.0, 0.8], "question": "A toy gamble gains 30 with probability 0.5 and loses 20 otherwise. What is its expected cash change?", "explain": "Reaching an emotionally important balance is different from maximizing expected cash change. Neither guarantees the outcome of one play.", "lens": "the future gamble rather than its historical label", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy gamble gains {Win} with probability {Probability} and loses {Loss} otherwise. What is its expected cash change?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
