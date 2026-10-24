import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0480", "title": "Paying to avoid bad news", "op": "trade", "labels": ["Before", "SwitchFee", "After"], "outputs": ["Gain"], "a": [100.0, 10.0, 100.0], "b": [100.0, 30.0, 100.0], "question": "Keeping a toy option yields 100. Switching yields 100 and costs 10. What is the gain from switching?", "questionTemplate": "Keeping a toy option yields {Before}. Switching yields {After} and costs {SwitchFee}. What is the gain from switching?", "explain": "Make the opportunity cost visible before judging a refusal to switch. Equal-risk labels can obscure a straightforward payoff difference.", "lens": "the cash cost of information avoidance", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
