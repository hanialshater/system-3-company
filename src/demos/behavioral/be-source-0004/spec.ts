import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0004", "title": "Two equal cash gaps", "op": "sqrtgap", "labels": ["Low", "High", "Shift"], "outputs": ["Gap"], "a": [100.0, 200.0, 0.0], "b": [100.0, 200.0, 1000.0], "question": "A toy value curve is square root of the amount. Compare amounts 100+0 and 200+0. What is the value gap?", "explain": "The square-root curve bends. Equal cash gaps have smaller value gaps farther from zero. This is the stated curve, not a universal preference.", "lens": "diminishing sensitivity in a curved scale", "kind": "curve", "answerPosition": 1, "questionTemplate": "A toy value curve is square root of the amount. Compare amounts {Low}+{Shift} and {High}+{Shift}. What is the value gap?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
