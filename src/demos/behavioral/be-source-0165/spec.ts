import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0165", "title": "The same fraction at higher stakes", "op": "ultimatum", "labels": ["Pie", "Offer", "Accept"], "outputs": ["Expected"], "a": [100.0, 40.0, 0.8], "b": [1000.0, 400.0, 0.95], "question": "A toy proposer divides pie 100, offers 40, and is accepted with probability 0.8; rejection pays zero. What is the proposer’s expected payoff?", "explain": "The offered share and acceptance probability must be considered together. The assumed response is not a claim about all recipients.", "lens": "the stated acceptance rule and the monetary scale", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy proposer divides pie {Pie}, offers {Offer}, and is accepted with probability {Accept}; rejection pays zero. What is the proposer’s expected payoff?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
