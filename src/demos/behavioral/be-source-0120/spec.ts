import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0120", "title": "The bottle bought long ago", "op": "sunk", "labels": ["FutureBenefit", "FutureCost", "PastCost"], "outputs": ["Net"], "a": [30.0, 0.0, 20.0], "b": [30.0, 0.0, 40.0], "question": "A toy decision has future benefit 30, future cost 0, and an unrecoverable past cost 20. What is the future net benefit?", "explain": "The sunk payment is absent from the future comparison because either choice leaves it paid. A past bill cannot change the remaining payoff.", "lens": "the historical cost versus the remaining use decision", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy decision has future benefit {FutureBenefit}, future cost {FutureCost}, and an unrecoverable past cost {PastCost}. What is the future net benefit?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
