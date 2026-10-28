import React from "react";
import D0 from "../../src/demos/life/animal-imitation-evidence/Demo";
import D1 from "../../src/demos/life/animal-observation-versus-motive/Demo";
import D2 from "../../src/demos/life/fish-parrotfish-scrape/Demo";
import D3 from "../../src/demos/life/fish-seahorse-tail-anchor/Demo";
import D4 from "../../src/demos/life/fish-shark-oily-liver/Demo";
import D5 from "../../src/demos/life/zoo-arthropod-ant-trail/Demo";
const items:Record<string,React.ComponentType<{slug:string}>>={"animal-imitation-evidence":D0,"animal-observation-versus-motive":D1,"fish-parrotfish-scrape":D2,"fish-seahorse-tail-anchor":D3,"fish-shark-oily-liver":D4,"zoo-arthropod-ant-trail":D5};
export function DemoHost({slug}:{slug:string}){const C=items[slug];return C?<C slug={slug}/>:<p>Missing lesson</p>}
