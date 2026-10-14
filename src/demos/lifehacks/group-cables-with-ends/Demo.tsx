"use client";

import { Lesson } from "@/kit/Lesson";
import { Controls, useHomeLesson } from "@/components/lifehacks/HomeLesson";

export default function Demo({ slug }: { slug: string }) {
  const { lessonProps, stage } = useHomeLesson(slug);
  return <Lesson {...lessonProps}>{(context) => <Controls {...stage} {...context} />}</Lesson>;
}
