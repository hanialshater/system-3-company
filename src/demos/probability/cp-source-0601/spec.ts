import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0601", "title": "The evidence bound leaves a KL gap", "op": "elbo", "labels": ["LogEvidence", "KL"], "outputs": ["ELBO", "Gap"], "a": [-5.0, 2.0], "b": [-5.0, 0.1], "question": "A toy model has log evidence -5 and KL gap 2. From ELBO=log evidence-KL, what bound value results?", "questionTemplate": "A toy model has log evidence {LogEvidence} and KL gap {KL}. From ELBO=log evidence-KL, what bound value results?", "explain": "The identity relates approximation quality and the evidence bound. A high numerical objective alone does not guarantee the approximation captures every posterior feature.", "lens": "the defining evidence-bound identity", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
