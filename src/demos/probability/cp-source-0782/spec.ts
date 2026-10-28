import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0782", "title": "Mix signal with a noise coordinate", "op": "forwardnoise", "labels": ["Data", "Noise", "Alpha"], "outputs": ["Noisy"], "a": [2.0, -1.0, 0.9], "b": [2.0, -1.0, 0.1], "question": "For toy Data 2, realized standard-normal Noise -1, and Alpha 0.9, what is sqrt(Alpha)Data+sqrt(1-Alpha)Noise?", "questionTemplate": "For toy Data {Data}, realized standard-normal Noise {Noise}, and Alpha {Alpha}, what is sqrt(Alpha)Data+sqrt(1-Alpha)Noise?", "explain": "This forward noising coordinate reduces signal weight as alpha falls. It is not a trained image diffusion model.", "lens": "the signal-to-noise weight of the forward process", "kind": "curve", "answerPosition": 2, "plot": [2, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
