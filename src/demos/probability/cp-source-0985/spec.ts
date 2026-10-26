import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0985", "title": "Walkers spread into a heat kernel", "op": "heat", "labels": ["X", "Diffusion", "Time"], "outputs": ["Density", "Variance"], "a": [0.0, 1.0, 1.0], "b": [0.0, 1.0, 4.0], "question": "A toy diffusion starts at zero, diffusivity 1, elapsed Time 1. What heat-kernel density occurs at X 0?", "questionTemplate": "A toy diffusion starts at zero, diffusivity {Diffusion}, elapsed Time {Time}. What heat-kernel density occurs at X {X}?", "explain": "The Gaussian kernel spreads with variance 2Dt. It is a continuum distribution, not a claim that one walker follows the mean.", "lens": "the elapsed diffusion time in a continuum limit", "kind": "curve", "answerPosition": 1, "plot": [0, -5, 5]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
