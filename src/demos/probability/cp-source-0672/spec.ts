import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0672", "title": "Separate trend and season", "op": "season", "labels": ["Level", "Trend", "Amplitude", "Time"], "outputs": ["Level"], "a": [10.0, 1.0, 3.0, 0.25], "b": [10.0, 1.0, 0.0, 0.25], "question": "A toy signal is Level 10+Trend 1×Time 0.25+Amplitude 3×sin(2πTime). What signal results?", "questionTemplate": "A toy signal is Level {Level}+Trend {Trend}×Time {Time}+Amplitude {Amplitude}×sin(2πTime). What signal results?", "explain": "An additive decomposition separates the assumed components. This calculation does not estimate them from observations.", "lens": "the seasonal component of a stipulated signal", "kind": "curve", "answerPosition": 0, "plot": [3, 0, 3]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
