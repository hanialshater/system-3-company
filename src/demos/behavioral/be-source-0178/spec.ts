import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0178", "title": "Change the inequality weight", "op": "inequity", "labels": ["Own", "Other", "Envy"], "outputs": ["Utility"], "a": [3.0, 7.0, 0.1], "b": [3.0, 7.0, 0.8], "question": "A toy utility equals own payoff 3 minus weight 0.1 times any shortfall below other payoff 7. What is utility?", "explain": "Payoff and model utility are separate quantities. Changing the inequality penalty can change a ranking without changing the money.", "lens": "the parameter in an illustrative preference rule", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy utility equals own payoff {Own} minus weight {Envy} times any shortfall below other payoff {Other}. What is utility?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
