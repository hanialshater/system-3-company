import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0920", "title": "Judge confidence meets experiment wins", "op": "calibration", "labels": ["Claimed", "Hits", "Trials"], "outputs": ["Gap"], "a": [0.8, 8.0, 10.0], "b": [0.8, 5.0, 10.0], "question": "A toy forecast claims probability 0.8; 8 of 10 matched it. What is claimed probability minus observed share?", "questionTemplate": "A toy forecast claims probability {Claimed}; {Hits} of {Trials} matched it. What is claimed probability minus observed share?", "explain": "Calibration compares forecasts with repeated outcomes. One correct or incorrect outcome cannot settle a probability claim.", "lens": "a descriptive agreement count rather than a validated LLM judge", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
