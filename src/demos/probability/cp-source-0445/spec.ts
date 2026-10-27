import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0445", "title": "A delayed effect enters the comparison", "op": "lagged", "labels": ["Direct", "Carry", "PreviousGap"], "outputs": ["ObservedGap"], "a": [0.0, 2.0, 0.5], "b": [0.0, 2.0, 0.0], "question": "A toy current outcome gap combines Direct 0 and carryover coefficient 2 times previous-exposure gap 0.5. What gap is observed?", "questionTemplate": "A toy current outcome gap combines Direct {Direct} and carryover coefficient {Carry} times previous-exposure gap {PreviousGap}. What gap is observed?", "explain": "A lag can contaminate a current-period contrast. Timing and washout assumptions matter before calling the observed gap a direct effect.", "lens": "the alignment of lagged exposure and current outcome", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
