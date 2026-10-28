import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0038", "title": "A seed reproduces the next state", "op": "lcg", "labels": ["Seed", "A", "C", "Modulus"], "outputs": ["Next"], "a": [7.0, 5.0, 3.0, 97.0], "b": [8.0, 5.0, 3.0, 97.0], "question": "A toy generator updates x as (A 5 × x + C 3) modulo 97, starting at Seed 7. What is the next state?", "questionTemplate": "A toy generator updates x as (A {A} × x + C {C}) modulo {Modulus}, starting at Seed {Seed}. What is the next state?", "explain": "A seed and deterministic recurrence reproduce a sequence. Reproducibility is distinct from unpredictability or statistical quality.", "lens": "a deterministic generator recurrence", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
