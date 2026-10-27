import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0558", "title": "The boundary between two line seeds", "op": "voronoiline", "labels": ["SeedA", "SeedB"], "outputs": ["Boundary"], "a": [0.0, 10.0], "b": [0.0, 20.0], "question": "Two toy seeds lie at 0,10 on a line with ordinary distance. Where is their equal-distance Voronoi boundary?", "questionTemplate": "Two toy seeds lie at {SeedA},{SeedB} on a line with ordinary distance. Where is their equal-distance Voronoi boundary?", "explain": "The perpendicular-bisector idea reduces to a midpoint on this line. A full plane partition needs all seed locations and a distance metric.", "lens": "the one-dimensional equal-distance Voronoi boundary", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
