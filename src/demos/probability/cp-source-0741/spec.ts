import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0741", "title": "A maximum moves toward the boundary", "op": "maxuniform", "labels": ["X", "N"], "outputs": ["CDF", "Mean"], "a": [0.9, 2.0], "b": [0.9, 20.0], "question": "For 2 independent Uniform(0,1) draws, what is probability their maximum is at most X 0.9?", "questionTemplate": "For {N} independent Uniform(0,1) draws, what is probability their maximum is at most X {X}?", "explain": "All draws must fall below the threshold. The bounded maximum approaches its endpoint rather than growing without limit.", "lens": "the number of bounded independent draws", "kind": "curve", "answerPosition": 0, "plot": [0, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
