import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0180", "title": "A small edge over many bets", "op": "houseedge", "labels": ["Bets", "Edge", "Variance"], "outputs": ["Mean", "SD"], "a": [100.0, 0.01, 1.0], "b": [1000000.0, 0.01, 1.0], "question": "A toy house plays 100 independent bets with mean gain 0.01 and gain variance 1 per bet. What is expected total gain?", "questionTemplate": "A toy house plays {Bets} independent bets with mean gain {Edge} and gain variance {Variance} per bet. What is expected total gain?", "explain": "Mean grows with the number of bets; standard deviation grows with its square root. Positive expected profit does not guarantee profit on a finite run.", "lens": "mean profit versus its finite-run spread", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
