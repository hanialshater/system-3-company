import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0911", "title": "Incrementality needs a counterfactual", "op": "ite", "labels": ["Without", "With"], "outputs": ["Effect"], "a": [100.0, 110.0], "b": [50.0, 110.0], "question": "In a toy structural model the same unit has outcome 100 without treatment and 110 with treatment. What individual effect is with minus without?", "questionTemplate": "In a toy structural model the same unit has outcome {Without} without treatment and {With} with treatment. What individual effect is with minus without?", "explain": "The two potential outcomes are defined in the model, although only one would be observed for a unit in an ordinary trial.", "lens": "the purchases assumed to occur without recommendations", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
