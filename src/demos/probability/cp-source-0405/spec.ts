import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0405", "title": "One rare assignment gets a large weight", "op": "ipweight", "labels": ["Propensity", "Treated"], "outputs": ["Weight"], "a": [0.01, 1.0], "b": [0.5, 1.0], "question": "A toy unit has treatment propensity 0.01. Treated 1=1 uses inverse treatment probability; 0 uses inverse control probability. What weight results?", "questionTemplate": "A toy unit has treatment propensity {Propensity}. Treated {Treated}=1 uses inverse treatment probability; 0 uses inverse control probability. What weight results?", "explain": "Rare observed assignments receive large weights. Weighting cannot recover comparisons with no overlap or fix unmeasured confounding by itself.", "lens": "the scale of a positivity-near-boundary weight", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
