export function WorldIcon({ name, className }: { name: "arrow" | "feed" | "expand" | "close" | "reset" | "plus" | "minus"; className?: string }) {
  const path = { arrow: "M6 18 18 6M6 6h12v12", feed: "M4 12h16M13 5l7 7-7 7", expand: "M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5", close: "m6 6 12 12M6 18 18 6", reset: "M4 11a8 8 0 1 1 2 7M4 5v6h6", plus: "M5 12h14M12 5v14", minus: "M5 12h14" }[name];
  return <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={path}/></svg>;
}
