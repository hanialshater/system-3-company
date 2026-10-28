import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0224", "title": "An interval that claims eighty", "op": "calibration", "labels": ["Claimed", "Hits", "Trials"], "outputs": ["Gap"], "a": [0.8, 36.0, 100.0], "b": [0.8, 80.0, 100.0], "question": "A toy forecast claims probability 0.8; 36 of 100 matched it. What is claimed probability minus observed share?", "explain": "Calibration compares forecasts with repeated outcomes. One correct or incorrect outcome cannot settle a probability claim.", "lens": "the gap between claimed and observed coverage", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy forecast claims probability {Claimed}; {Hits} of {Trials} matched it. What is claimed probability minus observed share?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
