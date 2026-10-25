import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0361", "title": "Two outcomes for the same toy unit", "op": "ite", "labels": ["Without", "With"], "outputs": ["Effect"], "a": [3.0, 8.0], "b": [3.0, 2.0], "question": "In a toy structural model the same unit has outcome 3 without treatment and 8 with treatment. What individual effect is with minus without?", "questionTemplate": "In a toy structural model the same unit has outcome {Without} without treatment and {With} with treatment. What individual effect is with minus without?", "explain": "The two potential outcomes are defined in the model, although only one would be observed for a unit in an ordinary trial.", "lens": "the contrast between two modeled potential outcomes", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
