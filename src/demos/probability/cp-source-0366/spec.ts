import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0366", "title": "A structural survival counterfactual", "op": "ite", "labels": ["Without", "With"], "outputs": ["Effect"], "a": [0.0, 1.0], "b": [1.0, 1.0], "question": "In a toy structural model the same unit has outcome 0 without treatment and 1 with treatment. What individual effect is with minus without?", "questionTemplate": "In a toy structural model the same unit has outcome {Without} without treatment and {With} with treatment. What individual effect is with minus without?", "explain": "The two potential outcomes are defined in the model, although only one would be observed for a unit in an ordinary trial.", "lens": "the stipulated missing outcome rather than an identified individual claim", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
