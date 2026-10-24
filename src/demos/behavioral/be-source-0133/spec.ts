import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0133", "title": "Swap the lottery ticket?", "op": "trade", "labels": ["Before", "SwitchFee", "After"], "outputs": ["Gain"], "a": [10.0, 0.0, 11.0], "b": [10.0, 0.0, 10.0], "question": "Keeping a toy option yields 10. Switching yields 11 and costs 0. What is the gain from switching?", "explain": "Make the opportunity cost visible before judging a refusal to switch. Equal-risk labels can obscure a straightforward payoff difference.", "lens": "the payoff difference between equal-risk labels", "kind": "bars", "answerPosition": 1, "questionTemplate": "Keeping a toy option yields {Before}. Switching yields {After} and costs {SwitchFee}. What is the gain from switching?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
