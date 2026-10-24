import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0417", "title": "A stock with lottery-like payoffs", "op": "breakeven", "labels": ["Loss", "Win", "Probability"], "outputs": ["Expected"], "a": [10.0, 990.0, 0.005], "b": [10.0, 990.0, 0.02], "question": "A toy gamble gains 990 with probability 0.005 and loses 10 otherwise. What is its expected cash change?", "questionTemplate": "A toy gamble gains {Win} with probability {Probability} and loses {Loss} otherwise. What is its expected cash change?", "explain": "Reaching an emotionally important balance is different from maximizing expected cash change. Neither guarantees the outcome of one play.", "lens": "the probability behind a skewed payoff expectation", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
