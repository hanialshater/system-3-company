import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0572", "title": "A modeled channel-removal contrast", "op": "ite", "labels": ["Without", "With"], "outputs": ["Effect"], "a": [0.1, 0.2], "b": [0.18, 0.2], "question": "In a toy structural model the same unit has outcome 0.1 without treatment and 0.2 with treatment. What individual effect is with minus without?", "questionTemplate": "In a toy structural model the same unit has outcome {Without} without treatment and {With} with treatment. What individual effect is with minus without?", "explain": "The two potential outcomes are defined in the model, although only one would be observed for a unit in an ordinary trial.", "lens": "the specified without-channel counterfactual", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
