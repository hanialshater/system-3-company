import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0727", "title": "A hazard ratio bends survival", "op": "ph", "labels": ["S0", "HR"], "outputs": ["Survival"], "a": [0.8, 1.0], "b": [0.8, 2.0], "question": "Baseline survival is S0 0.8. A stipulated proportional hazard ratio is HR 1. What comparison survival S0^HR results?", "questionTemplate": "Baseline survival is S0 {S0}. A stipulated proportional hazard ratio is HR {HR}. What comparison survival S0^HR results?", "explain": "A hazard ratio acts on cumulative hazard rather than subtracting a fixed survival probability. Proportionality is an assumption.", "lens": "the proportional-hazard transformation of baseline survival", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
