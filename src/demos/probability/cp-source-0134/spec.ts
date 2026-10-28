import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0134", "title": "Correlations limit diversification", "op": "portfoliosd", "labels": ["Weight", "SD1", "SD2", "Correlation"], "outputs": ["SD"], "a": [0.5, 0.2, 0.2, 0.0], "b": [0.5, 0.2, 0.2, 1.0], "question": "A toy portfolio puts weight 0.5 in an asset with SD 0.2, the rest in one with SD 0.2; correlation 0. What is portfolio SD?", "questionTemplate": "A toy portfolio puts weight {Weight} in an asset with SD {SD1}, the rest in one with SD {SD2}; correlation {Correlation}. What is portfolio SD?", "explain": "Covariance contributes to portfolio risk. Equal component risks do not imply equal portfolio risks when correlations or weights differ.", "lens": "covariance between asset returns", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
