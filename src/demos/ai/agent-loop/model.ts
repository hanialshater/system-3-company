export function trace(jammed:boolean):string[]{return jammed?['closed → open','jammed → help','help requested → stop']:['closed → open','open → read','ticket 6 → stop'];}
