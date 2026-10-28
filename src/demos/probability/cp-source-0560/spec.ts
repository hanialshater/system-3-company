import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0560", "title": "Pin both ends of a random path", "op": "bridge", "labels": ["Sigma", "Time", "Horizon"], "outputs": ["Variance"], "a": [1.0, 0.5, 1.0], "b": [1.0, 0.9, 1.0], "question": "A zero-endpoint toy Brownian bridge has diffusion Sigma 1 and Horizon 1. What is its variance at Time 0.5?", "questionTemplate": "A zero-endpoint toy Brownian bridge has diffusion Sigma {Sigma} and Horizon {Horizon}. What is its variance at Time {Time}?", "explain": "Pinning both endpoints removes uncertainty at the ends. The variance profile describes a distribution of paths, not one deterministic trajectory.", "lens": "the Brownian-bridge variance profile", "kind": "curve", "answerPosition": 2, "plot": [1, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
