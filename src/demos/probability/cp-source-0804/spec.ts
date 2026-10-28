import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0804", "title": "Check confidence against outcomes", "op": "calibration", "labels": ["Claimed", "Hits", "Trials"], "outputs": ["Gap"], "a": [0.9, 60.0, 100.0], "b": [0.6, 60.0, 100.0], "question": "A toy forecast claims probability 0.9; 60 of 100 matched it. What is claimed probability minus observed share?", "questionTemplate": "A toy forecast claims probability {Claimed}; {Hits} of {Trials} matched it. What is claimed probability minus observed share?", "explain": "Calibration compares forecasts with repeated outcomes. One correct or incorrect outcome cannot settle a probability claim.", "lens": "the reported confidence at a fixed observed frequency", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
