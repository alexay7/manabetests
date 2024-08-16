import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useResultsStore } from "@/stores/results";
import { Result } from "@/types/results";
import React, { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function Results(): React.ReactElement {
    const navigate = useNavigate()

    const { results } = useResultsStore()

    const [answersOpen, setAnswersOpen] = useState(false)
    const [chosenTest, setChosenTest] = useState<Result | undefined>(undefined)

    useEffect(() => {
        if (results.length > 0) {
            // Choose the last test
            setChosenTest(results[results.length - 1])
        }
    }, [results])

    function formatGradeCats(percent: number) {
        return percent > 67 ? "A" : percent > 34 ? "B" : "C"
    }

    function getResultsWidth(level: Result["level"], index: number) {
        if (["N5", "N4"].includes(level)) {
            if (index === 0) return "66%"
            return "33%"
        }
        return "33%"
    }

    function getResultsLabel(level: Result["level"], index: number) {
        if (["N5", "N4"].includes(level)) {
            if (index === 0) return {
                jp: "文字・語彙・文法・読解",
                en: "Vocabulario/Gramática/Lectura",
                maxPoints: 120
            }
            return {
                jp: "聴解",
                en: "Escucha",
                maxPoints: 60
            }
        }

        return {
            jp: ["文字・語彙・文法", "読解", "聴解"][index],
            en: ["Vocabulario/Gramática", "Lectura", "Escucha"][index],
            maxPoints: 60
        }
    }

    function getGradeColor(grade: number, level: Result["level"], index: number) {
        // Puntuaciones totales de cada nivel
        if (index === -1) {
            switch (level) {
                case "N5": return grade < 80 ? "#ff8000" : "#5cb85c"
                case "N4": return grade < 90 ? "#ff8000" : "#5cb85c"
                case "N3": return grade < 95 ? "#ff8000" : "#5cb85c"
                case "N2": return grade < 90 ? "#ff8000" : "#5cb85c"
                case "N1": return grade < 100 ? "#ff8000" : "#5cb85c"
            }
        }

        if (["N5", "N4"].includes(level)) {
            if (index === 0) {
                return grade < 38 ? "#ff8000" : "#5cb85c"
            }
            return grade < 19 ? "#ff8000" : "#5cb85c"
        }
        return grade < 19 ? "#ff8000" : "#5cb85c"
    }

    function checkPassFail(topCats: number[], level: Result["level"]) {
        // False es suspender, true es aprobar

        const totalPoints = topCats.reduce((acc, points) => acc + points, 0)

        // Primero comprobar si no llega al aprobado por nivel
        switch (level) {
            case "N5": if (totalPoints < 80) return false; break;
            case "N4": if (totalPoints < 90) return false; break;
            case "N3": if (totalPoints < 95) return false; break;
            case "N2": if (totalPoints < 90) return false; break;
            case "N1": if (totalPoints < 100) return false; break;
        }

        // Si llega al aprobado, comprobar si cada categoría llega al aprobado
        if (["N5", "N4"].includes(level)) {
            return topCats[0] > 37 && topCats[1] > 18
        }
        return topCats.some(points => points > 18)
    }

    function formatResult(result: Result) {
        // El N5 y N4 tienen 2 categorias para las notas, el resto 3
        const topCats = ["N5", "N4"].includes(result.level) ? [result.vocab.points + result.grammar.points + result.reading.points, result.listening.points] : [result.vocab.points + result.grammar.points, result.reading.points, result.listening.points]

        const vocabPoints = result.vocab.goodExercises / result.vocab.exercises * 100
        const grammarPoints = result.grammar.goodExercises / result.grammar.exercises * 100
        const readingPoints = result.reading.goodExercises / result.reading.exercises * 100
        const listeningPoints = result.listening.goodExercises / result.listening.exercises * 100

        const totalPoints = topCats.reduce((acc, points) => acc + points, 0)
        // Asignar la valoración individual de cada categoría
        const gradeCats = {
            vocab: formatGradeCats(vocabPoints),
            grammar: formatGradeCats(grammarPoints),
            reading: formatGradeCats(readingPoints),
            listening: formatGradeCats(listeningPoints)
        }

        return (
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl">JLPT {result.level} - {result.strict ? "Modo estricto" : "Modo libre"}</h2>
                <div className="border border-black border-solid w-full flex flex-col p-1 gap-1">
                    <div className="flex gap-1">
                        <div className="border border-black border-solid divide-x divide-black flex w-3/4 justify-center">
                            {Children.toArray(topCats.map((points, i) => (
                                <div className="flex flex-col items-center divide-y divide-dotted divide-black flex-grow-0 gap-1" style={{ width: getResultsWidth(result.level, i) }}>
                                    <div className="flex flex-col">
                                        <p>{getResultsLabel(result.level, i).jp}</p>
                                        <p className="text-xs">{getResultsLabel(result.level, i).en}</p>
                                    </div>
                                    <p className="w-full h-1/4"><span style={{ color: getGradeColor(points, result["level"], i) }}>{points.toFixed(0)}</span>/{getResultsLabel(result.level, i).maxPoints}</p>
                                </div>
                            )))}
                        </div>
                        <div className="border border-black border-solid w-1/4">
                            <div className="flex flex-col items-center divide-y divide-dotted divide-black gap-1">
                                <div className="flex flex-col">
                                    <p>総合</p>
                                    <p className="text-xs">(Total)</p>
                                </div>
                                <p className="w-full h-1/4"><span style={{ color: getGradeColor(totalPoints, result["level"], -1) }}>{totalPoints.toFixed(0)}</span>/180</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1 relative">
                        <div className="w-[40%] flex flex-wrap gap-1">
                            <div className="flex flex-col border-black border-solid border gap-1 w-[calc(50%-.125rem)] divide-y divide-dotted divide-black">
                                <div className="flex flex-col">
                                    <p>文字・語彙</p>
                                    <p className="text-xs">(Vocabulario)</p>
                                </div>
                                <p className="w-full h-1/4 font-semibold text-xl">{gradeCats.vocab}</p>
                            </div>
                            <div className="flex flex-col border-black border-solid border gap-1 w-[calc(50%-.125rem)] divide-y divide-dotted divide-black">
                                <div className="flex flex-col">
                                    <p>文法</p>
                                    <p className="text-xs">(Gramática)</p>
                                </div>
                                <p className="w-full h-1/4 font-semibold text-xl">{gradeCats.grammar}</p>
                            </div>
                            <div className="flex flex-col border-black border-solid border gap-1 w-[calc(50%-.125rem)] divide-y divide-dotted divide-black">
                                <div className="flex flex-col">
                                    <p>読解</p>
                                    <p className="text-xs">(Lectura)</p>
                                </div>
                                <p className="w-full h-1/4 font-semibold text-xl">{gradeCats.reading}</p>
                            </div>
                            <div className="flex flex-col border-black border-solid border gap-1 w-[calc(50%-.125rem)] divide-y divide-dotted divide-black">
                                <div className="flex flex-col">
                                    <p>聴解</p>
                                    <p className="text-xs">(Escucha)</p>
                                </div>
                                <p className="w-full h-1/4 font-semibold text-xl">{gradeCats.listening}</p>
                            </div>
                        </div>
                        <div className="border border-black border-dotted flex-grow p-3 flex flex-col gap-1">
                            <div className="flex gap-2">
                                <p className="text-lg">A</p>
                                <div className="flex flex-col text-left">
                                    <p className="text-lg">正答率67%以上</p>
                                    <p className="text-xs">(67% o más de aciertos)</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-lg">B</p>
                                <div className="flex flex-col text-left">
                                    <p className="text-lg">正答率34%以上67%未満</p>
                                    <p className="text-xs">(Entre el 34% y 67% de aciertos)</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-lg">C</p>
                                <div className="flex flex-col text-left">
                                    <p className="text-lg">正答率34%未満</p>
                                    <p className="text-xs">(Menos de un 34% de aciertos)</p>
                                </div>
                            </div>
                        </div>

                        {/* Inkan */}
                        <div className="jlpt-inkan absolute bottom-2 right-2">
                            <p>JLPT試験</p>
                            <p>結果通知</p>
                            <p>manabe.es</p>
                            <p>能力認定</p>
                        </div>
                    </div>
                    <div className="border border-black border-solid text-xl flex justify-center py-1" style={{ color: checkPassFail(topCats, result.level) ? "#5cb85c" : "#ff8000" }}>
                        {checkPassFail(topCats, result.level) ? (
                            <div className="flex gap-8">
                                <p>合格</p>
                            </div>
                        ) : (
                            <div className="flex gap-8">
                                <p>不合格</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    function colorAnswer(index: number, correct: number, user: number) {
        if (index === correct-1) {
            return "border-green-500 border-b-2 border-solid"
        }
        if (index === user-1) {
            return "border-red-500 border-b-2 border-solid"
        }
        return ""
    }

    if (!chosenTest) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>
    }

    return (
        <div className="flex flex-col items-center mt-20 gap-4">
            <h1 className="text-3xl">Resultados de tu examen</h1>
            <div className="w-full lg:w-2/3">
                {formatResult(chosenTest)}
            </div>
            
            <Button onClick={() => navigate("/")}>Volver al inicio</Button>
            {(chosenTest.vocab.questions || chosenTest.grammar.questions || chosenTest.reading.questions || chosenTest.listening.questions) && (
            <Collapsible open={answersOpen} onOpenChange={(o) => {
                setAnswersOpen(o)
            }}>
                <CollapsibleTrigger asChild>
                    <Button>{answersOpen ? "Ocultar " : "Ver"} Respuestas</Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8">
                    {chosenTest.vocab.questions && (
                        <div className="flex flex-col">
                            <p className="text-xl text-left">Vocabulario</p>
                            <ul>
                                {Children.toArray(chosenTest.vocab.questions.map((exercise, i) => (
                                    <li className="flex flex-col gap-2 pt-3">
                                        <div className="flex gap-4 items-center">
                                            <span className="border px-2 border-solid border-gray-700 text-xs font-semibold">{i + 1}</span>
                                            <p className="question underline-offset-2 font-medium"><span>{exercise.question}</span></p>
                                        </div>
                                        <ul className="flex flex-wrap gap-x-8 gap-y-2">
                                            {Children.toArray(exercise.answers.map((answer, ansI) => (
                                                <li className="text-base">
                                                    <p style={{ textDecorationThickness: "2px" }} className={twMerge("flex gap-2", colorAnswer(ansI, exercise.correct, exercise.answered))}><span>{ansI + 1}</span> {answer}</p>
                                                </li>
                                            )))}
                                        </ul>
                                    </li>
                                )))}
                            </ul>
                        </div>
                    )}
                    {chosenTest.grammar.questions && (
                        <div className="flex flex-col">
                            <p className="text-xl text-left">Gramática</p>
                            <ul>
                                {Children.toArray(chosenTest.grammar.questions.map((exercise, i) => (
                                    <li className="flex flex-col gap-2 pt-3">
                                        <div className="flex gap-4 items-center">
                                            <span className="border px-2 border-solid border-gray-700 text-xs font-semibold">{i + 1}</span>
                                            <p className="question underline-offset-2 font-medium"><span>{exercise.question}</span></p>
                                        </div>
                                        <ul className="flex flex-wrap gap-x-8 gap-y-2">
                                            {Children.toArray(exercise.answers.map((answer, ansI) => (
                                                <li className="text-base">
                                                    <p style={{ textDecorationThickness: "2px" }} className={twMerge("flex gap-2", colorAnswer(ansI, exercise.correct, exercise.answered))}><span>{ansI + 1}</span> {answer}</p>
                                                </li>
                                            )))}
                                        </ul>
                                    </li>
                                )))}
                            </ul>
                        </div>
                    )}
                    {chosenTest.reading.questions && (
                        <div className="flex flex-col">
                            <p className="text-xl text-left">Lectura</p>
                            <ul>
                                {Children.toArray(chosenTest.reading.questions.map((exercise, i) => (
                                    <li className="flex flex-col gap-2 pt-3">
                                        <div className="flex gap-4 items-center">
                                            <span className="border px-2 border-solid border-gray-700 text-xs font-semibold">{i + 1}</span>
                                            <p className="question underline-offset-2 font-medium"><span>{exercise.question}</span></p>
                                        </div>
                                        <ul className="flex flex-wrap gap-x-8 gap-y-2">
                                            {Children.toArray(exercise.answers.map((answer, ansI) => (
                                                <li className="text-base">
                                                    <p style={{ textDecorationThickness: "2px" }} className={twMerge("flex gap-2", colorAnswer(ansI, exercise.correct, exercise.answered))}><span>{ansI + 1}</span> {answer}</p>
                                                </li>
                                            )))}
                                        </ul>
                                    </li>
                                )))}
                            </ul>
                        </div>
                    )}
                    {chosenTest.listening.questions && (
                        <div className="flex flex-col">
                            <p className="text-xl text-left">Escucha</p>
                            <ul>
                                {Children.toArray(chosenTest.listening.questions.map((exercise, i) => (
                                    <li className="flex flex-col gap-2 pt-3">
                                        <div className="flex gap-4 items-center">
                                            <span className="border px-2 border-solid border-gray-700 text-xs font-semibold">{i + 1}</span>
                                            <p className="question underline-offset-2 font-medium"><span>{exercise.question}</span></p>
                                        </div>
                                        <ul className="flex flex-wrap gap-x-8 gap-y-2">
                                            {Children.toArray(exercise.answers.map((answer, ansI) => (
                                                <li className="text-base">
                                                    <p style={{ textDecorationThickness: "2px" }} className={twMerge("flex gap-2", colorAnswer(ansI, exercise.correct, exercise.answered))}><span>{ansI + 1}</span> {answer}</p>
                                                </li>
                                            )))}
                                        </ul>
                                    </li>
                                )))}
                            </ul>
                        </div>
                    )}
                </CollapsibleContent>
            </Collapsible>
             )}
            <div className="flex flex-col gap-2 pb-4 w-full lg:w-2/3 items-center">
                <p>Exámenes anteriores</p>
                <ul className="flex flex-wrap gap-2">
                    {Children.toArray(results.map((result) => (
                        <li className="flex flex-col gap-2 py-2 px-8 border border-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                            <button onClick={() => {
                                setChosenTest(result)
                            }}>
                                <p>{result.level} - {result.strict ? "Modo estricto" : "Modo libre"}</p>
                                {/* Total points */}
                                <p>{(result.vocab.points + result.grammar.points + result.reading.points + result.listening.points).toFixed(0)}/180</p>
                            </button>
                        </li>
                    ))).reverse()}
                </ul>
            </div>
        </div>
    )
}