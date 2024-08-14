import { pointsPerExercise } from './../helpers/exercises';
import { Exercise, ExerciseGroup } from "./exercises";

export type Exam = {
    sections:Record<number,{
        title:string;
        index:number;
        questions:ExamCategoryQuestions[];
        answers:Record<string,number>;
        time:number;
    }>;
    gradingSections:Record<number,{
        time:number;
        answers:Record<string,number>;
    }>;
    level:Exercise["level"];
}

export type ExamCategoryQuestions = {
    type: Exercise["type"];
    category: Exercise["category"];
    exercises: (Exercise|ExerciseGroup)[];
}

export type ExamSectionAnswers = {
    section: string;
    answers: (
        {
        questionId: string;
        type:"extra";
        answer: Record<number,number>;
    }|{
        questionId: string;
        type:"normal";
        answer: number;
    }
)[]
}

export type ExamSectionExerciseCorrected = {
    type:keyof typeof pointsPerExercise["N1"];
    questionId:string,
    correct:boolean,
    points:number,
    explanation?:string
}

export type ExamSectionCorrected ={
    corrections:ExamSectionExerciseCorrected[],
    section:string,
}