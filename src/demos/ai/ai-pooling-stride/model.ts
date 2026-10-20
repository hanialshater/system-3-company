// Declared finite construction; pure operations, no training or external service.
export function compute(mode: number) { const input = mode === 3 ? [9, 1] : [1, 9, 2, 3, 8], offset = mode === 1 ? 1 : 0, stride = mode === 2 ? 1 : 2; const windows: number[][] = [], output: number[] = []; for (let i = offset; i + 1 < input.length; i += stride) {
    windows.push([i, i + 1]);
    output.push(Math.max(input[i], input[i + 1]));
} const swapped = mode === 3 ? [1, 9] : []; return { input, offset, stride, windows, output, swapped, snapshot: mode === 3 ? '[9,1]→9; [1,9]→9' : `o${offset} s${stride}: ` + windows.map(w => `[${w.map(i => input[i])}]`).join(' ') + '→[' + output + ']' }; }
