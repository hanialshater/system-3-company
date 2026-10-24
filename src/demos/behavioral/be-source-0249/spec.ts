import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0249", "title": "A streak in a small sample", "op": "calibration", "labels": ["Claimed", "Hits", "Trials"], "outputs": ["Gap"], "a": [0.5, 4.0, 10.0], "b": [0.5, 5.0, 10.0], "question": "A toy forecast claims probability 0.5; 4 of 10 matched it. What is claimed probability minus observed share?", "explain": "Calibration compares forecasts with repeated outcomes. One correct or incorrect outcome cannot settle a probability claim.", "lens": "the sampling protocol before a claim about a hot hand", "kind": "grid", "answerPosition": 0, "questionTemplate": "A toy forecast claims probability {Claimed}; {Hits} of {Trials} matched it. What is claimed probability minus observed share?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
