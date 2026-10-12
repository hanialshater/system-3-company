# Physics: ranked lesson briefs (cycle: scale-up)

owner: cm-physics · written 2026-10-12 · curriculum: `content/curriculum/physics.json`
Ranking: demand first (3, then 2, then 1), then misconception strength, then how visible the idea is on one phone screen. Exploration slots are marked and sit where they do not block demand-3 work. Existing lessons (pendulum-period, projectile-angle) are not repeated. All predictions assume g = 9.81 m/s^2 unless stated; idealisations are named in each claim list. These briefs are not learning evidence; no human-learner data exists for any of them yet.

Backlog concepts in the curriculum with no brief yet: momentum-collisions, friction-area, series-parallel, power-vs-energy, inclined-plane-work, weightlessness.

### 1. dropped-vs-fired-ball · concept: independent-components · intro · demand 3
- Learner knows: things fall; a ball can be thrown sideways. / does not know: that horizontal and vertical motion are independent; vectors.
- Misconception: A ball shot sideways stays up longer, or "uses up" its forward push before it drops.
- Prediction: "One ball is dropped from a 20 m cliff. At the same instant another is fired horizontally at 15 m/s. Which hits the ground first?" options: The dropped ball / The fired ball / Both together (answer: C). Check: fall time t = sqrt(2h/g) = sqrt(40/9.81) = 2.02 s for both; the fired ball lands 15 x 2.02 = 30.3 m out.
- Interaction: slider for the fired ball's launch speed (0 to 30 m/s); freeze-frame dots every 0.25 s show both balls at identical heights on the same horizontal lines. One representation: the side view.
- Payoff: Sideways speed changes where you land, never when.
- Claims to check: (1) Without air drag, vertical motion depends only on g and height: derive from y = h - g t^2/2. (2) t = 2.02 s for h = 20 m: arithmetic. (3) Range 15 x 2.02 = 30.3 m: arithmetic. (4) Drag is ignored: stated in the lesson.

### 2. puck-on-ice-no-push · concept: inertia · intro · demand 3
- Learner knows: pushing makes things move; ice is slippery. / does not know: Newton's first law; that friction is a force.
- Misconception: Keeping an object moving at constant speed needs a continuing force.
- Prediction: "A puck glides at 2 m/s on perfectly frictionless ice. What push keeps it at 2 m/s?" options: A steady push forward / No push at all / A push that grows over time (answer: B). Check: net force F = m a, and a = 0 for constant velocity, so F = 0.
- Interaction: slider for ice friction (rough to frictionless) with a puck sliding a fixed track; the learner watches speed-vs-distance trace flatten as friction goes to zero. Readout of distance travelled in 10 s.
- Payoff: A force changes motion; it is friction, not nature, that makes things stop.
- Claims to check: (1) With zero net force velocity is constant (Newton's first law, any mechanics text). (2) With friction coefficient mu, deceleration is mu g (derivation; dry kinetic friction idealisation). (3) Stopping distance v^2/(2 mu g), arithmetic for the numbers shown.

### 3. current-same-around-loop · concept: current-not-used-up · intro · demand 3
- Learner knows: batteries light bulbs; wires connect them. / does not know: charge conservation; current vs energy.
- Misconception: Current is used up by the first bulb, so the second gets less.
- Prediction: "Two identical bulbs in series on one battery. An ammeter before bulb 1 reads 0.50 A. What does it read between the bulbs?" options: Less than 0.50 A / 0.50 A / 0 A (answer: B). Check: charge cannot pile up or vanish in a single loop, so the same 0.50 A passes every point (Kirchhoff's current law).
- Interaction: learner drags the ammeter to any spot on a single loop; the reading is the same, while a separate voltage-drop bar for each bulb shows energy being handed over. One representation: the circuit loop with a moving ammeter. Slider for battery voltage.
- Payoff: Charge keeps flowing round the loop; what bulbs use up is energy, not current.
- Claims to check: (1) Series elements carry the same current (Kirchhoff's current law). (2) Two equal resistors split battery voltage equally (V = I R). (3) Ideal wires and battery with no internal resistance, stated. Numbers: 6 V, 2 x 6 ohm gives I = 0.50 A, arithmetic.

### 4. moon-hammer-feather · concept: falling-objects · intro · demand 3
- Learner knows: heavy things seem to fall faster in daily life (a feather vs a hammer). / does not know: air drag is the cause; g is the same for all masses.
- Misconception: Heavier objects fall faster.
- Prediction: "On the Moon there is no air. A hammer and a feather are released together from 1.5 m. Which lands first?" options: Hammer / Feather / Together (answer: C). Check: t = sqrt(2h/g_moon) = sqrt(3/1.62) = 1.36 s for any mass.
- Interaction: toggle for air on/off and a mass slider for each object; release button; with air on the feather lags, with air off the two stay level. Strip of frames every 0.2 s.
- Payoff: Air, not weight, makes light things lag; gravity accelerates everything equally.
- Claims to check: (1) Without drag, acceleration is g regardless of mass (equivalence of gravitational and inertial mass; derivation). (2) Lunar surface g = 1.62 m/s^2 (NASA lunar fact sheet). (3) t = 1.36 s: arithmetic. (4) Apollo 15 commander David Scott dropped a hammer and a feather on the Moon in 1971 and they landed together (NASA Apollo 15 transcript and video).

### 5. same-push-twice-the-mass · concept: net-force-acceleration · core · demand 3
- Learner knows: heavier things are harder to push; speed in m/s. / does not know: F = m a quantitatively.
- Misconception: A constant force gives a constant speed, and doubling the mass just halves that speed; or force has nothing to do with the mass.
- Prediction: "A steady 10 N force pushes a 2 kg cart from rest on a frictionless track. After 2 s it is moving at 10 m/s. The same 10 N pushes a 4 kg cart. Its speed after 2 s?" options: 10 m/s / 5 m/s / 2.5 m/s (answer: B). Check: a = F/m = 10/4 = 2.5 m/s^2; v = 2.5 x 2 = 5 m/s (and the 2 kg cart: a = 5, v = 10).
- Interaction: sliders for force (0 to 20 N) and cart mass (1 to 8 kg); speed-versus-time line steepens or flattens. Readout of v at 2 s. One representation: the v-t graph with a cart dot on a track under it, hidden until needed.
- Payoff: The same push changes a heavier thing's speed proportionally less; acceleration is force divided by mass.
- Claims to check: (1) F_net = m a (Newton's second law). (2) v = a t from rest at constant a. (3) Frictionless, constant force, stated idealisations. (4) Arithmetic for 10 N / 4 kg x 2 s.

### 6. doubling-speed-braking · concept: kinetic-energy-speed-squared · core · demand 3
- Learner knows: faster cars take longer to stop. / does not know: stopping distance scales with v^2; work-energy.
- Misconception: Double the speed, double the stopping distance.
- Prediction: "At 30 km/h, hard braking stops a car in about 7 m. At 60 km/h with the same brakes?" options: 14 m / 21 m / 28 m (answer: C). Check: with a = 5 m/s^2, d = v^2/(2a): 8.33^2/10 = 6.9 m; 16.67^2/10 = 27.8 m, a factor of 4.
- Interaction: slider for speed (10 to 100 km/h); a road strip draws the stopping-distance bar growing, with a house or crossing marker at 28 m. Reaction time excluded and said so.
- Payoff: Twice the speed carries four times the energy, so it needs four times the road.
- Claims to check: (1) d = v^2/(2a) at constant deceleration (kinematics). (2) KE = 1/2 m v^2, so quadrupling when v doubles (definition). (3) 5 m/s^2 is a plausible hard-braking value on dry road (mu about 0.5, a = mu g; source: a road-safety or physics text; tag as typical not universal). (4) Arithmetic for both distances. Reaction distance is excluded.

### 7. flour-on-the-moon · concept: mass-vs-weight · intro · demand 2
- Learner knows: a bag of flour is "1 kg"; the Moon has weaker gravity. / does not know: mass vs weight; newtons.
- Misconception: Mass and weight are the same thing, so mass drops on the Moon.
- Prediction: "You take a 1 kg bag of flour to the Moon (g = 1.62 m/s^2). What changes?" options: Its mass / Its weight / Both (answer: B). Check: weight W = m g: 9.81 N on Earth, 1.62 N on the Moon; mass stays 1 kg.
- Interaction: planet selector (Earth, Moon, Mars, Jupiter) with a spring scale and a balance side by side; the spring scale reading changes, the balance does not. Two readings are the point, so keep the layout as one scale and one balance in one row.
- Payoff: Mass is how much stuff; weight is how hard a planet pulls on it.
- Claims to check: (1) W = m g. (2) g values: Earth 9.81, Moon 1.62, Mars 3.71, Jupiter 24.8 m/s^2 (NASA planetary fact sheets). (3) A balance compares masses and so reads the same anywhere; a spring scale measures force. (4) Mass is the same on each body: definition.

### 8. truck-hits-car-force · concept: action-reaction · intro · demand 2
- Learner knows: heavy trucks wreck cars. / does not know: Newton's third law; that acceleration, not force, differs.
- Misconception: The bigger object hits harder, so it exerts a bigger force.
- Prediction: "A 10,000 kg truck and a 1,000 kg car collide head-on. During the impact, which pushes harder on the other?" options: The truck / The car / Equal forces (answer: C). Check: third law, F_truck on car = F_car on truck; accelerations F/m differ by 10x.
- Interaction: slider for truck mass; two force arrows stay equal in length while two acceleration arrows diverge. One representation: a side view at the moment of contact.
- Payoff: Both feel the same force; the lighter one just changes speed ten times more.
- Claims to check: (1) Newton's third law (equal and opposite, on different bodies). (2) a = F/m, so the car's acceleration is 10 x the truck's. (3) Applies at every instant of the contact. Numbers (10,000 kg and 1,000 kg) are illustrative.

### 9. light-at-double-distance · concept: inverse-square · core · demand 2
- Learner knows: lamps get dimmer with distance. / does not know: spreading over area; the square law.
- Misconception: Double the distance, half the brightness.
- Prediction: "A small lamp lights a page at 100 lux from 1 m. At 2 m?" options: 50 lux / 25 lux / 12.5 lux (answer: B). Check: area scales as r^2 so intensity is 100 / 2^2 = 25 lux.
- Interaction: drag the page along the beam; a grid of squares shows the same light covering 1, 4, 9 squares at distances 1, 2, 3 m, with a brightness readout. Stage text under 25 words.
- Payoff: Light spreads over a surface that grows with the square of distance.
- Claims to check: (1) For a point source, I = P / (4 pi r^2). (2) Lux is illuminance, lumen per square metre. (3) 100 / 4 = 25 and 100 / 9 = 11.1 lux. (4) Idealisation: a point source in empty space, no reflection.

### 10. coaster-track-shape · concept: energy-conservation · core · demand 2
- Learner knows: things speed up going downhill. / does not know: energy conservation as a bookkeeping tool.
- Misconception: A steeper or more twisty path changes the speed you end up with.
- Prediction: "A frictionless cart starts from rest 5 m up. It rolls down a steep ramp, or a gentle one, to the floor. Which gives the higher speed at the bottom?" options: Steep / Gentle / Same (answer: C). Check: m g h = 1/2 m v^2, v = sqrt(2 x 9.81 x 5) = 9.9 m/s, independent of path.
- Interaction: the learner draws or drags control points to shape the track between a fixed start and floor; a speed readout at the bottom stays at 9.9 m/s while the time to bottom changes. Heights stay visible as a ruler.
- Payoff: Only the height lost counts for the speed, not the road taken.
- Claims to check: (1) v = sqrt(2 g h) from energy conservation. (2) Mass cancels. (3) Frictionless, no rolling energy: stated (sliding block or ignore rotation). (4) 9.9 m/s arithmetic.

### 11. clay-boat · concept: buoyancy · intro · demand 2
- Learner knows: some things float and some sink. / does not know: Archimedes' principle; density.
- Misconception: Heavy things sink, light things float; shape cannot matter.
- Prediction: "A 1 kg lump of clay (density about 1800 kg/m^3) sinks in water. If you reshape the same clay into a bowl, how much water must the bowl displace before it floats?" options: 0.56 L / 1 L / 1.8 L (answer: B). Check: floating needs displaced water weight equal to 9.81 N, so 1 kg of water = 1.0 L. The sunk lump displaces only 1 / 1800 m^3 = 0.56 L.
- Interaction: slider reshaping the clay from ball to wide bowl; water-line mark and a bar showing displaced volume against the 1 L needed.
- Payoff: A floating thing pushes aside its own weight in water, and a hollow shape can do it without being less heavy.
- Claims to check: (1) Archimedes' principle: buoyant force equals the weight of fluid displaced. (2) Water density 1000 kg/m^3, so 1 kg is 1.0 L. (3) 1 / 1800 = 0.56 L (clay density is a typical value, stated as approximate). (4) Fresh water at about 20 C.

### 12. build-a-balanced-mobile · concept: center-of-mass · intro · demand 2 [exploration]
- Learner knows: seesaws balance when weights match. / does not know: the center of mass as a weighted average position.
- Misconception: A uniform stick plus a lump balances at the middle or at the lump.
- Prediction: "A uniform 1 m ruler (0.10 kg) has a 0.10 kg lump on its 100 cm end. Where must you put the pivot to balance it?" options: 50 cm / 75 cm / 90 cm (answer: B). Check: x = (0.10 x 50 + 0.10 x 100) / 0.20 = 75 cm.
- Interaction: no slider and no explanatory text on stage. The learner builds the model: drags lumps of different masses onto a beam and moves one pivot until it balances; the beam tilts live. Wins when tilt is within a degree.
- Payoff: The balance point is the average position of the mass, pulled toward the heavy part.
- Claims to check: (1) Center of mass x = sum(m x) / sum(m). (2) A balance holds when net torque about the pivot is zero. (3) The uniform ruler's mass acts at its middle (50 cm). Arithmetic as above. Weightless pivot, rigid beam: stated.

### 13. skydiver-speed-limit · concept: terminal-velocity · core · demand 2
- Learner knows: skydivers fall fast. / does not know: drag grows with speed, forces balance.
- Misconception: A falling body keeps accelerating until it hits the ground.
- Prediction: "A belly-down skydiver (80 kg, drag area C_d A about 0.7 m^2) falls from a plane. After a long fall, her speed..." options: Keeps climbing without limit / Levels off near 45 m/s (about 160 km/h) / Levels off near 5 m/s (answer: B). Check: v_t = sqrt(2 m g / (rho C_d A)) = sqrt(2 x 80 x 9.81 / (1.2 x 0.7)) = sqrt(1869) = 43 m/s.
- Interaction: toggle between belly-down and head-down (C_d A about 0.7 vs 0.3 m^2, giving about 43 vs 66 m/s) and watch a speed-versus-time curve flatten; weight and drag arrows balance. Slider for body mass.
- Payoff: Drag grows with speed until it equals weight, and then speed stops growing.
- Claims to check: (1) Quadratic drag F = 1/2 rho C_d A v^2; terminal speed where F = m g. (2) Air density 1.2 kg/m^3 near sea level. (3) 43 m/s and 66 m/s: arithmetic (sqrt(2 x 80 x 9.81 / (1.2 x 0.3)) = 66). (4) C_d A values are typical estimates, labelled as such; constant air density assumed.

### 14. release-the-spinning-ball · concept: circular-motion-centripetal · core · demand 2
- Learner knows: things swing round on strings. / does not know: that circular motion needs an inward net force.
- Misconception: A whirled object is flung outward (radially) when the string is released.
- Prediction: "A ball whirls on a string on a frictionless table. The string is cut when the ball is at the east point of its circle, moving north. Which path does it follow?" options: Straight east, away from the center / Straight north / Keeps curving in a circle (answer: B). Check: with no net force, velocity stays constant (first law); the velocity at the east point is north.
- Interaction: a "cut" slider (not a play button) scrubs the release angle around the circle; each release draws the straight-line path; learner chooses angles to hit a target.
- Payoff: The string only bends the path inward; once cut, the ball goes straight along the tangent.
- Claims to check: (1) Uniform circular motion needs a centripetal force F = m v^2 / r toward the center. (2) After release, velocity is constant (first law), tangent to the circle. (3) Top view, frictionless table, gravity perpendicular to the plane: stated.

### 15. crumple-zone-stopping-time · concept: impulse-crumple-zones · core · demand 2
- Learner knows: crashes are dangerous at speed. / does not know: impulse and average force.
- Misconception: A car that crumples is a weaker car; stiff is safer.
- Prediction: "A 1000 kg car hits a wall at 15 m/s and stops in 0.1 s (stiff). With crumple zone it takes 0.2 s. The average force on the car is..." options: The same / Half / Double (answer: B). Check: F = change in momentum / t = 15,000 / 0.1 = 150 kN, versus 15,000 / 0.2 = 75 kN.
- Interaction: slider for crush distance (0.1 to 1 m); a stopping-time and average-force readout; a force-versus-time bar changes height and width but keeps the area constant.
- Payoff: The momentum to remove is fixed, so spreading it over more time shrinks the force.
- Claims to check: (1) Impulse F t = delta p (momentum). (2) 1000 x 15 = 15,000 kg m/s. (3) Constant average force is assumed, stated. (4) 150 kN and 75 kN: arithmetic. Crush distance of 1 m at 15 m/s gives t = 2 x 1 / 15 = 0.13 s.

### 16. count-the-thunder · concept: sound-vs-light-delay · intro · demand 2
- Learner knows: lightning and thunder come together. / does not know: that light is effectively instant while sound travels about 343 m/s.
- Misconception: They are the same event arriving at the same time, or the delay means nothing.
- Prediction: "You see a flash and hear thunder 6 s later. How far away did the lightning strike?" options: About 200 m / About 2 km / About 20 km (answer: B). Check: 343 m/s x 6 s = 2058 m. The light takes about 2 km / 3 x 10^8 m/s = 7 microseconds.
- Interaction: slider for the lightning distance (0 to 5 km) with a flash and a growing sound circle; the learner reads the delay and the "seconds / 3" rule.
- Payoff: A 3-second count is roughly 1 km, because sound is slow and light is not.
- Claims to check: (1) Speed of sound in air at 20 C is 343 m/s. (2) Speed of light 3.00 x 10^8 m/s. (3) 6 s -> 2.06 km: arithmetic. (4) "3 seconds per kilometre" rule: 3 x 343 = 1029 m. Wind and temperature variation ignored, stated.

### 17. two-ripples-cancel · concept: waves-interference · core · demand 2
- Learner knows: sound and water make waves. / does not know: superposition with phase.
- Misconception: Two sounds always sound louder than one.
- Prediction: "Two identical speakers play the same pure tone. At a spot where one speaker's path is half a wavelength longer than the other's, the sound is..." options: Twice as loud / The same as one speaker / Almost silent (answer: C). Check: the waves arrive half a cycle out of phase: y = A sin(wt) + A sin(wt + pi) = 0.
- Interaction: drag a listener point across a ripple-tank top view; a loudness readout shows loud and silent bands; a frequency slider moves the bands. One representation: the top view.
- Payoff: Waves add by height, so crest plus trough can cancel.
- Claims to check: (1) Superposition of waves. (2) Destructive interference at path difference (n + 1/2) wavelength. (3) Equal amplitudes, one frequency, no reflections: stated. (4) Wavelength of 343 Hz sound in air is 1.0 m (343 / 343), arithmetic.

### 18. push-the-swing-in-time · concept: resonance · core · demand 2 [exploration]
- Learner knows: pushing a swing makes it go higher. / does not know: natural period and resonant driving.
- Misconception: More frequent pushes give a bigger swing.
- Prediction: "A swing's natural period is 2 s. Which pushing rhythm builds the biggest swing?" options: Push once every 2 s / Push once every 1 s / Push once every 3 s (answer: A). Check: a push every 2 s arrives at the same phase each cycle, so energy accumulates; every 1 s, every other push opposes the motion and cancels (net near zero).
- Interaction: no slider and no text on stage. The learner taps a big button as the swing moves; each tap pushes in the current direction. A tap-timing ring and amplitude meter only. Ten taps shows the result.
- Payoff: Push when the swing is ready, not as often as you can.
- Claims to check: (1) Resonance: driving at the natural frequency maximises steady amplitude with light damping. (2) Natural period T = 2 pi sqrt(L/g); a 2 s swing has L = 0.99 m (arithmetic). (3) Damped linear oscillator, small angles: stated. (4) Push-on-every-second-swing claim: derive by summing pushes per cycle.

### 19. ambulance-pitch-drop · concept: doppler-effect · core · demand 1 [exploration]
- Learner knows: sirens sound higher when close. / does not know: wavefront bunching; the Doppler shift.
- Misconception: The siren itself changes pitch as it gets closer or farther.
- Prediction: "An ambulance siren sounds 700 Hz to the driver. Driving past you at 25 m/s, the pitch you hear..." options: Stays 700 Hz / Drops from about 755 Hz to about 652 Hz / Drops from 700 Hz to 600 Hz (answer: B). Check: approaching f = 700 x 343 / (343 - 25) = 755 Hz; receding f = 700 x 343 / (343 + 25) = 652 Hz.
- Interaction: drag the ambulance across the road; circular wavefronts bunch in front and stretch behind; a single-number pitch readout. Unusual format: the learner places the listener, then predicts the pitch before the drag.
- Payoff: Motion squeezes waves in front and stretches them behind, so the pitch shifts even though the siren never changes.
- Claims to check: (1) Doppler formula for a moving source f' = f c / (c -/+ v). (2) c = 343 m/s at 20 C. (3) 755 and 652 Hz: arithmetic. (4) Source moves along the line to the listener (head-on pass); real pass has gradual change, stated.

### 20. lifeguard-fastest-path · concept: refraction · core · demand 2 [exploration]
- Learner knows: light bends in water; lifeguards run and swim. / does not know: least-time reasoning and Snell's law.
- Misconception: The fastest route is the straight line.
- Prediction: "A lifeguard stands 40 m from the water's edge. The swimmer is 20 m into the water, 60 m along the shore. She runs 7 m/s and swims 1.5 m/s. Where should she enter the water, measured along the shore? Straight line crosses at 40 m." options: 40 m (straight line) / about 56 m / 25 m (answer: B). Check: total time t(x) = sqrt(1600 + x^2)/7 + sqrt(400 + (60 - x)^2)/1.5. t(40) = 26.9 s; t(56) = 9.87 + 13.6 = 23.4 s; t(25) = 33.6 s. Minimum near x = 56.5 m.
- Interaction: learner builds the model by dragging the entry point on the shoreline; a clock reads total time. No slider and no equations. Best point is marked only afterwards.
- Payoff: The quickest path bends at the boundary, the same bend that makes light refract.
- Claims to check: (1) The time numbers: compute each. (2) The minimum satisfies sin(theta1)/v1 = sin(theta2)/v2 (Fermat; derivation). (3) Light follows the least-time path (Fermat's principle) and that matches Snell's law. (4) Straight terrain, constant speeds: stated.

### 21. pinhole-flips-the-world · concept: pinhole-images · intro · demand 1 [exploration]
- Learner knows: light travels in straight lines. / does not know: image formation without a lens.
- Misconception: A tiny hole just dims the scene; the image would be upright.
- Prediction: "A candle burns in front of a card with a tiny hole. On a screen behind the hole the flame appears..." options: Upright / Upside-down / Blurred but upright (answer: B). Check: rays from the flame tip go in straight lines through the hole and land below the axis; similar triangles give image height = object height x (screen distance / object distance).
- Interaction: no text on stage. The learner drags the candle, hole and screen; the image flips and resizes; widening the hole blurs it. One representation: side view with three rays.
- Payoff: Straight rays crossing at the hole send the top of the object to the bottom of the image.
- Claims to check: (1) Light travels in straight lines in a uniform medium. (2) Magnification = screen distance / object distance, so a 6 cm candle 30 cm from the hole with the screen 15 cm behind forms a 3 cm image: arithmetic. (3) A larger hole blurs the image: geometric. (4) Diffraction ignored, stated.

### 22. throw-it-fast-enough · concept: orbits · stretch · demand 1 [exploration]
- Learner knows: balls fall back to the ground. / does not know: that an orbit is falling around a curved planet.
- Misconception: Satellites escape gravity or float because there is none up there.
- Prediction: "From a mountain top above the air, you throw a ball sideways. How fast must it go to never land (Earth radius 6371 km, ignore the mountain height)?" options: About 790 m/s / About 7.9 km/s / About 79 km/s (answer: B). Check: v = sqrt(g R) = sqrt(9.81 x 6.371 x 10^6) = 7906 m/s. Equivalently, the ground curves away 8000^2 / (2 x 6.371 x 10^6) = 5.0 m in 8 km, and a ball falls 4.9 m in 1 s.
- Interaction: the learner drags a throw-speed handle with no number labels, from a few dozen metres per second upward; the arc grows until it wraps the planet. Unusual format: the speed readout stays hidden until the ball closes the loop.
- Payoff: An orbit is a throw so fast that the ground curves away as quickly as the ball falls.
- Claims to check: (1) Circular orbit speed v = sqrt(g R) near the surface (centripetal acceleration equals g). (2) 7.9 km/s: arithmetic. (3) 5.0 m drop per 8 km: arithmetic. (4) No air and no terrain: stated. The ISS at about 400 km altitude moves at about 7.66 km/s (NASA); lower than 7.9 because gravity is weaker at altitude.

## Round 2 (briefs #23–#55)

Written 2026-10-12 for the 500+ lesson target. Same ranking logic as round 1. Every prediction was recomputed in `artifacts/scratch/cm-physics-r2/check.mjs` (g = 9.81 m/s^2 unless stated). "Key state" is the moment on the stage that makes the answer obvious; the lesson calls `interact()` only for steps toward it, and the reveal unlocks only after it (pattern `earn-the-reveal`). 8 of 33 briefs are [exploration]. Briefs #23–#28 clear the round-1 backlog. No human-learner data exists for any brief.

### 23. sticky-cart-merge · concept: momentum-collisions · core · demand 2
- Learner knows: a moving thing hitting a still thing slows down; mass as "how heavy". / does not know: momentum m v is conserved when nothing external pushes.
- Misconception: After two carts stick, the pair keeps the first cart's speed, or the speeds average.
- Prediction: "A 2 kg cart at 3 m/s hits a stationary 1 kg cart and they stick together. Their speed afterwards?" options: 3 m/s / 2 m/s / 1.5 m/s (answer: B). Check: 2 x 3 = 6 kg m/s = (2 + 1) v, so v = 2 m/s.
- Key state: two momentum bars (before, after) are visible and the learner has shifted the second cart's mass until the "after" bar visibly equals the "before" bar at a speed below 3 m/s.
- Interaction: slider for the target cart's mass (0.5 to 4 kg) with a run button replaced by a step button; one stage, a track with a momentum bar above it.
- Payoff: The total push-of-motion (mass x speed) is handed over intact, so the heavier the pair, the slower it goes.
- Claims to check: (1) Conservation of momentum with no external force (any mechanics text). (2) 6 / 3 = 2 m/s: arithmetic. (3) Kinetic energy falls from 9 J to 6 J (the loss goes to deformation and heat): arithmetic. (4) Frictionless track, perfectly inelastic: stated.

### 24. brick-on-its-side · concept: friction-area · intro · demand 2
- Learner knows: rough surfaces grip more; a brick has wide and narrow faces. / does not know: that sliding friction depends on the normal force and surface pair, not area.
- Misconception: More contact area means more friction.
- Prediction: "A 2 kg brick, wide face down, needs a steady pull of 7.8 N on a table (mu = 0.40). Stood on its narrow face (one third of the area), the pull needed is..." options: About 7.8 N / About 2.6 N / About 23 N (answer: A). Check: f = mu m g = 0.40 x 2 x 9.81 = 7.85 N, no area term.
- Key state: the learner has dragged the brick on at least two different faces and sees the spring scale hold the same reading while the contact patch outline changes size.
- Interaction: tap to rotate the brick between three faces; a pull button at constant speed; a spring-scale readout. One representation: side view with the scale.
- Payoff: Friction depends on how hard surfaces are pressed together, not how much surface touches.
- Claims to check: (1) Kinetic friction f = mu N for dry solid surfaces (Amontons' law). (2) 0.40 x 2 x 9.81 = 7.85 N: arithmetic. (3) Law holds approximately for hard dry surfaces; fails for soft, sticky or very smooth ones (racing tyres): stated. (4) Constant-speed pull equals friction.

### 25. add-a-parallel-bulb · concept: series-parallel · core · demand 2
- Learner knows: current flows round a loop and bulbs glow. / does not know: that parallel branches each get the full battery voltage and the battery supplies the sum.
- Misconception: Adding a second bulb splits a fixed current, so each glows dimmer (or the battery gives the same current regardless).
- Prediction: "A 6 V battery lights one 6 ohm bulb (1.0 A). You add an identical bulb in parallel. The battery now supplies..." options: 0.5 A / 1.0 A / 2.0 A (answer: C). Check: each branch has 6 V across 6 ohm = 1.0 A; the battery supplies 1 + 1 = 2.0 A (equivalent resistance 3 ohm).
- Key state: both branches show the same bulb brightness and their own 1.0 A, and the battery's meter has climbed to 2.0 A.
- Interaction: a switch adds or removes the second branch; the battery meter and each branch meter update. One representation: the circuit diagram.
- Payoff: Parallel branches do not share one current; each draws its own, and the battery pays for all of them.
- Claims to check: (1) Parallel branches have equal voltage; branch currents add (Kirchhoff). (2) 6 / 6 = 1.0 A per branch, 2.0 A total: arithmetic. (3) 1/(1/6 + 1/6) = 3 ohm. (4) Ideal battery, constant resistance: stated (real bulb resistance rises when hot).

### 26. kettle-vs-bulb-kwh · concept: power-vs-energy · intro · demand 2
- Learner knows: watts on appliance labels; electric bills. / does not know: energy = power x time, billed in kWh.
- Misconception: The higher-wattage appliance always costs more to run.
- Prediction: "A 2000 W kettle runs for 3 minutes. A 60 W bulb stays on for 2 hours. Which uses more energy?" options: The kettle / The bulb / Equal (answer: B). Check: kettle 2 kW x 0.05 h = 0.10 kWh; bulb 0.06 kW x 2 h = 0.12 kWh.
- Key state: two bars on the same kWh axis, with time shown as the bar's width and power as its height; the learner has stretched the bulb's time until its area exceeds the kettle's.
- Interaction: sliders for each appliance's running time; the area readout (kWh) updates. One representation: power-vs-time rectangles.
- Payoff: Watts say how fast energy flows; the bill counts how long it flows.
- Claims to check: (1) Energy = power x time; 1 kWh = 3.6 MJ. (2) 0.10 and 0.12 kWh: arithmetic. (3) Nameplate power assumed constant over the run, stated.

### 27. ramp-same-work · concept: inclined-plane-work · core · demand 1
- Learner knows: ramps make lifting easier. / does not know: that the force saved is paid for in distance.
- Misconception: A ramp reduces the work needed.
- Prediction: "To raise a 50 kg crate 1.0 m, you slide it up a frictionless 4 m ramp. The push along the ramp is about..." options: 490 N / 123 N / 31 N (answer: B). Check: F = m g h / L = 50 x 9.81 x 1 / 4 = 122.6 N; work F x 4 m = 490.5 J = m g h.
- Key state: the learner has lengthened the ramp until the force readout fell to 123 N, and the work readout beside it still shows 490 J.
- Interaction: slider for ramp length (1 to 8 m) with the height fixed at 1 m; force and work readouts. One representation: side view.
- Payoff: A longer ramp needs a smaller push over a longer path; the work is unchanged.
- Claims to check: (1) Along a frictionless incline the needed force is m g sin(theta) = m g h / L. (2) 122.6 N and 490.5 J: arithmetic. (3) Real ramps add friction work: stated. (4) Constant-speed push.

### 28. iss-gravity-still-there · concept: weightlessness · stretch · demand 1
- Learner knows: astronauts float on the ISS. / does not know: gravity at orbital height is still strong; floating is free fall.
- Misconception: There is almost no gravity at the height of the ISS.
- Prediction: "The ISS orbits about 400 km up. Compared with gravity at the ground, gravity there is about..." options: 0% (none) / 90% / 50% (answer: B). Check: g(r) = 9.81 x (6371 / 6771)^2 = 8.69 m/s^2, 88.5% of ground value.
- Key state: the learner has moved a satellite out to 400 km on a to-scale Earth, with the gravity percent barely changing, and then to a far height where it finally falls.
- Interaction: slider for altitude (0 to 40,000 km, log scale) with a gravity-percent readout. One representation: Earth with the satellite.
- Payoff: Gravity up there is nearly as strong as down here; the astronauts and station are falling together.
- Claims to check: (1) Newton's gravity g ~ 1/r^2. (2) 88.5%: arithmetic (R = 6371 km, r = 6771 km). (3) ISS altitude about 400 km (NASA). (4) Spherical, non-rotating Earth: stated. Pairs with `throw-it-fast-enough` (#22) so build after it.

### 29. ball-at-the-top · concept: acceleration-at-the-top · core · demand 3
- Learner knows: a ball thrown up slows, stops, falls. / does not know: acceleration and velocity are different things.
- Misconception: At the top, with zero speed, the acceleration is zero too.
- Prediction: "A ball thrown straight up is momentarily at rest at the top. Its acceleration at that instant is..." options: Zero / 9.81 m/s^2 downward / 9.81 m/s^2 upward (answer: B). Check: launched at 14.7 m/s, velocity is +0.97 m/s at 1.4 s and -1.0 m/s at 1.6 s; the same -9.81 m/s^2 slope straight through zero.
- Key state: the learner has scrubbed time through the top and watched the velocity arrow shrink, vanish and flip while the acceleration arrow stays the same length.
- Interaction: time scrubber over the throw; two arrows (velocity, acceleration) and a velocity-vs-time dot on a line. One representation: the ball on its path with the arrows.
- Payoff: Zero speed is a moment on the way; the pull of gravity never pauses.
- Claims to check: (1) No drag, acceleration is -g throughout. (2) Peak at t = v0/g = 1.5 s, height v0^2/(2g) = 11.0 m: arithmetic. (3) v(1.4) = 0.97, v(1.6) = -1.0 m/s: arithmetic. (4) Air drag ignored: stated.

### 30. fall-distance-squares · concept: distance-grows-t-squared · core · demand 2
- Learner knows: things speed up as they fall. / does not know: distance = 1/2 g t^2.
- Misconception: Falling for twice as long means twice the distance.
- Prediction: "A dropped stone falls 4.9 m in the first second. How far has it fallen after 3 s?" options: 14.7 m / 29.4 m / 44.1 m (answer: C). Check: 1/2 x 9.81 x 3^2 = 44.1 m, nine times the first second.
- Key state: the learner has stacked second-by-second strips (4.9, 14.7, 24.5 m) on a tall cliff and the total reaches the 44.1 m mark.
- Interaction: tap "add one second" three times on a cliff strip; each strip is longer than the last. One representation: the cliff with strips.
- Payoff: Each second you are going faster, so each second covers more ground; the total grows as time squared.
- Claims to check: (1) y = 1/2 g t^2 from rest, no drag. (2) Per-second strips 4.9, 14.7, 24.5 m (odd ratios 1:3:5): arithmetic. (3) Total 44.1 m. (4) Drag ignored, stated. Distinct from #1 and #4: this is distance versus time, not mass or horizontal motion.

### 31. river-crossing-time · concept: relative-velocity-river · core · demand 2
- Learner knows: rivers flow and boats move. / does not know: relative velocity; independence of the two directions.
- Misconception: A current faster than the boat stops it crossing, or lengthens the crossing time.
- Prediction: "A boat heads straight across a 90 m river at 3 m/s relative to the water. The current is 4 m/s. How long to reach the far bank?" options: 18 s / 30 s / Never, the current is faster (answer: B). Check: crossing speed is 3 m/s across the river regardless of current: 90 / 3 = 30 s; it lands 4 x 30 = 120 m downstream.
- Key state: the learner has raised the current slider and sees the arrival point slide downstream while the crossing clock stays at 30 s.
- Interaction: slider for current speed (0 to 6 m/s); a dotted path and clock. One representation: top view.
- Payoff: The current decides where you land, not when.
- Claims to check: (1) Velocity components along and across the river are independent in the water frame. (2) 90 / 3 = 30 s; drift 120 m: arithmetic. (3) Uniform current, boat always pointed straight across: stated. Same structure as #1 on purpose; keep as a transfer test of independent components.

### 32. two-tugs-right-angle · concept: force-vectors-add · core · demand 2 [exploration]
- Learner knows: forces have size and direction. / does not know: vector addition by head-to-tail.
- Misconception: Forces simply add as numbers: 3 N + 4 N = 7 N.
- Prediction: "A crate is pulled with 3 N east and 4 N north. The single force with the same effect is..." options: 5 N at an angle / 7 N / 1 N (answer: A). Check: sqrt(3^2 + 4^2) = 5 N, 53 degrees north of east.
- Key state: the learner has built the head-to-tail path and sees the crate's own arrow ending at the diagonal, shorter than 7 and longer than 4.
- Interaction: no text, no numbers. The learner drags the tip of a second arrow around the first; a ghost "single force" arrow follows. A crate drifts with the resultant. Numbers appear only afterwards.
- Payoff: Forces add as arrows, so direction matters as much as size.
- Claims to check: (1) Net force is the vector sum. (2) 5 N at atan(4/3) = 53.1 degrees: arithmetic. (3) Frictionless horizontal plane: stated.

### 33. elevator-scale · concept: apparent-weight · core · demand 2
- Learner knows: weight = m g. / does not know: a scale reads the support force N, and N changes when you accelerate.
- Misconception: Your weight is a constant property of you.
- Prediction: "A 70 kg person stands on a force scale in a lift accelerating upward at 2 m/s^2. The scale reads (at rest it reads 687 N)..." options: 547 N / 827 N / 687 N (answer: B). Check: N - m g = m a, so N = 70 x (9.81 + 2) = 826.7 N.
- Key state: the learner has set the lift to accelerate up, then down, and sees the scale needle move above and below the at-rest mark, with the gravity arrow unchanged.
- Interaction: three-way lift control (up, steady, down) and an acceleration slider; the scale needle and a free-body diagram with two arrows. One representation: the scale.
- Payoff: The scale measures how hard the floor pushes on you, and that changes whenever you accelerate.
- Claims to check: (1) N = m (g + a), a positive upward (second law). (2) 826.7, 686.7, 546.7 N: arithmetic. (3) Scale reads normal force: stated. (4) A scale marked in kg is calibrated for g = 9.81: stated.

### 34. crate-wont-budge · concept: static-friction · intro · demand 2 [exploration]
- Learner knows: friction opposes motion. / does not know: static friction adjusts to the push, up to mu_s N.
- Misconception: Friction is always a fixed amount, mu N.
- Prediction: "A 20 kg crate has mu_s = 0.50 (limit 98 N). You push with 50 N and it does not move. The friction force on it is..." options: 98 N / 50 N / 0 N (answer: B). Check: net force is zero, so friction = 50 N; only at 98.1 N does it slip.
- Key state: the learner has pushed in several steps and sees the friction arrow grow with the push until the crate breaks free.
- Interaction: no friction readout. The learner presses and holds a push button that ramps force; the crate stays still until the break point, then jumps. A hidden-friction arrow appears after.
- Payoff: Friction is only as large as it has to be, up to a limit.
- Claims to check: (1) Static friction f_s <= mu_s N. (2) Limit 0.50 x 20 x 9.81 = 98.1 N: arithmetic. (3) f = push while at rest (equilibrium). (4) mu_s = 0.50 is illustrative.

### 35. seesaw-sit-closer · concept: torque-lever · core · demand 2
- Learner knows: seesaws balance with equal weights. / does not know: torque = force x distance.
- Misconception: Balance needs equal weights, or the lighter child cannot balance a heavier one.
- Prediction: "A 40 kg child sits 2.0 m from the pivot. Where must a 20 kg child sit on the other side to balance?" options: 4.0 m / 2.0 m / 1.0 m (answer: A). Check: 40 x 2.0 = 80 = 20 x d, so d = 4.0 m.
- Key state: the learner has slid the light child outward until the beam levels and sees the two torque bars of equal size.
- Interaction: drag the lighter child along the plank; live tilt and two bars (weight x distance). One representation: side view.
- Payoff: A light weight far out can balance a heavy one close in.
- Claims to check: (1) Balance when sum of torques about the pivot is zero. (2) 40 x 2 = 20 x 4: arithmetic. (3) Weightless plank pivoted at its middle: stated. Distinct from #12: here the pivot is fixed and the distance is the unknown.

### 36. snowshoe-pressure · concept: pressure-force-area · intro · demand 2
- Learner knows: heavy things press on the ground. / does not know: pressure = force / area.
- Misconception: Only weight matters for sinking; spreading it makes no difference.
- Prediction: "A 70 kg hiker in boots (0.040 m^2 on the snow) presses at 17 kPa. In snowshoes with 0.40 m^2 the pressure is about..." options: 17 kPa / 1.7 kPa / 0.17 kPa (answer: B). Check: 70 x 9.81 / 0.40 = 1717 Pa = 1.7 kPa.
- Key state: the learner has widened the shoe until the pressure bar drops below the snow's strength line and the foot stops sinking.
- Interaction: slider for the shoe area; a snow-depth indicator and pressure bar. One representation: side view of foot and snow.
- Payoff: Spread the same weight over ten times the area and the pressure falls tenfold.
- Claims to check: (1) P = F / A. (2) 686.7 N / 0.04 = 17.2 kPa and / 0.40 = 1.72 kPa: arithmetic. (3) Weight spread evenly over the contact area: stated. (4) The snow's strength line is illustrative.

### 37. dam-depth-not-width · concept: fluid-pressure-depth · core · demand 2
- Learner knows: deeper water feels more squeezed. / does not know: P = rho g h; width and shape do not matter.
- Misconception: A wide lake pushes harder at the bottom than a thin tube of the same depth.
- Prediction: "A wide lake is 10 m deep. A thin tube of water stands 10 m tall. At the bottom, which has the greater gauge pressure?" options: The lake / The tube / The same (answer: C). Check: P = rho g h = 1000 x 9.81 x 10 = 98.1 kPa for both.
- Key state: the learner has widened and narrowed the container at a fixed depth and seen the bottom pressure readout hold at 98.1 kPa, then raised the depth.
- Interaction: sliders for container width and water depth. One representation: side view with a pressure gauge at the bottom.
- Payoff: Water pressure counts only how deep you are.
- Claims to check: (1) P = rho g h (hydrostatics). (2) 98.1 kPa: arithmetic. (3) Fresh water, 1000 kg/m^3; gauge pressure excludes atmosphere: stated.

### 38. wire-eight-times · concept: wire-resistance · core · demand 2
- Learner knows: current flows in wires. / does not know: R = rho L / A.
- Misconception: Only length matters, or thin and long wire change resistance only a little.
- Prediction: "A wire has resistance 1 ohm. A wire of the same metal is twice as long and half the diameter. Its resistance is..." options: 8 ohm / 4 ohm / 2 ohm (answer: A). Check: area falls to 1/4 so R x4; length doubles so R x2; total x8.
- Key state: the learner has stretched a pipe-like picture longer then thinner and sees the resistance readout step 2, then 8.
- Interaction: two sliders (length, diameter) on a pipe of "electron traffic"; a resistance readout updates. One representation: the pipe.
- Payoff: A wire is a road: longer is worse, and narrower is much worse.
- Claims to check: (1) R = rho L / A for a uniform conductor. (2) A scales as diameter squared: 2 x 4 = 8, arithmetic. (3) Constant temperature, same material: stated.

### 39. toaster-trips-breaker · concept: electric-power-vi · core · demand 2
- Learner knows: appliances have wattages; breakers trip. / does not know: I = P / V.
- Misconception: The breaker's limit is about the number of plugs, not total power.
- Prediction: "A 120 V circuit has a 15 A breaker. A 1500 W heater is already on. Which extra device will NOT trip it?" options: A 200 W device / A 400 W device / A 600 W device (answer: A). Check: 1500 / 120 = 12.5 A; +200 W = 14.2 A (ok); +400 W = 15.8 A and +600 W = 17.5 A (trip).
- Key state: the learner has plugged devices in one by one, watching the ampere meter climb toward the red 15 A line.
- Interaction: tap to plug in devices of various wattages; the current gauge and breaker. One representation: a gauge.
- Payoff: The breaker counts amps, and amps are watts divided by volts.
- Claims to check: (1) P = V I. (2) 12.5, 14.2, 15.8, 17.5 A: arithmetic. (3) 120 V mains and 15 A breaker are illustrative (US); resistive loads, steady state; breakers trip on a time curve: stated.

### 40. magnet-still-in-coil · concept: induction · core · demand 1 [exploration]
- Learner knows: moving charges make currents; magnets are strong. / does not know: Faraday's law, emf depends on flux change.
- Misconception: A strong magnet inside a coil gives a current.
- Prediction: "A strong magnet is held still inside a coil connected to a sensitive meter. The meter reads..." options: A steady current / Zero / A current opposite to when moving (answer: B). Check: emf = N dPhi/dt = 0 if flux is constant (illustration: 100 turns x 0.002 Wb / 0.1 s = 2 V while the magnet is moving in).
- Key state: the learner has pushed the magnet in, held it, pulled it out, and watched the needle move only during the moves.
- Interaction: no text. The learner drags the magnet along the coil axis; a needle deflects. A flux-change graph appears only after.
- Payoff: A magnet in a coil does nothing until something changes.
- Claims to check: (1) Faraday's law emf = -N dPhi/dt. (2) The illustration: 100 x 0.002 / 0.1 = 2 V: arithmetic. (3) Static field, ideal coil and meter: stated.

### 41. red-apple-green-light · concept: colour-filters · intro · demand 1
- Learner knows: apples are red; light has colours. / does not know: objects subtract light; colour is reflected wavelengths.
- Misconception: A red apple has its own redness it shows under any light.
- Prediction: "A ripe red apple is lit only by pure green light. It looks..." options: Bright red / Almost black / Green (answer: B). Check: toy numbers, illustrative: reflectance of a red apple about 0.05 at 530 nm (green) versus about 0.80 at 650 nm (red); under green light it returns about 5% of the light.
- Key state: the learner has switched the lamp among red, green and white while the apple's reflected-light bar visibly shrinks under green.
- Interaction: lamp colour selector (white, red, green, blue); apple, a banana and a leaf row. One representation: the three objects lit together.
- Payoff: Colour is a menu of what an object sends back, and green light has no red to return.
- Claims to check: (1) Apples reflect long wavelengths strongly and absorb mid wavelengths (reflectance spectra; use a source in the lesson). (2) Pure single-wavelength source, no ambient light: stated. (3) The reflectance numbers are illustrative, not measured: labelled. Verifier must source a real reflectance curve before publication.

### 42. mirror-half-height · concept: plane-mirror · intro · demand 1 [exploration]
- Learner knows: mirrors show you. / does not know: ray geometry of reflection.
- Misconception: You need a full-length mirror, or you need to stand back to see yourself.
- Prediction: "A person 1.80 m tall (eyes at 1.70 m) wants to see all of herself in a wall mirror. The shortest mirror is..." options: 0.45 m / 1.80 m / 0.90 m (answer: C). Check: mirror must reach from (1.70 + 0)/2 = 0.85 m to (1.70 + 1.80)/2 = 1.75 m, a length of 0.90 m, whatever her distance.
- Key state: the learner has shrunk the mirror until the head or feet vanish, found the edge, and then walked backward without the edge moving.
- Interaction: no text. The learner resizes and slides the mirror and drags herself back; seen/unseen shading on a stick figure. One representation: side view.
- Payoff: Half your height is enough, and standing farther away changes nothing.
- Claims to check: (1) Law of reflection: equal angles; image distance equals object distance. (2) Similar triangles give mirror edges at the midpoints: 0.85 m to 1.75 m, arithmetic. (3) Flat mirror, eyes as a point: stated.

### 43. torch-underwater-tilt · concept: total-internal-reflection · stretch · demand 1 [exploration]
- Learner knows: light bends entering water. / does not know: the critical angle.
- Misconception: Some light always gets through a boundary.
- Prediction: "Underwater, a torch beam hits the surface at 60 degrees from the vertical. The light..." options: Mostly leaves into the air at a wide angle / Is all reflected back down / Stops, absorbed by the surface (answer: B). Check: sin(theta_c) = 1.00 / 1.333 = 0.75, theta_c = 48.6 degrees; 60 degrees exceeds it.
- Key state: the learner has tilted the beam through the critical angle and watched the exit ray flatten along the surface and then vanish.
- Interaction: no text. Tilt slider for the beam angle; the refracted ray bends toward the surface, then disappears while the reflected ray brightens. Angle readout hidden until afterwards.
- Payoff: Tilt far enough and the surface becomes a perfect mirror.
- Claims to check: (1) Snell's law n1 sin(t1) = n2 sin(t2) with n water = 1.333, n air = 1.00. (2) theta_c = 48.6 degrees: arithmetic. (3) Beyond theta_c all light is reflected (idealised smooth surface): stated. Builds on `lifeguard-fastest-path` (#20).

### 44. press-the-string · concept: standing-wave-pitch · core · demand 1 [exploration]
- Learner knows: shorter strings sound higher. / does not know: frequency is inversely proportional to vibrating length.
- Misconception: Pitch rises by a small, arbitrary amount when the string is shortened.
- Prediction: "An open string vibrates at 110 Hz. Pressing it at its middle gives about..." options: 55 Hz / 110 Hz / 220 Hz (answer: C). Check: f = v / (2L); L halves, f = 110 x 0.65 / 0.325 = 220 Hz.
- Key state: the learner has pressed the finger at the midpoint and counts one loop on the half string versus one on the full (same shape, half as wide), the cycle readout doubling.
- Interaction: no equations. The learner drags a finger along the string; the vibration envelope redraws; Hz appears on a dial after the first press.
- Payoff: Halve the string and the pitch doubles, an octave.
- Claims to check: (1) f = v / (2L) for the fundamental of a fixed string. (2) 110 -> 220 Hz: arithmetic. (3) Same tension and mass per length: stated. (4) Ideal string, ignores stiffness.

### 45. higher-orbit-slower · concept: kepler-orbit-speed · stretch · demand 1
- Learner knows: satellites orbit; rockets must climb. / does not know: v = sqrt(GM / r).
- Misconception: A higher orbit is a faster orbit, because it took more energy to get there.
- Prediction: "A satellite is moved from the ISS's orbit (radius 6771 km) to geostationary orbit (radius 42,164 km). Its orbital speed becomes..." options: Faster / The same / Slower (answer: C). Check: v = sqrt(3.986 x 10^14 / r): 7.67 km/s at 6771 km; 3.07 km/s at 42,164 km.
- Key state: the learner has dragged the satellite outward and seen the speed readout fall while the period readout climbs toward 24 h.
- Interaction: slider for orbital radius (log) with speed and period readouts. One representation: top view of the orbit.
- Payoff: Higher orbits are slower, because gravity is weaker there.
- Claims to check: (1) v = sqrt(GM / r) for circular orbits. (2) GM Earth = 3.986 x 10^14 m^3/s^2. (3) 7.67 and 3.07 km/s: arithmetic. (4) Circular orbits, point-mass Earth: stated. Build after #22 and #28.

### 46. carry-box-level · concept: work-definition · core · demand 2
- Learner knows: carrying boxes is tiring. / does not know: physics work = F d cos(theta).
- Misconception: Holding or carrying a load level does work on it.
- Prediction: "You carry a 10 kg box 20 m along a level floor at constant speed. The work your arms do on the box is..." options: 0 J / 196 J / 1962 J (answer: A). Check: your force is vertical (98.1 N) and the motion horizontal, so W = F d cos 90 = 0 J. Lifting it 1 m would be 98.1 J.
- Key state: the learner has set the carry direction to level, vertical and angled, and the work meter reads zero for level and positive only for lifting.
- Interaction: slider for the carry angle (level to straight up); force and displacement arrows and a work meter. One representation: side view.
- Payoff: Work needs a push along the motion; a sideways walk with a load is zero work on the load.
- Claims to check: (1) W = F d cos(theta). (2) 98.1 N, 0 J, 98.1 J: arithmetic. (3) Constant speed, no acceleration; the body's own metabolic effort is a separate matter: stated.

### 47. filament-vs-led-heat · concept: efficiency-waste-heat · intro · demand 2
- Learner knows: bulbs glow and get warm. / does not know: efficiency; where the rest of the power goes.
- Misconception: A bulb turns nearly all its electricity into light.
- Prediction: "A 60 W filament bulb turns about 5% of its power into visible light. How much of the 60 W ends up as heat?" options: About 3 W / About 30 W / About 57 W (answer: C). Check: 60 x (1 - 0.05) = 57 W. A 9 W LED giving the same 3 W of light would shed about 6 W.
- Key state: the learner has swapped the filament for the LED and sees the heat bar shrink from 57 W to about 6 W while the light bar stays at 3 W.
- Interaction: bulb selector (filament, LED); stacked power bars (light vs heat). One representation: the bar.
- Payoff: Most of an old bulb's electricity warms the room; the LED does the same lighting for a sixth of the power.
- Claims to check: (1) Energy conservation: input = light + heat. (2) 57 W, 6 W: arithmetic. (3) The 5% and 33% efficiencies are typical estimates, to be sourced (US DOE or manufacturer data). (4) Counts only visible light as useful.

### 48. two-springs-end-to-end · concept: hookes-law-springs · core · demand 2
- Learner knows: springs stretch under a weight. / does not know: F = k x and how stiffness combines.
- Misconception: Two springs together are stiffer, always.
- Prediction: "One spring stretches 5 cm under a 1 kg mass. Two identical springs hung end to end under 1 kg stretch together by..." options: 2.5 cm / 5 cm / 10 cm (answer: C). Check: each spring carries the full 9.81 N, so each stretches 5 cm; total 10 cm. Side by side (parallel): 2.5 cm.
- Key state: the learner has hung the mass from one spring, then added a second in line, and sees the mass drop by another 5 cm; then side by side, a drop of only 2.5 cm.
- Interaction: toggle between one spring, two in series, and two in parallel; a mass-drop readout. One representation: the hanging rig.
- Payoff: In a chain each spring carries the whole load; side by side they share it.
- Claims to check: (1) Hooke's law F = k x within the elastic limit. (2) k = 9.81 / 0.05 = 196 N/m; series k/2 gives 10 cm, parallel 2k gives 2.5 cm: arithmetic. (3) Massless springs, linear region: stated.

### 49. skater-pulls-arms · concept: angular-momentum · stretch · demand 1
- Learner knows: skaters spin faster pulling in. / does not know: L = I omega is conserved and omega scales with 1/I.
- Misconception: Pulling the arms in "squeezes out" a bit more spin, an unspecified amount.
- Prediction: "A skater spins at 1 rev/s with moment of inertia 3.0 kg m^2. She pulls in her arms and I falls to 1.0 kg m^2. Her spin rate becomes..." options: 1 rev/s / 3 rev/s / 9 rev/s (answer: B). Check: L = I omega is conserved: omega2 = 3 x 1 = 3 rev/s. Energy rises 3x (59 to 178 J) because her muscles do work.
- Key state: the learner has pulled the arms in step by step and sees the spin-rate readout rise in proportion while an L bar stays fixed.
- Interaction: slider for the arm position (extended to tucked), top view of the skater with spinning marker. One representation: top view.
- Payoff: When mass moves inward, the spin speeds up so that the total angular momentum stays the same.
- Claims to check: (1) Angular momentum is conserved with no external torque. (2) 3 rev/s: arithmetic. (3) KE 59.2 J to 177.7 J: arithmetic. (4) Frictionless ice, I values are illustrative.

### 50. race-down-the-ramp · concept: rolling-inertia · stretch · demand 1 [exploration]
- Learner knows: things roll downhill. / does not know: that rotational inertia shares the energy.
- Misconception: Objects of the same mass and size always roll at the same speed; or heavier wins.
- Prediction: "A solid disc and a thin hoop of equal mass and radius roll without slipping from rest down the same 30-degree ramp. Which reaches the bottom first?" options: The solid disc / The hoop / Together (answer: A). Check: a = g sin(theta) / (1 + k) with k = 1/2 (disc) or 1 (hoop): 3.27 vs 2.45 m/s^2; on a 2 m ramp 1.11 s vs 1.28 s.
- Key state: the learner has rolled several shapes (disc, hoop, mass-changed) and seen the finishing order never depend on mass but always on how far the mass is from the axis.
- Interaction: no text. The learner picks shapes and masses and releases them on parallel lanes; a finishing order lights up. Single view: the ramp.
- Payoff: Mass at the rim stores energy as spin, so that part of the energy is not left over for speed.
- Claims to check: (1) a = g sin(theta) / (1 + I/(m r^2)). (2) 3.27, 2.45 m/s^2; 1.11, 1.28 s: arithmetic. (3) Rolling without slipping, no air drag: stated. (4) A frictionless slide would tie all shapes: derivation.

### 51. ruler-catch · concept: reaction-time-ruler · intro · demand 2 [exploration]
- Learner knows: reflexes take time. / does not know: converting fall distance to time with d = 1/2 g t^2.
- Misconception: Reaction time is negligible, or about a second.
- Prediction: "A ruler dropped without warning is caught at the 20 cm mark. The catcher's reaction time was about..." options: 0.02 s / 0.2 s / 2 s (answer: B). Check: t = sqrt(2d / g) = sqrt(0.4 / 9.81) = 0.202 s.
- Key state: the learner has played the catch several times and sees distances cluster around 15 to 25 cm, matching about 0.2 s.
- Interaction: the learner is the catcher: a ruler drops after a seeded random delay; tap to catch; the distance and a time scale appear. No equations on stage.
- Payoff: A few centimetres of fall is a clock accurate to hundredths of a second.
- Claims to check: (1) d = 1/2 g t^2. (2) 0.202 s: arithmetic. (3) Typical human visual reaction time is about 0.2 to 0.25 s (cite). (4) The lesson's simulated drop does not time the learner's real reflex: stated. Board note for the learning designer: the stage clock is simulated.

### 52. bend-at-double-speed · concept: curve-speed-limit · core · demand 2
- Learner knows: cars skid on tight bends. / does not know: v^2 = mu g r.
- Misconception: Twice the speed needs twice the radius.
- Prediction: "A car takes a bend of radius 50 m at 54 km/h (15 m/s), just within grip. At 108 km/h with the same grip, the radius must be at least..." options: 100 m / 200 m / 400 m (answer: B). Check: r = v^2 / (mu g); v doubles so r x4; mu = 225 / (9.81 x 50) = 0.46, r = 900 / (0.46 x 9.81) = 200 m.
- Key state: the learner has raised the speed slider and watched the safe-radius arc swell, then dragged a road bend to just clear it.
- Interaction: speed slider; a draggable road bend radius; a skid / grip signal. One representation: top view.
- Payoff: Grip supplies a fixed sideways force, so doubling the speed needs a bend four times as wide.
- Claims to check: (1) Friction supplies m v^2 / r; limit mu m g. (2) 200 m: arithmetic. (3) Flat bend, dry road, mu = 0.46 illustrative: stated. Pairs with #6 (v^2).

### 53. cradle-two-in-two-out · concept: elastic-collisions · core · demand 1
- Learner knows: Newton's cradle clicks. / does not know: both momentum and energy are conserved, which fixes the outcome.
- Misconception: Any outcome that moves "the same amount" is allowed (e.g. one ball swings out twice as fast).
- Prediction: "In a cradle you lift two balls and release them. After the hit, the far end swings..." options: Two balls at the starting speed / One ball at double speed / One ball at the starting speed (answer: A). Check: two balls at v: p = 2mv, KE = mv^2. One ball at 2v keeps p = 2mv but has KE 2mv^2. One ball at v has p = mv.
- Key state: the learner has tried each of the three outcomes with momentum and energy tallies, and only one keeps both tallies unchanged.
- Interaction: tap-select one of the outcomes; the two tally bars compare before and after. One representation: the cradle.
- Payoff: Two constraints leave exactly one way for the balls to move.
- Claims to check: (1) Momentum and kinetic energy both conserved in ideal elastic collisions. (2) Tallies 2mv / mv^2 vs 2mv / 2mv^2 vs mv / mv^2/2: arithmetic. (3) Ideal identical balls: stated; real cradles lose a little energy.

### 54. wrench-throw-recoil · concept: rocket-recoil · core · demand 2
- Learner knows: rockets work in space with nothing to push on. / does not know: momentum conservation applies to the thrown mass and the thrower.
- Misconception: A rocket needs air to push against, so an astronaut cannot move by throwing.
- Prediction: "An 80 kg astronaut floating at rest throws a 2 kg wrench at 10 m/s. The astronaut then moves..." options: Not at all / 0.25 m/s the other way / 10 m/s the other way (answer: B). Check: 2 x 10 = 80 v, so v = 0.25 m/s.
- Key state: the learner has thrown wrenches of several masses and speeds, and the astronaut's drift keeps momentum bars balanced with the wrench.
- Interaction: sliders for wrench mass and throw speed; a throw button; two momentum bars.
- Payoff: You do not need anything to push on, only something to push away.
- Claims to check: (1) Conservation of momentum (no external force). (2) 20 / 80 = 0.25 m/s: arithmetic. (3) Speeds relative to the starting frame, small enough to ignore the thrower's recoil effect on the wrench speed: stated.

### 55. sound-in-the-jar · concept: sound-needs-medium · intro · demand 2
- Learner knows: a bell rings. / does not know: sound is a pressure wave in a material.
- Misconception: Sound travels through empty space like light.
- Prediction: "A ringing bell sits in a sealed jar. A pump removes the air. You watch the clapper still swinging and listen. The sound..." options: Stays equally loud / Gets louder / Fades to near silence (answer: C). Check: sound carries by molecular collisions; with 1% of the air left (100x fewer molecules) very little power is passed to the glass and the room.
- Key state: the learner has pumped down in steps while the clapper keeps moving and the loudness bar falls to a sliver.
- Interaction: pump slider (air pressure 100% to 1%); animated molecule density, bell visibly moving, loudness bar. One representation: the jar.
- Payoff: Sound is a push passed from molecule to molecule, so with nothing to pass it, it stops.
- Claims to check: (1) Sound needs a medium (the bell-jar experiment, any acoustics text). (2) Intensity falls as air density falls (impedance rho c); residual faint sound remains at low pressure: stated. (3) Density ratio 1% gives 100x fewer molecules: arithmetic. Verifier should avoid a numeric loudness claim beyond "fades to near silence".
