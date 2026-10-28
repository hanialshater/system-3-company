import React from "react";
import D0 from "../../src/demos/life/zoo-invert-bivalve-filter-feeding/Demo";
import D1 from "../../src/demos/life/zoo-invert-coral-partner-exchange/Demo";
import D2 from "../../src/demos/life/zoo-invert-horseshoe-crab-ancestry/Demo";
import D3 from "../../src/demos/life/zoo-invert-jellyfish-bell-pulse/Demo";
import D4 from "../../src/demos/life/zoo-invert-jellyfish-polyp-medusa/Demo";
import D5 from "../../src/demos/life/zoo-invert-mussel-threads/Demo";
import D6 from "../../src/demos/life/zoo-invert-nautilus-chambers/Demo";
import D7 from "../../src/demos/life/zoo-invert-octopus-jet/Demo";
import D8 from "../../src/demos/life/zoo-invert-octopus-sucker/Demo";
import D9 from "../../src/demos/life/zoo-invert-planarian-eyespots/Demo";
import D10 from "../../src/demos/life/zoo-invert-sea-squirt-larva-adult/Demo";
import D11 from "../../src/demos/life/zoo-invert-sea-star-tube-feet/Demo";
import D12 from "../../src/demos/life/zoo-invert-snail-radula/Demo";
import D13 from "../../src/demos/life/zoo-invert-sponge-water-filter/Demo";
const items:Record<string,React.ComponentType<{slug:string}>>={"zoo-invert-bivalve-filter-feeding":D0,"zoo-invert-coral-partner-exchange":D1,"zoo-invert-horseshoe-crab-ancestry":D2,"zoo-invert-jellyfish-bell-pulse":D3,"zoo-invert-jellyfish-polyp-medusa":D4,"zoo-invert-mussel-threads":D5,"zoo-invert-nautilus-chambers":D6,"zoo-invert-octopus-jet":D7,"zoo-invert-octopus-sucker":D8,"zoo-invert-planarian-eyespots":D9,"zoo-invert-sea-squirt-larva-adult":D10,"zoo-invert-sea-star-tube-feet":D11,"zoo-invert-snail-radula":D12,"zoo-invert-sponge-water-filter":D13};
export function DemoHost({slug}:{slug:string}){const C=items[slug];return C?<C slug={slug}/>:<p>Missing lesson</p>}
