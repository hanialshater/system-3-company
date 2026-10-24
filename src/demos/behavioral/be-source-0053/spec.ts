import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0053", "title": "A stream or a lump sum", "op": "annuity", "labels": ["Payment", "Periods", "Rate"], "outputs": ["Present"], "a": [100.0, 10.0, 0.05], "b": [100.0, 10.0, 0.0], "question": "A toy annuity pays 100 at each period end for 10 periods; discount rate 0.05. What is its present value?", "explain": "A stream of payments and its discounted lump sum are two representations of the same stated cash flow.", "lens": "the discounting of an identical payment stream", "kind": "timeline", "answerPosition": 2, "questionTemplate": "A toy annuity pays {Payment} at each period end for {Periods} periods; discount rate {Rate}. What is its present value?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
