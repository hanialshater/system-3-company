import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0881", "title": "Aggregate group-time effects explicitly", "op": "heteroeffect", "labels": ["Share", "EffectA", "EffectB"], "outputs": ["Average"], "a": [0.5, 2.0, 8.0], "b": [0.9, 2.0, 8.0], "question": "A toy population has share 0.5 with effect 2, the rest with effect 8. What is its average treatment effect?", "questionTemplate": "A toy population has share {Share} with effect {EffectA}, the rest with effect {EffectB}. What is its average treatment effect?", "explain": "Averages can hide opposite effects across groups. Targeting requires an identified effect for the relevant population, not just a large average.", "lens": "the cohort weights behind a declared causal aggregation", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
