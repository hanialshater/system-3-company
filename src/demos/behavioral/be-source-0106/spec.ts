import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0106", "title": "A prepaid season ticket", "op": "sunk", "labels": ["FutureBenefit", "FutureCost", "PastCost"], "outputs": ["Net"], "a": [20.0, 5.0, 100.0], "b": [20.0, 5.0, 20.0], "question": "A toy decision has future benefit 20, future cost 5, and an unrecoverable past cost 100. What is the future net benefit?", "explain": "The sunk payment is absent from the future comparison because either choice leaves it paid. A past bill cannot change the remaining payoff.", "lens": "the unrecoverable past payment", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy decision has future benefit {FutureBenefit}, future cost {FutureCost}, and an unrecoverable past cost {PastCost}. What is the future net benefit?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
