import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0614", "title": "Average weights before taking a log", "op": "logmeanweight", "labels": ["A", "B", "C"], "outputs": ["LogMean"], "a": [-2.0, -4.0, -6.0], "b": [-2.0, -2.0, -2.0], "question": "Three toy log importance weights are -2,-4,-6. What is log of the mean of their exponentials?", "questionTemplate": "Three toy log importance weights are {A},{B},{C}. What is log of the mean of their exponentials?", "explain": "The log-mean-exp statistic differs from the mean log weight. Statements about tightening in expectation do not imply monotonic improvement for every realized sample.", "lens": "the realized log-mean-exp statistic in an importance bound", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
