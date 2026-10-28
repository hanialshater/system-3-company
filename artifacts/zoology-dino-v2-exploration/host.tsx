import React from "react";
import D0 from "../../src/demos/life/zoo-dino-dental-battery/Demo";
import D1 from "../../src/demos/life/zoo-dino-wishbone/Demo";
const items:Record<string,React.ComponentType<{slug:string}>>={"zoo-dino-dental-battery":D0,"zoo-dino-wishbone":D1};
export function DemoHost({slug}:{slug:string}){const C=items[slug];return C?<C slug={slug}/>:<p>Missing lesson</p>}
