import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0960", "title": "A low-pass filter removes detail", "op": "blurfrequency", "labels": ["Frequency", "Width"], "outputs": ["Gain"], "a": [3.0, 0.05], "b": [3.0, 0.3], "question": "A normalized Gaussian blur has spatial Width 0.05. At Frequency 3, what Fourier amplitude gain results?", "questionTemplate": "A normalized Gaussian blur has spatial Width {Width}. At Frequency {Frequency}, what Fourier amplitude gain results?", "explain": "Convolution by a Gaussian attenuates high frequencies more strongly. This is its continuous transfer function rather than a compressed image codec.", "lens": "the attenuation of high-frequency signal and noise together", "kind": "curve", "answerPosition": 0, "plot": [0, 0, 5]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
