import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0125", "title": "Does the procedure change it?", "op": "ratio", "labels": ["Sell", "Buy"], "outputs": ["Ratio"], "a": [7.0, 3.0], "b": [5.0, 5.0], "question": "A toy seller asks 7; a buyer offers 3 for the same item. What is the sell-to-buy ratio?", "explain": "The ratio describes a valuation gap. It does not identify whether ownership, procedures or information caused it.", "lens": "the sensitivity of a valuation gap to procedures", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy seller asks {Sell}; a buyer offers {Buy} for the same item. What is the sell-to-buy ratio?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
