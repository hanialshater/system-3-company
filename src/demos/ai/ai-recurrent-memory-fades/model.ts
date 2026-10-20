// Declared finite construction; pure operations, no training or external service.
export function compute(mode: number) { const multiplier = [.5, 1, 1.2][mode], values = [1]; for (let t = 1; t <= 4; t++)
    values.push(values[t - 1] * multiplier); return { multiplier, values, sensitivity: multiplier ** 4, snapshot: `×${multiplier}: h₄=${Number(values[4].toFixed(4))}; ∂=${Number((multiplier ** 4).toFixed(4))}` }; }
