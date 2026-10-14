"use client";
import { AlphabetSearchLesson as Lesson } from "@/components/lifehacks/AlphabetSearchLesson";
// The shared search stage implements locked <Control> and <Slider> operations.
export default function Demo({slug}:{slug:string}) {return <Lesson slug={slug}/>;}
