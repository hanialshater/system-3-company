import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0488", "title": "A stipulated small-class effect", "op": "ite", "labels": ["Without", "With"], "outputs": ["Effect"], "a": [50.0, 55.0], "b": [50.0, 52.0], "question": "In a toy structural model the same unit has outcome 50 without treatment and 55 with treatment. What individual effect is with minus without?", "questionTemplate": "In a toy structural model the same unit has outcome {Without} without treatment and {With} with treatment. What individual effect is with minus without?", "explain": "The two potential outcomes are defined in the model, although only one would be observed for a unit in an ordinary trial.", "lens": "the difference between two modeled educational outcomes", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
