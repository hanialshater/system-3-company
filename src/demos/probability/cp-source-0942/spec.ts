import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0942", "title": "Odd harmonics sharpen a square wave", "op": "squarewave", "labels": ["Terms", "Time"], "outputs": ["Value"], "a": [1.0, 0.1], "b": [10.0, 0.1], "question": "Use Terms 1 odd harmonics of a unit square wave at Time 0.1. What truncated Fourier-series value results?", "questionTemplate": "Use Terms {Terms} odd harmonics of a unit square wave at Time {Time}. What truncated Fourier-series value results?", "explain": "More odd harmonics sharpen the transition while oscillations remain near the discontinuity. The displayed curve is a finite partial sum.", "lens": "the truncation order of a square-wave Fourier series", "kind": "curve", "answerPosition": 0, "plot": [1, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
