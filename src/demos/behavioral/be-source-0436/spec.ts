import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0436", "title": "A persistent unemployment shock", "op": "adapt", "labels": ["Baseline", "Shock", "Decay", "Time"], "outputs": ["Level"], "a": [5.0, -2.0, 0.01, 12.0], "b": [5.0, -2.0, 0.3, 12.0], "question": "Toy level is baseline 5 plus shock -2 times exp(-Decay 0.01 × Time 12). What level results?", "questionTemplate": "Toy level is baseline {Baseline} plus shock {Shock} times exp(-Decay {Decay} × Time {Time}). What level results?", "explain": "An assumed fading shock produces adaptation toward the baseline. Real wellbeing need not follow this curve or recover fully.", "lens": "the persistence assumption rather than automatic full recovery", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
