import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0941", "title": "Add two rotating vectors", "op": "epicycle", "labels": ["Time", "Harmonic", "Amplitude"], "outputs": ["X", "Y"], "a": [0.2, 3.0, 0.0], "b": [0.2, 3.0, 0.4], "question": "At Time 0.2, a unit circle plus Amplitude 0 circle rotating at Harmonic 3 gives what x coordinate?", "questionTemplate": "At Time {Time}, a unit circle plus Amplitude {Amplitude} circle rotating at Harmonic {Harmonic} gives what x coordinate?", "explain": "Adding rotating vectors creates a parametric trace. Two circles illustrate composition rather than reconstructing an arbitrary drawing.", "lens": "the higher harmonic in a finite epicycle trace", "kind": "curve", "answerPosition": 2, "plot": [0, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
