import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0951", "title": "Removing detail attenuates coefficients", "op": "blurfrequency", "labels": ["Frequency", "Width"], "outputs": ["Gain"], "a": [3.0, 0.1], "b": [3.0, 0.3], "question": "A normalized Gaussian blur has spatial Width 0.1. At Frequency 3, what Fourier amplitude gain results?", "questionTemplate": "A normalized Gaussian blur has spatial Width {Width}. At Frequency {Frequency}, what Fourier amplitude gain results?", "explain": "Convolution by a Gaussian attenuates high frequencies more strongly. This is its continuous transfer function rather than a compressed image codec.", "lens": "a frequency attenuation ingredient rather than a JPEG implementation", "kind": "curve", "answerPosition": 0, "plot": [0, 0, 5]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
