import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0866", "title": "Transport needs a target composition", "op": "heteroeffect", "labels": ["Share", "EffectA", "EffectB"], "outputs": ["Average"], "a": [0.2, 4.0, 0.0], "b": [0.8, 4.0, 0.0], "question": "A toy population has share 0.2 with effect 4, the rest with effect 0. What is its average treatment effect?", "questionTemplate": "A toy population has share {Share} with effect {EffectA}, the rest with effect {EffectB}. What is its average treatment effect?", "explain": "Averages can hide opposite effects across groups. Targeting requires an identified effect for the relevant population, not just a large average.", "lens": "the population shift under an explicit effect-invariance assumption", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
