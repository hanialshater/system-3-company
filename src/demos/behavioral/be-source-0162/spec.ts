import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0162", "title": "Keep more, risk the whole pie", "op": "ultimatum", "labels": ["Pie", "Offer", "Accept"], "outputs": ["Expected"], "a": [10.0, 1.0, 0.5], "b": [10.0, 2.0, 0.8], "question": "A toy proposer divides pie 10, offers 1, and is accepted with probability 0.5; rejection pays zero. What is the proposer’s expected payoff?", "explain": "The offered share and acceptance probability must be considered together. The assumed response is not a claim about all recipients.", "lens": "the expected payoff rather than the retained share alone", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy proposer divides pie {Pie}, offers {Offer}, and is accepted with probability {Accept}; rejection pays zero. What is the proposer’s expected payoff?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
