import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0239", "title": "Tomorrow's productivity forecast", "op": "calibration", "labels": ["Claimed", "Hits", "Trials"], "outputs": ["Gap"], "a": [0.9, 6.0, 10.0], "b": [0.6, 6.0, 10.0], "question": "A toy forecast claims probability 0.9; 6 of 10 matched it. What is claimed probability minus observed share?", "explain": "Calibration compares forecasts with repeated outcomes. One correct or incorrect outcome cannot settle a probability claim.", "lens": "the calibration of repeated performance forecasts", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy forecast claims probability {Claimed}; {Hits} of {Trials} matched it. What is claimed probability minus observed share?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
