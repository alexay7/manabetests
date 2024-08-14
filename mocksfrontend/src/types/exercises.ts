
type BaseExercise = {
  time: number;
    level: "N5"| "N4" | "N3" | "N2" | "N1";
    year?: number;
    period?: "Julio"|"Diciembre";
    type: "parafrases"|"gramaticafrases"|"contexto"|"uso"|"ordenar"|"kanji"|"formacion"|"ortografia"|"gramaticatexto"|"textoscortos"|"textosmedios"|"textoslargos"|"textosintegrados"|"textostematicos"|"textosinformacion"|"tareas"|"puntosclave"|"comprensiongeneral"|"expresiones"|"respuestarapida"|"comprensionintegrada";
    category:"gramatica"|"vocabulario"|"reading"| "listening";
    explanation?: string;
    typePosition?: number;
    image?:string;
    audio?:string;
}
export type Exercise = {
    _id: string;
    index: number;
    question: string;
    answers: string[];
    correct: number;
  } & BaseExercise;

export type ExerciseGroup = {
    _id: string;
    statement:string;
    questions:Exercise[];
  } & BaseExercise;