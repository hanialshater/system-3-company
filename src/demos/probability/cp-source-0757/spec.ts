import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0757", "title": "Measure a loss below a prior peak", "op": "layer", "labels": ["Loss", "Attachment", "Limit"], "outputs": ["Payout"], "a": [10.0, 0.0, 100.0], "b": [30.0, 0.0, 100.0], "question": "A toy loss is 10. A layer attaches at 0 and pays at most Limit 100. What payout results?", "questionTemplate": "A toy loss is {Loss}. A layer attaches at {Attachment} and pays at most Limit {Limit}. What payout results?", "explain": "Layering separates which part of a loss is covered. Pricing requires the loss distribution and other contract assumptions.", "lens": "the depth of a stipulated decline rather than a drawdown law", "kind": "curve", "answerPosition": 1, "plot": [0, 0, 200]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
