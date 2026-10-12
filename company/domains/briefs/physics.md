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
