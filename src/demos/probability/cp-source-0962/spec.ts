import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0962", "title": "A second octave adds finer variation", "op": "epicycle", "labels": ["Time", "Harmonic", "Amplitude"], "outputs": ["X", "Y"], "a": [0.2, 2.0, 0.0], "b": [0.2, 8.0, 0.3], "question": "At Time 0.2, a unit circle plus Amplitude 0 circle rotating at Harmonic 2 gives what x coordinate?", "questionTemplate": "At Time {Time}, a unit circle plus Amplitude {Amplitude} circle rotating at Harmonic {Harmonic} gives what x coordinate?", "explain": "Adding rotating vectors creates a parametric trace. Two circles illustrate composition rather than reconstructing an arbitrary drawing.", "lens": "the higher-frequency component in a terrain ingredient", "kind": "curve", "answerPosition": 2, "plot": [0, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
