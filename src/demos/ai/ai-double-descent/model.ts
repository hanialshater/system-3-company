import data from './fixture.json';
export const fixture=data;
const dot=(a:number[],b:number[])=>b.reduce((sum,w,j)=>sum+w*a[j],0);
export function run(mode:number){const clean=mode===2;return data.widths.map(r=>{const w=clean?r.noiselessWeights:r.weights;const trainY=clean?data.trainX.map(x=>dot(x,data.beta)):data.trainY;const mse=(x:number[][],y:number[])=>x.reduce((s,row,i)=>s+(dot(row,w)-y[i])**2,0)/x.length;return {k:r.k,train:mse(data.trainX,trainY),test:mse(data.testX,data.testY)};});}
