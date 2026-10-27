import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0131", "title": "Market experience and the gap", "op": "ratio", "labels": ["Sell", "Buy"], "outputs": ["Ratio"], "a": [6.0, 3.0], "b": [4.0, 4.0], "question": "A toy seller asks 6; a buyer offers 3 for the same item. What is the sell-to-buy ratio?", "explain": "The ratio describes a valuation gap. It does not identify whether ownership, procedures or information caused it.", "lens": "a procedural contrast rather than a universal endowment claim", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy seller asks {Sell}; a buyer offers {Buy} for the same item. What is the sell-to-buy ratio?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
