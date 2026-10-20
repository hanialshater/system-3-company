export const input=[1,2,0,1] as const; export function correlate(first:1|2):number[]{return [0,1,2].map(i=>first*input[i]-input[i+1]);}
