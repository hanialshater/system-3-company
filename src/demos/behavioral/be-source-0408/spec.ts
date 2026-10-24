import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0408", "title": "Two claims on one cash flow", "op": "ratio", "labels": ["Sell", "Buy"], "outputs": ["Ratio"], "a": [60.0, 40.0], "b": [90.0, 40.0], "question": "A toy seller asks 60; a buyer offers 40 for the same item. What is the sell-to-buy ratio?", "questionTemplate": "A toy seller asks {Sell}; a buyer offers {Buy} for the same item. What is the sell-to-buy ratio?", "explain": "The ratio describes a valuation gap. It does not identify whether ownership, procedures or information caused it.", "lens": "the observed price ratio versus a fixed claim ratio", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
