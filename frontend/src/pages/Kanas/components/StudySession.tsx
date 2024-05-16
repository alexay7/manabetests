import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { useKanas } from "../contexts/KanasContext";
import { Dialog, Tooltip } from "@mui/material";

export function StudySession({className}:HTMLAttributes<HTMLDivElement>):React.ReactElement{
    const {timeLeft,setTimeLeft,studyMode,setStudyMode,answers}=useKanas();

    if(studyMode){
        if(timeLeft === 0){
            return(
                <Dialog open={true} maxWidth="sm" fullWidth>
                    <div className="flex flex-col gap-4 py-4">
                        <h2 className="text-center text-2xl font-semibold">セッションの結果</h2>
                        <div className="grid grid-cols-10 px-8">
                            {Object.keys(answers).map((key)=>{
                            const {correct,incorrect} = answers[key]

                            const percentage = (incorrect/(correct+incorrect))*100

                            // Gradient color with the percentage

                            const color = percentage > 80 ? "bg-red-500" : percentage > 49 ? "bg-yellow-500" : "bg-green-500"

                            return(
                                <Tooltip key={key} title={`正解率 ${100-percentage}%`} arrow>
                                    <div key={key} className={twMerge("flex items-center gap-4 justify-center font-semibold text-xl",color)}>
                                        <p>{key}</p>
                                    </div>
                                </Tooltip>
                            )
                        })}
                        </div>
                        <div className="mx-auto w-3/4">
                            <button className="duration-500 w-full bg-main border-2 border-main-dark py-2 px-4 rounded-lg font-semibold hover:bg-white text-black hover:text-main-dark" onClick={()=>setStudyMode(false)}>終了</button>
                        </div>
                    </div>

                </Dialog>
            )
        }

        return <></>
    }

    return(
        <div className={twMerge("bg-white rounded-lg p-4 items-center flex flex-col gap-4",className)}>
            <h2 className="text-center text-xl font-semibold">学習セッションを開始</h2>
            <div className="flex items-end gap-1">
                <input className="border-main rounded-lg border-4 text-6xl text-center focus:outline-none" type="number" min={1} max={120} value={timeLeft/60} onChange={(e)=>{
                    if(e.target.valueAsNumber > 120) e.target.value = "120"
                    if(e.target.valueAsNumber < 1) e.target.value = "1"

                    setTimeLeft(e.target.valueAsNumber*60)
                }}
                />
                <p className="font-semibold text-xl">分</p>
            </div>
            <button type="submit" className="duration-500 w-full bg-main border-2 border-main-dark py-2 px-4 rounded-lg font-semibold hover:bg-white text-black hover:text-main-dark" onClick={()=>{
                setStudyMode(true)

                const answer = document.getElementById("answer")
                if(answer) answer.focus()
                }}
            >スタート
            </button>
        </div>
    )
}