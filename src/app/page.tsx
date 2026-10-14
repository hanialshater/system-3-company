import { Feed } from "@/components/Feed";
import { domains, visibleDemos } from "@/lib/catalog";
import { feedPage } from "@/lib/feed-index";

// EDD-001 options 2+3: the HTML carries the first page of the slim index, not every lesson's meta.
export default function Home() {
  const demos = visibleDemos();
  const counts: Record<string, number> = { all: demos.length };
  for (const d of demos) counts[d.domain] = (counts[d.domain] ?? 0) + 1;
  return <Feed first={feedPage("all", 0)} counts={counts} domains={domains.filter((d) => counts[d.id])} />;
}
