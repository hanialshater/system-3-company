import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0728", "title": "An early advantage can reverse", "op": "piecehazard", "labels": ["Rate1", "Time1", "Rate2", "Time2"], "outputs": ["Survival"], "a": [0.1, 1.0, 0.8, 2.0], "b": [0.5, 1.0, 0.1, 2.0], "question": "A toy lifetime has hazard Rate1 0.1 for Time1 1, then Rate2 0.8 for Time2 2. What survival probability results?", "questionTemplate": "A toy lifetime has hazard Rate1 {Rate1} for Time1 {Time1}, then Rate2 {Rate2} for Time2 {Time2}. What survival probability results?", "explain": "Survival is the exponential of negative cumulative hazard. These stipulated rates need not describe a real population.", "lens": "the time-varying hazard pattern behind a crossing comparison", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
