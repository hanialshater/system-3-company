import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0409", "title": "A negative implied stub", "op": "trade", "labels": ["Before", "SwitchFee", "After"], "outputs": ["Gain"], "a": [100.0, 0.0, 80.0], "b": [100.0, 0.0, 120.0], "question": "Keeping a toy option yields 100. Switching yields 80 and costs 0. What is the gain from switching?", "questionTemplate": "Keeping a toy option yields {Before}. Switching yields {After} and costs {SwitchFee}. What is the gain from switching?", "explain": "Make the opportunity cost visible before judging a refusal to switch. Equal-risk labels can obscure a straightforward payoff difference.", "lens": "the residual value after subtracting a separately priced stake", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
