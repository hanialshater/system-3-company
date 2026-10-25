import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0758", "title": "A catastrophe payout has layers", "op": "layer", "labels": ["Loss", "Attachment", "Limit"], "outputs": ["Payout"], "a": [100.0, 50.0, 40.0], "b": [100.0, 80.0, 40.0], "question": "A toy loss is 100. A layer attaches at 50 and pays at most Limit 40. What payout results?", "questionTemplate": "A toy loss is {Loss}. A layer attaches at {Attachment} and pays at most Limit {Limit}. What payout results?", "explain": "Layering separates which part of a loss is covered. Pricing requires the loss distribution and other contract assumptions.", "lens": "the attachment point of a bounded insurance layer", "kind": "curve", "answerPosition": 2, "plot": [0, 0, 200]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
