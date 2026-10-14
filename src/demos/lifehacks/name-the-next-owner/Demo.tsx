"use client";
import { StudyLesson as Lesson } from "@/components/lifehacks/StudyLesson";
import { study_name_the_next_owner } from "@/lib/lifehacks/studyCatalog";
// The shared stage renders <Control> and <Slider>, locked until prediction.
export default function Demo({ slug }: { slug: string }) {
  return <Lesson slug={slug} spec={study_name_the_next_owner} />;
}
