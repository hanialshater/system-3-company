import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0228", "title": "A founder's success forecast", "op": "calibration", "labels": ["Claimed", "Hits", "Trials"], "outputs": ["Gap"], "a": [0.7, 3.0, 10.0], "b": [1.0, 3.0, 10.0], "question": "A toy forecast claims probability 0.7; 3 of 10 matched it. What is claimed probability minus observed share?", "explain": "Calibration compares forecasts with repeated outcomes. One correct or incorrect outcome cannot settle a probability claim.", "lens": "the distance between a claim and a toy outcome frequency", "kind": "grid", "answerPosition": 0, "questionTemplate": "A toy forecast claims probability {Claimed}; {Hits} of {Trials} matched it. What is claimed probability minus observed share?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
