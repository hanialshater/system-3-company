import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0177", "title": "Count coprime pairs before the limit", "op": "coprime", "labels": ["Maximum"], "outputs": ["Fraction"], "a": [100.0], "b": [200.0], "question": "Choose two independent integers uniformly from 1 through 100. What exact fraction of ordered pairs is coprime?", "questionTemplate": "Choose two independent integers uniformly from 1 through {Maximum}. What exact fraction of ordered pairs is coprime?", "explain": "Finite enumeration gives a finite-range fraction. The limiting six-over-pi-squared result is a separate asymptotic statement.", "lens": "the finite integer sampling range", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
