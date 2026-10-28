import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0056", "title": "Seventy percent over repeated days", "op": "calibration", "labels": ["Claimed", "Hits", "Trials"], "outputs": ["Gap"], "a": [0.7, 70.0, 100.0], "b": [0.7, 50.0, 100.0], "question": "A toy forecast claims probability 0.7; 70 of 100 matched it. What is claimed probability minus observed share?", "questionTemplate": "A toy forecast claims probability {Claimed}; {Hits} of {Trials} matched it. What is claimed probability minus observed share?", "explain": "Calibration compares forecasts with repeated outcomes. One correct or incorrect outcome cannot settle a probability claim.", "lens": "forecast calibration over repeated outcomes", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
