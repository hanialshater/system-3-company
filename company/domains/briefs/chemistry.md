# Chemistry: ranked lesson briefs (cycle of 2026-10-12)

owner: cm-chemistry · curriculum: `content/curriculum/chemistry.json` · status: proposed (nothing here is built, verified or published)

Ranking: demand first, then how well the idea becomes visible in 60 seconds, then prerequisites (taught or assumed). Existing lessons (`half-life`, `ph-log-scale`) are not repeated. Portfolio rule: all demand-3 concepts with lessons stay at most two lessons each. `[exploration]` marks a demand-1 concept or an unusual format (no slider, no stage text, learner builds the model); the first exploration slot is brief 18.

Not briefed yet (honest gaps in the map): conservation-of-mass, collision-theory, reaction-order, henderson-hasselbalch, ocean-acidification, equilibrium-constant. They are in the curriculum as concepts nobody has built for. Quantities below are approximate and every one must carry units and 'about' in the lesson.

### 1. same-sugar-more-water · concept: dilution · intro · demand 3
- Learner knows: that stirring sugar into water makes it sweet / does not know: that adding water leaves the number of sugar particles unchanged and only spreads them over more volume.
- Misconception: adding water "weakens" or removes the stuff; the amount changes rather than the concentration.
- Prediction: "100 mL of 1.0 mol/L sugar syrup is poured into 400 mL of extra water. The mixture is now..." options: A 0.20 mol/L / B 0.80 mol/L / C 0.25 mol/L (answer: A). Check: 1.0 mol/L x 0.100 L = 0.10 mol; total volume 0.500 L; 0.10 / 0.500 = 0.20 mol/L (C is the 1:4 ratio slip).
- Interaction: learner drags the water level up in one beaker; a fixed set of 20 dots spreads and a concentration readout falls. Numbers they can feel: 20 dots, 100 mL to 500 mL.
- Payoff: dilution never changes how many particles there are, only how much room each has.
- Claims to check: concentration = amount of solute / volume of solution (IUPAC Gold Book "amount concentration"); the arithmetic above; volumes treated as additive (approximation for dilute sugar solution, a fact-checker can confirm density tables, or state "about").

### 2. atoms-across-a-hair · concept: atom-scale-size · intro · demand 3
- Learner knows: that things are made of atoms / does not know: how many atoms fit across everyday objects.
- Misconception: atoms are "really small" but roughly thousands across a hair.
- Prediction: "A human hair is about 70 micrometres wide and an atom about 0.2 nanometres across. About how many atoms side by side span the hair?" options: A about 3,500 / B about 350,000 / C about 350 million (answer: B). Check: 70 x 10^-6 m / 0.2 x 10^-9 m = 350 x 10^3 = 3.5 x 10^5.
- Interaction: learner steps a zoom dial one factor of 10 at a time from the hair toward an atom; a ruler stays on stage. Five and a half steps, felt as a count.
- Payoff: the gap between a hair and an atom is about 10^5.5, which is why we need powers of ten to talk about it.
- Claims to check: hair width about 17 to 180 micrometres, about 70 typical (cited hair-diameter survey, e.g. Ley & Bartlett, J. Cosmet. Sci. 2008 or equivalent textbook value); atom diameters about 0.1 to 0.3 nm (CRC Handbook, covalent/van der Waals radii x 2); arithmetic.

### 3. read-the-bone-clock · concept: carbon-dating · core · demand 3
- Learner knows: that a half-life is the time for half the atoms to decay (from the half-life lesson) / does not know: how to run it backwards to get an age.
- Misconception: the age is just the remaining percentage subtracted, or a bone with 1/8 left is 8 half-lives old.
- Prediction: "A bone has 1/8 of its original carbon-14. Carbon-14 has a half-life of about 5,700 years. About how old is the bone?" options: A about 5,700 years / B about 17,000 years / C about 46,000 years (answer: B). Check: 1/8 = (1/2)^3, three half-lives, 3 x 5,700 = 17,100 years (C is 8 x 5,700).
- Interaction: learner slides a "bone age" marker along a decay curve; a bar shows fraction of C-14 left, with gridlines at 1/2, 1/4, 1/8. Reads the age off.
- Payoff: counting how many times you must halve to reach the remaining fraction is the age in half-lives; after about 9 half-lives (about 50,000 years) too little is left to measure.
- Claims to check: C-14 half-life about 5,700 years (NUBASE2020 / ENSDF); fraction left = (1/2)^(t/T); practical limit about 50,000 years (IAEA/radiocarbon lab practice, e.g. Hajdas et al., Nature Reviews Methods Primers 2021).

### 4. heavy-but-floats · concept: density · intro · demand 3
- Learner knows: that some things sink and some float / does not know: that sinking depends on mass per volume, not mass.
- Misconception: heavy objects sink and light objects float.
- Prediction: "A 500 g ball has a volume of 800 cm^3. Water is about 1.0 g/cm^3. Put in water, the ball..." options: A sinks / B floats / C hovers in the middle (answer: B). Check: 500 g / 800 cm^3 = 0.625 g/cm^3, less than 1.0, so it floats.
- Interaction: learner stretches the ball's volume with a slider while mass stays fixed at 500 g; it bobs from sunk to floating at 500 cm^3. A density readout updates.
- Payoff: the same mass sinks or floats depending only on how spread out it is; the crossover is where mass per volume equals the liquid's.
- Claims to check: density of water about 1.0 g/cm^3 near 4 C, about 0.998 at 20 C (CRC Handbook); arithmetic; floating iff density below the fluid's (Archimedes, any physics text).

### 5. one-dose-of-acid · concept: buffers · core · demand 2
- Learner knows: pH is a log scale (pH lesson) / does not know: why some solutions barely move when acid is added.
- Misconception: the same amount of acid always changes pH by the same amount.
- Prediction: "Add 0.010 mol of strong acid to 1 L of pure water, and to 1 L of an acetic acid / acetate buffer (0.10 mol/L of each). pH falls by about..." options: A water about 5 units, buffer about 0.1 / B water about 5, buffer about 5 / C water about 0.1, buffer about 5 (answer: A). Check: water [H+] = 0.010 mol/L so pH 7 to 2 (5 units); buffer pH = 4.76 + log10(0.09/0.11) = 4.76 - 0.09 = 4.67, a fall of about 0.09.
- Interaction: learner adds acid drops one at a time to two beakers; one pH bar (log axis) per liquid on a single chart.
- Payoff: a buffer holds a stock of base that soaks up added acid, so the ratio, and so the pH, barely moves.
- Claims to check: acetic acid pKa 4.76 at 25 C (CRC Handbook); Henderson-Hasselbalch pH = pKa + log10([A-]/[HA]); arithmetic above; pure water ignores dissolved CO2 (state "about").

### 6. twice-as-hot-not-twice-as-fast · concept: temperature-particle-motion · intro · demand 2
- Learner knows: that things are made of moving particles / does not know: that temperature measures average kinetic energy, and speed goes as the square root of absolute temperature.
- Misconception: doubling temperature doubles particle speed (and 20 C to 40 C doubles the heat).
- Prediction: "Air is heated from 300 K (27 C) to 600 K (327 C). The typical speed of its molecules becomes about..." options: A 2 times / B 1.4 times / C unchanged (answer: B). Check: v is proportional to sqrt(T); sqrt(600/300) = sqrt(2) = 1.41.
- Interaction: learner drags a kelvin slider; a box of 30 particles speeds up on the stage and a speed readout shows m/s.
- Payoff: temperature is energy per particle, so speed grows like its square root.
- Claims to check: v_rms = sqrt(3kT/m) (Atkins, Physical Chemistry; kinetic theory); N2 at 300 K v_rms about 520 m/s (compute 3 x 1.381e-23 x 300 / 4.65e-26 = 2.67e5; sqrt = 517 m/s); arithmetic.

### 7. the-tail-that-reacts · concept: reaction-rates-temperature · core · demand 2
- Learner knows: that heating makes reactions faster / does not know: why a small rise in temperature can double the rate.
- Misconception: rate rises in proportion to how much hotter it gets (about 3% hotter, about 3% faster).
- Prediction: "A reaction needs about 50 kJ/mol to get over its barrier. Warm it from 298 K to 308 K (about 3% hotter in kelvin). The rate becomes about..." options: A 1.03 times / B 1.9 times / C 10 times (answer: B). Check: ratio = exp[(Ea/R)(1/298 - 1/308)] = exp[(50,000/8.314)(1.089e-4)] = exp(0.655) = 1.93.
- Interaction: learner drags a temperature slider across a spread of molecule energies; a threshold line stays fixed and the area beyond it is shaded.
- Payoff: heat barely shifts the crowd but fattens the far tail where reactions happen.
- Claims to check: Arrhenius equation k = A exp(-Ea/RT) (Atkins); R = 8.314 J/(mol K); arithmetic; "rate roughly doubles per 10 K" is a rule of thumb for Ea of about 50 kJ/mol near room temperature, not a law.

### 8. the-tagged-molecule · concept: equilibrium · core · demand 2 [exploration]
- Learner knows: that some reactions run both ways / does not know: that at equilibrium nothing has stopped.
- Misconception: at equilibrium the reaction has stopped.
- Prediction: "A mix of A and B has settled: it stays at 50 A and 50 B. At that moment, how many molecules change type each tick?" options: A none / B some, with A-to-B and B-to-A equal in number / C only A turns into B (answer: B). Check: equilibrium means forward rate k_f[A] equals reverse rate k_b[B], and both are above zero for any non-empty mix.
- Interaction: no slider, no text on stage. The learner taps any one molecule to tag it with a colour and a trail; they step time and watch tagged molecules flip while the 50/50 count holds.
- Payoff: equilibrium is steady counts from constant two-way traffic, not an absence of change.
- Claims to check: dynamic equilibrium definition (IUPAC Gold Book "chemical equilibrium"); simulation is seeded and illustrative (state that it is a model, not a measurement).

### 9. freezer-balloon · concept: gas-laws · intro · demand 2
- Learner knows: that gases fill containers / does not know: that volume scales with absolute temperature.
- Misconception: temperature in Celsius can be used directly; a balloon "halves" going from 27 C to about 0 C.
- Prediction: "A 1.00 L balloon at 27 C (300 K) goes into a freezer at -18 C (255 K) at the same pressure. Its volume is about..." options: A 0.85 L / B 0.50 L / C 1.00 L (answer: A). Check: V2 = 1.00 L x 255 K / 300 K = 0.85 L.
- Interaction: learner drags temperature; a point on a volume-versus-Celsius line moves, and the line extended backwards hits zero volume near -273 C.
- Payoff: the straight line points at -273 C, which is why the kelvin scale starts there.
- Claims to check: Charles's law V/T constant at fixed pressure and amount (Atkins); 0 K = -273.15 C (BIPM SI brochure); arithmetic. Real gases liquefy before that point (say so, or leave out).

### 10. same-count-different-weight · concept: moles-counting · intro · demand 2
- Learner knows: that atoms have different masses / does not know: that a mole is a count, so equal moles are equal numbers.
- Misconception: a mole is a mass, or the heavier pile holds more particles.
- Prediction: "You weigh 12 g of carbon atoms and 18 g of water molecules. Which pile has more particles?" options: A the water / B the carbon / C about the same (answer: C). Check: carbon-12 is 12 g/mol, water about 18.0 g/mol, so each pile is about 1 mol, about 6.02 x 10^23 particles.
- Interaction: learner picks substances from a shelf and the balance reads grams; a particle-dot meter reads 1 mol at the matching mass.
- Payoff: molar mass is the weight of one fixed-size crowd of 6.02 x 10^23.
- Claims to check: Avogadro constant 6.02214076 x 10^23 per mol exactly (SI 2019); molar mass of C 12.011 g/mol, H2O 18.015 g/mol (IUPAC atomic weights); arithmetic.

### 11. when-the-water-is-full · concept: solubility-saturation · intro · demand 2
- Learner knows: that salt dissolves / does not know: that dissolving has a ceiling and keeps running both ways at it.
- Misconception: with enough stirring everything dissolves; undissolved salt is just "not yet".
- Prediction: "Salt dissolves to about 36 g per 100 g of water at 20 C. You stir 50 g into 100 g of water. About how much stays as crystals?" options: A none / B about 14 g / C about 50 g (answer: B). Check: 50 g - 36 g = 14 g.
- Interaction: learner adds spoonfuls (5 g each) into a beaker of ions; the dissolved count rises, then stalls, and crystals pile on the bottom.
- Payoff: past the limit, extra salt lands on crystals as fast as it leaves them.
- Claims to check: solubility of NaCl about 35.9 g per 100 g water at 20 C (CRC Handbook); arithmetic; 100 g of water is about 100 mL.

### 12. who-runs-out-first · concept: limiting-reagent · core · demand 2
- Learner knows: that a mole is a count (taught or assumed) / does not know: that the ratio, not the larger pile, decides the product.
- Misconception: the reactant you have fewer of limits the reaction.
- Prediction: "2 H2 + O2 makes 2 H2O. With 6 H2 molecules and 4 O2 molecules, the most H2O you can make is..." options: A 4 / B 6 / C 8 (answer: B). Check: 6 H2 need 3 O2 (ratio 2:1); 4 O2 are on hand, so H2 runs out first; 6 H2 give 6 H2O, with 1 O2 left over.
- Interaction: learner drags molecules into 2:1 sets on a bench; the leftover pile is visible.
- Payoff: the product is set by which reactant runs out when matched at the recipe ratio.
- Claims to check: balanced equation 2 H2 + O2 -> 2 H2O (standard); arithmetic.

### 13. squeeze-the-brown-gas · concept: le-chatelier · core · demand 2
- Learner knows: that equilibria are two-way (equilibrium lesson) / does not know: that a squeeze shifts which side is favoured.
- Misconception: when you disturb an equilibrium nothing sensible happens, or it always shifts toward products.
- Prediction: "N2O4 (colourless) and 2 NO2 (brown) are in equilibrium. You halve the volume and wait. Compared with before, the share of NO2 is..." options: A higher / B lower / C the same (answer: B). Check: the reaction N2O4 <-> 2 NO2 makes 2 molecules from 1; higher pressure favours the side with fewer gas molecules, N2O4.
- Interaction: learner pushes a plunger; one count bar shows the NO2 share among particles, with a brief dark flash then partial fade.
- Payoff: the system partly undoes a squeeze by moving to the side with fewer molecules.
- Claims to check: N2O4/NO2 equilibrium colours (any general-chemistry text, e.g. Brown et al., Chemistry: The Central Science); Le Chatelier's principle for pressure; this is qualitative, say "partly".

### 14. same-heat-different-rise · concept: heat-capacity-water · core · demand 2
- Learner knows: that heat raises temperature / does not know: that materials need different energy per degree.
- Misconception: the same heat warms every material equally.
- Prediction: "1 kg of water and 1 kg of iron each receive 4.2 kJ. The iron ends up hotter by about..." options: A the same / B about 9 times as much / C about half as much (answer: B). Check: water 4.18 kJ/(kg K) gives 1.0 K; iron 0.449 kJ/(kg K) gives 4.2/0.449 = 9.4 K.
- Interaction: learner drags a heat dial (kJ); one temperature-versus-heat chart shows two lines of different slope.
- Payoff: water soaks up energy per degree like few other things, which is why seas are slow to change.
- Claims to check: specific heat of water 4.18 kJ/(kg K) and iron 0.449 kJ/(kg K) at about 25 C (CRC Handbook); arithmetic.

### 15. drunkards-reach · concept: diffusion-random-walk · core · demand 2
- Learner knows: that particles move randomly / does not know: that distance grows as the square root of steps, so spreading slows.
- Misconception: diffusion is steady travel, so 4 times longer means 4 times farther.
- Prediction: "A particle takes random steps. With 4 times as many steps it typically ends up about how many times farther from its start?" options: A 4 times / B 2 times / C the same (answer: B). Check: typical distance = step length x sqrt(N); sqrt(4) = 2.
- Interaction: learner presses "+25 steps" to grow a seeded cloud of 40 walkers; a ring shows typical distance.
- Payoff: random motion spreads quickly at first and then ever more slowly.
- Claims to check: root-mean-square displacement of a random walk = sqrt(N) x step (Berg, Random Walks in Biology); diffusion distance goes as sqrt(Dt) (Atkins).

### 16. water-follows-the-crowd · concept: osmosis · core · demand 2
- Learner knows: that dissolved things spread out / does not know: that water itself moves when solute cannot.
- Misconception: sugar flows to the water, or nothing moves across a membrane that blocks sugar.
- Prediction: "A membrane lets water through but not sugar. Left: 0.1 mol/L sugar; right: 0.3 mol/L sugar. Net water flow goes..." options: A left to right / B right to left / C none (answer: A). Check: water moves toward the lower water concentration, i.e. the higher solute concentration, which is 0.3 mol/L on the right.
- Interaction: learner moves sugar dots between sides; the water level on each side rises and falls.
- Payoff: water spreads out toward the side where it is more crowded out by solute.
- Claims to check: osmosis definition (IUPAC Gold Book); semipermeable-membrane direction (Atkins); simulation is schematic.

### 17. the-two-drop-cliff · concept: titration-curve · stretch · demand 2
- Learner knows: pH is a log scale; dilution / does not know: that near the equivalence point a drop swings pH by many units.
- Misconception: pH changes in proportion to the base added.
- Prediction: "25.0 mL of 0.100 mol/L HCl is titrated with 0.100 mol/L NaOH. Going from 24.9 mL to 25.1 mL of base (0.2 mL, about 4 drops), pH changes by about..." options: A 0.2 units / B 2 units / C 6 to 7 units (answer: C). Check: at 24.9 mL, 1.0 x 10^-5 mol H+ left in 49.9 mL = 2.0 x 10^-4 mol/L, pH 3.7; at 25.1 mL, same excess OH-, pOH 3.7, pH 10.3; change 6.6.
- Interaction: learner adds base in drops; one pH-versus-volume graph traces itself.
- Payoff: pH is flat, then climbs a cliff exactly where acid and base match.
- Claims to check: strong acid/base titration; one drop about 0.05 mL (Pharmacopoeia); arithmetic above at 25 C with pKw 14.0.

### 18. the-fast-ones-leave · concept: evaporation-cooling · intro · demand 1 [exploration]
- Learner knows: that sweat cools us / does not know: that cooling comes from the fastest molecules leaving.
- Misconception: evaporation cools because the liquid "gives off cold" or because of airflow alone.
- Prediction: "The fastest molecules escape a liquid's surface. The molecules left behind have an average speed that is..." options: A higher / B lower / C unchanged (answer: B). Check: removing values above the mean lowers the mean, e.g. speeds 1, 2, 3, 4, 5 (mean 3) minus the 5 gives mean 2.5.
- Interaction: no slider, no text on stage. The learner lifts molecules out of a speed histogram by tapping, then watches a thermometer glyph fall as the average line moves.
- Payoff: evaporation cools because it removes the high-energy tail of the crowd.
- Claims to check: latent heat of vaporisation of water about 2.4 MJ/kg at 25 C (CRC Handbook); molecular-speed distribution (Maxwell-Boltzmann, Atkins).

### 19. lower-the-hill · concept: catalysts · stretch · demand 1 [exploration]
- Learner knows: that reactions need a push to start (activation energy, from the temperature brief) / does not know: that a modest lowering of the barrier has an exponential effect.
- Misconception: a catalyst is consumed, adds energy or changes where equilibrium ends up.
- Prediction: "A catalyst lowers a barrier from 75 kJ/mol to 50 kJ/mol at 298 K. The rate rises by about..." options: A 1.5 times / B 24,000 times / C 3 times (answer: B). Check: exp[25,000 / (8.314 x 298)] = exp(10.09) = about 2.4 x 10^4, assuming the same pre-exponential factor.
- Interaction: no slider. The learner drags the top of an energy hill down with a finger; molecules per second crossing is the only readout (a counter).
- Payoff: a 33% lower barrier is a rate gain by a factor of tens of thousands.
- Claims to check: Arrhenius equation; R = 8.314 J/(mol K); arithmetic; catalysts are not consumed and do not shift equilibrium (IUPAC Gold Book "catalyst").

### 20. why-gas-spreads · concept: entropy-mixing · stretch · demand 1 [exploration]
- Learner knows: that gases fill their container / does not know: that spreading is a matter of counting arrangements, not a push.
- Misconception: gas molecules are pushed apart by a force to fill space.
- Prediction: "20 molecules bounce randomly in a box with an open divider. At one instant, the chance that all 20 are on the left half is about..." options: A 1 in 40 / B 1 in 1,000 / C 1 in a million (answer: C). Check: (1/2)^20 = 1/1,048,576.
- Interaction: no slider. The learner builds the box: taps to add molecules one at a time (4, 10, 20) and takes "snapshots"; a tally of all-left snapshots stays at zero for 20.
- Payoff: no force is needed; the all-left arrangement is one among a million and so never shows up.
- Claims to check: each molecule is on either half with probability 1/2 independently (ideal gas, Atkins ch. 13); arithmetic; real samples have about 10^23 molecules.

### 21. summit-kettle · concept: boiling-point-pressure · core · demand 1 [exploration]
- Learner knows: that water boils at 100 C at sea level / does not know: that this depends on air pressure.
- Misconception: water always boils at 100 C.
- Prediction: "Air pressure on top of Mount Everest is about 0.31 atm. Water there boils at about..." options: A 100 C / B 70 C / C 40 C (answer: B). Check: Clausius-Clapeyron with dH = 40.7 kJ/mol: 1/T = 1/373.15 + (8.314/40,700) x ln(1/0.31) = 0.002680 + 0.000239 = 0.002919, T = 342.6 K = 69.5 C.
- Interaction: learner drags an altitude slider; a vapour-pressure curve with a moving "air pressure" line and the boiling point readout in C.
- Payoff: water boils when its vapour pressure equals the air pressure, so lower air means lower boil.
- Claims to check: Everest summit pressure about 31 to 34 kPa (West, High Altitude Medicine & Biology 2006); enthalpy of vaporisation of water 40.7 kJ/mol at 100 C (CRC Handbook); published summit boiling point about 68 to 71 C.

### 22. who-grabs-the-electrons · concept: bond-polarity · core · demand 1 [exploration]
- Learner knows: that atoms bond by sharing electrons / does not know: that the sharing can be lopsided.
- Misconception: shared electrons sit midway between the atoms.
- Prediction: "In a water molecule, the shared electrons spend more time near..." options: A the oxygen / B the hydrogens / C exactly in the middle (answer: A). Check: Pauling electronegativity O 3.44 vs H 2.20, so oxygen pulls harder.
- Interaction: no text on stage. The learner builds bonds by snapping a partner atom (H, Cl, C, O) onto a central one; the electron cloud shifts, and the learner's only readout is a charge tint.
- Payoff: lopsided sharing makes one end of a molecule slightly negative, which is why water molecules stick to each other.
- Claims to check: Pauling electronegativities O 3.44, H 2.20, Cl 3.16, C 2.55 (CRC Handbook / IUPAC); water dipole moment about 1.85 D (CRC Handbook).
