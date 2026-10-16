"use client";

import Lesson from "@/components/books/BookIdeaLesson";
import idea from "./idea.json";

// The shared stage renders <Control> buttons, locked until prediction.
export default function Demo({ slug }: { slug: string }) {
  return <Lesson slug={slug} idea={idea} />;
}
