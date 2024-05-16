export interface QuestionParams {
    year?:number,
    period?:string,
    timer?:boolean,
    category?:string,
    sections?:string[],
    questionNum?:number,
    level?:string,
    type?:"normal" | "retry" | "real" | "exercises",
    skip?:number,
    wrongs?:string[]
}