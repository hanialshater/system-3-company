import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0959", "title": "A fingerprint begins with frequencies", "op": "tone", "labels": ["Frequency", "Time", "Amplitude"], "outputs": ["Signal"], "a": [2.0, 0.1, 1.0], "b": [4.0, 0.1, 1.0], "question": "A toy sine tone has Frequency 2, Amplitude 1. What sample value occurs at Time 0.1?", "questionTemplate": "A toy sine tone has Frequency {Frequency}, Amplitude {Amplitude}. What sample value occurs at Time {Time}?", "explain": "A pure sinusoid has a specified frequency and phase. This finite waveform does not record or analyze a microphone.", "lens": "one component before a spectrogram-peak matching system", "kind": "curve", "answerPosition": 2, "plot": [1, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
