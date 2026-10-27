import { LessonsWorld } from "@/components/world/LessonsWorld";
import { worldCatalog } from "@/lib/world-catalog";

export const metadata = { title: "Your world of ideas — System 3", description: "Explore every lesson along a world of illustrated islands." };
export default function WorldPage() { return <LessonsWorld islands={worldCatalog()} />; }
