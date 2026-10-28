import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0865", "title": "A new population changes average effect", "op": "heteroeffect", "labels": ["Share", "EffectA", "EffectB"], "outputs": ["Average"], "a": [0.5, 5.0, 1.0], "b": [0.9, 5.0, 1.0], "question": "A toy population has share 0.5 with effect 5, the rest with effect 1. What is its average treatment effect?", "questionTemplate": "A toy population has share {Share} with effect {EffectA}, the rest with effect {EffectB}. What is its average treatment effect?", "explain": "Averages can hide opposite effects across groups. Targeting requires an identified effect for the relevant population, not just a large average.", "lens": "the target population mix under transportable group effects", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
