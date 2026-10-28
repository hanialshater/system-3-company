import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0161", "title": "An offer that may be rejected", "op": "ultimatum", "labels": ["Pie", "Offer", "Accept"], "outputs": ["Expected"], "a": [10.0, 5.0, 1.0], "b": [10.0, 1.0, 0.5], "question": "A toy proposer divides pie 10, offers 5, and is accepted with probability 1; rejection pays zero. What is the proposer’s expected payoff?", "explain": "The offered share and acceptance probability must be considered together. The assumed response is not a claim about all recipients.", "lens": "the offer and the stated acceptance probability", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy proposer divides pie {Pie}, offers {Offer}, and is accepted with probability {Accept}; rejection pays zero. What is the proposer’s expected payoff?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
