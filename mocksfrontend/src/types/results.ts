import { Exercise } from "@/types/exercises";

export type Result = {
    level:Exercise["level"];
    strict:boolean;
    vocab:{
        points:number;
        goodExercises:number;
        exercises:number;
    },
    grammar:{
        points:number;
        goodExercises:number;
        exercises:number;
    },
    reading:{
        points:number;
        goodExercises:number;
        exercises:number;
    },
    listening:{
        points:number;
        goodExercises:number;
        exercises:number;
    },
}