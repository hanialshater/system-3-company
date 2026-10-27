import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0805", "title": "Score one probability forecast", "op": "brier", "labels": ["Y", "P"], "outputs": ["Loss"], "a": [1.0, 0.5], "b": [1.0, 0.9], "question": "Binary toy outcome Y 1 was forecast with P 0.5. What squared probability error results?", "questionTemplate": "Binary toy outcome Y {Y} was forecast with P {P}. What squared probability error results?", "explain": "A Brier score evaluates a probability against an outcome. Repeated forecasts are needed to assess calibration.", "lens": "the squared probability error on one outcome", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
