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

## Round 4 (briefs #56–#70, Wave J, 2026-10-14, cm-physics)

Written for Wave J (879 → 2,000 lessons). Physics coverage was 61/61, so all 15 briefs open **new concepts** (added to `content/curriculum/physics.json` the same day): 5 mechanics, 5 waves, 5 electricity & energy, strand named on each brief. They sit in this file, not the strand files, so `node tools/claim.mjs next physics` hands them out in rank order across strands: the 7 demand-3 concepts first (#56–#62), then demand 2, then demand 1. Two candidates were dropped because another category already teaches them: average speed over a round trip (math `harmonic-average-speed`) and red + green light (cs `pixels-rgb`).

Every number below comes from `artifacts/scratch/cm-physics-r4/check.mjs` (derivations, plus a ray trace, a wave-particle simulation and a dipole-chain force sum). A fact-checker can re-run it with `node`; the textbook sources are standard ones that need no web access. Rules that apply to every brief here:
- **QA path.** The controls are listed in DOM order. Pressing each once (about 450 ms apart) reaches every milestone, the question's own case included. Each is a preset button that changes the stage on every press. The stage starts in a state none of the presets produce (empty holder, slack rope, no voltage picked), so no first press is a no-op. Animations replay in ≤ 400 ms; milestones fire on the computed result, not when the animation ends.
- **Text and labels.** Stage text stays ≤ 25 words at any moment; the reveal drafts are ≤ 90 words (counted). Every SVG label and readout is at least 10 px at 390 px width; tap targets use `.tap` (44 px).
- **Reveal fit.** Each brief has one picture. The quoted values sit in that picture as labels or a single Seen row, which survives Reset. Stage-top crop must be 0 px at 390×844 with the reveal open.
- No human-learner data exists for any brief. Simulated reviews will not count as learning evidence.

### Ruling r3 (2026-10-16)

Copied word for word from the cm-physics round-3 batch (`company/ops/dispatch-requests/2026-10-16-r3-physics.md`, "Rulings"), so that a builder of any brief in this round finds them here. Counting rule: `company/decisions/2026-10-16-stage-word-budget-counting.md`. R1's reading that a unit written after a space counts 1 ("10 ns", "60.6 kg") is the stricter one and stands until head-of-product rules on it (r3 ask A4, still open on 2026-10-16). Each brief #64-70 below now has a `Stage word budget:` line, counted under that reading.

**How the #64-70 counts were made (cm-physics, 2026-10-16, r5).** From the brief's own text, not a rendered stage. Each line lists **every** word the stage may show, from the locked frame to the open reveal, and adds them up as if all were on screen at once. Some (a 60° stop label, a readout that changes) are never all visible together, so each total is an upper bound on the busiest frame. Numerals, percentages, degree signs and fused units count 0. Spaced units ("V", "m", "kg", "°C", "Ω") count 1. Where a brief was over 25, I trimmed control labels, picture labels or readouts and edited the brief's Controls and Seen row lines to match (marked "r3 trim"). No claim's numbers changed and no reveal draft changed. **The list is closed.** A builder who wants to add any stage word not listed (an object label such as "battery" or "bulb", an axis title, a cover line, a unit) recounts first. If the total goes over 25, the builder stops and this goes back to cm-physics (decision, "What a builder does", point 3). The caption in each line is claim-bearing idealisation text, fixed word for word by this brief, and the builder must not cut it. None of these briefs has manipulated stimulus. The counts are the builder's starting point. Evaluators count from the artifact.

**R1 · Stage word budget for #61-63 (answers lane 2 r2 ask 4, W-1185).** These lessons are v1 in `review`, not published, and the revision makes v2. So the 25 binds (demo-standard "Text budget"). Count under the 2026-10-16 decision: busiest frame, words with a letter, numerals 0, controls and captions count, and spaced units count 1 (objection 2). Nothing on these stages is manipulated stimulus. Claim-bearing idealisation captions are **not** cut: "1 A in 1 mm² copper wire. Tinted dot: one electron.", "Identical speakers, same distance, no echoes." and "1,200 kg car, all-wheel drive, no air drag." stay word for word. The builder recounts from the rendered stage, writes `## Stage word budget` in build.md, then applies **only** these cuts, **in this order, stopping as soon as the count is 25 or under**:
- **electron-speed-in-a-wire** (builder count 41 with numerals; my estimate about 33 under the rule):
  - E1: remove the marker label ("lit after ~10 ns" / "2 m trip: 7.6 h"). The Seen row already carries lit and trip, and the reveal reads from it.
  - E2: the wait presets become "+1 s", "+1 min" and "+1 h" (the word "Wait" goes, three times).
  - E3: remove the "battery" text label. The symbol stays, and the alt text still names it.
  - If it is still over 25 after E3: stop, and it goes to the learning designer for a re-layout. Do not cut the Seen row, because the reveal points at its values.
- **second-speaker-decibels** (builder count 30 with numerals; my estimate about 20 under the rule): no cut expected. If the recount is over 25, stop and report. Do not cut the caption.
- **what-pushes-the-car** (builder count 31 with numerals; my estimate about 30 under the rule):
  - P1: the Seen row shows forces only: "dry: 2,400 N · ice: 1,177 N · frictionless: 0 N". The acceleration stays in the live readout and in the reveal.
  - P2: the readout drops the word "forward" ("2,400 N · 2.0 m/s²"). "slipping" and "wheels spin" stay, because they are the ice and frictionless cues.
  - P3: if the arrows also print their newton values, they keep only "road on tyre" and "tyre on road", and the value stays in the readout.
  - If it is still over 25 after P3: stop, and it goes to the learning designer.
- Any learner-visible text a cut changes that sits in a claim: reset that claim to `unverified`.
- **Briefs #64-70** count the same way before they are built (B1 pre-counts them).

**R2 · second-speaker-decibels c4 (W-1256): adopt the fact-checker's wording.** The reveal's last sentence becomes "So 120 dB is not two 60 dB speakers; it is a million times one speaker's power." This adds 2 words (71 to about 73, under 90). Reset c4 to `unverified`, and update the claim text to match.

**R3 · electron-speed-in-a-wire c5/c6 (W-1256, optional): adopt it.** My charter asks for stated idealisations. Add "the bulb's filament is drawn as the same wire" to c6's idealisations. Assumptions only, not on the stage. Reset c6 to `unverified`. c5's text does not change.

**R4 · what-pushes-the-car alt text (W-1256).** The ice frame's alt text reads "Car on a ice road". Make it read "Car on the ice road" for every surface: the template's article becomes "the". This is not a claim.

**R5 · Sources (W-1256).** Add the OpenStax University Physics module ids that FC 55 opened to the `source` field of the claims they support, next to the existing Halliday and Purcell-Morin citations: electron c1 m58730; second-speaker c1 m58377 and m58372; what-pushes c1 m58323 and m58295; plus any other module the FC 55 note for a claim quotes. Use the OpenStax bundle commit 2300d5b. Only the source string changes, so these claims keep their status. If the builder touches anything else in such a claim, it resets the claim.

**R6 · throw-it-fast-enough v7, W-471: confirm the cut.** The stage still says "No air. 10 km peak.", so the main idealisation is still shown. The ISS figure was context, not part of the lesson's claim (c5 is withdrawn). A round, non-spinning Earth is a modelling choice the picture shows; it is not a fact the learner needs told. Do not restore the line.

### 56. tug-of-war-scale · concept: rope-tension · intro · demand 3 · format: Single card
- Strand: mechanics.
- Learner knows: a pull is a force in newtons; a spring scale measures a pull. / does not know: that a scale reads the tension passed through it, so two equal opposite 100 N pulls give 100 N, and a wall pulls back exactly as hard as a second person would.
- Misconception: Two people each pulling 100 N on a rope make the scale in the middle read 200 N (or 0 N, because the pulls cancel).
- Prediction (stage text ≤ 25 words): "Two friends pull the ends of a rope, each with 100 N. A spring scale in the middle reads..." options: A. 0 N / B. 100 N / C. 200 N (answer: B).
- Check: massless scale at rest: T_left = T_right (net force 0 = m a with m ≈ 0). The spring carries that one tension, so it reads 100 N. With the wall: the wall's reaction is 100 N (third law), so 100 N again. Both pulling 200 N: 200 N.
- What the stage shows: one horizontal rope with a dial scale in the middle. Force arrows at each end are labelled in N, and two equal arrows on the scale's spring stand for the tension, which is the cause. The rope starts slack and the dial reads 0.
- Controls (DOM order = QA path): 1. "Both pull 100 N" → dial 100 N (milestone 1, the question's case). 2. "Tie right end to a wall" → the right person is replaced by a wall with a 100 N reaction arrow; dial 100 N (milestone 2). 3. "Both pull 200 N" → dial 200 N (milestone 3).
- Seen row (recorded at each milestone): "100 + 100: 100 N · wall: 100 N · 200 + 200: 200 N".
- Reveal payoff (draft, 75 words): "With each friend pulling 100 N, your scale read 100 N, not 200. Tied to a wall, one friend's 100 N pull also read 100 N: the wall pulls back exactly as hard, just as the second friend did. A scale measures the tension in the rope, the pull passed through it, and it can only be stretched if both ends are pulled equally. Only when both pulled 200 N did it read 200 N."
- Phone fit: rope band plus one Seen row; no table.
- Planned claims:
  1. A massless scale at rest has equal pulls on its two ends (Newton's second law with a = 0), and it reads that common tension. support: derivation; source: check.mjs; any mechanics text (Halliday, Resnick and Walker, *Fundamentals of Physics*, chapter on Newton's laws, tension).
  2. A wall holding the rope pulls back with the same 100 N (Newton's third law). support: derivation; source: same.
  3. 100 + 100 gives 100 N; wall gives 100 N; 200 + 200 gives 200 N. support: arithmetic; source: check.mjs.
  4. Idealisations stated: massless rope and scale, everything at rest.
- Recall: "A 50 N weight hangs from each end of a string over two pulleys, with a scale in the middle. What does the scale read?" (50 N.)
- curriculum: `{"primary":"physics:rope-tension","also":["physics:action-reaction"],"prerequisites":["physics:action-reaction"],"level":"intro","strand":"mechanics","tags":["forces","tension","newton's laws"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: two-tugs-right-angle adds two pulls at an angle on one object. truck-hits-car-force shows equal forces between two colliding bodies. two-springs-end-to-end is about stiffness in series. None asks what a scale reads when it is pulled from both ends.

### 57. drop-on-the-train · concept: moving-frame-drop · intro · demand 3 · format: Single card
- Strand: mechanics.
- Learner knows: things fall; a moving thing keeps moving unless pushed (puck-on-ice-no-push). / does not know: that a ball dropped in a steadily moving train already has the train's speed, so it lands at your feet, and that from the platform the same fall is a 12 m curve.
- Misconception: A ball dropped in a fast train lands behind you, because the train moves forward while the ball falls.
- Prediction: "A smooth train cruises at a steady 20 m/s. Standing inside, you drop a ball from your hand. It lands..." options: A. Behind your feet / B. At your feet / C. Ahead of your feet (answer: B).
- Check: drop height 1.8 m, fall time sqrt(2h/g) = 0.606 s. At 20 m/s the train and the ball both move 12.12 m forward, so the offset is 0 cm. At 40 m/s both move 24.23 m and the offset is again 0. (Assumptions only, not on the stage: braking at 2 m/s² during the fall would make it land 36.7 cm ahead.)
- What the stage shows: a carriage side view with a passenger, a ball and a floor marker under the hand. A dotted trace of the ball's path stays on the stage. The ball's own forward-velocity arrow (equal to the train's) is drawn at release; it is the cause.
- Controls (DOM order): 1. "Drop at 20 m/s" → straight-down trace, "lands 0 cm from below your hand" (milestone 1, the question's case). 2. "View from the platform" → the same drop redrawn as a curve, labelled "train moved 12.1 m · ball moved 12.1 m" (milestone 2). 3. "Drop at 40 m/s" → still 0 cm; platform label 24.2 m (milestone 3).
- Seen row: "20 m/s: 0 cm · platform: 12.1 m curve · 40 m/s: 0 cm".
- Reveal payoff (draft, 79 words): "Your ball fell straight down beside your legs and landed at your feet, at 20 m/s and again at 40 m/s. From the platform the same drop was a long curve: in the 0.61 s fall the train moved 12.1 m, and so did the ball. It left your hand already moving at the train's speed, and nothing slowed it, so it kept pace with you. Inside a steadily moving train, things fall just as they do standing still."
- Phone fit: the carriage band holds the trace and the platform label; one Seen row.
- Planned claims:
  1. A dropped object keeps the horizontal velocity it had at release (inertia; Galilean relativity: the laws of motion are the same in any frame moving at constant velocity). support: textbook + derivation; source: Halliday, Resnick and Walker, chapter on motion in two dimensions / relative motion; check.mjs.
  2. A 1.8 m fall takes 0.606 s (t = sqrt(2h/g)). support: derivation; source: check.mjs.
  3. At 20 m/s the train and ball each move 12.1 m during the fall (24.2 m at 40 m/s), so the ball lands 0 cm from below the hand. support: arithmetic; source: check.mjs.
  4. Idealisations stated: constant velocity in a straight line, sealed carriage (the air moves with the train), no air resistance relative to the carriage. If the train braked during the fall, the ball would land ahead: one claimed sentence, in assumptions only (36.7 cm at 2 m/s²).
- Recall: "On a plane cruising at 250 m/s, you drop your phone. Where does it land?" (At your feet, directly below.)
- curriculum: `{"primary":"physics:moving-frame-drop","also":["physics:inertia"],"prerequisites":["physics:inertia"],"level":"intro","strand":"mechanics","tags":["inertia","frames of reference","relative motion"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: dropped-vs-fired-ball teaches that the fall time ignores horizontal speed, seen from the ground. puck-on-ice-no-push teaches inertia with no push. river-crossing-time adds velocities. None teaches that the same motion looks different from two frames, or the "it lands behind" misconception.

### 58. duck-rides-the-wave · concept: waves-carry-energy · intro · demand 3 · format: Single card
- Strand: waves.
- Learner knows: waves roll across the sea; a floating thing bobs. / does not know: that a wave carries energy across the water while each bit of water only circles in place, so a floating duck stays roughly where it is.
- Misconception: Waves carry the water, and anything floating on it, along with them.
- Prediction: "Ocean waves roll past a floating duck for 40 seconds. No wind, no current. Where does the duck end up?" options: A. Carried along with the crests / B. Close to where it started / C. Pulled back against the waves (answer: B).
- Check: deep-water wave, period 4 s, height 0.2 m (amplitude a = 0.1 m). From ω² = g k: wavelength 25.0 m, crest speed 6.25 m/s. Each surface particle circles with radius 0.1 m. Second-order Stokes drift is ω k a² = 0.004 m/s, so 0.16 m in 40 s. The Lagrangian simulation in check.mjs gives 0.15 m, against 250 m of crest travel (0.06%). A buoy 100 m away starts moving at 100 / 6.25 = 16 s.
- What the stage shows: one side-view band of sea with a duck, one tinted crest, a ruler and a buoy at 100 m. The duck leaves a loop trace, which is the cause: the water circles and hands the motion on.
- Controls (DOM order): 1. "1 wave passes" (simulated 4 s) → the duck traces a loop about 0.2 m across and returns; label "crest moved 25 m" (milestone 1). 2. "10 waves pass" (40 s) → "crests moved 250 m · duck moved 0.15 m" (milestone 2, the question's case). 3. "Watch the buoy" → replays the first 16 s; the buoy at 100 m starts to bob as the first crest arrives, label "16 s" (milestone 3).
- Seen row: "1 wave: loop 0.2 m · 10 waves: duck 0.15 m, crests 250 m · buoy: 16 s".
- Reveal payoff (draft, 81 words): "During one wave your duck went round a loop about 0.2 m across and came back, while the crest moved on 25 m. After ten waves the crests had travelled 250 m and your duck had shifted only about 0.15 m. The buoy 100 m away began to bob at 16 s: the wave carried energy there, not water. Each bit of water just circles and hands the motion on. Near the shore, where waves break, the water does rush forward."
- Phone fit: the sea band is wide and short. The duck's loop is drawn in an inset circle on the duck itself (not a second panel), so the 0.2 m loop is visible.
- Planned claims:
  1. Deep-water waves obey ω² = g k: at a 4 s period the wavelength is 25.0 m and the crest speed 6.25 m/s. support: derivation; source: check.mjs; linear wave theory in any fluids text (e.g. Kundu and Cohen, *Fluid Mechanics*, chapter on surface waves).
  2. In linear theory each surface water particle moves in a circle with radius equal to the amplitude and returns to its start each period. support: derivation; source: same.
  3. The net forward drift (Stokes drift, ω k a²) is about 0.004 m/s at this height, about 0.15 m in 40 s. support: derivation + simulation; source: check.mjs.
  4. Breaking waves near the shore move water forward. support: textbook; source: same chapter. One told sentence.
  5. Idealisations stated: deep water, small waves, no wind or current, the duck moves with the surface water. Taller waves drift more (∝ a²).
- Recall: "A football floats in a calm sea as long low swells pass. After a minute, where is it?" (About where it was.)
- curriculum: `{"primary":"physics:waves-carry-energy","also":[],"prerequisites":[],"level":"intro","strand":"waves","tags":["waves","energy","water"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: shake-faster-same-speed teaches that speed is set by the medium. two-ripples-cancel is superposition. press-the-string is standing waves. None teaches that a wave moves energy while the medium stays put.

### 59. snap-the-magnet · concept: magnet-poles-pair · intro · demand 3 · format: Single card
- Strand: electricity (magnetism).
- Learner knows: magnets have a north and a south end; opposites attract. / does not know: that a magnet is made of countless tiny atomic magnets lined up, so every piece, however small, has both poles; there is no lone north pole.
- Misconception: Snapping a bar magnet in half separates its north pole from its south pole.
- Prediction: "You snap a bar magnet in half. The half that held the north end now has..." options: A. Only a north pole / B. A north and a south pole / C. No poles at all (answer: B).
- Check: model the bar as a uniformly magnetised chain of coaxial point dipoles (check.mjs). The halves, as cut, attract: the summed dipole–dipole force is attractive, so the cut faces are opposite poles. Turn the right half round and they repel. In the pole model each piece carries +σA on one face and −σA on the other, so its net pole strength is 0.
- What the stage shows: one bar magnet (N at left) with a row of tiny arrows drawn inside it, standing for the aligned atomic magnets (the cause), and a small compass beside each end and beside the middle. The N/S letters appear only on faces a compass has read.
- Controls (DOM order): 1. "Snap in the middle" → two halves with a gap; the compasses at the break read "S" on the left half's new face and "N" on the right half's (milestone 1, the question's case). 2. "Turn the right half round" → its arrows flip, the facing poles become S–S, and the halves push apart (milestone 2). 3. "Snap each half again" → four pieces, each with an N and an S read by compasses (milestone 3).
- Seen row: "north half: N + S · turned: push apart · quarters: N + S each".
- Reveal payoff (draft, 75 words): "When you snapped it, the compass at the break found a new south pole on the north half and a new north pole on the other. Turned round, the halves pushed apart, and after snapping again every quarter still had both poles. A magnet is built from countless tiny atomic magnets lined up head to tail, so any piece has a north end and a south end. Nobody has ever found a lone north pole."
- Phone fit: one horizontal band with the pieces and compasses; the N/S letters are labels on the faces.
- Planned claims:
  1. Every piece of a magnet has both a north and a south pole; magnetic field lines have no start or end (Gauss's law for magnetism, ∇·B = 0). support: textbook; source: Griffiths, *Introduction to Electrodynamics*, chapter on magnetostatics.
  2. A bar magnet's magnetism comes from aligned atomic magnetic moments (domains in a ferromagnet). support: textbook; source: same, chapter on magnetic fields in matter.
  3. The two halves attract as cut and repel when one is turned round. support: simulation (dipole-chain force sum); source: check.mjs.
  4. No isolated magnetic monopole has been observed. support: textbook; source: Griffiths (same chapter), which states that no monopoles have been found. The fact-checker may also cite the Particle Data Group review of monopole searches.
  5. Idealisations stated: uniformly magnetised bar, clean break, no loss of magnetism from the snap.
- Recall: "You cut a fridge magnet into ten strips. How many have a north pole?" (All ten.)
- curriculum: `{"primary":"physics:magnet-poles-pair","also":[],"prerequisites":[],"level":"intro","strand":"electricity","tags":["magnetism","poles","domains"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: magnet-still-in-coil (induction) teaches that only a changing field drives current. No other lesson in any category teaches magnetic poles.

### 60. coat-on-the-ice · concept: insulation-slows-heat-flow · intro · demand 3 · format: Single card
- Strand: electricity & energy (heat).
- Learner knows: coats keep people warm; ice melts in a warm room. / does not know: that a coat makes no heat. It only slows heat crossing it, in either direction, so ice wrapped in a coat lasts longer.
- Misconception: A warm coat wrapped round ice will melt it faster, because coats warm things up.
- Prediction: "Two identical ice blocks sit in a 25 °C room. One is wrapped in a wool coat. Which melts first?" options: A. The wrapped block / B. The bare block / C. Both at the same time (answer: B).
- Check: 10 cm ice cube (0.917 kg, area 0.06 m²), room 25 °C, ice at 0 °C. Surface transfer coefficient h = 10 W/m²K gives R = 1.667 K/W; 1 cm of wool (k = 0.04 W/mK) adds 4.167 K/W. Bare: 15.0 W in, melts in 5.7 h. Wrapped: 4.3 W in, melts in 19.9 h (3.5× slower). Person (skin 34 °C, room 5 °C, 1.8 m², same layers): 522 W out bare, 149 W out with the coat.
- What the stage shows: one block on a table. Heat-flow arrows point into it, with thickness set by the watts (the cause), plus a melt clock. A third preset swaps the block for a person, and the arrows then point outward.
- Controls (DOM order): 1. "Bare block" → arrows 15 W in, clock "melts in 5.7 h" (milestone 1). 2. "Wrap it in the coat" → thin arrows 4.3 W, "melts in 19.9 h" (milestone 2, the question's case). 3. "Person in the coat" → outward arrows, "149 W out (bare: 522 W)" (milestone 3).
- Seen row: "bare: 15 W, 5.7 h · coat: 4.3 W, 19.9 h · person: 149 W out".
- Reveal payoff (draft, 81 words): "Your bare block took in heat at 15 W and melted in about 5.7 hours. Wrapped in the coat, it took in only 4.3 W and lasted about 20 hours. The coat makes no heat. It is a layer of trapped air that slows heat crossing it in either direction: on the person it cut the heat flowing out from 522 W to 149 W. Heat flows from warm to cold, and insulation only slows it. Your body is the heater."
- Phone fit: one table scene with arrows and a clock; one Seen row.
- Planned claims:
  1. Steady heat flow through layers is Q̇ = ΔT / ΣR, with R = 1/(hA) at a surface and L/(kA) for a layer. support: derivation; source: Incropera et al., *Fundamentals of Heat and Mass Transfer*, chapter 3; check.mjs.
  2. Values: h = 10 W/m²K (natural convection plus radiation, illustrative), wool k ≈ 0.04 W/mK, ice latent heat 334 kJ/kg, ice density 917 kg/m³. support: textbook tables; source: Incropera appendix A; any physics text for latent heat. Labelled illustrative.
  3. Bare 15 W / 5.7 h; wrapped 4.3 W / 19.9 h; person 522 W / 149 W. support: derivation; source: check.mjs.
  4. A coat produces no heat; a warm body is the source. support: derivation (the coat has no energy source); source: first law of thermodynamics.
  5. Idealisations stated: the ice stays at 0 °C, the area stays constant, the coat fits closely, radiation is folded into h.
- Recall: "You want a cold drink to stay cold at a picnic. Wrap it in a towel or leave it bare?" (Wrap it.)
- curriculum: `{"primary":"physics:insulation-slows-heat-flow","also":["physics:heat-flow-feels-cold"],"prerequisites":[],"level":"intro","strand":"electricity","tags":["heat","insulation","conduction"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: metal-feels-colder teaches that touch senses the rate of heat flow, not temperature. chemistry heat-capacity-water teaches how much heat water stores. filament-vs-led-heat is waste heat. None teaches that insulation slows flow in both directions and makes no heat.

### 61. electron-speed-in-a-wire · concept: drift-velocity-slow · core · demand 3 · format: Single card
- Strand: electricity.
- Learner knows: current flows round a loop (current-same-around-loop); a lamp lights the moment you switch it on. / does not know: that each electron drifts at well under a millimetre a second, and the lamp lights at once because the wire is already full of electrons that all start moving together.
- Misconception: Electrons rush from the switch to the bulb almost at the speed of light.
- Prediction: "A lamp's wire runs 2 m from switch to bulb. How long does one electron at the switch take to reach the bulb?" options: A. Under a millionth of a second / B. About one second / C. Several hours (answer: C).
- Check: a DC lamp (12 V, 1 A) on 1 mm² copper wire. Free electrons n = 8.49×10²⁸ m⁻³ (one per atom, from density and molar mass); 8.5×10²⁸ is used. Drift v = I/(nAe) = 0.073 mm/s. So in 1 s it moves 0.073 mm, in 1 min 4.4 mm, in 1 h 26.4 cm; the 2 m trip takes 7.6 h. At 2 A it is twice as fast (3.8 h). The switch-on signal crosses 2 m in about 10 ns (taking about 2×10⁸ m/s, illustrative).
- What the stage shows: a battery, a switch, a 2 m wire drawn as one loop, and a bulb. Under the wire is a ruler strip of its first 30 cm, with a tinted electron marker. Faint dots fill the whole wire; they are the free electrons and stand for the cause. Every dot nudges together when the switch closes.
- Controls (DOM order): 1. "Switch on" → the bulb lights and the label reads "lit after ~10 ns"; all dots start to drift (milestone 1). 2. "Wait 1 s" → the marker moves 0.07 mm (zoom label). 3. "Wait 1 min" → 4.4 mm (milestone 2). 4. "Wait 1 h" → 26 cm on the ruler; "2 m trip: 7.6 h" (milestone 3).
- Seen row: "lit: ~10 ns · 1 min: 4.4 mm · 1 h: 26 cm · trip: 7.6 h".
- Reveal payoff (draft, 76 words): "Your bulb lit about 10 billionths of a second after the switch, but your tinted electron had crept only 4.4 mm after a minute and 26 cm after an hour. At 1 A it drifts about 0.07 mm a second, so the 2 m trip takes over 7 hours. The wire is already full of free electrons. Closing the switch pushes on all of them at once, so electrons in the bulb start moving straight away."
- Phone fit: one circuit picture with the ruler strip folded under the wire; the times are labels.
- Planned claims:
  1. Drift velocity v = I/(nAe). support: derivation; source: Halliday, Resnick and Walker, chapter on current and resistance; check.mjs.
  2. Copper has about 8.5×10²⁸ free electrons per m³ (one per atom: 8,960 kg/m³ ÷ 0.06355 kg/mol × 6.022×10²³). support: derivation; source: check.mjs.
  3. At 1 A in 1 mm² copper the drift is 0.073 mm/s: 4.4 mm a minute, 26 cm an hour, 7.6 h for 2 m. support: arithmetic; source: check.mjs.
  4. The switching signal travels along the wire at a large fraction of light speed (about 10 ns for 2 m here, illustrative). support: textbook; source: Purcell and Morin, *Electricity and Magnetism*, on fields in conductors / transmission lines. "About" is stated.
  5. Idealisations stated: steady DC from a battery. On AC mains, electrons only jiggle back and forth and never make the trip: one told sentence, in assumptions only.
- Recall: "If electrons in a wire move slower than a snail, why does a light come on instantly?" (The wire is full of electrons, and all of them start moving together.)
- curriculum: `{"primary":"physics:drift-velocity-slow","also":["physics:current-not-used-up"],"prerequisites":["physics:current-not-used-up"],"level":"core","strand":"electricity","tags":["current","electrons","circuits"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: current-same-around-loop teaches that current is not used up. bird-on-the-wire teaches voltage as a difference. None separates the electrons' speed from the signal's speed.

### 62. second-speaker-decibels · concept: decibels-logarithmic · core · demand 3 · format: Single card
- Strand: waves (sound).
- Learner knows: decibels measure loudness; more speakers are louder. / does not know: that decibels count multiplications of sound power, so doubling the power adds only 3 dB and ten times the power adds 10 dB.
- Misconception: Two 60 dB speakers together make 120 dB.
- Prediction: "One speaker plays at 60 dB where you sit. An identical second speaker, same distance, joins in. The level becomes..." options: A. 63 dB / B. 90 dB / C. 120 dB (answer: A).
- Check: L = 10 log10(I / 10⁻¹² W/m²). 60 dB is 1 µW/m². Incoherent sources add intensities: 2 speakers give 63.0 dB, 4 give 66.0 dB, 10 give 70.0 dB. 120 dB is 10⁶ times the intensity of 60 dB.
- What the stage shows: a listener, a row of speaker slots, a dB meter, and a sound-power bar in µW/m². The bar is the cause: it grows in proportion to the number of speakers. It starts with one speaker: bar 1 µW/m², meter 60 dB.
- Controls (DOM order): 1. "2 speakers" → bar 2, meter 63 dB (milestone 1, the question's case). 2. "4 speakers" → bar 4, 66 dB (milestone 2). 3. "10 speakers" → bar 10, 70 dB (milestone 3).
- Seen row: "power ×2: 63 dB · ×4: 66 dB · ×10: 70 dB".
- Reveal payoff (draft, 68 words): "Your second speaker doubled the sound power reaching you, and the meter went from 60 to only 63 dB. Four speakers read 66 dB and ten read 70 dB: ten times the power adds just 10 dB. Decibels count multiplications, not amounts: every doubling adds 3 dB and every tenfold adds 10. So 120 dB is not two 60 dB speakers; it is a million times their power."
- Phone fit: one row of speakers plus the meter and bar; the bar's scale labels are ≥ 10 px.
- Planned claims:
  1. Sound intensity level is L = 10 log10(I/I0), with I0 = 10⁻¹² W/m². support: textbook; source: Halliday, Resnick and Walker, chapter on sound waves.
  2. Uncorrelated sources add intensities, so 2, 4 and 10 equal speakers give 63, 66 and 70 dB. support: derivation; source: check.mjs.
  3. 120 dB is 10⁶ times the intensity of 60 dB. support: arithmetic; source: check.mjs.
  4. Idealisations stated: uncorrelated signals at equal distance (identical in-phase tones can reach up to +6 dB at some spots and less at others), no room echoes. Perceived loudness is not claimed.
- Recall: "A 70 dB vacuum cleaner and another identical one run together. About how many dB?" (73 dB.)
- curriculum: `{"primary":"physics:decibels-logarithmic","also":["math:logarithm-as-digit-count"],"prerequisites":[],"level":"core","strand":"waves","tags":["sound","decibels","logarithms"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: light-at-double-distance teaches the inverse square law. math logarithm-as-digit-count teaches logs as digit counts. chemistry ph-log-scale is a log scale for acidity. None teaches adding sound sources in decibels.

### 63. what-pushes-the-car · concept: friction-drives-forward · core · demand 2 · format: Single card
- Strand: mechanics.
- Learner knows: friction resists sliding (crate-wont-budge); action and reaction (truck-hits-car-force). / does not know: that a car's forward force comes from the road gripping the tyres. The engine only turns the wheels, and internal forces cannot move the car.
- Misconception: The engine pushes the car forward; friction only ever slows things down.
- Prediction: "A car speeds up along a flat road. What pushes the car forward?" options: A. Its engine / B. The road / C. The air behind it (answer: B).
- Check: a 1,200 kg car with all-wheel drive asks for 2 m/s². That needs 2,400 N from the road, and it reaches 50 km/h in 6.9 s. Maximum grip is μ m g: on a dry road (μ 0.8) 9,418 N, more than enough; on ice (μ 0.1) 1,177 N, so the wheels slip and the car manages 0.98 m/s²; on a frictionless road 0 N, the wheels spin and the car stays put.
- What the stage shows: a side view of the car on one road strip. A forward arrow at each tyre's contact patch is labelled "road on tyre" (the cause), with a backward "tyre on road" arrow beside it. Readouts show acceleration, and spin marks appear when the wheels slip.
- Controls (DOM order): 1. "Dry road: accelerate" → 2,400 N forward, 2.0 m/s² (milestone 1). 2. "Ice: accelerate" → arrow capped at about 1,200 N, slip marks, 0.98 m/s² (milestone 2). 3. "Frictionless: accelerate" → wheels spin, 0 N, car stays put (milestone 3).
- Seen row: "dry: 2,400 N, 2.0 m/s² · ice: ~1,200 N, slips · frictionless: 0 N, stays put".
- Reveal payoff (draft, 77 words): "On the dry road your car gained speed at 2.0 m/s², pushed by the road's 2,400 N grip on the tyres. On ice the road could give only about 1,200 N and the wheels slipped. On a frictionless road the engine spun the wheels just as hard and the car went nowhere. The engine turns the wheels and the tyres push back on the road; the road pushing forward on the tyres is what moves the car."
- Phone fit: one road band, with the arrows at the tyres as labels.
- Planned claims:
  1. Internal forces (engine on wheels) cancel in pairs and cannot change the car's momentum; only external forces can (Newton's second and third laws). support: derivation; source: Halliday, Resnick and Walker, chapters on Newton's laws and systems of particles.
  2. The forward external force on a driven car is static friction from the road on the tyres. support: textbook; source: same, friction chapter (rolling without slipping).
  3. 2,400 N for 2 m/s² on 1,200 kg; 6.9 s to 50 km/h; maximum grip μ m g = 9,418 N dry (μ 0.8) and 1,177 N on ice (μ 0.1). support: arithmetic; source: check.mjs. The μ values are illustrative (typical textbook ranges).
  4. Idealisations stated: all-wheel drive, no air drag, the maximum static grip also used while slipping (real sliding grip is a little lower).
- Recall: "Why can't a car pull away on perfectly smooth ice, however powerful its engine?" (Nothing outside pushes it forward; the road's grip is the push.)
- curriculum: `{"primary":"physics:friction-drives-forward","also":["physics:action-reaction","physics:static-friction"],"prerequisites":["physics:static-friction","physics:action-reaction"],"level":"core","strand":"mechanics","tags":["friction","forces","cars"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: crate-wont-budge teaches static friction holding a crate still. brick-on-its-side teaches that friction ignores area. wrench-throw-recoil teaches pushing off with nothing to push on. None shows friction as the force that drives motion forward.

### 64. two-batteries-side-by-side · concept: cells-series-parallel · core · demand 2 · format: Single card
- Strand: electricity.
- Learner knows: a battery's label says 1.5 V; batteries in a torch go end to end. / does not know: that cells end to end add their voltages, while cells side by side keep 1.5 V and only last longer.
- Misconception: Two 1.5 V batteries always make 3 V, however they are connected.
- Prediction: "Two 1.5 V batteries are joined side by side: plus to plus, minus to minus. The voltage across the pair is..." options: A. 0 V / B. 1.5 V / C. 3.0 V (answer: B).
- Check: ideal 1.5 V cells of 2,000 mAh each and a 5 Ω bulb. One cell: 1.5 V, 0.3 A, 0.45 W, 6.7 h. Side by side: 1.5 V, 0.3 A, 0.45 W, 13.3 h. End to end: 3.0 V, 0.6 A, 1.8 W (4×), 3.3 h.
- What the stage shows: a battery holder (empty at first), a voltmeter, a bulb whose glow follows the power, and a fuel gauge for run time (fill only, no text). Inside each cell an arrow stands for the cause (only the first cell's arrow is labelled "lifts 1.5 V", r3 trim); end to end the arrows stack, side by side they sit in parallel.
- Controls (DOM order): 1. "Side by side" → voltmeter 1.5 V, gauge fills to 13.3 h (milestone 1, the question's case). 2. "End to end" → 3.0 V, gauge 3.3 h, bulb 4× as bright by glow (milestone 2). 3. "One" → 1.5 V, gauge 6.7 h (milestone 3). (r3 trim: the third control was "One battery". The bulb's watts and the gauge's "runs … h" text are no longer on the stage: power shows as glow, hours show in the Seen row. Only the first cell's arrow carries the "lifts 1.5 V" label.)
- Seen row: "side by side: 1.5 V, 13.3 h · end to end: 3.0 V, 3.3 h · one: 1.5 V, 6.7 h".
- Reveal payoff (draft, 74 words): "Side by side, your voltmeter read 1.5 V, the same as one battery. The bulb glowed as brightly as with one, but for 13.3 hours instead of 6.7. End to end it read 3.0 V: the bulb drew twice the current at twice the voltage, four times the power, and lasted only 3.3 hours. Each battery lifts charge through 1.5 V. In a row the lifts add; side by side they share the work."
- Phone fit: one circuit band with the readouts as labels.
- Stage word budget: controls "Side by side", "End to end", "One" = 7; first cell's arrow "lifts 1.5 V" = 2; voltmeter "1.5 V" = 1; Seen row "side by side: 1.5 V, 13.3 h · end to end: 3.0 V, 3.3 h · one: 6.7 h" = 12; caption "Ideal cells, 2,000 mAh." = 3. **Total 25, at the limit** (17 if spaced units count 0). No other stage word: no "battery", "bulb" or "voltmeter" labels (the symbols and alt text name them). Any added word is a stop.
- Planned claims:
  1. Cell voltages in series add; identical cells in parallel keep one cell's voltage (Kirchhoff's voltage law). support: derivation; source: Halliday, Resnick and Walker, chapter on circuits.
  2. With a 5 Ω bulb: 0.3 A and 0.45 W at 1.5 V; 0.6 A and 1.8 W at 3.0 V. support: arithmetic (I = V/R, P = VI); source: check.mjs.
  3. Run times 6.7 h, 13.3 h and 3.3 h from 2,000 mAh per cell. support: arithmetic; source: check.mjs. The capacity is stated on the stage (caption "Ideal cells, 2,000 mAh.") and is illustrative: real AA capacity falls at higher current. Say so in this claim's idealisations.
  4. Idealisations stated: identical ideal cells with no internal resistance, and a constant-resistance bulb (a real filament's resistance rises as it heats).
- Recall: "A toy needs 3 V. You have two 1.5 V cells. How must they go in?" (End to end, plus to minus.)
- curriculum: `{"primary":"physics:cells-series-parallel","also":["physics:series-parallel"],"prerequisites":["physics:series-parallel"],"level":"core","strand":"electricity","tags":["batteries","voltage","circuits"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: add-a-parallel-bulb puts loads in parallel, not sources. chemistry potassium-battery and galvanic-cell-voltage teach where a cell's voltage comes from. lifehacks battery-partial-charging is charging habits. None teaches combining cells.

### 65. clap-at-the-cliff · concept: echo-round-trip · intro · demand 2 · format: Single card
- Strand: waves (sound).
- Learner knows: sound takes time to travel (count-the-thunder); echoes bounce off walls. / does not know: that an echo's delay covers the trip there and back, so the distance is half of speed × time.
- Misconception: An echo 1 s later means the cliff is 343 m away (one sound-second).
- Prediction: "You clap facing a cliff and hear the echo 1.0 s later. Sound travels 343 m each second. The cliff is about..." options: A. 170 m away / B. 340 m away / C. 690 m away (answer: A).
- Check: c = sqrt(γRT/M) = 343.2 m/s at 20 °C. Echo time = 2d/c: 85 m gives 0.50 s, 170 m gives 0.99 s, 340 m gives 1.98 s. A 1.0 s echo means 171.5 m.
- What the stage shows: one side-view band with a person and a cliff. A sound pulse travels out and back (replayed in ≤ 400 ms, reporting simulated seconds). A path readout, "sound travelled 340 m", stands for the cause: the round trip.
- Controls (DOM order): 1. "85 m: clap" → echo 0.50 s (milestone 1). 2. "170 m: clap" → echo 0.99 s, path 340 m (milestone 2, the question's case). 3. "340 m: clap" → echo 1.98 s, path 680 m (milestone 3). (r3 trim: "Cliff at" dropped from each control. The cliff in the picture carries its distance.)
- Seen row: "85 m: 0.50 s · 170 m: 0.99 s · 340 m: 1.98 s".
- Reveal payoff (draft, 70 words): "With the cliff 170 m away, your echo came back after 0.99 s, close to the 1.0 s in the question. At 340 m it took 1.98 s. The clap has to reach the cliff and come back, so in 1 s the sound covered 343 m in total: half out, half back. The distance to a cliff is the speed of sound times the echo time, divided by two."
- Phone fit: one band with readouts on the cliff; one Seen row.
- Stage word budget: controls "85 m: clap", "170 m: clap", "340 m: clap" = 6; cliff distance "340 m" = 1; echo readout "echo 1.98 s" = 2; path readout "sound travelled 680 m" = 3; Seen row "85 m: 0.50 s · 170 m: 0.99 s · 340 m: 1.98 s" = 6; caption "Still air, 20 °C." = 3. **Total 21** (8 if spaced units count 0).
- Planned claims:
  1. The speed of sound in air is c = sqrt(γRT/M), about 343 m/s at 20 °C. support: derivation; source: check.mjs; Halliday, Resnick and Walker, chapter on sound waves.
  2. Echo delay is 2d/c: 0.50 s, 0.99 s and 1.98 s for 85, 170 and 340 m; a 1.0 s echo means about 171 m. support: arithmetic; source: check.mjs.
  3. Idealisations stated: still air at 20 °C, a flat cliff face, no reaction time.
- Recall: "A ship's sonar ping returns from the seabed after 2 s; sound in sea water travels 1,500 m/s. How deep is it?" (1,500 m.)
- curriculum: `{"primary":"physics:echo-round-trip","also":["physics:sound-vs-light-delay"],"prerequisites":["physics:sound-vs-light-delay"],"level":"intro","strand":"waves","tags":["sound","echo","speed"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: count-the-thunder teaches a one-way delay between light and sound. sound-in-the-jar teaches that sound needs a medium. None teaches the round-trip halving.

### 66. scale-on-a-slope · concept: normal-force-incline · core · demand 2 · format: Single card
- Strand: mechanics.
- Learner knows: a bathroom scale reads your weight on the floor; elevator-scale (apparent weight). / does not know: that a scale measures only the push straight into its surface, which on a slope is m g cos θ. The rest of your weight pulls you along the slope and is held by friction.
- Misconception: A scale always reads your full weight, whatever it is resting on.
- Prediction: "On flat ground your bathroom scale reads 70 kg. You stand on it on a 30° ramp, not slipping. It reads about..." options: A. 35 kg / B. 61 kg / C. 70 kg (answer: B).
- Check: reading = m cos θ (the scale shows N/g in kg). At 0° it reads 70.0 kg, at 30° 60.6 kg, at 60° 35.0 kg. Friction needed is m g sin θ = 343 N at 30° (μ ≥ 0.58). At 60°, μ ≥ 1.73, so the scale is drawn against a rubber stop block (labelled).
- What the stage shows: one ramp with a person on a scale. The weight arrow is split into "into the ramp" and "along the ramp" parts; the "into the ramp" arrow is the cause, and the scale shows its value. The stage starts on the flat at 70 kg, with that chip shown active and disabled.
- Controls (DOM order): 1. "Tilt 30°" → 60.6 kg (milestone 1, the question's case). 2. "Tilt 60°" → 35.0 kg, stop block shown (milestone 2). 3. "Back to flat" → 70.0 kg (milestone 3).
- Seen row: "30°: 60.6 kg · 60°: 35.0 kg · flat: 70.0 kg".
- Reveal payoff (draft, 69 words): "On the 30° ramp your scale read 60.6 kg, and at 60° only 35.0 kg, though you still weighed 70 kg. A scale measures only the push straight into its surface. On a slope your weight splits in two: part presses into the scale (the arrow into the ramp), and part pulls you down the slope, held by friction. The steeper the slope, the smaller the push into it."
- Phone fit: one ramp picture with the arrow labels; one Seen row.
- Stage word budget: controls "Tilt 30°", "Tilt 60°", "Back to flat" = 5; scale readout "35.0 kg" = 1; arrows "into the ramp", "along the ramp" = 6; stop label (60° only) "stop block" = 2; Seen row "30°: 60.6 kg · 60°: 35.0 kg · flat: 70.0 kg" = 4; caption "At rest, not slipping." = 4. **Total 22** (18 if spaced units count 0). No trim needed. The weight arrow itself carries no word ("weight" would make 23).
- Planned claims:
  1. On a slope the normal force is N = m g cos θ, and the along-slope part m g sin θ is balanced by friction (or a stop). support: derivation; source: Halliday, Resnick and Walker, chapter on Newton's laws (inclined planes); check.mjs.
  2. 70 kg reads 60.6 kg at 30° and 35.0 kg at 60°. support: arithmetic; source: check.mjs.
  3. A bathroom scale measures the force perpendicular to its platform. support: textbook (a spring or load cell under the platform); idealisation stated.
  4. Idealisations stated: a rigid scale that measures only the perpendicular force, the person at rest, a stop block at 60°.
- Recall: "A crate rests on a steep ramp. Is the ramp pushing up on it with more, less or the same force as its weight?" (Less.)
- curriculum: `{"primary":"physics:normal-force-incline","also":["physics:force-vectors-add"],"prerequisites":["physics:apparent-weight"],"level":"core","strand":"mechanics","tags":["forces","normal force","slopes"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: elevator-scale changes the reading through acceleration. ramp-same-work is about work along a slope. two-tugs-right-angle adds vectors. None splits weight into components to explain a scale reading.

### 67. longest-drinking-straw · concept: atmospheric-pressure-push · core · demand 2 · format: Single card
- Strand: mechanics (fluids).
- Learner knows: you drink through a straw by sucking; pressure grows with depth (dam-depth-not-width). / does not know: that suction does not pull. The air pressing on the open water pushes it up the straw, and that push can hold only about 10 m of water.
- Misconception: With a strong enough pump you can suck water up a straw of any height.
- Prediction: "A perfect pump sucks on a very tall straw standing in water at sea level. Water can rise up the straw by at most..." options: A. About 1 m / B. About 10 m / C. Any height, with enough pull (answer: B).
- Check: h = (P_atm − P_vapour)/(ρ g). At sea level (101,325 Pa, water at 20 °C with vapour pressure 2,339 Pa) h = 10.11 m; ignoring vapour it is 10.35 m. On the summit of Everest (about 33,700 Pa) h = 3.20 m.
- What the stage shows: a glass with a tall straw against a 0–14 m height scale (labels ≥ 10 px) and a pump at the top. Down-arrows of air pressure press on the open water in the glass; they are the cause. When the column stops, the empty space above it is labelled "no air", and the arrows are labelled "air pushes" (r3 trim: was "no air: nothing to push"; the two labels now carry the contrast).
- Controls (DOM order): 1. "5 m straw" → the pump runs and the water reaches the top (milestone 1). 2. "12 m straw" → the column stops at 10.1 m with a gap above (milestone 2, the question's case). 3. "On Everest" → the same 12 m straw; the column falls to 3.2 m and the air arrows thin (milestone 3). (r3 trim: ": pump" and "Same," dropped from the controls. The pump is drawn but not labelled, and the caption names it.)
- Seen row: "5 m: top · 12 m: stops at 10.1 m · Everest: 3.2 m". (r3 trim: was "5 m: reaches top".)
- Reveal payoff (draft, 77 words): "In your 5 m straw the water reached the top, but in the 12 m straw it stopped at 10.1 m, with empty space above, however hard the pump worked. Suction does not pull water. The pump only removes air from the straw; the air pressing on the water in the glass pushes it up, and that push can hold up only about 10 m of water. On Everest, under thinner air, it held just 3.2 m."
- Phone fit: the tall straw is drawn compressed against its scale, in one picture; the heights are labels on the scale.
- Stage word budget: controls "5 m straw", "12 m straw", "On Everest" = 6; height scale unit "m" (once; tick numerals 0) = 1; air arrows "air pushes" = 2; gap label "no air" = 2; column readout "3.2 m" = 1; Seen row "5 m: top · 12 m: stops at 10.1 m · Everest: 3.2 m" = 8; caption "Perfect pump, 20 °C water." = 4. **Total 24** (15 if spaced units count 0). Before the trim it was about 30. A "pump" label would make 25.
- Planned claims:
  1. A column of liquid held by a pressure difference ΔP has height h = ΔP/(ρ g). support: derivation (hydrostatics); source: Halliday, Resnick and Walker, chapter on fluids; check.mjs.
  2. Standard sea-level pressure is 101,325 Pa; water's vapour pressure at 20 °C is about 2.34 kPa. support: textbook tables; source: CRC Handbook (vapour pressure of water). The column reaches 10.1 m (10.3 m ignoring vapour).
  3. Air pressure on the summit of Everest is about 33.7 kPa, giving 3.2 m. support: citation; source: West, J. B., "Barometric pressures on Mt. Everest", *J. Appl. Physiol.* 86 (1999). Cross-check: an isothermal atmosphere model (scale height about 7.4 km) gives about 31 kPa, also "about 3 m".
  4. Suction is air pressure pushing into a region of lower pressure; a pump cannot pull on water. support: derivation; source: same fluids chapter.
  5. Idealisations stated: a perfect pump, water at 20 °C, a rigid straw, no dissolved gas coming out.
- Recall: "Why can't a pump at the top of a 15 m well lift water, while one at the bottom can?" (Air can push water up only about 10 m; a pump at the bottom pushes.)
- curriculum: `{"primary":"physics:atmospheric-pressure-push","also":["physics:fluid-pressure-depth"],"prerequisites":["physics:fluid-pressure-depth"],"level":"core","strand":"mechanics","tags":["pressure","fluids","atmosphere"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: dam-depth-not-width teaches that pressure depends on depth, not width. snowshoe-pressure teaches force over area. sound-in-the-jar uses a vacuum for sound. None teaches that air pressure, not suction, lifts the liquid.

### 68. power-line-voltage-loss · concept: transmission-voltage-loss · core · demand 2 · format: Single card
- Strand: electricity.
- Learner knows: P = V I (toaster-trips-breaker); wires have resistance (wire-eight-times). / does not know: that cable heating goes as I²R, so delivering the same power at 10× the voltage needs a tenth of the current and wastes a hundredth of the heat.
- Misconception: Higher voltage on a power line means more energy wasted (or makes no difference).
- Prediction: "A village draws the same 10 kW through the same cable. Send it at 10 times the voltage. The cable's heat loss becomes..." options: A. 10 times more / B. About the same / C. 100 times less (answer: C).
- Check: 10 kW through a cable of 0.5 Ω in total. At 230 V: 43.48 A, 945 W lost (9.5%). At 2,300 V: 4.35 A, 9.45 W (0.09%). At 23,000 V: 0.43 A, 0.09 W.
- What the stage shows: a station, one cable and a village. The cable's glow follows the heat loss, with readouts for current and watts lost. Moving dots in the cable stand for the current, the cause: fewer dots means less heating. No voltage is picked at first, the cable is dark, and the readouts show "–".
- Controls (DOM order): 1. "230 V" → 43.5 A, 945 W lost (milestone 1). 2. "2,300 V" → 4.35 A, 9.5 W lost (milestone 2, the question's case). 3. "23,000 V" → 0.43 A, 0.09 W lost (milestone 3). (r3 trim: "Send at" dropped from each control. The chips sit on the station, which makes the action plain.)
- Seen row: "230 V: 43.5 A, 945 W · 2,300 V: 4.35 A, 9.5 W · 23,000 V: 0.09 W".
- Reveal payoff (draft, 77 words): "At 230 V your cable carried 43.5 A and wasted 945 W as heat. At 2,300 V the same 10 kW needed only 4.35 A, and the cable wasted 9.5 W: 100 times less. Power is voltage times current, so a higher voltage delivers the same power with less current. Cable heating goes as current squared, so a tenth of the current wastes a hundredth of the heat. That is why long-distance lines run at high voltage."
- Phone fit: one horizontal band; readouts sit on the cable.
- Stage word budget: controls "230 V", "2,300 V", "23,000 V" = 3; picture labels "station", "village", "10 kW" = 3; cable readouts "0.43 A", "0.09 W lost" = 3; Seen row "230 V: 43.5 A, 945 W · 2,300 V: 4.35 A, 9.5 W · 23,000 V: 0.09 W" = 8; caption "Cable 0.5 Ω, values illustrative." = 4. **Total 21** (6 if spaced units count 0). The initial "–" readouts count 0.
- Planned claims:
  1. Delivered power P = V I, so I = P/V for a fixed power. support: derivation; source: Halliday, Resnick and Walker, chapter on current and resistance.
  2. Power lost in a cable is I² R. support: derivation (Joule heating); source: same.
  3. 945 W, 9.45 W and 0.09 W at 230, 2,300 and 23,000 V for 10 kW through 0.5 Ω. support: arithmetic; source: check.mjs.
  4. Long-distance power lines run at high voltage (tens to hundreds of kilovolts) to cut these losses, with transformers stepping the voltage up and down. support: textbook; source: same text, chapter on AC circuits / transformers.
  5. Idealisations stated: a resistive load, current computed at the village voltage (the cable's own voltage drop ignored), ideal transformers, values illustrative.
- Recall: "Why do power companies step voltage up before sending electricity across the country?" (Less current for the same power, and the losses go as current squared.)
- curriculum: `{"primary":"physics:transmission-voltage-loss","also":["physics:electric-power-vi","physics:wire-resistance"],"prerequisites":["physics:electric-power-vi"],"level":"core","strand":"electricity","tags":["power","transmission","resistance"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: toaster-trips-breaker teaches P = V I in a home circuit. wire-eight-times teaches how resistance scales with a wire's shape. bird-on-the-wire is potential difference. None teaches the I²R reason for high-voltage transmission.

### 69. cover-half-the-lens · concept: lens-whole-image · core · demand 2 · format: Single card
- Strand: waves (light).
- Learner knows: a magnifying lens can project an image onto paper; pinhole-flips-the-world. / does not know: that every point of the object sends light through the whole lens, so covering part of the lens dims the whole image without cutting any of it away.
- Misconception: Covering the top half of a lens removes half of the image.
- Prediction: "A lens casts a sharp image of a candle onto a screen. You cover the lens's top half with card. The image now..." options: A. Loses its top half / B. Loses its bottom half / C. Stays whole, but dimmer (answer: C).
- Check: thin lens, f = 10 cm, a 2 cm candle 30 cm away: image at 15 cm, magnification −0.5 (1 cm, inverted). The ray trace in check.mjs, with 20 rays per object point across the aperture, puts every ray from a point on the same image point whether the top half is covered or not. Brightness equals the open fraction: 100%, 50% for either half, 10% for a slit.
- What the stage shows: candle, lens and screen in one band. Three rays from the flame tip and three from the base are drawn (the cause): each point's rays spread over the whole lens and meet again on the screen. A brightness readout sits on the screen.
- Controls (DOM order): 1. "Cover top half" → the top rays stop at the card; the image stays whole, 50% (milestone 1, the question's case). 2. "Cover bottom half" → whole, 50% (milestone 2). 3. "Thin slit" → whole, 10% (milestone 3). (r3 trim: was "Leave a thin slit".)
- Seen row: "top covered: whole, 50% · bottom covered: whole, 50% · slit: whole, 10%".
- Reveal payoff (draft, 75 words): "With the top half covered, your candle's image stayed whole and upside down at 50% brightness. Covering the bottom half did the same, and a thin slit still gave the whole image at 10%. Every point of the flame sends light through every part of the lens, and the lens bends all of it to the same image point. Covering part of the lens removes some of each point's light, not part of the picture."
- Phone fit: one optical band, with a ray count of ≤ 6 so the lines stay readable at 390 px.
- Stage word budget: controls "Cover top half", "Cover bottom half", "Thin slit" = 8; picture labels "candle", "lens", "screen" = 3; screen readout "brightness 10%" = 1; Seen row "top covered: whole, 50% · bottom covered: whole, 50% · slit: whole, 10%" = 8; caption "Ideal thin lens." = 3. **Total 23** (no spaced units). The card is drawn, not labelled.
- Planned claims:
  1. Thin-lens equation 1/f = 1/u + 1/v: v = 15 cm and m = −0.5 for f = 10 cm, u = 30 cm. support: derivation; source: Hecht, *Optics*, chapter on geometrical optics; check.mjs.
  2. For an ideal lens, every ray from an object point that passes through the lens meets at one image point, wherever it crosses the lens. support: simulation (paraxial ray trace); source: check.mjs.
  3. Image brightness scales with the open area of the lens: 50% for half, 10% for the slit. support: derivation; source: same chapter (aperture and irradiance).
  4. Idealisations stated: an ideal thin lens with no aberrations, uniform brightness across the aperture, the card right at the lens.
- Recall: "A fly lands on the middle of a projector lens. What happens on the screen?" (The whole picture dims slightly; no fly-shaped hole.)
- curriculum: `{"primary":"physics:lens-whole-image","also":["physics:pinhole-images"],"prerequisites":["physics:pinhole-images"],"level":"core","strand":"waves","tags":["light","lenses","images"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: pinhole-flips-the-world forms an image by letting one ray per point through. Here a wider opening is just brighter, the same image. mirror-half-height is about mirror size. None covers part of a lens.

### 70. third-polariser · concept: polariser-third-filter · stretch · demand 1 · format: Single card
- Strand: waves (light).
- Learner knows: polarised sunglasses cut glare; two crossed polarising filters look black. / does not know: that a polariser passes the part of the light lined up with it and re-aims it, so a third filter at 45° between crossed ones lets light through.
- Misconception: Adding a filter can only block more light, so a third filter between two crossed ones keeps everything dark.
- Prediction: "Two polarising filters, crossed at 90°, let no light through. You slide a third filter between them, at 45°. Now..." options: A. Still no light gets through / B. Some light gets through / C. As bright as with no filters (answer: B).
- Check: unpolarised light drops to 1/2 at the first filter; then Malus's law I = I₀ cos² θ applies. Crossed pair alone: 0%. Middle filter at 45°: 0.5 × cos² 45° × cos² 45° = 12.5%. At 30°: 0.5 × 0.75 × 0.25 = 9.4%.
- What the stage shows: a lamp, filter 1 (0°), a middle slot, filter 3 (90°) and a light meter in one band. Between the filters a short double-headed line shows the light's direction of vibration, with length following its strength (the cause): the middle filter turns it, so some lines up with the last filter. The middle slot starts empty and the meter reads 0%.
- Controls (DOM order): 1. "Insert middle at 45°" → 12.5% (milestone 1, the question's case). 2. "Turn middle to 30°" → 9.4% (milestone 2). 3. "Remove middle" → 0% (milestone 3).
- Seen row: "45°: 12.5% · 30°: 9.4% · removed: 0%".
- Reveal payoff (draft, 69 words): "With only the crossed pair, your meter read 0%. Sliding in the middle filter at 45° raised it to 12.5%, and at 30° it read 9.4%. A filter does not just block: it passes the part of the light lined up with it, turned to its own direction. The first filter passes half; the 45° filter passes half of that, now tilted; the last passes half again: one eighth."
- Phone fit: one band; the vibration lines are labels inside it.
- Stage word budget: controls "Insert middle at 45°", "Turn middle to 30°", "Remove middle" = 8; picture labels "lamp", "meter" = 2; meter readout "0%" and the filter angles "0°", "90°", "45°" = 0; Seen row "45°: 12.5% · 30°: 9.4% · removed: 0%" = 1; caption "Ideal filters, unpolarised lamp." = 4. **Total 15** (no spaced units). Room for "filter" labels if the builder wants them (3 more, 18).
- Planned claims:
  1. An ideal polariser passes half of unpolarised light, and polarised light at angle θ to it is passed as I₀ cos² θ (Malus's law), leaving along the filter's own axis. support: textbook + derivation (projecting the electric field; intensity ∝ E²); source: Hecht, *Optics*, chapter on polarisation.
  2. 0%, 12.5% and 9.4% for no middle filter, 45° and 30°. support: arithmetic; source: check.mjs.
  3. Idealisations stated: ideal polarisers (real ones pass a little less than half), an unpolarised lamp.
- Recall: "Can adding a third filter ever let more light through two others? When?" (Yes, when it sits between crossed polarisers at an angle.)
- curriculum: `{"primary":"physics:polariser-third-filter","also":[],"prerequisites":[],"level":"stretch","strand":"waves","tags":["light","polarisation"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: red-apple-green-light (colour-filters) teaches filtering by colour (absorption). No lesson teaches polarisation.
