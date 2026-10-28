import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0996", "title": "Asymmetric transitions create a drift", "op": "trade", "labels": ["Before", "SwitchFee", "After"], "outputs": ["Gain"], "a": [0.2, 0.0, 0.5], "b": [0.2, 0.0, 0.2], "question": "Keeping a toy option yields 0.2. Switching yields 0.5 and costs 0. What is the gain from switching?", "questionTemplate": "Keeping a toy option yields {Before}. Switching yields {After} and costs {SwitchFee}. What is the gain from switching?", "explain": "Make the opportunity cost visible before judging a refusal to switch. Equal-risk labels can obscure a straightforward payoff difference.", "lens": "the supplied directional transition difference before a ratchet model", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
