import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0121", "title": "Buying and selling the mug", "op": "ratio", "labels": ["Sell", "Buy"], "outputs": ["Ratio"], "a": [7.12, 2.87], "b": [5.0, 5.0], "question": "A toy seller asks 7.12; a buyer offers 2.87 for the same item. What is the sell-to-buy ratio?", "explain": "The ratio describes a valuation gap. It does not identify whether ownership, procedures or information caused it.", "lens": "the size of a valuation gap", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy seller asks {Sell}; a buyer offers {Buy} for the same item. What is the sell-to-buy ratio?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
