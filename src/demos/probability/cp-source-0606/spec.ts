import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0606", "title": "One invertible step rescales a density", "op": "affineflow", "labels": ["X", "Scale", "Shift"], "outputs": ["Y", "LogDensity"], "a": [1.0, 2.0, 0.0], "b": [1.0, 0.5, 0.0], "question": "Transform a standard-normal toy coordinate X 1 by Y=Shift 0+Scale 2×X, with nonzero scale. What Y results?", "questionTemplate": "Transform a standard-normal toy coordinate X {X} by Y=Shift {Shift}+Scale {Scale}×X, with nonzero scale. What Y results?", "explain": "The density transformation also accounts for the Jacobian. This single affine step illustrates a flow component, not a complete expressive flow model.", "lens": "the Jacobian of a single affine flow component", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
