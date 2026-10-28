import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0964", "title": "A shorter ruler measures more length", "op": "coast", "labels": ["Ruler", "Dimension", "Base"], "outputs": ["Length"], "a": [1.0, 1.3, 10.0], "b": [0.1, 1.3, 10.0], "question": "A stipulated fractal measurement rule gives Length=Base 10×Ruler 1^(1-Dimension 1.3). What measured length results?", "questionTemplate": "A stipulated fractal measurement rule gives Length=Base {Base}×Ruler {Ruler}^(1-Dimension {Dimension}). What measured length results?", "explain": "A finer ruler raises measured length when dimension exceeds one. Real coastlines have finite scales where this idealization stops.", "lens": "the idealized fractal measurement scale", "kind": "curve", "answerPosition": 1, "plot": [0, 0.01, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
