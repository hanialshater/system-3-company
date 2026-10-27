import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0232", "title": "Above which average?", "op": "abovemean", "labels": ["Others", "Value", "Outlier"], "outputs": ["Above", "Mean"], "a": [99.0, 10.0, 0.0], "b": [99.0, 0.0, 10.0], "question": "A toy group has 99 people scoring 10 each and one scoring 0. How many are strictly above the group mean?", "explain": "A mean is not a median. Many people can be above a mean when a low outlier pulls it down; the median ceiling cannot simply be substituted.", "lens": "the distinction between a mean and a median", "kind": "grid", "answerPosition": 1, "questionTemplate": "A toy group has {Others} people scoring {Value} each and one scoring {Outlier}. How many are strictly above the group mean?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
