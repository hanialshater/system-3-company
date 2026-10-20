// Declared finite construction; pure operations, no training or external service.
export function compute(mode: number) { const identity = mode === 0 ? 0 : 1, branch = mode === 2 ? -1 : .1, multiplier = identity + branch, values = [1]; for (let i = 0; i < 3; i++)
    values.push(values[i] * multiplier); return { identity, branch, multiplier, values, sensitivity: multiplier ** 3, snapshot: `${identity}+(${branch}) → ∂=${Number((multiplier ** 3).toFixed(3))}` }; }
