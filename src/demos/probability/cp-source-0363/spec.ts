import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0363", "title": "Fill the missing potential outcome", "op": "ite", "labels": ["Without", "With"], "outputs": ["Effect"], "a": [5.0, 9.0], "b": [5.0, 4.0], "question": "In a toy structural model the same unit has outcome 5 without treatment and 9 with treatment. What individual effect is with minus without?", "questionTemplate": "In a toy structural model the same unit has outcome {Without} without treatment and {With} with treatment. What individual effect is with minus without?", "explain": "The two potential outcomes are defined in the model, although only one would be observed for a unit in an ordinary trial.", "lens": "the individual effect in a fully specified toy table", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
