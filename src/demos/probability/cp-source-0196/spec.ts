import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0196", "title": "Count the keystrokes actually saved", "op": "savedkeys", "labels": ["Characters", "Typed"], "outputs": ["Saved"], "a": [100.0, 60.0], "b": [100.0, 90.0], "question": "A toy completed phrase has 100 characters; prediction required typing 60. How many keystrokes were saved, ignoring selection actions?", "questionTemplate": "A toy completed phrase has {Characters} characters; prediction required typing {Typed}. How many keystrokes were saved, ignoring selection actions?", "explain": "A saving metric needs its accounting boundary. Selection effort, errors and time can change the practical value of autocomplete.", "lens": "the metric boundary for an autocomplete saving", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
