import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0424", "title": "A shock fades toward baseline", "op": "adapt", "labels": ["Baseline", "Shock", "Decay", "Time"], "outputs": ["Level"], "a": [5.0, 3.0, 0.2, 1.0], "b": [5.0, 3.0, 0.2, 12.0], "question": "Toy level is baseline 5 plus shock 3 times exp(-Decay 0.2 × Time 1). What level results?", "questionTemplate": "Toy level is baseline {Baseline} plus shock {Shock} times exp(-Decay {Decay} × Time {Time}). What level results?", "explain": "An assumed fading shock produces adaptation toward the baseline. Real wellbeing need not follow this curve or recover fully.", "lens": "the assumed persistence of a wellbeing shock", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
