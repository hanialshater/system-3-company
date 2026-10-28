import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0950", "title": "Blur suppresses high frequencies", "op": "blurfrequency", "labels": ["Frequency", "Width"], "outputs": ["Gain"], "a": [2.0, 0.1], "b": [2.0, 0.5], "question": "A normalized Gaussian blur has spatial Width 0.1. At Frequency 2, what Fourier amplitude gain results?", "questionTemplate": "A normalized Gaussian blur has spatial Width {Width}. At Frequency {Frequency}, what Fourier amplitude gain results?", "explain": "Convolution by a Gaussian attenuates high frequencies more strongly. This is its continuous transfer function rather than a compressed image codec.", "lens": "the Gaussian transfer function at a chosen spatial frequency", "kind": "curve", "answerPosition": 2, "plot": [0, 0, 5]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
