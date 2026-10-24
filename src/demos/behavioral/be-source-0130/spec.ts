import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0130", "title": "A food item and an exchange", "op": "trade", "labels": ["Before", "SwitchFee", "After"], "outputs": ["Gain"], "a": [3.0, 1.0, 5.0], "b": [3.0, 0.0, 5.0], "question": "Keeping a toy option yields 3. Switching yields 5 and costs 1. What is the gain from switching?", "explain": "Make the opportunity cost visible before judging a refusal to switch. Equal-risk labels can obscure a straightforward payoff difference.", "lens": "the explicit exchange cost rather than a species-level claim", "kind": "bars", "answerPosition": 1, "questionTemplate": "Keeping a toy option yields {Before}. Switching yields {After} and costs {SwitchFee}. What is the gain from switching?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
