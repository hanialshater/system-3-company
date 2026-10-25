import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0450", "title": "A switchback still has carryover", "op": "lagged", "labels": ["Direct", "Carry", "PreviousGap"], "outputs": ["ObservedGap"], "a": [2.0, 1.0, 0.5], "b": [2.0, 1.0, 0.0], "question": "A toy current outcome gap combines Direct 2 and carryover coefficient 1 times previous-exposure gap 0.5. What gap is observed?", "questionTemplate": "A toy current outcome gap combines Direct {Direct} and carryover coefficient {Carry} times previous-exposure gap {PreviousGap}. What gap is observed?", "explain": "A lag can contaminate a current-period contrast. Timing and washout assumptions matter before calling the observed gap a direct effect.", "lens": "the prior-slot exposure left in a current-period contrast", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
