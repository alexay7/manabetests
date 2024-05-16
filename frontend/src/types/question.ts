export interface Question {
    _id:string,
    question:string,
    answers:string[],
    correct:number,
    explanation:string,
    type:string
}