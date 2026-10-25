import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0608", "title": "Keep the noise outside the parameters", "op": "reparam", "labels": ["Mean", "SD", "Epsilon"], "outputs": ["Sample", "GradMean", "GradSD"], "a": [0.0, 1.0, 0.5], "b": [2.0, 1.0, 0.5], "question": "A toy normal sample is Mean 0+SD 1×fixed noise Epsilon 0.5. What sample results?", "questionTemplate": "A toy normal sample is Mean {Mean}+SD {SD}×fixed noise Epsilon {Epsilon}. What sample results?", "explain": "Holding the noise draw fixed exposes derivatives with respect to mean and scale. The noise distribution still defines the resulting sample distribution.", "lens": "the fixed-noise reparameterized sample and its derivatives", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
