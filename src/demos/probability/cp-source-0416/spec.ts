import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0416", "title": "Trimming changes whose average is taken", "op": "heteroeffect", "labels": ["Share", "EffectA", "EffectB"], "outputs": ["Average"], "a": [0.5, 4.0, -2.0], "b": [0.9, 4.0, -2.0], "question": "A toy population has share 0.5 with effect 4, the rest with effect -2. What is its average treatment effect?", "questionTemplate": "A toy population has share {Share} with effect {EffectA}, the rest with effect {EffectB}. What is its average treatment effect?", "explain": "Averages can hide opposite effects across groups. Targeting requires an identified effect for the relevant population, not just a large average.", "lens": "the population mixture after excluding a subgroup", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
