import { Button } from "@/components/ui/button";
import { useResultsStore } from "@/stores/results";
import { Result } from "@/types/results";
import React, { Children } from "react";
import { useNavigate } from "react-router-dom";

export default function Results(): React.ReactElement {
    const navigate = useNavigate()

    const { results } = useResultsStore()

    const lastResult = results[results.length - 1]

    if (!lastResult) return <></>

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
            case "N5": if(totalPoints < 80) return false;break;
            case "N4": if(totalPoints < 90) return false;break;
            case "N3": if(totalPoints < 95) return false;break;
            case "N2": if(totalPoints < 90) return false;break;
            case "N1": if(totalPoints < 100) return false;break;
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
                <div className="border border-black border-solid text-xl flex justify-center py-1" style={{color:checkPassFail(topCats,result.level) ? "#5cb85c":"#ff8000"}}>
                    {checkPassFail(topCats,result.level) ? (
                        <div className="flex gap-8">
                            <p>合格</p>
                            <p>Aprobado</p>
                        </div>
                    ) : (
                        <div className="flex gap-8">
                            <p>不合格</p>
                            <p>Suspenso</p>
                        </div>
                    )}
                </div>
            </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center h-screen mt-20 gap-4">
            <h1 className="text-3xl">Resultados de tu último examen</h1>
            <div className="w-full lg:w-2/3">
                {formatResult(lastResult)}
            </div>
            <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
    )
}