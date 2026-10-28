import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0039", "title": "A tiny excess over half", "op": "calibration", "labels": ["Claimed", "Hits", "Trials"], "outputs": ["Gap"], "a": [0.5, 508.0, 1000.0], "b": [0.5, 500.0, 1000.0], "question": "A toy forecast claims probability 0.5; 508 of 1000 matched it. What is claimed probability minus observed share?", "questionTemplate": "A toy forecast claims probability {Claimed}; {Hits} of {Trials} matched it. What is claimed probability minus observed share?", "explain": "Calibration compares forecasts with repeated outcomes. One correct or incorrect outcome cannot settle a probability claim.", "lens": "the observed share versus the proposed coin model", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
