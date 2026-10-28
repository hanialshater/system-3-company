import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0127", "title": "Your current electricity plan", "op": "trade", "labels": ["Before", "SwitchFee", "After"], "outputs": ["Gain"], "a": [100.0, 5.0, 120.0], "b": [120.0, 5.0, 100.0], "question": "Keeping a toy option yields 100. Switching yields 120 and costs 5. What is the gain from switching?", "explain": "Make the opportunity cost visible before judging a refusal to switch. Equal-risk labels can obscure a straightforward payoff difference.", "lens": "the opportunity cost of keeping a current plan", "kind": "bars", "answerPosition": 1, "questionTemplate": "Keeping a toy option yields {Before}. Switching yields {After} and costs {SwitchFee}. What is the gain from switching?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
