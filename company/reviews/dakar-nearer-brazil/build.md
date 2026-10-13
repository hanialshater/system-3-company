# Build notes: dakar-nearer-brazil

## v1 (2026-10-13, wave 3)
- Azimuthal equidistant WorldMap centred on Dakar, clipped at 52° (about 5,780 km). A geoCircle ring is drawn with the slider's radius. Cities light up inside the ring and show their geoDistance x R.
- Re-computed in node: Natal 3,003.6 km, Rome 4,170.3, Paris 4,205.1. The question says "Of these three cities", because Lisbon (2,791 km) is nearer than all three (brief claim 4). Iberia visibly falls inside the 3,500 km ring, but no Lisbon marker is drawn.
- Key state (milestone "natal-only"): the ring holds Natal but not Paris or Rome. The ring starts at 2,500 km with a 500 km step, so QA's two presses reach 3,500 km.
- The reveal quotes the Paris and Rome distances only if the learner's widest ring reached past both. Otherwise it says "beyond your widest ring, N km". The QA path never sees those distances, so the reveal does not name them there.
- Locked: the ring, the city distances and the readout are hidden.
- I cut two unsupported reveal sentences while building: "the Atlantic's narrowest part" and "flat maps with Europe on top make West Africa look close to Europe".
