import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0781", "title": "A Gaussian coordinate is denoised", "op": "denoise", "labels": ["Noisy", "Alpha"], "outputs": ["Mean", "Variance"], "a": [2.0, 0.2], "b": [2.0, 0.8], "question": "With a standard-normal prior and toy noised observation 2=sqrt(Alpha 0.2)X+sqrt(1-Alpha)ε, what posterior mean of X results?", "questionTemplate": "With a standard-normal prior and toy noised observation {Noisy}=sqrt(Alpha {Alpha})X+sqrt(1-Alpha)ε, what posterior mean of X results?", "explain": "Gaussian conditioning gives a denoised mean and remaining variance. A posterior mean is not a generated image or a reverse-sampling trajectory.", "lens": "the retained signal strength in one conditional estimate", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
