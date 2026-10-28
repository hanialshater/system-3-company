import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0843", "title": "The split changes stolen sales", "op": "displacement", "labels": ["OwnLift", "Stolen"], "outputs": ["MeasuredGap", "NetLift"], "a": [10.0, 8.0], "b": [10.0, 2.0], "question": "A toy seller treatment adds OwnLift 10 to treated sales but takes Stolen 8 from controls. What treated-minus-control gap is measured?", "questionTemplate": "A toy seller treatment adds OwnLift {OwnLift} to treated sales but takes Stolen {Stolen} from controls. What treated-minus-control gap is measured?", "explain": "A control loss can enlarge the experimental contrast without creating the same market-wide gain. Interference changes the estimand.", "lens": "the substitution exposure under two assumed split designs", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
