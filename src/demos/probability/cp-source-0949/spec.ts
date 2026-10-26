import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0949", "title": "A long cycle has a low frequency", "op": "tone", "labels": ["Frequency", "Time", "Amplitude"], "outputs": ["Signal"], "a": [0.09, 0.1, 1.0], "b": [0.18, 0.1, 1.0], "question": "A toy sine tone has Frequency 0.09, Amplitude 1. What sample value occurs at Time 0.1?", "questionTemplate": "A toy sine tone has Frequency {Frequency}, Amplitude {Amplitude}. What sample value occurs at Time {Time}?", "explain": "A pure sinusoid has a specified frequency and phase. This finite waveform does not record or analyze a microphone.", "lens": "a stipulated cycle frequency without a sunspot-data fit", "kind": "curve", "answerPosition": 1, "plot": [1, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
