import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0604", "title": "A smaller gap raises the bound", "op": "elbo", "labels": ["LogEvidence", "KL"], "outputs": ["ELBO", "Gap"], "a": [-5.0, 4.0], "b": [-5.0, 0.2], "question": "A toy model has log evidence -5 and KL gap 4. From ELBO=log evidence-KL, what bound value results?", "questionTemplate": "A toy model has log evidence {LogEvidence} and KL gap {KL}. From ELBO=log evidence-KL, what bound value results?", "explain": "The identity relates approximation quality and the evidence bound. A high numerical objective alone does not guarantee the approximation captures every posterior feature.", "lens": "the stipulated approximation gap in an optimization objective", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
