import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0429", "title": "Two assumed adaptation rates", "op": "adapt", "labels": ["Baseline", "Shock", "Decay", "Time"], "outputs": ["Level"], "a": [5.0, 3.0, 0.1, 10.0], "b": [5.0, 3.0, 0.5, 10.0], "question": "Toy level is baseline 5 plus shock 3 times exp(-Decay 0.1 × Time 10). What level results?", "questionTemplate": "Toy level is baseline {Baseline} plus shock {Shock} times exp(-Decay {Decay} × Time {Time}). What level results?", "explain": "An assumed fading shock produces adaptation toward the baseline. Real wellbeing need not follow this curve or recover fully.", "lens": "the persistence parameter in a toy experience model", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
