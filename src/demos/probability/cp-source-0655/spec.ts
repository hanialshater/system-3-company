import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0655", "title": "Inducing points change a work proxy", "op": "gpwork", "labels": ["N", "M"], "outputs": ["Ratio"], "a": [10000.0, 20.0], "b": [10000.0, 100.0], "question": "Use toy work proxies N³ for a dense GP and N×M² for an approximation with N 10000, M 20. What is the dense-to-approximate work ratio?", "questionTemplate": "Use toy work proxies N³ for a dense GP and N×M² for an approximation with N {N}, M {M}. What is the dense-to-approximate work ratio?", "explain": "Operation-count proxies describe scaling, not measured runtime or approximation accuracy. Inducing-point placement and implementation still matter.", "lens": "the stated dense-versus-approximate operation counts", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
