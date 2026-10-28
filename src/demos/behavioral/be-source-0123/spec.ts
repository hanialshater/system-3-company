import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0123", "title": "A ratio across valuations", "op": "ratio", "labels": ["Sell", "Buy"], "outputs": ["Ratio"], "a": [26.0, 10.0], "b": [52.0, 10.0], "question": "A toy seller asks 26; a buyer offers 10 for the same item. What is the sell-to-buy ratio?", "explain": "The ratio describes a valuation gap. It does not identify whether ownership, procedures or information caused it.", "lens": "the unit behind a sell-to-buy ratio", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy seller asks {Sell}; a buyer offers {Buy} for the same item. What is the sell-to-buy ratio?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
