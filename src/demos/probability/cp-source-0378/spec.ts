import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0378", "title": "Deaths versus a modeled baseline", "op": "ite", "labels": ["Without", "With"], "outputs": ["Effect"], "a": [100.0, 130.0], "b": [120.0, 130.0], "question": "In a toy structural model the same unit has outcome 100 without treatment and 130 with treatment. What individual effect is with minus without?", "questionTemplate": "In a toy structural model the same unit has outcome {Without} without treatment and {With} with treatment. What individual effect is with minus without?", "explain": "The two potential outcomes are defined in the model, although only one would be observed for a unit in an ordinary trial.", "lens": "the specified counterfactual baseline in an excess count", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
