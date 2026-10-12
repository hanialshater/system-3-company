# Build note: pesticide-paradox (demo-builder, 2026-10-12)

- Design: a time series of pests and predators (RK4 Lotka-Volterra, a=b=c=d=1), with a dashed long-run pest average and a ghost line for the no-spray average. Averages are computed numerically over 600 months.
- Reveal gate: spray strength of at least 20%. Wording change: the slider is a 'strength' (extra death rate per month), not '% killed', because at 60% the share actually killed is about 45%.
- After screenshots (all): stage SVG capped at 27dvh and the lesson body set to not shrink, because readouts were clipped or text overlapped on the phone; long readout labels shortened so they stay on one line.
