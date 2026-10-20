export function update(action:number,g:number,eta=.5){const old=[.5,.5],grad=old.map((p,i)=>(i===action?1:0)-p),delta=grad.map(v=>eta*g*v),e=delta.map(Math.exp),p=e.map(v=>v/(e[0]+e[1]));return {action,g,grad,delta,p};}
export function run(mode:number){return update(mode===3?1:0,[2,0,-2,2][mode]);}
