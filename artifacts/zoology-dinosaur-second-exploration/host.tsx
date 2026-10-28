import React from "react";
import D0 from "../../src/demos/life/zoo-dino-ankylosaur-club/Demo";
import D1 from "../../src/demos/life/zoo-dino-bone-growth-marks/Demo";
import D2 from "../../src/demos/life/zoo-dino-cluster-caution/Demo";
import D3 from "../../src/demos/life/zoo-dino-dental-battery/Demo";
import D4 from "../../src/demos/life/zoo-dino-different-periods/Demo";
import D5 from "../../src/demos/life/zoo-dino-embryo-egg/Demo";
import D6 from "../../src/demos/life/zoo-dino-feather-evidence/Demo";
import D7 from "../../src/demos/life/zoo-dino-frill-hypotheses/Demo";
import D8 from "../../src/demos/life/zoo-dino-juvenile-adult/Demo";
import D9 from "../../src/demos/life/zoo-dino-neck-joints/Demo";
import D10 from "../../src/demos/life/zoo-dino-tooth-shape/Demo";
import D11 from "../../src/demos/life/zoo-dino-unknown-color/Demo";
import D12 from "../../src/demos/life/zoo-dino-wishbone/Demo";
const items:Record<string,React.ComponentType<{slug:string}>>={"zoo-dino-ankylosaur-club":D0,"zoo-dino-bone-growth-marks":D1,"zoo-dino-cluster-caution":D2,"zoo-dino-dental-battery":D3,"zoo-dino-different-periods":D4,"zoo-dino-embryo-egg":D5,"zoo-dino-feather-evidence":D6,"zoo-dino-frill-hypotheses":D7,"zoo-dino-juvenile-adult":D8,"zoo-dino-neck-joints":D9,"zoo-dino-tooth-shape":D10,"zoo-dino-unknown-color":D11,"zoo-dino-wishbone":D12};
export function DemoHost({slug}:{slug:string}){const C=items[slug];return C?<C slug={slug}/>:<p>Missing lesson</p>}
