import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0234", "title": "Three pairs of die faces", "op": "chi3", "labels": ["A", "B", "C"], "outputs": ["Statistic"], "a": [20.0, 20.0, 20.0], "b": [30.0, 20.0, 10.0], "question": "Three toy category counts are 20,20,20. Under equal expected shares, what is the Pearson chi-square statistic?", "questionTemplate": "Three toy category counts are {A},{B},{C}. Under equal expected shares, what is the Pearson chi-square statistic?", "explain": "Compare observed counts with expected counts using the same total. A statistic alone is not a p-value without a reference distribution and assumptions.", "lens": "the Pearson statistic for three grouped categories", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
