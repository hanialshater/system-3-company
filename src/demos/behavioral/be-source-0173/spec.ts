import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0173", "title": "A different reward next door", "op": "inequity", "labels": ["Own", "Other", "Envy"], "outputs": ["Utility"], "a": [3.0, 3.0, 0.5], "b": [3.0, 6.0, 0.5], "question": "A toy utility equals own payoff 3 minus weight 0.5 times any shortfall below other payoff 3. What is utility?", "explain": "Payoff and model utility are separate quantities. Changing the inequality penalty can change a ranking without changing the money.", "lens": "the comparison payoff in a stated inequality model", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy utility equals own payoff {Own} minus weight {Envy} times any shortfall below other payoff {Other}. What is utility?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
