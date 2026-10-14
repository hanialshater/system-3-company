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

## Round 2 (briefs 23 to 55)

Round 2 takes the map to 55 concepts. Briefs 23 to 28 cover the six concepts round 1 left unbriefed; 29 to 53 give each new concept its first lesson; 54 and 55 are second angles on two demand-3 concepts (dilution, atom-scale-size), the most the portfolio rule allows. Every prediction answer was recomputed in `artifacts/scratch/cm-chemistry-r2/check.mjs`. "Key state" is the moment on the stage that makes the answer obvious; the reveal stays locked until the learner has reached it (pattern `earn-the-reveal`), so `interact()` is called only for steps toward it. Where a brief says "exploration", the format is unusual or the concept is demand 1; the learner designer may change the interaction, not the question's numbers. All quantities are approximate and need units and "about" in the lesson.

### 23. steel-wool-gains-weight · concept: conservation-of-mass · intro · demand 2
- Learner knows: that burning makes things "disappear" into flame and ash / does not know: that a burning metal can gain mass because it takes atoms from the air.
- Misconception: burning destroys matter, so the burnt thing weighs less.
- Prediction: "10.0 g of iron wool burns completely in air to iron(III) oxide, Fe2O3. The ash weighs about..." options: A less than 10 g / B 10.0 g / C about 14 g (answer: C). Check: 10.0 g / 55.85 g/mol = 0.179 mol Fe; Fe2O3 0.0895 mol x 159.69 g/mol = 14.3 g.
- Key state: every iron atom on the stage has captured oxygen atoms drawn in from the air, and the scale reads the sum of both.
- Interaction: learner taps iron atoms; each pulls in oxygen atoms from the air region, while an atom count by element stays fixed for iron and falls for air. One scale readout in grams.
- Payoff: atoms are only rearranged, so mass that leaves the air arrives in the ash.
- Claims to check: molar masses Fe 55.85 g/mol, O 16.00 g/mol (IUPAC); arithmetic; real iron wool burns partly to Fe3O4, so say "about" and "if all becomes Fe2O3".

### 24. most-collisions-bounce · concept: collision-theory · core · demand 2 [exploration]
- Learner knows: that particles collide constantly / does not know: that a collision reacts only if the molecules meet in the right orientation.
- Misconception: every collision with enough energy makes a reaction.
- Prediction: "In a toy model, a reaction needs the reactive face of A (a quarter of its directions) to meet the reactive face of B (also a quarter). Of random, energetic collisions, the share that react is about..." options: A 1 in 2 / B 1 in 16 / C 1 in 4 (answer: B). Check: 1/4 x 1/4 = 1/16 = 6.25%.
- Key state: the learner has fired at least ten collisions with random orientation and has seen the hit tally stay near one in sixteen, with at least one hit and many bounces.
- Interaction: no stage text. The learner rotates molecule B with a finger, then taps to fire it at A; hits glow, bounces fade; a tally of hits over shots. (They may aim, which makes every shot hit and shows why random ones do not.)
- Payoff: collisions are plentiful but orientation filters most of them, so rates are far lower than collision counts.
- Claims to check: steric factor in collision theory (Atkins, Physical Chemistry); the quarter-face geometry is a toy model and must be labelled as one; arithmetic.

### 25. the-slowing-half-life · concept: reaction-order · core · demand 1 [exploration]
- Learner knows: that a half-life is a fixed time (half-life lesson) / does not know: that for some reactions it is not fixed: it lengthens as the reactant thins.
- Misconception: every reaction has one half-life.
- Prediction: "A second-order reaction takes 10 min to go from 80 to 40 mmol/L. From 40 to 20 mmol/L it takes about..." options: A 5 min / B 10 min / C 20 min (answer: C). Check: 1/[A] = 1/[A]0 + kt gives k = (1/40 - 1/80) / 10 = 1/800 L/(mmol min); then (1/20 - 1/40) x 800 = 20 min.
- Key state: two curves on one chart (first order, second order) have each been halved twice by the learner, and the second curve's second wait is visibly twice its first.
- Interaction: learner taps "wait for half" on a single curve toggled between the two orders; a bar adds each wait's length in minutes. No slider.
- Payoff: when the reaction needs two reactant molecules to meet, thinning them slows the reaction, so each half takes longer.
- Claims to check: integrated second-order rate law (Atkins); t1/2 = 1/(k[A]0); arithmetic; first-order half-life is constant.

### 26. ten-to-one-buffer · concept: henderson-hasselbalch · stretch · demand 1 [exploration]
- Learner knows: that buffers hold a stock of acid and base (one-dose-of-acid) / does not know: that pH is set by the log of the ratio, not the amounts.
- Misconception: more buffer, or more of the acid, changes pH in proportion.
- Prediction: "An acetic acid / acetate buffer has pKa 4.76. It holds 10 times as much acid (HA) as base (A-). Its pH is about..." options: A 3.76 / B 4.76 / C 5.76 (answer: A). Check: pH = 4.76 + log10(1/10) = 3.76.
- Key state: the learner has set the base-to-acid ratio to 1:10 on a log axis and sees the pH marker three-quarters of a tick below pKa.
- Interaction: no slider. The learner drags "base" particles into and out of the acid bucket; a single log-ratio ruler with pH ticks follows.
- Payoff: each tenfold change in the ratio moves pH by exactly 1 unit.
- Claims to check: acetic acid pKa 4.76 at 25 C (CRC Handbook); Henderson-Hasselbalch (Atkins); arithmetic; holds for moderate concentrations (say "about").

### 27. point-one-is-26-percent · concept: ocean-acidification · stretch · demand 2
- Learner knows: pH is a log scale / does not know: that a fall of 0.1 in seawater pH is a large rise in hydrogen ion concentration.
- Misconception: "pH 8.2 to 8.1" is a trivial 1% change.
- Prediction: "Surface seawater pH fell from about 8.2 to about 8.1 since pre-industrial times. Its hydrogen ion concentration rose by about..." options: A 1% / B 26% / C 100% (answer: B). Check: 10^0.1 = 1.259, a rise of about 26%.
- Key state: the learner has slid the pH marker down by 0.1 and watched the dot count of H+ rise by about a quarter against a fixed reference bar.
- Interaction: learner drags a pH slider from 8.2 to 7.8 in steps of 0.1; one bar shows H+ relative to 8.2 on a plain (not log) axis.
- Payoff: small pH steps hide large percentage changes, and 0.3 units is about a doubling.
- Claims to check: surface ocean pH fell by about 0.1 since the industrial era (IPCC AR6 WG1 ch. 2/5; NOAA); 10^0.3 = 1.995; arithmetic.

### 28. four-to-one-settles · concept: equilibrium-constant · stretch · demand 1 [exploration]
- Learner knows: that equilibrium is two-way traffic / does not know: that the constant K fixes the split, whatever the starting point.
- Misconception: a reaction goes to completion, or K = 4 means 4 molecules react.
- Prediction: "For A <-> B at equilibrium, K = [B]/[A] = 4. Starting from 100 A molecules and no B, the settled mix holds about..." options: A 80 B / B 50 B / C 25 B (answer: A). Check: B/A = 4 with A + B = 100 gives A = 20, B = 80.
- Key state: the learner has run the system from two different starts (all A, all B) and both settle at 20 A and 80 B.
- Interaction: no slider. The learner chooses a starting pile (all A, all B, half and half) and steps time; one bar shows the A:B split with a faint target line only after the first settle.
- Payoff: K sets where the mix ends, not where it begins.
- Claims to check: equilibrium constant definition (IUPAC Gold Book); simulation is seeded and illustrative; K is fixed by temperature.

### 29. one-ml-of-steam · concept: states-of-matter · intro · demand 2
- Learner knows: that water boils to steam / does not know: that boiling spreads the same molecules into about 1,600 times the space.
- Misconception: gas molecules are bigger, or steam is just hot water.
- Prediction: "1 mL of liquid water boils to steam at 100 C and normal air pressure. The steam fills about..." options: A 2 mL / B 20 mL / C 1,600 mL (answer: C). Check: ideal gas, 1 mol at 373 K and 1 atm = 30.6 L; liquid water at 100 C = 18.8 mL/mol; 30,600 / 18.8 = 1,630.
- Key state: the learner has pulled the lid up until the 1 mL grid of molecules has spread to fill a tall column, and the molecules are visibly far apart.
- Interaction: learner drags a piston upward over a fixed set of 30 molecules while a scale bar shows volume in mL on a log axis.
- Payoff: boiling changes how much room each molecule has, not the molecule.
- Claims to check: molar volume of ideal gas at 373.15 K and 101.325 kPa = 30.6 L/mol (R T / p); density of water at 100 C 0.958 g/mL (CRC Handbook); published expansion ratio about 1,600 to 1,700.

### 30. heat-in-no-rise · concept: heating-curve-plateau · core · demand 2
- Learner knows: that heat raises temperature / does not know: that during melting, heat goes to loosening the structure, with no temperature rise.
- Misconception: temperature always climbs while heat is added.
- Prediction: "1.0 kg of ice at 0 C receives 200 kJ of heat. Melting needs about 334 kJ/kg. The mixture is then..." options: A about 48 C water / B ice and water at 0 C / C about 100 C steam (answer: B). Check: 200 kJ / 334 kJ/kg = 0.60 kg melted; none is left over to warm the water (A is 200 / 4.18).
- Key state: the learner has added 100 kJ and seen the thermometer stay at 0 C while the ice fraction falls; the reveal stays locked until at least one step is on the plateau.
- Interaction: learner drags a heat dial in kJ; one temperature-versus-heat chart traces a flat step and a slope.
- Payoff: heat has two jobs, speeding molecules or freeing them, and on the plateau it does only the second.
- Claims to check: latent heat of fusion of water about 334 kJ/kg (CRC Handbook); specific heat of water 4.18 kJ/(kg K); arithmetic.

### 31. which-particle-names-it · concept: atomic-number-identity · intro · demand 2
- Learner knows: that atoms contain protons, neutrons and electrons / does not know: that only the proton count decides which element it is.
- Misconception: more particles of any kind, or electrons, change the element.
- Prediction: "A carbon atom has 6 protons. To turn it into nitrogen you add one..." options: A proton / B neutron / C electron (answer: A). Check: nitrogen has atomic number 7, carbon 6; the atomic number is the proton count.
- Key state: the learner has added a neutron and an electron and seen the label stay "C", then added a proton and seen it become "N".
- Interaction: learner taps proton, neutron and electron buttons to grow a nucleus; only the element symbol and a total mass number are shown.
- Payoff: the proton count is the element's name; neutrons change its weight and electrons its charge.
- Claims to check: atomic number is the number of protons (IUPAC); C is Z = 6, N is Z = 7.

### 32. no-atom-weighs-35-45 · concept: isotopes · intro · demand 2
- Learner knows: that elements have atomic masses on the table / does not know: that the table value is an average over isotopes.
- Misconception: every atom of an element has the table mass.
- Prediction: "The table gives chlorine's atomic mass as about 35.45 u. Is there a chlorine atom with that mass?" options: A yes, every chlorine atom / B no, it is an average of Cl-35 and Cl-37 / C yes, but only a few atoms (answer: B). Check: 0.758 x 34.969 u + 0.242 x 36.966 u = 35.45 u; individual atoms are about 35 u or about 37 u.
- Key state: the learner has drawn 100 atoms from a bag and seen a running average settle at about 35.45 u while no single atom reads that.
- Interaction: learner taps "draw 10 atoms" from a seeded bag of Cl-35 and Cl-37; each atom shows its own mass, and one average line moves.
- Payoff: atomic mass on the table is a weighted average of atoms that differ in neutrons.
- Claims to check: natural abundances Cl-35 75.76%, Cl-37 24.24% and masses 34.969 u, 36.966 u (IUPAC / NIST); arithmetic.

### 33. lighter-yet-boils-later · concept: hydrogen-bonding · core · demand 2
- Superseded 2026-10-14 by `ethanol-and-its-twin` (`chemistry.matter-reactions.md` #1); skipped in brief-skips.json (W-069). Kept for the record.
- Learner knows: that water boils at 100 C / does not know: that this is far higher than similar light molecules, because of hydrogen bonds.
- Misconception: lighter molecules always boil at lower temperatures.
- Prediction: "H2S (34 u) boils at about -60 C. H2O is lighter (18 u). Water boils at about..." options: A -100 C / B 100 C / C 0 C (answer: B). Check: boiling points H2S -60.3 C, H2O 100 C (CRC Handbook).
- Key state: the learner has pulled one water and one H2S molecule apart and felt the heavier pull on water, with the energy meter in kJ/mol showing about 2 times the H2S amount.
- Interaction: learner drags two molecules apart; one force-versus-distance readout, with hydrogen bonds drawn as dashes only for water.
- Payoff: sticky hydrogen bonds hold water together at temperatures where its lookalikes are gas.
- Claims to check: boiling points H2S -60.3 C, H2O 100.0 C (CRC Handbook); hydrogen bond strength about 20 kJ/mol (Atkins); electronegativity of O 3.44 (Pauling).

### 34. eight-percent-showing · concept: ice-floats · core · demand 2
- Learner knows: that ice floats / does not know: that about 92% of it sits under water, and why.
- Misconception: ice floats because it is light, or because it is "colder".
- Prediction: "Ice has a density of about 0.917 g/cm^3 and water 0.9998 g/cm^3 at 0 C. A floating ice block shows about what share above the water?" options: A about 8% / B about 50% / C about 92% (answer: A). Check: submerged fraction = 0.917 / 0.9998 = 0.917; above = 1 - 0.917 = about 8%.
- Key state: the learner has set the density slider to ice and seen the line settle with a slim cap above the water, then compared it with the "50%" mark.
- Interaction: learner drags a density slider (g/cm^3) for a block; one waterline marks the floating share.
- Payoff: ice has an open hydrogen-bonded lattice, so it sits low and mostly hidden, which is why icebergs are mostly underwater.
- Claims to check: density of ice 0.9167 g/cm^3 at 0 C, water 0.9998 g/cm^3 (CRC Handbook); arithmetic; sea ice in salt water shows slightly more (say fresh water).

### 35. which-dissolves-in-oil · concept: like-dissolves-like · intro · demand 2
- Learner knows: that salt and sugar dissolve in water / does not know: that dissolving depends on matching how molecules attract.
- Misconception: if something dissolves in water, it dissolves in everything; or "oil and water don't mix" is just a rule.
- Prediction: "Salt, sugar and iodine are each shaken with hexane (an oil-like liquid). Which dissolves well?" options: A salt / B sugar / C iodine (answer: C). Check: iodine is nonpolar and dissolves in hexane (violet solution); NaCl and sucrose are not soluble in hexane.
- Key state: the learner has dropped all three solutes into both jars, seeing two of them stay as grains in oil and one spread.
- Interaction: learner drags three solutes into a water jar and an oil jar; charge tints show why each fits or does not.
- Payoff: a liquid dissolves what it attracts as strongly as its own molecules.
- Claims to check: iodine soluble in nonpolar solvents, forming violet solutions (CRC Handbook); NaCl and sucrose practically insoluble in hexane; polar-versus-nonpolar rule (Atkins).

### 36. tire-after-the-drive · concept: ideal-gas-law · core · demand 2
- Learner knows: that heating a sealed gas raises pressure / does not know: that the calculation needs absolute pressure and kelvin.
- Misconception: gauge pressure scales with Celsius, so 20 C to 50 C is "2.5 times".
- Prediction: "A rigid sealed tire reads 220 kPa gauge (about 321 kPa absolute) at 20 C. After a drive it is at 50 C. Gauge pressure is about..." options: A 253 kPa / B 550 kPa / C 354 kPa (answer: A). Check: 321.3 x 323.15 / 293.15 = 354.2 kPa absolute; minus 101.3 kPa air = 252.9 kPa gauge. (C forgets the subtraction; B uses Celsius.)
- Key state: the learner has moved the temperature slider from 20 C to 50 C and read off the kelvin pair, 293 K and 323 K, beside the pressure marker.
- Interaction: learner drags a temperature slider (C); one bar shows absolute pressure with a gauge reading below it.
- Payoff: pressure goes with kelvin and with total, not gauge, pressure, so a warm tyre gains a modest 15%.
- Claims to check: Gay-Lussac / ideal gas law, p/T constant at fixed V and n (Atkins); atmospheric pressure 101.325 kPa; tyre volume assumed constant (say "about").

### 37. same-air-less-oxygen · concept: partial-pressure · core · demand 1
- Learner knows: that air is about 21% oxygen / does not know: that oxygen's share of pressure drops with the pressure, even if the percentage does not.
- Misconception: at altitude the air is a lower percentage oxygen.
- Prediction: "Air is 21% oxygen at every height. On the summit of Everest the total pressure is about 31 kPa. Oxygen's pressure there is about..." options: A 6.5 kPa / B 21 kPa / C 0.21 kPa (answer: A). Check: 0.2095 x 31 kPa = 6.5 kPa (21.2 kPa at sea level).
- Key state: the learner has lifted the altitude slider to the summit and watched the O2 dots thin while the 21% label stays.
- Interaction: learner drags altitude; one box of dots in a fixed volume, oxygen coloured, with a pressure readout in kPa.
- Payoff: your lungs feel the pressure of oxygen, which is the fraction times the total.
- Claims to check: Dalton's law of partial pressures (Atkins); Everest summit pressure about 31 to 34 kPa (West, High Altitude Medicine & Biology 2006); O2 fraction 0.2095 dry air.

### 38. where-the-dew-forms · concept: vapor-pressure-humidity · core · demand 2
- Learner knows: that humid air feels sticky / does not know: that humidity is relative to a temperature-dependent ceiling, and cooling reaches it.
- Misconception: relative humidity measures how much water is in the air, regardless of temperature.
- Prediction: "Air at 30 C has 50% relative humidity. Cooled, dew first forms at about..." options: A 25 C / B 18 C / C 10 C (answer: B). Check: saturation pressure at 30 C 4.24 kPa; half is 2.12 kPa; saturation pressure equals 2.12 kPa at 18.4 C (Magnus formula).
- Key state: the learner has dragged the temperature down until the vapour-pressure marker on the saturation curve touches the curve.
- Interaction: learner drags a temperature slider (C) along the saturation curve; one horizontal line shows the air's actual water pressure in kPa.
- Payoff: the dew point is the temperature at which air's water content becomes a full house.
- Claims to check: Magnus formula constants (Alduchov and Eskridge 1996); saturation vapour pressure of water 4.25 kPa at 30 C (CRC Handbook); arithmetic.

### 39. salt-ions-count-double · concept: freezing-point-depression · core · demand 2
- Learner knows: that salt melts ice on roads / does not know: that what matters is the count of dissolved particles, and salt makes two per formula unit.
- Misconception: salt "melts" ice by heating it, or one mole of anything lowers freezing point equally.
- Prediction: "1.0 mol (58 g) of NaCl dissolves in 1.0 kg of water. The freezing point falls by about..." options: A 1.9 C / B 3.7 C / C 0.5 C (answer: B). Check: delta T = i Kf m = 2 x 1.86 K kg/mol x 1.0 mol/kg = 3.7 K (A counts salt as one particle).
- Key state: the learner has added salt to the beaker and seen each NaCl split into two ions, so the particle count is twice the grains added.
- Interaction: learner adds grams of salt with a slider; particle dots count, and one thermometer shows the freezing point.
- Payoff: freezing point drops with the number of particles, not their kind.
- Claims to check: Kf of water 1.86 K kg/mol (CRC Handbook); van't Hoff factor i about 2 for NaCl (ideal; real solutions about 1.9; say "about"); arithmetic.

### 40. one-in-75-lets-go · concept: strong-vs-weak-acid · core · demand 2
- Learner knows: pH is a log scale / does not know: that equal concentrations of acids do not mean equal pH, since weak acids hold on to most hydrogen ions.
- Misconception: same concentration of any acid gives the same pH.
- Prediction: "0.10 mol/L HCl has pH 1.0. 0.10 mol/L acetic acid has a pH of about..." options: A 1.0 / B 2.9 / C 4.8 (answer: B). Check: [H+] = sqrt(Ka c) = sqrt(1.8e-5 x 0.10) = 1.3e-3 mol/L; pH = 2.87; about 1 in 75 molecules lets go.
- Key state: the learner has stepped both beakers to the same concentration and seen nearly all HCl split but almost no acetic acid.
- Interaction: learner drags a "molecules" slider (equal in both beakers); one fraction-split bar per acid.
- Payoff: strength is the share of molecules that give up their proton, not how much acid is there.
- Claims to check: acetic acid Ka 1.8 x 10^-5 at 25 C (CRC Handbook); HCl fully dissociated in dilute water; arithmetic; approximation x << c.

### 41. zinc-hands-over-two · concept: redox-electron-transfer · core · demand 2 [exploration]
- Learner knows: that metals corrode and dissolve / does not know: that redox is electrons moving between particles, in matched numbers.
- Misconception: oxidation always means adding oxygen, or electrons appear and vanish.
- Prediction: "A zinc atom (Zn -> Zn2+ + 2e-) dissolves in copper(II) solution. How many copper atoms plate out per zinc atom?" options: A 1 / B 2 / C 0.5 (answer: A). Check: each Zn gives 2 electrons and each Cu2+ takes 2, so 1 Cu per Zn.
- Key state: the learner has moved electrons one at a time from Zn to Cu2+ until the Zn2+ and Cu counts match, then sees the 1:1 tally.
- Interaction: no stage text. The learner taps an electron pair off a zinc atom and drops it on a copper ion; charge colour changes are the only feedback.
- Payoff: electrons conserved means every loss is somewhere else's gain.
- Claims to check: Zn + Cu2+ -> Zn2+ + Cu (standard); half reactions; charge balance.

### 42. cold-pack-takes-heat · concept: exothermic-endothermic · intro · demand 2
- Learner knows: that fires give heat / does not know: that some processes absorb heat from their surroundings.
- Misconception: reactions always release heat, and a cold pack stores cold.
- Prediction: "80 g (1.0 mol) of ammonium nitrate dissolves in 500 g of water at 20 C and absorbs 25.7 kJ. The water ends about..." options: A 11 C colder / B the same / C 11 C warmer (answer: A). Check: 25,700 J / (580 g x 4.18 J/(g K)) = 10.6 K colder (about 11 K; ignoring the solute's own heat capacity differences).
- Key state: the learner has watched crystals dissolve while the thermometer drops, and seen the energy flow arrow point from the water into the ions.
- Interaction: learner adds scoops of salt (one scoop = 0.25 mol); one thermometer and one arrow for heat flow.
- Payoff: dissolving can take heat from the water, so the liquid cools.
- Claims to check: enthalpy of solution of NH4NO3 about +25.7 kJ/mol (CRC Handbook); specific heat of water 4.18 J/(g K); arithmetic.

### 43. pay-first-then-profit · concept: bond-energy-enthalpy · core · demand 1 [exploration]
- Learner knows: that burning releases heat / does not know: that every reaction first pays to break bonds, then collects from forming them.
- Misconception: heat comes only from forming bonds, or breaking bonds releases energy.
- Prediction: "Burning 1 mol methane: breaking the old bonds costs about 2,650 kJ, forming the new ones returns about 3,450 kJ. The net is..." options: A releases about 800 kJ / B absorbs about 800 kJ / C releases about 6,100 kJ (answer: A). Check: 4 C-H (413) + 2 O=O (498) = 2,648 kJ; 2 C=O (799) + 4 O-H (463) = 3,450 kJ; net -802 kJ.
- Key state: the learner has broken every old bond, seeing the bill, then formed every new bond, seeing the larger refund.
- Interaction: no slider. The learner taps bonds to break them (a purse counter spends) then taps new bonds to form them (counter earns); one running total.
- Payoff: a reaction releases heat when the bonds it makes are stronger than the bonds it breaks.
- Claims to check: average bond energies C-H 413, O=O 498, C=O (in CO2) 799, O-H 463 kJ/mol (Atkins/CRC); measured combustion enthalpy about -802 kJ/mol for gaseous water; arithmetic.

### 44. cut-the-cube-surface · concept: surface-area-rate · intro · demand 2
- Learner knows: that powders burn faster than lumps / does not know: that cutting divides volume into pieces but multiplies exposed surface.
- Misconception: cutting something into pieces does not change its surface.
- Prediction: "A 1 cm cube is cut into 1000 cubes of 1 mm. The total surface becomes..." options: A the same, 6 cm^2 / B 10 times, 60 cm^2 / C 1000 times, 6000 cm^2 (answer: B). Check: 1000 x 6 x (0.1 cm)^2 = 60 cm^2 against 6 cm^2.
- Key state: the learner has cut the cube twice, to 8 and 64 pieces, with the surface readout at 12 cm^2 and 24 cm^2 on the log scale.
- Interaction: learner taps "cut" (halves every edge) and a surface-area readout in cm^2 updates; pieces fly apart, reacting dots sit only on surfaces.
- Payoff: only surface atoms meet the reactant, so smaller pieces react much faster.
- Claims to check: surface area of a cube 6 a^2; arithmetic; grain dust explosions as a safety example (US CSB / NFPA 652) if used.

### 45. multiply-dont-add-rates · concept: rate-law-concentration · core · demand 2 [exploration]
- Learner knows: that more reactant makes reactions faster / does not know: that effects of different reactants multiply.
- Misconception: doubling two ingredients adds their separate speed-ups.
- Prediction: "Doubling [A] alone doubles the rate. Doubling [B] alone quadruples it. Doubling both makes the rate..." options: A 6 times / B 8 times / C 4 times (answer: B). Check: rate = k[A][B]^2; 2 x 4 = 8.
- Key state: the learner has run the two single-change experiments from a table and then the combined one, with the rate bar at x8.
- Interaction: learner builds the rate law: a table of runs (concentrations, rate) fills as they tap; no slider, they choose which run to do next and deduce the exponents.
- Payoff: rate laws multiply concentration effects, so the exponents come straight from experiments.
- Claims to check: rate = k[A]^m[B]^n, exponents measured, not read from the equation (Atkins); arithmetic.

### 46. yield-not-mass-in-mass-out · concept: percent-yield · core · demand 2
- Learner knows: that products are set by the limiting reagent / does not know: that yield is a fraction of the theoretical amount computed in moles.
- Misconception: the yield is collected mass divided by starting mass.
- Prediction: "2.00 g of salicylic acid (138.12 g/mol) can in theory give 2.61 g of aspirin (180.16 g/mol). You collect 1.80 g. Percent yield is about..." options: A 90% / B 69% / C 100% (answer: B). Check: 2.00 / 138.12 = 0.01448 mol; x 180.16 = 2.609 g; 1.80 / 2.609 = 69%.
- Key state: the learner has weighed the starting powder, converted it to moles and then to theoretical product mass on the stage, and compared it with 1.80 g.
- Interaction: learner drags a "mass collected" marker on a bar with a theoretical-yield line that appears after the mole conversion step.
- Payoff: yield compares what you got against what the atoms could have made, and the two masses differ.
- Claims to check: molar masses salicylic acid 138.12 g/mol, aspirin 180.16 g/mol (PubChem/CRC); 1:1 stoichiometry with acetic anhydride in excess; arithmetic.

### 47. paper-stops-alpha · concept: radiation-penetration · core · demand 2
- Learner knows: that radioactive atoms decay (half-life lesson) / does not know: that the types of radiation differ enormously in what stops them.
- Misconception: all radiation passes through everything, or alpha is the most penetrating because it is the heaviest.
- Prediction: "A single sheet of paper stops which of these almost entirely?" options: A alpha / B beta / C gamma (answer: A). Check: alpha particles travel about 5 cm in air and are stopped by paper or skin; beta needs millimetres of aluminium; gamma needs centimetres of lead or metres of concrete to reduce strongly.
- Key state: the learner has placed paper, aluminium and lead in turn against each beam and seen which beams stop.
- Interaction: learner drags a shield material (paper, 3 mm aluminium, 5 cm lead) in front of three beams; a counter shows rays per second behind it.
- Payoff: heavy and charged radiation is easy to stop; neutral gamma goes deep.
- Claims to check: alpha stopped by paper and skin, beta by about 3 mm aluminium, gamma reduced by thick lead (IAEA / US NRC radiation basics); alpha range of about 5 cm in air for 5 MeV.

### 48. ink-races-up-paper · concept: chromatography · core · demand 1 [exploration]
- Learner knows: that mixtures can be separated / does not know: that parts of a mixture are separated by different stickiness, not size or colour alone.
- Misconception: the heaviest, or the darkest, colour moves least.
- Prediction: "Two dyes ride water up paper. Dye B clings to the paper more than dye A. After the water rises 10 cm, dye B sits..." options: A higher than A / B lower than A / C at the same place (answer: B). Check: a component that sticks more to the stationary phase travels less (retention factor Rf = spot distance / solvent distance is smaller).
- Key state: the learner has set dye B's stickiness above A's and sent the solvent up, seeing B lag behind A.
- Interaction: no slider with numbers. The learner paints two dyes' "stickiness" with a finger, then taps to raise the water; the spots fill in.
- Payoff: separation is a race between being carried and holding on.
- Claims to check: Rf definition (IUPAC Gold Book); chromatography principle (Atkins/Harris, Quantitative Chemical Analysis); simulation illustrative.

### 49. salt-water-hides-silver · concept: solubility-product · stretch · demand 1 [exploration]
- Learner knows: that salts dissolve to a limit / does not know: that adding one of the ions already present lowers the other's limit.
- Misconception: solubility is a fixed number of grams per litre for each salt, whatever else is in the water.
- Prediction: "AgCl dissolves in pure water to give [Ag+] about 1.3 x 10^-5 mol/L (Ksp = 1.8 x 10^-10). In 0.10 mol/L NaCl, [Ag+] is about..." options: A 1.3 x 10^-5 mol/L / B 1.8 x 10^-9 mol/L / C 0.10 mol/L (answer: B). Check: [Ag+] = Ksp / [Cl-] = 1.8e-10 / 0.10 = 1.8e-9 mol/L, about 7,500 times lower.
- Key state: the learner has added chloride ions and seen silver ions drop out as crystals until the product of the two counts is back at the ceiling.
- Interaction: no slider. The learner drops chloride ions from a shaker into a beaker over AgCl crystals; one product meter keeps a fixed ceiling.
- Payoff: the ion product has a ceiling, so crowding one ion forces the other out of solution.
- Claims to check: Ksp of AgCl 1.8 x 10^-10 at 25 C (CRC Handbook); common-ion effect (Atkins); ignores activity and AgCl2- formation (say "about").

### 50. which-pair-pushes-hardest · concept: galvanic-cell-voltage · stretch · demand 1 [exploration]
- Learner knows: that two metals and a salt bridge make a battery / does not know: that voltage is the gap between two metals' grip on electrons.
- Misconception: the voltage depends on how big the electrodes are.
- Prediction: "Standard electrode potentials: Zn2+/Zn -0.76 V, Cu2+/Cu +0.34 V, Ag+/Ag +0.80 V. The biggest cell voltage comes from which pair?" options: A Zn and Cu / B Zn and Ag / C Cu and Ag (answer: B). Check: 1.10 V, 1.56 V, 0.46 V.
- Key state: the learner has placed all three metals on a ladder and read the three gaps.
- Interaction: no text. The learner drags metals along a vertical electron-grip ladder; the gap between any two picked ones lights a voltmeter.
- Payoff: cell voltage is the height difference on the ladder, not the size of the metal.
- Claims to check: standard electrode potentials (CRC Handbook): Zn -0.76 V, Cu +0.34 V, Ag +0.80 V versus SHE; arithmetic.

### 51. amps-times-hours-is-atoms · concept: electrolysis-faraday · stretch · demand 1 [exploration]
- Learner knows: that a current is moving charge / does not know: that charge can be converted to a count of atoms deposited.
- Misconception: current alone decides how much metal is deposited.
- Prediction: "A current of 2.0 A flows for 1.0 h through copper(II) sulfate solution. The copper deposited is about..." options: A 1.2 g / B 2.4 g / C 4.7 g (answer: B). Check: Q = 7,200 C; n(e-) = 7,200 / 96,485 = 0.0746 mol; Cu2+ needs 2 e-, so 0.0373 mol x 63.55 g/mol = 2.37 g.
- Key state: the learner has counted electrons into the cell in sets of two and seen one copper atom deposit per set.
- Interaction: no slider. The learner taps a "second of charge" button (grouped in 1,000 C steps) while a pile of copper grows and an atom tally shows two electrons per atom.
- Payoff: charge is a count of electrons, and a metal ion needs a fixed number of them.
- Claims to check: Faraday constant 96,485 C/mol (SI/CRC); molar mass Cu 63.55 g/mol; arithmetic; assumes 100% current efficiency.

### 52. pencil-lead-vs-diamond · concept: allotropes · intro · demand 1 [exploration]
- Learner knows: that diamond and pencil lead are both carbon / does not know: that the different packing, not the atoms, makes them different, and one holds more atoms per volume.
- Misconception: they must contain different atoms or "different kinds of carbon".
- Prediction: "Diamond (3.51 g/cm^3) and graphite (2.26 g/cm^3) are both pure carbon. Which holds more carbon atoms in 1 cm^3?" options: A diamond / B graphite / C the same (answer: A). Check: diamond 3.51 / 12.011 x 6.022e23 = 1.76e23 atoms; graphite 1.13e23 atoms; ratio about 1.55.
- Key state: the learner has built both layouts from the same eight atoms and seen the volume they fill differ.
- Interaction: no stage text. The learner snaps carbon atoms into either a four-way net or flat sheets; a box outline shows the volume used.
- Payoff: the same atoms packed differently give a different material.
- Claims to check: densities diamond 3.51 g/cm^3, graphite 2.26 g/cm^3 (CRC Handbook); molar mass C 12.011 g/mol; arithmetic.

### 53. helium-leaks-first · concept: effusion-graham · core · demand 1 [exploration]
- Learner knows: that molecules move faster when hot (twice-as-hot brief) / does not know: that at one temperature, lighter molecules are faster.
- Misconception: at the same temperature all gas molecules move at the same speed.
- Prediction: "Helium (4.0 g/mol) and nitrogen (28.0 g/mol) at the same temperature leak through a pinhole. Helium escapes about..." options: A 2.6 times faster / B 7 times faster / C at the same rate (answer: A). Check: rate ratio = sqrt(28.014 / 4.003) = 2.65.
- Key state: the learner has seen a hundred shots at the pinhole, with the helium tally climbing about 2.6 times faster than nitrogen.
- Interaction: no slider. The learner swaps the gas in the box among He, Ne, N2 and Ar and counts how many particles reach a pinhole in a fixed time window (a counter).
- Payoff: at equal temperature all molecules share the same energy, so lighter ones go faster; speed scales as one over the square root of mass.
- Claims to check: Graham's law (Atkins); molar masses He 4.003, N2 28.014 g/mol; arithmetic; helium balloons deflate faster than air balloons (qualitative).

### 54. dilute-until-none-left · concept: dilution · intro · demand 3
- Learner knows: that dilution lowers concentration (same-sugar-more-water) / does not know: that a molecule count runs out, so dilution has an end.
- Misconception: you can dilute forever and still have the stuff, only weaker.
- Prediction: "1.0 mL of 1.0 mol/L dye is mixed into 9 mL water (a 1:10 step) and 1 mL of that goes into the next 9 mL of water, and so on. After how many steps does a 10 mL tube hold, on average, fewer than 1 molecule?" options: A 10 steps / B 22 steps / C 60 steps (answer: B). Check: molecules in tube k = 10^-k mol/L x 0.010 L x 6.022e23 = 6.0 x 10^21 x 10^-k; at k = 21 it is 6.0, at k = 22 it is 0.60.
- Key state: the learner has stepped the dilution until the dot count in the tube falls to a handful, and then to a tube with none.
- Interaction: learner taps "dilute 1:10" and the tube's molecules are counted in dots on a log axis; seeded sampling.
- Payoff: past about 22 tenfold steps, a sample no longer contains the substance at all, only the water.
- Claims to check: Avogadro constant 6.02214076 x 10^23 per mol (SI 2019); arithmetic; expected value, with individual tubes varying by chance (Poisson).

### 55. molecules-in-one-drop · concept: atom-scale-size · intro · demand 3
- Learner knows: that a mole is a huge count (taught or assumed) / does not know: how many molecules sit in one everyday drop.
- Misconception: a drop holds millions or billions of molecules.
- Prediction: "A drop of water (about 0.05 mL, about 0.05 g) contains about how many H2O molecules?" options: A about 10^9 (a billion) / B about 10^15 / C about 10^21 (answer: C). Check: 0.05 g x 0.998 / 18.015 g/mol = 2.8e-3 mol x 6.022e23 = 1.7e21.
- Key state: the learner has stepped the group size up by 1,000 seven times until one group-of-groups represents the drop.
- Interaction: learner taps "group by 1,000" and a dot grid shrinks into larger tiles with a tile count in view; steps are counted.
- Payoff: one drop holds about 1.7 x 10^21 molecules, about 200 billion times the number of people on Earth.
- Claims to check: drop volume about 0.05 mL (pharmacopoeia convention, 20 drops per mL); molar mass 18.015 g/mol; arithmetic; world population about 8 x 10^9.
