"use client";
import { StudyLesson as Lesson } from "@/components/lifehacks/StudyLesson";
import { study_project_prefix_filenames } from "@/lib/lifehacks/studyCatalog";
// The shared stage renders <Control> and <Slider>, locked until prediction.
export default function Demo({ slug }: { slug: string }) {
  return <Lesson slug={slug} spec={study_project_prefix_filenames} />;
}
