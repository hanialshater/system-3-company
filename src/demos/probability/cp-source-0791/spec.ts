import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0791", "title": "Data noise and parameter uncertainty", "op": "uncertainty", "labels": ["Noise", "ParameterVar", "N"], "outputs": ["Total", "Noise", "Parameter"], "a": [1.0, 4.0, 1.0], "b": [1.0, 4.0, 100.0], "question": "Toy prediction variance is irreducible Noise 1+ParameterVar 4/N 1. What total variance results?", "questionTemplate": "Toy prediction variance is irreducible Noise {Noise}+ParameterVar {ParameterVar}/N {N}. What total variance results?", "explain": "Only the specified parameter component shrinks with more data. The decomposition assumes this particular model.", "lens": "the component that shrinks with sample size", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
