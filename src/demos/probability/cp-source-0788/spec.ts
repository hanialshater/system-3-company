import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0788", "title": "Interpolate an encoded direction", "op": "twolatent", "labels": ["Angle", "Light"], "outputs": ["X", "Y", "Brightness"], "a": [0.0, 0.5], "b": [1.57, 0.5], "question": "A toy decoder maps Angle 0 to (cos(angle),sin(angle)) and keeps brightness Light 0.5 separately. What x-coordinate results?", "questionTemplate": "A toy decoder maps Angle {Angle} to (cos(angle),sin(angle)) and keeps brightness Light {Light} separately. What x-coordinate results?", "explain": "The decoder explicitly separates two controls by construction. Discovering disentangled factors from unconstrained observations is a different inference problem.", "lens": "the angular coordinate of a constructed latent decoder", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
