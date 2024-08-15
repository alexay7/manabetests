import { ExamSectionExerciseCorrected } from "@/types/exam";
import { Exercise } from "@/types/exercises";

export type Result = {
    level:Exercise["level"];
    strict:boolean;
    vocab:{
        points:number;
        goodExercises:number;
        exercises:number;
        questions?:ExamSectionExerciseCorrected[]
    },
    grammar:{
        points:number;
        goodExercises:number;
        exercises:number;
        questions?:ExamSectionExerciseCorrected[]
    },
    reading:{
        points:number;
        goodExercises:number;
        exercises:number;
        questions?:ExamSectionExerciseCorrected[]
    },
    listening:{
        points:number;
        goodExercises:number;
        exercises:number;
        questions?:ExamSectionExerciseCorrected[]
    },
}