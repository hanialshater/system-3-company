"use client";
import { StudyLesson as Lesson } from "@/components/lifehacks/StudyLesson";
import { study_size_is_not_recency } from "@/lib/lifehacks/studyCatalog";
// The shared stage renders <Control> and <Slider>, locked until prediction.
export default function Demo({ slug }: { slug: string }) {
  return <Lesson slug={slug} spec={study_size_is_not_recency} />;
}
