import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0110", "title": "A chance to get back to zero", "op": "breakeven", "labels": ["Loss", "Win", "Probability"], "outputs": ["Expected"], "a": [100.0, 200.0, 0.25], "b": [100.0, 200.0, 0.5], "question": "A toy gamble gains 200 with probability 0.25 and loses 100 otherwise. What is its expected cash change?", "explain": "Reaching an emotionally important balance is different from maximizing expected cash change. Neither guarantees the outcome of one play.", "lens": "the probability as well as the break-even prize", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy gamble gains {Win} with probability {Probability} and loses {Loss} otherwise. What is its expected cash change?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
