import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0172", "title": "Money and an inequality penalty", "op": "inequity", "labels": ["Own", "Other", "Envy"], "outputs": ["Utility"], "a": [4.0, 8.0, 0.5], "b": [4.0, 8.0, 1.5], "question": "A toy utility equals own payoff 4 minus weight 0.5 times any shortfall below other payoff 8. What is utility?", "explain": "Payoff and model utility are separate quantities. Changing the inequality penalty can change a ranking without changing the money.", "lens": "the difference between cash and model utility", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy utility equals own payoff {Own} minus weight {Envy} times any shortfall below other payoff {Other}. What is utility?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
