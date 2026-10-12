import { Feed } from "@/components/Feed";
import { domains, visibleDemos } from "@/lib/catalog";

export default function Home() {
  const demos = visibleDemos();
  const used = new Set<string>(demos.map((d) => d.domain));
  return <Feed demos={demos} domains={domains.filter((d) => used.has(d.id))} />;
}
