import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0677", "title": "A map can shift with the robot", "op": "gauge", "labels": ["Robot", "Landmark", "Shift"], "outputs": ["Range", "RobotShift", "LandmarkShift"], "a": [2.0, 8.0, 0.0], "b": [2.0, 8.0, 100.0], "question": "A toy robot is at 2, landmark at 8. Shift both by 0. What landmark-minus-robot displacement remains?", "questionTemplate": "A toy robot is at {Robot}, landmark at {Landmark}. Shift both by {Shift}. What landmark-minus-robot displacement remains?", "explain": "Relative displacement survives a shared translation. Absolute position requires an anchor; this is one SLAM identifiability ingredient.", "lens": "the translation ambiguity of relative localization", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
