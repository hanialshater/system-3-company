import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0797", "title": "A schedule changes retained signal", "op": "forwardnoise", "labels": ["Data", "Noise", "Alpha"], "outputs": ["Noisy"], "a": [1.0, 0.5, 0.8], "b": [1.0, 0.5, 0.2], "question": "For toy Data 1, realized standard-normal Noise 0.5, and Alpha 0.8, what is sqrt(Alpha)Data+sqrt(1-Alpha)Noise?", "questionTemplate": "For toy Data {Data}, realized standard-normal Noise {Noise}, and Alpha {Alpha}, what is sqrt(Alpha)Data+sqrt(1-Alpha)Noise?", "explain": "This forward noising coordinate reduces signal weight as alpha falls. It is not a trained image diffusion model.", "lens": "the noising coefficient at a stipulated schedule time", "kind": "curve", "answerPosition": 2, "plot": [2, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
