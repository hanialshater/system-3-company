import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0140", "title": "Who holds the lottery ticket?", "op": "ratio", "labels": ["Sell", "Buy"], "outputs": ["Ratio"], "a": [15.0, 5.0], "b": [10.0, 10.0], "question": "A toy seller asks 15; a buyer offers 5 for the same item. What is the sell-to-buy ratio?", "explain": "The ratio describes a valuation gap. It does not identify whether ownership, procedures or information caused it.", "lens": "the selling and buying roles for the same object", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy seller asks {Sell}; a buyer offers {Buy} for the same item. What is the sell-to-buy ratio?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
