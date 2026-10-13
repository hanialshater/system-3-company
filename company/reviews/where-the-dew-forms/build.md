# Build note: where-the-dew-forms
- Brief 38. Title "When does the dew appear?" (the slug's "where" read oddly as a title; slug kept).
- Key state: milestone `dew-point`, a temperature within 1 °C below the dew point (18.45 °C, Magnus). At 18 °C the marker reaches the curve, fullness 100%, and the first drop appears. 25 °C (67%, no dew) and 10 °C (lots of dew, already well past the first dew) do not unlock, so the "it was 10" wrong path stays locked. DOM order: 25, 18, 10 buttons, then the slider (step 0.5 °C, so 18.0 is the first slider step with dew).
- "Vapour pressure" is never named. The curve is labelled "full" (the most vapour that can stay vapour) and the flat line "your air"; the axis says "water vapour, kPa". Relative humidity is glossed in the question as "% full".
- Every number (4.24 kPa, 2.12 kPa, 18 °C) comes from the es() function that draws the curve; the 18 °C option is floor(TD).
- Locked stage: 30 °C, 50% full, no dew point shown.
- After screenshots: removed a duplicate "Air °C" readout (the slider already shows it).
